# Atlanta Arts Scene Discovery Agent

## The Idea

Build a multi-agent system that keeps me informed about Atlanta's arts scene - exhibitions, gallery openings, performances, artist talks, and community events. The system should search multiple sources, filter by my preferences, and deliver a curated weekly digest with actionable information (dates, times, ticket links).

**Core Value:** Never miss interesting arts events because I didn't know they were happening.

**Personal Goal:** Build deeper connection with Atlanta's arts community by staying informed and attending more events.

---

## What I'll Learn

### Technical Skills:
- Implementing **Parallel Agent** pattern (multiple researchers running simultaneously)
- Implementing **Sequential Agent** pattern (research → filter → summarize → format pipeline)
- Using Google Search tool in multiple agents
- Coordinating data from multiple agents into unified output
- Working with dates/times/locations in agent outputs
- Creating formatted output (markdown, email-friendly)

### Agent Architecture Skills:
- Designing specialized agents with clear responsibilities
- Managing data flow between agents (output_key usage)
- Deciding when to use parallel vs. sequential patterns
- Building agents that work together as a system

### Practical Skills:
- Web searching for events programmatically
- Filtering and ranking information
- Creating useful summaries that drive action
- Scheduling agent runs (potentially weekly automation)

---

## Tech Specs & Requirements

### Environment:
- Python 3.12 with virtual environment
- Google ADK installed
- Google API key (Gemini)
- `.env` file for API key storage

### Agent Pattern:
**Hybrid: Parallel → Sequential**

```
[Parallel Research Team]
├── Event Finder Agent
├── Venue Monitor Agent
├── Artist Spotlight Agent
└── Community Agent

↓ (all outputs go to Sequential pipeline)

[Sequential Processing Pipeline]
Event Finder → Filter Agent → Summarizer Agent → Formatter Agent → Output
```

### Tools Needed:
- `google_search` tool (built into ADK)
- Potentially custom date parsing function
- Potentially custom filtering function (if needed as FunctionTool)

### Tool Documentation Example:

For the `search_atlanta_arts_events` tool used by research agents:

```python
google_search_tool = {
    "name": "search_atlanta_arts_events",
    "description": "Search for information about art events, exhibitions, and performances in Atlanta. Use this tool to find current and upcoming events at galleries, museums, and community venues.",
    "parameters": {
        "query": {
            "type": "string",
            "description": "The search query. Examples: 'Atlanta art exhibitions this week', 'High Museum current shows', 'Atlanta gallery openings November 2025'",
            "required": True
        },
        "location": {
            "type": "string",
            "description": "Geographic focus. Default: 'Atlanta, GA'. Helps narrow results to metro area only.",
            "default": "Atlanta, GA",
            "required": False
        },
        "max_results": {
            "type": "integer",
            "description": "Maximum number of results to return. Default: 5. Keep this low (3-10) to avoid overwhelming output.",
            "default": 5,
            "required": False
        }
    },
    "output": {
        "type": "array",
        "description": "List of events with: event name, venue, date/time, description, and URL if available"
    },
    "error_guidance": "If no results found, try: (1) Broader search terms like 'Atlanta art events', (2) Search by specific venue name, (3) Try 'free art events Atlanta' for community events"
}
```

**Why this works:**
- **Clear name** — `search_atlanta_arts_events` instead of generic `google_search`
- **Specific examples** in parameter descriptions so the model knows what queries to use
- **Default values** documented (location, max_results)
- **Concise output** guidance to prevent swamping context
- **Error recovery** suggestions to help the model retry intelligently

### Estimated Complexity:
**Medium** - Combines two patterns, but uses existing ADK tools. Main challenge is crafting good agent instructions for consistent output format.

---

## How to Build It (Step-by-Step)

### Phase 1: Setup & Foundation (15 minutes)
1. Create project folder: `atlanta-arts-agent/`
2. Copy `.env` from kaggle-5day-genai project (or create new with API key)
3. Create virtual environment: `python3.12 -m venv venv`
4. Activate venv: `source venv/bin/activate`
5. Install: `pip install google-adk python-dotenv`
6. Create main script: `arts_scene_agent.py`

### Phase 2: Build Individual Research Agents (30 minutes)

**Create 4 specialized agents, each with google_search tool:**

#### Agent 1: Event Finder
```python
event_finder = Agent(
    name="EventFinder",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Search for upcoming art exhibitions and gallery openings in Atlanta.
    Focus on events happening in the next 2 weeks.
    For each event, try to find: event name, venue, dates, brief description.
    Search terms to try: "Atlanta art exhibition", "gallery opening Atlanta", "art show Atlanta"
    """,
    tools=[google_search],
    output_key="event_findings"
)
```

#### Agent 2: Venue Monitor
```python
venue_monitor = Agent(
    name="VenueMonitor",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Check specific Atlanta art venues for current and upcoming exhibitions:
    - High Museum of Art
    - MOCA GA (Museum of Contemporary Art of Georgia)
    - Atlanta Contemporary
    - Whitespace Gallery

    For each venue, find: current exhibition, dates, any special events.
    """,
    tools=[google_search],
    output_key="venue_findings"
)
```

#### Agent 3: Artist Spotlight
```python
artist_spotlight = Agent(
    name="ArtistSpotlight",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Search for artist talks, studio visits, and artist-led events in Atlanta.
    Look for: artist presentations, open studios, artist workshops, gallery talks.
    Include artist name, event type, location, date.
    """,
    tools=[google_search],
    output_key="artist_findings"
)
```

