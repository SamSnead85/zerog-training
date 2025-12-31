# Lesson 5.2: Caching and Performance

> **Duration**: 50 minutes | **Type**: Production
> **Unit**: 5 - Production RAG

---

## 📚 Reading Material

### Caching Strategies

**Embedding Cache**:
```python
import hashlib
import redis

cache = redis.Redis()

def cached_embed(text):
    key = hashlib.md5(text.encode()).hexdigest()
    
    cached = cache.get(f"emb:{key}")
    if cached:
        return json.loads(cached)
    
    embedding = embed(text)
    cache.set(f"emb:{key}", json.dumps(embedding), ex=86400)
    return embedding
```

**Semantic Cache**:
```python
def semantic_cache(query, threshold=0.95):
    query_emb = embed(query)
    
    # Search cache for similar queries
    cached = cache_index.search(query_emb, top_k=1)
    
    if cached and cached[0].score > threshold:
        return cached[0].metadata["response"]
    
    # Generate new response
    response = rag_query(query)
    
    # Cache with query embedding
    cache_index.upsert({
        "id": uuid4(),
        "vector": query_emb,
        "metadata": {"query": query, "response": response}
    })
    
    return response
```

### Latency Optimization

| Technique | Impact | Effort |
|-----------|--------|--------|
| Embedding cache | -100ms | Low |
| Semantic cache | -500ms | Medium |
| Smaller model | -200ms | Low |
| Fewer chunks | -50ms | Low |
| Parallel retrieval | -100ms | Medium |

### Streaming Responses

```python
async def stream_rag_response(query):
    # Retrieve (can't stream)
    context = await retrieve(query)
    
    # Generate with streaming
    stream = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"Context: {context}"},
            {"role": "user", "content": query}
        ],
        stream=True
    )
    
    async for chunk in stream:
        yield chunk.choices[0].delta.content
```

---

## 🎬 Video Script

**[INTRO - Latency breakdown]**

RAG latency adds up: embedding, search, generation. Let me show you how to optimize.

**[CUT TO: Caches]**

Embedding cache: don't re-embed identical text. Semantic cache: return cached responses for similar queries.

**[CUT TO: Streaming]**

Stream the generation phase. Users see first token in ~200ms vs waiting 2s for full response.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does semantic caching do?

A) Caches identical queries  
B) Returns cached responses for similar (not identical) queries  
C) Compresses responses  
D) Speeds up embedding  

**Correct Answer**: B
