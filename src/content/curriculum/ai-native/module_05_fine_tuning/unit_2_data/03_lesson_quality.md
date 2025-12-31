# Lesson 2.3: Data Quality and Cleaning

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Data Preparation

---

## 📚 Reading Material

### Quality Checks

```python
def validate_example(example):
    issues = []
    
    # Length check
    if len(example["output"]) < 10:
        issues.append("Output too short")
    
    # Format check
    if not valid_json(example):
        issues.append("Invalid JSON")
    
    # Consistency check
    if example["output"].startswith("I cannot"):
        if "refuse" not in example["input"]:
            issues.append("Unexpected refusal")
    
    return issues

# Filter bad examples
clean_data = [ex for ex in data if not validate_example(ex)]
```

### Common Issues

| Issue | Fix |
|-------|-----|
| Inconsistent format | Standardize all examples |
| Truncated outputs | Complete or remove |
| Wrong labels | Human review |
| Duplicates | Deduplicate |
| PII/sensitive data | Redact or remove |

### Deduplication

```python
def deduplicate(examples, threshold=0.9):
    unique = []
    seen_hashes = set()
    
    for ex in examples:
        h = hash_content(ex)
        if h not in seen_hashes:
            unique.append(ex)
            seen_hashes.add(h)
    
    return unique
```

---

## 🎬 Video Script

**[INTRO - Dirty vs clean data]**

Garbage in, garbage out. Let me show you how to clean training data.

**[CUT TO: Validation]**

Validate every example: length, format, consistency. Automated checks catch obvious issues.

**[CUT TO: Common issues]**

Truncation, wrong labels, duplicates, PII. Fix or remove problematic examples.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why deduplicate training data?

A) Smaller files  
B) Prevents overfitting to repeated examples  
C) Faster training  
D) Required by API  

**Correct Answer**: B
