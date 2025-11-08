# Workspace Organization & Claude Setup - Nov 7, 2025

## What I Learned

Today was all about setting up my Claude Code workspace properly and understanding how to configure it for my workflow.

**Key discovery:** Structure matters. Not all folders are equal - there's a difference between active projects, reference materials, and tool configuration. Mixing them creates cognitive friction.

### Claude.md Files
These are project-specific context files that tell Claude how to work with you on a specific project or workspace. They're optional but powerful when used right.

**When to create one:**
- Complex projects with specific conventions
- Projects you work on frequently where you want consistent Claude behavior
- Team projects with shared standards
- Non-standard project structures

**Key sections to include:**
- **Claude's Role** - Define behaviors (tutor, developer, collaborator)
- **About Me** - What Claude needs to know about MY context (expertise, gaps, goals)
- **Project Structure** - Folder layout, key files
- **Tech Stack/Tools** - What you're using (Python, Next.js, etc.)
- **Communication Preferences** - HUGE. How you want Claude to talk to you
- **Specific Rules & Workflows** - Project-specific guidelines Claude should always follow
- **Current Focus** - Keep this updated so Claude knows where you are
- **Success Criteria** - What does good output look like?
- **References** - Links to docs, style guides, examples

**Pro tip:** Don't try to fill it out completely upfront. Build it as you go and let Claude help.

### claude.md vs settings.local.json

**settings.local.json** = Tool configuration
- Controls Claude's technical behavior and permissions
- Defines which bash commands Claude can run without asking
- JSON format, lives in `.claude/` folder
- Example: "Claude can run find, rm, cd without permission"

**claude.md** = Context and instructions
- Tells Claude HOW to work with you
- Natural language (markdown)
- Lives at project root
- Example: "When refactoring, always ask before deleting files"

**The analogy:** settings.local.json is the security guard at the door (what's allowed), claude.md is the onboarding document (how to do the work).

### Workspace Architecture

The `.claude/` folder is for Claude Code-specific infrastructure ONLY:
- `settings.local.json` - Tool permissions
- `commands/` - Slash commands (custom prompts you create as .md files)
- Templates and configuration

**What belongs:**
- Settings for Claude Code behavior
- Custom slash commands
- Templates for project configs

**What doesn't belong:**
- General dev reference materials
- Project code
- Anything you'd still need if you stopped using Claude Code

**Slash commands** are custom prompts stored as markdown files:
- Create: `.claude/commands/mycommand.md`
- Invoke: Type `/mycommand` in Claude Code
- Use for: Repetitive workflows, custom prompts, project-specific actions

**Agents vs Skills:**
- Agents are built into Claude Code (Explore, Plan) - invoked through conversation
- Skills are advanced capabilities - also invoked, not created as files
- You don't create these - they're part of Claude Code itself

## Key Insights

- **Mental models matter**: When your folder structure doesn't match your mental model of how things relate, you waste cognitive energy
- **The test for .claude**: Would I still need this if I stopped using Claude Code tomorrow? If yes, it doesn't belong in `.claude`
- **Start simple**: Don't over-engineer. Create structure when you feel friction, not preemptively
- **Communication preferences are powerful**: Defining how Claude should communicate with you (frameworks, big picture first, challenge assumptions) dramatically improves the working relationship

## Questions/Confusion

- ~~How do agents work in Claude Code?~~ ✅ Answered - they're built-in, invoked through conversation
- How do I know when a project is complex enough to warrant its own claude.md?
- What's the difference between a slash command and just asking Claude to do something?

## What I Built/Did

**Reorganized workspace:**
```
projects/
  .claude/              # Claude Code infrastructure
    settings.local.json
    claude-template.md
  _reference/           # Reference materials (not projects!)
    terminal-stuff/
      terminal-basics.md
      git-basics.md
      dev_workflow_guide.md
  learning-field-guide/ # Active projects
  learningisfun247365/
  writingworkspace/
  claude.md            # Workspace-level config
```

**Created:**
- Workspace-level `claude.md` with my communication preferences, context, and goals
- `claude-template.md` in `.claude/` for creating project-specific configs
- `notes.md` in learning-claude-code/resources for ongoing learning
- Cleaned up `learning_out_loud` folder (removed duplicates, consolidated terminal docs)

**The organizing principle:**
- `.claude/` = How Claude Code works
- `_reference/` = Knowledge for dev work
- Root level = Active projects

## For Substack

💡 **"Your IDE's Onboarding Document: Why claude.md Files Changed How I Code"**
- The problem: Context switching between projects is expensive
- claude.md as persistent context that travels with your project
- The communication preferences section is underrated
- Template approach: fill in as you go, not upfront

💡 **"Three Folders That Killed My Productivity (And How I Fixed It)"**
- The friction of mixed mental models in folder structure
- Active projects vs reference materials vs infrastructure
- The underscore prefix trick for signaling "not a project"
- System thinking applied to workspace organization

💡 **"Building in Public: A Learning Log Architecture"**
- Session-based capture (not forced daily)
- Date + topic naming for searchability
- Mining for content vs creating content
- GitHub-ready from day one

---

*Session time: ~3 hours | Key win: Workspace now matches my mental model*
