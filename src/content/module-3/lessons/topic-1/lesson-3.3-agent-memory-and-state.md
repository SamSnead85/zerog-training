# Lesson 3.3: Agent Memory and State

## Introduction

Stateless LLMs face a fundamental challenge: each API call starts fresh. For agents to handle complex, multi-step tasks, they need **memory**—the ability to remember context, learn from interactions, and maintain state across turns. This lesson covers the memory architectures that power production agents.

## Types of Agent Memory

[Image: Diagram showing short-term, long-term, and episodic memory types]

### Memory Type Comparison

| Memory Type | Duration | Purpose | Implementation |
|-------------|----------|---------|----------------|
| **Short-term** | Current session | Conversation context | Message history |
| **Working** | Current task | Intermediate results | Scratchpad |
| **Long-term** | Persistent | Facts and knowledge | Vector database |
| **Episodic** | Persistent | Past experiences | Interaction logs |
| **Procedural** | Persistent | How to do things | Tool usage patterns |

## Short-Term Memory: Conversation Context

The simplest form of memory is tracking the current conversation:

```python
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain

# Basic conversation memory
memory = ConversationBufferMemory()

conversation = ConversationChain(
    llm=ChatOpenAI(model="gpt-4-turbo"),
    memory=memory,
    verbose=True
)

# First interaction
response1 = conversation.predict(input="My name is Alice and I work at TechCorp.")
# "Nice to meet you, Alice! How can I help you today?"

# Second interaction - agent remembers
response2 = conversation.predict(input="What's my name and where do I work?")
# "Your name is Alice and you work at TechCorp."
```

### Memory Strategies for Long Conversations

As conversations grow, you need strategies to manage context:

```python
from langchain.memory import (
    ConversationBufferWindowMemory,
    ConversationSummaryMemory,
    ConversationSummaryBufferMemory
)

# Strategy 1: Sliding window - keep last N messages
window_memory = ConversationBufferWindowMemory(k=10)

# Strategy 2: Summarization - compress old conversations
summary_memory = ConversationSummaryMemory(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),  # Cheap model for summaries
    max_token_limit=200
)

# Strategy 3: Hybrid - summarize old, keep recent in full
hybrid_memory = ConversationSummaryBufferMemory(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    max_token_limit=2000  # Summarize when exceeding this
)
```

### Custom Memory Implementation

```python
class SmartMemory:
    """Custom memory that prioritizes important information."""
    
    def __init__(self, max_tokens: int = 4000):
        self.messages = []
        self.important_facts = []  # Always included
        self.max_tokens = max_tokens
    
    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        
        # Extract and store important facts
        facts = self._extract_facts(content)
        self.important_facts.extend(facts)
    
    def _extract_facts(self, content: str) -> list[str]:
        """Use LLM to extract key facts worth remembering."""
        response = extraction_llm.invoke(
            f"Extract key facts from: {content}\nFacts:"
        )
        return parse_facts(response.content)
    
    def get_context(self) -> str:
        """Build context within token limits."""
        context_parts = []
        
        # Always include important facts
        if self.important_facts:
            context_parts.append(
                "Key facts:\n" + "\n".join(f"- {f}" for f in self.important_facts)
            )
        
        # Add recent messages
        recent = self.messages[-10:]  # Last 10 messages
        for msg in recent:
            context_parts.append(f"{msg['role']}: {msg['content']}")
        
        return "\n\n".join(context_parts)
```

## Working Memory: Agent Scratchpad

Agents need a "scratchpad" for intermediate thoughts and results:

```python
class AgentScratchpad:
    """Working memory for current agent task."""
    
    def __init__(self):
        self.goal = ""
        self.plan_steps = []
        self.completed_steps = []
        self.intermediate_results = {}
        self.current_thought = ""
    
    def set_goal(self, goal: str):
        self.goal = goal
        self.plan_steps = []
        self.completed_steps = []
    
    def add_plan_step(self, step: str):
        self.plan_steps.append(step)
    
    def complete_step(self, step: str, result: str):
        self.completed_steps.append({
            "step": step,
            "result": result,
            "timestamp": datetime.now()
        })
    
    def store_result(self, key: str, value: str):
        self.intermediate_results[key] = value
    
    def format_for_prompt(self) -> str:
        """Format scratchpad for LLM context."""
        return f"""
Current Goal: {self.goal}

Completed Steps:
{self._format_completed()}

Intermediate Results:
{self._format_results()}

Current Thought: {self.current_thought}
"""
```

