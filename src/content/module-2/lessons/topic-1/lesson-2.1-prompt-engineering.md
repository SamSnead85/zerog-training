# Lesson: Mastering Prompt Engineering

## Overview

In this lesson, you'll learn the art and science of prompt engineering. We'll cover core patterns, advanced techniques, and systematic approaches to crafting prompts that consistently produce high-quality results.

**Duration**: 25 minutes  
**Prerequisites**: Module 1 (AI-Native Foundations)

## Learning Objectives

By the end of this lesson, you will:
- Apply core prompt patterns effectively
- Use structured output formats reliably
- Implement few-shot and chain-of-thought prompting
- Debug and iterate on prompts systematically
- Avoid common prompt engineering pitfalls

---

## Why Prompt Engineering Matters

The same model can produce dramatically different results based on how you prompt it.

**Bad prompt:**
```
Write about dogs.
```

**Better prompt:**
```
Write a 200-word educational paragraph about golden retrievers 
for a pet adoption website. Include their temperament, exercise 
needs, and suitability for families with children.
```

The difference in output quality is often 10x or more.

---

## Core Prompt Patterns

### 1. Persona Pattern

Assign expertise to the model.

```python
SYSTEM_PROMPT = """
You are a senior Python developer with 15 years of experience.
You specialize in:
- Clean, maintainable code
- Performance optimization
- Security best practices

When reviewing code, you provide specific, actionable feedback
with examples of improvements.
"""
```

**When to use:** Technical tasks, domain-specific advice, consistent voice.

### 2. Task Decomposition Pattern

Break complex tasks into steps.

```python
TASK_PROMPT = """
Analyze this customer support ticket by:

1. CATEGORIZE: Identify the issue type (billing, technical, general)
2. SENTIMENT: Assess customer sentiment (frustrated, neutral, satisfied)
3. URGENCY: Rate urgency (low, medium, high)
4. ACTION: Recommend the best next action

Ticket:
{ticket_text}

Provide your analysis following the numbered steps above.
"""
```

**When to use:** Multi-part analysis, structured outputs, quality control.

### 3. Few-Shot Pattern

Show examples of desired output.

```python
CLASSIFICATION_PROMPT = """
Classify these support tickets.

Example 1:
Ticket: "I can't log in to my account"
Category: Technical - Authentication

Example 2:
Ticket: "Charge me twice this month!!!"
Category: Billing - Dispute

Example 3:
Ticket: "What are your hours?"
Category: General - Inquiry

Now classify:
Ticket: "{new_ticket}"
Category:
"""
```

**When to use:** Classification, formatting, style matching.

### 4. Chain of Thought Pattern

Encourage reasoning before answering.

```python
REASONING_PROMPT = """
Solve this problem step by step. Show your reasoning at each step
before providing the final answer.

Problem: A store has a 30% off sale. If an item originally costs $80 
and you have a $10 coupon (applied after the discount), 
what is the final price?

Think through this step by step:
"""
```

**Output expected:**
```
Step 1: Calculate the 30% discount
$80 × 0.30 = $24 discount

Step 2: Subtract discount from original price
$80 - $24 = $56

Step 3: Apply the $10 coupon
$56 - $10 = $46

Final answer: $46
```

**When to use:** Math, logic, complex decisions.

---

## Structured Output Techniques

### JSON Mode

Force structured responses for reliable parsing.

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={"type": "json_object"},
    messages=[{
        "role": "user",
        "content": """
Extract the following information from this text:
- company_name
- founding_year
- headquarters_city
- industry

Text: "Apple Inc., founded in 1976, is headquartered in Cupertino. 
The technology giant is known for the iPhone and Mac computers."

Return as JSON.
"""
    }]
)

data = json.loads(response.choices[0].message.content)
# {"company_name": "Apple Inc.", "founding_year": 1976, ...}
```

### Schema Enforcement

Define exact output structure.

```python
from pydantic import BaseModel

class ExtractionResult(BaseModel):
    company_name: str
    founding_year: int
    headquarters_city: str
    industry: str

response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[...],
    response_format=ExtractionResult
)

