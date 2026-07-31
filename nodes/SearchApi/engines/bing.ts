import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

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
    description: 'Search terms to query on Bing — supports operators and advanced filters like "machine learning models", site:, feed:, AND, or OR',
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
        description: 'Canonical location for the search — if multiple locations match, the most popular one is selected. Example: "New York" selects New York, United States.',
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
        options: [
          { name: 'Any', value: '' },
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
          { name: 'zh-cn', value: 'zh-cn' },
          { name: 'zh-hk', value: 'zh-hk' },
          { name: 'zh-tw', value: 'zh-tw' },
        ],
        default: '',
        description: 'Country for search results — format is language-country, like en-US. Cannot be used together with country_code.',
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
        description: 'Country for search results when market_code is not set — defaults to US. Cannot be used together with market_code.',
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
          'gu', 'he', 'hi', 'hr', 'hu', 'is', 'it', 'ja', 'jp', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'nb', 'nl',
          'pa', 'pl', 'pt-br', 'pt-pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vi',
          'zh-hans', 'zh-hant',
        ]),
        default: '',
        description: 'Language for UI text — accepts 2-letter (ISO 639-1) or 4-letter codes. Defaults to en (English) if unspecified or unsupported.',
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
        description: 'Restricts search results using filter values — supports date-based filters (ex1%3a"ez1" for past 24h, ex1%3a"ez2" for past week, ex1%3a"ez3" for past month). Construct complex filter values by searching on Bing and copying the filters parameter.',
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
        description: 'Filters adult content from results — in some market_code values, strict is enforced regardless of this setting',
        routing: {
          request: {
            qs: {
              safe_search: '={{$value}}',
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
        type: 'string',
        default: '1',
        description: 'Page of results to return — defaults to 1',
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

export const bing = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/bing',
};
