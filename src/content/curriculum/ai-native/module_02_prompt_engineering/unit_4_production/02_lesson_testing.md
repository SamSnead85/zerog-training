# Lesson 4.2: Testing and Evaluation

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Production Prompting

---

## 📚 Reading Material

### Why Test Prompts?

Prompts are code. Untested prompts break in production:
- Model updates change behavior
- Edge cases cause failures
- Minor prompt tweaks cause regressions

### Test Types

| Type | Purpose | When |
|------|---------|------|
| **Unit** | Single input → expected output | Development |
| **Regression** | Ensure old behavior preserved | Before deploy |
| **Quality** | Measure accuracy, style, etc. | Periodic |
| **Load** | Performance under volume | Pre-production |

### Building Test Suites

```python
@dataclass
class TestCase:
    name: str
    input: str
    expected_contains: list[str] = None
    expected_not_contains: list[str] = None
    expected_format: str = None  # "json", "markdown"
    max_tokens: int = None

def run_tests(prompt_template, test_cases):
    results = []
    for tc in test_cases:
        output = generate(prompt_template.format(input=tc.input))
        
        passed = True
        reasons = []
        
        if tc.expected_contains:
            for phrase in tc.expected_contains:
                if phrase.lower() not in output.lower():
                    passed = False
                    reasons.append(f"Missing: {phrase}")
        
        if tc.expected_not_contains:
            for phrase in tc.expected_not_contains:
                if phrase.lower() in output.lower():
                    passed = False
                    reasons.append(f"Contains forbidden: {phrase}")
        
        results.append({"name": tc.name, "passed": passed, "reasons": reasons})
    
    return results
```

### Evaluation Metrics

**Accuracy** (classification):
```python
def accuracy(predictions, labels):
    correct = sum(p == l for p, l in zip(predictions, labels))
    return correct / len(labels)
```

**BLEU** (text similarity):
```python
from nltk.translate.bleu_score import sentence_bleu
score = sentence_bleu([reference.split()], candidate.split())
```

**LLM-as-Judge**:
```python
def evaluate_with_llm(output, criteria):
    prompt = f"""
Rate this output 1-5 on: {criteria}

Output: {output}

Score (just the number):"""
    return int(generate(prompt).strip())
```

### Regression Testing

```python
class RegressionSuite:
    def __init__(self, baseline_file):
        self.baselines = self.load_baselines(baseline_file)
    
    def run(self, prompt_func):
        regressions = []
        for case in self.baselines:
            new_output = prompt_func(case["input"])
            if not self.outputs_equivalent(new_output, case["expected"]):
                regressions.append(case["name"])
        return regressions
    
    def outputs_equivalent(self, a, b, threshold=0.8):
        # Use embedding similarity or LLM judge
        return similarity(a, b) >= threshold
```

### CI/CD Integration

```yaml
# .github/workflows/prompt-tests.yml
name: Prompt Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run prompt tests
        run: python -m pytest tests/prompts/
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_KEY }}
```

---

## 🎬 Video Script

**[INTRO - Broken production output]**

Untested prompts fail in production. Model updates, edge cases, small tweaks—any of these can break what was working. Here's how to test prompts properly.

**[CUT TO: Test types]**

Different tests for different needs. Unit tests verify single cases. Regression tests catch changes. Quality tests measure metrics. Load tests check performance.

**[CUT TO: Test case structure]**

Structure test cases with clear expectations. What should the output contain? What should it not contain? What format? Build a suite covering normal cases and edge cases.

**[CUT TO: Metrics]**

Measure quality with metrics. Accuracy for classification. BLEU for text similarity. LLM-as-judge for subjective quality. Pick metrics that match your use case.

**[CUT TO: CI/CD code]**

Integrate tests into CI/CD. Run on every push. Block deploys that fail tests. Store baselines and catch regressions before they reach users.

**[CUT TO: Speaker on camera]**

Test prompts like code. Build suites. Run automatically. Block regressions. The time you spend testing saves days of debugging production issues.

**[END - Runtime: 4:30]**

---

## 🔬 Interactive Lab: Prompt Testing

### Part 1: Build Test Suite (30 minutes)

```python
from dataclasses import dataclass
from openai import OpenAI

client = OpenAI()

@dataclass
class PromptTest:
    name: str
    input: str
    must_contain: list[str] = None
    must_not_contain: list[str] = None
    
def test_prompt(prompt_template, tests):
    results = []
    
    for test in tests:
        prompt = prompt_template.format(input=test.input)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300
        )
        output = response.choices[0].message.content.lower()
        
        passed = True
        issues = []
        
        if test.must_contain:
            for phrase in test.must_contain:
                if phrase.lower() not in output:
                    passed = False
                    issues.append(f"Missing: '{phrase}'")
        
        if test.must_not_contain:
            for phrase in test.must_not_contain:
                if phrase.lower() in output:
                    passed = False
                    issues.append(f"Contains: '{phrase}'")
        
        results.append({
            "name": test.name,
            "passed": passed,
            "issues": issues
        })
    
    return results

# Define tests
tests = [
    PromptTest(
        name="Basic positive sentiment",
        input="I love this product!",
        must_contain=["positive"]
    ),
    PromptTest(
        name="Negative sentiment",
        input="This is terrible and I want a refund",
        must_contain=["negative"]
    ),
    PromptTest(
        name="Professional tone",
        input="What's your return policy?",
        must_not_contain=["dude", "awesome", "!!!"]
    ),
]

# Run
prompt = "Analyze this customer message:\n\n{input}"
results = test_prompt(prompt, tests)

print("Test Results:")
for r in results:
    status = "✅" if r["passed"] else "❌"
    print(f"{status} {r['name']}")
    for issue in r["issues"]:
        print(f"   - {issue}")
```

---

## ✅ Knowledge Check

### Question 1
What is regression testing for prompts?

A) Testing new features  
B) Ensuring changes don't break existing behavior  
C) Testing under load  
D) User acceptance testing  

**Correct Answer**: B

---

*You've completed Lesson 4.2! You can now test prompts systematically.*
