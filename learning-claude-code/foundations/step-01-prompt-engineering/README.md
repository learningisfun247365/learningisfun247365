# Step 1: Prompt Engineering Basics

**Why this first:** Everything you do with Claude depends on how well you can communicate with it. Good prompting is the foundation of everything else.

---

## Learning Objectives

By the end of this step, you should be able to:

- [ ] Explain what makes a prompt effective
- [ ] Use XML tags to structure complex prompts
- [ ] Provide clear context and instructions
- [ ] Use examples to guide Claude's output
- [ ] Compare your lazy prompts vs. well-structured ones

---

## Key Concepts

### **1. Anatomy of a Good Prompt**

A good prompt has:
- **Clear context** - What is this about?
- **Specific task** - What do you want Claude to do?
- **Examples** - What does good output look like?
- **Constraints** - What should Claude avoid?
- **Format instructions** - How should the output be structured?

**Example of a lazy prompt:**
```
Tell me about Picasso
```

**Example of a good prompt:**
```xml
I'm creating an art history timeline and need to understand artists in their historical context.

<task>
Provide a summary of Pablo Picasso that includes:
1. Birth/death dates and nationality
2. Major artistic movement(s) he was part of
3. Key historical events during his lifetime that influenced his work
4. 2-3 most significant works with dates
</task>

<format>
Return the information in this structure:
- **Name**:
- **Dates**:
- **Movement**:
- **Historical Context**:
- **Major Works**:
</format>
```

### **2. XML Tags for Structure**

Claude pays special attention to XML tags. Use them to organize your prompts:

- `<context>` - Background information
- `<task>` - What you want Claude to do
- `<examples>` - Show Claude what you want
- `<format>` - How to structure the output
- `<constraints>` - What to avoid

### **3. Few-Shot Learning**

Show Claude examples of what you want:

```xml
<examples>
<example>
Input: Vincent van Gogh
Output:
**Name**: Vincent van Gogh
**Dates**: 1853-1890, Dutch
**Movement**: Post-Impressionism
**Historical Context**: Worked during industrial revolution; mental health struggles reflected in intense, emotional style
**Major Works**: The Starry Night (1889), Sunflowers (1888)
</example>
</examples>

<task>
Now analyze: Frida Kahlo
</task>
```

---

## Exercises

### **Exercise 1: The Prompt Comparison**

**Setup:**
Choose an artist you're interested in.

**Part A - Lazy Prompt:**
1. Open Claude (web or API)
2. Ask: "Tell me about [artist name]"
3. Save the response

**Part B - Structured Prompt:**
1. Use XML tags to structure your request
2. Specify exactly what information you want
3. Provide an example of the format you want
4. Save the response

**Part C - Reflection:**
Write in `exercises/prompt-comparison.md`:
- What was different about the responses?
- Which was more useful? Why?
- What did the structure help with?

---

### **Exercise 2: Building a Prompt Template**

**Goal:** Create a reusable prompt template for analyzing artists.

**Instructions:**
1. Create a file: `exercises/artist-analysis-template.md`
2. Write a prompt template with:
   - Context section (what this is for)
   - Task section (what information to extract)
   - Format section (how to structure output)
   - Example section (one complete example)
3. Test it with 3 different artists
4. Refine based on results

**Success criteria:**
- Template works consistently for different artists
- Output is structured and useful
- You can explain why each section is there

---

### **Exercise 3: XML Tag Practice**

**Scenario:** You want Claude to compare two artists and identify influences.

**Your task:**
Write a prompt that:
- Provides context about your art history project
- Asks to compare two artists (your choice)
- Requests specific comparison points (style, technique, themes)
- Identifies potential influences between them
- Uses appropriate XML tags to structure

**Test it:**
1. Run your prompt
2. Evaluate the response
3. Revise if needed
4. Document what worked

Save in: `exercises/artist-comparison-prompt.md`

---

### **Exercise 4: The Error Handling Prompt**

**Challenge:** Sometimes Claude gives responses that are too long, too short, or off-topic.

**Your task:**
1. Find a prompt that gives you a bad response
2. Add constraints to fix it:
   - `<length>Keep response under 200 words</length>`
   - `<avoid>Do not include personal opinions</avoid>`
   - `<focus>Focus only on [specific aspect]</focus>`
3. Test the improved version
4. Document the difference

Save in: `exercises/constraint-practice.md`

---

## Resources

### **Read First:**
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Intro to Prompt Design](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)

### **Reference:**
- [Common prompt patterns](https://docs.anthropic.com/claude/docs/common-prompt-patterns)
- [Prompt examples library](https://docs.anthropic.com/claude/prompt-library)

### **Watch (Optional):**
- Search YouTube for "Anthropic prompt engineering" for video tutorials

---

## Deliverables

Before moving to Step 2, you should have:

- [ ] `exercises/prompt-comparison.md` - Lazy vs structured comparison
- [ ] `exercises/artist-analysis-template.md` - Your reusable template
- [ ] `exercises/artist-comparison-prompt.md` - XML structured comparison
- [ ] `exercises/constraint-practice.md` - Error handling practice
- [ ] `lessons-learned.md` - Your reflections on this step

---

## Success Criteria

You're ready for Step 2 when you can:

✅ Explain why one prompt is more effective than another
✅ Use XML tags naturally in your prompts
✅ Provide clear context and instructions
✅ Use examples to guide output format
✅ Add constraints to refine responses
✅ Have a template you can reuse for similar tasks

---

## My Journey (To Be Completed)

**Time spent:** [To be filled]
**Biggest aha moment:** [To be filled]
**Most challenging part:** [To be filled]
**What I'd do differently:** [To be filled]

See my completed work in: `/completed/`

---

## Next Step

Once you've completed this step: [Step 2: Claude Code Basics](../step-02-claude-code-basics/README.md)
