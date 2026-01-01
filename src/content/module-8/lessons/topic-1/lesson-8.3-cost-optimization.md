# Lesson: Cost Optimization Strategies for LLM Applications

## Overview

In this lesson, you'll learn proven strategies to reduce LLM costs by 50-90% without sacrificing quality. We'll cover prompt optimization, model selection, caching, and architectural patterns for cost-effective AI applications.

**Duration**: 20 minutes  
**Prerequisites**: Module 4 (LLMOps basics)

## Learning Objectives

By the end of this lesson, you will:
- Apply model tiering for cost optimization
- Implement semantic caching for repeated queries
- Optimize prompts for token efficiency
- Use model distillation for high-volume use cases
- Set up cost monitoring and alerts

---

## Understanding LLM Costs

### Pricing Model

LLMs charge per token:

| Model | Input (per 1M) | Output (per 1M) |
|-------|----------------|-----------------|
| GPT-4o | $2.50 | $10.00 |
| GPT-4o mini | $0.15 | $0.60 |
| GPT-4 Turbo | $10.00 | $30.00 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Claude 3 Haiku | $0.25 | $1.25 |

**Key insight**: Output tokens cost 3-4x more than input tokens.

### Cost Formula

```python
def calculate_cost(input_tokens: int, output_tokens: int, model: str) -> float:
    """Calculate API cost for a request."""
    pricing = {
        "gpt-4o": {"input": 2.50, "output": 10.00},
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
        "gpt-4-turbo": {"input": 10.00, "output": 30.00},
    }
    
    rates = pricing.get(model, pricing["gpt-4o-mini"])
    
    cost = (
        input_tokens * rates["input"] / 1_000_000 +
        output_tokens * rates["output"] / 1_000_000
    )
    
    return cost
```

---

## Strategy 1: Model Tiering

Route requests to appropriate models based on complexity.

```python
from enum import Enum
from dataclasses import dataclass

class Tier(Enum):
    SIMPLE = "simple"      # Formatting, extraction
    STANDARD = "standard"  # General Q&A, summarization
    COMPLEX = "complex"    # Reasoning, analysis
    CRITICAL = "critical"  # High-stakes decisions

TIER_MODELS = {
    Tier.SIMPLE: "gpt-4o-mini",
    Tier.STANDARD: "gpt-4o-mini",
    Tier.COMPLEX: "gpt-4o",
    Tier.CRITICAL: "gpt-4o",
}


def classify_request(request: str) -> Tier:
    """Classify request complexity."""
    
    # Simple: short, formatting tasks
    if len(request) < 100 and any(kw in request.lower() for kw in 
                                    ["format", "convert", "extract"]):
        return Tier.SIMPLE
    
    # Complex: requires reasoning
    if any(kw in request.lower() for kw in 
           ["analyze", "compare", "evaluate", "recommend"]):
        return Tier.COMPLEX
    
    # Critical: high stakes
    if any(kw in request.lower() for kw in 
           ["legal", "medical", "financial", "security"]):
        return Tier.CRITICAL
    
    return Tier.STANDARD


def get_model_for_request(request: str) -> str:
    """Get appropriate model based on request complexity."""
    tier = classify_request(request)
    return TIER_MODELS[tier]
```

### Cost Savings

| Approach | Cost per 1M requests |
|----------|---------------------|
| All GPT-4o | $12,500 |
| All GPT-4o mini | $750 |
| **Tiered (70/20/10)** | **$2,175** |

**Savings**: 83% vs. all GPT-4o

---

## Strategy 2: Semantic Caching

Cache responses for semantically similar queries.

```python
import hashlib
import numpy as np
from openai import OpenAI
import redis

client = OpenAI()
cache = redis.Redis()

class SemanticCache:
    """Cache responses using semantic similarity."""
    
    def __init__(self, threshold: float = 0.95):
        self.threshold = threshold
        self.embeddings = {}
    
    def _get_embedding(self, text: str) -> list[float]:
        """Get embedding for text."""
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    
    def _cosine_similarity(self, a: list, b: list) -> float:
        """Calculate cosine similarity."""
        a, b = np.array(a), np.array(b)
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def get(self, query: str) -> str | None:
        """Get cached response for similar query."""
        query_embedding = self._get_embedding(query)
        
        # Check all cached queries
        for cached_query, data in self.embeddings.items():
            similarity = self._cosine_similarity(
                query_embedding, data["embedding"]
            )
            
            if similarity >= self.threshold:
                print(f"Cache hit! Similarity: {similarity:.3f}")
                return data["response"]
        
        return None
    
    def set(self, query: str, response: str):
        """Cache query and response."""
        embedding = self._get_embedding(query)
        self.embeddings[query] = {
            "embedding": embedding,
            "response": response
        }


# Usage
cache = SemanticCache(threshold=0.92)

def cached_completion(prompt: str) -> str:
    # Check cache first
    cached = cache.get(prompt)
    if cached:
        return cached
    
    # Call API
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    
    result = response.choices[0].message.content
    
    # Cache result
    cache.set(prompt, result)
    
    return result
```

### Cost Savings

For a support bot with 30% repeat queries:
- Without cache: $1,000/month
- With cache: $700/month + $50 embeddings
- **Savings: 25%**

---

## Strategy 3: Prompt Optimization

Reduce tokens while maintaining quality.

### Compression Techniques

