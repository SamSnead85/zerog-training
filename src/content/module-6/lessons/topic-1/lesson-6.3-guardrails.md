# Lesson: Guardrails and Content Filtering

## Overview

In this lesson, you'll learn how to implement comprehensive guardrails that protect your LLM applications from producing harmful, off-topic, or non-compliant content. We'll cover input validation, output filtering, and safety layers.

**Duration**: 20 minutes  
**Prerequisites**: Module 6 Lesson 1-2 (Security Fundamentals, Defensive Prompting)

## Learning Objectives

By the end of this lesson, you will:
- Implement input validation and sanitization
- Build output filtering for content safety
- Use off-the-shelf guardrail libraries
- Create topic guards to keep responses on-topic
- Set up PII detection and masking

---

## What Are Guardrails?

Guardrails are safety mechanisms that wrap LLM calls to ensure inputs and outputs meet your requirements.

```
User Input
    ↓
┌─────────────────────┐
│ Input Guardrails    │ ← Validate, sanitize, detect attacks
└─────────────────────┘
    ↓
┌─────────────────────┐
│ LLM Processing      │
└─────────────────────┘
    ↓
┌─────────────────────┐
│ Output Guardrails   │ ← Filter, validate, redact
└─────────────────────┘
    ↓
Safe Response
```

---

## Input Guardrails

### 1. Basic Input Validation

```python
import re
from dataclasses import dataclass
from typing import Optional

@dataclass
class ValidationResult:
    valid: bool
    processed_input: str
    blocked_reason: Optional[str] = None


def validate_input(user_input: str) -> ValidationResult:
    """Validate and sanitize user input."""
    
    # Check length
    if len(user_input) > 10000:
        return ValidationResult(
            valid=False,
            processed_input="",
            blocked_reason="Input too long (max 10,000 characters)"
        )
    
    if len(user_input.strip()) < 2:
        return ValidationResult(
            valid=False,
            processed_input="",
            blocked_reason="Input too short"
        )
    
    # Check for blocked patterns
    blocked_patterns = [
        r'ignore\s+previous\s+instructions',
        r'forget\s+your\s+rules',
        r'you\s+are\s+now\s+DAN',
        r'jailbreak',
    ]
    
    for pattern in blocked_patterns:
        if re.search(pattern, user_input, re.IGNORECASE):
            return ValidationResult(
                valid=False,
                processed_input="",
                blocked_reason="Potentially malicious input detected"
            )
    
    # Sanitize: Remove control characters
    sanitized = ''.join(char for char in user_input if char.isprintable() or char in '\n\t')
    
    return ValidationResult(
        valid=True,
        processed_input=sanitized
    )
```

### 2. Topic Detection

Ensure requests stay within your application's scope.

```python
from openai import OpenAI

client = OpenAI()

ALLOWED_TOPICS = [
    "product information",
    "order status",
    "returns and refunds",
    "shipping",
    "account help",
]


def is_on_topic(query: str, allowed_topics: list[str]) -> tuple[bool, str]:
    """Check if query is relevant to allowed topics."""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"""
Classify if this query relates to any of these topics: {allowed_topics}

Query: {query}

Respond with:
- "on_topic: [topic_name]" if it matches a topic
- "off_topic: [actual_topic]" if it doesn't match

Response:
"""
        }],
        max_tokens=50,
        temperature=0
    )
    
    result = response.choices[0].message.content.strip()
    
    if result.startswith("on_topic"):
        return True, result.split(":")[1].strip()
    else:
        return False, result.split(":")[1].strip() if ":" in result else "unknown"


# Usage
on_topic, topic = is_on_topic("What's your return policy?", ALLOWED_TOPICS)
# (True, "returns and refunds")

on_topic, topic = is_on_topic("How do I invest in stocks?", ALLOWED_TOPICS)
# (False, "financial_advice")
```

---

## Output Guardrails

### 1. Content Safety Filter

