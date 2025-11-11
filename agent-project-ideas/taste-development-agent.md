# Taste Development Agent System

## The Idea

Build a multi-agent system that helps me develop and articulate my aesthetic taste in art. The system should expose me to diverse artworks, help me identify patterns in what I respond to, teach me vocabulary to discuss art, and guide me toward deeper understanding of WHY I like what I like.

**Core Value:** Move from "I know it when I see it" to "I can articulate my aesthetic preferences and discover new work that resonates."

**Personal Goal:** Develop confidence in my artistic taste and the vocabulary to discuss art meaningfully with others.

---

## What I'll Learn

### Technical Skills:
- Implementing **Loop Agent** pattern (iterative refinement over multiple cycles)
- Implementing **Sequential Agent** pattern (structured learning progression)
- Using Google Search to find artwork images and information
- Potentially creating **custom FunctionTools** for pattern recognition
- Managing state across multiple iterations (preference tracking)
- Creating conversational agents that ask reflective questions

### Agent Architecture Skills:
- Designing agents that build on previous interactions
- Creating feedback loops for continuous improvement
- Balancing exploration (new things) vs. exploitation (refinement of known preferences)
- Building agents that prompt human reflection and learning

### Learning Design Skills:
- Creating scaffolded learning experiences
- Designing reflection prompts
- Building progressive curriculum
- Balancing exposure, analysis, and synthesis

---

## Tech Specs & Requirements

### Environment:
- Python 3.12 with virtual environment
- Google ADK installed
- Google API key (Gemini)
- `.env` file for API key storage

### Agent Pattern:
**Hybrid: Loop (weekly cycles) + Sequential (structured phases)**

```
Weekly Loop:
Curator Agent → [User views & reacts] → Reflection Agent → Analysis Agent → Pattern Recognition Agent → [Loop back to Curator with refined parameters]

Monthly Sequential:
Foundation Phase → Breadth Phase → Refinement Phase → Deep Dive Phase
```

### Tools Needed:
- `google_search` tool (for finding artworks and context)
- Custom FunctionTool: `record_preference()` - Saves user reactions
- Custom FunctionTool: `analyze_patterns()` - Identifies preference patterns
- Potentially: Image search or art database API

### Estimated Complexity:
**High** - Requires state management across sessions, custom tools, and thoughtful learning design. May want to start with simpler version first.

---

## How to Build It (Step-by-Step)

### Phase 1: Setup & Foundation (15 minutes)
1. Create project folder: `taste-development-agent/`
2. Copy `.env` from kaggle-5day-genai project
3. Create virtual environment: `python3.12 -m venv venv`
4. Activate venv: `source venv/bin/activate`
5. Install: `pip install google-adk python-dotenv`
6. Create main script: `taste_agent.py`
7. Create data file for tracking: `preferences.json`

### Phase 2: Create Preference Tracking Tool (30 minutes)

Build a custom FunctionTool to save user reactions:

```python
import json
from datetime import datetime
from google.adk.tools import FunctionTool

def record_preference(artwork_info: str, reaction: str, rating: int) -> dict:
    """
    Records user's reaction to an artwork

    Args:
        artwork_info: Description of the artwork (artist, title, style, etc.)
        reaction: User's written reflection on the work
        rating: 1-5 scale of how much they liked it

    Returns:
        Confirmation message
    """
    try:
        # Load existing preferences
        with open('preferences.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {"preferences": []}

    # Add new preference
    data["preferences"].append({
        "timestamp": datetime.now().isoformat(),
        "artwork": artwork_info,
        "reaction": reaction,
        "rating": rating
    })

    # Save
    with open('preferences.json', 'w') as f:
        json.dump(data, f, indent=2)

    return {"status": "saved", "message": f"Recorded reaction to {artwork_info}"}

# Create tool
preference_tool = FunctionTool(record_preference)
```

### Phase 3: Build Curator Agent (30 minutes)

Agent that finds and presents artworks:

