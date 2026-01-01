# Lesson: Hybrid Retrieval Strategies for RAG

## Overview

In this lesson, you'll learn advanced retrieval strategies that significantly improve RAG system accuracy. We'll cover hybrid search, query expansion, and multi-stage retrieval pipelines.

**Duration**: 25 minutes  
**Prerequisites**: Module 5 Lesson 1 (RAG Fundamentals)

## Learning Objectives

By the end of this lesson, you will:
- Implement hybrid search combining semantic and keyword retrieval
- Use query expansion to improve recall
- Build multi-stage retrieval pipelines with re-ranking
- Configure retrieval parameters for different use cases
- Measure and optimize retrieval quality

---

## The Retrieval Quality Problem

Semantic search alone has weaknesses:
- **Vocabulary mismatch**: "HR policy" vs "human resources guidelines"
- **Precise terms**: Product codes, names, acronyms
- **Rare concepts**: Domain-specific terminology not in embeddings

Keyword search has different weaknesses:
- **Synonyms**: "car" won't match "automobile"
- **Context**: Can't understand intent
- **Typos**: Exact matching fails on errors

**Solution**: Combine both with hybrid search.

---

## Hybrid Search Implementation

### The Concept

```
Query: "How long is PTO for new employees?"

Semantic Search:
- Converts to vector, finds semantically similar content
- Might find: "Vacation policy for recent hires"

Keyword Search (BM25):
- Matches exact terms: "PTO", "new", "employees"
- Might find: "PTO accrual rates for employees in their first year"

Hybrid:
- Combines both result sets
- Returns the best of both worlds
```

### Implementation with BM25 + Embeddings

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    def __init__(self, documents: list, alpha: float = 0.5):
        """
        Initialize hybrid retriever.
        
        Args:
            documents: List of documents with 'content' and 'metadata'
            alpha: Weight for semantic search (1=semantic only, 0=keyword only)
        """
        self.documents = documents
        self.alpha = alpha
        
        # Set up embeddings
        self.embeddings = OpenAIEmbeddings()
        
        # Build vector store
        self.vectorstore = Chroma.from_texts(
            texts=[d['content'] for d in documents],
            embedding=self.embeddings,
            metadatas=[d['metadata'] for d in documents]
        )
        
        # Build BM25 index
        tokenized = [d['content'].lower().split() for d in documents]
        self.bm25 = BM25Okapi(tokenized)
    
    def retrieve(self, query: str, k: int = 5) -> list:
        """Hybrid retrieval combining semantic and keyword search."""
        
        # 1. Semantic search
        semantic_results = self.vectorstore.similarity_search_with_score(
            query, k=k * 2  # Get more candidates for fusion
        )
        
        # 2. BM25 keyword search
        tokenized_query = query.lower().split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        bm25_top_k = np.argsort(bm25_scores)[::-1][:k * 2]
        
        # 3. Normalize scores
        semantic_scores = self._normalize([1 / (1 + s) for _, s in semantic_results])
        bm25_normalized = self._normalize([bm25_scores[i] for i in bm25_top_k])
        
        # 4. Combine with alpha weighting
        combined = {}
        
        for i, (doc, _) in enumerate(semantic_results):
            doc_id = id(doc)
            combined[doc_id] = {
                'doc': doc,
                'score': self.alpha * semantic_scores[i]
            }
        
        for i, idx in enumerate(bm25_top_k):
            doc = self.documents[idx]
            doc_id = idx
            if doc_id in combined:
                combined[doc_id]['score'] += (1 - self.alpha) * bm25_normalized[i]
            else:
                combined[doc_id] = {
                    'doc': doc,
                    'score': (1 - self.alpha) * bm25_normalized[i]
                }
        
        # 5. Sort and return top k
        sorted_results = sorted(
            combined.values(), 
            key=lambda x: x['score'], 
            reverse=True
        )
        
        return [r['doc'] for r in sorted_results[:k]]
    
    def _normalize(self, scores: list) -> list:
        """Min-max normalization."""
        min_s, max_s = min(scores), max(scores)
        if max_s == min_s:
            return [1.0] * len(scores)
        return [(s - min_s) / (max_s - min_s) for s in scores]
