import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['amazon_search'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Amazon Search',
  value: 'amazon_search'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms',
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
    description: 'Results page number (defaults to 1)',
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
      displayName: 'Amazon Domain (amazon_domain)',
      name: 'amazon_domain',
      type: 'string',
      default: 'amazon.com',
      description: 'Amazon domain of the search (defaults to amazon.com)',
      routing: {
        request: {
          qs: {
            amazon_domain: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Delivery Country (delivery_country)',
      name: 'delivery_country',
      type: 'string',
      default: 'us',
      description: 'Two-letter ISO 3166-1 alpha-2 country code for delivery address (defaults to the selected Amazon domain country code, e.g., de for amazon.de)',
      routing: {
        request: {
          qs: {
            delivery_country: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Language (language)',
      name: 'language',
      type: 'string',
      default: '',
      description: 'Display language of Amazon page',
      routing: {
        request: {
          qs: {
            language: '={{$value}}',
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
      displayName: 'Price Max (price_max)',
      name: 'price_max',
      type: 'string',
      default: '0',
      description: 'Maximum price of products returned (e.g., 20.5)',
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
      default: '0',
      description: 'Minimum price of products returned (e.g., 10)',
      routing: {
        request: {
          qs: {
            price_min: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Refine By (rh)',
      name: 'rh',
      type: 'string',
      default: '',
      description: 'Filters search results based on specific criteria such as brand and ratings. Separate multiple values with commas (e.g., p_72:2661618011,p_36:2661612011).',
      routing: {
        request: {
          qs: {
            rh: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Sort By (sort_by)',
      name: 'sort_by',
      type: 'string',
      default: '',
      description: 'Sort search results by different criteria. Available options: featured (default), price_low_to_high, price_high_to_low, average_review, newest_arrivals, bestsellers.',
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
];

export const amazon_search = {
  resource,
  properties,
};
