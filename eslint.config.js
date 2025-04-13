import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
    { ignores: ['dist', 'coverage'] },
    {
        extends: [
            js.configs.recommended, 
            ...tseslint.configs.recommended
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            'react': react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'import': importPlugin,
            'unused-imports': unusedImports
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off', // Not needed in React 17+
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'unused-imports/no-unused-imports': 'error',
            'import/order': ['warn', {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                'newlines-between': 'always',
                'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
            }],
            '@typescript-eslint/no-unused-vars': ['error', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_'
            }],
            'no-console': ['warn', { 'allow': ['warn', 'error'] }]
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
)
