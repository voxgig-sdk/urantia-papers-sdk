# Audio entity test

require "minitest/autorun"
require "json"
require_relative "../UrantiaPapers_sdk"
require_relative "runner"

class AudioEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = UrantiaPapersSDK.test(nil, nil)
    ent = testsdk.Audio(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = UrantiaPapersConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = UrantiaPapersSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Audio(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = audio_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "audio." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a audio record it has no list to find")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    audio_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.audio")))
    audio_ref01_data = nil
    if audio_ref01_data_raw.length > 0
      audio_ref01_data = Helpers.to_map(audio_ref01_data_raw[0][1])
    end

    # LOAD
    audio_ref01_ent = client.Audio(nil)
    audio_ref01_match_dt0 = {
      "id" => audio_ref01_data["id"],
    }
    audio_ref01_data_dt0_loaded = audio_ref01_ent.load(audio_ref01_match_dt0, nil)
    audio_ref01_data_dt0_load_result = Helpers.to_map(audio_ref01_data_dt0_loaded.respond_to?(:data_get) ? audio_ref01_data_dt0_loaded.data_get : audio_ref01_data_dt0_loaded)
    assert !audio_ref01_data_dt0_load_result.nil?
    assert_equal audio_ref01_data_dt0_load_result["id"], audio_ref01_data["id"]

  end
end

def audio_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "audio", "AudioTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = UrantiaPapersSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["audio01", "audio02", "audio03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["URANTIA_PAPERS_TEST_AUDIO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "URANTIA_PAPERS_TEST_AUDIO_ENTID" => idmap,
    "URANTIA_PAPERS_TEST_LIVE" => "FALSE",
    "URANTIA_PAPERS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["URANTIA_PAPERS_TEST_AUDIO_ENTID"])
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
