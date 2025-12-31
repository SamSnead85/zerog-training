# Lesson 1.1: Why RAG? Solving LLM Limitations

> **Duration**: 45 minutes | **Type**: Conceptual
> **Unit**: 1 - RAG Foundations

---

## 📚 Reading Material

### The LLM Knowledge Problem

LLMs have a fundamental limitation: **they only know what they were trained on**.

| Limitation | Impact |
|------------|--------|
| **Knowledge cutoff** | No info after training date |
| **No proprietary data** | Doesn't know your docs |
| **Hallucination** | Makes up facts confidently |
| **No source citation** | Can't prove accuracy |
| **Stale information** | Outdated facts |

### What Is RAG?

**Retrieval-Augmented Generation** combines:
1. **Retrieval**: Find relevant information from your data
2. **Augmentation**: Add that context to the prompt
3. **Generation**: LLM answers using retrieved context

```
User Query → [Retriever] → Relevant Docs → [LLM + Context] → Grounded Answer
```

### The RAG Advantage

**Before RAG** (asking directly):
```
User: What is our company's refund policy?
LLM: I don't have information about your specific company's policies.
     Generally, refund policies include... [generic response]
```

**After RAG**:
```
User: What is our company's refund policy?
[Retriever finds: policy_handbook.pdf, section 4.2]
LLM: Based on your company policy, customers can request refunds 
     within 30 days of purchase. Full refunds for unopened items,
     50% for opened items. [Source: Policy Handbook, Section 4.2]
```

### When to Use RAG

| Use Case | Why RAG Helps |
|----------|---------------|
| **Knowledge bases** | Query company docs |
| **Customer support** | Access product manuals |
| **Legal/compliance** | Cite specific policies |
| **Research** | Search paper archives |
| **Code assistance** | Use codebase context |

### When NOT to Use RAG

- **General knowledge**: LLM already knows
- **Creative tasks**: No "correct" info to retrieve
- **Math/reasoning**: Computation, not retrieval
- **Conversation**: No external knowledge needed

### RAG vs Fine-Tuning

| Aspect | RAG | Fine-Tuning |
|--------|-----|-------------|
| **Updates** | Instant (update docs) | Retrain required |
| **Cost** | Per-query retrieval | Large upfront training |
| **Accuracy** | Can cite sources | May still hallucinate |
| **Scale** | Millions of docs | Limited training data |
| **Use case** | Knowledge retrieval | Style/behavior change |

**Rule of thumb**: RAG for **what** (facts), fine-tuning for **how** (style).

---

## 🎬 Video Script

**[INTRO - LLM failure example]**

Ask an LLM about your company's specific policies. It doesn't know. Ask about events after its training date. It doesn't know. Ask for sources. It can't provide them. These limitations block real business use.

**[CUT TO: RAG concept]**

RAG—Retrieval-Augmented Generation—solves this. Before the LLM answers, we retrieve relevant documents from your data. The LLM generates using that context. Now it knows your policies, can cite sources, and stays current.

**[CUT TO: Before/after comparison]**

Watch the difference. Before RAG: "I don't have information about your company policies." After RAG: "Based on your Policy Handbook Section 4.2, customers can request refunds within 30 days." Grounded, specific, citable.

**[CUT TO: Use cases table]**

Where RAG shines: knowledge bases, support, legal, research, code. Anywhere you need accurate retrieval of specific information.

**[CUT TO: RAG vs fine-tuning]**

RAG versus fine-tuning: RAG for what the model knows—facts, policies, data. Fine-tuning for how it responds—style, tone, format. RAG updates instantly. Fine-tuning requires retraining.

**[CUT TO: Speaker on camera]**

RAG is the pattern that makes LLMs useful for enterprise. If your AI needs to know your organization's information, RAG is the answer. This module teaches you how to build it right.

**[END - Runtime: 5:15]**

---

## 🔬 Interactive Lab: Understanding RAG

### Objective
Experience the difference between direct LLM calls and RAG.

### Part 1: The Limitation Problem (15 minutes)

```python
from openai import OpenAI
client = OpenAI()

# Questions an LLM cannot answer accurately
questions = [
    "What is TechCorp's vacation policy for employees with 5+ years?",
    "What was the closing price of AAPL on December 30, 2024?",
    "What are the key findings from our Q4 sales report?",
    "Which configuration option enables debug logging in our product?",
]

print("=== Without RAG ===\n")
for q in questions:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": q}],
        max_tokens=200
    )
    print(f"Q: {q}")
    print(f"A: {response.choices[0].message.content[:200]}...")
    print()

# Notice: The model either refuses, makes up answers, or gives generic responses
```

