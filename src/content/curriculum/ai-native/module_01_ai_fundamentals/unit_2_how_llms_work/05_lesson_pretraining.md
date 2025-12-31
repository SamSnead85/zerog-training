# Lesson 2.5: Pre-Training at Scale

> **Duration**: 45 minutes | **Type**: Technical Deep Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### The Simple Objective That Created Intelligence

Here's perhaps the most remarkable fact about modern AI: the world's most capable language models are trained with a deceptively simple objective: **predict the next token**.

That's it. No complex reward function. No explicit teaching of facts, logic, or reasoning. Just: given a sequence of tokens, predict what comes next.

```
Input: "The capital of France is"
Target: " Paris"

Input: "def fibonacci(n):\n    if n <="
Target: " 1"
```

### Why Next-Token Prediction Works

The task seems trivial, but consider what it requires:

**To predict the next word, you must understand:**
- Grammar and syntax
- Semantics and meaning
- World knowledge (facts, relationships)
- Context and discourse
- Reasoning (to continue logical arguments)
- Style and tone
- Code patterns and logic

The training data implicitly contains all these signals. By training to predict accurately, the model learns them.

### Training Data: The Fuel of Intelligence

Modern LLMs train on unprecedented scales:

| Model | Training Data | Tokens |
|-------|---------------|--------|
| GPT-3 | Internet text, books, Wikipedia | 300B |
| GPT-4 | Undisclosed | ~13T (estimated) |
| Llama 2 | Publicly crawled data | 2T |
| Claude | Books, web, code | Undisclosed |

**Data sources** typically include:
- **Common Crawl**: Raw web pages
- **Books**: Fiction, non-fiction, technical
- **Wikipedia**: Encyclopedic knowledge
- **Code**: GitHub repositories
- **Academic papers**: ArXiv, PubMed
- **Conversations**: Forums, social media (filtered)

**Data curation** is critical:
- Deduplication (same text repeated hurts performance)
- Quality filtering (remove spam, low-quality content)
- Toxicity filtering (reduce harmful content)
- PII removal (privacy protection)

### The Training Process

**Hardware**: Training frontier models requires massive compute:
- Thousands of GPUs (A100, H100)
- Weeks to months of training time
- $10-100M+ in compute costs

**The Training Loop**:
```python
# Simplified training loop (real implementations are far more complex)
for batch in training_data:
    # Forward pass
    logits = model(batch.input_tokens)
    
    # Calculate loss (cross-entropy between predictions and actual next tokens)
    loss = cross_entropy(logits, batch.target_tokens)
    
    # Backward pass
    loss.backward()
    
    # Update weights
    optimizer.step()
```

**Key Hyperparameters**:
- **Learning rate**: How fast to adjust weights (with warmup and decay)
- **Batch size**: Tokens processed together (often millions)
- **Sequence length**: Context window during training
- **Model architecture**: Layers, dimensions, attention heads

### Scaling Laws: Bigger Is (Usually) Better

Research has revealed predictable **scaling laws**—relationships between model size, data size, compute, and performance:

```
Performance ∝ N^α × D^β × C^γ

Where:
- N = number of parameters
- D = dataset size in tokens
- C = compute (FLOPs)
```

**Key Insights**:
1. Performance improves smoothly with scale (power law)
2. There's an optimal balance between model size and data
3. Compute-optimal training ("Chinchilla scaling") uses roughly equal model and data scaling
4. Emergent abilities appear at certain scales

### Emergent Abilities

Some capabilities only appear at scale—they're absent in smaller models, then suddenly present in larger ones:

**Examples of Emergent Abilities**:
- Multi-step arithmetic
- Logical reasoning
- Multi-task generalization
- In-context learning (learning from examples in the prompt)
- Following complex instructions

