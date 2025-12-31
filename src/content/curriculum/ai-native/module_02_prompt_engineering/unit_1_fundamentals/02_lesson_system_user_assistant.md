# Lesson 1.2: The System-User-Assistant Pattern

> **Duration**: 45 minutes | **Type**: Foundational
> **Unit**: 1 - Prompt Fundamentals

---

## 📚 Reading Material

### The Chat Completion Format

Modern LLMs use a structured message format with three roles:

```python
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"},
    {"role": "assistant", "content": "The capital of France is Paris."},
    {"role": "user", "content": "What about Germany?"},
]
```

### The Three Roles

**System**: Sets the context, persona, and rules for the entire conversation.
- Processed first
- Shapes all subsequent responses
- Typically hidden from end users
- Best place for: persona, constraints, format instructions

**User**: The human's input (or simulated human input).
- Questions, requests, data to process
- What you're asking the model to respond to

**Assistant**: The model's responses (or pre-filled responses).
- Previous model outputs in conversation
- Can be pre-filled to guide behavior

### The System Message: Your Control Center

The system message is your most powerful tool. It sets the foundation.

**Basic system message**:
```
You are a helpful assistant.
```

**Production system message**:
```
You are CloudBot, a customer support AI for CloudStack, a B2B SaaS platform.

ROLE:
- Answer questions about CloudStack features and pricing
- Help troubleshoot common issues
- Escalate complex issues to human support

KNOWLEDGE:
- You have access to our documentation (provided in context)
- Current date: January 2025
- Latest product version: 4.2.1

CONSTRAINTS:
- Never share internal pricing negotiations
- Don't make promises about future features
- If unsure, say "I'll connect you with our team"
- Always be empathetic and professional

RESPONSE FORMAT:
- Keep responses under 150 words unless asked for detail
- Use bullet points for multi-part answers
- Include relevant doc links when available
```

### Multi-Turn Conversations

Each message builds on previous ones:

```python
messages = [
    {"role": "system", "content": "You are a Python coding tutor."},
    
    # Turn 1
    {"role": "user", "content": "How do I read a file in Python?"},
    {"role": "assistant", "content": "You can use the `open()` function..."},
    
    # Turn 2
    {"role": "user", "content": "What if the file doesn't exist?"},
    {"role": "assistant", "content": "You should handle FileNotFoundError..."},
    
    # Turn 3 (current)
    {"role": "user", "content": "Show me a complete example"},
]
```

**Key insight**: The model sees the entire conversation each time. It doesn't "remember" between API calls—you must include history.

### Pre-Filling Assistant Responses

You can start the assistant's response to guide output:

```python
messages = [
    {"role": "system", "content": "Extract JSON from text."},
    {"role": "user", "content": "The meeting is at 3pm with John."},
    {"role": "assistant", "content": "{"}  # Pre-fill to force JSON
]
```

The model will continue from where you left off:
```json
{"time": "3pm", "attendee": "John"}
```

### Provider Differences

**OpenAI**:
- Single system message at start
- Supports `name` field for multi-participant chats

**Anthropic (Claude)**:
- System message is a separate parameter
- More emphasis on system message following
- Supports pre-filling assistant messages (start of turn)

**Google (Gemini)**:
- Uses `model` and `user` roles
- System instructions set separately

**Example - OpenAI**:
```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)
```

**Example - Anthropic**:
```python
import anthropic
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are a helpful assistant.",  # Separate param
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
```

---

## 🎬 Video Script

**[INTRO - Message structure diagram]**

When you call a language model API, you're not just sending a string. You're sending a structured conversation with three roles: system, user, and assistant. Understanding this pattern is fundamental.

**[CUT TO: Role explanation]**

The system message sets the context for everything. It defines who the model is, what rules to follow, and how to respond. The user message is the human input—the question or request. The assistant message is the model's response.

**[CUT TO: System message evolution]**

Your system message is your control center. "You are a helpful assistant" is the default. But in production, your system message might be 500 words defining the exact persona, knowledge boundaries, constraints, and response format.

**[CUT TO: Multi-turn conversation code]**

In multi-turn conversations, you include the entire history. The model doesn't "remember" between API calls. Each call, you send system, then all previous user-assistant pairs, then the new user message. The model sees the full context.

**[CUT TO: Pre-filling example]**

Here's a power technique: pre-filling assistant responses. Start the assistant's message with an opening bracket, and the model will continue with valid JSON. Start with "Here are the key points:", and the model will provide bullet points. You're guiding the format.

**[CUT TO: Provider comparison]**

