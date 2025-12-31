# Lesson 5.2: Observability and Debugging

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 5 - Production Agents

---

## 📚 Reading Material

### What to Log

```python
@dataclass
class AgentTrace:
    run_id: str
    task: str
    steps: list[dict]
    total_tokens: int
    total_cost: float
    latency_ms: int
    final_result: str
    success: bool

def log_step(trace, step_type, content, tool_call=None, result=None):
    trace.steps.append({
        "timestamp": datetime.now().isoformat(),
        "type": step_type,  # "thought", "action", "observation"
        "content": content,
        "tool": tool_call,
        "result": result
    })
```

### LangSmith Integration

```python
from langsmith import Client

client = Client()

# Traces are captured automatically with LangChain
# View in LangSmith dashboard:
# - Full execution trace
# - Token counts
# - Latency
# - Cost
```

### Debugging Strategies

**Replay failures**:
```python
def replay(trace_id):
    trace = load_trace(trace_id)
    for step in trace.steps:
        print(f"{step['type']}: {step['content'][:100]}")
        if step['type'] == 'action':
            print(f"  Result: {step['result'][:100]}")
```

**Step-by-step mode**:
```python
def debug_agent(task, pause_between_steps=True):
    for step in agent.run_stepwise(task):
        print(f"Step: {step}")
        if pause_between_steps:
            input("Press Enter to continue...")
```

### Metrics to Track

| Metric | Why |
|--------|-----|
| Completion rate | % tasks finished successfully |
| Avg iterations | Efficiency |
| Tool success rate | Tool reliability |
| Token usage | Cost |
| Latency | User experience |

---

## 🎬 Video Script

**[INTRO - Trace view]**

Production agents need observability. You need to see every step, every decision, every failure.

**[CUT TO: Logging]**

Log everything: thoughts, actions, observations, tool results. Structure it as traces for replay.

**[CUT TO: LangSmith]**

LangSmith captures traces automatically. View the full execution, token counts, latency.

**[CUT TO: Debugging]**

Replay failed runs step by step. See exactly where it went wrong.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should agent traces capture?

A) Only final results  
B) Every thought, action, and observation with timestamps  
C) Just errors  
D) Token counts only  

**Correct Answer**: B

---

*Congratulations on completing Module 4: Agents and Tool Use!*
