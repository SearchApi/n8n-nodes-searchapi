import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['chatgpt'],
  },
};

const resource: INodePropertyOptions = {
  name: 'ChatGPT',
  value: 'chatgpt'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Prompt',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'The prompt to send to ChatGPT',
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
    displayName: 'Answer Options',
    name: 'answer_options',
    type: 'collection',
    placeholder: 'Add Answer Options',
    default: {},
    options: [
      {
        displayName: 'Expand Entities',
        name: 'expand_entities',
        type: 'boolean',
        default: false,
        description: 'Whether to expand each knowledge-entity card in the answer into a rich detail card with description, sections, related entities, inline images and reference links, returned under cards[].details. Adds latency.',
        routing: {
          request: {
            qs: {
              expand_entities: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Web Search',
        name: 'web_search',
        type: 'boolean',
        default: false,
        description: 'Whether to run a live web search and answer with cited sources, returned in the reference_links array',
        routing: {
          request: {
            qs: {
              web_search: '={{$value}}',
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
        displayName: 'Zero Retention',
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

export const chatgpt = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/chatgpt-api',
};
