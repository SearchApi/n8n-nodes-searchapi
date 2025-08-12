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

	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
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
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
        properties: {
			qs: { api_key: '={{ $credentials.apiKey }}' },
            headers: {
                "X-SearchApi-Source": "N8N"
            }
        }
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.searchapi.io/api/v1/me',
			method: 'GET',
			qs: { api_key: '={{ $credentials.apiKey }}' },
			headers: {
				"X-SearchApi-Source": "N8N"
			}
		}
	}
}
