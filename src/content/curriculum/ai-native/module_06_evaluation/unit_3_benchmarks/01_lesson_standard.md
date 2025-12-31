# Lesson 3.1: Standard Benchmarks

> **Duration**: 55 minutes | **Type**: Reference
> **Unit**: 3 - Benchmarking

---

## 📚 Reading Material

### Popular Benchmarks

| Benchmark | Measures | Tasks |
|-----------|----------|-------|
| MMLU | Knowledge | Multiple choice Q&A |
| HellaSwag | Reasoning | Sentence completion |
| HumanEval | Coding | Python problems |
| TruthfulQA | Truthfulness | Factual Q&A |
| MT-Bench | Chat | Multi-turn conversation |
| GSM8K | Math | Grade school math |

### RAG Benchmarks

| Framework | Metrics |
|-----------|---------|
| RAGAS | Faithfulness, relevance, precision |
| BEIR | Retrieval across domains |
| Custom | Task-specific |

### Using RAGAS

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

# Prepare evaluation dataset
eval_data = {
    "question": [...],
    "answer": [...],
    "contexts": [...],
    "ground_truth": [...]
}

# Run evaluation
result = evaluate(
    dataset=eval_data,
    metrics=[faithfulness, answer_relevancy]
)
print(result)
```

---

## 🎬 Video Script

**[INTRO - Benchmark overview]**

Standard benchmarks let you compare models objectively. Let me show you the key ones.

**[CUT TO: LLM benchmarks]**

MMLU for knowledge, HumanEval for code, TruthfulQA for facts. Each measures different capabilities.

**[CUT TO: RAG benchmarks]**

RAGAS for RAG evaluation: faithfulness, relevance, precision. Essential for production RAG.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does RAGAS measure?

A) Speed  
B) Faithfulness, relevance, and precision for RAG systems  
C) Cost  
D) Training time  

**Correct Answer**: B
