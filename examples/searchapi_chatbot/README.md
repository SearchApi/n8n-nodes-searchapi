## 🤖 AI Agent Web Search using SearchAPI & LLM

### Who is this for?

This workflow is ideal for anyone conducting **online research**, including **students**, **researchers**, **content creators**, and professionals looking for accurate, up-to-date, and verifiable information. It also serves as an excellent foundation for building more sophisticated AI-driven applications.

### What problem does this workflow solve? / Use case

This workflow automates web searches by enabling an AI agent to retrieve and summarize external, verifiable information efficiently, ensuring accuracy through source citations.

### What this workflow does

* Connects an AI agent node to [SearchAPI.io](https://searchapi.io/) as an integrated search tool.
* Empowers the AI agent to perform real-time web searches using various SearchAPI engines (e.g., Google, Bing).
* Allows the AI agent to dynamically determine search parameters based on user interaction, delivering contextually relevant results.
* Ensures responses include clearly cited sources for validation and further exploration.

### Setup

1. **API Configuration**:

   * Set your [SearchAPI.io](https://searchapi.io/) credentials in n8n.
   * Connect your preferred AI provider (e.g., OpenRouter, ChatGPT) to the AI agent node.

2. **Input Requirements**:

   * User inputs queries via chat interaction with the AI agent.

3. **Configure the AI Agent Node**:

   * Select the desired search engines from SearchAPI (e.g., Google, Bing).
   * Define parameters the agent can adjust for refined searches.

### How to customize this workflow to your needs

* Integrate additional nodes to structure or store search results (e.g., saving to databases, Notion, Google Sheets).
* Extend chatbot capabilities to integrate with messaging platforms (Slack, Discord) or email notifications.
* Adjust search parameters and filters within the AI agent node to tailor information retrieval.

### Example Usage

* **Input**: User asks, "What are the latest developments in AI regulation?"
* **Output**: AI retrieves, summarizes, and cites recent, authoritative articles and news sources from the web.
