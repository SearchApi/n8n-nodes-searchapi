import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { CURRENCIES, GOOGLE_COUNTRIES, GOOGLE_LANGUAGES } from '../shared/lists';
import { countryOptions, currencyOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_flights'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Flights',
  value: 'google_flights'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Departure Airport (departure_id)',
    name: 'departure_id',
    type: 'string',
    default: '',
    description: 'Code for the departure airport or a location identifier. Airport Code: A 3-letter uppercase code (e.g., MAD for Madrid-Barajas Airport or JFK for John F. Kennedy International Airport). Location Identifier (kgmid): A string beginning with /m/ (e.g., /m/02_286 for New York, United States). Multiple airports or locations can be separated with commas (e.g., SEA, MIA, /m/02_286). Note: Not required if flight_type is set to multi_city, where the itinerary comes from multi_city_json.',
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
    displayName: 'Arrival Airport (arrival_id)',
    name: 'arrival_id',
    type: 'string',
    default: '',
    description: 'Code for the arrival airport or a location identifier. Airport Code: A 3-letter uppercase code (e.g., MAD for Madrid-Barajas Airport or JFK for John F. Kennedy International Airport). Location Identifier (kgmid): A string beginning with /m/ (e.g., /m/02_286 for New York, United States). Multiple airports or locations can be separated with commas (e.g., SEA, MIA, /m/02_286). Note: Not required if flight_type is set to multi_city, where the itinerary comes from multi_city_json.',
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
    default: '',
    description: 'Defines the outbound date. The date format is YYYY-MM-DD. Note: Not required if flight_type set to multi_city.',
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
    description: 'Defines the return date. The date format is YYYY-MM-DD. Note: Not required if flight_type set to one_way or multi_city.',
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
    displayName: 'Search Query',
    name: 'search_query',
    type: 'collection',
    placeholder: 'Add Search Query',
    default: {},
    options: [
      {
        displayName: 'Multi City Json (multi_city_json)',
        name: 'multi_city_json',
        type: 'string',
        default: '',
        description: 'Required when flight_type is set to multi_city. JSON string defining multi-city itinerary legs, each with departure_id, arrival_id, outbound_date, and optional times (up to 4 comma-separated hour numbers for departure/arrival range, e.g., 4,18,2,18; default 0,23,0,23).',
        routing: {
          request: {
            qs: {
              multi_city_json: '={{$value}}',
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
        options: countryOptions(GOOGLE_COUNTRIES),
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
        options: currencyOptions(CURRENCIES),
        default: 'USD',
        description: 'Defines the currency of the returned prices. Default is USD.',
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
        options: languageOptions(GOOGLE_LANGUAGES),
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
        description: 'Defines the emission level filter. When set, shows only flights with lower than typical emissions for that route.',
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
        displayName: 'Expanded Search (expanded_search)',
        name: 'expanded_search',
        type: 'options',
        options: [
          { name: '', value: '' },
          { name: 'True', value: 'true' },
          { name: 'False', value: 'false' },
        ],
        default: '',
        description: 'Whether to retrieve more results. Only has an effect together with show_hidden_flights or show_cheapest_flights, and makes the request slower.',
        routing: {
          request: {
            qs: {
              expanded_search: '={{$value}}',
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
              layover_duration_max: '={{$value || ""}}',
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
        description: 'Defines the minimum layover duration in minutes (e.g., 60 for 1 hours)',
        routing: {
          request: {
            qs: {
              layover_duration_min: '={{$value || ""}}',
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
              max_flight_duration: '={{$value || ""}}',
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
              max_price: '={{$value || ""}}',
            },
          },
        },
      },
      {
        displayName: 'Outbound Times (outbound_times)',
        name: 'outbound_times',
        type: 'string',
        default: '',
        description: 'Defines the outbound departure and arrival times range. This parameter accepts a string containing up to 4 comma-separated numbers, where the first two numbers specify the departure time range and the last two numbers specify the arrival time range. Each number represents the beginning of an hour (e.g., 4,18,2,18 for a 4:00 AM to 7:00 PM departure and a 2:00 AM to 7:00 PM arrival). Default values are: 0,23,0,23.',
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
        description: 'Defines the return departure and arrival times range. This parameter also accepts up to 4 comma-separated numbers, where the first two specify the departure time range and the last two specify the arrival time range, following the same format as outbound_times (e.g., 4,18,2,18 for a 4:00 AM to 7:00 PM departure and a 2:00 AM to 7:00 PM arrival). Default values are: 0,23,0,23. Note: available only if flight_type set to round_trip.',
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
        description: 'Whether to hide separate and self-transfer tickets',
        routing: {
          request: {
            qs: {
              separate_tickets: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Show Cheapest Flights (show_cheapest_flights)',
        name: 'show_cheapest_flights',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'True', value: 'true' },
        ],
        default: '',
        description: 'Whether to show the cheapest flights instead of best flights',
        routing: {
          request: {
            qs: {
              show_cheapest_flights: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Show Hidden Flights (show_hidden_flights)',
        name: 'show_hidden_flights',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'True', value: 'true' },
        ],
        default: '',
        description: 'Whether to show hidden flights',
        routing: {
          request: {
            qs: {
              show_hidden_flights: '={{$value}}',
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
          { name: 'Arrival time', value: 'arrival_time' },
          { name: 'Departure time', value: 'departure_time' },
          { name: 'Duration', value: 'duration' },
          { name: 'Emissions', value: 'emissions' },
          { name: 'Price', value: 'price' },
          { name: 'Top flights', value: 'top_flights' },
        ],
        default: '',
        description: 'Defines the sorting order of the flights',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
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
      },
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
    displayName: 'Pagination',
    name: 'pagination',
    type: 'collection',
    placeholder: 'Add Pagination',
    default: {},
    options: [
      {
        displayName: 'Booking Token (booking_token)',
        name: 'booking_token',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'Used to retrieve booking options for selected flights. This token is found in the flight results.',
        routing: {
          request: {
            qs: {
              booking_token: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Departure Token (departure_token)',
        name: 'departure_token',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'Used to select a flight and view return flights (for round trips) or flights for the next leg (for multi-city trips). This token is found in the flight results.',
        routing: {
          request: {
            qs: {
              departure_token: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_flights = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-flights-api',
};