```python
from google.adk.agents import Agent
from google.adk.models.google_llm import Gemini
from google.adk.tools import google_search

curator_agent = Agent(
    name="CuratorAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""You are an art curator helping someone develop their taste.

    Your task: Find 5 diverse artworks to share this week.

    Search criteria:
    - Mix of styles (abstract, figurative, photography, sculpture, etc.)
    - Range of time periods (historical, modern, contemporary)
    - Diverse cultural perspectives
    - High-quality, well-known works that have good online images

    For each artwork, provide:
    - Artist name
    - Title
    - Year created
    - Medium/style
    - Brief visual description (colors, composition, subject)
    - Where to view image (museum website or reliable source)

    Present the 5 works without editorial commentary - let the viewer form their own opinion first.

    Search strategy: Use terms like "[artist name] famous works", "contemporary abstract art", etc.
    """,
    tools=[google_search],
    output_key="weekly_artworks"
)
```

**Initial test:** Have curator find 5 diverse artworks.

### Phase 4: Build Reflection Agent (20 minutes)

Agent that asks questions to help articulate reactions:

```python
reflection_agent = Agent(
    name="ReflectionAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""You help people reflect on their reactions to art.

    The user has just viewed these artworks: {weekly_artworks}

    Ask 3-5 thoughtful questions to help them explore their reactions:

    - Which work caught your attention first? What drew your eye?
    - Which work did you spend the most time looking at? Why?
    - Were there any works you had a negative reaction to? What didn't work for you?
    - What patterns do you notice across the works you liked?
    - How did these works make you feel? Any emotional reactions?

    Keep questions open-ended. Be curious, not leading.
    Your goal: Help them put vague feelings into words.
    """,
    output_key="reflection_prompts"
)
```

### Phase 5: Build Analysis Agent (25 minutes)

Agent that breaks down visual elements:

```python
analysis_agent = Agent(
    name="AnalysisAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""You are an art educator teaching visual analysis.

    Based on these artworks: {weekly_artworks}
    And the user's reactions: {user_reflections}

    Provide educational analysis on:

    **Visual Elements to Notice:**
    - Color palette (warm/cool, saturated/muted, contrasts)
    - Composition (balanced/asymmetric, focal points, negative space)
    - Texture and surface quality
    - Scale and proportion
    - Light and shadow

    **Artistic Choices:**
    - What did the artist emphasize?
    - What techniques did they use?
    - How do these choices affect the viewer?

    **Vocabulary:**
    Introduce 3-5 art terms that are relevant to describing these works.

    Keep explanations clear and accessible - no jargon without explanation.
    Relate concepts back to what the user noticed in their reflections.
    """,
    output_key="visual_analysis"
)
```

### Phase 6: Build Pattern Recognition Agent (30 minutes)

Agent that identifies emerging preferences:

```python
pattern_agent = Agent(
    name="PatternRecognitionAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""You analyze patterns in someone's art preferences over time.

    User's reflection this week: {user_reflections}
    Visual analysis: {visual_analysis}

    Look for patterns:
    - Consistent color preferences (bright vs. muted, warm vs. cool)
    - Compositional preferences (structured vs. loose, minimal vs. complex)
    - Subject matter (figurative vs. abstract, representational vs. conceptual)
    - Emotional tone (contemplative, energetic, melancholic, joyful)
    - Scale preferences (intimate vs. monumental)

    Create a "Preference Profile" that captures:
    1. Clear patterns you're seeing (with evidence from their reactions)
    2. Emerging interests (things they're starting to notice)
    3. Possible gaps to explore (styles/periods they haven't engaged with)

    Phrase as observations, not judgments: "You tend to respond to..." not "You should like..."

    End with: "Next week, should I show you more works like [X], or explore [Y]?"
    """,
    output_key="preference_pattern"
)
```

### Phase 7: Build Context Agent (20 minutes)

Agent that provides historical/cultural context:

```python
context_agent = Agent(
    name="ContextAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""You provide context for artworks to deepen understanding.

    For the artworks shown: {weekly_artworks}
    That the user engaged with most: {user_reflections}

    Provide brief context on:
    - Art historical movement/period
    - Cultural context (when/where it was made, what was happening)
    - Artist's intent or philosophy (if known)
    - How this work fits into broader art history

    Keep it concise (2-3 sentences per work).
    Focus on context that might change how someone sees the work.

    End with: "How does knowing this context affect your appreciation of the work?"
    """,
    tools=[google_search],
    output_key="art_context"
)
```

