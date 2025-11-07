# Step 2: Claude Code Basics & Workflow

**Why now:** You know how to prompt effectively. Now learn how Claude Code works before trying to configure it.

---

## Learning Objectives

By the end of this step, you should be able to:

- [ ] Understand what Claude Code can and can't do
- [ ] Work iteratively with Claude Code
- [ ] Provide context effectively
- [ ] Break complex tasks into steps
- [ ] Use chain-of-thought prompting

---

## Key Concepts

### **1. What is Claude Code?**

Claude Code is different from:
- **Claude API** - Direct programmatic access
- **Claude.ai (web)** - Chat interface
- **Claude in IDEs** - Editor integration

**Claude Code can:**
- Read files in your project
- Edit existing files
- Create new files
- Run terminal commands
- Work across multiple files
- Remember context from your conversation

**Claude Code cannot:**
- Read your mind (be specific!)
- Access files outside your workspace
- Run GUI applications
- Make decisions without your input

### **2. The Iterative Workflow**

Claude Code works best with iteration:

```
You: "I have a Python script that fetches data from an API but it's failing"
Claude: "Let me read the file to see what's happening"
[Reads file]
Claude: "I see the issue - the error handling is missing. Let me fix that."
[Edits file]
You: "Great! Now can you add logging?"
Claude: "Sure, I'll add logging to track the API calls"
[Edits file again]
```

**Key pattern:**
1. Start with the current problem
2. Provide context (files, errors, what you tried)
3. Let Claude analyze and suggest
4. Review the changes
5. Iterate based on results

### **3. Providing Context**

**Good context includes:**
- What you're trying to do
- What you've tried already
- Error messages (full output!)
- Relevant files
- Your project structure

**Example:**
```
I'm building a script to fetch artist data from the MET Museum API.
I've tried running it but getting a 404 error.

Here's the error:
[paste full error]

The script is in: src/met_api.py
Can you help me debug this?
```

### **4. Breaking Down Complex Tasks**

Instead of:
```
"Build me a complete art history timeline application"
```

Try:
```
"I want to build an art history timeline. Let's start by:
1. First, fetch data from the MET API for a single artist
2. Then we'll structure that data
3. Then we'll add more artists
4. Finally we'll build the visualization

Let's start with step 1 - can you help me write a script to fetch
data for one artist from the MET API?"
```

---

## Exercises

### **Exercise 1: First Conversation**

**Goal:** Get comfortable with the basic workflow.

**Task:**
1. Create a file: `exercises/artist_data.txt`
2. Add some unstructured text about an artist (copy from Wikipedia)
3. Ask Claude Code to:
   - Read the file
   - Extract key information (name, dates, movement)
   - Reformat it as structured data (JSON or markdown)

**What to observe:**
- How does Claude Code confirm it read the file?
- Does it ask for clarification?
- Is the output what you expected?

Document in: `exercises/first-conversation.md`

---

### **Exercise 2: Iterative Editing**

**Goal:** Learn to work iteratively.

**Task:**
1. Create a simple Python script: `exercises/hello_artist.py`
   ```python
   artist = "Picasso"
   print(f"Hello, {artist}")
   ```

2. Ask Claude Code to make iterative changes:
   - Add the artist's birth year
   - Add a function that takes artist name as parameter
   - Add docstrings
   - Add error handling for empty input
   - Add a main block

**What to observe:**
- How does Claude handle multiple small requests?
- Does it maintain context between requests?
- Can you review changes before they're made?

Document in: `exercises/iterative-editing.md`

---

### **Exercise 3: Debugging with Claude**

**Goal:** Learn to provide good debugging context.

**Task:**
1. Create a broken script: `exercises/broken_script.py`
   ```python
   def get_artist_info(name):
       artists = {"Picasso": 1881, "Monet": 1840}
       return artists[name]

   print(get_artist_info("Van Gogh"))
   ```

