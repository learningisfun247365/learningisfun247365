# How to Run Your AI Agent

## Quick Start (Copy & Paste This)

```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai
source venv/bin/activate
python3 day1_local_agent.py
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
python3 day1_local_agent.py
```
- **What:** Executes your AI agent script
- **Why:** This actually runs your code
- **What you'll see:** Agent responses printed in the terminal

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

1. Open `day1_local_agent.py` in VS Code
2. Find lines 71, 79 (the questions)
3. Change the text between the quotes
4. Save the file (`Cmd + S`)
5. Run step 3 again

---

## One-Line Version (Advanced)

Run everything at once:
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai && source venv/bin/activate && python3 day1_local_agent.py
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
| `day1_local_agent.py` | Your agent script | ✅ Yes - change questions here |
| `.env` | API key storage | ⚠️ Only if key changes |
| `venv/` | Python packages | ❌ No - managed by pip |
| `.gitignore` | What git ignores | ❌ Rarely |

---

## Next Steps

- Try changing questions in the script
- Run the commands yourself a few times to build muscle memory
- Experiment with different questions to ask Roxie
