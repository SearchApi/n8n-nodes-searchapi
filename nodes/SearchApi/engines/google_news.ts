import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_news'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google News',
  value: 'google_news'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms to search on Google News. Queries can include operators and advanced filters like "climate change", site:, inurl:, intitle:, as_dt, or as_eq.',
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
    displayName: 'Device',
    name: 'device',
    type: 'collection',
    placeholder: 'Add Device',
    default: {},
    options: [
      {
        displayName: 'Device (device)',
        name: 'device',
        type: 'options',
        options: [
          { name: 'Desktop', value: 'desktop' },
          { name: 'Mobile', value: 'mobile' },
          { name: 'Tablet', value: 'tablet' },
        ],
        default: 'desktop',
        description: 'The default parameter desktop defines the search on a desktop device. The mobile parameter defines the search on a mobile device. The tablet parameter defines the search on a tablet device.',
        routing: {
          request: {
            qs: {
              device: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Geographic Location',
    name: 'geographic_location',
    type: 'collection',
    placeholder: 'Add Geographic Location',
    default: {},
    options: [
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Specifies the canonical location of the search. For exact targeting or to see all available options, check out the Locations API. If multiple locations match your input, the most popular one will be selected.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'UULE (uule)',
        name: 'uule',
        type: 'string',
        default: '',
        description: 'Sets the exact Google-encoded location for the search. The uule and location parameters cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.',
        routing: {
          request: {
            qs: {
              uule: '={{$value}}',
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
        options: countryOptions([
          'af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'aq', 'ag', 'ar', 'am', 'aw', 'au', 'at', 'az', 'bs', 'bh',
          'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bm', 'bt', 'bo', 'ba', 'bw', 'bv', 'br', 'io', 'bn', 'bg', 'bf',
          'bi', 'kh', 'cm', 'ca', 'cv', 'ky', 'cf', 'td', 'cl', 'cn', 'cx', 'cc', 'co', 'km', 'cg', 'cd', 'ck',
          'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj', 'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'et',
          'fk', 'fo', 'fj', 'fi', 'fr', 'gf', 'pf', 'tf', 'ga', 'gm', 'ge', 'de', 'gh', 'gi', 'gr', 'gl', 'gd',
          'gp', 'gu', 'gt', 'gg', 'gn', 'gw', 'gy', 'ht', 'hm', 'va', 'hn', 'hk', 'hu', 'is', 'in', 'id', 'ir',
          'iq', 'ie', 'im', 'il', 'it', 'jm', 'jp', 'je', 'jo', 'kz', 'ke', 'ki', 'kw', 'kg', 'la', 'lv', 'lb',
          'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mo', 'mg', 'mw', 'my', 'mv', 'ml', 'mt', 'mh', 'mq', 'mr', 'mu',
          'yt', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ms', 'ma', 'mz', 'mm', 'na', 'nr', 'np', 'nl', 'nc', 'nz',
          'ni', 'ne', 'ng', 'nu', 'nf', 'kp', 'mk', 'mp', 'no', 'om', 'pk', 'pw', 'ps', 'pa', 'pg', 'py', 'pe',
          'ph', 'pn', 'pl', 'pt', 'pr', 'qa', 're', 'ro', 'ru', 'rw', 'sh', 'kn', 'lc', 'pm', 'vc', 'ws', 'sm',
          'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg', 'sk', 'si', 'sb', 'so', 'za', 'gs', 'kr', 'es', 'lk', 'sd',
          'sr', 'sj', 'sz', 'se', 'ch', 'sy', 'tw', 'tj', 'tz', 'th', 'tl', 'tg', 'tk', 'to', 'tt', 'tn', 'tr',
          'tm', 'tc', 'tv', 'ug', 'ua', 'ae', 'gb', 'uk', 'us', 'um', 'uy', 'uz', 'vu', 've', 'vn', 'vg', 'vi',
          'wf', 'eh', 'ye', 'zm', 'zw',
        ]),
        default: 'us',
        description: 'The default parameter us defines the country of the search. Check the full list of supported Google gl countries.',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'CR (cr)',
        name: 'cr',
        type: 'options',
        options: countryOptions([
          'af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'aq', 'ag', '', 'ar', 'am', 'aw', 'au', 'at', 'az', 'bs',
          'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bm', 'bt', 'bo', 'ba', 'bw', 'bv', 'br', 'io', 'bn', 'bg',
          'bf', 'bi', 'kh', 'cm', 'ca', 'cv', 'ky', 'cf', 'td', 'cl', 'cn', 'cx', 'cc', 'co', 'km', 'cd', 'cg',
          'ck', 'cr', 'ci', 'hr', 'cy', 'cz', 'dk', 'dj', 'dm', 'do', 'tl', 'ec', 'eg', 'sv', 'gq', 'er', 'ee',
          'et', 'fk', 'fo', 'fj', 'fi', 'fr', 'gf', 'pf', 'tf', 'ga', 'gm', 'ge', 'de', 'gh', 'gi', 'gr', 'gl',
          'gd', 'gp', 'gu', 'gt', 'gn', 'gw', 'gy', 'ht', 'hm', 'hn', 'hk', 'hu', 'is', 'in', 'id', 'iq', 'ie',
          'il', 'it', 'jm', 'jp', 'jo', 'kz', 'ke', 'ki', 'kw', 'kg', 'la', 'lv', 'lb', 'ls', 'lr', 'ly', 'li',
          'lt', 'lu', 'mo', 'mk', 'mg', 'mw', 'my', 'mv', 'ml', 'mt', 'mh', 'mq', 'mr', 'mu', 'yt', 'mx', 'fm',
          'md', 'mc', 'mn', 'ms', 'ma', 'mz', 'na', 'nr', 'np', 'nl', 'nc', 'nz', 'ni', 'ne', 'ng', 'nu', 'nf',
          'mp', 'no', 'om', 'pk', 'pw', 'ps', 'pa', 'pg', 'py', 'pe', 'ph', 'pn', 'pl', 'pt', 'pr', 'qa', 're',
          'ro', 'ru', 'rw', 'kn', 'lc', 'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'cs', 'sc', 'sl', 'sg', 'sk', 'si',
          'sb', 'so', 'za', 'gs', 'kr', 'es', 'lk', 'sh', 'pm', 'sr', 'sj', 'sz', 'se', 'ch', 'tw', 'tj', 'tz',
          'th', 'tg', 'tk', 'to', 'tt', 'tn', 'tr', 'tm', 'tc', 'tv', 'ug', 'ua', 'ae', 'gb', 'uk', 'us', 'um',
          'uy', 'uz', 'vu', 'va', 've', 'vn', 'vg', 'vi', 'wf', 'eh', 'ye', 'zm', 'zw',
        ]),
        default: '',
        description: 'Restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by Web server\'s IP address geographic location. Check the full list of supported Google cr countries.',
        routing: {
          request: {
            qs: {
              cr: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Google Domain (google_domain)',
        name: 'google_domain',
        type: 'string',
        default: 'google.com',
        description: 'As of Apr 15, 2025, Google began phasing out country code top-level domains (ccTLDs). Users using the search bar or visiting local domains like google.de or google.co.uk are now automatically redirected to google.com. For localized searches, use the gl (country), hl (language) or other localization parameters instead. Learn more in Google\'s official announcement. See the full list of supported Google domains.',
        routing: {
          request: {
            qs: {
              google_domain: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language (hl)',
        name: 'hl',
        type: 'options',
        options: languageOptions([
          'ar', 'be', 'bn', 'bh', 'bg', 'ca', 'zh-cn', 'zh-tw', 'cs', 'da', 'nl', 'en', 'fr', 'gl', 'de', 'el',
          'kl', 'gu', 'ha', 'iw', 'hi', 'hu', 'id', 'it', 'ja', 'jw', 'kn', 'ko', 'lv', 'lt', 'ms', 'ml', 'mv',
          'mr', 'mo', 'sr-me', 'no', 'fa', 'pl', 'pt', 'pt-br', 'pt-pt', 'pa', 'ro', 'ru', 'sr', 'sh', 'sk',
          'sl', 'es', 'es-419', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vu', 'vi',
        ]),
        default: 'en',
        description: 'The default parameter en defines the interface language of the search. Check the full list of supported Google News hl languages.',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'LR (lr)',
        name: 'lr',
        type: 'options',
        options: languageOptions([
          '', 'lang_ar', 'lang_hy', 'lang_bg', 'lang_ca', 'lang_zh-CN', 'lang_zh-TW', 'lang_hr', 'lang_cs',
          'lang_da', 'lang_nl', 'lang_en', 'lang_et', 'lang_tl', 'lang_fi', 'lang_fr', 'lang_de', 'lang_el',
          'lang_iw', 'lang_hi', 'lang_hu', 'lang_is', 'lang_id', 'lang_it', 'lang_ja', 'lang_ko', 'lang_lv',
          'lang_lt', 'lang_no', 'lang_fa', 'lang_pl', 'lang_pt', 'lang_ro', 'lang_ru', 'lang_sr', 'lang_sk',
          'lang_sl', 'lang_es', 'lang_sv', 'lang_th', 'lang_tr', 'lang_uk', 'lang_vi',
        ]),
        default: '',
        description: 'Restricts search results to documents written in a particular language or a set of languages. The accepted format is lang_{2-letter country code}. For instance, to filter documents written in Japanese, the value should be set to lang_jp. To incorporate multiple languages, a value like lang_it|lang_de restricts the search to documents written in either Italian or German. Google identifies the document language based on the top-level domain (TLD) of the document\'s URL, any language meta tags present, or the language utilized within the document\'s body text. Check the full list of supported Google lr languages.',
        routing: {
          request: {
            qs: {
              lr: '={{$value}}',
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
        displayName: 'Filter (filter)',
        name: 'filter',
        type: 'options',
        options: [
          { name: 'Disable "Duplicate Content" and "Host Crowding" filters', value: '0' },
          { name: 'Enable "Duplicate Content" and "Host Crowding" filters', value: '1' },
        ],
        default: '1',
        description: 'Controls whether the "Duplicate Content" and "Host Crowding" filters are enabled. Set the value to 1 to enable these filters, which is the default setting. To disable these filters, set the value to 0.',
        routing: {
          request: {
            qs: {
              filter: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'NFPR (nfpr)',
        name: 'nfpr',
        type: 'options',
        options: [
          { name: 'Exclude auto-corrected results', value: '1' },
          { name: 'Include auto-corrected results', value: '0' },
        ],
        default: '0',
        description: 'Controls whether results from queries that have been auto-corrected for spelling errors are included. To exclude these auto-corrected results, set the value to 1. By default, the value is 0, meaning auto-corrected results are included.',
        routing: {
          request: {
            qs: {
              nfpr: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Sort By (sort_by)',
        name: 'sort_by',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Most recent', value: 'most_recent' },
        ],
        default: '',
        description: 'By default, news results are sorted by relevance. To get the most recent articles, set it to most_recent.',
        routing: {
          request: {
            qs: {
              sort_by: '={{$value}}',
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
          { name: 'Last 1 minute', value: 'last_1_minute' },
          { name: 'Last 15 minutes', value: 'last_15_minutes' },
          { name: 'Last 30 minutes', value: 'last_30_minutes' },
          { name: 'Last 5 minutes', value: 'last_5_minutes' },
          { name: 'Last day', value: 'last_day' },
          { name: 'Last hour', value: 'last_hour' },
          { name: 'Last month', value: 'last_month' },
          { name: 'Last week', value: 'last_week' },
          { name: 'Last year', value: 'last_year' },
        ],
        default: '',
        description: 'Restricts results to URLs based on date. Supported values are: last_hour - data from the past hour. last_day - data from the past 24 hours. last_week - data from the past week. last_month - data from the past month. last_year - data from the past year. Using time_period_min or time_period_max parameters, you can specify a custom time period. Note, that the time_period_min and time_period_max parameters could be used separately as well.',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period Max (time_period_max)',
        name: 'time_period_max',
        type: 'string',
        default: '',
        description: 'Specifies the end of the time period. It could be used in combination with the time_period_min parameter. The value should be in the format MM/DD/YYYY.',
        routing: {
          request: {
            qs: {
              time_period_max: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time Period Min (time_period_min)',
        name: 'time_period_min',
        type: 'string',
        default: '',
        description: 'Specifies the start of the time period. It could be used in combination with the time_period_max parameter. The value should be in the format MM/DD/YYYY.',
        routing: {
          request: {
            qs: {
              time_period_min: '={{$value}}',
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
        displayName: 'Page (page)',
        name: 'page',
        type: 'number',
        typeOptions: {
          minValue: 1,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Indicates which page of results to return. By default, it is set to 1.',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
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

export const google_news = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-news',
};
