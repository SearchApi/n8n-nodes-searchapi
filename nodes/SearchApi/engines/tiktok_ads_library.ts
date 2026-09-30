import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['tiktok_ads_library'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Tiktok Ads Library',
  value: 'tiktok_ads_library'
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
        displayName: 'Advertiser ID',
        name: 'advertiser_id',
        type: 'string',
        default: '',
        description: 'Specifies the unique advertiser ID to search for ads from a specific advertiser. You can obtain the advertiser ID by: Using the TikTok Ads Library Ad Details API (the advertiser object) or inspecting the adv_biz_ids URL parameter in the TikTok Ads Library UI.',
        routing: {
          request: {
            qs: {
              advertiser_id: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Defines the keyword for your search. Use this parameter to search for ads containing specific keywords or phrases. If you want to search for exact match, use "" to enclose the keyword.',
        routing: {
          request: {
            qs: {
              q: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
      {
        displayName: 'Country',
        name: 'country',
        type: 'options',
        options: countryOptions([
          'all', 'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR',
          'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK',
          'TR',
        ]),
        default: 'all',
        description: 'Specifies the country for your search. The default value is ALL. Check the full list of supported TikTok Ads Library countries.',
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
        displayName: 'Sort By',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Last Shown Date Newest to Oldest', value: 'last_shown_date_newest_to_oldest' },
          { name: 'Last Shown Date Oldest to Newest', value: 'last_shown_date_oldest_to_newest' },
          { name: 'Published Date Newest to Oldest', value: 'published_date_newest_to_oldest' },
          { name: 'Published Date Oldest to Newest', value: 'published_date_oldest_to_newest' },
          { name: 'Unique Users Seen High to Low', value: 'unique_users_seen_high_to_low' },
          { name: 'Unique Users Seen Low to High', value: 'unique_users_seen_low_to_high' },
        ],
        default: '',
        description: 'Specifies the sorting order for ads. If not specified, defaults to last_shown_date_newest_to_oldest.',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period',
        name: 'time_period',
        type: 'string',
        default: '',
        description: 'Specifies the date range for ads. Use the format YYYY-MM-DD..YYYY-MM-DD to define a custom date range. If not specified, defaults to the last year from the current date.',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Pagination',
    name: 'pagination',
    type: 'collection',
    placeholder: 'Add Pagination',
    default: {},
    options: [
      {
        displayName: 'Next Page Token',
        name: 'next_page_token',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'A token for fetching the next set of results. You can obtain this token from the next_page_token field in the previous response.',
        routing: {
          request: {
            qs: {
              next_page_token: '={{$value}}',
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
        displayName: 'Zero Retention',
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

export const tiktok_ads_library = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-api',
};
