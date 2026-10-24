

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


describe('ScriptureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Scripture()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('scripture hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of UrantiaPapersSDK.test(offline).Scripture().stream('list')) { }
    }, /offline/)

    for await (const _item of UrantiaPapersSDK.test(offline).Scripture()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = UrantiaPapersSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Scripture().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of UrantiaPapersSDK.test().Scripture().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new UrantiaPapersSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Scripture().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Scripture().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Scripture().list({"consensus":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scripture.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"chunk":{"a":true,"h":"Chunk","n":"chunk","r":true,"t":"`$OBJECT`","key$":"chunk","index$":0},"closest":{"a":true,"h":"Closest","n":"closest","r":true,"t":"`$ARRAY`","key$":"closest","index$":1},"consensus":{"a":true,"h":"Consensus","n":"consensus","r":true,"sh":"Mean percentile across the texts, 0 to 1","t":"`$NUMBER`","key$":"consensus","index$":2},"corpus":{"a":true,"h":"Corpus","n":"corpus","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Corpus id, slug, or ref prefix, e.g.","t":"`$OBJECT`","key$":"corpus","index$":3},"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$ARRAY`","key$":"data","index$":4},"distance":{"a":true,"h":"Distance","n":"distance","r":true,"sh":"1 minus the highest percentile, 0 to 1","t":"`$NUMBER`","key$":"distance","index$":5},"divisionLabel":{"a":true,"h":"Division Label","n":"divisionLabel","r":true,"t":"`$STRING`","key$":"divisionLabel","index$":6},"divisions":{"a":true,"h":"Divisions","n":"divisions","r":true,"t":"`$ARRAY`","key$":"divisions","index$":7},"gap":{"a":true,"h":"Gap","n":"gap","r":true,"sh":"How far this text's percentile is above the paragraph's mean across texts","t":"`$NUMBER`","key$":"gap","index$":8},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":9},"license":{"a":true,"h":"License","n":"license","r":true,"t":"`$STRING`","key$":"license","index$":10},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"t":"`$INTEGER`","key$":"limit","index$":11},"meta":{"a":true,"h":"Meta","n":"meta","r":true,"t":"`$OBJECT`","key$":"meta","index$":12},"notes":{"a":true,"h":"Notes","n":"notes","r":true,"sh":"How the text is numbered or selected","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"notes","index$":13},"page":{"a":true,"h":"Page","n":"page","r":false,"t":"`$INTEGER`","key$":"page","index$":14},"pages":{"a":true,"h":"Pages","n":"pages","r":true,"sh":"The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels.","t":"`$ARRAY`","key$":"pages","index$":15},"paragraph":{"a":true,"h":"Paragraph","n":"paragraph","r":true,"t":"`$OBJECT`","key$":"paragraph","index$":16},"passage":{"a":true,"h":"Passage","n":"passage","r":true,"t":"`$OBJECT`","key$":"passage","index$":17},"passageCount":{"a":true,"h":"Passage Count","n":"passageCount","r":true,"t":"`$INTEGER`","key$":"passageCount","index$":18},"passages":{"a":true,"h":"Passages","n":"passages","r":true,"t":"`$ARRAY`","key$":"passages","index$":19},"percentile":{"a":true,"h":"Percentile","n":"percentile","r":true,"t":"`$NUMBER`","key$":"percentile","index$":20},"q":{"a":true,"h":"Q","n":"q","r":true,"t":"`$STRING`","key$":"q","index$":21},"refLevels":{"a":true,"h":"Ref Levels","n":"refLevels","r":true,"sh":"Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5`","t":"`$INTEGER`","key$":"refLevels","index$":22},"refPrefix":{"a":true,"h":"Ref Prefix","n":"refPrefix","r":true,"t":"`$STRING`","key$":"refPrefix","index$":23},"religion":{"a":true,"h":"Religion","n":"religion","r":true,"t":"`$STRING`","key$":"religion","index$":24},"similarity":{"a":true,"h":"Similarity","n":"similarity","r":true,"sh":"text-embedding-3-large cosine similarity","t":"`$NUMBER`","key$":"similarity","index$":25},"similaritySmall":{"a":true,"h":"Similarity Small","n":"similaritySmall","r":true,"sh":"text-embedding-3-small cosine similarity","t":"`$NUMBER`","key$":"similaritySmall","index$":26},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":27},"sourceUrl":{"a":true,"h":"Source Url","n":"sourceUrl","r":true,"t":"`$STRING`","key$":"sourceUrl","index$":28},"textsClose":{"a":true,"h":"Texts Close","n":"textsClose","r":true,"sh":"Texts that have this paragraph in their top 10%","t":"`$INTEGER`","key$":"textsClose","index$":29},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":30},"translator":{"a":true,"h":"Translator","n":"translator","r":true,"t":"`$STRING`","key$":"translator","index$":31},"unitLabel":{"a":true,"h":"Unit Label","n":"unitLabel","r":true,"t":"`$STRING`","key$":"unitLabel","index$":32},"urantiaParallelLimit":{"a":true,"h":"Urantia Parallel Limit","n":"urantiaParallelLimit","r":false,"t":"`$INTEGER`","key$":"urantiaParallelLimit","index$":33},"urantiaParallels":{"a":true,"h":"Urantia Parallels","n":"urantiaParallels","r":true,"t":"`$ARRAY`","key$":"urantiaParallels","index$":34},"urantiaSection":{"a":true,"h":"Urantia Section","n":"urantiaSection","r":true,"sh":"The Paper 131 section headed with this religion, or null when Paper 131 has no such heading","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"urantiaSection","index$":35},"year":{"a":true,"h":"Year","n":"year","r":true,"t":"`$INTEGER`","key$":"year","index$":36}},"id":{"field":"id","name":"id"},"name":"scripture","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["corpus","limit","page","q","urantiaParallelLimit"],"co":{"id":"POST /scriptures/search/semantic","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/scriptures/search/semantic","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"lit":"search"},{"lit":"semantic"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /scriptures","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/scriptures","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /scriptures/insights/far","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":200,"k":"query","n":"min_length","or":"minLength","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"a":true,"ex":"2","k":"query","n":"paper_id","or":"paperId","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":3},{"a":true,"k":"query","n":"part_id","or":"partId","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/scriptures/insights/far","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"lit":"insights"},{"lit":"far"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /scriptures/insights/leans","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"corpus","or":"corpus","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"exclude_bible","or":"excludeBible","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":200,"k":"query","n":"min_length","or":"minLength","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":3},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":4}]},"k":"http","m":"GET","o":"/scriptures/insights/leans","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"lit":"insights"},{"lit":"leans"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"a":true,"co":{"id":"GET /scriptures/insights/pairs","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"corpus","or":"corpus","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"exclude_bible","or":"excludeBible","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":200,"k":"query","n":"min_length","or":"minLength","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":3},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":4}]},"k":"http","m":"GET","o":"/scriptures/insights/pairs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"lit":"insights"},{"lit":"pairs"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3},{"a":true,"co":{"id":"GET /scriptures/insights/shared-currents","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":200,"k":"query","n":"min_length","or":"minLength","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":1},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"a":true,"ex":"2","k":"query","n":"paper_id","or":"paperId","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":3},{"a":true,"k":"query","n":"part_id","or":"partId","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/scriptures/insights/shared-currents","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"lit":"insights"},{"lit":"shared-currents"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":4}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /scriptures/{corpus}/{ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bhagavad-gita","k":"param","n":"corpus","or":"corpus","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"2.47","k":"param","n":"ref","or":"ref","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/scriptures/{corpus}/{ref}","q":{"exist":["corpus","ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"var":"corpus"},{"var":"ref"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /scriptures/{corpus}/{ref}/urantia-parallels","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bhagavad-gita","k":"param","n":"corpus","or":"corpus","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"2.47","k":"param","n":"ref","or":"ref","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/scriptures/{corpus}/{ref}/urantia-parallels","q":{"exist":["corpus","ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"var":"corpus"},{"var":"ref"},{"lit":"urantia-parallels"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /scriptures/{corpus}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bhagavad-gita","k":"param","n":"id","or":"corpus","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/scriptures/{corpus}","q":{"exist":["id"]},"r":{"param":{"corpus":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"scriptures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"scripture","name__orig":"scripture","Name":"Scripture","name_":"scripture","name-":"scripture","NAME":"SCRIPTURE","index$":11}, {"active":true,"entity":"scripture","key$":"BasicScriptureFlow","kind":"basic","name":"BasicScriptureFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"scripture_ref01"},"m":{"corpus":"corpus01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"scripture_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"scripture_ref01","srcdatavar":"scripture_ref01_data","suffix":"_dt0"},"m":{"id":"scripture01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-scripture_ref01"}}],"index$":2}]}, 'Scripture', {"POST /scriptures/search/semantic":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"q":{"type":"string","minLength":1,"maxLength":2000,"key$":"q"},"corpus":{"type":"string","minLength":1,"maxLength":64,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`","key$":"corpus"},"page":{"type":"integer","minimum":0,"default":0,"key$":"page"},"limit":{"type":"integer","minimum":1,"maximum":50,"default":10,"key$":"limit"},"urantiaParallelLimit":{"type":"integer","minimum":0,"maximum":10,"default":3,"key$":"urantiaParallelLimit"}},"required":["q"],"index$":1},"example":{"q":"hatred ceases by love","limit":2,"urantiaParallelLimit":1}}}},"parameters":[]},"GET /scriptures":{"protocol":"http","parameters":[]},"GET /scriptures/insights/far":{"protocol":"http","parameters":[{"schema":{"type":["integer","null"],"minimum":0,"maximum":196},"required":false,"name":"paperId","in":"query","example":"2","index$":0},{"schema":{"type":"integer","minimum":1,"maximum":4},"required":false,"name":"partId","in":"query","index$":1},{"schema":{"type":["integer","null"],"minimum":0,"maximum":2000,"default":200,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably"},"required":false,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably","name":"minLength","in":"query","index$":2},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":3},{"schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"required":false,"name":"limit","in":"query","index$":4}]},"GET /scriptures/insights/leans":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":64,"description":"A corpus id, slug, or ref prefix, or `bible`"},"required":false,"description":"A corpus id, slug, or ref prefix, or `bible`","name":"corpus","in":"query","index$":0},{"schema":{"type":"string","enum":["true","false"],"description":"`true` leaves out the Bible, which has most of the mutual pairs"},"required":false,"description":"`true` leaves out the Bible, which has most of the mutual pairs","name":"excludeBible","in":"query","index$":1},{"schema":{"type":["integer","null"],"minimum":0,"maximum":2000,"default":200,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably"},"required":false,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably","name":"minLength","in":"query","index$":2},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":3},{"schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"required":false,"name":"limit","in":"query","index$":4}]},"GET /scriptures/insights/pairs":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":64,"description":"A corpus id, slug, or ref prefix, or `bible`"},"required":false,"description":"A corpus id, slug, or ref prefix, or `bible`","name":"corpus","in":"query","index$":0},{"schema":{"type":"string","enum":["true","false"],"description":"`true` leaves out the Bible, which has most of the mutual pairs"},"required":false,"description":"`true` leaves out the Bible, which has most of the mutual pairs","name":"excludeBible","in":"query","index$":1},{"schema":{"type":["integer","null"],"minimum":0,"maximum":2000,"default":200,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably"},"required":false,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably","name":"minLength","in":"query","index$":2},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":3},{"schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"required":false,"name":"limit","in":"query","index$":4}]},"GET /scriptures/insights/shared-currents":{"protocol":"http","parameters":[{"schema":{"type":["integer","null"],"minimum":0,"maximum":196},"required":false,"name":"paperId","in":"query","example":"2","index$":0},{"schema":{"type":"integer","minimum":1,"maximum":4},"required":false,"name":"partId","in":"query","index$":1},{"schema":{"type":["integer","null"],"minimum":0,"maximum":2000,"default":200,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably"},"required":false,"description":"Leave out paragraphs shorter than this many characters. Headings and fragments score unreliably","name":"minLength","in":"query","index$":2},{"schema":{"type":["integer","null"],"minimum":0,"default":0},"required":false,"name":"page","in":"query","index$":3},{"schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"required":false,"name":"limit","in":"query","index$":4}]},"GET /scriptures/{corpus}/{ref}":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":64,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`"},"required":true,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`","name":"corpus","in":"path","example":"bhagavad-gita","index$":0},{"schema":{"type":"string","minLength":1,"maxLength":32,"description":"A passage (`2.47`, `BG 2.47`, `Dhp 183`, `Epictetus 3.22.5`), a short range (`2.47-49`), or a whole chapter (`2`)"},"required":true,"description":"A passage (`2.47`, `BG 2.47`, `Dhp 183`, `Epictetus 3.22.5`), a short range (`2.47-49`), or a whole chapter (`2`)","name":"ref","in":"path","example":"2.47","index$":1}]},"GET /scriptures/{corpus}/{ref}/urantia-parallels":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":64,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`"},"required":true,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`","name":"corpus","in":"path","example":"bhagavad-gita","index$":0},{"schema":{"type":"string","minLength":1,"maxLength":32,"description":"A passage (`2.47`, `BG 2.47`, `Dhp 183`, `Epictetus 3.22.5`), a short range (`2.47-49`), or a whole chapter (`2`)"},"required":true,"description":"A passage (`2.47`, `BG 2.47`, `Dhp 183`, `Epictetus 3.22.5`), a short range (`2.47-49`), or a whole chapter (`2`)","name":"ref","in":"path","example":"2.47","index$":1}]},"GET /scriptures/{corpus}":{"protocol":"http","parameters":[{"schema":{"type":"string","minLength":1,"maxLength":64,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`"},"required":true,"description":"Corpus id, slug, or ref prefix, e.g. `bhagavad-gita`, `bg`, or `dhammapada`","name":"corpus","in":"path","example":"bhagavad-gita","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const scripture_ref01_ent = client.Scripture()
    let scripture_ref01_data = setup.data.new.scripture['scripture_ref01']
    scripture_ref01_data['corpus'] = setup.idmap['corpus01']

    scripture_ref01_data = (await scripture_ref01_ent.create(scripture_ref01_data)).data()
    assert(null != scripture_ref01_data.id)


    // LIST
    const scripture_ref01_match: any = {}

    const scripture_ref01_list = (await scripture_ref01_ent.list(scripture_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(scripture_ref01_list, { id: scripture_ref01_data.id })))


    // LOAD
    const scripture_ref01_match_dt0: any = {}
    scripture_ref01_match_dt0.id = scripture_ref01_data.id
    const scripture_ref01_data_dt0 = (await scripture_ref01_ent.load(scripture_ref01_match_dt0)).data()
    assert(scripture_ref01_data_dt0.id === scripture_ref01_data.id)


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
      '../../../../.sdk/test/entity/scripture/ScriptureTestData.json')

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
    ['scripture01','scripture02','scripture03','corpus01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_SCRIPTURE_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_SCRIPTURE_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_SCRIPTURE_ENTID']
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
  
