# Lesson 3.2: Context Windows and Their Cost Implications

> **Duration**: 45 minutes | **Type**: Technical/Economic
> **Unit**: 3 - The Economics of AI

---

## 📚 Reading Material

### What Is a Context Window?

The **context window** is the maximum number of tokens a model can process in a single request—including both input and output.

**Current context limits (2024)**:
| Model | Context Window |
|-------|----------------|
| GPT-3.5-turbo | 16K |
| GPT-4o | 128K |
| GPT-4o-mini | 128K |
| Claude 3.5 Sonnet | 200K |
| Claude 3 Haiku | 200K |
| Gemini 1.5 Pro | 2M |
| Llama 3.1 | 128K |

**How much is 128K tokens?**
- ~300 pages of text
- A complete novel
- Entire codebase of a medium project
- Full documentation of a product

### Context Economics: The Hidden Multiplier

Here's what many developers miss: **context scales quadratically in attention**.

The attention mechanism computes relationships between all positions:
```
Memory ∝ O(n²)
Compute ∝ O(n²)
```

**Practical impact**:
- 4K context → baseline cost
- 8K context → ~2-3x cost
- 32K context → ~8-12x cost
- 128K context → significantly cheaper per token due to optimizations, but absolute cost grows

### Prompt Caching: A Game Changer

Many providers now offer **prompt caching**: if your input starts with the same tokens as a previous request, those tokens are cached and cost less.

**OpenAI Prompt Caching**:
- First request: full price
- Subsequent requests with same prefix: 50% discount on cached portion
- Cache valid for ~1 hour

**Anthropic Prompt Caching**:
- Cached input: 90% discount ($0.30 instead of $3.00 per 1M)
- Requires marking "cache breakpoints" in your prompts
- Minimum 2,048 tokens for caching

**When to use prompt caching**:
```python
# Without caching: repeating system prompt costs full price every time
messages = [
    {"role": "system", "content": long_system_prompt},  # 2000 tokens
    {"role": "user", "content": user_question}  # 50 tokens
]
# Every request: 2050 tokens at full price

# With caching: system prompt cached after first request
# Request 1: 2050 tokens full price (cache miss)
# Request 2+: 50 tokens at full price, 2000 at 50% off
# Savings: ~$1.25 per 1M requests
```

### Context Management Strategies

**Strategy 1: Sliding Window**
Keep only the most recent messages:
```python
def sliding_window(messages, max_tokens=4000):
    """Keep recent messages within token budget."""
    total = 0
    result = []
    for msg in reversed(messages):
        msg_tokens = count_tokens(msg['content'])
        if total + msg_tokens > max_tokens:
            break
        result.insert(0, msg)
        total += msg_tokens
    return result
```

**Strategy 2: Summarization**
Periodically summarize older context:
```python
def summarize_old_context(messages, summary_threshold=20):
    """Summarize old messages to compress context."""
    if len(messages) < summary_threshold:
        return messages
    
    old_messages = messages[:-10]
    recent_messages = messages[-10:]
    
    summary = llm_summarize(old_messages)
    
    return [
        {"role": "system", "content": f"Previous context summary: {summary}"},
        *recent_messages
    ]
```

