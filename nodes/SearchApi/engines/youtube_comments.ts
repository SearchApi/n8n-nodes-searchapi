import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { YOUTUBE_COUNTRIES, YOUTUBE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { nextPageToken, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['youtube_comments'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube Comments',
  value: 'youtube_comments'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Video ID (video_id)',
    name: 'video_id',
    type: 'string',
    required: true,
    default: '',
    description: 'The unique identifier for a YouTube video. Find it in the video\'s URL, e.g., https://www.youtube.com/watch?v=video_id, or through our YouTube Search API. Also accepts full YouTube URLs (https://www.youtube.com/watch?v=VIDEO_ID) and share links (https://youtu.be/VIDEO_ID).',
    displayOptions,
    routing: {
      request: {
        qs: {
          video_id: '={{$value}}',
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
        options: countryOptions(YOUTUBE_COUNTRIES),
        default: 'US',
        description: 'Check the full list of supported YouTube gl countries',
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
        description: 'Check the full list of supported YouTube hl languages',
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
      nextPageToken('This token is used to retrieve the next page of comments or replies. When using the YouTube Comments API, use the next_page_token or replies_next_page_token provided in the previous response to load subsequent pages. For users of the YouTube Video API, comments_sorting_token can also facilitate pagination by fetching additional comment pages. Ensure the appropriate token is used based on the data context and API being accessed.')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const youtube_comments = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-comments',
};
