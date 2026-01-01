# Lesson 2.2: Vector Databases - The AI's Long-Term Memory

## Introduction

Traditional databases are great for exact matches: "Show me all users named 'John'." But AI applications need something different—they need to find *conceptually similar* information. Enter vector databases: the technology that enables semantic search, RAG (Retrieval-Augmented Generation), and AI memory systems.

## What Are Vector Embeddings?

Before understanding vector databases, you need to understand embeddings.

**An embedding is a list of numbers that represents the meaning of a piece of text.**

[Image: Visual showing "I love pizza" → [0.23, -0.45, 0.82, ...] with 1536 dimensions]

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str) -> list[float]:
    """Convert text to a vector embedding."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Example
embedding = get_embedding("I love programming in Python")
print(f"Embedding dimension: {len(embedding)}")  # 1536 dimensions
print(f"First 5 values: {embedding[:5]}")  # [0.023, -0.041, 0.089, ...]
```

### Why Embeddings Work

Similar concepts have similar embeddings:

```python
import numpy as np
from scipy.spatial.distance import cosine

def similarity(text1: str, text2: str) -> float:
    """Calculate semantic similarity between two texts."""
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)
    return 1 - cosine(emb1, emb2)  # 1 = identical, 0 = unrelated

# These are semantically similar
sim1 = similarity("I love dogs", "Dogs are my favorite pets")
print(f"Similar concepts: {sim1:.3f}")  # ~0.85

# These are unrelated
sim2 = similarity("I love dogs", "The stock market crashed")
print(f"Unrelated concepts: {sim2:.3f}")  # ~0.15
```

## Why Not Traditional Databases?

| Traditional DB (SQL) | Vector DB |
|---------------------|-----------|
| Exact match: `WHERE name = 'John'` | Similarity search: "Find notes about meetings" |
| Keyword search: `WHERE text LIKE '%budget%'` | Semantic search: "finance discussions" → finds "budget", "quarterly report", etc. |
| Structured data | Unstructured data (text, images, audio) |
| Fast for known queries | Fast for similarity queries |

> **Analogy**: A traditional database is like a library organized alphabetically. A vector database is like a library organized by *ideas*—all books about "adventure" are together, even if their titles start with different letters.

## The Major Vector Databases

### Pinecone: Fully Managed Simplicity

**Best for**: Teams that want zero infrastructure headaches

```python
from pinecone import Pinecone, ServerlessSpec

# Initialize
pc = Pinecone(api_key="your-api-key")

# Create an index
pc.create_index(
    name="my-ai-memory",
    dimension=1536,  # Match your embedding model
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)

index = pc.Index("my-ai-memory")

# Upsert vectors with metadata
index.upsert(vectors=[
    {
        "id": "doc-1",
        "values": get_embedding("The quarterly budget meeting is Tuesday"),
        "metadata": {"type": "meeting", "date": "2024-01-15"}
    },
    {
        "id": "doc-2", 
        "values": get_embedding("Python is great for data science"),
        "metadata": {"type": "note", "topic": "programming"}
    }
])

# Query for similar content
results = index.query(
    vector=get_embedding("When is the finance meeting?"),
    top_k=3,
    include_metadata=True
)

for match in results.matches:
    print(f"Score: {match.score:.3f}, ID: {match.id}")
```

**Pros**: Fully managed, excellent docs, great for rapid prototyping
**Cons**: Can get expensive at scale, limited querying flexibility

### Weaviate: Hybrid Search Power

**Best for**: Applications needing both semantic AND keyword search

```python
import weaviate
from weaviate.classes.init import Auth

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url="your-cluster-url",
    auth_credentials=Auth.api_key("your-api-key")
)

# Define schema
client.collections.create(
    name="Document",
    vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai(),
    properties=[
        weaviate.classes.config.Property(name="content", data_type=weaviate.classes.config.DataType.TEXT),
        weaviate.classes.config.Property(name="source", data_type=weaviate.classes.config.DataType.TEXT),
    ]
)

# Add documents (automatically embedded!)
documents = client.collections.get("Document")
documents.data.insert({"content": "The quarterly budget meeting is Tuesday", "source": "calendar"})

# Hybrid search: combines vector + keyword
response = documents.query.hybrid(
    query="finance meeting schedule",
    limit=5
)

for obj in response.objects:
    print(obj.properties)
```

**Pros**: Built-in vectorization, hybrid search, GraphQL API
**Cons**: Steeper learning curve, more complex setup

### Chroma: Local Development Champion

**Best for**: Prototyping, local development, simple use cases

```python
import chromadb
from chromadb.utils import embedding_functions

# Create a client (in-memory for development)
client = chromadb.Client()

# Or persist to disk
# client = chromadb.PersistentClient(path="./chroma_db")

# Use OpenAI embeddings
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-openai-key",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.create_collection(
    name="my_documents",
    embedding_function=openai_ef
)

# Add documents (automatically embedded)
collection.add(
    documents=[
        "The quarterly budget meeting is Tuesday",
        "Python is great for data science",
        "Machine learning requires lots of data"
    ],
    ids=["doc1", "doc2", "doc3"],
    metadatas=[
        {"type": "meeting"},
        {"type": "programming"},
        {"type": "ml"}
    ]
)

# Query
results = collection.query(
    query_texts=["When is the finance discussion?"],
    n_results=2
)

print(results)
```

**Pros**: Easy setup, great for development, runs locally
**Cons**: Not designed for large-scale production, limited features

### PostgreSQL with pgvector: Familiar SQL Power

**Best for**: Teams already using PostgreSQL, hybrid SQL + vector needs

```python
import psycopg2
from pgvector.psycopg2 import register_vector

# Connect to PostgreSQL with pgvector extension
conn = psycopg2.connect("postgresql://user:pass@localhost/db")
register_vector(conn)

# Create table with vector column
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        content TEXT,
        embedding VECTOR(1536)
    )
""")

