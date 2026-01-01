# Lab: Production Context Engineering System

## Overview

In this hands-on lab, you'll build a complete context engineering system for a customer service agent. This isn't a toy example — you'll implement production-grade patterns used by companies like Stripe, Intercom, and Zendesk.

**Duration**: 90 minutes  
**Difficulty**: Advanced  
**Prerequisites**: Lessons 9.1-9.4

---

## Business Scenario

You're building an AI customer service agent for **TechCorp**, a SaaS company. The agent needs to:

1. Remember customer history across sessions
2. Access real-time order and subscription data
3. Follow company policies dynamically
4. Handle complex multi-turn conversations
5. Operate within strict token budgets

**The challenge**: The naive approach (dump everything into context) costs $50K/month. Your target: <$5K/month with better performance.

---

## Lab Objectives

By the end of this lab, you will have built:

- [ ] Multi-tier memory architecture (working, short-term, long-term)
- [ ] Context budget manager with intelligent truncation
- [ ] Dynamic context loader with intent-based routing
- [ ] Memory extraction and persistence pipeline
- [ ] Production-ready context assembly system

---

## Part 1: Context Budget Manager (25 minutes)

### Task 1.1: Implement Token Budget Allocation

Create a `ContextBudget` class that enforces strict token limits per section.

```python
# File: context_budget.py

from dataclasses import dataclass
from typing import Dict, List, Optional
import tiktoken

@dataclass
class BudgetAllocation:
    section: str
    budget: int
    priority: int  # 1 = highest (never truncate), 5 = lowest
    compressible: bool = True

class ContextBudget:
    """
    Manages token budgets for context sections.
    
    Your implementation should:
    1. Enforce per-section limits
    2. Track total usage
    3. Provide overflow handling
    """
    
    TOTAL_BUDGET = 8000  # Leave room for output
    
    ALLOCATIONS = [
        BudgetAllocation("system_prompt", 500, priority=1, compressible=False),
        BudgetAllocation("user_profile", 200, priority=2, compressible=False),
        BudgetAllocation("conversation_summary", 500, priority=2, compressible=True),
        BudgetAllocation("retrieved_context", 3000, priority=3, compressible=True),
        BudgetAllocation("recent_messages", 2000, priority=1, compressible=False),
        BudgetAllocation("tool_results", 1000, priority=2, compressible=True),
        BudgetAllocation("current_query", 500, priority=1, compressible=False),
    ]
    
    def __init__(self, tokenizer: str = "cl100k_base"):
        # TODO: Initialize tokenizer
        self.encoding = tiktoken.get_encoding(tokenizer)
        self.sections: Dict[str, str] = {}
        self.usage: Dict[str, int] = {}
    
    def count_tokens(self, text: str) -> int:
        """Count tokens in text."""
        # TODO: Implement
        pass
    
    def add_section(self, name: str, content: str) -> bool:
        """
        Add a section to the context.
        
        Returns True if added successfully, False if truncation was needed.
        """
        # TODO: Implement
        # 1. Find the budget allocation for this section
        # 2. Count tokens
        # 3. Truncate if over budget
        # 4. Store content
        pass
    
    def get_remaining_budget(self) -> int:
        """Get remaining tokens across all sections."""
        # TODO: Implement
        pass
    
    def build_context(self) -> str:
        """Assemble final context string."""
        # TODO: Implement
        pass
    
    def handle_overflow(self) -> None:
        """
        Handle total budget overflow by compressing lowest priority sections.
        """
        # TODO: Implement
        # 1. Calculate total usage
        # 2. If over budget, compress lowest priority compressible sections
        # 3. If still over, truncate lowest priority sections
        pass
```

### Task 1.2: Implement Smart Truncation

Add intelligent truncation that preserves meaning:

```python
def smart_truncate(self, content: str, target_tokens: int) -> str:
    """
    Truncate content intelligently:
    1. Prefer sentence boundaries
    2. Keep most recent content if conversation
    3. Preserve key entities
    """
    # TODO: Implement
    pass
```

### ✅ Checkpoint 1

