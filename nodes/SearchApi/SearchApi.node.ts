import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { google } from './engines/google';

export class SearchApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchApi',
		name: 'searchApi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description: 'Call this tool whenever the answer might require fresh, niche, or externally-verifiable information. Make sure to always cite the sources in the final reply. ',
		subtitle: '={{ $parameter["engine"] }}',
		defaults: { name: 'SearchApi' },
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [{ name: 'searchApi', required: true }],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'http://localhost:3000/api/v1', // TODO: Change to https://www.searchapi.io/api/v1
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				description: 'The search engine to use',
				noDataExpression: true,
				options: [
					google.resource
				],
				default: '',
			},
			{
				displayName: 'Operation Name',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search the web',
						description: 'Search using the engine specified in the resource',
						routing: {
							request: {
								qs: {
									engine: '={{ $parameter["resource"] }}'
								}
							}
						}
					},
				],
				default: 'search',
			},
			...google.properties,
		],
	};
}
