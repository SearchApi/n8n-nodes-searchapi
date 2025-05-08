## 🎥 Summarize YouTube Videos using SearchApi & LLM

### Who is this for?

This workflow is ideal for **content creators**, **students**, **digital marketers**, **educators**, and **researchers** who want to quickly summarize YouTube videos.

### What problem does this workflow solve?

Manually extracting important information from lengthy YouTube videos can be tedious and prone to errors. This workflow streamlines the process by automatically fetching video transcripts using [SearchApi.io](https://www.searchapi.io/) and producing concise, informative summaries through a summarization chain powered by any LLM provider. This allows users to quickly access crucial information without the need for manual transcription or detailed viewing.

### What this workflow does

* Fetches the complete transcript of a YouTube video using SearchApi.
* Combines the retrieved transcript into a single, continuous text.
* Utilizes a **Summarization Chain** with an LLM (e.g., OpenRouter models) to create a concise summary of the video content.

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

### How to customize this workflow to meet your needs

* Adjust the summarization model or modify text-splitter parameters to accommodate different lengths and complexities of video transcripts.
* Integrate additional nodes to export summaries directly into your preferred tools, such as Google Drive, Slack, or email.
* Customize prompt templates in the summarization chain to obtain various summary styles (bullet points, paragraphs, etc.).
* Modify the trigger to suit your workflow.

### Example Usage

1. **Input**: YouTube video ID (`wBuULAoJxok`).
2. **Output**: A concise, actionable summary that highlights key ideas, recommendations, and insights from the video.