result = response.choices[0].message.parsed
# Strongly typed ExtractionResult object
```

---

## Advanced Techniques

### 1. Self-Consistency

Generate multiple responses and pick the most common.

```python
def self_consistent_answer(question: str, n: int = 5) -> str:
    """Generate multiple answers and return most frequent."""
    
    answers = []
    
    for _ in range(n):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user",
                "content": f"Answer concisely: {question}"
            }],
            temperature=0.7  # Allow variation
        )
        answers.append(response.choices[0].message.content.strip())
    
    # Find most common answer
    from collections import Counter
    most_common = Counter(answers).most_common(1)[0][0]
    
    return most_common
```

### 2. ReAct Prompting

Interleave reasoning and actions.

```python
REACT_PROMPT = """
Answer questions using this format:

Thought: [Your reasoning about what to do]
Action: [tool_name(parameters)]
Observation: [Result from the action]
... (repeat as needed)
Thought: [Final reasoning]
Answer: [Your final answer]

Available tools:
- search(query): Search the knowledge base
- calculate(expression): Perform math
- lookup(item): Look up specific information

Question: {question}

Begin:
"""
```

### 3. Constitutional AI Pattern

Self-check against principles.

```python
CONSTITUTIONAL_PROMPT = """
First, draft a response to the user's question.

Then, check your response against these principles:
1. Is it accurate and factual?
2. Is it helpful and complete?
3. Is it safe and appropriate?
4. Does it avoid harmful content?

If any check fails, revise your response.

Question: {question}

Draft response:
[Write initial response]

Principle checks:
[Check each principle]

Final response:
[Revised if needed]
"""
```

---

## Prompt Debugging

### Common Issues and Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| Too vague | Rambling, off-topic | Add specificity, constraints |
| Too constrained | "I cannot" responses | Loosen restrictions |
| Wrong format | Unstructured output | Add explicit format example |
| Inconsistent | Different answers each time | Lower temperature, add examples |
| Hallucination | Confident errors | Add "If unsure, say so" |

### Systematic Debugging Process

```python
def debug_prompt(prompt: str, test_inputs: list) -> dict:
    """Test prompt with various inputs."""
    
    results = {
        "successes": [],
        "failures": [],
        "patterns": []
    }
    
    for test in test_inputs:
        response = get_completion(prompt.format(**test["input"]))
        
        # Check against expected behavior
        if meets_expectations(response, test["expected"]):
            results["successes"].append(test)
        else:
            results["failures"].append({
                "test": test,
                "actual": response,
                "issue": identify_issue(response, test["expected"])
            })
    
    # Identify patterns in failures
    results["patterns"] = analyze_failure_patterns(results["failures"])
    
    return results
```

---

## Prompt Templates

### Code Generation

```python
CODE_GEN_PROMPT = """
Write a {language} function that {description}.

Requirements:
- Function name: {function_name}
- Inputs: {inputs}
- Returns: {returns}
- Handle edge cases: {edge_cases}

Include:
1. Type hints
2. Docstring
3. Example usage

Code:
"""
```

### Content Summarization

```python
SUMMARY_PROMPT = """
Summarize the following text in {length} words.

Focus on:
- Key facts and findings
- Main arguments
- Important conclusions

Do not include:
- Minor details
- Speculative content
- Repetitive information

Text:
{text}

Summary:
"""
```

### Classification

```python
CLASSIFY_PROMPT = """
Classify this {item_type} into exactly one of these categories:
{categories}

Respond with only the category name, nothing else.

{item_type}: {item}

Category:
"""
```

---

## Best Practices

### Do:
1. ✅ Be specific about format and length
2. ✅ Provide examples when possible
3. ✅ Use delimiters for clarity (```, ###, ---)
4. ✅ Give the model an "out" for uncertainty
5. ✅ Test with edge cases

### Don't:
1. ❌ Use vague instructions ("write something good")
2. ❌ Assume context without providing it
3. ❌ Overload prompts with too many tasks
4. ❌ Forget to specify output format
5. ❌ Rely on single tests to validate prompts

---

## Key Takeaways

1. **Prompt quality directly impacts output quality**
2. **Patterns provide reliable starting points** - persona, few-shot, CoT
3. **Structure outputs explicitly** - JSON mode, schemas
4. **Test systematically** - multiple inputs, edge cases
5. **Iterate based on failures** - debug, refine, retest
6. **Document what works** - build prompt libraries

---

## Next Steps

- **Practice**: Improve a prompt through 5 iterations
- **Next Lesson**: GitHub Copilot Best Practices
- **Lab**: Build a prompt testing framework
