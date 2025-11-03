import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
			// This rules messes with our formatting of parameter names and descriptions.
			'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
			'n8n-nodes-base/node-param-description-miscased-id': 'off',
		},
	},
];
