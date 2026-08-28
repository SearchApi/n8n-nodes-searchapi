import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DEVICE_OPTIONS, GOOGLE_COUNTRIES, GOOGLE_CR_COUNTRIES, GOOGLE_LANGUAGES, GOOGLE_LR_LANGUAGES, GOOGLE_SAFE_OPTIONS } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { numParam, pageParam, uule, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google',
  value: 'google'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    default: '',
    description: 'Search terms for Google. Queries can include operators and advanced filters like "machine learning models", site:, inurl:, intitle:, AND, or OR. Note: Not required if the kgmid parameter is being used. Either q or kgmid must be provided.',
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
    displayName: 'Kgmid (kgmid)',
    name: 'kgmid',
    type: 'string',
    default: '',
    description: 'Defines a Knowledge Graph identifier (kgmid), representing entities in Google\'s Knowledge Graph. Format: Location Identifier (/m/): Typically followed by 2 to 7 characters. Used primarily to represent specific locations. Find the identifier by searching for the "Freebase ID" on Wikidata. Example: kgmid=/m/02_286 refers to New York. Google Knowledge Graph Identifier (/g/): Typically followed by a longer alphanumeric string. Represents general entities in Google\'s Knowledge Graph. Find details on Wikidata. Example: kgmid=/g/11f555cn8l refers to TikTok.',
    displayOptions,
    routing: {
      request: {
        qs: {
          kgmid: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Device (device)',
    name: 'device',
    type: 'options',
    options: DEVICE_OPTIONS,
    default: 'desktop',
    description: 'The default parameter desktop defines the search on a desktop device. The mobile parameter defines the search on a mobile device. The tablet parameter defines the search on a tablet device.',
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
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
      uule('Sets the exact Google-encoded location for the search. Cannot be used together with the location parameter. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.'),
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Specifies the canonical location of the search. If multiple locations match your input, the most popular one will be selected. For example, location=New York selects New York,United States, or location=London selects London TV Region,England,United Kingdom.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions(GOOGLE_COUNTRIES),
        default: 'us',
        description: 'Defines the country of the search. Defaults to us. Note: with optimization_strategy=ads a narrower country list applies and some values are rejected.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Country Restrict (cr)',
        name: 'cr',
        type: 'options',
        options: countryOptions(GOOGLE_CR_COUNTRIES),
        default: '',
        description: 'Restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by the web server\'s IP address geographic location.',
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
        options: languageOptions(GOOGLE_LANGUAGES),
        default: 'en',
        description: 'Defines the interface language of the search. Defaults to en.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language Restrict (lr)',
        name: 'lr',
        type: 'options',
        options: languageOptions(GOOGLE_LR_LANGUAGES),
        default: '',
        description: 'Restricts search results to documents written in a particular language or a set of languages. The accepted format is lang_{2-letter language code}, for example lang_jp for Japanese. To restrict to multiple languages, combine with a pipe: lang_it|lang_de. Google identifies the document language from the URL\'s top-level domain, language meta tags, or the body text.',
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
        description: 'Controls whether the "Duplicate Content" and "Host Crowding" filters are enabled. Defaults to 1 (enabled).',
        routing: {
          request: {
            qs: {
              filter: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Include Redirect Link (include_redirect_link)',
        name: 'include_redirect_link',
        type: 'options',
        options: [
          { name: '', value: '' },
          { name: 'True', value: 'true' },
          { name: 'False', value: 'false' },
        ],
        default: '',
        description: 'Whether to include the Google redirect link for each organic result',
        routing: {
          request: {
            qs: {
              include_redirect_link: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Nfpr (nfpr)',
        name: 'nfpr',
        type: 'options',
        options: [
          { name: 'Exclude auto-corrected results', value: '1' },
          { name: 'Include auto-corrected results', value: '0' },
        ],
        default: '0',
        description: 'Controls whether results from auto-corrected spelling queries are included. Set to 1 to exclude auto-corrected results. Defaults to 0 (auto-corrected results included).',
        routing: {
          request: {
            qs: {
              nfpr: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Safe (safe)',
        name: 'safe',
        type: 'options',
        options: GOOGLE_SAFE_OPTIONS,
        default: 'blur',
        description: 'Toggles the SafeSearch feature, which filters adult content from search results using Google\'s proprietary keyword, phrase, and URL analysis. Defaults to blur.',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
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
        description: 'Restricts results to URLs based on date. Use time_period_min or time_period_max for a custom date range.',
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
        description: 'Specifies the end of the custom time period. Can be used with time_period_min. Format: MM/DD/YYYY.',
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
        description: 'Specifies the start of the custom time period. Can be used with time_period_max. Format: MM/DD/YYYY.',
        routing: {
          request: {
            qs: {
              time_period_min: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Verbatim (verbatim)',
        name: 'verbatim',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'True', value: 'true' },
        ],
        default: '',
        description: 'Forces Google to use your exact keywords, bypassing automatic spelling corrections, synonyms, and stemmed variations. Can be combined with time_period filters. Note: Verbatim mode is stricter than nfpr=1: it disables all query modifications, not just spelling corrections.',
        routing: {
          request: {
            qs: {
              verbatim: '={{$value}}',
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
    placeholder: 'Add Pagination',
    default: {},
    options: [
      pageParam('Indicates which page of results to return. Defaults to 1.'),
      numParam('Number of results to return. Google phased out larger pages in September 2025, so values above 10 are capped at 10.', { maxValue: 10 })
    ],
    displayOptions,
  },
  {
    displayName: 'Optimization Strategy (optimization_strategy)',
    name: 'optimization_strategy',
    type: 'options',
    options: [
      { name: 'Ad Scraping Rate', value: 'ads' },
      { name: 'Performance', value: 'performance' },
    ],
    default: 'performance',
    description: 'Controls how the search request is optimized. The ads option prioritizes ad collection success rate at the cost of longer processing times.',
    displayOptions,
    routing: {
      request: {
        qs: {
          optimization_strategy: '={{$value}}',
        },
      },
    },
  },
  zeroDataRetention(displayOptions)
];

export const google = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google',
};
