# Lesson 1.1: Quality Dimensions

> **Duration**: 45 minutes | **Type**: Conceptual
> **Unit**: 1 - Evaluation Fundamentals

---

## 📚 Reading Material

### Multi-Dimensional Quality

LLM outputs have multiple quality dimensions:

| Dimension | Measures | Example Metric |
|-----------|----------|----------------|
| **Correctness** | Factually accurate | Accuracy % |
| **Relevance** | Answers the question | Rating 1-5 |
| **Coherence** | Logically structured | Fluency score |
| **Helpfulness** | Solves user's problem | Task completion |
| **Safety** | No harmful content | Violation rate |
| **Groundedness** | Based on sources | Citation check |

### Task-Specific Dimensions

**Summarization**: Faithfulness, coverage, conciseness
**Classification**: Accuracy, precision, recall, F1
**Generation**: Creativity, style match, format compliance
**Q&A**: Correctness, relevance, source attribution
**Code**: Correctness, efficiency, readability

### Defining Your Metrics

```python
class QualityMetrics:
    def __init__(self, task_type):
        self.metrics = {
            "summarization": ["faithfulness", "coverage", "conciseness"],
            "qa": ["correctness", "relevance", "groundedness"],
            "code": ["works", "efficient", "readable"]
        }[task_type]
    
    def evaluate(self, output, reference):
        scores = {}
        for metric in self.metrics:
            scores[metric] = self.measure(metric, output, reference)
        return scores
```

### Prioritization

Not all metrics matter equally:
```
Safety > Correctness > Relevance > Fluency
```

Define thresholds for each:
- Safety: 100% (zero tolerance)
- Correctness: 95%+
- Relevance: 90%+
- Fluency: 80%+

---

## 🎬 Video Script

**[INTRO - Quality dimensions diagram]**

LLM quality isn't one thing—it's many. Let me show you the dimensions that matter.

**[CUT TO: Dimensions table]**

Correctness, relevance, coherence, helpfulness, safety, groundedness. Each matters for different reasons.

**[CUT TO: Task-specific]**

Different tasks emphasize different dimensions. Summarization cares about faithfulness. Code cares about correctness. Define what matters for YOUR task.

**[CUT TO: Prioritization]**

Safety first—zero tolerance. Then correctness. Then relevance. Set thresholds for each.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why measure multiple quality dimensions?

A) More numbers are better  
B) Quality has many aspects that matter differently for different tasks  
C) Required by regulations  
D) For documentation  

**Correct Answer**: B
