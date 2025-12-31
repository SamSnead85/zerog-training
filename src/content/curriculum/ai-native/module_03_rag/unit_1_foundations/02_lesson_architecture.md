# Lesson 1.2: The RAG Architecture

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 1 - RAG Foundations

---

## 📚 Reading Material

### RAG Pipeline Overview

A complete RAG system has two main phases:

```
┌─────────────────────────────────────────────────────────────┐
│                    INDEXING PHASE (offline)                  │
│  Documents → Chunk → Embed → Store in Vector DB             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    QUERY PHASE (online)                      │
│  Query → Embed → Search → Retrieve → Augment → Generate    │
└─────────────────────────────────────────────────────────────┘
```

### Indexing Phase

**Step 1: Document Loading**
Load documents from various sources:
- PDFs, Word docs, web pages
- Databases, APIs
- Code repositories

**Step 2: Chunking**
Split documents into smaller pieces:
```python
# Example: Split by paragraph
chunks = document.split("\n\n")

# Example: Fixed size with overlap
chunks = [text[i:i+500] for i in range(0, len(text), 400)]
```

**Step 3: Embedding**
Convert chunks to vectors:
```python
embedding = embedding_model.encode(chunk)
# [0.021, -0.134, 0.872, ...] (1536 dimensions)
```

**Step 4: Storage**
Store vectors + metadata in vector database:
```python
vector_db.upsert({
    "id": "doc1_chunk3",
    "vector": embedding,
    "metadata": {"source": "handbook.pdf", "page": 12}
})
```

### Query Phase

**Step 1: Query Embedding**
Convert user query to same vector space:
```python
query_vector = embedding_model.encode("What is the refund policy?")
```

**Step 2: Similarity Search**
Find most similar chunks:
```python
results = vector_db.search(query_vector, top_k=5)
# Returns: [{"id": "chunk_42", "score": 0.89, ...}, ...]
```

**Step 3: Context Building**
Assemble retrieved chunks:
```python
context = "\n\n".join([r["text"] for r in results])
```

**Step 4: Generation**
LLM generates answer with context:
```python
prompt = f"""Answer using the context:
{context}

Question: {query}"""

response = llm.generate(prompt)
```

### Component Deep Dive

**Embedding Model**
Converts text to vectors. Popular options:
- OpenAI: `text-embedding-3-small` (cheap, good)
- OpenAI: `text-embedding-3-large` (best quality)
- Open source: `sentence-transformers/all-MiniLM-L6-v2`

**Vector Database**
Stores and searches vectors efficiently:
- Managed: Pinecone, Weaviate Cloud
- Open source: Chroma, Qdrant, Milvus
- Built-in: pgvector (PostgreSQL)

**LLM**
Generates final answer:
- GPT-4o for quality
- GPT-4o-mini for cost
- Claude for long context
- Open source for privacy

---

## 🎬 Video Script

**[INTRO - Pipeline diagram animation]**

RAG has two phases: indexing and query. Let me walk you through both.

**[CUT TO: Indexing phase]**

Indexing happens offline, before any queries. Load your documents—PDFs, code, databases. Chunk them into smaller pieces. Embed each chunk into a vector. Store in a vector database with metadata.

**[CUT TO: Query phase]**

When a user asks a question: embed their query into the same vector space. Search for similar vectors—these are your relevant chunks. Build context from retrieved chunks. Generate the answer using an LLM with that context.

**[CUT TO: Component breakdown]**

Three key components. Embedding model converts text to vectors. Vector database stores and searches efficiently. LLM generates the final answer. Each choice affects quality and cost.

**[CUT TO: Speaker on camera]**

This architecture is elegant. Indexing is a one-time cost. Queries are fast because vectors enable similarity search. The LLM sees only relevant context, not your entire document corpus. Understanding this flow is essential for everything that follows.

**[END - Runtime: 5:00]**

---

## 🔬 Interactive Lab: Building a RAG Pipeline

### Objective
Implement a complete RAG pipeline from scratch.

### Part 1: Document Indexing (20 minutes)

