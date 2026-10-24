-- Quote entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("urantia-papers_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("QuoteEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Quote(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = quote_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "quote." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    local client = setup.client

    -- CREATE
    local quote_ref01_ent = client:Quote(nil)
    local quote_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.quote"), "quote_ref01"))

    local quote_ref01_data_result, err = quote_ref01_ent:create(quote_ref01_data, nil)
    assert.is_nil(err)
    quote_ref01_data = helpers.to_map(type(quote_ref01_data_result) == 'table' and quote_ref01_data_result.data_get and quote_ref01_data_result:data_get() or quote_ref01_data_result)
    assert.is_not_nil(quote_ref01_data)

  end)
end)

function quote_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/quote/QuoteTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read quote test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "quote01", "quote02", "quote03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("URANTIA_PAPERS_TEST_QUOTE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["URANTIA_PAPERS_TEST_QUOTE_ENTID"] = idmap,
    ["URANTIA_PAPERS_TEST_LIVE"] = "FALSE",
    ["URANTIA_PAPERS_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["URANTIA_PAPERS_TEST_QUOTE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["URANTIA_PAPERS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["URANTIA_PAPERS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["URANTIA_PAPERS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
