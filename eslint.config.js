import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslint from '@eslint/js'
import js from '@eslint/js'
import html from 'eslint-plugin-html'
import globals from 'globals'

export default [
  {
    ignores: [
      '_site',
      'postcss.config.mjs',
      'tailwind.config.js',
      'eleventy.config.ts',
      'components.json',
      '**/vendor/*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        module: true,
      },
    },
    plugins: {
      js,
      react,
      prettier,
      html,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-implicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
