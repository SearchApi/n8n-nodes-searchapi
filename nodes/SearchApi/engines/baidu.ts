import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { numParam, pageParam, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['baidu'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Baidu',
  value: 'baidu'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms to query on Baidu. Supports operators and advanced filters like "machine learning models", site:, intitle:, or filetype:.',
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
        displayName: 'Chinese Language (ct)',
        name: 'ct',
        type: 'options',
        options: [
          { name: '0', value: '0' },
          { name: '1', value: '1' },
          { name: '2', value: '2' },
        ],
        default: '0',
        description: 'Controls the Chinese script variant of search results',
        routing: {
          request: {
            qs: {
              ct: '={{$value}}',
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
        displayName: 'Time Period (gpc)',
        name: 'gpc',
        type: 'string',
        default: '',
        description: 'Filters results to a specific time period using Unix Timestamps in the format stf=START_TIME,END_TIME|stftype=1. Example: stf=1683108267,1714730667|stftype=1.',
        routing: {
          request: {
            qs: {
              gpc: '={{$value}}',
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
      pageParam('Page of results to return. Use with the num parameter to paginate.'),
      numParam('Number of results to display per page, maximum 50. Use with the page parameter to paginate.', { maxValue: 50 })
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const baidu = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/baidu',
};
