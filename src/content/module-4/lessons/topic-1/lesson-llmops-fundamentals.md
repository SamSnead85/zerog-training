# Lesson: LLMOps Fundamentals

## Introduction

MLOps revolutionized how we deploy machine learning models. Now, **LLMOps** brings similar rigor to LLM-powered applications. But LLMs are different—they require new approaches for versioning, testing, monitoring, and optimization. This lesson covers the fundamentals of operating LLM systems in production.

## What Is LLMOps?

**LLMOps is the practice of deploying, managing, and optimizing Large Language Model applications in production.**

[Image: LLMOps lifecycle diagram showing development → testing → deployment → monitoring → improvement]

### LLMOps vs. Traditional MLOps

| Aspect | Traditional MLOps | LLMOps |
|--------|------------------|--------|
| Model training | Usually in-house | Usually API-based |
| Versioning | Model weights | Prompts + configs |
| Testing | Accuracy metrics | Behavioral testing |
| Input/Output | Structured | Unstructured text |
| Monitoring | Drift detection | Quality, toxicity, cost |
| Failure modes | Wrong predictions | Hallucinations, refusals |

## The LLMOps Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│    Prompts │ Chains │ Agents │ RAG │ Tools                  │
├─────────────────────────────────────────────────────────────┤
│                    ORCHESTRATION LAYER                       │
│    LangChain │ LlamaIndex │ LangGraph │ Custom              │
├─────────────────────────────────────────────────────────────┤
│                    MODEL LAYER                               │
│    OpenAI │ Anthropic │ Google │ Self-hosted                │
├─────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE LAYER                      │
│    Caching │ Rate Limiting │ Load Balancing │ Fallbacks     │
├─────────────────────────────────────────────────────────────┤
│                    OBSERVABILITY LAYER                       │
│    Logging │ Tracing │ Metrics │ Alerting                   │
└─────────────────────────────────────────────────────────────┘
```

## Prompt Management

### Prompt Versioning

Prompts are code. Treat them accordingly:

```python
# prompts/v1/summarizer.py
SUMMARIZER_PROMPT_V1 = """
Summarize the following text in 3 bullet points:

{text}
"""

# prompts/v2/summarizer.py
SUMMARIZER_PROMPT_V2 = """
You are an expert summarizer. Create a concise summary of the text below.

Format:
• One key insight per bullet
• Maximum 3 bullets
• Each bullet under 20 words

Text to summarize:
{text}

Summary:
"""
```

### Prompt Registry

```python
class PromptRegistry:
    """Central registry for all production prompts."""
    
    def __init__(self):
        self.prompts = {}
        self.versions = {}
    
    def register(self, name: str, version: str, prompt: str, 
                 metadata: dict = None):
        """Register a new prompt version."""
        key = f"{name}:{version}"
        self.prompts[key] = {
            "content": prompt,
            "version": version,
            "metadata": metadata or {},
            "registered_at": datetime.now()
        }
        
        # Track version history
        if name not in self.versions:
            self.versions[name] = []
        self.versions[name].append(version)
    
    def get(self, name: str, version: str = "latest") -> str:
        """Get a prompt by name and version."""
        if version == "latest":
            version = self.versions[name][-1]
        
        key = f"{name}:{version}"
        return self.prompts[key]["content"]
    
    def rollback(self, name: str, to_version: str):
        """Rollback to a previous version."""
        # Mark the previous version as active
        self.versions[name].append(to_version)


# Usage
registry = PromptRegistry()

registry.register(
    "summarizer",
    version="v2.1",
    prompt=SUMMARIZER_PROMPT_V2,
    metadata={
        "author": "team-ai",
        "tested": True,
        "performance": {"latency_p50_ms": 450}
    }
)
```

## LLM Testing Strategies

### Unit Testing for LLMs

Traditional unit tests don't work—LLM outputs are non-deterministic. Use behavioral testing instead:

```python
import pytest
from my_llm_app import summarize

