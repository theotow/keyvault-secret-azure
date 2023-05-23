import * as core from '@actions/core'
import * as secretByConfig from './secret-by-config'
import {getClient} from './secret-client'

async function run(): Promise<void> {
  try {
    const keyVaultName = core.getInput('key-vault-name', {required: true})
    const keyVaultClient = getClient({keyVaultName})
    const config: string = core.getInput('config', {required: true})
    const applySecret = (secretEnvName: string, secretValue: string): void => {
      core.exportVariable(secretEnvName, secretValue)
      core.setSecret(secretValue)
    }
    await secretByConfig.apply({client: keyVaultClient, config, applySecret})
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