### Phase 8: Create Weekly Loop Agent (25 minutes)

Combine agents into a loop for weekly taste development:

```python
from google.adk.agents import LoopAgent

# Define exit condition
def continue_learning():
    """Exit function if user wants to stop the weekly loop"""
    return {"status": "exit", "message": "Exiting taste development cycle"}

# Create the loop workflow
weekly_loop = LoopAgent(
    name="WeeklyTasteDevelopment",
    sub_agents=[
        curator_agent,       # Find 5 artworks
        # [USER VIEWS AND REFLECTS - happens outside agent]
        reflection_agent,    # Ask reflection questions
        # [USER ANSWERS - happens outside agent]
        analysis_agent,      # Teach visual analysis
        context_agent,       # Provide context
        pattern_agent,       # Recognize patterns
    ],
    max_iterations=4  # Run for 4 weeks, then pause to assess
)
```

**Note:** This loop requires human interaction between agent steps. You'll need to structure it so the agent pauses for your input.

### Phase 9: Create Structured Curriculum (Sequential) (30 minutes)

Build a longer-term sequential learning path:

```python
# Phase 1: Foundation
foundation_agent = Agent(
    name="FoundationAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Teach the fundamentals of visual analysis:
    - Week 1: Color (hue, saturation, temperature, contrast)
    - Week 2: Composition (balance, focal point, negative space)
    - Week 3: Texture and surface
    - Week 4: Light and form

    For each week, find 3 artworks that exemplify the concept clearly.
    Provide simple explanations and practice exercises.
    """,
    tools=[google_search],
    output_key="foundation_curriculum"
)

# Phase 2: Breadth Exploration
breadth_agent = Agent(
    name="BreadthAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Expose the user to diverse art forms:
    Week 5-8: Different mediums (painting, photography, sculpture, installation)
    Week 9-12: Different time periods (Renaissance, Modern, Contemporary)
    Week 13-16: Different cultural perspectives (Western, Asian, African, Indigenous)

    Based on foundation learning: {foundation_curriculum}

    For each period, find representative works and provide context.
    Help identify what resonates across different forms.
    """,
    tools=[google_search],
    output_key="breadth_exposure"
)

# Phase 3: Refinement
refinement_agent = Agent(
    name="RefinementAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Based on emerging preferences: {preference_pattern}

    Deep dive into the styles and artists the user gravitates toward.
    Find:
    - More works by artists they liked
    - Works by similar artists
    - Historical influences on their preferred style
    - Contemporary artists working in that tradition

    Help develop expertise in their areas of interest.
    """,
    tools=[google_search],
    output_key="refined_focus"
)

# Combine into curriculum
curriculum = SequentialAgent(
    name="TasteCurriculum",
    sub_agents=[foundation_agent, breadth_agent, refinement_agent]
)
```

### Phase 10: Create Main Runner (15 minutes)

```python
from google.adk.runners import InMemoryRunner
import asyncio

async def run_weekly_cycle():
    """Run one week of taste development"""
    runner = InMemoryRunner(agent=weekly_loop)

    print("🎨 Weekly Taste Development Cycle\n")
    print("=" * 60)

    # Run the curator
    result = await runner.run_debug("Find 5 diverse artworks for this week")

    print("\n📌 Please view the artworks and reflect on your reactions.")
    print("Then, record your thoughts and we'll continue the analysis.\n")

    # [Human interaction happens here]
    # In a full implementation, you'd prompt for user input

    return result

async def run_full_curriculum():
    """Run the full structured curriculum"""
    runner = InMemoryRunner(agent=curriculum)

    print("🎓 Starting Full Taste Development Curriculum\n")
    result = await runner.run_debug("Guide me through developing my artistic taste over 16 weeks")

    return result

if __name__ == "__main__":
    # Choose which mode to run
    asyncio.run(run_weekly_cycle())
    # OR
    # asyncio.run(run_full_curriculum())
```

### Phase 11: Testing & Iteration (Ongoing)

