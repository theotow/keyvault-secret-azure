import {SecretClient} from '@azure/keyvault-secrets'

export interface IContext<Config> {
  client: SecretClient
  config: Config
  applySecret: (secretEnvName: string, secretValue: string) => void
}
