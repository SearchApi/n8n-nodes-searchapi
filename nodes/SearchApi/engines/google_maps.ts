import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_DOMAINS, HL } from '../constants/google';

const displayOptions = {
	show: {
		resource: ['google_maps'],
	},
};

const resource: INodePropertyOptions = {
	name: 'Google Maps',
	value: 'google_maps'
};

const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		type: 'string',
		required: true,
		default: '',
		description: 'Parameter defines the query you want to search. You can use anything that you would use in a regular Google Maps search.',
		options: [],
		displayOptions,
		routing: {
			request: {
				qs: {
					q: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Location Settings',
		name: 'locationSettings',
		type: 'collection',
		placeholder: 'Add Location Setting',
		default: {},
		options: [
			{
				displayName: 'GPS Coordinates',
				name: 'll',
				type: 'string',
				default: '',
				description: 'The parameter specifies the GPS coordinates for the location where the query (q) should be applied. It can be formatted in two ways: @latitude,longitude,zoom (e.g. @40.7009973,-73.994778,12z) or @latitude,longitude,meters (e.g. @40.7009973,-73.994778,500m). The last value can end with z (zoom, from 3z to 21z) or m (meters for radius, from 62m to 18636559m). While the zoom parameter is optional, it is advisable to use it for greater accuracy.',
				routing: {
					request: {
						qs: {
							ll: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
	{
		displayName: 'Search Configuration',
		name: 'searchConfiguration',
		type: 'collection',
		placeholder: 'Add Search Configuration',
		default: {},
		options: [
			{
				displayName: 'Google Domain',
				name: 'google_domain',
				type: 'options',
				default: 'google.com',
				description: 'The default parameter google.com defines the Google domain of the search. Check the full list of supported Google google_domain domains.',
				options: GOOGLE_DOMAINS,
				routing: {
					request: {
						qs: {
							google_domain: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Interface Language',
				name: 'hl',
				type: 'options',
				default: 'en',
				description: 'The default parameter en defines the interface language of the search. Check the full list of supported Google hl languages.',
				options: HL,
				routing: {
					request: {
						qs: {
							hl: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Pagination Setting',
		default: {},
		options: [
			{
				displayName: 'Page Number',
				name: 'page',
				type: 'string',
				default: '1',
				description: 'This parameter indicates which page of results to return. By default, it is set to 1.',
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
];

export const google_maps = {
	resource,
	properties,
};
