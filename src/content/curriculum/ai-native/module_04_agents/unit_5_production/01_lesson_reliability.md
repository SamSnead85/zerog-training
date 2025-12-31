# Lesson 5.1: Reliability Patterns

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 5 - Production Agents

---

## 📚 Reading Material

### Agent Failure Modes

- **Infinite loops**: Agent never terminates
- **Tool failures**: APIs down, rate limits
- **Hallucinated actions**: Calling non-existent tools
- **Context overflow**: Too much memory
- **Off-track reasoning**: Agent loses the goal

### Safeguards

**Max iterations**:
```python
def safe_agent(task, max_iterations=20):
    for i in range(max_iterations):
        result = step()
        if done(result):
            return result
    return "Max iterations - returning partial result"
```

**Timeouts**:
```python
import asyncio

async def agent_with_timeout(task, timeout=60):
    try:
        return await asyncio.wait_for(
            agent_run(task),
            timeout=timeout
        )
    except asyncio.TimeoutError:
        return "Agent timed out"
```

**Circuit breakers**:
```python
class CircuitBreaker:
    def __init__(self, failure_threshold=3):
        self.failures = 0
        self.threshold = failure_threshold
        self.open = False
    
    def call(self, func, *args):
        if self.open:
            raise Exception("Circuit open")
        try:
            result = func(*args)
            self.failures = 0
            return result
        except:
            self.failures += 1
            if self.failures >= self.threshold:
                self.open = True
            raise
```

### Human-in-the-Loop

```python
def agent_with_approval(task, dangerous_tools):
    tools = all_tools
    
    while not done:
        action = agent.decide(task)
        
        if action.tool in dangerous_tools:
            approval = await request_human_approval(action)
            if not approval:
                continue
        
        result = execute(action)
```

---

## 🎬 Video Script

**[INTRO - Failure modes]**

Production agents fail in specific ways. Infinite loops, API failures, context overflow. Let me show you the safeguards.

**[CUT TO: Limits]**

Max iterations and timeouts prevent runaway agents. Always have an exit condition.

**[CUT TO: Circuit breakers]**

Circuit breakers stop cascading failures. After too many failures, stop trying temporarily.

**[CUT TO: Human approval]**

Human-in-the-loop for dangerous actions. Some things need approval before execution.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Why use max iterations for agents?

A) Faster execution  
B) Prevents infinite loops and runaway costs  
C) Better answers  
D) Required by API  

**Correct Answer**: B
