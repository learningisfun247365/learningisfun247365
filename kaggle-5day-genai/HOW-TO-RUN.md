# How to Run Your AI Agent

## Quick Start (Copy & Paste This)

**Day 1a - Simple Agent (Roxie):**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai
source venv/bin/activate
python3 day1/day1a_simple_agent.py
```

**Day 1b - Multi-Agent Systems:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai
source venv/bin/activate
python3 day1/day1b_multi_agent.py
```

---

## Step-by-Step Breakdown

### 1. Navigate to Project
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai
```
- **What:** Changes directory to your project folder
- **Why:** You need to be in the right folder to find your files

### 2. Activate Virtual Environment
```bash
source venv/bin/activate
```
- **What:** Activates the isolated Python environment for this project
- **Why:** Uses project-specific packages, not system-wide ones
- **How to tell it worked:** Your prompt shows `(venv)` at the start

### 3. Run the Script
```bash
python3 day1/day1a_simple_agent.py
```
or
```bash
python3 day1/day1b_multi_agent.py
```
- **What:** Executes your AI agent script
- **Why:** This actually runs your code
- **What you'll see:**
  - Agent responses printed in the terminal
  - **Day 1b also creates:** A timestamped markdown file in `day1/outputs/` with formatted pattern documentation

### 4. Exit Virtual Environment (When Done)
```bash
deactivate
```
- **What:** Exits the virtual environment
- **Why:** Returns to normal system Python

---

## Common Issues & Fixes

### "Command not found: python3"
**Solution:** Try `python` instead of `python3`

### "No such file or directory: venv"
**Solution:** You're in the wrong folder. Run step 1 again.

### "ModuleNotFoundError"
**Solution:** Virtual environment not activated. Run step 2 again.

### "API key not valid"
**Solution:** Check that `.env` file has your correct API key

---

## Editing Your Questions

1. Open `day1/day1a_simple_agent.py` in VS Code
2. Find lines 71, 79 (the questions)
3. Change the text between the quotes
4. Save the file (`Cmd + S`)
5. Run step 3 again

---

## One-Line Version (Advanced)

**Day 1a:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai && source venv/bin/activate && python3 day1/day1a_simple_agent.py
```

**Day 1b:**
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai && source venv/bin/activate && python3 day1/day1b_multi_agent.py
```

**What `&&` does:** Chains commands together - only runs next command if previous one succeeded

---

## Virtual Environment: Why?

**Think of it like this:**
- Your computer = Entire house
- Virtual environment = One room with its own furniture

Each project gets its own "room" so they don't interfere with each other.

**Benefits:**
- No package conflicts between projects
- Clean, reproducible setup
- Industry best practice

---

## What Files Do What?

| File | Purpose | Edit? |
|------|---------|-------|
| `day1/day1a_simple_agent.py` | Day 1a: Simple agent (Roxie) | ✅ Yes - change questions here |
| `day1/day1b_multi_agent.py` | Day 1b: Multi-agent patterns | ✅ Yes - modify patterns |
| `day1/outputs/*.md` | Generated pattern documentation | 📖 Auto-generated reference |
| `day1/notes.md` | Day 1 learning notes | ✅ Yes - add your insights |
| `day1/*.ipynb` | Original Kaggle notebooks | 📖 Reference only |
| `.env` | API key storage | ⚠️ Only if key changes |
| `venv/` | Python packages | ❌ No - managed by pip |
| `.gitignore` | What git ignores | ❌ Rarely |

---

## Project Structure

```
kaggle-5day-genai/
├── .env                    # API key (shared)
├── venv/                   # Virtual environment (shared)
├── HOW-TO-RUN.md          # This file
├── day1/                  # Day 1 files
│   ├── day1a_simple_agent.py
│   ├── day1b_multi_agent.py
│   ├── outputs/           # Generated markdown docs
│   │   └── multi-agent-output_*.md
│   ├── notes.md
│   └── *.ipynb
├── day2/                  # Future: Day 2 files
├── day3/                  # Future: Day 3 files
├── day4/                  # Future: Day 4 files
└── day5/                  # Future: Day 5 files
```

---

## Next Steps

- Try changing questions in the Day 1a script
- Run the commands yourself a few times to build muscle memory
- Experiment with different questions and agent patterns
- Create `day2/` folder when ready for Day 2