## Long-Term Memory: Vector Store

For persistent knowledge across sessions:

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from datetime import datetime

class LongTermMemory:
    """Persistent memory using vector similarity search."""
    
    def __init__(self, collection_name: str = "agent_memory"):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            collection_name=collection_name,
            embedding_function=self.embeddings,
            persist_directory="./memory_db"
        )
    
    def remember(self, content: str, memory_type: str, 
                 importance: int = 5, metadata: dict = None):
        """Store a new memory."""
        meta = {
            "type": memory_type,
            "importance": importance,
            "timestamp": datetime.now().isoformat(),
            **(metadata or {})
        }
        
        self.vectorstore.add_texts(
            texts=[content],
            metadatas=[meta]
        )
        self.vectorstore.persist()
    
    def recall(self, query: str, memory_type: str = None, 
               k: int = 5) -> list[str]:
        """Retrieve relevant memories."""
        filter_dict = {}
        if memory_type:
            filter_dict["type"] = memory_type
        
        results = self.vectorstore.similarity_search(
            query,
            k=k,
            filter=filter_dict
        )
        
        return [doc.page_content for doc in results]
    
    def recall_by_importance(self, min_importance: int = 7) -> list[str]:
        """Retrieve high-importance memories."""
        results = self.vectorstore.similarity_search(
            "",  # Empty query gets all
            k=100,
            filter={"importance": {"$gte": min_importance}}
        )
        return [doc.page_content for doc in results]


# Usage
memory = LongTermMemory()

# Store important facts
memory.remember(
    "User prefers Python over JavaScript",
    memory_type="preference",
    importance=8
)

memory.remember(
    "The API rate limit is 100 requests per minute",
    memory_type="fact",
    importance=9
)

# Later, recall relevant memories
relevant = memory.recall(
    "What programming language should I use?",
    memory_type="preference"
)
```

## Episodic Memory: Learning from Experience

Agents can learn from past interactions:

```python
class EpisodicMemory:
    """Store and learn from past agent experiences."""
    
    def __init__(self):
        self.episodes = []
        self.vectorstore = Chroma(
            collection_name="episodes",
            embedding_function=embeddings
        )
    
    def record_episode(self, task: str, actions: list[dict], 
                       outcome: str, success: bool):
        """Record a complete interaction episode."""
        episode = {
            "id": str(uuid.uuid4()),
            "task": task,
            "actions": actions,
            "outcome": outcome,
            "success": success,
            "timestamp": datetime.now().isoformat()
        }
        
        self.episodes.append(episode)
        
        # Store as searchable memory
        episode_text = f"""
Task: {task}
Actions taken: {self._summarize_actions(actions)}
Outcome: {outcome}
Success: {success}
"""
        self.vectorstore.add_texts(
            texts=[episode_text],
            metadatas=[{"episode_id": episode["id"], "success": success}]
        )
    
    def find_similar_successful(self, current_task: str) -> list[dict]:
        """Find past successful approaches to similar tasks."""
        results = self.vectorstore.similarity_search(
            current_task,
            k=3,
            filter={"success": True}
        )
        
        return [
            self._get_episode(doc.metadata["episode_id"])
            for doc in results
        ]
    
    def learn_from_episodes(self) -> str:
        """Generate insights from past experiences."""
        successful = [e for e in self.episodes if e["success"]]
        failed = [e for e in self.episodes if not e["success"]]
        
        # Use LLM to extract patterns
        learning_prompt = f"""
Analyze these agent experiences:

Successful tasks ({len(successful)}):
{self._format_episodes(successful[:10])}

Failed tasks ({len(failed)}):
{self._format_episodes(failed[:10])}

What patterns lead to success? What should be avoided?
"""
        
        insights = reflection_llm.invoke(learning_prompt)
        return insights.content
