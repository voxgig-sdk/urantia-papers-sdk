

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UrantiaPapersSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EmbeddingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Embedding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Embedding().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'embedding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dimensions":{"a":true,"h":"Dimensions","n":"dimensions","r":true,"t":"`$INTEGER`","key$":"dimensions","index$":0},"embedding":{"a":true,"h":"Embedding","n":"embedding","r":true,"t":"`$ARRAY`","key$":"embedding","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"model":{"a":true,"h":"Model","n":"model","r":true,"t":"`$STRING`","key$":"model","index$":3},"standardReferenceId":{"a":true,"h":"Standard Reference Id","n":"standardReferenceId","r":true,"t":"`$STRING`","key$":"standardReferenceId","index$":4}},"id":{"field":"id","name":"id"},"name":"embedding","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /embeddings/{ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2:5.1","k":"param","n":"id","or":"ref","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"large","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/embeddings/{ref}","q":{"exist":["id"]},"r":{"param":{"ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"embeddings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /embeddings/export","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"jsonl","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"large","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"2","k":"query","n":"paper_id","or":"paperId","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/embeddings/export","q":{"$action":"export","exist":["paper_id"]},"r":{},"s":[{"lit":"embeddings"},{"lit":"export"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"embedding","name__orig":"embedding","Name":"Embedding","name_":"embedding","name-":"embedding","NAME":"EMBEDDING","index$":3}, {"active":true,"entity":"embedding","key$":"BasicEmbeddingFlow","kind":"basic","name":"BasicEmbeddingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"embedding_ref01","srcdatavar":"embedding_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-embedding_ref01"}}],"index$":0}]}, 'Embedding', {"GET /embeddings/{ref}":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"ref","in":"path","example":"2:5.1","index$":0},{"schema":{"type":"string","enum":["small","large"],"default":"large"},"required":false,"name":"model","in":"query","index$":1}]},"GET /embeddings/export":{"protocol":"http","parameters":[{"schema":{"type":"string","enum":["jsonl","json"],"default":"jsonl"},"required":false,"name":"format","in":"query","index$":0},{"schema":{"type":"string"},"required":true,"name":"paperId","in":"query","example":"2","index$":1},{"schema":{"type":"string","enum":["small","large"],"default":"large"},"required":false,"name":"model","in":"query","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let embedding_ref01_data = Object.values(setup.data.existing.embedding)[0] as any

    // LOAD
    const embedding_ref01_ent = client.Embedding()
    const embedding_ref01_match_dt0: any = {}
    embedding_ref01_match_dt0.id = embedding_ref01_data.id
    const embedding_ref01_data_dt0 = (await embedding_ref01_ent.load(embedding_ref01_match_dt0)).data()
    assert(embedding_ref01_data_dt0.id === embedding_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/embedding/EmbeddingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UrantiaPapersSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['embedding01','embedding02','embedding03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_EMBEDDING_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_EMBEDDING_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_EMBEDDING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UrantiaPapersSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