Different providers handle this slightly differently. OpenAI puts system in the messages array. Anthropic has a separate system parameter. Google uses different role names. But the pattern is the same.

**[CUT TO: Speaker on camera]**

Master the system-user-assistant pattern. Your system message is where you invest the most craft. Define the persona, set the rules, specify the format. Everything else flows from there.

**[END - Runtime: 6:00]**

---

## 🔬 Interactive Lab: Message Patterns

### Objective
Practice constructing effective message arrays for different scenarios.

### Part 1: System Message Design (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def test_system_message(system, user_message):
    """Test how different system messages affect responses"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user_message}
        ],
        max_tokens=200
    )
    return response.choices[0].message.content

user_query = "Explain machine learning"

# Test different system messages
system_variants = [
    "You are a helpful assistant.",
    
    "You are a kindergarten teacher explaining things to 5-year-olds.",
    
    "You are a Stanford CS professor. Be precise and technical.",
    
    """You are a business consultant for Fortune 500 executives.
    Focus on strategic value, ROI, and competitive advantage.
    Use bullet points. Keep it under 100 words.""",
]

print("Same question, different system messages:")
print("=" * 60)
print(f"Query: {user_query}")
print("=" * 60)

for system in system_variants:
    print(f"\nSystem: {system[:50]}...")
    response = test_system_message(system, user_query)
    print(f"Response:\n{response}\n")
    print("-" * 40)
```

### Part 2: Multi-Turn Conversation (15 minutes)

```python
def build_conversation(system, turns):
    """Build a multi-turn conversation"""
    messages = [{"role": "system", "content": system}]
    
    for turn in turns:
        messages.append({"role": "user", "content": turn})
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=300
        )
        
        assistant_response = response.choices[0].message.content
        messages.append({"role": "assistant", "content": assistant_response})
        
        print(f"User: {turn}")
        print(f"Assistant: {assistant_response}\n")
    
    return messages

# Simulate a multi-turn coding help session
system = "You are a patient Python tutor. Build on previous explanations."

turns = [
    "How do I create a list in Python?",
    "How do I add items to it?",
    "Now show me how to loop through it.",
]

conversation = build_conversation(system, turns)
print(f"\nFinal message count: {len(conversation)}")
```

### Part 3: Pre-Filling Technique (10 minutes)

```python
def prefill_example(user_content, prefill):
    """Use pre-filling to guide response format"""
    messages = [
        {"role": "system", "content": "Extract information and respond in JSON."},
        {"role": "user", "content": user_content},
    ]
    
    # Add pre-fill if provided
    if prefill:
        messages.append({"role": "assistant", "content": prefill})
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=200
    )
    
    return response.choices[0].message.content

# Test with and without pre-filling
text = "The meeting with Sarah is scheduled for 2pm tomorrow in Conference Room B."

print("Without pre-fill:")
print(prefill_example(text, None))

print("\nWith JSON pre-fill:")
print("{" + prefill_example(text, "{"))
```

### Submission
Create a production-ready system message for a specific use case (support bot, code reviewer, writing assistant, etc.).

---

## ✅ Knowledge Check

### Question 1
What is the purpose of the "system" role in chat completions?

A) To store the model's responses  
B) To set the context, persona, and rules for the conversation  
C) To represent the user's input  
D) To log errors  

**Correct Answer**: B

**Explanation**: The system message establishes the foundation for the entire conversation—defining who the model should act as, what rules to follow, and how to respond.

---

### Question 2
In a multi-turn conversation, does the model "remember" previous turns between API calls?

A) Yes, it has persistent memory  
B) No, you must include the full conversation history in each call  
C) Only for the last 5 turns  
D) Only if you enable memory mode  

**Correct Answer**: B

**Explanation**: Language models don't have memory between API calls. Each call must include the complete conversation history (system, then all previous user-assistant pairs, then the new user message).

---

### Question 3
What is "pre-filling" an assistant response useful for?

A) Making the model forget context  
B) Guiding the format or starting point of the response  
C) Reducing costs  
D) Increasing response length  

**Correct Answer**: B

**Explanation**: Pre-filling starts the assistant's response with specific content (like `{` for JSON), and the model continues from there. This is a powerful technique for format control.

---

### Question 4
Why should production system messages be detailed rather than minimal?

A) They cost more tokens  
B) They define persona, constraints, format, and rules precisely  
C) They make the model slower  
D) They're required by the API  

**Correct Answer**: B

**Explanation**: Detailed system messages precisely define behavior, constraints, knowledge boundaries, and output formats—reducing ambiguity and improving response quality.

---

*You've completed Lesson 1.2! You now understand the system-user-assistant pattern.*