```

## State Management Patterns

### Pattern 1: Finite State Machine

For agents with well-defined states:

```python
from enum import Enum

class AgentState(Enum):
    IDLE = "idle"
    PLANNING = "planning"
    EXECUTING = "executing"
    WAITING_FOR_TOOL = "waiting_for_tool"
    REFLECTING = "reflecting"
    COMPLETED = "completed"
    ERROR = "error"

class StatefulAgent:
    def __init__(self):
        self.state = AgentState.IDLE
        self.context = {}
        self.transitions = {
            AgentState.IDLE: [AgentState.PLANNING],
            AgentState.PLANNING: [AgentState.EXECUTING, AgentState.ERROR],
            AgentState.EXECUTING: [AgentState.WAITING_FOR_TOOL, 
                                   AgentState.REFLECTING, 
                                   AgentState.COMPLETED],
            AgentState.WAITING_FOR_TOOL: [AgentState.EXECUTING],
            AgentState.REFLECTING: [AgentState.PLANNING, AgentState.COMPLETED],
            AgentState.COMPLETED: [AgentState.IDLE],
            AgentState.ERROR: [AgentState.IDLE, AgentState.PLANNING]
        }
    
    def transition(self, new_state: AgentState):
        if new_state not in self.transitions[self.state]:
            raise InvalidTransition(
                f"Cannot go from {self.state} to {new_state}"
            )
        self.state = new_state
```

### Pattern 2: Checkpoint and Resume

For long-running agents:

```python
import pickle
from pathlib import Path

class CheckpointableAgent:
    def __init__(self, checkpoint_dir: str = "./checkpoints"):
        self.checkpoint_dir = Path(checkpoint_dir)
        self.checkpoint_dir.mkdir(exist_ok=True)
    
    def save_checkpoint(self, task_id: str):
        """Save current state to disk."""
        checkpoint = {
            "messages": self.messages,
            "scratchpad": self.scratchpad,
            "current_step": self.current_step,
            "intermediate_results": self.intermediate_results,
            "timestamp": datetime.now().isoformat()
        }
        
        path = self.checkpoint_dir / f"{task_id}.pkl"
        with open(path, "wb") as f:
            pickle.dump(checkpoint, f)
    
    def load_checkpoint(self, task_id: str) -> bool:
        """Resume from a saved checkpoint."""
        path = self.checkpoint_dir / f"{task_id}.pkl"
        
        if not path.exists():
            return False
        
        with open(path, "rb") as f:
            checkpoint = pickle.load(f)
        
        self.messages = checkpoint["messages"]
        self.scratchpad = checkpoint["scratchpad"]
        self.current_step = checkpoint["current_step"]
        self.intermediate_results = checkpoint["intermediate_results"]
        
        return True
```

## Entity Memory: Tracking Specific Concepts

```python
from langchain.memory import ConversationEntityMemory

# Track entities mentioned in conversation
entity_memory = ConversationEntityMemory(
    llm=ChatOpenAI(model="gpt-3.5-turbo")
)

# After conversation...
entity_memory.save_context(
    {"input": "I work with John on the Prometheus project"},
    {"output": "Tell me more about the Prometheus project."}
)

# Entity memory tracks:
# - John: Person, works with user on Prometheus project
# - Prometheus: Project the user works on with John
```

> **Pro Tip**: Entity memory is excellent for customer support agents that need to track people, products, and issues mentioned in conversation.

## Key Takeaways

- **Short-term memory**: Conversation history for current session context
- **Working memory**: Scratchpad for intermediate results during a task
- **Long-term memory**: Vector store for persistent facts and knowledge
- **Episodic memory**: Learning from past successes and failures
- **State management**: Track agent state for complex, multi-step tasks
- Use **summarization** to manage long conversations within token limits
- **Checkpoint** long-running agents for resilience
- Memory type choice depends on your use case and performance requirements

## What's Next

In the next lesson, we'll explore **LangGraph**—a framework for building agents as state machines with sophisticated flow control.

---

*Estimated completion time: 30 minutes*
*Difficulty: Intermediate to Advanced*
