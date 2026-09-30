import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		files: ['nodes/SearchApi/engines/*.ts'],
		rules: {
			// Shared enumerations are built by helpers, which this rule cannot resolve
			// statically. `npm run check:enums` validates the same defaults instead.
			'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
		},
	},
];
