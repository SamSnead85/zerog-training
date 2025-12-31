# Lesson 1.2: Vision-Language Models

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 1 - Multi-Modal Fundamentals

---

## 📚 Reading Material

### How VLMs Work

```
Image → Vision Encoder → Image Tokens
                                      → LLM → Text Output
Prompt → Text Tokenizer → Text Tokens
```

### Popular VLMs

| Model | Provider | Capabilities |
|-------|----------|--------------|
| GPT-4o | OpenAI | Best reasoning |
| Claude 3.5 | Anthropic | Strong analysis |
| Gemini Pro | Google | Fast, accurate |
| LLaVA | Open-source | Customizable |

### Using GPT-4 Vision

```python
import base64

def encode_image(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this image in detail"},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{encode_image('photo.jpg')}"
                }
            }
        ]
    }],
    max_tokens=500
)
```

### Multi-Image Analysis

```python
messages = [{
    "role": "user",
    "content": [
        {"type": "text", "text": "Compare these two images"},
        {"type": "image_url", "image_url": {"url": image1_url}},
        {"type": "image_url", "image_url": {"url": image2_url}}
    ]
}]
```

---

## 🎬 Video Script

**[INTRO - VLM diagram]**

Vision-language models understand images like we do. Let me show you how to use them.

**[CUT TO: API usage]**

Pass images as base64 or URLs. The model sees and reasons about them.

**[CUT TO: Multi-image]**

Multiple images in one request. Compare, contrast, analyze relationships.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
How do you pass images to GPT-4o?

A) File upload only  
B) Base64 encoded data or URL  
C) Text description  
D) Not supported  

**Correct Answer**: B
