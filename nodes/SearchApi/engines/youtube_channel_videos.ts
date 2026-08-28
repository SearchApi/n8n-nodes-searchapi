import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { YOUTUBE_CHANNEL_COUNTRIES, YOUTUBE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { nextPageToken, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['youtube_channel_videos'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube Channel Videos',
  value: 'youtube_channel_videos'
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
        options: languageOptions(YOUTUBE_LANGUAGES),
        default: 'en',
        description: 'Defines the interface language of the search',
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
    displayName: 'Pagination',
    name: 'pagination',
    type: 'collection',
    placeholder: 'Add Pagination',
    default: {},
    options: [
      nextPageToken('A token used to retrieve the next page of videos or apply specific filters such as "Popular" or "Oldest". On the first request, the API response includes a pagination.filters array, which provides tokens for different sorting options. The default sorting is "Most Recent". Use the next_page_token for a selected filter to retrieve results for that filter. For subsequent requests within the same filter, use the pagination.next_page_token from the response to continue pagination.Note: Tokens can grow large (8KB+) after several pages. If you encounter 413 or 414 errors, use a POST request with the token in the JSON body instead of the URL query string.')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const youtube_channel_videos = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-channel-videos-api',
};
