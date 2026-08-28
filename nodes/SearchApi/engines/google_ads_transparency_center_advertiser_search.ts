import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { ADS_TRANSPARENCY_COUNTRIES } from '../shared/lists';
import { countryOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_ads_transparency_center_advertiser_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Ads Transparency Center Advertiser Search',
  value: 'google_ads_transparency_center_advertiser_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Specifies the keyword to search for advertisers or domains',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Num Advertisers (num_advertisers)',
        name: 'num_advertisers',
        type: 'number',
        typeOptions: {
          maxValue: 100,
        },
        default: 10,
        description: 'Specifies the number of advertisers to return. The default is 10. The maximum is 100.',
        routing: {
          request: {
            qs: {
              num_advertisers: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Num Domains (num_domains)',
        name: 'num_domains',
        type: 'number',
        typeOptions: {
          maxValue: 100,
        },
        default: 10,
        description: 'Specifies the number of domains to return. The default is 10. The maximum is 100.',
        routing: {
          request: {
            qs: {
              num_domains: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Region (region)',
        name: 'region',
        type: 'options',
        options: countryOptions(ADS_TRANSPARENCY_COUNTRIES),
        default: '',
        description: 'Specifies the region for your search. The default is anywhere.',
        routing: {
          request: {
            qs: {
              region: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_ads_transparency_center_advertiser_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ads-transparency-center-advertiser-search-api',
};
