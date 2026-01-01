---
title: "Memory Architectures for AI Agents"
module: 11
lesson: 3
topic: 1
duration: 45
difficulty: advanced
objectives:
  - Design multi-tier memory architectures for production agents
  - Implement episodic, semantic, and procedural memory systems
  - Build memory compaction and retrieval pipelines
  - Apply memory patterns to real agent use cases
prerequisites:
  - Lesson 9.2: Context Window Optimization
  - Basic understanding of vector databases
---

# Memory Architectures for AI Agents

> "An AI without memory is like an employee with amnesia — helpful in the moment, useless over time."

## The Memory Problem

LLMs have no inherent memory. Every API call starts fresh. The "memory" you experience in ChatGPT is actually **conversation history being re-sent with every message**.

This creates fundamental limitations:

| Limitation | Impact |
|------------|--------|
| Context window limits | Can't remember arbitrarily long history |
| No cross-session memory | Every new session starts from scratch |
| No learning from experience | Same mistakes repeated forever |
| High token costs | Resending entire history is expensive |

**Memory architecture** solves these problems by storing information outside the context window and retrieving it strategically.

---

## The Three Types of Memory

Human memory research identifies three types that translate directly to AI systems:

### 1. Episodic Memory
**"What happened?"**

Memories of specific events, conversations, and interactions.

```python
class EpisodicMemory:
    """
    Stores specific events with timestamps and context.
    Example: "User complained about slow shipping on Jan 15"
    """
    
    def __init__(self, vector_store: VectorStore):
        self.store = vector_store
    
    def remember(
        self,
        event: str,
        metadata: dict,
        timestamp: datetime = None
    ):
        """Store an episodic memory."""
        record = {
            "content": event,
            "type": "episodic",
            "timestamp": timestamp or datetime.now(),
            "metadata": metadata,
            "embedding": embed(event)
        }
        self.store.insert(record)
    
    def recall(
        self,
        query: str,
        time_range: tuple = None,
        k: int = 5
    ) -> list[str]:
        """Retrieve relevant episodic memories."""
        filters = {"type": "episodic"}
        
        if time_range:
            filters["timestamp"] = {"$gte": time_range[0], "$lte": time_range[1]}
        
        results = self.store.search(
            query=embed(query),
            filters=filters,
            k=k
        )
        
        return [r["content"] for r in results]
```

**Use cases**:
- "What did this user complain about last time?"
- "What was the outcome of the previous negotiation?"
- "When did we last discuss this feature?"

---

### 2. Semantic Memory
**"What do I know?"**

General knowledge, facts, and learned information about entities.

```python
class SemanticMemory:
    """
    Stores facts and knowledge about entities.
    Example: "User prefers email over phone communication"
    """
    
    def __init__(self, knowledge_graph: KnowledgeGraph):
        self.graph = knowledge_graph
    
    def learn(
        self,
        subject: str,
        predicate: str,
        obj: str,
        confidence: float = 1.0
    ):
        """Store a fact as a knowledge triple."""
        # Check for contradictions
        existing = self.graph.query(subject, predicate)
        
        if existing and existing != obj:
            # Handle conflicting information
            self._resolve_conflict(subject, predicate, existing, obj)
        
        self.graph.upsert(
            subject=subject,
            predicate=predicate,
            object=obj,
            confidence=confidence,
            updated_at=datetime.now()
        )
    
    def recall(self, subject: str, predicate: str = None) -> dict:
        """Retrieve knowledge about a subject."""
        if predicate:
            return self.graph.query(subject, predicate)
        return self.graph.get_all_facts(subject)
    
    def extract_and_learn(self, conversation: str, entities: list[str]):
        """Extract facts from conversation and store."""
        extraction_prompt = f"""
        Extract facts about these entities from the conversation:
        Entities: {entities}
        
        Output as triples: (subject, predicate, object)
        Only extract clearly stated facts, not assumptions.
        
        Conversation:
        {conversation}
        """
        
        triples = llm.extract(extraction_prompt)
        
        for subject, predicate, obj in triples:
            self.learn(subject, predicate, obj, confidence=0.8)
```

