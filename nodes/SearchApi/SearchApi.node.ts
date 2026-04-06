import { INodeType, INodeTypeDescription, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { google, google_images, google_maps, google_shopping } from './engines';

interface Engine {
	resource: INodePropertyOptions;
	properties: INodeProperties[];
}

const engines: Engine[] = [google, google_images, google_maps, google_shopping];

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
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'searchApi', required: true }],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'https://www.searchapi.io/api/v1',
			method: 'GET',
			url: '/search',
			headers: { Accept: 'application/json' },
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
				options: engines.map((engine) => engine.resource),
				// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
				default: 'google', // We default to Google, but esling is not being able to detect that it is in the options.
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
			{
				displayName: 'For all available parameters and detailed usage, see the <a href="https://www.searchapi.io/docs/google" target="_blank">Google API documentation</a>.',
				name: 'google_docs_notice',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['google'] } },
			},
			{
				displayName: 'For all available parameters and detailed usage, see the <a href="https://www.searchapi.io/docs/google-images" target="_blank">Google Images API documentation</a>.',
				name: 'google_images_docs_notice',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['google_images'] } },
			},
			{
				displayName: 'For all available parameters and detailed usage, see the <a href="https://www.searchapi.io/docs/google-maps" target="_blank">Google Maps API documentation</a>.',
				name: 'google_maps_docs_notice',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['google_maps'] } },
			},
			{
				displayName: 'For all available parameters and detailed usage, see the <a href="https://www.searchapi.io/docs/google-shopping" target="_blank">Google Shopping API documentation</a>.',
				name: 'google_shopping_docs_notice',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['google_shopping'] } },
			},
			...engines.flatMap((engine) => engine.properties),
		],
	};
}
