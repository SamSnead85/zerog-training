# Video Script: Module 5 - RAG Architecture Deep Dive

## Video Overview
- **Title**: Building Production RAG Systems
- **Duration**: 16 minutes
- **Target Audience**: Developers building knowledge-powered AI apps
- **Learning Objectives**: RAG architecture, chunking, retrieval, hybrid search

---

## Scene 1: The RAG Revolution (0:00 - 1:00)

### Visuals
- Before/after comparison of LLM responses
- Knowledge base visualization

### Narration
"What if your AI could answer questions about YOUR data—your docs, your products, your company? That's RAG: Retrieval-Augmented Generation. It's how ChatGPT for Docs, Notion AI, and countless enterprise tools work. And by the end of this video, you'll know how to build one."

### Problem Statement
"LLMs are trained on public data. They don't know your company's policies, your product docs, or yesterday's meeting notes. RAG fixes that."

---

## Scene 2: How RAG Works (1:00 - 3:00)

### Visuals
- Animated pipeline diagram
- Data flow visualization

### Narration
"RAG has four stages. Let me walk you through each."

### Pipeline Diagram (Animated Step by Step)

```
     User Query: "What's our refund policy?"
              │
              ▼
     ┌────────────────┐
     │  1. EMBED      │  Convert query to vector
     └───────┬────────┘
             │
             ▼
     ┌────────────────┐
     │  2. RETRIEVE   │  Find similar docs
     └───────┬────────┘
             │
     ┌───────┴───────┐
     │ Policy.pdf    │  Relevant chunks
     │ FAQ.md        │
     └───────┬───────┘
             │
             ▼
     ┌────────────────┐
     │  3. AUGMENT    │  Add docs to prompt
     └───────┬────────┘
             │
             ▼
     ┌────────────────┐
     │  4. GENERATE   │  LLM creates answer
     └───────┬────────┘
             │
             ▼
     "According to our policy, refunds..."
```

### Stage Explanations
1. **Embed**: Turn the question into a vector (numbers)
2. **Retrieve**: Find document chunks with similar vectors
3. **Augment**: Add those chunks to the LLM's context
4. **Generate**: LLM answers using the retrieved information

---

## Scene 3: The Indexing Phase (3:00 - 5:30)

### Visuals
- Document processing pipeline
- Chunking visualization with highlighted splits

### Narration
"Before you can retrieve, you must index. This is where most RAG systems succeed or fail."

### Document Processing
```python
# Step 1: Load documents
from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("company_handbook.pdf")
pages = loader.load()
print(f"Loaded {len(pages)} pages")
```

### Chunking Strategies (Animated Comparison)

**Fixed Size (Simple)**
```python
splitter = CharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100
)
# Problem: Might split mid-sentence
```

**Recursive (Better)**
```python
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " "]
)
# Splits at natural boundaries
```

**Semantic (Best)**
```python
splitter = SemanticChunker(
    embeddings=OpenAIEmbeddings(),
    breakpoint_threshold=90
)
# Splits based on meaning changes
```

### Chunk Size Impact (Visual Graph)
- Too small (100 chars): Lacks context
- Too large (5000 chars): Retrieves irrelevant content
- Sweet spot (800-1200 chars): Balanced

---

## Scene 4: Retrieval Strategies (5:30 - 9:00)

### Visuals
- Vector space visualization
- Comparison of retrieval methods
- Results quality comparison

### Narration
"Retrieval is where RAG lives or dies. Let me show you techniques that dramatically improve results."

### Basic Similarity Search
```python
# Simple but limited
docs = vectorstore.similarity_search(query, k=5)
```

### Problem Animation
"User asks: 'Can I work from home?'"
"Document says: 'Remote work policy allows telecommuting...'"
"Different words, same meaning—basic search might miss it!"

### Solution 1: Query Rewriting
```python
def rewrite_query(query: str) -> list[str]:
    """Generate alternative phrasings."""
    prompt = f"""
    Generate 3 alternative ways to ask this question:
    "{query}"
    """
    alternatives = llm.invoke(prompt).split("\n")
    return [query] + alternatives

# Now search with all versions
all_queries = rewrite_query("Can I work from home?")
# ["Can I work from home?",
#  "What is the remote work policy?",
#  "Is telecommuting allowed?"]
```

### Solution 2: Hybrid Search
```python
# Combine semantic + keyword search
def hybrid_search(query: str, alpha: float = 0.5):
    # Semantic (meaning)
    vector_results = vectorstore.search(query)
    
    # Keyword (exact terms)
    keyword_results = bm25_search(query)
    
    # Blend results
    combined = alpha * vector_scores + (1-alpha) * keyword_scores
    return sorted(combined)
```

### Solution 3: Re-Ranking
```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# Get more candidates, then re-rank
candidates = vectorstore.search(query, k=20)

# Re-rank with more accurate model
pairs = [(query, doc.content) for doc in candidates]
scores = reranker.predict(pairs)

# Return top 5 after re-ranking
top_docs = sorted(zip(candidates, scores), key=lambda x: x[1])[:5]
```

