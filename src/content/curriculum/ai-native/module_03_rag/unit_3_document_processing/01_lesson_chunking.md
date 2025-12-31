# Lesson 3.1: Chunking Strategies

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Document Processing

---

## 📚 Reading Material

### Why Chunking Matters

Chunks determine retrieval quality:
- Too small: lose context
- Too large: dilute relevance
- Wrong boundaries: broken sentences

### Chunking Methods

**Fixed Size**:
```python
def fixed_size_chunks(text, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks
```

**Sentence-Based**:
```python
import nltk
sentences = nltk.sent_tokenize(text)
```

**Semantic (Recursive)**:
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " "]
)
chunks = splitter.split_text(text)
```

### Optimal Chunk Sizes

| Content Type | Chunk Size | Overlap |
|--------------|------------|---------|
| Technical docs | 500-1000 | 50-100 |
| Prose/articles | 300-500 | 50 |
| Code | By function | Minimal |
| Q&A pairs | Per pair | None |

### Parent-Child Chunking

Embed small chunks, retrieve parent context:
```python
# Small chunks for precise matching
small_chunks = splitter.split_text(doc, chunk_size=200)

# Store reference to parent
for i, chunk in enumerate(small_chunks):
    index.upsert({
        "id": f"chunk_{i}",
        "vector": embed(chunk),
        "metadata": {
            "text": chunk,
            "parent_id": doc_id,
            "parent_text": doc[:2000]  # Store larger context
        }
    })

# At query time, return parent_text for more context
```

---

## 🎬 Video Script

**[INTRO - Too small/too large example]**

Chunking is where most RAG systems fail. Let me show you how to get it right.

**[CUT TO: Methods]**

Fixed size is simple but breaks mid-sentence. Sentence-based respects boundaries. Recursive tries paragraph, then sentence, then word breaks.

**[CUT TO: Size recommendations]**

500-1000 tokens for technical docs. Smaller for Q&A. Code chunks by function, not character count.

**[CUT TO: Parent-child]**

Advanced technique: small chunks for precise matching, but retrieve the parent document for full context.

**[END - Runtime: 5:00]**

---

## ✅ Knowledge Check

### Question 1
Why is overlap important in chunking?

A) Saves storage  
B) Prevents losing context at chunk boundaries  
C) Speeds up search  
D) Reduces embedding costs  

**Correct Answer**: B
