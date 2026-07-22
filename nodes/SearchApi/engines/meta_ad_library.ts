import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['meta_ad_library'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Meta Ad Library',
  value: 'meta_ad_library'
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
        displayName: 'Location ID (location_id)',
        name: 'location_id',
        type: 'string',
        default: '',
        description: 'Filters ads based on a specific geographic location using Meta Ad Library\'s location targeting feature. This parameter must be used together with location_name and location_type to define the targeted area. All three values can be obtained using our Page Search API, which supports location search aligned with Meta Ad Library\'s internal targeting system.',
        routing: {
          request: {
            qs: {
              location_id: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Page ID (page_id)',
        name: 'page_id',
        type: 'string',
        default: '',
        description: 'Specifies the page\'s unique ID. You can obtain the page_id in two ways: Use our Page Search API to retrieve the page ID directly from Meta Ad Library. Inspect the URL from the Meta Ad Library website and locate the view_all_page_id parameter. When present, in the response there are additional fields ad_library_page_info and page blocks.',
        routing: {
          request: {
            qs: {
              page_id: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Search Query (q)',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Defines the keyword for your search. When present together with page_id or location_id, it will filter that page or location for the keyword. If you want to search for exact match, use "" to enclose the keyword.',
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
        displayName: 'Content Languages (content_languages)',
        name: 'content_languages',
        type: 'options',
        options: languageOptions([
          'ab', 'aa', 'af', 'ak', 'sq', 'am', '', 'ar', 'an', 'hy', 'as', 'av', 'ae', 'ay', 'az', 'bm', 'bl',
          'ba', 'eu', 'be', 'bn', 'bh', 'bi', 'bs', 'br', 'bg', 'my', 'ca', 'cx', 'ch', 'ce', 'ck', 'ny', 'zh',
          'yue', 'cmn', 'cu', 'cv', 'kw', 'co', 'cr', 'hr', 'cs', 'da', 'dr', 'dv', 'nl', 'dz', 'arz', 'en',
          'eo', 'et', 'ee', 'fo', 'fj', 'fi', 'fr', 'ff', 'gl', 'lg', 'ka', 'de', 'el', 'gn', 'gu', 'ht', 'ha',
          'he', 'hz', 'hi', 'ho', 'hu', 'is', 'io', 'ig', 'id', 'ia', 'ie', 'iu', 'ik', 'ga', 'it', 'ja', 'jv',
          'kl', 'kn', 'kr', 'ks', 'kk', 'km', 'ki', 'rw', 'ky', 'rn', 'kv', 'kg', 'ko', 'ku', 'kj', 'lo', 'la',
          'lv', 'apc', 'li', 'ln', 'lt', 'lu', 'lb', 'mk', 'ary', 'mg', 'ms', 'ml', 'mt', 'gv', 'mi', 'mr',
          'mh', 'acm', 'arb', 'mo', 'mn', 'mos', 'na', 'nv', 'ng', 'ne', 'nd', 'se', 'ns', 'no', 'nb', 'nn',
          'oc', 'oj', 'or', 'om', 'os', 'pi', 'pa', 'ps', 'ars', 'fa', 'pl', 'pt', 'qu', 'rm', 'ro', 'ru',
          'ry', 'sm', 'sg', 'sa', 'sc', 'gd', 'sr', 'sh', 'sn', 'ii', 'ci', 'sz', 'sd', 'si', 'sk', 'sl', 'so',
          'cb', 'st', 'nr', 'es', 'su', 'sw', 'ss', 'sv', 'sy', 'tl', 'ty', 'tg', 'tz', 'ta', 'tt', 'te', 'th',
          'bo', 'ti', 'tpi', 'to', 'ts', 'tn', 'tr', 'tk', 'tw', 'ug', 'uk', 'xx', 'ur', 'uz', 've', 'vi',
          'vo', 'wa', 'wy', 'cy', 'fy', 'wo', 'xh', 'yi', 'yo', 'zz', 'za', 'zu',
        ]),
        default: '',
        description: 'Comma-separated list of content languages to filter ads by. Check the full list of supported Meta Ad Library content languages.',
        routing: {
          request: {
            qs: {
              content_languages: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Country (country)',
        name: 'country',
        type: 'options',
        options: countryOptions([
          'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'ALL', 'AM', 'AN', '', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW',
          'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR',
          'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN',
          'CO', 'CR', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH',
          'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI',
          'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
          'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI',
          'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
          'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT',
          'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU',
          'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA',
          'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN',
          'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN',
          'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
          'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW',
        ]),
        default: '',
        description: 'Specifies the country for your search. The default value is ALL. Check the full list of supported Meta Ad Library countries and their supported ad_type.',
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
        displayName: 'Active Status (active_status)',
        name: 'active_status',
        type: 'options',
        options: [
          { name: 'Active', value: 'active' },
          { name: 'All', value: 'all' },
          { name: 'Any', value: '' },
          { name: 'Inactive', value: 'inactive' },
        ],
        default: '',
        description: 'Filters ads by their status. Default is active. Supported values include: active, inactive, all.',
        routing: {
          request: {
            qs: {
              active_status: '={{$value}}',
            },
          },
        },
      },
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
        description: 'Specifies the type of ads to return. Default is all. Supported values include: all, political_and_issue_ads, housing_ads, employment_ads, credit_ads. Note: Availability may depend on the selected country. Check the full list of supported Meta Ad Library countries and their supported ad_type.',
        routing: {
          request: {
            qs: {
              ad_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'End Date (end_date)',
        name: 'end_date',
        type: 'string',
        default: '',
        description: 'The latest date to include ads from, in format YYYY-MM-DD',
        routing: {
          request: {
            qs: {
              end_date: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Media Type (media_type)',
        name: 'media_type',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Any', value: '' },
          { name: 'Image', value: 'image' },
          { name: 'Image and meme', value: 'image_and_meme' },
          { name: 'Meme', value: 'meme' },
          { name: 'None', value: 'none' },
          { name: 'Video', value: 'video' },
        ],
        default: '',
        description: 'Filters results based on media type. Default is all. Supported values are: all, video, image, meme, image_and_meme, none.',
        routing: {
          request: {
            qs: {
              media_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Platforms (platforms)',
        name: 'platforms',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Audience network', value: 'audience_network' },
          { name: 'Facebook', value: 'facebook' },
          { name: 'Instagram', value: 'instagram' },
          { name: 'Messenger', value: 'messenger' },
          { name: 'Threads', value: 'threads' },
        ],
        default: '',
        description: 'Comma-separated list of platforms where the ads appear. Supported values include: facebook, instagram, audience_network, messenger, threads.',
        routing: {
          request: {
            qs: {
              platforms: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Impressions high to low', value: 'impressions_high_to_low' },
          { name: 'Most recent', value: 'most_recent' },
        ],
        default: '',
        description: 'Specifies the sort order of results. Supported values are: most_recent, impressions_high_to_low. Default is impressions_high_to_low.',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Start Date (start_date)',
        name: 'start_date',
        type: 'string',
        default: '',
        description: 'The earliest date to include ads from, in format YYYY-MM-DD',
        routing: {
          request: {
            qs: {
              start_date: '={{$value}}',
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
        description: 'A token for fetching the next set of results. You can obtain this token from the next_page_token field in the previous response. Note: Tokens can grow large (8KB+) after several pages. If you encounter 413 or 414 errors, use a POST request with the token in the JSON body instead of the URL query string.',
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

export const meta_ad_library = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-api',
};
