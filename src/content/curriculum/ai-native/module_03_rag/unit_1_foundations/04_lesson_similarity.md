# Lesson 1.4: Similarity Search Explained

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 1 - RAG Foundations

---

## 📚 Reading Material

### The Search Problem

With millions of vectors, brute-force comparison is too slow:
```
1 million vectors × 1536 dimensions = 1.5 billion calculations per query
```

We need **Approximate Nearest Neighbor (ANN)** algorithms.

### Distance Metrics

**Cosine Similarity** (most common):
```python
similarity = dot(A, B) / (|A| × |B|)
# Range: -1 to 1 (1 = identical)
```

**Euclidean Distance**:
```python
distance = sqrt(sum((a - b)² for each dimension))
# Range: 0 to infinity (0 = identical)
```

**Dot Product**:
```python
similarity = sum(a × b for each dimension)
# Requires normalized vectors
```

**When to use which**:
| Metric | Best For |
|--------|----------|
| Cosine | Normalized text embeddings |
| Euclidean | When magnitude matters |
| Dot Product | Speed with normalized vectors |

### ANN Algorithms

**HNSW (Hierarchical Navigable Small World)**:
- Best quality/speed trade-off
- Used by: Qdrant, Pinecone, Weaviate

**IVF (Inverted File Index)**:
- Clusters vectors, searches clusters
- Faster index but lower recall

**PQ (Product Quantization)**:
- Compresses vectors
- Less accurate but uses less memory

### Index Parameters

**ef (HNSW search effort)**:
```python
# Higher = better recall, slower
index.search(query, top_k=10, ef=100)  # Fast
index.search(query, top_k=10, ef=500)  # Accurate
```

**nprobe (IVF clusters to search)**:
```python
# Higher = more clusters searched
index.search(query, nprobe=10)   # Fast
index.search(query, nprobe=100)  # Thorough
```

### Recall vs Latency Trade-offs

```
Configuration    | Recall  | Latency
-----------------+---------+---------
Low ANN params   | 85%     | 1ms
Medium params    | 95%     | 5ms
High params      | 99%     | 20ms
Brute force      | 100%    | 500ms
```

**Recall** = What percentage of true nearest neighbors do we find?

### Metadata Filtering

Pre-filter before vector search:
```python
# Find similar vectors WHERE category = "technical"
results = vector_db.search(
    query_vector,
    filter={"category": "technical", "year": {"$gte": 2023}},
    top_k=10
)
```

---

## 🎬 Video Script

**[INTRO - Million vector visualization]**

With a million vectors, comparing each one takes forever. We need smarter algorithms.

**[CUT TO: Distance metrics]**

Three main distance metrics. Cosine similarity is most common for text—measures angle between vectors. Euclidean measures straight-line distance. Dot product is fastest for normalized vectors.

**[CUT TO: ANN algorithms]**

HNSW is the go-to algorithm. It builds a navigable graph, finding neighbors through connected nodes. IVF clusters vectors and searches relevant clusters. PQ compresses vectors for less memory.

**[CUT TO: Trade-off chart]**

The trade-off: higher search parameters mean better recall but slower queries. Tune based on your needs—85% recall might be fine for suggestions, 99% for medical applications.

**[CUT TO: Filtering]**

Metadata filtering narrows the search space. Filter by category, date, access level before vector search. This speeds up queries and improves relevance.

**[END - Runtime: 4:30]**

---

## 🔬 Interactive Lab: Search Implementation

### Part 1: Distance Metrics (15 minutes)

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def euclidean_distance(a, b):
    return np.linalg.norm(a - b)

def dot_product(a, b):
    return np.dot(a, b)

# Compare metrics on sample vectors
v1 = np.array([1.0, 0.0, 0.0])
v2 = np.array([0.9, 0.1, 0.0])
v3 = np.array([0.0, 1.0, 0.0])

