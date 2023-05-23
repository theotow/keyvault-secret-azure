import {DefaultAzureCredential} from '@azure/identity'
import {SecretClient} from '@azure/keyvault-secrets'

interface IClientOptions {
  keyVaultName: string
}

export function getClient(options: IClientOptions): SecretClient {
  const credential = new DefaultAzureCredential()

  const url = `https://${options.keyVaultName}.vault.azure.net`

  return new SecretClient(url, credential)
}
