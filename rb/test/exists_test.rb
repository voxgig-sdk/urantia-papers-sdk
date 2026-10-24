# UrantiaPapers SDK exists test

require "minitest/autorun"
require_relative "../UrantiaPapers_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UrantiaPapersSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
