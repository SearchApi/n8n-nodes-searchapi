import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['tiktok_profile'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Tiktok Profile',
  value: 'tiktok_profile'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Username (username)',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    description: 'You can use the username with or without the @ symbol, or use the numeric TikTok ID directly. For example, @therock, therock, @6745191554350760966, and 6745191554350760966 will all retrieve the same profile.',
    displayOptions,
    routing: {
      request: {
        qs: {
          username: '={{$value}}',
        },
      },
    },
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

export const tiktok_profile = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-profile-api',
};
