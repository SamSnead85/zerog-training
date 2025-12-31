# Lesson 4.1: Query Transformation

> **Duration**: 50 minutes | **Type**: Advanced
> **Unit**: 4 - Advanced Retrieval

---

## 📚 Reading Material

### Why Transform Queries?

User queries are often:
- Ambiguous ("How does it work?")
- Under-specified ("pricing info")
- Multi-faceted ("compare options and costs")

### Query Expansion

Generate multiple search queries:
```python
def expand_query(query):
    prompt = f"""Generate 3 search queries to find information for:
"{query}"

Return as JSON array."""
    
    result = llm.generate(prompt)
    queries = json.loads(result)
    return queries

# "best laptop" → [
#   "top rated laptops 2024",
#   "laptop buying guide",
#   "laptop comparison reviews"
# ]
```

### Hypothetical Document Embeddings (HyDE)

Generate what a good answer WOULD look like, embed that:
```python
def hyde_query(query):
    # Generate hypothetical answer
    prompt = f"""Write a passage that would answer: {query}"""
    hypothetical = llm.generate(prompt)
    
    # Embed the hypothetical answer
    # This often matches real docs better than the question
    return embed(hypothetical)
```

### Step-Back Prompting

For specific questions, get broader context first:
```python
def step_back(query):
    prompt = f"""Given: "{query}"
What's the broader topic/concept this relates to?"""
    
    broader = llm.generate(prompt)
    
    # Search for both specific and broader
    specific_results = search(query)
    broad_results = search(broader)
    
    return merge(specific_results, broad_results)
```

---

## 🎬 Video Script

**[INTRO - Bad query example]**

User queries are often poor search terms. Let me show you how to transform them.

**[CUT TO: Query expansion]**

Generate multiple queries from one. "Best laptop" becomes three specific searches. Merge results for coverage.

**[CUT TO: HyDE]**

Hypothetical Document Embeddings: generate what a good answer looks like, embed that. Often matches real docs better than the question.

**[CUT TO: Step-back]**

For specific questions, first find the broader context, then search for both.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does HyDE generate?

A) Multiple queries  
B) A hypothetical answer to embed  
C) Better chunks  
D) Metadata  

**Correct Answer**: B
