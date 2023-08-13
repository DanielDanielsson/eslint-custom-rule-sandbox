# Eslint rule development sandbox

```
npm i

npm lint
```

NOTES typescript-interfaces:

Updates to the previous interface option:

- refactor: [use @typescript-eslint/utils/json-schema type instead of default](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/CHANGELOG.md#:~:text=fork%20json%20schema%20types%20for%20better%20compat%20with%20ESLint%20rule%20validation)
- chore: Update all dependencies
- chore: use @typescript-eslint/utils instead of @typescript-eslint/experimental-utils, this was renamed and changes in v.5.10.0 (2022-01-17)[https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/CHANGELOG.md#:~:text=typescript%2Deslint/utils-,5.10.0%20(2022%2D01%2D17),-Features]

potentail ovverrider:
"@typescript-eslint/typescript-estree": "^6.3.0",
"@typescript-eslint/parser": "^6.3.0",
"@typescript-eslint/eslint-plugin": "^6.3.0"
