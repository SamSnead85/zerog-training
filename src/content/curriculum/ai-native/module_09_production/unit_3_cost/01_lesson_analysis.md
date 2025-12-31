# Lesson 3.1: Cost Analysis

> **Duration**: 55 minutes | **Type**: Business
> **Unit**: 3 - Cost Optimization

---

## 📚 Reading Material

### Cost Components

| Component | Pricing Model |
|-----------|---------------|
| LLM API | Per token |
| Embeddings | Per token |
| Vector DB | Storage + queries |
| Compute | Per hour |
| Bandwidth | Per GB |

### Tracking Costs

```python
class CostTracker:
    def __init__(self):
        self.costs = defaultdict(float)
    
    def track_llm(self, model, usage):
        rates = {
            "gpt-4o": {"input": 2.50, "output": 10.00},
            "gpt-4o-mini": {"input": 0.15, "output": 0.60}
        }
        rate = rates[model]
        cost = (
            usage.prompt_tokens / 1_000_000 * rate["input"] +
            usage.completion_tokens / 1_000_000 * rate["output"]
        )
        self.costs[model] += cost
        return cost
    
    def report(self):
        return dict(self.costs)
```

### Cost Per Request

```python
def analyze_request_cost(logs):
    costs = []
    for request in logs:
        cost = {
            "llm": calculate_llm_cost(request.tokens),
            "embedding": calculate_embedding_cost(request.embed_tokens),
            "compute": request.duration_ms / 1000 * COMPUTE_RATE
        }
        costs.append(sum(cost.values()))
    
    return {
        "avg_cost": mean(costs),
        "p95_cost": percentile(costs, 95),
        "daily_projection": sum(costs) * DAILY_FACTOR
    }
```

---

## 🎬 Video Script

**[INTRO - Cost breakdown]**

AI costs add up fast. Let me show you how to track and analyze.

**[CUT TO: Components]**

LLM tokens, embeddings, vector storage, compute. Each has different pricing.

**[CUT TO: Tracking]**

Track per-request costs. Know your average, P95, and projections.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What are the main AI cost components?

A) Just LLM calls  
B) LLM tokens, embeddings, storage, compute, bandwidth  
C) Only compute  
D) Free  

**Correct Answer**: B
