"""
Day 1b: Multi-Agent Systems - Local Version
Demonstrates four agent orchestration patterns:
1. LLM Orchestrator
2. Sequential Workflow
3. Parallel Workflow
4. Loop Workflow
"""

import os
import asyncio
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from google.adk.agents import Agent, SequentialAgent, ParallelAgent, LoopAgent
from google.adk.models.google_llm import Gemini
from google.adk.runners import InMemoryRunner
from google.adk.tools import AgentTool, FunctionTool, google_search
from google.genai import types

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env file!")

# Configure retry options
retry_config = types.HttpRetryOptions(
    attempts=5,
    exp_base=7,
    initial_delay=1,
    http_status_codes=[429, 500, 503, 504]
)

print("✅ Setup complete\n")


# ============================================================================
# MARKDOWN OUTPUT FUNCTION
# ============================================================================

def save_to_markdown(content, filename=None):
    """Save multi-agent outputs to a markdown file"""
    # Create outputs folder if it doesn't exist
    output_dir = Path(__file__).parent / "outputs"
    output_dir.mkdir(exist_ok=True)

    # Generate filename with timestamp if not provided
    if filename is None:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"multi-agent-output_{timestamp}.md"

    filepath = output_dir / filename

    # Write content to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n📄 Output saved to: {filepath}")
    return filepath


# ============================================================================
# PATTERN 1: LLM ORCHESTRATOR
# An LLM decides which agents to call and in what order
# ============================================================================

async def demo_llm_orchestrator():
    print("=" * 70)
    print("PATTERN 1: LLM ORCHESTRATOR")
    print("=" * 70)
    print("Building: Research Agent + Summarizer Agent with LLM coordinator\n")

    # Research Agent
    research_agent = Agent(
        name="ResearchAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="You are a research specialist. Use google_search to find 2-3 pieces of relevant information on the given topic.",
        tools=[google_search],
        output_key="research_findings",
    )

    # Summarizer Agent
    summarizer_agent = Agent(
        name="SummarizerAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Read the research findings: {research_findings}\nCreate a concise 3-point summary.",
        output_key="final_summary",
    )

    # Root Coordinator (LLM orchestrates)
    root_agent = Agent(
        name="ResearchCoordinator",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="""You coordinate research workflow:
1. FIRST call ResearchAgent tool to find information
2. THEN call SummarizerAgent tool to create a summary
3. Present the final summary to the user""",
        tools=[AgentTool(research_agent), AgentTool(summarizer_agent)],
    )

    runner = InMemoryRunner(agent=root_agent)
    await runner.run_debug("What are AI agents and why do they matter?")
    print("\n✅ LLM Orchestrator complete!\n")


# ============================================================================
# PATTERN 2: SEQUENTIAL WORKFLOW
# Agents run in a guaranteed, fixed order
# ============================================================================

async def demo_sequential():
    print("=" * 70)
    print("PATTERN 2: SEQUENTIAL WORKFLOW")
    print("=" * 70)
    print("Building: Outline → Write → Edit pipeline\n")

    outline_agent = Agent(
        name="OutlineAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Create a brief 3-point outline for a blog post on the given topic.",
        output_key="blog_outline",
    )

    writer_agent = Agent(
        name="WriterAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Following this outline: {blog_outline}\nWrite a brief 150-word blog post.",
        output_key="blog_draft",
    )

    editor_agent = Agent(
        name="EditorAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Edit this draft for clarity: {blog_draft}\nFix grammar and improve flow.",
        output_key="final_blog",
    )

    # Sequential Agent: runs in order
    root_agent = SequentialAgent(
        name="BlogPipeline",
        sub_agents=[outline_agent, writer_agent, editor_agent],
    )

    runner = InMemoryRunner(agent=root_agent)
    await runner.run_debug("Write a blog post about the benefits of multi-agent systems")
    print("\n✅ Sequential Workflow complete!\n")


