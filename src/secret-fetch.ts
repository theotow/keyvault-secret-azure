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
): Promise<Map<string, Secret>> {
  const secrets = await Promise.all(
    secretNames.map(async secretName => getSecret(client, secretName))
  )
  const map = new Map<string, Secret>()
  for (const [i, secret] of secrets.entries()) {
    map.set(secretNames[i], secret)
  }
  return map
}
