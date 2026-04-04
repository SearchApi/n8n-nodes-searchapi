import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['google_images'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Images',
  value: 'google_images'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms for Google Images. Supports operators and advanced filters (e.g., "cute cats", site:, inurl:, intitle:, as_dt, as_eq).',
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
    displayName: 'Device (device)',
    name: 'device',
    type: 'string',
    default: 'desktop',
    description: 'Device type for the search: desktop, mobile, or tablet',
    displayOptions,
    routing: {
      request: {
        qs: {
          device: '={{$value}}',
        },
      },
    },
  },
	{
    displayName: 'Page (page)',
    name: 'page',
    type: 'string',
    default: '1',
    description: 'Page number of results to return (default: 1)',
    displayOptions,
    routing: {
      request: {
        qs: {
          page: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
    {
      displayName: 'Location (location)',
      name: 'location',
      type: 'string',
      default: '',
      description: 'Canonical location for the search. If multiple locations match, the most popular one will be selected.',
      routing: {
        request: {
          qs: {
            location: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Encoded Location (uule)',
      name: 'uule',
      type: 'string',
      default: '',
      description: 'Google-encoded location for the search. Cannot be used with location parameter.',
      routing: {
        request: {
          qs: {
            uule: '={{$value}}',
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
      type: 'string',
      default: 'us',
      description: 'Country of the search (default: us)',
      routing: {
        request: {
          qs: {
            gl: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Country Restrict (cr)',
      name: 'cr',
      type: 'string',
      default: '',
      description: 'Restricts results to documents from a specific country based on TLD or IP address',
      routing: {
        request: {
          qs: {
            cr: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Google Domain (google_domain)',
      name: 'google_domain',
      type: 'string',
      default: 'google.com',
      description: 'Google domain for the search (default: google.com)',
      routing: {
        request: {
          qs: {
            google_domain: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Language (hl)',
      name: 'hl',
      type: 'string',
      default: 'en',
      description: 'Interface language for the search (default: en)',
      routing: {
        request: {
          qs: {
            hl: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Language Restrict (lr)',
      name: 'lr',
      type: 'string',
      default: '',
      description: 'Restricts results to documents in specific languages. Format: lang_{2-letter code} (e.g., lang_jp for Japanese). Multiple languages: lang_it|lang_de',
      routing: {
        request: {
          qs: {
            lr: '={{$value}}',
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
      displayName: 'Aspect Ratio (aspect_ratio)',
      name: 'aspect_ratio',
      type: 'string',
      default: '',
      description: 'Filters images by aspect ratio. Supported values: square (width equals height), tall (height > width), wide (width > height), panoramic (width at least 2x height).',
      routing: {
        request: {
          qs: {
            aspect_ratio: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Color (color)',
      name: 'color',
      type: 'options',
      default: '',
      description: 'Color filter for search results',
      options: [
        { name: 'Any', value: '' },
        { name: 'Black', value: 'black' },
        { name: 'Black & White', value: 'black_and_white' },
        { name: 'Blue', value: 'blue' },
        { name: 'Brown', value: 'brown' },
        { name: 'Color', value: 'color' },
        { name: 'Gray', value: 'gray' },
        { name: 'Green', value: 'green' },
        { name: 'Orange', value: 'orange' },
        { name: 'Pink', value: 'pink' },
        { name: 'Purple', value: 'purple' },
        { name: 'Red', value: 'red' },
        { name: 'Teal', value: 'teal' },
        { name: 'Transparent', value: 'transparent' },
        { name: 'White', value: 'white' },
        { name: 'Yellow', value: 'yellow' },
      ],
      routing: {
        request: {
          qs: {
            color: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Duplicate Filter (filter)',
      name: 'filter',
      type: 'string',
      default: '1',
      description: 'Controls "Duplicate Content" and "Host Crowding" filters. Set to 1 to enable (default), 0 to disable.',
      routing: {
        request: {
          qs: {
            filter: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Image Type (image_type)',
      name: 'image_type',
      type: 'string',
      default: '',
      description: 'Type filter for search results. Available options: clipart, line_drawing, gif, face, photo.',
      routing: {
        request: {
          qs: {
            image_type: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'No Auto-Correct (nfpr)',
      name: 'nfpr',
      type: 'string',
      default: '0',
      description: 'Controls whether auto-corrected spelling results are included. Set to 1 to exclude, 0 to include (default).',
      routing: {
        request: {
          qs: {
            nfpr: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'SafeSearch (safe)',
      name: 'safe',
      type: 'string',
      default: 'off',
      description: 'SafeSearch filter for adult content. Set to active to enable, off to disable (default: off, but explicit content is blurred).',
      routing: {
        request: {
          qs: {
            safe: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Size (size)',
      name: 'size',
      type: 'string',
      default: '',
      description: 'Size filter for search results. Available options: large, medium, icon, larger_than_400x300, larger_than_640x480, larger_than_800x600, larger_than_1024x768, larger_than_2mp, larger_than_4mp, larger_than_6mp, larger_than_8mp, larger_than_12mp, larger_than_15mp, larger_than_20mp, larger_than_40mp, larger_than_70mp.',
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
      type: 'string',
      default: '',
      description: 'Restricts results by date. Supported values: last_hour, last_day, last_week, last_month, last_year.',
      routing: {
        request: {
          qs: {
            time_period: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Time-Based Search (tbs)',
      name: 'tbs',
      type: 'string',
      default: '',
      description: 'Restricts results based on encoded values. Normally constructed using size, color, image_type, time_period, usage_rights values (e.g., isz:l for large images).',
      routing: {
        request: {
          qs: {
            tbs: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Usage Rights (usage_rights)',
      name: 'usage_rights',
      type: 'string',
      default: '',
      description: 'Usage rights filter for search results. Available options: creative_commons_licenses, commercial_or_other_licenses.',
      routing: {
        request: {
          qs: {
            usage_rights: '={{$value}}',
          },
        },
      },
    }
    ],
    displayOptions,
  },
];

export const google_images = {
  resource,
  properties,
};
