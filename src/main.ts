import * as core from '@actions/core'
import * as secretByConfig from './secret-by-config'
import * as secretByEnv from './secret-by-env'
import {getClient} from './secret-client'

async function run(): Promise<void> {
  try {
    const keyVaultName = core.getInput('key-vault-name', {required: true})
    const keyVaultClient = getClient({keyVaultName})
    const config: string = core.getInput('config', {required: true})
    const configEnv = process.env
    const applySecret = (secretEnvName: string, secretValue: string): void => {
      core.exportVariable(secretEnvName, secretValue)
      core.setSecret(secretValue)
    }
    await secretByConfig.apply({client: keyVaultClient, config, applySecret})
    await secretByEnv.apply({
      client: keyVaultClient,
      config: configEnv,
      applySecret
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
