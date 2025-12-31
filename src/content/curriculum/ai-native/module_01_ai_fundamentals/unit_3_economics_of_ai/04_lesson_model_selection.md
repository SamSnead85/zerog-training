# Lesson 3.4: Choosing the Right Model for the Job

> **Duration**: 60 minutes | **Type**: Practical/Strategic
> **Unit**: 3 - The Economics of AI

---

## 📚 Reading Material

### The Model Selection Framework

With dozens of capable models available, choosing the right one for each task is a strategic decision. This framework helps you make informed choices.

### Decision Factors

| Factor | Questions to Ask |
|--------|------------------|
| **Task Type** | Classification? Generation? Reasoning? Code? |
| **Quality Requirements** | How critical is accuracy? What error rate is acceptable? |
| **Latency Requirements** | Real-time? Near-real-time? Batch? |
| **Cost Constraints** | What's the budget? Cost per request or monthly? |
| **Compliance** | Data residency? Privacy requirements? |
| **Scale** | Requests per day? Growth projections? |
| **Customization** | Need fine-tuning? Specific domain? |

### The Model Landscape (2024)

**Tier 1: Frontier Models** (Highest capability, highest cost)
| Model | Strengths | Best For |
|-------|-----------|----------|
| GPT-4o | Multimodal, balanced | Complex reasoning, analysis |
| Claude 3.5 Sonnet | Long context, safety | Documents, nuanced tasks |
| Gemini 1.5 Pro | 2M context, multimodal | Very long documents |
| o1 | Chain-of-thought reasoning | Math, logic, planning |

**Tier 2: Capable & Efficient** (Great balance of quality/cost)
| Model | Strengths | Best For |
|-------|-----------|----------|
| GPT-4o-mini | Fast, cheap | Production workloads |
| Claude 3 Haiku | Very fast, cheap | High-volume tasks |
| Gemini 1.5 Flash | Speed, multimodal | Real-time applications |
| Llama 3.1 70B | Open, deployable | Self-hosted needs |

**Tier 3: Fast & Cheap** (Basic tasks at scale)
| Model | Strengths | Best For |
|-------|-----------|----------|
| GPT-3.5-turbo | Mature, stable | Simple Q&A, routing |
| Mistral 7B | Small, fast | Edge deployment |
| Llama 3.1 8B | Local, private | On-device AI |

### Task-Model Matching

**Simple Classification**
```
Task: Route customer inquiries to departments
Need: Speed, low cost, basic understanding
Choice: GPT-4o-mini or Claude Haiku
Why: Classification doesn't need frontier reasoning
```

**Complex Reasoning**
```
Task: Analyze legal contracts for risks
Need: High accuracy, nuanced understanding
Choice: GPT-4o or Claude 3.5 Sonnet
Why: Stakes are high, quality matters more than cost
```

**High-Volume Generation**
```
Task: Generate product descriptions at scale
Need: Consistent quality, low per-unit cost
Choice: GPT-4o-mini or Llama 3.1 70B
Why: Good enough quality at sustainable cost
```

**Real-Time Assistance**
```
Task: Live coding autocomplete
Need: Sub-100ms latency
Choice: Claude Haiku or Groq (Llama)
Why: Speed is the critical constraint
```

**Document Analysis**
```
Task: Summarize 100-page reports
Need: Long context, comprehension
Choice: Claude 3.5 Sonnet (200K) or Gemini 1.5 Pro (2M)
Why: Context window is the constraint
```

### The Routing Pattern

Use cheap models to route to expensive models:

```python
def intelligent_routing(user_query):
    # Step 1: Cheap classification
    complexity = classify_complexity(user_query, model="gpt-4o-mini")
    
    # Step 2: Route based on complexity
    if complexity == "simple":
        return answer_simple(user_query, model="gpt-4o-mini")
    elif complexity == "moderate":
        return answer_moderate(user_query, model="gpt-4o")
    else:
        return answer_complex(user_query, model="o1-preview")
```

**Typical routing distribution**:
- 60% simple queries → cheap model
- 30% moderate queries → mid-tier model
- 10% complex queries → frontier model

**Result**: ~70% cost reduction vs. using frontier model for everything.

### Evaluation: How to Benchmark

**1. Define Success Metrics**
```python
metrics = {
    "accuracy": "Correct answer rate",
    "relevance": "Response addresses the question",
    "completeness": "Covers all aspects",
    "latency": "Response time",
    "cost": "Cost per request"
}
```

**2. Create a Test Set**
- Representative of production queries
- Include edge cases
- Cover different difficulty levels
- At least 100 examples for statistical significance

**3. Run Experiments**
```python
results = {}
for model in models:
    results[model] = {
        "accuracy": evaluate_accuracy(model, test_set),
        "latency": measure_latency(model, test_set),
        "cost": calculate_cost(model, test_set)
    }
```

**4. Analyze Tradeoffs**
- Plot cost vs. accuracy
- Identify the "knee" in the curve
- Check if cheaper model is "good enough"

