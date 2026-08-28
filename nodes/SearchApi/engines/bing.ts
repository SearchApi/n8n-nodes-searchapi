import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BING_COUNTRIES, BING_LANGUAGES, BING_MARKET_CODES, DEVICE_OPTIONS } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { pageParam, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['bing'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Bing',
  value: 'bing'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms to query on Bing. Supports operators and advanced filters like "machine learning models", site:, feed:, AND, or OR.',
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
    displayName: 'Device',
    name: 'device',
    type: 'collection',
    placeholder: 'Add Device',
    default: {},
    options: [
      {
        displayName: 'Device (device)',
        name: 'device',
        type: 'options',
        options: DEVICE_OPTIONS,
        default: 'desktop',
        description: 'Device type used to perform the search',
        routing: {
          request: {
            qs: {
              device: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
      {
        displayName: 'Latitude (lat)',
        name: 'lat',
        type: 'string',
        default: '',
        description: 'Latitude of the location to use for the search, between -90 and 90. Must be used together with lon.',
        routing: {
          request: {
            qs: {
              lat: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Canonical location for the search. If multiple locations match, the most popular one is selected. Example: "New York" selects New York, United States.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Longitude (lon)',
        name: 'lon',
        type: 'string',
        default: '',
        description: 'Longitude of the location to use for the search, between -180 and 180. Must be used together with lat.',
        routing: {
          request: {
            qs: {
              lon: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Market Code (market_code)',
        name: 'market_code',
        type: 'options',
        options: BING_MARKET_CODES,
        default: '',
        description: 'Country for search results. Format is language-country, like en-US. Cannot be used together with country_code.',
        routing: {
          request: {
            qs: {
              market_code: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
      {
        displayName: 'Country Code (country_code)',
        name: 'country_code',
        type: 'options',
        options: countryOptions(BING_COUNTRIES),
        default: '',
        description: 'Country for search results when market_code is not set. Defaults to US. Cannot be used together with market_code.',
        routing: {
          request: {
            qs: {
              country_code: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language (language)',
        name: 'language',
        type: 'options',
        options: languageOptions(BING_LANGUAGES),
        default: '',
        description: 'Language for UI text. Accepts 2-letter (ISO 639-1) or 4-letter codes. Defaults to en (English) if unspecified or unsupported.',
        routing: {
          request: {
            qs: {
              language: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Filters (filters)',
        name: 'filters',
        type: 'string',
        default: '',
        description: 'Restricts search results using filter values. Supports date-based filters (ex1%3a"ez1" for past 24h, ex1%3a"ez2" for past week, ex1%3a"ez3" for past month). Construct complex filter values by searching on Bing and copying the filters parameter.',
        routing: {
          request: {
            qs: {
              filters: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Safe Search (safe_search)',
        name: 'safe_search',
        type: 'options',
        options: [
          { name: 'Moderate', value: 'moderate' },
          { name: 'Off', value: 'off' },
          { name: 'Strict', value: 'strict' },
        ],
        default: 'moderate',
        description: 'Filters adult content from results. In some market_code values, strict is enforced regardless of this setting.',
        routing: {
          request: {
            qs: {
              safe_search: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period (time_period)',
        name: 'time_period',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Last day', value: 'last_day' },
          { name: 'Last month', value: 'last_month' },
          { name: 'Last week', value: 'last_week' },
          { name: 'Last year', value: 'last_year' },
        ],
        default: '',
        description: 'Restricts results to a relative time period. Cannot be combined with filters.',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period Max (time_period_max)',
        name: 'time_period_max',
        type: 'string',
        default: '',
        description: 'End of a custom time period, in MM/DD/YYYY or YYYY-MM-DD format. Cannot be combined with filters.',
        routing: {
          request: {
            qs: {
              time_period_max: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period Min (time_period_min)',
        name: 'time_period_min',
        type: 'string',
        default: '',
        description: 'Start of a custom time period, in MM/DD/YYYY or YYYY-MM-DD format. Cannot be combined with filters.',
        routing: {
          request: {
            qs: {
              time_period_min: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Pagination',
    name: 'pagination',
    type: 'collection',
    placeholder: 'Add Pagination',
    default: {},
    options: [
      pageParam('Page of results to return. Defaults to 1.'),

    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const bing = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/bing',
};
