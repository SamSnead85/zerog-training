# Lesson 2.3: Regression Prevention

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 2 - Testing Strategies

---

## 📚 Reading Material

### What Causes Regressions

- Prompt changes
- Model updates
- Pipeline modifications
- Dependency updates
- Data changes

### Golden Dataset

```python
# Curated examples with expected outputs
GOLDEN_SET = [
    {
        "input": "What is your refund policy?",
        "expected_contains": ["30 days", "full refund"],
        "expected_not_contains": ["no refunds"]
    },
    # 50-100 examples covering key behaviors
]

def test_golden_set():
    failures = []
    for case in GOLDEN_SET:
        result = system(case["input"])
        
        for phrase in case["expected_contains"]:
            if phrase not in result:
                failures.append(f"Missing: {phrase}")
        
        for phrase in case["expected_not_contains"]:
            if phrase in result:
                failures.append(f"Contains forbidden: {phrase}")
    
    assert not failures, f"Regressions: {failures}"
```

### Semantic Regression

```python
def test_semantic_similarity():
    baseline = load_baseline_outputs()
    current = generate_current_outputs()
    
    for id in baseline:
        similarity = semantic_similarity(
            baseline[id], 
            current[id]
        )
        assert similarity > 0.85, f"Regression on {id}"
```

---

## 🎬 Video Script

**[INTRO - Regression timeline]**

Changes break things. Model updates, prompt tweaks, pipeline changes. Let me show you how to catch regressions.

**[CUT TO: Golden dataset]**

Golden dataset: curated examples with expected behaviors. Run before every deploy.

**[CUT TO: Semantic similarity]**

Semantic regression testing: compare to baseline outputs. Allow flexibility but catch drift.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is a golden dataset?

A) Expensive dataset  
B) Curated examples with expected behaviors for regression testing  
C) Training data  
D) Production logs  

**Correct Answer**: B
