import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BING_COUNTRIES, BING_LANGUAGES, BING_MARKET_CODES, DEVICE_OPTIONS } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { numParam, pageParam, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['bing_news'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Bing News',
  value: 'bing_news'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    default: '',
    description: 'Search terms for Bing News. Queries can include operators and advanced filters like "climate change", site:, inurl:, or intitle:. Optional when category is used; if both are provided, category takes priority.',
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
    displayName: 'Search Query',
    name: 'search_query',
    type: 'collection',
    placeholder: 'Add Search Query',
    default: {},
    options: [
      {
        displayName: 'Category (category)',
        name: 'category',
        type: 'string',
        default: '',
        description: 'Category to search in Bing News, found in the Bing News URL as the nvaug parameter value. Example: nvaug=%5bNewsVertical+Category%3d"rt_CATEGORY"%5d. To retrieve Top Stories, set to MaxClass.',
        routing: {
          request: {
            qs: {
              category: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
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
        displayName: 'Market Code (market_code)',
        name: 'market_code',
        type: 'options',
        options: BING_MARKET_CODES,
        default: 'en-us',
        description: 'Defines the country for search results. Format is language-country. Example: en-US. Cannot be used together with country_code.',
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
        description: 'Specifies the country for search results when market_code is not set. Cannot be used together with market_code.',
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
        description: 'Sets the language for user interface text. Use 2-letter (ISO 639-1) or 4-letter codes (\'language-country\'). Defaults to en (English) if unspecified or unsupported.',
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
        displayName: 'Safe Search (safe_search)',
        name: 'safe_search',
        type: 'options',
        options: [
          { name: 'Moderate', value: 'moderate' },
          { name: 'Off', value: 'off' },
          { name: 'Strict', value: 'strict' },
        ],
        default: 'moderate',
        description: 'Filters adult content from search results. In some market_code values, strict is enforced regardless of this setting.',
        routing: {
          request: {
            qs: {
              safe_search: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Most recent', value: 'most_recent' },
        ],
        default: '',
        description: 'By default, news results are sorted by relevance. To get the most recent articles, set it to most_recent.',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
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
          { name: 'Last 15 minutes', value: 'last_15_minutes' },
          { name: 'Last 24 hours', value: 'last_24_hours' },
          { name: 'Last 30 days', value: 'last_30_days' },
          { name: 'Last 30 minutes', value: 'last_30_minutes' },
          { name: 'Last 4 hours', value: 'last_4_hours' },
          { name: 'Last 5 minutes', value: 'last_5_minutes' },
          { name: 'Last 6 hours', value: 'last_6_hours' },
          { name: 'Last 7 days', value: 'last_7_days' },
          { name: 'Last hour', value: 'last_hour' },
          { name: 'Last minute', value: 'last_minute' },
        ],
        default: '',
        description: 'Filters search results by publication time period. By default, returns all articles without a time filter.',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
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
      pageParam('Page of results to return. Use with num to paginate results.'),
      numParam('Number of results to return per page. Maximum is 50. Use with page to paginate results.')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const bing_news = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/bing-news',
};
