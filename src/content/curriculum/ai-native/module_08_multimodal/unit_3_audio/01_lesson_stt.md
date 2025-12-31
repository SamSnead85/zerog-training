# Lesson 3.1: Speech-to-Text

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 3 - Audio Applications

---

## 📚 Reading Material

### Whisper Transcription

```python
from openai import OpenAI
client = OpenAI()

# Basic transcription
audio_file = open("meeting.mp3", "rb")
transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file
)
print(transcript.text)
```

### With Timestamps

```python
transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
    response_format="verbose_json",
    timestamp_granularities=["segment"]
)

for segment in transcript.segments:
    print(f"[{segment.start:.2f}s] {segment.text}")
```

### Translation

```python
# Translate non-English audio to English
translation = client.audio.translations.create(
    model="whisper-1",
    file=open("french_audio.mp3", "rb")
)
print(translation.text)  # English text
```

### Best Practices

| Challenge | Solution |
|-----------|----------|
| Long audio | Split into chunks |
| Background noise | Preprocess audio |
| Multiple speakers | Add diarization |
| Technical terms | Add prompt context |

---

## 🎬 Video Script

**[INTRO - Whisper demo]**

Whisper transcribes audio with remarkable accuracy. Let me show you how.

**[CUT TO: Basic usage]**

Upload audio file, get text. Supports mp3, wav, and more formats.

**[CUT TO: Advanced]**

Timestamps for video subtitles. Translation for non-English audio.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does Whisper's translation feature do?

A) Translate text  
B) Transcribe non-English audio directly to English  
C) Nothing  
D) Generate audio  

**Correct Answer**: B
