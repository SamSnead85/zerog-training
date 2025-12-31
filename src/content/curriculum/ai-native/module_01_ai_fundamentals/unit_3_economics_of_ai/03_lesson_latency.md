# Lesson 3.3: Latency, Throughput, and Performance Tradeoffs

> **Duration**: 45 minutes | **Type**: Technical/Practical
> **Unit**: 3 - The Economics of AI

---

## 📚 Reading Material

### Why Latency Matters

**Latency** is the time from request to response. In AI applications, high latency destroys user experience:

| Use Case | Acceptable Latency | Poor Latency |
|----------|-------------------|--------------|
| Chatbot | < 1 second first token | > 3 seconds |
| Autocomplete | < 100ms | > 500ms |
| Real-time assistant | < 500ms | > 2 seconds |
| Batch processing | Minutes acceptable | N/A |

### The Latency Equation

**Total latency = Network + Queue + Processing**

```
Time to First Token (TTFT) = 
    Network latency +
    Queue wait time +
    Prompt processing time

Time to Last Token (TTLT) = 
    TTFT + 
    (Output tokens × Time per token)
```

### Factors Affecting Latency

**1. Model Size**
Larger models are slower. GPT-4 is slower than GPT-3.5.

**2. Input Length**
More input tokens = more processing time

**3. Output Length**
Each output token is generated sequentially (~50-100ms per token)

**4. Provider Load**
Peak hours mean longer queue times

**5. Network Distance**
Physical distance to API servers matters

### Throughput: The Other Dimension

**Throughput** = requests processed per second

For batch processing, throughput matters more than individual latency.

**Typical throughput limits**:
| Provider | Tier | Requests/min | Tokens/min |
|----------|------|--------------|------------|
| OpenAI | Free | 3 | 40,000 |
| OpenAI | Tier 1 | 500 | 200,000 |
| OpenAI | Tier 5 | 10,000 | 30,000,000 |
| Anthropic | Free | 5 | 40,000 |
| Anthropic | Scale | Custom | Custom |

### Streaming: Perceived vs Actual Latency

**Streaming** sends tokens as they're generated:

```python
# Non-streaming: wait for entire response
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a poem"}],
)
# User waits 5 seconds, then sees entire poem

# Streaming: see tokens as they arrive
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a poem"}],
    stream=True
)
for chunk in stream:
    print(chunk.choices[0].delta.content, end="")
# User sees first words in 200ms, poem builds over 5 seconds
```

**Same total time, radically different experience**.

### The Speed-Quality-Cost Triangle

You can optimize for two, not all three:

```
        Speed
         /\
        /  \
       /    \
      /______\
  Quality    Cost
```

| Optimize For | Sacrifice | Example |
|--------------|-----------|---------|
| Speed + Quality | Cost | GPT-4o with high rate limits |
| Speed + Cost | Quality | GPT-3.5-turbo or Haiku |
| Quality + Cost | Speed | Batch API with delays |

### Optimization Strategies

**1. Use Smaller Models When Possible**
```python
# Classification doesn't need GPT-4
def classify_intent(text):
    return llm.generate(
        model="gpt-4o-mini",  # Fast and cheap
        prompt=f"Classify: {text}"
    )
```

**2. Reduce Output Length**
```python
# Request concise responses
prompt = f"""Answer in ONE sentence: {question}"""
```

**3. Implement Caching**
```python
import hashlib

response_cache = {}

def cached_llm(prompt):
    key = hashlib.sha256(prompt.encode()).hexdigest()
    if key in response_cache:
        return response_cache[key]
    
    response = llm.generate(prompt)
    response_cache[key] = response
    return response
```

**4. Use Batch API for Non-Urgent Work**
```python
# OpenAI Batch API - 50% cost savings, 24-hour delivery
batch_request = {
    "custom_id": "request-1",
    "method": "POST",
    "url": "/v1/chat/completions",
    "body": {
        "model": "gpt-4o",
        "messages": [{"role": "user", "content": "..."}]
    }
}
```

**5. Parallelize Independent Requests**
```python
import asyncio

async def parallel_requests(prompts):
    tasks = [llm.agenerate(p) for p in prompts]
    return await asyncio.gather(*tasks)
```

### Provider Selection for Latency

| Need | Best Options |
|------|-------------|
| Lowest latency | Groq (Llama), Anthropic |
| Most throughput | OpenAI Batch, Anthropic |
| Fastest GPT-4 class | GPT-4o-mini |
| Best for real-time | OpenAI Realtime API |

