# Module 1 Capstone Challenge: Prompt Engineering Challenge

## Overview

Welcome to the Module 1 Capstone Challenge. This assessment tests your ability to apply prompt engineering techniques to solve a real-world problem. You have **90 minutes** to complete this challenge.

## The Scenario

You're a developer at TechCorp, and your team has been asked to build an AI-powered code review assistant. The first prototype is due in 2 hours, and you need to design the prompt engineering strategy.

## Challenge Requirements

### Part 1: Design a Code Review System Prompt (30 points)

Create a system prompt for a code review assistant that:

1. **Establishes expertise**: The AI should act as a senior developer with 15+ years of experience
2. **Defines review categories**: Bugs, security issues, performance, and code style
3. **Sets output format**: Structured response with severity levels
4. **Includes constraints**: Must be constructive, specific, and actionable

**Deliverable**: A complete system prompt (100-300 words). Submit as `system_prompt.md`.

**Evaluation Criteria**:
- Clear role definition (5 points)
- Comprehensive review categories (10 points)
- Structured output specification (10 points)
- Practical constraints (5 points)

---

### Part 2: Few-Shot Prompt Design (30 points)

Create a few-shot prompt template that demonstrates:

1. **Input format**: How code should be submitted
2. **Two examples**: One for a bug, one for a security issue
3. **Consistent output**: Each example follows the same structure

**Deliverable**: A complete few-shot prompt with 2 examples. Submit as `few_shot_prompt.md`.

**Evaluation Criteria**:
- Clear input format (5 points)
- High-quality examples (15 points)
- Consistent structure (10 points)

---

### Part 3: Chain-of-Thought Analysis (20 points)

Design a chain-of-thought prompt that guides the model through analyzing this code:

```python
def process_user_data(user_input, db_connection):
    query = f"SELECT * FROM users WHERE id = {user_input}"
    result = db_connection.execute(query)
    return eval(result.get('preferences', '{}'))
```

Your prompt should:
1. Ask the model to identify potential issues step by step
2. Have it consider each category (bugs, security, performance)
3. Produce a final recommendation

**Deliverable**: A CoT prompt that produces step-by-step analysis. Submit as `cot_prompt.md`.

**Evaluation Criteria**:
- Explicit reasoning steps (10 points)
- Comprehensive analysis (10 points)

---

### Part 4: Practical Implementation (20 points)

Write a Python function that:

1. Uses your prompts with the OpenAI API
2. Parses the structured output
3. Returns a dictionary with findings by category

**Deliverable**: Working Python code. Submit as `code_reviewer.py`.

```python
def review_code(code: str) -> dict:
    """
    Review code and return structured findings.
    
    Returns:
        {
            "bugs": [...],
            "security": [...],
            "performance": [...],
            "style": [...]
        }
    """
    # Your implementation here
    pass
```

**Evaluation Criteria**:
- Working implementation (10 points)
- Proper error handling (5 points)
- Clean code (5 points)

---

## Submission Checklist

Submit a folder containing:

- [ ] `system_prompt.md` - Your system prompt design
- [ ] `few_shot_prompt.md` - Your few-shot prompt with examples
- [ ] `cot_prompt.md` - Your chain-of-thought prompt
- [ ] `code_reviewer.py` - Your Python implementation
- [ ] `reflection.md` - Brief reflection on your approach (optional, 5 bonus points)

## Passing Score

**Minimum: 70 points** (out of 100 + 5 bonus)

## Time Management Tips

- Part 1: 20 minutes
- Part 2: 25 minutes
- Part 3: 20 minutes
- Part 4: 25 minutes

## Resources Allowed

- Your course notes
- Official API documentation
- No external prompt libraries or templates

---

**Good luck! Remember: The best prompts are clear, specific, and tested.**