**Strategy 3: RAG (Retrieve Only What's Needed)**
Don't put everything in context—retrieve relevant chunks:
```python
def rag_approach(user_query, documents, max_context=4000):
    """Retrieve only relevant document chunks."""
    query_embedding = embed(user_query)
    
    # Find most relevant chunks
    relevant_chunks = vector_search(query_embedding, documents, top_k=5)
    
    # Build context within budget
    context = ""
    for chunk in relevant_chunks:
        if count_tokens(context + chunk) > max_context:
            break
        context += chunk + "\n"
    
    return context
```

### The Long Context Tradeoff

**Advantages of long context**:
- Process entire documents
- Maintain conversation history
- Include comprehensive instructions
- Handle complex, multi-source queries

**Disadvantages**:
- Higher cost
- Increased latency (more to process)
- Potential "lost in the middle" effect
- Memory constraints

**"Lost in the middle" problem**: Research shows models attend best to the beginning and end of context, potentially missing important information in the middle.

---

## 🎬 Video Script

**[INTRO - Visualization of context window filling up]**

The context window is how much text a model can see at once. GPT-4 can handle 128,000 tokens—that's an entire novel. But bigger isn't always better.

**[CUT TO: Quadratic scaling diagram]**

Here's the catch. Attention scales quadratically. Double your context, and you roughly quadruple the computation. That's why long-context requests took forever... until recently.

**[CUT TO: Provider optimizations]**

Providers have gotten clever. Flash Attention, sparse attention, and other optimizations have made long context practical. But there's still a cost.

**[CUT TO: Prompt caching diagram]**

Now, prompt caching changes the economics completely. If your requests share the same prefix—like a system prompt—that portion can be cached. OpenAI gives 50% off cached tokens. Anthropic gives 90% off.

**[CUT TO: Calculation example]**

Let's do the math. You have a 2,000 token system prompt. Without caching, 1 million requests costs $5,000 just for that prompt. With Anthropic's caching? $500. That's 10x savings.

**[CUT TO: Context management strategies]**

But sometimes you don't need all that context. Three strategies:

Sliding window—keep only recent messages. Simple, but loses history.

Summarization—periodically compress old context into summaries. Preserves information, adds latency.

RAG—don't put everything in context. Retrieve only what's relevant to the current query. This is usually the best approach for document-heavy applications.

**[CUT TO: Lost in the middle diagram]**

One warning: the "lost in the middle" effect. Studies show models attend best to the beginning and end of their context. Information buried in the middle can be missed. Put critical information near the start or end.

**[CUT TO: Speaker on camera]**

The optimal strategy? Use long context when you need it, but don't fill it by default. Retrieve what's relevant. Cache what's constant. And always put important information where the model will see it.

**[END - Runtime: 6:45]**

---

## 🔬 Interactive Lab: Context Optimization

### Objective
Implement and test context management strategies.

### Part 1: Measure Context Costs (15 minutes)

```python
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

def analyze_conversation(messages):
    """Analyze token usage in a conversation."""
    cumulative = 0
    costs = []
    
    for i, msg in enumerate(messages, 1):
        tokens = len(enc.encode(msg['content']))
        cumulative += tokens
        
        # Calculate cost for this turn (GPT-4o pricing)
        # Each turn includes all previous context
        if msg['role'] == 'user':
            input_cost = (cumulative / 1_000_000) * 2.50
        else:
            input_cost = 0
            output_cost = (tokens / 1_000_000) * 10.00
        
        costs.append({
            'turn': i,
            'role': msg['role'],
            'tokens': tokens,
            'cumulative': cumulative,
        })
    
    return costs

# Simulate a conversation
conversation = [
    {"role": "system", "content": "You are a helpful assistant." * 50},  # Long system prompt
    {"role": "user", "content": "What is machine learning?"},
    {"role": "assistant", "content": "Machine learning is a subset of AI..."},
    {"role": "user", "content": "Can you give me an example?"},
    {"role": "assistant", "content": "Sure, consider spam filtering..."},
    {"role": "user", "content": "How does that relate to deep learning?"},
    {"role": "assistant", "content": "Deep learning is a subset of ML that uses neural networks..."},
    {"role": "user", "content": "What about transformers?"},
    {"role": "assistant", "content": "Transformers are a type of neural network architecture..."},
    {"role": "user", "content": "Can you summarize everything?"},
]

analysis = analyze_conversation(conversation)
print("Turn | Role      | Turn Tokens | Cumulative")
print("-" * 50)
for a in analysis:
    print(f" {a['turn']:2d}  | {a['role']:9s} | {a['tokens']:11d} | {a['cumulative']}")
```

### Part 2: Implement Sliding Window (20 minutes)

```python
def sliding_window_context(messages, max_tokens=2000, keep_system=True):
    """
    Keep only recent messages that fit within token budget.
    Optionally always keep the system message.
    """
    result = []
    token_count = 0
    
    # Always include system message if requested
    system_msg = None
    other_messages = []
    
    for msg in messages:
        if msg['role'] == 'system' and keep_system:
            system_msg = msg
        else:
            other_messages.append(msg)
    
    if system_msg:
        system_tokens = len(enc.encode(system_msg['content']))
        max_tokens -= system_tokens
        result.append(system_msg)
    
    # Add recent messages within budget
    for msg in reversed(other_messages):
        msg_tokens = len(enc.encode(msg['content']))
        if token_count + msg_tokens > max_tokens:
            break
        result.insert(len(result) if not system_msg else 1, msg)
        token_count += msg_tokens
    
    return result

# Test sliding window
compressed = sliding_window_context(conversation, max_tokens=500)
print(f"\nOriginal messages: {len(conversation)}")
print(f"After sliding window: {len(compressed)}")

total_original = sum(len(enc.encode(m['content'])) for m in conversation)
total_compressed = sum(len(enc.encode(m['content'])) for m in compressed)
print(f"Original tokens: {total_original}")
print(f"Compressed tokens: {total_compressed}")
print(f"Reduction: {(1 - total_compressed/total_original)*100:.1f}%")
```

### Part 3: Prompt Caching Simulation (20 minutes)

```python
class PromptCacheSimulator:
    def __init__(self, cache_discount=0.5):
        self.cache = {}
        self.cache_discount = cache_discount
        self.stats = {'hits': 0, 'misses': 0, 'saved': 0}
    
    def calculate_cost(self, system_prompt, user_content, output_tokens=100):
        """Calculate cost with caching."""
        system_tokens = len(enc.encode(system_prompt))
        user_tokens = len(enc.encode(user_content))
        
        # Check if system prompt is cached
        prompt_hash = hash(system_prompt)
        
        if prompt_hash in self.cache:
            # Cache hit - discount on system prompt
            self.stats['hits'] += 1
            cached_cost = (system_tokens / 1_000_000) * 2.50 * self.cache_discount
            full_cost = (system_tokens / 1_000_000) * 2.50
            self.stats['saved'] += full_cost - cached_cost
            system_cost = cached_cost
        else:
            # Cache miss - full price, then cache
            self.stats['misses'] += 1
            system_cost = (system_tokens / 1_000_000) * 2.50
            self.cache[prompt_hash] = True
        
        user_cost = (user_tokens / 1_000_000) * 2.50
        output_cost = (output_tokens / 1_000_000) * 10.00
        
        return system_cost + user_cost + output_cost
    
    def simulate_requests(self, system_prompt, user_prompts):
        """Simulate multiple requests."""
        total_cost = 0
        for user_content in user_prompts:
            cost = self.calculate_cost(system_prompt, user_content)
            total_cost += cost
        return total_cost

# Simulate 1000 requests with caching
cache = PromptCacheSimulator(cache_discount=0.5)
system_prompt = "You are a helpful AI assistant..." * 100  # ~500 tokens
user_queries = [f"Question {i}: What is...?" for i in range(1000)]

total_with_cache = cache.simulate_requests(system_prompt, user_queries)

# Compare to no caching
no_cache_cost = sum(
    (len(enc.encode(system_prompt)) + len(enc.encode(q))) / 1_000_000 * 2.50 + 0.001
    for q in user_queries
)

print(f"\nCaching Analysis:")
print(f"Cache hits: {cache.stats['hits']}")
print(f"Cache misses: {cache.stats['misses']}")
print(f"Total saved: ${cache.stats['saved']:.4f}")
print(f"Cost with caching: ${total_with_cache:.4f}")
print(f"Cost without caching: ${no_cache_cost:.4f}")
```

### Submission
Compare sliding window, summarization, and RAG approaches for a customer support scenario.

---

## ✅ Knowledge Check

### Question 1
Which model currently offers the largest context window?

A) GPT-4o (128K)  
B) Claude 3.5 Sonnet (200K)  
C) Gemini 1.5 Pro (2M)  
D) Llama 3.1 (128K)  

