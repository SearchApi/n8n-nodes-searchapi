import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['meta_ad_library_ad_details'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Meta Ad Library Ad Details',
  value: 'meta_ad_library_ad_details'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Params',
    name: 'search_params',
    type: 'collection',
    placeholder: 'Add Search Params',
    default: {},
    options: [
      {
        displayName: 'Ad Archive ID (ad_archive_id)',
        name: 'ad_archive_id',
        type: 'string',
        default: '',
        description: 'Specifies the ad\'s unique ID. Required when ad_details_token is not provided.',
        routing: {
          request: {
            qs: {
              ad_archive_id: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Ad Details Token (ad_details_token)',
        name: 'ad_details_token',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'Obtain it from the ad_details_token field on each ad returned by the Meta Ad Library API. Using ad_details_token provides better results for extracting political ads and eu_transparency or uk_transparency data. Using ad_archive_id alone may not return results for all ads.',
        routing: {
          request: {
            qs: {
              ad_details_token: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
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

export const meta_ad_library_ad_details = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-ad-details-api',
};
