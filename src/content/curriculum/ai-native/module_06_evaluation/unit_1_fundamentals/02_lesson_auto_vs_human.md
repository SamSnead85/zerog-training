# Lesson 1.2: Automated vs Human Evaluation

> **Duration**: 50 minutes | **Type**: Strategic
> **Unit**: 1 - Evaluation Fundamentals

---

## 📚 Reading Material

### Comparison

| Aspect | Automated | Human |
|--------|-----------|-------|
| Speed | Instant | Hours/days |
| Cost | Low | High |
| Consistency | Perfect | Variable |
| Nuance | Limited | Excellent |
| Scale | Unlimited | Limited |

### When to Use Each

**Automated for**:
- Format validation
- Factual accuracy (with ground truth)
- Regression testing
- Large-scale evaluation

**Human for**:
- Subjective quality
- Creative tasks
- Safety review
- Edge cases

### Hybrid Approach

```python
def evaluate_output(output, context):
    # Automated checks first
    if not valid_format(output):
        return {"pass": False, "reason": "format"}
    
    if contains_pii(output):
        return {"pass": False, "reason": "safety"}
    
    auto_score = automated_score(output, context)
    
    # Human review for borderline cases
    if 0.4 < auto_score < 0.6:
        return {"review": "human", "auto_score": auto_score}
    
    return {"pass": auto_score > 0.5, "score": auto_score}
```

### Human Evaluation Setup

- Clear rubrics
- Multiple raters per item
- Randomized/blinded presentation
- Inter-rater reliability measurement

---

## 🎬 Video Script

**[INTRO - Speed vs quality tradeoff]**

Automated evaluation is fast but limited. Human evaluation is accurate but slow. Let me show you how to balance.

**[CUT TO: When to use each]**

Automated for format, facts, regression. Human for subjective quality, creative tasks, safety.

**[CUT TO: Hybrid]**

Best approach: automated first, human for borderline cases. Efficient and accurate.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When is human evaluation essential?

A) Always  
B) For subjective quality, creative tasks, and safety review  
C) Never  
D) Only for production  

**Correct Answer**: B
