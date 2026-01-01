#!/usr/bin/env python3
"""
Verification script for Code Documentation Generator lab.

This script tests the student's solution against the sample functions
and validates the output meets quality standards.
"""

import sys
import os
import importlib.util

# Minimum passing score
PASSING_SCORE = 70


def load_module(module_path: str):
    """Dynamically load a Python module from a file path."""
    spec = importlib.util.spec_from_file_location("student_solution", module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_function_exists(module, function_name: str) -> tuple[bool, str]:
    """Check if a required function exists in the module."""
    if hasattr(module, function_name):
        return True, f"✓ Function '{function_name}' found"
    return False, f"✗ Function '{function_name}' not found"


def test_documentation_generation(module) -> tuple[int, list[str]]:
    """Test the documentation generation functionality."""
    results = []
    score = 0
    
    # Test code samples
    test_cases = [
        ("def add(a, b): return a + b", "Simple function"),
        ("def greet(name, title='Mr'): return f'Hello, {title} {name}'", "Function with default"),
        ("def process(data, callback, **kwargs): return callback(data, **kwargs)", "Complex signature"),
    ]
    
    try:
        generate_func = module.generate_documentation
    except AttributeError:
        return 0, ["✗ generate_documentation function not found"]
    
    for code, description in test_cases:
        try:
            result = generate_func(code)
            
            # Check for basic quality indicators
            has_docstring = '"""' in result or "'''" in result
            has_type_hints = '->' in result
            has_args = 'Args:' in result or 'args:' in result.lower()
            
            checks_passed = sum([has_docstring, has_type_hints, has_args])
            
            if checks_passed == 3:
                score += 20
                results.append(f"✓ {description}: All checks passed")
            elif checks_passed >= 2:
                score += 10
                results.append(f"◐ {description}: Partial pass ({checks_passed}/3 checks)")
            else:
                results.append(f"✗ {description}: Failed ({checks_passed}/3 checks)")
                
        except Exception as e:
            results.append(f"✗ {description}: Error - {str(e)}")
    
    return score, results


def test_validation_function(module) -> tuple[int, list[str]]:
    """Test the validation functionality."""
    results = []
    score = 0
    
    try:
        validate_func = module.validate_documentation
    except AttributeError:
        return 0, ["✗ validate_documentation function not found"]
    
    # Test with good documentation
    good_doc = '''def add(a: int, b: int) -> int:
    """Add two numbers together.
    
    Args:
        a: First number.
        b: Second number.
        
    Returns:
        Sum of a and b.
    """
    return a + b'''
    
    try:
        result = validate_func(good_doc)
        if result.get('valid', False):
            score += 15
            results.append("✓ Correctly validated good documentation")
        else:
            results.append("✗ Failed to validate correct documentation")
    except Exception as e:
        results.append(f"✗ Validation error: {str(e)}")
    
    # Test with bad documentation (no docstring)
    bad_doc = "def add(a, b): return a + b"
    
    try:
        result = validate_func(bad_doc)
        if not result.get('valid', True):
            score += 15
            results.append("✓ Correctly rejected bad documentation")
        else:
            results.append("✗ Failed to reject bad documentation")
    except Exception as e:
        results.append(f"✗ Validation error for bad doc: {str(e)}")
    
    return score, results


def run_verification(solution_path: str) -> dict:
    """Run all verification tests on the student solution."""
    print(f"\n{'='*60}")
    print("CODE DOCUMENTATION GENERATOR - LAB VERIFICATION")
    print('='*60)
    
    total_score = 0
    all_results = []
    
    # Load the student's module
    try:
        module = load_module(solution_path)
        all_results.append("✓ Solution file loaded successfully")
    except Exception as e:
        print(f"✗ Failed to load solution: {e}")
        return {'passed': False, 'score': 0, 'details': [str(e)]}
    
    # Test 1: Check required functions exist
    print("\n1. Checking required functions...")
    for func_name in ['generate_documentation', 'validate_documentation']:
        passed, msg = test_function_exists(module, func_name)
        all_results.append(msg)
        if passed:
            total_score += 5
    
    # Test 2: Test documentation generation
    print("\n2. Testing documentation generation...")
    gen_score, gen_results = test_documentation_generation(module)
    total_score += gen_score
    all_results.extend(gen_results)
    
    # Test 3: Test validation function
    print("\n3. Testing validation function...")
    val_score, val_results = test_validation_function(module)
    total_score += val_score
    all_results.extend(val_results)
    
    # Print results
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)
    
    for result in all_results:
        print(f"  {result}")
    
    print("\n" + "="*60)
    print(f"FINAL SCORE: {total_score}/100")
    print(f"STATUS: {'PASSED' if total_score >= PASSING_SCORE else 'NEEDS WORK'}")
    print("="*60 + "\n")
    
    return {
        'passed': total_score >= PASSING_SCORE,
        'score': total_score,
        'passing_score': PASSING_SCORE,
        'details': all_results
    }


if __name__ == "__main__":
    # Default to looking for solution in current directory
    if len(sys.argv) > 1:
        solution_path = sys.argv[1]
    else:
        solution_path = "doc_generator.py"
    
    if not os.path.exists(solution_path):
        print(f"Error: Solution file not found at '{solution_path}'")
        print("Usage: python verify.py <path_to_doc_generator.py>")
        sys.exit(1)
    
    result = run_verification(solution_path)
    sys.exit(0 if result['passed'] else 1)
