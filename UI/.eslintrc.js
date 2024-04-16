module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: 'standard-with-typescript',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: '*.ts',
      extends: ['plugin:prettier/recommended'],
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.html'],
  },
  rules: {
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/promise-function-async': 0,
    '@typescript-eslint/consistent-type-imports': 0,
  },
};
