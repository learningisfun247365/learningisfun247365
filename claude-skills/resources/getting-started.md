# Getting Started Guide

**Welcome!** This guide will help you set up everything you need to follow this learning journey.

---

## Prerequisites Setup

### **1. Install Claude Code**

Follow the official installation guide:
https://docs.anthropic.com/claude/docs/claude-code

**Verify installation:**
```bash
claude --version
```

### **2. Get API Access**

1. Go to: https://console.anthropic.com/
2. Create an account
3. Add credits or start with free tier
4. Generate an API key
5. Set it as environment variable:

```bash
export ANTHROPIC_API_KEY='your-key-here'
```

**For permanent setup:**
Add to your `~/.zshrc` or `~/.bashrc`:
```bash
echo 'export ANTHROPIC_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### **3. Install Python**

**Check if you have Python:**
```bash
python3 --version
```

**If not installed:**
- macOS: `brew install python3`
- Windows: Download from python.org
- Linux: Use your package manager

### **4. Install Git**

**Check if you have Git:**
```bash
git --version
```

**If not installed:**
- macOS: `brew install git`
- Windows: Download from git-scm.com
- Linux: `sudo apt-get install git` (or equivalent)

### **5. Install Required Python Packages**

```bash
pip3 install requests
```

---

## Setting Up Your Learning Environment

### **1. Fork or Clone This Repo**

**Option A: Fork (Recommended)**
1. Fork this repo to your GitHub account
2. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/claudecode.git
cd claudecode
```

**Option B: Start Fresh**
1. Create a new repo on GitHub
2. Clone it locally
3. Copy the structure from this repo

### **2. Configure Git**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **3. Create Working Directories**

The folder structure is already created, but verify:
```bash
ls -la
# You should see: foundations/ project-build/ advanced/ resources/
```

---

## Your First Session with Claude Code

### **Test Your Setup**

1. **Start Claude Code:**
```bash
cd /path/to/claudecode
claude code
```

2. **Test a simple prompt:**
```
Can you read the ROADMAP.md file and summarize what this learning journey is about?
```

3. **Verify it can read files:**
If Claude summarizes the roadmap correctly, you're set up!

---

## Daily Workflow

### **Starting a New Step**

1. **Read the step's README:**
```bash
cat foundations/step-01-prompt-engineering/README.md
```

2. **Create an exercises branch (optional but recommended):**
```bash
git checkout -b step-01-exercises
```

3. **Work through the exercises:**
- Use Claude Code to help
- Save your work as you go
- Take notes in the exercises folder

4. **Document your learnings:**
- Create `lessons-learned.md` in each step
- Note what worked, what didn't
- Write down aha moments

5. **Commit your work:**
```bash
git add .
git commit -m "Complete step 01: Prompt engineering basics"
git push
```

---

## Using Claude Code Effectively

### **Starting Claude Code**

```bash
cd your-project-directory
claude code
```

### **Basic Commands**

Once in Claude Code:
- Just type naturally - ask questions, request help
- Reference files: "Can you read foundations/step-01/README.md?"
- Ask for edits: "Can you create a file called test.py?"
- Get help: Type `/help`

### **Exiting**

- Type `exit` or press `Ctrl+C`

### **Providing Context**

**Good:**
```
I'm working on step 4, trying to fetch data from the MET API.
I'm getting this error:
[paste full error]

The code is in: project-build/step-04-met-api/exercises/first_api_call.py
Can you help me debug this?
```

**Not as good:**
```
My code doesn't work, fix it
```

---

## Tracking Your Progress

### **Use the Checkboxes**

Each step has checkboxes in its README. Track what you've completed:

```markdown
- [x] Completed exercise 1
- [x] Completed exercise 2
- [ ] Working on exercise 3
```

### **Commit Regularly**

After each exercise or significant milestone:
```bash
git add .
git commit -m "Descriptive message about what you did"
```

### **Document in lessons-learned.md**

After each step, write:
- What you learned
- What was challenging
- Aha moments
- What you'd do differently

---

## Common Issues

### **Issue: "Claude Code command not found"**

**Solution:**
- Verify installation: Check the official docs
- Check PATH: Make sure Claude Code is in your system PATH

### **Issue: "API key not found"**

**Solution:**
```bash
export ANTHROPIC_API_KEY='your-key-here'
# Or add to ~/.zshrc for permanent setup
```

### **Issue: "Permission denied" errors**

**Solution:**
```bash
chmod +x filename  # Make file executable
```

### **Issue: Python package not found**

**Solution:**
```bash
pip3 install package-name
# Or: python3 -m pip install package-name
```

---

## Tips for Success

### **1. Don't Skip Steps**
Each builds on the previous. Tempting to jump ahead, but you'll miss foundations.

### **2. Do the Exercises**
Reading isn't learning. Doing is learning. Actually write the prompts, run the code, debug the errors.

### **3. Experiment**
Try things beyond the exercises. Break things. See what happens. That's where real learning occurs.

### **4. Document Everything**
Your future self (and others) will thank you. Write down what worked, what didn't, and why.

### **5. Use Version Control**
Commit often. Branches are cheap. You can always roll back.

### **6. Ask for Help**
- Open issues on this repo if stuck
- Reference official docs
- Search for error messages

### **7. Take Breaks**
Some concepts need time to sink in. It's okay to step away and come back.

---

## Getting Help

### **In this repo:**
- Open an issue if something is unclear
- Check if others have asked similar questions

### **Official resources:**
- [Claude Code docs](https://docs.anthropic.com/claude/docs/claude-code)
- [Anthropic Discord community](https://discord.gg/anthropic)

### **General coding help:**
- Stack Overflow
- Python docs
- Git docs

---

## Next Steps

1. ✅ Verify all prerequisites are installed
2. ✅ Test Claude Code works
3. ✅ Set up your git workflow
4. 📚 Read the [ROADMAP.md](../ROADMAP.md)
5. 🚀 Start [Step 1: Prompt Engineering](../foundations/step-01-prompt-engineering/README.md)

---

**Ready?** You've got this. Remember: learning is a journey, not a race.

Start here: [Step 1: Prompt Engineering Basics](../foundations/step-01-prompt-engineering/README.md)
