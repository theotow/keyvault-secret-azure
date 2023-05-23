import {SecretClient} from '@azure/keyvault-secrets'

type Secret = string | undefined

export async function getSecret(
  client: SecretClient,
  secretName: string
): Promise<Secret> {
  try {
    const secret = await client.getSecret(secretName)
    return secret.value
  } catch (e) {
    throw new Error(`failed to fetch:${secretName}`)
  }
}

export async function getSecrets(
  client: SecretClient,
  secretNames: string[]
): Promise<Secret[]> {
  return Promise.all(
    secretNames.map(async secretName => getSecret(client, secretName))
  )
}
