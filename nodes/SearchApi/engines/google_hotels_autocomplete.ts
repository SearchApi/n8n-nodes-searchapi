import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
        options: [
          { name: 'af', value: 'af' },
          { name: 'am', value: 'am' },
          { name: 'Any', value: '' },
          { name: 'ar', value: 'ar' },
          { name: 'bg', value: 'bg' },
          { name: 'bn', value: 'bn' },
          { name: 'bs', value: 'bs' },
          { name: 'ca', value: 'ca' },
          { name: 'cs', value: 'cs' },
          { name: 'da', value: 'da' },
          { name: 'de', value: 'de' },
          { name: 'el', value: 'el' },
          { name: 'en-GB', value: 'en-GB' },
          { name: 'en-US', value: 'en-US' },
          { name: 'es', value: 'es' },
          { name: 'es-419', value: 'es-419' },
          { name: 'et', value: 'et' },
          { name: 'eu', value: 'eu' },
          { name: 'fa', value: 'fa' },
          { name: 'fi', value: 'fi' },
          { name: 'Fil', value: 'fil' },
          { name: 'fr', value: 'fr' },
          { name: 'gl', value: 'gl' },
          { name: 'gu', value: 'gu' },
          { name: 'hi', value: 'hi' },
          { name: 'hr', value: 'hr' },
          { name: 'hu', value: 'hu' },
          { name: 'id', value: 'id' },
          { name: 'is', value: 'is' },
          { name: 'it', value: 'it' },
          { name: 'iw', value: 'iw' },
          { name: 'ja', value: 'ja' },
          { name: 'ka', value: 'ka' },
          { name: 'km', value: 'km' },
          { name: 'kn', value: 'kn' },
          { name: 'ko', value: 'ko' },
          { name: 'lo', value: 'lo' },
          { name: 'lt', value: 'lt' },
          { name: 'lv', value: 'lv' },
          { name: 'mk', value: 'mk' },
          { name: 'ml', value: 'ml' },
          { name: 'mn', value: 'mn' },
          { name: 'mr', value: 'mr' },
          { name: 'ms', value: 'ms' },
          { name: 'ne', value: 'ne' },
          { name: 'nl', value: 'nl' },
          { name: 'no', value: 'no' },
          { name: 'pa', value: 'pa' },
          { name: 'pl', value: 'pl' },
          { name: 'pt-BR', value: 'pt-BR' },
          { name: 'pt-PT', value: 'pt-PT' },
          { name: 'ro', value: 'ro' },
          { name: 'ru', value: 'ru' },
          { name: 'si', value: 'si' },
          { name: 'sk', value: 'sk' },
          { name: 'sl', value: 'sl' },
          { name: 'sq', value: 'sq' },
          { name: 'sr', value: 'sr' },
          { name: 'sr-Latn', value: 'sr-Latn' },
          { name: 'sv', value: 'sv' },
          { name: 'sw', value: 'sw' },
          { name: 'ta', value: 'ta' },
          { name: 'te', value: 'te' },
          { name: 'th', value: 'th' },
          { name: 'tr', value: 'tr' },
          { name: 'uk', value: 'uk' },
          { name: 'ur', value: 'ur' },
          { name: 'vi', value: 'vi' },
          { name: 'zh-CN', value: 'zh-CN' },
          { name: 'zh-TW', value: 'zh-TW' },
        ],
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
