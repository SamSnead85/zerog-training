# Lesson 3.2: Text-to-Speech

> **Duration**: 50 minutes | **Type**: Practical
> **Unit**: 3 - Audio Applications

---

## 📚 Reading Material

### OpenAI TTS

```python
response = client.audio.speech.create(
    model="tts-1-hd",  # or "tts-1" for faster
    voice="alloy",     # alloy, echo, fable, onyx, nova, shimmer
    input="Hello! This is AI-generated speech."
)

response.stream_to_file("output.mp3")
```

### Voice Options

| Voice | Style |
|-------|-------|
| alloy | Neutral, balanced |
| echo | Male, warm |
| fable | British, expressive |
| onyx | Deep, authoritative |
| nova | Female, friendly |
| shimmer | Female, warm |

### Streaming Audio

```python
from pathlib import Path

with client.audio.speech.with_streaming_response.create(
    model="tts-1",
    voice="alloy",
    input="Streaming audio for real-time playback..."
) as response:
    response.stream_to_file("stream_output.mp3")
```

### Use Cases

| Use Case | Voice Choice |
|----------|--------------|
| Podcast | nova, echo |
| Audiobook | fable |
| Notifications | alloy |
| Assistant | shimmer |

---

## 🎬 Video Script

**[INTRO - TTS examples]**

Text-to-speech creates natural-sounding audio. Multiple voices for different use cases.

**[CUT TO: Voices]**

Six voices. Warm, authoritative, friendly, expressive. Choose based on your application.

**[CUT TO: Streaming]**

Stream audio for real-time applications. No waiting for full generation.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should you use streaming TTS?

A) Never  
B) For real-time applications where immediate playback is needed  
C) Only for long text  
D) For file storage  

**Correct Answer**: B
