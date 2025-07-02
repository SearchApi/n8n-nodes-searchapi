import { INodeProperties } from "n8n-workflow";

const resource = { name: 'Google', value: 'google' } as { name: 'Google'; value: 'google' };
const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		type: 'string',
		required: true,
		default: '',
		description: 'The query to search for',
		displayOptions: {
			show: {
				resource: ['google'],
			},
		},
		routing: {
			request: {
				qs: {
					q: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Number of Results',
		name: 'num',
		type: 'number',
		default: null,
		description: 'The number of results to return',
		displayOptions: {
			show: {
				resource: ['google'],
			},
		},
		routing: {
			request: {
				qs: {
					num: '={{$value}}',
				},
			},
		},
	},
];

export const google = {
	resource,
	properties,
};
