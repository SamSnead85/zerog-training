# Lesson: Prompt Optimization and Testing

## Overview

In this lesson, you'll learn systematic approaches to optimizing and testing prompts. We'll cover A/B testing, evaluation frameworks, and strategies for continuous improvement of your prompt performance.

**Duration**: 25 minutes  
**Prerequisites**: Module 3 Lesson 1 (Prompt Engineering Mastery)

## Learning Objectives

By the end of this lesson, you will:
- Build systematic prompt evaluation frameworks
- Implement A/B testing for prompts
- Use LLM-as-judge for automated quality assessment
- Track prompt performance over time
- Optimize prompts for cost without sacrificing quality

---

## Why Systematic Testing?

"It works" isn't enough. You need to know:
- **How well** does it work? (Quality score)
- **How consistently** does it work? (Variance)
- **How efficiently** does it work? (Cost per quality point)
- **How does it compare** to alternatives? (A/B testing)

---

## Building an Evaluation Framework

### Evaluation Criteria

```python
from dataclasses import dataclass
from typing import List, Optional
import json

@dataclass
class EvaluationCriteria:
    name: str
    description: str
    weight: float  # 0-1, weights should sum to 1
    scoring_guide: str

# Define your criteria
QUALITY_CRITERIA = [
    EvaluationCriteria(
        name="accuracy",
        description="Factual correctness of the response",
        weight=0.3,
        scoring_guide="""
        5: All facts correct, fully accurate
        4: Mostly accurate, minor issues
        3: Some inaccuracies, but core is correct
        2: Significant errors
        1: Mostly incorrect
        """
    ),
    EvaluationCriteria(
        name="relevance",
        description="How well the response addresses the query",
        weight=0.25,
        scoring_guide="""
        5: Directly addresses all aspects of the query
        4: Addresses main points, minor gaps
        3: Partially addresses the query
        2: Tangentially related
        1: Off-topic
        """
    ),
    EvaluationCriteria(
        name="clarity",
        description="How clear and understandable the response is",
        weight=0.2,
        scoring_guide="""
        5: Crystal clear, well-structured
        4: Clear with minor improvements possible
        3: Understandable but could be clearer
        2: Confusing in places
        1: Unclear or incoherent
        """
    ),
    EvaluationCriteria(
        name="completeness",
        description="How complete the response is",
        weight=0.15,
        scoring_guide="""
        5: Comprehensive, covers all relevant aspects
        4: Covers most aspects
        3: Covers basics, misses some details
        2: Incomplete
        1: Very incomplete
        """
    ),
    EvaluationCriteria(
        name="tone",
        description="Appropriate tone for the context",
        weight=0.1,
        scoring_guide="""
        5: Perfect tone for the audience
        4: Mostly appropriate
        3: Acceptable but could be better
        2: Somewhat inappropriate
        1: Wrong tone entirely
        """
    ),
]
```

### LLM-as-Judge Evaluator

```python
from langchain_openai import ChatOpenAI
import json

class LLMJudge:
    def __init__(self, criteria: List[EvaluationCriteria]):
        self.criteria = criteria
        self.llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)
    
    def evaluate(self, query: str, response: str) -> dict:
        criteria_text = "\n\n".join([
            f"**{c.name.upper()}** (weight: {c.weight})\n{c.description}\n{c.scoring_guide}"
            for c in self.criteria
        ])
        
        prompt = f"""
You are an expert evaluator. Score the following response to a user query.

## Criteria
{criteria_text}

## Query
{query}

## Response
{response}

## Your Evaluation
For each criterion, provide:
1. A score from 1-5
2. A brief justification

Then calculate the weighted average score.

Return your evaluation as JSON:
{{
    "criteria_scores": {{
        "accuracy": {{"score": X, "reason": "..."}},
        "relevance": {{"score": X, "reason": "..."}},
        ...
    }},
    "weighted_score": X.XX,
    "summary": "Overall assessment in one sentence"
}}
"""
        
        result = self.llm.invoke(prompt)
        return json.loads(result.content)
```

---

## A/B Testing Prompts

### Experiment Setup

