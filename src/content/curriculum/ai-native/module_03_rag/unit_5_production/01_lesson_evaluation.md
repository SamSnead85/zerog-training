# Lesson 5.1: RAG Evaluation Frameworks

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 5 - Production RAG

---

## 📚 Reading Material

### RAG Quality Dimensions

| Dimension | Measures | Example Metric |
|-----------|----------|----------------|
| **Retrieval** | Right docs found? | Recall@k, MRR |
| **Generation** | Answer quality? | Correctness |
| **Groundedness** | Uses context? | Citation accuracy |
| **Relevance** | Answers the question? | User rating |

### RAGAS Framework

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)

results = evaluate(
    dataset=eval_dataset,
    metrics=[
        faithfulness,          # Answer grounded in context?
        answer_relevancy,      # Answer relevant to question?
        context_precision,     # Retrieved context relevant?
        context_recall        # Retrieved all needed context?
    ]
)
```

### LLM-as-Judge

```python
def evaluate_answer(question, answer, context):
    prompt = f"""Rate this RAG response 1-5:

Question: {question}
Context: {context}
Answer: {answer}

Score on:
1. Correctness (factually accurate)
2. Groundedness (uses provided context)
3. Completeness (fully answers question)

Return JSON: {{"correctness": X, "groundedness": X, "completeness": X}}"""
    
    return llm.generate(prompt, json_mode=True)
```

### Building Eval Datasets

```python
# Golden dataset structure
eval_dataset = [
    {
        "question": "What is the refund policy?",
        "ground_truth": "30 days for full refund",
        "required_docs": ["policies.pdf"],
    },
    # 50-100 examples covering edge cases
]

def run_evaluation(rag_system, dataset):
    results = []
    for item in dataset:
        response = rag_system.query(item["question"])
        
        results.append({
            "question": item["question"],
            "answer": response.answer,
            "retrieved_docs": response.sources,
            "correct": response.answer contains item["ground_truth"],
            "retrieved_correct": item["required_docs"] in response.sources
        })
    
    return calculate_metrics(results)
```

---

## 🎬 Video Script

**[INTRO - Eval dimensions diagram]**

You can't improve what you don't measure. Let me show you how to evaluate RAG.

**[CUT TO: RAGAS]**

RAGAS measures four dimensions: faithfulness, relevance, precision, recall. Run it on a test dataset to get objective scores.

**[CUT TO: LLM judge]**

LLM-as-judge evaluates subjective quality. Rate correctness, groundedness, completeness on each response.

**[CUT TO: Golden dataset]**

Build a golden dataset: questions, expected answers, required source docs. Run your system, compare to ground truth.

**[END - Runtime: 5:00]**

---

## ✅ Knowledge Check

### Question 1
What does "faithfulness" measure in RAG?

A) Speed  
B) Whether the answer is grounded in retrieved context  
C) User satisfaction  
D) Storage efficiency  

**Correct Answer**: B
