import { spawn } from 'node:child_process';

const child = spawn('n8n-node', ['dev'], {
	stdio: 'inherit',
	shell: process.platform === 'win32',
	env: {
		...process.env,
		N8N_SECURE_COOKIE: 'false',
		N8N_PERSONALIZATION_ENABLED: 'false',
		N8N_INSTANCE_OWNER_MANAGED_BY_ENV: 'true',
		N8N_INSTANCE_OWNER_EMAIL: 'dev@searchapi.io',
		N8N_INSTANCE_OWNER_FIRST_NAME: 'Dev',
		N8N_INSTANCE_OWNER_LAST_NAME: 'User',
		N8N_INSTANCE_OWNER_PASSWORD_HASH: '$2a$10$9Bp1E/DpL1NChkwRFhsPdeAltAZEUzEkQBumWFlD8VECesEwcRCua',
	},
});

child.on('exit', (code) => process.exit(code ?? 0));
