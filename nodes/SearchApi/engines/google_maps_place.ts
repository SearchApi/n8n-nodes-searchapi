import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_LANGUAGES, GOOGLE_MAPS_COUNTRIES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_maps_place'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps Place',
  value: 'google_maps_place'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Place ID (place_id)',
    name: 'place_id',
    type: 'string',
    default: '',
    description: 'Unique identifier for a place on Google Maps. Note: The place_id parameter is not required if data_id parameter is being used.',
    displayOptions,
    routing: {
      request: {
        qs: {
          place_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Data ID (data_id)',
    name: 'data_id',
    type: 'string',
    default: '',
    description: 'Unique identifier for a place on Google Maps. Note: The data_id parameter is not required if place_id parameter is being used.',
    displayOptions,
    routing: {
      request: {
        qs: {
          data_id: '={{$value}}',
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
        description: 'Defines the country of the search',
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
        description: 'Defines the interface language of the search',
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

export const google_maps_place = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps-place',
};
