# Lesson 3.2: Optimization Techniques

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Cost Optimization

---

## 📚 Reading Material

### Model Selection

| Tier | Model | Use When |
|------|-------|----------|
| Tier 1 | gpt-4o-mini | Simple tasks |
| Tier 2 | gpt-4o | Complex reasoning |
| Tier 3 | o1 | Multi-step logic |

```python
def route_to_model(query, complexity):
    if complexity < 0.3:
        return "gpt-4o-mini"
    elif complexity < 0.7:
        return "gpt-4o"
    else:
        return "o1-preview"
```

### Token Optimization

```python
def optimize_prompt(prompt, max_tokens=2000):
    # Trim context if too long
    if count_tokens(prompt) > max_tokens:
        prompt = summarize_and_truncate(prompt, max_tokens)
    
    # Remove redundancy
    prompt = remove_duplicate_content(prompt)
    
    return prompt
```

### Batch Processing

```python
async def batch_embed(texts, batch_size=100):
    # Batch embedding calls
    results = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        embeddings = await embed_batch(batch)  # One API call
        results.extend(embeddings)
    return results
```

### Cost Optimization Checklist

- [ ] Use appropriate model tier
- [ ] Cache aggressively
- [ ] Batch when possible
- [ ] Truncate context intelligently
- [ ] Monitor and alert on cost spikes

---

## 🎬 Video Script

**[INTRO - Optimization strategies]**

Cut costs without cutting quality. Model routing, caching, batching.

**[CUT TO: Model routing]**

Simple tasks: cheap model. Complex tasks: powerful model. Route by complexity.

**[CUT TO: Batching]**

Batch embedding calls. One API call for 100 texts instead of 100 calls.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
How can you reduce embedding costs?

A) Use larger texts  
B) Batch multiple texts in single API calls  
C) Not possible  
D) Use more calls  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You understand cost optimization.*
