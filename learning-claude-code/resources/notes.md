# Claude Code Learning Notes

*A running log of what I'm learning about using Claude Code*

---

## Key Concepts

### claude.md Files
- these markdown files provide project specific context to claude code 
- **when to use?**
  - Complex projects with specific conventions
  - Frequently-used projects where you want consistent behavior
  - Team projects with shared standards
  - Projects with non-standard structure
- I created a template [claude-template.md](claude-template.md). Categories to include:
  - **Claude's Role**: Define the key behaviors of you want claude to be - tutor, developer, etc. 
  - **My role**: What does claude need to know about me for this work - what I know, what my gaps are, my goals (it's helpful)
  - **Project Structure**: what is the folder structure, what are the key files? 
  - **tech stack / tools**: what tech is being used (python, nextjs, Requests library for API calls, etc.)
  - **communication preferences**: hugggge! My preferences always include
    - I appreciate structure and frameworks
    - Help me see the big picture before diving into details
    - When explaining complex topics, use analogies and metaphors
    - Challenge my assumptions 
  - **specific rules and workflows**: this is what's unique to each project. I think this is where you need to really think in advance of the guidelines Claude should always follow. F
    - When [doing task X]: follow THIS rule, THAT rule, etc. 
    - Don't do this - what behaviors to avoid. *This is very powerful* - it frustrates patterns.
  - **current focus** - I hadn't thought aboutthis before but you need to referance this file consistently and this section should change as your project evolves. Keep this up to date! This way - claude doesn't have to constantly rescan to see where you are in the project. 
  - **succcess**: what does success look like for this project?
  - **references**: Links to docs, style guides, examples Claude should reference
- you don't need to start and fill it out completely. Fill it in as you go along - and you can ask claude to help as well


### Project Organization
- Keep reference materials organized and consolidated
- Remove duplicate content across files
- Use cross-references between related docs

---

## Tips & Tricks

*Add your discoveries here as you learn...*

---

## Questions to Explore

- [ ] I want a claude.md for my entire workspace - but I don't know if I need one. 
- [ ]

---

## Useful Resources

- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- Project-specific claude.md files in my repos
