import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, currencyOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_flights_calendar'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Flights Calendar',
  value: 'google_flights_calendar'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Departure Id (departure_id)',
    name: 'departure_id',
    type: 'string',
    required: true,
    default: '',
    description: 'Specifies the code for the departure airport or a location identifier. Airport Code: A 3-letter uppercase code representing the departure airport (e.g., MAD for Madrid-Barajas Airport or JFK for John F. Kennedy International Airport). You can find these codes using resources like Google Flights or IATA. Location Identifier (kgmid): A string that begins with /m/, used to represent a specific location. You can find this identifier on Wikidata by looking for the "Freebase ID" while searching for location. For example, /m/02_286 is the identifier for New York,United States. Multiple Airports/Locations: You can specify more than one airport or location by separating them with commas. For example: SEA, MIA, /m/02_286.',
    displayOptions,
    routing: {
      request: {
        qs: {
          departure_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Arrival Id (arrival_id)',
    name: 'arrival_id',
    type: 'string',
    required: true,
    default: '',
    description: 'Specifies the code for the arrival airport or a location identifier. Airport Code: A 3-letter uppercase code representing the arrival airport (e.g., MAD for Madrid-Barajas Airport or JFK for John F. Kennedy International Airport). You can find these codes using resources like Google Flights or IATA. Location Identifier (kgmid): A string that begins with /m/, used to represent a specific location. You can find this identifier on Wikidata by looking for the "Freebase ID" while searching for location. For example, /m/02_286 is the identifier for New York,United States. Multiple Airports/Locations: You can specify more than one airport or location by separating them with commas. For example: SEA, MIA, /m/02_286.',
    displayOptions,
    routing: {
      request: {
        qs: {
          arrival_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Outbound Date (outbound_date)',
    name: 'outbound_date',
    type: 'string',
    required: true,
    default: '',
    description: 'Defines the outbound date. The date format is YYYY-MM-DD.',
    displayOptions,
    routing: {
      request: {
        qs: {
          outbound_date: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Return Date (return_date)',
    name: 'return_date',
    type: 'string',
    default: '',
    description: 'Defines the return date. The date format is YYYY-MM-DD.',
    displayOptions,
    routing: {
      request: {
        qs: {
          return_date: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Date Range',
    name: 'date_range',
    type: 'collection',
    placeholder: 'Add Date Range',
    default: {},
    options: [
      {
        displayName: 'Outbound Date End (outbound_date_end)',
        name: 'outbound_date_end',
        type: 'string',
        default: '',
        description: 'Defines the end date for the outbound flight search. Default value is equal to outbound_date_start + 7 days. Using flight_type=one_way, the response includes all outbound dates between these two values.',
        routing: {
          request: {
            qs: {
              outbound_date_end: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Outbound Date Start (outbound_date_start)',
        name: 'outbound_date_start',
        type: 'string',
        default: '',
        description: 'Defines the start date for the outbound flight search. Default value is equal to outbound_date. When used, it specifies the earliest departure date to consider. Combined with outbound_date_end, it returns flight prices for all outbound dates within the given range.',
        routing: {
          request: {
            qs: {
              outbound_date_start: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Return Date End (return_date_end)',
        name: 'return_date_end',
        type: 'string',
        default: '',
        description: 'Defines the end date for the return flight search. Default value is equal to return_date_start + 7 days. Using both outbound_date_start and return_date_start parameters will return all possible outbound-return date combinations within the specified ranges.',
        routing: {
          request: {
            qs: {
              return_date_end: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Return Date Start (return_date_start)',
        name: 'return_date_start',
        type: 'string',
        default: '',
        description: 'Defines the start date for the return flight search. Default value is equal to return_date. This parameter is only usable when flight_type=round_trip. When provided, it specifies the earliest possible return date in the search results.',
        routing: {
          request: {
            qs: {
              return_date_start: '={{$value}}',
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
        displayName: 'Carry On Bags (carry_on_bags)',
        name: 'carry_on_bags',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the number of carry-on bags. Default is 0. Note: number can\'t be higher than amount of passengers.',
        routing: {
          request: {
            qs: {
              carry_on_bags: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Checked Bags (checked_bags)',
        name: 'checked_bags',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the number of checked bags. Default is 0. Note: number can\'t be higher than amount of passengers.',
        routing: {
          request: {
            qs: {
              checked_bags: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Emissions (emissions)',
        name: 'emissions',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Less emisions only', value: '1' },
        ],
        default: '',
        description: 'Defines the emission level of the flight. Use 1 to show only flights with lower than typical emissions for that route.',
        routing: {
          request: {
            qs: {
              emissions: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Excluded Airlines (excluded_airlines)',
        name: 'excluded_airlines',
        type: 'string',
        default: '',
        description: 'Defines the airline or alliance codes to be excluded from available airlines. An airline ID is an uppercase code (e.g., AC for Air Canada airline or ONEWORLD for oneworld alliance). Airline codes can be found on IATA. Multiple airlines can be combined by joining them with a comma. For example: AC,ONEWORLD. Note: if included_airlines and excluded_airlines are used together, included_airlines takes priority.',
        routing: {
          request: {
            qs: {
              excluded_airlines: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Excluded Connecting Airports (excluded_connecting_airports)',
        name: 'excluded_connecting_airports',
        type: 'string',
        default: '',
        description: 'Defines connecting airports to be excluded from available airports. An airport ID is an uppercase 3-letter code (e.g., CDG for Paris Charles de Gaulle Airport). Multiple airports can be combined by joining them with a comma.',
        routing: {
          request: {
            qs: {
              excluded_connecting_airports: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Flight Type (flight_type)',
        name: 'flight_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Multi city', value: 'multi_city' },
          { name: 'One way', value: 'one_way' },
          { name: 'Round trip', value: 'round_trip' },
        ],
        default: '',
        description: 'Defines the type of the flights',
        routing: {
          request: {
            qs: {
              flight_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Included Airlines (included_airlines)',
        name: 'included_airlines',
        type: 'string',
        default: '',
        description: 'Defines the airline or alliance codes to be selected. An airline or alliance ID is an uppercase code (e.g., AC for Air Canada airline or ONEWORLD for oneworld alliance). Airline codes can be found on IATA. Multiple airlines can be combined by joining them with a comma. For example: AC,ONEWORLD.',
        routing: {
          request: {
            qs: {
              included_airlines: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Included Connecting Airports (included_connecting_airports)',
        name: 'included_connecting_airports',
        type: 'string',
        default: '',
        description: 'Defines connecting airports to be included. By default all connecting_airports are included. An airport ID is an uppercase 3-letter code (e.g., CDG for Paris Charles de Gaulle Airport). Multiple airports can be combined by joining them with a comma.',
        routing: {
          request: {
            qs: {
              included_connecting_airports: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Layover Duration Max (layover_duration_max)',
        name: 'layover_duration_max',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 2147483647,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the maximum layover duration in minutes (e.g., 240 for 4 hours). Max value is 1800 minutes (30 hours).',
        routing: {
          request: {
            qs: {
              layover_duration_max: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Layover Duration Min (layover_duration_min)',
        name: 'layover_duration_min',
        type: 'number',
        typeOptions: {
          minValue: 0,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the minimum layover duration in minutes (e.g., 60 for 1 hour)',
        routing: {
          request: {
            qs: {
              layover_duration_min: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Max Flight Duration (max_flight_duration)',
        name: 'max_flight_duration',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 2147483647,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the maximum flight duration in minutes (e.g., 240 for 4 hours)',
        routing: {
          request: {
            qs: {
              max_flight_duration: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Max Price (max_price)',
        name: 'max_price',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 2147483647,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the maximum ticket price. Default is unlimited.',
        routing: {
          request: {
            qs: {
              max_price: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Outbound Times (outbound_times)',
        name: 'outbound_times',
        type: 'string',
        default: '',
        description: 'Defines the outbound departure and arrival times range. This parameter accepts a string containing up to 4 comma-separated numbers, where the first two numbers specify the departure time range and the last two numbers specify the arrival time range. Each number represents the beginning of an hour (e.g., 4,18,2,18 for a 4:00 AM - 7:00 PM departure and a 2:00 AM - 7:00 PM arrival). Default values are: 0,23,0,23.',
        routing: {
          request: {
            qs: {
              outbound_times: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Return Times (return_times)',
        name: 'return_times',
        type: 'string',
        default: '',
        description: 'Defines the return departure and arrival times range. This parameter also accepts up to 4 comma-separated numbers, where the first two specify the departure time range and the last two specify the arrival time range, following the same format as outbound_times (e.g., 4,18,2,18 for a 4:00 AM - 7:00 PM departure and a 2:00 AM - 7:00 PM arrival). Default values are: 0,23,0,23. Note: available only if flight_type set to round_trip.',
        routing: {
          request: {
            qs: {
              return_times: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Separate Tickets (separate_tickets)',
        name: 'separate_tickets',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Hide separate & self-transfer tickets', value: '1' },
          { name: 'Show separate tickets', value: '0' },
        ],
        default: '',
        description: 'Defines whether to display separate tickets. The default value is 0. Set to 1 to hide separate and self-transfer tickets, or 0 to show them.',
        routing: {
          request: {
            qs: {
              separate_tickets: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Stops (stops)',
        name: 'stops',
        type: 'options',
        options: [
          { name: 'Any', value: 'any' },
          { name: 'Nonstop', value: 'nonstop' },
          { name: 'One stop or fewer', value: 'one_stop_or_fewer' },
          { name: 'Two stops or fewer', value: 'two_stops_or_fewer' },
        ],
        default: 'any',
        description: 'Defines the number of stops during the flight',
        routing: {
          request: {
            qs: {
              stops: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Travel Class (travel_class)',
        name: 'travel_class',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Business', value: 'business' },
          { name: 'Economy', value: 'economy' },
          { name: 'First class', value: 'first_class' },
          { name: 'Premium economy', value: 'premium_economy' },
        ],
        default: '',
        description: 'Defines the travel class',
        routing: {
          request: {
            qs: {
              travel_class: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Number of Passengers',
    name: 'number_of_passengers',
    type: 'collection',
    placeholder: 'Add Number of Passengers',
    default: {},
    options: [
      {
        displayName: 'Adults (adults)',
        name: 'adults',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Defines the number of adults. Default is 1. Note: Maximum number of passengers is 9.',
        routing: {
          request: {
            qs: {
              adults: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Children (children)',
        name: 'children',
        type: 'number',
        typeOptions: {
          minValue: 0,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the number of children. Default is 0.',
        routing: {
          request: {
            qs: {
              children: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Infants In Seat (infants_in_seat)',
        name: 'infants_in_seat',
        type: 'number',
        typeOptions: {
          minValue: 0,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the number of infants in seat. Default is 0.',
        routing: {
          request: {
            qs: {
              infants_in_seat: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Infants On Lap (infants_on_lap)',
        name: 'infants_on_lap',
        type: 'number',
        typeOptions: {
          minValue: 0,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Defines the number of infants on lap. Default is 0.',
        routing: {
          request: {
            qs: {
              infants_on_lap: '={{$value}}',
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

export const google_flights_calendar = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-flights-calendar-api',
};
