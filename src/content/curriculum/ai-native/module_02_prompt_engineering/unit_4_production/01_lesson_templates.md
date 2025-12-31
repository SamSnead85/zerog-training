# Lesson 4.1: Prompt Templates and Management

> **Duration**: 50 minutes | **Type**: Production
> **Unit**: 4 - Production Prompting

---

## 📚 Reading Material

### Why Template Prompts?

Hardcoded prompts in code are:
- Hard to update without deploys
- Difficult to version and rollback
- Scattered across codebase
- Not reusable

### Template Basics

```python
# Instead of:
prompt = f"Summarize this: {text}"

# Use templates:
template = "Summarize this in {num_sentences} sentences:\n\n{text}"
prompt = template.format(num_sentences=3, text=user_text)
```

### Prompt Template Libraries

**Jinja2** (Python):
```python
from jinja2 import Template

template = Template("""
You are a {{ role }} assistant.

{{ instructions }}

{% if examples %}
Examples:
{% for ex in examples %}
- {{ ex }}
{% endfor %}
{% endif %}

User Input: {{ user_input }}
""")

prompt = template.render(
    role="customer support",
    instructions="Be helpful and empathetic.",
    examples=["Great response", "Another example"],
    user_input="Help me!"
)
```

**LangChain** templates:
```python
from langchain_core.prompts import ChatPromptTemplate

template = ChatPromptTemplate.from_messages([
    ("system", "You are a {role} assistant."),
    ("human", "{user_input}")
])

messages = template.format_messages(
    role="helpful",
    user_input="Hello"
)
```

### Prompt Libraries

Organize prompts centrally:

```python
# prompts/library.py
PROMPTS = {
    "summarization": {
        "v1": "Summarize the following text in {length} sentences:\n\n{text}",
        "v2": """
You are a summarization expert.
Summarize in exactly {length} sentences.
Focus on key points only.

Text:
{text}

Summary:
"""
    },
    "classification": {
        "sentiment": "Classify as positive/negative/neutral:\n\n{text}",
        "topic": "Classify into one of: {categories}\n\nText: {text}"
    }
}

def get_prompt(name, version="latest"):
    category, task = name.split(".")
    versions = PROMPTS[category][task]
    if version == "latest":
        return list(versions.values())[-1] if isinstance(versions, dict) else versions
    return versions[version]
```

### Versioning Prompts

```python
@dataclass
class PromptVersion:
    id: str
    content: str
    created_at: datetime
    performance_metrics: dict
    is_active: bool

class PromptRegistry:
    def __init__(self):
        self.prompts: dict[str, list[PromptVersion]] = {}
    
    def register(self, name: str, content: str):
        version = PromptVersion(
            id=f"{name}-v{len(self.prompts.get(name, [])) + 1}",
            content=content,
            created_at=datetime.now(),
            performance_metrics={},
            is_active=True
        )
        self.prompts.setdefault(name, []).append(version)
    
    def get_active(self, name: str) -> str:
        for v in reversed(self.prompts[name]):
            if v.is_active:
                return v.content
```

### A/B Testing Prompts

```python
import random

class PromptExperiment:
    def __init__(self, name, variants, weights=None):
        self.name = name
        self.variants = variants
        self.weights = weights or [1/len(variants)] * len(variants)
        self.results = {v: {"calls": 0, "success": 0} for v in variants}
    
    def get_variant(self, user_id=None):
        if user_id:
            # Deterministic for user
            idx = hash(f"{self.name}:{user_id}") % len(self.variants)
            return self.variants[idx]
        return random.choices(self.variants, self.weights)[0]
    
    def record(self, variant, success):
        self.results[variant]["calls"] += 1
        if success:
            self.results[variant]["success"] += 1
```

### External Prompt Storage

Store prompts outside code:
- **Database**: Easy updates, audit trail
- **Config files**: Version controlled
- **Feature flags**: A/B testing integration

---

## 🎬 Video Script

**[INTRO - Hardcoded vs template comparison]**

Prompts hardcoded in your codebase are a maintenance nightmare. Let me show you how to template and manage prompts properly.

**[CUT TO: Template basics]**

Start simple. Instead of f-strings with embedded prompts, use templates. Jinja2 for complex logic with loops and conditionals. LangChain templates for chat applications.

**[CUT TO: Library structure]**

Organize prompts in a central library. Categories and versions. A simple `get_prompt` function retrieves what you need. Update the library, not your code.

**[CUT TO: Versioning code]**

Version your prompts like code. Each version has an ID, creation date, performance metrics. You can rollback to previous versions when new ones underperform.

**[CUT TO: A/B testing]**

A/B test prompts systematically. Define variants and weights. Assign users deterministically so they get consistent experiences. Track success metrics per variant.

**[CUT TO: Speaker on camera]**

Template your prompts. Centralize them. Version them. Test them. This is what separates hobby projects from production systems. The prompt is the code now—treat it that way.

**[END - Runtime: 5:00]**

---

## 🔬 Interactive Lab: Template System

