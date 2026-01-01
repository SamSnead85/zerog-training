# Lesson 5.1: RAG Architecture Fundamentals

## Introduction

**Retrieval-Augmented Generation (RAG)** is perhaps the most important pattern in production LLM applications. Instead of relying solely on what the model "knows" from training, RAG grounds responses in your actual data—documents, databases, APIs. This lesson covers the architecture that makes RAG work.

## Why RAG?

LLMs have two fundamental limitations:
1. **Knowledge cutoff**: They don't know about events after training
2. **Hallucinations**: They confidently state false information

RAG solves both by fetching relevant information at query time:

[Image: Diagram comparing LLM-only vs RAG-augmented responses]

### The RAG Value Proposition

| Without RAG | With RAG |
|-------------|----------|
| "Our refund policy is..." (hallucinated) | "According to our policy document, refunds are..." (grounded) |
| Can't answer about recent events | Retrieves latest documents |
| Generic answers | Company-specific answers |
| No citations | Cites sources |

## Core RAG Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        RAG PIPELINE                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌──────────┐  │
│  │  Query  │───▶│  Embed  │───▶│ Retrieve│───▶│ Generate │  │
│  └─────────┘    └─────────┘    └─────────┘    └──────────┘  │
│                                     ▲                        │
│                                     │                        │
│                              ┌──────────────┐                │
│                              │ Vector Store │                │
│                              │  (indexed    │                │
│                              │   documents) │                │
│                              └──────────────┘                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### The Four Stages

1. **Index** (offline): Process documents into searchable chunks
2. **Embed**: Convert user query to vector
3. **Retrieve**: Find similar document chunks
4. **Generate**: LLM produces answer using retrieved context

## Stage 1: Document Indexing

Before you can retrieve, you must index your documents:

```python
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    WebBaseLoader
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. Load documents from various sources
pdf_loader = PyPDFLoader("company_handbook.pdf")
web_loader = WebBaseLoader("https://example.com/faq")

documents = pdf_loader.load() + web_loader.load()

# 2. Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,      # Characters per chunk
    chunk_overlap=200,    # Overlap between chunks
    length_function=len,
    separators=["\n\n", "\n", " ", ""]  # Priority of split points
)

chunks = text_splitter.split_documents(documents)
print(f"Split into {len(chunks)} chunks")

# 3. Create embeddings and store in vector database
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

print("Indexing complete!")
```

### Chunking Strategies

Chunk size matters—too small loses context, too large dilutes relevance:

```python
# Strategy 1: Fixed-size chunks (simple)
from langchain.text_splitter import CharacterTextSplitter

simple_splitter = CharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100
)

# Strategy 2: Recursive splitting (better for documents)
from langchain.text_splitter import RecursiveCharacterTextSplitter

recursive_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " ", ""]
)

# Strategy 3: Semantic splitting (best quality, slower)
from langchain_experimental.text_splitter import SemanticChunker

semantic_splitter = SemanticChunker(
    embeddings=OpenAIEmbeddings(),
    breakpoint_threshold_type="percentile",
    breakpoint_threshold_amount=90
)
```

> **Pro Tip**: Start with RecursiveCharacterTextSplitter at 1000 chars with 200 overlap. Tune based on retrieval quality.

## Stage 2: Query Embedding

When a user asks a question, convert it to the same vector space:

```python
def embed_query(query: str) -> list[float]:
    """Convert user query to embedding vector."""
    embeddings = OpenAIEmbeddings()
    return embeddings.embed_query(query)

query = "What is our vacation policy?"
query_vector = embed_query(query)
# Returns: [0.023, -0.041, 0.089, ...] (1536 dimensions)
```

## Stage 3: Retrieval

Find the most similar document chunks:

```python
def retrieve_documents(query: str, k: int = 5) -> list:
    """Retrieve top-k relevant documents."""
    
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": k}
    )
    
    docs = retriever.invoke(query)
    return docs


# Advanced: Retrieval with metadata filtering
def retrieve_with_filter(query: str, department: str) -> list:
    """Retrieve documents filtered by metadata."""
    
    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": 5,
            "filter": {"department": department}
        }
    )
    
    return retriever.invoke(query)


# Example usage
query = "What is our vacation policy?"
relevant_docs = retrieve_documents(query)

for doc in relevant_docs:
    print(f"Source: {doc.metadata.get('source')}")
    print(f"Content: {doc.page_content[:200]}...")
    print("---")
```

