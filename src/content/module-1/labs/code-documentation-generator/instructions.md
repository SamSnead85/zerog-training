# Lab: Code Documentation Generator

## Overview

In this hands-on lab, you'll build a production-ready code documentation generator using prompt engineering techniques. You'll take a Python function with poor or no documentation and use an LLM to generate comprehensive docstrings, type hints, and usage examples.

**Time**: 2 hours  
**Difficulty**: Beginner  
**Skills**: Prompt engineering, API integration, output parsing

## Learning Objectives

By completing this lab, you will:
- Apply prompt engineering techniques to generate structured output
- Handle different code patterns and edge cases
- Implement validation for LLM-generated content
- Build a reusable utility for your development workflow

## The Challenge

Your company has a legacy codebase with hundreds of undocumented functions. Rather than manually documenting each one, you'll build an AI-powered tool that:

1. Takes a Python function as input
2. Analyzes the code to understand its purpose
3. Generates a comprehensive Google-style docstring
4. Adds type hints if missing
5. Provides usage examples

## Prerequisites

Before starting, ensure you have:
- Python 3.9+
- OpenAI API key set as environment variable
- The following packages installed:

```bash
pip install openai python-dotenv
```

## Step 1: Set Up Your Project

Create a new directory for this lab and set up your environment:

```bash
mkdir code-doc-generator
cd code-doc-generator
touch doc_generator.py
touch .env
```

Add your API key to `.env`:
```
OPENAI_API_KEY=your-api-key-here
```

## Step 2: Analyze the Starter Code

Open the starter code in `starter_code/sample_functions.py`. You'll see several functions that need documentation:

```python
def calc_price(base, qty, disc=0, tax_rate=0.08):
    if disc > 1:
        disc = disc / 100
    subtotal = base * qty * (1 - disc)
    return subtotal * (1 + tax_rate)


def merge_dicts(d1, d2, overwrite=True):
    result = d1.copy()
    for k, v in d2.items():
        if k in result and not overwrite:
            continue
        result[k] = v
    return result


def retry_operation(func, max_attempts=3, delay=1):
    import time
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            time.sleep(delay)
```

These functions work but are hard to understand without documentation.

## Step 3: Design Your Prompt

The key to this lab is crafting an effective prompt. Consider:

1. **Role**: What persona should the AI adopt?
2. **Context**: What information does it need about the code?
3. **Format**: What structure should the output follow?
4. **Examples**: Should you provide few-shot examples?

Your prompt should instruct the LLM to:
- Analyze the function's purpose from code
- Infer parameter types from usage
- Generate Google-style docstrings
- Include realistic usage examples

> **Hint**: Start with a simple prompt, test it, and iterate. The best prompts are usually refined through experimentation.

## Step 4: Implement the Generator

Create your documentation generator in `doc_generator.py`:

```python
from openai import OpenAI
from dotenv import load_dotenv
import re

load_dotenv()

def generate_documentation(code: str) -> str:
    """
    Generate documentation for a Python function.
    
    Args:
        code: The Python function code as a string
        
    Returns:
        The documented version of the function
    """
    client = OpenAI()
    
    # TODO: Create your prompt here
    # Consider: role, format instructions, examples
    system_prompt = """..."""
    
    user_prompt = f"""..."""
    
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3  # Lower temperature for consistent output
    )
    
    return response.choices[0].message.content
```

## Step 5: Add Output Validation

LLMs can produce inconsistent output. Add validation to ensure quality:

```python
def validate_documentation(documented_code: str) -> dict:
    """
    Validate that the generated documentation meets quality standards.
    
    Returns:
        dict with 'valid' boolean and 'issues' list
    """
    issues = []
    
    # Check for docstring presence
    if '"""' not in documented_code and "'''" not in documented_code:
        issues.append("No docstring found")
    
    # Check for Args section
    if 'Args:' not in documented_code:
        issues.append("Missing Args section")
    
    # Check for Returns section
    if 'Returns:' not in documented_code:
        issues.append("Missing Returns section")
    
    # Check for type hints
    if '->' not in documented_code:
        issues.append("Missing return type hint")
    
    return {
        'valid': len(issues) == 0,
        'issues': issues
    }
```

## Step 6: Test with All Sample Functions

Create a test script that processes all starter functions:

```python
from sample_functions import calc_price, merge_dicts, retry_operation
import inspect

functions = [calc_price, merge_dicts, retry_operation]

for func in functions:
    code = inspect.getsource(func)
    print(f"\n{'='*50}")
    print(f"Processing: {func.__name__}")
    print('='*50)
    
    documented = generate_documentation(code)
    validation = validate_documentation(documented)
    
    print(documented)
    print(f"\nValidation: {validation}")
```

## Step 7: Handle Edge Cases

Extend your solution to handle:
- Functions with decorators
- Async functions
- Class methods
- Functions with complex return types

## Deliverables

Submit the following:

1. **`doc_generator.py`**: Your complete documentation generator
2. **`test_results.md`**: Output showing all 3 functions documented
3. **`reflection.md`**: Answer these questions:
   - What prompt techniques were most effective?
   - How did you handle inconsistent LLM output?
   - What edge cases were challenging?

## Evaluation Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Working solution | 30 | All sample functions processed |
| Prompt quality | 25 | Clear, effective prompt design |
| Output validation | 20 | Handles edge cases gracefully |
| Code quality | 15 | Clean, documented code |
| Reflection depth | 10 | Thoughtful analysis |

**Passing score**: 70 points

## Bonus Challenges

For extra credit, implement:

1. **Batch processing**: Document an entire file of functions
2. **Multiple styles**: Support Google, NumPy, and Sphinx docstring formats
3. **Type inference**: Use static analysis to improve type hint accuracy
4. **CLI tool**: Create a command-line interface for the generator

---

*Good luck! Remember: the best learning comes from experimentation.*
