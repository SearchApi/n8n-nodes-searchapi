import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export function nextPageToken(description: string): INodeProperties {
  return {
    displayName: 'Next Page Token (next_page_token)',
    name: 'next_page_token',
    type: 'string',
    typeOptions: {
      password: true,
    },
    default: '',
    description,
    routing: {
      request: {
        qs: {
          next_page_token: '={{$value}}',
        },
      },
    },
  };
}

export function uule(description: string): INodeProperties {
  return {
    displayName: 'Encoded Location (uule)',
    name: 'uule',
    type: 'string',
    default: '',
    description,
    routing: {
      request: {
        qs: {
          uule: '={{$value}}',
        },
      },
    },
  };
}

export function pageParam(
  description: string,
  extra: { maxValue?: number; displayOptions?: IDisplayOptions } = {},
): INodeProperties {
  return {
    displayName: 'Page Number (page)',
    name: 'page',
    type: 'number',
    typeOptions: {
      minValue: 1,
      ...(extra.maxValue === undefined ? {} : { maxValue: extra.maxValue }),
      numberPrecision: 0,
    },
    default: 1,
    description,
    ...(extra.displayOptions === undefined ? {} : { displayOptions: extra.displayOptions }),
    routing: {
      request: {
        qs: {
          page: '={{$value}}',
        },
      },
    },
  };
}

export function numParam(
  description: string,
  extra: { displayName?: string; maxValue?: number; defaultValue?: number; displayOptions?: IDisplayOptions } = {},
): INodeProperties {
  return {
    displayName: extra.displayName ?? 'Results Per Page (num)',
    name: 'num',
    type: 'number',
    typeOptions: {
      minValue: 1,
      ...(extra.maxValue === undefined ? {} : { maxValue: extra.maxValue }),
      numberPrecision: 0,
    },
    default: extra.defaultValue ?? 10,
    description,
    ...(extra.displayOptions === undefined ? {} : { displayOptions: extra.displayOptions }),
    routing: {
      request: {
        qs: {
          num: '={{$value}}',
        },
      },
    },
  };
}

export function zeroDataRetention(displayOptions: IDisplayOptions): INodeProperties {
  return {
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
      },
    ],
    displayOptions,
  };
}
