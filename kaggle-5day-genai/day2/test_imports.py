#!/usr/bin/env python3
"""Test script to verify all imports work correctly"""

import os
import sys

# Print which Python we're using
print(f"Python executable: {sys.executable}")
print(f"Python version: {sys.version}\n")

# Load API key
env_path = '../.env'
with open(env_path, 'r') as f:
    for line in f:
        if line.startswith('GOOGLE_API_KEY'):
            key = line.split('=')[1].strip()
            os.environ['GOOGLE_API_KEY'] = key
            GOOGLE_API_KEY = key
            break

print(f"✅ API key loaded (starts with: {GOOGLE_API_KEY[:10]}...)\n")

# Test all imports
print("Testing imports...")

import uuid
from google.genai import types
from google.adk.agents import LlmAgent
from google.adk.models.google_llm import Gemini
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset
from google.adk.tools.tool_context import ToolContext
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams, StdioServerParameters
from google.adk.apps.app import App, ResumabilityConfig
from google.adk.tools.function_tool import FunctionTool

print("✅ All ADK components imported successfully!")
print("\nYour environment is working correctly!")
print("You can now use the notebook with confidence.")
