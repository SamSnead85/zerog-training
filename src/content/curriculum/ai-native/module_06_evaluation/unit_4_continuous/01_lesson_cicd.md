# Lesson 4.1: CI/CD for LLM Apps

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Continuous Evaluation

---

## 📚 Reading Material

### LLM CI/CD Pipeline

```yaml
# .github/workflows/llm-ci.yml
name: LLM CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run unit tests
        run: pytest tests/unit
      
      - name: Run golden set tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: pytest tests/golden --timeout=300
      
      - name: Run benchmark
        run: python benchmarks/run.py --report
      
      - name: Compare to baseline
        run: python scripts/compare_baseline.py
```

### What to Run in CI

| Stage | Tests | Frequency |
|-------|-------|-----------|
| Pre-commit | Format, lint | Every commit |
| PR | Unit, integration | Every PR |
| Nightly | Full benchmark | Daily |
| Pre-deploy | Golden set | Before deploy |

### Cost Management

```python
# Use cheaper models for CI
import os

if os.getenv("CI"):
    MODEL = "gpt-4o-mini"  # Cheaper for testing
else:
    MODEL = "gpt-4o"  # Production model
```

---

## 🎬 Video Script

**[INTRO - CI pipeline diagram]**

LLM apps need CI/CD too. But with unique considerations—cost, latency, determinism.

**[CUT TO: Pipeline]**

Unit tests on every commit. Integration and golden sets on PRs. Full benchmarks nightly.

**[CUT TO: Cost management]**

Use cheaper models in CI. Control test set size. Cache where possible.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why run golden set tests before deploy?

A) Faster  
B) Catches regressions on critical behaviors  
C) Required  
D) Cheaper  

**Correct Answer**: B
