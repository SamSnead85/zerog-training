# Lesson 1.3: The Fine-Tuning Process

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 1 - Fine-Tuning Fundamentals

---

## 📚 Reading Material

### Process Overview

```
[Data Collection] → [Preparation] → [Training] → [Evaluation] → [Deployment]
      ↑                                              |
      └──────────── Iterate ←────────────────────────┘
```

### Step 1: Data Collection

Sources for training examples:
- Existing production logs
- Human-labeled examples
- Synthetic data from larger models
- Domain expert creation

### Step 2: Data Preparation

Format for OpenAI:
```json
{"messages": [
  {"role": "system", "content": "You are..."},
  {"role": "user", "content": "Input"},
  {"role": "assistant", "content": "Expected output"}
]}
```

### Step 3: Training

```python
from openai import OpenAI
client = OpenAI()

# Upload file
file = client.files.create(
    file=open("training.jsonl", "rb"),
    purpose="fine-tune"
)

# Start training
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18"
)
```

### Step 4: Evaluation

Compare against baseline:
```python
def evaluate(test_set, base_model, fine_tuned_model):
    base_scores = []
    ft_scores = []
    
    for example in test_set:
        base_out = base_model(example.input)
        ft_out = fine_tuned_model(example.input)
        
        base_scores.append(score(base_out, example.expected))
        ft_scores.append(score(ft_out, example.expected))
    
    return {
        "base_accuracy": mean(base_scores),
        "ft_accuracy": mean(ft_scores)
    }
```

### Step 5: Deployment

```python
# Use just like base model
response = client.chat.completions.create(
    model="ft:gpt-4o-mini:my-org:custom-model:id",
    messages=[...]
)
```

---

## 🎬 Video Script

**[INTRO - Process diagram]**

Fine-tuning is a process: collect, prepare, train, evaluate, deploy. Let me walk you through each step.

**[CUT TO: Data formats]**

Data format is critical. Messages with system, user, assistant roles. One example per line, JSONL format.

**[CUT TO: Training code]**

Upload your file, start the job. OpenAI handles infrastructure. Takes minutes to hours.

**[CUT TO: Evaluation]**

Always compare to baseline. Did fine-tuning actually improve things? Measure on held-out test set.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What's the minimum process for fine-tuning?

A) Just run training  
B) Data → Training → Evaluation → Deployment  
C) Only evaluation  
D) Pre-training first  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand fine-tuning fundamentals.*
