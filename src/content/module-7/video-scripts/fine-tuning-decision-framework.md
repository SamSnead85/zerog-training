# Video Script: Module 7 - Fine-Tuning Decision Framework

## Video Overview
- **Title**: When and How to Fine-Tune LLMs
- **Duration**: 11 minutes
- **Target Audience**: ML engineers and AI developers
- **Learning Objectives**: Fine-tuning vs alternatives, data prep, evaluation

---

## Scene 1: The Fine-Tuning Question (0:00 - 1:00)

### Visuals
- Decision crossroads animation
- Common questions appearing

### Narration
"Should you fine-tune? It's one of the most common questions I get. The answer is usually 'no'—but sometimes, fine-tuning is exactly what you need. Let me show you when it makes sense and how to do it right."

---

## Scene 2: Fine-Tuning vs Alternatives (1:00 - 3:00)

### Visuals
- Comparison spectrum animation
- Cost/effort trade-off visualization

### Narration
"Before fine-tuning, consider your options. Start with the easiest solution that works."

### Options Spectrum
```
Effort/Cost:  Low ────────────────────────────────► High

┌─────────┐ ┌───────────┐ ┌─────┐ ┌───────────┐ ┌──────────┐
│ Prompt  │ │ Few-Shot  │ │ RAG │ │Fine-Tuning│ │Train from│
│Engineer │ │ Examples  │ │     │ │           │ │ Scratch  │
└─────────┘ └───────────┘ └─────┘ └───────────┘ └──────────┘

Start here ─────────────────────────► Only if necessary
```

### Decision Table
| "I want to..." | Solution |
|----------------|----------|
| Add knowledge that changes | RAG |
| Change output style/format | Fine-tuning or Few-shot |
| Learn domain vocabulary | Fine-tuning |
| Reduce response latency | Fine-tuning (smaller model) |
| Update factual knowledge | RAG (NOT fine-tuning) |

### Key Insight
"RAG keeps knowledge updatable. Fine-tuning bakes it in permanently. Choose wisely."

---

## Scene 3: When Fine-Tuning Wins (3:00 - 4:30)

### Visuals
- Use case examples with checkmarks
- Before/after quality comparison

### Narration
"Fine-tuning shines in specific scenarios. Here's when it's the right choice."

### Good Use Cases
1. **Domain-Specific Language**
   - Medical terminology
   - Legal jargon
   - Company-specific terms

2. **Consistent Output Format**
   - Always output valid JSON
   - Specific template adherence
   - Structured data extraction

3. **Style and Tone**
   - Brand voice
   - Formality level
   - Writing style

4. **Model Distillation**
   - Train GPT-4o mini to match GPT-4 quality
   - Reduce costs by 90%+
   - Keep quality high

### Bad Use Cases
- Adding factual knowledge (use RAG)
- One-off customizations (use prompts)
- Rapidly changing information
- Small datasets (<50 examples)

---

## Scene 4: Preparing Training Data (4:30 - 7:00)

### Visuals
- Data format structure
- Quality checklist animation

### Narration
"Data quality makes or breaks fine-tuning. Let me show you exactly how to prepare your training data."

### Data Format (OpenAI)
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer service agent for TechCorp."
    },
    {
      "role": "user",
      "content": "How do I reset my password?"
    },
    {
      "role": "assistant",
      "content": "I'd be happy to help! Here's how to reset your password:\n\n1. Go to techcorp.com/login\n2. Click 'Forgot Password'\n3. Enter your email\n4. Check your inbox for the reset link\n\nNeed any other help?"
    }
  ]
}
```

### Data Quality Checklist
```python
def validate_example(example: dict) -> list[str]:
    issues = []
    messages = example.get("messages", [])
    
    # Check structure
    if len(messages) < 2:
        issues.append("Need user + assistant messages")
    
    # Check roles
    if messages[-1]["role"] != "assistant":
        issues.append("Must end with assistant")
    
    # Check content quality
    for msg in messages:
        if len(msg["content"]) < 10:
            issues.append(f"Short {msg['role']} message")
        
        if msg["role"] == "assistant":
            if "I cannot" in msg["content"]:
                issues.append("Avoid refusal examples")
    
    return issues
```

### How Much Data?
| Goal | Minimum | Recommended |
|------|---------|-------------|
| Format adherence | 50 | 100-200 |
| Style transfer | 100 | 300-500 |
| Domain expertise | 500 | 1000+ |
| Complex behavior | 1000+ | 5000+ |

### Quality > Quantity
"100 excellent examples beat 1,000 mediocre ones. The model learns patterns—bad examples teach bad habits."

---

## Scene 5: Running Fine-Tuning (7:00 - 8:30)

### Visuals
- API workflow animation
- Training progress dashboard

### Narration
"Let's fine-tune a model. Here's the complete workflow."

### Complete Workflow
```python
from openai import OpenAI
import json

