# UrantiaPapers SDK utility: make_context

from urantiapapers_sdk.core.context import UrantiaPapersContext


def make_context_util(ctxmap, basectx):
    return UrantiaPapersContext(ctxmap, basectx)
