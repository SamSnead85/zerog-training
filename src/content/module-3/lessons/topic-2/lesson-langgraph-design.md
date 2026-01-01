# Lesson: Graph-Based Agent Design with LangGraph

## Introduction

LangGraph is a powerful framework for building agents as graphs where nodes represent actions and edges represent control flow. Unlike simple chain-based agents, LangGraph gives you fine-grained control over agent behavior with cycles, conditionals, and human-in-the-loop patterns.

## Why LangGraph?

Traditional agent frameworks treat agents as black boxes. LangGraph opens up the box:

[Image: Comparison of linear chain vs. graph-based agent execution]

| Traditional Agents | LangGraph |
|-------------------|-----------|
| Linear flow | Graph with cycles |
| Hard to debug | Visual inspection |
| Limited control | Fine-grained control |
| Simple patterns | Complex workflows |
| Agent decides all | Human-in-the-loop easy |

## Core Concepts

### The State Graph Model

In LangGraph, everything revolves around **state**—a typed dictionary that flows through your graph:

```python
from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
import operator

# Define your state schema
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next_step: str
    intermediate_results: dict
    iteration_count: int

# Create a graph builder with this state
graph_builder = StateGraph(AgentState)
```

### Nodes: Where Work Happens

Nodes are functions that receive state and return state updates:

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage

llm = ChatOpenAI(model="gpt-4-turbo")

def call_model(state: AgentState) -> dict:
    """Node that calls the LLM."""
    messages = state["messages"]
    response = llm.invoke(messages)
    
    return {"messages": [response]}  # Updates state["messages"]


def execute_tools(state: AgentState) -> dict:
    """Node that executes any tool calls."""
    last_message = state["messages"][-1]
    
    results = []
    for tool_call in last_message.tool_calls:
        result = execute_tool(tool_call)
        results.append(ToolMessage(
            content=result,
            tool_call_id=tool_call["id"]
        ))
    
    return {
        "messages": results,
        "intermediate_results": extract_data(results)
    }


def summarize_results(state: AgentState) -> dict:
    """Node that summarizes everything."""
    summary = llm.invoke([
        {"role": "system", "content": "Summarize the findings."},
        {"role": "user", "content": str(state["intermediate_results"])}
    ])
    
    return {"messages": [summary]}


# Add nodes to the graph
graph_builder.add_node("agent", call_model)
graph_builder.add_node("tools", execute_tools)
graph_builder.add_node("summarize", summarize_results)
```

### Edges: Control Flow

Edges define how state flows between nodes:

```python
from langgraph.graph import END

# Simple edge: always go from A to B
graph_builder.add_edge("summarize", END)

# Conditional edge: choose based on state
def should_continue(state: AgentState) -> str:
    """Decide the next step based on state."""
    last_message = state["messages"][-1]
    
    # If there are tool calls, execute them
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    
    # If we've done too many iterations, summarize
    if state["iteration_count"] > 5:
        return "summarize"
    
    # Otherwise, we're done
    return END


# Add conditional edge
graph_builder.add_conditional_edges(
    "agent",  # From this node
    should_continue,  # Use this function to decide
    {
        "tools": "tools",  # If "tools", go to tools node
        "summarize": "summarize",  # If "summarize", go to summarize
        END: END  # If END, finish
    }
)

# Complete the cycle: tools → agent
graph_builder.add_edge("tools", "agent")
```

### Setting Entry Point

```python
# Where does the graph start?
graph_builder.set_entry_point("agent")

# Compile the graph
agent = graph_builder.compile()
```

## Complete LangGraph Agent Example

Here's a full working agent:

```python
from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage
from langchain.tools import tool
import operator

# 1. Define State
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

# 2. Define Tools
@tool
def search_web(query: str) -> str:
    """Search the web for information."""
    # Simulated search
    return f"Search results for '{query}': Found 5 relevant articles..."

