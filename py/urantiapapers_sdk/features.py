# UrantiaPapers SDK feature factory

from urantiapapers_sdk.feature.base_feature import UrantiaPapersBaseFeature
from urantiapapers_sdk.feature.ratelimit_feature import UrantiaPapersRatelimitFeature
from urantiapapers_sdk.feature.retry_feature import UrantiaPapersRetryFeature
from urantiapapers_sdk.feature.test_feature import UrantiaPapersTestFeature
from urantiapapers_sdk.feature.timeout_feature import UrantiaPapersTimeoutFeature


_FEATURES = {
    "base": lambda: UrantiaPapersBaseFeature(),
    "ratelimit": lambda: UrantiaPapersRatelimitFeature(),
    "retry": lambda: UrantiaPapersRetryFeature(),
    "test": lambda: UrantiaPapersTestFeature(),
    "timeout": lambda: UrantiaPapersTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
