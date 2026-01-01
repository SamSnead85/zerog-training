# Video Script: Module 4 - LLMOps Fundamentals

## Video Overview
- **Title**: LLMOps: From Development to Production
- **Duration**: 14 minutes
- **Target Audience**: Developers and DevOps engineers deploying LLM apps
- **Learning Objectives**: LLMOps stack, prompt management, caching, fallbacks

---

## Scene 1: The Production Reality Check (0:00 - 1:00)

### Visuals
- Split screen: dev environment vs production chaos
- Error logs, latency spikes, cost graphs

### Narration
"Your LLM application works perfectly in development. Then you deploy it, and reality hits. Requests time out. Costs explode. Users get inconsistent responses. Welcome to the world of LLMOps—the practices that separate hobby projects from production systems."

### On-screen Stats
- "70% of LLM projects fail to reach production" - Source
- "Average LLM app has 3-5x cost overruns in first month"

---

## Scene 2: LLMOps vs Traditional MLOps (1:00 - 2:30)

### Visuals
- Comparison table animation
- Architecture diagrams

### Narration
"If you know MLOps, forget most of it. LLMOps is different because the model isn't yours—it's an API. Your job isn't training. It's everything else."

### Comparison Table
| Traditional MLOps | LLMOps |
|-------------------|--------|
| Train models | Manage prompts |
| Version model weights | Version prompt templates |
| Feature stores | Vector stores |
| Batch inference | Real-time API calls |
| Model retraining | Prompt optimization |

### Key Insight
"In LLMOps, your prompts ARE your model. Treat them with the same rigor you'd treat model code."

---

## Scene 3: The LLMOps Stack (2:30 - 5:00)

### Visuals
- Layered architecture diagram building up
- Each layer animates in with examples

### Narration
"Let me show you the complete LLMOps stack. You need every layer."

### Stack Diagram (Bottom to Top)

```
┌─────────────────────────────────────────────┐
│            Observability Layer              │
│    (Logging, Metrics, Tracing, Alerts)     │
├─────────────────────────────────────────────┤
│           Reliability Layer                 │
│    (Caching, Rate Limiting, Fallbacks)     │
├─────────────────────────────────────────────┤
│            Testing Layer                    │
│    (Evals, Regression Testing, A/B)        │
├─────────────────────────────────────────────┤
│          Prompt Management                  │
│    (Versioning, Registry, Templates)       │
├─────────────────────────────────────────────┤
│         Orchestration Layer                 │
│    (LangChain, LangGraph, Custom)          │
├─────────────────────────────────────────────┤
│             LLM APIs                        │
│    (OpenAI, Anthropic, Local Models)       │
└─────────────────────────────────────────────┘
```

---

## Scene 4: Prompt Management (5:00 - 7:00)

### Visuals
- Git history animation
- Prompt registry UI mockup
- Version comparison

### Narration
"Your prompts will change. A lot. You need to track every version, know who changed what, and be able to roll back instantly."

### Code Demo
```python
from prompt_registry import PromptRegistry

registry = PromptRegistry()

# Register a new prompt version
registry.register(
    name="customer-support",
    version="v2.1.0",
    template="""
    You are a helpful support agent for {{company}}.
    ...
    """,
    metadata={
        "author": "sam@scalednative.com",
        "tested": True,
        "eval_score": 0.92
    }
)

# In production, always load by name
prompt = registry.get_active("customer-support")
```

### Best Practices
1. Version prompts like code (semantic versioning)
2. Require approval for production prompts
3. Track performance metrics per version
4. Keep a changelog

---

## Scene 5: Caching Strategies (7:00 - 9:00)

### Visuals
- Before/after latency graphs
- Cost reduction animation
- Cache hit/miss visualization

### Narration
"Caching is your superpower. Identical or similar requests happen constantly. Why pay for the same response twice?"

### Caching Types

**1. Exact Match Cache**
```python
import hashlib
import redis

def cached_completion(prompt: str, model: str):
    # Create cache key from prompt + model
    cache_key = hashlib.sha256(f"{model}:{prompt}".encode()).hexdigest()
    
    # Check cache
    cached = redis.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Call LLM
    response = openai.chat.completions.create(...)
    
    # Cache response
    redis.setex(cache_key, 3600, json.dumps(response))
    return response
```