```python
# BEFORE: 450 tokens
VERBOSE_PROMPT = """
I would like you to help me with a customer service inquiry. 
The customer has sent us an email expressing their concerns about 
their recent order. They mentioned that the product they received 
was not what they expected, and they would like to return it. 
Please help me compose a polite and professional response that 
addresses their concerns, explains our return policy, and provides 
them with the steps they need to follow to initiate a return.

Customer's email:
{email}

Please write a response that is helpful and empathetic.
"""

# AFTER: 180 tokens
OPTIMIZED_PROMPT = """
Write a customer service reply for this email.
Include: Our return policy, return steps.
Tone: Professional, empathetic.

Email: {email}

Reply:
"""
```

### System Prompt Optimization

```python
# VERBOSE: 200 tokens
VERBOSE_SYSTEM = """
You are a highly skilled customer service representative for TechCorp, 
a company that specializes in selling electronic products. Your role 
is to assist customers with their inquiries, resolve their issues, 
and ensure they have a positive experience. You should always be polite, 
professional, and helpful. When responding to customers, make sure to 
address their concerns thoroughly and provide clear, actionable steps...
"""

# OPTIMIZED: 80 tokens
OPTIMIZED_SYSTEM = """
TechCorp customer support agent.
- Be helpful, professional, concise
- Include actionable next steps
- Escalate if: refund >$500, legal threat, safety issue
"""
```

### Savings: 60% token reduction

---

## Strategy 4: Output Length Control

Reduce expensive output tokens.

```python
def controlled_completion(
    prompt: str,
    max_tokens: int = 150,
    model: str = "gpt-4o-mini"
) -> str:
    """Generate completion with controlled output length."""
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        # Encourage conciseness in the prompt
    )
    
    return response.choices[0].message.content


# Prompt engineering for brevity
CONCISE_PROMPT = """
{question}

Answer in 1-2 sentences. Be direct and specific.
"""
```

---

## Strategy 5: Model Distillation

Train smaller models on larger model outputs.

```python
# Step 1: Generate training data with GPT-4o
def generate_training_data(prompts: list[str]) -> list[dict]:
    """Generate training examples using GPT-4o."""
    examples = []
    
    for prompt in prompts:
        response = client.chat.completions.create(
            model="gpt-4o",  # Teacher model
            messages=[{"role": "user", "content": prompt}]
        )
        
        examples.append({
            "messages": [
                {"role": "user", "content": prompt},
                {"role": "assistant", "content": response.choices[0].message.content}
            ]
        })
    
    return examples


# Step 2: Fine-tune GPT-4o-mini on the data
def create_fine_tune(training_file: str):
    """Create fine-tuning job."""
    
    # Upload training file
    file = client.files.create(
        file=open(training_file, "rb"),
        purpose="fine-tune"
    )
    
    # Create fine-tuning job
    job = client.fine_tuning.jobs.create(
        training_file=file.id,
        model="gpt-4o-mini-2024-07-18"  # Student model
    )
    
    return job.id
```

### Cost Comparison

| Approach | Cost per 1M requests |
|----------|---------------------|
| GPT-4o direct | $12,500 |
| Fine-tuned GPT-4o-mini | $900 |
| **Savings** | **93%** |

---

## Strategy 6: Batching Requests

Group requests for efficiency.

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def batch_completions(prompts: list[str]) -> list[str]:
    """Process multiple prompts in parallel."""
    
    async def single_completion(prompt):
        response = await async_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    
    tasks = [single_completion(p) for p in prompts]
    results = await asyncio.gather(*tasks)
    
    return results


# Usage
prompts = ["Summarize X", "Translate Y", "Analyze Z"]
results = asyncio.run(batch_completions(prompts))
```

---

## Cost Monitoring Dashboard

Track and alert on costs.

```python
from prometheus_client import Counter, Gauge

# Metrics
cost_counter = Counter(
    'llm_cost_dollars',
    'Total LLM costs',
    ['model', 'department', 'application']
)

daily_budget = Gauge(
    'llm_daily_budget_remaining',
    'Remaining daily budget'
)


def track_cost(model: str, input_tokens: int, output_tokens: int,
               department: str, app: str):
    """Track API cost."""
    cost = calculate_cost(input_tokens, output_tokens, model)
    
    cost_counter.labels(
        model=model,
        department=department,
        application=app
    ).inc(cost)
    
    # Update budget
    remaining = get_daily_budget() - get_daily_spend()
    daily_budget.set(remaining)
    
    # Alert if over threshold
    if remaining < 10:
        send_alert(f"Budget nearly depleted: ${remaining:.2f} remaining")
```

---

## Key Takeaways

1. **Model tiering** routes simple requests to cheaper models
2. **Semantic caching** eliminates redundant API calls
3. **Prompt optimization** reduces input tokens by 50%+
4. **Output control** reduces expensive output tokens
5. **Distillation** creates cheap, specialized models
6. **Monitoring** prevents cost surprises

### Combined Savings Example

| Strategy | Savings |
|----------|---------|
| Model tiering | 50-80% |
| Caching | 10-30% |
| Prompt optimization | 30-50% |
| Output control | 20-40% |
| **Combined** | **70-90%** |

---

## Next Steps

- **Lab**: Build a cost-optimized RAG pipeline
- **Next Lesson**: Leading AI Transformation
- **Advanced**: Building cost allocation and chargeback systems
