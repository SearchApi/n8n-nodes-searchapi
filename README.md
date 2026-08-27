![SearchApi Banner](searchapi-banner.png)

# n8n-nodes-searchapi

SearchApi is a fast, reliable SERP and data extraction API that focuses on performance, parsing quality, and competitive pricing. We offer realtime structured data from many different sources like Google, Bing, Amazon and others...

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Usage](#usage)
- [Resources](#resources)
- [Version history](#version-history)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The node supports one main operation: `Search`. You can use it to search from all of the supported engines.

## Credentials

1. Sign up at **[SearchApi.io](https://www.searchapi.io/)** and copy your **API Key**.
2. In n8n go to **Credentials → + New Credential → SearchApi**.
3. Paste the key and save.\
   The new credential will now appear in the node’s **Credential** dropdown.

![Credentials](images/credentials.png)

## Usage

1. Go to the **SearchApi** node and select your **Credential**.
2. Select the **Engine** you want to use.
3. Enter the parameters for the engine. After selection, you will see the parameters for the engine. There are also optional parameters that you can use to further refine your search.
4. Click **Execute** to receive the response as JSON.

![Usage](images/steps.png)

## Resources

- **SearchApi.io documentation**: [https://www.searchapi.io/docs/google](https://www.searchapi.io/docs/google)
- **n8n Community Nodes Documentation**: [https://docs.n8n.io/integrations/#community-nodes](https://docs.n8n.io/integrations/#community-nodes)
- **n8n Community Forum**: [https://community.n8n.io](https://community.n8n.io)

## Troubleshooting

| Error message                | Likely cause                 | Fix                                                                         |
| ---------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| **401 Unauthorized**         | Invalid or missing API key   | Double‑check the credentials.                                           |
| **429 Too Many Requests**    | Rate limit exceeded          | Slow down the workflow or [upgrade plan](https://www.searchapi.io/pricing). |

## Version history

You can see the version history [here](https://github.com/SearchApi/n8n-nodes-searchapi/releases).

## Development

1. Run `npm install` to install the dependencies
2. Run `npm run dev` to start n8n with the node in development mode
3. Open http://localhost:5678 to access n8n with the node loaded
4. Make changes to the source files and the node rebuilds automatically

Other useful commands:

- `npm run build`: compile TypeScript for production
- `npm run lint`: run ESLint code quality checks
- `npm run lint:fix`: auto-fix linting issues
- `npm test`: build and verify every parameter's query-string routing (runs in CI)
- `npm run check:enums`: validate shared enumerations (runs in CI)
- `npm run generate:labels`: regenerate `nodes/SearchApi/shared/labels.ts`
- `npm run smoke`: run one live request for every engine in the local n8n
- `npm run release`: bump version, update changelog, tag and push; the tag triggers the publish workflow on GitHub Actions

### Shared enumerations

Country, language, currency and locale dropdowns are shared rather than duplicated per engine.
An engine lists only the codes its API accepts and the label comes from one canonical table:

```ts
import { countryOptions } from '../shared/options';

{ name: 'gl', type: 'options', options: countryOptions(['us', 'gb', 'de']) }
```

`nodes/SearchApi/shared/labels.ts` is **generated**, do not hand-edit it. Country, language and
currency labels come from Node's ICU data (`Intl.DisplayNames`), with vendor-specific codes that
ICU cannot resolve listed explicitly in `scripts/overrides.mjs`. Locale labels come from
`searchapi.io`'s `Constants::Duckduckgo::LOCALES`; without that checkout the existing table is
kept as-is. Regenerate with `npm run generate:labels`, overriding the sources if needed:

```sh
RAILS_DUCKDUCKGO_CONSTANTS=../searchapi.io/app/lib/constants/duckduckgo.rb npm run generate:labels
```

`npm run check:enums` fails the build when a code has no canonical label or when an `options`
default is not one of its own values.

If a `searchapi.io` checkout is present it also compares each engine's values against the
matching `public/openapi/<engine>.yaml` enum, case-insensitively. Those divergences are
reported as **warnings**: the specs and the engine files do not agree yet, and neither side is
authoritative for every parameter. Pass `--strict` to fail on them once they are reconciled:

```sh
OPENAPI_DIR=../searchapi.io/public/openapi npm run check:enums -- --strict
```

### Tests

`npm test` checks the compiled node description without making API calls. It verifies that every
engine parameter has exactly one `routing.request.qs` entry, that the query-string key matches the
parameter name, and that the route forwards the parameter value. This exhaustive offline check
runs in CI.

The local smoke test makes live requests for every engine through the n8n instance created by
`npm run dev`. Each engine has a `base` case with the fewest parameters needed for a valid
response, a `full` case sending every parameter it accepts at once, and further cases for
parameters that cannot be combined, where the API rejects the pair or one supersedes the other.
Token-based engines read the identifier they need from an earlier response, and date-based engines
use future dates. Requests run sequentially and retry failures up to three times.

Find the id and name of your local SearchApi credential, then run the smoke:

```sh
sqlite3 $HOME/.n8n-node-cli/.n8n/database.sqlite \
  "select id, name from credentials_entity where type = 'searchApi'"

SEARCHAPI_CREDENTIAL_ID=<local-id> \
SEARCHAPI_CREDENTIAL_NAME='SearchApi account' \
npm run smoke
```

The command prints one line per combination and a final total. A combination passes when the API
echoes its parameters back in `search_parameters` with the values that were sent; a request the API
rejects answers with an error and nothing else. It is report-only: individual engine
failures are visible but do not make the command exit non-zero. Generation, import, execution, or
output-parsing failures still return a non-zero status. Expect roughly three API requests per
engine, plus retries for failed requests.
