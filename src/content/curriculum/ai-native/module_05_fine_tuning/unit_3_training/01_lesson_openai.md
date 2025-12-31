# Lesson 3.1: OpenAI Fine-Tuning

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 3 - Training

---

## 📚 Reading Material

### OpenAI Fine-Tuning API

```python
from openai import OpenAI
client = OpenAI()

# 1. Upload training file
file = client.files.create(
    file=open("training.jsonl", "rb"),
    purpose="fine-tune"
)

# 2. Create fine-tuning job
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18",
    hyperparameters={
        "n_epochs": 3,
        "batch_size": "auto",
        "learning_rate_multiplier": "auto"
    }
)

# 3. Monitor progress
events = client.fine_tuning.jobs.list_events(job.id)
for event in events.data:
    print(f"{event.created_at}: {event.message}")

# 4. Check status
job = client.fine_tuning.jobs.retrieve(job.id)
print(f"Status: {job.status}")
print(f"Model: {job.fine_tuned_model}")
```

### Supported Models

| Model | Use Case | Cost |
|-------|----------|------|
| gpt-4o-mini | General, cost-effective | $3/1M tokens |
| gpt-4o | Complex tasks | $25/1M tokens |
| gpt-3.5-turbo | Legacy | Deprecated |

### Using the Fine-Tuned Model

```python
response = client.chat.completions.create(
    model="ft:gpt-4o-mini:my-org:my-model:abc123",
    messages=[
        {"role": "user", "content": "Your prompt here"}
    ]
)
```

### Costs

- Training: ~$8 per 1M tokens
- Inference: ~2x base model price
- Storage: Free (models stored by OpenAI)

---

## 🎬 Video Script

**[INTRO - OpenAI dashboard]**

OpenAI makes fine-tuning simple. Upload data, start job, use model. Let me walk you through.

**[CUT TO: Code walkthrough]**

Four steps: upload file, create job, monitor progress, use the model. The API handles infrastructure.

**[CUT TO: Monitoring]**

Watch job events for progress. Training loss should decrease. Job completes with your model ID.

**[CUT TO: Usage]**

Use like any model—just with your custom model ID. Same API, different behavior.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What do you need to start OpenAI fine-tuning?

A) GPU cluster  
B) Training file in JSONL format  
C) PhD in ML  
D) Kubernetes cluster  

**Correct Answer**: B
