# Lesson 3.4: Hyperparameter Tuning

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 3 - Training

---

## 📚 Reading Material

### Key Hyperparameters

| Parameter | Description | Typical Range |
|-----------|-------------|---------------|
| **Learning Rate** | Step size | 1e-6 to 1e-4 |
| **Epochs** | Full passes | 1-5 |
| **Batch Size** | Examples per step | 1-32 |
| **Warmup** | LR ramp-up | 0-10% of steps |

### Learning Rate

```python
# Too high: Training unstable, loss spikes
# Too low: Training slow, may not converge
# Just right: Smooth decrease in loss

# Good starting point
learning_rate = 2e-5  # For fine-tuning

# With learning rate finder
from torch_lr_finder import LRFinder
lr_finder = LRFinder(model, optimizer, criterion)
lr_finder.range_test(train_loader, end_lr=1e-2)
lr_finder.plot()
```

### Epochs

```
1 epoch: Quick adaptation, may underfit
3 epochs: Standard for most tasks
5+ epochs: Risk of overfitting

Watch validation loss:
- Decreasing: Keep training
- Increasing: Stop (overfitting)
```

### Batch Size Trade-offs

| Size | Memory | Gradient Quality | Speed |
|------|--------|------------------|-------|
| Small (1-4) | Low | Noisy | Slow |
| Medium (8-16) | Medium | Good | Medium |
| Large (32+) | High | Stable | Fast |

---

## 🎬 Video Script

**[INTRO - Hyperparameter grid]**

Hyperparameters determine training success. Let me show you how to tune them.

**[CUT TO: Learning rate]**

Learning rate is most critical. Too high crashes training. Too low never converges. Start with 2e-5 for fine-tuning.

**[CUT TO: Epochs]**

More epochs = more learning, but also overfitting risk. Watch validation loss. Stop when it starts increasing.

**[CUT TO: Batch size]**

Larger batches are faster but need more memory. Use gradient accumulation to simulate large batches.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
How do you know to stop training?

A) After 10 epochs always  
B) When validation loss starts increasing  
C) When GPU is tired  
D) After 1 hour  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You can execute fine-tuning.*
