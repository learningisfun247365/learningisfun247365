# Obsidian + Claude Code: Weekly Reflection Workflow

**Problem Solved:** Weekly reflection synthesis was always overwhelming - reviewing 7 days of scattered notes, trying to spot patterns while reading linearly, formatting everything properly. Manual synthesis = procrastination = incomplete reflections.

**Solution:** Claude Code skill that scans both reflection notes AND active workspace to surface patterns, connections, and questions as prompts for synthesis.

---

## How It Works

### Daily Capture (Monday-Saturday)
- Write daily observations in Obsidian weekly reflection file
- No structure required - just capture what happened, what you read, questions, links
- Link to ideas/notes with `[[wikilinks]]` as you go
- Keep it raw - synthesis happens Sunday

### Sunday Synthesis (The New Way)
1. **Run the skill:** `/weekly-synthesis` (or invoke via Claude Code)
2. **Review patterns:** Skill surfaces:
   - Recurring themes across the week
   - Questions you asked yourself
   - Ideas you referenced repeatedly
   - Reading themes
   - Work vs. reflection (what you did vs. what you thought about)
   - Cross-domain connections
   - Unfinished threads
3. **Do the synthesis:** Use those prompts to write your own synthesis
   - What you learned
   - Patterns you're noticing
   - Questions emerging
   - Connections made
   - Next week's focus

**Key:** The skill doesn't write the synthesis - it helps you SEE what's there so you can do the thinking work.

---

## Why This Works

### Before (Manual Synthesis)
- Scroll through week's notes linearly
- Try to remember what happened when
- Miss patterns because you're reading day-by-day
- Get overwhelmed by volume
- Skip synthesis or do it half-heartedly
- Formatting takes forever

### Now (Skill-Assisted)
- Skill reads all days simultaneously
- Surfaces patterns you'd miss
- Shows connections between reflection and actual work
- Presents structured prompts
- You just respond to prompts with your synthesis
- Focus on thinking, not searching

---

## What The Skill Analyzes

### In Obsidian Vault
- `/obsidian-vault/05 Reflections/[week].md` - your weekly reflection file
- Daily Notes & Observations sections
- Links shared
- `[[wikilinks]]` to ideas/notes
- Questions (explicit or implied with `?`)
- Books, articles, media mentioned

### In maria-reference-brain Workspace
- `/learningisfun247365/` - active projects and work
- Recently modified files (within the week)
- New documents created
- Topics being worked on
- Connection points to reflection content

### Output: Structured Prompts
- Recurring themes (with context)
- Questions you posed (grouped if recurring)
- Ideas referenced (frequency + context)
- Reading themes
- Cross-domain connections
- Work vs. reflection alignment/gaps
- Unfinished threads to carry forward

---

## File Structure

```
obsidian-vault/
└── 05 Reflections/
    ├── 11.10.25-11.16.25.md    # Previous week
    └── 11.17.25-11.23.25.md    # Current week

.claude/
└── skills/
    └── weekly-synthesis/
        └── SKILL.md             # Skill definition
```

---

## Weekly Reflection Template

Daily structure:
```markdown
# Monday 11.17.25

### **Notes & Observations**
[Raw capture - thoughts, events, links to ideas, questions]

### **Links**
- [articles, resources, etc.]
```

Sunday structure:
```markdown
## Sunday - Weekly Synthesis

### **What I Learned This Week**
### **Ideas Developed**
### **Patterns I'm Noticing**
### **Questions Emerging**
### **Connections Made**
### **Next Week's Focus**
```

---

## When to Use This

**Every Sunday** - Before writing your synthesis:
1. Ensure week's daily notes are saved
2. Run `/weekly-synthesis` skill
3. Review the patterns/prompts it surfaces
4. Write your synthesis in response to those prompts

**Why Sunday?**
- Week's observations are complete
- Pattern recognition needs full week's data
- Synthesis informs next week's focus
- Creates closure before starting new week

---

## Learning Principles at Play

This workflow respects how learning actually works:

1. **Capture ≠ Synthesis**
   - Daily: Low-friction capture (no pressure to make sense yet)
   - Sunday: Structured synthesis (with pattern support)

2. **Pattern Recognition Requires Distance**
   - Hard to see patterns while in the weeds daily
   - Sunday perspective + AI scanning = patterns visible

3. **The Learning Is in the Synthesis**
   - Skill surfaces observations (pattern recognition)
   - You make meaning (synthesis = learning)
   - Tool supports, doesn't replace, thinking

4. **Reduce Friction, Not Thinking**
   - Removed: Searching notes, remembering details, formatting
   - Kept: Making connections, noticing patterns, synthesizing meaning

---

## Future Iterations

**Potential enhancements:**
- Track ideas over multiple weeks (trajectory analysis)
- Connection to fleeting notes processing
- Reading log integration
- Substack content mining (themes across reflections)

**What NOT to add:**
- Auto-writing synthesis (defeats the purpose)
- Conclusions or interpretations (that's your work)
- Motivation/productivity tracking (not the point)

---

## Related Workflows

- **Daily capture:** Keep it raw, don't overthink
- **Idea development:** Link to `[[ideas]]` from reflections
- **Fleeting notes processing:** Sunday includes processing fleeting notes mentioned during week
- **Substack writing:** Mine reflections for content themes

---

## Key Insight

**The problem wasn't that synthesis was hard - it was that manual scanning was tedious and incomplete.**

Pattern recognition across 7 days of notes is exactly what AI is good at. The synthesis (making meaning from patterns) is exactly what YOU are good at.

Use each for what it does best.

---

**Last updated:** 2025-11-17
**Location:** `.claude/skills/weekly-synthesis/`
