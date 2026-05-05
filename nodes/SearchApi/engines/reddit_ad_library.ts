import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['reddit_ad_library'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Reddit Ad Library',
  value: 'reddit_ad_library'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query',
    name: 'search_query',
    type: 'collection',
    placeholder: 'Add Search Query',
    default: {},
    options: [
      {
        displayName: 'Search Query (q)',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Terms you want to search within Reddit ad content. Queries can include terms like "gaming" or "fitness products". If not provided, all ads will be retrieved based on the applied filters.',
        routing: {
          request: {
            qs: {
              q: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Filter Parameters',
    name: 'filter_parameters',
    type: 'collection',
    placeholder: 'Add Filter Parameters',
    default: {},
    options: [
      {
        displayName: 'Budget Category (budget_category)',
        name: 'budget_category',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'High', value: 'HIGH' },
          { name: 'Low', value: 'LOW' },
          { name: 'Medium', value: 'MEDIUM' },
        ],
        default: '',
        description: 'Filters ads by budget category. Multiple values can be provided separated by commas.',
        routing: {
          request: {
            qs: {
              budget_category: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Industry (industry)',
        name: 'industry',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Auto', value: 'AUTO' },
          { name: 'Consumer packaged goods', value: 'CONSUMER_PACKAGED_GOODS' },
          { name: 'Education', value: 'EDUCATION' },
          { name: 'Employment', value: 'EMPLOYMENT' },
          { name: 'Entertainment', value: 'ENTERTAINMENT' },
          { name: 'Financial services', value: 'FINANCIAL_SERVICES' },
          { name: 'Gambling and fantasy sports', value: 'GAMBLING_AND_FANTASY_SPORTS' },
          { name: 'Gaming', value: 'GAMING' },
          { name: 'Health and beauty', value: 'HEALTH_AND_BEAUTY' },
          { name: 'Other', value: 'OTHER' },
          { name: 'Politics and government', value: 'POLITICS_AND_GOVERNMENT' },
          { name: 'Real estate', value: 'REAL_ESTATE' },
          { name: 'Retail and ecommerce', value: 'RETAIL_AND_ECOMMERCE' },
          { name: 'Tech b2b', value: 'TECH_B2B' },
          { name: 'Tech b2c', value: 'TECH_B2C' },
          { name: 'Travel', value: 'TRAVEL' },
        ],
        default: '',
        description: 'Filters ads by industry category. Multiple values can be provided separated by commas.',
        routing: {
          request: {
            qs: {
              industry: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Objective Type (objective_type)',
        name: 'objective_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'App installs', value: 'APP_INSTALLS' },
          { name: 'Clicks', value: 'CLICKS' },
          { name: 'Conversions', value: 'CONVERSIONS' },
          { name: 'Impressions', value: 'IMPRESSIONS' },
          { name: 'Video viewable impressions', value: 'VIDEO_VIEWABLE_IMPRESSIONS' },
        ],
        default: '',
        description: 'Filters ads by objective type. Multiple values can be provided separated by commas.',
        routing: {
          request: {
            qs: {
              objective_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Placements (placements)',
        name: 'placements',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Comments page', value: 'COMMENTS_PAGE' },
          { name: 'Feed', value: 'FEED' },
        ],
        default: '',
        description: 'Filters ads by placement location. Multiple values can be provided separated by commas.',
        routing: {
          request: {
            qs: {
              placements: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Post Type (post_type)',
        name: 'post_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Carousel', value: 'CAROUSEL' },
          { name: 'Free form', value: 'FREE_FORM' },
          { name: 'Image', value: 'IMAGE' },
          { name: 'Video', value: 'VIDEO' },
        ],
        default: '',
        description: 'Filters ads by post type. Multiple values can be provided separated by commas.',
        routing: {
          request: {
            qs: {
              post_type: '={{$value}}',
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

export const reddit_ad_library = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/reddit-ad-library-api',
};
