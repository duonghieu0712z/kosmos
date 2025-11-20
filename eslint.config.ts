import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vueEslint from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
    { ignores: ['**/node_modules', '**/dist', '**/src-tauri/target'] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    vueEslint.configs['flat/recommended'],
    prettierRecommended,
    {
        files: ['**/*.{ts,tsx,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            curly: ['error', 'all'],
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'vue/multi-word-component-names': 'off',
            'vue/require-default-prop': 'off',
        },
    },
    eslintConfigPrettier,
]);
