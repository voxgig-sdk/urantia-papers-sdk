# UrantiaPapers SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UrantiaPapersFeatures
  def self.make_feature(name)
    case name
    when "base"
      UrantiaPapersBaseFeature.new
    when "ratelimit"
      UrantiaPapersRatelimitFeature.new
    when "retry"
      UrantiaPapersRetryFeature.new
    when "test"
      UrantiaPapersTestFeature.new
    when "timeout"
      UrantiaPapersTimeoutFeature.new
    else
      UrantiaPapersBaseFeature.new
    end
  end
end
