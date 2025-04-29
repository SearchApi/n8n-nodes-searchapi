![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n SearchAPI.io Node

Search the web with [SearchAPI.io](https://www.searchapi.io/) directly from your n8n workflows. The node exposes the full power of the `/api/v1/search` endpoint and supports **all engines and query parameters** offered by the service.

> **Why SearchAPI.io?**\
> Real‑time SERP data from Google, Bing, DuckDuckGo, Yahoo, Yandex and more – no captchas, no proxies, one simple API.

---

## Installation

### Via the n8n UI (recommended)

1. Open **Settings → Community Nodes** inside your self‑hosted n8n instance.
2. Click **Install → Browse** and search for `n8n-nodes-searchapi`.
3. Select the package, accept the risk prompt, and hit **Install**.

### Via the command line

```bash
# inside your n8n installation folder
npm install n8n-nodes-searchapi
# or with pnpm
pnpm add n8n-nodes-searchapi
```

Restart n8n after the install finishes.

> **Compatibility**
>
> - n8n ≥ 1.30.0
> - Node.js ≥ 18

---

## Credentials

1. Sign up at **[SearchAPI.io](https://www.searchapi.io/)** and copy your **API Key**.
2. In n8n go to **Credentials → + New Credential → SearchAPI**.
3. Paste the key and save.\
   The new credential will now appear in the node’s **Credential** dropdown.

---

## Usage

### 1. Drag‑and‑drop UI

1. Add the **SearchAPI** node to your workflow.
2. Choose your **Credential** and the **Engine**.
3. Under **Parameters,** click **Add Parameter** for each query string field you need. To determine which fields to add, refer to the engine's documentation.
   - **Name**: `q`
   - **Value**: `weather new york`
4. Execute the workflow to receive the response as JSON.

### 2. Pass a parameters object (programmatic)

You can also pass a parameters object directly to the node, instead of the UI:

```json
{
  "parameters": {
    "q": "n8n workflow automation",
    "device": "mobile",
    "location": "Berlin"
  }
}
```

- Feed the object through a **Set** node or any previous node.
  ```
  {{$json.parameters}}
  ```
- The node will give preference to the parameters object.

---

## Example workflow

The sample below searches Google for “n8n community nodes” and extracts the first organic result.



You can import the full `.json` from `/examples/searchapi_google_basic.json` in this repo.

---

## Output

The node returns the raw JSON received from SearchAPI.io. See the [official docs](https://www.searchapi.io/docs/google) for complete schemas.

---

## Troubleshooting

| Error message                | Likely cause                 | Fix                                                                         |
| ---------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| **401 Unauthorized**         | Invalid or missing API key   | Double‑check the credentials.                                               |
| **422 Unprocessable Entity** | Wrong parameter name / value | Verify against SearchAPI docs.                                              |
| **429 Too Many Requests**    | Rate limit exceeded          | Slow down the workflow or [upgrade plan](https://www.searchapi.io/pricing). |

---

## Resources

- **SearchAPI.io documentation** – [https://www.searchapi.io/docs](https://www.searchapi.io/docs)
- **n8n Community Forum** – [https://community.n8n.io](https://community.n8n.io)
- **Community nodes installation** – [https://docs.n8n.io/integrations/community-nodes/installation/](https://docs.n8n.io/integrations/community-nodes/installation/)

