# Agent Output & Delivery Guide

## The Problem

Terminal output is great for testing agents, but not practical for real use:
- Hard to read long outputs
- Can't easily save or share
- Disappears when you close terminal
- Not accessible on phone/other devices
- No way to review past outputs

**This guide:** How to deliver agent outputs in useful, readable formats.

---

## Decision Framework: Choose Your Output Method

### Quick Decision Tree:

```
Is this a one-time research task?
├─ Yes → Save to Markdown File (Option 1)
└─ No → Is this recurring (daily/weekly)?
    ├─ Yes → Do you want it delivered automatically?
    │   ├─ Yes → Email (Option 2) or Obsidian (Option 4)
    │   └─ No → HTML File (Option 3) or Markdown Archive
    └─ No → Is this interactive/iterative?
        ├─ Yes → Markdown Files + Manual Review
        └─ No → Web Interface (Option 5)
```

### By Use Case:

| Use Case | Best Output Method | Why |
|----------|-------------------|-----|
| Weekly digest (arts scene) | Email + Markdown backup | Read anywhere, searchable, archived |
| Research summary | Markdown file | Easy to review/edit, works with VS Code |
| Interactive learning (taste dev) | Markdown journal files | Progressive record, annotate over time |
| Comparison/analysis | HTML file | Formatting/styling improves readability |
| Long-term tracking | Obsidian vault | Searchable, linked notes, accessible |
| Multiple users/team | Web app | Shared access, no setup for viewers |

---

## Option 1: Save to Markdown File

**Best for:** Any agent output you want to review, archive, or edit.

### Basic Implementation:

```python
from datetime import datetime

async def main():
    runner = InMemoryRunner(agent=your_agent)
    result = await runner.run_debug("Your prompt here")

    # Save to file
    timestamp = datetime.now().strftime("%Y-%m-%d")
    filename = f"output-{timestamp}.md"

    with open(filename, 'w') as f:
        f.write(result)

    print(f"✅ Output saved to: {filename}")
```

### Pro Tips:

**Organize by date:**
```python
from pathlib import Path

output_dir = Path("outputs") / datetime.now().strftime("%Y-%m")
output_dir.mkdir(parents=True, exist_ok=True)
filename = output_dir / f"digest-{datetime.now().strftime('%Y-%m-%d')}.md"
```

**Auto-open in VS Code:**
```python
import subprocess
subprocess.run(['code', filename])  # Opens in VS Code
```

**Add metadata:**
```python
content = f"""---
date: {datetime.now().isoformat()}
agent: {agent_name}
prompt: {prompt}
---

{result}
"""
```

### When to Use:
- ✅ Default for any agent output
- ✅ When you'll review/edit the output
- ✅ When you want version history
- ✅ Quick and simple implementation

### When Not to Use:
- ❌ When you need automatic delivery
- ❌ When output includes complex formatting/images
- ❌ When multiple people need access

---

## Option 2: Email Delivery

**Best for:** Weekly/daily digests you want to read without opening files.

### Using Gmail SMTP (Simple, Free):

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(subject, body, to_email):
    """Send email via Gmail SMTP"""
    from_email = "your-email@gmail.com"
    password = os.getenv("GMAIL_APP_PASSWORD")  # Not your regular password!

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(from_email, password)
        server.send_message(msg)

# In your agent:
async def main():
    runner = InMemoryRunner(agent=your_agent)
    result = await runner.run_debug("Create weekly digest")

    send_email(
        subject=f"Arts Digest - {datetime.now().strftime('%B %d')}",
        body=result,
        to_email="your-email@gmail.com"
    )