```python
import random
from datetime import datetime
from typing import Dict, Any

class PromptExperiment:
    def __init__(self, name: str, control: str, treatment: str, 
                 traffic_split: float = 0.5):
        self.name = name
        self.control = control
        self.treatment = treatment
        self.traffic_split = traffic_split
        self.results = {"control": [], "treatment": []}
        self.start_time = datetime.now()
    
    def get_prompt(self, user_id: str) -> tuple[str, str]:
        """Deterministic assignment based on user_id."""
        hash_val = hash(f"{self.name}:{user_id}") % 100
        
        if hash_val < self.traffic_split * 100:
            return self.control, "control"
        else:
            return self.treatment, "treatment"
    
    def record_result(self, variant: str, score: float, 
                      tokens: int, latency: float):
        self.results[variant].append({
            "score": score,
            "tokens": tokens,
            "latency": latency,
            "timestamp": datetime.now()
        })
    
    def get_statistics(self) -> dict:
        stats = {}
        for variant in ["control", "treatment"]:
            data = self.results[variant]
            if not data:
                continue
            
            scores = [d["score"] for d in data]
            tokens = [d["tokens"] for d in data]
            latencies = [d["latency"] for d in data]
            
            stats[variant] = {
                "n": len(data),
                "avg_score": sum(scores) / len(scores),
                "avg_tokens": sum(tokens) / len(tokens),
                "avg_latency": sum(latencies) / len(latencies),
                "score_std": self._std(scores),
            }
        
        # Calculate statistical significance
        if all(v in stats for v in ["control", "treatment"]):
            stats["p_value"] = self._calculate_p_value(
                self.results["control"],
                self.results["treatment"]
            )
            stats["significant"] = stats["p_value"] < 0.05
        
        return stats
    
    def _std(self, values: list) -> float:
        mean = sum(values) / len(values)
        variance = sum((x - mean) ** 2 for x in values) / len(values)
        return variance ** 0.5
    
    def _calculate_p_value(self, control: list, treatment: list) -> float:
        # Simplified - use scipy.stats.ttest_ind in production
        from scipy import stats
        control_scores = [d["score"] for d in control]
        treatment_scores = [d["score"] for d in treatment]
        _, p_value = stats.ttest_ind(control_scores, treatment_scores)
        return p_value
```

### Running an Experiment

```python
# Define control and treatment
control_prompt = """
You are a helpful assistant. Answer the user's question.
"""

treatment_prompt = """
You are an expert assistant specializing in clear, concise answers.
Think step by step, then provide your answer.
Keep responses under 200 words unless more detail is requested.
"""

# Create experiment
experiment = PromptExperiment(
    name="concise_vs_default",
    control=control_prompt,
    treatment=treatment_prompt,
    traffic_split=0.5
)

# In your application
def handle_query(user_id: str, query: str):
    prompt, variant = experiment.get_prompt(user_id)
    
    start = time.time()
    response = llm.invoke(prompt + f"\n\nUser: {query}")
    latency = time.time() - start
    
    # Evaluate
    score = judge.evaluate(query, response.content)["weighted_score"]
    
    # Record
    experiment.record_result(
        variant=variant,
        score=score,
        tokens=response.usage.total_tokens,
        latency=latency
    )
    
    return response

# After sufficient data
stats = experiment.get_statistics()
print(f"Control avg score: {stats['control']['avg_score']:.2f}")
print(f"Treatment avg score: {stats['treatment']['avg_score']:.2f}")
print(f"Significant difference: {stats['significant']}")
```

---

## Regression Testing

Ensure prompt changes don't break things:

```python
class PromptRegressionSuite:
    def __init__(self, golden_set_path: str):
        with open(golden_set_path) as f:
            self.golden_set = json.load(f)
        self.judge = LLMJudge(QUALITY_CRITERIA)
    
    def run(self, prompt_template: str) -> dict:
        results = []
        
        for case in self.golden_set:
            # Generate response with new prompt
            response = llm.invoke(
                prompt_template.format(query=case["query"])
            )
            
            # Evaluate
            score = self.judge.evaluate(
                case["query"], 
                response.content
            )["weighted_score"]
            
            results.append({
                "case_id": case["id"],
                "query": case["query"],
                "expected_score": case.get("baseline_score", 4.0),
                "actual_score": score,
                "passed": score >= case.get("min_score", 3.5),
            })
        
        return {
            "total": len(results),
            "passed": sum(1 for r in results if r["passed"]),
            "failed_cases": [r for r in results if not r["passed"]],
            "avg_score": sum(r["actual_score"] for r in results) / len(results),
        }

# Golden set format
golden_set = [
    {
        "id": "q001",
        "query": "How do I reset my password?",
        "baseline_score": 4.5,
        "min_score": 4.0,
        "required_patterns": ["reset", "password", "email"],
    },
    {
        "id": "q002",
        "query": "What are your business hours?",
        "baseline_score": 4.8,
        "min_score": 4.0,
        "required_patterns": ["hours", "9", "5", "Monday", "Friday"],
    },
]
```

