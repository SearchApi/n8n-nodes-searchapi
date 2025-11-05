import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['amazon_product'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Amazon Product',
  value: 'amazon_product'
};

const properties: INodeProperties[] = [
  {
    displayName: 'ASIN (asin)',
    name: 'asin',
    type: 'string',
    required: true,
    default: '',
    description: 'Amazon Standard Identification Number (ASIN) for the product to retrieve details for',
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
    },
    {
      displayName: 'Language (language)',
      name: 'language',
      type: 'string',
      default: '',
      description: 'Display language for the Amazon page',
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
  }
];

export const amazon_product = {
  resource,
  properties,
};