#### Agent 4: Community Events
```python
community_agent = Agent(
    name="CommunityAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Search for Atlanta arts community events:
    - Art walks (like Castleberry Hill Art Stroll)
    - Art festivals
    - Public art installations
    - Free community art events

    Focus on accessible, community-oriented events.
    """,
    tools=[google_search],
    output_key="community_findings"
)
```

**Test each agent individually** to make sure they return useful results.

### Phase 3: Build Parallel Research Team (15 minutes)

Combine the 4 research agents into a ParallelAgent:

```python
from google.adk.agents import ParallelAgent

research_team = ParallelAgent(
    name="ArtsResearchTeam",
    sub_agents=[event_finder, venue_monitor, artist_spotlight, community_agent]
)
```

**Test:** Run the parallel team and verify all 4 outputs are captured.

### Phase 4: Build Filter Agent (20 minutes)

Create an agent that filters and prioritizes findings:

```python
filter_agent = Agent(
    name="FilterAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Review these arts findings:
    Events: {event_findings}
    Venues: {venue_findings}
    Artists: {artist_findings}
    Community: {community_findings}

    Remove:
    - Past events
    - Duplicate listings
    - Events outside Atlanta metro area

    Prioritize:
    - Free or low-cost events
    - Events at major venues (High Museum, MOCA GA)
    - Artist talks and interactive events

    Create a filtered list with the most relevant 10-15 events.
    """,
    output_key="filtered_events"
)
```

### Phase 5: Build Summarizer Agent (15 minutes)

Create an agent that creates a readable weekly digest:

```python
summarizer_agent = Agent(
    name="SummarizerAgent",
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    instruction="""Create a weekly arts digest from these filtered events: {filtered_events}

    Format as:
    # Atlanta Arts This Week

    ## Must-See Exhibitions
    [List top 3-5 exhibitions with venue, dates, brief description]

    ## Artist Events
    [List artist talks, studio visits with details]

    ## Community Events
    [List art walks, festivals, free events]

    ## Quick Calendar
    [Chronological list of all events by day]

    For each event include:
    - Event name
    - Venue/Location
    - Date and time
    - Brief description
    - Link (if available)

    Keep descriptions concise but engaging.
    """,
    output_key="weekly_digest"
)
```

### Phase 6: Combine into Sequential Pipeline (10 minutes)

```python
from google.adk.agents import SequentialAgent

# Combine parallel research with sequential processing
full_pipeline = SequentialAgent(
    name="ArtsDigestSystem",
    sub_agents=[
        research_team,      # Parallel: all 4 researchers run at once
        filter_agent,       # Sequential: filter the results
        summarizer_agent    # Sequential: create final digest
    ]
)
```

### Phase 7: Create Runner and Test (10 minutes)

```python
from google.adk.runners import InMemoryRunner
import asyncio

async def main():
    runner = InMemoryRunner(agent=full_pipeline)

    print("🎨 Generating Atlanta Arts Scene Digest...\n")

    result = await runner.run_debug("Create this week's Atlanta arts digest")

    print("\n✅ Digest complete!")

if __name__ == "__main__":
    asyncio.run(main())
```

**Run and test:** `python3 arts_scene_agent.py`

### Phase 8: Refinement (Ongoing)

**Iterate based on results:**

1. **If searches are too broad:** Refine agent instructions with more specific search terms
2. **If missing important venues:** Add them to Venue Monitor instructions
3. **If output is too long:** Adjust filter agent to be more selective
4. **If formatting is off:** Tweak summarizer instructions

**Potential enhancements:**
- Save digest to markdown file instead of just printing
- Email the digest to yourself
- Add a custom filter function for specific preferences (FunctionTool)
- Track which events you actually attend (feedback loop)
- Add price information filtering

---

## Testing Checklist

- [ ] Each research agent returns relevant results
- [ ] Parallel team runs all 4 agents simultaneously
- [ ] Filter agent successfully removes duplicates and past events
- [ ] Summarizer creates well-formatted, actionable digest
- [ ] Full pipeline runs without errors
- [ ] Output includes dates, times, venues, links
- [ ] Events are actually in Atlanta metro area
- [ ] Events are actually upcoming (not past)

---

## Success Criteria

**Minimum Viable Product:**
- System runs without errors
- Returns 10-15 relevant Atlanta arts events
- Output is readable and includes key details (date, venue, description)

**Fully Functional:**
- All 4 research agents return quality results
- Filter removes noise effectively
- Digest is well-formatted and actionable
- Events are current and relevant

**Stretch Goals:**
- Automated weekly runs (cron job or scheduled task)
- Email delivery of digest
- Track attendance and refine based on preferences
- Add calendar integration (export to Google Calendar)

---

## Estimated Time to Build

- **MVP (basic working version):** 2-3 hours
- **Polished version:** 4-5 hours (including testing and refinement)
- **With enhancements:** 6-8 hours

---

## Future Enhancements

1. **Preference Learning** - Add LLM Orchestrator that learns which types of events you attend
2. **Calendar Integration** - Export events to Google Calendar
3. **Price Filtering** - Prioritize free events or events under $20
4. **RSVP Tracking** - Track which events you mark as "interested"
5. **Social Features** - Find friends who are attending same events
6. **Notification System** - Push notifications for high-priority events
7. **Archive** - Save past digests to see what you attended over time

---

## Related Learning

- **Day 1b Multi-Agent Patterns** - Uses Parallel + Sequential combination
- **Day 2: Memory Management** (upcoming) - Could store preference history
- **Day 3: Advanced Patterns** (upcoming) - Could add feedback loops

---

## Notes & Reflections

_Use this space to capture insights as you build_

Need to make sure that the tool is well documented
