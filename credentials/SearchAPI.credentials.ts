import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SearchAPI implements ICredentialType {
	name = 'searchApi';
	displayName = 'SearchAPI';
	
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://www.searchapi.io/docs/google';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
            required: true,
		},
	];
	authenticate = {
		type: 'generic',
        properties: {
			qs: { api_key: '={{ $credentials.apiKey }}' },
            headers: {
                "X-SearchApi-Source": "N8N"
            }
        }
	} as IAuthenticateGeneric;
}