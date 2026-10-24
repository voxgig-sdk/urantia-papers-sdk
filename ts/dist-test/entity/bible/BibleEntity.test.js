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
(0, node_test_1.describe)('BibleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('URANTIA_PAPERS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UrantiaPapersSDK.test();
        const ent = testsdk.Bible();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('bible hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.UrantiaPapersSDK.test(offline).Bible().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.UrantiaPapersSDK.test(offline).Bible()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Bible().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.UrantiaPapersSDK.test().Bible().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Bible().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Bible().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Bible().list({ "abbr": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bible.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "abbr": { "a": true, "h": "Abbr", "n": "abbr", "r": true, "t": "`$STRING`", "key$": "abbr", "index$": 0 }, "bookCode": { "a": true, "h": "Book Code", "n": "bookCode", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "bookCode", "index$": 1 }, "bookName": { "a": true, "h": "Book Name", "n": "bookName", "r": true, "t": "`$STRING`", "key$": "bookName", "index$": 2 }, "bookOrder": { "a": true, "h": "Book Order", "n": "bookOrder", "r": true, "t": "`$INTEGER`", "key$": "bookOrder", "index$": 3 }, "canon": { "a": true, "h": "Canon", "n": "canon", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "canon", "index$": 4 }, "chapter": { "a": true, "h": "Chapter", "n": "chapter", "r": true, "t": "`$INTEGER`", "key$": "chapter", "index$": 5 }, "chapterCount": { "a": true, "h": "Chapter Count", "n": "chapterCount", "r": true, "t": "`$INTEGER`", "key$": "chapterCount", "index$": 6 }, "chunk": { "a": true, "h": "Chunk", "n": "chunk", "r": true, "t": "`$OBJECT`", "key$": "chunk", "index$": 7 }, "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$ARRAY`", "key$": "data", "index$": 8 }, "fullName": { "a": true, "h": "Full Name", "n": "fullName", "r": true, "t": "`$STRING`", "key$": "fullName", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "t": "`$INTEGER`", "key$": "limit", "index$": 11 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "t": "`$OBJECT`", "key$": "meta", "index$": 12 }, "page": { "a": true, "h": "Page", "n": "page", "r": false, "t": "`$INTEGER`", "key$": "page", "index$": 13 }, "q": { "a": true, "h": "Q", "n": "q", "r": true, "t": "`$STRING`", "key$": "q", "index$": 14 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": true, "t": "`$STRING`", "key$": "reference", "index$": 15 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "t": "`$STRING`", "key$": "text", "index$": 16 }, "translation": { "a": true, "h": "Translation", "n": "translation", "r": true, "t": "`$STRING`", "key$": "translation", "index$": 17 }, "urantiaParallelLimit": { "a": true, "h": "Urantia Parallel Limit", "n": "urantiaParallelLimit", "r": false, "t": "`$INTEGER`", "key$": "urantiaParallelLimit", "index$": 18 }, "urantiaParallels": { "a": true, "h": "Urantia Parallels", "n": "urantiaParallels", "r": true, "t": "`$ARRAY`", "key$": "urantiaParallels", "index$": 19 }, "verse": { "a": true, "h": "Verse", "n": "verse", "r": true, "t": "`$INTEGER`", "key$": "verse", "index$": 20 }, "verseCount": { "a": true, "h": "Verse Count", "n": "verseCount", "r": true, "t": "`$INTEGER`", "key$": "verseCount", "index$": 21 }, "verses": { "a": true, "h": "Verses", "n": "verses", "r": true, "t": "`$ARRAY`", "key$": "verses", "index$": 22 } }, "id": { "field": "id", "name": "id" }, "name": "bible", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["bookCode", "canon", "limit", "page", "q", "urantiaParallelLimit"], "co": { "id": "POST /bible/search/semantic", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/bible/search/semantic", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "lit": "search" }, { "lit": "semantic" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /bible/books", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/bible/books", "q": { "$action": "book" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "lit": "books" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /bible/{bookCode}/{chapter}/{verse}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "MAT", "k": "param", "n": "book_code", "or": "bookCode", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 5, "k": "param", "n": "chapter", "or": "chapter", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 3, "k": "param", "n": "verse", "or": "verse", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/bible/{bookCode}/{chapter}/{verse}", "q": { "exist": ["book_code", "chapter", "verse"] }, "r": { "param": { "bookCode": "book_code" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "var": "book_code" }, { "var": "chapter" }, { "var": "verse" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /bible/{bookCode}/{chapter}/{verse}/urantia-parallels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "MAT", "k": "param", "n": "book_code", "or": "bookCode", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 5, "k": "param", "n": "chapter", "or": "chapter", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 3, "k": "param", "n": "verse", "or": "verse", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/bible/{bookCode}/{chapter}/{verse}/urantia-parallels", "q": { "exist": ["book_code", "chapter", "verse"] }, "r": { "param": { "bookCode": "book_code" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "var": "book_code" }, { "var": "chapter" }, { "var": "verse" }, { "lit": "urantia-parallels" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /bible/{bookCode}/{chapter}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "MAT", "k": "param", "n": "book_code", "or": "bookCode", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 5, "k": "param", "n": "chapter", "or": "chapter", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/bible/{bookCode}/{chapter}", "q": { "exist": ["book_code", "chapter"] }, "r": { "param": { "bookCode": "book_code" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "var": "book_code" }, { "var": "chapter" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /bible/{bookCode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "MAT", "k": "param", "n": "id", "or": "bookCode", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/bible/{bookCode}", "q": { "exist": ["id"] }, "r": { "param": { "bookCode": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "bible" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bible", "name__orig": "bible", "Name": "Bible", "name_": "bible", "name-": "bible", "NAME": "BIBLE", "index$": 1 }, { "active": true, "entity": "bible", "key$": "BasicBibleFlow", "kind": "basic", "name": "BasicBibleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "bible_ref01" }, "m": { "book_code": "book_code01", "chapter": "chapter01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "bible_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "bible_ref01", "srcdatavar": "bible_ref01_data", "suffix": "_dt0" }, "m": { "id": "bible01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bible_ref01" } }], "index$": 2 }] }, 'Bible', { "POST /bible/search/semantic": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "q": { "type": "string", "minLength": 1, "maxLength": 2000, "key$": "q" }, "page": { "type": "integer", "minimum": 0, "default": 0, "key$": "page" }, "limit": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20, "key$": "limit" }, "canon": { "type": "string", "enum": ["ot", "deuterocanon", "nt"], "key$": "canon" }, "bookCode": { "type": "string", "minLength": 1, "key$": "bookCode" }, "urantiaParallelLimit": { "type": "integer", "minimum": 0, "maximum": 10, "default": 3, "key$": "urantiaParallelLimit" } }, "required": ["q"], "index$": 1 }, "example": { "q": "blessed are the poor in spirit", "limit": 2, "urantiaParallelLimit": 1 } } } }, "parameters": [] }, "GET /bible/books": { "protocol": "http", "parameters": [] }, "GET /bible/{bookCode}/{chapter}/{verse}": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1 }, "required": true, "name": "bookCode", "in": "path", "example": "MAT", "index$": 0 }, { "schema": { "type": "integer", "minimum": 1 }, "required": true, "name": "chapter", "in": "path", "example": 5, "index$": 1 }, { "schema": { "type": "integer", "minimum": 1 }, "required": true, "name": "verse", "in": "path", "example": 3, "index$": 2 }] }, "GET /bible/{bookCode}/{chapter}/{verse}/urantia-parallels": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1 }, "required": true, "name": "bookCode", "in": "path", "example": "MAT", "index$": 0 }, { "schema": { "type": "integer", "minimum": 1 }, "required": true, "name": "chapter", "in": "path", "example": 5, "index$": 1 }, { "schema": { "type": "integer", "minimum": 1 }, "required": true, "name": "verse", "in": "path", "example": 3, "index$": 2 }] }, "GET /bible/{bookCode}/{chapter}": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1 }, "required": true, "name": "bookCode", "in": "path", "example": "MAT", "index$": 0 }, { "schema": { "type": "integer", "minimum": 1 }, "required": true, "name": "chapter", "in": "path", "example": 5, "index$": 1 }] }, "GET /bible/{bookCode}": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "minLength": 1 }, "required": true, "name": "bookCode", "in": "path", "example": "MAT", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const bible_ref01_ent = client.Bible();
        let bible_ref01_data = setup.data.new.bible['bible_ref01'];
        bible_ref01_data['book_code'] = setup.idmap['book_code01'];
        bible_ref01_data['chapter'] = setup.idmap['chapter01'];
        bible_ref01_data = (await bible_ref01_ent.create(bible_ref01_data)).data();
        (0, node_assert_1.default)(null != bible_ref01_data.id);
        // LIST
        const bible_ref01_match = {};
        const bible_ref01_list = (await bible_ref01_ent.list(bible_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(bible_ref01_list, { id: bible_ref01_data.id })));
        // LOAD
        const bible_ref01_match_dt0 = {};
        bible_ref01_match_dt0.id = bible_ref01_data.id;
        const bible_ref01_data_dt0 = (await bible_ref01_ent.load(bible_ref01_match_dt0)).data();
        (0, node_assert_1.default)(bible_ref01_data_dt0.id === bible_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bible/BibleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UrantiaPapersSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bible01', 'bible02', 'bible03', 'book_code01', 'chapter01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'URANTIA_PAPERS_TEST_BIBLE_ENTID': idmap,
        'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
        'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['URANTIA_PAPERS_TEST_BIBLE_ENTID'];
    const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['URANTIA_PAPERS_TEST_BIBLE_ENTID'];
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
//# sourceMappingURL=BibleEntity.test.js.map