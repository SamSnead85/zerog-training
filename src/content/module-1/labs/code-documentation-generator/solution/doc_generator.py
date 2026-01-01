"""
Solution: Code Documentation Generator

This module demonstrates an effective approach to AI-powered documentation generation
using prompt engineering best practices.
"""

import os
import re
import inspect
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
client = OpenAI()

# =============================================================================
# PROMPT TEMPLATE
# =============================================================================

SYSTEM_PROMPT = """You are an expert Python developer specializing in code documentation.
Your task is to add comprehensive Google-style docstrings and type hints to Python functions.

Documentation Standards:
1. Use Google-style docstring format
2. Include type hints for all parameters and return values
3. Write a clear one-line summary followed by detailed description if needed
4. Document all parameters with types and descriptions
5. Document return value with type and description
6. Include realistic usage examples in the docstring
7. Add Raises section if the function can raise exceptions

Output only the documented function code, nothing else."""

USER_PROMPT_TEMPLATE = """Add comprehensive documentation to this Python function:

```python
{code}
```

Requirements:
- Add type hints to all parameters and return value
- Write a Google-style docstring with:
  - One-line summary
  - Detailed description if the function is complex
  - Args section with types and descriptions
  - Returns section with type and description
  - Raises section if applicable
  - Example usage section

Return only the documented function code."""


# =============================================================================
# CORE FUNCTIONS
# =============================================================================

def generate_documentation(code: str, model: str = "gpt-4-turbo") -> str:
    """
    Generate comprehensive documentation for a Python function.
    
    This function uses an LLM to analyze the provided code and generate
    Google-style docstrings with type hints and usage examples.
    
    Args:
        code: The Python function source code as a string.
        model: The OpenAI model to use for generation. Defaults to "gpt-4-turbo".
        
    Returns:
        The documented version of the function with docstrings and type hints.
        
    Raises:
        ValueError: If the provided code is empty.
        openai.APIError: If the API call fails.
        
    Example:
        >>> code = "def add(a, b): return a + b"
        >>> documented = generate_documentation(code)
        >>> print(documented)
        def add(a: int, b: int) -> int:
            \"\"\"Add two numbers together...\"\"\"
    """
    if not code or not code.strip():
        raise ValueError("Code cannot be empty")
    
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": USER_PROMPT_TEMPLATE.format(code=code)}
        ],
        temperature=0.3,  # Lower temperature for consistent formatting
        max_tokens=2000
    )
    
    result = response.choices[0].message.content
    
    # Clean up markdown code blocks if present
    result = clean_code_output(result)
    
    return result


def clean_code_output(code: str) -> str:
    """
    Remove markdown code block formatting from LLM output.
    
    Args:
        code: The potentially markdown-formatted code string.
        
    Returns:
        Clean Python code without markdown formatting.
    """
    # Remove ```python and ``` markers
    code = re.sub(r'^```python\n?', '', code.strip())
    code = re.sub(r'\n?```$', '', code.strip())
    return code


def validate_documentation(documented_code: str) -> dict:
    """
    Validate that generated documentation meets quality standards.
    
    Checks for presence of required docstring sections, type hints,
    and proper formatting.
    
    Args:
        documented_code: The documented function code to validate.
        
    Returns:
        A dictionary containing:
            - valid (bool): Whether all checks passed
            - issues (list): List of issue descriptions
            - score (int): Quality score out of 100
    """
    issues = []
    score = 100
    
    # Check for docstring presence
    if '"""' not in documented_code and "'''" not in documented_code:
        issues.append("No docstring found")
        score -= 30
    
    # Check for Args section
    if 'Args:' not in documented_code:
        issues.append("Missing Args section in docstring")
        score -= 15
    
    # Check for Returns section
    if 'Returns:' not in documented_code:
        issues.append("Missing Returns section in docstring")
        score -= 15
    
    # Check for return type hint
    if '->' not in documented_code:
        issues.append("Missing return type hint")
        score -= 10
    
    # Check for parameter type hints (look for : after parameter name)
    # Match pattern like "def func(param: type"
    type_hint_pattern = r'def \w+\([^)]*\w+:\s*\w+'
    if not re.search(type_hint_pattern, documented_code):
        issues.append("Missing parameter type hints")
        score -= 10
    
    # Check for Example section (bonus)
    if 'Example' not in documented_code:
        issues.append("Consider adding Example section")
        score -= 5
    
    return {
        'valid': len([i for i in issues if 'Consider' not in i]) == 0,
        'issues': issues,
        'score': max(0, score)
    }


def document_file(file_path: str) -> dict:
    """
    Document all functions in a Python file.
    
    Args:
        file_path: Path to the Python file to document.
        
    Returns:
        Dictionary mapping function names to their documented versions.
    """
    import ast
    
    with open(file_path, 'r') as f:
        source = f.read()
    
    tree = ast.parse(source)
    results = {}
    
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            # Get the source of this function
            func_source = ast.get_source_segment(source, node)
            if func_source:
                documented = generate_documentation(func_source)
                validation = validate_documentation(documented)
                results[node.name] = {
                    'original': func_source,
                    'documented': documented,
                    'validation': validation
                }
    
    return results


# =============================================================================
# CLI INTERFACE
# =============================================================================

def main():
    """Main function to run the documentation generator from command line."""
    import sys
    
    if len(sys.argv) < 2:
        # Demo mode: document sample functions
        from sample_functions import (
            calc_price, merge_dicts, retry_operation
        )
        
        functions = [calc_price, merge_dicts, retry_operation]
        
        for func in functions:
            code = inspect.getsource(func)
            print(f"\n{'='*60}")
            print(f"ORIGINAL: {func.__name__}")
            print('='*60)
            print(code)
            
            print(f"\n{'='*60}")
            print(f"DOCUMENTED: {func.__name__}")
            print('='*60)
            documented = generate_documentation(code)
            print(documented)
            
            validation = validate_documentation(documented)
            print(f"\nValidation Score: {validation['score']}/100")
            if validation['issues']:
                print(f"Issues: {', '.join(validation['issues'])}")
            print()
    else:
        # File mode: document a file
        file_path = sys.argv[1]
        results = document_file(file_path)
        
        for func_name, data in results.items():
            print(f"\n{'='*60}")
            print(f"FUNCTION: {func_name}")
            print('='*60)
            print(data['documented'])
            print(f"\nScore: {data['validation']['score']}/100")


if __name__ == "__main__":
    main()
