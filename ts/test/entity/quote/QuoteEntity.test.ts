

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


describe('QuoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URANTIA_PAPERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('URANTIA_PAPERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrantiaPapersSDK.test()
    const ent = testsdk.Quote()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URANTIA_PAPERS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quote.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"quote","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["ref","text"],"co":{"id":"POST /quotes/verify","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/quotes/verify","q":{"$action":"verify"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"quotes"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"quote","name__orig":"quote","Name":"Quote","name_":"quote","name-":"quote","NAME":"QUOTE","index$":10}, {"active":true,"entity":"quote","key$":"BasicQuoteFlow","kind":"basic","name":"BasicQuoteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"quote_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Quote', {"POST /quotes/verify":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"text":{"type":"string","minLength":1,"maxLength":2000,"description":"The quoted passage to check. At least 4 words."},"ref":{"type":"string","maxLength":40,"description":"The reference the quote claims, such as \"2:5.1\". Optional. When given, that paragraph is checked too."}},"required":["text"]},"example":{"text":"The Father loves us enough to bestow his life upon us.","ref":"2:5.1"}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const quote_ref01_ent = client.Quote()
    let quote_ref01_data = setup.data.new.quote['quote_ref01']

    quote_ref01_data = (await quote_ref01_ent.create(quote_ref01_data)).data()
    assert(null != quote_ref01_data)


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
      '../../../../.sdk/test/entity/quote/QuoteTestData.json')

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
    ['quote01','quote02','quote03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URANTIA_PAPERS_TEST_QUOTE_ENTID': idmap,
    'URANTIA_PAPERS_TEST_LIVE': 'FALSE',
    'URANTIA_PAPERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URANTIA_PAPERS_TEST_QUOTE_ENTID']

  const live = 'TRUE' === env.URANTIA_PAPERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URANTIA_PAPERS_TEST_QUOTE_ENTID']
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
  
