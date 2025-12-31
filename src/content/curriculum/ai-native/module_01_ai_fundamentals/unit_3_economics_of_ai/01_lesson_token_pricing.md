# Lesson 3.1: Understanding Token-Based Pricing

> **Duration**: 50 minutes | **Type**: Practical/Economic
> **Unit**: 3 - The Economics of AI

---

## 📚 Reading Material

### How AI Pricing Works

Unlike traditional SaaS (pay per seat, per month), AI APIs charge per token. Understanding tokenomics is essential for budgeting and optimization.

### The Token Economy

Recall from Lesson 2.4: tokens are subword units, roughly 0.75 words on average for English text.

**Pricing Example (GPT-4o, as of 2024)**:
- Input tokens: $2.50 per 1M tokens
- Output tokens: $10.00 per 1M tokens

**Why output costs more**: Input is processed in parallel; output is generated sequentially, requiring more compute per token.

### Calculating Costs

**Formula**:
```
Cost = (input_tokens × input_price) + (output_tokens × output_price)
```

**Example 1: Simple Q&A**
```
Input: "What is the capital of France?" (7 tokens)
Output: "The capital of France is Paris." (7 tokens)

Cost = (7 × $2.50/1M) + (7 × $10.00/1M)
     = $0.0000175 + $0.000070
     = $0.0000875 per request
     = $0.09 per 1,000 requests
```

**Example 2: Document Analysis**
```
Input: 4,000 token document + 50 token question
Output: 500 token analysis

Cost = (4,050 × $2.50/1M) + (500 × $10.00/1M)
     = $0.010125 + $0.005
     = $0.015 per request
     = $15 per 1,000 documents
```

### Pricing Comparison Across Models

| Model | Input (per 1M) | Output (per 1M) | Speed | Quality |
|-------|----------------|-----------------|-------|---------|
| GPT-4o | $2.50 | $10.00 | Fast | Highest |
| GPT-4o-mini | $0.15 | $0.60 | Fastest | High |
| GPT-3.5-turbo | $0.50 | $1.50 | Fast | Good |
| Claude 3.5 Sonnet | $3.00 | $15.00 | Fast | Highest |
| Claude 3 Haiku | $0.25 | $1.25 | Fastest | Good |
| Gemini 1.5 Pro | $1.25 | $5.00 | Fast | High |
| Llama 3.1 70B (Groq) | $0.59 | $0.79 | Very Fast | Good |

**Key insight**: GPT-4o-mini and Claude Haiku are 10-20x cheaper than flagship models while still being capable.

### Hidden Costs

**System prompts count as input**:
```
Every request includes your system prompt.
1,000 token system prompt × 10,000 daily requests = 10M input tokens/day
At $2.50/1M = $25/day just for system prompts
```

**Retry costs**: Failed requests still charge for tokens processed

**Context accumulation in conversations**:
```
Turn 1: 100 input tokens
Turn 2: 200 input tokens (includes turn 1)
Turn 3: 300 input tokens (includes turns 1-2)
...
Turn 10: 1,000+ input tokens
```

### Cost at Scale

**Use Case: Customer Support Bot**
```
Daily conversations: 10,000
Avg turns per conversation: 5
Avg input tokens per turn: 500
Avg output tokens per turn: 200

Daily input tokens: 10,000 × 5 × 500 = 25M
Daily output tokens: 10,000 × 5 × 200 = 10M

Daily cost (GPT-4o):
  Input: 25M × $2.50/1M = $62.50
  Output: 10M × $10.00/1M = $100.00
  Total: $162.50/day = $4,875/month

Daily cost (GPT-4o-mini):
  Input: 25M × $0.15/1M = $3.75
  Output: 10M × $0.60/1M = $6.00
  Total: $9.75/day = $292.50/month
```

**16x difference** using a cheaper model—often with acceptable quality for support.

### Optimization Strategies

1. **Use the cheapest model that works**
   - Start with GPT-4o-mini, escalate only when needed

2. **Minimize system prompts**
   - Every token costs on every request

3. **Cache where possible**
   - Don't re-embed documents you've embedded before

4. **Truncate context intelligently**
   - Keep recent messages, summarize older ones

5. **Batch related requests**
   - One longer request often cheaper than many short ones

6. **Use tiered approach**
   - Classify intent with cheap model, handle complex queries with expensive model

---

## 🎬 Video Script

**[INTRO - Calculator showing token costs]**

