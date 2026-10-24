

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('search hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of UrantiaPapersSDK.test(offline).Search().stream('list')) { }
    }, /offline/)

    for await (const _item of UrantiaPapersSDK.test(offline).Search()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Search().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of UrantiaPapersSDK.test().Search().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Search().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Search().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Search().list({"include":1,"q":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"audio":{"a":true,"h":"Audio","n":"audio","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"audio","index$":0},"bibleParallels":{"a":true,"h":"Bible Parallels","n":"bibleParallels","r":false,"t":"`$ARRAY`","key$":"bibleParallels","index$":1},"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$ARRAY`","key$":"data","index$":2},"entities":{"a":true,"h":"Entities","n":"entities","r":false,"t":"`$ARRAY`","key$":"entities","index$":3},"htmlText":{"a":true,"h":"Html Text","n":"htmlText","r":true,"t":"`$STRING`","key$":"htmlText","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"include":{"a":true,"h":"Include","n":"include","r":false,"t":"`$STRING`","key$":"include","index$":6},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"labels","index$":7},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":8},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"t":"`$INTEGER`","key$":"limit","index$":9},"match":{"a":true,"h":"Match","n":"match","r":true,"sh":"How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words).","t":"`$STRING`","key$":"match","index$":10},"meta":{"a":true,"h":"Meta","n":"meta","r":true,"t":"`$OBJECT`","key$":"meta","index$":11},"page":{"a":true,"h":"Page","n":"page","r":false,"t":"`$INTEGER`","key$":"page","index$":12},"paperId":{"a":true,"h":"Paper Id","n":"paperId","op":{"list":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"paperId","index$":13},"paperTitle":{"a":true,"h":"Paper Title","n":"paperTitle","r":true,"t":"`$STRING`","key$":"paperTitle","index$":14},"paragraphId":{"a":true,"h":"Paragraph Id","n":"paragraphId","r":true,"t":"`$STRING`","key$":"paragraphId","index$":15},"partId":{"a":true,"h":"Part Id","n":"partId","op":{"list":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"partId","index$":16},"q":{"a":true,"h":"Q","n":"q","r":true,"t":"`$STRING`","key$":"q","index$":17},"rank":{"a":true,"h":"Rank","n":"rank","r":true,"t":"`$NUMBER`","key$":"rank","index$":18},"scriptureParallels":{"a":true,"h":"Scripture Parallels","n":"scriptureParallels","r":false,"t":"`$ARRAY`","key$":"scriptureParallels","index$":19},"scriptureScores":{"a":true,"h":"Scripture Scores","n":"scriptureScores","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"scriptureScores","index$":20},"sectionId":{"a":true,"h":"Section Id","n":"sectionId","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sectionId","index$":21},"sectionTitle":{"a":true,"h":"Section Title","n":"sectionTitle","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sectionTitle","index$":22},"sortId":{"a":true,"h":"Sort Id","n":"sortId","r":true,"t":"`$STRING`","key$":"sortId","index$":23},"standardReferenceId":{"a":true,"h":"Standard Reference Id","n":"standardReferenceId","r":true,"t":"`$STRING`","key$":"standardReferenceId","index$":24},"text":{"a":true,"h":"Text","n":"text","r":true,"t":"`$STRING`","key$":"text","index$":25},"translation":{"a":true,"h":"Translation","n":"translation","r":true,"sh":"Present only when the text is a translation: a machine made it, and it is released as CC0.","t":"`$OBJECT`","key$":"translation","index$":26},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":27},"urantiaParallels":{"a":true,"h":"Urantia Parallels","n":"urantiaParallels","r":false,"t":"`$ARRAY`","key$":"urantiaParallels","index$":28}},"id":{"field":"id","name":"id"},"name":"search","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["include","limit","page","paperId","partId","q","type"],"co":{"id":"POST /search","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/search","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["include","limit","page","paperId","partId","q"],"co":{"id":"POST /search/semantic","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/search/semantic","q":{"$action":"semantic"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"semantic"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"a":true,"ex":"2","k":"query","n":"paper_id","or":"paperId","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"part_id","or":"partId","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"love","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":5},{"a":true,"ex":"auto","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /search/semantic","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"a":true,"ex":"2","k":"query","n":"paper_id","or":"paperId","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"part_id","or":"partId","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"love","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/search/semantic","q":{"$action":"semantic","exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"semantic"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":12}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"search_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":1}]}, 'Search', {"POST /search":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"q":{"type":"string","minLength":1,"maxLength":500,"key$":"q"},"page":{"type":"integer","minimum":0,"default":0,"key$":"page"},"limit":{"type":"integer","minimum":1,"maximum":100,"default":20,"key$":"limit"},"paperId":{"type":"string","key$":"paperId"},"partId":{"type":"string","key$":"partId"},"type":{"type":"string","enum":["auto","phrase","and","or"],"default":"auto","key$":"type"},"include":{"type":"string","key$":"include"}},"required":["q"],"index$":1},"example":{"q":"Thought Adjuster","limit":2}}}},"parameters":[]},"POST /search/semantic":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"q":{"type":"string","minLength":1,"maxLength":2000},"page":{"type":"integer","minimum":0,"default":0},"limit":{"type":"integer","minimum":1,"maximum":100,"default":20},"paperId":{"type":"string"},"partId":{"type":"string"},"include":{"type":"string"}},"required":["q"]},"example":{"q":"what happens after death","limit":2}}}},"parameters":[]},"GET /search":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":500},"required":true,"name":"q","in":"query","example":"love","index$":0},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":1},{"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"required":false,"name":"limit","in":"query","index$":2},{"schema":{"type":"string"},"required":false,"name":"paperId","in":"query","example":"2","index$":3},{"schema":{"type":"string"},"required":false,"name":"partId","in":"query","index$":4},{"schema":{"type":"string","enum":["auto","phrase","and","or"],"default":"auto"},"required":false,"name":"type","in":"query","index$":5},{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":6}]},"GET /search/semantic":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":2000},"required":true,"name":"q","in":"query","example":"love","index$":0},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":1},{"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"required":false,"name":"limit","in":"query","index$":2},{"schema":{"type":"string"},"required":false,"name":"paperId","in":"query","example":"2","index$":3},{"schema":{"type":"string"},"required":false,"name":"partId","in":"query","index$":4},{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const search_ref01_ent = client.Search()
    let search_ref01_data = setup.data.new.search['search_ref01']

    search_ref01_data = (await search_ref01_ent.create(search_ref01_data)).data()
    assert(null != search_ref01_data.id)


    // LIST
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(search_ref01_list, { id: search_ref01_data.id })))


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
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_SEARCH_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_SEARCH_ENTID']
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
  
