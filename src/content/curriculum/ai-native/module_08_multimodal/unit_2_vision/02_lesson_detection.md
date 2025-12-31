# Lesson 2.2: Object Detection and OCR

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Vision Applications

---

## 📚 Reading Material

### Bounding Box Extraction

```python
def detect_objects(image_url):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": """
Identify all objects in this image.
For each, provide:
- name: object type
- description: brief description
- location: approximate position (top-left, center, etc.)
- confidence: your confidence level

Return as JSON array.
"""},
                {"type": "image_url", "image_url": {"url": image_url}}
            ]
        }],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)
```

### OCR with Vision

```python
def extract_text(image):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract ALL text from this image exactly as written. Preserve formatting."},
                {"type": "image_url", "image_url": {"url": image}}
            ]
        }]
    )
    return response.choices[0].message.content

# For structured documents
def extract_form_data(image):
    return client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract all form fields as key-value pairs. Return as JSON."},
                {"type": "image_url", "image_url": {"url": image}}
            ]
        }],
        response_format={"type": "json_object"}
    )
```

---

## 🎬 Video Script

**[INTRO - Detection examples]**

Object detection and OCR with vision models. No specialized models needed.

**[CUT TO: Detection]**

Ask for objects, get structured output. Names, descriptions, locations.

**[CUT TO: OCR]**

Text extraction: receipts, signs, documents. Structured or raw text.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Can GPT-4o extract text from images?

A) No  
B) Yes, it can perform OCR and understand context  
C) Only handwriting  
D) Only printed text  

**Correct Answer**: B
