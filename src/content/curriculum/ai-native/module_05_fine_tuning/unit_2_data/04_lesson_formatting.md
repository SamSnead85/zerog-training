# Lesson 2.4: Formatting for Training

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 2 - Data Preparation

---

## 📚 Reading Material

### OpenAI Format

Chat format (JSONL):
```json
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

### Conversion Script

```python
import json

def convert_to_openai_format(examples, system_prompt):
    formatted = []
    for ex in examples:
        formatted.append({
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": ex["input"]},
                {"role": "assistant", "content": ex["output"]}
            ]
        })
    
    with open("training.jsonl", "w") as f:
        for item in formatted:
            f.write(json.dumps(item) + "\n")
```

### Hugging Face Format

```python
from datasets import Dataset

data = {
    "instruction": [...],
    "input": [...],
    "output": [...]
}
dataset = Dataset.from_dict(data)
dataset.push_to_hub("my-fine-tune-data")
```

### Validation

```python
# OpenAI validation
from openai import OpenAI
client = OpenAI()

# Check format before upload
for line in open("training.jsonl"):
    example = json.loads(line)
    assert "messages" in example
    assert len(example["messages"]) >= 2
```

---

## 🎬 Video Script

**[INTRO - Format comparison]**

Each platform has specific format requirements. Let me show you the essentials.

**[CUT TO: OpenAI format]**

OpenAI: JSONL with messages array. System, user, assistant roles. One example per line.

**[CUT TO: Conversion]**

Convert your raw data with a simple script. Validate before upload.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What format does OpenAI fine-tuning require?

A) CSV  
B) JSONL with messages array  
C) Plain text  
D) XML  

**Correct Answer**: B

---

*Congratulations on completing Unit 2! You can prepare datasets.*
