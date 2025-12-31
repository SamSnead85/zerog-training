# Lesson 2.2: Pinecone and Managed Services

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Vector Databases

---

## 📚 Reading Material

### Pinecone Overview

Pinecone is the leading managed vector database:
- Serverless scaling
- Sub-10ms queries
- Built-in metadata filtering
- Excellent LangChain/LlamaIndex integration

### Getting Started

```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="YOUR_API_KEY")

# Create index
pc.create_index(
    name="my-index",
    dimension=1536,  # Match your embedding model
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)

index = pc.Index("my-index")
```

### Upserting Vectors

```python
# Single upsert
index.upsert([
    {
        "id": "doc1",
        "values": [0.1, 0.2, ...],  # 1536 dimensions
        "metadata": {"source": "handbook.pdf", "page": 12}
    }
])

# Batch upsert (more efficient)
vectors = [
    {"id": f"doc{i}", "values": embeddings[i], "metadata": {"chunk": i}}
    for i in range(len(embeddings))
]
index.upsert(vectors=vectors, batch_size=100)
```

### Querying

```python
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True,
    filter={"source": "handbook.pdf"}
)

for match in results.matches:
    print(f"ID: {match.id}, Score: {match.score}")
    print(f"Metadata: {match.metadata}")
```

### Namespaces

Organize vectors logically:
```python
# Different namespaces for different data
index.upsert(vectors, namespace="product_docs")
index.upsert(vectors, namespace="support_tickets")

# Query specific namespace
results = index.query(vector, namespace="product_docs", top_k=5)
```

---

## 🎬 Video Script

**[INTRO - Pinecone dashboard]**

Pinecone makes vector search simple. Let me walk through the essentials.

**[CUT TO: Setup code]**

Create an index with dimension matching your embeddings. Pinecone handles infrastructure—you just specify cloud region.

**[CUT TO: Upsert and query]**

Upsert vectors with IDs and metadata. Query with a vector, get top matches with scores. Add filters to narrow results.

**[CUT TO: Namespaces]**

Namespaces organize data. Product docs, support tickets, different customers. Query within a namespace.

**[END - Runtime: 5:00]**

---

## 🔬 Interactive Lab: Pinecone Implementation

```python
from pinecone import Pinecone
from openai import OpenAI

pc = Pinecone(api_key="YOUR_KEY")
openai = OpenAI()

# Get or create index
index = pc.Index("rag-demo")

def embed(text):
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Index documents
docs = [
    {"id": "1", "text": "Our return policy allows 30 days..."},
    {"id": "2", "text": "Shipping is free over $50..."},
]

for doc in docs:
    index.upsert([{
        "id": doc["id"],
        "values": embed(doc["text"]),
        "metadata": {"text": doc["text"]}
    }])

# Query
query = "How long do I have to return items?"
results = index.query(vector=embed(query), top_k=3, include_metadata=True)
print(results)
```

---

## ✅ Knowledge Check

### Question 1
What must match between your embedding model and Pinecone index?

A) API key  
B) Dimension  
C) Region  
D) Namespace  

**Correct Answer**: B
