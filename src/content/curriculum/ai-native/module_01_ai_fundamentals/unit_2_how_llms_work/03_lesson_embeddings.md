# Lesson 2.3: Embeddings and Vector Representations

> **Duration**: 40 minutes | **Type**: Technical Deep Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### The Core Problem: Computers Don't Understand Words

Computers work with numbers. Neural networks perform mathematical operations—addition, multiplication, matrix operations. But language is symbolic: words, sentences, paragraphs.

**Embeddings** are how we bridge this gap. They transform discrete symbols (words, tokens) into continuous vectors (lists of numbers) that neural networks can process.

### From One-Hot to Dense Embeddings

**One-Hot Encoding (The Naive Approach)**

The simplest way to represent words as vectors: create a vector as long as your vocabulary, with a 1 in the word's position and 0s everywhere else.

```python
vocabulary = ["cat", "dog", "bird", "fish", "mouse"]

# One-hot vectors
cat  = [1, 0, 0, 0, 0]
dog  = [0, 1, 0, 0, 0]
bird = [0, 0, 1, 0, 0]
```

**Problems**:
1. **Dimensionality**: 50,000 word vocabulary = 50,000-dimensional vectors
2. **No meaning**: "cat" and "dog" are as different as "cat" and "quantum"
3. **Sparsity**: Almost all values are 0

**Dense Embeddings (The Modern Approach)**

Learn a compact, dense representation where similar words have similar vectors:

```python
# 3-dimensional embeddings (real embeddings use 768-4096 dimensions)
cat   = [0.8, 0.2, 0.9]   # Furry pet
dog   = [0.7, 0.3, 0.85]  # Similar! Also a furry pet
fish  = [0.1, 0.9, 0.2]   # Different - aquatic
king  = [0.9, 0.1, 0.7]   # Royalty
queen = [0.85, 0.15, 0.75]  # Similar to king
```

### The Magic of Semantic Space

The remarkable property of learned embeddings: **semantic relationships become geometric relationships**.

**Word Arithmetic**:
```
king - man + woman ≈ queen
paris - france + italy ≈ rome
```

This isn't programmed—it emerges from training. The model learns that the "gender direction" and "capital city direction" are consistent across examples.

**Similarity as Distance**:
```
similarity(cat, dog) > similarity(cat, car)
```

We typically measure similarity using **cosine similarity**:

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Values range from -1 (opposite) to 1 (identical)
```

### How Embeddings Are Learned

In modern LLMs, embeddings are learned during pre-training:

1. **Initialize randomly**: Each token gets a random vector
2. **Train to predict**: Model learns to predict next tokens
3. **Backpropagate**: Gradients flow back to embedding vectors
4. **Similar usage → similar vectors**: Words used in similar contexts develop similar embeddings

This is the **distributional hypothesis**: "You shall know a word by the company it keeps."

### From Words to Everything

Modern models don't just embed words—they can embed anything:

**Token Embeddings**: The fundamental unit in LLMs
```
"Hello" → [0.2, -0.5, 0.8, ...]  # 1536 dimensions for text-embedding-ada-002
```

**Sentence/Document Embeddings**: Aggregate token embeddings
```
"The quick brown fox" → [0.1, 0.3, -0.2, ...]  # Same dimensionality
```

**Image Embeddings**: From vision models
```
[image of cat] → [0.7, 0.2, 0.9, ...]
```

**Multimodal Embeddings**: Same space for text and images
```
"a photo of a cat" ≈ [image of cat]  # CLIP model
```

### Embeddings in Practice: Vector Databases

Embeddings enable **semantic search**—finding content by meaning, not keywords:

```python
# Traditional keyword search
query = "automobile"
results = search(documents, "automobile")  # Only finds "automobile"

