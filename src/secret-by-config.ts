import {getSecrets} from './secret-fetch'
import {IContext} from './shared'

export async function apply(context: IContext): Promise<void> {
  const parsedConfig = parseConfig(context.config)
  const resolvedSecrets = await getSecrets(
    context.client,
    Object.values(parsedConfig)
  )
  for (const secretEnvName of Object.keys(parsedConfig)) {
    const secretValue = resolvedSecrets.get(parsedConfig[secretEnvName])
    if (!secretValue) {
      throw new Error(`secret:${secretEnvName} does not have value`)
    }
    // set secret
    context.applySecret(secretEnvName, secretValue)
  }
}

function parseConfig(config: string): Record<string, string> {
  try {
    const parsedConfig: Record<string, string> = JSON.parse(config)
    return parsedConfig
  } catch (e) {
    throw new Error('parsing config failed')
  }
}
