"""
Day 1: Your First AI Agent - Local Version
This is a simplified version of the Kaggle notebook that runs locally.
"""

import os
import asyncio
from dotenv import load_dotenv
from google.adk.agents import Agent
from google.adk.models.google_llm import Gemini
from google.adk.runners import InMemoryRunner
from google.adk.tools import google_search
from google.genai import types

# Load environment variables from .env file
load_dotenv()

# Get API key from environment
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env file!")

print("✅ API key loaded successfully")
# Configure retry options for handling rate limits and errors
retry_config = types.HttpRetryOptions(
    attempts=5,  # Maximum retry attempts
    exp_base=7,  # Delay multiplier
    initial_delay=1,  # Initial delay before first retry (in seconds)
    http_status_codes=[429, 500, 503, 504]  # Retry on these HTTP errors
)

print("✅ Retry config set up")

# Define the agent
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

print("✅ Agent created")


async def main():
    """Main function to run the agent"""

    # Create a runner
    runner = InMemoryRunner(agent=root_agent)
    print("✅ Runner created\n")

    # Test question 1: About ADK (like in the notebook)
    print("=" * 60)
    print("Question 1: About Agent Development Kit")
    print("=" * 60)
    response = await runner.run_debug(
        "What is Agent Development Kit from Google? What languages is the SDK available in?"
    )
    print("\n")

    # Test question 2: Current information
    print("=" * 60)
    print("Question 2: Current information (weather)")
    print("=" * 60)
    response = await runner.run_debug(
        "What's the weather in New York City?"
    )
    print("\n")

    # Your turn! Try your own question
    print("=" * 60)
    print("Question 3: Film/Cinema history")
    print("=" * 60)
    custom_question = "Who is the most decorated film maker of all time?"
    print(f"Asking: {custom_question}")
    response = await runner.run_debug(custom_question)


if __name__ == "__main__":
    print("\n🚀 Starting AI Agent Demo\n")
    asyncio.run(main())
    print("\n✅ Demo complete!")