**Use cases**:
- "What are this customer's communication preferences?"
- "What products has this user purchased?"
- "What are the key terms of this contract?"

---

### 3. Procedural Memory
**"How do I do things?"**

Learned patterns, workflows, and optimized behaviors.

```python
class ProceduralMemory:
    """
    Stores learned procedures and optimized behaviors.
    Example: "For billing questions, always check payment history first"
    """
    
    def __init__(self, pattern_store: PatternStore):
        self.store = pattern_store
    
    def learn_from_success(self, context: str, action: str, outcome: str):
        """Learn successful patterns."""
        if self._evaluate_outcome(outcome) > 0.8:  # Good outcome
            pattern = {
                "context_embedding": embed(context),
                "action": action,
                "success_rate": 1.0,
                "uses": 1
            }
            self._store_or_reinforce(pattern)
    
    def suggest_action(self, context: str) -> str:
        """Suggest action based on learned patterns."""
        similar_patterns = self.store.search(
            embed(context),
            k=3,
            min_success_rate=0.7
        )
        
        if similar_patterns:
            best = max(similar_patterns, key=lambda p: p["success_rate"])
            return best["action"]
        
        return None  # No learned pattern, fallback to LLM
    
    def _store_or_reinforce(self, pattern: dict):
        """Store new pattern or reinforce existing."""
        existing = self.store.find_similar(pattern["context_embedding"])
        
        if existing:
            # Reinforce: update success rate
            existing["uses"] += 1
            existing["success_rate"] = (
                existing["success_rate"] * (existing["uses"] - 1) + pattern["success_rate"]
            ) / existing["uses"]
            self.store.update(existing)
        else:
            self.store.insert(pattern)
```

**Use cases**:
- "What's the best first response for angry customers?"
- "Which approach works best for upselling?"
- "What questions should I ask for troubleshooting?"

---

## Memory Architecture Patterns

### Pattern 1: Tiered Memory

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT WINDOW                           │
│                   (Working Memory)                          │
│            ~8K tokens, millisecond access                   │
└────────────────────────┬────────────────────────────────────┘
                         │ overflow / retrieval
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    SHORT-TERM CACHE                         │
│               (Redis / In-Memory Store)                     │
│           Session data, recent context, <1ms access         │
└────────────────────────┬────────────────────────────────────┘
                         │ persistence / search
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    LONG-TERM STORE                          │
│            (Vector DB + Knowledge Graph)                    │
│      Episodic + Semantic + Procedural, <100ms access        │
└─────────────────────────────────────────────────────────────┘
```

### Pattern 2: Memory Buffer with Compaction

```python
class MemoryBuffer:
    """
    Manages context overflow with intelligent compaction.
    """
    
    def __init__(
        self,
        max_context_tokens: int = 4000,
        short_term_limit: int = 20,  # messages
        long_term_store: LongTermMemory = None
    ):
        self.max_tokens = max_context_tokens
        self.short_term_limit = short_term_limit
        self.long_term = long_term_store
        
        self.conversation = []
        self.summary = ""
    
    def add_message(self, role: str, content: str):
        """Add message, triggering compaction if needed."""
        self.conversation.append({"role": role, "content": content})
        
        if len(self.conversation) > self.short_term_limit:
            self._compact()
    
    def _compact(self):
        """Compact old messages into summary + long-term storage."""
        # Split: keep recent, summarize old
        cutoff = self.short_term_limit // 2
        old_messages = self.conversation[:cutoff]
        self.conversation = self.conversation[cutoff:]
        
        # Generate summary
        new_summary = self._summarize(old_messages)
        self.summary = self._merge_summaries(self.summary, new_summary)
        
        # Store important facts in long-term memory
        facts = self._extract_facts(old_messages)
        for fact in facts:
            self.long_term.store(fact)
    
    def get_context(self, query: str) -> str:
        """Build context for current query."""
        # Start with summary of old conversation
        context_parts = [f"[Previous conversation summary]: {self.summary}"]
        
        # Add relevant long-term memories
        relevant_memories = self.long_term.search(query, k=5)
        if relevant_memories:
            context_parts.append(
                f"[Relevant history]: {' | '.join(relevant_memories)}"
            )
        
        # Add recent conversation
        context_parts.append("[Recent messages]:")
        for msg in self.conversation:
            context_parts.append(f"{msg['role']}: {msg['content']}")
        
        return "\n".join(context_parts)
