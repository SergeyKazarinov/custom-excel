module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript/base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', '/docs/*'],
  rules: {
    'no-confusing-arrow': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'class-methods-use-this': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-plusplus': 'off',
  },
};
