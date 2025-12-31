# Lesson 4.3: Optimization for Cost and Speed

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Production Prompting

---

## 📚 Reading Material

### The Optimization Imperative

At scale, small inefficiencies compound:
- 10% extra tokens × 1M requests = significant cost
- 100ms extra latency × user patience = abandonment

### Cost Levers

| Lever | Impact | Effort |
|-------|--------|--------|
| Model selection | 10-100x | Low |
| Token reduction | 2-5x | Medium |
| Prompt caching | 50-90% | Low |
| Batching | Variable | Medium |

### Model Selection Optimization

```python
# Route by complexity
def select_model(task_complexity):
    if task_complexity == "simple":
        return "gpt-4o-mini"  # $0.15/1M input
    elif task_complexity == "medium":
        return "gpt-4o"  # $2.50/1M input
    else:
        return "o1"  # Premium reasoning
```

### Token Reduction

**Shorter system prompts**:
```
BEFORE (100 tokens):
"You are a helpful AI assistant working for Acme Corp. Your goal is to 
provide excellent customer service by answering questions thoroughly
and professionally while maintaining a friendly tone..."

AFTER (30 tokens):
"You are Acme's support agent. Be helpful, professional, concise."
```

**Compress few-shot examples**:
```
BEFORE: 5 verbose examples (500 tokens)
AFTER: 3 minimal examples (150 tokens)
```

### Prompt Caching

OpenAI prompt caching (automatic for repeating prefixes):
```python
# First call: full cost
# Subsequent calls with same prefix: 50% discount on cached portion
```

Anthropic prompt caching (explicit):
```python
messages=[
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": LONG_CONTEXT,
                "cache_control": {"type": "ephemeral"}  # Cache this
            },
            {"type": "text", "text": user_question}
        ]
    }
]
```

### Latency Optimization

**Streaming**:
```python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    stream=True
)
for chunk in stream:
    print(chunk.choices[0].delta.content, end="")
```

**Parallel requests**:
```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def parallel_calls(prompts):
    tasks = [
        async_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": p}]
        )
        for p in prompts
    ]
    return await asyncio.gather(*tasks)
```

**Batching** (for non-urgent):
```python
# OpenAI Batch API - 50% cost reduction
batch = client.batches.create(
    input_file_id=file.id,
    endpoint="/v1/chat/completions",
    completion_window="24h"
)
```

---

## 🎬 Video Script

**[INTRO - Cost chart]**

At scale, every token matters. Let me show you how to optimize for cost and speed without sacrificing quality.

**[CUT TO: Model selection]**

Model selection is your biggest lever. GPT-4o-mini costs 15x less than GPT-4o for many tasks. Route simple tasks to smaller models, complex tasks to larger ones.

**[CUT TO: Token reduction]**

Reduce tokens aggressively. Shorter system prompts. Fewer examples. Remove unnecessary context. Every token saved multiplies across all requests.

**[CUT TO: Caching]**

Prompt caching saves 50-90% on repeated prefixes. OpenAI caches automatically. Anthropic lets you mark content for caching explicitly.

**[CUT TO: Parallel/streaming]**

For latency: stream responses for faster perceived speed. Parallelize independent requests. Batch non-urgent work for 50% off.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What typically provides the largest cost reduction?

A) Token reduction  
B) Model selection (using smaller models where appropriate)  
C) Caching  
D) Batching  

**Correct Answer**: B

**Explanation**: Model selection can provide 10-100x cost reduction. GPT-4o-mini vs GPT-4o is ~15x cheaper.

---

*You've completed Lesson 4.3! You can now optimize for cost and speed.*
