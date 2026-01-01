# Lesson 7.1: When and How to Fine-Tune

## Introduction

Fine-tuning means further training a pre-trained model on your specific data. But with powerful base models and techniques like RAG, when does fine-tuning actually make sense? This lesson covers the decision framework and practical approaches to fine-tuning LLMs.

## Fine-Tuning vs. Alternatives

### The Options Spectrum

```
┌───────────────────────────────────────────────────────────────────┐
│  Effort/Cost                                                       │
│     Low                                         High               │
│      │                                            │                │
│      ▼                                            ▼                │
│  ┌────────┐ ┌───────────┐ ┌───────┐ ┌───────────┐ ┌──────────┐   │
│  │Prompt  │ │ Few-Shot  │ │  RAG  │ │Fine-Tuning│ │Train from│   │
│  │Engineering│ │Examples │ │       │ │           │ │ Scratch  │   │
│  └────────┘ └───────────┘ └───────┘ └───────────┘ └──────────┘   │
│                                                                    │
│  Start here ───────────────────────────────► Only if necessary    │
└───────────────────────────────────────────────────────────────────┘
```

### Decision Framework

| Want to... | Solution |
|------------|----------|
| Add knowledge | RAG (not fine-tuning) |
| Change style/format | Fine-tuning OR few-shot |
| Learn domain vocabulary | Fine-tuning |
| Reduce latency | Fine-tuning (smaller model) |
| Reduce cost | Fine-tuning (smaller model) |
| Teach new behaviors | Fine-tuning |
| Update factual knowledge | RAG (not fine-tuning) |

> **Pro Tip**: RAG keeps knowledge updatable. Fine-tuning bakes knowledge in—great for stable patterns, bad for changing facts.

## When Fine-Tuning Makes Sense

### Good Use Cases

1. **Domain-specific language**: Legal, medical, or technical jargon
2. **Specific output format**: Always output valid JSON for your schema
3. **Consistent style/tone**: Brand voice, formality level
4. **Distillation**: Transfer GPT-4 quality to cheaper models
5. **Latency reduction**: Fine-tune smaller model to match larger model

### Bad Use Cases

1. **Adding new knowledge**: Use RAG instead
2. **One-off customizations**: Use prompt engineering
3. **Rapidly changing information**: Can't update quickly
4. **Very small datasets**: Few-shot works better

## Preparing Training Data

### Data Format (OpenAI)

```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful customer service agent for TechCorp."},
    {"role": "user", "content": "How do I reset my password?"},
    {"role": "assistant", "content": "I'd be happy to help you reset your password! Here's how:\n\n1. Go to techcorp.com/login\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your inbox for a reset link\n\nThe link expires in 24 hours. Need anything else?"}
  ]
}
```

### Data Quality Checklist

```python
def validate_training_example(example: dict) -> list[str]:
    """Validate a training example for fine-tuning."""
    issues = []
    
    messages = example.get("messages", [])
    
    # Check structure
    if len(messages) < 2:
        issues.append("Need at least user + assistant message")
    
    # Check roles
    roles = [m["role"] for m in messages]
    if "assistant" not in roles:
        issues.append("Missing assistant response")
    if roles[-1] != "assistant":
        issues.append("Should end with assistant message")
    
    # Check content quality
    for msg in messages:
        content = msg.get("content", "")
        
        if len(content) < 10:
            issues.append(f"Very short {msg['role']} message")
        
        if msg["role"] == "assistant":
            # Check assistant response quality
            if content.lower().startswith("i cannot"):
                issues.append("Avoid refusal examples unless intentional")
            if len(content) < 50:
                issues.append("Assistant response may be too brief")
    
    return issues


def prepare_dataset(examples: list[dict]) -> list[dict]:
    """Prepare and validate training dataset."""
    valid_examples = []
    
    for i, example in enumerate(examples):
        issues = validate_training_example(example)
        
        if issues:
            print(f"Example {i} issues: {issues}")
        else:
            valid_examples.append(example)
    
    print(f"Valid examples: {len(valid_examples)}/{len(examples)}")
    return valid_examples
```

### How Much Data?

| Goal | Minimum Examples | Recommended |
|------|------------------|-------------|
| Format adherence | 50 | 100-200 |
| Style transfer | 100 | 300-500 |
| Domain expertise | 500 | 1000+ |
| Complex behavior | 1000+ | 5000+ |

## Fine-Tuning with OpenAI

