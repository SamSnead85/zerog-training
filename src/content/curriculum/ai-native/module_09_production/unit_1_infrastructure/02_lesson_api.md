# Lesson 1.2: API Design

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 1 - Infrastructure

---

## 📚 Reading Material

### REST API for AI

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class QueryRequest(BaseModel):
    query: str
    context: str | None = None
    max_tokens: int = 500

class QueryResponse(BaseModel):
    answer: str
    tokens_used: int
    latency_ms: float

@app.post("/v1/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    start = time.time()
    
    response = await llm.generate(
        request.query,
        context=request.context,
        max_tokens=request.max_tokens
    )
    
    return QueryResponse(
        answer=response.text,
        tokens_used=response.usage.total_tokens,
        latency_ms=(time.time() - start) * 1000
    )
```

### Streaming Responses

```python
from fastapi.responses import StreamingResponse

@app.post("/v1/query/stream")
async def stream_query(request: QueryRequest):
    async def generate():
        async for chunk in llm.stream(request.query):
            yield f"data: {json.dumps({'text': chunk})}\n\n"
        yield "data: [DONE]\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )
```

### Versioning

```python
# URL versioning
/v1/query  # Current
/v2/query  # New version with breaking changes

# Always support at least one previous version
```

---

## 🎬 Video Script

**[INTRO - API example]**

Well-designed APIs make AI accessible. Clean endpoints, typed requests/responses.

**[CUT TO: Streaming]**

Streaming: critical for LLMs. Users see output as it generates. Better experience.

**[CUT TO: Versioning]**

Version your API. Breaking changes go to new versions. Support old versions temporarily.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why stream LLM responses?

A) Lower cost  
B) Better user experience—see output as it generates  
C) Required  
D) Faster total time  

**Correct Answer**: B
