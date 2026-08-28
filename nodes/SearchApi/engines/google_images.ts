import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { DEVICE_OPTIONS, GOOGLE_COUNTRIES, GOOGLE_CR_COUNTRIES, GOOGLE_LANGUAGES, GOOGLE_LR_LANGUAGES, GOOGLE_SAFE_OPTIONS } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { nextPageToken, pageParam, uule, zeroDataRetention } from '../shared/params';

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
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on Google Images. Queries can include operators and advanced filters like "cute cats", site:, inurl:, intitle:, as_dt, or as_eq.',
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
    type: 'options',
    options: DEVICE_OPTIONS,
    default: 'desktop',
    description: 'The default parameter desktop defines the search on a desktop device. The mobile parameter defines the search on a mobile device. The tablet parameter defines the search on a tablet device.',
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
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
      uule('Exact Google-encoded location for the search; uule and location cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.'),
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Canonical location of the search. If multiple locations match your input, the most popular one will be selected.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
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
        description: 'The default parameter us defines the country of the search',
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
        type: 'options',
        options: countryOptions(GOOGLE_CR_COUNTRIES),
        default: '',
        description: 'Restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by Web server\'s IP address geographic location.',
        routing: {
          request: {
            qs: {
              cr: '={{$value}}',
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
        description: 'The default parameter en defines the interface language of the search',
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
        type: 'options',
        options: languageOptions(GOOGLE_LR_LANGUAGES),
        default: '',
        description: 'Restricts search results to documents written in a particular language or a set of languages. The accepted format for this parameter is lang_{2-letter country code}. For instance, to filter documents written in Japanese, the value should be set to lang_jp. To incorporate multiple languages, a value like lang_it|lang_de restricts the search to documents written in either Italian or German. Google identifies the document language based on the top-level domain (TLD) of the document\'s URL, any language meta tags present, or the language utilized within the document\'s body text.',
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
        displayName: 'Advanced Search Filter (tbs)',
        name: 'tbs',
        type: 'string',
        default: '',
        description: 'Restricts results to URLs based on encoded values. Normally constructed using size, color, image_type, time_period, usage_rights values. For instance, isz:l would return only results that has large image size.',
        routing: {
          request: {
            qs: {
              tbs: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Aspect Ratio (aspect_ratio)',
        name: 'aspect_ratio',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Panoramic', value: 'panoramic' },
          { name: 'Square', value: 'square' },
          { name: 'Tall', value: 'tall' },
          { name: 'Wide', value: 'wide' },
        ],
        default: '',
        description: 'Filters images based on aspect ratio',
        routing: {
          request: {
            qs: {
              aspect_ratio: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Auto-Correction Filter (nfpr)',
        name: 'nfpr',
        type: 'options',
        options: [
          { name: 'Exclude auto-corrected results', value: '1' },
          { name: 'Include auto-corrected results', value: '0' },
        ],
        default: '0',
        description: 'Controls whether results from queries that have been auto-corrected for spelling errors are included. To exclude these auto-corrected results, set the value to 1. By default, the value is 0, meaning auto-corrected results are included.',
        routing: {
          request: {
            qs: {
              nfpr: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Chips (chips)',
        name: 'chips',
        type: 'string',
        default: '',
        description: 'Includes additional query conditions taken from the filter chips shown above the results. Values come from a previous response.',
        routing: {
          request: {
            qs: {
              chips: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Color (color)',
        name: 'color',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Black', value: 'black' },
          { name: 'Black and white', value: 'black_and_white' },
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
        default: '',
        description: 'Controls the color of your search results',
        routing: {
          request: {
            qs: {
              color: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Filter (filter)',
        name: 'filter',
        type: 'options',
        options: [
          { name: 'Disable "Duplicate Content" and "Host Crowding" filters', value: '0' },
          { name: 'Enable "Duplicate Content" and "Host Crowding" filters', value: '1' },
        ],
        default: '1',
        description: 'Controls whether the "Duplicate Content" and "Host Crowding" filters are enabled. Set the value to 1 to enable these filters, which is the default setting. To disable these filters, set the value to 0.',
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
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Clipart', value: 'clipart' },
          { name: 'Face', value: 'face' },
          { name: 'Gif', value: 'gif' },
          { name: 'Line drawing', value: 'line_drawing' },
          { name: 'Photo', value: 'photo' },
        ],
        default: '',
        description: 'Controls the type of your search results',
        routing: {
          request: {
            qs: {
              image_type: '={{$value}}',
            },
          },
        },
      },
      nextPageToken('Token for retrieving the next page of results. Returned in the response when more results are available.'),
      {
        displayName: 'Safe Search (safe)',
        name: 'safe',
        type: 'options',
        options: GOOGLE_SAFE_OPTIONS,
        default: 'blur',
        description: 'Toggles the SafeSearch feature for the results. SafeSearch operates by filtering out adult content from your search results. Google\'s filters use proprietary technology to check keywords, phrases and URLs. While no filters are 100 percent accurate, SafeSearch will remove the overwhelming majority of adult content from your search results.',
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
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Icon', value: 'icon' },
          { name: 'Large', value: 'large' },
          { name: 'Larger than 1024x768', value: 'larger_than_1024x768' },
          { name: 'Larger than 12mp', value: 'larger_than_12mp' },
          { name: 'Larger than 15mp', value: 'larger_than_15mp' },
          { name: 'Larger than 20mp', value: 'larger_than_20mp' },
          { name: 'Larger than 2mp', value: 'larger_than_2mp' },
          { name: 'Larger than 400x300', value: 'larger_than_400x300' },
          { name: 'Larger than 40mp', value: 'larger_than_40mp' },
          { name: 'Larger than 4mp', value: 'larger_than_4mp' },
          { name: 'Larger than 640x480', value: 'larger_than_640x480' },
          { name: 'Larger than 6mp', value: 'larger_than_6mp' },
          { name: 'Larger than 70mp', value: 'larger_than_70mp' },
          { name: 'Larger than 800x600', value: 'larger_than_800x600' },
          { name: 'Larger than 8mp', value: 'larger_than_8mp' },
          { name: 'Medium', value: 'medium' },
        ],
        default: '',
        description: 'Controls the size of your search results',
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
          { name: 'Last 1 minute', value: 'last_1_minute' },
          { name: 'Last 15 minutes', value: 'last_15_minutes' },
          { name: 'Last 30 minutes', value: 'last_30_minutes' },
          { name: 'Last 5 minutes', value: 'last_5_minutes' },
          { name: 'Last day', value: 'last_day' },
          { name: 'Last hour', value: 'last_hour' },
          { name: 'Last month', value: 'last_month' },
          { name: 'Last week', value: 'last_week' },
          { name: 'Last year', value: 'last_year' },
        ],
        default: '',
        description: 'Restricts results to URLs based on date',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Usage Rights (usage_rights)',
        name: 'usage_rights',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Commercial or other licenses', value: 'commercial_or_other_licenses' },
          { name: 'Creative commons licenses', value: 'creative_commons_licenses' },
        ],
        default: '',
        description: 'Controls the usage rights of your search results',
        routing: {
          request: {
            qs: {
              usage_rights: '={{$value}}',
            },
          },
        },
      },
    ],
    displayOptions,
  },
  pageParam('Indicates which page of results to return. By default, it is set to 1.', { displayOptions }),
  zeroDataRetention(displayOptions)
];

export const google_images = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-images',
};
