# Lesson: Fine-Tuning Data Preparation

## Overview

In this lesson, you'll learn how to prepare high-quality training data for fine-tuning LLMs. Data quality is the single biggest factor determining fine-tuning success.

**Duration**: 25 minutes  
**Prerequisites**: Module 7 Lesson 1 (Fine-Tuning Decision Framework)

## Learning Objectives

By the end of this lesson, you will:
- Structure training data in the correct format
- Apply quality criteria to filter examples
- Balance dataset composition for best results
- Handle edge cases and negative examples
- Validate data before training

---

## Why Data Quality Matters

Fine-tuning amplifies patterns in your data—good and bad.

```
High-Quality Data → Model learns desired behavior
Low-Quality Data  → Model learns to be inconsistent

Garbage In = Garbage Out (amplified)
```

**Real-world observation**: 100 excellent examples often outperform 1,000 mediocre ones.

---

## Data Format

### OpenAI Fine-Tuning Format

```jsonl
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

### Single Example Structure

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer support agent for TechCorp. Help users with product questions professionally and concisely."
    },
    {
      "role": "user", 
      "content": "How do I reset my password?"
    },
    {
      "role": "assistant",
      "content": "Here's how to reset your password:\n\n1. Go to techcorp.com/login\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your inbox for the reset link\n\nThe link expires in 24 hours. Need any other help?"
    }
  ]
}
```

### Multi-Turn Conversation Example

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer support agent for TechCorp."
    },
    {
      "role": "user",
      "content": "I can't log in"
    },
    {
      "role": "assistant",
      "content": "I'd be happy to help you log in. Could you tell me what happens when you try? Do you see an error message?"
    },
    {
      "role": "user",
      "content": "It says invalid password"
    },
    {
      "role": "assistant",
      "content": "That error usually means the password doesn't match our records. Here are your options:\n\n1. **Reset password**: Click 'Forgot Password' on the login page\n2. **Check caps lock**: Make sure it's not on\n3. **Try another browser**: Sometimes cached data causes issues\n\nWould you like me to send a password reset link to your email?"
    }
  ]
}
```

---

## Quality Criteria

### The GREAT Framework

Evaluate each example against:

**G - Grammar**
```
✅ "Here's how to reset your password:"
❌ "here is how 2 reset ur password"
```

**R - Relevant**
```
✅ Directly addresses the user's question
❌ Includes tangential information
```

**E - Example of ideal behavior**
```
✅ The response you want the model to produce
❌ "Good enough" or placeholder responses
```

**A - Accurate**
```
✅ Factually correct information
❌ Outdated or wrong details
```

**T - Tone-appropriate**
```
✅ Matches your brand voice
❌ Inconsistent formality or style
```

---

## Data Validation Script

```python
import json
from dataclasses import dataclass

@dataclass
class ValidationResult:
    valid: bool
    issues: list[str]
    example_id: int

def validate_example(example: dict, idx: int) -> ValidationResult:
    """Validate a single training example."""
    issues = []
    
    # Check structure
    if "messages" not in example:
        issues.append("Missing 'messages' key")
        return ValidationResult(False, issues, idx)
    
    messages = example["messages"]
    
    if len(messages) < 2:
        issues.append("Need at least user + assistant messages")
    
    # Check roles
    roles = [m.get("role") for m in messages]
    
    if roles[-1] != "assistant":
        issues.append("Must end with assistant message")
    
    if "user" not in roles:
        issues.append("Missing user message")
    
    # Check content quality
    for msg in messages:
        content = msg.get("content", "")
        
        # Too short
        if len(content) < 10:
            issues.append(f"Short {msg['role']} message: {len(content)} chars")
        
        # Too long
        if len(content) > 10000:
            issues.append(f"Very long {msg['role']} message: {len(content)} chars")
        
        # Problematic patterns
        if msg["role"] == "assistant":
            if "I cannot" in content and "help" not in content.lower():
                issues.append("Refusal without helpfulness")
            
            if content.startswith("As an AI"):
                issues.append("Avoid 'As an AI' patterns")
    
    # Check for duplicates (content)
    contents = [m["content"] for m in messages if m["role"] == "user"]
    if len(contents) != len(set(contents)):
        issues.append("Duplicate user messages in conversation")
    
    return ValidationResult(
        valid=len(issues) == 0,
        issues=issues,
        example_id=idx
    )


def validate_dataset(filepath: str) -> dict:
    """Validate entire training dataset."""
    results = {
        "total": 0,
        "valid": 0,
        "invalid": 0,
        "issues": []
    }
    
    with open(filepath) as f:
        for idx, line in enumerate(f):
            example = json.loads(line)
            result = validate_example(example, idx)
            
            results["total"] += 1
            if result.valid:
                results["valid"] += 1
            else:
                results["invalid"] += 1
                results["issues"].append({
                    "line": idx + 1,
                    "issues": result.issues
                })
    
    results["valid_pct"] = round(results["valid"] / results["total"] * 100, 1)
    
    return results