**Test each component:**
1. Curator finds diverse, quality artworks
2. Reflection questions are open-ended and helpful
3. Analysis agent teaches without overwhelming
4. Pattern agent accurately identifies preferences
5. Context adds meaningful understanding

**Iterate based on use:**
- Adjust curator to find better quality sources
- Refine reflection questions based on what's helpful
- Add more vocabulary to analysis agent
- Improve pattern recognition over multiple weeks

---

## Simplified MVP Version

If the full system is too complex to start, build this simpler version first:

### Simple Weekly Agent (No Loop, No State)

```python
taste_discovery_agent = Agent(
    name="TasteDiscovery",
    model=Gemini(model="gemini-2.5-flash-lite"),
    instruction="""You help someone explore their taste in art.

    Step 1: Find 3 artworks in different styles
    Step 2: Ask: Which catches your eye? What do you notice?
    Step 3: Based on their answer, explain what visual elements might be appealing
    Step 4: Suggest similar artworks to explore

    Keep it conversational and accessible.
    """,
    tools=[google_search],
)
```

**Run this for a few weeks manually before building the full system.**

---

## Testing Checklist

- [ ] Curator finds diverse, high-quality artworks
- [ ] Reflection questions help articulate vague feelings
- [ ] Analysis agent teaches visual vocabulary effectively
- [ ] Pattern recognition identifies real preferences (not made up)
- [ ] Context adds depth without overwhelming
- [ ] Weekly loop flows smoothly
- [ ] Preference tracking saves and loads correctly
- [ ] System adapts based on recorded preferences

---

## Success Criteria

**Minimum Viable Product:**
- Curator finds 5 artworks weekly
- Reflection agent asks 3-5 helpful questions
- System helps me notice and articulate reactions

**Fully Functional:**
- All agents work together smoothly
- Pattern recognition identifies real trends over 3-4 weeks
- Visual analysis vocabulary is useful and accessible
- Context enriches understanding without lecturing

**Stretch Goals:**
- Preference learning improves curation over time
- Can export "Taste Profile" as shareable document
- Integrates with museum websites or art databases
- Generates personalized "artist discovery" recommendations

---

## Estimated Time to Build

- **Simplified MVP:** 2-3 hours
- **Weekly Loop version:** 5-6 hours
- **Full Curriculum version:** 10-12 hours
- **With preference tracking and refinement:** 15+ hours

**Recommendation:** Start with simplified MVP, use it for 2-3 weeks, then build more sophisticated version based on what you learn.

---

## Future Enhancements

1. **Museum Integration** - Pull from museum APIs (Met, Rijksmuseum, Art Institute Chicago have public APIs)
2. **Image Analysis** - Use vision models to analyze artworks directly
3. **Comparison Mode** - "Here are two works - what's similar, what's different?"
4. **Artist Deep Dives** - Full agent dedicated to exploring one artist's body of work
5. **Social Sharing** - Share your taste profile or favorite works
6. **Exhibition Recommender** - Based on taste profile, recommend exhibitions to attend
7. **Art History Tutor** - Dedicated sequential agent for learning art history
8. **Style Transfer** - Show how same subject looks in different styles you like

---

## Related Learning

- **Day 1b: Loop Pattern** - Core architecture for weekly cycles
- **Day 1b: Sequential Pattern** - Structure for curriculum
- **Day 2: Memory/Context** (upcoming) - Store preferences across sessions
- **Custom Tools** - Building FunctionTools for preference tracking

---

## Teaching Insight (Meta-Reflection)

This project demonstrates **scaffolded learning design through agents**:
- Exposure → Reflection → Analysis → Synthesis
- Low-stakes exploration → Pattern identification → Deep expertise
- Human-in-the-loop design (not fully automated - requires engagement)

Could this same structure work for other domains?
- Developing taste in music, film, food, design?
- Building expertise in any aesthetic domain?
- Teaching any subjective skill (writing style, product taste, etc.)?

The agent architecture mirrors good teaching:
- **Curator** = Exposure to examples
- **Reflection** = Metacognition prompts
- **Analysis** = Explicit vocabulary/framework
- **Pattern Recognition** = Formative assessment
- **Context** = Situated learning

---

## Notes & Reflections

_Use this space to capture insights as you build and use the system_

