# Lesson 2.4: Tokenization - How Models See Text

> **Duration**: 35 minutes | **Type**: Technical Deep Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### The Bridge Between Text and Vectors

You know that LLMs work with embeddings—vectors of numbers. But how does "Hello, how are you?" become a sequence of vectors? The answer is **tokenization**: breaking text into discrete units called **tokens**.

Tokens are not words. They're subword units that balance vocabulary size with representation efficiency.

### Why Not Just Use Words?

Word-level tokenization seems intuitive but has critical flaws:

**Problem 1: Vocabulary Explosion**
English has ~170,000 words in common use. Add technical terms, names, and typos—you'd need millions of tokens. Each needs its own embedding vector.

**Problem 2: Out-of-Vocabulary (OOV)**
New words, typos, names, and technical terms won't be in your vocabulary.

**Problem 3: Morphology Blindness**
"run", "running", "runner" are separate tokens with separate embeddings, despite obvious relatedness.

### Subword Tokenization: The Modern Solution

Modern LLMs use **subword tokenization**—breaking text into pieces smaller than words but larger than characters.

```
"internationalization" → ["inter", "national", "ization"]
"ChatGPT" → ["Chat", "G", "PT"]
"running" → ["run", "ning"]
```

**Benefits**:
1. Fixed vocabulary size (32K-100K tokens typically)
2. No OOV—any text can be tokenized
3. Morphological awareness (prefixes, suffixes share tokens)
4. Efficient for common words (single token)

### Byte Pair Encoding (BPE)

The dominant tokenization algorithm, used by GPT and most LLMs:

**Training BPE**:
1. Start with individual characters as tokens
2. Find the most frequent adjacent pair
3. Merge them into a new token
4. Repeat until vocabulary size reached

### Token Patterns to Know

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokenizer

# Spaces are usually attached to the following word
enc.encode("Hello world")  # ['Hello', ' world'] - 2 tokens

# Common words are single tokens
enc.encode("the")     # 1 token
enc.encode("because") # 1 token

# Less common words split
enc.encode("internationalization")  # 3 tokens
```

### Why Token Count Matters

**Pricing**: Most APIs charge per token
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens

**Context Limits**:
- GPT-4 Turbo: 128K tokens
- Claude 3: 200K tokens
- Gemini 1.5 Pro: 2M tokens

**Speed**: Each token takes ~50-100ms to generate

### Tokenization Gotchas

**Non-English Text Uses More Tokens**
```python
enc.encode("Hello")    # 1 token
enc.encode("你好")     # 2 tokens (Chinese)
```

**Special Tokens**: 
