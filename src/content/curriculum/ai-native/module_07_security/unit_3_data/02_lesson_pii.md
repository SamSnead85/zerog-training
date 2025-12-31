# Lesson 3.2: PII Protection

> **Duration**: 55 minutes | **Type**: Security
> **Unit**: 3 - Data Security

---

## 📚 Reading Material

### PII in AI Systems

| Risk | Example |
|------|---------|
| Training data leakage | SSN memorized from training |
| User input exposure | PII in logs/traces |
| Output disclosure | Generated responses with PII |
| Embedding leakage | Reconstructing data from vectors |

### Input Protection

```python
def protect_input(user_input):
    # Detect PII before processing
    pii_entities = detect_pii(user_input)
    
    if pii_entities:
        # Option 1: Redact before LLM
        redacted = redact_entities(user_input, pii_entities)
        return process_and_restore(redacted, pii_entities)
        
        # Option 2: Reject
        # raise PIIError("Please remove personal information")
```

### Output Protection

```python
def protect_output(llm_response, user_context):
    # Never output PII not from current context
    detected = detect_pii(llm_response)
    original_pii = extract_pii_from_context(user_context)
    
    for entity in detected:
        if entity not in original_pii:
            llm_response = redact(llm_response, entity)
    
    return llm_response
```

### Logging Without PII

```python
def safe_log(request, response):
    log_entry = {
        "timestamp": datetime.now(),
        "request_length": len(request),
        "response_length": len(response),
        "request_hash": hash(request),  # Not the actual content
        "model": model_name
    }
    # Do NOT log: request content, response content, user data
```

---

## 🎬 Video Script

**[INTRO - PII flow diagram]**

PII appears in inputs, outputs, logs, embeddings. Protect at every stage.

**[CUT TO: Input protection]**

Detect and redact PII before it reaches the LLM. Restore in response if needed.

**[CUT TO: Logging]**

Never log raw content. Log metadata, lengths, hashes—not actual PII.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why redact PII before LLM processing?

A) Faster  
B) Prevents PII from being memorized or logged  
C) Cheaper  
D) Better answers  

**Correct Answer**: B
