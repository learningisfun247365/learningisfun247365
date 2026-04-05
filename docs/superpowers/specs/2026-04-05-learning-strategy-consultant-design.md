# Learning Strategy Consultant — Design Spec

**Date:** 2026-04-05  
**Status:** Approved, ready for implementation  
**Location:** `~/building/learningisfun247365/learning-consultant/`

---

## What It Is

A web app that holds a focused conversation with you about what you actually do — your tasks, your role, your work — and interrogates what that means for how you need to learn in the AI era. Claude asks questions, pushes on assumptions, and draws on current research via web search. When you're done, it produces a structured learning plan.

Personal tool for Maria. Python backend, single HTML page frontend.

---

## Goals

1. Interrogate what you actually do and what you need to learn in the AI era
2. Demonstrate Claude API sophistication: multi-turn conversation, streaming, server-side tool use, structured output
3. Learn how a Python backend talks to a frontend (FastAPI + HTML/JS)
4. Produce a shareable artifact (markdown strategy doc saved to Obsidian vault)

---

## Architecture

**Stack:**
- Python 3.x + FastAPI (backend + API routes)
- Single `index.html` page with vanilla JS (no build tools, no framework)
- `anthropic` SDK

**Key API features used:**
- `web_search_20260209` server-side tool (Anthropic-hosted, no extra API key needed)
- Streaming via Server-Sent Events (SSE) — tokens stream from Claude → FastAPI → browser in real time
- Multi-turn conversation via growing `messages` array held server-side per session
- Structured output (`output_config: {format: json_schema}`) for final summary
- `claude-opus-4-6` with adaptive thinking

**Why SSE for streaming:** The browser can receive a stream of tokens over a single HTTP connection without websockets. FastAPI supports this natively. The frontend listens and appends tokens to the chat as they arrive — giving the live conversational feel.

---

## Data Flow

### Backend (FastAPI)

```
POST /chat         — user sends a message; returns streaming SSE response
POST /done         — triggers structured summary; returns JSON
GET  /             — serves index.html
```

**Session state** (server-side, in-memory for v1):
```python
system_prompt   # consultant persona + L&D framing
messages = []   # grows each turn, held in memory
tools = [{"type": "web_search_20260209", "name": "web_search"}]
```

### Conversation loop (one turn)

1. Frontend sends user message to `POST /chat`
2. Backend appends `{"role": "user", "content": "..."}` to messages
3. Streams request to Claude (system + messages + tools)
4. As tokens arrive, backend forwards them as SSE events to the browser
5. When a `server_tool_use` block appears in the stream, emit a `searching` SSE event (browser shows 🔍 indicator)
6. Append **full** `response.content` to messages (not just text — preserves search blocks for next turn)
7. Browser displays the complete response; input re-enables

### /done — structured wrap-up

1. Frontend calls `POST /done`
2. Backend sends final request with `output_config: {format: json_schema}`
3. Schema:
   ```json
   {
     "what_is_shifting": "string — what's actually changing in your domain due to AI",
     "your_actual_tasks": ["array — the real work you described"],
     "human_learning_imperatives": ["array — what you still need to learn as a human"],
     "strategy": "string — the core strategic framing",
     "next_moves": ["array — concrete actions to start learning"]
   }
   ```
4. Save as markdown → `~/obsidian-vault/03 Fleeting/learning-strategy-YYYY-MM-DD.md`
5. Return confirmation + the strategy JSON to frontend for display

---

## Frontend (index.html)

Single page, no framework:
- Chat UI: message thread, input box, send button
- 🔍 indicator when Claude is searching
- "Wrap up" button that calls `/done` and shows the strategy summary
- Minimal styling — readable, not polished

---

## System Prompt Design

The system prompt encodes:
- Consultant persona — not a chatbot, has opinions, interrogates assumptions, asks "why" not "what"
- Focus on actual tasks — starts by understanding what you concretely do, not what your title says
- L&D expertise — knows what changes when the conditions for learning shift
- AI era framing — what's actually different now, not generic "AI is changing everything"
- Search guidance — look for recent developments in user's described domain + AI's impact on that work

The system prompt is where Maria's L&D expertise lives. It's the "API forward" layer.

---

## Open Design Question

**Does Claude need more explicit search direction?**  
System prompt will guide it generally. Whether that's enough or whether users need to specify topics is empirical — find out by running it.

---

## Error Handling

- API call fails: surface error message in chat UI, re-enable input
- `/done` produces malformed JSON: display raw text instead of structured summary
- No retry logic needed for a personal tool

---

## File Structure

```
learningisfun247365/
  learning-consultant/
    main.py            — FastAPI app, routes, conversation logic
    system_prompt.py   — system prompt text (separate for easy iteration)
    static/
      index.html       — single page UI (HTML + CSS + JS inline)
    README.md          — how to run it
    requirements.txt   — anthropic, fastapi, uvicorn
```

---

## How to Run

```bash
cd learning-consultant
pip install -r requirements.txt
uvicorn main:app --reload
# open http://localhost:8000
```

---

## Testing

Have a real conversation. Success criteria:
- Web search results feel relevant to what you described
- Claude's questions make you think about your actual work, not just confirm what you already know
- The wrap-up summary is something you'd use or share

---

## Out of Scope (v1)

- React or any JS framework
- User accounts or multi-session persistence
- Saving conversation history beyond the markdown summary
- Deployment (runs locally only)
- Option B/C agent projects (logged in agent-project-ideas/README.md)
