# Lesson 2.2: Caching Strategies

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 2 - Scaling

---

## 📚 Reading Material

### What to Cache

| Level | What | TTL |
|-------|------|-----|
| Embeddings | Vector representations | Long (days) |
| LLM responses | Exact query matches | Medium (hours) |
| RAG context | Retrieved documents | Short (minutes) |

### Response Caching

```python
import hashlib
import redis

cache = redis.Redis()

def cached_llm(query, ttl=3600):
    cache_key = hashlib.md5(query.encode()).hexdigest()
    
    cached = cache.get(cache_key)
    if cached:
        return json.loads(cached)
    
    response = llm.generate(query)
    cache.setex(cache_key, ttl, json.dumps(response))
    return response
```

### Semantic Caching

```python
def semantic_cache(query, threshold=0.95):
    query_embedding = embed(query)
    
    # Search for similar cached queries
    similar = cache_store.search(
        query_embedding,
        top_k=1
    )
    
    if similar and similar[0].score > threshold:
        return similar[0].cached_response
    
    # No cache hit
    response = llm.generate(query)
    cache_store.add(query, query_embedding, response)
    return response
```

### Cache Invalidation

```python
def invalidate_on_update(document_id):
    # Find all cached responses using this document
    affected = cache_index.find_by_source(document_id)
    for key in affected:
        cache.delete(key)
```

---

## 🎬 Video Script

**[INTRO - Caching layers]**

Caching reduces cost and latency. Let me show you what and how to cache.

**[CUT TO: Levels]**

Embeddings cache long. LLM responses cache for hours. RAG context cache short.

**[CUT TO: Semantic]**

Semantic caching: similar queries hit cache. 95% similar? Return cached response.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is semantic caching?

A) Caching by exact query  
B) Caching based on query similarity via embeddings  
C) No caching  
D) Disk caching  

**Correct Answer**: B
