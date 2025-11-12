# How to Run Your AI Agents

> **Note:** This guide covers running agents for the Google Agent SDK course (formerly Kaggle 5-Day Agents Sprint).

## Quick Start Commands

Copy and paste these commands to run Jupyter notebooks in VSCode:

### Day 1: Agent Fundamentals

**Day 1a - From Prompt to Action:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day1/day-1a-from-prompt-to-action.ipynb
```

**Day 1b - Agent Architectures:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day1/day-1b-agent-architectures.ipynb
```

**Day 1 Python Scripts (if you prefer running .py files):**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
python3 day1/day1a_simple_agent.py
# or
python3 day1/day1b_multi_agent.py
```

### Day 2: Tools & Integration

**Day 2a - Agent Tools:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day2/day-2a-agent-tools.ipynb
```

**Day 2b - Tool Best Practices:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day2/day-2b-agent-tools-best-practices.ipynb
```

### Day 3: Stateful Agents & Memory

**Day 3a - Agent Sessions:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day3/day-3a-agent-sessions.ipynb
```

**Day 3b - Agent Memory:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
source venv/bin/activate
code day3/day-3b-agent-memory.ipynb
```

---

## Step-by-Step Breakdown

### 1. Navigate to Project
```bash
cd /Users/mariaweaver/projects/learningisfun247365/google-agent-sdk
```
- **What:** Changes directory to your project folder
- **Why:** You need to be in the right folder to access files and virtual environment

### 2. Activate Virtual Environment
```bash
source venv/bin/activate
```
- **What:** Activates the isolated Python environment for this project
- **Why:** Ensures you're using project-specific packages (google-genai, python-dotenv, etc.)
- **How to tell it worked:** Your terminal prompt shows `(venv)` at the start

### 3. Open or Run Your Code

**For Jupyter Notebooks (.ipynb files):**
```bash
code day1/day-1a-from-prompt-to-action.ipynb
```
- Opens the notebook in VSCode
- Click "Run All" or run cells individually
- Results appear inline in the notebook

**For Python Scripts (.py files):**
```bash
python3 day1/day1a_simple_agent.py
```
- Executes the script in terminal
- Output prints to terminal
- Some scripts generate output files (check `outputs/` folder)

### 4. Exit Virtual Environment (When Done)
```bash
deactivate
```
- **What:** Exits the virtual environment
- **Why:** Returns to normal system Python
- **When:** After you're done working with the project

---

## Common Issues & Fixes

### "Command not found: python3"
**Solution:** Try `python` instead of `python3`

### "No such file or directory: venv"
**Solution:** You're in the wrong folder. Run step 1 again, or recreate the virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install google-genai python-dotenv
```

### "ModuleNotFoundError"
**Solution:** Virtual environment not activated. Run step 2 again.

### "API key not valid" or "Invalid API key"
**Solution:**
1. Check that `.env` file exists in the project root
2. Verify your API key starts with `AIza...` (not `gen-lang-client-...`)
3. Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Jupyter Notebook won't run in VSCode
**Solution:**
1. Install Jupyter extension in VSCode
2. Select the correct kernel (should show `venv` Python interpreter)
3. If kernel not showing, restart VSCode after activating virtual environment

---

## What You're Learning

### Day 1: Fundamentals
- **What are agents?** LLMs + reasoning loops + tools
- **Agent architectures:** ReAct, multi-agent systems
- **Building your first agent** using Google's Agent Development Kit (ADK)
- 📖 [Read your Day 1 notes](day1/day1-notes.md)

### Day 2: Tools & Integration
- **Why tools matter:** LLMs need "eyes and hands" to perceive and act
- **Custom function tools:** Write Python functions as agent tools
- **Agent orchestration:** Use one agent as a tool inside another
- **MCP (Model Context Protocol):** Standardized tool integrations
- 📖 [Read your Day 2 notes](day2/day2-notes.md)