```python
from openai import OpenAI
import numpy as np

client = OpenAI()

# Sample documents
DOCUMENTS = [
    {
        "id": "policy_1",
        "text": "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.",
        "metadata": {"source": "policies.pdf", "section": "returns"}
    },
    {
        "id": "policy_2", 
        "text": "Shipping is free on orders over $50. Standard shipping takes 5-7 business days. Express shipping (2-3 days) costs $15.",
        "metadata": {"source": "policies.pdf", "section": "shipping"}
    },
    {
        "id": "product_1",
        "text": "The Pro Widget features a 10-hour battery life, water resistance (IP67), and weighs only 150 grams. Available in black, silver, and blue.",
        "metadata": {"source": "products.pdf", "section": "pro_widget"}
    },
    {
        "id": "product_2",
        "text": "The Basic Widget has a 5-hour battery, splash resistance, and weighs 200 grams. Available in black only. Budget-friendly option.",
        "metadata": {"source": "products.pdf", "section": "basic_widget"}
    },
    {
        "id": "support_1",
        "text": "Contact customer support at support@company.com or call 1-800-555-1234. Support hours are 9am-6pm EST, Monday through Friday.",
        "metadata": {"source": "support.pdf", "section": "contact"}
    }
]

def get_embedding(text):
    """Get embedding from OpenAI"""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Index documents
print("Indexing documents...")
vector_store = []
for doc in DOCUMENTS:
    embedding = get_embedding(doc["text"])
    vector_store.append({
        "id": doc["id"],
        "text": doc["text"],
        "embedding": embedding,
        "metadata": doc["metadata"]
    })

print(f"Indexed {len(vector_store)} documents")
print(f"Vector dimension: {len(vector_store[0]['embedding'])}")
```

### Part 2: Retrieval (15 minutes)

```python
def cosine_similarity(a, b):
    """Calculate cosine similarity between two vectors"""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def search(query, top_k=3):
    """Search for most similar documents"""
    query_embedding = get_embedding(query)
    
    # Calculate similarity with all documents
    scores = []
    for doc in vector_store:
        score = cosine_similarity(query_embedding, doc["embedding"])
        scores.append({
            "id": doc["id"],
            "text": doc["text"],
            "score": score,
            "metadata": doc["metadata"]
        })
    
    # Sort by score and return top_k
    scores.sort(key=lambda x: x["score"], reverse=True)
    return scores[:top_k]

# Test retrieval
queries = [
    "How do I return a product?",
    "What's the battery life of the Pro Widget?",
    "How can I contact support?",
]

for query in queries:
    print(f"\nQuery: {query}")
    results = search(query, top_k=2)
    for r in results:
        print(f"  [{r['score']:.3f}] {r['text'][:80]}...")
```

### Part 3: Generation (15 minutes)

```python
def rag_query(question, top_k=3):
    """Complete RAG pipeline"""
    # Retrieve
    results = search(question, top_k=top_k)
    
    # Build context
    context_parts = []
    for r in results:
        source = r["metadata"]["source"]
        context_parts.append(f"[Source: {source}]\n{r['text']}")
    context = "\n\n".join(context_parts)
    
    # Generate
    prompt = f"""Answer the question using ONLY the context provided.
If the answer isn't in the context, say "I don't have that information."
Cite your sources.

Context:
{context}

Question: {question}

Answer:"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    
    return {
        "answer": response.choices[0].message.content,
        "sources": [r["metadata"]["source"] for r in results],
        "context_used": context
    }

# Test complete RAG
test_questions = [
    "What is the return policy?",
    "Compare the Pro and Basic widgets",
    "How much does express shipping cost?",
]

for q in test_questions:
    print(f"\n{'='*50}")
    print(f"Q: {q}")
    result = rag_query(q)
    print(f"A: {result['answer']}")
    print(f"Sources: {result['sources']}")
```

---

## ✅ Knowledge Check

### Question 1
What happens in the indexing phase?

A) User queries are answered  
B) Documents are chunked, embedded, and stored  
C) The LLM is trained  
D) Queries are processed  

**Correct Answer**: B

**Explanation**: Indexing prepares documents for retrieval: load, chunk, embed into vectors, store with metadata.

---

### Question 2
Why do we convert text to embeddings?

A) To compress the text  
B) To enable similarity-based search  
C) To encrypt the content  
D) To reduce costs  

**Correct Answer**: B

**Explanation**: Embeddings represent semantic meaning as vectors. Similar texts have similar vectors, enabling semantic search.

---

*You've completed Lesson 1.2! You understand the RAG architecture.*
