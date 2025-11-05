import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['google'],
  },
};

const resource: INodePropertyOptions = {
  name: 'Google',
  value: 'google'
};

const properties: INodeProperties[] = [
	{
		displayName: 'Query (q)',
		name: 'q',
		type: 'string',
		default: '',
		description: 'Search terms for Google query. Supports operators and advanced filters like "machine learning models", site:, inurl:, intitle:, AND, OR.',
		routing: {
			request: {
				qs: {
					q: '={{$value}}',
				},
			},
		},
	},
  {
		displayName: 'Knowledge Graph ID (kgmid)',
		name: 'kgmid',
		type: 'string',
		default: '',
		description: 'Knowledge Graph identifier (kgmid) representing entities in Google\'s Knowledge Graph. Location Identifier (/m/) followed by 2-7 characters for locations (e.g., /m/02_286 for New York), or Google Knowledge Graph Identifier (/g/) with longer alphanumeric string for general entities (e.g., /g/11f555cn8l for TikTok). Find identifiers by searching for "Freebase ID" on Wikidata',
		routing: {
			request: {
				qs: {
					kgmid: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Device (device)',
		name: 'device',
		type: 'string',
		default: 'desktop',
		description: 'Device type for search: desktop (default), mobile, or tablet',
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
		displayName: 'Optimization Strategy (optimization_strategy)',
		name: 'optimization_strategy',
		type: 'string',
		default: 'performance',
		description: 'Controls search request optimization. Options: performance (default), ads (optimizes for higher ad collection success rate, may increase processing time).',
		displayOptions,
		routing: {
			request: {
				qs: {
					optimization_strategy: '={{$value}}',
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
      displayName: 'Location (location)',
      name: 'location',
      type: 'string',
      default: '',
      description: 'Canonical location for the search. If multiple locations match, the most popular is selected (e.g., "New York" selects New York, United States).',
      routing: {
        request: {
          qs: {
            location: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Encoded Location (uule)',
      name: 'uule',
      type: 'string',
      default: '',
      description: 'Google-encoded location for the search. Cannot be used with location parameter. Auto-built when using location parameter, but can be manually specified for precise control',
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
      type: 'string',
      default: 'us',
      description: 'Country of the search (default: us)',
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
      type: 'string',
      default: '',
      description: 'Restricts results to documents from a particular country. Determined by top-level domain (TLD) or web server IP geographic location.',
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
      description: 'Google domain for the search (default: google.com)',
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
      type: 'string',
      default: 'en',
      description: 'Interface language for the search (default: en)',
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
      type: 'string',
      default: '',
      description: 'Restricts results to documents in specific languages. Format: lang_{2-letter code} (e.g., lang_jp for Japanese). Multiple languages can be combined with | (e.g., lang_it|lang_de for Italian or German). Language determined by TLD, meta tags, or body text',
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
      displayName: 'Duplicate Filter (filter)',
      name: 'filter',
      type: 'string',
      default: '1',
      description: 'Controls "Duplicate Content" and "Host Crowding" filters. Set to 1 to enable (default), 0 to disable.',
      routing: {
        request: {
          qs: {
            filter: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'No Auto-Correct (nfpr)',
      name: 'nfpr',
      type: 'string',
      default: '0',
      description: 'Controls whether auto-corrected spelling results are included. Set to 1 to exclude, 0 to include (default).',
      routing: {
        request: {
          qs: {
            nfpr: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'SafeSearch (safe)',
      name: 'safe',
      type: 'string',
      default: 'off',
      description: 'Toggles SafeSearch to filter adult content. Set to "active" to enable or "off" to disable (default).',
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
      type: 'string',
      default: '',
      description: 'Restricts results by date. Supported values: last_hour, last_day, last_week, last_month, last_year. For custom ranges, use time_period_min and time_period_max (can be used separately or together)',
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
      description: 'End of time period. Can be used with time_period_min. Format: MM/DD/YYYY',
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
      description: 'Start of time period. Can be used with time_period_max. Format: MM/DD/YYYY',
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
      displayName: 'Results Per Page (num)',
      name: 'num',
      type: 'string',
      default: '10',
      description: 'Number of results per page. Use with page parameter for pagination.',
      routing: {
        request: {
          qs: {
            num: '={{$value}}',
          },
        },
      },
    },
    {
      displayName: 'Page (page)',
      name: 'page',
      type: 'string',
      default: '1',
      description: 'Page number to return (default: 1). Use with num parameter for pagination.',
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
  }
];

export const google = {
  resource,
  properties,
};
