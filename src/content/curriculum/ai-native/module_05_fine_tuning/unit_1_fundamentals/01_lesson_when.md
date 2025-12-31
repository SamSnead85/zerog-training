# Lesson 1.1: When to Fine-Tune

> **Duration**: 45 minutes | **Type**: Strategic
> **Unit**: 1 - Fine-Tuning Fundamentals

---

## 📚 Reading Material

### What Fine-Tuning Does

Fine-tuning trains a pre-trained model on your specific data to:
- Learn domain-specific knowledge
- Adopt a particular style or tone
- Improve at specific task types
- Reduce prompt engineering effort

### When Fine-Tuning Makes Sense

✅ **Good candidates**:
- Consistent output format requirements
- Domain-specific terminology/jargon
- Specific writing style or tone
- High-volume, repetitive tasks
- Performance on narrow task types

### When NOT to Fine-Tune

❌ **Bad candidates**:
- Need for current information → Use RAG
- One-off tasks → Use prompting
- Frequently changing requirements → Use prompts
- Need to explain reasoning → Use CoT
- Limited training data (<50 examples)

### The Decision Framework

```
1. Can prompting + few-shot solve it?
   YES → Don't fine-tune
   NO → Continue

2. Is the issue knowledge/facts?
   YES → Use RAG
   NO → Continue

3. Is the issue style/format/behavior?
   YES → Fine-tuning may help
   NO → Re-examine the problem

4. Do you have 100+ quality examples?
   YES → Fine-tuning is feasible
   NO → Collect more data first
```

### Cost-Benefit Analysis

| Factor | Fine-Tuning | Prompting |
|--------|-------------|-----------|
| Upfront cost | High (training) | Low |
| Per-call cost | Lower tokens | Higher tokens |
| Maintenance | Retrain for updates | Edit prompts |
| Flexibility | Fixed behavior | Easily changed |

**Break-even**: Fine-tuning often makes sense at >10K calls/month.

---

## 🎬 Video Script

**[INTRO - Decision diagram]**

Fine-tuning isn't always the answer. Let me show you when it makes sense.

**[CUT TO: Good candidates]**

Good for: consistent format, domain jargon, specific style, high-volume tasks. The model learns patterns from your examples.

**[CUT TO: Bad candidates]**

Bad for: current info needs (use RAG), one-off tasks (use prompts), frequently changing requirements. Fine-tuning bakes in behavior.

**[CUT TO: Decision framework]**

Ask: Can prompting solve it? Is it a knowledge problem (RAG) or behavior problem (fine-tuning)? Do you have enough data?

**[CUT TO: Cost analysis]**

Economics matter. High upfront cost, lower per-call cost. Calculate your break-even based on volume.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
When should you use RAG instead of fine-tuning?

A) For consistent formatting  
B) When the model needs current/specific factual knowledge  
C) For style changes  
D) For high-volume tasks  

**Correct Answer**: B

**Explanation**: RAG retrieves current/specific information. Fine-tuning teaches behavior/style, not facts.

---

### Question 2
What's the minimum recommended examples for fine-tuning?

A) 10  
B) 50-100  
C) 10,000  
D) 1 million  

**Correct Answer**: B

**Explanation**: OpenAI recommends minimum 50-100 examples. More is better, especially for complex tasks.

---

*You've completed Lesson 1.1! You know when to fine-tune.*
