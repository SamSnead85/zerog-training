# Lesson 5.2: Advanced Retrieval Strategies

## Introduction

Basic RAG is powerful, but production systems need more. What happens when the user's query doesn't match the document phrasing? When the top results are too similar? When you need both keyword and semantic search? This lesson covers advanced retrieval techniques that significantly improve RAG quality.

## The Retrieval Quality Problem

Simple similarity search has issues:

```python
# User asks: "Can I work from home?"
# Documents contain: "Remote work policy: Employees may telecommute..."
# 
# Problem: "work from home" ≠ "remote work" in embedding space
# Result: Relevant document might not rank highly
```

## Strategy 1: Query Rewriting

Expand or rephrase the query before searching:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

query_rewriter = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

REWRITE_PROMPT = ChatPromptTemplate.from_template("""
Given the user's question, generate 3 alternative versions that might retrieve relevant documents.
Include synonyms and related phrases.

Original question: {question}

Provide exactly 3 alternatives, one per line:
""")

def rewrite_query(question: str) -> list[str]:
    """Generate alternative query formulations."""
    response = query_rewriter.invoke(
        REWRITE_PROMPT.format_messages(question=question)
    )
    alternatives = response.content.strip().split("\n")
    return [question] + alternatives[:3]


# Example
queries = rewrite_query("Can I work from home?")
# Returns:
# ["Can I work from home?",
#  "What is the remote work policy?",
#  "Is telecommuting allowed?",
#  "Work from home guidelines"]
```

### Multi-Query Retrieval

Search with all queries and combine results:

```python
from langchain.retrievers import MultiQueryRetriever

def multi_query_retrieve(question: str, vectorstore) -> list:
    """Retrieve using multiple query formulations."""
    
    queries = rewrite_query(question)
    
    all_docs = []
    seen_ids = set()
    
    for query in queries:
        docs = vectorstore.similarity_search(query, k=3)
        for doc in docs:
            doc_id = hash(doc.page_content)
            if doc_id not in seen_ids:
                all_docs.append(doc)
                seen_ids.add(doc_id)
    
    return all_docs[:5]  # Return top 5 unique docs
```

## Strategy 2: HyDE (Hypothetical Document Embeddings)

Generate a hypothetical answer, then search for similar real documents:

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

hypothetical_generator = ChatOpenAI(model="gpt-3.5-turbo")
embeddings = OpenAIEmbeddings()

def hyde_retrieve(question: str, vectorstore, k: int = 5) -> list:
    """HyDE: Generate hypothetical document, then search."""
    
    # Step 1: Generate hypothetical answer
    hypothesis_prompt = f"""
    Imagine you're writing a document that would perfectly answer this question.
    Write a detailed paragraph that would contain the answer.
    
    Question: {question}
    
    Hypothetical document paragraph:
    """
    
    hypothetical_doc = hypothetical_generator.invoke(hypothesis_prompt).content
    
    # Step 2: Search using the hypothetical document
    # The hypothesis is closer to document phrasing than the question
    docs = vectorstore.similarity_search(hypothetical_doc, k=k)
    
    return docs


# Example:
# Question: "What's the process for requesting time off?"
# HyDE generates: "To request time off, employees should submit a PTO request
#                  through the HR portal at least two weeks in advance..."
# This hypothetical matches document phrasing better than the question
```

> **Pro Tip**: HyDE works best when your queries are short questions but your documents are detailed descriptions.

## Strategy 3: Hybrid Search

Combine semantic (vector) and lexical (keyword) search:

```python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    """Combine vector similarity with BM25 keyword matching."""
    
    def __init__(self, vectorstore, documents: list[str]):
        self.vectorstore = vectorstore
        self.documents = documents
        
        # Build BM25 index
        tokenized_docs = [doc.lower().split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized_docs)
    
    def retrieve(self, query: str, k: int = 5, 
                 alpha: float = 0.5) -> list:
        """
        Hybrid retrieval with configurable weighting.
        
        Args:
            query: Search query
            k: Number of results
            alpha: Weight for vector search (0=BM25 only, 1=vector only)
        """
        # Vector search
        vector_results = self.vectorstore.similarity_search_with_score(
            query, k=k*2
        )
        
        # BM25 search
        tokenized_query = query.lower().split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        
        # Normalize scores
        vector_scores = {
            doc.page_content: 1 - score  # Convert distance to similarity
            for doc, score in vector_results
        }
        
        bm25_max = max(bm25_scores) if max(bm25_scores) > 0 else 1
        bm25_normalized = {
            doc: score / bm25_max
            for doc, score in zip(self.documents, bm25_scores)
        }
        
        # Combine scores
        combined_scores = {}
        for doc in set(vector_scores.keys()) | set(bm25_normalized.keys()):
            v_score = vector_scores.get(doc, 0)
            b_score = bm25_normalized.get(doc, 0)
            combined_scores[doc] = alpha * v_score + (1 - alpha) * b_score
        
        # Sort and return top k
        sorted_docs = sorted(
            combined_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return [doc for doc, score in sorted_docs[:k]]
```

### When to Use Hybrid Search

