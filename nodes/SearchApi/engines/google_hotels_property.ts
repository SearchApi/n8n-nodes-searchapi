import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { CURRENCIES, TRAVEL_LANGUAGES } from '../shared/lists';
import { countryOptions, currencyOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_hotels_property'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Hotels Property',
  value: 'google_hotels_property'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Property Token (property_token)',
    name: 'property_token',
    type: 'string',
    required: true,
    typeOptions: { password: true },
    default: '',
    description: 'Parameter defines the property you want to search. You can find property_token values using Google Hotels API.',
    displayOptions,
    routing: {
      request: {
        qs: {
          property_token: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Check In Date (check_in_date)',
    name: 'check_in_date',
    type: 'string',
    required: true,
    default: '',
    description: 'Defines the check-in date for the hotel stay in the format YYYY-MM-DD. This date marks the beginning of the reservation.',
    displayOptions,
    routing: {
      request: {
        qs: {
          check_in_date: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Check Out Date (check_out_date)',
    name: 'check_out_date',
    type: 'string',
    required: true,
    default: '',
    description: 'The check-out date for the hotel stay in the format YYYY-MM-DD. This date marks the end of the reservation.',
    displayOptions,
    routing: {
      request: {
        qs: {
          check_out_date: '={{$value}}',
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions([
          'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AG', '', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD',
          'BY', 'BE', 'BZ', 'BJ', 'BT', 'BO', 'BA', 'BW', 'BR', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA',
          'CV', 'CF', 'TD', 'CL', 'CN', 'CO', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ',
          'DM', 'DO', 'EC', 'EG', 'SV', 'EE', 'ET', 'FJ', 'FI', 'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR',
          'GL', 'GT', 'GG', 'GY', 'HT', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT',
          'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LY', 'LI', 'LT', 'LU',
          'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MU', 'MX', 'FM', 'MD', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA',
          'NR', 'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'NU', 'MK', 'NO', 'OM', 'PK', 'PS', 'PA', 'PG', 'PY', 'PE',
          'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL',
          'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'KR', 'ES', 'LK', 'SH', 'VC', 'SR', 'SE', 'CH', 'TW', 'TJ', 'TZ',
          'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE',
          'VN', 'ZM', 'ZW',
        ]),
        default: '',
        description: 'Defines the country of the search. Check the full list of supported Google Travel gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Currency (currency)',
        name: 'currency',
        type: 'options',
        options: currencyOptions(CURRENCIES),
        default: 'USD',
        description: 'Defines the currency of the returned prices. Default is USD. Check the full list of supported Google Travel currency values.',
        routing: {
          request: {
            qs: {
              currency: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions(TRAVEL_LANGUAGES),
        default: '',
        description: 'Defines the interface language of the search. Check the full list of supported Google Travel hl languages.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Hotel Filters',
    name: 'hotel_filters',
    type: 'collection',
    placeholder: 'Add Hotel Filters',
    default: {},
    options: [
      {
        displayName: 'Expanded Search (expanded_search)',
        name: 'expanded_search',
        type: 'boolean',
        default: false,
        description: 'Whether to fetch per-OTA pricing for vacation rental properties. When a property is classified as vacation_rental, the default response only includes limited booking offers. With this parameter enabled, full OTA price comparison (e.g., Booking.com, Expedia, Hotels.com, Agoda, etc.) is returned in featured_offers and all_offers.',
        routing: {
          request: {
            qs: {
              expanded_search: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Free Cancellation (free_cancellation)',
        name: 'free_cancellation',
        type: 'boolean',
        default: false,
        description: 'Whether to display only hotels that offer free cancellation on bookings',
        routing: {
          request: {
            qs: {
              free_cancellation: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Number of Guests',
    name: 'number_of_guests',
    type: 'collection',
    placeholder: 'Add Number of Guests',
    default: {},
    options: [
      {
        displayName: 'Adults (adults)',
        name: 'adults',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 10,
          numberPrecision: 0,
        },
        default: 2,
        description: 'The number of adults staying in the apartment. Default is 2. For type=hotels, the maximum number of guests is 6 (including children). For type=vacation_rental, the maximum number is 10.',
        routing: {
          request: {
            qs: {
              adults: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Children Ages (children_ages)',
        name: 'children_ages',
        type: 'string',
        default: '',
        description: 'Defines the ages of children as a comma-separated list, e.g., 2,5 for two children aged 2 and 5. Available age range is 1-17. Note: This parameter is only applicable for hotels and will be ignored for other property types.',
        routing: {
          request: {
            qs: {
              children_ages: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_hotels_property = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-hotels-property-api',
};
