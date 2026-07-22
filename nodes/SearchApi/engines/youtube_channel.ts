import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['youtube_channel'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube Channel',
  value: 'youtube_channel'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Channel ID (channel_id)',
    name: 'channel_id',
    type: 'string',
    required: true,
    default: '',
    description: 'Identifies the YouTube channel to query. Accepts a channel ID or an \'@\' handle from YouTube URLs. For channel IDs, use the format: https://www.youtube.com/channel/CHANNEL_ID. For \'@\' handles, use: https://www.youtube.com/@HANDLE. Examples: UCXZCJLdBC09xxGZ6gcdrc6A for channel IDs; @BostonDynamics for \'@\' handles.',
    displayOptions,
    routing: {
      request: {
        qs: {
          channel_id: '={{$value}}',
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions([
          'DZ', '', 'AR', 'AU', 'AT', 'AZ', 'BH', 'BD', 'BY', 'BE', 'BO', 'BA', 'BR', 'BG', 'KH', 'CA', 'CL',
          'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DO', 'EC', 'EG', 'SV', 'EE', 'FI', 'FR', 'GE', 'DE', 'GH', 'GR',
          'GT', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IQ', 'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KW',
          'LA', 'LV', 'LB', 'LY', 'LI', 'LT', 'LU', 'MY', 'MT', 'MX', 'ME', 'MA', 'NP', 'NL', 'NZ', 'NI', 'NG',
          'MK', 'NO', 'OM', 'PK', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'SA', 'SN',
          'RS', 'SG', 'SK', 'SI', 'ZA', 'KR', 'ES', 'LK', 'SE', 'CH', 'TW', 'TZ', 'TH', 'TN', 'TR', 'UG', 'UA',
          'AE', 'GB', 'US', 'UY', 'VE', 'VN', 'YE', 'ZW',
        ]),
        default: '',
        description: 'Defines the country of the search. Check the full list of supported YouTube gl countries.',
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
        options: languageOptions([
          'af', 'am', 'ar', 'as', 'az', 'be', 'bg', 'bn', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'en', 'en-gb',
          'en-in', 'es', 'es-419', 'es-us', 'et', 'eu', 'fa', 'fi', 'fil', 'fr', 'fr-ca', 'gl', 'gu', 'hi',
          'hr', 'hu', 'hy', 'id', 'is', 'it', 'iw', 'ja', 'ka', 'kk', 'km', 'kn', 'ko', 'ky', 'lo', 'lt', 'lv',
          'mk', 'ml', 'mn', 'mr', 'ms', 'my', 'ne', 'nl', 'no', 'or', 'pa', 'pl', 'pt', 'pt-pt', 'ro', 'ru',
          'si', 'sk', 'sl', 'sq', 'sr', 'sr-latn', 'sv', 'sw', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi',
          'zh-cn', 'zh-hk', 'zh-tw', 'zu',
        ]),
        default: 'en',
        description: 'Defines the interface language of the search. Check the full list of supported YouTube hl languages.',
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

export const youtube_channel = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-channel',
};
