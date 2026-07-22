import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, currencyOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_hotels'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Hotels',
  value: 'google_hotels'
};

const properties: INodeProperties[] = [
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
    displayName: 'Search Query',
    name: 'search_query',
    type: 'collection',
    placeholder: 'Add Search Query',
    default: {},
    options: [
      {
        displayName: 'Bounding Box (bounding_box)',
        name: 'bounding_box',
        type: 'string',
        default: '',
        description: 'Defines the bounding box for the search. The format is [min_longitude, min_latitude, max_longitude, max_latitude]. For example, for USA: [-125.0, 25.0, -66.96, 49.5]. Note: This parameter cannot be combined with the q parameter.',
        routing: {
          request: {
            qs: {
              bounding_box: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Search Query (q)',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Terms to search for on Google Hotels',
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions([
          'af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'aq', 'ag', 'ar', 'am', 'aw', 'au', 'at', 'az', 'bs', 'bh',
          'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bm', 'bt', 'bo', 'ba', 'bw', 'bv', 'br', 'io', 'bn', 'bg', 'bf',
          'bi', 'kh', 'cm', 'ca', 'cv', 'ky', 'cf', 'td', 'cl', 'cn', 'cx', 'cc', 'co', 'km', 'cg', 'cd', 'ck',
          'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj', 'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'et',
          'fk', 'fo', 'fj', 'fi', 'fr', 'gf', 'pf', 'tf', 'ga', 'gm', 'ge', 'de', 'gh', 'gi', 'gr', 'gl', 'gd',
          'gp', 'gu', 'gt', 'gg', 'gn', 'gw', 'gy', 'ht', 'hm', 'va', 'hn', 'hk', 'hu', 'is', 'in', 'id', 'ir',
          'iq', 'ie', 'im', 'il', 'it', 'jm', 'jp', 'je', 'jo', 'kz', 'ke', 'ki', 'kw', 'kg', 'la', 'lv', 'lb',
          'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mo', 'mg', 'mw', 'my', 'mv', 'ml', 'mt', 'mh', 'mq', 'mr', 'mu',
          'yt', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ms', 'ma', 'mz', 'mm', 'na', 'nr', 'np', 'nl', 'nc', 'nz',
          'ni', 'ne', 'ng', 'nu', 'nf', 'kp', 'mk', 'mp', 'no', 'om', 'pk', 'pw', 'ps', 'pa', 'pg', 'py', 'pe',
          'ph', 'pn', 'pl', 'pt', 'pr', 'qa', 're', 'ro', 'ru', 'rw', 'sh', 'kn', 'lc', 'pm', 'vc', 'ws', 'sm',
          'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg', 'sk', 'si', 'sb', 'so', 'za', 'gs', 'kr', 'es', 'lk', 'sd',
          'sr', 'sj', 'sz', 'se', 'ch', 'sy', 'tw', 'tj', 'tz', 'th', 'tl', 'tg', 'tk', 'to', 'tt', 'tn', 'tr',
          'tm', 'tc', 'tv', 'ug', 'ua', 'ae', 'gb', 'uk', 'us', 'um', 'uy', 'uz', 'vu', 've', 'vn', 'vg', 'vi',
          'wf', 'eh', 'ye', 'zm', 'zw',
        ]),
        default: 'us',
        description: 'Defines the country of the search. Default is us.',
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
        options: currencyOptions([
          'ALL', 'DZD', 'ARS', 'AMD', 'AWG', 'AUD', 'AZN', 'BSD', 'BHD', 'BYN', 'BMD', 'BAM', 'BRL', 'GBP',
          'BGN', 'CAD', 'XPF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CZK', 'DKK', 'DOP', 'EGP', 'EUR', 'GEL',
          'HKD', 'HUF', 'ISK', 'INR', 'IDR', 'IRR', 'ILS', 'JMD', 'JPY', 'JOD', 'KZT', 'KWD', 'LBP', 'MKD',
          'MYR', 'MXN', 'MDL', 'MAD', 'TWD', 'NZD', 'NOK', 'OMR', 'PKR', 'PAB', 'PEN', 'PHP', 'PLN', 'QAR',
          'RON', 'RUB', 'SAR', 'RSD', 'SGD', 'ZAR', 'KRW', 'SEK', 'CHF', 'THB', 'TRY', 'UAH', 'AED', 'USD',
          'VND',
        ]),
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
        options: languageOptions([
          'af', 'ak', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bem', 'bn', 'bh', 'xx-bork', 'bs', 'br', 'bg',
          'my', 'km', 'ca', 'chr', 'ny', 'zh-cn', 'zh-tw', 'co', 'hr', 'cs', 'da', 'nl', 'xx-elmer', 'en',
          'eo', 'et', 'ee', 'fo', 'tl', 'fi', 'fr', 'fy', 'gaa', 'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu',
          'xx-hacker', 'ht', 'ha', 'haw', 'iw', 'hi', 'hu', 'is', 'ig', 'id', 'ia', 'ga', 'it', 'ja', 'jw',
          'kn', 'kk', 'rw', 'rn', 'xx-klingon', 'kg', 'ko', 'kri', 'ku', 'ckb', 'ky', 'lo', 'la', 'lv', 'ln',
          'lt', 'loz', 'lg', 'ach', 'mk', 'mg', 'ms', 'ml', 'mv', 'mt', 'mi', 'mr', 'mfe', 'mo', 'mn', 'sr-me',
          'ne', 'pcm', 'nso', 'no', 'nn', 'oc', 'or', 'om', 'ps', 'fa', 'xx-pirate', 'pl', 'pt', 'pt-br',
          'pt-pt', 'pa', 'qu', 'ro', 'rm', 'nyn', 'ru', 'gd', 'sr', 'sh', 'st', 'tn', 'crs', 'sn', 'sd', 'si',
          'sk', 'sl', 'so', 'es', 'es-419', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'lua',
          'tum', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 'vu', 'vi', 'cy', 'wo', 'xh', 'yi', 'yo', 'zu',
        ]),
        default: 'en',
        description: 'Defines the interface language of the search. Default is en.',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Amenities (amenities)',
        name: 'amenities',
        type: 'options',
        options: [
          { name: 'Air-conditioned (16)', value: '16' },
          { name: 'Air-conditioned (40)', value: '40' },
          { name: 'All-inclusive available', value: '52' },
          { name: 'Any', value: '' },
          { name: 'Bar', value: '15' },
          { name: 'Beach access (11)', value: '11' },
          { name: 'Beach access (20)', value: '20' },
          { name: 'Crib', value: '18' },
          { name: 'EV charger', value: '61' },
          { name: 'Fitness centre', value: '7' },
          { name: 'Free breakfast', value: '9' },
          { name: 'Free parking', value: '1' },
          { name: 'Free Wi-Fi (29)', value: '29' },
          { name: 'Free Wi-Fi (35)', value: '35' },
          { name: 'Hot tub', value: '2' },
          { name: 'Indoor pool', value: '4' },
          { name: 'Kid-friendly (12)', value: '12' },
          { name: 'Kid-friendly (21)', value: '21' },
          { name: 'Outdoor pool', value: '5' },
          { name: 'Parking', value: '3' },
          { name: 'Pet-friendly (19)', value: '19' },
          { name: 'Pet-friendly (24)', value: '24' },
          { name: 'Pool (32)', value: '32' },
          { name: 'Pool (6)', value: '6' },
          { name: 'Restaurant', value: '8' },
          { name: 'Room service', value: '22' },
          { name: 'Spa', value: '10' },
          { name: 'Wheelchair accessible', value: '53' },
        ],
        default: '',
        description: 'Defines a list of amenities that allows multiple categories that are separated by a comma. For example: 1,2. Check the full list of supported Google Hotels amenities values.',
        routing: {
          request: {
            qs: {
              amenities: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Price Max (price_max)',
        name: 'price_max',
        type: 'number',
        typeOptions: {
          minValue: 0,
        },
        default: 0,
        description: 'Defines the maximum price. Default is unlimited.',
        routing: {
          request: {
            qs: {
              price_max: '={{$value || ""}}',
            },
          },
        },
      },
      {
        displayName: 'Price Min (price_min)',
        name: 'price_min',
        type: 'number',
        typeOptions: {
          minValue: 0,
        },
        default: 0,
        description: 'Defines the minimum price. Default is 0.',
        routing: {
          request: {
            qs: {
              price_min: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Property Type (property_type)',
        name: 'property_type',
        type: 'options',
        options: [
          { name: 'Hotel', value: 'hotel' },
          { name: 'Vacation rental', value: 'vacation_rental' },
        ],
        default: 'hotel',
        description: 'Defines the category of accommodation to search for. The hotel option also includes vacation rentals.',
        routing: {
          request: {
            qs: {
              property_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Property Types (property_types)',
        name: 'property_types',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Apartment Hotels', value: '21' },
          { name: 'Apartments', value: '1' },
          { name: 'Beach Hotels', value: '12' },
          { name: 'Bed and Breakfasts', value: '19' },
          { name: 'Boutique Hotels', value: '13' },
          { name: 'Bungalows', value: '2' },
          { name: 'Cabins', value: '3' },
          { name: 'Chalets', value: '4' },
          { name: 'Cottages', value: '5' },
          { name: 'Gîtes', value: '6' },
          { name: 'Holiday villages', value: '7' },
          { name: 'Hostels', value: '14' },
          { name: 'Houseboats', value: '9' },
          { name: 'Houses', value: '8' },
          { name: 'Inns', value: '15' },
          { name: 'Japanese-style Business Hotels', value: '23' },
          { name: 'Minshuku', value: '22' },
          { name: 'Motels', value: '16' },
          { name: 'Other (11)', value: '11' },
          { name: 'Other (20)', value: '20' },
          { name: 'Resorts', value: '17' },
          { name: 'Ryokan', value: '24' },
          { name: 'Spa Hotels', value: '18' },
          { name: 'Villas', value: '10' },
        ],
        default: '',
        description: 'Defines a list of property types that allows multiple categories that are separated by a comma. For example: 1,2. Check the full list of supported Google Hotels property_types values.',
        routing: {
          request: {
            qs: {
              property_types: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Rating (rating)',
        name: 'rating',
        type: 'options',
        options: [
          { name: '7', value: '7' },
          { name: '8', value: '8' },
          { name: '9', value: '9' },
          { name: 'Any', value: '' },
        ],
        default: '',
        description: 'Defines the minimum rating of results to return',
        routing: {
          request: {
            qs: {
              rating: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Highest rating', value: 'highest_rating' },
          { name: 'Lowest price', value: 'lowest_price' },
          { name: 'Most reviewed', value: 'most_reviewed' },
          { name: 'Relevance', value: 'relevance' },
        ],
        default: 'relevance',
        description: 'Defines the sorting order of the results',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
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
        displayName: 'Brands (brands)',
        name: 'brands',
        type: 'string',
        default: '',
        description: 'A comma-separated list of hotel brands to include in the search results, allowing users to filter by preferred hotel chains. The possible values can be obtained from the initial request response under the brands[0].id key.',
        routing: {
          request: {
            qs: {
              brands: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Eco Certified (eco_certified)',
        name: 'eco_certified',
        type: 'boolean',
        default: false,
        description: 'Whether to show only eco-certified hotels',
        routing: {
          request: {
            qs: {
              eco_certified: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'For Displaced Individuals (for_displaced_individuals)',
        name: 'for_displaced_individuals',
        type: 'boolean',
        default: false,
        description: 'Whether to show only hotels available for displaced individuals',
        routing: {
          request: {
            qs: {
              for_displaced_individuals: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Free Cancellation (free_cancellation)',
        name: 'free_cancellation',
        type: 'boolean',
        default: false,
        description: 'Whether to show only hotels that offer free cancellation on bookings',
        routing: {
          request: {
            qs: {
              free_cancellation: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Hotel Class (hotel_class)',
        name: 'hotel_class',
        type: 'options',
        options: [
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' },
          { name: 'Any', value: '' },
        ],
        default: '',
        description: 'Defines the star rating of the hotel. Multiple ratings can be combined with a comma, for example: 4,5.',
        routing: {
          request: {
            qs: {
              hotel_class: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Special Offers (special_offers)',
        name: 'special_offers',
        type: 'boolean',
        default: false,
        description: 'Whether to show only hotels with special offers',
        routing: {
          request: {
            qs: {
              special_offers: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Vacation Rentals Filters',
    name: 'vacation_rentals_filters',
    type: 'collection',
    placeholder: 'Add Vacation Rentals Filters',
    default: {},
    options: [
      {
        displayName: 'Bathrooms (bathrooms)',
        name: 'bathrooms',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 5,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the minimum number of bathrooms. Default is 0.',
        routing: {
          request: {
            qs: {
              bathrooms: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Bedrooms (bedrooms)',
        name: 'bedrooms',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 5,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the minimum number of bedrooms. Default is 0.',
        routing: {
          request: {
            qs: {
              bedrooms: '={{$value}}',
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
        description: 'The number of adults staying in the apartment. Default is 2. For property_type=hotel, the maximum number of guests is 6 (including children). For property_type=vacation_rental, the maximum number is 10.',
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
        description: 'Defines the ages of children as a comma-separated list, e.g., 2,5 for two children aged 2 and 5. Available age range is 1–17. Note: This parameter is only applicable for property_type=hotel and will be ignored for other property types.',
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
        description: 'Retrieves the next page of results. Returned in the response when there are more results to display.',
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

export const google_hotels = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-hotels-api',
};
