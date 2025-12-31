# Lesson 1.1: Infrastructure Patterns

> **Duration**: 55 minutes | **Type**: Architecture
> **Unit**: 1 - Infrastructure

---

## 📚 Reading Material

### Common Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **API Gateway** | Single entry point | Multiple backends |
| **Microservices** | Separate AI services | Complex systems |
| **Serverless** | Function-based | Variable load |
| **Hybrid** | API + self-hosted | Cost optimization |

### API Gateway Pattern

```
Client → API Gateway → Load Balancer → AI Service Pool
              ↓
         Rate Limiting
         Auth
         Caching
```

### Microservices for AI

```yaml
services:
  embedding-service:
    image: embedding-api:latest
    replicas: 3
  
  llm-gateway:
    image: llm-gateway:latest
    replicas: 5
  
  rag-service:
    image: rag-api:latest
    replicas: 2
    depends_on:
      - embedding-service
      - vector-db
```

### Serverless Pattern

```python
# AWS Lambda example
def handler(event, context):
    query = event["body"]["query"]
    
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": query}]
    )
    
    return {
        "statusCode": 200,
        "body": response.choices[0].message.content
    }
```

---

## 🎬 Video Script

**[INTRO - Architecture diagrams]**

Production AI needs solid infrastructure. Let me show you the main patterns.

**[CUT TO: API Gateway]**

API Gateway: single entry, handles auth, rate limiting, routing. Foundation for most deployments.

**[CUT TO: Microservices vs Serverless]**

Microservices for complex systems. Serverless for variable load. Choose based on your needs.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
When should you use serverless for AI?

A) Never  
B) When load is variable or unpredictable  
C) Only for image processing  
D) Always  

**Correct Answer**: B
