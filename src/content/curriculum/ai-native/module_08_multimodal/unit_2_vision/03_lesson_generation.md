# Lesson 2.3: Image Generation

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 2 - Vision Applications

---

## 📚 Reading Material

### DALL-E 3

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="A futuristic city skyline at sunset, photorealistic",
    size="1024x1024",
    quality="hd",
    n=1
)

image_url = response.data[0].url
```

### Prompt Engineering for Images

```python
# Be specific and detailed
good_prompt = """
A cozy coffee shop interior, warm amber lighting,
exposed brick walls, vintage furniture, 
a barista making latte art,
steam rising from cups, afternoon sunlight through large windows,
professional photography, 35mm lens, depth of field
"""

# Avoid vague prompts
bad_prompt = "a coffee shop"
```

### Image Editing

```python
# Edit existing images
response = client.images.edit(
    model="dall-e-2",
    image=open("original.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A red sports car parked in front",
    size="1024x1024"
)
```

### Use Cases

| Use Case | Application |
|----------|-------------|
| Marketing | Product mockups |
| Design | UI concepts |
| Content | Blog illustrations |
| E-commerce | Product variations |

---

## 🎬 Video Script

**[INTRO - Generated images]**

DALL-E 3 generates images from text. Let me show you how to use it effectively.

**[CUT TO: Prompts]**

Detailed prompts get better results. Style, lighting, composition, camera settings.

**[CUT TO: Editing]**

Image editing: mask areas to replace. Useful for product mockups.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What makes a good image generation prompt?

A) Short and vague  
B) Detailed descriptions of subject, style, lighting, and composition  
C) Just keywords  
D) Code  

**Correct Answer**: B

---

*Congratulations on completing Unit 2! You can build vision applications.*
