# Lesson 4.2: Production Monitoring

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Continuous Evaluation

---

## 📚 Reading Material

### What to Monitor

| Metric | Why | Alert Threshold |
|--------|-----|-----------------|
| Latency | User experience | p99 > 5s |
| Error rate | Reliability | > 1% |
| Token usage | Cost | > budget |
| User feedback | Quality | < 3 stars |
| Safety violations | Risk | Any |

### Logging

```python
import logging

logger = logging.getLogger("llm")

def log_request(request, response, metadata):
    logger.info("llm_request", extra={
        "input_length": len(request),
        "output_length": len(response),
        "model": metadata["model"],
        "latency_ms": metadata["latency"],
        "tokens": metadata["tokens"],
        "user_id": metadata.get("user_id")
    })
```

### Quality Sampling

```python
import random

def sample_for_review(request, response):
    if random.random() < 0.01:  # 1% sample
        save_for_review({
            "request": request,
            "response": response,
            "timestamp": datetime.now()
        })
```

### Alerting

```python
def check_quality_alerts(metrics):
    if metrics["error_rate"] > 0.01:
        alert("High error rate", metrics)
    
    if metrics["avg_latency"] > 3000:
        alert("High latency", metrics)
    
    if metrics["safety_violations"] > 0:
        alert("CRITICAL: Safety violation", metrics)
```

---

## 🎬 Video Script

**[INTRO - Monitoring dashboard]**

Production monitoring catches issues before users do. Let me show you what to track.

**[CUT TO: Metrics]**

Latency, errors, tokens, feedback, safety. Each has alert thresholds.

**[CUT TO: Quality sampling]**

Sample 1% of requests for human review. Catches quality drift early.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why sample production requests for review?

A) Legal requirement  
B) Catches quality issues that automated metrics miss  
C) Reduces cost  
D) Faster responses  

**Correct Answer**: B

---

*Congratulations on completing Module 6: Evaluation and Testing!*
