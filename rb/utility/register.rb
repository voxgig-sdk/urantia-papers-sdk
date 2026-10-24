# UrantiaPapers SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UrantiaPapersUtility.registrar = ->(u) {
  u.clean = UrantiaPapersUtilities::Clean
  u.clean_add = UrantiaPapersUtilities::CleanAdd
  u.clean_explain = UrantiaPapersUtilities::CleanExplain
  u.done = UrantiaPapersUtilities::Done
  u.make_error = UrantiaPapersUtilities::MakeError
  u.feature_add = UrantiaPapersUtilities::FeatureAdd
  u.feature_hook = UrantiaPapersUtilities::FeatureHook
  u.feature_init = UrantiaPapersUtilities::FeatureInit
  u.fetcher = UrantiaPapersUtilities::Fetcher
  u.make_fetch_def = UrantiaPapersUtilities::MakeFetchDef
  u.make_context = UrantiaPapersUtilities::MakeContext
  u.make_options = UrantiaPapersUtilities::MakeOptions
  u.make_request = UrantiaPapersUtilities::MakeRequest
  u.make_response = UrantiaPapersUtilities::MakeResponse
  u.make_result = UrantiaPapersUtilities::MakeResult
  u.make_point = UrantiaPapersUtilities::MakePoint
  u.make_spec = UrantiaPapersUtilities::MakeSpec
  u.make_url = UrantiaPapersUtilities::MakeUrl
  u.param = UrantiaPapersUtilities::Param
  u.prepare_auth = UrantiaPapersUtilities::PrepareAuth
  u.prepare_body = UrantiaPapersUtilities::PrepareBody
  u.prepare_headers = UrantiaPapersUtilities::PrepareHeaders
  u.prepare_method = UrantiaPapersUtilities::PrepareMethod
  u.prepare_params = UrantiaPapersUtilities::PrepareParams
  u.prepare_path = UrantiaPapersUtilities::PreparePath
  u.prepare_query = UrantiaPapersUtilities::PrepareQuery
  u.graphql_body = UrantiaPapersUtilities::GraphqlBody
  u.graphql_errors = UrantiaPapersUtilities::GraphqlErrors
  u.result_basic = UrantiaPapersUtilities::ResultBasic
  u.result_body = UrantiaPapersUtilities::ResultBody
  u.result_headers = UrantiaPapersUtilities::ResultHeaders
  u.transform_request = UrantiaPapersUtilities::TransformRequest
  u.transform_response = UrantiaPapersUtilities::TransformResponse
}