**Why emergence happens** is debated:
- Threshold effect (capability needs minimum capacity)
- Capability accumulation (many small improvements compound)
- Measurement artifact (some researchers argue it's how we measure)

### Pre-Training Variants

**Causal Language Modeling (GPT-style)**
- Predict next token only
- Unidirectional (left-to-right)
- Best for generation

```
Input: "The cat sat on the"
Predict: "mat"
```

**Masked Language Modeling (BERT-style)**
- Predict masked tokens from context
- Bidirectional (sees entire text)
- Best for understanding

```
Input: "The [MASK] sat on the mat"
Predict: "cat"
```

**Prefix Language Modeling (T5-style)**
- Encoder-decoder architecture
- Best for translation, summarization

### What Pre-Training Doesn't Do

Pre-training creates a capable base model, but not a useful assistant:
- **Not aligned**: May generate harmful content
- **Not instruction-following**: Doesn't understand "answer this question"
- **Not conversational**: Completes text, doesn't have a dialogue
- **Not safe**: May reveal training data, be manipulated

This is why **fine-tuning** (the next lesson) is essential.

---

## 🎬 Video Script

**[INTRO - Animation showing next-token prediction]**

Here's the most remarkable thing about modern AI: the models that can write code, reason through problems, and hold conversations—they're all trained with one simple objective: predict the next word.

**[CUT TO: Text completion example]**

"The capital of France is..." predict "Paris." "def fibonacci(n):" predict the next line. That's it. No explicit teaching of facts, logic, or programming. Just next-token prediction.

**[CUT TO: Diagram showing what next-token prediction requires]**

Why does this work? Because to predict accurately, you need to understand everything. Grammar, meaning, facts, context, reasoning, style. The training data contains all these signals implicitly. Optimize for prediction, and you learn it all.

**[CUT TO: Dataset scale visualization]**

The scale is staggering. GPT-3 trained on 300 billion tokens. GPT-4, likely over 10 trillion. That's more text than any human could read in a thousand lifetimes. The internet, books, code, Wikipedia—all compressed into patterns.

**[CUT TO: GPU cluster image]**

This requires massive compute. Thousands of GPUs running for months. Tens of millions of dollars. This is why only a few organizations train frontier models.

**[CUT TO: Scaling laws graph]**

Research has discovered scaling laws. Performance improves predictably with scale. Double the parameters, get predictable improvement. Double the data, get predictable improvement. This is why labs are racing to train bigger models.

**[CUT TO: Emergence graph showing sudden capability]**

But scale isn't just "more is better." Some abilities emerge suddenly. Small models can't do arithmetic. Medium models struggle. Then at some scale—boom—the model can suddenly do math. No one trained it for math specifically. The capability emerged.

**[CUT TO: Speaker on camera]**

Here's what pre-training doesn't do. It creates a text-completion engine, not an assistant. The raw pre-trained model will happily generate harmful content, doesn't follow instructions naturally, and can be easily manipulated.

That's why pre-training is just the first step. In the next lesson, we'll cover alignment—how we turn these raw models into helpful, harmless, and honest assistants.

**[END - Runtime: 6:35]**

---

## 🔬 Interactive Lab: Exploring Training Dynamics

### Objective
Understand the relationship between scale, data, and model performance.

### Part 1: Token Counting (15 minutes)

```python
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

# Sample texts of different types
texts = {
    "English prose": """The quick brown fox jumps over the lazy dog. 
        This pangram contains every letter of the English alphabet.""",
    
    "Technical writing": """The transformer architecture uses self-attention 
        mechanisms to process sequential data in parallel, enabling significantly
        faster training than recurrent neural networks.""",
    
    "Python code": '''def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)''',
    
    "Chinese text": "人工智能是计算机科学的一个分支，它企图了解智能的实质。",
    
    "JSON data": '{"name": "John", "age": 30, "city": "New York", "active": true}',
}

print("Token Counts by Content Type")
print("-" * 50)
for name, text in texts.items():
    tokens = enc.encode(text)
    words = len(text.split())
    chars = len(text)
    print(f"\n{name}:")
    print(f"  Characters: {chars}")
    print(f"  Words: {words}")
    print(f"  Tokens: {len(tokens)}")
    print(f"  Tokens per word: {len(tokens)/words:.2f}")
```

**Question**: Which content type is most "token-efficient"? Why?

### Part 2: Simulate Training Dynamics (25 minutes)

```python
import numpy as np
import matplotlib.pyplot as plt

# Simulate scaling laws
def compute_loss(params_billions, data_billions, base_loss=2.0):
    """
    Simulated loss following Chinchilla scaling laws.
    Loss = A/N^α + B/D^β + C
    """
    A, alpha = 400, 0.34  # Parameter scaling
    B, beta = 400, 0.28   # Data scaling
    C = 1.69              # Irreducible loss
    
    N = params_billions * 1e9
    D = data_billions * 1e9
    
    loss = (A / (N ** alpha)) + (B / (D ** beta)) + C
    return loss

# Explore scaling
param_sizes = [0.1, 1, 10, 70, 175, 540]  # Billions of parameters
data_sizes = [10, 100, 300, 1000, 2000, 5000]  # Billions of tokens

# Create heatmap of loss
param_range = np.logspace(-1, 3, 50)  # 0.1B to 1000B params
data_range = np.logspace(1, 4, 50)    # 10B to 10000B tokens

losses = np.zeros((len(data_range), len(param_range)))
for i, d in enumerate(data_range):
    for j, p in enumerate(param_range):
        losses[i, j] = compute_loss(p, d)

plt.figure(figsize=(10, 8))
plt.contourf(param_range, data_range, losses, levels=20, cmap='viridis_r')
plt.colorbar(label='Loss')
plt.xscale('log')
plt.yscale('log')
plt.xlabel('Parameters (Billions)')
plt.ylabel('Training Data (Billions of Tokens)')
plt.title('Scaling Laws: Model Size vs Data Size')

# Mark some famous models (approximate)
models = [
    (175, 300, 'GPT-3'),
    (70, 2000, 'Llama 2'),
    (70, 15000, 'Llama 3'),
]
for params, data, name in models:
    plt.scatter(params, data, color='red', s=100, zorder=5)
    plt.annotate(name, (params, data), xytext=(5, 5), 
                 textcoords='offset points', color='white')

plt.show()
```

### Part 3: Understanding Compute-Optimal Training (15 minutes)

```python
# Calculate compute-optimal allocation
def compute_flops(params, tokens):
    """Approximate FLOPs for training = 6 * N * D"""
    return 6 * params * 1e9 * tokens * 1e9

# Given a compute budget, what's optimal?
compute_budgets = [1e21, 1e22, 1e23, 1e24]  # FLOPs

print("Compute-Optimal Configurations")
print("=" * 60)

for budget in compute_budgets:
    # Chinchilla-optimal: roughly equal scaling
    # D ≈ 20 * N (approximately)
    optimal_params = (budget / (6 * 20)) ** 0.5 / 1e9
    optimal_tokens = optimal_params * 20
    
    print(f"\nCompute budget: {budget:.0e} FLOPs")
    print(f"  Optimal params: {optimal_params:.1f}B")
    print(f"  Optimal tokens: {optimal_tokens:.0f}B")
    predicted_loss = compute_loss(optimal_params, optimal_tokens)
    print(f"  Predicted loss: {predicted_loss:.3f}")
```

### Submission
Submit your analysis of the scaling laws and explain why Chinchilla (smaller model, more data) outperforms GPT-3 (larger model, less data).

---

## ✅ Knowledge Check

### Question 1
What is the primary training objective for most LLMs?

A) Answer questions correctly  
B) Predict the next token  
C) Classify text into categories  
D) Generate creative content  

