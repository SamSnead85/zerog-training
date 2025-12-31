# Lesson 2.3: Open-Source Vector Databases

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Vector Databases

---

## 📚 Reading Material

### Chroma (Prototyping)

Perfect for local development and testing:

```python
import chromadb
from chromadb.utils import embedding_functions

# Local persistent storage
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection with embedding function
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="YOUR_KEY",
    model_name="text-embedding-3-small"
)

collection = client.create_collection(
    name="documents",
    embedding_function=openai_ef
)

# Add documents (auto-embeds)
collection.add(
    documents=["Doc 1 text", "Doc 2 text"],
    ids=["doc1", "doc2"],
    metadatas=[{"source": "file1"}, {"source": "file2"}]
)

# Query (auto-embeds query)
results = collection.query(
    query_texts=["search query"],
    n_results=5
)
```

### Qdrant (Performance)

Production-grade, Rust-based:

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(host="localhost", port=6333)

# Create collection
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

# Upsert
client.upsert(
    collection_name="documents",
    points=[
        PointStruct(id=1, vector=[0.1, ...], payload={"text": "..."})
    ]
)

# Search
results = client.search(
    collection_name="documents",
    query_vector=[0.1, ...],
    limit=5
)
```

### pgvector (PostgreSQL)

Add vectors to existing PostgreSQL:

```sql
-- Enable extension
CREATE EXTENSION vector;

-- Create table with vector column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536)
);

-- Create index
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- Query
SELECT * FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'
LIMIT 5;
```

---

## 🎬 Video Script

**[INTRO - Three logos]**

Three open-source options, three different use cases.

**[CUT TO: Chroma]**

Chroma is for prototyping. Install with pip, runs locally, auto-embeds text. Perfect for development.

**[CUT TO: Qdrant]**

Qdrant is for production. Built in Rust, high performance, Docker or cloud deployment.

**[CUT TO: pgvector]**

pgvector adds vectors to PostgreSQL. One extension, keep your existing database.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Which option is best for local development?

A) Pinecone  
B) Chroma  
C) Qdrant  
D) Milvus  

**Correct Answer**: B
