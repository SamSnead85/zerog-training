# Lesson 3.4: Ingestion Pipelines

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 3 - Document Processing

---

## 📚 Reading Material

### Pipeline Architecture

```
Source → Load → Parse → Clean → Chunk → Embed → Store
         ↓       ↓       ↓        ↓       ↓       ↓
        PDF    Extract  Normalize Split  Vector  DB
```

### LlamaIndex Pipeline

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter

# Load
documents = SimpleDirectoryReader("./data").load_data()

# Parse + Index
parser = SentenceSplitter(chunk_size=512, chunk_overlap=50)
index = VectorStoreIndex.from_documents(
    documents,
    transformations=[parser]
)
```

### Incremental Updates

```python
class IncrementalIngester:
    def __init__(self, vector_db, embed_fn):
        self.db = vector_db
        self.embed = embed_fn
        self.processed = set()
    
    def ingest(self, documents):
        for doc in documents:
            doc_hash = hash(doc.content)
            
            if doc_hash in self.processed:
                continue  # Skip unchanged
            
            # Delete old version
            self.db.delete(filter={"source": doc.source})
            
            # Add new chunks
            chunks = self.chunk(doc)
            vectors = [(c.id, self.embed(c.text), c.metadata) for c in chunks]
            self.db.upsert(vectors)
            
            self.processed.add(doc_hash)
```

### Error Handling

```python
def robust_ingest(documents):
    results = {"success": 0, "failed": []}
    
    for doc in documents:
        try:
            process_document(doc)
            results["success"] += 1
        except Exception as e:
            results["failed"].append({
                "doc": doc.source,
                "error": str(e)
            })
            logger.error(f"Failed: {doc.source}: {e}")
    
    return results
```

---

## 🎬 Video Script

**[INTRO - Pipeline diagram]**

Production RAG needs robust ingestion. Load, parse, chunk, embed, store—with error handling.

**[CUT TO: LlamaIndex]**

LlamaIndex simplifies the pipeline. Load from directory, apply transformations, build index.

**[CUT TO: Incremental updates]**

Don't re-process unchanged documents. Hash content, track processed files, update only changes.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why track document hashes in ingestion?

A) Security  
B) Avoid re-processing unchanged documents  
C) Compression  
D) Encryption  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You understand document processing.*
