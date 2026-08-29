import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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

export const tiktok_ads_library_ad_details = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-ad-details-api',
};
