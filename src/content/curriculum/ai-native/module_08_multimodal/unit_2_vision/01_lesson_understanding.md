# Lesson 2.1: Image Understanding

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Vision Applications

---

## 📚 Reading Material

### Understanding Capabilities

| Task | Example |
|------|---------|
| Description | "Describe what's in this photo" |
| Analysis | "What emotions are shown?" |
| Reasoning | "Why might this have happened?" |
| Counting | "How many cars are visible?" |
| Comparison | "What's different between these?" |

### Structured Image Analysis

```python
def analyze_image(image_url, schema):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": f"""
Analyze this image and extract:
{schema}

Return as JSON.
"""},
                {"type": "image_url", "image_url": {"url": image_url}}
            ]
        }],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)

# Example
result = analyze_image(url, """
- scene_type: indoor/outdoor
- main_subjects: list of objects/people
- mood: emotional tone
- text_visible: any text in image
""")
```

### Document Analysis

```python
def analyze_document(image):
    return client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract all text and data from this document. Format as structured JSON."},
                {"type": "image_url", "image_url": {"url": image}}
            ]
        }]
    )
```

---

## 🎬 Video Script

**[INTRO - Image analysis examples]**

Vision models understand images deeply. Description, analysis, reasoning, counting.

**[CUT TO: Structured extraction]**

Extract structured data from images. Specify a schema, get JSON output.

**[CUT TO: Documents]**

Document analysis: receipts, invoices, forms. Extract text and structure.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What can GPT-4o do with images?

A) Only describe  
B) Describe, analyze, reason, count, and compare  
C) Nothing  
D) Only generate  

**Correct Answer**: B
