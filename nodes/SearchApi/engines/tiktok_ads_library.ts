import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
        displayName: 'Advertiser ID (advertiser_id)',
        name: 'advertiser_id',
        type: 'string',
        default: '',
        description: 'Specifies the unique advertiser ID to search for ads from a specific advertiser. You can obtain the advertiser ID by: Using the TikTok Ads Library Ad Details API (the advertiser.id field) Inspecting the adv_biz_ids URL parameter in the TikTok Ads Library UI.',
        routing: {
          request: {
            qs: {
              advertiser_id: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Search Query (q)',
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
        displayName: 'Country (country)',
        name: 'country',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'AT', value: 'AT' },
          { name: 'BE', value: 'BE' },
          { name: 'BG', value: 'BG' },
          { name: 'CH', value: 'CH' },
          { name: 'CY', value: 'CY' },
          { name: 'CZ', value: 'CZ' },
          { name: 'DE', value: 'DE' },
          { name: 'DK', value: 'DK' },
          { name: 'EE', value: 'EE' },
          { name: 'ES', value: 'ES' },
          { name: 'FI', value: 'FI' },
          { name: 'FR', value: 'FR' },
          { name: 'GB', value: 'GB' },
          { name: 'GR', value: 'GR' },
          { name: 'HR', value: 'HR' },
          { name: 'HU', value: 'HU' },
          { name: 'IE', value: 'IE' },
          { name: 'IS', value: 'IS' },
          { name: 'IT', value: 'IT' },
          { name: 'LI', value: 'LI' },
          { name: 'LT', value: 'LT' },
          { name: 'LU', value: 'LU' },
          { name: 'LV', value: 'LV' },
          { name: 'MT', value: 'MT' },
          { name: 'NL', value: 'NL' },
          { name: 'NO', value: 'NO' },
          { name: 'PL', value: 'PL' },
          { name: 'PT', value: 'PT' },
          { name: 'RO', value: 'RO' },
          { name: 'SE', value: 'SE' },
          { name: 'SI', value: 'SI' },
          { name: 'SK', value: 'SK' },
          { name: 'TR', value: 'TR' },
        ],
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
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Last shown date newest to oldest', value: 'last_shown_date_newest_to_oldest' },
          { name: 'Last shown date oldest to newest', value: 'last_shown_date_oldest_to_newest' },
          { name: 'Published date newest to oldest', value: 'published_date_newest_to_oldest' },
          { name: 'Published date oldest to newest', value: 'published_date_oldest_to_newest' },
          { name: 'Unique users seen high to low', value: 'unique_users_seen_high_to_low' },
          { name: 'Unique users seen low to high', value: 'unique_users_seen_low_to_high' },
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
        displayName: 'Time Period (time_period)',
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
        displayName: 'Next Page Token (next_page_token)',
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

export const tiktok_ads_library = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/tiktok-ads-library-api',
};
