
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UrantiaPapersSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UrantiaPapersSDK.test()
    equal(testsdk instanceof UrantiaPapersSDK, true,
      'UrantiaPapersSDK.test() must return a client synchronously')
  })

})
