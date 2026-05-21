import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
        description: 'Latitude of the location to use for the search',
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
        description: 'Longitude of the location to use for the search',
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
        options: [
          { name: 'Any', value: '' },
          { name: 'AR', value: 'AR' },
          { name: 'AT', value: 'AT' },
          { name: 'AU', value: 'AU' },
          { name: 'BE', value: 'BE' },
          { name: 'BR', value: 'BR' },
          { name: 'CA', value: 'CA' },
          { name: 'CH', value: 'CH' },
          { name: 'CL', value: 'CL' },
          { name: 'CN', value: 'CN' },
          { name: 'DE', value: 'DE' },
          { name: 'DK', value: 'DK' },
          { name: 'ES', value: 'ES' },
          { name: 'FI', value: 'FI' },
          { name: 'FR', value: 'FR' },
          { name: 'GB', value: 'GB' },
          { name: 'HK', value: 'HK' },
          { name: 'ID', value: 'ID' },
          { name: 'IN', value: 'IN' },
          { name: 'IT', value: 'IT' },
          { name: 'JP', value: 'JP' },
          { name: 'KR', value: 'KR' },
          { name: 'MX', value: 'MX' },
          { name: 'MY', value: 'MY' },
          { name: 'NL', value: 'NL' },
          { name: 'NO', value: 'NO' },
          { name: 'NZ', value: 'NZ' },
          { name: 'PH', value: 'PH' },
          { name: 'PL', value: 'PL' },
          { name: 'PT', value: 'PT' },
          { name: 'RU', value: 'RU' },
          { name: 'SA', value: 'SA' },
          { name: 'SE', value: 'SE' },
          { name: 'TR', value: 'TR' },
          { name: 'TW', value: 'TW' },
          { name: 'US', value: 'US' },
          { name: 'ZA', value: 'ZA' },
        ],
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
        options: [
          { name: 'Any', value: '' },
          { name: 'ar', value: 'ar' },
          { name: 'bg', value: 'bg' },
          { name: 'bn', value: 'bn' },
          { name: 'ca', value: 'ca' },
          { name: 'cs', value: 'cs' },
          { name: 'da', value: 'da' },
          { name: 'de', value: 'de' },
          { name: 'en', value: 'en' },
          { name: 'en-gb', value: 'en-gb' },
          { name: 'es', value: 'es' },
          { name: 'et', value: 'et' },
          { name: 'eu', value: 'eu' },
          { name: 'fi', value: 'fi' },
          { name: 'fr', value: 'fr' },
          { name: 'gl', value: 'gl' },
          { name: 'gu', value: 'gu' },
          { name: 'he', value: 'he' },
          { name: 'hi', value: 'hi' },
          { name: 'hr', value: 'hr' },
          { name: 'hu', value: 'hu' },
          { name: 'is', value: 'is' },
          { name: 'it', value: 'it' },
          { name: 'jp', value: 'jp' },
          { name: 'kn', value: 'kn' },
          { name: 'ko', value: 'ko' },
          { name: 'lt', value: 'lt' },
          { name: 'lv', value: 'lv' },
          { name: 'ml', value: 'ml' },
          { name: 'mr', value: 'mr' },
          { name: 'ms', value: 'ms' },
          { name: 'nb', value: 'nb' },
          { name: 'nl', value: 'nl' },
          { name: 'pa', value: 'pa' },
          { name: 'pl', value: 'pl' },
          { name: 'pt-br', value: 'pt-br' },
          { name: 'pt-pt', value: 'pt-pt' },
          { name: 'ro', value: 'ro' },
          { name: 'ru', value: 'ru' },
          { name: 'sk', value: 'sk' },
          { name: 'sl', value: 'sl' },
          { name: 'sr', value: 'sr' },
          { name: 'sv', value: 'sv' },
          { name: 'ta', value: 'ta' },
          { name: 'te', value: 'te' },
          { name: 'th', value: 'th' },
          { name: 'tr', value: 'tr' },
          { name: 'uk', value: 'uk' },
          { name: 'vi', value: 'vi' },
          { name: 'zh-hans', value: 'zh-hans' },
          { name: 'zh-hant', value: 'zh-hant' },
        ],
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
        displayName: 'Results Per Page (num)',
        name: 'num',
        type: 'string',
        default: '10',
        description: 'Number of results per page — maximum 50. Use with page to paginate.',
        routing: {
          request: {
            qs: {
              num: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Page Number (page)',
        name: 'page',
        type: 'string',
        default: '1',
        description: 'Page of results to return — defaults to 1. Use with num to paginate.',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
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

export const bing = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/bing',
};
