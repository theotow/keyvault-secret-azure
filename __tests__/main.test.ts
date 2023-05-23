import {apply} from '../src/secret-by-config'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test, jest} from '@jest/globals'
import {SecretClient} from '@azure/keyvault-secrets'

test('can apply secret', async () => {
  const applySecret = jest.fn()
  const secretClient = {
    getSecret: jest.fn(() => Promise.resolve({value: 'testvalue'} as any))
  } as unknown as SecretClient

  // act
  await apply({
    client: secretClient,
    config: JSON.stringify({ENV_NAME: 'keyvaultsecret'}),
    applySecret
  })

  // asset
  expect(applySecret).toBeCalledTimes(1)
  expect(applySecret).toBeCalledWith('ENV_NAME', 'testvalue')
  expect(secretClient.getSecret).toBeCalledWith('keyvaultsecret')
})
