import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { GOOGLE_LANGUAGES } from '../shared/lists';
import { countryOptions, languageOptions } from '../shared/options';
import { nextPageToken, pageParam, uule, zeroDataRetention } from '../shared/params';

const displayOptions = {
  show: {
    resource: ['google_jobs'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Jobs',
  value: 'google_jobs'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms to search on Google Jobs. Queries can include terms like "software engineer" or "marketing manager in New York".',
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
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
      {
        displayName: 'Chips (chips)',
        name: 'chips',
        type: 'string',
        default: '',
        description: 'Includes additional query conditions taken from the filter chips shown above the results, for example city:Owg_06VPwoli_nfhBo8LyA== filters to one city. Combine several with commas.',
        routing: {
          request: {
            qs: {
              chips: '={{$value}}',
            },
          },
        },
      },
      uule('This parameter sets the exact Google-encoded location for the search, and uule and location cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.'),
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'This parameter is used to specify the canonical location of the search. For exact targeting or to see all available options, check out the Locations API. If multiple locations match your input, the most popular one will be selected.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Location Type (ltype)',
        name: 'ltype',
        type: 'string',
        default: '',
        description: 'Filters results by listing type. Set to 1 to return only work-from-home jobs.',
        routing: {
          request: {
            qs: {
              ltype: '={{$value}}',
            },
          },
        },
      },
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
        options: countryOptions([
          'dz', 'as', 'ao', 'ai', 'ag', 'ar', 'aw', 'at', 'bs', 'bh', 'bd', 'by', 'be', 'bz', 'bj', 'bm', 'bo',
          'bw', 'br', 'io', 'bf', 'bi', 'cm', 'ca', 'cv', 'ky', 'cf', 'td', 'cl', 'co', 'cd', 'cr', 'ci', 'cu',
          'dk', 'dj', 'dm', 'do', 'ec', 'eg', 'sv', 'et', 'fk', 'fr', 'gf', 'pf', 'tf', 'ga', 'gm', 'de', 'gh',
          'gr', 'gp', 'gt', 'gy', 'ht', 'hn', 'hk', 'in', 'id', 'iq', 'it', 'jm', 'jp', 'jo', 'kz', 'ke', 'kw',
          'kg', 'lb', 'ls', 'ly', 'mg', 'mw', 'my', 'ml', 'mq', 'mu', 'yt', 'mx', 'ms', 'ma', 'mz', 'na', 'nl',
          'nc', 'ni', 'ne', 'ng', 'om', 'pk', 'ps', 'pa', 'py', 'pe', 'ph', 'pt', 'pr', 'qa', 're', 'ru', 'rw',
          'sh', 'pm', 'vc', 'st', 'sa', 'sn', 'sc', 'sl', 'sg', 'so', 'za', 'gs', 'es', 'lk', 'sr', 'ch', 'tw',
          'tz', 'th', 'tg', 'tt', 'tn', 'tc', 'ug', 'ae', 'gb', 'uk', 'us', 'uy', 'uz', 've', 'vn', 'vg', 'vi',
          'zm', 'zw',
        ]),
        default: 'us',
        description: 'Country of the search. Check the full list of supported Google Jobs gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Interface Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions(GOOGLE_LANGUAGES),
        default: 'en',
        description: 'Interface language of the search. Check the full list of supported Google hl languages.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Search Radius (lrad)',
        name: 'lrad',
        type: 'number',
        default: 0,
        description: 'Search radius in kilometres around the given location',
        routing: {
          request: {
            qs: {
              lrad: '={{$value || ""}}',
            },
          },
        },
      },
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
      nextPageToken('This parameter is used to retrieve the next page of results. It is returned in the response when there are more results to display. The next_page_token is a unique identifier for the next page of results. It is used to retrieve the next page of results.'),
      pageParam('Indicates which page of results to return. Each page holds 10 results.'),
    ],
    displayOptions,
  },
  zeroDataRetention(displayOptions)
];

export const google_jobs = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-jobs',
};
