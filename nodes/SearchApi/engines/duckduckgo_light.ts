import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DUCKDUCKGO_LOCALES } from '../shared/lists';
import { localeOptions } from '../shared/options';
import { nextPageToken, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['duckduckgo_light'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo Light',
  value: 'duckduckgo_light'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'The query you want to search. You can use any search terms or phrases, such as "best coffee shops" or "machine learning".',
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
        default: 'us-en',
        description: 'Specifies the country and language for your search. Check the full list of supported DuckDuckGo locales.',
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
        displayName: 'Time Period (time_period)',
        name: 'time_period',
        type: 'options',
        options: [
          { name: 'Any time', value: 'any_time' },
          { name: 'Past day', value: 'past_day' },
          { name: 'Past month', value: 'past_month' },
          { name: 'Past week', value: 'past_week' },
          { name: 'Past year', value: 'past_year' },
        ],
        default: 'any_time',
        description: 'Filters results by date. Also possible to filter by a specific date range using the YYYY-MM-DD..YYYY-MM-DD format.',
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
      nextPageToken('Token for retrieving the next page of results. Located inside pagination.next_page_token in the response.')
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const duckduckgo_light = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-light-api',
};
