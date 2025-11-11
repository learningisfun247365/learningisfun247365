# Day 1: Agents and Prompting Fundamentals

## Overview
_Notes from Kaggle 5-Day Agents Sprint - Day 1_

**Course Link:** https://www.kaggle.com/learn-guide/5-day-agents

### Topics Covered
- What are AI agents?
- Agent architectures and components
- Prompting fundamentals for agents
- Agent vs. LLM capabilities
- Tool usage and reasoning loops
- Local development environment setup

### Codelabs
1. **Day 1a: From Prompt to Action** - Build your first agent using Gemini and ADK
   - Setup and configuration
   - Agent definition and properties
   - Running agents with tools (Google Search)

2. **Day 1b: Multi-Agent Systems** 
    - Distinguish between LLM agents and Workflow Agents
    - Set up test multi agent teams

---

# Day 1a: From Prompt to Action

### Went a different direction - downloaded code instead. Process:
- The Kaggle notebook was frankly annoying to work in, and i was running into errors. So I downloaded the code (.ipynb) instead to run locally in vscode.
- Claude checked that I had python installed (3.9.6), and then it installed the `google-adk` package.
- It asked for my api key, which it then saved in `.env` file to store it - and it specifically checked to make sure it wasn't committed to git by adding it to the `.gitignore` file
- Then, it created a simplified python script (`day1_local_agent.py`) to run locally instead of the notebook.
- **Error #1:** API key was wrong. I had copied `gen-lang-client-...` instead of the actual key.
    - Fixed: Got correct key from AI Studio (starts with `AIza...`) and added it manually to `.env` file.
- It worked! But, I realized - how do I actually run the code??
    - Initially thought: Open notebook file `day-1a-from-prompt-to-action.ipynb`, click the ▶️ button at the top.
    - But actual way: Run the Python script in terminal
- **Error #2:** When I ran it, I got this:
```bash
mariaweaver@air:~/projects % /opt/homebrew/bin/python3.12 /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai/day1_local_agent.py
Traceback (most recent call last):
  File "/Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai/day1_local_agent.py", line 8, in <module>
    from dotenv import load_dotenv
ModuleNotFoundError: No module named 'dotenv'
```
- **What this means:** I was using Python 3.12, but packages were installed for Python 3.9
- **The fix:** Use a **virtual environment**
    - _Why?_ They let you run multiple projects that require different versions of a package. Each project gets its own isolated environment.
    - Claude created `venv/` folder which is this project's isolated python environment. New packages get installed in there instead of system-wide.
    - I need to activate this virtual environment when working in the project.
    - Created with: `python3.12 -m venv venv`
    - Activate with: `source venv/bin/activate`
    - Then installed packages: `pip install google-adk python-dotenv`
- **Success!** Script ran with Python 3.12 and answered all my test questions.

---
### Building the Agent
- Created an agent named "Roxie" that can search Google for current information
- Tested it with three questions:
    1. "What is ADK from Google?" - Agent searched and found it's available in Python, Go, Java
    2. "What's the weather in New York City?" - Agent searched and got current weather (38°F, mostly cloudy)
    3. "Who is the most decorated filmmaker?" - Agent searched and answered Steven Spielberg

### Where output appears:
- **Confusion:** I kept looking for where `print(response)` was in the code
- **Reality:** The `runner.run_debug()` function **automatically prints to terminal**. No explicit print statement needed.
- Output scrolls in the terminal window where you run the command
- Not in a file, not in VS Code editor - just live terminal output

### How to run it every time:
```bash
cd /Users/mariaweaver/projects/learningisfun247365/kaggle-5day-genai
source venv/bin/activate
python3 day1_local_agent.py
```

### Using the browswer-based dev UI
- The directions in this course are not very intuitive (or rather - maybe they are for someone who is a dev).
- I couldn't figure out how to access the browser-based dev UI because I was expecting a link to click into.
    - It's actually running **locally on your computer** - I need to **manually type** http://127.0.0.1:8000 into your browser. 
    - There's no clickable link - just open a browser and type the URL
- The browser UI is **optional** - just a debugging tool. 
- I got in a spiral of death trying to activate the sample-agent as well. going to ignore this browser dev UI for now. 

## Key Takeaways
- Easier to use in VScode - more authentic practice and better debugging
- Virtual environments prevent package conflicts - each project gets isolated Python packages
- Agents are different from LLMs: they reason, take actions with tools, and observe results
- Tool usage is key: agents decide when to use tools based on instructions
- Each time working on this project, need to spin up the virtual environment. 
- the browser web UI isn't necesssary for running the agent. It's helpful for debugging. 

**The "Aha" Moments:**
- Virtual environments = project-specific package isolation (like separate toolboxes for different projects)
- ADK's `run_debug()` prints output automatically to terminal - no explicit print statement needed
- Agents don't just respond - they think → act → observe → answer

