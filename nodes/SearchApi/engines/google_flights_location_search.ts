import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { TRAVEL_LANGUAGES } from '../shared/lists';
import { languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_flights_location_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Flights Location Search',
  value: 'google_flights_location_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search query that would produce autocomplete suggestions',
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
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Search Type (search_type)',
        name: 'search_type',
        type: 'options',
        options: [
          { name: 'Arrival', value: 'arrival' },
          { name: 'Departure', value: 'departure' },
        ],
        default: 'departure',
        description: 'Defines which flight box to autocomplete',
        routing: {
          request: {
            qs: {
              search_type: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_flights_location_search = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-flights-location-search-api',
};