### Part 1: Build a Prompt Library (20 minutes)

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from jinja2 import Template

@dataclass
class PromptTemplate:
    name: str
    template: str
    version: int = 1
    description: str = ""
    required_vars: list[str] = field(default_factory=list)
    
    def render(self, **kwargs) -> str:
        missing = set(self.required_vars) - set(kwargs.keys())
        if missing:
            raise ValueError(f"Missing variables: {missing}")
        return Template(self.template).render(**kwargs)

class PromptLibrary:
    def __init__(self):
        self.prompts: dict[str, list[PromptTemplate]] = {}
    
    def add(self, prompt: PromptTemplate):
        self.prompts.setdefault(prompt.name, []).append(prompt)
    
    def get(self, name: str, version: int = None) -> PromptTemplate:
        versions = self.prompts.get(name, [])
        if not versions:
            raise KeyError(f"Prompt not found: {name}")
        if version:
            return next(p for p in versions if p.version == version)
        return versions[-1]

# Build library
library = PromptLibrary()

library.add(PromptTemplate(
    name="sentiment_analysis",
    template="""Analyze sentiment of the following {{ content_type }}.
Return: {{ output_format }}

{% if examples %}
Examples:
{% for ex in examples %}
{{ ex }}
{% endfor %}
{% endif %}

Content: {{ content }}""",
    required_vars=["content_type", "output_format", "content"]
))

# Use
prompt = library.get("sentiment_analysis").render(
    content_type="product review",
    output_format="positive, negative, or neutral",
    content="This product exceeded my expectations!",
    examples=["'Great!' -> positive", "'Meh' -> neutral"]
)
print(prompt)
```

### Part 2: Version Management (15 minutes)

```python
@dataclass
class VersionedPrompt:
    name: str
    version: str
    template: str
    created: datetime = field(default_factory=datetime.now)
    metrics: dict = field(default_factory=dict)
    active: bool = True

class PromptVersionManager:
    def __init__(self):
        self.prompts: dict[str, list[VersionedPrompt]] = {}
    
    def create_version(self, name: str, template: str) -> str:
        versions = self.prompts.get(name, [])
        version = f"v{len(versions) + 1}"
        
        prompt = VersionedPrompt(name=name, version=version, template=template)
        self.prompts.setdefault(name, []).append(prompt)
        
        return version
    
    def get_active(self, name: str) -> VersionedPrompt:
        for p in reversed(self.prompts[name]):
            if p.active:
                return p
        raise ValueError(f"No active version for {name}")
    
    def rollback(self, name: str, to_version: str):
        for p in self.prompts[name]:
            p.active = (p.version == to_version)
    
    def record_metric(self, name: str, version: str, metric: str, value: float):
        for p in self.prompts[name]:
            if p.version == version:
                p.metrics.setdefault(metric, []).append(value)

# Demo
manager = PromptVersionManager()

v1 = manager.create_version("summarize", "Summarize: {text}")
v2 = manager.create_version("summarize", "Summarize in {n} sentences: {text}")

manager.record_metric("summarize", v2, "accuracy", 0.92)

active = manager.get_active("summarize")
print(f"Active: {active.version}")
```

### Part 3: A/B Testing (15 minutes)

```python
import hashlib

class ABTest:
    def __init__(self, name, variants: dict[str, str]):
        self.name = name
        self.variants = variants
        self.stats = {k: {"calls": 0, "successes": 0} for k in variants}
    
    def get_variant(self, user_id: str) -> tuple[str, str]:
        # Deterministic assignment
        hash_input = f"{self.name}:{user_id}"
        hash_val = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        variant_names = list(self.variants.keys())
        selected = variant_names[hash_val % len(variant_names)]
        return selected, self.variants[selected]
    
    def record(self, variant: str, success: bool):
        self.stats[variant]["calls"] += 1
        if success:
            self.stats[variant]["successes"] += 1
    
    def get_results(self):
        results = {}
        for v, stats in self.stats.items():
            if stats["calls"] > 0:
                results[v] = {
                    "calls": stats["calls"],
                    "success_rate": stats["successes"] / stats["calls"]
                }
        return results

# Test
test = ABTest("summarization", {
    "control": "Summarize this text:\n\n{text}",
    "treatment": "Write a 2-sentence summary:\n\n{text}"
})

# Simulate users
for i in range(100):
    variant, prompt = test.get_variant(f"user_{i}")
    success = variant == "treatment"  # Simulate treatment being better
    test.record(variant, success)

print(test.get_results())
```

---

## ✅ Knowledge Check

### Question 1
Why use prompt templates instead of hardcoded strings?

A) They're faster  
B) Easier to update, version, test, and reuse  
C) Required by OpenAI  
D) They cost less  

**Correct Answer**: B

---

### Question 2
What should a prompt versioning system track?

A) Just the template text  
B) Version ID, template, date, metrics, and active status  
C) Only the version number  
D) User preferences  

**Correct Answer**: B

---

*You've completed Lesson 4.1! You can now manage prompts professionally.*
