import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['meta_ad_library_page_info'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Meta Ad Library Page Info',
  value: 'meta_ad_library_page_info'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Page ID (page_id)',
    name: 'page_id',
    type: 'string',
    required: true,
    default: '',
    description: 'Specifies the Facebook page ID to retrieve information for',
    displayOptions,
    routing: {
      request: {
        qs: {
          page_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Zero Data Retention',
    name: 'zero_data_retention',
    type: 'collection',
    placeholder: 'Add Zero Data Retention',
    default: {},
    options: [
      {
        displayName: 'Zero Data Retention (zero_retention)',
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

export const meta_ad_library_page_info = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-page-info-api',
};