---

## Cost-Quality Optimization

### Efficiency Metrics

```python
class CostOptimizer:
    PRICING = {
        "gpt-4-turbo": {"input": 10.00, "output": 30.00},
        "gpt-4o": {"input": 2.50, "output": 10.00},
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    }
    
    def calculate_efficiency(self, model: str, tokens: dict, 
                             quality_score: float) -> dict:
        # Cost per 1M tokens
        cost = (
            tokens["input"] * self.PRICING[model]["input"] / 1_000_000 +
            tokens["output"] * self.PRICING[model]["output"] / 1_000_000
        )
        
        return {
            "cost_usd": cost,
            "quality_score": quality_score,
            "quality_per_dollar": quality_score / cost if cost > 0 else 0,
            "tokens_per_quality": tokens["total"] / quality_score,
        }
    
    def compare_models(self, query: str, prompt: str) -> list:
        results = []
        
        for model in self.PRICING.keys():
            response = call_model(model, prompt.format(query=query))
            score = judge.evaluate(query, response.content)["weighted_score"]
            
            efficiency = self.calculate_efficiency(
                model=model,
                tokens=response.usage._asdict(),
                quality_score=score
            )
            
            results.append({
                "model": model,
                **efficiency
            })
        
        return sorted(results, key=lambda x: x["quality_per_dollar"], reverse=True)
```

### Trade-off Analysis

```
┌─────────────────────────────────────────────────────────────┐
│               COST VS QUALITY ANALYSIS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Quality Score                                               │
│  5.0 │                              ●  GPT-4-turbo          │
│      │                    ●  GPT-4o                         │
│  4.0 │        ●  GPT-4o-mini                                │
│      │                                                       │
│  3.0 │                                                       │
│      └───────────────────────────────────────────────────   │
│        $0.001   $0.005    $0.010    $0.020    Cost/query     │
│                                                              │
│  Recommendation: GPT-4o offers best quality/cost balance    │
└─────────────────────────────────────────────────────────────┘
```

---

## Prompt Versioning

```python
class PromptVersion:
    def __init__(self, version: str, template: str, 
                 changelog: str, metrics: dict = None):
        self.version = version
        self.template = template
        self.changelog = changelog
        self.metrics = metrics or {}
        self.created_at = datetime.now()

class PromptRegistry:
    def __init__(self):
        self.prompts = {}  # name -> list of versions
        self.active = {}   # name -> active version
    
    def register(self, name: str, version: PromptVersion):
        if name not in self.prompts:
            self.prompts[name] = []
        self.prompts[name].append(version)
    
    def activate(self, name: str, version: str):
        """Set active version after testing."""
        versions = self.prompts.get(name, [])
        for v in versions:
            if v.version == version:
                self.active[name] = v
                return True
        return False
    
    def get_history(self, name: str) -> list:
        return self.prompts.get(name, [])
    
    def compare_versions(self, name: str, v1: str, v2: str, 
                         test_set: list) -> dict:
        """Compare two versions on a test set."""
        # Implementation for version comparison
        pass

# Usage
registry = PromptRegistry()

registry.register("customer-support", PromptVersion(
    version="1.0.0",
    template="You are a helpful customer service agent...",
    changelog="Initial version"
))

registry.register("customer-support", PromptVersion(
    version="1.1.0",
    template="You are a friendly, efficient customer service agent...",
    changelog="Added friendlier tone, tested with A/B, +8% satisfaction"
))
```

---

## Key Takeaways

1. **Define criteria upfront**: Know what "good" means before testing
2. **Use LLM-as-judge**: Automate quality assessment at scale
3. **A/B test changes**: Don't deploy based on intuition alone
4. **Track cost efficiency**: Quality per dollar matters
5. **Regression test**: Ensure changes don't break working prompts
6. **Version everything**: Prompts are code, treat them accordingly

---

## Next Steps

- **Lab**: Build a complete prompt evaluation pipeline
- **Next Lesson**: Advanced prompting patterns
- **Advanced**: Automated prompt optimization with DSPy
