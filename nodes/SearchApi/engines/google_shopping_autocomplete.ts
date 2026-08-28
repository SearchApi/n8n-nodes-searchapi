import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_COUNTRIES, GOOGLE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_shopping_autocomplete'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Shopping Autocomplete',
  value: 'google_shopping_autocomplete'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search query that would produce autocomplete suggestions',
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filters',
    default: {},
    options: [
      {
        displayName: 'Cursor Position (cp)',
        name: 'cp',
        type: 'number',
        typeOptions: {
          minValue: 0,
          numberPrecision: 0,
        },
        default: 0,
        description: 'Determines the cursor position within the search query for autocomplete requests. A 0 value places the cursor at the start of the query (like |some query), whereas not including cp suggests the cursor is at the end of the query (like some query|). The location of the cursor affects the suggestions provided.',
        routing: {
          request: {
            qs: {
              cp: '={{$value}}',
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
        description: 'Defines the country of the search. Check the full list of supported Google gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
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
        description: 'Defines the interface language of the search. Check the full list of supported Google hl languages.',
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
  zeroDataRetention(displayOptions)
];

export const google_shopping_autocomplete = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-shopping-autocomplete-api',
};
