# Lesson 3.2: Custom Benchmarks

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 3 - Benchmarking

---

## 📚 Reading Material

### When to Build Custom

Standard benchmarks don't cover:
- Your specific domain
- Your exact use cases
- Your quality bar
- Your edge cases

### Building a Custom Benchmark

```python
class CustomBenchmark:
    def __init__(self, name, test_cases):
        self.name = name
        self.cases = test_cases
    
    def run(self, model):
        results = []
        for case in self.cases:
            output = model(case["input"])
            score = self.evaluate(output, case["expected"])
            results.append({"case": case["id"], "score": score})
        
        return {
            "benchmark": self.name,
            "mean_score": mean([r["score"] for r in results]),
            "results": results
        }
    
    def evaluate(self, output, expected):
        # Custom scoring logic
        pass
```

### Benchmark Design

1. Define what you're measuring
2. Create 50-100 test cases
3. Cover edge cases and variations
4. Include ground truth or rubric
5. Version your benchmark

---

## 🎬 Video Script

**[INTRO - Custom benchmark]**

Standard benchmarks don't test YOUR use case. Build custom benchmarks for domain-specific evaluation.

**[CUT TO: Implementation]**

Define test cases, run model, score outputs. Calculate aggregate metrics.

**[CUT TO: Design principles]**

50-100 cases, cover variations, include ground truth, version everything.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should you build a custom benchmark?

A) Never  
B) When standard benchmarks don't cover your specific domain or use cases  
C) Always  
D) Only for production  

**Correct Answer**: B
