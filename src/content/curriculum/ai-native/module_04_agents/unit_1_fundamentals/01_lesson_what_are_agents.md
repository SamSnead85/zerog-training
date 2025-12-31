# Lesson 1.1: What Are AI Agents?

> **Duration**: 45 minutes | **Type**: Conceptual
> **Unit**: 1 - Agent Fundamentals

---

## 📚 Reading Material

### Defining AI Agents

An **AI agent** is a system that:
1. **Perceives** its environment (receives inputs)
2. **Reasons** about what to do
3. **Acts** using tools to change the world
4. **Iterates** until the goal is achieved

```
Goal → [Perceive → Reason → Act] → Goal Achieved
              ↑_______|
              (loop until done)
```

### Agent vs Chain

| Aspect | Chain | Agent |
|--------|-------|-------|
| **Flow** | Fixed, predetermined | Dynamic, decided at runtime |
| **Control** | Developer decides steps | LLM decides steps |
| **Iterations** | Usually one pass | Multiple loops |
| **Complexity** | Simple, predictable | Complex, flexible |

**Chain**: "Do step 1, then step 2, then step 3"
**Agent**: "Here's the goal—figure out the steps yourself"

### Core Components

**1. LLM (The Brain)**
```python
# The reasoning engine
response = llm("Given this situation, what should I do next?")
```

**2. Tools (The Hands)**
```python
tools = [
    search_web,      # Look things up
    run_code,        # Execute programs
    send_email,      # Take actions
    query_database   # Access data
]
```

**3. Memory (The Context)**
```python
memory = {
    "short_term": recent_conversation,  # Current context
    "long_term": vector_store,          # Past interactions
    "working": scratchpad               # Current task state
}
```

**4. Planning (The Strategy)**
```python
# Decompose goal into steps
plan = agent.plan("Write and publish a blog post")
# → [research, outline, draft, edit, format, publish]
```

### The Agent Loop

```python
def agent_loop(goal, tools, max_iterations=10):
    observation = ""
    
    for i in range(max_iterations):
        # Reason: What should I do?
        thought = llm(f"""
        Goal: {goal}
        Previous observation: {observation}
        Available tools: {list_tools(tools)}
        
        What should I do next?
        """)
        
        # Check if done
        if "FINISHED" in thought:
            return thought
        
        # Act: Use a tool
        action, params = parse_action(thought)
        observation = tools[action](**params)
    
    return "Max iterations reached"
```

### Simple Agent Example

```python
from openai import OpenAI

client = OpenAI()

def simple_agent(question, tools):
    messages = [{"role": "user", "content": question}]
    
    while True:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools
        )
        
        message = response.choices[0].message
        
        # If no tool calls, we're done
        if not message.tool_calls:
            return message.content
        
        # Execute each tool call
        messages.append(message)
        for tool_call in message.tool_calls:
            result = execute_tool(tool_call)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result
            })
```

---

## 🎬 Video Script

**[INTRO - Agent animation showing loop]**

An agent is AI that takes action. Not just generates text—actually does things. Let me show you what makes an agent.

**[CUT TO: Components diagram]**

Four core components. The LLM is the brain—it reasons. Tools are the hands—they act. Memory is the context—what the agent knows. Planning is the strategy—how to achieve goals.

**[CUT TO: Loop visualization]**

The agent loop: perceive the situation, reason about what to do, take action, observe the result, repeat until done. This loop is the heart of every agent.

**[CUT TO: Chain vs agent comparison]**

Chains are fixed: step 1, step 2, step 3. Agents are dynamic: the LLM decides the next step based on the current situation. More flexible, more complex.

**[CUT TO: Code example]**

In code: loop until done or max iterations. Each iteration: reason, decide action, execute tool, observe result. The model drives the process.

**[CUT TO: Speaker]**

Agents unlock capabilities chains can't match. Dynamic problem-solving, tool use, iteration. But they're also harder to control. That's what this module teaches.

**[END - Runtime: 5:30]**

---

## 🔬 Interactive Lab: First Agent

### Part 1: Minimal Agent (20 minutes)

```python
from openai import OpenAI
import json

client = OpenAI()

# Define tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Perform mathematical calculations",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "Math expression"}
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "Get the current date and time",
            "parameters": {"type": "object", "properties": {}}
        }
    }
]

# Tool implementations
from datetime import datetime

def execute_tool(tool_call):
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    
    if name == "calculate":
        try:
            result = eval(args["expression"])
            return str(result)
        except:
            return "Error in calculation"
    elif name == "get_current_time":
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    else:
        return f"Unknown tool: {name}"

def run_agent(question, max_iterations=5):
    messages = [{"role": "user", "content": question}]
    
    for i in range(max_iterations):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools
        )
        
        message = response.choices[0].message
        
        if not message.tool_calls:
            return message.content
        
        print(f"[Iteration {i+1}] Tool calls: {[t.function.name for t in message.tool_calls]}")
        
        messages.append(message)
        for tool_call in message.tool_calls:
            result = execute_tool(tool_call)
            print(f"  {tool_call.function.name} → {result}")
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result
            })
    
    return "Max iterations reached"

# Test
print(run_agent("What's 15% of 847, and what time is it now?"))
```

### Part 2: Multi-Step Agent (25 minutes)

```python
# Add more tools
research_tools = [
    {
        "type": "function",
        "function": {
            "name": "search",
            "description": "Search for information on a topic",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "summarize",
            "description": "Summarize text into key points",
            "parameters": {
                "type": "object",
                "properties": {
                    "text": {"type": "string", "description": "Text to summarize"}
                },
                "required": ["text"]
            }
        }
    }
]

def mock_search(query):
    # Simulated search results
    return f"Search results for '{query}': [Result 1: Overview of {query}...] [Result 2: Details about {query}...]"

def summarize(text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"Summarize in 2 sentences: {text}"}],
        max_tokens=100
    )
    return response.choices[0].message.content

# Run multi-step task
result = run_agent("Research quantum computing and give me a brief summary")
print(result)
```

---

## ✅ Knowledge Check

### Question 1
What distinguishes an agent from a simple LLM call?

A) Agents are faster  
B) Agents iterate, use tools, and decide their own next steps  
C) Agents use bigger models  
D) Agents don't need prompts  

**Correct Answer**: B

**Explanation**: Agents loop (perceive-reason-act), use tools, and dynamically decide what to do next—unlike single LLM calls with fixed prompts.

---

### Question 2
What are the four core components of an agent?

A) Input, Output, Model, API  
B) LLM (brain), Tools (hands), Memory (context), Planning (strategy)  
C) Frontend, Backend, Database, Cache  
D) Prompt, Response, Log, Error  

**Correct Answer**: B

---

*You've completed Lesson 1.1! You understand what AI agents are.*