```

### Pattern 3: Memory Retrieval Pipeline

```python
class MemoryRetrievalPipeline:
    """
    Multi-stage memory retrieval with ranking.
    """
    
    def __init__(
        self,
        episodic: EpisodicMemory,
        semantic: SemanticMemory,
        procedural: ProceduralMemory
    ):
        self.episodic = episodic
        self.semantic = semantic
        self.procedural = procedural
    
    def retrieve(
        self,
        query: str,
        user_id: str,
        context: dict
    ) -> MemoryContext:
        """
        Retrieve relevant memories from all sources.
        """
        # Stage 1: Extract entities and intent
        entities = extract_entities(query)
        intent = classify_intent(query)
        
        # Stage 2: Parallel retrieval
        episodic_results = self.episodic.recall(
            query=query,
            filters={"user_id": user_id},
            k=5
        )
        
        semantic_results = []
        for entity in entities:
            facts = self.semantic.recall(entity)
            semantic_results.extend(facts)
        
        procedural_suggestion = self.procedural.suggest_action(query)
        
        # Stage 3: Rank and filter
        all_memories = episodic_results + semantic_results
        ranked = self._rerank(query, all_memories)
        
        # Stage 4: Fit to budget
        final_memories = self._fit_to_budget(ranked, max_tokens=1000)
        
        return MemoryContext(
            episodic=final_memories,
            semantic=semantic_results,
            suggested_action=procedural_suggestion
        )
    
    def _rerank(self, query: str, memories: list) -> list:
        """Re-rank memories by relevance to current query."""
        scores = rerank_model.score(query, memories)
        return sorted(zip(memories, scores), key=lambda x: -x[1])
    
    def _fit_to_budget(self, ranked: list, max_tokens: int) -> list:
        """Select top memories that fit in token budget."""
        selected = []
        tokens_used = 0
        
        for memory, score in ranked:
            memory_tokens = count_tokens(memory)
            if tokens_used + memory_tokens <= max_tokens:
                selected.append(memory)
                tokens_used += memory_tokens
            else:
                break
        
        return selected
```

---

## Memory Persistence Strategies

### Strategy 1: Real-Time Extraction

Extract and store memories during conversation.

```python
async def process_turn(user_message: str, assistant_response: str):
    """Extract memories in real-time after each turn."""
    
    # Don't block the main flow
    asyncio.create_task(
        extract_and_store_memories(
            user_message=user_message,
            assistant_response=assistant_response
        )
    )

async def extract_and_store_memories(user_message: str, assistant_response: str):
    """Background memory extraction."""
    
    extraction_prompt = f"""
    Extract memories from this exchange:
    
    User: {user_message}
    Assistant: {assistant_response}
    
    Extract:
    1. Any facts learned about the user (preferences, history, etc.)
    2. Any commitments or promises made
    3. Any issues or complaints mentioned
    4. Key decisions or outcomes
    
    Output as JSON with categories.
    """
    
    memories = await llm.extract(extraction_prompt)
    
    for category, items in memories.items():
        for item in items:
            await memory_store.add(item, category=category)
```

### Strategy 2: Batch Processing

Process conversations in batches for efficiency.

```python
class BatchMemoryProcessor:
    """Process conversations in batches."""
    
    def __init__(self, batch_size: int = 10):
        self.batch_size = batch_size
        self.queue = []
    
    async def add_to_queue(self, conversation: dict):
        """Add conversation to processing queue."""
        self.queue.append(conversation)
        
        if len(self.queue) >= self.batch_size:
            await self._process_batch()
    
    async def _process_batch(self):
        """Process all queued conversations."""
        batch = self.queue[:self.batch_size]
        self.queue = self.queue[self.batch_size:]
        
        # Batch extraction is more efficient
        prompt = f"""
        Extract memories from these {len(batch)} conversations:
        
        {json.dumps(batch)}
        
        For each conversation, extract key facts, decisions, and learnings.
        Output as structured JSON grouped by conversation_id.
        """
        
        all_memories = await llm.extract(prompt)
        
        for conv_id, memories in all_memories.items():
            await self._store_memories(conv_id, memories)