---

## 🎬 Video Script

**[INTRO - Stopwatch animation showing latency]**

Response time can make or break your AI application. Users expect chat responses in under a second. Autocomplete needs to be nearly instant. Let's understand what drives latency and how to optimize it.

**[CUT TO: Latency breakdown diagram]**

Total latency has three parts. Network time to reach the server. Queue time if the service is busy. And processing time—encoding your input and generating output.

**[CUT TO: Token generation animation]**

Here's the key insight: output tokens are generated one at a time. At roughly 50 to 100 milliseconds per token, a 200-token response takes 10 to 20 seconds of generation time alone. That's why longer responses feel slow.

**[CUT TO: Streaming comparison]**

Streaming changes perception dramatically. Same total time, but users see the first word in 200 milliseconds instead of waiting 20 seconds. The response feels instant even though it takes just as long to complete.

**[CUT TO: Speed-Quality-Cost triangle]**

You face a fundamental tradeoff. Speed, quality, cost—pick two. Want the best model fast? Pay more. Want cheap and fast? Accept lower quality. Want cheap and high quality? Wait longer.

**[CUT TO: Model comparison chart]**

Smaller models are faster. GPT-4o-mini responds faster than GPT-4o. Claude Haiku faster than Claude Sonnet. For many tasks, the speed improvement is worth more than the marginal quality difference.

**[CUT TO: Caching code example]**

The fastest LLM call is the one you don't make. Cache responses to identical prompts. You'd be surprised how often users ask similar questions.

**[CUT TO: Batch API diagram]**

For non-urgent work, batch APIs offer 50% cost savings. You submit requests, they're processed within 24 hours. Perfect for data processing, content generation, anything that doesn't need immediate turnaround.

**[CUT TO: Speaker on camera]**

The strategy: use streaming for everything user-facing. Choose the smallest model that meets quality requirements. Cache aggressively. Batch non-urgent work. And always measure—your latency numbers will surprise you.

**[END - Runtime: 6:28]**

---

## 🔬 Interactive Lab: Latency Measurement and Optimization

### Objective
Measure, analyze, and optimize AI response latency.

### Part 1: Measure Baseline Latency (15 minutes)

```python
import time
from openai import OpenAI

client = OpenAI()

def measure_latency(model, prompt, num_runs=5):
    """Measure latency statistics for a model."""
    ttfts = []  # Time to first token
    tttls = []  # Total time
    output_lengths = []
    
    for _ in range(num_runs):
        start = time.time()
        first_token_time = None
        output_tokens = 0
        
        stream = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            stream=True,
            max_tokens=100
        )
        
        for chunk in stream:
            if chunk.choices[0].delta.content:
                if first_token_time is None:
                    first_token_time = time.time() - start
                output_tokens += 1
        
        total_time = time.time() - start
        ttfts.append(first_token_time or total_time)
        tttls.append(total_time)
        output_lengths.append(output_tokens)
    
    return {
        "model": model,
        "avg_ttft": sum(ttfts) / len(ttfts),
        "avg_total": sum(tttls) / len(tttls),
        "avg_tokens": sum(output_lengths) / len(output_lengths),
        "tokens_per_sec": sum(output_lengths) / sum(tttls)
    }

# Compare models
models = ["gpt-4o-mini", "gpt-4o"]
prompt = "Explain machine learning in 3 sentences."

print("Latency Comparison")
print("-" * 60)
for model in models:
    result = measure_latency(model, prompt)
    print(f"\n{model}:")
    print(f"  Time to First Token: {result['avg_ttft']*1000:.0f}ms")
    print(f"  Total Time: {result['avg_total']*1000:.0f}ms")
    print(f"  Tokens/second: {result['tokens_per_sec']:.1f}")
```

### Part 2: Implement Response Caching (20 minutes)

