# Lesson 2.1: Dataset Design

> **Duration**: 55 minutes | **Type**: Strategic
> **Unit**: 2 - Data Preparation

---

## 📚 Reading Material

### Dataset Size Guidelines

| Task Complexity | Minimum | Recommended |
|-----------------|---------|-------------|
| Simple format | 50 | 100-200 |
| Style transfer | 100 | 300-500 |
| Domain expertise | 200 | 500-1000 |
| Complex reasoning | 500 | 1000+ |

### Diversity Matters

Cover the distribution of real inputs:
```python
# Bad: All similar examples
examples = [
    "Summarize this news article...",
    "Summarize this news article...",
    "Summarize this news article...",
]

# Good: Diverse inputs
examples = [
    "Summarize this news article (500 words)...",
    "Summarize this legal document in 3 sentences...",
    "Summarize this technical paper for a non-expert...",
]
```

### Train/Test Split

```python
from sklearn.model_selection import train_test_split

train, test = train_test_split(data, test_size=0.2, random_state=42)

# Save test set for evaluation
# Never train on test data
```

### Edge Cases

Include examples of:
- Unusual inputs
- Boundary conditions
- Error scenarios
- Refusal cases (when model should decline)

---

## 🎬 Video Script

**[INTRO - Dataset visualization]**

Dataset design is where fine-tuning succeeds or fails. Let me show you how to design effectively.

**[CUT TO: Size guidelines]**

Start with 100-200 for simple tasks, 500+ for complex ones. More data = better generalization, up to a point.

**[CUT TO: Diversity]**

Diversity is critical. Cover your real distribution. Vary lengths, domains, formats. The model learns what you show it.

**[CUT TO: Edge cases]**

Include edge cases explicitly. If the model should refuse certain requests, show examples of refusals.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Why is dataset diversity important?

A) Larger files  
B) Model learns to handle the real distribution of inputs  
C) Faster training  
D) Lower cost  

**Correct Answer**: B
