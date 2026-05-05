import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
        options: [
          { name: 'Afrikaans', value: 'af' },
          { name: 'am', value: 'am' },
          { name: 'Any', value: '' },
          { name: 'ar', value: 'ar' },
          { name: 'bg', value: 'bg' },
          { name: 'bn', value: 'bn' },
          { name: 'Bosanski', value: 'bs' },
          { name: 'Català', value: 'ca' },
          { name: 'cs', value: 'cs' },
          { name: 'Dansk', value: 'da' },
          { name: 'Deutsch', value: 'de' },
          { name: 'Eesti', value: 'et' },
          { name: 'el', value: 'el' },
          { name: 'English (United Kingdom)', value: 'en-GB' },
          { name: 'English (United States)', value: 'en-US' },
          { name: 'Español (España)', value: 'es' },
          { name: 'Español (Latinoamérica)', value: 'es-419' },
          { name: 'Euskara', value: 'eu' },
          { name: 'fa', value: 'fa' },
          { name: 'Filipino', value: 'fil' },
          { name: 'Français', value: 'fr' },
          { name: 'Galego', value: 'gl' },
          { name: 'gu', value: 'gu' },
          { name: 'hi', value: 'hi' },
          { name: 'Hrvatski', value: 'hr' },
          { name: 'Indonesia', value: 'id' },
          { name: 'is', value: 'is' },
          { name: 'Italiano', value: 'it' },
          { name: 'iw', value: 'iw' },
          { name: 'ja', value: 'ja' },
          { name: 'ka', value: 'ka' },
          { name: 'Kiswahili', value: 'sw' },
          { name: 'km', value: 'km' },
          { name: 'kn', value: 'kn' },
          { name: 'ko', value: 'ko' },
          { name: 'Latviešu', value: 'lv' },
          { name: 'Lietuvių', value: 'lt' },
          { name: 'lo', value: 'lo' },
          { name: 'Magyar', value: 'hu' },
          { name: 'Melayu', value: 'ms' },
          { name: 'mk', value: 'mk' },
          { name: 'ml', value: 'ml' },
          { name: 'mn', value: 'mn' },
          { name: 'mr', value: 'mr' },
          { name: 'ne', value: 'ne' },
          { name: 'Nederlands', value: 'nl' },
          { name: 'Norsk', value: 'no' },
          { name: 'pa', value: 'pa' },
          { name: 'Polski', value: 'pl' },
          { name: 'Português (Brasil)', value: 'pt-BR' },
          { name: 'Português (Portugal)', value: 'pt-PT' },
          { name: 'Română', value: 'ro' },
          { name: 'ru', value: 'ru' },
          { name: 'Shqip', value: 'sq' },
          { name: 'si', value: 'si' },
          { name: 'Slovenčina', value: 'sk' },
          { name: 'Slovenščina', value: 'sl' },
          { name: 'sr', value: 'sr' },
          { name: 'Srpski (latinica)', value: 'sr-Latn' },
          { name: 'Suomi', value: 'fi' },
          { name: 'Svenska', value: 'sv' },
          { name: 'ta', value: 'ta' },
          { name: 'te', value: 'te' },
          { name: 'th', value: 'th' },
          { name: 'Tiếng Việt', value: 'vi' },
          { name: 'Türkçe', value: 'tr' },
          { name: 'uk', value: 'uk' },
          { name: 'ur', value: 'ur' },
          { name: 'zh-CN', value: 'zh-CN' },
          { name: 'zh-TW', value: 'zh-TW' },
        ],
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
        description: 'Defines which flight box to autocomplete.',
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
