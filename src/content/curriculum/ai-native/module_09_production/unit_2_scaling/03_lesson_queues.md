# Lesson 2.3: Queue-Based Architecture

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 2 - Scaling

---

## 📚 Reading Material

### When to Use Queues

- Long-running AI tasks
- Variable processing time
- Decouple request from response
- Handle spikes in demand

### Queue Architecture

```
Request → API → Queue → Worker Pool → Results Store
   ↑                                       |
   └──────── Poll for Result ──────────────┘
```

### Implementation

```python
import celery

# Producer (API)
@app.post("/async-query")
async def async_query(request: QueryRequest):
    task_id = str(uuid.uuid4())
    celery_app.send_task(
        "process_query",
        args=[request.query],
        task_id=task_id
    )
    return {"task_id": task_id, "status": "processing"}

# Consumer (Worker)
@celery_app.task
def process_query(query):
    response = llm.generate(query)
    return response

# Status Check
@app.get("/task/{task_id}")
async def get_task(task_id: str):
    result = AsyncResult(task_id)
    if result.ready():
        return {"status": "complete", "result": result.get()}
    return {"status": "processing"}
```

### Benefits

| Benefit | Description |
|---------|-------------|
| Decoupling | API doesn't wait |
| Scaling | Workers scale independently |
| Resilience | Retries on failure |
| Prioritization | Multiple queues |

---

## 🎬 Video Script

**[INTRO - Queue diagram]**

Queues decouple request from processing. Essential for long-running AI tasks.

**[CUT TO: Flow]**

Request goes to queue. Worker picks up, processes, stores result. Client polls for status.

**[CUT TO: Benefits]**

API responds instantly. Workers scale independently. Automatic retries on failure.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should you use queue-based architecture?

A) Always  
B) For long-running tasks or variable processing times  
C) Never  
D) Only for chat  

**Correct Answer**: B

---

*Congratulations on completing Unit 2! You understand scaling strategies.*
