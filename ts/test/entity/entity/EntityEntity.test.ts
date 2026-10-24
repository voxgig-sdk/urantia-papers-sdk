

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


describe('EntityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Entity()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('entity hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of UrantiaPapersSDK.test(offline).Entity().stream('list')) { }
    }, /offline/)

    for await (const _item of UrantiaPapersSDK.test(offline).Entity()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Entity().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of UrantiaPapersSDK.test().Entity().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Entity().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Entity().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Entity().list({"lang":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aliases":{"a":true,"h":"Aliases","n":"aliases","r":true,"t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"aliases","index$":0},"citationCount":{"a":true,"h":"Citation Count","n":"citationCount","r":true,"sh":"Number of citations in the source index.","t":"`$INTEGER`","key$":"citationCount","index$":1},"description":{"a":true,"h":"Description","n":"description","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":5},"seeAlso":{"a":true,"h":"See Also","n":"seeAlso","r":true,"sh":"Related entry names.","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"seeAlso","index$":6},"sense":{"a":true,"h":"Sense","n":"sense","r":true,"sh":"For a concept with a lowercase name: \"special\" when the papers coin the word or use it in their own sense, \"ordinary\" when they use it in its everyday sense.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sense","index$":7},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":8}},"id":{"field":"id","name":"id"},"name":"entity","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /entities/{id}/paragraphs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"michael-of-nebadon","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2}]},"k":"http","m":"GET","o":"/entities/{id}/paragraphs","q":{"$action":"paragraph","exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"entities"},{"var":"id"},{"lit":"paragraphs"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /entities","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/entities","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"entities"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /entities/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"michael-of-nebadon","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/entities/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"entities"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"entity","name__orig":"entity","Name":"Entity","name_":"entity","name-":"entity","NAME":"ENTITY","index$":4}, {"active":true,"entity":"entity","key$":"BasicEntityFlow","kind":"basic","name":"BasicEntityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"entity_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"entity_ref01","srcdatavar":"entity_ref01_data","suffix":"_dt0"},"m":{"id":"entity01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entity_ref01"}}],"index$":1}]}, 'Entity', {"GET /entities/{id}/paragraphs":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"id","in":"path","example":"michael-of-nebadon","index$":0},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":1},{"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"required":false,"name":"limit","in":"query","index$":2},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":3}]},"GET /entities":{"protocol":"http","parameters":[{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":0},{"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"required":false,"name":"limit","in":"query","index$":1},{"schema":{"type":"string","enum":["being","place","order","race","religion","concept"]},"required":false,"name":"type","in":"query","index$":2},{"schema":{"type":"string","maxLength":200},"required":false,"name":"q","in":"query","index$":3},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":4}]},"GET /entities/{id}":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"id","in":"path","example":"michael-of-nebadon","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entity_ref01_data = Object.values(setup.data.existing.entity)[0] as any

    // LIST
    const entity_ref01_ent = client.Entity()
    const entity_ref01_match: any = {}

    const entity_ref01_list = (await entity_ref01_ent.list(entity_ref01_match)).map((e: any) => e.data())


    // LOAD
    const entity_ref01_match_dt0: any = {}
    entity_ref01_match_dt0.id = entity_ref01_data.id
    const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data()
    assert(entity_ref01_data_dt0.id === entity_ref01_data.id)


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
      '../../../../.sdk/test/entity/entity/EntityTestData.json')

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
    ['entity01','entity02','entity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_ENTITY_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_ENTITY_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_ENTITY_ENTID']
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
  