```python
def check_content_safety(response: str) -> tuple[bool, list[str]]:
    """Check response for unsafe content."""
    
    issues = []
    
    # Check for harmful content markers
    harmful_patterns = [
        (r'how\s+to\s+(make|create|build)\s+(bomb|weapon|explosive)', "dangerous_instructions"),
        (r'(kill|harm|hurt)\s+(yourself|others)', "violence"),
        (r'(suicide|self-harm)', "self_harm_content"),
    ]
    
    for pattern, issue_type in harmful_patterns:
        if re.search(pattern, response, re.IGNORECASE):
            issues.append(issue_type)
    
    # Use moderation API for comprehensive check
    moderation = client.moderations.create(input=response)
    
    if moderation.results[0].flagged:
        categories = moderation.results[0].categories
        for category, flagged in categories.model_dump().items():
            if flagged:
                issues.append(f"moderation_{category}")
    
    return len(issues) == 0, issues


# Usage
safe, issues = check_content_safety("Here's how to return your product...")
# (True, [])
```

### 2. Response Validation

Ensure responses meet quality standards.

```python
def validate_response(response: str, context: dict) -> ValidationResult:
    """Validate response quality and appropriateness."""
    
    # Check response isn't empty
    if len(response.strip()) < 10:
        return ValidationResult(
            valid=False,
            processed_input=response,
            blocked_reason="Response too short"
        )
    
    # Check response doesn't leak system prompt
    system_prompt_fragments = [
        "You are a helpful assistant",
        "SYSTEM PROMPT",
        "My instructions are",
    ]
    
    for fragment in system_prompt_fragments:
        if fragment.lower() in response.lower():
            return ValidationResult(
                valid=False,
                processed_input="I can't help with that request.",
                blocked_reason="Potential prompt leak detected"
            )
    
    # Check response doesn't contain forbidden phrases
    forbidden = ["I cannot help with", "As an AI language model"]
    
    for phrase in forbidden:
        response = response.replace(phrase, "")
    
    return ValidationResult(
        valid=True,
        processed_input=response
    )
```

---

## PII Detection and Masking

Protect personally identifiable information.

```python
import re
from typing import NamedTuple

class PIIMatch(NamedTuple):
    type: str
    value: str
    start: int
    end: int


class PIIDetector:
    """Detect and mask personally identifiable information."""
    
    PATTERNS = {
        "email": r'\b[\w.-]+@[\w.-]+\.\w+\b',
        "phone": r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
        "ssn": r'\b\d{3}-\d{2}-\d{4}\b',
        "credit_card": r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b',
        "ip_address": r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b',
    }
    
    MASKS = {
        "email": "[EMAIL]",
        "phone": "[PHONE]",
        "ssn": "[SSN]",
        "credit_card": "[CARD]",
        "ip_address": "[IP]",
    }
    
    def detect(self, text: str) -> list[PIIMatch]:
        """Detect PII in text."""
        matches = []
        
        for pii_type, pattern in self.PATTERNS.items():
            for match in re.finditer(pattern, text):
                matches.append(PIIMatch(
                    type=pii_type,
                    value=match.group(),
                    start=match.start(),
                    end=match.end()
                ))
        
        return matches
    
    def mask(self, text: str) -> str:
        """Mask all PII in text."""
        masked = text
        
        for pii_type, pattern in self.PATTERNS.items():
            masked = re.sub(pattern, self.MASKS[pii_type], masked)
        
        return masked


# Usage
detector = PIIDetector()

text = "Contact me at john@email.com or 555-123-4567"
print(detector.mask(text))
# "Contact me at [EMAIL] or [PHONE]"

matches = detector.detect(text)
# [PIIMatch(type='email', value='john@email.com', ...), ...]
```

---

## Complete Guardrail Pipeline

Combine all guards into a unified system.

