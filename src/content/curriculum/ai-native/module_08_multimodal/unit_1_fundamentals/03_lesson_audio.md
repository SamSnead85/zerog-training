# Lesson 1.3: Audio-Language Models

> **Duration**: 45 minutes | **Type**: Technical
> **Unit**: 1 - Multi-Modal Fundamentals

---

## 📚 Reading Material

### Audio Processing Pipeline

```
Audio → Speech-to-Text → Text → LLM → Text → Text-to-Speech → Audio
         (Whisper)              (GPT)         (TTS)
```

### Whisper for STT

```python
from openai import OpenAI
client = OpenAI()

audio_file = open("recording.mp3", "rb")
transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file
)
print(transcript.text)
```

### Real-Time Audio (GPT-4o)

```python
# GPT-4o Realtime API (WebSocket)
# Native audio input/output without transcription step
{
    "type": "input_audio",
    "audio": base64_audio_data
}
```

### Text-to-Speech

```python
response = client.audio.speech.create(
    model="tts-1-hd",
    voice="alloy",
    input="Hello, this is AI-generated speech."
)

response.stream_to_file("output.mp3")
```

---

## 🎬 Video Script

**[INTRO - Audio pipeline]**

Audio in, audio out. Speech-to-text, LLM processing, text-to-speech.

**[CUT TO: Whisper]**

Whisper transcribes audio to text. Accurate across languages and accents.

**[CUT TO: Real-time]**

GPT-4o Realtime: native audio processing. No transcription step needed.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What does Whisper do?

A) Generate audio  
B) Transcribe audio to text  
C) Edit audio  
D) Compress audio  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand multi-modal fundamentals.*
