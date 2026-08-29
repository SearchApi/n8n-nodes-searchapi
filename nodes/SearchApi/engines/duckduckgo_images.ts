import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { localeOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['duckduckgo_images'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo Images',
  value: 'duckduckgo_images'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on DuckDuckGo Images',
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
        displayName: 'Locale (locale)',
        name: 'locale',
        type: 'options',
        options: localeOptions([
          '', 'ar-es', 'at-de', 'au-en', 'be-fr', 'be-nl', 'bg-bg', 'br-pt', 'ca-en', 'ca-fr', 'ch-de',
          'ch-fr', 'ch-it', 'cl-es', 'cn-zh', 'co-es', 'ct-ca', 'cz-cs', 'de-de', 'dk-da', 'ee-et', 'es-es',
          'fi-fi', 'fr-fr', 'gr-el', 'hk-tzh', 'hr-hr', 'hu-hu', 'id-en', 'id-id', 'ie-en', 'il-he', 'in-en',
          'it-it', 'jp-jp', 'kr-kr', 'lt-lt', 'lv-lv', 'mx-es', 'my-en', 'my-ms', 'nl-nl', 'no-no', 'nz-en',
          'pe-es', 'ph-en', 'ph-tl', 'pl-pl', 'pt-pt', 'ro-ro', 'ru-ru', 'se-sv', 'sg-en', 'sk-sk', 'sl-sl',
          'th-th', 'tr-tr', 'tw-tzh', 'ua-uk', 'ue-es', 'uk-en', 'us-en', 've-es', 'vn-vi', 'wt-wt', 'xa-ar',
          'xa-en', 'xl-es', 'za-en',
        ]),
        default: '',
        description: 'Specifies the country and language for your search. The default parameter is us-en. Check the full list of supported DuckDuckGo locales.',
        routing: {
          request: {
            qs: {
              locale: '={{$value}}',
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
        displayName: 'Color (color)',
        name: 'color',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Black', value: 'black' },
          { name: 'Blue', value: 'blue' },
          { name: 'Brown', value: 'brown' },
          { name: 'Color', value: 'color' },
          { name: 'Gray', value: 'gray' },
          { name: 'Green', value: 'green' },
          { name: 'Monochrome', value: 'monochrome' },
          { name: 'Orange', value: 'orange' },
          { name: 'Pink', value: 'pink' },
          { name: 'Purple', value: 'purple' },
          { name: 'Red', value: 'red' },
          { name: 'Teal', value: 'teal' },
          { name: 'White', value: 'white' },
          { name: 'Yellow', value: 'yellow' },
        ],
        default: '',
        description: 'Filters images by color',
        routing: {
          request: {
            qs: {
              color: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Image Type (image_type)',
        name: 'image_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Clipart', value: 'clipart' },
          { name: 'Gif', value: 'gif' },
          { name: 'Line', value: 'line' },
          { name: 'Photo', value: 'photo' },
          { name: 'Transparent', value: 'transparent' },
        ],
        default: '',
        description: 'Filters images by type',
        routing: {
          request: {
            qs: {
              image_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Layout (layout)',
        name: 'layout',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Square', value: 'square' },
          { name: 'Tall', value: 'tall' },
          { name: 'Wide', value: 'wide' },
        ],
        default: '',
        description: 'Filters images by layout',
        routing: {
          request: {
            qs: {
              layout: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'License (license)',
        name: 'license',
        type: 'options',
        options: [
          { name: 'Any', value: 'any' },
          { name: 'Modify', value: 'modify' },
          { name: 'Modify commercially', value: 'modify_commercially' },
          { name: 'Public', value: 'public' },
          { name: 'Share', value: 'share' },
          { name: 'Share commercially', value: 'share_commercially' },
        ],
        default: 'any',
        description: 'Filters images by license',
        routing: {
          request: {
            qs: {
              license: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Size (size)',
        name: 'size',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Large', value: 'large' },
          { name: 'Medium', value: 'medium' },
          { name: 'Small', value: 'small' },
          { name: 'Wallpaper', value: 'wallpaper' },
        ],
        default: '',
        description: 'Filters images by size',
        routing: {
          request: {
            qs: {
              size: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period (time_period)',
        name: 'time_period',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Any time', value: 'any_time' },
          { name: 'Past day', value: 'past_day' },
          { name: 'Past month', value: 'past_month' },
          { name: 'Past week', value: 'past_week' },
          { name: 'Past year', value: 'past_year' },
        ],
        default: '',
        description: 'Filters results by date',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
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
        description: 'Retrieves the next page of results. It is returned in the response when there are more results to display.',
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

export const duckduckgo_images = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-images-api',
};
