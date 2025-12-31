# Lesson 1.3: Containerization

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 1 - Infrastructure

---

## 📚 Reading Material

### Dockerfile for AI Apps

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - redis
      - chromadb
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  chromadb:
    image: chromadb/chroma:latest
    ports:
      - "8001:8000"
    volumes:
      - chroma_data:/chroma/chroma

volumes:
  chroma_data:
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-api
  template:
    spec:
      containers:
      - name: ai-api
        image: ai-api:latest
        resources:
          limits:
            memory: "2Gi"
            cpu: "1"
```

---

## 🎬 Video Script

**[INTRO - Container diagram]**

Containers make AI apps portable. Same environment everywhere.

**[CUT TO: Dockerfile]**

Dockerfile: slim base, dependencies, health check, expose port. Keep images small.

**[CUT TO: Kubernetes]**

Kubernetes for scale. Deploy, replicate, manage. Production-grade orchestration.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why add health checks to containers?

A) Documentation  
B) Allows orchestrators to detect and restart unhealthy containers  
C) Faster startup  
D) Lower cost  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand AI infrastructure.*
