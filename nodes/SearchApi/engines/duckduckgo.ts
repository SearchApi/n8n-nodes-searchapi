import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DUCKDUCKGO_LOCALES } from '../shared/lists';
import { localeOptions } from '../shared/options';
import { nextPageToken, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['duckduckgo'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo',
  value: 'duckduckgo'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms for DuckDuckGo. Queries can include operators and advanced filters like "machine learning models", site:, intitle:, or inurl:.',
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
        description: 'Country and language for your search. Defaults to us-en.',
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
        displayName: 'Safe (safe)',
        name: 'safe',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Moderate', value: 'moderate' },
          { name: 'Off', value: 'off' },
          { name: 'On', value: 'on' },
        ],
        default: '',
        description: 'Filter level for adult content',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
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
        description: 'Filters results by date. Supports a custom date range using the format YYYY-MM-DD..YYYY-MM-DD.',
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
      nextPageToken('Token returned in the response to retrieve the next page of results')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const duckduckgo = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-api',
};
