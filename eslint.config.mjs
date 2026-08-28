import { config } from '@n8n/node-cli/eslint';
import js from '@eslint/js';
import globals from 'globals';
import jsonc from 'eslint-plugin-jsonc';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import searchapi from './eslint-rules/searchapi.mjs';

export default [
	...config,
	...tseslint.configs.strictTypeChecked.map((c) => ({ ...c, files: ['**/*.ts'] })),
	...tseslint.configs.stylisticTypeChecked.map((c) => ({ ...c, files: ['**/*.ts'] })),
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
		},
	},
	...jsonc.configs['flat/recommended-with-json'].map((c) => ({ ...c, files: ['nodes/**/*.node.json'] })),
	{
		files: ['scripts/**/*.mjs', 'eslint-rules/**/*.mjs', 'eslint.config.mjs'],
		...js.configs.recommended,
		languageOptions: { globals: globals.node },
	},
	{
		files: ['**/*.ts', '**/*.mjs'],
		plugins: { unicorn },
		rules: {
			'unicorn/no-abusive-eslint-disable': 'error',
			'unicorn/no-empty-file': 'error',
			'unicorn/no-useless-spread': 'error',
			'unicorn/no-array-push-push': 'error',
			'unicorn/no-zero-fractions': 'error',
			'unicorn/no-instanceof-builtins': 'error',
			'unicorn/prefer-node-protocol': 'error',
			'unicorn/prefer-string-slice': 'error',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@n8n/community-nodes/credential-unnecessary-password': 'error',
			'@n8n/community-nodes/no-dead-files': 'error',
			'@n8n/community-nodes/icon-prefer-themed-variants': 'error',
			'@n8n/community-nodes/resource-operation-pattern': 'error',
			'@n8n/community-nodes/node-registration-complete': 'error',
			'@n8n/community-nodes/require-files-array': 'error',
			'@n8n/community-nodes/require-homepage': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-named-as-default': 'error',
			'import-x/no-named-as-default-member': 'error',
			'import-x/no-cycle': 'error',
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/order': ['error', { 'newlines-between': 'never', alphabetize: { order: 'asc' } }],
		},
	},
	{
		files: ['nodes/**/*.ts', 'credentials/**/*.ts'],
		plugins: { searchapi },
		rules: {
			'searchapi/option-values-unique': 'error',
			'searchapi/default-matches-description': 'error',
			'searchapi/no-required-mutually-exclusive': 'error',
			'searchapi/zero-default-needs-guard': 'error',
			'no-useless-escape': 'error',
			'no-irregular-whitespace': ['error', { skipStrings: false, skipTemplates: false }],
			'no-restricted-syntax': [
				'error',
				{
					// Strings here become n8n UI text; a surviving backslash, HTML
					// entity, or raw newline means an escaping mistake in the source.
					selector: 'Literal[value=/\\\\|&#\\d+;|&apos;|&quot;|[\\n\\t]/]',
					message:
						'String contains a literal backslash, HTML entity, or control character. Fix the escaping.',
				},
				{
					// The color picker returns hex values; SearchApi engines expect enum strings.
					selector: 'Property[key.name="type"][value.value="color"]',
					message: "n8n's color type sends hex values the API rejects. Use an options list.",
				},
			],
		},
	},
	{
		files: ['nodes/SearchApi/engines/*.ts'],
		rules: {
			'searchapi/engine-property-display-options': 'error',
			// Shared enumerations are built by helpers, which n8n rules cannot resolve
			// statically.
			'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
		},
	},
	{
		files: ['nodes/SearchApi/shared/params.ts'],
		rules: {
			// Factory return values take their default from arguments, which the
			// n8n rule cannot resolve statically.
			'n8n-nodes-base/node-param-default-missing': 'off',
		},
	},
	{
		rules: {
			// These rules mess with our formatting of parameter names and descriptions.
			'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
			'n8n-nodes-base/node-param-description-miscased-id': 'off',
			'n8n-nodes-base/node-param-display-name-miscased': 'off',
		},
	},
];
