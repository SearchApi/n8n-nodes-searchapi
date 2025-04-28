import { IDataObject, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class SearchApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchAPI',
		name: 'searchApi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description: 'Search the web via SearchAPI.io (declarative)',
		subtitle: '={{ $parameter["engine"] }}',
		defaults: { name: 'SearchAPI' },
		inputs: ['main'],
		outputs: ['main'],

		credentials: [{ name: 'searchApi', required: true }],

		requestDefaults: {
			baseURL: 'https://www.searchapi.io/api/v1',
			method: 'GET',
			url: '/search',
			headers: { Accept: 'application/json' },
			qs: {
				api_key: '={{ $credentials.apiKey }}', // generic-auth pattern :contentReference[oaicite:3]{index=3}
			},
		},

		properties: [
			{
				displayName: 'Engine (Engine)',
				name: 'engine',
				type: 'string',
				default: 'google',
				required: true,
				description: 'Search engine to use for the query',
				routing: {
					request: {
						qs: {
							engine: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Parameters',
				name: 'parameters',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				hint: 'You can pass a paramters object to this node, to use the parameters in the search',
				description: 'Add the parameters you want to use for the search, refer to the SearchAPI.io documentation for the available parameters',
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
						qs: '={{ Object.fromEntries(($value.parameter ?? $json.parameters ?? []).map(p => [p.name, p.value]))  }}' as unknown as IDataObject,
					},
				},
			},
		],
	};
}
