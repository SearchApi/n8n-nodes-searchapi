## 🎥 Summarize YouTube Videos using SearchAPI & LLM

### Who is this for?

This workflow is perfect for **content creators**, **students**, **digital marketers**, **educators**, and **researchers** who want to quickly summarize YouTube videos.

### What problem does this workflow solve? / Use case

Manually extracting important information from lengthy YouTube videos can be tedious and error-prone. This workflow streamlines the process by automatically fetching video transcripts using [SearchAPI.io](https://searchapi.io/) and producing concise, informative summaries through a summarization chain powered by any LLM provider. This allows users to rapidly access crucial information without manual transcription or detailed watching.

### What this workflow does

* Fetches the complete transcript of a YouTube video using SearchAPI.
* Combines the retrieved transcript into a single, continuous text.
* Uses a **Summarization Chain** with an LLM (e.g., OpenRouter models) to create a concise summary of the video content.

### Setup

1. **API Configuration**:

   * Set up your [SearchAPI.io](https://searchapi.io/) credentials in n8n.
   * Add your preferred LLM provider credentials (e.g., OpenRouter API).

2. **Input Requirements**:

   * Provide the YouTube video ID (e.g., `wBuULAoJxok`).

3. **Connect LLM Integration**:

   * Configure the summarization chain with your chosen model and parameters for text splitting.

### How to customize this workflow to your needs

* Adjust the summarization model or modify text-splitter parameters to handle different lengths and complexities of video transcripts.
* Integrate additional nodes to export summaries directly into your tools of choice, such as Google Drive, Slack, or email.
* Customize prompt templates in the summarization chain to obtain different summary styles (bullet points, paragraphs, etc.).
* Modify the trigger to what works best for you.

### Example Usage

1. **Input**: YouTube video ID (`wBuULAoJxok`).
2. **Output**: A concise, actionable summary highlighting key ideas, recommendations, and insights from the video.
