import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

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
  zeroDataRetention(displayOptions)
];

export const tiktok_profile = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-profile-api',
};
