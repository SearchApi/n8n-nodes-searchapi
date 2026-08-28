import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { zeroDataRetention } from '../shared/params';

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
  zeroDataRetention(displayOptions)
];

export const meta_ad_library_page_info = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/meta-ad-library-page-info-api',
};
