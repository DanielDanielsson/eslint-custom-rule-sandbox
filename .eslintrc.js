module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ["@danieldanielsson/eslint-config/typescript"],
  plugins: ['example'],
  rules: {
    'example/foo-bar-rule': 'error',
    'example/sort-interface': 'error',
    'example/sort-type': 'error',
    'example/sort-enum': 'error',
    'example/sort-default-props': 'error',
    'prefer-arrow-callback': 'error',
    "func-style": ["error", "expression", { "allowArrowFunctions": true }],
    
    // Rules from extension
    'eslint-plugin-react': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'import/no-cycle': 'off',
  }
};
