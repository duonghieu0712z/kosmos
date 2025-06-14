import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['**/node_modules', '**/dist', '**/src-tauri/target'] },
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {},
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsParser,
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            ...reactHooks.configs.recommended.rules,
            ...reactRefresh.configs.vite.rules,
            'react-refresh/only-export-components': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    }
);
