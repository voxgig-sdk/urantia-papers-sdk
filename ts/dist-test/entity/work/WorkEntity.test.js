"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WorkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('URANTIA_PAPERS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UrantiaPapersSDK.test();
        const ent = testsdk.Work();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('work hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.UrantiaPapersSDK.test(offline).Work().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.UrantiaPapersSDK.test(offline).Work()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Work().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.UrantiaPapersSDK.test().Work().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Work().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Work().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Work().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'work.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$ARRAY`", "key$": "data", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The work id: \"bible\", or the slug of a text such as \"dhammapada\".", "t": "`$STRING`", "key$": "id", "index$": 1 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "sh": "\"scripture\": read as sacred by its tradition.", "t": "`$STRING`", "key$": "kind", "index$": 2 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "t": "`$INTEGER`", "key$": "limit", "index$": 3 }, "match": { "a": true, "h": "Match", "n": "match", "r": false, "sh": "Keyword search: how it matched.", "t": "`$STRING`", "key$": "match", "index$": 4 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "t": "`$OBJECT`", "key$": "meta", "index$": 5 }, "page": { "a": true, "h": "Page", "n": "page", "r": false, "t": "`$INTEGER`", "key$": "page", "index$": 6 }, "q": { "a": true, "h": "Q", "n": "q", "r": true, "t": "`$STRING`", "key$": "q", "index$": 7 }, "refPrefix": { "a": true, "h": "Ref Prefix", "n": "refPrefix", "r": true, "sh": "The prefix of its references, such as \"Dhp\".", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "refPrefix", "index$": 8 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": true, "sh": "\"John 3:16\", \"Dhp 183\", \"BG 2.47-49\" (a chunk in semantic search).", "t": "`$STRING`", "key$": "reference", "index$": 9 }, "religion": { "a": true, "h": "Religion", "n": "religion", "r": true, "sh": "The same as `tradition`, kept for older clients.", "t": "`$STRING`", "key$": "religion", "index$": 10 }, "similarity": { "a": true, "h": "Similarity", "n": "similarity", "r": false, "sh": "Semantic search: cosine similarity.", "t": "`$NUMBER`", "key$": "similarity", "index$": 11 }, "strength": { "a": true, "h": "Strength", "n": "strength", "r": false, "sh": "How close the result is: strong (most right answers score this), related, or weak (likely off the topic).", "t": "`$STRING`", "key$": "strength", "index$": 12 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "sh": "One plain sentence on what the work is.", "t": "`$STRING`", "key$": "summary", "index$": 13 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "t": "`$STRING`", "key$": "text", "index$": 14 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 15 }, "tradition": { "a": true, "h": "Tradition", "n": "tradition", "r": true, "sh": "The people or the religion of the work: \"Buddhist\", \"Norse\", \"Ancient Greek\".", "t": "`$STRING`", "key$": "tradition", "index$": 16 }, "translator": { "a": true, "h": "Translator", "n": "translator", "r": true, "t": "`$STRING`", "key$": "translator", "index$": 17 }, "unitLabel": { "a": true, "h": "Unit Label", "n": "unitLabel", "r": true, "sh": "The word for one unit of the work: \"verse\", \"section\", \"pauri\".", "t": "`$STRING`", "key$": "unitLabel", "index$": 18 }, "units": { "a": true, "h": "Units", "n": "units", "r": true, "t": "`$INTEGER`", "key$": "units", "index$": 19 }, "urantiaParallelLimit": { "a": true, "h": "Urantia Parallel Limit", "n": "urantiaParallelLimit", "r": false, "t": "`$INTEGER`", "key$": "urantiaParallelLimit", "index$": 20 }, "urantiaParallels": { "a": true, "h": "Urantia Parallels", "n": "urantiaParallels", "r": true, "sh": "The nearest Urantia paragraphs (semantic parallels, not curated ones).", "t": "`$ARRAY`", "key$": "urantiaParallels", "index$": 21 }, "urantiaSection": { "a": true, "h": "Urantia Section", "n": "urantiaSection", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "urantiaSection", "index$": 22 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The public page that holds the text, or null.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "url", "index$": 23 }, "work": { "a": true, "h": "Work", "n": "work", "op": { "list": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "One work only: \"bible\" or a work id such as \"dhammapada\".", "t": "`$STRING`", "key$": "work", "index$": 24 }, "year": { "a": true, "h": "Year", "n": "year", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "year", "index$": 25 } }, "id": { "field": "id", "from": { "work": "work.id" }, "name": "id", "parts": ["work", "ref"], "sep": "/" }, "name": "work", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["limit", "page", "q", "urantiaParallelLimit", "work"], "co": { "id": "POST /works/search", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/works/search", "q": { "$action": "search" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["limit", "page", "q", "urantiaParallelLimit", "work"], "co": { "id": "POST /works/search/semantic", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/works/search/semantic", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "search" }, { "lit": "semantic" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /works/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "page", "or": "page", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 1 }, { "a": true, "ex": "love", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 3, "k": "query", "n": "urantia_parallel_limit", "or": "urantiaParallelLimit", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 3 }, { "a": true, "k": "query", "n": "work", "or": "work", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/works/search", "q": { "$action": "search", "exist": ["q"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /works/search/semantic", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "page", "or": "page", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 1 }, { "a": true, "ex": "love", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 3, "k": "query", "n": "urantia_parallel_limit", "or": "urantiaParallelLimit", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 3 }, { "a": true, "k": "query", "n": "work", "or": "work", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/works/search/semantic", "q": { "exist": ["q"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "search" }, { "lit": "semantic" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /works", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/works", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /works/{work}/{ref}/urantia-parallels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bhagavad-gita", "k": "param", "n": "id", "or": "work", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2.47", "k": "param", "n": "ref", "or": "ref", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/works/{work}/{ref}/urantia-parallels", "q": { "$action": "urantia_parallel", "exist": ["id", "ref"] }, "r": { "param": { "work": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "var": "id" }, { "var": "ref" }, { "lit": "urantia-parallels" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /works/{work}/{ref}/work-parallels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bhagavad-gita", "k": "param", "n": "id", "or": "work", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2.47", "k": "param", "n": "ref", "or": "ref", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/works/{work}/{ref}/work-parallels", "q": { "$action": "work_parallel", "exist": ["id", "ref"] }, "r": { "param": { "work": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "var": "id" }, { "var": "ref" }, { "lit": "work-parallels" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /works/{work}/{ref}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2.47", "k": "param", "n": "ref", "or": "ref", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "bhagavad-gita", "k": "param", "n": "work", "or": "work", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/works/{work}/{ref}", "q": { "exist": ["ref", "work"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "var": "work" }, { "var": "ref" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "work", "name__orig": "work", "Name": "Work", "name_": "work", "name-": "work", "NAME": "WORK", "index$": 15 }, { "active": true, "entity": "work", "key$": "BasicWorkFlow", "kind": "basic", "name": "BasicWorkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "work_ref01" }, "m": { "work": "work01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "work_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "work_ref01", "srcdatavar": "work_ref01_data", "suffix": "_dt0" }, "m": { "id": "work01", "work": "work01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-work_ref01" } }], "unreachable": true }] }, 'Work', { "POST /works/search": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "q": { "type": "string", "minLength": 1, "maxLength": 500 }, "work": { "type": "string", "description": "One work only: \"bible\" or a work id such as \"dhammapada\"." }, "page": { "type": "integer", "minimum": 0, "default": 0 }, "limit": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "urantiaParallelLimit": { "type": "integer", "minimum": 0, "maximum": 10, "default": 3 } }, "required": ["q"] }, "example": { "q": "Dhp 183", "limit": 2 } } } }, "parameters": [] }, "POST /works/search/semantic": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "q": { "type": "string", "minLength": 1, "maxLength": 500, "key$": "q" }, "work": { "type": "string", "description": "One work only: \"bible\" or a work id such as \"dhammapada\".", "key$": "work" }, "page": { "type": "integer", "minimum": 0, "default": 0, "key$": "page" }, "limit": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20, "key$": "limit" }, "urantiaParallelLimit": { "type": "integer", "minimum": 0, "maximum": 10, "default": 3, "key$": "urantiaParallelLimit" } }, "required": ["q"], "index$": 1 }, "example": { "q": "action without attachment to its fruits", "work": "bhagavad-gita", "limit": 2 } } } }, "parameters": [] }, "GET /works/search": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1, "maxLength": 500 }, "required": true, "name": "q", "in": "query", "example": "love", "index$": 0 }, { "schema": { "type": "string", "description": "One work only: \"bible\" or a work id such as \"dhammapada\"." }, "required": false, "description": "One work only: \"bible\" or a work id such as \"dhammapada\".", "name": "work", "in": "query", "index$": 1 }, { "schema": { "type": ["integer", "null"], "minimum": 0, "default": 0 }, "required": false, "name": "page", "in": "query", "index$": 2 }, { "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "required": false, "name": "limit", "in": "query", "index$": 3 }, { "schema": { "type": ["integer", "null"], "minimum": 0, "maximum": 10, "default": 3 }, "required": false, "name": "urantiaParallelLimit", "in": "query", "index$": 4 }] }, "GET /works/search/semantic": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1, "maxLength": 500 }, "required": true, "name": "q", "in": "query", "example": "love", "index$": 0 }, { "schema": { "type": "string", "description": "One work only: \"bible\" or a work id such as \"dhammapada\"." }, "required": false, "description": "One work only: \"bible\" or a work id such as \"dhammapada\".", "name": "work", "in": "query", "index$": 1 }, { "schema": { "type": ["integer", "null"], "minimum": 0, "default": 0 }, "required": false, "name": "page", "in": "query", "index$": 2 }, { "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "required": false, "name": "limit", "in": "query", "index$": 3 }, { "schema": { "type": ["integer", "null"], "minimum": 0, "maximum": 10, "default": 3 }, "required": false, "name": "urantiaParallelLimit", "in": "query", "index$": 4 }] }, "GET /works": { "protocol": "http", "parameters": [] }, "GET /works/{work}/{ref}/urantia-parallels": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1, "maxLength": 64, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\")." }, "required": true, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\").", "name": "work", "in": "path", "example": "bhagavad-gita", "index$": 0 }, { "schema": { "type": "string", "minLength": 1, "maxLength": 40, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`)." }, "required": true, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`).", "name": "ref", "in": "path", "example": "2.47", "index$": 1 }] }, "GET /works/{work}/{ref}/work-parallels": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1, "maxLength": 64, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\")." }, "required": true, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\").", "name": "work", "in": "path", "example": "bhagavad-gita", "index$": 0 }, { "schema": { "type": "string", "minLength": 1, "maxLength": 40, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`)." }, "required": true, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`).", "name": "ref", "in": "path", "example": "2.47", "index$": 1 }] }, "GET /works/{work}/{ref}": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1, "maxLength": 64, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\")." }, "required": true, "description": "\"bible\", or a work id such as \"bhagavad-gita\" (its ref prefix also works: \"bg\").", "name": "work", "in": "path", "example": "bhagavad-gita", "index$": 0 }, { "schema": { "type": "string", "minLength": 1, "maxLength": 40, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`)." }, "required": true, "description": "A unit (`John 3:16`, `2.47`, `Dhp 183`), a short range (`John 3:16-18`, `2.47-49`), or a whole chapter (`John 3`, `2`).", "name": "ref", "in": "path", "example": "2.47", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const work_ref01_ent = client.Work();
        let work_ref01_data = setup.data.new.work['work_ref01'];
        work_ref01_data['work'] = setup.idmap['work01'];
        work_ref01_data = (await work_ref01_ent.create(work_ref01_data)).data();
        (0, node_assert_1.default)(null != work_ref01_data.id);
        // LIST
        const work_ref01_match = {};
        const work_ref01_list = (await work_ref01_ent.list(work_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(work_ref01_list, { id: work_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/work/WorkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UrantiaPapersSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['work01', 'work02', 'work03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'URANTIA_PAPERS_TEST_WORK_ENTID': idmap,
        'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
        'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['URANTIA_PAPERS_TEST_WORK_ENTID'];
    const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['URANTIA_PAPERS_TEST_WORK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UrantiaPapersSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.URANTIA_PAPERS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WorkEntity.test.js.map