# Lesson 3.3: Structured Extraction

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 3 - Structured Outputs

---

## 📚 Reading Material

### The Extraction Challenge

Unstructured text contains valuable data. Emails, documents, transcripts, chat logs—all filled with information you need to extract and use.

**Input**: "Meeting with John Smith (john@acme.com) on Tuesday at 2pm to discuss the Q4 budget of $2.5M"

**Output**:
```json
{
  "attendee": "John Smith",
  "email": "john@acme.com",
  "day": "Tuesday",
  "time": "2pm",
  "topic": "Q4 budget",
  "amount": 2500000
}
```

### Entity Types

| Entity Type | Examples |
|------------|----------|
| **People** | Names, titles, roles |
| **Organizations** | Companies, departments |
| **Locations** | Addresses, countries |
| **Dates/Times** | Absolute, relative |
| **Numbers** | Currency, percentages |
| **Contact Info** | Email, phone, URLs |
| **Custom** | Product names, order IDs |

### Extraction Patterns

**Simple extraction**:
```
Extract the following from the text:
- Person name
- Company name
- Email address

Return as JSON: {"name": "", "company": "", "email": ""}
```

**Template-based**:
```
Fill in this template from the text:

{
  "order_id": "[order number if present]",
  "customer_name": "[customer name]",
  "product": "[product name or description]",
  "quantity": "[number]",
  "total": "[dollar amount]"
}
```

**Schema-first**:
```python
from pydantic import BaseModel

class Order(BaseModel):
    order_id: str
    customer: str
    products: list[str]
    total: float
    status: str

# Use structured outputs
response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": f"Extract order info: {text}"}],
    response_format=Order
)
```

### Handling Missing Data

**Option 1: Null values**
```json
{"name": "John", "phone": null}
```

**Option 2: Explicit unknown**
```json
{"name": "John", "phone": "NOT_PROVIDED"}
```

**Option 3: Confidence scores**
```json
{
  "name": {"value": "John", "confidence": 0.95},
  "phone": {"value": null, "confidence": 1.0}
}
```

### Multi-Entity Extraction

When multiple entities of the same type exist:

```
Extract all people mentioned with their roles:

Text: "CEO Sarah Chen met with CTO James Wright and VP of Sales Maria Lopez"

Output:
{
  "people": [
    {"name": "Sarah Chen", "role": "CEO"},
    {"name": "James Wright", "role": "CTO"},
    {"name": "Maria Lopez", "role": "VP of Sales"}
  ]
}
```

### Relationship Extraction

Extract not just entities but their relationships:

```
From: "John manages the engineering team and reports to Sarah"

{
  "relationships": [
    {"subject": "John", "relation": "manages", "object": "engineering team"},
    {"subject": "John", "relation": "reports_to", "object": "Sarah"}
  ]
}
```

### Multi-Document Extraction

Process multiple documents with consistent schema:

```python
def batch_extract(documents, schema):
    """Extract from multiple documents"""
    results = []
    
    for doc in documents:
        extracted = extract_with_schema(doc, schema)
        results.append({
            "document_id": doc["id"],
            "extracted": extracted
        })
    
    return results
```

---

## 🎬 Video Script

**[INTRO - Unstructured to structured visualization]**

Structured extraction turns messy text into clean data. Emails become contacts. Documents become records. Chat logs become insights. Let me show you how.

**[CUT TO: Entity types table]**

Know your entity types. People—names, titles, roles. Organizations—companies, departments. Dates—absolute and relative. Numbers—currency, percentages. Contact info—emails, phones. And custom entities for your domain.

**[CUT TO: Simple extraction prompt]**

Simplest approach: list what you want and the output format. "Extract person name, company, email. Return as JSON." Works for basic cases.

**[CUT TO: Schema-first code]**

Better approach: schema-first with Pydantic. Define your model. Use structured outputs. The schema enforces types and required fields. Missing data becomes null or raises validation errors.

**[CUT TO: Handling missing data]**

Missing data needs a strategy. Option one: null values—clean but you need null checks. Option two: sentinel values like "NOT_PROVIDED"—explicit. Option three: confidence scores—most information, more complexity.

**[CUT TO: Multi-entity example]**

When text contains multiple entities, extract as arrays. "All people mentioned with their roles." The schema uses lists. You get every entity, not just the first.

**[CUT TO: Relationship extraction]**

Beyond entities: relationships. Who reports to whom? What connects to what? Structure as triples: subject, relation, object. This builds knowledge graphs.

**[CUT TO: Speaker on camera]**

Extraction is 90% schema design. Define exactly what you need. Handle missing data consistently. Validate outputs. The prompting is the easy part—the schema is where you invest your effort.

**[END - Runtime: 5:40]**

---

## 🔬 Interactive Lab: Entity Extraction

### Objective
Build production-quality extraction systems.

### Part 1: Resume Parser (20 minutes)

