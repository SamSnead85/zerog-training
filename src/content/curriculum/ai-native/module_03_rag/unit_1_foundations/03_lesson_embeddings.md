# Lesson 1.3: Embeddings Deep Dive

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 1 - RAG Foundations

---

## 📚 Reading Material

### What Are Embeddings?

Embeddings convert text into **dense vector representations** that capture semantic meaning. Similar texts have similar vectors.

```python
"king" → [0.21, -0.45, 0.89, ...]  # 1536 dimensions
"queen" → [0.19, -0.42, 0.87, ...]  # Similar!
"banana" → [-0.56, 0.12, 0.03, ...] # Very different
```

### How Embeddings Capture Meaning

Embedding models learn from billions of text examples:
- "cat" and "dog" appear in similar contexts → similar vectors
- "JavaScript" and "Python" appear in similar contexts → similar vectors
- Semantic relationships become geometric relationships

**Famous example**:
```
vector("king") - vector("man") + vector("woman") ≈ vector("queen")
```

### Embedding Model Comparison

| Model | Dimensions | Quality | Speed | Cost |
|-------|------------|---------|-------|------|
| text-embedding-3-small | 1536 | Good | Fast | $0.02/1M |
| text-embedding-3-large | 3072 | Best | Medium | $0.13/1M |
| all-MiniLM-L6-v2 | 384 | Good | Very Fast | Free |
| bge-large-en | 1024 | Excellent | Medium | Free |

### Using OpenAI Embeddings

```python
from openai import OpenAI
client = OpenAI()

def embed(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Single text
vector = embed("The quick brown fox")
print(f"Dimensions: {len(vector)}")  # 1536

# Batch embedding (more efficient)
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=["Text 1", "Text 2", "Text 3"]
)
vectors = [d.embedding for d in response.data]
```

### Using Open-Source Embeddings

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Single embedding
vector = model.encode("The quick brown fox")

# Batch embedding
vectors = model.encode([
    "The quick brown fox",
    "A fast brown fox",
    "The weather is nice"
])
```

### Embedding Quality Considerations

**Text length**: Most models optimized for ~512 tokens
**Domain**: General models vs. specialized (code, medical)
**Multilingual**: Some models support 100+ languages
**Asymmetric**: Query vs. document embeddings differ

### Dimensionality and Storage

```
1 embedding = 1536 floats × 4 bytes = 6.1 KB
1 million embeddings = 6.1 GB
10 million embeddings = 61 GB
```

**Dimension reduction**:
```python
# OpenAI supports native dimension reduction
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="text",
    dimensions=512  # Reduced from 1536
)
```

---

## 🎬 Video Script

**[INTRO - Vector visualization]**

Embeddings turn text into numbers that capture meaning. Let me show you how they work and why they're the foundation of RAG.

**[CUT TO: Semantic similarity]**

"Cat" and "dog" appear in similar contexts, so their vectors are close. "Cat" and "JavaScript" never appear together, so they're far apart. Semantic similarity becomes vector distance.

**[CUT TO: Model comparison table]**

OpenAI's text-embedding-3-small is the most practical. 1536 dimensions, good quality, low cost. For free options, all-MiniLM-L6-v2 is fast and decent. BGE-large offers excellent quality.

**[CUT TO: Code examples]**

OpenAI embedding is one API call. Send text, get vector. Batch for efficiency—up to 2048 texts per call.

**[CUT TO: Storage math]**

Each embedding is about 6KB. A million documents is 6GB of vectors. Consider dimension reduction for large scale—OpenAI supports native reduction with minimal quality loss.

**[END - Runtime: 4:45]**

---

## 🔬 Interactive Lab: Embedding Exploration

### Part 1: Semantic Similarity (20 minutes)

```python
from openai import OpenAI
import numpy as np

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return np.array(response.data[0].embedding)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Test semantic similarity
pairs = [
    ("cat", "dog"),
    ("cat", "feline"),
    ("cat", "automobile"),
    ("happy", "joyful"),
    ("happy", "sad"),
    ("python code", "javascript programming"),
    ("machine learning", "deep neural networks"),
]

print("Semantic Similarities:")
print("-" * 50)
for w1, w2 in pairs:
    e1, e2 = get_embedding(w1), get_embedding(w2)
    sim = cosine_similarity(e1, e2)
    print(f"{w1:25} ~ {w2:25} = {sim:.4f}")
```

### Part 2: Query-Document Matching (20 minutes)

```python
# Documents about different topics
documents = [
    "Machine learning is a subset of artificial intelligence focused on algorithms that learn from data.",
    "The French Revolution began in 1789 and transformed French society from a monarchy to a republic.",
    "Python is a popular programming language known for its readable syntax and extensive libraries.",
    "Climate change refers to long-term shifts in temperatures and weather patterns.",
    "The mitochondria is the powerhouse of the cell, producing ATP through cellular respiration.",
]

# Embed all documents
doc_embeddings = [get_embedding(doc) for doc in documents]

def find_relevant_docs(query, top_k=3):
    query_embedding = get_embedding(query)
    
    scores = []
    for i, doc_emb in enumerate(doc_embeddings):
        score = cosine_similarity(query_embedding, doc_emb)
        scores.append((i, score))
    
    scores.sort(key=lambda x: -x[1])
    return scores[:top_k]

# Test queries
queries = [
    "How do neural networks work?",
    "What happened in France in the 18th century?",
    "Which programming language should I learn?",
]

for query in queries:
    print(f"\nQuery: {query}")
    results = find_relevant_docs(query)
    for idx, score in results:
        print(f"  [{score:.3f}] {documents[idx][:60]}...")
```

### Part 3: Dimension Reduction (15 minutes)

```python
# Compare full vs reduced dimensions
def compare_dimensions(texts, full_dim=1536, reduced_dim=256):
    """Compare quality at different dimensions"""
    
    # Full dimension embeddings
    full_response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    full_embeddings = [np.array(d.embedding) for d in full_response.data]
    
    # Reduced dimension embeddings
    reduced_response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts,
        dimensions=reduced_dim
    )
    reduced_embeddings = [np.array(d.embedding) for d in reduced_response.data]
    
    # Compare similarities
    print(f"\nFull ({full_dim}d) vs Reduced ({reduced_dim}d) similarities:")
    for i in range(len(texts)):
        for j in range(i+1, len(texts)):
            full_sim = cosine_similarity(full_embeddings[i], full_embeddings[j])
            reduced_sim = cosine_similarity(reduced_embeddings[i], reduced_embeddings[j])
            print(f"  {texts[i][:20]:20} ~ {texts[j][:20]:20}")
            print(f"    Full: {full_sim:.4f}, Reduced: {reduced_sim:.4f}")

texts = [
    "The cat sat on the mat",
    "A feline rested on the rug",
    "Machine learning algorithms",
]
compare_dimensions(texts)
```

---

## ✅ Knowledge Check

### Question 1
What do embeddings capture?

A) Exact word matches  
B) Semantic meaning as dense vectors  
C) File sizes  
D) Document formatting  

**Correct Answer**: B

**Explanation**: Embeddings represent semantic meaning. Similar texts have similar vectors, enabling semantic (not just keyword) search.

---

### Question 2
What is a practical dimension count for embeddings?

A) 10  
B) 100  
C) 1536 (or 256-3072 range)  
D) 1 million  

**Correct Answer**: C

**Explanation**: Most embedding models use 256-3072 dimensions. OpenAI's text-embedding-3-small uses 1536 by default.

---

*You've completed Lesson 1.3! You understand how embeddings work.*
