import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { META_AD_LIBRARY_COUNTRIES } from '../shared/lists';
import { countryOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['meta_ad_library_page_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Meta Ad Library Page Search',
  value: 'meta_ad_library_page_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Defines the keyword for your search',
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
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
      {
        displayName: 'Country (country)',
        name: 'country',
        type: 'options',
        options: countryOptions(META_AD_LIBRARY_COUNTRIES),
        default: '',
        description: 'Specifies the country for your search. The default value is ALL.',
        routing: {
          request: {
            qs: {
              country: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Ad Type (ad_type)',
        name: 'ad_type',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Any', value: '' },
          { name: 'Credit ads', value: 'credit_ads' },
          { name: 'Employment ads', value: 'employment_ads' },
          { name: 'Housing ads', value: 'housing_ads' },
          { name: 'Political and issue ads', value: 'political_and_issue_ads' },
        ],
        default: '',
        description: 'Specifies the type of ads to return. Default is all. Supported values include: all, political_and_issue_ads, housing_ads, employment_ads, credit_ads. Note: Availability may depend on the selected country.',
        routing: {
          request: {
            qs: {
              ad_type: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const meta_ad_library_page_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-page-search-api',
};
