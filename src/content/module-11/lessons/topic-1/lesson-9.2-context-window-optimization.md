---
title: "Context Window Optimization"
module: 11
lesson: 2
topic: 1
duration: 40
difficulty: intermediate
objectives:
  - Apply token economics principles to optimize AI costs
  - Implement KV-cache optimization strategies
  - Design stable prompt prefixes for production systems
  - Build append-only context patterns
prerequisites:
  - Lesson 9.1: Beyond Prompt Engineering
  - Understanding of tokenization
---

# Context Window Optimization

> "The difference between a $100/month AI system and a $10,000/month AI system is often just context window management."

## The Economics of Context

### Token Costs Add Up Fast

Every token in your context window costs money — twice:

1. **Input tokens**: You pay to send them
2. **Processing overhead**: Larger contexts = slower responses

```
Model: GPT-4-Turbo
Input price: $10/1M tokens
Output price: $30/1M tokens

Scenario A: Minimal context (500 tokens avg)
- 100,000 requests/day × 500 tokens = 50M tokens
- Daily input cost: $500

Scenario B: Verbose context (5,000 tokens avg)
- 100,000 requests/day × 5,000 tokens = 500M tokens
- Daily input cost: $5,000

10x context = 10x cost
```

### The Hidden Cost: Latency

| Context Size | TTFT (Time to First Token) | User Experience |
|--------------|---------------------------|-----------------|
| 1,000 tokens | ~200ms | Instant |
| 5,000 tokens | ~500ms | Acceptable |
| 20,000 tokens | ~1.5s | Noticeable delay |
| 100,000 tokens | ~5s+ | User abandonment |

**Optimization isn't optional — it's essential for production.**

---

## Strategy 1: Token Budget Architecture

Design your context with explicit token budgets for each section.

```python
class ContextBudget:
    """Enforce token budgets for context sections."""
    
    TOTAL_BUDGET = 8000  # Reserve 8K for output
    
    ALLOCATIONS = {
        "system_prompt": 500,
        "user_profile": 200,
        "retrieved_docs": 3000,
        "conversation_history": 2000,
        "tool_descriptions": 500,
        "current_request": 500,
        "buffer": 300,
    }
    
    @classmethod
    def build_context(cls, components: dict) -> str:
        """Build context respecting all budgets."""
        final_context = []
        
        for section, budget in cls.ALLOCATIONS.items():
            content = components.get(section, "")
            
            if count_tokens(content) > budget:
                content = truncate_to_tokens(content, budget)
                logging.warning(f"{section} exceeded budget, truncated")
            
            final_context.append(content)
        
        return "\n\n".join(final_context)
```

### Budget Allocation Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTEXT WINDOW (16K tokens)                │
├─────────────────────────────────────────────────────────────┤
│ SYSTEM PROMPT (fixed)                          │ 500 tokens │
├─────────────────────────────────────────────────────────────┤
│ USER PROFILE (cached)                          │ 200 tokens │
├─────────────────────────────────────────────────────────────┤
│ RETRIEVED DOCUMENTS (dynamic)                  │ 3000 tokens│
│   - Primary doc: 1500                                        │
│   - Supporting: 1000                                         │
│   - Recent updates: 500                                      │
├─────────────────────────────────────────────────────────────┤
│ CONVERSATION HISTORY (compressed)              │ 2000 tokens│
│   - Summary of old: 500                                      │
│   - Recent 5 turns: 1500                                     │
├─────────────────────────────────────────────────────────────┤
│ TOOL DESCRIPTIONS (static)                     │ 500 tokens │
├─────────────────────────────────────────────────────────────┤
│ CURRENT REQUEST + BUFFER                       │ 800 tokens │
├─────────────────────────────────────────────────────────────┤
│ RESERVED FOR OUTPUT                            │ 8000 tokens│
└─────────────────────────────────────────────────────────────┘
```

---

## Strategy 2: KV-Cache Optimization

### Understanding the KV-Cache

LLMs process context by building a **key-value cache** — a representation of all tokens seen so far. When the same prefix appears repeatedly, the cache can be reused.

```
Request 1: [System Prompt] + [User Profile] + [Query A]
           ────────────────────────────────   ─────────
                    Cached (reused)           Computed

Request 2: [System Prompt] + [User Profile] + [Query B]
           ────────────────────────────────   ─────────
                    Cache HIT!                Computed
```

**Cache hit = Faster response + Lower cost (for some providers)**

### Maximizing Cache Hits

#### 1. Stable Prompt Prefixes

```python
# BAD: Dynamic elements in system prompt
def build_prompt():
    return f"""
    You are an assistant. Current time: {datetime.now()}
    Today is {date.today().strftime('%A, %B %d, %Y')}.
    Session ID: {uuid.uuid4()}
    ...
    """
