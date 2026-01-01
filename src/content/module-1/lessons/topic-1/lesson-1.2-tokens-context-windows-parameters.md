# Lesson 1.2: Tokens, Context Windows, and Model Parameters

## Introduction

If you've ever hit an error like "maximum context length exceeded" or wondered why your AI bill was so high, this lesson is for you. Understanding tokens, context windows, and parameters is essential for building cost-effective, reliable AI applications.

## What Are Tokens?

**Tokens are the atomic units LLMs work with.** They're not quite words, not quite characters—they're something in between.

[Image: Visual breakdown of how "tokenization" becomes ["token", "ization"]]

### The Tokenization Reality

```python
import tiktoken

# Let's see how GPT-4 tokenizes text
encoding = tiktoken.encoding_for_model("gpt-4")

# Example 1: Simple word
text = "Hello"
tokens = encoding.encode(text)
print(f"'{text}' = {len(tokens)} token(s)")  # 1 token

# Example 2: Longer word
text = "tokenization"
tokens = encoding.encode(text)
print(f"'{text}' = {len(tokens)} token(s)")  # 3 tokens: ["token", "ization"]

# Example 3: Code
code = "def hello_world():\n    print('Hello')"
tokens = encoding.encode(code)
print(f"Code = {len(tokens)} tokens")  # 13 tokens
```

### The Token Math You Need to Know

| Rule of Thumb | Accuracy |
|---------------|----------|
| 1 token ≈ 4 characters | ~75% accurate |
| 1 token ≈ 0.75 words | ~80% accurate |
| 100 tokens ≈ 75 words | Good for estimates |

> **Common Mistake**: Developers often estimate tokens by word count alone. Code is particularly token-dense because of special characters, and non-English text often uses more tokens per word.

### Why Tokens Matter: The Cost Connection

LLM pricing is based on tokens:

```python
# Calculate API cost
def estimate_cost(input_text, output_words, model="gpt-4-turbo"):
    encoding = tiktoken.encoding_for_model("gpt-4")
    
    input_tokens = len(encoding.encode(input_text))
    output_tokens = int(output_words * 1.33)  # Estimate
    
    # GPT-4 Turbo pricing (as of late 2024)
    input_cost_per_1k = 0.01
    output_cost_per_1k = 0.03
    
    input_cost = (input_tokens / 1000) * input_cost_per_1k
    output_cost = (output_tokens / 1000) * output_cost_per_1k
    
    return {
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "total_cost": round(input_cost + output_cost, 4)
    }

# Example: Analyzing a 500-line code file
result = estimate_cost("def foo():\n    pass\n" * 500, output_words=200)
print(f"Estimated cost: ${result['total_cost']}")
```

> **Pro Tip**: Output tokens are typically 2-3x more expensive than input tokens. Design your prompts to get concise responses when possible.

## Context Windows: The LLM's Working Memory

The **context window** is the maximum number of tokens the model can "see" at once—including your prompt AND the response.

[Image: Diagram showing prompt + response filling up a context window]

### Context Windows by Model (2024)

| Model | Context Window | Approximate | 
|-------|---------------|-------------|
| GPT-3.5 Turbo | 16,384 tokens | ~12,000 words |
| GPT-4 Turbo | 128,000 tokens | ~96,000 words |
| Claude 3.5 Sonnet | 200,000 tokens | ~150,000 words |
| Gemini 1.5 Pro | 2,000,000 tokens | ~1.5M words |

### What Happens When You Exceed the Context?

```python
from openai import OpenAI

client = OpenAI()

# This will fail if total tokens > context window
try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # 16K context
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": very_long_document}  # 20K tokens
        ]
    )
except Exception as e:
    print(f"Error: {e}")
    # Error: This model's maximum context length is 16384 tokens
```

### Strategic Context Management

When working with long documents, you have options:

```python
def chunk_document(text, max_tokens=4000, overlap=200):
    """Split document into overlapping chunks that fit context."""
    encoding = tiktoken.encoding_for_model("gpt-4")
    tokens = encoding.encode(text)
    
    chunks = []
    start = 0
    
    while start < len(tokens):
        end = min(start + max_tokens, len(tokens))
        chunk_tokens = tokens[start:end]
        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)
        start = end - overlap  # Overlap for continuity
    
    return chunks

# Use case: Analyzing a large codebase
chunks = chunk_document(large_codebase, max_tokens=4000)
summaries = [analyze_chunk(chunk) for chunk in chunks]
final_analysis = synthesize(summaries)
```

> **Pro Tip**: The position of information matters! LLMs pay more attention to the beginning and end of the context. Put critical instructions at the start of your prompt and important context at the end.

## Model Parameters: The Brain Size

**Parameters** are the numerical values the model learned during training. Think of them as the model's "neurons."

### What Parameters Represent

Each parameter stores a tiny fragment of learned pattern:
- "After 'the cat sat on the', a noun often follows"
- "In code, after 'def function_name(', parameters list"
- "When asked to explain, use simple analogies first"

### Parameters vs. Performance

| Model Size | Parameters | Strengths | Weaknesses |
|------------|-----------|-----------|------------|
| Small (7B) | 7 billion | Fast, cheap, good for simple tasks | Limited reasoning |
| Medium (70B) | 70 billion | Balanced performance | Moderate cost |
| Large (175B+) | 175B+ | Best reasoning, most capable | Expensive, slow |

```python
# Choosing the right model size
def choose_model(task_complexity):
    if task_complexity == "simple":
        # Text classification, simple extraction
        return "gpt-3.5-turbo"  # Fast, cheap
    elif task_complexity == "moderate":
        # Code generation, summarization
        return "gpt-4-turbo"  # Balanced
    else:
        # Complex reasoning, multi-step analysis
        return "gpt-4"  # Maximum capability
```

> **Common Mistake**: Bigger isn't always better! For simple tasks like text classification, a smaller model is faster, cheaper, and often just as accurate.

## Practical Token Budget Planning

Here's a template for planning your AI application:

```python
class TokenBudgetPlanner:
    def __init__(self, model="gpt-4-turbo"):
        self.model = model
        self.context_limits = {
            "gpt-3.5-turbo": 16384,
            "gpt-4-turbo": 128000,
            "gpt-4": 8192,
        }
        self.max_context = self.context_limits[model]
    
    def plan_budget(self, system_prompt, expected_input_size, 
                    desired_output_size):
        """Plan token allocation within context limits."""
        
        # Calculate each component
        system_tokens = self._count_tokens(system_prompt)
        input_estimate = expected_input_size
        output_estimate = desired_output_size
        
        total = system_tokens + input_estimate + output_estimate
        
        if total > self.max_context:
            return {
                "fits": False,
                "overflow": total - self.max_context,
                "recommendation": "Reduce input size or switch models"
            }
        
        return {
            "fits": True,
            "total_tokens": total,
            "headroom": self.max_context - total,
            "estimated_cost": self._estimate_cost(
                system_tokens + input_estimate, 
                output_estimate
            )
        }
```

## Key Takeaways

- **Tokens** are the billing and processing units—roughly 4 characters or 0.75 words each
- **Context windows** limit how much text the model can process at once
- Exceeding context limits causes errors or silent truncation
- **Parameters** represent model capability—but bigger isn't always better for your use case
- Always plan your token budget before building features
- Output tokens cost 2-3x more than input tokens—design for concise responses

## What's Next

In the next lesson, we'll explore the economics of AI: API pricing models, cost optimization strategies, and how to build applications that scale without breaking the bank.

---

*Estimated completion time: 20 minutes*
*Difficulty: Foundational*
