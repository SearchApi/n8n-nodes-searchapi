![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n SearchApi.io Node

Search the web with [SearchApi.io](https://www.searchapi.io/) directly from your n8n workflows. The node exposes the full power of the `/api/v1/search` endpoint and supports **all engines and query parameters** offered by the service.

> **Why SearchApi.io?**\
> Real‑time SERP data from Google, Bing, DuckDuckGo, Yahoo, Yandex and more – no captchas, no proxies, one simple API.

---

## Installation

### Via the n8n UI (recommended)

1. Open **Settings → Community Nodes** inside your self‑hosted n8n instance.
2. Fill **npm Package Name** with `@searchapi/n8n-nodes-searchapi`.
3. Select the package, accept the risk prompt, and hit **Install**.
4. It should now appear as a node when you search for it.

### Via the command line

```bash
# inside your n8n installation folder
npm install @searchapi/n8n-nodes-searchapi
# or with pnpm
pnpm add @searchapi/n8n-nodes-searchapi
```

Restart n8n after the install finishes.

> **Compatibility**
>
> - n8n ≥ 1.30.0
> - Node.js ≥ 18

---

## Credentials

1. Sign up at **[SearchApi.io](https://www.searchapi.io/)** and copy your **API Key**.
2. In n8n go to **Credentials → + New Credential → SearchApi**.
3. Paste the key and save.\
   The new credential will now appear in the node’s **Credential** dropdown.

---

## Usage

### 1. Drag‑and‑drop UI

1. Add the **SearchApi** node to your workflow.
2. Choose your **Credential** and the **Engine**.
3. Under **Parameters,** click **Add Parameter** for each query string field you need. To determine which fields to add, refer to the engine's documentation. Example:
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

## Example workflows

To easily see how to work with SearchApi on n8n, refer to the examples we've prepared. To use them you can download the json file and import on n8n, or you can paste the url for the, you can also copy the contents and paste inside a workflow. Refer to [n8n docs](https://docs.n8n.io/courses/level-one/chapter-6/#exporting-and-importing-workflows_1) on how to import workflows.

- [Youtube video summarization with SearchApi](/examples/searchapi_youtube_transcripts/)
- [Chatbot that searchs the web with SearchApi](/examples/searchapi_chatbot/)

## Output

The node returns the raw JSON received from SearchApi.io. See the [official docs](https://www.searchapi.io/docs/google) for complete schemas.

---

## Troubleshooting

| Error message                | Likely cause                 | Fix                                                                         |
| ---------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| **401 Unauthorized**         | Invalid or missing API key   | Double‑check the credentials.                                               |
| **400 Bad Request** | Missing required parameter | Verify against SearchApi docs.                                              |
| **429 Too Many Requests**    | Rate limit exceeded          | Slow down the workflow or [upgrade plan](https://www.searchapi.io/pricing). |

---

## Resources

- **SearchApi.io documentation** – [https://www.searchapi.io/](https://www.searchapi.io/docs/google)
- **n8n Community Forum** – [https://community.n8n.io](https://community.n8n.io)
- **Community nodes installation** – [https://docs.n8n.io/integrations/community-nodes/installation/](https://docs.n8n.io/integrations/community-nodes/installation/)

