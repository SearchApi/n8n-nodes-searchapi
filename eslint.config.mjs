import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
			// This rules messes with our formatting of parameter names and descriptions.
			'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
			'n8n-nodes-base/node-param-description-miscased-id': 'off',
			'n8n-nodes-base/node-param-display-name-miscased': 'off',
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
];
