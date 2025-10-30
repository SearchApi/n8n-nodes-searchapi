import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GL, HL, TIME_PERIODS } from '../constants/google';
import { SIZE, COLOR, IMAGE_TYPE, USAGE_RIGHTS, ASPECT_RATIO } from '../constants/google_images';

const displayOptions = {
	show: {
		resource: ['google_images'],
	},
};

const resource: INodePropertyOptions = {
	name: 'Google Images',
	value: 'google_images'
};

const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		type: 'string',
		required: true,
		default: '',
		description: 'Parameter defines the query you want to search. You can use anything that you would use in a regular Google search. e.g. inurl:, site:, intitle:. We also support advanced search query parameters such as as_dt and as_eq.',
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
		displayName: 'Location & Language Settings',
		name: 'locationLanguageSettings',
		type: 'collection',
		placeholder: 'Add Location/Language Setting',
		default: {},
		options: [
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
		displayName: 'Search Filters',
		name: 'searchFilters',
		type: 'collection',
		placeholder: 'Add Search Filter',
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
				displayName: 'Encoded Filters',
				name: 'tbs',
				type: 'string',
				default: '',
				description: 'This parameter restricts results to URLs based on encoded values. Parameter is normally constructed using size, color, image_type, time_period, usage_rights values. For instance, isz:l would return only results that has large image size.',
				routing: {
					request: {
						qs: {
							tbs: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Language Restriction',
				name: 'lr',
				type: 'string',
				default: '',
				description: 'The lr parameter restricts search results to documents written in a particular language or a set of languages. The accepted format for this parameter is lang_{2-letter country code}. For instance, to filter documents written in Japanese, the value should be set to lang_jp. To incorporate multiple languages, a value like lang_it|lang_de restricts the search to documents written in either Italian or German. Google identifies the document language based on the top-level domain (TLD) of the document\'s URL, any language meta tags present, or the language utilized within the document\'s body text. Check the full list of supported Google lr languages.',
				routing: {
					request: {
						qs: {
							lr: '={{$value}}',
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
		displayName: 'Image Options',
		name: 'imageOptions',
		type: 'collection',
		placeholder: 'Add Image Option',
		default: {},
		options: [
			{
				displayName: 'Aspect Ratio',
				name: 'aspect_ratio',
				type: 'options',
				default: 'panoramic',
				description: 'This parameter filters images based on aspect ratio. Supported values are: square - width equals height. tall - height greater than width. wide - width greater than height. panoramic - width is at least twice the height.',
				options: ASPECT_RATIO,
				routing: {
					request: {
						qs: {
							aspect_ratio: '={{$value}}',
						},
					},
				},
			},

			{
				displayName: 'Color Filter',
				name: 'color',
				type: 'options',
				default: 'black',
				description: 'This parameter controls the color of your search results. These options are available: black_and_white, color, transparent, red, orange, yellow, green, teal, blue, purple, pink, white, gray, black, brown.',
				options: COLOR,
				routing: {
					request: {
						qs: {
							color: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Image Size',
				name: 'size',
				type: 'options',
				default: 'icon',
				description: 'This parameter controls the size of your search results. There are few options available: large, medium, icon, larger_than_400x300, larger_than_640x480, larger_than_800x600, larger_than_1024x768, larger_than_2mp, larger_than_4mp, larger_than_6mp, larger_than_8mp, larger_than_12mp, larger_than_15mp, larger_than_20mp, larger_than_40mp, larger_than_70mp.',
				options: SIZE,
				routing: {
					request: {
						qs: {
							size: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Image Type',
				name: 'image_type',
				type: 'options',
				default: 'clipart',
				description: 'This parameter controls the type of your search results. There are only few options that are available: clipart, line_drawing, gif, face, photo.',
				options: IMAGE_TYPE,
				routing: {
					request: {
						qs: {
							image_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Time Period',
				name: 'time_period',
				type: 'options',
				default: 'last_day',
				description: 'This parameter restricts results to URLs based on date. Supported values are: last_hour, last_day, last_week, last_month, last_year.',
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
				displayName: 'Usage Rights',
				name: 'usage_rights',
				type: 'options',
				default: 'commercial_or_other_licenses',
				description: 'This parameter controls the usage rights of your search results. Options that are available: creative_commons_licenses, commercial_or_other_licenses.',
				options: USAGE_RIGHTS,
				routing: {
					request: {
						qs: {
							usage_rights: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
	{
		displayName: 'Technical Settings',
		name: 'technicalSettings',
		type: 'collection',
		placeholder: 'Add Technical Setting',
		default: {},
		options: [
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
				displayName: 'Google Domain',
				name: 'google_domain',
				type: 'string',
				default: 'google.com',
				description: 'The default parameter google.com defines the Google domain of the search. Check the full list of supported Google google_domain domains.',
				routing: {
					request: {
						qs: {
							google_domain: '={{$value}}',
						},
					},
				},
			},
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

export const google_images = {
	resource,
	properties,
};
