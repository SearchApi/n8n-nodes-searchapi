import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions } from '../shared/options';

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
