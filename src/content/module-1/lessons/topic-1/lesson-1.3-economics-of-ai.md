# Lesson 1.3: The Economics of AI

## Introduction

"Move fast and break things" doesn't work when each API call costs money. Understanding the economics of AI is crucial for building sustainable applications. In this lesson, you'll learn how to estimate costs, optimize for efficiency, and avoid the common pitfalls that can turn a promising project into a budget nightmare.

## The Cost Structure of LLM APIs

### How Pricing Works

Most LLM providers charge per token, with separate rates for input and output:

```python
# Typical pricing structure (as of late 2024)
PRICING = {
    "gpt-4-turbo": {
        "input": 0.01,   # per 1K tokens
        "output": 0.03,  # per 1K tokens
    },
    "gpt-3.5-turbo": {
        "input": 0.0005,  # 20x cheaper input
        "output": 0.0015, # 20x cheaper output
    },
    "claude-3-5-sonnet": {
        "input": 0.003,
        "output": 0.015,
    },
}
```

[Image: Bar chart comparing per-token costs across major providers]

### The Hidden Cost: Output is Expensive

Notice that output tokens cost 2-3x more than input tokens. This creates a design principle:

> **Pro Tip**: Design prompts to get concise responses. A response that's 50% shorter costs 50% less in output tokens.

```python
# Bad: Verbose prompt that encourages verbose response
prompt_verbose = "Please provide a comprehensive, detailed analysis..."

# Good: Prompt that encourages concise response
prompt_concise = """Analyze this code in 3 bullet points:
• Main issue (1 sentence)
• Root cause (1 sentence)  
• Fix (code snippet only)"""
```

## Cost Estimation Framework

### The Cost Calculation

```python
import tiktoken

class CostEstimator:
    def __init__(self, model="gpt-4-turbo"):
        self.model = model
        self.encoding = tiktoken.encoding_for_model("gpt-4")
        self.pricing = {
            "gpt-4-turbo": {"input": 0.01, "output": 0.03},
            "gpt-4": {"input": 0.03, "output": 0.06},
            "gpt-3.5-turbo": {"input": 0.0005, "output": 0.0015},
        }
    
    def estimate(self, input_text, estimated_output_tokens):
        """Estimate cost for a single API call."""
        input_tokens = len(self.encoding.encode(input_text))
        
        pricing = self.pricing[self.model]
        input_cost = (input_tokens / 1000) * pricing["input"]
        output_cost = (estimated_output_tokens / 1000) * pricing["output"]
        
        return {
            "input_tokens": input_tokens,
            "output_tokens": estimated_output_tokens,
            "input_cost": round(input_cost, 6),
            "output_cost": round(output_cost, 6),
            "total_cost": round(input_cost + output_cost, 6),
        }
    
    def estimate_monthly(self, calls_per_day, avg_input_tokens, 
                         avg_output_tokens):
        """Estimate monthly costs at scale."""
        per_call = self.estimate("x" * avg_input_tokens, avg_output_tokens)
        monthly_calls = calls_per_day * 30
        
        return {
            "calls_per_month": monthly_calls,
            "cost_per_call": per_call["total_cost"],
            "monthly_cost": round(per_call["total_cost"] * monthly_calls, 2),
        }

# Example: Customer support chatbot
estimator = CostEstimator("gpt-4-turbo")
monthly = estimator.estimate_monthly(
    calls_per_day=1000,
    avg_input_tokens=500,  # Question + context
    avg_output_tokens=300   # Response
)
print(f"Monthly cost: ${monthly['monthly_cost']}")  # ~$360/month
```

### Real-World Cost Scenarios

| Use Case | Model | Calls/Day | Monthly Cost |
|----------|-------|-----------|--------------|
| Customer Support Bot | GPT-3.5 | 1,000 | ~$30 |
| Customer Support Bot | GPT-4 | 1,000 | ~$600 |
| Code Review Tool | GPT-4 | 500 | ~$750 |
| Document Summarizer | GPT-3.5 | 5,000 | ~$75 |
| RAG Q&A System | GPT-4 | 2,000 | ~$1,200 |

> **Common Mistake**: Developers often prototype with GPT-4, then are shocked at production costs. Always estimate costs before choosing your model.

## Cost Optimization Strategies

### Strategy 1: Model Routing

Use expensive models only when necessary:

```python
from openai import OpenAI

client = OpenAI()

def smart_route(query: str, complexity: str = "auto"):
    """Route to appropriate model based on task complexity."""
    
    if complexity == "auto":
        # Simple heuristic: longer queries need better models
        complexity = "complex" if len(query) > 500 else "simple"
    
    if complexity == "simple":
        model = "gpt-3.5-turbo"  # 20x cheaper
    else:
        model = "gpt-4-turbo"
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": query}]
    )
    
    return response.choices[0].message.content

# Usage
answer = smart_route("What's 2+2?")  # Uses GPT-3.5
analysis = smart_route(complex_code_review)  # Uses GPT-4
```