### Day 3: State & Memory
- **Context engineering:** Managing what information the LLM has access to
- **Sessions:** Collections of related agent interactions (like a project folder)
- **State vs Events:** Memory (state) vs actions taken (events)
- **Persistent memory:** Using SQLite3 for DatabaseSessionService
- 📖 [Read your Day 3 notes](day3/day3-notes.md)

---

## Project Structure

```
google-agent-sdk/
├── .env                           # API key (DO NOT commit to git)
├── .gitignore                     # Files git should ignore
├── venv/                          # Virtual environment (shared across all days)
├── assets/                        # Screenshots and images for notes
├── HOW-TO-RUN.md                 # This file
│
├── day1/                          # Agent fundamentals
│   ├── day-1a-from-prompt-to-action.ipynb
│   ├── day-1b-agent-architectures.ipynb
│   ├── day1a_simple_agent.py     # Python version of 1a
│   ├── day1b_multi_agent.py      # Python version of 1b
│   └── day1-notes.md             # Your learning notes
│
├── day2/                          # Tools & integration
│   ├── day-2a-agent-tools.ipynb
│   ├── day-2b-agent-tools-best-practices.ipynb
│   ├── test_imports.py           # Test script for dependencies
│   └── day2-notes.md             # Your learning notes
│
├── day3/                          # Stateful agents & memory
│   ├── day-3a-agent-sessions.ipynb
│   ├── day-3b-agent-memory.ipynb
│   ├── day3-notes.md             # Your learning notes
│   └── outputs/                  # (if generated)
│
├── day4/                          # Production agents (coming soon)
├── day5/                          # Advanced patterns (coming soon)
│
├── README.md                      # Project overview
├── meta-reflections.md           # Cross-cutting insights
└── llm-fundamentals-notes.md     # Foundation concepts
```

---

## File Reference Guide

| File Type | Purpose | Edit? | Notes |
|-----------|---------|-------|-------|
| `.ipynb` | Jupyter notebooks from course | ✅ Yes - run and experiment | Main learning materials |
| `*-notes.md` | Your learning notes | ✅ Yes - document insights | Your knowledge base |
| `.py` scripts | Runnable Python versions | ✅ Yes - customize | Alternative to notebooks |
| `outputs/` | Generated files | 📖 Read only | Created by running scripts |
| `.env` | API key storage | ⚠️ Only if key changes | Never commit this! |
| `venv/` | Python packages | ❌ No | Managed by pip |
| `assets/` | Screenshots & images | ✅ Yes | Reference in markdown with `![](../assets/image.png)` |

---

## Key Concepts Refresher

### Virtual Environment
**Think of it like this:**
- Your computer = Entire house
- Virtual environment = One room with its own furniture
- Each project gets its own "room" so dependencies don't conflict

### Session Management (Day 3 concept)
- **Session** = A folder holding all notes/docs for a project
- **State** = The running memory (like ongoing project notes)
- **Events** = Individual actions taken (like tasks completed)

### Tools (Day 2 concept)
- **What:** Functions that give LLMs capabilities beyond text generation
- **Why:** LLMs need "eyes and hands" to perceive and act in the world
- **Types:** Built-in tools, custom Python functions, MCP integrations, agent tools

---

## Additional Resources

- **Course:** [Google Agent SDK Learning Path](https://www.kaggle.com/learn-guide/5-day-agents)
- **API Keys:** [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Your Terminal Guide:** [terminal-basics.md](../../_reference/terminal-stuff/terminal-basics.md)
- **Your Git Guide:** [git-basics.md](../../_reference/terminal-stuff/git-basics.md)
- **Markdown Reference:** [markdown-reference.md](../../_reference/terminal-stuff/markdown-reference.md)

---

## Next Steps

1. **If starting fresh:** Begin with Day 1a notebook
2. **If continuing:** Pick up where you left off using the quick start commands above
3. **After each day:** Document your learnings in the corresponding `dayX-notes.md` file
4. **When stuck:** Check Common Issues section above, or review your notes
5. **To experiment:** Create copies of notebooks or scripts and modify them
