import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DUCKDUCKGO_LOCALES } from '../shared/lists';
import { localeOptions } from '../shared/options';
import { nextPageToken, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['duckduckgo_videos'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo Videos',
  value: 'duckduckgo_videos'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms to look up on DuckDuckGo Videos',
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
        displayName: 'Locale (locale)',
        name: 'locale',
        type: 'options',
        options: localeOptions(DUCKDUCKGO_LOCALES),
        default: '',
        description: 'Specifies the country and language for your search. The default parameter is us-en. Check the full list of supported DuckDuckGo locales.',
        routing: {
          request: {
            qs: {
              locale: '={{$value}}',
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
        displayName: 'Duration (duration)',
        name: 'duration',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Long', value: 'long' },
          { name: 'Medium', value: 'medium' },
          { name: 'Short', value: 'short' },
        ],
        default: '',
        description: 'Filters videos by duration',
        routing: {
          request: {
            qs: {
              duration: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'License (license)',
        name: 'license',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Creative common', value: 'creative_common' },
          { name: 'Youtube', value: 'youtube' },
        ],
        default: '',
        description: 'Filters videos by license',
        routing: {
          request: {
            qs: {
              license: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Resolution (resolution)',
        name: 'resolution',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'High', value: 'high' },
          { name: 'Standard', value: 'standard' },
        ],
        default: '',
        description: 'Filters videos by resolution',
        routing: {
          request: {
            qs: {
              resolution: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period (time_period)',
        name: 'time_period',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Any time', value: 'any_time' },
          { name: 'Past day', value: 'past_day' },
          { name: 'Past month', value: 'past_month' },
          { name: 'Past week', value: 'past_week' },
          { name: 'Past year', value: 'past_year' },
        ],
        default: '',
        description: 'Filters results by date',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
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
      nextPageToken('Retrieves the next page of results. Returned in the response when there are more results to display.')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const duckduckgo_videos = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-videos-api',
};
