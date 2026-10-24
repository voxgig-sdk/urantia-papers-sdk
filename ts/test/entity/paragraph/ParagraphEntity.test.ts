

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


describe('ParagraphEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Paragraph()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Paragraph().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'paragraph.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"navigation":{"a":true,"h":"Navigation","n":"navigation","r":true,"t":"`$OBJECT`","key$":"navigation","index$":2}},"id":{"field":"id","name":"id"},"name":"paragraph","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /paragraphs/{ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2:5.1","k":"param","n":"id","or":"ref","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"default","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/paragraphs/{ref}","q":{"exist":["id"]},"r":{"param":{"ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"paragraphs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /paragraphs/{ref}/context","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2:5.1","k":"param","n":"ref","or":"ref","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"default","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":2,"k":"query","n":"window","or":"window","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/paragraphs/{ref}/context","q":{"$action":"context","exist":["ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"paragraphs"},{"var":"ref"},{"lit":"context"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /paragraphs/random","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"default","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"eng","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"max_length","or":"maxLength","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"min_length","or":"minLength","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/paragraphs/random","q":{"$action":"random"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"paragraphs"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"paragraph","name__orig":"paragraph","Name":"Paragraph","name_":"paragraph","name-":"paragraph","NAME":"PARAGRAPH","index$":9}, {"active":true,"entity":"paragraph","key$":"BasicParagraphFlow","kind":"basic","name":"BasicParagraphFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"paragraph_ref01","srcdatavar":"paragraph_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-paragraph_ref01"}}],"index$":0}]}, 'Paragraph', {"GET /paragraphs/{ref}":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"ref","in":"path","example":"2:5.1","index$":0},{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":1},{"schema":{"type":"string","enum":["default","rag"],"default":"default"},"required":false,"name":"format","in":"query","index$":2},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":3}]},"GET /paragraphs/{ref}/context":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":true,"name":"ref","in":"path","example":"2:5.1","index$":0},{"schema":{"type":"integer","minimum":1,"maximum":10,"default":2},"required":false,"name":"window","in":"query","index$":1},{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":2},{"schema":{"type":"string","enum":["default","rag"],"default":"default"},"required":false,"name":"format","in":"query","index$":3},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":4}]},"GET /paragraphs/random":{"protocol":"http","parameters":[{"schema":{"type":"string"},"required":false,"name":"include","in":"query","index$":0},{"schema":{"type":"string","enum":["default","rag"],"default":"default"},"required":false,"name":"format","in":"query","index$":1},{"schema":{"type":"string","enum":["eng","es","fr","pt","de","ko"],"default":"eng","description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text."},"required":false,"description":"Language for translated fields. Entity names exist in es, fr, pt, de, and ko. Spanish paragraph text exists for part of the papers: a machine translation, released as CC0, with a `translation` label on each paragraph. Other paragraphs stay in English. Paper, section, and part titles follow the same papers; the topic labels stay in English. Each paragraph has a `language` field that states the language of its text.","name":"lang","in":"query","index$":2},{"schema":{"type":"integer","minimum":1},"required":false,"name":"minLength","in":"query","index$":3},{"schema":{"type":"integer","minimum":1},"required":false,"name":"maxLength","in":"query","index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let paragraph_ref01_data = Object.values(setup.data.existing.paragraph)[0] as any

    // LOAD
    const paragraph_ref01_ent = client.Paragraph()
    const paragraph_ref01_match_dt0: any = {}
    paragraph_ref01_match_dt0.id = paragraph_ref01_data.id
    const paragraph_ref01_data_dt0 = (await paragraph_ref01_ent.load(paragraph_ref01_match_dt0)).data()
    assert(paragraph_ref01_data_dt0.id === paragraph_ref01_data.id)


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
      '../../../../.sdk/test/entity/paragraph/ParagraphTestData.json')

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
    ['paragraph01','paragraph02','paragraph03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_PARAGRAPH_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_PARAGRAPH_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_PARAGRAPH_ENTID']
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
  
