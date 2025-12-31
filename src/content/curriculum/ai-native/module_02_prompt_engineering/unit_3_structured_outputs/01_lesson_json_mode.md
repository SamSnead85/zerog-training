# Lesson 3.1: JSON Mode and Schemas

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Structured Outputs

---

## 📚 Reading Material

### The JSON Challenge

Without explicit control, LLMs produce inconsistent JSON:

```
Sometimes: {"name": "John"}
Sometimes: Here's the JSON: {"name": "John"}
Sometimes: ```json\n{"name": "John"}\n```
Sometimes: The data is name equals John
```

### JSON Mode

OpenAI and other providers offer a **JSON mode** that guarantees valid JSON output:

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={"type": "json_object"},  # Force JSON
    messages=[
        {"role": "system", "content": "Return data as JSON."},
        {"role": "user", "content": "Extract: John works at Acme Corp as CEO"}
    ]
)

# Guaranteed valid JSON
data = json.loads(response.choices[0].message.content)
```

**Important**: You must mention "JSON" in your prompt for JSON mode to work.

### Structured Outputs (Schema Enforcement)

OpenAI's Structured Outputs goes further—enforcing a specific schema:

```python
from pydantic import BaseModel

class Person(BaseModel):
    name: str
    company: str
    role: str

response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Extract: John works at Acme Corp as CEO"}
    ],
    response_format=Person  # Enforce schema
)

person = response.choices[0].message.parsed
print(person.name)  # "John"
print(person.company)  # "Acme Corp"
```

### Defining Schemas

**Simple schema**:
```python
class Contact(BaseModel):
    name: str
    email: str
    phone: str | None = None  # Optional field
```

**Nested schema**:
```python
class Address(BaseModel):
    street: str
    city: str
    country: str

class Company(BaseModel):
    name: str
    address: Address
    employees: int
```

**With enums**:
```python
from enum import Enum

class Sentiment(str, Enum):
    positive = "positive"
    negative = "negative"
    neutral = "neutral"

class Analysis(BaseModel):
    text: str
    sentiment: Sentiment
    confidence: float
```

### Anthropic Approach

Anthropic doesn't have JSON mode but offers reliable alternatives:

```python
import anthropic

client = anthropic.Anthropic()

# Pre-fill forces JSON start
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Extract person data as JSON from: John, CEO of Acme"},
        {"role": "assistant", "content": "{"}  # Pre-fill
    ]
)

json_str = "{" + message.content[0].text
data = json.loads(json_str)
```

### Schema in Prompt

When API-level schema enforcement isn't available:

```
Extract information and return ONLY valid JSON matching this schema:
{
  "name": "string (required)",
  "email": "string (required, valid email format)",
  "company": "string or null",
  "role": "string or null"
}

Do not include any text before or after the JSON object.
```

### Handling Complex Structures

**Arrays**:
```python
class Item(BaseModel):
    name: str
    quantity: int

class Order(BaseModel):
    order_id: str
    items: list[Item]  # Array of objects
    total: float
```

**Union types**:
```python
from typing import Union

class TextContent(BaseModel):
    type: str = "text"
    text: str

class ImageContent(BaseModel):
    type: str = "image"
    url: str
    caption: str | None

class Message(BaseModel):
    content: Union[TextContent, ImageContent]
```

---

## 🎬 Video Script

**[INTRO - Inconsistent JSON examples]**

Without control, LLMs produce inconsistent JSON. Sometimes clean. Sometimes wrapped in markdown. Sometimes not JSON at all. Let me show you how to get reliable structured output.

**[CUT TO: JSON mode code]**

First option: JSON mode. Add `response_format` with type `json_object`. Now the API guarantees valid JSON output. One catch—you must mention "JSON" somewhere in your prompt.

**[CUT TO: Structured outputs code]**

OpenAI's Structured Outputs goes further. Define a Pydantic model—your schema. Pass it to `response_format`. The output is guaranteed to match your schema exactly. Required fields are required. Types are enforced.

**[CUT TO: Schema examples]**

Define schemas with Pydantic. Simple types, optional fields with defaults, nested objects, arrays, enums for constrained values. The model ensures outputs conform.

**[CUT TO: Anthropic approach]**

Anthropic doesn't have JSON mode, but pre-filling works. Start the assistant's response with an opening brace. Claude will continue the JSON object. Prepend the brace back when parsing.

**[CUT TO: Prompt-based schema]**

When API enforcement isn't available, specify the schema in your prompt. Be explicit: required fields, types, constraints. Add "return ONLY valid JSON, no additional text."

**[CUT TO: Speaker on camera]**

Structured outputs are essential for production. Use API-level enforcement when available—it's more reliable. Fall back to prompt-based schemas with validation. Always parse and validate, because even with guarantees, you need error handling.

**[END - Runtime: 5:55]**

---

## 🔬 Interactive Lab: JSON Mastery

### Objective
Implement structured outputs using different techniques.

### Part 1: JSON Mode (15 minutes)

```python
from openai import OpenAI
import json

client = OpenAI()

