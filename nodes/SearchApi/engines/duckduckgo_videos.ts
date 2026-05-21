import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['duckduckgo_videos'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Duckduckgo Videos',
  value: 'duckduckgo_videos'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Search terms to look up on DuckDuckGo Videos',
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
        options: [
          { name: 'Any', value: '' },
          { name: 'ar-es', value: 'ar-es' },
          { name: 'at-de', value: 'at-de' },
          { name: 'au-en', value: 'au-en' },
          { name: 'be-fr', value: 'be-fr' },
          { name: 'be-nl', value: 'be-nl' },
          { name: 'bg-bg', value: 'bg-bg' },
          { name: 'br-pt', value: 'br-pt' },
          { name: 'ca-en', value: 'ca-en' },
          { name: 'ca-fr', value: 'ca-fr' },
          { name: 'ch-de', value: 'ch-de' },
          { name: 'ch-fr', value: 'ch-fr' },
          { name: 'ch-it', value: 'ch-it' },
          { name: 'cl-es', value: 'cl-es' },
          { name: 'cn-zh', value: 'cn-zh' },
          { name: 'co-es', value: 'co-es' },
          { name: 'ct-ca', value: 'ct-ca' },
          { name: 'cz-cs', value: 'cz-cs' },
          { name: 'de-de', value: 'de-de' },
          { name: 'dk-da', value: 'dk-da' },
          { name: 'ee-et', value: 'ee-et' },
          { name: 'es-es', value: 'es-es' },
          { name: 'fi-fi', value: 'fi-fi' },
          { name: 'fr-fr', value: 'fr-fr' },
          { name: 'gr-el', value: 'gr-el' },
          { name: 'hk-tzh', value: 'hk-tzh' },
          { name: 'hr-hr', value: 'hr-hr' },
          { name: 'hu-hu', value: 'hu-hu' },
          { name: 'id-en', value: 'id-en' },
          { name: 'id-id', value: 'id-id' },
          { name: 'ie-en', value: 'ie-en' },
          { name: 'il-he', value: 'il-he' },
          { name: 'in-en', value: 'in-en' },
          { name: 'it-it', value: 'it-it' },
          { name: 'jp-jp', value: 'jp-jp' },
          { name: 'kr-kr', value: 'kr-kr' },
          { name: 'lt-lt', value: 'lt-lt' },
          { name: 'lv-lv', value: 'lv-lv' },
          { name: 'mx-es', value: 'mx-es' },
          { name: 'my-en', value: 'my-en' },
          { name: 'my-ms', value: 'my-ms' },
          { name: 'nl-nl', value: 'nl-nl' },
          { name: 'no-no', value: 'no-no' },
          { name: 'nz-en', value: 'nz-en' },
          { name: 'pe-es', value: 'pe-es' },
          { name: 'ph-en', value: 'ph-en' },
          { name: 'ph-tl', value: 'ph-tl' },
          { name: 'pl-pl', value: 'pl-pl' },
          { name: 'pt-pt', value: 'pt-pt' },
          { name: 'ro-ro', value: 'ro-ro' },
          { name: 'ru-ru', value: 'ru-ru' },
          { name: 'se-sv', value: 'se-sv' },
          { name: 'sg-en', value: 'sg-en' },
          { name: 'sk-sk', value: 'sk-sk' },
          { name: 'sl-sl', value: 'sl-sl' },
          { name: 'th-th', value: 'th-th' },
          { name: 'tr-tr', value: 'tr-tr' },
          { name: 'tw-tzh', value: 'tw-tzh' },
          { name: 'ua-uk', value: 'ua-uk' },
          { name: 'ue-es', value: 'ue-es' },
          { name: 'uk-en', value: 'uk-en' },
          { name: 'us-en', value: 'us-en' },
          { name: 've-es', value: 've-es' },
          { name: 'vn-vi', value: 'vn-vi' },
          { name: 'wt-wt', value: 'wt-wt' },
          { name: 'xa-ar', value: 'xa-ar' },
          { name: 'xa-en', value: 'xa-en' },
          { name: 'xl-es', value: 'xl-es' },
          { name: 'za-en', value: 'za-en' },
        ],
        default: '',
        description: 'Specifies the country and language for your search. The default parameter is us-en. Check the full list of supported DuckDuckGo locales.',
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
        displayName: 'Duration (duration)',
        name: 'duration',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Long', value: 'long' },
          { name: 'Medium', value: 'medium' },
          { name: 'Short', value: 'short' },
        ],
        default: '',
        description: 'Filters videos by duration',
        routing: {
          request: {
            qs: {
              duration: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'License (license)',
        name: 'license',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Creative common', value: 'creative_common' },
          { name: 'Youtube', value: 'youtube' },
        ],
        default: '',
        description: 'Filters videos by license',
        routing: {
          request: {
            qs: {
              license: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Resolution (resolution)',
        name: 'resolution',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'High', value: 'high' },
          { name: 'Standard', value: 'standard' },
        ],
        default: '',
        description: 'Filters videos by resolution',
        routing: {
          request: {
            qs: {
              resolution: '={{$value}}',
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
        description: 'Filters results by date',
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
        description: 'Retrieves the next page of results. Returned in the response when there are more results to display.',
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

export const duckduckgo_videos = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/duckduckgo-videos-api',
};