### Retrieval Strategies

```python
# Strategy 1: Similarity search (default)
docs = vectorstore.similarity_search(query, k=5)

# Strategy 2: Maximum Marginal Relevance (diversity)
docs = vectorstore.max_marginal_relevance_search(
    query,
    k=5,
    fetch_k=20,  # Fetch more, then diversify
    lambda_mult=0.5  # Balance relevance vs diversity
)

# Strategy 3: Similarity with score threshold
docs = vectorstore.similarity_search_with_score(query, k=10)
filtered_docs = [(doc, score) for doc, score in docs if score > 0.7]

# Strategy 4: Hybrid search (vector + keyword)
# Requires Weaviate or similar
docs = vectorstore.hybrid_search(query, alpha=0.5)  # 0=keyword, 1=vector
```

## Stage 4: Generation

Combine retrieved context with the query for the LLM:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4-turbo")

RAG_PROMPT = ChatPromptTemplate.from_template("""
Answer the question based ONLY on the following context. 
If you cannot answer from the context, say "I don't have information about that."

Context:
{context}

Question: {question}

Answer:
""")

def generate_answer(question: str, context_docs: list) -> str:
    """Generate answer using retrieved context."""
    
    # Format context
    context = "\n\n".join([doc.page_content for doc in context_docs])
    
    # Create the prompt
    messages = RAG_PROMPT.format_messages(
        context=context,
        question=question
    )
    
    # Generate
    response = llm.invoke(messages)
    return response.content


# Complete RAG pipeline
def rag_query(question: str) -> str:
    """End-to-end RAG query."""
    docs = retrieve_documents(question, k=5)
    answer = generate_answer(question, docs)
    return answer
```

## Complete RAG Implementation

Here's a production-ready RAG class:

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

class RAGPipeline:
    """Production-ready RAG implementation."""
    
    def __init__(self, persist_directory: str = "./chroma_db"):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            persist_directory=persist_directory,
            embedding_function=self.embeddings
        )
        self.llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)
        self.retriever = self.vectorstore.as_retriever(
            search_kwargs={"k": 5}
        )
        
        self.prompt = ChatPromptTemplate.from_template("""
You are a helpful assistant. Answer the question based on the context below.

Context:
{context}

Question: {question}

If the answer isn't in the context, say "I don't have information about that."
Cite your sources when possible.
""")
    
    def _format_docs(self, docs):
        return "\n\n---\n\n".join(
            f"[Source: {doc.metadata.get('source', 'unknown')}]\n{doc.page_content}"
            for doc in docs
        )
    
    def query(self, question: str) -> dict:
        """Execute RAG query and return answer with sources."""
        
        # Retrieve
        docs = self.retriever.invoke(question)
        
        # Format context
        context = self._format_docs(docs)
        
        # Generate
        messages = self.prompt.format_messages(
            context=context,
            question=question
        )
        response = self.llm.invoke(messages)
        
        return {
            "answer": response.content,
            "sources": [doc.metadata.get('source') for doc in docs],
            "context_used": len(docs)
        }
    
    def index_documents(self, documents: list):
        """Add new documents to the index."""
        self.vectorstore.add_documents(documents)
        self.vectorstore.persist()


# Usage
rag = RAGPipeline()
result = rag.query("What is our remote work policy?")
print(f"Answer: {result['answer']}")
print(f"Sources: {result['sources']}")
```

## Common RAG Pitfalls

> **Common Mistake**: Chunks too large. If your chunks are 5000+ characters, you're likely retrieving irrelevant information alongside relevant content.

> **Common Mistake**: Not including metadata. Always store source, date, and category in metadata for filtering and citations.

> **Common Mistake**: Ignoring retrieval quality. If retrieval returns irrelevant docs, the LLM can't help. Test retrieval separately.

## Key Takeaways

- **RAG** grounds LLM responses in your actual data
- **Four stages**: Index → Embed → Retrieve → Generate
- **Chunking matters**: Start at 1000 chars with 200 overlap
- **Test retrieval separately**: Bad retrieval = bad answers
- **Include metadata**: Source, date, category for filtering and citations
- **Use MMR** for diverse results when top results are too similar
- **Cite sources** to build user trust

## What's Next

In the next lesson, we'll explore **Advanced Retrieval Strategies**—query rewriting, re-ranking, and hybrid search techniques that dramatically improve RAG quality.

---

*Estimated completion time: 30 minutes*
*Difficulty: Intermediate*
