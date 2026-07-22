import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_flights_location_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Flights Location Search',
  value: 'google_flights_location_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search query that would produce autocomplete suggestions',
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
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
      {
        displayName: 'Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions([
          'af', 'am', '', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'da', 'de', 'et', 'el', 'en-GB', 'en-US', 'es',
          'es-419', 'eu', 'fa', 'fil', 'fr', 'gl', 'gu', 'hi', 'hr', 'id', 'is', 'it', 'iw', 'ja', 'ka', 'sw',
          'km', 'kn', 'ko', 'lv', 'lt', 'lo', 'hu', 'ms', 'mk', 'ml', 'mn', 'mr', 'ne', 'nl', 'no', 'pa', 'pl',
          'pt-BR', 'pt-PT', 'ro', 'ru', 'sq', 'si', 'sk', 'sl', 'sr', 'sr-Latn', 'fi', 'sv', 'ta', 'te', 'th',
          'vi', 'tr', 'uk', 'ur', 'zh-CN', 'zh-TW',
        ]),
        default: '',
        description: 'Defines the interface language of the search. Check the full list of supported Google Travel hl languages.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
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
        displayName: 'Search Type (search_type)',
        name: 'search_type',
        type: 'options',
        options: [
          { name: 'Arrival', value: 'arrival' },
          { name: 'Departure', value: 'departure' },
        ],
        default: 'departure',
        description: 'Defines which flight box to autocomplete',
        routing: {
          request: {
            qs: {
              search_type: '={{$value}}',
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

export const google_flights_location_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-flights-location-search-api',
};