```python
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Optional
import json

client = OpenAI()

class Experience(BaseModel):
    company: str
    title: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None

class Education(BaseModel):
    institution: str
    degree: str
    field: Optional[str] = None
    year: Optional[str] = None

class ResumeData(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    summary: Optional[str] = None
    skills: list[str] = []
    experience: list[Experience] = []
    education: list[Education] = []

def parse_resume(resume_text):
    """Extract structured data from resume text"""
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract all relevant information from this resume."},
            {"role": "user", "content": resume_text}
        ],
        response_format=ResumeData
    )
    return response.choices[0].message.parsed

# Test
sample_resume = """
JOHN SMITH
john.smith@email.com | (555) 123-4567

SUMMARY
Experienced software engineer with 8+ years in backend development.

EXPERIENCE

Senior Software Engineer | TechCorp Inc.
Jan 2020 - Present
- Led migration to microservices architecture
- Mentored team of 5 junior developers

Software Engineer | StartupCo
Jun 2016 - Dec 2019
- Built RESTful APIs serving 1M+ requests/day
- Implemented CI/CD pipelines

EDUCATION
M.S. Computer Science, Stanford University, 2016
B.S. Computer Science, UC Berkeley, 2014

SKILLS
Python, Go, Kubernetes, PostgreSQL, AWS, Docker
"""

parsed = parse_resume(sample_resume)
print(f"Name: {parsed.name}")
print(f"Email: {parsed.email}")
print(f"\nSkills: {', '.join(parsed.skills)}")
print(f"\nExperience ({len(parsed.experience)} positions):")
for exp in parsed.experience:
    print(f"  - {exp.title} at {exp.company}")
```

### Part 2: Invoice Extraction (20 minutes)

```python
class LineItem(BaseModel):
    description: str
    quantity: int
    unit_price: float
    total: float

class InvoiceData(BaseModel):
    invoice_number: str
    date: str
    vendor_name: str
    vendor_address: Optional[str] = None
    customer_name: str
    line_items: list[LineItem]
    subtotal: float
    tax: Optional[float] = None
    total: float
    payment_terms: Optional[str] = None

def extract_invoice(invoice_text):
    """Extract structured data from invoice"""
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """
Extract invoice information accurately. 
Calculate totals if not explicitly stated.
Use 0 for missing numeric values."""},
            {"role": "user", "content": invoice_text}
        ],
        response_format=InvoiceData
    )
    return response.choices[0].message.parsed

# Test
invoice = """
INVOICE #INV-2024-0847
Date: December 15, 2024

From: Acme Software Solutions
123 Tech Lane, San Francisco, CA

To: GlobalCorp Industries

Items:
- Enterprise License (Annual) x 1 @ $12,000 = $12,000
- Premium Support x 12 months @ $500/mo = $6,000
- Implementation Services x 40 hours @ $150/hr = $6,000

Subtotal: $24,000
Tax (8%): $1,920
TOTAL DUE: $25,920

Payment Terms: Net 30
"""

parsed = extract_invoice(invoice)
print(f"Invoice: {parsed.invoice_number}")
print(f"Vendor: {parsed.vendor_name}")
print(f"Customer: {parsed.customer_name}")
print(f"\nLine Items:")
for item in parsed.line_items:
    print(f"  {item.description}: ${item.total:,.2f}")
print(f"\nTotal: ${parsed.total:,.2f}")
```

### Part 3: Conversation Analysis (15 minutes)

```python
from enum import Enum

class Sentiment(str, Enum):
    positive = "positive"
    negative = "negative"
    neutral = "neutral"

class Intent(str, Enum):
    question = "question"
    complaint = "complaint"
    request = "request"
    feedback = "feedback"
    information = "information"

class Entity(BaseModel):
    text: str
    type: str
    normalized: Optional[str] = None

class MessageAnalysis(BaseModel):
    content: str
    sentiment: Sentiment
    intent: Intent
    entities: list[Entity]
    urgency: int = Field(ge=1, le=5, description="1-5 scale")
    action_required: bool
    suggested_response: Optional[str] = None

def analyze_message(message):
    """Analyze customer message"""
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Analyze this customer message comprehensively."},
            {"role": "user", "content": message}
        ],
        response_format=MessageAnalysis
    )
    return response.choices[0].message.parsed

# Test
messages = [
    "I've been waiting for my order #12345 for two weeks! This is unacceptable.",
    "Hi, I was wondering if you have the blue widget in stock?",
    "Just wanted to say your customer service team was amazing!"
]

for msg in messages:
    print(f"\nMessage: {msg[:50]}...")
    analysis = analyze_message(msg)
    print(f"  Sentiment: {analysis.sentiment.value}")
    print(f"  Intent: {analysis.intent.value}")
    print(f"  Urgency: {analysis.urgency}/5")
    print(f"  Action Required: {analysis.action_required}")
```

### Submission
Build an extraction pipeline for a document type in your domain.

---

## ✅ Knowledge Check

### Question 1
What's the best approach for handling fields that might be missing?

A) Throw an error  
B) Use Optional types with None defaults, or explicit sentinel values  
C) Leave them out of the schema  
D) Always require all fields  

**Correct Answer**: B

**Explanation**: Use Optional types with None defaults for cleaner schemas, or explicit values like "NOT_PROVIDED" when you need to distinguish "not present in source" from "extraction failed."

---

### Question 2
When extracting multiple entities of the same type, what should the schema use?

A) Multiple separate fields  
B) A list/array type  
C) Nested objects  
D) String concatenation  

**Correct Answer**: B

**Explanation**: When multiple people, products, or other entities might be present, use a list type (e.g., `list[Person]`) to capture all of them, not just the first.

---

### Question 3
What is relationship extraction?

A) Extracting contact information  
B) Extracting connections between entities (who reports to whom, etc.)  
C) Finding related documents  
D) Linking to databases  

**Correct Answer**: B

**Explanation**: Relationship extraction goes beyond entity extraction to capture how entities relate: "John reports to Sarah," "Order contains Product A." This builds knowledge graphs.

---

*You've completed Lesson 3.3! You can now extract structured data from any text.*
