import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { countryOptions, languageOptions } from '../shared/options';

const displayOptions = {
  show: {
    resource: ['google_maps_directions'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google Maps Directions',
  value: 'google_maps_directions'
};

const properties: INodeProperties[] = [
  {
    displayName: 'From (from)',
    name: 'from',
    type: 'string',
    required: true,
    default: '',
    description: 'Origin of the route. Can be a plain address, data ID, or coordinates (lat,long).',
    displayOptions,
    routing: {
      request: {
        qs: {
          from: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'To (to)',
    name: 'to',
    type: 'string',
    required: true,
    default: '',
    description: 'Destination of the route. Can be a plain address, data ID, or coordinates (lat,long).',
    displayOptions,
    routing: {
      request: {
        qs: {
          to: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Search Query',
    name: 'search_query',
    type: 'collection',
    placeholder: 'Add Search Query',
    default: {},
    options: [
      {
        displayName: 'Avoid (avoid)',
        name: 'avoid',
        type: 'multiOptions',
        options: [
          { name: 'Ferries', value: 'ferries' },
          { name: 'Highways', value: 'highways' },
          { name: 'Tolls', value: 'tolls' },
        ],
        default: [],
        description: 'What to avoid when calculating routes. Tolls and highways apply to driving and best only, ferries to walking and cycling only.',
        routing: {
          request: {
            qs: {
              avoid: '={{ $value.length ? JSON.stringify($value) : \'\' }}',
            },
          },
        },
      },
      {
        displayName: 'Distance Units (distance_units)',
        name: 'distance_units',
        type: 'options',
        options: [
          { name: 'Automatic', value: 'automatic' },
          { name: 'km', value: 'km' },
          { name: 'mi', value: 'mi' },
        ],
        default: 'automatic',
        description: 'Unit of distance measurements in the response. Options: automatic (Default), km (Kilometers), mi (Miles). Not supported when travel_mode is flying or transit.',
        routing: {
          request: {
            qs: {
              distance_units: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Prefer (prefer)',
        name: 'prefer',
        type: 'multiOptions',
        options: [
          { name: 'Bus', value: 'bus' },
          { name: 'Subway', value: 'subway' },
          { name: 'Train', value: 'train' },
          { name: 'Tram and light rail', value: 'tram_and_light_rail' },
        ],
        default: [],
        description: 'Preferred transit types. Only supported when travel_mode is transit.',
        routing: {
          request: {
            qs: {
              prefer: '={{ $value.length ? JSON.stringify($value) : \'\' }}',
            },
          },
        },
      },
      {
        displayName: 'Route (route)',
        name: 'route',
        type: 'options',
        options: [
          { name: 'Best', value: 'best' },
          { name: 'Fewer transfers', value: 'fewer_transfers' },
          { name: 'Less walking', value: 'less_walking' },
          { name: 'Wheelchair accessible', value: 'wheelchair_accessible' },
        ],
        default: 'best',
        description: 'Route preference for transit directions. Options: best (Default), fewer_transfers, less_walking, wheelchair_accessible. Only supported when travel_mode is transit.',
        routing: {
          request: {
            qs: {
              route: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Time (time)',
        name: 'time',
        type: 'string',
        default: '',
        description: 'Departure or arrival time for the route. Formats: depart_at:&lt;timestamp&gt; (Unix timestamp), arrive_by:&lt;timestamp&gt; (Unix timestamp), or last_available (transit only). Cannot be used together with the waypoints parameter.',
        routing: {
          request: {
            qs: {
              time: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Travel Mode (travel_mode)',
        name: 'travel_mode',
        type: 'options',
        options: [
          { name: 'Best', value: 'best' },
          { name: 'Cycling', value: 'cycling' },
          { name: 'Driving', value: 'driving' },
          { name: 'Flying', value: 'flying' },
          { name: 'Transit', value: 'transit' },
          { name: 'Walking', value: 'walking' },
        ],
        default: 'best',
        description: 'Mode of travel. Options: best (Default), driving, cycling, walking, transit (not supported when waypoints is present), flying.',
        routing: {
          request: {
            qs: {
              travel_mode: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Waypoints (waypoints)',
        name: 'waypoints',
        type: 'string',
        default: '',
        description: 'Waypoints of the route, as a JSON array of strings: plain addresses, data IDs or coordinates, for example ["Buckingham Palace, London"]. Maximum 8 elements. Not supported when travel_mode is transit. Cannot be used together with the time parameter.',
        routing: {
          request: {
            qs: {
              waypoints: '={{$value}}',
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
        description: 'Country to use for the search. Check the full list of supported Google gl countries.',
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
        description: 'Interface language of the search. Check the full list of supported Google hl languages.',
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

export const google_maps_directions = {
  resource,
  properties,
  docsUrl: 'https://www.searchapi.io/docs/google-maps-directions-api',
};
