# Lesson 4.3: Contextual Compression

> **Duration**: 50 minutes | **Type**: Advanced
> **Unit**: 4 - Advanced Retrieval

---

## 📚 Reading Material

### The Context Overload Problem

Retrieved chunks may contain:
- Irrelevant sentences
- Redundant information
- Too much for context window

### Compression Strategies

**Extractive** (select relevant parts):
```python
def extract_relevant(query, document):
    prompt = f"""Extract only the sentences relevant to: {query}

Document: {document}

Return only relevant sentences."""
    return llm.generate(prompt)
```

**Abstractive** (summarize):
```python
def compress_context(query, documents):
    combined = "\n\n".join(documents)
    prompt = f"""Summarize only information relevant to: {query}

Documents:
{combined}

Summary:"""
    return llm.generate(prompt)
```

### Document Compressor Chain

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_retriever=base_retriever,
    base_compressor=compressor
)

# Returns compressed, relevant content only
docs = compression_retriever.get_relevant_documents(query)
```

### Deduplication

Remove redundant retrieved chunks:
```python
def deduplicate(chunks, threshold=0.9):
    unique = []
    for chunk in chunks:
        is_dup = False
        for existing in unique:
            if similarity(chunk, existing) > threshold:
                is_dup = True
                break
        if not is_dup:
            unique.append(chunk)
    return unique
```

---

## 🎬 Video Script

**[INTRO - Long context problem]**

Retrieved chunks often contain irrelevant content. Compression fixes this.

**[CUT TO: Extract vs summarize]**

Extractive: select relevant sentences. Abstractive: summarize into a shorter form. Choose based on whether you need exact quotes or concise context.

**[CUT TO: Deduplication]**

Remove redundant chunks before generation. Similar chunks waste context window and confuse the model.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does contextual compression do?

A) Stores vectors more efficiently  
B) Removes irrelevant content from retrieved chunks  
C) Compresses the model  
D) Reduces API costs  

**Correct Answer**: B

---

*Congratulations on completing Unit 4! You master advanced retrieval.*
