# Lesson 2.2: Data Collection Strategies

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Data Preparation

---

## 📚 Reading Material

### Collection Methods

**Production Logs**:
```python
# Mine existing interactions
successful_examples = filter(
    logs,
    lambda x: x.user_rating >= 4 and x.task_completed
)
```

**Human Labeling**:
- Domain experts write examples
- Quality over quantity
- Establish clear guidelines

**Synthetic Generation**:
```python
def generate_synthetic(prompt, n=100):
    examples = []
    for _ in range(n):
        input_var = generate_variation(base_input)
        output = gpt4.generate(prompt + input_var)
        examples.append((input_var, output))
    return examples
```

**Distillation**:
Use a powerful model to generate training data:
```python
# GPT-4 generates, fine-tune GPT-4o-mini to match
teacher_output = gpt4(input)
training_example = {"input": input, "output": teacher_output}
```

### Quality Control

Every example should be:
- Correct (factually accurate)
- Complete (full response)
- Consistent (same style throughout)
- Clear (unambiguous)

---

## 🎬 Video Script

**[INTRO - Collection methods]**

Where do training examples come from? Multiple sources, each with tradeoffs.

**[CUT TO: Production logs]**

Production logs: filter for successful interactions. Real data, real distribution.

**[CUT TO: Synthetic]**

Synthetic generation: use GPT-4 to create training examples for smaller models. Distillation works.

**[CUT TO: Quality]**

Every example must be correct, complete, consistent, clear. Bad examples teach bad behavior.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is distillation in fine-tuning?

A) Removing water  
B) Using a larger model to generate training data for a smaller model  
C) Data compression  
D) Cleaning data  

**Correct Answer**: B
