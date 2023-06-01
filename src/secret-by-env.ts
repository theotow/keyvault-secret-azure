import {getSecrets} from './secret-fetch'
import {IContext} from './shared'

type EnvObject = Record<string, string | undefined>

const KEY_PATTERN = /^@@ksa:([0-9\-a-zA-Z]+)$/

export async function apply(context: IContext<EnvObject>): Promise<void> {
  const parsedConfig = filterConfig(context.config)
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

function filterConfig(config: EnvObject): Record<string, string> {
  const outputConfig: Record<string, string> = {}
  return Object.keys(config).reduce((conf, key) => {
    const value = config[key]
    const match = value && value.match(KEY_PATTERN)
    if (match) {
      conf[key] = match[1]
    }

    return conf
  }, outputConfig)
}
