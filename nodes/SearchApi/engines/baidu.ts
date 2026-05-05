import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
    description: 'Search terms to query on Baidu — supports operators and advanced filters like "machine learning models", site:, intitle:, or filetype:',
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
        description: 'Filters results to a specific time period using Unix Timestamps — format: stf=START_TIME,END_TIME|stftype=1. Example: stf=1683108267,1714730667|stftype=1.',
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
      {
        displayName: 'Results Per Page (num)',
        name: 'num',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 10,
        description: 'Number of results to display per page — maximum 50. Use with the page parameter to paginate',
        routing: {
          request: {
            qs: {
              num: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Page Number (page)',
        name: 'page',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Page of results to return. Use with the num parameter to paginate',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Zero Data Retention',
    name: 'zero_data_retention',
    type: 'collection',
    placeholder: 'Add Zero Data Retention',
    default: {},
    options: [
      {
        displayName: 'Zero Retention (zero_retention)',
        name: 'zero_retention',
        type: 'boolean',
        default: false,
        description: 'Whether to disable all logging and persistent storage. No request parameters, HTML, or JSON responses are stored or logged. Suitable for high-compliance use cases. Debugging and support may be limited while enabled.',
        routing: {
          request: {
            qs: {
              zero_retention: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  }
];

export const baidu = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/baidu',
};
