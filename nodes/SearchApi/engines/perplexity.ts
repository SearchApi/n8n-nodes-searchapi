import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['perplexity'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Perplexity',
  value: 'perplexity'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'The question or terms you want to ask Perplexity. The answer is returned in the same language as your query.',
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
    displayName: 'Sources',
    name: 'sources_options',
    type: 'collection',
    placeholder: 'Add Sources',
    default: {},
    options: [
      {
        displayName: 'Sources (sources)',
        name: 'sources',
        type: 'multiOptions',
        options: [
          { name: 'Scholar', value: 'scholar' },
          { name: 'Web', value: 'web' },
        ],
        default: ['web'],
        description: 'Source connectors Perplexity searches. Web returns general web results and Scholar returns academic papers. Defaults to web.',
        routing: {
          request: {
            qs: {
              sources: '={{$value}}',
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

export const perplexity = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/perplexity-api',
};
