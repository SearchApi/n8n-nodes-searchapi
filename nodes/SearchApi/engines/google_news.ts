import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DEVICE_OPTIONS, GOOGLE_COUNTRIES, GOOGLE_CR_COUNTRIES, GOOGLE_LR_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { numParam, pageParam, uule, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_news'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google News',
  value: 'google_news'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms to search on Google News. Queries can include operators and advanced filters like "climate change", site:, inurl:, intitle:, as_dt, or as_eq.',
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
        description: 'The default parameter desktop defines the search on a desktop device. The mobile parameter defines the search on a mobile device. The tablet parameter defines the search on a tablet device.',
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
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Specifies the canonical location of the search. For exact targeting or to see all available options, check out the Locations API. If multiple locations match your input, the most popular one will be selected.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
            },
          },
        },
      },
      uule('Sets the exact Google-encoded location for the search. The uule and location parameters cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.')
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions(GOOGLE_COUNTRIES),
        default: 'us',
        description: 'The default parameter us defines the country of the search. Check the full list of supported Google gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'CR (cr)',
        name: 'cr',
        type: 'options',
        options: countryOptions(GOOGLE_CR_COUNTRIES),
        default: '',
        description: 'Restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by Web server\'s IP address geographic location. Check the full list of supported Google cr countries.',
        routing: {
          request: {
            qs: {
              cr: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions([
          'ar', 'be', 'bn', 'bh', 'bg', 'ca', 'zh-cn', 'zh-tw', 'cs', 'da', 'nl', 'en', 'fr', 'gl', 'de', 'el',
          'kl', 'gu', 'ha', 'iw', 'hi', 'hu', 'id', 'it', 'ja', 'jw', 'kn', 'ko', 'lv', 'lt', 'ms', 'ml', 'mv',
          'mr', 'mo', 'sr-me', 'no', 'fa', 'pl', 'pt', 'pt-br', 'pt-pt', 'pa', 'ro', 'ru', 'sr', 'sh', 'sk',
          'sl', 'es', 'es-419', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vu', 'vi',
        ]),
        default: 'en',
        description: 'The default parameter en defines the interface language of the search. Check the full list of supported Google News hl languages.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'LR (lr)',
        name: 'lr',
        type: 'options',
        options: languageOptions(GOOGLE_LR_LANGUAGES),
        default: '',
        description: 'Restricts search results to documents written in a particular language or a set of languages. The accepted format is lang_{2-letter country code}. For instance, to filter documents written in Japanese, the value should be set to lang_jp. To incorporate multiple languages, a value like lang_it|lang_de restricts the search to documents written in either Italian or German. Google identifies the document language based on the top-level domain (TLD) of the document\'s URL, any language meta tags present, or the language utilized within the document\'s body text. Check the full list of supported Google lr languages.',
        routing: {
          request: {
            qs: {
              lr: '={{$value}}',
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
        displayName: 'Filter (filter)',
        name: 'filter',
        type: 'options',
        options: [
          { name: 'Disable "Duplicate Content" and "Host Crowding" filters', value: '0' },
          { name: 'Enable "Duplicate Content" and "Host Crowding" filters', value: '1' },
        ],
        default: '1',
        description: 'Controls whether the "Duplicate Content" and "Host Crowding" filters are enabled. Set the value to 1 to enable these filters, which is the default setting. To disable these filters, set the value to 0.',
        routing: {
          request: {
            qs: {
              filter: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'NFPR (nfpr)',
        name: 'nfpr',
        type: 'options',
        options: [
          { name: 'Exclude auto-corrected results', value: '1' },
          { name: 'Include auto-corrected results', value: '0' },
        ],
        default: '0',
        description: 'Controls whether results from queries that have been auto-corrected for spelling errors are included. To exclude these auto-corrected results, set the value to 1. By default, the value is 0, meaning auto-corrected results are included.',
        routing: {
          request: {
            qs: {
              nfpr: '={{$value}}',
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
          { name: 'Last 1 minute', value: 'last_1_minute' },
          { name: 'Last 15 minutes', value: 'last_15_minutes' },
          { name: 'Last 30 minutes', value: 'last_30_minutes' },
          { name: 'Last 5 minutes', value: 'last_5_minutes' },
          { name: 'Last day', value: 'last_day' },
          { name: 'Last hour', value: 'last_hour' },
          { name: 'Last month', value: 'last_month' },
          { name: 'Last week', value: 'last_week' },
          { name: 'Last year', value: 'last_year' },
        ],
        default: '',
        description: 'Restricts results to URLs based on date. Supported values are: last_hour for data from the past hour, last_day for the past 24 hours, last_week for the past week, last_month for the past month, and last_year for the past year. Using time_period_min or time_period_max parameters, you can specify a custom time period. Note, that the time_period_min and time_period_max parameters could be used separately as well.',
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
        description: 'Specifies the end of the time period. It could be used in combination with the time_period_min parameter. The value should be in the format MM/DD/YYYY.',
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
        description: 'Specifies the start of the time period. It could be used in combination with the time_period_max parameter. The value should be in the format MM/DD/YYYY.',
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
      numParam('Number of results to return. Values above 10 are capped at 10.', { displayName: 'Number of Results (num)', maxValue: 10 }),
      pageParam('Indicates which page of results to return. By default, it is set to 1.'),
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_news = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-news',
};
