# Lesson 2.4: External API Integration

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Tool Implementation

---

## 📚 Reading Material

### Wrapping APIs as Tools

```python
import httpx

def create_api_tool(base_url, endpoint, method="GET"):
    def tool(**params):
        try:
            response = httpx.request(
                method, 
                f"{base_url}{endpoint}",
                params=params if method == "GET" else None,
                json=params if method != "GET" else None,
                timeout=30
            )
            response.raise_for_status()
            return {"success": True, "data": response.json()}
        except httpx.HTTPStatusError as e:
            return {"success": False, "error": f"HTTP {e.response.status_code}"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    return tool
```

### Authentication

```python
class APITool:
    def __init__(self, api_key, base_url):
        self.headers = {"Authorization": f"Bearer {api_key}"}
        self.base_url = base_url
    
    def call(self, endpoint, **params):
        response = httpx.get(
            f"{self.base_url}{endpoint}",
            headers=self.headers,
            params=params
        )
        return response.json()
```

### Rate Limiting

```python
from ratelimit import limits, sleep_and_retry

@sleep_and_retry
@limits(calls=10, period=60)  # 10 calls per minute
def rate_limited_api_call(endpoint, params):
    return httpx.get(endpoint, params=params)
```

### Common Integrations

| API | Use Case |
|-----|----------|
| Slack | Team notifications |
| GitHub | Code search, PR creation |
| Calendar APIs | Scheduling |
| CRM APIs | Customer data |
| Cloud APIs | Infrastructure |

---

## 🎬 Video Script

**[INTRO - API diagram]**

Real agents need real APIs. Let me show you how to wrap external APIs as tools.

**[CUT TO: Wrapper pattern]**

Create a wrapper function that handles HTTP calls, errors, and response parsing. Return structured results.

**[CUT TO: Auth and rate limits]**

Handle authentication with headers. Rate limiting prevents getting blocked. Use decorators for clean code.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What should API tool wrappers always handle?

A) Only successful responses  
B) Authentication, errors, timeouts, and rate limits  
C) Just the response body  
D) Only JSON  

**Correct Answer**: B

---

*Congratulations on completing Unit 2! You can now build robust tools.*
