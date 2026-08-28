import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_COUNTRIES, GOOGLE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_maps_directions'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps Directions',
  value: 'google_maps_directions'
};

const properties: INodeProperties[] = [
  {
    displayName: 'From (from)',
    name: 'from',
    type: 'string',
    required: true,
    default: '',
    description: 'Origin of the route. Can be a plain address, data ID, or coordinates (lat,long).',
    displayOptions,
    routing: {
      request: {
        qs: {
          from: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'To (to)',
    name: 'to',
    type: 'string',
    required: true,
    default: '',
    description: 'Destination of the route. Can be a plain address, data ID, or coordinates (lat,long).',
    displayOptions,
    routing: {
      request: {
        qs: {
          to: '={{$value}}',
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
        displayName: 'Avoid (avoid)',
        name: 'avoid',
        type: 'multiOptions',
        options: [
          { name: 'Ferries', value: 'ferries' },
          { name: 'Highways', value: 'highways' },
          { name: 'Tolls', value: 'tolls' },
        ],
        default: [],
        description: 'What to avoid when calculating routes. Tolls and highways apply to driving and best only, ferries to walking and cycling only.',
        routing: {
          request: {
            qs: {
              avoid: '={{ $value.length ? JSON.stringify($value) : \'\' }}',
            },
          },
        },
      },
      {
        displayName: 'Distance Units (distance_units)',
        name: 'distance_units',
        type: 'options',
        options: [
          { name: 'Automatic', value: 'automatic' },
          { name: 'km', value: 'km' },
          { name: 'mi', value: 'mi' },
        ],
        default: 'automatic',
        description: 'Unit of distance measurements in the response. Options: automatic (Default), km (Kilometers), mi (Miles). Not supported when travel_mode is flying or transit.',
        routing: {
          request: {
            qs: {
              distance_units: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Prefer (prefer)',
        name: 'prefer',
        type: 'multiOptions',
        options: [
          { name: 'Bus', value: 'bus' },
          { name: 'Subway', value: 'subway' },
          { name: 'Train', value: 'train' },
          { name: 'Tram and light rail', value: 'tram_and_light_rail' },
        ],
        default: [],
        description: 'Preferred transit types. Only supported when travel_mode is transit.',
        routing: {
          request: {
            qs: {
              prefer: '={{ $value.length ? JSON.stringify($value) : \'\' }}',
            },
          },
        },
      },
      {
        displayName: 'Route (route)',
        name: 'route',
        type: 'options',
        options: [
          { name: 'Best', value: 'best' },
          { name: 'Fewer transfers', value: 'fewer_transfers' },
          { name: 'Less walking', value: 'less_walking' },
          { name: 'Wheelchair accessible', value: 'wheelchair_accessible' },
        ],
        default: 'best',
        description: 'Route preference for transit directions. Options: best (Default), fewer_transfers, less_walking, wheelchair_accessible. Only supported when travel_mode is transit.',
        routing: {
          request: {
            qs: {
              route: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time (time)',
        name: 'time',
        type: 'string',
        default: '',
        description: 'Departure or arrival time for the route. Formats: depart_at:&lt;timestamp&gt; (Unix timestamp), arrive_by:&lt;timestamp&gt; (Unix timestamp), or last_available (transit only). Cannot be used together with the waypoints parameter.',
        routing: {
          request: {
            qs: {
              time: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Travel Mode (travel_mode)',
        name: 'travel_mode',
        type: 'options',
        options: [
          { name: 'Best', value: 'best' },
          { name: 'Cycling', value: 'cycling' },
          { name: 'Driving', value: 'driving' },
          { name: 'Flying', value: 'flying' },
          { name: 'Transit', value: 'transit' },
          { name: 'Walking', value: 'walking' },
        ],
        default: 'best',
        description: 'Mode of travel. Options: best (Default), driving, cycling, walking, transit (not supported when waypoints is present), flying.',
        routing: {
          request: {
            qs: {
              travel_mode: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Waypoints (waypoints)',
        name: 'waypoints',
        type: 'string',
        default: '',
        description: 'Waypoints of the route, as a JSON array of strings: plain addresses, data IDs or coordinates, for example ["Buckingham Palace, London"]. Maximum 8 elements. Not supported when travel_mode is transit. Cannot be used together with the time parameter.',
        routing: {
          request: {
            qs: {
              waypoints: '={{$value}}',
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
        description: 'Country to use for the search. Check the full list of supported Google gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
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
        description: 'Interface language of the search. Check the full list of supported Google hl languages.',
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
  zeroDataRetention(displayOptions)
];

export const google_maps_directions = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps-directions-api',
};