def extract_with_json_mode(text, schema_description):
    """Extract data using JSON mode"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": f"Extract data as JSON. Schema: {schema_description}"},
            {"role": "user", "content": text}
        ],
        max_tokens=500
    )
    return json.loads(response.choices[0].message.content)

# Test extractions
tests = [
    (
        "Email from john.doe@acme.com about order #12345 requesting expedited shipping",
        '{"sender_email": "string", "order_id": "string", "request_type": "string"}'
    ),
    (
        "Meeting with Sarah Chen (VP Engineering) on Tuesday at 2pm in Room 401",
        '{"attendee": "string", "title": "string", "day": "string", "time": "string", "location": "string"}'
    ),
]

for text, schema in tests:
    print(f"\nText: {text[:50]}...")
    result = extract_with_json_mode(text, schema)
    print(f"Extracted: {json.dumps(result, indent=2)}")
```

### Part 2: Structured Outputs with Pydantic (25 minutes)

```python
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

# Define models
class Priority(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"

class TaskItem(BaseModel):
    description: str = Field(description="What needs to be done")
    owner: Optional[str] = Field(None, description="Person responsible")
    priority: Priority = Field(description="Task priority")
    due_date: Optional[str] = Field(None, description="Due date if mentioned")

class MeetingNotes(BaseModel):
    title: str = Field(description="Meeting title or topic")
    attendees: list[str] = Field(description="List of attendees")
    key_decisions: list[str] = Field(description="Decisions made")
    action_items: list[TaskItem] = Field(description="Tasks to complete")
    next_meeting: Optional[str] = Field(None, description="Next meeting date")

def parse_meeting_notes(notes_text):
    """Parse meeting notes into structured format"""
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract meeting information."},
            {"role": "user", "content": notes_text}
        ],
        response_format=MeetingNotes
    )
    return response.choices[0].message.parsed

# Test
notes = """
Q4 Planning Meeting - Dec 15, 2024

Attendees: Sarah (PM), John (Eng), Lisa (Design), Mike (QA)

Discussed the roadmap for Q4. Decided to prioritize the mobile app 
redesign over the admin dashboard. Budget approved for 2 additional 
contractors.

Action Items:
- John to create tech spec for mobile redesign by Friday (high priority)
- Lisa to provide wireframes by Dec 20
- Mike to set up test environment (medium priority)
- Sarah to schedule stakeholder review for Dec 22

Next meeting: Dec 18 at 10am
"""

parsed = parse_meeting_notes(notes)
print(f"Title: {parsed.title}")
print(f"Attendees: {', '.join(parsed.attendees)}")
print(f"\nDecisions:")
for d in parsed.key_decisions:
    print(f"  • {d}")
print(f"\nAction Items:")
for item in parsed.action_items:
    print(f"  [{item.priority.value}] {item.description}")
    if item.owner:
        print(f"      Owner: {item.owner}")
```

### Part 3: Fallback with Validation (15 minutes)

```python
from pydantic import BaseModel, ValidationError
from typing import Any

def robust_json_extract(text, model_class, max_retries=2):
    """Extract with validation and retries"""
    
    schema_json = model_class.model_json_schema()
    
    for attempt in range(max_retries + 1):
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": f"""
Extract data matching this JSON schema:
{json.dumps(schema_json, indent=2)}

Return valid JSON only."""},
                    {"role": "user", "content": text}
                ],
                max_tokens=500
            )
            
            raw = response.choices[0].message.content
            data = json.loads(raw)
            
            # Validate against Pydantic model
            validated = model_class.model_validate(data)
            return {"success": True, "data": validated, "attempts": attempt + 1}
            
        except json.JSONDecodeError as e:
            if attempt == max_retries:
                return {"success": False, "error": f"JSON parse error: {e}"}
        except ValidationError as e:
            if attempt == max_retries:
                return {"success": False, "error": f"Validation error: {e}"}
    
    return {"success": False, "error": "Max retries exceeded"}

# Test with strict model
class ContactInfo(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

result = robust_json_extract(
    "Reach out to Jane at jane@example.com or call 555-1234",
    ContactInfo
)

if result["success"]:
    print(f"Extracted in {result['attempts']} attempt(s):")
    print(f"  Name: {result['data'].name}")
    print(f"  Email: {result['data'].email}")
    print(f"  Phone: {result['data'].phone}")
else:
    print(f"Failed: {result['error']}")
```

### Submission
Create a Pydantic model for a complex domain (invoice, resume, product spec) and extract data reliably.

---

## ✅ Knowledge Check

### Question 1
What does JSON mode guarantee?

A) Perfect extraction accuracy  
B) Valid, parseable JSON output  
C) Schema compliance  
D) Faster responses  

**Correct Answer**: B

**Explanation**: JSON mode guarantees the output will be valid, parseable JSON. It does NOT guarantee the schema matches what you want—that requires Structured Outputs or validation.

---

### Question 2
What is required when using OpenAI's JSON mode?

A) Using GPT-4 only  
B) Mentioning "JSON" in your prompt  
C) Using Pydantic models  
D) Setting temperature to 0  

**Correct Answer**: B

**Explanation**: OpenAI's JSON mode requires the word "JSON" to appear somewhere in your messages. Without it, the mode won't activate properly.

---

### Question 3
How does Structured Outputs differ from JSON mode?

A) It's the same thing  
B) Structured Outputs enforces a specific schema, not just valid JSON  
C) It's slower  
D) It only works with Anthropic  

**Correct Answer**: B

**Explanation**: JSON mode ensures valid JSON. Structured Outputs (with Pydantic models) enforces that the JSON matches your exact schema—required fields, types, nested structures.

---

*You've completed Lesson 3.1! You now know how to get reliable JSON output.*
