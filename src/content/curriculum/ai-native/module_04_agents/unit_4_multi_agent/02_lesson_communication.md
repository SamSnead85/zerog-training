# Lesson 4.2: Agent Communication

> **Duration**: 55 minutes | **Type**: Advanced
> **Unit**: 4 - Multi-Agent Systems

---

## 📚 Reading Material

### Communication Patterns

**Message Passing**:
```python
class AgentMessage:
    sender: str
    receiver: str
    content: dict
    type: str  # "request", "response", "broadcast"

def agent_main_loop(agent, inbox):
    for message in inbox:
        response = agent.process(message)
        send(message.sender, response)
```

**Shared State**:
```python
class SharedState:
    def __init__(self):
        self.data = {}
        self.lock = threading.Lock()
    
    def read(self, key):
        return self.data.get(key)
    
    def write(self, key, value, agent_id):
        with self.lock:
            self.data[key] = {"value": value, "updated_by": agent_id}
```

**Blackboard Pattern**:
```python
class Blackboard:
    """Shared workspace all agents can read/write"""
    
    def __init__(self):
        self.knowledge = {}
        self.pending_tasks = []
        self.completed_tasks = []
    
    def contribute(self, agent, contribution):
        self.knowledge[agent.name] = contribution
    
    def get_all_knowledge(self):
        return self.knowledge
```

### Structured Handoffs

```python
def handoff_context(from_agent, to_agent, task, partial_result):
    context = f"""
Previous agent: {from_agent.name}
Their work: {partial_result}
Your task: {task}
Continue from where they left off.
"""
    return to_agent.run(context)
```

---

## 🎬 Video Script

**[INTRO - Communication diagram]**

Agents need to communicate. Messages, shared state, or blackboards. Let me show you the patterns.

**[CUT TO: Message passing]**

Direct message passing: sender, receiver, content. Clean but requires routing.

**[CUT TO: Shared state]**

Shared state: all agents read/write common data. Simple but needs locking.

**[CUT TO: Blackboard]**

Blackboard: workspace all agents contribute to. Good for collaborative problem-solving.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is the blackboard pattern?

A) Writing on a physical board  
B) A shared workspace all agents can read and contribute to  
C) Private messages only  
D) Logging  

**Correct Answer**: B

---

*Congratulations on completing Unit 4! You understand multi-agent systems.*
