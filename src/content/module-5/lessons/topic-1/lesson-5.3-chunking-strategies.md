# Lesson: Chunking Strategies for RAG

## Overview

In this lesson, you'll learn how chunking strategy dramatically impacts RAG quality. We'll explore different chunking approaches, understand the tradeoffs, and learn when to use each method.

**Duration**: 20 minutes  
**Prerequisites**: Module 5 Lesson 1 (RAG Fundamentals)

## Learning Objectives

By the end of this lesson, you will:
- Understand why chunking matters for retrieval quality
- Implement multiple chunking strategies
- Choose the right strategy for different document types
- Configure chunk size and overlap appropriately
- Handle edge cases like tables and code

---

## Why Chunking Matters

Poor chunking = Poor RAG. Here's why:

**Too Small Chunks:**
- Lose context and coherence
- "What is the return policy?" might only find "30 days" without context

**Too Large Chunks:**
- Include irrelevant information
- Exceed context windows
- Waste tokens on noise

**Wrong Boundaries:**
- Split mid-sentence or mid-thought
- Separate question from answer
- Break code blocks

---

## Chunking Strategies

### 1. Fixed-Size Chunking

Simplest approach: split by character or token count.

```python
def fixed_size_chunks(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Split text into fixed-size chunks with overlap."""
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap
    
    return chunks

# Usage
text = load_document("user_manual.txt")
chunks = fixed_size_chunks(text, chunk_size=1000, overlap=200)
```

**Pros:** Simple, predictable chunk sizes  
**Cons:** Ignores document structure, may split sentences

### 2. Sentence-Based Chunking

Respects sentence boundaries.

```python
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

def sentence_chunks(text: str, max_sentences: int = 5, overlap_sentences: int = 1) -> list[str]:
    """Split text by sentences, grouping them into chunks."""
    sentences = sent_tokenize(text)
    chunks = []
    
    for i in range(0, len(sentences), max_sentences - overlap_sentences):
        chunk_sentences = sentences[i:i + max_sentences]
        chunk = " ".join(chunk_sentences)
        chunks.append(chunk)
    
    return chunks

# Usage
chunks = sentence_chunks(document, max_sentences=5, overlap_sentences=1)
```

**Pros:** Natural boundaries  
**Cons:** Variable chunk sizes, may miss paragraph context

### 3. Semantic Chunking

Groups content by meaning using embeddings.

```python
from sentence_transformers import SentenceTransformer
import numpy as np

def semantic_chunks(text: str, similarity_threshold: float = 0.75) -> list[str]:
    """Split text where semantic meaning shifts."""
    model = SentenceTransformer('all-MiniLM-L6-v2')
    sentences = sent_tokenize(text)
    
    if len(sentences) < 2:
        return [text]
    
    # Embed all sentences
    embeddings = model.encode(sentences)
    
    # Find breakpoints where similarity drops
    chunks = []
    current_chunk = [sentences[0]]
    
    for i in range(1, len(sentences)):
        # Cosine similarity with previous sentence
        similarity = np.dot(embeddings[i], embeddings[i-1]) / (
            np.linalg.norm(embeddings[i]) * np.linalg.norm(embeddings[i-1])
        )
        
        if similarity < similarity_threshold:
            # Semantic shift detected - start new chunk
            chunks.append(" ".join(current_chunk))
            current_chunk = [sentences[i]]
        else:
            current_chunk.append(sentences[i])
    
    # Add final chunk
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    return chunks
```

**Pros:** Coherent meaning within chunks  
**Cons:** Computationally expensive, unpredictable sizes

### 4. Recursive Character Splitting

Hierarchically splits on multiple separators.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

