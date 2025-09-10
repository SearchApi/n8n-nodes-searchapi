import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { google } from './engines/google';
import { google_images } from './engines/google_images';
import { google_maps } from './engines/google_maps';
import { google_shopping } from './engines/google_shopping';
import { youtube } from './engines/youtube';
import { youtube_transcripts } from './engines/youtube_transcripts';
import { youtube_comments } from './engines/youtube_comments';
import { youtube_channel } from './engines/youtube_channel';
import { youtube_video } from './engines/youtube_video';
import { youtube_channel_videos } from './engines/youtube_channel_videos';


export class SearchApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearchApi',
		name: 'searchApi',
		icon: 'file:searchApi.svg',
		group: ['output'],
		version: 1,
		description:
			'Access real-time search results from Google, Google Images, Google Maps, Google Shopping and more. Use this when you need current, up-to-date information, product searches, location data, or visual content that may not be available in your training data.',
		subtitle: '={{ $parameter["engine"] }}',
		defaults: { name: 'SearchApi' },
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'searchApi', required: true }],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'https://www.searchapi.io/api/v1',
			method: 'GET',
			url: '/search',
			headers: { Accept: 'application/json' },
		},
		hints: [
			{
				message: "Hit SearchAPI's free 100-request quota? Check the Pricing page 📈'",
				type: 'info',
				whenToDisplay: 'beforeExecution',
				location: 'inputPane',
			},
		],
		properties: [
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				description: 'The search engine to use',
				noDataExpression: true,
				options: [
					google.resource,
					google_images.resource,
					google_maps.resource,
					google_shopping.resource,
					youtube.resource,
					youtube_transcripts.resource,
					youtube_comments.resource,
					youtube_channel.resource,
					youtube_video.resource,
					youtube_channel_videos.resource,
				],
				default: google.resource.value,
			},
			{
				displayName: 'Operation Name',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search',
						description: 'Search using the engine specified in the resource',
						routing: {
							request: {
								qs: {
									engine: '={{ $parameter["resource"] }}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			...google.properties,
			...google_images.properties,
			...google_maps.properties,
			...google_shopping.properties,
			...youtube.properties,
			...youtube_transcripts.properties,
			...youtube_comments.properties,
			...youtube_channel.properties,
			...youtube_video.properties,
			...youtube_channel_videos.properties,
		],
	};
}
