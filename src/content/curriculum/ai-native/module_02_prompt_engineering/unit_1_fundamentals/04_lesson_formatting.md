# Lesson 1.4: Output Formatting

> **Duration**: 50 minutes | **Type**: Practical
> **Unit**: 1 - Prompt Fundamentals

---

## 📚 Reading Material

### Why Format Matters

The output format determines whether you can:
1. **Parse** the response programmatically
2. **Display** it to users appropriately
3. **Process** it in downstream systems
4. **Validate** it for correctness

### Common Output Formats

**Plain Text**
```
The meeting is scheduled for 3pm tomorrow in Conference Room B 
with Sarah and John to discuss the Q4 budget.
```

**Markdown**
```markdown
## Meeting Details
- **Time**: 3pm tomorrow
- **Location**: Conference Room B
- **Attendees**: Sarah, John
- **Topic**: Q4 budget discussion
```

**JSON**
```json
{
  "time": "3pm",
  "date": "tomorrow",
  "location": "Conference Room B",
  "attendees": ["Sarah", "John"],
  "topic": "Q4 budget discussion"
}
```

**XML**
```xml
<meeting>
  <time>3pm</time>
  <location>Conference Room B</location>
</meeting>
```

### Requesting JSON Output

**Basic JSON request**:
```
Extract the information as JSON with these fields:
- name (string)
- email (string)
- company (string)
```

**With schema**:
```
Return a JSON object matching this exact schema:
{
  "name": "string",
  "email": "string (must be valid email format)",
  "company": "string or null if not found",
  "confidence": "number between 0 and 1"
}
```

**Using JSON mode** (OpenAI):
```python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={"type": "json_object"},  # Ensures valid JSON
    messages=[
        {"role": "system", "content": "Return responses as JSON."},
        {"role": "user", "content": "Extract: John works at Acme Corp"}
    ]
)
```

### Structured Text Patterns

**Bullet points**:
```
List the top 3 benefits.
Format as bullet points starting with "•".
One sentence per bullet.
```

**Numbered lists**:
```
Provide step-by-step instructions.
Number each step (1., 2., 3.).
Each step should be actionable.
```

**Tables** (Markdown):
```
Compare these options in a table with columns:
| Feature | Option A | Option B | Option C |
```

**Sections with headers**:
```
Structure your response with these sections:
## Summary (2 sentences)
## Key Findings (bullet points)
## Recommendations (numbered list)
## Next Steps (paragraph)
```

### Format Enforcement Techniques

**Explicit structure**:
```
Your response MUST follow this exact structure:
SUMMARY: [one sentence]
ANALYSIS: [2-3 paragraphs]
RECOMMENDATION: [one sentence]
CONFIDENCE: [high/medium/low]
```

**Pre-filling** (start the response):
```python
messages = [
    {"role": "user", "content": "Extract data as JSON from: John, john@email.com, Acme"},
    {"role": "assistant", "content": "{"}  # Force JSON start
]
```

**Examples** (show format):
```
Extract entities. Format:
{"person": "name", "org": "company", "email": "address"}

Example:
Input: "Contact Sarah at Globex: sarah@globex.com"
Output: {"person": "Sarah", "org": "Globex", "email": "sarah@globex.com"}

Now extract from: ...
```

### Parsing Considerations

**JSON parsing**:
```python
import json

response_text = '{"name": "John", "company": "Acme"}'

try:
    data = json.loads(response_text)
    name = data.get("name", "Unknown")
except json.JSONDecodeError:
    # Handle malformed JSON
    data = None
```

**Markdown to structured**:
```python
import re

# Extract bullet points
bullets = re.findall(r'^[\-\*•]\s*(.+)$', text, re.MULTILINE)

# Extract sections
sections = re.split(r'^##\s+', text, flags=re.MULTILINE)
```

### Format Validation

Always validate AI output:

```python
def validate_response(data, required_fields):
    """Validate response has required fields"""
    missing = [f for f in required_fields if f not in data]
    if missing:
        raise ValueError(f"Missing fields: {missing}")
    return data

schema = ["name", "email", "company"]
validated = validate_response(json.loads(response), schema)
```

---

## 🎬 Video Script

**[INTRO - Different output formats displayed]**

How you format output determines what you can do with it. Plain text for humans. JSON for code. Markdown for documents. Let me show you how to control format precisely.

**[CUT TO: JSON example]**

JSON is king for programmatic processing. Request a specific schema, use JSON mode if your provider supports it, and always validate the output before using it.

**[CUT TO: Structured text patterns]**

For human-readable output, use structured text patterns. Bullet points for lists. Numbered steps for instructions. Headers for sections. Tables for comparisons. Specify exactly what you want.

**[CUT TO: Enforcement techniques]**

Three ways to enforce format. First, explicit structure—tell the model exactly what sections to include and in what order. Second, pre-filling—start the assistant's response with an opening bracket or keyword. Third, examples—show exactly what the output should look like.

**[CUT TO: Parsing code example]**

On the code side, always wrap JSON parsing in try-catch. Use `.get()` with defaults for optional fields. For markdown, regex can extract bullets and sections.

**[CUT TO: Validation code]**

Never trust AI output blindly. Validate that required fields exist. Check that values are in expected ranges. Handle malformed responses gracefully.

**[CUT TO: Speaker on camera]**

The format prompt is often just as important as the content prompt. Spend time getting it right. A well-formatted response saves hours of parsing headaches later.

**[END - Runtime: 5:50]**

---

## 🔬 Interactive Lab: Format Mastery