### When to Use What (Decision Tree Animation)
- Simple queries → Basic similarity
- Different phrasing → Query rewriting
- Technical terms → Hybrid search
- Quality critical → Add re-ranking

---

## Scene 5: Generation with Context (9:00 - 11:00)

### Visuals
- Prompt template with context injection
- Citation highlighting

### Narration
"Now we combine everything. The key is giving the LLM clear instructions about how to use the retrieved context."

### The RAG Prompt Template
```python
RAG_PROMPT = """
Answer the question based ONLY on the following context.
If you cannot answer from the context, say "I don't have that information."

Context:
{context}

Question: {question}

Instructions:
1. Use only facts from the context above
2. Cite your sources using [Source: filename]
3. If unsure, say so
4. Keep the answer concise

Answer:
"""
```

### Implementation
```python
def rag_query(question: str) -> dict:
    # 1. Retrieve relevant docs
    docs = retriever.get_relevant_documents(question)
    
    # 2. Format context with sources
    context = "\n\n".join([
        f"[Source: {doc.metadata['source']}]\n{doc.page_content}"
        for doc in docs
    ])
    
    # 3. Generate answer
    prompt = RAG_PROMPT.format(
        context=context,
        question=question
    )
    
    answer = llm.invoke(prompt)
    
    return {
        "answer": answer,
        "sources": [doc.metadata['source'] for doc in docs]
    }
```

### Output Example
```
Answer: According to our policy, you may work from home up to 3 days 
per week with manager approval [Source: employee_handbook.pdf]. 
Remote work requests should be submitted at least one week in advance 
[Source: hr_faq.md].
```

---

## Scene 6: Common Pitfalls (11:00 - 13:00)

### Visuals
- Red warning icons
- Before/after examples

### Narration
"Let me save you from the mistakes I've made and seen."

### Pitfall 1: Chunks Too Large
```
Bad: 5000 character chunks
     "The company was founded... [pages of history] ...
      The refund policy is..."
     
Good: 1000 character chunks with overlap
      Just the relevant section
```

### Pitfall 2: No Metadata
```python
# Bad: No source tracking
vectorstore.add_texts(chunks)

# Good: Metadata for filtering and citations
vectorstore.add_texts(
    chunks,
    metadatas=[{
        "source": filename,
        "date": modified_date,
        "department": dept,
        "type": doc_type
    }]
)
```

### Pitfall 3: Not Testing Retrieval
```python
# Always test retrieval separately!
def test_retrieval():
    test_cases = [
        {"query": "refund policy", "should_find": "returns.pdf"},
        {"query": "vacation time", "should_find": "benefits.pdf"},
    ]
    
    for test in test_cases:
        docs = retriever.invoke(test["query"])
        sources = [d.metadata["source"] for d in docs]
        assert test["should_find"] in sources
```

### Pitfall 4: Ignoring "I Don't Know"
"If the answer isn't in the context, the LLM should say so. Otherwise, it will hallucinate."

---

## Scene 7: Production Considerations (13:00 - 15:00)

### Visuals
- Architecture diagram with scaling
- Monitoring dashboard

### Narration
"Building a demo is easy. Production is harder. Here's what you need."

### Production Checklist
1. **Caching**: Cache embeddings and frequent queries
2. **Monitoring**: Track retrieval quality, latency, costs
3. **Updates**: Re-index when documents change
4. **Fallbacks**: What if retrieval fails?
5. **Security**: Input validation, access control

### Monitoring Dashboard Animation
```
┌─────────────────────────────────────────┐
│          RAG Dashboard                   │
├─────────────────────────────────────────┤
│ Queries/min: 245    Avg Latency: 1.2s   │
│ Cache Hit Rate: 58%  Cost/query: $0.003 │
├─────────────────────────────────────────┤
│ Retrieval Quality (last 24h)            │
│ ████████████████████ 89% relevant       │
├─────────────────────────────────────────┤
│ Top Missed Queries:                     │
│ - "new product X details"               │
│ - "2024 pricing updates"                │
└─────────────────────────────────────────┘
```

---

## Scene 8: Conclusion (15:00 - 16:00)

### Visuals
- Complete RAG stack summary
- Next steps

### Narration
"RAG is how you make AI work with YOUR data. Remember: chunk wisely, retrieve creatively, and always ground your LLM in context. Build this right, and you've got an AI that actually knows your business."

### Key Takeaways
1. Chunking strategy matters more than model choice
2. Hybrid retrieval beats pure semantic search
3. Re-ranking improves precision significantly
4. Always include sources for trust
5. Test retrieval separately from generation

### Final Screen
- "Build AI That Knows Your Data"
- "Next: Advanced Retrieval Strategies"
- ScaledNative branding

---

## Production Notes

### Essential Animations
- RAG pipeline with data flowing through
- Vector space visualization (2D projection)
- Chunk size comparison slider
- Retrieval quality comparison

### Live Demo Ideas
- Index a sample document
- Query and show retrieved chunks
- Compare basic vs hybrid search results

### Props/Diagrams
- Before/after quality scores
- Cost/latency tradeoff charts
