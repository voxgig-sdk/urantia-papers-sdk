-- UrantiaPapers SDK exists test

local sdk = require("urantia-papers_sdk")

describe("UrantiaPapersSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
