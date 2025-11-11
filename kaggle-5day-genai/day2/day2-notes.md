# Day 2: Memory Management and Context

## Overview
_Notes from Kaggle 5-Day Agents Sprint - Day 2_

**Course Link:** https://www.kaggle.com/learn-guide/5-day-agents

### Topics Covered
- Tools and how they extend agent capabilities
- Custom function tools vs built-in tools
- Agent orchestration patterns
- Code execution for reliability
- Tool documentation best practices
- MCP (Model Context Protocol) for standardized integrations

## Codelabs
1. **Day 2a** Explore new ways to add tools to extend what your agents can do
   - Basic custom tools → Build your own Python functions as tools
   - Tool orchestration → Use one agent as a tool inside another agent
2. **Day 2b** Explore best practices for tools, including using MCP and long-running operations.

---
## Adding Tools to Agents

### Why are tools needed
- LLM's fatal flaw - without access to external functions, it is just a very high powered prediction machine.
- Tools are the LLMs eyes and hands - they allow the LLM to **know something** and **do something**. 
- Three main type of tools:
    1. **function calling** - specific actions (`search_web`, `send_email`, `google_search`)
    2. **built-in tools** - already built into llm API, you just need to enable them in the script/request 
    3. **agent tool** - i think when you have multiple agents? will learn more on day 5 apparently.

### Taxonomy of tools
Four primary types of tools
- **retrieving information**
    - _structured data retrieval_ = Querying databases, spreadsheets, or
other structured data sources (e.g., MCPs)
    - _unstructured data retrieval_  = Searching documents, web pages, or
knowledge bases 
- **Executing actions** - sent emails, search, post, etc. 
- **System / API integrations** 
- **Human in the loop** - faciliate collaboration with the human 

### How to design effective tools
- Key point is that it's declarative - you tell it what you want it to accomplish, not tell it how. 
- Often overlooked is telling the tool to provide detailed error messages - this will help the LLM address the issue. These error messagse can also contain what to do alternatively. 

| Design Principle | Explanation | Example |
|---|---|---|
| **Describe Actions, Not Implementations** | Tell the model what it needs to do (e.g., "create a bug to describe the issue"), not how to do it (e.g., "use the create_bug tool"). Don't repeat directions in multiple places either.| ❌ "Use create_bug tool with params X, Y, Z"<br>✅ "Create a bug report describing the issue" |
| **Publish Tasks, Not API Calls** | Tools must articulate a a specific task the agent needs to perform - not just telling the agent to call the API. By describing the task, the LLM can determine how to most effectively call the API.| ❌ "Call POST /api/orders endpoint"<br>✅ "Submit the customer's order" |
| **Make Tools Granular** | Tools should be concise and limited to a single function (a single responsibility). Avoid "multi-tools" that encapsulate a long, complicated workflow. If you need to have a tool do many tasks, 1) consider if you should use multiple agents or 2) make the documentation for the tool extremely clear. | ❌ `handle_payment_workflow()`<br>✅ `get_fee()`, `validate_payment()`, `process_transaction()` |
| **Design for Concise Output** | Tools should not return large volumes of data (like huge tables or downloaded files). | ❌ Returns 10,000 row database dump<br>✅ Returns summary with top 10 results + count |
| **Provide Descriptive Error Messages** | If a tool fails, the message should instruct the LLM on how to recover (e.g., "Ask the customer to confirm the product name and try again"). | ❌ "Error: Invalid input"<br>✅ "Payment method 'Gold Card' not found. Available: Platinum Credit Card, Bank Transfer" |

### Documentation is critical 

- **Clear, descriptive name**— Specific and human-readable (e.g., create_critical_bug_in_jira_with_priority instead of update_jira). Makes it easier for the model to pick the right tool and helps with audit logs.

- **Document all input/output parameters** — Describe the type and purpose of each parameter. The model needs to know what each input does and what it will get back.

- **Keep parameter lists short**— Long lists confuse the model. Keep it focused.

- **Clear tool description** — Explain the purpose, what it does, and how to use it. Use simple language, not jargon.

- **Add examples** — Show how to use the tool, especially for tricky or ambiguous cases. This clarifies behavior without needing expensive fine-tuning.

- **Provide defaults** — Include default values for key parameters and document them clearly. The model can use defaults if they're well-explained.

**Bottom line:** Write documentation as if explaining to someone who's never seen the tool before. The clearer you are, the better the model understands when and how to use it.

