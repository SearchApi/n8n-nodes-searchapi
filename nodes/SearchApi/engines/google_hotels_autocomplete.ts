import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { TRAVEL_LANGUAGES } from '../shared/lists';
import { languageOptions } from '../shared/options';
import { zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_hotels_autocomplete'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Hotels Autocomplete',
  value: 'google_hotels_autocomplete'
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
    displayName: 'Localization',
    name: 'localization',
    type: 'collection',
    placeholder: 'Add Localization',
    default: {},
    options: [
      {
        displayName: 'Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions(TRAVEL_LANGUAGES),
        default: '',
        description: 'Defines the interface language of the search. Check the full list of supported Google Travel hl languages.',
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

export const google_hotels_autocomplete = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-hotels-autocomplete-api',
};
