# Lesson 3.3: Leaderboards and Comparisons

> **Duration**: 50 minutes | **Type**: Reference
> **Unit**: 3 - Benchmarking

---

## 📚 Reading Material

### Public Leaderboards

| Leaderboard | Focus |
|-------------|-------|
| [Open LLM](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) | Open-source models |
| [Chatbot Arena](https://chat.lmsys.org/) | Human preference |
| [HELM](https://crfm.stanford.edu/helm/) | Holistic eval |

### Reading Leaderboards

- Check what's measured (may not match your needs)
- Look at specific tasks, not just aggregate
- Consider cost/latency tradeoffs
- Verify with your own testing

### Internal Comparison

```python
def compare_models(models, benchmark):
    results = {}
    for name, model in models.items():
        results[name] = benchmark.run(model)
    
    # Rank by score
    ranked = sorted(
        results.items(),
        key=lambda x: x[1]["mean_score"],
        reverse=True
    )
    
    return ranked
```

---

## 🎬 Video Script

**[INTRO - Leaderboard example]**

Leaderboards compare models at scale. But use them wisely.

**[CUT TO: Reading leaderboards]**

Check what's measured. Aggregate scores hide details. Always verify on your own data.

**[CUT TO: Internal comparison]**

Build internal comparisons on your benchmark. What wins publicly may not win for you.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why verify leaderboard results on your own data?

A) Leaderboards are fake  
B) Your use case may differ from benchmark tasks  
C) For regulations  
D) Not needed  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You understand benchmarking.*