### The Interoperability Solution (MCP)
- MCPs are the USB C of LLMs world - it allows the agents to connect to a variety of tools (googledrive, databases, github, etc. ) in **a standardized way.**
    - Before this, you needed to write separate code for the agent to connect to each cool.
    - think of an MCP as a Hotel Concierge at a fancy hotel. You ask this concierge, _"Hey, I want dinner researvations for Le Bernadin tonight and tickets to see Waiting for Godot with Keanu Reeves."_ The Concierarge:
    - Poses your request to the restaurant, to the box office.
    - Brings back all outputs to do you in organized way.
- "Interoperability Solution" means that it enables different systems to talk to each other.

---

## Key Takeaways (from claude)

**Tools transform LLMs from prediction machines into capable agents**
- Without tools: just text generation
- With tools: can access current info, take actions, interact with systems
- Any Python function can become a tool - just add to `tools=[]` list

**Documentation is how agents decide which tool to use**
- LLM reads your docstring to understand when/how to use the tool
- Must include: clear name, purpose, parameters, return format, examples
- Write as if explaining to someone who's never seen your system
- Poor docs = agent picks wrong tool or uses it incorrectly

**Structure matters for error handling**
- Return dictionaries with status: `{"status": "success", "data": ...}`
- On failure: `{"status": "error", "error_message": "recovery instructions"}`
- Descriptive errors help agent try alternatives

**Code execution for reliability**
- LLMs make math errors (probabilistic, not deterministic)
- Solution: agent generates Python code → specialist executes it
- Use `BuiltInCodeExecutor()` for precise calculations
- Pattern: Main agent → generates code → Calculation specialist → runs code → returns result

**Agent orchestration with specialists**
- Create focused specialist agents for specific tasks
- Use them as tools with `AgentTool(agent=specialist)`
- Benefits: reusability, easier debugging, separation of concerns
- Different from sub-agents (which transfer control completely)

**Tool design principles**
- Declarative not imperative - tell WHAT to do, not HOW
- Keep tools granular - one responsibility per tool
- Design for concise output - summaries not data dumps
- Provide actionable error messages

**Tool types for different needs**
- **Function Tools** - Your custom business logic (quick to build)
- **Agent Tools** - Specialist agents (reusable experts)
- **Code Executors** - For precision (math, data processing)
- **MCP Tools** - Standardized external connections (databases, APIs)
- **Built-in Tools** - When available, use them (tested, reliable)

**The pattern I'll use going forward:**
```
Main Agent (orchestrator)
├── Custom function tools (my business logic)
├── Custom function tools (data access)
└── Specialist agent tool (code executor or other expert)
```

---

## Questions & Further Exploration

- How do I test custom tools before giving them to agents?
- What's the workflow for debugging when agent picks wrong tool?
- When should I use MCP vs writing my own function?
- How do long-running tools work for operations that take time?
- Can I give an agent access to my own database or API?
- How many tools is too many for one agent?
- What happens if two tools have similar names or purposes?
- How do I handle tools that need human approval before executing?

---

# Key Concepts

### Agent Tools vs Sub-agents
- **Agent Tool**
    - Agent A calls Agent B as a tool
    - Agent B returns results back to Agent A
    - Agent A stays in control
    - Use case: Delegation for specific tasks
    - Example: Currency agent uses Calculation agent for math
- **Sub-Agent**
    - Agent A transfers control completely to Agent B
    - Agent B takes over the conversation
    - Agent A is done
    - Use case: Handoffs (like escalating to a supervisor)

**My takeaway:** Use Agent Tool when you want the result to inform next steps. The parent stays in charge.

### What Makes Tools Work

**Basic Pattern:**
```python
def my_tool(param: str) -> dict:
    """Clear description of what this tool does.

    Args:
        param: What this parameter is for

    Returns:
        {"status": "success", "data": ...} on success
        {"status": "error", "error_message": "..."} on failure
    """
    # Your logic
    return {"status": "success", "data": result}

# Add to agent
agent = LlmAgent(
    name="my_agent",
    tools=[my_tool],
    instruction="Use my_tool() when you need to..."
)
```

**What happens:**
1. Agent inspects available tools (reads docstrings)
2. Agent reasons about user question
3. Agent decides if it needs a tool
4. Agent calls tool with appropriate parameters
5. Agent observes tool result
6. Agent formulates answer using tool output