@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression."""
    try:
        return str(eval(expression))
    except:
        return "Error evaluating expression"

tools = [search_web, calculate]

# 3. Setup LLM with tools
llm = ChatOpenAI(model="gpt-4-turbo").bind_tools(tools)

# 4. Define Nodes
def agent_node(state: AgentState) -> dict:
    """The agent decides what to do."""
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def tool_node(state: AgentState) -> dict:
    """Execute tool calls."""
    last_message = state["messages"][-1]
    results = []
    
    for tool_call in last_message.tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call["args"]
        
        # Find and execute the tool
        for t in tools:
            if t.name == tool_name:
                result = t.invoke(tool_args)
                results.append(ToolMessage(
                    content=result,
                    tool_call_id=tool_call["id"]
                ))
    
    return {"messages": results}

# 5. Define Routing Logic
def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return END

# 6. Build the Graph
workflow = StateGraph(AgentState)

workflow.add_node("agent", agent_node)
workflow.add_node("tools", tool_node)

workflow.set_entry_point("agent")
workflow.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
workflow.add_edge("tools", "agent")

# 7. Compile
app = workflow.compile()

# 8. Run
result = app.invoke({
    "messages": [HumanMessage(content="What's 15% of 850? Also search for recent AI news.")]
})

for message in result["messages"]:
    print(f"{message.type}: {message.content[:100]}...")
```

## Advanced Patterns

### Pattern 1: Human-in-the-Loop

```python
from langgraph.checkpoint.sqlite import SqliteSaver

# Enable persistence for interruption
memory = SqliteSaver.from_conn_string(":memory:")
app = workflow.compile(checkpointer=memory, interrupt_before=["tools"])

# Run until we hit the interrupt
config = {"configurable": {"thread_id": "user-123"}}
result = app.invoke(initial_state, config)

# Get human approval
print(f"Agent wants to execute: {result['messages'][-1].tool_calls}")
approved = input("Approve? (y/n): ")

if approved.lower() == "y":
    # Continue execution
    result = app.invoke(None, config)
else:
    # Modify and continue
    modified_state = modify_tool_calls(result)
    result = app.invoke(modified_state, config)
```

### Pattern 2: Subgraphs for Complex Tasks

```python
# Define a subgraph for research
research_graph = StateGraph(ResearchState)
research_graph.add_node("search", search_node)
research_graph.add_node("analyze", analyze_node)
research_graph.add_node("summarize", summarize_node)
# ... configure edges

research_subgraph = research_graph.compile()

# Use in main graph
def research_step(state: AgentState) -> dict:
    """Delegate to research subgraph."""
    research_result = research_subgraph.invoke({
        "query": state["current_task"]
    })
    return {"research_findings": research_result["summary"]}

main_graph.add_node("research", research_step)
```

### Pattern 3: Parallel Execution

```python
from langgraph.pregel import Channel

# Define parallel branches
def create_parallel_graph():
    workflow = StateGraph(AgentState)
    
    # These will run in parallel
    workflow.add_node("branch_a", process_branch_a)
    workflow.add_node("branch_b", process_branch_b)
    workflow.add_node("branch_c", process_branch_c)
    
    # Split into parallel branches
    workflow.add_edge("start", "branch_a")
    workflow.add_edge("start", "branch_b")
    workflow.add_edge("start", "branch_c")
    
    # Merge results
    workflow.add_node("merge", merge_results)
    workflow.add_edge("branch_a", "merge")
    workflow.add_edge("branch_b", "merge")
    workflow.add_edge("branch_c", "merge")
    
    return workflow.compile()
```

## Debugging LangGraph Agents

### Visualizing Your Graph

```python
# Get a visual representation
from IPython.display import Image, display

try:
    display(Image(app.get_graph().draw_mermaid_png()))
except Exception:
    # Fallback: print mermaid diagram
    print(app.get_graph().draw_mermaid())
```

### Streaming for Real-Time Visibility

```python
# Stream node-by-node execution
for event in app.stream(initial_state):
    for node_name, output in event.items():
        print(f"Node '{node_name}' output:")
        print(output)
        print("---")
```

## Key Takeaways

- **LangGraph models agents as graphs**: Nodes are actions, edges are control flow
- **State is central**: A typed dictionary that flows through the graph
- **Conditional edges**: Enable dynamic routing based on state
- **Cycles are natural**: Tools → Agent → Tools creates ReAct pattern
- **Human-in-the-loop**: Built-in support with `interrupt_before`
- **Checkpointing**: Persist and resume long-running agents
- **Subgraphs**: Compose complex agents from simpler pieces
- **Visual debugging**: See your agent's decision flow

## What's Next

In the next lesson, we'll explore **Multi-Agent Systems** with CrewAI and AutoGen, where multiple specialized agents collaborate to solve complex problems.

---

*Estimated completion time: 35 minutes*
*Difficulty: Intermediate to Advanced*
