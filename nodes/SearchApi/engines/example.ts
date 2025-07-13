import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['bing_news'],
	},
};

const resource: INodePropertyOptions = { name: 'Bing News', value: 'bing_news' };

const properties: INodeProperties[] = [
	{
		displayName: 'Q',
		name: 'q',
		type: 'string',
		default: '',
		description:
			'Free‑form search query. Use any Bing News operators such as `site:`, `inurl:`, `intitle:`.',
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
		displayName: 'Category',
		name: 'category',
		type: 'string',
		default: '',
		description:
			'Category vertical to query, e.g. `MaxClass` (Top Stories). Takes precedence over `q` if both are supplied.',
		options: [],
		displayOptions,
		routing: {
			request: {
				qs: {
					category: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Market Code',
		name: 'market_code',
		type: 'options',
		default: 'da-dk',
		description:
			'Locale in `language-country` format (e.g. `en-us`). Cannot be combined with `country_code`.',
		options: [
			{ name: 'Da-Dk', value: 'da-dk' },
			{ name: 'De-At', value: 'de-at' },
			{ name: 'De-Ch', value: 'de-ch' },
			{ name: 'De-De', value: 'de-de' },
			{ name: 'En-Au', value: 'en-au' },
			{ name: 'En-Ca', value: 'en-ca' },
			{ name: 'En-Gb', value: 'en-gb' },
			{ name: 'En-ID', value: 'en-id' },
			{ name: 'En-In', value: 'en-in' },
			{ name: 'En-My', value: 'en-my' },
			{ name: 'En-Nz', value: 'en-nz' },
			{ name: 'En-Ph', value: 'en-ph' },
			{ name: 'En-Us', value: 'en-us' },
			{ name: 'En-Za', value: 'en-za' },
			{ name: 'Es-Ar', value: 'es-ar' },
			{ name: 'Es-Cl', value: 'es-cl' },
			{ name: 'Es-Es', value: 'es-es' },
			{ name: 'Es-Mx', value: 'es-mx' },
			{ name: 'Es-Us', value: 'es-us' },
			{ name: 'Fi-Fi', value: 'fi-fi' },
			{ name: 'Fr-Be', value: 'fr-be' },
			{ name: 'Fr-Ca', value: 'fr-ca' },
			{ name: 'Fr-Ch', value: 'fr-ch' },
			{ name: 'Fr-Fr', value: 'fr-fr' },
			{ name: 'It-It', value: 'it-it' },
			{ name: 'Ja-Jp', value: 'ja-jp' },
			{ name: 'Ko-Kr', value: 'ko-kr' },
			{ name: 'Nl-Be', value: 'nl-be' },
			{ name: 'Nl-Nl', value: 'nl-nl' },
			{ name: 'No-No', value: 'no-no' },
			{ name: 'Pl-Pl', value: 'pl-pl' },
			{ name: 'Pt-Br', value: 'pt-br' },
			{ name: 'Ru-Ru', value: 'ru-ru' },
			{ name: 'Sv-Se', value: 'sv-se' },
			{ name: 'Tr-Tr', value: 'tr-tr' },
			{ name: 'Zh-Hk', value: 'zh-hk' },
			{ name: 'Zh-Tw', value: 'zh-tw' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					market_code: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Country Code',
		name: 'country_code',
		type: 'options',
		default: 'AR',
		description: 'Two‑letter ISO 3166‑1 **country** code. Cannot be combined with `market_code`.',
		options: [
			{ name: 'Ar', value: 'AR' },
			{ name: 'At', value: 'AT' },
			{ name: 'Au', value: 'AU' },
			{ name: 'Be', value: 'BE' },
			{ name: 'Br', value: 'BR' },
			{ name: 'Ca', value: 'CA' },
			{ name: 'Ch', value: 'CH' },
			{ name: 'Cl', value: 'CL' },
			{ name: 'Cn', value: 'CN' },
			{ name: 'De', value: 'DE' },
			{ name: 'Dk', value: 'DK' },
			{ name: 'Es', value: 'ES' },
			{ name: 'Fi', value: 'FI' },
			{ name: 'Fr', value: 'FR' },
			{ name: 'Gb', value: 'GB' },
			{ name: 'Hk', value: 'HK' },
			{ name: 'ID', value: 'ID' },
			{ name: 'In', value: 'IN' },
			{ name: 'It', value: 'IT' },
			{ name: 'Jp', value: 'JP' },
			{ name: 'Kr', value: 'KR' },
			{ name: 'Mx', value: 'MX' },
			{ name: 'My', value: 'MY' },
			{ name: 'Nl', value: 'NL' },
			{ name: 'Nz', value: 'NZ' },
			{ name: 'Ph', value: 'PH' },
			{ name: 'Pl', value: 'PL' },
			{ name: 'Pt', value: 'PT' },
			{ name: 'Ru', value: 'RU' },
			{ name: 'Sa', value: 'SA' },
			{ name: 'Se', value: 'SE' },
			{ name: 'Tr', value: 'TR' },
			{ name: 'Tw', value: 'TW' },
			{ name: 'Us', value: 'US' },
			{ name: 'Za', value: 'ZA' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					country_code: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		default: 'ar',
		description: 'UI language code in ISO 639‑1 (optionally with country). Defaults to `en`.',
		options: [
			{ name: 'Ar', value: 'ar' },
			{ name: 'Bg', value: 'bg' },
			{ name: 'Bn', value: 'bn' },
			{ name: 'Ca', value: 'ca' },
			{ name: 'Cs', value: 'cs' },
			{ name: 'Da', value: 'da' },
			{ name: 'De', value: 'de' },
			{ name: 'En', value: 'en' },
			{ name: 'En-Gb', value: 'en-gb' },
			{ name: 'Es', value: 'es' },
			{ name: 'Et', value: 'et' },
			{ name: 'Eu', value: 'eu' },
			{ name: 'Fi', value: 'fi' },
			{ name: 'Fr', value: 'fr' },
			{ name: 'Gl', value: 'gl' },
			{ name: 'Gu', value: 'gu' },
			{ name: 'He', value: 'he' },
			{ name: 'Hi', value: 'hi' },
			{ name: 'Hr', value: 'hr' },
			{ name: 'Hu', value: 'hu' },
			{ name: 'Is', value: 'is' },
			{ name: 'It', value: 'it' },
			{ name: 'Jp', value: 'jp' },
			{ name: 'Kn', value: 'kn' },
			{ name: 'Ko', value: 'ko' },
			{ name: 'Lt', value: 'lt' },
			{ name: 'Lv', value: 'lv' },
			{ name: 'Ml', value: 'ml' },
			{ name: 'Mr', value: 'mr' },
			{ name: 'Ms', value: 'ms' },
			{ name: 'Nb', value: 'nb' },
			{ name: 'Nl', value: 'nl' },
			{ name: 'Pa', value: 'pa' },
			{ name: 'Pl', value: 'pl' },
			{ name: 'Pt-Br', value: 'pt-br' },
			{ name: 'Pt-Pt', value: 'pt-pt' },
			{ name: 'Ro', value: 'ro' },
			{ name: 'Ru', value: 'ru' },
			{ name: 'Sk', value: 'sk' },
			{ name: 'Sl', value: 'sl' },
			{ name: 'Sr', value: 'sr' },
			{ name: 'Sv', value: 'sv' },
			{ name: 'Ta', value: 'ta' },
			{ name: 'Te', value: 'te' },
			{ name: 'Th', value: 'th' },
			{ name: 'Tr', value: 'tr' },
			{ name: 'Uk', value: 'uk' },
			{ name: 'Vi', value: 'vi' },
			{ name: 'Zh-Hans', value: 'zh-hans' },
			{ name: 'Zh-Hant', value: 'zh-hant' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					language: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		description: 'Form‑factor used when requesting Bing News',
		options: [
			{ name: 'Desktop', value: 'desktop' },
			{ name: 'Mobile', value: 'mobile' },
			{ name: 'Tablet', value: 'tablet' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					device: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Safe Search',
		name: 'safe_search',
		type: 'options',
		default: 'moderate',
		description: 'Filters adult content from search results',
		options: [
			{ name: 'Moderate', value: 'moderate' },
			{ name: 'Strict', value: 'strict' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					safe_search: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Time Period',
		name: 'time_period',
		type: 'options',
		default: 'last_15_minutes',
		description: 'Restrict results to the given recency bucket',
		options: [
			{ name: 'Last 15 Minutes', value: 'last_15_minutes' },
			{ name: 'Last 24 Hours', value: 'last_24_hours' },
			{ name: 'Last 30 Days', value: 'last_30_days' },
			{ name: 'Last 30 Minutes', value: 'last_30_minutes' },
			{ name: 'Last 4 Hours', value: 'last_4_hours' },
			{ name: 'Last 5 Minutes', value: 'last_5_minutes' },
			{ name: 'Last 6 Hours', value: 'last_6_hours' },
			{ name: 'Last 7 Days', value: 'last_7_days' },
			{ name: 'Last Hour', value: 'last_hour' },
			{ name: 'Last Minute', value: 'last_minute' },
		],
		displayOptions,
		routing: {
			request: {
				qs: {
					time_period: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Sort By',
		name: 'sort_by',
		type: 'options',
		default: 'most_recent',
		description: 'Sort results by recency instead of relevance',
		options: [{ name: 'Most Recent', value: 'most_recent' }],
		displayOptions,
		routing: {
			request: {
				qs: {
					sort_by: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Page',
		name: 'page',
		type: 'string',
		default: '1',
		description: 'Page number for pagination (1‑based)',
		options: [],
		displayOptions,
		routing: {
			request: {
				qs: {
					page: '={{$value}}',
				},
			},
		},
	},

	{
		displayName: 'Num',
		name: 'num',
		type: 'string',
		default: '10',
		description: 'Number of results per page (max 50)',
		options: [],
		displayOptions,
		routing: {
			request: {
				qs: {
					num: '={{$value}}',
				},
			},
		},
	},
];

export const bing_news = {
	resource,
	properties,
};
