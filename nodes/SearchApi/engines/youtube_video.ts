import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { YOUTUBE_COUNTRIES, YOUTUBE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['youtube_video'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube Video',
  value: 'youtube_video'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Video ID (video_id)',
    name: 'video_id',
    type: 'string',
    required: true,
    default: '',
    description: 'You can find these values in JSON responses in YouTube engine or in YouTube page that appears in URL: https://www.youtube.com/watch?v=video_id. Also accepts full YouTube URLs and share links (https://youtu.be/VIDEO_ID).',
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

export const youtube_video = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-video',
};
