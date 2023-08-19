module.exports = {
  extends: ['@nathpaiva/eslint-config-react'],
  rules: {
    'react/no-unescaped-entities': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