# Insert with embedding
embedding = get_embedding("The quarterly budget meeting is Tuesday")
cur.execute(
    "INSERT INTO documents (content, embedding) VALUES (%s, %s)",
    ("The quarterly budget meeting is Tuesday", embedding)
)

# Query for similar content
query_embedding = get_embedding("When is the finance meeting?")
cur.execute("""
    SELECT content, embedding <=> %s AS distance
    FROM documents
    ORDER BY distance
    LIMIT 5
""", (query_embedding,))

for row in cur.fetchall():
    print(f"Distance: {row[1]:.3f}, Content: {row[0]}")
```

**Pros**: Use existing PostgreSQL skills, ACID transactions, rich SQL
**Cons**: Less optimized for pure vector workloads at massive scale

## Choosing the Right Vector Database

```
┌─────────────────────────────────────────────────────┐
│               Vector Database Selection              │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  How much data?       │
              └───────────────────────┘
                    │           │
                 < 1M        > 10M vectors
                vectors          │
                    │           │
                    ▼           ▼
              ┌─────────┐  ┌─────────────┐
              │ Chroma  │  │ Pinecone    │
              │ pgvector│  │ Weaviate    │
              └─────────┘  │ Qdrant      │
                          └─────────────┘
                                │
                                ▼
              ┌───────────────────────┐
              │  Using PostgreSQL?    │
              └───────────────────────┘
                    │           │
                   Yes          No
                    │           │
                    ▼           ▼
              ┌─────────┐  ┌─────────────┐
              │pgvector │  │ Pinecone    │
              │         │  │ Weaviate    │
              └─────────┘  └─────────────┘
```

## Key Takeaways

- **Vector embeddings** are numerical representations of meaning
- **Similar concepts = similar vectors** (close in high-dimensional space)
- Vector databases enable **semantic search**—find by meaning, not keywords
- **Pinecone**: Easiest fully-managed option
- **Weaviate**: Best hybrid search (semantic + keyword)
- **Chroma**: Perfect for local development and prototyping
- **pgvector**: Great if you already use PostgreSQL
- Always **match embedding dimensions** between your model and index

## What's Next

In the next lesson, we'll explore orchestration frameworks like LangChain and LlamaIndex—the tools that tie LLMs and vector databases together into intelligent applications.

---

*Estimated completion time: 30 minutes*
*Difficulty: Foundational*