```

---

## Query Expansion

Improve recall by searching for multiple phrasings of the same query.

### LLM-Based Query Expansion

```python
from langchain_openai import ChatOpenAI

class QueryExpander:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
    
    def expand(self, query: str, n_variants: int = 3) -> list[str]:
        """Generate query variants for improved recall."""
        
        prompt = f"""
Generate {n_variants} alternative ways to ask the following question.
Each variant should capture the same intent but use different words.

Original query: "{query}"

Return only the variants, one per line:
"""
        
        response = self.llm.invoke(prompt)
        variants = response.content.strip().split('\n')
        
        # Include original query
        all_queries = [query] + [v.strip() for v in variants if v.strip()]
        
        return all_queries[:n_variants + 1]


class ExpandedRetriever:
    def __init__(self, base_retriever, expander: QueryExpander):
        self.retriever = base_retriever
        self.expander = expander
    
    def retrieve(self, query: str, k: int = 5) -> list:
        """Retrieve using expanded queries."""
        
        # Expand query
        queries = self.expander.expand(query)
        
        # Retrieve for each variant
        all_results = []
        seen_ids = set()
        
        for q in queries:
            results = self.retriever.retrieve(q, k=k)
            for doc in results:
                doc_id = hash(doc.page_content)
                if doc_id not in seen_ids:
                    all_results.append(doc)
                    seen_ids.add(doc_id)
        
        # Return top k unique results
        return all_results[:k]
```

---

## Multi-Stage Retrieval with Re-Ranking

### The Pipeline

```
Query
  ↓
Stage 1: Broad Retrieval (fast)
  → Get 50+ candidates using hybrid search
  ↓
Stage 2: Re-Ranking (accurate)
  → Score all candidates with cross-encoder
  ↓
Stage 3: Selection
  → Return top 5 for generation
```

### Implementation

```python
from sentence_transformers import CrossEncoder

class ReRankingPipeline:
    def __init__(self, base_retriever):
        self.retriever = base_retriever
        self.reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    def retrieve(self, query: str, initial_k: int = 50, final_k: int = 5) -> list:
        """Multi-stage retrieval with re-ranking."""
        
        # Stage 1: Broad retrieval
        candidates = self.retriever.retrieve(query, k=initial_k)
        
        if len(candidates) == 0:
            return []
        
        # Stage 2: Re-rank with cross-encoder
        pairs = [(query, doc.page_content) for doc in candidates]
        scores = self.reranker.predict(pairs)
        
        # Stage 3: Sort and select top
        scored_docs = list(zip(candidates, scores))
        scored_docs.sort(key=lambda x: x[1], reverse=True)
        
        return [doc for doc, score in scored_docs[:final_k]]
```

### Why Re-Ranking Works

| Stage | Model | Speed | Accuracy |
|-------|-------|-------|----------|
| Initial | Bi-encoder (embeddings) | Very Fast | Good |
| Re-rank | Cross-encoder | Slow | Excellent |

Cross-encoders process query and document together, enabling deeper understanding of relevance—but too slow for initial search.

---

## HyDE: Hypothetical Document Embeddings

A counterintuitive technique that often improves retrieval.

### The Concept

Instead of embedding the query, generate a hypothetical answer and embed that.

```
Query: "What's our refund policy?"

Normal Flow:
  → Embed "What's our refund policy?"
  → Search for similar content

HyDE Flow:
  → Generate: "Our refund policy allows returns within 30 days..."
  → Embed the hypothetical answer
  → Search for similar content
