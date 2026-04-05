# Learning Strategy Consultant — Design Spec
**Date:** 2026-04-05
**Status:** Approved for implementation

## Idea

A conversational AI tool that acts as a personal learning strategy consultant. The user answers 5 structured intake questions, and the app generates a tailored markdown learning plan. It's a real, usable tool and a learning project for building with the Claude API.

## What Maria Will Learn

- How to proxy Claude API calls through an Express server (keeping API keys out of the browser)
- How to manage multi-turn conversation history in vanilla JS
- How to render markdown dynamically in the browser using marked.js
- The pattern of system prompts as behavioral contracts for AI assistants

## Tech Specs

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Vanilla JS + HTML + CSS | Keeps focus on the AI integration, not framework overhead |
| Backend proxy | Node.js + Express | Minimal setup, hides API key from browser |
| AI | Claude Sonnet 4.6 (`claude-sonnet-4-6`) | Latest capable model |
| Markdown rendering | marked.js (CDN) | Zero build step, renders Claude's plan output |

## Architecture

```
Browser (index.html + app.js + style.css)
    │  POST /api/chat  {messages: [...], system: "..."}
    ▼
Express proxy (server.js)  ← reads ANTHROPIC_API_KEY from .env
    │  POST https://api.anthropic.com/v1/messages
    ▼
Claude Sonnet 4.6
    │  JSON response (non-streaming)
    ▼
app.js renders response via marked.js → chat bubble
```

## Conversation Flow

The consultant asks one question at a time, in order:

1. **Goal** — What do you want to learn? Be specific about the skill or topic.
2. **Current level** — Complete beginner, some exposure, or intermediate?
3. **Timeline** — What's your target timeline? (e.g. "3 months", "by end of year")
4. **Time available** — How many hours per week can you realistically commit?
5. **Learning style** — How do you learn best? (video courses, reading, hands-on projects, structured classes, a mix)

After all 5 answers: generate a structured markdown learning plan with summary, phase-based breakdown, resource recommendations, and 3 concrete first steps.

## Success Criteria

### MVP
- [ ] Claude greets the user and asks the first intake question automatically on page load
- [ ] Each user answer triggers the next question (one at a time)
- [ ] After question 5, Claude generates a formatted markdown learning plan
- [ ] The plan renders with proper markdown (headers, lists, code) in the chat UI
- [ ] Follow-up questions work (conversation history is preserved)

### Stretch
- [ ] Reset button clears the chat and starts fresh
- [ ] Copy plan button copies the generated plan to clipboard

## File Structure

```
learning-strategy-consultant/
  package.json
  .env.example
  server.js
  index.html
  style.css
  app.js
  README.md
```
