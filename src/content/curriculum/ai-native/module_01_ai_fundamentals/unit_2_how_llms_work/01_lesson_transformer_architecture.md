# Lesson 2.1: The Transformer Architecture

> **Duration**: 45 minutes | **Type**: Technical Deep Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### Before Transformers: The Sequential Bottleneck

Before 2017, the dominant architectures for sequence processing were Recurrent Neural Networks (RNNs) and their variants (LSTMs, GRUs). They processed sequences one element at a time, maintaining a hidden state that carried information forward:

```
"The" → [hidden state] → "cat" → [update] → "sat" → [update] → ...
```

This sequential nature created problems:

1. **Training was slow**: You couldn't parallelize across positions
2. **Long-range dependencies were hard**: Information from early words could "fade" by the time you reached later words
3. **Context was limited**: Practical RNNs struggled with sequences longer than a few hundred tokens

### The 2017 Revolution

In June 2017, researchers at Google published "Attention Is All You Need." They introduced the **transformer architecture**, which replaced recurrence with **self-attention**—a mechanism where every position in a sequence can directly attend to every other position.

The key insight: instead of processing sequentially, process all positions in parallel and let the model learn which positions are relevant to each other.

```
┌──────────────────────────────────────────────────────────┐
│                   TRANSFORMER                             │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                    Output                            │ │
│  └────────────────────────▲─────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────┴────────────────────────────┐ │
│  │               Linear + Softmax                       │ │
│  └────────────────────────▲────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────┴────────────────────────────┐ │
│  │                     Decoder                          │ │
│  │    (Masked Multi-Head Attention + Cross-Attention)  │ │
│  │    (× N layers)                                      │ │
│  └────────────────────────▲────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────┴────────────────────────────┐ │
│  │                     Encoder                          │ │
│  │    (Multi-Head Self-Attention + Feed Forward)       │ │
│  │    (× N layers)                                      │ │
│  └────────────────────────▲────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────┴────────────────────────────┐ │
│  │            Input Embeddings + Position              │ │
│  └──────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Encoder-Decoder Architecture

The original transformer used an **encoder-decoder** structure:

**Encoder**: Reads the full input sequence and creates rich representations. The encoder processes all positions simultaneously using self-attention.

**Decoder**: Generates output one token at a time, attending to both its own previous outputs and the encoder's representations.

This was designed for translation: the encoder understands the source sentence, the decoder generates the target sentence.

### Modern Variants

Different tasks use different parts of the transformer:

| Architecture | Structure | Use Case | Examples |
|--------------|-----------|----------|----------|
| Encoder-only | Encoder stack | Understanding (classification, NER) | BERT, RoBERTa |
| Decoder-only | Decoder stack | Generation (text, code) | GPT, Claude, Llama |
| Encoder-Decoder | Both stacks | Translation, summarization | T5, BART |

**GPT and its descendants are decoder-only**: they generate text left-to-right, attending only to previous tokens. This simpler structure has scaled remarkably well.

### The Building Blocks

A transformer layer consists of:

1. **Multi-Head Self-Attention**: The core mechanism (covered in detail in Lesson 2.2)
2. **Layer Normalization**: Stabilizes training by normalizing activations
3. **Feed-Forward Network**: A simple two-layer MLP applied to each position
4. **Residual Connections**: "Skip connections" that add the input to the output, enabling deeper networks

```python
def transformer_layer(x):
    # Self-attention sublayer
    attention_output = multi_head_attention(x, x, x)
    x = layer_norm(x + attention_output)  # Residual + norm
    
    # Feed-forward sublayer
    ff_output = feed_forward(x)
    x = layer_norm(x + ff_output)  # Residual + norm
    
    return x