**Correct Answer**: B

**Explanation**: LLMs are trained with next-token prediction. Given a sequence, predict the next token. This simple objective, at scale, leads to learning grammar, facts, reasoning, and more.

---

### Question 2
Approximately how many tokens was GPT-3 trained on?

A) 1 million  
B) 1 billion  
C) 300 billion  
D) 10 trillion  

**Correct Answer**: C

**Explanation**: GPT-3 was trained on approximately 300 billion tokens. More recent models like GPT-4 and Llama 3 train on much more—estimated at 10+ trillion tokens.

---

### Question 3
What is an "emergent ability" in LLMs?

A) An ability explicitly trained for  
B) An ability that appears suddenly at certain scales without explicit training  
C) An ability that emerges from fine-tuning  
D) An ability to generate emergencies  

**Correct Answer**: B

**Explanation**: Emergent abilities are capabilities that appear suddenly at certain model scales. For example, multi-step arithmetic is absent in small models but suddenly present in larger ones, despite no explicit arithmetic training.

---

### Question 4
What does the "Chinchilla scaling" approach recommend?

A) Train the largest possible model  
B) Use as much data as possible  
C) Balance model size and data size for compute efficiency  
D) Train for as long as possible  

**Correct Answer**: C

**Explanation**: The Chinchilla paper showed that previous models were undertrained. For a given compute budget, balancing model size and data size (roughly D ≈ 20N tokens) achieves better performance than prior approaches that used very large models with less data.

---

### Question 5
Why is pre-training alone insufficient for a useful AI assistant?

A) The model is too small  
B) Pre-trained models are not instruction-following, aligned, or safe  
C) Pre-training only works for English  
D) The model forgets its training  

**Correct Answer**: B

**Explanation**: Pre-trained models are text-completion engines. They don't naturally follow instructions, may generate harmful content, and aren't designed for dialogue. Fine-tuning and alignment are needed to create helpful, harmless assistants.

---

*You've completed Lesson 2.5! You now understand how LLMs are trained at scale and what that training does and doesn't accomplish.*