```

### Implementation

```python
class HyDERetriever:
    def __init__(self, vectorstore, llm):
        self.vectorstore = vectorstore
        self.llm = llm
    
    def retrieve(self, query: str, k: int = 5) -> list:
        """Retrieve using hypothetical document embeddings."""
        
        # Generate hypothetical answer
        hyde_prompt = f"""
Write a brief, factual passage that would answer this question.
Write as if you are certain of the answer.

Question: {query}

Passage:
"""
        hypothetical = self.llm.invoke(hyde_prompt).content
        
        # Search using hypothetical passage
        results = self.vectorstore.similarity_search(
            hypothetical, k=k
        )
        
        return results
```

### When to Use HyDE

- ✅ Complex questions requiring synthesis
- ✅ When query and document language differ significantly
- ✅ For FAQ-style document retrieval
- ❌ Simple keyword lookups
- ❌ When speed is critical (requires extra LLM call)

---

## Retrieval Quality Metrics

### Measuring Success

```python
class RetrievalEvaluator:
    def evaluate(self, queries: list, expected: list, retriever) -> dict:
        """
        Evaluate retrieval quality.
        
        Args:
            queries: List of test queries
            expected: List of expected document IDs per query
            retriever: Retriever to evaluate
        """
        metrics = {
            'precision_at_k': [],
            'recall_at_k': [],
            'mrr': [],
        }
        
        for query, expected_ids in zip(queries, expected):
            results = retriever.retrieve(query)
            retrieved_ids = [r.metadata['id'] for r in results]
            
            # Precision@k: relevant / retrieved
            relevant_retrieved = len(set(retrieved_ids) & set(expected_ids))
            precision = relevant_retrieved / len(retrieved_ids) if retrieved_ids else 0
            
            # Recall@k: relevant retrieved / total relevant
            recall = relevant_retrieved / len(expected_ids) if expected_ids else 0
            
            # MRR: 1/rank of first relevant
            mrr = 0
            for i, rid in enumerate(retrieved_ids):
                if rid in expected_ids:
                    mrr = 1 / (i + 1)
                    break
            
            metrics['precision_at_k'].append(precision)
            metrics['recall_at_k'].append(recall)
            metrics['mrr'].append(mrr)
        
        return {
            'avg_precision': sum(metrics['precision_at_k']) / len(queries),
            'avg_recall': sum(metrics['recall_at_k']) / len(queries),
            'mrr': sum(metrics['mrr']) / len(queries),
        }
```

### Benchmark Your Retriever

```python
# Create test set
test_queries = [
    {"query": "refund policy", "expected_docs": ["doc_001", "doc_002"]},
    {"query": "how to reset password", "expected_docs": ["doc_010"]},
    # ... more test cases
]

# Evaluate
results = evaluator.evaluate(
    queries=[t["query"] for t in test_queries],
    expected=[t["expected_docs"] for t in test_queries],
    retriever=my_retriever
)

print(f"Precision@5: {results['avg_precision']:.2%}")
print(f"Recall@5: {results['avg_recall']:.2%}")
print(f"MRR: {results['mrr']:.2f}")
```

---

## Choosing the Right Strategy

| Scenario | Recommended Strategy |
|----------|---------------------|
| General Q&A | Hybrid (alpha=0.5) |
| Technical docs | Hybrid with higher BM25 (alpha=0.3) |
| Legal/compliance | Hybrid + re-ranking (accuracy critical) |
| Customer support | HyDE + hybrid |
| Code search | Keyword-heavy (alpha=0.2) |
| Speed-critical | Semantic only, no re-ranking |

---

## Key Takeaways

1. **Hybrid search** combines semantic understanding with keyword precision
2. **Query expansion** improves recall for ambiguous queries
3. **Re-ranking** significantly improves precision at the cost of latency
4. **HyDE** works well when query and document language differ
5. **Always measure**: Use precision, recall, and MRR to guide decisions

---

## Next Steps

- **Lab**: Build a production RAG pipeline with hybrid retrieval
- **Next Lesson**: Chunking strategies for different document types
- **Advanced**: Custom embedding fine-tuning for domain-specific retrieval
