import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['linkedin_ad_library'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Linkedin Ad Library',
  value: 'linkedin_ad_library'
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
        displayName: 'Advertiser (advertiser)',
        name: 'advertiser',
        type: 'string',
        default: '',
        description: 'Advertiser name or company to search for. Returns ads from that specific advertiser.',
        routing: {
          request: {
            qs: {
              advertiser: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Country (country)',
        name: 'country',
        type: 'options',
        options: countryOptions([
          'AF', 'AX', 'AL', 'DZ', 'ALL', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', '', 'AR', 'AM', 'AW', 'AU', 'AT',
          'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO',
          'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'CB', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO',
          'KM', 'CG', 'CK', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'CD', 'DK', 'DJ', 'DM', 'DO', 'TP', 'EC', 'EG',
          'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FM', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE',
          'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'HN', 'HK',
          'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI',
          'KR', 'KP', 'KO', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG',
          'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA',
          'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'PK',
          'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'GS',
          'SH', 'KN', 'LC', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'CS', 'SC', 'SL', 'SG', 'SK', 'SI',
          'SB', 'SO', 'ZA', 'SS', 'ES', 'LK', 'SD', 'OM', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ',
          'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY',
          'UZ', 'VU', 'VA', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'YU', 'ZM', 'ZW',
        ]),
        default: '',
        description: 'Country to filter ads by. Use comma-separated values for multiple countries (e.g., \'US,CA,GB\').',
        routing: {
          request: {
            qs: {
              country: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Keyword (q)',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Search for ads containing specific keywords or phrases',
        routing: {
          request: {
            qs: {
              q: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period (time_period)',
        name: 'time_period',
        type: 'string',
        default: '',
        description: 'Use predefined values like last_year, this_year, this_month, last_30_days, or a custom date range in format YYYY-MM-DD..YYYY-MM-DD',
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
        description: 'A token for fetching the next set of results. Obtained from the next_page_token field in the previous response.',
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

export const linkedin_ad_library = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/linkedin-ad-library-api',
};
