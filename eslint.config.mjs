import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
  { ignores: ['**/*.config.js'] },
  {
    rules: {
      'no-undef': 'warn',
      'react/prop-types': ['warn', { ignore: ['navigation'] }],
    },
  },
]