```

### Positional Encoding

Since attention treats all positions equally (no inherent sense of order), we must inject position information. The original paper used sinusoidal functions:

```
PE(pos, 2i) = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
```

Modern models often use **learned positional embeddings** (GPT) or **relative position encodings** (RoPE in Llama, ALiBi).

### Why Transformers Scale

Transformers enabled unprecedented scaling for several reasons:

1. **Parallelization**: All positions are processed simultaneously
2. **Long-range attention**: Direct connections between distant positions
3. **Simple, uniform architecture**: Easy to scale by adding layers
4. **Efficient on modern hardware**: Matrix multiplications run efficiently on GPUs

This is why we went from BERT (340M parameters) in 2018 to GPT-4 (reportedly ~1.8 trillion parameters) in 2023.

---

## 🎬 Video Script

**[INTRO - Animation showing RNN processing one word at a time]**

Before 2017, if you wanted neural networks to process language, you used recurrent neural networks—RNNs. They read text one word at a time, updating a hidden state as they went.

**[CUT TO: Graph showing performance plateau]**

The problem? They were slow to train because you couldn't parallelize. And they struggled with long sentences—information from early words would fade by the time you reached later words.

**[CUT TO: Paper title "Attention Is All You Need"]**

Then in June 2017, a team at Google published a paper with an audacious title: "Attention Is All You Need." They proposed the transformer—an architecture that would change everything.

**[CUT TO: Animation of all words attending to each other simultaneously]**

The key idea: instead of processing words sequentially, let every word directly "attend" to every other word in parallel. The model learns which words are relevant to each other.

**[CUT TO: Encoder-decoder diagram]**

The original transformer had two parts. An encoder that reads the entire input and builds rich representations. And a decoder that generates output one token at a time.

**[CUT TO: Table showing encoder-only, decoder-only, encoder-decoder]**

Different tasks use different variants. BERT is encoder-only—great for understanding text. GPT, Claude, Llama? Decoder-only—great for generating text. That's what powers every chatbot you've used.

**[CUT TO: Transformer layer diagram]**

Each layer of a transformer has the same structure. First, multi-head self-attention—where positions communicate with each other. Then a simple feed-forward network applied to each position. Plus layer normalization and residual connections to help with training deep networks.

**[CUT TO: Sinusoidal waves]**

One quirk: attention treats all positions equally. So we need to tell the model where each word is in the sequence. The original paper used mathematical functions—sines and cosines—to encode position. Modern models use learned position embeddings.

**[CUT TO: Graph showing model sizes from BERT to GPT-4]**

Why did transformers enable the AI boom? Three reasons.

First, parallelization. All positions process simultaneously, making training fast.

Second, direct long-range connections. A word at the beginning can directly influence a word at the end, without information passing through every word in between.

Third, simple architecture. Just stack more layers, add more parameters, and performance keeps improving—at least across a remarkable range we're still exploring.

**[CUT TO: Speaker on camera]**

When you use ChatGPT or Claude, you're running a transformer with tens or hundreds of billions of parameters, processing your prompt through dozens of layers of self-attention. In the next lesson, we'll dive deep into that attention mechanism—it's the most important concept in modern AI.

**[END - Runtime: 6:32]**

---

## 🔬 Interactive Lab: Exploring Transformer Components

### Objective
Visualize and understand the key components of transformer architecture.

### Part 1: Visualize Attention Patterns (20 minutes)

We'll use the `bertviz` library to visualize what attention actually looks like:

```python
# Install required packages
# pip install transformers bertviz

from transformers import AutoTokenizer, AutoModel
from bertviz import head_view

# Load a pre-trained model and tokenizer
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, output_attentions=True)

# Tokenize a sentence
sentence = "The cat sat on the mat because it was tired."
inputs = tokenizer(sentence, return_tensors="pt")
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])

# Get attention weights
outputs = model(**inputs)
attention = outputs.attentions  # Tuple of tensors, one per layer

print(f"Number of layers: {len(attention)}")
print(f"Attention shape per layer: {attention[0].shape}")
# Shape: (batch, heads, seq_len, seq_len)

# Visualize (this opens an interactive HTML visualization)
head_view(attention, tokens)
```

**Observation Questions**:
1. Find a layer/head where "it" attends strongly to "cat" (coreference resolution)
2. Which heads seem to focus on adjacent words?
3. Do any heads show long-range attention patterns?

### Part 2: Compare Model Sizes (15 minutes)

Let's compare how different model sizes process the same text:

```python
from transformers import pipeline
import time

models = [
    "distilbert-base-uncased",  # 66M parameters
    "bert-base-uncased",         # 110M parameters
    "bert-large-uncased",        # 340M parameters
]

text = "The transformer architecture revolutionized natural language processing by introducing self-attention mechanisms."

for model_name in models:
    classifier = pipeline("fill-mask", model=model_name)
    
    # Replace a word with [MASK] and see predictions
    masked_text = text.replace("revolutionized", "[MASK]")
    
    start = time.time()
    results = classifier(masked_text)
    elapsed = time.time() - start
    
    print(f"\n{model_name}:")
    print(f"  Inference time: {elapsed:.3f}s")
    print(f"  Top predictions:")
    for r in results[:3]:
        print(f"    {r['token_str']}: {r['score']:.2%}")
