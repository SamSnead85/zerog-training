# Lesson 2.2: Tool Error Handling

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 2 - Tool Implementation

---

## 📚 Reading Material

### Why Error Handling Matters

Tools fail. Agents need to:
- Understand what went wrong
- Decide whether to retry
- Try alternative approaches
- Know when to give up

### Return Structured Errors

```python
def safe_tool(func):
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            return {"success": True, "data": result}
        except ValueError as e:
            return {"success": False, "error": "invalid_input", "message": str(e)}
        except TimeoutError:
            return {"success": False, "error": "timeout", "message": "Request timed out"}
        except Exception as e:
            return {"success": False, "error": "unknown", "message": str(e)}
    return wrapper
```

### Give Helpful Error Messages

```python
# Bad: Agent can't recover
return "Error"

# Good: Agent knows what to do
return {
    "error": "rate_limited",
    "message": "API rate limit exceeded",
    "retry_after": 60,
    "suggestion": "Wait 60 seconds or use a different query"
}
```

### Retry Logic

```python
def execute_with_retry(tool, params, max_retries=3):
    for attempt in range(max_retries):
        result = tool(**params)
        
        if result.get("success"):
            return result
        
        if result.get("error") == "rate_limited":
            time.sleep(result.get("retry_after", 5))
        elif result.get("error") == "invalid_input":
            return result  # Don't retry bad input
        else:
            time.sleep(2 ** attempt)  # Exponential backoff
    
    return {"success": False, "error": "max_retries"}
```

---

## 🎬 Video Script

**[INTRO - Error scenarios]**

Tools fail. Rate limits, timeouts, bad input. Your agent needs to handle all of these gracefully.

**[CUT TO: Structured errors]**

Return structured errors with type, message, and suggestions. The agent needs enough information to decide what to do next.

**[CUT TO: Retry logic]**

Retry with exponential backoff. But don't retry everything—bad input won't get better. Know when to stop.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should error responses include?

A) Just "error"  
B) Error type, message, and recovery suggestions  
C) Stack trace  
D) Only success/failure boolean  

**Correct Answer**: B
