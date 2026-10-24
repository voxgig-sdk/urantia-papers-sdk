

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


describe('PaperEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Paper()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('paper hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of UrantiaPapersSDK.test(offline).Paper().stream('list')) { }
    }, /offline/)

    for await (const _item of UrantiaPapersSDK.test(offline).Paper()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Paper().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of UrantiaPapersSDK.test().Paper().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Paper().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Paper().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Paper().list({"format":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'paper.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":0},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"labels","index$":1},"paper":{"a":true,"h":"Paper","n":"paper","r":true,"t":"`$OBJECT`","key$":"paper","index$":2},"paragraphs":{"a":true,"h":"Paragraphs","n":"paragraphs","r":true,"t":"`$ARRAY`","key$":"paragraphs","index$":3},"partId":{"a":true,"h":"Part Id","n":"partId","r":true,"t":"`$STRING`","key$":"partId","index$":4},"sortId":{"a":true,"h":"Sort Id","n":"sortId","r":true,"t":"`$STRING`","key$":"sortId","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":6},"topEntities":{"a":true,"h":"Top Entities","n":"topEntities","r":false,"t":"`$ARRAY`","key$":"topEntities","index$":7},"video":{"a":true,"h":"Video","n":"video","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"video","index$":8}},"id":{"field":"id","name":"id"},"name":"paper","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /papers/{id}/sections","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/papers/{id}/sections","q":{"$action":"section","exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"papers"},{"var":"id"},{"lit":"sections"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /papers","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"default","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/papers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"papers"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /papers/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"default","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/papers/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"papers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"paper","name__orig":"paper","Name":"Paper","name_":"paper","name-":"paper","NAME":"PAPER","index$":8}, {"active":true,"entity":"paper","key$":"BasicPaperFlow","kind":"basic","name":"BasicPaperFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"paper_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"paper_ref01","srcdatavar":"paper_ref01_data","suffix":"_dt0"},"m":{"id":"paper01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-paper_ref01"}}],"index$":1}]}, 'Paper', {"GET /papers/{id}/sections":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"id","in":"path","example":"1","index$":0},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":1}]},"GET /papers":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":0},{"schema":{"type":"string","enum":["default","rag"],"default":"default"},"required":false,"name":"format","in":"query","index$":1},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":2}]},"GET /papers/{id}":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"id","in":"path","example":"1","index$":0},{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":1},{"schema":{"type":"string","enum":["default","rag"],"default":"default"},"required":false,"name":"format","in":"query","index$":2},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let paper_ref01_data = Object.values(setup.data.existing.paper)[0] as any

    // LIST
    const paper_ref01_ent = client.Paper()
    const paper_ref01_match: any = {}

    const paper_ref01_list = (await paper_ref01_ent.list(paper_ref01_match)).map((e: any) => e.data())


    // LOAD
    const paper_ref01_match_dt0: any = {}
    paper_ref01_match_dt0.id = paper_ref01_data.id
    const paper_ref01_data_dt0 = (await paper_ref01_ent.load(paper_ref01_match_dt0)).data()
    assert(paper_ref01_data_dt0.id === paper_ref01_data.id)


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
      '../../../../.sdk/test/entity/paper/PaperTestData.json')

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
    ['paper01','paper02','paper03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_PAPER_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_PAPER_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_PAPER_ENTID']
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
  