```

### Setup Gmail App Password:
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Create App Password (select "Mail" and "Mac")
4. Add to `.env`: `GMAIL_APP_PASSWORD=your-16-char-password`

### When to Use:
- ✅ Recurring digests (daily/weekly)
- ✅ Want to read on phone/tablet
- ✅ Need notifications when agent completes
- ✅ Want email search/archive features

### When Not to Use:
- ❌ Complex formatting (email renders markdown poorly)
- ❌ Very long outputs (email clients truncate)
- ❌ Need interactive elements

---

## Option 3: HTML File with Styling

**Best for:** Outputs that benefit from visual formatting.

### Simple Template:

```python
def save_as_html(content, filename, title="Agent Output"):
    """Convert to styled HTML"""

    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }}
        h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #34495e; margin-top: 30px; }}
        a {{ color: #3498db; text-decoration: none; }}
        a:hover {{ text-decoration: underline; }}
        .section {{
            background: #f8f9fa;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            border-left: 4px solid #3498db;
        }}
    </style>
</head>
<body>
    {content}
</body>
</html>"""

    with open(filename, 'w') as f:
        f.write(html)

    # Auto-open in browser
    import webbrowser
    webbrowser.open(f'file://{os.path.abspath(filename)}')

# Usage:
async def main():
    runner = InMemoryRunner(agent=your_agent)
    result = await runner.run_debug("Your prompt")

    save_as_html(result, f"output-{datetime.now().strftime('%Y-%m-%d')}.html")
```

### When to Use:
- ✅ Want better visual formatting than markdown
- ✅ Output has sections/structure that benefits from styling
- ✅ Want to open automatically in browser
- ✅ One-off presentations or reports

### When Not to Use:
- ❌ Simple text outputs (markdown is easier)
- ❌ Need to edit output (harder than markdown)
- ❌ Want mobile access (files stay on computer)

---

## Option 4: Obsidian Vault

**Best for:** Long-term storage, search, linking, and organization across many outputs.

### Why Obsidian is Perfect for Agent Outputs:

- **Just markdown files** - No API, no special setup
- **Powerful search** - Full-text search, tags, properties
- **Linking** - Connect related outputs with `[[links]]`
- **Mobile access** - Obsidian mobile app syncs your vault
- **Tagging** - Organize with `#tags` or YAML frontmatter
- **Daily notes** - Natural fit for recurring digests

### Setup (One-Time):

1. Find your Obsidian vault path (e.g., `/Users/yourname/Documents/ObsidianVault`)
2. Create subfolder for agent outputs: `Agent-Outputs/`
3. That's it! Just save files there.

### Implementation:

```python
from pathlib import Path

def save_to_obsidian(title, content, tags=None, folder="Agent-Outputs"):
    """Save agent output to Obsidian vault"""

    # Set your Obsidian vault path
    OBSIDIAN_VAULT = Path.home() / "Documents" / "ObsidianVault"
    output_folder = OBSIDIAN_VAULT / folder
    output_folder.mkdir(parents=True, exist_ok=True)

    # Create frontmatter with metadata
    frontmatter = f"""---
created: {datetime.now().isoformat()}
tags: {tags if tags else ['agent-output']}
type: agent-generated
---

"""

    # Create filename (safe for Obsidian)
    filename = f"{datetime.now().strftime('%Y-%m-%d')} - {title}.md"
    filepath = output_folder / filename

    # Write file
    with open(filepath, 'w') as f:
        f.write(frontmatter)
        f.write(f"# {title}\n\n")
        f.write(content)

    return filepath

# Usage:
async def main():
    runner = InMemoryRunner(agent=your_agent)
    result = await runner.run_debug("Create arts digest")

    filepath = save_to_obsidian(
        title=f"Arts Digest - {datetime.now().strftime('%B %d')}",
        content=result,
        tags=['arts', 'weekly-digest', 'atlanta']
    )

    print(f"✅ Saved to Obsidian: {filepath}")
```

### Advanced: Linking Between Notes

Add links to previous digests or related notes:

```python
def save_to_obsidian_with_links(title, content, tags=None, related_notes=None):
    """Save with links to related notes"""

    # Add links section at bottom
    if related_notes:
        content += "\n\n---\n\n## Related\n\n"
        for note in related_notes:
            content += f"- [[{note}]]\n"

    # ... rest of save logic
```

### Example: Arts Digest with Structure

```python
def save_arts_digest_to_obsidian(digest_content):
    """Save arts digest with Obsidian-specific structure"""

    OBSIDIAN_VAULT = Path.home() / "Documents" / "ObsidianVault"
    arts_folder = OBSIDIAN_VAULT / "Arts & Culture" / "Weekly Digests"
    arts_folder.mkdir(parents=True, exist_ok=True)

    date_str = datetime.now().strftime('%Y-%m-%d')
    week_str = datetime.now().strftime('%Y-W%W')

    frontmatter = f"""---
date: {date_str}
week: {week_str}
tags:
  - arts
  - atlanta
  - weekly-digest
type: arts-digest
---

"""

    # Add navigation links
    content = frontmatter
    content += f"# Arts Digest - {datetime.now().strftime('%B %d, %Y')}\n\n"
    content += "← [[Arts Weekly Digests]] | [[Arts Index]]\n\n"
    content += "---\n\n"
    content += digest_content
    content += "\n\n---\n\n"
    content += "## Actions\n\n"
    content += "- [ ] Review events and add to calendar\n"
    content += "- [ ] RSVP for interesting events\n"

    filename = f"{date_str} Arts Digest.md"
    filepath = arts_folder / filename

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"✅ Saved to Obsidian: {filepath}")
    return filepath
```

### Example: Taste Journal with Progressive Structure

```python
def save_taste_journal_to_obsidian(week_num, artworks, reflections):
    """Save weekly taste development session"""

    OBSIDIAN_VAULT = Path.home() / "Documents" / "ObsidianVault"
    journal_folder = OBSIDIAN_VAULT / "Learning" / "Taste Development"
    journal_folder.mkdir(parents=True, exist_ok=True)

    frontmatter = f"""---
week: {week_num}
date: {datetime.now().isoformat()}
tags:
  - taste-development
  - art-learning
  - weekly-session
type: taste-journal
---

"""

    content = frontmatter
    content += f"# Week {week_num} - Taste Development\n\n"
    content += f"← [[Week {week_num-1} Taste Journal|Previous Week]] | "
    content += f"[[Week {week_num+1} Taste Journal|Next Week]] →\n\n"
    content += "---\n\n"
    content += "## Artworks This Week\n\n"
    content += artworks
    content += "\n\n## Analysis & Patterns\n\n"
    content += reflections
    content += "\n\n## My Reflections\n\n"
    content += "_[Add your thoughts here]_\n"

    filename = f"Week {week_num:02d} Taste Journal.md"
    filepath = journal_folder / filename

    with open(filepath, 'w') as f:
        f.write(content)

    return filepath
```

### When to Use:
- ✅ Already use Obsidian for notes
- ✅ Want to link agent outputs to other notes
- ✅ Running agents regularly over time
- ✅ Want powerful search and organization
- ✅ Need mobile access (Obsidian mobile app)
- ✅ Want to manually review/annotate outputs

### When Not to Use:
- ❌ Don't use Obsidian
- ❌ Need fully automated delivery (email is better)
- ❌ Sharing with people who don't use Obsidian

---

## Option 5: Local Web Interface (Advanced)

**Best for:** Multiple agents, browsing history, interactive features.

### Minimal Flask Example:

```python
# web_viewer.py
from flask import Flask, render_template, request
import glob
from pathlib import Path

app = Flask(__name__)

@app.route('/')
def index():
    """List all saved outputs"""
    outputs = sorted(glob.glob('outputs/*.md'), reverse=True)
    return render_template('index.html', outputs=outputs)

@app.route('/view/<path:filename>')
def view(filename):
    """View specific output"""
    with open(filename, 'r') as f:
        content = f.read()
    return render_template('view.html', content=content, filename=filename)

@app.route('/run-agent', methods=['POST'])
def run_agent():
    """Trigger agent run from web interface"""
    prompt = request.form.get('prompt')
    # Run your agent here
    # Save output
    # Redirect to view
    return "Agent running..."

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### When to Use:
- ✅ Building a tool others will use
- ✅ Want dashboard for multiple agents
- ✅ Need interactive controls (run agents from UI)
- ✅ Want to browse/search outputs in browser

### When Not to Use:
- ❌ Just need to see outputs (simpler options work)
- ❌ Not comfortable with web development
- ❌ Don't need interactive features

---

## Scheduling Automated Runs

Once you have output delivery set up, schedule agents to run automatically.

### Mac: Using launchd (Recommended)

Create: `~/Library/LaunchAgents/com.yourname.artsagent.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.yourname.artsagent</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/yourname/path/to/venv/bin/python</string>
        <string>/Users/yourname/path/to/arts_agent.py</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>1</integer> <!-- Monday -->
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
</dict>
</plist>
```

Load: `launchctl load ~/Library/LaunchAgents/com.yourname.artsagent.plist`

### Python: Using schedule library

```python
# scheduler.py
import schedule
import time
import asyncio

def run_agent():
    """Wrapper to run async agent"""
    asyncio.run(main())

# Run every Monday at 9am
schedule.every().monday.at("09:00").do(run_agent)

# Or run daily at 8am
schedule.every().day.at("08:00").do(run_agent)

print("Scheduler running... Press Ctrl+C to stop")
while True:
    schedule.run_pending()
    time.sleep(60)  # Check every minute
```

Run in background: `nohup python scheduler.py &`

---

## Recommended Setup by Project

### Atlanta Arts Scene Agent

**Recommended:** Markdown + Email

```python
async def main():
    runner = InMemoryRunner(agent=full_pipeline)
    result = await runner.run_debug("Create this week's Atlanta arts digest")

    # 1. Save markdown (for archive/editing)
    timestamp = datetime.now().strftime("%Y-%m-%d")
    Path("outputs").mkdir(exist_ok=True)
    with open(f"outputs/arts-{timestamp}.md", 'w') as f:
        f.write(result)

    # 2. Email (for convenient reading)
    send_email(
        subject=f"🎨 Atlanta Arts This Week - {datetime.now().strftime('%B %d')}",
        body=result,
        to_email="your-email@gmail.com"
    )

    print(f"✅ Digest saved and emailed!")
```

**Schedule:** Weekly (Monday 9am)

---

### Taste Development Agent

**Recommended:** Markdown Journal

```python
async def run_weekly_cycle():
    runner = InMemoryRunner(agent=weekly_loop)
    result = await runner.run_debug("Run this week's taste development")

    # Save to weekly journal
    week_num = datetime.now().isocalendar()[1]  # Week number
    Path("taste-journal").mkdir(exist_ok=True)
    filename = f"taste-journal/week-{week_num:02d}.md"

    with open(filename, 'w') as f:
        f.write(f"# Taste Development - Week {week_num}\n\n")
        f.write(f"Date: {datetime.now().strftime('%B %d, %Y')}\n\n")
        f.write(result)
        f.write("\n\n---\n\n## My Reflections\n\n")
        f.write("_[Add your thoughts here after reviewing the artworks]_\n")

    print(f"✅ Week {week_num} session saved to: {filename}")
    print("Review in VS Code, then add your reflections!")

    # Open in VS Code
    import subprocess
    subprocess.run(['code', filename])
```

**Schedule:** Manual (interactive, requires your input)

---

## Quick Reference: Code Snippets

### Save to Markdown File
```python
with open(f"output-{datetime.now().strftime('%Y-%m-%d')}.md", 'w') as f:
    f.write(result)
```

### Send Email (Gmail)
```python
import smtplib
from email.mime.text import MIMEText
msg = MIMEText(result)
msg['Subject'] = "Agent Output"
msg['From'] = "you@gmail.com"
msg['To'] = "you@gmail.com"
with smtplib.SMTP('smtp.gmail.com', 587) as s:
    s.starttls()
    s.login("you@gmail.com", os.getenv("GMAIL_APP_PASSWORD"))
    s.send_message(msg)
```

### Save to HTML
```python
html = f"<html><body><pre>{result}</pre></body></html>"
with open('output.html', 'w') as f:
    f.write(html)
import webbrowser
webbrowser.open(f'file://{os.path.abspath("output.html")}')
```

### Save to Obsidian
```python
from pathlib import Path
OBSIDIAN_VAULT = Path.home() / "Documents" / "ObsidianVault"
filepath = OBSIDIAN_VAULT / "Agent-Outputs" / f"{datetime.now().strftime('%Y-%m-%d')} Output.md"
filepath.parent.mkdir(parents=True, exist_ok=True)
with open(filepath, 'w') as f:
    f.write(f"---\ndate: {datetime.now().isoformat()}\ntags: [agent-output]\n---\n\n{result}")
```

---

## Adding to Your Existing Agents

### For day1b_multi_agent.py (Test Now):

Add this before the final print statement:

```python
# In main() function, after running all patterns:
print("Saving outputs to files...")

# Save Pattern 2 output (blog post) as example
with open('day1b-blog-output.md', 'w') as f:
    f.write("# Multi-Agent Systems Blog Post\n\n")
    f.write("Generated by Sequential Workflow (Outline → Write → Edit)\n\n")
    f.write("---\n\n")
    # The actual blog post would be in the WriterAgent's output
    # This is just to show the pattern

print("✅ Outputs saved! Check day1b-blog-output.md")
```

---

## Next Steps

1. **Test file saving** with existing Day 1b script
2. **Choose output method** for future projects based on use case
3. **Set up email** if building recurring digest agents
4. **Create output folder structure** (`outputs/`, `archives/`, etc.)
5. **Add scheduling** once agents are working reliably

---

## Related Resources

- Project specs: `atlanta-arts-scene-agent.md`, `taste-development-agent.md`
- Day 1b script: `../kaggle-5day-genai/day1/day1b_multi_agent.py`
- ADK docs on runners: https://google.github.io/adk-docs/runners/
