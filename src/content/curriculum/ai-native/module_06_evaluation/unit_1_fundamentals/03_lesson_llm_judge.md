# Lesson 1.3: LLM-as-Judge

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 1 - Evaluation Fundamentals

---

## 📚 Reading Material

### What Is LLM-as-Judge?

Use a powerful LLM to evaluate outputs from your system:

```python
def llm_judge(output, criteria):
    prompt = f"""
Rate this output on a scale of 1-5 for: {criteria}

Output to evaluate:
{output}

Provide:
1. Score (1-5)
2. Brief justification

Format: Score: X | Reason: ...
"""
    return llm(prompt)
```

### When to Use

✅ Good for:
- Subjective quality assessment
- Style/tone evaluation
- Helpfulness rating
- Comparison between outputs

❌ Not for:
- Factual accuracy (judge can be wrong too)
- Security/safety (use specialized tools)
- Deterministic checks (use code)

### Implementation

```python
from openai import OpenAI

client = OpenAI()

def evaluate_with_gpt4(output, reference, criteria):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"""
Evaluate this output against the reference.

Criteria: {criteria}
Reference: {reference}
Output: {output}

Score 1-5 and explain.
"""
        }],
        max_tokens=200
    )
    return response.choices[0].message.content
```

### Best Practices

- Use the best model you can afford as judge
- Provide clear, specific criteria
- Include examples of good/bad scores
- Validate against human judgment periodically
- Consider multiple judgments and average

---

## 🎬 Video Script

**[INTRO - LLM judging diagram]**

LLM-as-Judge uses a powerful model to evaluate outputs. Scales automated evaluation to subjective tasks.

**[CUT TO: Implementation]**

Simple prompt: here's the output, rate it on criteria, provide reasoning. Parse the response.

**[CUT TO: Best practices]**

Use GPT-4 as judge, not the model you're testing. Clear criteria. Validate against humans periodically.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Why use GPT-4 as a judge instead of the model being tested?

A) Cheaper  
B) The judge should be more capable than the test subject  
C) Faster  
D) Required  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand evaluation fundamentals.*
