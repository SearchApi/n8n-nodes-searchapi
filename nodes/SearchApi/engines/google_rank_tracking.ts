import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DEVICE_OPTIONS, GOOGLE_COUNTRIES, GOOGLE_LANGUAGES, GOOGLE_LR_LANGUAGES, GOOGLE_SAFE_OPTIONS } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { numParam, pageParam, uule, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_rank_tracking'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Rank Tracking',
  value: 'google_rank_tracking'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on Google and track ranking positions',
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
        description: 'Defines the device type for the search',
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
      uule('Sets the exact Google-encoded location for the search. uule and location cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.'),
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Specifies the canonical location of the search (e.g., New York). If multiple locations match your input, the most popular one will be selected.',
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
        description: 'Defines the country of the search',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
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
        description: 'Defines the interface language of the search',
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
        description: 'Restricts search results to documents written in a particular language. The accepted format is lang_{2-letter country code}.',
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
    displayName: 'Search Settings',
    name: 'search_settings',
    type: 'collection',
    placeholder: 'Add Search Settings',
    default: {},
    options: [
      pageParam('Page number for pagination (1-10). Each page contains 10 results. For example, page=2 fetches positions 11-20, and page=3 fetches positions 21-30. Note: Results are capped at position 100. If page=10 and num=100, only positions 91-100 are returned.', { maxValue: 10 }),
      numParam('Number of results to return. Can be customized from 1 to 100.', { displayName: 'Results Count (num)', maxValue: 100, defaultValue: 100 }),
      {
        displayName: 'Safe (safe)',
        name: 'safe',
        type: 'options',
        options: GOOGLE_SAFE_OPTIONS,
        default: 'blur',
        description: 'Toggles the SafeSearch feature',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_rank_tracking = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-rank-tracking-api',
};
