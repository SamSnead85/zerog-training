# Lesson 2.2: Attention Is All You Need

> **Duration**: 50 minutes | **Type**: Deep Technical Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### The Attention Mechanism: The Heart of Transformers

If you understand one concept deeply from this entire curriculum, make it **self-attention**. It's the mechanism that makes transformers work, and understanding it unlocks intuition about model behavior, limitations, and optimization.

### The Intuition

Imagine reading this sentence:

> "The animal didn't cross the street because **it** was too tired."

What does "it" refer to? To understand the sentence, your brain quickly connects "it" to "the animal"—not "the street." You're performing a kind of attention: focusing on relevant earlier words to understand the current word.

Self-attention formalizes this. For every position in a sequence, the model asks: "Which other positions are relevant to understanding this position?" and computes a weighted combination of their representations.

### Queries, Keys, and Values

Self-attention uses three projections of each input:

- **Query (Q)**: "What am I looking for?"
- **Key (K)**: "What do I contain?"
- **Value (V)**: "What information do I provide if matched?"

The attention formula:

```
Attention(Q, K, V) = softmax(QK^T / √d_k) × V
```

Let's break this down step by step:

**Step 1: Compute Attention Scores**
```
scores = Q × K^T
```
Each query "asks" each key how relevant it is. The result is a matrix where entry (i, j) represents how much position i should attend to position j.

**Step 2: Scale**
```
scaled_scores = scores / √d_k
```
We divide by the square root of the key dimension to prevent the dot products from growing too large (which would make softmax too peaky).

**Step 3: Apply Softmax**
```
attention_weights = softmax(scaled_scores)
```
Convert scores to probabilities. Each row sums to 1—each position distributes its attention across all other positions.

**Step 4: Weighted Sum of Values**
```
output = attention_weights × V
```
Each position's output is a weighted combination of all position's values, weighted by attention.

### Visual Example

Consider the sentence: "The cat sat on the mat"

```
                    Attending TO
        The   cat   sat   on    the   mat
      ┌─────────────────────────────────────┐
The   │ 0.05  0.15  0.10  0.05  0.30  0.35 │  ← "The" attends mostly to "the" and "mat"
cat   │ 0.20  0.10  0.25  0.10  0.05  0.30 │  ← "cat" attends to itself, "sat", "mat"
sat   │ 0.10  0.35  0.05  0.15  0.05  0.30 │  ← "sat" attends to "cat" and "mat"
on    │ 0.05  0.10  0.40  0.05  0.05  0.35 │  ← "on" attends to "sat" and "mat"
the   │ 0.25  0.10  0.05  0.05  0.10  0.45 │  ← "the" attends mostly to "mat"
mat   │ 0.05  0.35  0.30  0.15  0.10  0.05 │  ← "mat" attends to "cat" and "sat"
      └─────────────────────────────────────┘
        From position (row) attending to position (column)
```

### Multi-Head Attention

A single attention operation captures one type of relationship. But language has many types of relationships: syntactic, semantic, positional, coreference, etc.

**Multi-head attention** runs multiple attention operations in parallel, each with different learned projections:

```python
def multi_head_attention(Q, K, V, num_heads=8):
    d_model = Q.shape[-1]
    d_head = d_model // num_heads
    
    outputs = []
    for head in range(num_heads):
        # Each head has its own projections
        Q_head = Q @ W_Q[head]  # Project to d_head dimensions
        K_head = K @ W_K[head]
        V_head = V @ W_V[head]
        
        head_output = attention(Q_head, K_head, V_head)
        outputs.append(head_output)
    
    # Concatenate and project
    concatenated = concat(outputs)
    return concatenated @ W_O
```

Different heads learn different things:
- Head 1 might track subject-verb agreement
- Head 2 might track preceding adjectives
- Head 3 might track syntactic structure
- Head 4 might track positional proximity

### Masked Self-Attention (For Generation)

In decoder-only models like GPT, we prevent positions from attending to future positions—you can't peek at words you haven't generated yet:

```
Causal Mask:
        1     2     3     4     5
    ┌───────────────────────────────┐
  1 │  1     0     0     0     0    │
  2 │  1     1     0     0     0    │
  3 │  1     1     1     0     0    │
  4 │  1     1     1     1     0    │
  5 │  1     1     1     1     1    │
    └───────────────────────────────┘
    (1 = can attend, 0 = blocked)
```

The mask is applied before softmax by setting blocked positions to -∞:

```python
if mask is not None:
    scores = scores.masked_fill(mask == 0, -1e9)
```

### The Computational Cost

Self-attention is powerful but expensive. For a sequence of length N:
- Memory: O(N²) for the attention matrix
- Compute: O(N²) for the matrix multiplications

This is why context windows are limited. A 100K token context requires storing 10 billion attention scores per layer!

Various techniques address this:
- **Flash Attention**: Reorders computation to reduce memory access
- **Sparse Attention**: Attend only to selected positions
- **Linear Attention**: Approximate attention with O(N) complexity

### Why Attention Works So Well

1. **Global Context**: Every position can directly access every other position
2. **Content-Based**: What you attend to depends on content, not just position
3. **Learnable**: The model learns what patterns to look for
4. **Parallelizable**: All positions computed simultaneously
5. **Compositional**: Multi-head attention captures multiple relationship types

---

## 🎬 Video Script

**[INTRO - Animation of attention weights flowing between words]**

Welcome to the most important lesson in this curriculum. If you understand one thing deeply, make it attention.

**[CUT TO: The pronoun example sentence]**

Let me show you what attention does. Consider this sentence: "The animal didn't cross the street because it was too tired."

What does "it" refer to? Your brain instantly connects "it" to "the animal," not "the street." You're performing attention—focusing on relevant earlier words to understand the current word.

**[CUT TO: QKV diagram]**

Self-attention formalizes this with three components. Think of it like a search engine inside the model.

Every position creates a Query: "What am I looking for?"
Every position creates a Key: "What do I contain?"
Every position creates a Value: "What information do I offer?"

**[CUT TO: Matrix multiplication animation]**

The attention mechanism computes how relevant each key is to each query. Then it takes a weighted average of the values based on that relevance.

**[CUT TO: Attention formula]**

Here's the formula:

Attention equals softmax of Q times K transpose, divided by square root of d_k, times V.

Let me break that down.

Q times K transpose gives us a matrix of attention scores. Position i, j tells us how much position i should attend to position j.

We divide by the square root of the dimension to prevent scores from getting too large.

Softmax converts these to probabilities—each row sums to one.

Then we multiply by V to get a weighted combination of values.

**[CUT TO: Attention visualization with word-to-word connections]**

In practice, you can visualize attention as lines between words. Thicker lines mean stronger attention. Here, you can see "it" attending strongly to "animal"—the model has learned coreference.

**[CUT TO: Multi-head attention diagram]**

But one attention head captures one pattern. Language has many patterns! So we use multiple heads—typically 8 to 128.

Each head has its own projections. One head might track syntax. Another tracks semantics. Another tracks position. They all operate in parallel.

**[CUT TO: Causal mask visualization]**

For generation, we need a twist. You can't attend to words you haven't generated yet. So we mask out future positions—set them to negative infinity before softmax.

**[CUT TO: Cost graph showing N² scaling]**

Here's the catch. Attention scales quadratically with sequence length. Double your context, quadruple your compute. This is why we have context limits, and why extending them is an active research area.

**[CUT TO: Speaker on camera]**

Understanding attention gives you intuition about model behavior. Why do long prompts help? More context to attend to. Why do prompts sometimes confuse models? Attention might focus on irrelevant parts. Why is context window length a selling point? It determines how much the model can "see" at once.

**[END - Runtime: 7:45]**

---

## 🔬 Interactive Lab: Implementing and Visualizing Attention

### Objective
Implement scaled dot-product attention from scratch and visualize attention patterns.

### Part 1: Attention from Scratch (25 minutes)

