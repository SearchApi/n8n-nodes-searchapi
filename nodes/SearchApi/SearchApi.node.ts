import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { google } from './engines/google';
import { google_images } from './engines/google_images';
import { google_maps } from './engines/google_maps';
import { google_shopping } from './engines/google_shopping';

export class SearchApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchApi',
		name: 'searchApi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description:
			'Access real-time search results from Google, Google Images, Google Maps, Google Shopping and more. Use this when you need current, up-to-date information, product searches, location data, or visual content that may not be available in your training data.',
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
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				description: 'The search engine to use',
				noDataExpression: true,
				options: [
					google.resource,
					google_images.resource,
					google_maps.resource,
					google_shopping.resource,
					
				],
				default: google.resource.value,
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
						action: 'Search',
						description: 'Search using the engine specified in the resource',
						routing: {
							request: {
								qs: {
									engine: '={{ $parameter["resource"] }}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			...google.properties,
			...google_images.properties,
			...google_maps.properties,
			...google_shopping.properties,
		],
	};
}