```python
from openai import OpenAI
import json

client = OpenAI()

def prepare_file(examples: list[dict], filename: str):
    """Prepare training file in JSONL format."""
    with open(filename, 'w') as f:
        for example in examples:
            f.write(json.dumps(example) + '\n')
    return filename


def fine_tune(training_file: str, model: str = "gpt-4o-mini-2024-07-18",
              suffix: str = "custom") -> str:
    """Launch a fine-tuning job."""
    
    # Upload training file
    with open(training_file, 'rb') as f:
        file_response = client.files.create(
            file=f,
            purpose='fine-tune'
        )
    
    # Create fine-tuning job
    job = client.fine_tuning.jobs.create(
        training_file=file_response.id,
        model=model,
        suffix=suffix,
        hyperparameters={
            "n_epochs": 3,
            "batch_size": "auto",
            "learning_rate_multiplier": "auto"
        }
    )
    
    print(f"Fine-tuning job created: {job.id}")
    return job.id


def check_status(job_id: str):
    """Check fine-tuning job status."""
    job = client.fine_tuning.jobs.retrieve(job_id)
    
    print(f"Status: {job.status}")
    print(f"Trained tokens: {job.trained_tokens}")
    
    if job.status == "succeeded":
        print(f"Fine-tuned model: {job.fine_tuned_model}")
        return job.fine_tuned_model
    
    if job.status == "failed":
        print(f"Error: {job.error}")
    
    return None


# Usage
examples = [
    {"messages": [
        {"role": "system", "content": "You are TechCorp support."},
        {"role": "user", "content": "Reset password"},
        {"role": "assistant", "content": "I'll help you reset..."}
    ]},
    # ... more examples
]

prepare_file(examples, "training.jsonl")
job_id = fine_tune("training.jsonl", suffix="techcorp-support")

# Check later
model_name = check_status(job_id)
# Returns: "ft:gpt-4o-mini-2024-07-18:org:techcorp-support:abc123"
```

## Using Your Fine-Tuned Model

```python
def use_fine_tuned_model(model_name: str, user_message: str) -> str:
    """Use the fine-tuned model."""
    
    response = client.chat.completions.create(
        model=model_name,  # Your fine-tuned model name
        messages=[
            {"role": "system", "content": "You are TechCorp support."},
            {"role": "user", "content": user_message}
        ]
    )
    
    return response.choices[0].message.content


# Example
model = "ft:gpt-4o-mini-2024-07-18:org:techcorp-support:abc123"
response = use_fine_tuned_model(model, "How do I reset my password?")
```

## Evaluation: Did It Work?

### Automated Evaluation

```python
def evaluate_fine_tuned_model(model_name: str, 
                               test_cases: list[dict]) -> dict:
    """Evaluate fine-tuned model against test cases."""
    
    results = {
        "total": len(test_cases),
        "passed": 0,
        "failed": 0,
        "scores": []
    }
    
    for test in test_cases:
        response = client.chat.completions.create(
            model=model_name,
            messages=test["messages"]
        )
        
        actual = response.choices[0].message.content
        expected_patterns = test.get("expected_patterns", [])
        
        # Check if response matches expected patterns
        passed = all(
            pattern.lower() in actual.lower()
            for pattern in expected_patterns
        )
        
        if passed:
            results["passed"] += 1
        else:
            results["failed"] += 1
            results["failures"] = results.get("failures", [])
            results["failures"].append({
                "input": test["messages"][-1]["content"],
                "expected": expected_patterns,
                "actual": actual
            })
    
    results["pass_rate"] = results["passed"] / results["total"]
    return results


# Test cases
tests = [
    {
        "messages": [
            {"role": "system", "content": "You are TechCorp support."},
            {"role": "user", "content": "password reset"}
        ],
        "expected_patterns": ["techcorp.com", "forgot password", "email"]
    }
]

evaluation = evaluate_fine_tuned_model(model_name, tests)
print(f"Pass rate: {evaluation['pass_rate']:.1%}")
```

## Cost Comparison

| Model | Base Cost | Fine-Tuning Cost |
|-------|-----------|------------------|
| GPT-4o mini | $0.15/$0.60 per 1M tokens | $3 per 1M training tokens |
| GPT-4o | $2.50/$10 per 1M tokens | $25 per 1M training tokens |

**ROI calculation**: If fine-tuning lets you use GPT-4o mini instead of GPT-4o, you save ~95% per request after the one-time training cost.

## Key Takeaways

- **Start with prompt engineering and RAG**: Fine-tune only when necessary
- **Best for**: Style, format, domain vocabulary, distillation
- **Not for**: Adding updatable knowledge (use RAG)
- **Data quality > quantity**: 100 excellent examples beat 1000 mediocre ones
- **Evaluate rigorously**: Test before deploying
- **Consider ROI**: Fine-tuning cost vs. long-term savings

## What's Next

In the next lesson, we'll cover **Parameter-Efficient Fine-Tuning (PEFT)** with LoRA—how to fine-tune with less compute and enable multiple customizations.

---

*Estimated completion time: 30 minutes*
*Difficulty: Intermediate*