class TestSummarizer:
    """Behavioral tests for summarization."""
    
    def test_output_format(self):
        """Output should have bullet points."""
        text = "Long article about climate change..."
        result = summarize(text)
        
        assert "•" in result or "-" in result  # Has bullets
        assert result.count("\n") >= 2  # Multiple lines
    
    def test_length_constraint(self):
        """Summary should be shorter than input."""
        text = "A" * 5000  # Long input
        result = summarize(text)
        
        assert len(result) < len(text) / 5  # At least 80% reduction
    
    def test_preserves_key_entities(self):
        """Important entities should be preserved."""
        text = "Apple CEO Tim Cook announced new products in Cupertino."
        result = summarize(text)
        
        # Key entities should survive
        assert "Apple" in result or "Tim Cook" in result
    
    def test_no_hallucination(self):
        """Output shouldn't invent facts not in input."""
        text = "The company reported $10M revenue."
        result = summarize(text)
        
        # Shouldn't invent different numbers
        if "$" in result:
            assert "10" in result or "10M" in result


def test_with_eval_llm():
    """Use an LLM to evaluate quality."""
    text = "Original article..."
    summary = summarize(text)
    
    evaluation = eval_llm.invoke(f"""
    Rate this summary on a scale of 1-10:
    
    Original: {text}
    Summary: {summary}
    
    Criteria: accuracy, completeness, conciseness
    
    Output only the number.
    """)
    
    score = int(evaluation.content.strip())
    assert score >= 7, f"Quality too low: {score}/10"
```

### Regression Testing

Track outputs over time to detect degradation:

```python
import hashlib
import json

class LLMRegressionTest:
    """Detect unexpected changes in LLM behavior."""
    
    def __init__(self, baseline_file: str):
        self.baseline_file = baseline_file
        self.baselines = self._load_baselines()
    
    def _load_baselines(self):
        try:
            with open(self.baseline_file) as f:
                return json.load(f)
        except FileNotFoundError:
            return {}
    
    def save_baseline(self, test_name: str, input_data: str, output: str):
        """Save a new baseline for comparison."""
        self.baselines[test_name] = {
            "input_hash": hashlib.md5(input_data.encode()).hexdigest(),
            "expected_output_structure": self._extract_structure(output),
            "expected_length_range": (len(output) * 0.5, len(output) * 1.5)
        }
        
        with open(self.baseline_file, 'w') as f:
            json.dump(self.baselines, f)
    
    def check_regression(self, test_name: str, input_data: str, 
                         new_output: str) -> dict:
        """Check if output deviates significantly from baseline."""
        baseline = self.baselines.get(test_name)
        if not baseline:
            return {"status": "no_baseline"}
        
        issues = []
        
        # Check length
        min_len, max_len = baseline["expected_length_range"]
        if not (min_len <= len(new_output) <= max_len):
            issues.append(f"Length {len(new_output)} outside expected range")
        
        # Check structure (e.g., JSON, bullets, sections)
        new_structure = self._extract_structure(new_output)
        if new_structure != baseline["expected_output_structure"]:
            issues.append("Output structure changed")
        
        return {
            "status": "fail" if issues else "pass",
            "issues": issues
        }
```

## Caching and Cost Optimization

### Semantic Caching

Cache not just exact matches, but semantically similar queries:

```python
from langchain.cache import InMemoryCache
from langchain_openai import OpenAIEmbeddings
import numpy as np

