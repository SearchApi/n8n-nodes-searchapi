import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['youtube_transcripts'],
	},
};

const resource: INodePropertyOptions = { 
	name: 'YouTube Transcripts', 
	value: 'youtube_transcripts' 
};

const properties: INodeProperties[] = [
	{
		displayName: 'Video ID',
		name: 'video_id',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube video ID or URL. Accepts direct video IDs, watch URLs, or share links.',
		options: [],
		displayOptions,
		routing: {
			request: {
				qs: {
					video_id: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Transcript Options',
		name: 'transcriptOptions',
		type: 'collection',
		placeholder: 'Add Transcript Option',
		default: {},
		options: [
			{
				displayName: 'Language',
				name: 'lang',
				type: 'string',
				default: 'en',
				description: 'Language code for the transcript',
				options: [],
				routing: {
					request: {
						qs: {
							lang: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Transcript Type',
				name: 'transcript_type',
				type: 'options',
				default: 'auto',
				description: 'Type of transcript to retrieve',
				options: [
					{ name: 'Auto', value: 'auto' },
					{ name: 'Manual', value: 'manual' },
				],
				routing: {
					request: {
						qs: {
							transcript_type: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions,
	},
];

export const youtube_transcripts = {
	resource,
	properties,
};