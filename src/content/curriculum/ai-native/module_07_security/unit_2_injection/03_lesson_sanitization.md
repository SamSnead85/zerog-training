# Lesson 2.3: Output Sanitization

> **Duration**: 50 minutes | **Type**: Security
> **Unit**: 2 - Prompt Injection Defense

---

## 📚 Reading Material

### Why Sanitize Output?

LLM output might contain:
- Injected instructions (for downstream systems)
- PII from training data
- Malicious code/scripts
- Unsafe content

### Output Validation

```python
def sanitize_output(llm_response):
    # Remove potential scripts
    cleaned = remove_scripts(llm_response)
    
    # Redact PII
    cleaned = redact_pii(cleaned)
    
    # Check for instruction leakage
    if contains_system_prompt(cleaned):
        return "I cannot share that information."
    
    # Validate against content policy
    if violates_policy(cleaned):
        return "I cannot provide that response."
    
    return cleaned
```

### PII Redaction

```python
import re

def redact_pii(text):
    patterns = {
        "ssn": r"\b\d{3}-\d{2}-\d{4}\b",
        "email": r"\b[\w.-]+@[\w.-]+\.\w+\b",
        "phone": r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
        "credit_card": r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b"
    }
    
    for pii_type, pattern in patterns.items():
        text = re.sub(pattern, f"[REDACTED {pii_type.upper()}]", text)
    
    return text
```

### Never Execute LLM Output

```python
# DANGEROUS
code = llm("Write code to...")
exec(code)  # NEVER DO THIS

# SAFER
code = llm("Write code to...")
sandboxed_exec(code, timeout=5)  # Isolated environment
```

---

## 🎬 Video Script

**[INTRO - Output risks]**

Don't trust LLM output. It could contain injections, PII, malicious code.

**[CUT TO: Sanitization]**

Remove scripts, redact PII, check for instruction leakage. Validate against policy.

**[CUT TO: Execution warning]**

Never execute LLM output directly. Sandbox everything.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why sanitize LLM output?

A) Better formatting  
B) Output may contain injections, PII, or harmful content  
C) Faster  
D) Not needed  

**Correct Answer**: B
