# Lesson 1.2: Fine-Tuning vs Alternatives

> **Duration**: 50 minutes | **Type**: Strategic
> **Unit**: 1 - Fine-Tuning Fundamentals

---

## 📚 Reading Material

### The Model Customization Spectrum

```
[Prompting] → [Few-Shot] → [RAG] → [Fine-Tuning] → [Pre-Training]
   Easy                                              Hard
   Cheap                                             Expensive
   Flexible                                          Fixed
```

### Detailed Comparison

| Approach | Changes | Data Needed | Cost | Best For |
|----------|---------|-------------|------|----------|
| **Prompting** | None | 0 | Low | Quick tasks |
| **Few-Shot** | None | 3-10 | Low | Pattern matching |
| **RAG** | None | Corpus | Medium | Knowledge access |
| **Fine-Tuning** | Weights | 100-10K | High | Behavior change |
| **Pre-Training** | Everything | 1B+ | Very High | New capabilities |

### Prompting Limits

When prompting isn't enough:
```python
# Prompt gets too long
system_prompt = """
You are a legal document analyzer...
[500 lines of formatting rules]
[200 lines of examples]
[100 lines of edge cases]
"""  # 5000+ tokens, slow, expensive
```

Fine-tuning bakes this knowledge into weights.

### RAG Limits

When RAG isn't enough:
```python
# RAG retrieves facts, but model still formats wrong
query = "Summarize this legal doc"
context = retrieve(query)  # Correct content
response = llm(context + query)  # Wrong format/style
```

Fine-tuning teaches the formatting behavior.

### Combining Approaches

Often the best solution combines approaches:
```python
# Fine-tuned model + RAG
fine_tuned_model = "ft:gpt-4o-mini:custom"  # Knows format/style
context = rag_retrieve(query)  # Has current facts
response = llm(fine_tuned_model, context + query)
```

---

## 🎬 Video Script

**[INTRO - Spectrum visualization]**

There's a spectrum of customization. Prompting, few-shot, RAG, fine-tuning, pre-training. Each has its place.

**[CUT TO: Comparison table]**

Prompting is free, flexible. RAG adds knowledge. Fine-tuning changes behavior. Pre-training creates new capabilities.

**[CUT TO: Limits]**

When prompts get too long and expensive, fine-tune. When RAG gives facts but wrong format, fine-tune. Often you combine approaches.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should you combine fine-tuning with RAG?

A) Never  
B) When you need custom style/format AND current knowledge  
C) To save money  
D) Only for chatbots  

**Correct Answer**: B

---

*You've completed Lesson 1.2! You understand the alternatives.*
