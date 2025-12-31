# Lesson 4.1: Pipeline Architectures

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 4 - Multi-Modal Pipelines

---

## 📚 Reading Material

### Common Patterns

**Voice Assistant**:
```
Audio → Whisper → GPT-4o → TTS → Audio
```

**Document Processor**:
```
PDF → Page Images → GPT-4o Vision → Structured JSON
```

**Video Analyzer**:
```
Video → Frame Extraction → GPT-4o Vision (each frame)
                                            → Synthesis
      → Audio Track → Whisper → 
```

### Voice Assistant Pipeline

```python
async def voice_assistant(audio_input):
    # 1. Speech-to-text
    transcript = await transcribe(audio_input)
    
    # 2. LLM processing
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": transcript}
        ]
    )
    response_text = response.choices[0].message.content
    
    # 3. Text-to-speech
    audio_response = await client.audio.speech.create(
        model="tts-1",
        voice="nova",
        input=response_text
    )
    
    return audio_response
```

### Multi-Modal RAG

```python
def multimodal_rag(query, image=None):
    # Build context from multiple sources
    text_context = retrieve_text(query)
    
    if image:
        # Describe image for context
        image_desc = describe_image(image)
        context = f"{text_context}\n\nImage context: {image_desc}"
    else:
        context = text_context
    
    # Generate response
    return llm(query, context)
```

---

## 🎬 Video Script

**[INTRO - Pipeline diagrams]**

Multi-modal pipelines combine modalities. Voice assistants, document processors, video analyzers.

**[CUT TO: Voice]**

Voice pipeline: audio in, transcribe, process, synthesize, audio out. Real-time is possible.

**[CUT TO: Multi-modal RAG]**

Combine image understanding with text retrieval. Richer context, better answers.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What's the voice assistant pipeline?

A) Audio only  
B) Audio → STT → LLM → TTS → Audio  
C) Text only  
D) Images  

**Correct Answer**: B
