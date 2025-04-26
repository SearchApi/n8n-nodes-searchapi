import { IDataObject, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class SearchAPI implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchAPI',
		name: 'searchapi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description: 'Search the web via SearchAPI.io (declarative)',
		subtitle: '={{ $parameter["engine"] }}',
		defaults: { name: 'SearchAPI', color: '#4338ca' },
		inputs: ['main'],
		outputs: ['main'],

		credentials: [{ name: 'searchApi', required: true }],

		requestDefaults: {
			baseURL: 'https://www.searchapi.io/api/v1',
			method: 'GET',
			url: '/search',
			headers: { Accept: 'application/json' },
			qs: {
				api_key: '={{ $credentials.apiKey }}',   // generic-auth pattern :contentReference[oaicite:3]{index=3}
			},
		},

		properties: [
			{
				displayName: 'Query (q)',
				name: 'q',
				type: 'string',
				default: '={{ $json.q }}',
				required: true,
				description: 'Search phrase to use in the engine of your choice.',
				routing: {
					request: {
						qs: {
							q: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Engine (engine)',
				name: 'engine',
				type: 'string',
				default: 'google',
				required: true,
				description: 'Search engine to use for the query.',
				routing: {
					request: {
						qs: {
							engine: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Additional Parameters',
				name: 'additionalParams',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				hint: 'You can ignore this and add "additionalParams" to the node input.',
				description: 'Add any extra query-string keys your SearchAPI request should include.',
				options: [
					{
						displayName: 'Parameter',
						name: 'parameter',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				/**
				 * Build an object like { hl: 'en', gl: 'us' } out of
				 * the collection entries and merge it into qs.
				 */
				routing: {
					request: {
						// We are doing this cast here because we need to 
						// build an object out of the collection entries
						// and merge it into qs, but qs expects an object.
						qs: '={{ Object.fromEntries(($value.parameter ?? $json.additionalParams ?? []).map(p => [p.name, p.value]))  }}' as unknown as IDataObject,
					},
				},
			}

		],

	};
}
