# Lesson 4.2: Re-ranking and Fusion

> **Duration**: 50 minutes | **Type**: Advanced
> **Unit**: 4 - Advanced Retrieval

---

## 📚 Reading Material

### The Retrieval-Rerank Pattern

1. Retrieve many candidates (fast, approximate)
2. Re-rank with better model (slow, accurate)

```
Query → Vector Search (top 50) → Re-ranker → Top 5
```

### Cross-Encoder Re-ranking

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

def rerank(query, documents, top_k=5):
    # Score each query-document pair
    pairs = [[query, doc] for doc in documents]
    scores = reranker.predict(pairs)
    
    # Sort by score
    ranked = sorted(zip(documents, scores), key=lambda x: -x[1])
    return [doc for doc, score in ranked[:top_k]]
```

### Cohere Rerank API

```python
import cohere

co = cohere.Client("YOUR_KEY")

def cohere_rerank(query, documents, top_k=5):
    results = co.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=documents,
        top_n=top_k
    )
    return [doc.document for doc in results.results]
```

### Reciprocal Rank Fusion

Merge results from multiple retrievers:
```python
def rrf(rankings, k=60):
    """Combine multiple rankings"""
    scores = {}
    for ranking in rankings:
        for rank, doc in enumerate(ranking):
            if doc not in scores:
                scores[doc] = 0
            scores[doc] += 1 / (k + rank + 1)
    
    return sorted(scores.keys(), key=lambda x: -scores[x])

# Combine vector search + BM25 + metadata filter results
final = rrf([vector_results, bm25_results, filtered_results])
```

---

## 🎬 Video Script

**[INTRO - Two-stage diagram]**

Vector search is fast but imperfect. Re-ranking fixes this with a two-stage approach.

**[CUT TO: Cross-encoder]**

Cross-encoders score query-document pairs directly. Much more accurate than embedding similarity, but slower.

**[CUT TO: Fusion]**

Reciprocal Rank Fusion merges multiple result lists. Vector, keyword, filtered—combine the best of each.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why use two-stage retrieval?

A) It's faster  
B) Fast approximate retrieval + accurate re-ranking  
C) Less code  
D) Lower cost  

**Correct Answer**: B
