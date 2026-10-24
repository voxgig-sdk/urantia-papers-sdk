# UrantiaPapers SDK utility: prepare_body
require_relative 'media'
module UrantiaPapersUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return UrantiaPapersUtilities.raw_body(ctx.reqdata) if UrantiaPapersUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