def recursive_chunks(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Split text using recursive separators."""
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=[
            "\n\n\n",  # Multiple newlines (section breaks)
            "\n\n",    # Paragraph breaks
            "\n",      # Line breaks
            ". ",      # Sentences
            " ",       # Words
            ""         # Characters (last resort)
        ]
    )
    
    return splitter.split_text(text)
```

**Pros:** Respects document structure  
**Cons:** May still split within logical sections

### 5. Document-Aware Chunking

Uses document structure (headers, sections).

```python
import re

def markdown_chunks(text: str) -> list[dict]:
    """Split markdown by headers, preserving hierarchy."""
    
    # Split on headers
    header_pattern = r'^(#{1,6})\s+(.+)$'
    lines = text.split('\n')
    
    chunks = []
    current_chunk = {
        "headers": [],
        "content": [],
        "level": 0
    }
    
    for line in lines:
        match = re.match(header_pattern, line)
        
        if match:
            # Save previous chunk
            if current_chunk["content"]:
                chunks.append({
                    "headers": current_chunk["headers"].copy(),
                    "content": "\n".join(current_chunk["content"]).strip(),
                    "metadata": {
                        "section": " > ".join(current_chunk["headers"])
                    }
                })
            
            # Start new section
            level = len(match.group(1))
            header = match.group(2)
            
            # Update header hierarchy
            if level <= current_chunk["level"]:
                # Same or higher level - pop headers
                current_chunk["headers"] = current_chunk["headers"][:level-1]
            
            current_chunk["headers"].append(header)
            current_chunk["level"] = level
            current_chunk["content"] = []
        else:
            current_chunk["content"].append(line)
    
    # Don't forget the last chunk
    if current_chunk["content"]:
        chunks.append({
            "headers": current_chunk["headers"],
            "content": "\n".join(current_chunk["content"]).strip(),
            "metadata": {
                "section": " > ".join(current_chunk["headers"])
            }
        })
    
    return chunks
```

**Pros:** Preserves document hierarchy, rich metadata  
**Cons:** Depends on well-structured documents

---

## Handling Special Content

### Code Blocks

Don't split code mid-function:

```python
def extract_code_blocks(text: str) -> tuple[str, list[dict]]:
    """Extract code blocks and replace with placeholders."""
    
    pattern = r'```(\w*)\n(.*?)```'
    code_blocks = []
    
    def replacer(match):
        lang = match.group(1)
        code = match.group(2)
        placeholder = f"[CODE_BLOCK_{len(code_blocks)}]"
        code_blocks.append({
            "language": lang,
            "code": code,
            "placeholder": placeholder
        })
        return placeholder
    
    text_without_code = re.sub(pattern, replacer, text, flags=re.DOTALL)
    
    return text_without_code, code_blocks
```

### Tables

Keep tables together:

```python
def extract_tables(text: str) -> tuple[str, list[str]]:
    """Extract markdown tables and replace with placeholders."""
    
    # Match markdown tables
    table_pattern = r'(\|.+\|[\r\n]+)+(\|[-:| ]+\|[\r\n]+)(\|.+\|[\r\n]*)+'
    tables = []
    
    def replacer(match):
        table = match.group(0)
        placeholder = f"[TABLE_{len(tables)}]"
        tables.append(table)
        return placeholder
    
    text_without_tables = re.sub(table_pattern, replacer, text)
    
    return text_without_tables, tables
```

---

## Choosing Chunk Size

### Guidelines by Use Case

| Document Type | Chunk Size | Overlap | Strategy |
|--------------|------------|---------|----------|
| Q&A / FAQ | 200-500 | 50 | Fixed or semantic |
| Technical docs | 500-1000 | 100-200 | Recursive |
| Legal/contracts | 1000-1500 | 200-300 | Document-aware |
| Code repos | 500-1000 | 100 | Function-aware |
| Chat history | Per message | NA | No chunking |

### Measuring Success

Test chunk quality with retrieval metrics:

```python
def evaluate_chunking(chunking_fn, test_queries: list, expected_docs: list) -> dict:
    """Evaluate a chunking strategy."""
    
    # Chunk the documents
    chunks = chunking_fn(documents)
    
    # Build retriever
    retriever = build_retriever(chunks)
    
    # Measure retrieval quality
    results = {
        "avg_recall": 0,
        "avg_precision": 0,
        "chunks_retrieved": []
    }
    
    for query, expected in zip(test_queries, expected_docs):
        retrieved = retriever.retrieve(query, k=5)
        
        # Check if expected content is found
        hits = sum(1 for r in retrieved if expected in r.content)
        
        results["avg_recall"] += hits / len(expected_docs)
        results["avg_precision"] += hits / len(retrieved)
    
    results["avg_recall"] /= len(test_queries)
    results["avg_precision"] /= len(test_queries)
    
    return results
```

---

## Advanced: Contextual Chunks

Add context to chunks for better retrieval:

```python
def contextual_chunks(chunks: list[dict]) -> list[dict]:
    """Add document context to each chunk."""
    
    for i, chunk in enumerate(chunks):
        # Add surrounding context
        context_parts = []
        
        # Document title
        if "title" in chunk.get("metadata", {}):
            context_parts.append(f"Document: {chunk['metadata']['title']}")
        
        # Section hierarchy
        if "section" in chunk.get("metadata", {}):
            context_parts.append(f"Section: {chunk['metadata']['section']}")
        
        # Summary of previous chunk
        if i > 0 and len(chunks[i-1]["content"]) > 50:
            prev_summary = chunks[i-1]["content"][:100] + "..."
            context_parts.append(f"Previous context: {prev_summary}")
        
        # Add context prefix
        context = "\n".join(context_parts)
        chunk["contextualized_content"] = f"{context}\n\n---\n\n{chunk['content']}"
    
    return chunks
```

---

## Key Takeaways

1. **Chunking quality directly impacts RAG quality**
2. **No one-size-fits-all**: Match strategy to document type
3. **Preserve structure**: Headers, code blocks, tables
4. **Add overlap**: Prevent context loss at boundaries
5. **Add metadata**: Section headers improve retrieval
6. **Test and measure**: Use retrieval metrics to optimize

---

## Next Steps

- **Lab**: Build a production RAG pipeline with smart chunking
- **Next Lesson**: Embedding models and vector databases
- **Advanced**: Custom chunking for domain-specific documents
