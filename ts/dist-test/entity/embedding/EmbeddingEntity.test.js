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
(0, node_test_1.describe)('EmbeddingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('URANTIA_PAPERS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UrantiaPapersSDK.test();
        const ent = testsdk.Embedding();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Embedding().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'embedding.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dimensions": { "a": true, "h": "Dimensions", "n": "dimensions", "r": true, "t": "`$INTEGER`", "key$": "dimensions", "index$": 0 }, "embedding": { "a": true, "h": "Embedding", "n": "embedding", "r": true, "t": "`$ARRAY`", "key$": "embedding", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "t": "`$STRING`", "key$": "model", "index$": 3 }, "standardReferenceId": { "a": true, "h": "Standard Reference Id", "n": "standardReferenceId", "r": true, "t": "`$STRING`", "key$": "standardReferenceId", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "embedding", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /embeddings/{ref}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2:5.1", "k": "param", "n": "id", "or": "ref", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "large", "k": "query", "n": "model", "or": "model", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/embeddings/{ref}", "q": { "exist": ["id"] }, "r": { "param": { "ref": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "embeddings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /embeddings/export", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "jsonl", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "large", "k": "query", "n": "model", "or": "model", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2", "k": "query", "n": "paper_id", "or": "paperId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/embeddings/export", "q": { "$action": "export", "exist": ["paper_id"] }, "r": {}, "s": [{ "lit": "embeddings" }, { "lit": "export" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "embedding", "name__orig": "embedding", "Name": "Embedding", "name_": "embedding", "name-": "embedding", "NAME": "EMBEDDING", "index$": 3 }, { "active": true, "entity": "embedding", "key$": "BasicEmbeddingFlow", "kind": "basic", "name": "BasicEmbeddingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "embedding_ref01", "srcdatavar": "embedding_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-embedding_ref01" } }], "index$": 0 }] }, 'Embedding', { "GET /embeddings/{ref}": { "protocol": "http", "parameters": [{ "schema": { "type": "string" }, "required": true, "name": "ref", "in": "path", "example": "2:5.1", "index$": 0 }, { "schema": { "type": "string", "enum": ["small", "large"], "default": "large" }, "required": false, "name": "model", "in": "query", "index$": 1 }] }, "GET /embeddings/export": { "protocol": "http", "parameters": [{ "schema": { "type": "string", "enum": ["jsonl", "json"], "default": "jsonl" }, "required": false, "name": "format", "in": "query", "index$": 0 }, { "schema": { "type": "string" }, "required": true, "name": "paperId", "in": "query", "example": "2", "index$": 1 }, { "schema": { "type": "string", "enum": ["small", "large"], "default": "large" }, "required": false, "name": "model", "in": "query", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let embedding_ref01_data = Object.values(setup.data.existing.embedding)[0];
        // LOAD
        const embedding_ref01_ent = client.Embedding();
        const embedding_ref01_match_dt0 = {};
        embedding_ref01_match_dt0.id = embedding_ref01_data.id;
        const embedding_ref01_data_dt0 = (await embedding_ref01_ent.load(embedding_ref01_match_dt0)).data();
        (0, node_assert_1.default)(embedding_ref01_data_dt0.id === embedding_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/embedding/EmbeddingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UrantiaPapersSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['embedding01', 'embedding02', 'embedding03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'URANTIA_PAPERS_TEST_EMBEDDING_ENTID': idmap,
        'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
        'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['URANTIA_PAPERS_TEST_EMBEDDING_ENTID'];
    const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['URANTIA_PAPERS_TEST_EMBEDDING_ENTID'];
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
//# sourceMappingURL=EmbeddingEntity.test.js.map