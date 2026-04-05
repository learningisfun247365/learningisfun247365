# Learning Strategy Consultant

An AI-powered chat app that asks 5 intake questions and generates a personalized learning plan. Built with Vanilla JS, Express, and Claude Sonnet 4.6.

## Setup

1. **Install dependencies**
   ```bash
   cd learning-strategy-consultant
   npm install
   ```

2. **Add your API key**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace `your_api_key_here` with your [Anthropic API key](https://console.anthropic.com/).

3. **Start the server**
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## How it works

- The Express server proxies requests to Claude's API, keeping your API key out of the browser
- The frontend manages conversation history and renders Claude's markdown responses
- Claude asks one intake question at a time, then generates a structured learning plan

## Architecture

```
Browser → POST /api/chat → Express proxy → Claude API
```
