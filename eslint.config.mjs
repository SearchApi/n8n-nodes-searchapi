import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
			// This rules messes with our formatting of parameter names and descriptions.
			'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
			'n8n-nodes-base/node-param-description-miscased-id': 'off',
			'n8n-nodes-base/node-param-display-name-miscased': 'off',
			// Overrides here pin vulnerable transitive devDependencies; nothing ships to runtime.
			'@n8n/community-nodes/no-overrides-field': 'off',
		},
	},
	{
		files: ['nodes/SearchApi/engines/*.ts'],
		rules: {
			// Shared enumerations are built by helpers, which this rule cannot resolve
			// statically. `npm run check:enums` validates the same defaults instead.
			'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
		},
	},
	{
		files: ['nodes/**/*.ts', 'credentials/**/*.ts'],
		rules: {
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
			],
		},
	},
];
