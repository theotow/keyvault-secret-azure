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
    client-id: <fill me>
    tenant-id: <fill me>
    subscription-id: <fill me>

- uses: theotow/keyvault-secret-azure@v1
  with:
    key-vault-name: <fill me>
    config: |
      {"ENV_VARNAME": "keyvault-secret-name"}
- run: echo "${{ env.ENV_VARNAME }}"
```

> Note: make sure you are logged in azure (with azure/login@v1 for example) before calling this action.

## License

MIT
