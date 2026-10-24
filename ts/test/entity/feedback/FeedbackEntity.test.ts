

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


describe('FeedbackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Feedback()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UrantiaPapersSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Feedback().create({"category":1,"message":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'feedback.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"t":"`$STRING`","key$":"category","index$":0},"client":{"a":true,"h":"Client","n":"client","r":false,"t":"`$STRING`","key$":"client","index$":1},"contact":{"a":true,"h":"Contact","n":"contact","r":false,"t":"`$STRING`","key$":"contact","index$":2},"endpoint":{"a":true,"h":"Endpoint","n":"endpoint","r":false,"t":"`$STRING`","key$":"endpoint","index$":3},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":4},"pageUrl":{"a":true,"fo":"uri","h":"Page Url","n":"pageUrl","r":false,"t":"`$STRING`","key$":"pageUrl","index$":5},"ref":{"a":true,"h":"Ref","n":"ref","r":false,"t":"`$STRING`","key$":"ref","index$":6},"requestId":{"a":true,"h":"Request Id","n":"requestId","r":false,"t":"`$STRING`","key$":"requestId","index$":7}},"name":"feedback","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["category","client","contact","endpoint","message","pageUrl","ref","requestId"],"co":{"id":"POST /feedback","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/feedback","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"feedback"}],"t":{"req":{"category":"`reqdata.category`","client":"`reqdata.client`","contact":"`reqdata.contact`","endpoint":"`reqdata.endpoint`","message":"`reqdata.message`","pageUrl":"`reqdata.page_url`","ref":"`reqdata.ref`","requestId":"`reqdata.request_id`"},"res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"feedback","name__orig":"feedback","Name":"Feedback","name_":"feedback","name-":"feedback","NAME":"FEEDBACK","index$":5}, {"active":true,"entity":"feedback","key$":"BasicFeedbackFlow","kind":"basic","name":"BasicFeedbackFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"feedback_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Feedback', {"POST /feedback":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"category":{"type":"string","enum":["bug","docs","api","product","other"],"key$":"category"},"message":{"type":"string","minLength":1,"maxLength":4000,"key$":"message"},"ref":{"type":"string","maxLength":200,"key$":"ref"},"endpoint":{"type":"string","maxLength":300,"key$":"endpoint"},"requestId":{"type":"string","maxLength":100,"key$":"requestId"},"client":{"type":"string","maxLength":100,"key$":"client"},"contact":{"type":"string","maxLength":200,"key$":"contact"},"pageUrl":{"type":"string","maxLength":500,"format":"uri","key$":"pageUrl"}},"required":["category","message"],"additionalProperties":false,"index$":1},"example":{"category":"docs","message":"The quickstart does not say that q is required for /search.","endpoint":"/search"}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const feedback_ref01_ent = client.Feedback()
    let feedback_ref01_data = setup.data.new.feedback['feedback_ref01']

    feedback_ref01_data = (await feedback_ref01_ent.create(feedback_ref01_data)).data()
    assert(null != feedback_ref01_data)


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
      '../../../../.sdk/test/entity/feedback/FeedbackTestData.json')

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
    ['feedback01','feedback02','feedback03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_FEEDBACK_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_FEEDBACK_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_FEEDBACK_ENTID']
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
  
