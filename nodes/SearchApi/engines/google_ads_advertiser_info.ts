import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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

export const google_ads_advertiser_info = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ads-advertiser-info-api',
};