# Semantic search with embeddings
query_embedding = embed("automobile")
results = nearest_neighbors(query_embedding, document_embeddings)
# Finds "car", "vehicle", "sedan", "SUV", etc.
```

**Vector Databases** (Pinecone, Weaviate, Chroma, Qdrant) specialize in storing and searching embeddings efficiently.

This is the foundation of **RAG (Retrieval-Augmented Generation)**—a technique we'll cover in depth in Module 4.

### Embedding Models as Products

Major embedding APIs:

| Model | Dimensions | Max Tokens | Use Case |
|-------|------------|------------|----------|
| OpenAI text-embedding-3-large | 3072 | 8191 | General purpose |
| OpenAI text-embedding-3-small | 1536 | 8191 | Cost-effective |
| Cohere embed-v3 | 1024 | 512 | Multilingual |
| Voyage-2 | 1024 | 4000 | Code, legal, medical |
| BGE-large | 1024 | 512 | Open source |

Choosing the right model depends on your domain, language needs, and performance/cost tradeoffs.

---

## 🎬 Video Script

**[INTRO - Computer looking confused at text]**

Here's an obvious problem: computers work with numbers, but language is made of words. How do we bridge this gap?

**[CUT TO: Animation of word transforming into vector]**

The answer is embeddings—a way to transform words into vectors of numbers. Not just any numbers, but numbers that capture meaning.

**[CUT TO: One-hot vector visualization]**

The naive approach is one-hot encoding. Create a vector as long as your vocabulary. Put a 1 where your word is, zeros everywhere else.

But this fails spectacularly. With 50,000 words, you need 50,000-dimensional vectors. And "cat" is mathematically as different from "dog" as it is from "quantum." There's no notion of similarity.

**[CUT TO: Dense embedding visualization with similar words clustered]**

Modern embeddings are learned. Instead of sparse one-hot vectors, we have dense vectors—maybe 768 or 1536 dimensions—where every dimension has a meaningful value. And crucially, similar words get similar vectors.

**[CUT TO: 3D space with word vectors plotted]**

When you plot these embeddings in high-dimensional space, something magical happens. Semantic relationships become geometric relationships.

**[CUT TO: Word arithmetic animation]**

King minus man plus woman equals... queen. Paris minus France plus Italy equals... Rome. The model has learned a "gender direction" and a "capital city direction" without anyone telling it these concepts exist.

**[CUT TO: Cosine similarity formula]**

We measure similarity between embeddings using cosine similarity. It ranges from negative one—opposite meanings—to positive one—identical meanings. Cat and dog might be 0.85. Cat and car might be 0.3.

**[CUT TO: Training loop diagram]**

How are these learned? During pre-training. Embeddings start random. As the model learns to predict text, gradients flow back to the embedding vectors. Words used in similar contexts develop similar embeddings. "The cat sat on the mat" and "the dog sat on the mat"—cat and dog appear in identical contexts, so they become similar.

**[CUT TO: Various content types converting to vectors]**

This isn't just for words. We can embed sentences, documents, images, even code. Models like CLIP put text and images in the same embedding space—the text "a cat" and a photo of a cat have similar vectors.

**[CUT TO: Semantic search diagram]**

This enables semantic search. Instead of matching keywords, we match meaning. Search for "automobile" and find results about "car," "vehicle," "sedan"—because their embeddings are similar.

**[CUT TO: Speaker on camera]**

This is the foundation of RAG—Retrieval Augmented Generation—which we'll cover in depth in Module 4. Understanding embeddings is essential for building anything involving search, retrieval, or similarity.

**[END - Runtime: 6:18]**

---

## 🔬 Interactive Lab: Working with Embeddings

### Objective
Generate, visualize, and search using real embeddings.

### Part 1: Generate Embeddings (15 minutes)

```python
# Option 1: Using OpenAI (requires API key)
from openai import OpenAI
client = OpenAI()

def get_embedding(text, model="text-embedding-3-small"):
    response = client.embeddings.create(input=text, model=model)
    return response.data[0].embedding

# Test
embedding = get_embedding("Hello, world!")
print(f"Embedding dimensions: {len(embedding)}")
print(f"First 10 values: {embedding[:10]}")
```

```python
# Option 2: Using sentence-transformers (free, local)
# pip install sentence-transformers
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text):
    return model.encode(text)

# Test
embedding = get_embedding("Hello, world!")
print(f"Embedding dimensions: {len(embedding)}")
print(f"First 10 values: {embedding[:10]}")
```

### Part 2: Semantic Similarity (20 minutes)

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Test word relationships
word_pairs = [
    ("cat", "dog"),
    ("cat", "kitten"),
    ("cat", "car"),
    ("king", "queen"),
    ("king", "throne"),
    ("happy", "joyful"),
    ("happy", "sad"),
    ("python", "programming"),
    ("python", "snake"),
]

print("Semantic Similarity Scores:")
print("-" * 50)
for word1, word2 in word_pairs:
    emb1 = get_embedding(word1)
    emb2 = get_embedding(word2)
    similarity = cosine_similarity(emb1, emb2)
    print(f"{word1:15} <-> {word2:15}: {similarity:.3f}")
```