```

### Part 3: Positional Embeddings (15 minutes)

Explore how position information is encoded:

```python
import torch
import numpy as np
import matplotlib.pyplot as plt

def get_positional_encoding(seq_len, d_model):
    """Original sinusoidal positional encoding from 'Attention Is All You Need'"""
    position = np.arange(seq_len)[:, np.newaxis]
    dim = np.arange(d_model)[np.newaxis, :]
    
    # Compute angles
    angles = position / np.power(10000, (2 * (dim // 2)) / d_model)
    
    # Apply sin to even indices, cos to odd indices
    encodings = np.zeros_like(angles)
    encodings[:, 0::2] = np.sin(angles[:, 0::2])
    encodings[:, 1::2] = np.cos(angles[:, 1::2])
    
    return encodings

# Generate positional encodings
pe = get_positional_encoding(seq_len=100, d_model=128)

# Visualize
plt.figure(figsize=(12, 6))
plt.imshow(pe, aspect='auto', cmap='RdBu')
plt.xlabel('Embedding Dimension')
plt.ylabel('Position in Sequence')
plt.title('Sinusoidal Positional Encoding')
plt.colorbar(label='Value')
plt.show()

# Check how similar different positions are
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("\nPosition similarity (cosine):")
for pos in [1, 5, 10, 50]:
    sim = cosine_similarity(pe[0], pe[pos])
    print(f"  Position 0 vs {pos}: {sim:.3f}")
```

**Questions**:
1. Why does the pattern have different frequencies for different dimensions?
2. How does similarity between positions change with distance?

### Submission
Submit your attention visualization screenshots and observations about what different attention heads have learned.

---

## ✅ Knowledge Check

### Question 1
What was the main limitation of RNNs that transformers addressed?

A) RNNs were too expensive to deploy  
B) RNNs couldn't be parallelized and struggled with long-range dependencies  
C) RNNs required too much training data  
D) RNNs couldn't handle text input  

**Correct Answer**: B

**Explanation**: RNNs processed sequences one step at a time, preventing parallelization during training. Information from early time steps could "fade" before reaching later steps (vanishing gradients), making long-range dependencies difficult to learn.

---

### Question 2
What is the core innovation of the transformer architecture?

A) Using larger neural networks  
B) Processing all positions in parallel through self-attention  
C) Training on more data  
D) Using better hardware  

**Correct Answer**: B

**Explanation**: The transformer's key innovation is self-attention, which allows every position in a sequence to directly attend to every other position simultaneously. This enables parallelization and direct long-range connections without sequential processing.

---

### Question 3
Which architecture type is GPT (and most modern LLMs like Claude and Llama)?

A) Encoder-only  
B) Decoder-only  
C) Encoder-decoder  
D) Recurrent  

**Correct Answer**: B

**Explanation**: GPT and most modern generative LLMs are decoder-only transformers. They generate text left-to-right, using masked self-attention so each position can only attend to previous positions. This autoregressive structure is well-suited for text generation.

---

### Question 4
What is the purpose of positional encoding in transformers?

A) To make the model faster  
B) To inject information about the order of tokens  
C) To reduce memory usage  
D) To enable longer context windows  

**Correct Answer**: B

**Explanation**: Self-attention treats all positions equally—it has no inherent understanding of order. Positional encodings add information about where each token appears in the sequence, allowing the model to distinguish "the cat sat on the mat" from "the mat sat on the cat."

---

### Question 5
What are the main components of a single transformer layer?

A) Convolution and pooling  
B) Multi-head self-attention, feed-forward network, layer norm, and residual connections  
C) LSTM cells and gates  
D) Batch normalization and dropout  

**Correct Answer**: B

**Explanation**: Each transformer layer contains multi-head self-attention (positions communicate), a position-wise feed-forward network (same MLP applied to each position), layer normalization (stabilizes training), and residual connections (adds input to output).

---

### Question 6
Why have transformers scaled so successfully to extremely large models?

A) They are simpler than other architectures  
B) They require less data than other architectures  
C) They enable parallelization, have direct long-range connections, and have uniform, stackable structure  
D) They are more theoretically sound  

**Correct Answer**: C

**Explanation**: Transformers scale well because: (1) parallel processing makes training efficient on modern hardware, (2) direct attention between any positions captures long-range dependencies, and (3) the uniform layer structure means you can just stack more layers for more capacity.

---

*You've completed Lesson 2.1! You now understand the transformer architecture that underlies every modern LLM.*
