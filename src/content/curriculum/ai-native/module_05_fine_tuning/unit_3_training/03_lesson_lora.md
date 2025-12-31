# Lesson 3.3: LoRA and PEFT

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Training

---

## 📚 Reading Material

### What is LoRA?

**Low-Rank Adaptation (LoRA)** trains only a small subset of parameters:
- Original model frozen
- Train small adapter matrices
- 10-100x less memory
- Results comparable to full fine-tuning

### LoRA Implementation

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,                    # Rank
    lora_alpha=32,           # Scaling
    target_modules=["q_proj", "v_proj"],  # Which layers
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

peft_model = get_peft_model(base_model, config)

# Check trainable params
peft_model.print_trainable_parameters()
# "trainable params: 4M || all params: 7B || trainable%: 0.06%"
```

### QLoRA (Quantized LoRA)

Even more memory efficient:
```python
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True
)

model = AutoModelForCausalLM.from_pretrained(
    "model_name",
    quantization_config=bnb_config
)
```

### When to Use LoRA

| Scenario | Full Fine-Tune | LoRA |
|----------|---------------|------|
| Unlimited GPU | ✓ | |
| Consumer GPU | | ✓ |
| Many task variants | | ✓ (swap adapters) |
| Maximum quality | ✓ | |

---

## 🎬 Video Script

**[INTRO - LoRA diagram]**

Full fine-tuning needs massive GPUs. LoRA makes it practical on consumer hardware.

**[CUT TO: How it works]**

LoRA trains small adapter matrices. Original model frozen. 0.1% of parameters trained.

**[CUT TO: QLoRA]**

QLoRA adds quantization. 4-bit model plus LoRA adapters. 70B model on a single GPU.

**[CUT TO: When to use]**

Use LoRA when GPU-constrained or when you need multiple task variations with swappable adapters.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What makes LoRA memory efficient?

A) Smaller models  
B) Trains only small adapter matrices, not full model  
C) Data compression  
D) Faster training  

**Correct Answer**: B
