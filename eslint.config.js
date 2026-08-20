import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "max-depth": ["warn", { "max": 4 }],
      "max-lines": ["warn", { "max": 400, "skipBlankLines": true, "skipComments": true }],
      "max-lines-per-function": ["warn", { "skipBlankLines": true, "skipComments": true }],
      "max-nested-callbacks": ["warn", { "max": 3 }],
      "max-params": ["warn", { "max": 4 }],
      "max-statements": ["warn", { "max": 20 }],
      "complexity": ["warn", { "max": 10 }],
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
    }
  },
])
