import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_LANGUAGES, GOOGLE_MAPS_COUNTRIES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { nextPageToken, numParam, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_maps_reviews'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps Reviews',
  value: 'google_maps_reviews'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Place ID (place_id)',
    name: 'place_id',
    type: 'string',
    default: '',
    description: 'Unique identifier for locations on Google Maps, including businesses, landmarks, and more. For example, a place_id looks like ChIJhRwB-yFawokR5Phil-QQ3zM. Not required if data_id is being used.',
    displayOptions,
    routing: {
      request: {
        qs: {
          place_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Data ID (data_id)',
    name: 'data_id',
    type: 'string',
    default: '',
    description: 'Unique identifier for locations on Google Maps, including businesses, landmarks, and more. For example, a data_id looks like 0x89c25a21fb011c85:0x33df10e49762f8e4. Not required if place_id is being used.',
    displayOptions,
    routing: {
      request: {
        qs: {
          data_id: '={{$value}}',
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
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Highest rating', value: 'highest_rating' },
          { name: 'Lowest rating', value: 'lowest_rating' },
          { name: 'Most relevant', value: 'most_relevant' },
          { name: 'Newest', value: 'newest' },
        ],
        default: 'most_relevant',
        description: 'Sorts results by relevance, recency, or rating',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Topic ID (topic_id)',
        name: 'topic_id',
        type: 'string',
        default: '',
        description: 'Filters reviews by topic. The value must be a KGMID (Knowledge Graph Machine ID), for example /m/06mbny for "Hospitality" or /m/016bn0 for "Service".',
        routing: {
          request: {
            qs: {
              topic_id: '={{$value}}',
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
        options: countryOptions(GOOGLE_MAPS_COUNTRIES),
        default: '',
        description: 'Country of the search',
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
        description: 'Interface language of the search',
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
    displayName: 'Pagination',
    name: 'pagination',
    type: 'collection',
    placeholder: 'Add Pagination',
    default: {},
    options: [
      nextPageToken('Next page token used to retrieve the next page of reviews. Can be found in the JSON response under the pagination key.'),
      numParam('Number of reviews to return. The default value is 10 and the maximum value is 20.', { displayName: 'Number of Reviews (num)', maxValue: 20 })
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_maps_reviews = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps-reviews',
};