### When to Self-Host

**Consider self-hosting (Llama, Mistral) when**:
- Privacy requirements prevent cloud APIs
- High volume makes API costs prohibitive
- Need custom fine-tuning
- Latency requirements need local inference
- Want to avoid vendor dependency

**Stick with APIs when**:
- Volume is low to moderate
- Need frontier capabilities (GPT-4o, Claude 3.5)
- Don't have ML infrastructure team
- Rapid model updates matter

---

## 🎬 Video Script

**[INTRO - Dashboard showing many model options]**

You have dozens of AI models to choose from. GPT-4o, Claude, Gemini, Llama, Mistral... How do you decide? Let me give you a framework.

**[CUT TO: Decision factors checklist]**

Start with your constraints. What's the task? What quality do you need? How fast must it respond? What's your budget? Do you have compliance requirements?

**[CUT TO: Three-tier model diagram]**

I think of models in three tiers. Tier one: frontier models—GPT-4o, Claude 3.5 Sonnet, o1. Maximum capability, maximum cost. Use these when accuracy is critical.

Tier two: efficient models—GPT-4o-mini, Claude Haiku, Llama 70B. Eighty percent of the capability at twenty percent of the cost. These are your workhorses.

Tier three: fast and cheap—GPT-3.5, small Llama and Mistral models. Basic tasks at massive scale.

**[CUT TO: Task-model matching examples]**

Simple rule: use the cheapest model that achieves acceptable quality.

Classification? GPT-4o-mini. You don't need frontier reasoning to route emails.

Legal contract analysis? GPT-4o or Claude 3.5. Stakes are too high for a cheap model.

Product descriptions at scale? GPT-4o-mini or Llama 70B. Good enough quality, sustainable cost.

Real-time autocomplete? Claude Haiku or Groq. Speed is everything.

**[CUT TO: Routing pattern diagram]**

The clever pattern: use cheap models to route to expensive models. Classify query complexity with GPT-4o-mini—costs almost nothing. Simple queries stay on the cheap model. Complex queries escalate to GPT-4o.

Typical distribution: 60% simple, 30% moderate, 10% complex. Result: 70% cost reduction versus using the expensive model for everything.

**[CUT TO: Evaluation framework]**

How do you know which model is best? Benchmark. Create a test set of real queries. Measure accuracy, latency, cost across models. Find the knee in the curve—where you get diminishing returns from more expensive models.

**[CUT TO: Speaker on camera]**

Model selection isn't a one-time decision. New models launch constantly. Prices change. Your requirements evolve. Build in flexibility. Abstract your model choice so you can swap easily. And revisit your decisions quarterly.

**[END - Runtime: 7:10]**

---

## 🔬 Interactive Lab: Model Selection and Benchmarking

### Objective
Benchmark multiple models on a real task and make informed selection.

### Part 1: Create Evaluation Dataset (15 minutes)

```python
# Sample task: Customer support intent classification
evaluation_set = [
    {"query": "I need to return this item", "expected": "returns"},
    {"query": "Where is my order?", "expected": "order_status"},
    {"query": "I was charged twice", "expected": "billing"},
    {"query": "How do I cancel my subscription?", "expected": "cancellation"},
    {"query": "The product arrived damaged", "expected": "returns"},
    {"query": "I forgot my password", "expected": "account"},
    {"query": "Do you ship internationally?", "expected": "shipping"},
    {"query": "I want to upgrade my plan", "expected": "upgrade"},
    {"query": "Your website isn't working", "expected": "technical"},
    {"query": "I love your products!", "expected": "feedback"},
    {"query": "Refund status please", "expected": "billing"},
    {"query": "Change my delivery address", "expected": "shipping"},
    {"query": "Is item X in stock?", "expected": "inventory"},
    {"query": "I need to speak with a manager", "expected": "escalation"},
    {"query": "Promo code isn't working", "expected": "billing"},
]

# Classification prompt
def create_classification_prompt(query):
    return f"""Classify this customer query into exactly one category.
Categories: returns, order_status, billing, cancellation, account, shipping, upgrade, technical, feedback, inventory, escalation

Query: {query}

Respond with ONLY the category name, nothing else."""
```

### Part 2: Benchmark Models (25 minutes)

