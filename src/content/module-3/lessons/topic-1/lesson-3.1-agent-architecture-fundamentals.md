# Lesson 3.1: Agent Architecture Fundamentals

## Introduction

AI agents represent a paradigm shift from simple prompt-response interactions to systems that can reason, plan, and take actions. Understanding agent architecture is crucial for building AI applications that can solve complex, multi-step problems autonomously.

In this lesson, you'll learn what makes an AI agent different from a chatbot, the core components of agent architecture, and the design patterns that power production agent systems.

## What Is an AI Agent?

**An AI agent is an autonomous system that uses an LLM as its reasoning engine to decide what actions to take to accomplish a goal.**

[Image: Comparison diagram of chatbot vs. agent architecture]

### Chatbot vs. Agent

| Chatbot | Agent |
|---------|-------|
| Responds to input | Pursues goals |
| Single turn | Multi-turn reasoning |
| No external actions | Uses tools/APIs |
| Stateless | Maintains memory |
| Human-driven flow | Self-directed flow |

**Analogy**: A chatbot is like a knowledgeable librarian who answers your questions. An agent is like a research assistant who takes your question, searches databases, reads papers, synthesizes information, and delivers a comprehensive report—all on their own.

## The Core Agent Loop

Every agent follows a fundamental loop:

```
┌─────────────────────────────────────────┐
│              AGENT LOOP                 │
│                                         │
│   1. Observe: Receive input/state       │
│         ↓                               │
│   2. Think: Reason about goals          │
│         ↓                               │
│   3. Act: Execute tool/action           │
│         ↓                               │
│   4. Observe: Get action result         │
│         ↓                               │
│   (Loop until goal achieved or limit)   │
└─────────────────────────────────────────┘
```

### The ReAct Pattern

The most common agent pattern is **ReAct** (Reasoning + Acting):

```python
# The ReAct pattern in pseudocode
def react_agent(goal, tools, max_steps=10):
    observations = []
    
    for step in range(max_steps):
        # THINK: What should I do next?
        thought = llm.reason(
            goal=goal,
            observations=observations,
            available_tools=tools
        )
        
        # Determine if we're done
        if thought.is_final_answer:
            return thought.answer
        
        # ACT: Execute the chosen tool
        action_result = execute_tool(
            tool=thought.tool,
            args=thought.tool_args
        )
        
        # OBSERVE: Record what happened
        observations.append({
            "thought": thought.reasoning,
            "action": thought.tool,
            "result": action_result
        })
    
    return "Maximum steps reached without solution"
```

## Agent Architecture Components

### 1. The Core: LLM as the Brain

The LLM is the reasoning engine:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# The brain of our agent
agent_llm = ChatOpenAI(
    model="gpt-4-turbo",
    temperature=0  # Deterministic for reliability
)

# Agent instructions
agent_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful AI assistant that can use tools.

When given a task:
1. Think about what tools you need
2. Use one tool at a time
3. Analyze the result
4. Decide if you need more tools or have the answer