| Scenario | Recommendation |
|----------|----------------|
| Exact term matching needed (IDs, codes) | More BM25 (alpha=0.3) |
| Conceptual/semantic queries | More vector (alpha=0.7) |
| Mixed use cases | Balanced (alpha=0.5) |
| Technical documentation | Hybrid critical |

## Strategy 4: Re-Ranking

Retrieve more, then re-rank with a more powerful model:

```python
from sentence_transformers import CrossEncoder

class RerankingRetriever:
    """Retrieve broadly, then re-rank with cross-encoder."""
    
    def __init__(self, vectorstore):
        self.vectorstore = vectorstore
        # Cross-encoder for re-ranking (more accurate but slower)
        self.reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    def retrieve(self, query: str, initial_k: int = 20, 
                 final_k: int = 5) -> list:
        """Two-stage retrieval with re-ranking."""
        
        # Stage 1: Fast retrieval (recall-focused)
        candidates = self.vectorstore.similarity_search(query, k=initial_k)
        
        # Stage 2: Re-rank with cross-encoder (precision-focused)
        pairs = [(query, doc.page_content) for doc in candidates]
        scores = self.reranker.predict(pairs)
        
        # Sort by re-ranker scores
        ranked = sorted(
            zip(candidates, scores),
            key=lambda x: x[1],
            reverse=True
        )
        
        return [doc for doc, score in ranked[:final_k]]
```

### Re-Ranking vs Initial Retrieval

| Stage | Model Type | Speed | Accuracy |
|-------|------------|-------|----------|
| Initial Retrieval | Bi-encoder (embeddings) | Very fast | Good |
| Re-ranking | Cross-encoder | Slower | Better |

**Bi-encoder**: Encodes query and documents separately, fast but less accurate
**Cross-encoder**: Encodes query-document pairs together, slow but more accurate

## Strategy 5: Contextual Compression

Remove irrelevant parts of retrieved documents:

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

class CompressingRetriever:
    """Extract only relevant portions from retrieved documents."""
    
    def __init__(self, vectorstore):
        self.vectorstore = vectorstore
        self.compressor = LLMChainExtractor.from_llm(
            ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
        )
        
        base_retriever = vectorstore.as_retriever(
            search_kwargs={"k": 10}
        )
        
        self.retriever = ContextualCompressionRetriever(
            base_compressor=self.compressor,
            base_retriever=base_retriever
        )
    
    def retrieve(self, query: str) -> list:
        """Retrieve and compress to relevant excerpts."""
        return self.retriever.invoke(query)


# Before compression:
# "Welcome to Acme Corp's employee handbook. This document covers...
#  [500 words]... Remote Work Policy: Employees may work from home
#  up to 3 days per week with manager approval... [500 more words]"

# After compression (for query "remote work policy"):
# "Remote Work Policy: Employees may work from home up to 3 days 
#  per week with manager approval."
```

## Strategy 6: Parent Document Retrieval

Index small chunks but retrieve larger context:

```python
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain.text_splitter import RecursiveCharacterTextSplitter

def setup_parent_retriever(documents, vectorstore):
    """Index small chunks but retrieve parent documents."""
    
    # Small chunks for embedding (better search)
    child_splitter = RecursiveCharacterTextSplitter(
        chunk_size=400,
        chunk_overlap=50
    )
    
    # Larger chunks for context (better generation)
    parent_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200
    )
    
    # Store for parent documents
    docstore = InMemoryStore()
    
    retriever = ParentDocumentRetriever(
        vectorstore=vectorstore,
        docstore=docstore,
        child_splitter=child_splitter,
        parent_splitter=parent_splitter
    )
    
    # Index documents
    retriever.add_documents(documents)
    
    return retriever


# Benefit: Small chunks = precise matching
#          Large parents = complete context for LLM
```

## Choosing the Right Strategy

```
┌─────────────────────────────────────────────────────────────┐
│              Which Retrieval Strategy?                       │
└─────────────────────────────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │ Query phrasing matches    │
            │ document phrasing?        │
            └──────┬──────────┬─────────┘
                  Yes         No
                   │           │
                   ▼           ▼
              [Basic        [Query Rewriting
              Similarity]    or HyDE]
                   │
    ┌──────────────┴──────────────┐
    │ Need exact term matching?    │
    └──────┬──────────┬───────────┘
          Yes         No
           │           │
           ▼           ▼
     [Hybrid       [Vector
      Search]       Only]
           │
    ┌──────┴──────────────────┐
    │ Quality still not good? │
    └──────┬──────────┬───────┘
          Yes         No
           │           │
           ▼           ▼
     [Add Re-ranking] [Done!]
```

## Key Takeaways

- **Query rewriting** helps when user phrasing differs from documents
- **HyDE** works great for question→document mismatch
- **Hybrid search** combines semantic and keyword matching
- **Re-ranking** improves precision after initial recall
- **Contextual compression** reduces noise in retrieved context
- **Parent document retrieval** balances precise search with complete context
- **Start simple** and add complexity only when needed

## What's Next

In the next lesson, we'll explore **Building Production RAG Systems**—evaluation, debugging, and optimizing RAG pipelines for real-world deployment.

---

*Estimated completion time: 35 minutes*
*Difficulty: Intermediate to Advanced*
