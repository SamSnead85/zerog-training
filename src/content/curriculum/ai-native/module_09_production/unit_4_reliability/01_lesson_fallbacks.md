# Lesson 4.1: Health Checks and Fallbacks

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Reliability

---

## 📚 Reading Material

### Health Check Endpoint

```python
@app.get("/health")
async def health():
    checks = {
        "api": True,
        "llm": await check_llm_health(),
        "vector_db": await check_vector_db(),
        "cache": await check_cache()
    }
    
    healthy = all(checks.values())
    return {
        "status": "healthy" if healthy else "degraded",
        "checks": checks
    }

async def check_llm_health():
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "health"}],
            max_tokens=5
        )
        return True
    except:
        return False
```

### Fallback Chain

```python
async def robust_llm(query):
    # Primary
    try:
        return await openai_call(query, model="gpt-4o")
    except RateLimitError:
        pass  # Try fallback
    
    # Fallback 1
    try:
        return await openai_call(query, model="gpt-4o-mini")
    except Exception:
        pass
    
    # Fallback 2
    try:
        return await anthropic_call(query)
    except Exception:
        pass
    
    # Final fallback
    return {"error": "All providers unavailable", "cached": get_cache(query)}
```

### Circuit Breaker

```python
class CircuitBreaker:
    def __init__(self, threshold=5, reset_time=60):
        self.failures = 0
        self.threshold = threshold
        self.open = False
        self.reset_time = reset_time
    
    async def call(self, func, *args):
        if self.open:
            if time_since_open() > self.reset_time:
                self.open = False
            else:
                raise CircuitOpenError()
        
        try:
            result = await func(*args)
            self.failures = 0
            return result
        except Exception as e:
            self.failures += 1
            if self.failures >= self.threshold:
                self.open = True
            raise
```

---

## 🎬 Video Script

**[INTRO - Reliability layers]**

Production systems need fallbacks. When primary fails, fallback works.

**[CUT TO: Health checks]**

Health endpoints: check LLM, DB, cache. Report degraded vs healthy.

**[CUT TO: Fallback chain]**

Fallback chain: GPT-4o → GPT-4o-mini → Claude → Cache. Always have a response.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is a fallback chain?

A) Single provider  
B) Multiple providers tried in sequence when primary fails  
C) Caching only  
D) No fallback  

**Correct Answer**: B