**Correct Answer**: C

**Explanation**: Gemini 1.5 Pro offers a 2 million token context window—the largest commercially available, equivalent to roughly 3,000 pages of text.

---

### Question 2
What does prompt caching provide?

A) Faster model responses  
B) Discounted pricing for repeated prompt prefixes  
C) Larger context windows  
D) Better model accuracy  

**Correct Answer**: B

**Explanation**: Prompt caching discounts tokens that match a cached prefix. OpenAI offers ~50% off; Anthropic offers ~90% off for cached portions.

---

### Question 3
What is the "lost in the middle" effect?

A) Messages get lost in transmission  
B) Models attend less to information in the middle of long contexts  
C) Middle-tier models are less accurate  
D) Tokens in the middle cost more  

**Correct Answer**: B

**Explanation**: Research shows models have stronger attention at the beginning and end of context, potentially missing or de-prioritizing information in the middle.

---

### Question 4
Which context management strategy retrieves only relevant information for each query?

A) Sliding window  
B) Summarization  
C) RAG (Retrieval Augmented Generation)  
D) Context stuffing  

**Correct Answer**: C

**Explanation**: RAG retrieves only the document chunks relevant to the current query, rather than including everything in context. This is efficient for document-heavy applications.

---

*You've completed Lesson 3.2! Understanding context management is essential for building scalable AI applications.*
