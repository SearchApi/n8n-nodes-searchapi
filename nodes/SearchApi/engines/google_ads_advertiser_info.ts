import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_ads_advertiser_info'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Ads Advertiser Info',
  value: 'google_ads_advertiser_info'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Advertiser Info Token (advertiser_info_token)',
    name: 'advertiser_info_token',
    type: 'string',
    required: true,
    typeOptions: { password: true },
    default: '',
    description: 'Token identifying the advertiser. To retrieve it, perform a Google Search API request, inspect the ads block, and copy the advertiser_info_token from the desired ad.',
    displayOptions,
    routing: {
      request: {
        qs: {
          advertiser_info_token: '={{$value}}',
        },
      },
    },
  },
  zeroDataRetention(displayOptions)
];

export const google_ads_advertiser_info = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ads-advertiser-info-api',
};
