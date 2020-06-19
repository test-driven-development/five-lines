module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'promise/catch-or-return': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  }
}
