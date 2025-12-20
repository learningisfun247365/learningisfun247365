# Claude Code Mastery Roadmap

**Project:** Building "Art in Context" - An interactive art history timeline
**Goal:** Master Claude Code through hands-on learning while creating something meaningful

---

## Overview

This is a step-based learning journey (not week-based). Some steps will take a few hours, others might take several days. The key is to complete each step thoroughly before moving to the next.

**Learning Philosophy:**
- ✅ Master fundamentals before advanced features
- ✅ Use before configure
- ✅ Learn by building something real
- ✅ Document everything for others to follow

---

## Foundations Phase

### **Step 1: Prompt Engineering Basics**
📁 `foundations/step-01-prompt-engineering/`

**Why this first:** Everything else depends on knowing how to communicate with Claude effectively.

**Learning Objectives:**
- [ ] Understand how Claude interprets prompts
- [ ] Learn XML tag structure for organizing prompts
- [ ] Write clear instructions with context and examples
- [ ] Use few-shot learning (providing examples)
- [ ] Compare lazy vs. well-structured prompts

**Exercises:**
- Analyze an artist's work using different prompt styles
- Create prompts to extract specific information from text
- Use XML tags to structure a complex request
- Provide examples to guide Claude's output format

**Success Criteria:**
- Can explain why one prompt is better than another
- Can use XML tags to organize complex prompts
- Can provide effective examples in prompts

**Resources:**
- Anthropic's Prompt Engineering Guide
- Your own prompt experiments and results

---

### **Step 2: Claude Code Basics & Workflow**
📁 `foundations/step-02-claude-code-basics/`

**Why this matters:** Understanding how Claude Code works before trying to configure it.

**Learning Objectives:**
- [ ] Understand what Claude Code can do (read, edit, run commands)
- [ ] Learn the iterative conversation workflow
- [ ] Provide context effectively (files, error messages)
- [ ] Break down complex tasks into steps
- [ ] Use advanced prompting (chain of thought, role assignment)

**Exercises:**
- Use Claude Code to analyze a code file
- Ask Claude Code to make edits to a file
- Work iteratively to solve a problem
- Practice breaking down a complex task

**Success Criteria:**
- Can work iteratively with Claude Code to solve problems
- Understands when to provide more context
- Can break complex tasks into manageable pieces

**Key Tools:**
- Terminal basics (cd, ls, mkdir)
- Git basics (add, commit, push, branch, PR)

---

### **Step 3: Configuration - Rules, Commands & Memory**
📁 `foundations/step-03-configuration/`

**Why now:** You've used Claude Code enough to know what you want to customize.

**Learning Objectives:**
- [ ] Create custom rules for coding style/preferences
- [ ] Write slash commands for common tasks
- [ ] Set up context files for project-specific information
- [ ] Give Claude Code "memory" about your preferences

**Exercises:**
- Create a .clauderc file with your preferences
- Write a slash command for git workflows
- Create context files about your project
- Document your configuration choices

**Success Criteria:**
- Have a configured Claude Code workspace
- Can write custom slash commands
- Understand how Claude Code uses context files

