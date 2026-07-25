![SearchApi Banner](searchapi-banner.png)


# n8n-nodes-searchapi

SearchApi is a fast, reliable SERP and data extraction API that focuses on performance, parsing quality, and competitive pricing. We offer realtime structured data from many different sources like Google, Bing, Amazon and others...

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Usage](#usage)
- [Use with n8n AI Agents](#use-with-n8n-ai-agents)
- [Resources](#resources)
- [Version history](#version-history)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## Installation

**Recommended:** install from inside n8n.

1. Open **Settings → Community nodes** (or search for nodes in the editor).
2. Search for **SearchApi**.
3. Click **Install**.

You can also follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Package name: `@searchapi/n8n-nodes-searchapi`

## Operations

The node supports one main operation: `Search`. You can use it to search from all of the supported engines.

## Credentials

1. Sign up at **[SearchApi.io](https://www.searchapi.io/)** and copy your **API Key**.
2. In n8n go to **Credentials → + New Credential → SearchApi**.
3. Paste the key and save.\
   The new credential will now appear in the node’s **Credential** dropdown.

## Usage

### Credentials

1. Go to **Credentials → + New Credential → SearchApi**.
2. Paste the **API Key**.
3. Click **Save**.

![Credentials](images/credentials.png)

### Search

1. Create a SearchApi credential in n8n.
2. Go to the **SearchApi** node and select your **Credential**.
3. Select the **Engine** you want to use.
4. Enter the parameters for the engine. After selection, you will see the parameters for the engine. There are also optional parameters that you can use to further refine your search.
5. Click **Execute** to receive the response as JSON.

![Usage](images/steps.png)

## Use with n8n AI Agents

The SearchApi node is marked `usableAsTool: true`, so n8n can expose it as a tool for AI Agents.

### Quick pattern

1. Add an **AI Agent** node to your workflow.
2. Connect **SearchApi** as a tool (not only on the main path).
3. Select engine `google` (or another supported engine).
4. Leave the query field dynamic so the agent can fill it at runtime.
5. Ask the agent a question that needs fresh web data.

Example prompt for the agent:

> Search the live web for recent information about {{topic}} and summarize the top results with source titles and links.

### Example workflow

Import the sample workflow in [`examples/ai-agent-google-search.workflow.json`](examples/ai-agent-google-search.workflow.json):

1. In n8n: **Workflows → Import from File**.
2. Select `examples/ai-agent-google-search.workflow.json`.
3. Attach your **SearchApi** credential and an LLM credential.
4. Run the workflow with a chat/input message.

This gives agents grounded, up-to-date search results instead of relying only on model training data.

## Resources

- **SearchApi.io documentation** – [https://www.searchapi.io/](https://www.searchapi.io/docs/google)
- **n8n Community Nodes Documentation** – [https://docs.n8n.io/integrations/#community-nodes](https://docs.n8n.io/integrations/#community-nodes)
- **n8n Community Forum** – [https://community.n8n.io](https://community.n8n.io)

## Troubleshooting

| Error message | Likely cause | Fix |
| --- | --- | --- |
| **401 Unauthorized** | Invalid or missing API key | Double-check the credentials. |
| **429 Too Many Requests** | Rate limit exceeded | Slow down the workflow or [upgrade plan](https://www.searchapi.io/pricing). |
| **Error loading package / tar ... No such file or directory** | Install failed for the scoped npm package | Prefer installing via n8n’s Community Nodes UI (search “SearchApi”). If installing manually, use the full package name `@searchapi/n8n-nodes-searchapi` and retry after clearing n8n community-node cache. |
| **Node not available as AI tool** | Community tool usage disabled | On self-hosted n8n, ensure community nodes can be used as tools (see n8n docs for community package tool usage). Re-install/reload the node after enabling. |

## Version history

You can see the version history [here](https://github.com/SearchApi/n8n-nodes-searchapi/releases).

## Development

1. Run `npm install` to install the dependencies
2. Run `npm run dev` to start n8n with the node in development mode
3. Open http://localhost:5678 to access n8n with the node loaded
4. Make changes to the source files - the node rebuilds automatically on file changes

Other useful commands:

- `npm run build` - compile TypeScript for production
- `npm run lint` - run ESLint code quality checks
- `npm run lint:fix` - auto-fix linting issues
- `npm run release` - bump version, update changelog, and publish to npm

You will be able to see the node in the local n8n http://localhost:5678.

Obs: You might need to run `rm -rf ~/.n8n-node-cli`, to clear the cache of old n8n instances you might have installed, it might make the cli to timeout.