client = OpenAI()

# 1. Prepare data file (JSONL format)
def prepare_training_file(examples: list, filename: str):
    with open(filename, 'w') as f:
        for example in examples:
            f.write(json.dumps(example) + '\n')
    return filename

# 2. Upload to OpenAI
def upload_file(filename: str):
    with open(filename, 'rb') as f:
        return client.files.create(file=f, purpose='fine-tune')

# 3. Start fine-tuning
def start_fine_tuning(file_id: str):
    return client.fine_tuning.jobs.create(
        training_file=file_id,
        model="gpt-4o-mini-2024-07-18",
        suffix="customer-support",
        hyperparameters={
            "n_epochs": 3,
        }
    )

# 4. Monitor progress
def check_status(job_id: str):
    job = client.fine_tuning.jobs.retrieve(job_id)
    print(f"Status: {job.status}")
    if job.status == "succeeded":
        print(f"Model: {job.fine_tuned_model}")
    return job

# Typical timeline: 10-30 minutes for small datasets
```

### Using Your Fine-Tuned Model
```python
# Just change the model name!
response = client.chat.completions.create(
    model="ft:gpt-4o-mini-2024-07-18:org:customer-support:abc123",
    messages=[
        {"role": "user", "content": "How do I reset my password?"}
    ]
)
```

---

## Scene 6: Evaluation (8:30 - 10:00)

### Visuals
- Evaluation metrics dashboard
- A/B comparison results

### Narration
"Did it work? You need to measure. Here's how to evaluate your fine-tuned model."

### Evaluation Framework
```python
def evaluate(model_name: str, test_cases: list) -> dict:
    results = {"passed": 0, "failed": 0, "scores": []}
    
    for test in test_cases:
        response = client.chat.completions.create(
            model=model_name,
            messages=test["messages"]
        )
        
        actual = response.choices[0].message.content
        
        # Check for required patterns
        passed = all(
            pattern.lower() in actual.lower()
            for pattern in test.get("required_patterns", [])
        )
        
        results["passed" if passed else "failed"] += 1
        
        # Also use LLM-as-judge for quality
        score = judge_quality(test["messages"][-1]["content"], actual)
        results["scores"].append(score)
    
    results["pass_rate"] = results["passed"] / len(test_cases)
    results["avg_score"] = sum(results["scores"]) / len(results["scores"])
    
    return results
```

### Key Metrics
1. **Task Pass Rate**: Does it complete the task correctly?
2. **Format Compliance**: Does it output the right format?
3. **Quality Score**: How good are the responses? (LLM-as-judge)
4. **Regression Check**: Did it break anything?

---

## Scene 7: Cost Analysis (10:00 - 10:45)

### Visuals
- ROI calculator animation
- Break-even chart

### Narration
"Is fine-tuning worth it financially? Let's do the math."

### Cost Comparison
| Model | Input Cost | Output Cost | Fine-Tuning Cost |
|-------|------------|-------------|------------------|
| GPT-4o | $2.50/M | $10/M | $25/M training |
| GPT-4o mini | $0.15/M | $0.60/M | $3/M training |

### ROI Example
```
Scenario: 100K requests/month

Before (GPT-4o):
  100K × $0.005 average = $500/month

After (Fine-tuned GPT-4o mini):
  Training: $3 × 0.5M tokens = $1.50 (one-time)
  Running: 100K × $0.0003 = $30/month

Savings: $470/month = 94% reduction!
Break-even: Day 1
```

---

## Scene 8: Conclusion (10:45 - 11:00)

### Visuals
- Decision tree summary
- Key takeaways

### Narration
"Fine-tuning is powerful but not always necessary. Start with prompts and RAG. Fine-tune when you need consistent style, format, or domain expertise. And always—always—measure the results."

### Decision Flow
```
Need to add knowledge? → RAG
Need consistent style? → Fine-tune
Need format guarantee? → Fine-tune
Have <50 examples? → Few-shot prompting
Need it updatable? → RAG
```

### Final Screen
- "Fine-Tune Thoughtfully"
- "Next: Enterprise AI Architecture"
- ScaledNative branding

---

## Production Notes

### Key Visuals
- Decision tree animation
- Cost comparison charts
- Training progress simulation

### Live Demo Ideas
- Show training job status
- Compare base vs fine-tuned responses
- Demonstrate cost calculator
