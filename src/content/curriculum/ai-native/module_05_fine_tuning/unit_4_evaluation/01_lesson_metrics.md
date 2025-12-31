# Lesson 4.1: Evaluation Metrics

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 4 - Evaluation & Deployment

---

## 📚 Reading Material

### Baseline Comparison

Always compare fine-tuned to base model:
```python
def evaluate(test_set, base_model, ft_model):
    results = {"base": [], "ft": []}
    
    for example in test_set:
        base_out = base_model(example.input)
        ft_out = ft_model(example.input)
        
        results["base"].append(score(base_out, example.expected))
        results["ft"].append(score(ft_out, example.expected))
    
    print(f"Base accuracy: {mean(results['base']):.2%}")
    print(f"FT accuracy: {mean(results['ft']):.2%}")
```

### Task-Specific Metrics

| Task | Metrics |
|------|---------|
| Classification | Accuracy, F1, Precision, Recall |
| Generation | BLEU, ROUGE, Perplexity |
| Extraction | Exact match, Partial match |
| Format compliance | % valid outputs |

### LLM-as-Judge

```python
def judge_quality(output, reference, criteria):
    prompt = f"""
Rate this output 1-5 on: {criteria}

Reference: {reference}
Output: {output}

Score and brief justification:"""
    return llm(prompt)
```

### Human Evaluation

For subjective quality:
- Side-by-side comparison
- Blind evaluation (don't reveal which is which)
- Multiple raters for reliability

---

## 🎬 Video Script

**[INTRO - Comparison chart]**

Did fine-tuning help? You need rigorous evaluation to know.

**[CUT TO: Baseline]**

Always compare to baseline. Same test set, same prompts. Calculate improvement percentage.

**[CUT TO: Metrics]**

Choose task-appropriate metrics. Classification: accuracy. Generation: BLEU, ROUGE. Format: valid output percentage.

**[CUT TO: Human eval]**

Automated metrics miss nuance. Add human evaluation for subjective quality assessment.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Why compare to baseline model?

A) Required by API  
B) To know if fine-tuning actually improved performance  
C) For cost calculation  
D) For logging  

**Correct Answer**: B
