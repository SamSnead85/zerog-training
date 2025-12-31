# Lesson 2.1: Few-Shot Learning

> **Duration**: 55 minutes | **Type**: Technique
> **Unit**: 2 - Advanced Prompting Techniques

---

## 📚 Reading Material

### What Is Few-Shot Learning?

**Few-shot learning** means teaching the model by example. Instead of describing what you want, you show it:

```
Example 1: Input → Output
Example 2: Input → Output
Example 3: Input → Output
Now: New Input → ?
```

The model learns the pattern from your examples and applies it to new inputs.

### Zero-Shot vs Few-Shot vs Many-Shot

**Zero-shot** (no examples):
```
Classify this as positive or negative:
"I love this product"
```

**Few-shot** (1-5 examples):
```
Classify as positive or negative:
"Great purchase" → positive
"Waste of money" → negative
"I love this product" → ?
```

**Many-shot** (5-20+ examples):
```
[15 examples covering edge cases...]
"I love this product" → ?
```

### When to Use Few-Shot

Few-shot is essential when:

| Situation | Why Few-Shot Helps |
|-----------|-------------------|
| Specific output format | Shows exact structure needed |
| Classification tasks | Demonstrates category boundaries |
| Style matching | Shows tone and writing style |
| Domain-specific language | Teaches jargon and conventions |
| Edge cases | Covers ambiguous situations |

### Crafting Effective Examples

**Rule 1: Representative diversity**
Cover the range of inputs you expect:
```
EXAMPLES:
"Excellent quality!" → positive
"It's okay, nothing special" → neutral
"Terrible, don't buy" → negative
"The shipping was fast but product is meh" → neutral
"Amazing value for money!!!" → positive
```

**Rule 2: Clear, unambiguous outputs**
```
BAD: "Great product" → somewhat positive (vague)
GOOD: "Great product" → positive (clear)
```

**Rule 3: Match input complexity**
If your inputs are long, use examples with long inputs.
If your inputs have special formatting, show that formatting.

**Rule 4: Include edge cases**
```
# Edge case: mixed sentiment
"Great product, terrible customer service" → mixed

# Edge case: neutral/factual
"The package weighs 2.5 pounds" → neutral

# Edge case: implicit sentiment
"I returned it the next day" → negative
```

### Example Format Templates

**Simple format**:
```
Input: "text here"
Output: result

Input: "another text"
Output: result
```

**JSON format**:
```
{"input": "text here", "output": "result"}
{"input": "another text", "output": "result"}
```

**Labeled format**:
```
Text: "Great product"
Sentiment: positive
Confidence: high

Text: "It's fine I guess"
Sentiment: neutral
Confidence: medium
```

### Few-Shot for Different Tasks

**Classification**:
```
Classify the support ticket:

"My password doesn't work" → account_access
"I was charged twice" → billing
"Where is my order?" → shipping
"Your app keeps crashing" → technical

Now classify:
"I can't log in to my account"
```

**Data Extraction**:
```
Extract the meeting info:

"Call with John on Tuesday at 2pm"
→ {attendee: "John", day: "Tuesday", time: "2pm"}

"1:1 with Sarah tomorrow morning"
→ {attendee: "Sarah", day: "tomorrow", time: "morning"}

Now extract:
"Sync with the CEO at 4:30"
```

**Style Transfer**:
```
Rewrite in formal business English:

Casual: "Hey, can you send that report asap?"
Formal: "I would appreciate it if you could send the report at your earliest convenience."

Casual: "This idea sucks, let's try something else"
Formal: "I have concerns about this approach. Perhaps we should explore alternative options."

Now rewrite:
"Got it, will do!"
```

---

## 🎬 Video Script

**[INTRO - Zero-shot vs few-shot comparison]**

Instead of describing what you want, what if you could just show it? That's few-shot learning. Let me show you why it's one of your most powerful tools.

**[CUT TO: Simple example]**

Here's the pattern. You provide examples—input-output pairs—then give a new input. The model learns the pattern from your examples. For classification: "Great purchase" goes to positive, "Waste of money" goes to negative. Now classify: "I love this product."