```python
from dataclasses import dataclass
from typing import Optional, Callable
from enum import Enum

class GuardAction(Enum):
    ALLOW = "allow"
    BLOCK = "block"
    MODIFY = "modify"


@dataclass
class GuardResult:
    action: GuardAction
    content: str
    reason: Optional[str] = None


class GuardrailPipeline:
    """Complete guardrail system for LLM applications."""
    
    def __init__(self):
        self.input_guards: list[Callable] = []
        self.output_guards: list[Callable] = []
        self.pii_detector = PIIDetector()
    
    def add_input_guard(self, guard: Callable):
        """Add input validation function."""
        self.input_guards.append(guard)
    
    def add_output_guard(self, guard: Callable):
        """Add output validation function."""
        self.output_guards.append(guard)
    
    def process_input(self, user_input: str) -> GuardResult:
        """Run all input guards."""
        current = user_input
        
        for guard in self.input_guards:
            result = guard(current)
            
            if result.action == GuardAction.BLOCK:
                return result
            
            if result.action == GuardAction.MODIFY:
                current = result.content
        
        return GuardResult(
            action=GuardAction.ALLOW,
            content=current
        )
    
    def process_output(self, response: str) -> GuardResult:
        """Run all output guards."""
        current = response
        
        for guard in self.output_guards:
            result = guard(current)
            
            if result.action == GuardAction.BLOCK:
                return result
            
            if result.action == GuardAction.MODIFY:
                current = result.content
        
        # Always mask PII in output
        current = self.pii_detector.mask(current)
        
        return GuardResult(
            action=GuardAction.ALLOW,
            content=current
        )
    
    def protected_call(self, user_input: str, llm_func: Callable) -> str:
        """Execute LLM call with full guardrail protection."""
        
        # Input guards
        input_result = self.process_input(user_input)
        
        if input_result.action == GuardAction.BLOCK:
            return f"I can't process that request. {input_result.reason or ''}"
        
        # LLM call
        try:
            response = llm_func(input_result.content)
        except Exception as e:
            return "I encountered an error processing your request."
        
        # Output guards
        output_result = self.process_output(response)
        
        if output_result.action == GuardAction.BLOCK:
            return "I can't provide that response. Let me try differently."
        
        return output_result.content


# Setup
pipeline = GuardrailPipeline()

# Add input guards
def injection_guard(text: str) -> GuardResult:
    if "ignore previous" in text.lower():
        return GuardResult(GuardAction.BLOCK, "", "Potential injection")
    return GuardResult(GuardAction.ALLOW, text)

pipeline.add_input_guard(injection_guard)

# Add output guards
def safety_guard(text: str) -> GuardResult:
    safe, issues = check_content_safety(text)
    if not safe:
        return GuardResult(GuardAction.BLOCK, "", f"Safety issues: {issues}")
    return GuardResult(GuardAction.ALLOW, text)

pipeline.add_output_guard(safety_guard)

# Use
response = pipeline.protected_call(
    "What's your return policy?",
    lambda x: client.chat.completions.create(...).choices[0].message.content
)
```

---

## Using Guardrails Libraries

### NeMo Guardrails

```python
from nemoguardrails import RailsConfig, LLMRails

config = RailsConfig.from_path("./config")
rails = LLMRails(config)

response = rails.generate(
    messages=[{"role": "user", "content": "What's your return policy?"}]
)
```

### Guardrails AI

```python
from guardrails import Guard
from guardrails.hub import ToxicLanguage, PIIFilter

guard = Guard().use_many(
    ToxicLanguage(on_fail="fix"),
    PIIFilter(on_fail="fix"),
)

raw_response = llm.generate(prompt)
validated = guard.validate(raw_response)
```

---

## Key Takeaways

1. **Layer your guards**: Input and output filtering catch different issues
2. **Be specific**: Topic guards keep responses focused
3. **Protect PII**: Always detect and mask before logging or displaying
4. **Use standards**: Leverage existing libraries when possible
5. **Fail safely**: Blocked responses should be helpful, not cryptic
6. **Monitor**: Log guard activations to understand threats

---

## Next Steps

- **Lab**: Build a complete security pipeline
- **Next Lesson**: Fine-tuning for security compliance
- **Advanced**: Custom classifiers for domain-specific content moderation
