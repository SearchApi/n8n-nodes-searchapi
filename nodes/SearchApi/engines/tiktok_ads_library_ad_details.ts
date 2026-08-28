import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['tiktok_ads_library_ad_details'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Tiktok Ads Library Ad Details',
  value: 'tiktok_ads_library_ad_details'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Ad ID (ad_id)',
    name: 'ad_id',
    type: 'string',
    required: true,
    default: '',
    description: 'The unique identifier of the TikTok Ad. You can obtain this from the TikTok Ads Library API results (the id field of each ad).',
    displayOptions,
    routing: {
      request: {
        qs: {
          ad_id: '={{$value}}',
        },
      },
    },
  },
  zeroDataRetention(displayOptions)
];

export const tiktok_ads_library_ad_details = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-ad-details-api',
};
