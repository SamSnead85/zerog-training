# Lab: Building a ReAct Agent from Scratch

## Overview

In this hands-on lab, you'll build a complete ReAct (Reasoning + Acting) agent from scratch. You'll implement the core agent loop, tool execution, and error handling—giving you deep understanding of how production agents work.

**Duration**: 90 minutes  
**Difficulty**: Intermediate  
**Prerequisites**: Module 3 Lessons 1-2

---

## Learning Objectives

By completing this lab, you will:
- Implement the ReAct pattern step by step
- Build custom tools with proper error handling
- Create the observation-reasoning-action loop
- Handle edge cases and loop termination
- Test and debug agent behavior

---

## The Challenge

Build an agent that can answer questions about a company by:
1. Searching a knowledge base
2. Looking up specific documents
3. Synthesizing information to answer questions

**Example interaction:**
```
User: "What is the refund policy and how long does processing take?"

Agent:
→ Thought: I need to find information about the refund policy
→ Action: search_docs("refund policy")
→ Observation: [Found: refund_policy.md]
→ Thought: Found the policy doc, let me read it
→ Action: read_doc("refund_policy.md")
→ Observation: [Content about 30-day returns, 5-7 day processing...]
→ Thought: I have the information needed
→ Answer: "Our refund policy allows returns within 30 days. Processing typically takes 5-7 business days once we receive your return."
```

---

## Starter Code

Create the following files in your project:

### `agent/tools.py` - Tool Definitions

```python
"""
Lab: Implement these tools for your ReAct agent.

Each tool should:
1. Have a clear docstring (the LLM uses this)
2. Handle errors gracefully
3. Return structured results
"""

from dataclasses import dataclass
from typing import Optional
import json

# Simulated knowledge base
KNOWLEDGE_BASE = {
    "refund_policy.md": """
# Refund Policy

We offer a 30-day money-back guarantee on all products.

## Process
1. Request a return through your account
2. Ship the item back within 14 days
3. Refund processed within 5-7 business days

## Exceptions
- Digital products: No refunds after download
- Custom items: No refunds
- Sale items: Store credit only
    """,
    "shipping_info.md": """
# Shipping Information

## Domestic Shipping
- Standard: 5-7 business days ($5.99)
- Express: 2-3 business days ($12.99)
- Overnight: Next business day ($24.99)

## International
- Standard: 10-21 business days ($15.99)
- Express: 5-10 business days ($29.99)

Free shipping on orders over $50.
    """,
    "product_catalog.md": """
# Product Catalog

## Categories
- Electronics
- Home & Garden
- Clothing
- Sports & Outdoors

## Popular Products
- Widget Pro: $49.99
- Gadget Plus: $89.99
- Super Tool: $129.99

All products come with a 1-year warranty.
    """,
}


@dataclass
class ToolResult:
    """Standardized tool result format."""
    success: bool
    result: str
    error: Optional[str] = None


def search_docs(query: str) -> ToolResult:
    """
    Search the knowledge base for documents matching a query.
    
    Args:
        query: Search terms to look for
        
    Returns:
        ToolResult with list of matching document names
    """
    # TODO: Implement search logic
    # Hint: Search for query terms in document content
    # Return matching document names
    
    matching = []
    query_lower = query.lower()
    
    for doc_name, content in KNOWLEDGE_BASE.items():
        if query_lower in content.lower():
            matching.append(doc_name)
    
    if matching:
        return ToolResult(
            success=True,
            result=f"Found documents: {', '.join(matching)}"
        )
    else:
        return ToolResult(
            success=True,
            result="No matching documents found. Try different search terms."
        )


def read_doc(doc_name: str) -> ToolResult:
    """
    Read the contents of a specific document.
    
    Args:
        doc_name: Name of the document to read
        
    Returns:
        ToolResult with document contents
    """
    # TODO: Implement document reading
    # Handle case when document doesn't exist
    
    if doc_name in KNOWLEDGE_BASE:
        return ToolResult(
            success=True,
            result=KNOWLEDGE_BASE[doc_name]
        )
    else:
        return ToolResult(
            success=False,
            result="",
            error=f"Document '{doc_name}' not found. Available: {list(KNOWLEDGE_BASE.keys())}"
        )


def list_docs() -> ToolResult:
    """
    List all available documents in the knowledge base.
    
    Returns:
        ToolResult with list of all document names
    """
    return ToolResult(
        success=True,
        result=f"Available documents: {', '.join(KNOWLEDGE_BASE.keys())}"
    )


# Tool registry for the agent
TOOLS = {
    "search_docs": search_docs,
    "read_doc": read_doc,
    "list_docs": list_docs,
}


def get_tool_descriptions() -> str:
    """Generate tool descriptions for the LLM prompt."""
    descriptions = []
    for name, func in TOOLS.items():
        descriptions.append(f"- {name}: {func.__doc__.strip().split(chr(10))[0]}")
    return "\n".join(descriptions)
```

