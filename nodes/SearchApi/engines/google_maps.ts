import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
    displayName: 'Q',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms for Google Maps, e.g., "restaurants near me" or "Starbucks New York"',
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
    displayName: 'Ll',
    name: 'll',
    type: 'string',
    default: '',
    description: 'GPS coordinates for the location. Format: @latitude,longitude,zoom (e.g., @40.7009973,-73.994778,12z) or @latitude,longitude,meters (e.g., @40.7009973,-73.994778,500m). Last value: z (zoom, 3z to 21z) or m (meters, 62m to 18636559m). Zoom is optional but recommended for accuracy',
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
      displayName: 'Google Domain',
      name: 'google_domain',
      type: 'string',
      default: 'google.com',
      description: 'Google domain to use for the search',
      routing: {
        request: {
          qs: {
            google_domain: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Hl',
      name: 'hl',
      type: 'string',
      default: 'en',
      description: 'Interface language for the search',
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
    displayName: 'Page',
    name: 'page',
    type: 'string',
    default: '1',
    description: 'Page number of results to return',
    displayOptions,
    routing: {
      request: {
        qs: {
          page: '={{$value}}',
        },
      },
    },
  }
];

export const google_maps = {
  resource,
  properties,
};
