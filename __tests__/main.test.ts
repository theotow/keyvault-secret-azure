import * as byConfig from '../src/secret-by-config'
import * as byEnv from '../src/secret-by-env'
import {expect, test, jest} from '@jest/globals'
import {SecretClient} from '@azure/keyvault-secrets'

test('can apply secret by config', async () => {
  const applySecret = jest.fn()
  const secretClient = {
    getSecret: jest.fn(() => Promise.resolve({value: 'testvalue'} as any))
  } as unknown as SecretClient

  // act
  await byConfig.apply({
    client: secretClient,
    config: JSON.stringify({ENV_NAME: 'keyvaultsecret'}),
    applySecret
  })

  // asset
  expect(applySecret).toBeCalledTimes(1)
  expect(applySecret).toBeCalledWith('ENV_NAME', 'testvalue')
  expect(secretClient.getSecret).toBeCalledWith('keyvaultsecret')
})

test('can apply secret by env', async () => {
  const applySecret = jest.fn()
  const secretClient = {
    getSecret: jest.fn(() => Promise.resolve({value: 'testvalue'} as any))
  } as unknown as SecretClient

  // act
  await byEnv.apply({
    client: secretClient,
    config: {ENV_NAME: '@@ksa:keyvaultsecret', WHATEVER: 'more'},
    applySecret
  })

  // asset
  expect(applySecret).toBeCalledTimes(1)
  expect(applySecret).toBeCalledWith('ENV_NAME', 'testvalue')
  expect(secretClient.getSecret).toBeCalledWith('keyvaultsecret')
})
