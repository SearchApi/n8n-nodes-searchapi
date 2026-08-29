import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_images'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Images',
  value: 'google_images'
};

const properties: INodeProperties[] = [
  {
    displayName: 'Search Query (q)',
    name: 'q',
    type: 'string',
    required: true,
    default: '',
    description: 'Terms you want to search on Google Images. Queries can include operators and advanced filters like "cute cats", site:, inurl:, intitle:, as_dt, or as_eq.',
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
    displayOptions,
    routing: {
      request: {
        qs: {
          device: '={{$value}}',
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
        displayName: 'Encoded Location (uule)',
        name: 'uule',
        type: 'string',
        default: '',
        description: 'Exact Google-encoded location for the search; uule and location cannot be used at the same time. SearchApi builds it for you when you use the location parameter, but you can provide your own if you want precise control.',
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
        description: 'Canonical location of the search. If multiple locations match your input, the most popular one will be selected.',
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
        description: 'The default parameter us defines the country of the search',
        routing: {
          request: {
            qs: {
              gl: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Country Restrict (cr)',
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
        description: 'Restricts search results to documents originating in a particular country. Google determines the country of a document by the top-level domain (TLD) of the document\'s URL or by Web server\'s IP address geographic location.',
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
        description: 'As of Apr 15, 2025, Google began phasing out country code top-level domains (ccTLDs). Users using the search bar or visiting local domains like google.de or google.co.uk are now automatically redirected to google.com. For localized searches, use the gl (country), hl (language) or other localization parameters instead.',
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
        description: 'The default parameter en defines the interface language of the search',
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
          '', 'lang_ar', 'lang_hy', 'lang_bg', 'lang_ca', 'lang_zh-CN', 'lang_zh-TW', 'lang_hr', 'lang_cs',
          'lang_da', 'lang_nl', 'lang_en', 'lang_et', 'lang_tl', 'lang_fi', 'lang_fr', 'lang_de', 'lang_el',
          'lang_iw', 'lang_hi', 'lang_hu', 'lang_is', 'lang_id', 'lang_it', 'lang_ja', 'lang_ko', 'lang_lv',
          'lang_lt', 'lang_no', 'lang_fa', 'lang_pl', 'lang_pt', 'lang_ro', 'lang_ru', 'lang_sr', 'lang_sk',
          'lang_sl', 'lang_es', 'lang_sv', 'lang_th', 'lang_tr', 'lang_uk', 'lang_vi',
        ]),
        default: '',
        description: 'Restricts search results to documents written in a particular language or a set of languages. The accepted format for this parameter is lang_{2-letter country code}. For instance, to filter documents written in Japanese, the value should be set to lang_jp. To incorporate multiple languages, a value like lang_it|lang_de restricts the search to documents written in either Italian or German. Google identifies the document language based on the top-level domain (TLD) of the document\'s URL, any language meta tags present, or the language utilized within the document\'s body text.',
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
        displayName: 'Advanced Search Filter (tbs)',
        name: 'tbs',
        type: 'string',
        default: '',
        description: 'Restricts results to URLs based on encoded values. Normally constructed using size, color, image_type, time_period, usage_rights values. For instance, isz:l would return only results that has large image size.',
        routing: {
          request: {
            qs: {
              tbs: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Aspect Ratio (aspect_ratio)',
        name: 'aspect_ratio',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Panoramic', value: 'panoramic' },
          { name: 'Square', value: 'square' },
          { name: 'Tall', value: 'tall' },
          { name: 'Wide', value: 'wide' },
        ],
        default: '',
        description: 'Filters images based on aspect ratio',
        routing: {
          request: {
            qs: {
              aspect_ratio: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Auto-Correction Filter (nfpr)',
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
        displayName: 'Color (color)',
        name: 'color',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Black', value: 'black' },
          { name: 'Black and white', value: 'black_and_white' },
          { name: 'Blue', value: 'blue' },
          { name: 'Brown', value: 'brown' },
          { name: 'Color', value: 'color' },
          { name: 'Gray', value: 'gray' },
          { name: 'Green', value: 'green' },
          { name: 'Orange', value: 'orange' },
          { name: 'Pink', value: 'pink' },
          { name: 'Purple', value: 'purple' },
          { name: 'Red', value: 'red' },
          { name: 'Teal', value: 'teal' },
          { name: 'Transparent', value: 'transparent' },
          { name: 'White', value: 'white' },
          { name: 'Yellow', value: 'yellow' },
        ],
        default: '',
        description: 'Controls the color of your search results',
        routing: {
          request: {
            qs: {
              color: '={{$value}}',
            },
          },
        },
      },
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
        displayName: 'Image Type (image_type)',
        name: 'image_type',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Clipart', value: 'clipart' },
          { name: 'Face', value: 'face' },
          { name: 'Gif', value: 'gif' },
          { name: 'Line drawing', value: 'line_drawing' },
          { name: 'Photo', value: 'photo' },
        ],
        default: '',
        description: 'Controls the type of your search results',
        routing: {
          request: {
            qs: {
              image_type: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Safe Search (safe)',
        name: 'safe',
        type: 'options',
        options: [
          { name: 'Blur explicit images', value: 'blur' },
          { name: 'Disable SafeSearch', value: 'off' },
          { name: 'Enable strict SafeSearch', value: 'active' },
        ],
        default: 'blur',
        description: 'Toggles the SafeSearch feature for the results. SafeSearch operates by filtering out adult content from your search results. Google\'s filters use proprietary technology to check keywords, phrases and URLs. While no filters are 100 percent accurate, SafeSearch will remove the overwhelming majority of adult content from your search results.',
        routing: {
          request: {
            qs: {
              safe: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Size (size)',
        name: 'size',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Icon', value: 'icon' },
          { name: 'Large', value: 'large' },
          { name: 'Larger than 1024x768', value: 'larger_than_1024x768' },
          { name: 'Larger than 12mp', value: 'larger_than_12mp' },
          { name: 'Larger than 15mp', value: 'larger_than_15mp' },
          { name: 'Larger than 20mp', value: 'larger_than_20mp' },
          { name: 'Larger than 2mp', value: 'larger_than_2mp' },
          { name: 'Larger than 400x300', value: 'larger_than_400x300' },
          { name: 'Larger than 40mp', value: 'larger_than_40mp' },
          { name: 'Larger than 4mp', value: 'larger_than_4mp' },
          { name: 'Larger than 640x480', value: 'larger_than_640x480' },
          { name: 'Larger than 6mp', value: 'larger_than_6mp' },
          { name: 'Larger than 70mp', value: 'larger_than_70mp' },
          { name: 'Larger than 800x600', value: 'larger_than_800x600' },
          { name: 'Larger than 8mp', value: 'larger_than_8mp' },
          { name: 'Medium', value: 'medium' },
        ],
        default: '',
        description: 'Controls the size of your search results',
        routing: {
          request: {
            qs: {
              size: '={{$value}}',
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
        description: 'Restricts results to URLs based on date',
        routing: {
          request: {
            qs: {
              time_period: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Usage Rights (usage_rights)',
        name: 'usage_rights',
        type: 'options',
        options: [
          { name: 'Any', value: '' },
          { name: 'Commercial or other licenses', value: 'commercial_or_other_licenses' },
          { name: 'Creative commons licenses', value: 'creative_commons_licenses' },
        ],
        default: '',
        description: 'Controls the usage rights of your search results',
        routing: {
          request: {
            qs: {
              usage_rights: '={{$value}}',
            },
          },
        },
      }
    ],
    displayOptions,
  },
  {
    displayName: 'Page Number (page)',
    name: 'page',
    type: 'number',
    typeOptions: {
      minValue: 1,
      numberPrecision: 0,
    },
    default: 1,
    description: 'Indicates which page of results to return. By default, it is set to 1.',
    displayOptions,
    routing: {
      request: {
        qs: {
          page: '={{$value}}',
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

export const google_images = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-images',
};
