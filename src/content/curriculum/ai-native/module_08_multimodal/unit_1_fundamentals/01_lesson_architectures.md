# Lesson 1.1: Multi-Modal Architectures

> **Duration**: 45 minutes | **Type**: Conceptual
> **Unit**: 1 - Multi-Modal Fundamentals

---

## 📚 Reading Material

### What Is Multi-Modal AI?

Processing multiple types of input:
- **Text**: Natural language
- **Images**: Photos, diagrams, screenshots
- **Audio**: Speech, music, sounds
- **Video**: Frames + audio

### Architecture Approaches

| Approach | How It Works | Example |
|----------|--------------|---------|
| **Unified** | Single model, all modalities | GPT-4o |
| **Encoder-Fusion** | Separate encoders, fused representations | LLaVA |
| **Pipeline** | Separate models chained | Whisper → GPT-4 |

### Unified Models

```python
# GPT-4o: Native multi-modal
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {"type": "image_url", "image_url": {"url": image_url}}
        ]
    }]
)
```

### Encoder-Fusion Models

```
[Image] → Image Encoder → 
                          → Fusion → LLM → Response
[Text]  → Text Encoder  →
```

### When to Use Each

| Use Case | Best Approach |
|----------|---------------|
| General multi-modal | Unified (GPT-4o) |
| Custom vision | Encoder-Fusion |
| Resource-constrained | Pipeline |

---

## 🎬 Video Script

**[INTRO - Modality diagram]**

Multi-modal AI handles text, images, audio, video. Let me show you how it works.

**[CUT TO: Architectures]**

Three approaches: unified models like GPT-4o do everything. Encoder-fusion combines specialized encoders. Pipelines chain separate models.

**[CUT TO: Trade-offs]**

Unified is simplest. Encoder-fusion offers customization. Pipelines are flexible but complex.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is GPT-4o's approach to multi-modal?

A) Pipeline  
B) Unified model handling all modalities natively  
C) Separate models  
D) Text only  

**Correct Answer**: B
