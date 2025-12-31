# Lesson 3.3: Metadata and Hybrid Search

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 3 - Document Processing

---

## 📚 Reading Material

### Why Metadata Matters

Vector search finds semantically similar content, but sometimes you need exact matches:
- "Documents from 2024"
- "Only technical specs"
- "From the finance department"

### Essential Metadata Fields

```python
metadata = {
    # Source tracking
    "source": "policy_handbook_v2.pdf",
    "page": 12,
    "section": "Chapter 4: HR Policies",
    
    # Classification
    "category": "hr",
    "document_type": "policy",
    
    # Temporal
    "created_date": "2024-01-15",
    "updated_date": "2024-06-01",
    
    # Access control
    "department": "hr",
    "access_level": "internal",
    
    # RAG-specific
    "chunk_index": 3,
    "total_chunks": 15
}
```

### Hybrid Search

Combine vector search + keyword search:

```python
# Pinecone example
results = index.query(
    vector=query_embedding,
    filter={
        "category": "technical",
        "created_date": {"$gte": "2024-01-01"}
    },
    top_k=10
)

# Qdrant example with full-text
from qdrant_client.models import Filter, FieldCondition, MatchText

results = client.search(
    collection_name="docs",
    query_vector=query_vector,
    query_filter=Filter(
        must=[
            FieldCondition(key="category", match=MatchValue(value="technical")),
            FieldCondition(key="content", match=MatchText(text="specific term"))
        ]
    )
)
```

### BM25 + Vector Fusion

```python
from rank_bm25 import BM25Okapi

# BM25 keyword search
bm25 = BM25Okapi([doc.split() for doc in documents])
bm25_scores = bm25.get_scores(query.split())

# Vector similarity scores
vector_scores = [cosine(query_emb, doc_emb) for doc_emb in embeddings]

# Reciprocal Rank Fusion
def rrf_score(bm25_rank, vector_rank, k=60):
    return 1/(k + bm25_rank) + 1/(k + vector_rank)
```

---

## 🎬 Video Script

**[INTRO - Filter + semantic diagram]**

Vector search is powerful but not enough. Hybrid search combines semantic with exact matches.

**[CUT TO: Metadata fields]**

Store rich metadata: source, dates, categories, access levels. Filter before searching for efficiency.

**[CUT TO: BM25 fusion]**

Combine BM25 keyword scores with vector similarity. Reciprocal Rank Fusion balances both.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What is hybrid search?

A) Searching two databases  
B) Combining vector similarity with keyword/metadata filtering  
C) Using two embedding models  
D) Parallel queries  

**Correct Answer**: B
