# Lesson: Evaluating and Testing RAG Systems

## Overview

In this lesson, you'll learn how to rigorously evaluate RAG system quality. We'll cover metrics, test dataset creation, automated evaluation, and continuous monitoring approaches.

**Duration**: 20 minutes  
**Prerequisites**: Module 5 Lessons 1-3

## Learning Objectives

By the end of this lesson, you will:
- Understand key RAG evaluation metrics
- Create evaluation test sets
- Implement automated evaluation pipelines
- Use LLM-as-judge for quality assessment
- Set up continuous monitoring

---

## Why Evaluation Matters

RAG systems have multiple failure modes:
- Wrong documents retrieved
- Right documents, wrong answer
- Hallucinations despite good context
- Partial or incomplete answers

**Without evaluation, you're flying blind.**

---

## Retrieval Metrics

### 1. Precision@K

Fraction of retrieved documents that are relevant.

```python
def precision_at_k(retrieved: list[str], relevant: set[str], k: int) -> float:
    """Calculate precision at K."""
    top_k = retrieved[:k]
    relevant_in_top_k = sum(1 for doc in top_k if doc in relevant)
    return relevant_in_top_k / k

# Example
retrieved = ["doc1", "doc3", "doc5", "doc2", "doc4"]
relevant = {"doc1", "doc2", "doc3"}

print(precision_at_k(retrieved, relevant, k=3))  # 2/3 = 0.667
```

### 2. Recall@K

Fraction of relevant documents that were retrieved.

```python
def recall_at_k(retrieved: list[str], relevant: set[str], k: int) -> float:
    """Calculate recall at K."""
    top_k = set(retrieved[:k])
    relevant_retrieved = len(top_k.intersection(relevant))
    return relevant_retrieved / len(relevant)

# Example
print(recall_at_k(retrieved, relevant, k=3))  # 2/3 = 0.667
```

### 3. Mean Reciprocal Rank (MRR)

How early the first relevant document appears.

```python
def mrr(retrieved: list[str], relevant: set[str]) -> float:
    """Calculate Mean Reciprocal Rank."""
    for i, doc in enumerate(retrieved, 1):
        if doc in relevant:
            return 1.0 / i
    return 0.0

# Example
print(mrr(retrieved, relevant))  # 1/1 = 1.0 (first doc is relevant)
```

### 4. Normalized Discounted Cumulative Gain (NDCG)

Accounts for graded relevance scores.

```python
import numpy as np

def dcg(relevances: list[float], k: int) -> float:
    """Calculate Discounted Cumulative Gain."""
    relevances = np.array(relevances[:k])
    positions = np.arange(1, len(relevances) + 1)
    discounts = np.log2(positions + 1)
    return np.sum(relevances / discounts)


def ndcg(retrieved_relevances: list[float], ideal_relevances: list[float], k: int) -> float:
    """Calculate Normalized DCG."""
    actual_dcg = dcg(retrieved_relevances, k)
    ideal_dcg = dcg(sorted(ideal_relevances, reverse=True), k)
    return actual_dcg / ideal_dcg if ideal_dcg > 0 else 0


# Example: relevance scores (0-3 scale)
retrieved_scores = [3, 0, 2, 1, 0]  # Actual order
ideal_scores = [3, 2, 1, 0, 0]      # Ideal order

print(ndcg(retrieved_scores, ideal_scores, k=5))
```

---

## Answer Quality Metrics

### 1. Faithfulness

Does the answer stick to the provided context?

```python
from openai import OpenAI

client = OpenAI()

def evaluate_faithfulness(context: str, answer: str) -> dict:
    """Evaluate if answer is faithful to context."""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"""
Evaluate if this answer is faithful to the provided context.
An answer is faithful if every claim can be verified from the context.

Context:
{context}

Answer:
{answer}

Evaluate and respond with JSON:
{{
  "faithfulness_score": 0-10,
  "unsupported_claims": ["list of claims not in context"],
  "reasoning": "brief explanation"
}}
"""
        }],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)

# Usage
result = evaluate_faithfulness(
    context="The product costs $49.99 and ships in 2-3 days.",
    answer="The product is $49.99 with free next-day shipping."
)
# {"faithfulness_score": 5, "unsupported_claims": ["free next-day shipping"], ...}
```

### 2. Answer Relevance

Does the answer address the question?

```python
def evaluate_relevance(question: str, answer: str) -> dict:
    """Evaluate answer relevance to question."""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"""
Evaluate if this answer directly addresses the question.

Question: {question}
Answer: {answer}

Respond with JSON:
{{
  "relevance_score": 0-10,
  "addresses_question": true/false,
  "missing_aspects": ["what the answer doesn't cover"],
  "reasoning": "brief explanation"
}}
"""
        }],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)
```

### 3. Context Precision

Is the retrieved context actually useful?

```python
def evaluate_context_precision(question: str, contexts: list[str]) -> dict:
    """Evaluate context relevance."""
    
    evaluations = []
    
    for i, context in enumerate(contexts):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user",
                "content": f"""
Is this context useful for answering the question?

Question: {question}
Context: {context}

Respond: 1 if useful, 0 if not useful
"""
            }],
            max_tokens=5
        )
        
        score = int(response.choices[0].message.content.strip())
        evaluations.append(score)
    
    precision = sum(evaluations) / len(evaluations)
    
    return {
        "context_precision": precision,
        "useful_contexts": sum(evaluations),
        "total_contexts": len(evaluations)
    }
```

---

## Creating Test Datasets

### Manual Curation