```python
import time
from openai import OpenAI

client = OpenAI()

def benchmark_model(model, eval_set, prompt_creator):
    """Benchmark a model on the evaluation set."""
    results = {
        "correct": 0,
        "total": len(eval_set),
        "latencies": [],
        "costs": []
    }
    
    for item in eval_set:
        prompt = prompt_creator(item["query"])
        
        start = time.time()
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=20
        )
        latency = time.time() - start
        
        predicted = response.choices[0].message.content.strip().lower()
        actual = item["expected"]
        
        if predicted == actual:
            results["correct"] += 1
        
        results["latencies"].append(latency)
        
        # Estimate cost
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens
        results["costs"].append(estimate_cost(model, input_tokens, output_tokens))
    
    return {
        "model": model,
        "accuracy": results["correct"] / results["total"],
        "avg_latency_ms": sum(results["latencies"]) / len(results["latencies"]) * 1000,
        "avg_cost": sum(results["costs"]) / len(results["costs"]),
        "total_cost": sum(results["costs"])
    }

PRICING = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "gpt-3.5-turbo": {"input": 0.50, "output": 1.50},
}

def estimate_cost(model, input_tokens, output_tokens):
    prices = PRICING.get(model, {"input": 1.0, "output": 3.0})
    return (input_tokens / 1_000_000 * prices["input"] + 
            output_tokens / 1_000_000 * prices["output"])

# Run benchmarks
models = ["gpt-4o-mini", "gpt-4o"]  # Add more as needed
results = []

for model in models:
    print(f"Benchmarking {model}...")
    result = benchmark_model(model, evaluation_set, create_classification_prompt)
    results.append(result)
    print(f"  Accuracy: {result['accuracy']:.1%}")
    print(f"  Avg Latency: {result['avg_latency_ms']:.0f}ms")
    print(f"  Total Cost: ${result['total_cost']:.6f}")
```

### Part 3: Implement Intelligent Routing (20 minutes)

```python
class ModelRouter:
    def __init__(self):
        self.simple_model = "gpt-4o-mini"
        self.complex_model = "gpt-4o"
        self.stats = {"simple": 0, "complex": 0}
    
    def classify_complexity(self, query):
        """Determine if query needs the complex model."""
        # Simple heuristics (in production, use a classifier)
        complex_indicators = [
            "explain",
            "analyze",
            "compare",
            "legal",
            "compliance",
            "policy",
            "multi-step",
        ]
        
        query_lower = query.lower()
        for indicator in complex_indicators:
            if indicator in query_lower:
                return "complex"
        
        if len(query.split()) > 50:
            return "complex"
        
        return "simple"
    
    def route(self, query):
        """Route query to appropriate model."""
        complexity = self.classify_complexity(query)
        
        if complexity == "simple":
            self.stats["simple"] += 1
            model = self.simple_model
        else:
            self.stats["complex"] += 1
            model = self.complex_model
        
        # Make the call
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": query}],
            max_tokens=200
        )
        
        return {
            "response": response.choices[0].message.content,
            "model_used": model,
            "complexity": complexity
        }
    
    def get_stats(self):
        total = self.stats["simple"] + self.stats["complex"]
        if total == 0:
            return {}
        return {
            "total_requests": total,
            "simple_pct": self.stats["simple"] / total * 100,
            "complex_pct": self.stats["complex"] / total * 100,
            "estimated_savings": self.stats["simple"] / total * 0.9  # ~90% savings on simple
        }

# Test the router
router = ModelRouter()
test_queries = [
    "What are your store hours?",
    "Explain the legal implications of your return policy",
    "Where is my order?",
    "Analyze this contract and identify potential risks",
    "How do I track my package?",
]

for query in test_queries:
    result = router.route(query)
    print(f"\nQuery: {query[:50]}...")
    print(f"Routed to: {result['model_used']} ({result['complexity']})")

print(f"\nRouting Stats: {router.get_stats()}")
```

### Submission
Submit your benchmark results and model selection recommendation with justification.

---

## ✅ Knowledge Check

### Question 1
What is the primary principle for model selection?

A) Always use the most expensive model  
B) Use the cheapest model that achieves acceptable quality  
C) Use the same model for all tasks  
D) Always use open-source models  

**Correct Answer**: B

**Explanation**: The goal is to find the model that meets your quality requirements at the lowest cost. More expensive models often provide marginal improvements for simple tasks.

---

### Question 2
What is the "routing pattern" in AI applications?

A) Sending requests to different datacenters  
B) Using a cheap model to classify queries and route complex ones to expensive models  
C) Routing users to different websites  
D) Distributing load across servers  

**Correct Answer**: B

**Explanation**: The routing pattern uses an inexpensive model to classify query complexity, then routes simple queries to cheap models and complex queries to capable models. This can reduce costs by 70% or more.

---

### Question 3
When should you consider self-hosting models like Llama?

A) When you need the absolute best performance  
B) When privacy, volume, or latency requirements make APIs unsuitable  
C) When you have no technical team  
D) When you want the easiest solution  

**Correct Answer**: B

**Explanation**: Self-hosting makes sense when: privacy requirements prevent cloud use, high volume makes APIs too expensive, you need custom fine-tuning, or latency requires local inference.

---

### Question 4
How large should an evaluation dataset be for reliable benchmarking?

A) 5-10 examples  
B) At least 100 examples  
C) 1 million examples  
D) It doesn't matter  

**Correct Answer**: B

**Explanation**: At least 100 examples provides reasonable statistical significance. Fewer examples lead to noisy results where random variation can appear meaningful.

---

*Congratulations on completing Unit 3! You now have a comprehensive understanding of AI economics—from token pricing to model selection.*