class SemanticCache:
    """Cache LLM responses by semantic similarity."""
    
    def __init__(self, similarity_threshold: float = 0.95):
        self.embeddings = OpenAIEmbeddings()
        self.cache = {}  # {embedding: response}
        self.threshold = similarity_threshold
    
    def _cosine_similarity(self, a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def get(self, query: str) -> str | None:
        """Get cached response if semantically similar query exists."""
        query_embedding = self.embeddings.embed_query(query)
        
        for cached_embedding, response in self.cache.items():
            similarity = self._cosine_similarity(
                query_embedding, 
                np.array(cached_embedding)
            )
            if similarity >= self.threshold:
                return response
        
        return None
    
    def set(self, query: str, response: str):
        """Cache a response."""
        query_embedding = tuple(self.embeddings.embed_query(query))
        self.cache[query_embedding] = response


# Usage
cache = SemanticCache(similarity_threshold=0.92)

def query_with_cache(query: str) -> str:
    # Check cache first
    cached = cache.get(query)
    if cached:
        print("Cache hit!")
        return cached
    
    # Cache miss - call LLM
    response = llm.invoke(query)
    cache.set(query, response.content)
    
    return response.content
```

> **Pro Tip**: Semantic caching can reduce API costs by 30-50% for applications with repetitive queries like customer support.

### Request Batching

```python
import asyncio
from openai import AsyncOpenAI

class LLMBatcher:
    """Batch multiple requests for efficiency."""
    
    def __init__(self, max_batch_size: int = 10, 
                 max_wait_ms: int = 100):
        self.client = AsyncOpenAI()
        self.max_batch_size = max_batch_size
        self.max_wait_ms = max_wait_ms
        self.pending = []
        self.lock = asyncio.Lock()
    
    async def add_request(self, messages: list) -> str:
        """Add request to batch and wait for result."""
        future = asyncio.Future()
        
        async with self.lock:
            self.pending.append((messages, future))
            
            if len(self.pending) >= self.max_batch_size:
                await self._process_batch()
        
        # Wait for result
        return await asyncio.wait_for(future, timeout=30)
    
    async def _process_batch(self):
        """Process all pending requests."""
        batch = self.pending
        self.pending = []
        
        # Execute in parallel
        tasks = [
            self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=messages
            )
            for messages, _ in batch
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Resolve futures
        for (_, future), result in zip(batch, results):
            if isinstance(result, Exception):
                future.set_exception(result)
            else:
                future.set_result(result.choices[0].message.content)
```

## Rate Limiting and Fallbacks

```python
from tenacity import retry, stop_after_attempt, wait_exponential
from openai import RateLimitError
import time

class ResilientLLMClient:
    """LLM client with retry, rate limiting, and fallbacks."""
    
    def __init__(self):
        self.primary = OpenAI()
        self.fallback = Anthropic()
        self.request_times = []
        self.rate_limit = 100  # requests per minute
    
    def _check_rate_limit(self):
        """Wait if we're exceeding rate limit."""
        now = time.time()
        minute_ago = now - 60
        
        # Count recent requests
        self.request_times = [t for t in self.request_times if t > minute_ago]
        
        if len(self.request_times) >= self.rate_limit:
            sleep_time = 60 - (now - self.request_times[0])
            time.sleep(sleep_time)
        
        self.request_times.append(now)
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=60),
        retry=lambda e: isinstance(e, RateLimitError)
    )
    def complete(self, messages: list) -> str:
        """Complete with retry and fallback."""
        self._check_rate_limit()
        
        try:
            response = self.primary.chat.completions.create(
                model="gpt-4-turbo",
                messages=messages
            )
            return response.choices[0].message.content
        
        except Exception as e:
            # Fallback to Claude
            print(f"Primary failed ({e}), trying fallback...")
            return self._fallback_complete(messages)
    
    def _fallback_complete(self, messages: list) -> str:
        response = self.fallback.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=self._convert_messages(messages)
        )
        return response.content[0].text
```

## Key Takeaways

- **LLMOps differs from MLOps**: Focus on prompts, behavioral testing, and unstructured outputs
- **Version your prompts**: Treat prompts as code with proper versioning and rollback
- **Test behavior, not outputs**: LLM outputs are non-deterministic—test structure and properties
- **Implement semantic caching**: Reduce costs by 30-50% for repetitive queries
- **Build resilience**: Rate limiting, retries, and fallbacks are essential
- **Monitor everything**: Cost, latency, quality, and failure rates

## What's Next

In the next lesson, we'll cover **Deployment Strategies** for LLM applications—containerization, scaling, and production architecture patterns.

---

*Estimated completion time: 35 minutes*
*Difficulty: Intermediate to Advanced*