# ============================================================================
# PATTERN 3: PARALLEL WORKFLOW
# Multiple agents run at the same time
# ============================================================================

async def demo_parallel():
    print("=" * 70)
    print("PATTERN 3: PARALLEL WORKFLOW")
    print("=" * 70)
    print("Building: 3 researchers running simultaneously + aggregator\n")

    tech_researcher = Agent(
        name="TechResearcher",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Research latest AI/ML trends. 3 key points, 100 words.",
        tools=[google_search],
        output_key="tech_research",
    )

    health_researcher = Agent(
        name="HealthResearcher",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Research medical breakthroughs. 3 key points, 100 words.",
        tools=[google_search],
        output_key="health_research",
    )

    finance_researcher = Agent(
        name="FinanceResearcher",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Research fintech trends. 3 key points, 100 words.",
        tools=[google_search],
        output_key="finance_research",
    )

    aggregator_agent = Agent(
        name="AggregatorAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="""Combine these findings into one summary:
Tech: {tech_research}
Health: {health_research}
Finance: {finance_research}
Highlight common themes in 150 words.""",
        output_key="executive_summary",
    )

    # Parallel + Sequential combination
    parallel_team = ParallelAgent(
        name="ParallelResearchTeam",
        sub_agents=[tech_researcher, health_researcher, finance_researcher],
    )

    root_agent = SequentialAgent(
        name="ResearchSystem",
        sub_agents=[parallel_team, aggregator_agent],
    )

    runner = InMemoryRunner(agent=root_agent)
    await runner.run_debug("Run executive briefing on Tech, Health, and Finance")
    print("\n✅ Parallel Workflow complete!\n")


# ============================================================================
# PATTERN 4: LOOP WORKFLOW
# Agents repeat until condition is met
# ============================================================================

async def demo_loop():
    print("=" * 70)
    print("PATTERN 4: LOOP WORKFLOW")
    print("=" * 70)
    print("Building: Writer → Critic loop (iterative refinement)\n")

    initial_writer = Agent(
        name="InitialWriter",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="Write a very short story (100 words) on the given topic.",
        output_key="current_story",
    )

    critic_agent = Agent(
        name="CriticAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="""Review this story: {current_story}
If it's well-written, respond EXACTLY: "APPROVED"
Otherwise, give 2 specific suggestions for improvement.""",
        output_key="critique",
    )

    # Exit function for the loop
    def exit_loop():
        """Call when critique is APPROVED"""
        return {"status": "approved", "message": "Story approved!"}

    refiner_agent = Agent(
        name="RefinerAgent",
        model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
        instruction="""Story: {current_story}
Critique: {critique}

IF critique is EXACTLY "APPROVED", call exit_loop function.
OTHERWISE, rewrite the story incorporating the feedback.""",
        output_key="current_story",
        tools=[FunctionTool(exit_loop)],
    )

    # Loop + Sequential combination
    refinement_loop = LoopAgent(
        name="RefinementLoop",
        sub_agents=[critic_agent, refiner_agent],
        max_iterations=2,
    )

    root_agent = SequentialAgent(
        name="StoryPipeline",
        sub_agents=[initial_writer, refinement_loop],
    )

    runner = InMemoryRunner(agent=root_agent)
    await runner.run_debug("Write a short story about a robot learning to paint")
    print("\n✅ Loop Workflow complete!\n")


# ============================================================================
# MAIN
# ============================================================================

async def main():
    print("\n" + "=" * 70)
    print("DAY 1B: MULTI-AGENT SYSTEMS - Four Orchestration Patterns")
    print("=" * 70)
    print("\nRunning all four patterns...\n")

    # Build markdown content
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    markdown_content = f"""# Day 1b: Multi-Agent Systems Output
Generated: {timestamp}

---

## Overview
This document captures the outputs from four different multi-agent orchestration patterns demonstrated in the Kaggle 5-Day Gen AI course.

---

"""

    # Run Pattern 1
    print("\n" + "=" * 70)
    markdown_content += """## Pattern 1: LLM Orchestrator

**Description:** An LLM decides which agents to call and in what order

**Architecture:**
```
Root Coordinator (LLM-orchestrated)
├── Research Agent (uses google_search)
└── Summarizer Agent (creates 3-point summary)
```

**Use Case:** Flexible workflows where the LLM determines the best sequence based on context

**Prompt:** "What are AI agents and why do they matter?"

---

"""
    await demo_llm_orchestrator()

    # Run Pattern 2
    print("\n" + "=" * 70)
    markdown_content += """## Pattern 2: Sequential Workflow

**Description:** Agents run in a guaranteed, fixed order

**Architecture:**
```
Outline Agent → Writer Agent → Editor Agent
```

**Use Case:** Assembly-line workflows where each step depends on the previous one

**Prompt:** "Write a blog post about the benefits of multi-agent systems"

---

"""
    await demo_sequential()

    # Run Pattern 3
    print("\n" + "=" * 70)
    markdown_content += """## Pattern 3: Parallel Workflow

**Description:** Multiple agents run simultaneously

**Architecture:**
```
[Parallel Team]
├── Tech Researcher
├── Health Researcher
└── Finance Researcher
    ↓
Aggregator Agent (combines findings)
```

**Use Case:** Independent tasks that can run concurrently for faster execution

**Prompt:** "Run executive briefing on Tech, Health, and Finance"

---

"""
    await demo_parallel()

    # Run Pattern 4
    print("\n" + "=" * 70)
    markdown_content += """## Pattern 4: Loop Workflow

**Description:** Agents repeat until a condition is met

**Architecture:**
```
Initial Writer Agent
    ↓
[Loop: max 2 iterations]
Critic Agent → Refiner Agent → (repeat until APPROVED)
```

**Use Case:** Iterative refinement workflows where quality improves through feedback loops

**Prompt:** "Write a short story about a robot learning to paint"

---

"""
    await demo_loop()

    # Add summary
    markdown_content += """## Key Takeaways

1. **LLM Orchestrator:** Flexible but unpredictable - the LLM decides the workflow
2. **Sequential:** Guaranteed order, like an assembly line - predictable and reliable
3. **Parallel:** Fast execution for independent tasks - maximizes efficiency
4. **Loop:** Iterative refinement until criteria met - improves quality through feedback

---

## Pattern Selection Guide

**Choose LLM Orchestrator when:**
- Workflow needs to adapt based on context
- You want the AI to decide the best approach
- Flexibility is more important than predictability

**Choose Sequential when:**
- Steps must happen in a specific order
- Each step depends on previous outputs
- Predictability is important

**Choose Parallel when:**
- Tasks are independent of each other
- Speed is a priority
- You can process multiple inputs simultaneously

**Choose Loop when:**
- Quality improves with iteration
- You need refinement based on criteria
- Feedback loops enhance the output

---

## Framework-Agnostic Concepts

These patterns transfer to ANY agent framework:
- Claude API (Anthropic)
- LangChain
- Custom implementations
- Other ADK-style frameworks

The *architecture* stays the same, only syntax changes.

---

**Generated by:** Google ADK (Agent Development Kit)
**Model:** Gemini 2.5 Flash Lite
**Course:** Kaggle 5-Day Gen AI - Day 1b
"""

    print("\n" + "=" * 70)
    print("ALL PATTERNS COMPLETE!")
    print("=" * 70)
    print("\nKey Takeaways:")
    print("1. LLM Orchestrator: Flexible but unpredictable")
    print("2. Sequential: Guaranteed order, like an assembly line")
    print("3. Parallel: Fast execution for independent tasks")
    print("4. Loop: Iterative refinement until criteria met")
    print("\n")

    # Save to markdown
    save_to_markdown(markdown_content)


if __name__ == "__main__":
    asyncio.run(main())