**[CUT TO: When to use diagram]**

Use few-shot for specific output formats—showing is clearer than describing. For classification—demonstrates category boundaries. For style matching—captures tone better than adjectives. And for edge cases—shows how to handle ambiguity.

**[CUT TO: Example quality rules]**

Example quality matters. Rule one: representative diversity—cover the range of inputs you expect. Rule two: clear outputs—no ambiguity. Rule three: match complexity—if real inputs are long, use long examples. Rule four: include edge cases.

**[CUT TO: Classification example]**

For classification, show three to five examples covering each category. More examples for categories with subtle boundaries. The model needs to understand where the edges are.

**[CUT TO: Data extraction example]**

For extraction, show the exact output format you want. Include cases with missing data—what should happen then? Include variations in input format.

**[CUT TO: Speaker on camera]**

Few-shot is often the difference between a prompt that works and one that doesn't. When describing fails, showing succeeds. Start with three examples. Add more if accuracy isn't sufficient. Focus on edge cases that cause errors.

**[END - Runtime: 5:45]**

---

## 🔬 Interactive Lab: Few-Shot Mastery

### Objective
Build and evaluate few-shot prompts for different tasks.

### Part 1: Classification Comparison (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def test_zero_vs_few_shot(test_cases, examples=None):
    """Compare zero-shot vs few-shot accuracy"""
    
    # Zero-shot prompt
    zero_shot = """Classify this customer message as one of:
- billing
- technical
- shipping
- account
- feedback

Message: {text}
Category:"""
    
    # Few-shot prompt
    few_shot = """Classify this customer message as one of:
- billing
- technical
- shipping
- account
- feedback

Examples:
"I was charged twice for my order" → billing
"The app crashes when I click submit" → technical
"Where is my package?" → shipping
"I can't reset my password" → account
"I love your product!" → feedback
"Refund not received yet" → billing
"Website is too slow" → technical

Message: {text}
Category:"""
    
    results = {"zero_shot": 0, "few_shot": 0, "total": len(test_cases)}
    
    for text, expected in test_cases:
        # Test zero-shot
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": zero_shot.format(text=text)}],
            max_tokens=20
        )
        zero_result = response.choices[0].message.content.strip().lower()
        if expected.lower() in zero_result:
            results["zero_shot"] += 1
        
        # Test few-shot
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": few_shot.format(text=text)}],
            max_tokens=20
        )
        few_result = response.choices[0].message.content.strip().lower()
        if expected.lower() in few_result:
            results["few_shot"] += 1
    
    return results

# Test cases with ground truth
test_cases = [
    ("My credit card was declined", "billing"),
    ("App freezes on Android", "technical"),
    ("Package marked delivered but not received", "shipping"),
    ("Can't change my email address", "account"),
    ("Best purchase ever!", "feedback"),
    ("Double charged last month", "billing"),
    ("Error 404 when uploading files", "technical"),
]

results = test_zero_vs_few_shot(test_cases)
print(f"\nZero-shot accuracy: {results['zero_shot']}/{results['total']}")
print(f"Few-shot accuracy: {results['few_shot']}/{results['total']}")
```

### Part 2: Example Engineering (25 minutes)

```python
def optimize_examples(task, initial_examples, test_cases):
    """Iterate on examples to improve accuracy"""
    
    def build_prompt(examples, text):
        examples_str = "\n".join([f'"{e[0]}" → {e[1]}' for e in examples])
        return f"""{task}

Examples:
{examples_str}

Now classify:
"{text}"
Output:"""
    
    def evaluate(examples):
        correct = 0
        errors = []
        for text, expected in test_cases:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": build_prompt(examples, text)}],
                max_tokens=50
            )
            result = response.choices[0].message.content.strip()
            if expected.lower() in result.lower():
                correct += 1
            else:
                errors.append((text, expected, result))
        return correct / len(test_cases), errors
    
    # Initial evaluation
    accuracy, errors = evaluate(initial_examples)
    print(f"Initial accuracy: {accuracy:.1%}")
    print(f"Errors: {len(errors)}")
    for text, expected, got in errors:
        print(f"  '{text[:30]}...' expected {expected}, got {got}")
    
    return accuracy, errors

