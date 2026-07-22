import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

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
    description: 'Search terms for Bing News. Queries can include operators and advanced filters like "climate change", site:, inurl:, or intitle:. Optional when category is used — if both are provided, category takes priority.',
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
        description: 'Category to search in Bing News — found in the Bing News URL as the nvaug parameter value. Example: nvaug=%5bNewsVertical+Category%3d"rt_CATEGORY"%5d. To retrieve Top Stories, set to MaxClass.',
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
        options: [
          { name: 'Desktop', value: 'desktop' },
          { name: 'Mobile', value: 'mobile' },
          { name: 'Tablet', value: 'tablet' },
        ],
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
        options: [
          { name: 'da-dk', value: 'da-dk' },
          { name: 'de-at', value: 'de-at' },
          { name: 'de-ch', value: 'de-ch' },
          { name: 'de-de', value: 'de-de' },
          { name: 'en-au', value: 'en-au' },
          { name: 'en-ca', value: 'en-ca' },
          { name: 'en-gb', value: 'en-gb' },
          { name: 'en-id', value: 'en-id' },
          { name: 'en-in', value: 'en-in' },
          { name: 'en-my', value: 'en-my' },
          { name: 'en-nz', value: 'en-nz' },
          { name: 'en-ph', value: 'en-ph' },
          { name: 'en-us', value: 'en-us' },
          { name: 'en-za', value: 'en-za' },
          { name: 'es-ar', value: 'es-ar' },
          { name: 'es-cl', value: 'es-cl' },
          { name: 'es-es', value: 'es-es' },
          { name: 'es-mx', value: 'es-mx' },
          { name: 'es-us', value: 'es-us' },
          { name: 'fi-fi', value: 'fi-fi' },
          { name: 'fr-be', value: 'fr-be' },
          { name: 'fr-ca', value: 'fr-ca' },
          { name: 'fr-ch', value: 'fr-ch' },
          { name: 'fr-fr', value: 'fr-fr' },
          { name: 'it-it', value: 'it-it' },
          { name: 'ja-jp', value: 'ja-jp' },
          { name: 'ko-kr', value: 'ko-kr' },
          { name: 'nl-be', value: 'nl-be' },
          { name: 'nl-nl', value: 'nl-nl' },
          { name: 'no-no', value: 'no-no' },
          { name: 'pl-pl', value: 'pl-pl' },
          { name: 'pt-br', value: 'pt-br' },
          { name: 'ru-ru', value: 'ru-ru' },
          { name: 'sv-se', value: 'sv-se' },
          { name: 'tr-tr', value: 'tr-tr' },
          { name: 'zh-hk', value: 'zh-hk' },
          { name: 'zh-tw', value: 'zh-tw' },
        ],
        default: 'en-us',
        description: 'Defines the country for search results. Format is language-country — Example: en-US. Cannot be used together with country_code.',
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
        options: countryOptions([
          '', 'AR', 'AT', 'AU', 'BE', 'BR', 'CA', 'CH', 'CL', 'CN', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'HK',
          'ID', 'IN', 'IT', 'JP', 'KR', 'MX', 'MY', 'NL', 'NO', 'NZ', 'PH', 'PL', 'PT', 'RU', 'SA', 'SE', 'TR',
          'TW', 'US', 'ZA',
        ]),
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
        options: languageOptions([
          '', 'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'en', 'en-gb', 'es', 'et', 'eu', 'fi', 'fr', 'gl',
          'gu', 'he', 'hi', 'hr', 'hu', 'is', 'it', 'jp', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'nb', 'nl',
          'pa', 'pl', 'pt-br', 'pt-pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vi',
          'zh-hans', 'zh-hant',
        ]),
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
      {
        displayName: 'Page Number (page)',
        name: 'page',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Page of results to return. Use with num to paginate results.',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Results Per Page (num)',
        name: 'num',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 10,
        description: 'Number of results to return per page. Maximum is 50. Use with page to paginate results.',
        routing: {
          request: {
            qs: {
              num: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Zero Data Retention',
    name: 'zero_data_retention',
    type: 'collection',
    placeholder: 'Add Zero Data Retention',
    default: {},
    options: [
      {
        displayName: 'Zero Retention (zero_retention)',
        name: 'zero_retention',
        type: 'boolean',
        default: false,
        description: 'Whether to disable all logging and persistent storage. No request parameters, HTML, or JSON responses are stored or logged. Suitable for high-compliance use cases. Debugging and support may be limited while enabled.',
        routing: {
          request: {
            qs: {
              zero_retention: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  }
];

export const bing_news = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/bing-news',
};
