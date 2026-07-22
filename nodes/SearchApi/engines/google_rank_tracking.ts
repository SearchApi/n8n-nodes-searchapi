import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_rank_tracking'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Rank Tracking',
  value: 'google_rank_tracking'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on Google and track ranking positions',
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
        description: 'Defines the device type for the search',
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
        displayName: 'Encoded Location (uule)',
        name: 'uule',
        type: 'string',
        default: '',
        description: 'Sets the exact Google-encoded location for the search. uule and location cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.',
        routing: {
          request: {
            qs: {
              uule: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Location (location)',
        name: 'location',
        type: 'string',
        default: '',
        description: 'Specifies the canonical location of the search (e.g., New York). If multiple locations match your input, the most popular one will be selected.',
        routing: {
          request: {
            qs: {
              location: '={{$value}}',
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
        description: 'Defines the country of the search',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Google Domain (google_domain)',
        name: 'google_domain',
        type: 'string',
        default: 'google.com',
        description: 'As of Apr 15, 2025, Google began phasing out country code top-level domains (ccTLDs). Users are now automatically redirected to google.com. For localized searches, use the gl (country), hl (language) or other localization parameters instead.',
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
          'af', 'ak', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bem', 'bn', 'bh', 'xx-bork', 'bs', 'br', 'bg',
          'my', 'km', 'ca', 'chr', 'ny', 'zh-cn', 'zh-tw', 'co', 'hr', 'cs', 'da', 'nl', 'xx-elmer', 'en',
          'eo', 'et', 'ee', 'fo', 'tl', 'fi', 'fr', 'fy', 'gaa', 'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu',
          'xx-hacker', 'ht', 'ha', 'haw', 'iw', 'hi', 'hu', 'is', 'ig', 'id', 'ia', 'ga', 'it', 'ja', 'jw',
          'kn', 'kk', 'rw', 'rn', 'xx-klingon', 'kg', 'ko', 'kri', 'ku', 'ckb', 'ky', 'lo', 'la', 'lv', 'ln',
          'lt', 'loz', 'lg', 'ach', 'mk', 'mg', 'ms', 'ml', 'mv', 'mt', 'mi', 'mr', 'mfe', 'mo', 'mn', 'sr-me',
          'ne', 'pcm', 'nso', 'no', 'nn', 'oc', 'or', 'om', 'ps', 'fa', 'xx-pirate', 'pl', 'pt', 'pt-br',
          'pt-pt', 'pa', 'qu', 'ro', 'rm', 'nyn', 'ru', 'gd', 'sr', 'sh', 'st', 'tn', 'crs', 'sn', 'sd', 'si',
          'sk', 'sl', 'so', 'es', 'es-419', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'lua',
          'tum', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 'vu', 'vi', 'cy', 'wo', 'xh', 'yi', 'yo', 'zu',
        ]),
        default: 'en',
        description: 'Defines the interface language of the search',
        routing: {
          request: {
            qs: {
              hl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Language Restrict (lr)',
        name: 'lr',
        type: 'options',
        options: languageOptions([
          '', 'lang_id', 'lang_ar', 'lang_bg', 'lang_ca', 'lang_cs', 'lang_da', 'lang_de', 'lang_el',
          'lang_en', 'lang_es', 'lang_et', 'lang_fa', 'lang_fi', 'lang_fr', 'lang_hi', 'lang_hr', 'lang_hu',
          'lang_hy', 'lang_is', 'lang_it', 'lang_iw', 'lang_ja', 'lang_ko', 'lang_lt', 'lang_lv', 'lang_nl',
          'lang_no', 'lang_pl', 'lang_pt', 'lang_ro', 'lang_ru', 'lang_sk', 'lang_sl', 'lang_sr', 'lang_sv',
          'lang_th', 'lang_tl', 'lang_tr', 'lang_uk', 'lang_vi', 'lang_zh-cn', 'lang_zh-tw',
        ]),
        default: '',
        description: 'Restricts search results to documents written in a particular language. The accepted format is lang_{2-letter country code}.',
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
    displayName: 'Search Settings',
    name: 'search_settings',
    type: 'collection',
    placeholder: 'Add Search Settings',
    default: {},
    options: [
      {
        displayName: 'Page (page)',
        name: 'page',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 10,
          numberPrecision: 0,
        },
        default: 1,
        description: 'Page number for pagination (1-10). Each page contains 10 results. For example, page=2 fetches positions 11-20, and page=3 fetches positions 21-30. Note: Results are capped at position 100. If page=10 and num=100, only positions 91-100 are returned.',
        routing: {
          request: {
            qs: {
              page: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Results Count (num)',
        name: 'num',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 100,
          numberPrecision: 0,
        },
        default: 100,
        description: 'Number of results to return. Can be customized from 1 to 100.',
        routing: {
          request: {
            qs: {
              num: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Safe (safe)',
        name: 'safe',
        type: 'options',
        options: [
          { name: 'Blur explicit images', value: 'blur' },
          { name: 'Disable SafeSearch', value: 'off' },
          { name: 'Enable strict SafeSearch', value: 'active' },
        ],
        default: 'blur',
        description: 'Toggles the SafeSearch feature',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
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

export const google_rank_tracking = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-rank-tracking-api',
};