**2. Semantic Cache**
```python
# Cache similar requests using embeddings
def semantic_cache(query: str, threshold: float = 0.95):
    embedding = embed(query)
    
    # Find similar cached responses
    similar = vectorstore.search(embedding, k=1)
    
    if similar and similar[0].score > threshold:
        return similar[0].response
    
    # No cache hit, call LLM
    response = llm.invoke(query)
    
    # Store for future
    vectorstore.add(embedding, response)
    return response
```

### Impact Animation
- "Cache hit rate: 40-60% typical"
- "Cost reduction: 40-60%"
- "Latency improvement: 10x for hits"

---

## Scene 6: Rate Limiting & Fallbacks (9:00 - 11:00)

### Visuals
- Rate limit dashboard
- Fallback chain diagram
- Error handling flow

### Narration
"APIs fail. They get rate limited. They have outages. Your application can't fail with them."

### Rate Limiting
```python
from ratelimit import limits, sleep_and_retry

@sleep_and_retry
@limits(calls=100, period=60)  # 100 calls per minute
def rate_limited_call(prompt: str):
    return openai.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
```

### Fallback Chain
```python
class FallbackLLM:
    def __init__(self):
        self.providers = [
            ("openai", "gpt-4-turbo"),
            ("anthropic", "claude-3-5-sonnet"),
            ("openai", "gpt-3.5-turbo"),  # Cheaper fallback
        ]
    
    def invoke(self, prompt: str) -> str:
        for provider, model in self.providers:
            try:
                return self.call(provider, model, prompt)
            except Exception as e:
                logger.warning(f"{provider}/{model} failed: {e}")
                continue
        
        raise Exception("All providers failed")
```

### Key Points (Animated)
- Set up alerts at 80% rate limit
- Always have a fallback provider
- Consider a cheaper model as last resort
- Implement circuit breakers for repeated failures

---

## Scene 7: Testing LLM Applications (11:00 - 13:00)

### Visuals
- Test matrix
- Evaluation dashboard
- A/B test results

### Narration
"You can't unit test LLMs the traditional way. Outputs are non-deterministic. But you can build a robust evaluation framework."

### Evaluation Approaches

**1. Assertion Testing**
```python
def test_customer_support():
    response = agent.invoke("How do I reset my password?")
    
    # Check for required elements
    assert "reset" in response.lower()
    assert "password" in response.lower()
    assert len(response) > 50  # Not too short
    assert "error" not in response.lower()
```

**2. LLM-as-Judge**
```python
def evaluate_response(query: str, response: str) -> float:
    judge_prompt = f"""
    Rate this response on a scale of 1-5:
    
    User Query: {query}
    Response: {response}
    
    Criteria:
    - Accuracy (1-5)
    - Helpfulness (1-5)
    - Tone (1-5)
    
    Return only the average score.
    """
    
    score = float(llm.invoke(judge_prompt))
    return score
```

**3. Regression Testing**
```python
# Run against known good examples
def regression_test():
    results = []
    for example in GOLDEN_EXAMPLES:
        response = agent.invoke(example["input"])
        score = evaluate_response(example["input"], response)
        results.append({
            "input": example["input"],
            "expected": example["expected"],
            "actual": response,
            "score": score
        })
    
    avg_score = sum(r["score"] for r in results) / len(results)
    assert avg_score >= 0.8, f"Regression detected: {avg_score}"
```

---

## Scene 8: Conclusion (13:00 - 14:00)

### Visuals
- Quick recap of the stack
- Checklist animation
- Call to action

### Narration
"Let's recap. LLMOps is your insurance policy for production. Version your prompts. Cache aggressively. Set up fallbacks. Test systematically. Monitor everything. Do these things, and your LLM applications will actually make it to production—and stay there."

### Production Readiness Checklist
- [ ] Prompts versioned and registered
- [ ] Caching implemented
- [ ] Rate limiting in place
- [ ] Fallback providers configured
- [ ] Evaluation suite running
- [ ] Observability enabled

### Final Screen
- "Production-Ready LLM Apps"
- "Next: Monitoring & Observability"
- ScaledNative branding

---

## Production Notes

### Key Animations
- Stack diagram building up layer by layer
- Cache hit/miss visualization with particles
- Fallback chain showing requests flowing to backup

### Code Display
- Interactive code with callouts
- Live terminal showing cache hits

### Charts/Graphs
- Cost reduction over time with caching
- Latency distribution before/after
- Evaluation scores dashboard
