import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['tiktok_ads_library_advertiser_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Tiktok Ads Library Advertiser Search',
  value: 'tiktok_ads_library_advertiser_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Advertiser name to search for in TikTok\'s ad library. Queries can include terms like "Nike" or "Coca Cola".',
    displayOptions,
    routing: {
      request: {
        qs: {
          q: '={{$value}}',
        },
      },
    },
  },
  zeroDataRetention(displayOptions)
];

export const tiktok_ads_library_advertiser_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-advertiser-search-api',
};
