import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

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
    displayName: 'Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search query. Filters embedded in the query act as hints rather than strict filters. If there are too few matching items, results outside the filters may appear. Examples: by price (tshirt under $30, jeans between $15 and $30), by size (mens size 8.5 nike air), by color (Playstation white), nearby stores (Apparel nearby), by condition (iphone used, macbook new), by brand (prada dress, gucci shoes), discounted products (laptop on sale)',
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
      description: 'Interface language of the search (default: en)',
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
      description: 'Canonical location of the search. If multiple locations match, the most popular one will be selected.',
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
      description: 'Exact Google-encoded location for the search. Cannot be used with location parameter. Automatically built when using location parameter, but can be provided for precise control',
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
      type: 'string',
      default: '',
      description: 'Filters product condition. Options: new, used.',
      routing: {
        request: {
          qs: {
            condition: '={{$value}}',
          },
        },
      },
    },
		{
			displayName: 'Free Delivery (is_free_delivery)',
			name: 'is_free_delivery',
			type: 'string',
			default: '',
			description: 'Show only products with free shipping. Can be combined with is_on_sale, is_small_business, and sort_by. Ignored if shoprs parameter is provided',
			routing: {
				request: {
					qs: {
						is_free_delivery: '={{$value}}',
					},
				},
			},
		},
    {
      displayName: 'Include Base Images (include_base_images)',
      name: 'include_base_images',
      type: 'string',
      default: 'false',
      description: 'Include base64-encoded product images in the shopping results (default: false)',
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
      type: 'string',
      default: 'false',
      description: 'Include seller\'s favicon in the shopping results (default: false)',
      routing: {
        request: {
          qs: {
            include_favicon: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Maximum Price (price_max)',
      name: 'price_max',
      type: 'string',
      default: '',
      description: 'Maximum price of the products returned (must include currency, e.g., 100). Must be used as a strict filter before applying shoprs.',
      routing: {
        request: {
          qs: {
            price_max: '={{$value}}',
          },
        },
      },
    },
		{
      displayName: 'Minimum Price (price_min)',
      name: 'price_min',
      type: 'string',
      default: '',
      description: 'Minimum price of the products returned (must include currency, e.g., 2.50). Must be used as a strict filter before applying shoprs.',
      routing: {
        request: {
          qs: {
            price_min: '={{$value}}',
          },
        },
      },
    },
		{
      displayName: 'On Sale (is_on_sale)',
      name: 'is_on_sale',
      type: 'string',
      default: '',
      description: 'Show only products currently on sale. Can be combined with is_small_business, is_free_delivery, and sort_by. Ignored if shoprs parameter is provided',
      routing: {
        request: {
          qs: {
            is_on_sale: '={{$value}}',
          },
        },
      },
    },
		{
      displayName: 'Small Business (is_small_business)',
      name: 'is_small_business',
      type: 'string',
      default: '',
      description: 'Show only products sold by small businesses. Can be combined with is_on_sale, is_free_delivery, and sort_by. Ignored if shoprs parameter is provided',
      routing: {
        request: {
          qs: {
            is_small_business: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Sort By (sort_by)',
      name: 'sort_by',
      type: 'string',
      default: '',
      description: 'Sort shopping results. Options: price_low_to_high, price_high_to_low, rating_high_to_low. Can be combined with is_on_sale, is_small_business, and is_free_delivery. Ignored if shoprs parameter is provided',
      routing: {
        request: {
          qs: {
            sort_by: '={{$value}}',
          },
        },
      },
    },
		{
      displayName: 'Strict Filters (shoprs)',
      name: 'shoprs',
      type: 'string',
      default: '',
      description: 'Strict filtering rules based on encoded values (e.g., CAEYFyoDcHM1MhwIFxISUHJpY2U6IGxvdyB0byBoaWdoKgQQARgBYAKIAQE for price sorting). Filters from JSON response can be used in subsequent requests.',
      routing: {
        request: {
          qs: {
            shoprs: '={{$value}}',
          },
        },
      },
    },
    ],
    displayOptions,
  }
];

export const google_shopping = {
  resource,
  properties,
};
