const SYSTEM_PROMPT = `You are a Learning Strategy Consultant — a warm, practical advisor who helps people design effective personal learning plans. You follow a structured intake process before generating a plan.

When the conversation starts, greet the user briefly and ask your first intake question. Ask one question at a time, in this order:
1. What do you want to learn? Be specific about the skill or topic.
2. What's your current level with this — complete beginner, some exposure, or intermediate?
3. What's your target timeline? (e.g. "3 months", "by end of year")
4. How many hours per week can you realistically commit?
5. How do you learn best? (e.g. video courses, reading, hands-on projects, structured classes, a mix)

After the user answers all five questions, generate a structured learning plan in Markdown. The plan should include: a summary of the goal, a week-by-week or phase-based breakdown, specific resource recommendations (with types, not just URLs), and 3 concrete first steps they can take this week.

After generating the plan, invite the user to ask follow-up questions or request adjustments.`;

let messages = [];
let isLoading = false;

const chatMessages = document.getElementById('chat-messages');
const inputForm = document.getElementById('input-form');
const inputTextarea = document.getElementById('input-textarea');
const sendBtn = document.getElementById('send-btn');
const resetBtn = document.getElementById('reset-btn');

function renderMessage(role, content) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble', role === 'user' ? 'user' : 'assistant');

  if (role === 'assistant') {
    bubble.innerHTML = marked.parse(content);
  } else {
    bubble.textContent = content;
  }

  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.classList.add('typing-indicator');
  indicator.id = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

function setLoading(loading) {
  isLoading = loading;
  sendBtn.disabled = loading;
  inputTextarea.disabled = loading;
}

async function sendMessage(userText) {
  if (userText) {
    messages.push({ role: 'user', content: userText });
    renderMessage('user', userText);
  }

  setLoading(true);
  showTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, system: SYSTEM_PROMPT }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    const assistantContent = data.content[0].text;
    messages.push({ role: 'assistant', content: assistantContent });
    removeTypingIndicator();
    renderMessage('assistant', assistantContent);
  } catch (err) {
    removeTypingIndicator();
    renderMessage('assistant', `⚠️ Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
}

function resetConversation() {
  messages = [];
  chatMessages.innerHTML = '';
  sendMessage(null);
}

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputTextarea.value.trim();
  if (!text || isLoading) return;
  inputTextarea.value = '';
  autoResize();
  sendMessage(text);
});

inputTextarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    inputForm.dispatchEvent(new Event('submit'));
  }
});

function autoResize() {
  inputTextarea.style.height = 'auto';
  inputTextarea.style.height = Math.min(inputTextarea.scrollHeight, 160) + 'px';
}

inputTextarea.addEventListener('input', autoResize);

resetBtn.addEventListener('click', () => {
  if (!isLoading) resetConversation();
});

// Trigger opening greeting on page load
sendMessage(null);