Run the test to verify your budget manager:

```bash
python -m pytest tests/test_context_budget.py -v
```

Expected output:
```
test_budget_enforcement ... PASSED
test_overflow_handling ... PASSED
test_smart_truncation ... PASSED
```

---

## Part 2: Multi-Tier Memory System (30 minutes)

### Task 2.1: Implement Working Memory

Working memory holds the current conversation and immediate context.

```python
# File: memory/working.py

from typing import List, Dict
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Message:
    role: str  # "user", "assistant", "system"
    content: str
    timestamp: datetime = field(default_factory=datetime.now)
    metadata: Dict = field(default_factory=dict)

class WorkingMemory:
    """
    Manages the current conversation context.
    
    Features:
    - Fixed-size message buffer
    - Automatic summarization on overflow
    - Append-only for cache optimization
    """
    
    def __init__(
        self,
        max_messages: int = 20,
        max_tokens: int = 4000,
        summarizer = None
    ):
        self.max_messages = max_messages
        self.max_tokens = max_tokens
        self.summarizer = summarizer
        
        self.messages: List[Message] = []
        self.summary: str = ""
    
    def add_message(self, role: str, content: str, **metadata) -> None:
        """Add a message, triggering compaction if needed."""
        # TODO: Implement
        # 1. Create Message object
        # 2. Append to messages
        # 3. Check if compaction needed
        # 4. Compact if necessary
        pass
    
    def needs_compaction(self) -> bool:
        """Check if compaction is needed."""
        # TODO: Implement
        pass
    
    def compact(self) -> None:
        """
        Compact older messages into summary.
        Keep recent messages intact for cache optimization.
        """
        # TODO: Implement
        # 1. Split messages into old and recent
        # 2. Summarize old messages
        # 3. Merge with existing summary
        # 4. Keep only recent messages
        pass
    
    def get_context(self) -> str:
        """Build context string from working memory."""
        # TODO: Implement
        pass
```

### Task 2.2: Implement Long-Term Memory

Long-term memory persists across sessions using vector search.

```python
# File: memory/long_term.py

from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime
import numpy as np

@dataclass
class Memory:
    id: str
    content: str
    embedding: np.ndarray
    memory_type: str  # "episodic", "semantic", "procedural"
    metadata: Dict
    timestamp: datetime
    importance: float = 0.5

class LongTermMemory:
    """
    Persistence layer for long-term memories.
    
    Features:
    - Semantic search
    - Memory type filtering
    - Importance-based retrieval
    - Time decay
    """
    
    def __init__(self, vector_store, embedding_model):
        self.store = vector_store
        self.embed = embedding_model
    
    async def store_memory(
        self,
        content: str,
        memory_type: str,
        metadata: Dict = None,
        importance: float = 0.5
    ) -> str:
        """Store a new memory."""
        # TODO: Implement
        # 1. Generate embedding
        # 2. Create Memory object
        # 3. Store in vector store
        # 4. Return memory ID
        pass
    
    async def search(
        self,
        query: str,
        memory_types: List[str] = None,
        time_range: tuple = None,
        min_importance: float = 0.0,
        k: int = 5
    ) -> List[Memory]:
        """
        Search for relevant memories.
        
        Combines:
        - Semantic similarity
        - Memory type filtering
        - Time decay
        - Importance weighting
        """
        # TODO: Implement
        pass
    
    async def extract_and_store(
        self,
        conversation: str,
        user_id: str
    ) -> List[str]:
        """
        Extract memories from a conversation and store them.
        
        Should extract:
        - Facts about the user (semantic)
        - Specific events (episodic)
        - Successful patterns (procedural)
        """
        # TODO: Implement
        pass
```

### Task 2.3: Implement Memory Retrieval Pipeline

