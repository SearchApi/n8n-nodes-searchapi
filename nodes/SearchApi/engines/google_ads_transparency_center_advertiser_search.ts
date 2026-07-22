import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions } from '../shared/options';

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
        options: countryOptions([
          'AD', 'AE', 'AG', 'AI', 'AL', 'AM', '', 'ANYWHERE', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AZ',
          'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV',
          'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV',
          'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET',
          'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN',
          'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'IC', 'ID', 'IE',
          'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN',
          'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC',
          'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV',
          'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM',
          'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO',
          'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'ST', 'SV',
          'SX', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW',
          'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE',
          'YT', 'ZA', 'ZM', 'ZW',
        ]),
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

export const google_ads_transparency_center_advertiser_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-ads-transparency-center-advertiser-search-api',
};