**A thought while working in ADK**

I knew that there were layers of abstraction away from the code when using browser based, no-code tools like Claude.ai, gumloop, librechat, openAI.

These browswer based tools handles the tool routing, api management, integrations, etc. I knew this in theory.

Trying to work with ADK shows me HOW FAR AWAY from the actual inner workings I am when using these tools.

They provide this abstraction layer that hides the nuts and bolts.

But, it is useful to try and wrap my brain around how agents actually work under the hood - the fundamentals - and what these tools like Librechat are making easier to do.

# Day 1b: Multi-Agent System

### Why multi-agents?
- When tasks get complex, trying to use a single agent (swiss army knife) to do it all ends up becomng unweildy and difficult to debug.   
- Test multi agents:
    - **Research Agent** - Searches for information using Google Search
    - **Summarizer Agent** - Creates concise summaries from research findings.
- There are different types of agent flows you can build:
    1. **LLM orchestrator** = this is the root coordinator, an LLM agent that decides what agents to call and in what order. 
        - pros: it is flexible, more adaptive, dynamic decision-making
        - cons: can be unpredictable (why you need to add in constraints)
    2. **workflow agents** = these agents follow specific patterns and do not think. While they manage when and how the other agents run, this is predetermined by logic (set by you - human)
        - pros: more control, pre-determined order critical
        - cons: need to have clearly written out rules and processes
- The key for choosing the right type of agent to build is to **match pattern to purpose**: 
    - personalized adaptation → LLM Orchestrator
    - predictable workflows → Sequential
        - question → search → read → answer
    - parallel research → Parallel
        - Researcher 1,2,3 → compile into summary
    - quality refinement → Loop
        - feedback → revision cycles
- When you run the code, the output is in the terminal. You can choose to save the output elswewhere. So, I tried to change the output to save to markdown file.
    - while it did save to a md file - it only shared the summary about the patterns ( what each agent pattern was doing) - not the _actual_ results. But it's the actual results I need.
    - Digging in - it's because `run_debug()` prints directly in the terminal - it isn't captured elsewhere.
    - To fix this - need to use `run()` to then capture the result. 


---

# Questions & Further Exploration
- How do I see the agent's "thinking" process more explicitly?
- What other tools can I give an agent besides Google Search?
- What custom tools for my agent?

---

# Key Concepts

### What is an agent?
* AI agents think and act (different from just responding like an LLM)
```
Prompt -> Agent -> Thought -> Action -> Observation -> Final Answer
```
vs. simple LLM:
```
Prompt -> LLM -> Text
```
* There is a difference between **LLM agents** vs **workflow agents**
    - LLM Agents "think" - it is not deterministic
        - You need to define its identity, clearly guiding its behavior through instructions, and equipping it with the necessary tools and capabilities.
    - Workflow agents do not "think"  - they are derministic. Their primary role is to manage how and when other agents run. They manage: 
        - Sequential Agents: Executes sub-agents one after another, in sequence.
        - Loop Agents: Repeatedly executes its sub-agents until a specific termination condition is met.
        - Parallel agents: Executes multiple sub-agents in parallel.

### Defining an agent
To configure an Agent means to **set its key properties** - these tell it what to do and how to operate.

Main properties:
- **name and description**: Identifies the agent
- **model**: The LLM powering the agent's reasoning (we used `gemini-2.5-flash-lite`)
- **instruction**: The agent's guiding prompt - tells it its goal and behavior
- **tools**: List of tools the agent can use (we gave it `google_search`)

```python
root_agent = Agent(
    name="Roxie",
    model=Gemini(
        model="gemini-2.5-flash-lite",
        retry_options=retry_config
    ),
    description="A simple agent that can answer general questions.",
    instruction="You are a helpful assistant. Use Google Search for current info or if unsure.",
    tools=[google_search],
)
```

### How agents work:
1. **Agent inspects available tools** - Knows what it can do
2. **Instruction tells when to use tools** - "Use Google Search for current info or if unsure"
3. **Agent reasons about the question** - Does it need current info?
4. **Agent takes action** - Calls the Google Search tool
5. **Agent observes result** - Reads search results
6. **Agent formulates answer** - Combines reasoning with tool results

---


## Resources
- [Writing good agent instructions](https://google.github.io/adk-docs/agents/llm-agents/#defining-the-agents-identity-and-purpose)
- [ADK Documentation](https://google.github.io/adk-docs/)
- [Kaggle 5-Day Agents Sprint](https://www.kaggle.com/learn-guide/5-day-agents)
- [Google AI Studio](https://aistudio.google.com/app/apikey) - API key generation
- `HOW-TO-RUN.md` - Command reference guide I created today
