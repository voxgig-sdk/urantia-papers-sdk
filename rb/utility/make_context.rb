# UrantiaPapers SDK utility: make_context
require_relative '../core/context'
module UrantiaPapersUtilities
  MakeContext = ->(ctxmap, basectx) {
    UrantiaPapersContext.new(ctxmap, basectx)
  }
end
