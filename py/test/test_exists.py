# UrantiaPapers SDK exists test

import pytest
from urantiapapers_sdk import UrantiaPapersSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UrantiaPapersSDK.test(None, None)
        assert testsdk is not None
