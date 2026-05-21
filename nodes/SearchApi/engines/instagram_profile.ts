import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['instagram_profile'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Instagram Profile',
  value: 'instagram_profile'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Username (username)',
    name: 'username',
    type: 'string',
    required: true,
    default: '',
    description: 'The username of the Instagram profile you want to search',
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
        displayName: 'Zero Data Retention (zero_retention)',
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

export const instagram_profile = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/instagram-profile-api',
};