```python
import numpy as np
import matplotlib.pyplot as plt

def softmax(x, axis=-1):
    """Numerically stable softmax"""
    exp_x = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return exp_x / np.sum(exp_x, axis=axis, keepdims=True)

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Compute scaled dot-product attention.
    
    Args:
        Q: Queries of shape (seq_len, d_k)
        K: Keys of shape (seq_len, d_k)
        V: Values of shape (seq_len, d_v)
        mask: Optional mask of shape (seq_len, seq_len)
    
    Returns:
        output: Attention output of shape (seq_len, d_v)
        attention_weights: Weights of shape (seq_len, seq_len)
    """
    d_k = K.shape[-1]
    
    # Step 1: Compute attention scores
    scores = Q @ K.T  # (seq_len, seq_len)
    
    # Step 2: Scale
    scaled_scores = scores / np.sqrt(d_k)
    
    # Step 3: Apply mask (if provided)
    if mask is not None:
        scaled_scores = np.where(mask, scaled_scores, -1e9)
    
    # Step 4: Apply softmax
    attention_weights = softmax(scaled_scores, axis=-1)
    
    # Step 5: Compute weighted sum of values
    output = attention_weights @ V
    
    return output, attention_weights

# Test with a simple example
np.random.seed(42)
seq_len = 5
d_k = 8  # Key/Query dimension
d_v = 8  # Value dimension

# Random Q, K, V
Q = np.random.randn(seq_len, d_k)
K = np.random.randn(seq_len, d_k)
V = np.random.randn(seq_len, d_v)

output, weights = scaled_dot_product_attention(Q, K, V)

print("Attention weights (each row sums to 1):")
print(weights)
print("\nRow sums:", weights.sum(axis=1))
```

**Task**: Verify that each row of attention weights sums to 1.

### Part 2: Visualize Attention (15 minutes)

```python
def visualize_attention(attention_weights, tokens):
    """Visualize attention as a heatmap"""
    fig, ax = plt.subplots(figsize=(8, 6))
    
    im = ax.imshow(attention_weights, cmap='Blues')
    
    # Labels
    ax.set_xticks(range(len(tokens)))
    ax.set_yticks(range(len(tokens)))
    ax.set_xticklabels(tokens, rotation=45, ha='right')
    ax.set_yticklabels(tokens)
    
    ax.set_xlabel('Attending TO (Key)')
    ax.set_ylabel('Attending FROM (Query)')
    ax.set_title('Attention Weights')
    
    # Add colorbar
    plt.colorbar(im, ax=ax)
    
    # Add values in cells
    for i in range(len(tokens)):
        for j in range(len(tokens)):
            text = ax.text(j, i, f'{attention_weights[i, j]:.2f}',
                          ha='center', va='center', fontsize=8)
    
    plt.tight_layout()
    plt.show()

# Create semantic Q, K, V (simulating learned representations)
# We'll make "cat" and "dog" similar, and "sat" and "ran" similar
tokens = ['The', 'cat', 'sat', 'on', 'mat']

# Manually create embeddings where semantically similar words are close
embeddings = np.array([
    [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0],  # The (article)
    [0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0],  # cat (noun)
    [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0],  # sat (verb)
    [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.5],  # on (preposition)
    [0.0, 0.8, 0.0, 0.0, 0.0, 0.9, 0.0, 0.0],  # mat (noun, similar to cat)
])

# In real transformers, Q, K, V come from learned linear projections
# Here we'll use identity projections for simplicity
Q = embeddings
K = embeddings
V = embeddings

output, weights = scaled_dot_product_attention(Q, K, V)
visualize_attention(weights, tokens)
```

**Observe**: Which tokens attend to which? Does "mat" (a noun) attend more to "cat" (also a noun)?

### Part 3: Causal Masking (15 minutes)

Implement the mask used in GPT-style models:

