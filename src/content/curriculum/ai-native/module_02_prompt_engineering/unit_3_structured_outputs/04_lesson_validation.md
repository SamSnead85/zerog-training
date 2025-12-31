# Lesson 3.4: Validation and Error Handling

> **Duration**: 50 minutes | **Type**: Production
> **Unit**: 3 - Structured Outputs

---

## 📚 Reading Material

### Why Validation Matters

Even with JSON mode and structured outputs, things go wrong:
- Malformed responses (rare but possible)
- Missing required fields
- Values outside expected ranges
- Type mismatches
- Business logic violations

### Validation Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Format Validation             │
│  - Valid JSON/parseable                 │
├─────────────────────────────────────────┤
│  Layer 2: Schema Validation             │
│  - Required fields present              │
│  - Types match                          │
├─────────────────────────────────────────┤
│  Layer 3: Value Validation              │
│  - Ranges, formats, enums               │
├─────────────────────────────────────────┤
│  Layer 4: Business Logic                │
│  - Domain-specific rules                │
└─────────────────────────────────────────┘
```

### Pydantic Validation

```python
from pydantic import BaseModel, Field, field_validator
from typing import Optional
import re

class Customer(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str
    age: Optional[int] = Field(None, ge=0, le=150)
    status: str = Field(pattern="^(active|inactive|pending)$")
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', v):
            raise ValueError('Invalid email format')
        return v.lower()

# Validation happens automatically
try:
    customer = Customer(
        name="John",
        email="invalid-email",
        age=25,
        status="active"
    )
except ValidationError as e:
    print(e.errors())
```

### Retry Strategies

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
def extract_with_retry(text, model_class):
    """Extract with automatic retry on failure"""
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"Extract: {text}"}],
        response_format=model_class
    )
    return response.choices[0].message.parsed
```

### Graceful Degradation

```python
def extract_with_fallback(text, model_class, fallback=None):
    """Extract with graceful fallback"""
    try:
        # Try structured outputs
        return extract_structured(text, model_class)
    except Exception as e1:
        try:
            # Fall back to JSON mode + manual parsing
            return extract_json_mode(text, model_class)
        except Exception as e2:
            # Return fallback or partial result
            if fallback:
                return fallback
            return {"error": str(e2), "partial": None}
```

### Validation Error Handling

```python
def handle_validation_error(error, original_text, retry_count=0):
    """Handle validation errors intelligently"""
    
    if retry_count >= 3:
        return None
    
    # Extract which fields failed
    failed_fields = [e['loc'][0] for e in error.errors()]
    
    # Create repair prompt
    repair_prompt = f"""
The previous extraction had validation errors in: {failed_fields}

Original text: {original_text}

Please extract again, ensuring:
{format_error_guidance(error.errors())}
"""
    
    # Retry with guidance
    return extract_with_retry(repair_prompt, retry_count + 1)
```

### Confidence Scoring

```python
class ExtractedField(BaseModel):
    value: str
    confidence: float = Field(ge=0.0, le=1.0)
    source_text: Optional[str] = None

class ExtractedContact(BaseModel):
    name: ExtractedField
    email: ExtractedField
    phone: ExtractedField

def extract_with_confidence(text):
    """Extract with confidence scores"""
    prompt = f"""
Extract contact information with confidence scores (0-1).
High confidence = explicitly stated
Medium confidence = inferred
Low confidence = guessed

Text: {text}
"""
    # ... extraction logic
```

### Logging and Monitoring

```python
import logging

logger = logging.getLogger(__name__)

def extract_and_log(text, model_class):
    """Extract with comprehensive logging"""
    
    start_time = time.time()
    
    try:
        result = extract_structured(text, model_class)
        
        logger.info("extraction_success", extra={
            "model_class": model_class.__name__,
            "latency_ms": (time.time() - start_time) * 1000,
            "input_length": len(text)
        })
        
        return result
        
    except ValidationError as e:
        logger.warning("validation_error", extra={
            "model_class": model_class.__name__,
            "errors": e.errors(),
            "input_sample": text[:100]
        })
        raise
        
    except Exception as e:
        logger.error("extraction_failed", extra={
            "model_class": model_class.__name__,
            "error": str(e),
            "input_sample": text[:100]
        })
        raise
```

---

## 🎬 Video Script

**[INTRO - Validation layers diagram]**

Structured outputs aren't bulletproof. Malformed responses, missing fields, invalid values—they happen. Let me show you how to build robust extraction systems.

**[CUT TO: Validation layers]**

Think in layers. First: format validation—is it valid JSON? Second: schema validation—are required fields present, types correct? Third: value validation—ranges, formats, enums. Fourth: business logic—domain rules.

**[CUT TO: Pydantic validators]**

Pydantic handles layers 2 and 3 beautifully. Field constraints for min/max, patterns, enums. Custom validators for complex rules like email format. Validation errors tell you exactly what failed.

**[CUT TO: Retry code]**

When validation fails, retry. Use exponential backoff—one second, two seconds, four seconds. Three attempts is usually enough. The tenacity library makes this clean.

**[CUT TO: Fallback code]**

Graceful degradation: try structured outputs first, fall back to JSON mode, return partial results if all else fails. Never crash on extraction failures in production.

**[CUT TO: Confidence scoring]**

For ambiguous extractions, add confidence scores. High confidence for explicit mentions. Medium for inferences. Low for guesses. Let downstream systems decide how to handle uncertainty.

**[CUT TO: Logging code]**

Log everything: successes, failures, latencies, error types. You'll need this data to improve prompts and catch regressions. Include input samples for debugging.

**[CUT TO: Speaker on camera]**

Validation isn't optional—it's what makes extraction production-ready. Define schemas strictly. Validate at every layer. Retry with intelligence. Log comprehensively. That's how you build systems that work at scale.

**[END - Runtime: 5:35]**

---

## 🔬 Interactive Lab: Production Validation

### Objective
Build a robust extraction pipeline with comprehensive validation.

### Part 1: Multi-Layer Validation (20 minutes)

```python
from openai import OpenAI
from pydantic import BaseModel, Field, field_validator, ValidationError
from typing import Optional
import json
import re

client = OpenAI()

class OrderItem(BaseModel):
    product: str = Field(min_length=1)
    quantity: int = Field(ge=1, le=1000)
    unit_price: float = Field(ge=0)
    
class Order(BaseModel):
    order_id: str = Field(pattern=r'^ORD-\d{5,}$')
    customer_email: str
    items: list[OrderItem] = Field(min_length=1)
    total: float = Field(ge=0)
    status: str = Field(pattern='^(pending|confirmed|shipped|delivered)$')
    
    @field_validator('customer_email')
    @classmethod
    def validate_email(cls, v):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', v):
            raise ValueError('Invalid email format')
        return v.lower()
    
    @field_validator('total')
    @classmethod
    def validate_total(cls, v, info):
        # Cross-field validation would go here
        return round(v, 2)

def validate_order(data: dict) -> tuple[bool, str]:
    """Validate order data at all layers"""
    errors = []
    
    # Layer 1: Format (already handled by JSON parsing)
    
    # Layer 2 & 3: Schema and value validation
    try:
        order = Order.model_validate(data)
    except ValidationError as e:
        for error in e.errors():
            field = '.'.join(str(x) for x in error['loc'])
            errors.append(f"{field}: {error['msg']}")
        return False, "; ".join(errors)
    
    # Layer 4: Business logic
    calculated_total = sum(item.quantity * item.unit_price for item in order.items)
    if abs(calculated_total - order.total) > 0.01:
        errors.append(f"Total mismatch: calculated {calculated_total}, stated {order.total}")
    
    if errors:
        return False, "; ".join(errors)
    
    return True, "Valid"

# Test
test_data = {
    "order_id": "ORD-12345",
    "customer_email": "john@example.com",
    "items": [
        {"product": "Widget", "quantity": 2, "unit_price": 9.99}
    ],
    "total": 19.98,
    "status": "pending"
}

valid, message = validate_order(test_data)
print(f"Valid: {valid}, Message: {message}")

# Test with errors
bad_data = {
    "order_id": "12345",  # Missing ORD- prefix
    "customer_email": "not-an-email",
    "items": [],  # Empty
    "total": -50,  # Negative
    "status": "unknown"  # Invalid enum
}

valid, message = validate_order(bad_data)
print(f"Valid: {valid}, Message: {message}")
```

### Part 2: Retry with Repair (20 minutes)

```python
def extract_with_smart_retry(text, model_class, max_retries=3):
    """Extract with validation and smart repair"""
    
    last_error = None
    
    for attempt in range(max_retries):
        try:
            # Add repair hints on retry
            if attempt > 0 and last_error:
                enhanced_prompt = f"""
Previous extraction attempt failed with: {last_error}

Please extract again, fixing these issues.

Text: {text}
"""
            else:
                enhanced_prompt = text
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": f"""
Extract data matching this schema:
{json.dumps(model_class.model_json_schema(), indent=2)}

Be precise and follow all format requirements."""},
                    {"role": "user", "content": enhanced_prompt}
                ]
            )
            
            raw = json.loads(response.choices[0].message.content)
            validated = model_class.model_validate(raw)
            
            return {
                "success": True,
                "data": validated,
                "attempts": attempt + 1
            }
            
        except ValidationError as e:
            last_error = "; ".join([
                f"{'.'.join(str(x) for x in err['loc'])}: {err['msg']}"
                for err in e.errors()
            ])
            print(f"Attempt {attempt + 1} failed: {last_error}")
            
        except Exception as e:
            last_error = str(e)
            print(f"Attempt {attempt + 1} error: {last_error}")
    
    return {
        "success": False,
        "error": last_error,
        "attempts": max_retries
    }

# Test with challenging input
text = """
Order #ORD-98765 from jsmith@company.com
Items: 5 Deluxe Widgets @ $24.99 each
Plus 2 Standard Widgets @ $12.50
Total: $127.45 (pending)
"""

result = extract_with_smart_retry(text, Order)
if result["success"]:
    print(f"\nExtracted in {result['attempts']} attempts:")
    print(f"Order ID: {result['data'].order_id}")
    print(f"Items: {len(result['data'].items)}")
else:
    print(f"\nFailed after {result['attempts']} attempts: {result['error']}")
```

### Part 3: Comprehensive Logging (10 minutes)

```python
import time
from dataclasses import dataclass, asdict
from datetime import datetime

@dataclass
class ExtractionLog:
    timestamp: str
    model_class: str
    input_length: int
    success: bool
    attempts: int
    latency_ms: float
    error: Optional[str] = None
    
    def to_dict(self):
        return asdict(self)

extraction_logs = []

def extract_with_logging(text, model_class):
    """Extract with comprehensive logging"""
    
    start = time.time()
    
    log = ExtractionLog(
        timestamp=datetime.now().isoformat(),
        model_class=model_class.__name__,
        input_length=len(text),
        success=False,
        attempts=0,
        latency_ms=0
    )
    
    try:
        result = extract_with_smart_retry(text, model_class)
        
        log.success = result["success"]
        log.attempts = result["attempts"]
        log.error = result.get("error")
        
        return result
        
    finally:
        log.latency_ms = (time.time() - start) * 1000
        extraction_logs.append(log)
        
        # Print metrics
        print(f"\n📊 Extraction Metrics:")
        print(f"   Success: {log.success}")
        print(f"   Attempts: {log.attempts}")
        print(f"   Latency: {log.latency_ms:.0f}ms")

# Run extractions
test_texts = [
    "Order ORD-11111 from test@test.com: 1 Item @ $10, Total $10, pending",
    "Invalid order with bad data",
]

for text in test_texts:
    print(f"\n{'='*50}")
    result = extract_with_logging(text, Order)

# Summary
print(f"\n\n📈 Session Summary:")
print(f"   Total: {len(extraction_logs)}")
print(f"   Success rate: {sum(1 for l in extraction_logs if l.success)/len(extraction_logs):.0%}")
print(f"   Avg latency: {sum(l.latency_ms for l in extraction_logs)/len(extraction_logs):.0f}ms")
```

### Submission
Build an extraction pipeline with full validation, retry, and logging for a real use case.

---

## ✅ Knowledge Check

### Question 1
What are the four validation layers?

A) Unit, Integration, System, E2E  
B) Format, Schema, Value, Business Logic  
C) Input, Process, Output, Review  
D) Parse, Validate, Transform, Store  

**Correct Answer**: B

**Explanation**: Format (valid JSON), Schema (required fields, types), Value (ranges, formats), Business Logic (domain rules). Each layer catches different types of errors.

---

### Question 2
What should a retry strategy include?

A) Retry immediately as fast as possible  
B) Exponential backoff and error context for repair  
C) Never retry, fail fast  
D) Retry indefinitely  

**Correct Answer**: B

**Explanation**: Good retry strategies use exponential backoff (increasing delays) and include error context in retry prompts to help the model fix specific issues.

---

### Question 3
Why add logging to extraction pipelines?

A) To slow things down  
B) To debug failures, track metrics, and catch regressions  
C) It's required by the API  
D) To increase costs  

**Correct Answer**: B

**Explanation**: Logging captures success rates, latencies, error types, and input samples. This data is essential for debugging, monitoring, and improving prompts over time.

---

*Congratulations on completing Unit 3! You now build production-grade structured outputs.*