```

### Strategy 3: Periodic Reflection

Periodically review and consolidate memories.

```python
class MemoryReflector:
    """Periodically consolidate and reflect on memories."""
    
    async def daily_reflection(self, user_id: str):
        """Run daily reflection on user's memories."""
        
        # Gather all recent memories
        recent = await memory_store.get_recent(
            user_id=user_id,
            days=7
        )
        
        # Look for patterns and insights
        reflection_prompt = f"""
        Review these memories from the past week:
        
        {json.dumps(recent)}
        
        Identify:
        1. Recurring themes or issues
        2. Changes in user preferences or behavior
        3. Unresolved problems that persist
        4. Opportunities to provide better service
        
        Also identify memories that are:
        - Outdated and should be archived
        - Duplicates that should be merged
        - Conflicts that need resolution
        """
        
        insights = await llm.reflect(reflection_prompt)
        
        # Store insights as higher-level memories
        await memory_store.add(
            insights["summary"],
            category="reflections",
            importance="high"
        )
        
        # Clean up as suggested
        await self._cleanup(insights["cleanup_actions"])
```

---

## Putting It All Together: Agent Memory System

```python
class AgentMemorySystem:
    """
    Complete memory system for a production AI agent.
    """
    
    def __init__(
        self,
        user_id: str,
        vector_store: VectorStore,
        cache: Redis,
        config: MemoryConfig
    ):
        self.user_id = user_id
        self.config = config
        
        # Initialize memory tiers
        self.working = WorkingMemory(max_tokens=config.context_budget)
        self.short_term = ShortTermCache(cache, ttl=config.session_ttl)
        self.long_term = LongTermMemory(vector_store)
        
        # Initialize memory types
        self.episodic = EpisodicMemory(vector_store)
        self.semantic = SemanticMemory(knowledge_graph)
        self.procedural = ProceduralMemory(pattern_store)
        
        # Initialize pipeline
        self.retrieval = MemoryRetrievalPipeline(
            self.episodic, self.semantic, self.procedural
        )
    
    async def process_input(self, user_message: str) -> str:
        """Process user input with full memory context."""
        
        # Add to working memory
        self.working.add("user", user_message)
        
        # Retrieve relevant memories
        memories = await self.retrieval.retrieve(
            query=user_message,
            user_id=self.user_id,
            context=self.working.get_context()
        )
        
        # Build enriched context
        context = self.working.build_context(
            additional=memories.format()
        )
        
        # Generate response
        response = await llm.complete(context)
        
        # Add response to working memory
        self.working.add("assistant", response)
        
        # Background: extract and store memories
        asyncio.create_task(
            self._store_interaction(user_message, response)
        )
        
        return response
    
    async def _store_interaction(self, user_msg: str, assistant_msg: str):
        """Store interaction in appropriate memory systems."""
        
        # Store episodic memory
        await self.episodic.remember(
            event=f"User: {user_msg}\nAssistant: {assistant_msg}",
            metadata={"user_id": self.user_id}
        )
        
        # Extract and store semantic memories
        facts = await self.extract_facts(user_msg, assistant_msg)
        for fact in facts:
            await self.semantic.learn(*fact)
        
        # Update procedural memory if outcome is available
        if self.config.track_outcomes:
            outcome = await self.get_outcome()
            if outcome:
                await self.procedural.learn_from_success(
                    context=user_msg,
                    action=assistant_msg,
                    outcome=outcome
                )
```

---

## Key Takeaways

1. **Three memory types** (episodic, semantic, procedural) serve different purposes
2. **Tiered architecture** balances access speed with storage capacity
3. **Memory compaction** prevents unbounded growth while preserving value
4. **Retrieval pipelines** find relevant memories efficiently
5. **Continuous learning** happens through background extraction and reflection

---

## What's Next

Next lesson: **Model Context Protocol (MCP)** — the emerging standard for connecting AI to enterprise data sources, tools, and systems.