**Resources:**
- [Product Talk: Give Claude Code a Memory](https://www.producttalk.org/give-claude-code-a-memory/)
- Claude Code documentation

---

## Project Build Phase

### **Step 4: Working with APIs - MET Museum Data**
📁 `project-build/step-04-met-api/`

**The build begins:** Start creating your art history tool.

**Learning Objectives:**
- [ ] Understand REST APIs
- [ ] Make API calls (fetch/requests)
- [ ] Parse JSON responses
- [ ] Handle errors and edge cases
- [ ] Save and structure data

**Project Tasks:**
- Explore the MET Museum API
- Write a script to fetch artist data
- Fetch artwork information
- Save sample data for analysis
- Use Claude Code to help write and debug the code

**Success Criteria:**
- Working Python script that fetches MET API data
- Understand the data structure
- Can handle API errors gracefully

**Deliverable:** `met_api_explorer.py` + sample data files

---

### **Step 5: Data Enrichment - Adding Historical Context**
📁 `project-build/step-05-data-enrichment/`

**The intelligence layer:** Use Claude to enrich your data.

**Learning Objectives:**
- [ ] Process and clean API data
- [ ] Use Claude API to generate context
- [ ] Apply prompt engineering skills to data tasks
- [ ] Handle batch processing
- [ ] Structure enriched data

**Project Tasks:**
- Clean and structure MET API data
- Write prompts to generate historical context for artists
- Place artists in cultural/political movements
- Identify influences and connections
- Store enriched data in JSON format

**Success Criteria:**
- Cleaned dataset with consistent structure
- AI-generated historical context for each artist
- Proper error handling for missing data

**Deliverable:** Enriched artist dataset with historical context

---

### **Step 6: Visualization - Building the Timeline**
📁 `project-build/step-06-visualization/`

**Make it visual:** Create an interactive timeline interface.

**Learning Objectives:**
- [ ] Basic HTML/CSS/JavaScript (with Claude's help)
- [ ] Display timeline data visually
- [ ] Add interactivity (filtering, detail views)
- [ ] Use Claude Code for front-end development

**Project Tasks:**
- Create HTML structure for timeline
- Style with CSS
- Add JavaScript for interactivity
- Display artist data on timeline
- Add filtering by time period/movement
- Create detail views for artists

**Success Criteria:**
- Working timeline visualization (local)
- Can filter and interact with data
- Clean, readable interface

**Deliverable:** Interactive timeline viewer

---

### **Step 7: Deployment - Going Public**
📁 `project-build/step-07-deployment/`

**Ship it:** Make your project publicly accessible.

**Learning Objectives:**
- [ ] Deploy to GitHub Pages
- [ ] Write comprehensive documentation
- [ ] Create user guides
- [ ] Clean up and refactor code

**Project Tasks:**
- Set up GitHub Pages
- Deploy your application
- Write project README
- Create user documentation
- Take screenshots/record demo
- Code cleanup and refactoring

**Success Criteria:**
- Live, publicly accessible website
- Comprehensive documentation
- Clean, well-organized code

**Deliverable:** Public "Art in Context" website + polished repo

---

## Advanced Phase

### **Step 8: Skills - Packaging Reusable Capabilities**
📁 `advanced/step-08-skills/`

**Level up:** Create Skills from your best prompts.

**Learning Objectives:**
- [ ] Understand what Skills are in Claude Code
- [ ] Identify prompts worth packaging as Skills
- [ ] Create custom Skills
- [ ] Document when to use which Skill

**Project Tasks:**
- Review your best prompts from the project
- Create a "Analyze Artist Context" Skill
- Create a "Generate Timeline Entry" Skill
- Document your Skills

**Success Criteria:**
- 2-3 working custom Skills
- Clear documentation on when to use each
- Skills are genuinely useful and reusable

**Optional:** Explore MCP (Model Context Protocol) if you need external data sources

---

### **Step 9: Optimization & Reflection**
📁 `advanced/step-09-optimization/`

**Polish & learn:** Optimize and document your journey.

**Learning Objectives:**
- [ ] Understand token usage and costs
- [ ] Optimize prompt efficiency
- [ ] Model selection strategies
- [ ] Reflect on what you learned

**Project Tasks:**
- Analyze token usage across your project
- Optimize expensive prompts
- Consider caching strategies
- Document lessons learned
- Extract reusable templates

**Success Criteria:**
- Reduced token costs where possible
- Clear understanding of cost/performance trade-offs
- Documented lessons for others

**Deliverable:** Optimization report + lessons learned document

---

## Sharing Your Journey

### **Step 10: Documentation & Substack Series**
📁 Root directory

**Give back:** Package your learning for others.

**Final Objectives:**
- [ ] Write "How I Built This" Substack series
- [ ] Create reusable templates from your work
- [ ] Extract key lessons and tips
- [ ] Make it easy for others to follow

**Deliverables:**
- 3-5 Substack posts covering your journey
- Reusable prompt templates
- Starter kit for others
- Reflection on what you learned

---

## How to Use This Roadmap

1. **Complete steps sequentially** - Each builds on previous knowledge
2. **Don't rush** - Some steps take hours, others take days
3. **Document as you go** - Your learning journey helps others
4. **Use the exercises** - Hands-on practice is essential
5. **Commit your work** - Build a public record on GitHub
6. **Reflect after each step** - What worked? What didn't? What surprised you?

---

## Success Metrics

By the end, you will have:
- ✅ Strong foundation in prompt engineering
- ✅ Comfort with Claude Code workflow and configuration
- ✅ Working knowledge of APIs and data processing
- ✅ A complete, deployed project
- ✅ Reusable Skills and templates
- ✅ A documented learning journey others can follow
- ✅ Portfolio piece demonstrating AI + coding skills

**Next:** Start with [Step 1: Prompt Engineering Basics](foundations/step-01-prompt-engineering/README.md)