### `agent/react_agent.py` - Agent Implementation

```python
"""
Lab: Implement the ReAct agent loop.

Your agent should:
1. Parse the LLM output for Thought/Action/Answer
2. Execute the appropriate tool
3. Feed observations back to the LLM
4. Continue until an answer is produced or max iterations reached
"""

from openai import OpenAI
from tools import TOOLS, get_tool_descriptions, ToolResult
import re

client = OpenAI()

# System prompt with ReAct format
SYSTEM_PROMPT = """You are a helpful assistant that answers questions using available tools.

You have access to these tools:
{tool_descriptions}

To answer questions, follow this format exactly:

Thought: [Your reasoning about what to do next]
Action: [tool_name("argument")]

After receiving an Observation, continue reasoning until you can answer.

When you have enough information, respond with:
Thought: [Your final reasoning]
Answer: [Your complete answer to the user's question]

Important:
- Always start with Thought
- Only call one Action at a time
- Wait for Observation before continuing
- If stuck, try a different approach
"""


def parse_llm_output(output: str) -> dict:
    """
    Parse the LLM output to extract Thought, Action, or Answer.
    
    TODO: Implement parsing logic
    Returns dict with 'thought', 'action', 'action_input', 'answer'
    """
    result = {
        "thought": None,
        "action": None,
        "action_input": None,
        "answer": None,
    }
    
    # Extract thought
    thought_match = re.search(r"Thought:\s*(.+?)(?=Action:|Answer:|$)", output, re.DOTALL)
    if thought_match:
        result["thought"] = thought_match.group(1).strip()
    
    # Extract action
    action_match = re.search(r'Action:\s*(\w+)\("([^"]*)"\)', output)
    if action_match:
        result["action"] = action_match.group(1)
        result["action_input"] = action_match.group(2)
    
    # Extract answer
    answer_match = re.search(r"Answer:\s*(.+?)$", output, re.DOTALL)
    if answer_match:
        result["answer"] = answer_match.group(1).strip()
    
    return result


def execute_tool(action: str, action_input: str) -> str:
    """
    Execute a tool and return the observation.
    
    TODO: Implement tool execution with error handling
    """
    if action not in TOOLS:
        return f"Error: Unknown tool '{action}'. Available: {list(TOOLS.keys())}"
    
    try:
        tool_func = TOOLS[action]
        result: ToolResult = tool_func(action_input)
        
        if result.success:
            return f"Observation: {result.result}"
        else:
            return f"Observation (Error): {result.error}"
            
    except Exception as e:
        return f"Observation (Error): Tool execution failed: {str(e)}"


def run_agent(question: str, max_iterations: int = 10) -> str:
    """
    Run the ReAct agent loop.
    
    TODO: Implement the main agent loop
    """
    # Build the system prompt
    system_prompt = SYSTEM_PROMPT.format(
        tool_descriptions=get_tool_descriptions()
    )
    
    # Initialize conversation
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": question},
    ]
    
    for iteration in range(max_iterations):
        print(f"\n--- Iteration {iteration + 1} ---")
        
        # Get LLM response
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0,
        )
        
        llm_output = response.choices[0].message.content
        print(f"LLM: {llm_output}")
        
        # Parse the output
        parsed = parse_llm_output(llm_output)
        
        # Check if we have an answer
        if parsed["answer"]:
            print(f"\n=== Final Answer ===\n{parsed['answer']}")
            return parsed["answer"]
        
        # Execute action if present
        if parsed["action"]:
            observation = execute_tool(parsed["action"], parsed["action_input"])
            print(f"{observation}")
            
            # Add LLM output and observation to conversation
            messages.append({"role": "assistant", "content": llm_output})
            messages.append({"role": "user", "content": observation})
        else:
            # No action and no answer - something went wrong
            messages.append({"role": "assistant", "content": llm_output})
            messages.append({
                "role": "user", 
                "content": "Please provide either an Action to take or an Answer. Follow the format exactly."
            })
    
    return "Sorry, I couldn't find an answer within the allowed iterations."


if __name__ == "__main__":
    # Test the agent
    questions = [
        "What is your refund policy?",
        "How much does express shipping cost?",
        "What products do you sell and what's your return policy?",
    ]
    
    for q in questions:
        print(f"\n{'='*50}")
        print(f"Question: {q}")
        print("="*50)
        answer = run_agent(q)
```

