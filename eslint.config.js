import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['dist', 'node_modules'] }, js.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  extends: [...tseslint.configs.strictTypeChecked],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    'jsx-a11y': jsxA11y,
    react,
    'react-hooks': reactHooks,
  },
  rules: {
    ...jsxA11y.flatConfigs.recommended.rules,
    ...reactHooks.configs.flat.recommended.rules,
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
});
