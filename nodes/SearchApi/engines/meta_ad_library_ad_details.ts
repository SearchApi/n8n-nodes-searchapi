import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { META_AD_LIBRARY_COUNTRIES } from '../shared/lists';
import { countryOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

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
      },
      {
        displayName: 'Country (country)',
        name: 'country',
        type: 'options',
        options: countryOptions(META_AD_LIBRARY_COUNTRIES),
        default: '',
        description: 'Country the ad was shown in. Improves the accuracy of the lookup.',
        routing: {
          request: {
            qs: {
              country: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Is Political (is_political)',
        name: 'is_political',
        type: 'options',
        options: [
          { name: '', value: '' },
          { name: 'True', value: 'true' },
          { name: 'False', value: 'false' },
        ],
        default: '',
        description: 'Whether the ad should be looked up as a political or issue ad',
        routing: {
          request: {
            qs: {
              is_political: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Page ID (page_id)',
        name: 'page_id',
        type: 'string',
        default: '',
        description: 'Unique ID of the page the ad belongs to. Improves the accuracy of the lookup.',
        routing: {
          request: {
            qs: {
              page_id: '={{$value}}',
            },
          },
        },
      },
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const meta_ad_library_ad_details = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-ad-details-api',
};