### Objective
Practice requesting and parsing different output formats.

### Part 1: Format Comparison (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def get_formatted_response(content, format_instruction):
    """Get response with specific format"""
    prompt = f"""
{format_instruction}

Content to process:
{content}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return response.choices[0].message.content

# Test content
meeting_notes = """
We met with the client (Acme Corp) on Tuesday. They need the project 
delivered by March 15th. Budget is $50,000. Key stakeholders are 
Sarah (PM) and John (CTO). They want weekly status updates.
"""

# Different format requests
formats = {
    "Plain summary": "Summarize in 2 sentences.",
    
    "Bullet points": """
Extract key details as bullet points:
• Date
• Client name
• Deadline
• Budget
• Stakeholders
""",
    
    "JSON": """
Extract as JSON:
{
  "client": "string",
  "deadline": "string",
  "budget": "number",
  "stakeholders": ["array of names"],
  "update_frequency": "string"
}
""",
    
    "Markdown table": """
Format as a markdown table:
| Field | Value |
""",
}

for format_name, instruction in formats.items():
    print(f"\n{'='*50}")
    print(f"Format: {format_name}")
    print("="*50)
    result = get_formatted_response(meeting_notes, instruction)
    print(result)
```

### Part 2: JSON Mode (15 minutes)

```python
import json

def extract_json(text, schema_description):
    """Extract data as JSON with validation"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": f"Extract data as JSON. Schema: {schema_description}"},
            {"role": "user", "content": text}
        ],
        max_tokens=300
    )
    
    raw = response.choices[0].message.content
    
    try:
        data = json.loads(raw)
        return {"success": True, "data": data}
    except json.JSONDecodeError as e:
        return {"success": False, "error": str(e)}

# Test extraction
texts = [
    "Order #12345 from John Smith (john@example.com) for 3 widgets at $10 each",
    "Meeting request from CEO Sarah Jones for tomorrow at 2pm in Room A",
    "Bug report: App crashes on iPhone 14 running iOS 17.2 when opening settings",
]

schemas = [
    '{"order_id": "string", "customer_name": "string", "email": "string", "quantity": "number", "unit_price": "number"}',
    '{"requester": "string", "title": "string", "date": "string", "time": "string", "location": "string"}',
    '{"type": "string", "description": "string", "device": "string", "os_version": "string", "trigger": "string"}',
]

for text, schema in zip(texts, schemas):
    print(f"\nText: {text[:50]}...")
    result = extract_json(text, schema)
    if result["success"]:
        print(f"Extracted: {json.dumps(result['data'], indent=2)}")
    else:
        print(f"Error: {result['error']}")
```

### Part 3: Complex Structures (15 minutes)

```python
def extract_structured_report(content):
    """Extract a complex structured report"""
    prompt = f"""
Analyze this content and return a JSON report with this structure:
{{
  "summary": "2 sentence overview",
  "key_points": ["list of 3-5 key points"],
  "entities": {{
    "people": ["names"],
    "organizations": ["company names"],
    "dates": ["mentioned dates"]
  }},
  "action_items": [
    {{"task": "description", "owner": "name or null", "deadline": "date or null"}}
  ],
  "sentiment": "positive/negative/neutral",
  "confidence": 0.0-1.0
}}

Content:
{content}
"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )
    
    return json.loads(response.choices[0].message.content)

# Test with complex content
complex_text = """
Following yesterday's board meeting with GlobalTech and Innovate Inc., 
we've agreed to proceed with Phase 2 of the AI integration project. 
CEO Maria Chen emphasized the March 31st deadline is firm. CTO James Wright
will lead the technical implementation. The legal team needs to review 
contracts by next Friday. Overall sentiment was positive with budget 
approval for $2M. Next meeting scheduled for January 15th with the 
engineering leads.
"""

report = extract_structured_report(complex_text)
print(json.dumps(report, indent=2))
```

### Submission
Create a prompt that extracts a complex nested JSON structure from unstructured text with validation.

---

## ✅ Knowledge Check

### Question 1
When should you use JSON mode vs markdown format?

A) JSON for humans, markdown for code  
B) JSON for programmatic parsing, markdown for human readability  
C) They are interchangeable  
D) Always use JSON  

**Correct Answer**: B

**Explanation**: JSON is ideal for programmatic parsing and downstream processing. Markdown is better for human-readable documents, reports, and content that will be displayed.

---

### Question 2
What is "pre-filling" in the context of format control?

A) Filling the context window completely  
B) Starting the assistant's response with format-guiding content  
C) Providing lots of examples  
D) Using system messages  

**Correct Answer**: B

**Explanation**: Pre-filling means starting the assistant's message with content like `{` to force JSON output, or `## Summary` to force a specific structure. The model continues from where you left off.

---

### Question 3
Why should you always validate AI-generated JSON?

A) It's faster  
B) The model might produce malformed or incomplete JSON  
C) It's required by the API  
D) To reduce token costs  

**Correct Answer**: B

**Explanation**: Even with JSON mode, models can sometimes produce incomplete responses, missing fields, or unexpected values. Always validate before using in production code.

---

### Question 4
Which technique is most reliable for ensuring specific output format?

A) Hoping the model understands  
B) Combining schema definition, examples, and explicit structure  
C) Using a longer prompt  
D) Asking nicely  

**Correct Answer**: B

**Explanation**: The most reliable approach combines multiple techniques: define the exact schema, show examples of correct output, and specify the structure explicitly. Each technique reinforces the others.

---

*Congratulations on completing Unit 1! You've mastered the fundamentals of prompt engineering.*