```python
def create_causal_mask(seq_len):
    """Create lower-triangular causal mask"""
    mask = np.tril(np.ones((seq_len, seq_len)))
    return mask

def causal_attention(Q, K, V):
    """Self-attention with causal masking"""
    seq_len = Q.shape[0]
    mask = create_causal_mask(seq_len)
    return scaled_dot_product_attention(Q, K, V, mask=mask)

# Compare masked vs unmasked attention
output_unmasked, weights_unmasked = scaled_dot_product_attention(Q, K, V)
output_masked, weights_masked = causal_attention(Q, K, V)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Unmasked
im1 = axes[0].imshow(weights_unmasked, cmap='Blues')
axes[0].set_title('Bidirectional Attention')
axes[0].set_xlabel('Key Position')
axes[0].set_ylabel('Query Position')

# Masked
im2 = axes[1].imshow(weights_masked, cmap='Blues')
axes[1].set_title('Causal Attention (GPT-style)')
axes[1].set_xlabel('Key Position')
axes[1].set_ylabel('Query Position')

plt.colorbar(im1, ax=axes[0])
plt.colorbar(im2, ax=axes[1])
plt.tight_layout()
plt.show()
```

**Question**: Why can't we see anything in the upper-right triangle of the causal attention visualization?

### Submission
Submit your attention visualizations and answers to the reflection questions about how attention patterns relate to word relationships.

---

## ✅ Knowledge Check

### Question 1
What do Query, Key, and Value represent in the attention mechanism?

A) Query seeks relevant information, Key describes content, Value provides information  
B) Query is the input, Key is the output, Value is the loss  
C) All three are the same representation with different names  
D) Query is for training, Key and Value are for inference  

**Correct Answer**: A

**Explanation**: In attention, Queries represent "what am I looking for?", Keys represent "what do I contain?", and Values represent "what information do I provide when matched?". The attention score between a query and key determines how much of that key's value is included in the output.

---

### Question 2
Why do we divide by √d_k in the attention formula?

A) To make computation faster  
B) To prevent attention scores from becoming too large, which would make softmax too peaky  
C) To normalize the output range  
D) To enable gradient flow  

**Correct Answer**: B

**Explanation**: Dot products of high-dimensional vectors can grow large, pushing softmax into regions with very small gradients (near 0 or 1). Scaling by √d_k keeps the variance of scores stable regardless of dimension.

---

### Question 3
What is the purpose of multi-head attention?

A) To make computation faster by parallelizing  
B) To allow the model to capture multiple types of relationships simultaneously  
C) To reduce memory usage  
D) To enable longer context windows  

**Correct Answer**: B

**Explanation**: Each attention head can learn to focus on different types of relationships (syntactic, semantic, positional, etc.). Multi-head attention runs several attention operations in parallel with different learned projections, then combines the results.

---

### Question 4
What does the causal mask do in GPT-style models?

A) Masks out noisy training examples  
B) Prevents positions from attending to future positions  
C) Masks out low-confidence predictions  
D) Enables the model to generate longer sequences  

**Correct Answer**: B

**Explanation**: The causal (or look-ahead) mask prevents each position from attending to future positions. This is essential for autoregressive generation—you can't base predictions on words you haven't generated yet.

---

### Question 5
Why does attention have O(N²) complexity for sequence length N?

A) Because of the softmax computation  
B) Because every position computes attention scores with every other position  
C) Because of the value projection  
D) Because of multi-head parallelization  

**Correct Answer**: B

**Explanation**: The attention matrix has N×N entries, one for each (query, key) pair. Computing and storing this matrix requires O(N²) operations and memory. This is why context window length is a limiting factor for LLMs.

---

### Question 6
In the sentence "The cat sat because it was tired," which word would "it" likely attend to most strongly?

A) The  
B) cat  
C) sat  
D) tired  

**Correct Answer**: B

**Explanation**: Self-attention learns coreference resolution. "It" refers to "the cat", so a well-trained model would have high attention weight between "it" and "cat" (and likely "the" as part of the noun phrase).

---

*You've completed Lesson 2.2—the most important lesson in understanding LLMs! You now understand the attention mechanism at a deep level.*