### Strategy 2: Caching

Don't pay twice for the same answer:

```python
import hashlib
from functools import lru_cache

# Simple in-memory cache
@lru_cache(maxsize=1000)
def cached_llm_call(prompt_hash: str, model: str):
    """Cache LLM responses by prompt hash."""
    # Actual LLM call here
    pass

def get_response(prompt: str, model: str = "gpt-4-turbo"):
    """Get response with caching."""
    # Create hash of prompt for cache key
    prompt_hash = hashlib.md5(prompt.encode()).hexdigest()
    
    return cached_llm_call(prompt_hash, model)
```

For production, use Redis or a database:

```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)
CACHE_TTL = 3600  # 1 hour

def cached_llm_call(prompt: str, model: str):
    cache_key = f"llm:{model}:{hashlib.md5(prompt.encode()).hexdigest()}"
    
    # Check cache first
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Make API call
    response = call_llm(prompt, model)
    
    # Cache for future
    redis_client.setex(cache_key, CACHE_TTL, json.dumps(response))
    
    return response
```

### Strategy 3: Prompt Optimization

Every word in your prompt costs money:

```python
# Before: 150 tokens in system prompt
system_prompt_verbose = """
You are an expert software engineer with decades of experience 
in reviewing code. Your job is to carefully analyze the code 
provided and identify any bugs, security issues, or performance 
problems. Please be thorough in your analysis and provide 
detailed explanations for each issue you find.
"""

# After: 40 tokens, same behavior
system_prompt_optimized = """
Expert code reviewer. Identify:
- Bugs
- Security issues
- Performance problems
Reply with issue, location, and fix.
"""

# Savings: 110 tokens × $0.01/1K × 1000 calls/day × 30 days = $33/month
```

### Strategy 4: Streaming and Early Termination

Stop generation when you have what you need:

```python
from openai import OpenAI

client = OpenAI()

def stream_until_complete(prompt: str, stop_condition: callable):
    """Stream response and stop when condition is met."""
    
    stream = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    full_response = ""
    for chunk in stream:
        if chunk.choices[0].delta.content:
            full_response += chunk.choices[0].delta.content
            
            # Stop early if we got what we need
            if stop_condition(full_response):
                break
    
    return full_response

# Example: Stop when we find the answer
response = stream_until_complete(
    "List 5 programming languages",
    lambda r: r.count('\n') >= 5  # Stop after 5 items
)
```

## Latency Considerations

Cost isn't everything—speed matters too:

| Model | Typical Latency | Tokens/Second |
|-------|-----------------|---------------|
| GPT-3.5 Turbo | 0.5-1s first token | 60-80 |
| GPT-4 Turbo | 1-2s first token | 30-40 |
| Claude 3.5 Sonnet | 0.5-1.5s first token | 50-70 |

```python
import time
from openai import OpenAI

def measure_performance(prompt: str, model: str):
    """Measure latency and throughput of API call."""
    client = OpenAI()
    
    start = time.time()
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    
    end = time.time()
    
    output_tokens = response.usage.completion_tokens
    latency = end - start
    
    return {
        "latency_seconds": round(latency, 2),
        "output_tokens": output_tokens,
        "tokens_per_second": round(output_tokens / latency, 1)
    }
```

## The Economics Decision Framework

```
┌─────────────────────────────────────────────────────────┐
│                    Task Analysis                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Is accuracy critical? │
              └───────────────────────┘
                    │           │
                   Yes          No
                    │           │
                    ▼           ▼
              ┌─────────┐  ┌─────────────┐
              │ GPT-4   │  │ GPT-3.5     │
              │ Claude  │  │ or smaller  │
              └─────────┘  └─────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  High volume (>1K/day)?│
              └───────────────────────┘
                    │           │
                   Yes          No
                    │           │
                    ▼           ▼
              ┌─────────┐  ┌─────────────┐
              │ Caching │  │ Direct calls│
              │ Routing │  │ are fine    │
              └─────────┘  └─────────────┘
```

## Key Takeaways

- **Output tokens cost 2-3x more** than input tokens—optimize for concise responses
- **Estimate costs early**: A 10,000 user app can cost $100 or $10,000/month depending on choices
- **Use model routing**: Simple tasks → cheap models, complex tasks → powerful models
- **Cache aggressively**: Identical prompts should use cached responses
- **Optimize prompts**: Every unnecessary word costs money at scale
- **Consider latency**: Users won't wait 5 seconds for a response

## What's Next

Now that you understand the fundamentals of AI economics, we'll explore the AI Development Stack—the ecosystem of tools, providers, and frameworks that power modern AI applications.

---

*Estimated completion time: 25 minutes*
*Difficulty: Foundational*
