## 🤖 AI Agent Web Search using SearchApi & LLM

### Who is this for?

This workflow is ideal for anyone conducting **online research**, including **students**, **researchers**, **content creators**, and professionals looking for accurate, up-to-date, and verifiable information. It also serves as an excellent foundation for building more sophisticated AI-driven applications.

### What problem does this workflow solve? / Use case

This workflow automates web searches by enabling an AI agent to retrieve and summarize external, verifiable information efficiently, ensuring accuracy through source citations.

### What this workflow does

* Connects an AI agent node to [SearchApi.io](https://www.searchapi.io/) as an integrated search tool.
* Empowers the AI agent to perform real-time web searches using various SearchApi engines (e.g., Google, Bing).
* Allows the AI agent to dynamically determine search parameters based on user interaction, delivering contextually relevant results.
* Ensures responses include clearly cited sources for validation and further exploration.

### Setup

1. **Install the [SearchApi community node](https://www.npmjs.com/package/@searchapi/n8n-nodes-searchapi)**:
   * Open **Settings → Community Nodes** inside your self‑hosted n8n instance.
   * Fill **npm Package Name** with `@searchapi/n8n-nodes-searchapi`.
   * Accept the risk prompt, and hit **Install**.
   * It should now appear as a node when you search for it.

2. **API Configuration**:
   * Set up your [SearchApi.io](https://www.searchapi.io/) credentials in n8n.
   * Add your preferred LLM provider credentials (e.g., OpenRouter API).

3. **Input Requirements**:
   * Provide the YouTube video ID (e.g., `wBuULAoJxok`).

4. **Connect LLM Integration**:
   * Configure the summarization chain with your chosen model and parameters for text splitting.

### How to customize this workflow to your needs

* Integrate additional nodes to structure or store search results (e.g., saving to databases, Notion, Google Sheets).
* Extend chatbot capabilities to integrate with messaging platforms (Slack, Discord) or email notifications.
* Adjust search parameters and filters within the AI agent node to tailor information retrieval.

### Example Usage

* **Input**: User asks, "What are the latest developments in AI regulation?"
* **Output**: AI retrieves, summarizes, and cites recent, authoritative articles and news sources from the web.
