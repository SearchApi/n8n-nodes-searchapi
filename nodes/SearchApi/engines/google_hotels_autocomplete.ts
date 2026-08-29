import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_hotels_autocomplete'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Hotels Autocomplete',
  value: 'google_hotels_autocomplete'
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
          'af', 'am', '', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'en-GB', 'en-US', 'es',
          'es-419', 'et', 'eu', 'fa', 'fi', 'fil', 'fr', 'gl', 'gu', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'iw',
          'ja', 'ka', 'km', 'kn', 'ko', 'lo', 'lt', 'lv', 'mk', 'ml', 'mn', 'mr', 'ms', 'ne', 'nl', 'no', 'pa',
          'pl', 'pt-BR', 'pt-PT', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr', 'sr-Latn', 'sv', 'sw', 'ta', 'te',
          'th', 'tr', 'uk', 'ur', 'vi', 'zh-CN', 'zh-TW',
        ]),
        default: '',
        description: 'The default parameter en defines the interface language of the search. Check the full list of supported Google Travel hl languages.',
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

export const google_hotels_autocomplete = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-hotels-autocomplete-api',
};
