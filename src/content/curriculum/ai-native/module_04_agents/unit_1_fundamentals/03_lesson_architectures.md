# Lesson 1.3: Agent Architectures

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 1 - Agent Fundamentals

---

## 📚 Reading Material

### Architecture Overview

| Architecture | Complexity | Control | Use Case |
|--------------|------------|---------|----------|
| **Simple Loop** | Low | Full | Basic tools |
| **ReAct** | Medium | Full | Single tasks |
| **Plan-Execute** | Medium | Moderate | Multi-step |
| **LangGraph** | High | Full | Complex flows |
| **Multi-Agent** | High | Distributed | Specialized tasks |

### Simple Loop Agent

```python
def simple_agent(task):
    while True:
        response = llm(task + history)
        if has_tool_call(response):
            result = execute_tool(response)
            history += result
        else:
            return response
```

### Plan-Execute Agent

Plan first, then execute each step:

```python
def plan_execute_agent(goal):
    # Plan phase
    plan = llm(f"Create a step-by-step plan for: {goal}")
    steps = parse_plan(plan)
    
    # Execute phase
    results = []
    for step in steps:
        result = execute_step(step)
        results.append(result)
    
    # Synthesize
    return llm(f"Summarize results: {results}")
```

### LangGraph (State Machine)

Define explicit states and transitions:

```python
from langgraph.graph import StateGraph

workflow = StateGraph(State)

workflow.add_node("research", research_node)
workflow.add_node("analyze", analyze_node)
workflow.add_node("write", write_node)

workflow.add_edge("research", "analyze")
workflow.add_conditional_edges("analyze", decide_next)

graph = workflow.compile()
```

### Choosing Architecture

| Need | Best Architecture |
|------|------------------|
| Simple tool use | Simple Loop |
| Reasoning + acting | ReAct |
| Known multi-step process | Plan-Execute |
| Complex conditional flows | LangGraph |
| Specialized subtasks | Multi-Agent |

---

## 🎬 Video Script

**[INTRO - Architecture comparison]**

Not all agents are built the same. Let me walk you through the architectures.

**[CUT TO: Simple vs ReAct]**

Simple loop: call LLM, check for tools, execute, repeat. ReAct adds structured reasoning between each action.

**[CUT TO: Plan-Execute]**

Plan-Execute separates planning from doing. First create the full plan, then execute step by step.

**[CUT TO: LangGraph]**

LangGraph is for complex flows. Define states, transitions, conditions. Full control over the agent's path.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
When should you use Plan-Execute over ReAct?

A) For simple tasks  
B) When you want to plan all steps upfront before executing  
C) For single-tool tasks  
D) Never  

**Correct Answer**: B
