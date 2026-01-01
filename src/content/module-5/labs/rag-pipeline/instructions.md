# Lab: Build a Production RAG Pipeline

## Overview

In this lab, you'll build a complete, production-quality RAG pipeline that can answer questions about your company's documentation. You'll implement indexing, advanced retrieval, and answer generation with citations.

**Time**: 3-4 hours  
**Difficulty**: Intermediate  
**Skills**: RAG architecture, vector stores, hybrid retrieval, LangChain

## Learning Objectives

By completing this lab, you will:
- Build an end-to-end RAG pipeline from scratch
- Implement hybrid search (vector + keyword)
- Add re-ranking for improved precision
- Generate answers with proper source citations
- Evaluate retrieval quality

## The Challenge

You're building a documentation assistant for a software company. Users should be able to ask natural language questions and get accurate answers with citations to the source documentation.

**Requirements**:
1. Index documents from multiple sources (markdown, PDF)
2. Implement hybrid retrieval (semantic + keyword)
3. Re-rank results for precision
4. Generate answers with source citations
5. Handle "I don't know" gracefully

## Prerequisites

```bash
pip install langchain langchain-openai langchain-community chromadb rank-bm25 sentence-transformers pypdf
```

Ensure `OPENAI_API_KEY` is set in your environment.

## Step 1: Document Loading and Chunking

Create `rag_pipeline.py`:

```python
from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
    PyPDFLoader
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

class DocumentIndexer:
    """Index documents for RAG retrieval."""
    
    def __init__(self, persist_dir: str = "./chroma_db"):
        self.persist_dir = persist_dir
        self.embeddings = OpenAIEmbeddings()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
    
    def load_documents(self, docs_dir: str) -> list:
        """Load documents from a directory."""
        # TODO: Implement loading from docs_dir
        # Support: .md, .txt, .pdf files
        # Return list of Document objects
        pass
    
    def index_documents(self, documents: list) -> Chroma:
        """Split and index documents."""
        # TODO: Split documents into chunks
        # TODO: Create Chroma vectorstore
        # TODO: Return the vectorstore
        pass
```

## Step 2: Hybrid Retrieval

```python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    """Combine vector and keyword search."""
    
    def __init__(self, vectorstore: Chroma, documents: list):
        self.vectorstore = vectorstore
        self.documents = documents
        
        # Build BM25 index
        # TODO: Tokenize documents and create BM25 index
        pass
    
    def retrieve(self, query: str, k: int = 10, 
                 alpha: float = 0.5) -> list:
        """
        Hybrid retrieval.
        
        Args:
            query: Search query
            k: Number of results
            alpha: Balance (0=BM25 only, 1=vector only)
        
        Returns:
            List of top-k documents
        """
        # TODO: Get vector search results
        # TODO: Get BM25 search results
        # TODO: Normalize and combine scores
        # TODO: Return top-k documents
        pass
```

## Step 3: Re-Ranking

```python
from sentence_transformers import CrossEncoder

class Reranker:
    """Re-rank documents with a cross-encoder."""
    
    def __init__(self, model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.model = CrossEncoder(model_name)
    
    def rerank(self, query: str, documents: list, 
               top_k: int = 5) -> list:
        """Re-rank documents by relevance to query."""
        # TODO: Create query-document pairs
        # TODO: Score with cross-encoder
        # TODO: Sort by score and return top_k
        pass
```

## Step 4: Answer Generation with Citations

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

class RAGAnswerer:
    """Generate answers with citations."""
    
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)
        self.prompt = ChatPromptTemplate.from_template("""
Answer the question based ONLY on the following context.
If you cannot answer from the context, say "I don't have information about that."

For each fact you state, cite the source using [Source: filename].

Context:
{context}

Question: {question}

Answer with citations:
""")
    
    def answer(self, question: str, documents: list) -> dict:
        """Generate answer with citations."""
        # TODO: Format context from documents
        # TODO: Generate answer
        # TODO: Extract citations
        # TODO: Return answer and sources
        pass
```

## Step 5: Complete Pipeline

```python
class ProductionRAG:
    """Complete production RAG pipeline."""
    
    def __init__(self, docs_dir: str):
        # Initialize all components
        self.indexer = DocumentIndexer()
        documents = self.indexer.load_documents(docs_dir)
        self.vectorstore = self.indexer.index_documents(documents)
        self.retriever = HybridRetriever(self.vectorstore, documents)
        self.reranker = Reranker()
        self.answerer = RAGAnswerer()
    
    def query(self, question: str) -> dict:
        """Process a question through the full pipeline."""
        # Step 1: Hybrid retrieval (get 20 candidates)
        candidates = self.retriever.retrieve(question, k=20)
        
        # Step 2: Re-rank to top 5
        top_docs = self.reranker.rerank(question, candidates, top_k=5)
        
        # Step 3: Generate answer with citations
        result = self.answerer.answer(question, top_docs)
        
        return result
```

## Step 6: Evaluation

Create `evaluate_rag.py`:

```python
def evaluate_retrieval(rag: ProductionRAG, test_cases: list) -> dict:
    """Evaluate retrieval quality."""
    
    metrics = {
        "total": len(test_cases),
        "recall_at_5": 0,
        "mrr": 0  # Mean Reciprocal Rank
    }
    
    for test in test_cases:
        question = test["question"]
        expected_sources = test["expected_sources"]
        
        # TODO: Run retrieval
        # TODO: Calculate recall@5 (how many expected sources found)
        # TODO: Calculate MRR (what rank is first relevant doc)
        pass
    
    return metrics


# Test cases
test_cases = [
    {
        "question": "How do I reset my password?",
        "expected_sources": ["user_guide.md", "faq.md"]
    },
    {
        "question": "What are the API rate limits?",
        "expected_sources": ["api_reference.md"]
    }
]
```

## Deliverables

Submit a folder containing:

1. **`rag_pipeline.py`**: Complete implementation
2. **`evaluate_rag.py`**: Evaluation script
3. **`sample_docs/`**: 5-10 test documents (markdown/PDF)
4. **`results.md`**: Evaluation results and analysis

## Evaluation Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Document loading works | 15 | Loads .md, .txt, .pdf files |
| Hybrid retrieval | 25 | Vector + BM25 with tunable alpha |
| Re-ranking | 20 | Cross-encoder improves results |
| Answer generation | 20 | Accurate answers with citations |
| Evaluation | 10 | Metrics calculated correctly |
| Code quality | 10 | Clean, documented code |

**Passing score**: 70 points

## Bonus Challenges

1. **Query expansion**: Generate alternative queries and combine results
2. **Semantic caching**: Cache embeddings for repeated queries
3. **Streaming**: Stream the generated answer token by token
4. **Multi-modal**: Support indexing images with descriptions

---

*Good luck building your production RAG system!*
