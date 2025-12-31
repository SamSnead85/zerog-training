# Lesson 1.2: The ReAct Pattern

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 1 - Agent Fundamentals

---

## 📚 Reading Material

### What Is ReAct?

**ReAct** = Reasoning + Acting

The agent alternates between:
- **Reasoning**: Thinking about what to do
- **Acting**: Using tools
- **Observing**: Seeing the result

### The ReAct Format

```
Thought: I need to find the current weather...
Action: search_weather
Action Input: {"location": "New York"}
Observation: Temperature: 72°F, Sunny

Thought: Now I have the weather, I can answer...
Action: FINISH
Action Input: {"answer": "It's 72°F and sunny in New York."}
```

### Why ReAct Works

1. **Explicit reasoning**: Shows the model's thinking
2. **Structured output**: Easy to parse actions
3. **Debuggable**: See where reasoning went wrong
4. **Interruptible**: Can inject corrections

### ReAct Prompt Template

```python
REACT_PROMPT = """
You are an AI assistant that solves tasks using available tools.

Available tools:
{tool_descriptions}

Use this format:

Thought: [Your reasoning about what to do next]
Action: [Tool name OR "FINISH"]
Action Input: [JSON parameters for the tool]

After each action, you'll receive an Observation with the result.
Continue until you can provide the final answer.

Task: {task}
"""
```

### Implementing ReAct

```python
import re

def parse_react_response(response):
    """Extract thought, action, and action input from response"""
    
    thought_match = re.search(r'Thought:\s*(.+?)(?=Action:|$)', response, re.S)
    action_match = re.search(r'Action:\s*(\w+)', response)
    input_match = re.search(r'Action Input:\s*({.+})', response, re.S)
    
    return {
        "thought": thought_match.group(1).strip() if thought_match else "",
        "action": action_match.group(1) if action_match else None,
        "action_input": json.loads(input_match.group(1)) if input_match else {}
    }

def react_agent(task, tools, max_iterations=10):
    prompt = REACT_PROMPT.format(
        tool_descriptions=format_tools(tools),
        task=task
    )
    
    history = prompt
    
    for i in range(max_iterations):
        response = llm.generate(history)
        parsed = parse_react_response(response)
        
        print(f"\nThought: {parsed['thought']}")
        print(f"Action: {parsed['action']}")
        
        if parsed["action"] == "FINISH":
            return parsed["action_input"].get("answer", "Done")
        
        # Execute tool
        result = tools[parsed["action"]](**parsed["action_input"])
        
        # Add to history
        history += f"\n{response}\nObservation: {result}\n"
    
    return "Max iterations reached"
```

---

## 🎬 Video Script

**[INTRO - ReAct diagram]**

ReAct is the foundational agent pattern. Reasoning plus Acting. Let me show you how it works.

**[CUT TO: Format example]**

The format is structured. Thought: what the agent is thinking. Action: which tool to use. Action Input: the parameters. Observation: what came back.

**[CUT TO: Why it works]**

This works because reasoning is explicit. You can see the agent's thinking. Actions are structured—easy to parse. And it's debuggable—you know where it went wrong.

**[CUT TO: Implementation]**

Implementing: parse thoughts and actions with regex. Execute tools. Append observations to history. Loop until FINISH.

**[END - Runtime: 4:30]**

---

## 🔬 Interactive Lab: ReAct Agent

```python
from openai import OpenAI
import json
import re

client = OpenAI()

REACT_SYSTEM = """You solve tasks by reasoning and using tools.

Tools:
- calculator: {"expression": "math expression"} - Calculate math
- search: {"query": "text"} - Search for information

Format:
Thought: [reasoning]
Action: [tool name or FINISH]
Action Input: [JSON]

After Observation, continue reasoning."""

def mock_search(query):
    data = {
        "python creator": "Python was created by Guido van Rossum in 1991",
        "earth distance sun": "About 93 million miles (150 million km)"
    }
    for key, value in data.items():
        if key in query.lower():
            return value
    return f"Info about {query}"

def react_step(messages):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=300
    )
    return response.choices[0].message.content

def run_react(task, max_steps=5):
    messages = [
        {"role": "system", "content": REACT_SYSTEM},
        {"role": "user", "content": f"Task: {task}"}
    ]
    
    for step in range(max_steps):
        response = react_step(messages)
        print(f"\n--- Step {step + 1} ---")
        print(response)
        
        # Parse action
        action_match = re.search(r'Action:\s*(\w+)', response)
        input_match = re.search(r'Action Input:\s*({.+})', response, re.S)
        
        if not action_match:
            return response
        
        action = action_match.group(1)
        
        if action == "FINISH":
            return response
        
        # Execute
        try:
            params = json.loads(input_match.group(1)) if input_match else {}
            if action == "calculator":
                result = str(eval(params.get("expression", "0")))
            elif action == "search":
                result = mock_search(params.get("query", ""))
            else:
                result = "Unknown tool"
        except Exception as e:
            result = f"Error: {e}"
        
        print(f"Observation: {result}")
        messages.append({"role": "assistant", "content": response})
        messages.append({"role": "user", "content": f"Observation: {result}"})
    
    return "Max steps reached"

# Test
run_react("Who created Python and what year? Then calculate that year plus 33.")
```

---

## ✅ Knowledge Check

### Question 1
What does ReAct stand for?

A) Read and Extract  
B) Reasoning and Acting  
C) Response Action  
D) Reactive Agent  

**Correct Answer**: B

---

### Question 2
What are the three parts of the ReAct loop?

A) Input, Process, Output  
B) Thought, Action, Observation  
C) Query, Response, Log  
D) Plan, Execute, Report  

**Correct Answer**: B

---

*You've completed Lesson 1.2! You understand the ReAct pattern.*
