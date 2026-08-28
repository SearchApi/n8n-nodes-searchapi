import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { YOUTUBE_COUNTRIES, YOUTUBE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['youtube'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Youtube',
  value: 'youtube'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Queries can include terms like "cooking tutorials" or "music videos"',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Search Filter (sp)',
        name: 'sp',
        type: 'string',
        default: '',
        description: 'For example, the CAI filter restricts the search to videos that were uploaded recently. This parameter is also used when fetching the next page of search results. Replace the current value of the sp parameter with the next_page_token value from the current response in the new search request. This ensures that the filters applied in the initial request are preserved across subsequent pages.',
        routing: {
          request: {
            qs: {
              sp: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
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
  zeroDataRetention(displayOptions)
];

export const youtube = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/youtube',
};
