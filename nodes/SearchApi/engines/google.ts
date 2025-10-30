import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GL, HL, LR, TIME_PERIODS, GOOGLE_DOMAINS } from '../constants/google';

const displayOptions = {
	show: {
		resource: ['google'],
	},
};

const resource: INodePropertyOptions = {
	name: 'Google Search',
	value: 'google'
};

const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		type: 'string',
		default: '',
        required: true,
		description: 'Parameter defines the query you want to search. You can use anything that you would use in a regular Google search. e.g. inurl:, site:, intitle:, and more.',
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
				displayName: 'Country',
				name: 'gl',
				type: 'options',
				default: 'us',
				description: 'The default parameter us defines the country of the search. Check the full list of supported Google gl countries.',
				options: GL,
				routing: {
					request: {
						qs: {
							gl: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Country Restriction',
				name: 'cr',
				type: 'string',
				default: '',
				description: 'The cr parameter restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by Web server\'s IP address geographic location. Check the full list of supported Google cr countries.',
				routing: {
					request: {
						qs: {
							cr: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Encoded Location',
				name: 'uule',
				type: 'string',
				default: '',
				description: 'Parameter is the Google encoded location you want to use for the search. SearchApi automatically generated the uule parameter when you use the location parameter but we allow you to overwrite it directly. uule and location parameters can\'t be used together.',
				routing: {
					request: {
						qs: {
							uule: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Geographic Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Parameter defines from where you want the search to originate. If several locations match the location requested, we\'ll pick the most popular one. Head to the Locations API if you need more precise control.',
				routing: {
					request: {
						qs: {
							location: '={{$value}}',
						},
					},
				},
			},

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

		],
		displayOptions,
	},
	{
		displayName: 'Language Settings',
		name: 'languageSettings',
		type: 'collection',
		placeholder: 'Add Language Setting',
		default: {},
		options: [
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
			{
				displayName: 'Language Restriction',
				name: 'lr',
				type: 'multiOptions',
				default: ['lang_en'],
				description: 'The lr parameter restricts search results to documents written in a particular language or a set of languages. You can select multiple languages to include documents written in any of those languages.',
				options: LR,
				routing: {
					request: {
						qs: {
							lr: '={{$value.join("|")}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Search Option',
		default: {},
		options: [
			{
				displayName: 'Content Filter',
				name: 'filter',
				type: 'options',
				default: '1',
				description: 'This parameter controls whether the \'Duplicate Content\' and \'Host Crowding\' filters are enabled. Set the value to 1 to enable these filters, which is the default setting. To disable these filters, set the value to 0.',
				options: [
					{ name: 'Disable Filters', value: '0' },
					{ name: 'Enable Filters', value: '1' },
				],
				routing: {
					request: {
						qs: {
							filter: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Device Type',
				name: 'device',
				type: 'options',
				default: 'desktop',
				description: 'The default parameter desktop defines the search on a desktop device. The mobile parameter defines the search on a mobile device. The tablet parameter defines the search on a tablet device.',
				options: [
					{ name: 'Desktop', value: 'desktop' },
					{ name: 'Mobile', value: 'mobile' },
					{ name: 'Tablet', value: 'tablet' },
				],
				routing: {
					request: {
						qs: {
							device: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'No Auto-Correction',
				name: 'nfpr',
				type: 'options',
				default: '0',
				description: 'This parameter controls whether results from queries that have been auto-corrected for spelling errors are included. To exclude these auto-corrected results, set the value to 1. By default, the value is 0, meaning auto-corrected results are included.',
				options: [
					{ name: 'Include Auto-Corrected Results', value: '0' },
					{ name: 'Exclude Auto-Corrected Results', value: '1' },
				],
				routing: {
					request: {
						qs: {
							nfpr: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Optimization Strategy',
				name: 'optimization_strategy',
				type: 'options',
				default: 'performance',
				description: 'Controls how the search request is optimized. Available options: performance (Default), ads - optimizes for higher ad collection success rate, which may result in longer request processing times.',
				options: [
					{ name: 'Ads', value: 'ads' },
					{ name: 'Performance', value: 'performance' },
				],
				routing: {
					request: {
						qs: {
							optimization_strategy: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'SafeSearch',
				name: 'safe',
				type: 'options',
				default: 'off',
				description: 'This parameter toggles the SafeSearch feature for the results. SafeSearch operates by filtering out adult content from your search results. Google\'s filters use proprietary technology to check keywords, phrases and URLs. While no filters are 100 percent accurate, SafeSearch will remove the overwhelming majority of adult content from your search results. Set the value to active to enable SafeSearch. To disable it, set the value to off. By default, SafeSearch is disabled.',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Off', value: 'off' },
				],
				routing: {
					request: {
						qs: {
							safe: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
	{
		displayName: 'Time Filters',
		name: 'timeFilters',
		type: 'collection',
		placeholder: 'Add Time Filter',
		default: {},
		options: [
			{
				displayName: 'Time Period',
				name: 'time_period',
				type: 'options',
				default: 'last_day',
				description: 'This parameter restricts results to URLs based on date. Supported values are: last_hour - data from the past hour. last_day - data from the past 24 hours. last_week - data from the past week. last_month - data from the past month. last_year - data from the past year. Using time_period_min or time_period_max parameters, you can specify a custom time period. Note, that the time_period_min and time_period_max parameters could be used separately as well.',
					options: TIME_PERIODS,
				routing: {
					request: {
						qs: {
							time_period: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Time Period Start',
				name: 'time_period_min',
				type: 'string',
				default: '',
				description: 'This parameter specifies the start of the time period. It could be used in combination with the time_period_max parameter. The value should be in the format MM/DD/YYYY.',
				routing: {
					request: {
						qs: {
							time_period_min: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Time Period End',
				name: 'time_period_max',
				type: 'string',
				default: '',
				description: 'This parameter specifies the end of the time period. It could be used in combination with the time_period_min parameter. The value should be in the format MM/DD/YYYY.',
				routing: {
					request: {
						qs: {
							time_period_max: '={{$value}}',
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
				displayName: 'Results Per Page',
				name: 'num',
				type: 'string',
				default: '10',
				description: 'This parameter specifies the number of results to display per page. Use in combination with the page parameter to implement pagination functionality.',
				routing: {
					request: {
						qs: {
							num: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Page Number',
				name: 'page',
				type: 'string',
				default: '1',
				description: 'This parameter indicates which page of results to return. By default, it is set to 1. Use in combination with the num parameter to implement pagination.',
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
	{
		displayName: 'Advanced Options',
		name: 'advancedOptions',
		type: 'collection',
		placeholder: 'Add Advanced Option',
		default: {},
		options: [
			{
				displayName: 'Knowledge Graph ID',
				name: 'kgmid',
				type: 'string',
				default: '',
				description: 'Defines a Knowledge Graph identifier (kgmid), representing entities in Google\'s Knowledge Graph. Format: Location Identifier (/m/): Typically followed by 2 to 7 characters. Used primarily to represent specific locations. Find the identifier by searching for the \'Freebase ID\' on Wikidata. Example: kgmid=/m/02_286 refers to New York. Google Knowledge Graph Identifier (/g/): Typically followed by a longer alphanumeric string. Represents general entities in Google\'s Knowledge Graph. Find details on Wikidata. Example: kgmid=/g/11f555cn8l refers to TikTok.',
				routing: {
					request: {
						qs: {
							kgmid: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
];

export const google = {
	resource,
	properties,
};