### Complete Tool Taxonomy

**Custom Tools** (you build them):
- **Function Tools** - Python functions as tools
- **Long Running Tools** - For time-consuming operations
- **Agent Tools** - Other agents used as tools
- **MCP Tools** - Standardized service connections
- **OpenAPI Tools** - Auto-generated from API specs

**Built-in Tools** (ADK provides):
- **Gemini Tools** - `google_search`, `BuiltInCodeExecutor`
- **Google Cloud Tools** - BigQuery, Spanner, API Hub
- **Third-party Tools** - Hugging Face, GitHub, etc.

### Code Execution Pattern (Step by Step)

**Problem:** LLMs are bad at math - probabilistic not deterministic

**Solution:**
```python
# Step 1: Create specialist that generates code
calculation_agent = LlmAgent(
    name="CalculationAgent",
    instruction="You ONLY respond with Python code. Generate code to calculate.",
    code_executor=BuiltInCodeExecutor(),  # Gives code execution capability
)

# Step 2: Use specialist as tool in main agent
main_agent = LlmAgent(
    name="MainAgent",
    tools=[
        my_function_tool,
        AgentTool(agent=calculation_agent)  # Specialist as tool
    ],
    instruction="Use calculation_agent to run any math calculations."
)
```

**Flow:**
1. Main agent realizes it needs to calculate something
2. Main agent generates Python code for the calculation
3. Main agent calls calculation_agent with the code
4. Calculation agent executes code using `BuiltInCodeExecutor`
5. Returns precise result to main agent
6. Main agent continues with result

**Use this for:** Financial calculations, data transformations, anything requiring precision

---

## For Your Projects: How to Apply This

### Decision Framework for Any Agent

**Ask yourself:**
1. **What does my agent need to know?** → Information retrieval tools
2. **What does my agent need to do?** → Action execution tools
3. **What needs to be precise?** → Code execution tools
4. **What's reusable?** → Specialist agent tools
5. **What's already standardized?** → MCP or built-in tools

### Example: ATL Art Scene Agent

**Tools it would need:**

**Information Tools:**
```python
def get_upcoming_events(neighborhood: str, date: str) -> dict:
    """Searches for art events in Atlanta neighborhoods."""

def get_venue_details(venue_name: str) -> dict:
    """Gets info about galleries, studios, venues."""

def search_artist_work(artist_name: str) -> dict:
    """Finds artist portfolios and exhibition history."""
```

**Action Tools:**
```python
def add_to_calendar(event_details: dict) -> dict:
    """Adds event to user's calendar."""

def send_event_reminder(email: str, event: dict) -> dict:
    """Emails event details to user."""
```

**Architecture:**
```
Main Agent (Orchestrator)
├── get_upcoming_events() - function tool
├── get_venue_details() - function tool
├── add_to_calendar() - function tool
├── Research Specialist Agent - searches/filters events
└── Recommendation Specialist Agent - personalizes based on preferences
```

**Why this works:**
- Main agent understands user intent
- Research specialist handles complex search/filtering
- Recommendation specialist generates personalized suggestions
- Each piece has one clear job = easier to debug and improve

### Starting Simple

**For your first custom agent:**
1. Start with 1-2 function tools (your core capabilities)
2. Test thoroughly before adding more
3. Add code execution if you need precision
4. Build specialist agents when you find yourself repeating logic
5. Use MCP/built-in tools when available

**Red flags that you need to refactor:**
- Agent keeps picking wrong tool → Documentation unclear
- Agent makes calculation errors → Add code execution
- Same logic in multiple places → Extract to specialist agent
- Tool does too many things → Break into granular tools

---

## Resources

- [ADK Documentation](https://google.github.io/adk-docs/)
- [ADK Tools Documentation](https://google.github.io/adk-docs/tools/)
- [ADK Custom Tools Guide](https://google.github.io/adk-docs/tools-custom/)
- [ADK Function Tools](https://google.github.io/adk-docs/tools/function-tools/)
- [ADK Agent Tools](https://google.github.io/adk-docs/tools/agent-tools/)
- [Writing Good Agent Instructions](https://google.github.io/adk-docs/agents/llm-agents/#defining-the-agents-identity-and-purpose)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- Day 2a notebook: `day2/day-2a-agent-tools.ipynb`
- Day 1 notes: `day1/day1-notes.md`
