# Work entity test

require "minitest/autorun"
require "json"
require_relative "../UrantiaPapers_sdk"
require_relative "runner"

class WorkEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = UrantiaPapersSDK.test(nil, nil)
    ent = testsdk.Work(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "work" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = UrantiaPapersSDK.test(seed, nil).Work(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "work" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = UrantiaPapersSDK.test(seed, nil)
    seen = base.Work(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = UrantiaPapersConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = UrantiaPapersSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Work(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < UrantiaPapersBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "work hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      UrantiaPapersSDK.test(offline, nil).Work(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    UrantiaPapersSDK.test(offline, nil).Work(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = UrantiaPapersConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = UrantiaPapersSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Work(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    UrantiaPapersSDK.test(nil, nil).Work(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = UrantiaPapersSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Work(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Work(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = UrantiaPapersConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = UrantiaPapersSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Work(nil).list({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = work_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "work." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["work01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via URANTIA_PAPERS_TEST_WORK_ENTID")
        end
      end
    end
    client = setup[:client]

    # CREATE
    work_ref01_ent = client.Work(nil)
    work_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.work"), "work_ref01"))
    work_ref01_data["work"] = setup[:idmap]["work01"]

    work_ref01_data_result = work_ref01_ent.create(work_ref01_data, nil)
    work_ref01_data = Helpers.to_map(work_ref01_data_result.respond_to?(:data_get) ? work_ref01_data_result.data_get : work_ref01_data_result)
    assert !work_ref01_data.nil?
    assert !work_ref01_data["id"].nil?

    # LIST
    work_ref01_match = {}

    work_ref01_list_result = work_ref01_ent.list(work_ref01_match, nil)
    assert work_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(work_ref01_list_result),
      { "id" => work_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def work_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "work", "WorkTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = UrantiaPapersSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["work01", "work02", "work03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["URANTIA_PAPERS_TEST_WORK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "URANTIA_PAPERS_TEST_WORK_ENTID" => idmap,
    "URANTIA_PAPERS_TEST_LIVE" => "FALSE",
    "URANTIA_PAPERS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["URANTIA_PAPERS_TEST_WORK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["URANTIA_PAPERS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = UrantiaPapersSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["URANTIA_PAPERS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["URANTIA_PAPERS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
