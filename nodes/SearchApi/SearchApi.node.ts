import { IDataObject, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class SearchApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchAPI',
		name: 'searchApi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description: 'Call this tool whenever the answer might require fresh, niche, or externally-verifiable information. Make sure to always cite the sources in the final reply. ',
		subtitle: '={{ $parameter["engine"] }}',
		defaults: { name: 'SearchAPI' },
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [{ name: 'searchApi', required: true }],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'https://www.searchapi.io/api/v1',
			method: 'GET',
			url: '/search',
			headers: { Accept: 'application/json' },
			qs: {
				api_key: '={{ $credentials.apiKey }}', // generic-auth pattern :contentReference[oaicite:3]{index=3}
			},
		},
		hints: [
			{
			  message: "Hit SearchAPI's free 100-request quota? Check the Pricing page 📈'",
			  type: 'info',
			  whenToDisplay: 'beforeExecution',
			  location: 'inputPane',
			},
		  ],
		properties: [
			{
				displayName: 'Engine (Engine)',
				name: 'engine',
				type: 'string',
				default: 'google',
				required: true,
				
				description: 'Search engine to use for the query',
				hint: 'Check https://www.searchapi.io/docs/google for the available engines',
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
				description: 'Add the parameters you want to use for the search, refer to the SearchAPI.io documentation for the available parameters for the selected engine',
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
								placeholder: 'q',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: 'pizza near me',
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
						qs: '={{ Object.fromEntries(($value.parameter ?? []).map(p => [p.name, p.value])) }}' as unknown as IDataObject,
					},
				},
			},
		],
	};
}
