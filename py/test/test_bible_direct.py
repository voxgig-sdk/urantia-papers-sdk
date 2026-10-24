# Bible direct test

import json
import pytest

from urantiapapers_sdk.utility.voxgig_struct import voxgig_struct as vs
from urantiapapers_sdk import UrantiaPapersSDK
from urantiapapers_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestBibleDirect:

    def test_should_direct_list_bible(self):
        setup = _bible_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-bible", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]

        params = {}

        result = client.direct({
            "path": "bible/books",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1

    def test_should_direct_load_bible(self):
        setup = _bible_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-bible", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            params["book_code"] = "MAT"
            params["chapter"] = 5
            params["verse"] = 3
            pass
        else:
            params["book_code"] = "direct01"
            params["chapter"] = "direct02"
            params["verse"] = "direct03"
            pass

        result = client.direct({
            "path": "bible/{book_code}/{chapter}/{verse}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _bible_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "URANTIA_PAPERS_TEST_BIBLE_ENTID": {},
        "URANTIA_PAPERS_TEST_LIVE": "FALSE",
    })

    live = env.get("URANTIA_PAPERS_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
        })
        client = UrantiaPapersSDK(merged_opts)
        idmap = env.get("URANTIA_PAPERS_TEST_BIBLE_ENTID")
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = UrantiaPapersSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