AI isn't priced like regular SaaS. You don't pay per seat or per month. You pay per token—and those tokens add up fast.

**[CUT TO: Token counting animation]**

Remember, tokens aren't words. "Hello, how are you?" is 5 tokens. But a 4,000 word document is 5,000+ tokens. Every token you send counts.

**[CUT TO: Pricing table]**

Here's the current pricing landscape. GPT-4o charges $2.50 per million input tokens and $10 per million output. Output costs more because it's generated one token at a time—more compute per token.

**[CUT TO: Simple cost calculation]**

Let's calculate. A simple question and answer—maybe 15 tokens total—costs about $0.00009. Basically nothing. But scale to a million requests and suddenly we're talking real money.

**[CUT TO: Document analysis calculation]**

Process a 4,000 token document with a 500 token response? That's about 1.5 cents. Do 1,000 documents per day for a month, and you're at $450.

**[CUT TO: Model comparison chart]**

But here's the key insight. GPT-4o-mini costs 10 to 20 times less than GPT-4o—and for many tasks, it works just as well. Same with Claude Haiku versus Claude 3.5 Sonnet.

**[CUT TO: Hidden costs diagram]**

Watch for hidden costs. Your system prompt is sent with every request. A 1,000 token prompt, 10,000 daily requests—that's $25 per day just in system prompts. And conversations accumulate: turn 10 includes all previous turns.

**[CUT TO: Customer support example]**

Real world example: a customer support bot handling 10,000 conversations daily. With GPT-4o-mini? About $10 per day. With GPT-4o? $160 per day. Same functionality, 16x price difference.

**[CUT TO: Speaker on camera]**

The strategy is simple: start with the cheapest model that works, minimize prompts, cache what you can, and use tiered approaches—cheap model for classification, expensive model only when needed.

**[END - Runtime: 6:32]**

---

## 🔬 Interactive Lab: Building a Cost Calculator

### Objective
Build a comprehensive AI cost calculator.

### Part 1: Token Counting (15 minutes)

```python
import tiktoken

def count_tokens(text, model="gpt-4o"):
    """Count tokens for a given text and model."""
    # GPT-4o uses cl100k_base encoding
    enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(text))

# Test with different content types
test_texts = {
    "Short question": "What is machine learning?",
    "Paragraph": """Machine learning is a subset of artificial intelligence 
        that enables computers to learn from data without being explicitly 
        programmed. It uses algorithms to identify patterns and make decisions.""",
    "Code sample": '''def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    return quicksort(left) + [pivot] + quicksort([x for x in arr if x > pivot])''',
    "JSON data": '{"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]}'
}

print("Token Counts:")
print("-" * 40)
for name, text in test_texts.items():
    tokens = count_tokens(text)
    words = len(text.split())
    print(f"{name:20} | {tokens:4} tokens | {words:3} words | {tokens/words:.2f} ratio")
```

### Part 2: Cost Calculator (25 minutes)

```python
# Model pricing (as of late 2024)
PRICING = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "gpt-4-turbo": {"input": 10.00, "output": 30.00},
    "gpt-3.5-turbo": {"input": 0.50, "output": 1.50},
    "claude-3.5-sonnet": {"input": 3.00, "output": 15.00},
    "claude-3-haiku": {"input": 0.25, "output": 1.25},
}

class CostCalculator:
    def __init__(self, model="gpt-4o"):
        self.model = model
        self.pricing = PRICING[model]
        self.enc = tiktoken.get_encoding("cl100k_base")
    
    def count_tokens(self, text):
        return len(self.enc.encode(text))
    
    def calculate_cost(self, input_text, output_text):
        """Calculate cost for a single request."""
        input_tokens = self.count_tokens(input_text)
        output_tokens = self.count_tokens(output_text)
        
        input_cost = (input_tokens / 1_000_000) * self.pricing["input"]
        output_cost = (output_tokens / 1_000_000) * self.pricing["output"]
        
        return {
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "input_cost": input_cost,
            "output_cost": output_cost,
            "total_cost": input_cost + output_cost
        }
    
    def estimate_monthly(self, requests_per_day, avg_input_tokens, avg_output_tokens):
        """Estimate monthly costs."""
        daily_input = requests_per_day * avg_input_tokens
        daily_output = requests_per_day * avg_output_tokens
        
        daily_cost = (
            (daily_input / 1_000_000) * self.pricing["input"] +
            (daily_output / 1_000_000) * self.pricing["output"]
        )
        
        return {
            "daily_tokens": daily_input + daily_output,
            "daily_cost": daily_cost,
            "monthly_cost": daily_cost * 30,
            "yearly_cost": daily_cost * 365
        }

# Example usage
calc = CostCalculator("gpt-4o-mini")

# Single request
result = calc.calculate_cost(
    "Analyze this customer feedback and extract key themes: ...(customer feedback text)...",
    "Key themes identified: 1. Product quality, 2. Delivery speed, 3. Customer service"
)
print("Single Request Cost:")
print(f"  Input tokens: {result['input_tokens']}")
print(f"  Output tokens: {result['output_tokens']}")
print(f"  Total cost: ${result['total_cost']:.6f}")

# Monthly estimate
monthly = calc.estimate_monthly(
    requests_per_day=5000,
    avg_input_tokens=800,
    avg_output_tokens=300
)
print(f"\nMonthly Estimate ({calc.model}):")
print(f"  Daily cost: ${monthly['daily_cost']:.2f}")
print(f"  Monthly cost: ${monthly['monthly_cost']:.2f}")
```

