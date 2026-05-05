import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['google_maps_photos'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps Photos',
  value: 'google_maps_photos'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Place ID (place_id)',
    name: 'place_id',
    type: 'string',
    required: true,
    default: '',
    description: 'Unique identifier for locations on Google, including businesses, landmarks, and more. It can be obtained using the Google Maps API and is used to access detailed information about a place. Note: Not required if data_id is being used.',
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
    required: true,
    default: '',
    description: 'Unique identifier for locations on Google, including businesses, landmarks, and more. It can be obtained using the Google Maps API and is used to access detailed information about a place. Note: Not required if place_id is being used.',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Category ID (category_id)',
        name: 'category_id',
        type: 'string',
        default: '',
        description: 'Defines a category of photos that will be retrieved. You can obtain the category_id from the response of a request or from the Google Maps UI.',
        routing: {
          request: {
            qs: {
              category_id: '={{$value}}',
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
        description: 'Next page token used to retrieve the next page of photos. If there are no results for the given token, the response will include only search parameters and search metadata.',
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

export const google_maps_photos = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps-photos',
};
