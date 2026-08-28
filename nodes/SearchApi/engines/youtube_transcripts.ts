import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['youtube_transcripts'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube Transcripts',
  value: 'youtube_transcripts'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Video ID (video_id)',
    name: 'video_id',
    type: 'string',
    required: true,
    default: '',
    description: 'The video ID to search. You can find these values in JSON responses in the YouTube engine or in the YouTube page URL: https://www.youtube.com/watch?v=video_id. Also accepts full YouTube URLs and share links (https://youtu.be/VIDEO_ID).',
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
        displayName: 'Language (lang)',
        name: 'lang',
        type: 'options',
        options: languageOptions([
          'af', 'ak', 'sq', 'am', 'ar', 'hy', 'as', 'ay', 'az', 'bn', 'eu', 'be', 'bho', 'bs', 'bg', 'my',
          'ca', 'ceb', 'zh', 'zh-CN', 'zh-HK', 'zh-Hans', 'zh-SG', 'zh-TW', 'zh-Hant', 'co', 'hr', 'cs', 'da',
          'dv', 'nl', 'en', 'en-US', 'eo', 'et', 'ee', 'fil', 'fi', 'fr', 'gl', 'lg', 'ka', 'de', 'el', 'gn',
          'gu', 'ht', 'hak-TW', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jv',
          'kn', 'kk', 'km', 'rw', 'ko', 'kri', 'ku', 'ky', 'lo', 'la', 'lv', 'ln', 'lt', 'lb', 'mk', 'mg',
          'ms', 'ml', 'mt', 'mi', 'mr', 'nan-TW', 'mn', 'ne', 'nso', 'no', 'ny', 'or', 'om', 'ps', 'fa', 'pl',
          'pt', 'pa', 'qu', 'ro', 'ru', 'sm', 'sa', 'gd', 'sr', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'st', 'es',
          'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'ts', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi',
          'cy', 'fy', 'xh', 'yi', 'yo', 'zu',
        ]),
        default: 'en',
        description: 'Sets the default language for transcripts. While a variety of languages are supported, often only a few are available.',
        routing: {
          request: {
            qs: {
              lang: '={{$value}}',
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
        displayName: 'Only Available (only_available)',
        name: 'only_available',
        type: 'boolean',
        default: false,
        description: 'Whether to enable fallback behavior. The API first attempts to find a transcript matching your lang or transcript_name parameter. If no match is found, it returns the first available transcript instead of an error. Transcripts can still be filtered by transcript_type.',
        routing: {
          request: {
            qs: {
              only_available: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Transcript Name (transcript_name)',
        name: 'transcript_name',
        type: 'string',
        default: '',
        description: 'The transcript name to retrieve. Available transcript names can be found in the available_languages field of the video response. Use this to select the desired transcript by name instead of lang.',
        routing: {
          request: {
            qs: {
              transcript_name: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Transcript Type (transcript_type)',
        name: 'transcript_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Auto', value: 'auto' },
          { name: 'Manual', value: 'manual' },
        ],
        default: '',
        description: 'The transcript preference when both auto-generated and manually uploaded transcripts are available. auto prioritizes YouTube\'s auto-generated transcript. It can be translated into any lang language, but retrieval may be slower compared to manual transcripts. manual prioritizes manually uploaded transcripts.',
        routing: {
          request: {
            qs: {
              transcript_type: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const youtube_transcripts = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube-transcripts',
};
