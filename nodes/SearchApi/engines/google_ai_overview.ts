import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['google_ai_overview'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google AI Overview',
  value: 'google_ai_overview'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Page Token',
    name: 'page_token',
    type: 'string',
    required: true,
    typeOptions: { password: true },
    default: '',
    description: 'Base64-encoded page token containing the query and parameters for fetching the AI Overview content. Google only returns ai_overview.page_token when it defers the overview, and the token expires in under 1 minute, so chain this node right after the Google node and pass the token straight through.',
    displayOptions,
    routing: {
      request: {
        qs: {
          page_token: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Links',
    name: 'links',
    type: 'collection',
    placeholder: 'Add Links',
    default: {},
    options: [
      {
        displayName: 'Link',
        name: 'link',
        type: 'options',
        options: [
          { name: 'Raw', value: 'raw' },
          { name: 'Resolved', value: 'resolved' },
        ],
        default: 'raw',
        description: 'How reference links are returned. Raw returns the Google redirect link on google.com/goto. Resolved returns the direct destination URL, which is best-effort and adds latency.',
        routing: {
          request: {
            qs: {
              link: '={{$value}}',
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

export const google_ai_overview = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ai-overview-api',
};