**Expected Pattern**:
- cat/dog: ~0.5-0.7 (related but different)
- cat/kitten: ~0.7-0.9 (very related)
- cat/car: ~0.2-0.4 (unrelated)
- happy/joyful: ~0.8-0.9 (synonyms)
- happy/sad: ~0.3-0.5 (antonyms often have some similarity due to shared context)

### Part 3: Semantic Search (20 minutes)

Build a simple semantic search engine:

```python
# Sample document corpus
documents = [
    "The cat sat on the warm windowsill, watching birds outside.",
    "Python is a popular programming language for data science.",
    "Machine learning models can recognize patterns in data.",
    "The dog ran happily through the park, chasing squirrels.",
    "Neural networks are inspired by the human brain.",
    "She adopted a kitten from the local animal shelter.",
    "JavaScript is commonly used for web development.",
    "The weather forecast predicts rain for tomorrow.",
    "Deep learning has revolutionized natural language processing.",
    "The coffee shop on Main Street has excellent espresso.",
]

# Generate embeddings for all documents
doc_embeddings = [get_embedding(doc) for doc in documents]

def semantic_search(query, top_k=3):
    """Find most similar documents to query"""
    query_embedding = get_embedding(query)
    
    similarities = []
    for i, doc_emb in enumerate(doc_embeddings):
        sim = cosine_similarity(query_embedding, doc_emb)
        similarities.append((sim, i))
    
    # Sort by similarity (descending)
    similarities.sort(reverse=True)
    
    print(f"\nQuery: '{query}'")
    print("-" * 60)
    for sim, idx in similarities[:top_k]:
        print(f"[{sim:.3f}] {documents[idx]}")

# Test searches
semantic_search("pets and animals")
semantic_search("artificial intelligence")
semantic_search("coding and software")
semantic_search("morning beverage")
```

**Challenge**: What query would you use to find both programming documents AND the AI documents? Try it!

### Submission
Submit your similarity matrix and observations about which word relationships the model captures well vs. poorly.

---

## ✅ Knowledge Check

### Question 1
Why are dense embeddings preferred over one-hot encoding?

A) Dense embeddings are faster to compute  
B) Dense embeddings capture semantic similarity; one-hot treats all words as equally different  
C) One-hot encoding requires special hardware  
D) Dense embeddings use less memory  

**Correct Answer**: B

**Explanation**: One-hot encoding treats every word as maximally different from every other word—"cat" is as different from "dog" as from "quantum." Dense embeddings learn representations where semantically similar words have similar vectors.

---

### Question 2
What does the equation "king - man + woman ≈ queen" demonstrate?

A) A bug in the embedding system  
B) That semantic relationships become geometric relationships in embedding space  
C) That embeddings are manually programmed  
D) That only royalty terms work with embeddings  

**Correct Answer**: B

**Explanation**: This famous example shows that embeddings capture semantic relationships as directions in vector space. The "gender direction" is consistent across different word pairs, enabling this arithmetic.

---

### Question 3
How are embeddings learned during LLM training?

A) Programmers manually assign values  
B) Through backpropagation during next-token prediction  
C) By looking up words in a dictionary  
D) Random initialization that never changes  

**Correct Answer**: B

**Explanation**: Embeddings start as random vectors. As the model trains to predict tokens, gradients flow back through the network, updating the embeddings. Words that appear in similar contexts develop similar embeddings.

---

### Question 4
What is cosine similarity typically used for with embeddings?

A) Computing the exact match between two vectors  
B) Measuring semantic similarity between two vectors regardless of magnitude  
C) Compressing vectors to smaller dimensions  
D) Converting embeddings back to text  

**Correct Answer**: B

**Explanation**: Cosine similarity measures the angle between two vectors, ignoring their magnitudes. This captures semantic similarity: vectors pointing in similar directions have high cosine similarity, regardless of their lengths.

---

### Question 5
What is the foundation of RAG (Retrieval-Augmented Generation)?

A) One-hot encoding  
B) Embedding similarity for semantic search  
C) Random word selection  
D) Manual keyword matching  

**Correct Answer**: B

**Explanation**: RAG uses embedding similarity to find relevant documents before generation. A query is embedded, compared to document embeddings, and the most similar documents are retrieved to provide context for the LLM.

---

*You've completed Lesson 2.3! Embeddings are one of the most important concepts in modern AI—they enable semantic understanding across all modalities.*
