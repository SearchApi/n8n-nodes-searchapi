import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['yandex_reverse_image'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Yandex Reverse Image',
  value: 'yandex_reverse_image'
};

const properties: INodeProperties[] = [
  {
    displayName: 'URL (url)',
    name: 'url',
    type: 'string',
    required: true,
    default: '',
    description: 'Direct link to the image you want Yandex to analyze. Ensure the URL points to a valid image format (e.g., .jpg, .png, .webp) and is accessible publicly.',
    displayOptions,
    routing: {
      request: {
        qs: {
          url: '={{$value}}',
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
        displayName: 'Crop (crop)',
        name: 'crop',
        type: 'string',
        default: '',
        description: 'Crops the image before reverse search. Format: left;top;right;bottom, with each value between 0 and 1. For example, 0.1;0.2;0.6;0.75 selects the region from 10% to 60% of the width and 20% to 75% of the height. Default is 0;0;1;1 (full image). left must be less than right, and top less than bottom. Cannot be used with crop_id.',
        routing: {
          request: {
            qs: {
              crop: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Crop ID (crop_id)',
        name: 'crop_id',
        type: 'string',
        default: '',
        description: 'Identifies a pre-defined coordinates within an image for targeted reverse search. The crop ID corresponds to a specific area of interest within the image. Cannot be used together with crop.',
        routing: {
          request: {
            qs: {
              crop_id: '={{$value}}',
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

export const yandex_reverse_image = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/yandex-reverse-image-api',
};