```python
# File: memory/retrieval.py

class MemoryRetrievalPipeline:
    """
    Multi-stage retrieval pipeline for optimal memory recall.
    """
    
    def __init__(
        self,
        working_memory: WorkingMemory,
        long_term_memory: LongTermMemory,
        reranker = None
    ):
        self.working = working_memory
        self.long_term = long_term_memory
        self.reranker = reranker
    
    async def retrieve(
        self,
        query: str,
        user_id: str,
        intent: str = None,
        max_tokens: int = 1000
    ) -> str:
        """
        Retrieve relevant context for the query.
        
        Pipeline:
        1. Get working memory context
        2. Search long-term memory
        3. Rerank results
        4. Fit to token budget
        5. Format for context
        """
        # TODO: Implement full pipeline
        pass
```

### ✅ Checkpoint 2

Run memory tests:

```bash
python -m pytest tests/test_memory.py -v
```

---

## Part 3: Dynamic Context Loading (20 minutes)

### Task 3.1: Intent-Based Context Router

```python
# File: context_router.py

from enum import Enum
from typing import Dict, Callable

class Intent(Enum):
    ORDER_INQUIRY = "order_inquiry"
    BILLING_QUESTION = "billing_question"
    TECHNICAL_SUPPORT = "technical_support"
    GENERAL_QUESTION = "general_question"
    COMPLAINT = "complaint"
    CANCELLATION = "cancellation"

class ContextRouter:
    """
    Routes queries to appropriate context loaders based on intent.
    """
    
    def __init__(self, intent_classifier, context_loaders: Dict[Intent, Callable]):
        self.classifier = intent_classifier
        self.loaders = context_loaders
    
    async def route(self, query: str, user_id: str) -> str:
        """
        Classify intent and load appropriate context.
        """
        # TODO: Implement
        # 1. Classify intent
        # 2. Get appropriate loader
        # 3. Load context
        # 4. Return formatted context
        pass


# Context loaders for each intent
async def load_order_context(user_id: str, query: str) -> str:
    """Load context for order inquiries."""
    # TODO: Implement
    # - Recent orders
    # - Shipping status
    # - Delivery estimates
    pass

async def load_billing_context(user_id: str, query: str) -> str:
    """Load context for billing questions."""
    # TODO: Implement
    # - Payment methods
    # - Recent invoices
    # - Subscription details
    pass

async def load_support_context(user_id: str, query: str) -> str:
    """Load context for technical support."""
    # TODO: Implement
    # - Product configuration
    # - Known issues
    # - Troubleshooting guides
    pass
```

---

## Part 4: Complete Context Assembly (15 minutes)

### Task 4.1: Production Context Assembler

Bring everything together:

```python
# File: context_assembler.py

class ProductionContextAssembler:
    """
    Production-ready context assembly system.
    
    Combines:
    - Context budget management
    - Multi-tier memory
    - Intent-based routing
    - Dynamic loading
    """
    
    def __init__(
        self,
        budget_manager: ContextBudget,
        memory_pipeline: MemoryRetrievalPipeline,
        context_router: ContextRouter,
        system_prompt: str
    ):
        self.budget = budget_manager
        self.memory = memory_pipeline
        self.router = context_router
        self.system_prompt = system_prompt
    
    async def assemble(
        self,
        user_id: str,
        query: str,
        conversation_history: List[Message] = None
    ) -> str:
        """
        Assemble complete context for a query.
        
        Steps:
        1. Add system prompt (fixed)
        2. Load user profile (cached)
        3. Retrieve relevant memories (dynamic)
        4. Load intent-specific context (dynamic)
        5. Add conversation history (compressed if needed)
        6. Add current query
        7. Handle overflow
        8. Return assembled context
        """
        # Reset budget manager
        self.budget = ContextBudget()
        
        # TODO: Implement full assembly pipeline
        
        # 1. System prompt
        self.budget.add_section("system_prompt", self.system_prompt)
        
        # 2. User profile
        user_profile = await self._load_user_profile(user_id)
        self.budget.add_section("user_profile", user_profile)
        
        # 3. Retrieved memories
        memories = await self.memory.retrieve(query, user_id)
        self.budget.add_section("retrieved_context", memories)
        
        # 4. Intent-specific context
        intent_context = await self.router.route(query, user_id)
        self.budget.add_section("intent_context", intent_context)
        
        # 5. Conversation history
        if conversation_history:
            history_str = self._format_history(conversation_history)
            self.budget.add_section("recent_messages", history_str)
        
        # 6. Current query
        self.budget.add_section("current_query", f"User: {query}")
        
        # 7. Handle any overflow
        self.budget.handle_overflow()
        
        # 8. Build and return
        return self.budget.build_context()
```

