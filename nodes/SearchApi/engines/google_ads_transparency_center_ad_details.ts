import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['google_ads_transparency_center_ad_details'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Ads Transparency Center Ad Details',
  value: 'google_ads_transparency_center_ad_details'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Advertiser ID (advertiser_id)',
    name: 'advertiser_id',
    type: 'string',
    required: true,
    default: '',
    description: 'The advertiser\'s unique ID. Obtain it via the Advertiser Search API, the Google Ads Advertiser Info API, or by inspecting the Google Ads Transparency Center URL for the path segment starting with AR.',
    displayOptions,
    routing: {
      request: {
        qs: {
          advertiser_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Creative ID (creative_id)',
    name: 'creative_id',
    type: 'string',
    required: true,
    default: '',
    description: 'The creative\'s unique ID. Obtain it via the Google Ads Transparency Center API or by inspecting the Google Ads Transparency Center URL for the path segment starting with CR.',
    displayOptions,
    routing: {
      request: {
        qs: {
          creative_id: '={{$value}}',
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

export const google_ads_transparency_center_ad_details = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ads-transparency-center-ad-details-api',
};
