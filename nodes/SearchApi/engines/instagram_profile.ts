import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

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
  zeroDataRetention(displayOptions)
];

export const instagram_profile = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/instagram-profile-api',
};