# Cache miss on EVERY request!

# GOOD: Static prefix, dynamic suffix
SYSTEM_PROMPT = """
You are an assistant for ACME Corp.
You help customers with orders, returns, and product questions.
Always be professional and helpful.
"""  # This never changes

def build_prompt(user_context: str, query: str):
    return f"""
    {SYSTEM_PROMPT}
    
    Current context:
    {user_context}
    
    User query: {query}
    """
# System prompt cached!
```

#### 2. Consistent Ordering

```python
# BAD: Random ordering
def build_context(data: dict):
    sections = []
    for key, value in data.items():  # Dict ordering may vary
        sections.append(f"{key}: {value}")
    return "\n".join(sections)

# GOOD: Deterministic ordering
CONTEXT_ORDER = ["user", "history", "tools", "query"]

def build_context(data: dict):
    sections = []
    for key in CONTEXT_ORDER:
        if key in data:
            sections.append(f"{key}: {data[key]}")
    return "\n".join(sections)
```

#### 3. Append-Only Patterns

Never modify previous context — only append new information.

```python
class AppendOnlyContext:
    """Context that only grows, maximizing cache reuse."""
    
    def __init__(self, base_prompt: str):
        self.messages = [{"role": "system", "content": base_prompt}]
    
    def add_user_message(self, content: str):
        self.messages.append({"role": "user", "content": content})
    
    def add_assistant_message(self, content: str):
        self.messages.append({"role": "assistant", "content": content})
    
    def get_messages(self) -> list:
        """Return immutable view — never modify history."""
        return self.messages.copy()
    
    # Wrong: edit_message() — would invalidate cache
    # Wrong: insert_message() — would invalidate cache
```

---

## Strategy 3: Intelligent Truncation

When context exceeds limits, truncate intelligently.

### Naive Truncation (Bad)

```python
# Cuts off arbitrarily
def truncate_naive(text: str, max_tokens: int) -> str:
    tokens = tokenizer.encode(text)
    return tokenizer.decode(tokens[:max_tokens])
```

**Problems**:
- May cut mid-sentence
- Loses recent (most relevant) information
- No semantic awareness

### Smart Truncation (Good)

```python
def truncate_smart(
    conversation: list[Message],
    max_tokens: int,
    preserve_recent: int = 3
) -> list[Message]:
    """
    Truncate conversation while:
    1. Keeping system prompt
    2. Preserving most recent N turns
    3. Summarizing middle section
    """
    
    # Always keep system prompt
    system = conversation[0] if conversation[0].role == "system" else None
    
    # Separate recent from old
    recent = conversation[-preserve_recent * 2:]  # Last N exchanges
    old = conversation[1:-preserve_recent * 2]
    
    # Check if we need to summarize
    old_tokens = sum(count_tokens(m.content) for m in old)
    
    if old_tokens > max_tokens // 4:
        # Summarize old messages
        summary = llm.summarize(
            "\n".join(m.content for m in old),
            max_tokens=500
        )
        old = [Message(role="system", content=f"[Earlier conversation summary]: {summary}")]
    
    result = []
    if system:
        result.append(system)
    result.extend(old)
    result.extend(recent)
    
    return result
```

### Priority-Based Truncation

```python
class ContextSection:
    def __init__(self, content: str, priority: int, compressible: bool):
        self.content = content
        self.priority = priority  # 1 = highest
        self.compressible = compressible

def truncate_by_priority(
    sections: list[ContextSection],
    max_tokens: int
) -> str:
    """Truncate lowest priority first."""
    
    # Sort by priority (highest first)
    sorted_sections = sorted(sections, key=lambda s: s.priority)
    
    total_tokens = sum(count_tokens(s.content) for s in sorted_sections)
    
    if total_tokens <= max_tokens:
        return "\n\n".join(s.content for s in sorted_sections)
    
    # Start removing from lowest priority
    for section in reversed(sorted_sections):
        if total_tokens <= max_tokens:
            break
            
        if section.compressible:
            # Try compression first
            compressed = compress(section.content, target_ratio=0.5)
            saved = count_tokens(section.content) - count_tokens(compressed)
            section.content = compressed
            total_tokens -= saved
        else:
            # Remove entirely if not compressible
            total_tokens -= count_tokens(section.content)
            section.content = ""
    
    return "\n\n".join(s.content for s in sorted_sections if s.content)
