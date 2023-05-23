import {SecretClient} from '@azure/keyvault-secrets'

export interface IContext {
  client: SecretClient
  config: string
  applySecret: (secretEnvName: string, secretValue: string) => void
}
