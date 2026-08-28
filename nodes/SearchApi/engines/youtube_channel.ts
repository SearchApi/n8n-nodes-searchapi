import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { YOUTUBE_CHANNEL_COUNTRIES, YOUTUBE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

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
        options: countryOptions(YOUTUBE_CHANNEL_COUNTRIES),
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
        options: languageOptions(YOUTUBE_LANGUAGES),
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
  zeroDataRetention(displayOptions)
];

export const youtube_channel = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-channel',
};