# Usage
results = validate_dataset("training_data.jsonl")
print(f"Valid: {results['valid_pct']}%")
for issue in results["issues"][:5]:
    print(f"Line {issue['line']}: {issue['issues']}")
```

---

## Dataset Composition

### Balancing Example Types

```
Ideal Distribution:
├── 60% - Common scenarios (happy path)
├── 20% - Edge cases and variations
├── 10% - Error handling and clarifications
└── 10% - Boundary enforcement (refusals)
```

### Why Include Each Type

**Common scenarios (60%)**
- The behaviors you want most often
- Cover your primary use cases

**Edge cases (20%)**
- Unusual but valid requests
- Variations in phrasing

**Error handling (10%)**
- How to respond when confused
- Asking for clarification gracefully

**Boundary enforcement (10%)**
- Out-of-scope requests
- How to decline appropriately

---

## Handling Edge Cases

### Refusal Examples

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer support agent for TechCorp."
    },
    {
      "role": "user",
      "content": "Can you help me hack into someone's account?"
    },
    {
      "role": "assistant",
      "content": "I can't help with that request, as it would violate others' privacy and our terms of service.\n\nIf you're having trouble accessing your own account, I'd be happy to help you recover it through our secure process. Would you like me to explain how?"
    }
  ]
}
```

**Key elements:**
1. Clear refusal
2. Brief reason
3. Redirect to legitimate help
4. Keep tone professional

### Confusion/Clarification Examples

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer support agent for TechCorp."
    },
    {
      "role": "user",
      "content": "it doesn't work"
    },
    {
      "role": "assistant",
      "content": "I'd like to help you fix that! To get started, could you tell me:\n\n1. Which product or feature isn't working?\n2. What happens when you try to use it?\n3. Have you seen any error messages?\n\nThis will help me point you to the right solution."
    }
  ]
}
```

---

## Data Deduplication

Remove near-duplicates that don't add value:

```python
from difflib import SequenceMatcher

def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()

def deduplicate(examples: list, threshold: float = 0.85) -> list:
    """Remove examples that are too similar."""
    unique = []
    
    for example in examples:
        # Get user message content
        user_content = next(
            (m["content"] for m in example["messages"] if m["role"] == "user"),
            ""
        )
        
        # Check against existing
        is_duplicate = False
        for existing in unique:
            existing_content = next(
                (m["content"] for m in existing["messages"] if m["role"] == "user"),
                ""
            )
            
            if similarity(user_content, existing_content) > threshold:
                is_duplicate = True
                break
        
        if not is_duplicate:
            unique.append(example)
    
    return unique

# Usage
cleaned = deduplicate(examples)
print(f"Reduced from {len(examples)} to {len(cleaned)} examples")
```

---

## How Much Data?

### Guidelines by Use Case

| Goal | Minimum | Recommended |
|------|---------|-------------|
| Format adherence | 50 | 100-200 |
| Style/tone transfer | 100 | 300-500 |
| Domain vocabulary | 300 | 500-1000 |
| Complex behavior | 500 | 1000-5000 |

### Signs You Need More Data

- Inconsistent behavior across similar inputs
- Model falls back to base model patterns
- Poor performance on variations

### Signs You Need Better Data

- Model replicates specific errors from training
- Strange or inappropriate responses
- Degrades on topics not in training set

---

## Pre-Training Checklist

Before starting fine-tuning:

```markdown
## Data Validation
- [ ] All examples pass format validation
- [ ] No duplicate examples (>85% similarity)
- [ ] System prompts are consistent
- [ ] All assistant responses end conversations appropriately

## Quality Check
- [ ] Reviewed random sample (20+ examples)
- [ ] No factual errors in responses
- [ ] Tone is consistent across examples
- [ ] Edge cases are covered

## Composition
- [ ] Mix of common and edge cases
- [ ] Refusal examples included
- [ ] Clarification examples included
- [ ] No personally identifiable information

## Technical
- [ ] File is valid JSONL
- [ ] Under token limits per example
- [ ] Backup of data saved
```

---

## Key Takeaways

1. **Quality over quantity**: 100 great examples beat 1,000 mediocre ones
2. **Use GREAT framework**: Grammar, Relevant, Example, Accurate, Tone
3. **Balance composition**: 60% common, 20% edge, 20% boundaries
4. **Validate before training**: Automated checks catch obvious issues
5. **Include negatives**: Show the model what NOT to do
6. **Deduplicate**: Similar examples waste training budget

---

## Next Steps

- **Lab**: Build a data validation pipeline
- **Next Lesson**: Running and monitoring fine-tuning jobs
- **Advanced**: Synthetic data generation for fine-tuning