# Define task
task = "Classify customer intent as: question, complaint, request, or praise"

# Initial examples
examples = [
    ("What are your hours?", "question"),
    ("This is terrible!", "complaint"),
    ("Please send a replacement", "request"),
    ("Love your service!", "praise"),
]

# Test cases
test_cases = [
    ("How much does shipping cost?", "question"),
    ("Your product broke after one day", "complaint"),
    ("Can you expedite my order?", "request"),
    ("You guys are the best!", "praise"),
    ("Where do I find my tracking number?", "question"),
    ("I want a refund immediately", "request"),  # Edge case: could be complaint
    ("Not happy with the quality", "complaint"),
]

optimize_examples(task, examples, test_cases)

# Now try adding edge case examples
improved_examples = [
    ("What are your hours?", "question"),
    ("This is terrible!", "complaint"),
    ("Please send a replacement", "request"),
    ("Love your service!", "praise"),
    ("I want a refund immediately", "request"),  # Clarify: request even if unhappy
    ("Not satisfied but willing to try again", "complaint"),  # Edge case
]

print("\nWith improved examples:")
optimize_examples(task, improved_examples, test_cases)
```

### Part 3: Format Transfer (10 minutes)

```python
def few_shot_format_transfer(examples, inputs):
    """Use few-shot to transfer input to specific format"""
    
    examples_text = "\n\n".join([
        f"Input: {ex['input']}\nOutput: {ex['output']}" 
        for ex in examples
    ])
    
    results = []
    for inp in inputs:
        prompt = f"""Transform the input to match the output format shown in examples.

{examples_text}

Input: {inp}
Output:"""
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200
        )
        results.append(response.choices[0].message.content)
    
    return results

# Example: Convert natural language to SQL WHERE clauses
examples = [
    {"input": "users older than 30", "output": "age > 30"},
    {"input": "orders from last week", "output": "order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)"},
    {"input": "products under $50", "output": "price < 50"},
    {"input": "active customers", "output": "status = 'active'"},
]

test_inputs = [
    "users who signed up in 2024",
    "products with more than 100 reviews",
    "orders with total over $1000",
]

outputs = few_shot_format_transfer(examples, test_inputs)
for inp, out in zip(test_inputs, outputs):
    print(f"Input: {inp}")
    print(f"Output: {out}\n")
```

### Submission
Create a few-shot prompt with at least 5 examples that achieves >90% accuracy on a classification task.

---

## ✅ Knowledge Check

### Question 1
What is the main advantage of few-shot over zero-shot prompting?

A) It uses fewer tokens  
B) It shows the model the pattern through examples  
C) It's faster  
D) It requires less thinking  

**Correct Answer**: B

**Explanation**: Few-shot learning demonstrates the desired pattern through examples, making it easier for the model to understand exactly what you want versus describing it in words.

---

### Question 2
How many examples should you typically use in few-shot prompting?

A) Always exactly 1  
B) Always exactly 10  
C) Start with 3-5, add more for edge cases  
D) As many as possible  

**Correct Answer**: C

**Explanation**: Start with 3-5 representative examples. Add more examples if you have edge cases or if accuracy isn't sufficient. More isn't always better—diverse, representative examples matter more than quantity.

---

### Question 3
What should you include in your few-shot examples for classification?

A) Only positive examples  
B) Examples from every category, including edge cases  
C) Only the most common cases  
D) Random examples  

**Correct Answer**: B

**Explanation**: Include examples from every category to show the model the boundaries. Edge cases are especially important—they teach the model how to handle ambiguous situations.

---

### Question 4
When does few-shot learning help the most?

A) When the task is extremely simple  
B) For specific formats, style matching, and edge cases  
C) When you have no idea what you want  
D) For open-ended creative tasks  

**Correct Answer**: B

**Explanation**: Few-shot excels at specific output formats (showing is easier than describing), style matching, domain-specific language, and handling edge cases.

---

*You've completed Lesson 2.1! You now know how to use few-shot learning effectively.*
