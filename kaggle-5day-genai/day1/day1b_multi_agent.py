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

    # Run each pattern
    await demo_llm_orchestrator()
    await demo_sequential()
    await demo_parallel()
    await demo_loop()

    print("=" * 70)
    print("ALL PATTERNS COMPLETE!")
    print("=" * 70)
    print("\nKey Takeaways:")
    print("1. LLM Orchestrator: Flexible but unpredictable")
    print("2. Sequential: Guaranteed order, like an assembly line")
    print("3. Parallel: Fast execution for independent tasks")
    print("4. Loop: Iterative refinement until criteria met")
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())