### Part 3: Compare Models at Scale (15 minutes)

```python
# Compare all models for a use case
def compare_models(requests_per_day, avg_input_tokens, avg_output_tokens):
    print(f"\nModel Comparison ({requests_per_day} requests/day)")
    print(f"Avg: {avg_input_tokens} input + {avg_output_tokens} output tokens")
    print("-" * 60)
    
    results = []
    for model in PRICING.keys():
        calc = CostCalculator(model)
        monthly = calc.estimate_monthly(requests_per_day, avg_input_tokens, avg_output_tokens)
        results.append((model, monthly['monthly_cost']))
    
    # Sort by cost
    results.sort(key=lambda x: x[1])
    
    for model, cost in results:
        bar = "█" * int(cost / max(r[1] for r in results) * 30)
        print(f"{model:20} ${cost:8.2f} {bar}")

# Customer support scenario
compare_models(requests_per_day=10000, avg_input_tokens=500, avg_output_tokens=200)

# Document analysis scenario
compare_models(requests_per_day=1000, avg_input_tokens=4000, avg_output_tokens=800)
```

### Submission
Submit your cost analysis for a real or hypothetical AI use case in your organization.

---

## ✅ Knowledge Check

### Question 1
Why does output typically cost more than input in AI APIs?

A) Output is higher quality  
B) Output generated sequentially requires more compute per token  
C) To discourage long responses  
D) Output uses different models  

**Correct Answer**: B

**Explanation**: Input tokens are processed in parallel (one forward pass), while output tokens are generated one at a time, each requiring a forward pass through the model. This sequential generation is more compute-intensive.

---

### Question 2
A task uses 1,000 input tokens and 500 output tokens with GPT-4o ($2.50 input, $10.00 output per 1M). What's the approximate cost?

A) $0.0025  
B) $0.0075  
C) $0.075  
D) $0.75  

**Correct Answer**: B

**Explanation**: (1,000 × $2.50/1M) + (500 × $10.00/1M) = $0.0025 + $0.005 = $0.0075

---

### Question 3
What's a major hidden cost in conversational AI applications?

A) Model download time  
B) Context accumulation—each turn includes all previous turns  
C) User interface rendering  
D) Internet bandwidth  

**Correct Answer**: B

**Explanation**: In conversations, each turn typically includes the full history. Turn 10 might include 10x the tokens of turn 1, making later turns much more expensive.

---

### Question 4
What's the most effective cost optimization strategy?

A) Always use the most expensive model  
B) Use the cheapest model that achieves acceptable quality  
C) Avoid using AI altogether  
D) Process everything in batches  

**Correct Answer**: B

**Explanation**: The biggest cost savings come from model selection. GPT-4o-mini or Claude Haiku can be 10-20x cheaper than flagship models while still meeting quality requirements for many tasks.

---

### Question 5
For a high-volume support bot (10,000 daily requests), what's the approximate monthly cost difference between GPT-4o and GPT-4o-mini?

A) About 2x  
B) About 5x  
C) About 10-15x  
D) About the same  

**Correct Answer**: C

**Explanation**: GPT-4o-mini is roughly 15-20x cheaper than GPT-4o. For high-volume applications, this translates to thousands of dollars in monthly savings.

---

*You've completed Lesson 3.1! Understanding token economics is the foundation of building cost-effective AI applications.*
