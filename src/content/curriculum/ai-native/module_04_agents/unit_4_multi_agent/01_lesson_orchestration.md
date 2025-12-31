# Lesson 4.1: Agent Orchestration

> **Duration**: 55 minutes | **Type**: Advanced
> **Unit**: 4 - Multi-Agent Systems

---

## 📚 Reading Material

### Why Multiple Agents?

- **Specialization**: Each agent has specific expertise
- **Parallelism**: Work on subtasks concurrently
- **Modularity**: Easier to develop and test
- **Separation of concerns**: Clear responsibilities

### Orchestration Patterns

**Sequential (Pipeline)**:
```python
def pipeline(task):
    research = researcher.run(task)
    analysis = analyst.run(research)
    report = writer.run(analysis)
    return report
```

**Parallel (Fan-out/Fan-in)**:
```python
async def parallel(task):
    results = await asyncio.gather(
        web_agent.run(task),
        db_agent.run(task),
        file_agent.run(task)
    )
    return synthesizer.run(results)
```

**Supervisor Pattern**:
```python
def supervisor_orchestration(task):
    while not done:
        # Supervisor decides which agent works next
        next_agent = supervisor.decide(task, state)
        result = next_agent.run(task, state)
        state.update(result)
        
        if supervisor.is_complete(state):
            done = True
    
    return state.final_result
```

### LangGraph Multi-Agent

```python
from langgraph.graph import StateGraph

workflow = StateGraph(State)

# Add agents as nodes
workflow.add_node("researcher", researcher_agent)
workflow.add_node("analyst", analyst_agent)
workflow.add_node("writer", writer_agent)

# Define flow
workflow.add_edge("researcher", "analyst")
workflow.add_edge("analyst", "writer")

graph = workflow.compile()
```

---

## 🎬 Video Script

**[INTRO - Multi-agent diagram]**

One agent doing everything is like one person running a company. Multiple specialized agents work better.

**[CUT TO: Patterns]**

Three patterns. Pipeline: one feeds the next. Parallel: work simultaneously, synthesize. Supervisor: a coordinator decides who works.

**[CUT TO: LangGraph]**

LangGraph makes this visual. Define agents as nodes, edges as flow. The graph controls execution.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What is the supervisor pattern?

A) All agents work independently  
B) A coordinator agent decides which worker agent acts next  
C) Agents in sequence  
D) Parallel execution only  

**Correct Answer**: B