Available tools: {tools}
"""),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])
```

### 2. Tools: The Agent's Hands

Tools are functions the agent can call:

```python
from langchain.tools import tool
from typing import Annotated

@tool
def search_database(
    query: Annotated[str, "The search query for the database"]
) -> str:
    """Search the company database for relevant information."""
    # Actual database search logic
    results = db.search(query)
    return format_results(results)


@tool
def send_email(
    to: Annotated[str, "Email address of recipient"],
    subject: Annotated[str, "Email subject line"],
    body: Annotated[str, "Email body content"]
) -> str:
    """Send an email to a specified recipient."""
    # Email sending logic
    email_service.send(to=to, subject=subject, body=body)
    return f"Email sent successfully to {to}"


@tool
def create_calendar_event(
    title: str,
    start_time: str,
    attendees: list[str]
) -> str:
    """Create a calendar event."""
    event = calendar.create_event(title, start_time, attendees)
    return f"Event created: {event.id}"


# Collect tools for the agent
tools = [search_database, send_email, create_calendar_event]
```

> **Pro Tip**: Tool descriptions are critical! The LLM uses them to decide when and how to use each tool. Write clear, specific descriptions with example use cases.

### 3. Memory: Short-Term and Long-Term

Agents need memory to maintain context:

```python
from langchain.memory import ConversationBufferMemory
from langchain_community.vectorstores import Chroma

# Short-term memory: Current conversation
short_term_memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# Long-term memory: Vector store for retrieval
long_term_memory = Chroma(
    collection_name="agent_memory",
    embedding_function=embeddings
)

def store_interaction(agent_output, task):
    """Store important learnings for future reference."""
    long_term_memory.add_texts(
        texts=[f"Task: {task}\nOutcome: {agent_output}"],
        metadatas=[{"type": "interaction", "timestamp": now()}]
    )

def retrieve_relevant_memories(current_task):
    """Get relevant past experiences."""
    return long_term_memory.similarity_search(
        current_task,
        k=3
    )
```

### 4. Planning: Breaking Down Complex Tasks

For complex goals, agents need planning:

```python
def plan_task(agent, goal: str) -> list[str]:
    """Break a complex goal into steps."""
    
    planning_prompt = f"""
    Goal: {goal}
    
    Create a step-by-step plan to achieve this goal.
    Each step should be specific and actionable.
    Consider dependencies between steps.
    
    Output format:
    1. [First step]
    2. [Second step]
    ...
    """
    
    plan = agent.llm.invoke(planning_prompt)
    steps = parse_plan(plan)
    
    return steps


# Execute plan with adaptability
def execute_plan(agent, steps):
    results = []
    for i, step in enumerate(steps):
        result = agent.execute_step(step)
        results.append(result)
        
        # Re-plan if something unexpected happens
        if result.requires_replanning:
            new_steps = replan(agent, steps[i+1:], result)
            return results + execute_plan(agent, new_steps)
    
    return results
```

## Common Agent Patterns

### Pattern 1: ReAct (Reasoning + Acting)

```
Thought: I need to find the user's order status
Action: search_orders(order_id="12345")
Observation: Order 12345 - Status: Shipped, ETA: Tomorrow
Thought: I have the information, I can answer now
Answer: Your order #12345 has shipped and will arrive tomorrow.
```

### Pattern 2: Plan-and-Execute

```
Goal: Write a blog post about AI in healthcare

Plan:
1. Research recent AI healthcare developments
2. Outline key points (diagnosis, drug discovery, admin)
3. Write introduction
4. Write each section
5. Write conclusion
6. Review and edit

[Execute each step with tools]
```

### Pattern 3: Reflection

```
Initial Response: [Generated content]

Self-Critique: 
- Is this accurate? 
- Is anything missing?
- Could it be clearer?

Reflection: The response lacks specific examples. 
Let me search for recent case studies...

Improved Response: [Enhanced content with examples]
```

## Building Your First Agent

Here's a complete, minimal agent using LangChain:

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_openai_tools_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import tool

# Define tools
@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression. Example: '2 + 2 * 3'"""
    try:
        result = eval(expression)  # In production, use a safe evaluator
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool
def get_current_time() -> str:
    """Get the current date and time."""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

tools = [calculate, get_current_time]

# Setup the agent
llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant with access to tools. "
               "Use them when needed to answer questions accurately."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run the agent
result = agent_executor.invoke({
    "input": "What's 15% of 850, and what time is it right now?"
})

print(result["output"])
```

## Agent Reliability Concerns

### Common Failure Modes

| Failure | Cause | Mitigation |
|---------|-------|------------|
| Infinite loops | Agent keeps trying same action | Max step limits, loop detection |
| Tool hallucination | Agent invents non-existent tools | Strict tool validation |
| Goal drift | Agent wanders from original task | Goal anchoring in prompts |
| Context overflow | Too much history | Summarization, sliding window |

```python
# Mitigation example: Robust agent executor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=10,           # Prevent infinite loops
    max_execution_time=60,       # Time limit in seconds
    handle_parsing_errors=True,  # Graceful error handling
    early_stopping_method="generate"  # Try to generate final answer
)
```

> **Common Mistake**: Don't assume agents always succeed. Always implement fallbacks and human escalation for production systems.

## Key Takeaways

- **Agents are goal-directed**: They autonomously decide what actions to take
- **The core loop**: Observe → Think → Act → Observe (repeat)
- **Key components**: LLM (brain), Tools (hands), Memory (context), Planning (strategy)
- **ReAct pattern**: Most common architecture—interleave reasoning and acting
- **Tools need good descriptions**: LLM uses them to decide when to use each tool
- **Plan for failures**: Max steps, timeouts, error handling, human escalation
- **Start simple**: Build minimal agents first, add complexity as needed

## What's Next

In the next lesson, we'll deep-dive into **Tool Use and Function Calling**—how to design tools that agents can reliably use and how to handle complex tool interactions.

---

*Estimated completion time: 30 minutes*
*Difficulty: Intermediate*
