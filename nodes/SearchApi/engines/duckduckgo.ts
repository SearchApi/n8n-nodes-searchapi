import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { localeOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['duckduckgo'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo',
  value: 'duckduckgo'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms for DuckDuckGo. Queries can include operators and advanced filters like "machine learning models", site:, intitle:, or inurl:.',
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
        displayName: 'Locale (locale)',
        name: 'locale',
        type: 'options',
        options: localeOptions([
          '', 'ar-es', 'at-de', 'au-en', 'be-fr', 'be-nl', 'bg-bg', 'br-pt', 'ca-en', 'ca-fr', 'ch-de',
          'ch-fr', 'ch-it', 'cl-es', 'cn-zh', 'co-es', 'ct-ca', 'cz-cs', 'de-de', 'dk-da', 'ee-et', 'es-es',
          'fi-fi', 'fr-fr', 'gr-el', 'hk-tzh', 'hr-hr', 'hu-hu', 'id-en', 'id-id', 'ie-en', 'il-he', 'in-en',
          'it-it', 'jp-jp', 'kr-kr', 'lt-lt', 'lv-lv', 'mx-es', 'my-en', 'my-ms', 'nl-nl', 'no-no', 'nz-en',
          'pe-es', 'ph-en', 'ph-tl', 'pl-pl', 'pt-pt', 'ro-ro', 'ru-ru', 'se-sv', 'sg-en', 'sk-sk', 'sl-sl',
          'th-th', 'tr-tr', 'tw-tzh', 'ua-uk', 'ue-es', 'uk-en', 'us-en', 've-es', 'vn-vi', 'wt-wt', 'xa-ar',
          'xa-en', 'xl-es', 'za-en',
        ]),
        default: '',
        description: 'Country and language for your search. Defaults to us-en.',
        routing: {
          request: {
            qs: {
              locale: '={{$value}}',
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
        displayName: 'Safe (safe)',
        name: 'safe',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Moderate', value: 'moderate' },
          { name: 'Off', value: 'off' },
          { name: 'on', value: 'on' },
        ],
        default: '',
        description: 'Filter level for adult content',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
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
          { name: 'Any time', value: 'any_time' },
          { name: 'Past day', value: 'past_day' },
          { name: 'Past month', value: 'past_month' },
          { name: 'Past week', value: 'past_week' },
          { name: 'Past year', value: 'past_year' },
        ],
        default: '',
        description: 'Filters results by date. Supports a custom date range using the format YYYY-MM-DD..YYYY-MM-DD.',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
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
        displayName: 'Next Page Token (next_page_token)',
        name: 'next_page_token',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'Token returned in the response to retrieve the next page of results',
        routing: {
          request: {
            qs: {
              next_page_token: '={{$value}}',
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

export const duckduckgo = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-api',
};
