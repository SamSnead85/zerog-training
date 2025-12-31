# Lesson 5.1: Prompting for Code Generation

> **Duration**: 55 minutes | **Type**: Domain
> **Unit**: 5 - Domain Applications

---

## 📚 Reading Material

### Code-Specific Prompting

Code prompts differ from prose prompts:
- Must be syntactically correct
- Requires context (language, framework, environment)
- Benefits from examples and test cases
- Needs constraints (style, compatibility)

### The Code Prompt Formula

```
[Context] + [Task] + [Constraints] + [Examples/Tests]
```

**Example**:
```
Language: Python 3.11
Framework: FastAPI
Style: PEP8, type hints required

Task: Create an endpoint that accepts a list of user IDs and returns their profile data from a PostgreSQL database.

Requirements:
- Use async database operations
- Include proper error handling
- Return 404 for not found users
- Validate input with Pydantic

Example usage:
POST /users/profiles
Body: {"user_ids": [1, 2, 3]}
Response: {...}
```

### Generation Patterns

**Function generation**:
```
Write a Python function that:
- Takes a list of dictionaries
- Filters by a given key-value pair
- Returns sorted by another key

Signature: def filter_and_sort(items: list[dict], filter_key: str, 
                               filter_value: Any, sort_key: str) -> list[dict]

Include docstring and type hints.
```

**Class generation**:
```
Create a Python class for a shopping cart:
- Add items (product, quantity, price)
- Remove items
- Calculate total
- Apply discount codes
- Support iteration

Include: __init__, __repr__, __iter__, properties for total
```

### Debugging Prompts

```
This code has a bug. Find and fix it.

```python
def merge_sorted(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    return result
```

Explain the bug and provide corrected code.
```

### Code Review Prompts

```
Review this code for:
1. Bugs or logic errors
2. Performance issues
3. Security vulnerabilities
4. Style/readability improvements

```python
[CODE]
```

Format:
## Issues Found
- [1] Line X: Description + Fix
## Suggestions
- ...
```

### Test Generation

```
Generate pytest tests for this function:

```python
def calculate_shipping(weight: float, distance: int, express: bool = False) -> float:
    base = weight * 0.5
    distance_fee = distance * 0.1
    express_fee = 10 if express else 0
    return base + distance_fee + express_fee
```

Include:
- Normal cases
- Edge cases (0, negative, large values)
- Express vs standard comparison
```

---

## 🎬 Video Script

**[INTRO - Code generation example]**

Code prompts need precision. Let me show you patterns that generate working, maintainable code.

**[CUT TO: Formula]**

The formula: context plus task plus constraints plus examples. Context is language, framework, environment. Task is what to build. Constraints are style, compatibility, requirements. Examples show expected usage.

**[CUT TO: Generation patterns]**

For functions: specify the signature, describe behavior, request docstrings. For classes: list methods, specify relationships, include magic methods.

**[CUT TO: Debugging]**

For debugging: paste the code, describe the symptom, ask for explanation and fix. The model traces through execution and spots the issue.

**[CUT TO: Reviews and tests]**

For code review: list categories—bugs, performance, security, style. For tests: specify the testing framework, request edge cases, ask for assertions.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What should a code generation prompt include?

A) Just the function name  
B) Context, task, constraints, and examples  
C) Only the expected output  
D) The full codebase  

**Correct Answer**: B

---

*You've completed Lesson 5.1! You can now prompt effectively for code.*
