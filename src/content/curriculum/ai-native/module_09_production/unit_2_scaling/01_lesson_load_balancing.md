# Lesson 2.1: Load Balancing

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 2 - Scaling

---

## 📚 Reading Material

### Load Balancing Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Round Robin | Equal distribution | Uniform requests |
| Least Connections | Route to least busy | Variable processing |
| Weighted | Priority routing | Mixed capacity |

### NGINX Configuration

```nginx
upstream ai_backend {
    least_conn;
    server ai-1:8000 weight=3;
    server ai-2:8000 weight=3;
    server ai-3:8000 weight=2;
    
    keepalive 32;
}

server {
    location /api/ {
        proxy_pass http://ai_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_read_timeout 120s;  # Long for LLM
    }
}
```

### Rate Limiting

```python
from fastapi import Request
from slowapi import Limiter

limiter = Limiter(key_func=get_user_id)

@app.post("/query")
@limiter.limit("100/minute")
async def query(request: Request, data: QueryRequest):
    return await process_query(data)
```

### Auto-Scaling

```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ai-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ai-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## 🎬 Video Script

**[INTRO - Load balancer diagram]**

Load balancing distributes requests across servers. Critical for scale.

**[CUT TO: Strategies]**

Round robin for uniform load. Least connections for variable processing. Choose based on your workload.

**[CUT TO: Auto-scaling]**

Kubernetes HPA: scale based on CPU or custom metrics. Match capacity to demand.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Which strategy for AI with variable processing time?

A) Round robin  
B) Least connections  
C) Random  
D) Sticky sessions  

**Correct Answer**: B
