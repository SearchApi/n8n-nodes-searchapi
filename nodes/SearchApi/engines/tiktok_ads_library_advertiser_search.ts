import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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

export const tiktok_ads_library_advertiser_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-advertiser-search-api',
};