```

---

## Strategy 4: Dynamic Context Loading

Don't include everything upfront — load on demand.

```python
class LazyContextLoader:
    """Load context sections only when needed."""
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self._user_profile = None
        self._order_history = None
        self._product_catalog = None
    
    @property
    def user_profile(self) -> str:
        """Load user profile only if accessed."""
        if self._user_profile is None:
            self._user_profile = db.get_user_profile(self.user_id)
        return self._user_profile
    
    def get_context_for_intent(self, intent: str) -> str:
        """Load only relevant context for detected intent."""
        
        base = f"User: {self.user_profile['name']}"
        
        if intent == "order_inquiry":
            return base + f"\nRecent orders: {self.get_recent_orders()}"
        
        elif intent == "product_question":
            return base + f"\nProduct catalog: {self.get_relevant_products()}"
        
        elif intent == "complaint":
            return base + f"\nPrevious issues: {self.get_issue_history()}"
        
        return base  # Minimal context for unknown intent
```

### Intent-Based Context Routing

```
User Query: "Where is my order?"
            ↓
    Intent Classification
            ↓
   intent = "order_inquiry"
            ↓
   Load: order_context_loader
            ↓
   Context: [Order #123, shipping status, tracking link]
            ↓
      Generate Response
```

---

## Strategy 5: Context Compression Techniques

### Summarization

```python
def compress_via_summary(content: str, target_tokens: int) -> str:
    """Use LLM to summarize while preserving key info."""
    
    prompt = f"""
    Summarize the following in about {target_tokens} tokens.
    Preserve:
    - All specific facts (numbers, dates, names)
    - Key decisions and outcomes
    - User preferences and constraints
    
    Content:
    {content}
    """
    
    return llm.complete(prompt, max_tokens=target_tokens)
```

### Entity Extraction

```python
def compress_to_entities(conversation: str) -> str:
    """Extract structured entities instead of raw text."""
    
    extraction_prompt = """
    Extract key entities from this conversation:
    - People mentioned (name, role, relationship)
    - Products (name, status, issues)
    - Dates (event, date)
    - Decisions (what, by whom)
    - Open issues (description, priority)
    
    Output as structured YAML.
    """
    
    entities = llm.complete(extraction_prompt + conversation)
    
    # YAML is more token-efficient than prose
    return f"Context entities:\n{entities}"
```

### Semantic Deduplication

```python
from sklearn.metrics.pairwise import cosine_similarity

def deduplicate_context(chunks: list[str], threshold: float = 0.85) -> list[str]:
    """Remove semantically duplicate content."""
    
    embeddings = embed_model.encode(chunks)
    
    keep = []
    keep_embeddings = []
    
    for i, (chunk, emb) in enumerate(zip(chunks, embeddings)):
        if not keep_embeddings:
            keep.append(chunk)
            keep_embeddings.append(emb)
            continue
        
        # Check similarity with all kept chunks
        similarities = cosine_similarity([emb], keep_embeddings)[0]
        
        if max(similarities) < threshold:
            # Sufficiently different, keep it
            keep.append(chunk)
            keep_embeddings.append(emb)
    
    return keep
```

---

## Monitoring & Observability

Track context metrics in production.

```python
import prometheus_client as prom

# Metrics
context_tokens = prom.Histogram(
    'ai_context_tokens',
    'Number of tokens in context',
    buckets=[100, 500, 1000, 2000, 5000, 10000, 20000]
)

cache_hit_rate = prom.Gauge(
    'ai_cache_hit_rate',
    'KV-cache hit rate (if available)'
)

context_build_time = prom.Histogram(
    'ai_context_build_seconds',
    'Time to build context'
)

truncation_events = prom.Counter(
    'ai_context_truncations',
    'Number of context truncation events',
    labelnames=['section']
)


def build_context_with_metrics(components: dict) -> str:
    """Build context while recording metrics."""
    
    with context_build_time.time():
        context = ContextBudget.build_context(components)
    
    tokens = count_tokens(context)
    context_tokens.observe(tokens)
    
    return context
```

---

## Hands-On: Optimize a Chatbot Context

**Scenario**: You have a customer service chatbot with the following context structure:

```python
current_context = f"""
System: You are a helpful assistant for ACME Corp customer service.
Current timestamp: {datetime.now().isoformat()}
Session: {session_id}

User Profile:
{json.dumps(user_data, indent=2)}

Complete Order History:
{json.dumps(all_orders, indent=2)}

Product Catalog:
{product_descriptions}

Full Conversation:
{all_messages}

User Query: {current_query}
"""
```

**Task**: Refactor this to apply all 5 optimization strategies. Aim for:
- 60% token reduction
- Stable prefix for cache hits
- Graceful truncation under load
- Intent-based loading

---

## Key Takeaways

1. **Token budgets** prevent context bloat and control costs
2. **Stable prefixes** maximize KV-cache hits for faster, cheaper inference
3. **Append-only patterns** maintain cache validity across conversation turns
4. **Smart truncation** preserves important information when space is limited
5. **Monitor everything** — you can't optimize what you don't measure

---

## What's Next

Next lesson: **Memory Architectures for AI Agents** — implementing persistent memory systems that give AI long-term recall without polluting context windows.