```python
import hashlib
import json
import os

class ResponseCache:
    def __init__(self, cache_file="llm_cache.json"):
        self.cache_file = cache_file
        self.cache = self._load_cache()
        self.stats = {"hits": 0, "misses": 0}
    
    def _load_cache(self):
        if os.path.exists(self.cache_file):
            with open(self.cache_file, 'r') as f:
                return json.load(f)
        return {}
    
    def _save_cache(self):
        with open(self.cache_file, 'w') as f:
            json.dump(self.cache, f)
    
    def _make_key(self, model, messages, **kwargs):
        """Create a unique key for this request."""
        key_data = {
            "model": model,
            "messages": messages,
            **kwargs
        }
        return hashlib.sha256(json.dumps(key_data, sort_keys=True).encode()).hexdigest()
    
    def get(self, model, messages, **kwargs):
        """Check cache for response."""
        key = self._make_key(model, messages, **kwargs)
        if key in self.cache:
            self.stats["hits"] += 1
            return self.cache[key]
        self.stats["misses"] += 1
        return None
    
    def set(self, model, messages, response, **kwargs):
        """Store response in cache."""
        key = self._make_key(model, messages, **kwargs)
        self.cache[key] = response
        self._save_cache()

# Use the cache
cache = ResponseCache()

def cached_completion(model, messages, **kwargs):
    """LLM call with caching."""
    # Check cache
    cached = cache.get(model, messages, **kwargs)
    if cached:
        print("[CACHE HIT]")
        return cached
    
    print("[CACHE MISS]")
    # Make actual API call
    start = time.time()
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        **kwargs
    )
    elapsed = time.time() - start
    
    result = {
        "content": response.choices[0].message.content,
        "latency_ms": elapsed * 1000
    }
    
    # Store in cache
    cache.set(model, messages, result, **kwargs)
    
    return result

# Test caching
messages = [{"role": "user", "content": "What is 2+2?"}]

# First call - cache miss
result1 = cached_completion("gpt-4o-mini", messages, max_tokens=50)
print(f"First call: {result1['latency_ms']:.0f}ms")

# Second call - cache hit
start = time.time()
result2 = cached_completion("gpt-4o-mini", messages, max_tokens=50)
cache_latency = (time.time() - start) * 1000
print(f"Second call: {cache_latency:.2f}ms")
print(f"Speedup: {result1['latency_ms']/cache_latency:.0f}x")
```

### Part 3: Parallel Request Optimization (15 minutes)

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def single_request(prompt, model="gpt-4o-mini"):
    """Make a single async request."""
    response = await async_client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50
    )
    return response.choices[0].message.content

async def parallel_requests(prompts, model="gpt-4o-mini"):
    """Make multiple requests in parallel."""
    tasks = [single_request(p, model) for p in prompts]
    return await asyncio.gather(*tasks)

# Compare sequential vs parallel
prompts = [
    "What is 1+1?",
    "What is 2+2?",
    "What is 3+3?",
    "What is 4+4?",
    "What is 5+5?",
]

# Sequential (simulated)
start = time.time()
for p in prompts:
    asyncio.run(single_request(p))
sequential_time = time.time() - start

# Parallel
start = time.time()
results = asyncio.run(parallel_requests(prompts))
parallel_time = time.time() - start

print(f"\nSequential: {sequential_time:.2f}s")
print(f"Parallel: {parallel_time:.2f}s")
print(f"Speedup: {sequential_time/parallel_time:.1f}x")
```

### Submission
Benchmark your own use case and implement at least one optimization strategy.

---

## ✅ Knowledge Check

### Question 1
What is "Time to First Token" (TTFT)?

A) Total response time  
B) Time until the first token is received  
C) Time to tokenize input  
D) Token count of the response  

**Correct Answer**: B

**Explanation**: TTFT measures how long until the user sees the first token of the response. This is critical for perceived responsiveness, especially with streaming enabled.

---

### Question 2
Why does streaming improve user experience without reducing total time?

A) It compresses the response  
B) Users see output progressively, reducing perceived wait time  
C) It uses faster servers  
D) It reduces token count  

**Correct Answer**: B

**Explanation**: Streaming shows tokens as they're generated. Users start reading immediately instead of waiting for the complete response. Same total time, much better perceived experience.

---

### Question 3
What's the main advantage of OpenAI's Batch API?

A) 50% cost reduction for non-urgent requests  
B) Faster responses  
C) Better quality  
D) Larger context windows  

**Correct Answer**: A

**Explanation**: The Batch API offers 50% cost savings in exchange for 24-hour delivery. Perfect for bulk processing, content generation, and other non-time-sensitive workloads.

---

### Question 4
Which strategy provides the fastest "response" time?

A) Using the largest model  
B) Caching for repeated queries  
C) Increasing output length  
D) Disabling streaming  

**Correct Answer**: B

**Explanation**: Cached responses are returned instantly (sub-millisecond) since no API call is needed. This provides the fastest possible "response" for repeated queries.

---

*You've completed Lesson 3.3! Understanding latency tradeoffs helps you build responsive AI applications.*