### Part 2: Simple RAG Demo (15 minutes)

```python
# Simulate a document store
DOCUMENTS = {
    "vacation_policy": """
    TechCorp Vacation Policy (2024):
    - 0-2 years: 10 days PTO
    - 3-4 years: 15 days PTO
    - 5+ years: 20 days PTO + 5 floating holidays
    - All employees get company holidays off
    """,
    "product_config": """
    Configuration Guide v3.2:
    Debug logging: Set LOG_LEVEL=DEBUG in environment
    Verbose mode: Add --verbose flag to startup command
    Log file location: /var/log/product/debug.log
    """,
    "q4_report": """
    Q4 2024 Sales Report Summary:
    - Revenue: $12.5M (up 15% YoY)
    - New customers: 847
    - Churn rate: 3.2% (down from 4.1%)
    - Top product: Enterprise Suite (45% of revenue)
    """
}

def simple_retrieve(query, docs, top_k=1):
    """Very simple keyword-based retrieval"""
    scores = {}
    query_terms = query.lower().split()
    
    for doc_id, content in docs.items():
        score = sum(1 for term in query_terms if term in content.lower())
        scores[doc_id] = score
    
    sorted_docs = sorted(scores.items(), key=lambda x: -x[1])
    return [docs[doc_id] for doc_id, _ in sorted_docs[:top_k]]

def answer_with_rag(query, docs):
    """Answer using RAG"""
    # Step 1: Retrieve relevant context
    context_docs = simple_retrieve(query, docs)
    context = "\n\n".join(context_docs)
    
    # Step 2: Generate with context
    prompt = f"""Answer the question using ONLY the context provided.
If the answer isn't in the context, say "I don't have that information."

Context:
{context}

Question: {query}
Answer:"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    return response.choices[0].message.content

# Test RAG
print("=== With RAG ===\n")
test_questions = [
    "What is TechCorp's vacation policy for employees with 5+ years?",
    "Which configuration option enables debug logging in our product?",
    "What was Q4 revenue?",
]

for q in test_questions:
    print(f"Q: {q}")
    print(f"A: {answer_with_rag(q, DOCUMENTS)}")
    print()
```

### Part 3: Hallucination Comparison (15 minutes)

```python
def compare_approaches(query, docs):
    """Compare direct vs RAG responses"""
    
    # Direct (no RAG)
    direct = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": query}],
        max_tokens=200
    ).choices[0].message.content
    
    # With RAG
    rag = answer_with_rag(query, docs)
    
    return {"direct": direct, "rag": rag}

# Test with a question that could cause hallucination
query = "What are the specific benefits for TechCorp employees with 5+ years?"
result = compare_approaches(query, DOCUMENTS)

print("DIRECT (no context):")
print(result["direct"])
print("\nRAG (with context):")
print(result["rag"])

# The direct answer may hallucinate benefits
# The RAG answer stays grounded in the actual policy
```

---

## ✅ Knowledge Check

### Question 1
What problem does RAG primarily solve?

A) Making LLMs faster  
B) LLMs don't have access to proprietary or current information  
C) Reducing model size  
D) Improving model training  

**Correct Answer**: B

**Explanation**: RAG solves the knowledge problem—LLMs only know training data. RAG lets them access your documents, current information, and cite sources.

---

### Question 2
What are the three parts of RAG?

A) Read, Analyze, Generate  
B) Retrieve, Augment, Generate  
C) Research, Apply, Grow  
D) Run, Assess, Go  

**Correct Answer**: B

**Explanation**: RAG = Retrieval (find relevant docs) + Augmentation (add to prompt) + Generation (LLM answers with context).

---

### Question 3
When should you use fine-tuning instead of RAG?

A) For accessing company documents  
B) For changing how the model responds (style, behavior)  
C) For getting current information  
D) For citing sources  

**Correct Answer**: B

**Explanation**: Fine-tuning changes HOW the model responds. RAG changes WHAT it knows. Use fine-tuning for behavior/style, RAG for knowledge.

---

*You've completed Lesson 1.1! You understand why RAG is essential.*