---

## Lab Tasks

### Task 1: Complete the Tools (20 min)

1. Test the `search_docs` function with various queries
2. Add fuzzy matching (optional) for better search
3. Ensure `read_doc` handles missing files gracefully

**Verification:**
```python
# These should work correctly
assert search_docs("refund").success == True
assert "refund_policy.md" in search_docs("refund").result
assert read_doc("nonexistent.md").success == False
```

### Task 2: Test the Parser (15 min)

Test `parse_llm_output` with these cases:

```python
# Test cases
test1 = '''Thought: I need to search for shipping info
Action: search_docs("shipping")'''

test2 = '''Thought: I found the information I need
Answer: The refund policy allows returns within 30 days.'''

test3 = '''Thought: Let me search first
Action: search_docs("returns")
Observation: Found documents: refund_policy.md
Thought: Now I should read it'''

# Run your tests
result1 = parse_llm_output(test1)
assert result1["action"] == "search_docs"
assert result1["action_input"] == "shipping"
```

### Task 3: Run the Agent (20 min)

1. Run the agent with the test questions
2. Observe the reasoning traces
3. Note any failures or unexpected behavior

### Task 4: Improve Error Handling (20 min)

Add these safety features:

1. **Detection loop prevention**: If the agent asks the same question twice
2. **Token limit safety**: Track total tokens used
3. **Timeout handling**: Maximum time per agent run

```python
# Example: Add to run_agent
seen_actions = set()

for iteration in range(max_iterations):
    # ... existing code ...
    
    if parsed["action"]:
        action_key = f"{parsed['action']}:{parsed['action_input']}"
        if action_key in seen_actions:
            messages.append({
                "role": "user",
                "content": "You already tried this action. Try a different approach or provide your best answer."
            })
            continue
        seen_actions.add(action_key)
```

### Task 5: Add a New Tool (15 min)

Add a `calculate` tool for basic math:

```python
def calculate(expression: str) -> ToolResult:
    """
    Perform basic arithmetic calculation.
    
    Args:
        expression: Math expression like "49.99 * 3"
    """
    try:
        # Only allow safe characters
        if not re.match(r'^[\d\s\+\-\*\/\.\(\)]+$', expression):
            return ToolResult(
                success=False,
                result="",
                error="Invalid expression. Only numbers and +-*/ allowed."
            )
        
        result = eval(expression)
        return ToolResult(
            success=True,
            result=f"Result: {result}"
        )
    except Exception as e:
        return ToolResult(
            success=False,
            result="",
            error=f"Calculation error: {str(e)}"
        )

# Add to TOOLS dictionary
TOOLS["calculate"] = calculate
```

---

## Evaluation Rubric

| Criteria | Points |
|----------|--------|
| Tools work correctly | 20 |
| Parser handles all cases | 20 |
| Agent answers questions | 25 |
| Error handling implemented | 20 |
| New tool added and working | 15 |
| **Total** | **100** |

---

## Bonus Challenges

1. **Parallel tool execution**: Allow the agent to call multiple tools at once
2. **Tool suggestions**: Have the agent explain why it chose each tool
3. **Conversation mode**: Turn this into a multi-turn chatbot
4. **Caching**: Cache tool results to avoid redundant calls
5. **Streaming**: Stream the agent's reasoning in real-time

---

## Submission

1. Complete all tasks
2. Run the test questions and save the outputs
3. Submit your modified `tools.py` and `react_agent.py`
4. Include a brief reflection on what you learned
