import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_shopping'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Shopping',
  value: 'google_shopping'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Specifies the search query. Filters embedded in the query act as hints rather than strict filters — if there are too few matching items, results outside the filters may appear.',
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
        displayName: 'Country (gl)',
        name: 'gl',
        type: 'options',
        options: countryOptions([
          'ai', 'ar', 'aw', 'au', 'at', 'be', 'bm', 'br', 'io', 'ca', 'ky', 'cl', 'cx', 'cc', 'co', 'cz', 'dk',
          'fk', 'fi', 'fr', 'gf', 'pf', 'tf', 'de', 'gr', 'gp', 'hm', 'hk', 'hu', 'in', 'id', 'ie', 'il', 'it',
          'jp', 'my', 'mq', 'yt', 'mx', 'ms', 'nl', 'nc', 'nz', 'nf', 'no', 'ph', 'pl', 'pt', 're', 'ro', 'ru',
          'pm', 'sa', 'sg', 'sk', 'za', 'gs', 'kr', 'es', 'se', 'ch', 'tw', 'th', 'tk', 'tr', 'tc', 'ua', 'ae',
          'gb', 'uk', 'us', 'vn', 'vg', 'wf',
        ]),
        default: 'us',
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
        displayName: 'Google Domain (google_domain)',
        name: 'google_domain',
        type: 'string',
        default: 'google.com',
        description: 'As of Apr 15, 2025, Google began phasing out country code top-level domains (ccTLDs). Users visiting local domains like google.de or google.co.uk are now automatically redirected to google.com. For localized searches, use gl (country) or hl (language) instead.',
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
        type: 'options',
        options: languageOptions([
          'af', 'ak', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bem', 'bn', 'bh', 'xx-bork', 'bs', 'br', 'bg',
          'my', 'km', 'ca', 'chr', 'ny', 'zh-cn', 'zh-tw', 'co', 'hr', 'cs', 'da', 'nl', 'xx-elmer', 'en',
          'eo', 'et', 'ee', 'fo', 'tl', 'fi', 'fr', 'fy', 'gaa', 'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu',
          'xx-hacker', 'ht', 'ha', 'haw', 'iw', 'hi', 'hu', 'is', 'ig', 'id', 'ia', 'ga', 'it', 'ja', 'jw',
          'kn', 'kk', 'rw', 'rn', 'xx-klingon', 'kg', 'ko', 'kri', 'ku', 'ckb', 'ky', 'lo', 'la', 'lv', 'ln',
          'lt', 'loz', 'lg', 'ach', 'mk', 'mg', 'ms', 'ml', 'mv', 'mt', 'mi', 'mr', 'mfe', 'mo', 'mn', 'sr-me',
          'ne', 'pcm', 'nso', 'no', 'nn', 'oc', 'or', 'om', 'ps', 'fa', 'xx-pirate', 'pl', 'pt', 'pt-br',
          'pt-pt', 'pa', 'qu', 'ro', 'rm', 'nyn', 'ru', 'gd', 'sr', 'sh', 'st', 'tn', 'crs', 'sn', 'sd', 'si',
          'sk', 'sl', 'so', 'es', 'es-419', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'lua',
          'tum', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 'vu', 'vi', 'cy', 'wo', 'xh', 'yi', 'yo', 'zu',
        ]),
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
        description: 'Specifies the canonical location of the search. If multiple locations match your input, the most popular one will be selected.',
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
        description: 'Sets the exact Google-encoded location for the search. Cannot be used together with location. SearchApi builds it automatically when you use location, but you can provide your own for precise control.',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Condition (condition)',
        name: 'condition',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'New', value: 'new' },
          { name: 'Used', value: 'used' },
        ],
        default: '',
        description: 'Filters results by product condition',
        routing: {
          request: {
            qs: {
              condition: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Include Base Images (include_base_images)',
        name: 'include_base_images',
        type: 'boolean',
        default: false,
        description: 'Whether to include base64-encoded product images in the shopping results',
        routing: {
          request: {
            qs: {
              include_base_images: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Include Favicon (include_favicon)',
        name: 'include_favicon',
        type: 'boolean',
        default: false,
        description: "Whether to include the seller's favicon in the shopping results",
        routing: {
          request: {
            qs: {
              include_favicon: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Is Free Delivery (is_free_delivery)',
        name: 'is_free_delivery',
        type: 'boolean',
        default: false,
        description: 'Whether to filter results to only show products with free shipping. If shoprs is also provided, it takes priority and this parameter is ignored.',
        routing: {
          request: {
            qs: {
              is_free_delivery: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Is On Sale (is_on_sale)',
        name: 'is_on_sale',
        type: 'boolean',
        default: false,
        description: 'Whether to filter results to only show products that are currently on sale. If shoprs is also provided, it takes priority and this parameter is ignored.',
        routing: {
          request: {
            qs: {
              is_on_sale: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Is Small Business (is_small_business)',
        name: 'is_small_business',
        type: 'boolean',
        default: false,
        description: 'Whether to filter results to only show products sold by small businesses. If shoprs is also provided, it takes priority and this parameter is ignored.',
        routing: {
          request: {
            qs: {
              is_small_business: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Price Max (price_max)',
        name: 'price_max',
        type: 'string',
        default: '',
        description: 'Specifies the maximum price of the products returned. This parameter must include the currency. For example, 100 filters results to products priced at $100 or less. Must be used as a strict filter before applying shoprs.',
        routing: {
          request: {
            qs: {
              price_max: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Price Min (price_min)',
        name: 'price_min',
        type: 'string',
        default: '',
        description: 'Specifies the minimum price of the products returned. This parameter must include the currency. For example, 2.50 filters results to products priced at $2.50 or higher. Must be used as a strict filter before applying shoprs.',
        routing: {
          request: {
            qs: {
              price_min: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Shopping Filters (shoprs)',
        name: 'shoprs',
        type: 'string',
        default: '',
        description: 'Applies strict filtering rules based on encoded values. Example: CAEYFyoDcHM1MhwIFxISUHJpY2U6IGxvdyB0byBoaWdoKgQQARgBYAKIAQE sorts products by price (low to high). Filters provided in the JSON response can be used in subsequent requests to apply additional filters iteratively.',
        routing: {
          request: {
            qs: {
              shoprs: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Price high to low', value: 'price_high_to_low' },
          { name: 'Price low to high', value: 'price_low_to_high' },
          { name: 'Relevance', value: 'relevance' },
          { name: 'Review score', value: 'review_score' },
        ],
        default: '',
        description: 'Sorts the shopping results by the specified criteria. If shoprs is also provided, it takes priority and this parameter is ignored.',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
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
        displayName: 'Page Number (page)',
        name: 'page',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Indicates which page of results to return',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
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

export const google_shopping = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-shopping',
};
