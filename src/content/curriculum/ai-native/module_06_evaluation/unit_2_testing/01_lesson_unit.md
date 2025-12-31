# Lesson 2.1: Unit Testing LLM Apps

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Testing Strategies

---

## 📚 Reading Material

### Testing LLM Outputs

```python
import pytest

def test_summarization_length():
    result = summarize(LONG_TEXT, max_sentences=3)
    sentences = result.split('.')
    assert len(sentences) <= 4  # Allow for partial

def test_classification_format():
    result = classify(TEXT)
    assert result in ["positive", "negative", "neutral"]

def test_extraction_completeness():
    result = extract_entities(TEXT_WITH_ENTITIES)
    assert "John Smith" in result["names"]
    assert "Acme Corp" in result["companies"]
```

### Assertion Strategies

| Type | Use For | Example |
|------|---------|---------|
| Contains | Key phrases | `assert "refund" in response` |
| Not Contains | Forbidden content | `assert "password" not in response` |
| Format | Structure | `json.loads(response)` |
| Length | Size limits | `len(response) < 500` |
| Pattern | Regex match | `re.match(r'\d{3}-\d{4}', response)` |

### Mock LLM Calls

```python
from unittest.mock import patch

def test_with_mock():
    with patch('myapp.llm.generate') as mock:
        mock.return_value = "Expected response"
        result = my_function()
        assert result == "Processed: Expected response"
```

---

## 🎬 Video Script

**[INTRO - Test pyramid]**

Unit testing LLM apps requires different strategies than traditional code. Let me show you the patterns.

**[CUT TO: Assertion strategies]**

Test contains, not contains, format, length, patterns. Don't test for exact match—that's too brittle.

**[CUT TO: Mocking]**

Mock LLM calls for deterministic tests. Test your logic, not the model's output.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why not test for exact output match?

A) Too slow  
B) LLM outputs vary—test for properties instead  
C) Not allowed  
D) Too expensive  

**Correct Answer**: B
