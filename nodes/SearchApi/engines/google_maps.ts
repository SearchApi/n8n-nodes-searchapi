import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_LANGUAGES, GOOGLE_MAPS_COUNTRIES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { pageParam, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_maps'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps',
  value: 'google_maps'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on Google Maps. Queries can include terms like "restaurants near me" or "Starbucks New York".',
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
    displayName: 'Location Coordinates (ll)',
    name: 'll',
    type: 'string',
    default: '',
    description: 'GPS coordinates for the location where the query should be applied. Formatted as @latitude,longitude,zoom (e.g. @40.7009973,-73.994778,12z) or @latitude,longitude,meters (e.g. @40.7009973,-73.994778,500m). The last value ends with z (zoom, 3z-21z) or m (meters radius, 62m-18636559m).',
    displayOptions,
    routing: {
      request: {
        qs: {
          ll: '={{$value}}',
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
        options: countryOptions(GOOGLE_MAPS_COUNTRIES),
        default: '',
        description: 'Country of the search',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Interface Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions(GOOGLE_LANGUAGES),
        default: 'en',
        description: 'Interface language of the search',
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
  pageParam('Page of results to return. Defaults to 1.', { displayOptions }),
  zeroDataRetention(displayOptions)
];

export const google_maps = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps',
};