print("Comparing v1 to v2 (similar):")
print(f"  Cosine: {cosine_similarity(v1, v2):.4f}")
print(f"  Euclidean: {euclidean_distance(v1, v2):.4f}")
print(f"  Dot Product: {dot_product(v1, v2):.4f}")

print("\nComparing v1 to v3 (orthogonal):")
print(f"  Cosine: {cosine_similarity(v1, v3):.4f}")
print(f"  Euclidean: {euclidean_distance(v1, v3):.4f}")
print(f"  Dot Product: {dot_product(v1, v3):.4f}")
```

### Part 2: Brute Force vs ANN (20 minutes)

```python
import time
from openai import OpenAI

client = OpenAI()

# Generate random "document" embeddings
np.random.seed(42)
num_docs = 10000
embedding_dim = 1536

print(f"Generating {num_docs} random embeddings...")
document_embeddings = np.random.randn(num_docs, embedding_dim)
# Normalize for cosine similarity
document_embeddings = document_embeddings / np.linalg.norm(
    document_embeddings, axis=1, keepdims=True
)

def brute_force_search(query, embeddings, top_k=10):
    """Search all vectors"""
    scores = embeddings @ query  # Dot product with normalized = cosine
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [(i, scores[i]) for i in top_indices]

# Generate a query embedding
query = np.random.randn(embedding_dim)
query = query / np.linalg.norm(query)

# Benchmark brute force
start = time.time()
for _ in range(10):
    results = brute_force_search(query, document_embeddings)
brute_time = (time.time() - start) / 10

print(f"\nBrute force search ({num_docs} docs):")
print(f"  Time: {brute_time*1000:.2f}ms per query")
print(f"  Top result score: {results[0][1]:.4f}")
```

### Part 3: Metadata Filtering (15 minutes)

```python
# Simulate indexed documents with metadata
documents = []
categories = ["technical", "business", "legal", "marketing"]
years = [2021, 2022, 2023, 2024]

for i in range(1000):
    documents.append({
        "id": i,
        "embedding": np.random.randn(384),  # Smaller for demo
        "category": categories[i % len(categories)],
        "year": years[i % len(years)]
    })

def search_with_filter(query, docs, filter_fn=None, top_k=5):
    """Search with optional metadata filter"""
    # Apply metadata filter first
    if filter_fn:
        docs = [d for d in docs if filter_fn(d)]
    
    # Then vector search on filtered subset
    scores = []
    query_norm = query / np.linalg.norm(query)
    for doc in docs:
        emb_norm = doc["embedding"] / np.linalg.norm(doc["embedding"])
        score = np.dot(query_norm, emb_norm)
        scores.append((doc["id"], score, doc["category"], doc["year"]))
    
    scores.sort(key=lambda x: -x[1])
    return scores[:top_k]

query = np.random.randn(384)

# No filter
print("Without filter:")
results = search_with_filter(query, documents, top_k=3)
for id, score, cat, year in results:
    print(f"  Doc {id}: {score:.3f} ({cat}, {year})")

# With category filter
print("\nFiltered to 'technical' only:")
results = search_with_filter(
    query, documents, 
    filter_fn=lambda d: d["category"] == "technical",
    top_k=3
)
for id, score, cat, year in results:
    print(f"  Doc {id}: {score:.3f} ({cat}, {year})")
```

---

## ✅ Knowledge Check

### Question 1
What is the most common distance metric for text embeddings?

A) Euclidean distance  
B) Manhattan distance  
C) Cosine similarity  
D) Hamming distance  

**Correct Answer**: C

**Explanation**: Cosine similarity measures the angle between vectors, ignoring magnitude. It's ideal for text embeddings where direction represents meaning.

---

### Question 2
Why use ANN algorithms instead of brute force?

A) Better accuracy  
B) Much faster search with minimal quality loss  
C) Lower memory usage  
D) Simpler implementation  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand RAG foundations.*
