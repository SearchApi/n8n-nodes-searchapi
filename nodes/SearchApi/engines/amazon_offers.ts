import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['amazon_offers'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Amazon Offers',
  value: 'amazon_offers'
};

const properties: INodeProperties[] = [
  {
    displayName: 'ASIN (asin)',
    name: 'asin',
    type: 'string',
    required: true,
    default: '',
    description: 'Amazon Standard Identification Number (ASIN) for the product to retrieve offers for',
    displayOptions,
    routing: {
      request: {
        qs: {
          asin: '={{$value}}',
        },
      },
    },
  },
	{
    displayName: 'Filters (filters)',
    name: 'filters',
    type: 'string',
    default: '',
    description: 'Filter results by criteria. Separate multiple filters with commas (e.g., prime,new,used_very_good). Condition filters: new, used_like_new, used_very_good, used_good, used_acceptable, collectible. Shipping filters: prime, free_shipping.',
    displayOptions,
    routing: {
      request: {
        qs: {
          filters: '={{$value}}',
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
      description: 'Amazon domain for the search',
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
      description: 'Two-letter ISO 3166-1 alpha-2 country code for the delivery address (defaults to the country code of the selected Amazon domain)',
      routing: {
        request: {
          qs: {
            delivery_country: '={{$value}}',
          },
        },
      },
    }
    ],
    displayOptions,
  }
];

export const amazon_offers = {
  resource,
  properties,
};
