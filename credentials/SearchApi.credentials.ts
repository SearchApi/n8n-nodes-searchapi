import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SearchApi implements ICredentialType {
	name = 'searchApi';
	displayName = 'SearchApi API';

	documentationUrl = 'https://www.searchapi.io/docs/google';
	icon: Icon = 'file:../nodes/SearchApi/searchApi.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	// Sent as a bearer token rather than an api_key query parameter, so the key
	// does not end up in request URLs, execution data or proxy logs.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{ $credentials.apiKey }}',
				'X-SearchApi-Source': 'N8N',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.searchapi.io/api/v1/me',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{ $credentials.apiKey }}',
				'X-SearchApi-Source': 'N8N',
			},
		},
	};
}
