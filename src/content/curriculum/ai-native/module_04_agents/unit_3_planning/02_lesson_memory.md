# Lesson 3.2: Memory and Context

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Planning and Reasoning

---

## 📚 Reading Material

### Memory Types

**Short-term memory**: Current conversation, recent actions
**Long-term memory**: Persistent facts, past interactions
**Working memory**: Current task state, scratchpad

### Conversation Memory

```python
class ConversationMemory:
    def __init__(self, max_messages=20):
        self.messages = []
        self.max = max_messages
    
    def add(self, role, content):
        self.messages.append({"role": role, "content": content})
        if len(self.messages) > self.max:
            # Keep system message + summarize old
            self.compress()
    
    def compress(self):
        old = self.messages[1:-10]
        summary = llm(f"Summarize: {old}")
        self.messages = [
            self.messages[0],
            {"role": "system", "content": f"Prior context: {summary}"},
            *self.messages[-10:]
        ]
```

### Long-Term Memory with RAG

```python
class AgentMemory:
    def __init__(self, vector_store):
        self.store = vector_store
    
    def remember(self, fact, metadata=None):
        self.store.add(fact, metadata)
    
    def recall(self, query, top_k=5):
        return self.store.search(query, top_k)
    
    def get_context(self, current_task):
        relevant = self.recall(current_task)
        return "\n".join([r["text"] for r in relevant])
```

### Scratchpad Pattern

```python
class WorkingMemory:
    def __init__(self):
        self.scratchpad = {}
    
    def note(self, key, value):
        self.scratchpad[key] = value
    
    def get_context(self):
        return f"Current notes:\n{self.scratchpad}"
```

---

## 🎬 Video Script

**[INTRO - Memory types diagram]**

Agents without memory forget everything between iterations. Let me show you how to give agents persistent context.

**[CUT TO: Conversation memory]**

Short-term: recent messages. When it gets too long, summarize the old parts, keep the recent ones.

**[CUT TO: Long-term with RAG]**

Long-term: vector store for facts. Remember important things, recall when relevant.

**[CUT TO: Scratchpad]**

Working memory: a scratchpad for the current task. Notes, intermediate results, current state.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
How should agents handle long conversations?

A) Truncate and lose context  
B) Summarize old messages, keep recent ones  
C) Always use full history  
D) Start fresh each turn  

**Correct Answer**: B