2. Run it and get the error
3. Ask Claude Code to help, providing:
   - What you were trying to do
   - The full error message
   - The code that's failing

4. Work with Claude to:
   - Fix the error
   - Add better error handling
   - Add a fallback for unknown artists

**What to observe:**
- What context did Claude ask for?
- How did it explain the problem?
- Did it suggest improvements beyond the fix?

Document in: `exercises/debugging-practice.md`

---

### **Exercise 4: Multi-File Context**

**Goal:** Understand how Claude Code handles multiple files.

**Task:**
1. Create two files:
   - `exercises/artists.json` - JSON with artist data
   - `exercises/display_artists.py` - Script to read and display

2. Ask Claude Code to:
   - Read both files
   - Add a new artist to the JSON
   - Update the Python script to display all artists

**What to observe:**
- How does Claude reference multiple files?
- Does it maintain consistency between them?
- Can it suggest improvements to the structure?

Document in: `exercises/multi-file-work.md`

---

### **Exercise 5: Terminal Commands**

**Goal:** Learn how Claude Code runs commands.

**Task:**
1. Ask Claude Code to:
   - Check if Python is installed (`python --version`)
   - Create a requirements.txt file
   - Install a package (like `requests`)
   - Run a simple Python script

**What to observe:**
- How does Claude execute commands?
- Does it explain what each command does?
- How does it handle errors?

Document in: `exercises/terminal-practice.md`

---

## Git & Terminal Basics

You'll need these for the project:

### **Essential Terminal Commands:**
```bash
# Navigation
cd [directory]    # Change directory
ls               # List files
pwd              # Show current directory
mkdir [name]     # Create directory

# File operations
cat [file]       # Display file contents
touch [file]     # Create empty file
rm [file]        # Delete file
```

### **Essential Git Commands:**
```bash
# Setup
git init                    # Initialize repo
git clone [url]            # Clone existing repo

# Daily workflow
git status                 # Check status
git add [file]            # Stage file
git commit -m "message"   # Commit changes
git push                  # Push to remote

# Branching
git branch [name]         # Create branch
git checkout [branch]     # Switch branch
git checkout -b [name]    # Create and switch
```

### **Exercise 6: Git Practice**

**Task:**
1. Initialize a git repo in your exercises folder
2. Make changes to one of your files
3. Use Claude Code to help you:
   - Check git status
   - Stage your changes
   - Write a good commit message
   - Commit your work

Document in: `exercises/git-practice.md`

---

## Resources

### **Official Docs:**
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Claude Code Getting Started](https://docs.anthropic.com/claude/docs/claude-code-quickstart)

### **Terminal/Git:**
- [Git Basics Tutorial](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- Terminal cheat sheet (search online for your OS)

---

## Deliverables

Before moving to Step 3, you should have:

- [ ] `exercises/first-conversation.md` - Your first Claude Code interaction
- [ ] `exercises/iterative-editing.md` - Iterative workflow practice
- [ ] `exercises/debugging-practice.md` - Debugging with context
- [ ] `exercises/multi-file-work.md` - Multi-file handling
- [ ] `exercises/terminal-practice.md` - Terminal command practice
- [ ] `exercises/git-practice.md` - Basic git workflow
- [ ] `lessons-learned.md` - Reflections on working with Claude Code

---

## Success Criteria

You're ready for Step 3 when you can:

✅ Work iteratively with Claude Code to solve problems
✅ Provide good context (files, errors, goals)
✅ Break down complex tasks into steps
✅ Use basic terminal commands
✅ Perform basic git operations
✅ Understand when to ask for clarification vs providing more context

---

## My Journey (To Be Completed)

**Time spent:** [To be filled]
**Most useful pattern learned:** [To be filled]
**Biggest aha moment:** [To be filled]
**What surprised me:** [To be filled]

See my completed work in: `/completed/`

---

## Next Step

Once you've completed this step: [Step 3: Configuration](../step-03-configuration/README.md)