```python
test_cases = [
    {
        "id": "tc-001",
        "question": "What is your return policy?",
        "expected_docs": ["return_policy.md"],
        "expected_answer_contains": ["30 days", "refund", "shipping"],
        "difficulty": "easy"
    },
    {
        "id": "tc-002", 
        "question": "How do I return an opened item that's defective?",
        "expected_docs": ["return_policy.md", "warranty.md"],
        "expected_answer_contains": ["defective", "warranty", "replacement"],
        "difficulty": "medium"
    },
    {
        "id": "tc-003",
        "question": "If I bought something as a gift and don't have the receipt, can I still return it?",
        "expected_docs": ["return_policy.md", "gift_receipts.md"],
        "expected_answer_contains": ["gift", "receipt", "store credit"],
        "difficulty": "hard"
    }
]
```

### Synthetic Test Generation

```python
def generate_test_cases(documents: list[dict], num_cases: int = 50) -> list[dict]:
    """Generate test cases from documents using LLM."""
    
    test_cases = []
    
    for doc in documents:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{
                "role": "user",
                "content": f"""
Generate 5 question-answer pairs based on this document.
Include easy, medium, and hard questions.

Document:
{doc['content']}

Respond with JSON:
{{
  "test_cases": [
    {{
      "question": "...",
      "expected_answer": "...",
      "difficulty": "easy/medium/hard",
      "source_doc": "{doc['id']}"
    }}
  ]
}}
"""
            }],
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        test_cases.extend(result["test_cases"])
    
    return test_cases[:num_cases]
```

---

## Automated Evaluation Pipeline

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class EvalResult:
    question: str
    retrieved_docs: list[str]
    answer: str
    
    # Retrieval metrics
    precision: float
    recall: float
    mrr: float
    
    # Answer metrics  
    faithfulness: float
    relevance: float
    
    # Overall
    passed: bool
    notes: Optional[str] = None


def evaluate_rag_system(rag_pipeline, test_cases: list[dict]) -> dict:
    """Run full evaluation on RAG system."""
    
    results = []
    
    for test in test_cases:
        # Get RAG response
        response = rag_pipeline.query(test["question"])
        
        retrieved = [doc.id for doc in response.retrieved_docs]
        expected = set(test["expected_docs"])
        
        # Calculate retrieval metrics
        precision = precision_at_k(retrieved, expected, k=5)
        recall = recall_at_k(retrieved, expected, k=5)
        mrr_score = mrr(retrieved, expected)
        
        # Calculate answer metrics
        context = "\n".join(doc.content for doc in response.retrieved_docs)
        faithfulness = evaluate_faithfulness(context, response.answer)
        relevance = evaluate_relevance(test["question"], response.answer)
        
        # Check expected content
        answer_contains_expected = all(
            term.lower() in response.answer.lower()
            for term in test.get("expected_answer_contains", [])
        )
        
        # Determine pass/fail
        passed = (
            precision >= 0.4 and
            faithfulness["faithfulness_score"] >= 7 and
            relevance["relevance_score"] >= 7 and
            answer_contains_expected
        )
        
        results.append(EvalResult(
            question=test["question"],
            retrieved_docs=retrieved,
            answer=response.answer,
            precision=precision,
            recall=recall,
            mrr=mrr_score,
            faithfulness=faithfulness["faithfulness_score"] / 10,
            relevance=relevance["relevance_score"] / 10,
            passed=passed
        ))
    
    # Aggregate results
    return {
        "total": len(results),
        "passed": sum(1 for r in results if r.passed),
        "pass_rate": sum(1 for r in results if r.passed) / len(results),
        "avg_precision": sum(r.precision for r in results) / len(results),
        "avg_recall": sum(r.recall for r in results) / len(results),
        "avg_faithfulness": sum(r.faithfulness for r in results) / len(results),
        "avg_relevance": sum(r.relevance for r in results) / len(results),
        "details": results
    }
```

---

## Continuous Monitoring

### Production Metrics Dashboard

```python
from prometheus_client import Histogram, Counter, Gauge

# Metrics
retrieval_precision = Histogram(
    'rag_retrieval_precision',
    'Retrieval precision scores',
    buckets=[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
)

answer_faithfulness = Histogram(
    'rag_answer_faithfulness',
    'Answer faithfulness scores',
    buckets=[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
)

low_quality_responses = Counter(
    'rag_low_quality_total',
    'Responses flagged as low quality',
    ['reason']
)

user_feedback = Counter(
    'rag_user_feedback_total',
    'User feedback signals',
    ['type']  # helpful, not_helpful, incorrect
)


def monitor_response(precision: float, faithfulness: float, relevance: float):
    """Record metrics for a response."""
    
    retrieval_precision.observe(precision)
    answer_faithfulness.observe(faithfulness)
    
    # Flag low quality
    if precision < 0.3:
        low_quality_responses.labels(reason="low_precision").inc()
    if faithfulness < 0.5:
        low_quality_responses.labels(reason="low_faithfulness").inc()
```

---

## Key Takeaways

1. **Retrieval and generation both matter** - evaluate both stages
2. **Multiple metrics needed** - no single metric captures quality
3. **LLM-as-judge scales** - automate quality assessment
4. **Test sets are critical** - include diverse difficulty levels
5. **Monitor continuously** - production behavior differs from testing
6. **User feedback is gold** - incorporate signals into evaluation

---

## Next Steps

- **Lab**: Build an evaluation pipeline for your RAG system
- **Certification**: Complete the capstone project
- **Advanced**: A/B testing retrieval strategies
