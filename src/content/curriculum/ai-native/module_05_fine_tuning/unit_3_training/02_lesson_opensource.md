# Lesson 3.2: Open-Source Fine-Tuning

> **Duration**: 60 minutes | **Type**: Technical
> **Unit**: 3 - Training

---

## 📚 Reading Material

### When Open-Source

- Data privacy requirements
- Cost control at scale
- Custom model architectures
- On-premises deployment

### Hugging Face Transformers

```python
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer
)

# Load model
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# Training arguments
args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-5,
    save_steps=500
)

# Train
trainer = Trainer(
    model=model,
    args=args,
    train_dataset=train_data,
    tokenizer=tokenizer
)
trainer.train()
```

### Popular Base Models

| Model | Size | Use Case |
|-------|------|----------|
| Llama 3.1 | 8B-405B | General |
| Mistral | 7B | Efficient |
| Phi-3 | 4B | Small footprint |
| Qwen | 7B-72B | Multilingual |

### Hardware Requirements

| Model Size | Min GPU RAM | Recommended |
|------------|-------------|-------------|
| 7B | 16GB | 24GB A10 |
| 13B | 40GB | 80GB A100 |
| 70B | 320GB | 8x A100 |

---

## 🎬 Video Script

**[INTRO - Open-source ecosystem]**

OpenAI isn't the only option. Open-source gives you control, privacy, and lower costs.

**[CUT TO: Hugging Face]**

Hugging Face Transformers: load model, define training args, train. Similar to OpenAI but you run infrastructure.

**[CUT TO: Hardware]**

Hardware matters. 7B models fit on consumer GPUs. 70B needs A100 clusters. Plan accordingly.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
When should you use open-source instead of OpenAI?

A) Always  
B) When you need data privacy or cost control at scale  
C) Never  
D) Only for chatbots  

**Correct Answer**: B
