<p align="center">
  <a href="https://github.com/theotow/keyvault-secret-azure/actions"><img alt="typescript-action status" src="https://github.com/theotow/keyvault-secret-azure/workflows/build-test/badge.svg"></a>
</p>

# Keyvault secret azure

Fetches secrets from azure and exposes them to github actions.

## Usage

```yaml
- name: 'Az CLI login'
  uses: azure/login@v1
  with:
    client-id: e0300a0f-e375-479f-958c-4634e90db7e7
    tenant-id: 4a3b9c18-eabb-4dc0-b5e9-6a82f2eb9f6a
    subscription-id: 2cdafa7b-c9b6-43b0-92b3-7561c34a5e17

- uses: theotow/keyvault-secret-azure@v1
  with:
    key-vault-name: keyvault-test34
    config: |
      {"ENV_VARNAME": "keyvault-secret-name"}
- run: echo "${{ env.ENV_VARNAME }}"
```

## License

MIT