---

## Part 5: Testing & Validation

### Test Scenarios

Run the integration test suite:

```python
# File: tests/test_integration.py

import pytest
from context_assembler import ProductionContextAssembler

@pytest.fixture
def assembler():
    # Setup test assembler with mocked dependencies
    ...

@pytest.mark.asyncio
async def test_token_budget_respected(assembler):
    """Verify total context stays within budget."""
    context = await assembler.assemble(
        user_id="test_user",
        query="Where is my order?",
        conversation_history=[...]  # Long history
    )
    
    tokens = count_tokens(context)
    assert tokens <= 8000

@pytest.mark.asyncio
async def test_memory_retrieval_relevant(assembler):
    """Verify retrieved memories are relevant."""
    # Store specific memory
    await assembler.memory.long_term.store_memory(
        content="User complained about shipping on Jan 15",
        memory_type="episodic",
        metadata={"user_id": "test_user"}
    )
    
    # Query should retrieve it
    context = await assembler.assemble(
        user_id="test_user",
        query="Why was my last order delayed?"
    )
    
    assert "shipping" in context or "complained" in context

@pytest.mark.asyncio
async def test_intent_routing_correct(assembler):
    """Verify correct context is loaded per intent."""
    # Billing query should get billing context
    context = await assembler.assemble(
        user_id="test_user",
        query="Why was I charged twice?"
    )
    
    assert "invoice" in context.lower() or "payment" in context.lower()
```

### Run Tests

```bash
python -m pytest tests/ -v --cov=. --cov-report=term-missing
```

Expected coverage: >80%

---

## Extension Challenges

### Challenge 1: Cache Optimization

Implement KV-cache optimization by ensuring stable prefixes:

```python
def optimize_for_cache(self, context: str) -> str:
    """
    Reorganize context to maximize cache hits.
    Static sections first, dynamic sections last.
    """
    # TODO: Implement
    pass
```

### Challenge 2: Cost Tracking

Add cost tracking and alerting:

```python
class CostTracker:
    def track_request(self, input_tokens: int, output_tokens: int):
        """Track costs per request."""
        # TODO: Implement
        pass
    
    def get_daily_cost(self) -> float:
        """Get cumulative daily cost."""
        pass
    
    def alert_if_over_budget(self, daily_limit: float):
        """Send alert if approaching budget."""
        pass
```

### Challenge 3: A/B Testing

Implement A/B testing for context strategies:

```python
class ContextExperiment:
    def __init__(self, variants: Dict[str, ContextAssembler]):
        self.variants = variants
    
    async def run(self, user_id: str, query: str) -> tuple:
        """Run A/B test and return (context, variant_name, metrics)."""
        pass
```

---

## Submission Checklist

- [ ] All 5 checkpoints passing
- [ ] Integration tests passing with >80% coverage
- [ ] Token budget never exceeded in any test
- [ ] Memory retrieval returns relevant results
- [ ] Intent routing works correctly
- [ ] Code is well-documented
- [ ] At least 1 extension challenge completed

---

## Evaluation Rubric

| Criteria | Points |
|----------|--------|
| Budget manager works correctly | 20 |
| Memory system stores and retrieves | 25 |
| Intent routing is accurate | 15 |
| Full assembly works end-to-end | 20 |
| Code quality and documentation | 10 |
| Extension challenge(s) completed | 10 |
| **Total** | **100** |

**Passing score**: 75+

---

## Resources

- [LangChain Memory Documentation](https://python.langchain.com/docs/modules/memory/)
- [MCP Specification](https://modelcontextprotocol.io)
- [tiktoken Tokenizer](https://github.com/openai/tiktoken)
- [Pinecone Vector Database](https://docs.pinecone.io)
