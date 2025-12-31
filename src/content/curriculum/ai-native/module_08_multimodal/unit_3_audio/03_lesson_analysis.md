# Lesson 3.3: Audio Analysis

> **Duration**: 55 minutes | **Type**: Practical
> **Unit**: 3 - Audio Applications

---

## 📚 Reading Material

### Transcribe + Analyze

```python
def analyze_audio(audio_path):
    # 1. Transcribe
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
    
    # 2. Analyze with LLM
    analysis = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"""
Analyze this transcript:
- Summary
- Key topics
- Sentiment
- Action items

Transcript:
{transcript.text}
"""
        }]
    )
    return analysis.choices[0].message.content
```

### Meeting Analysis

```python
def analyze_meeting(audio_path):
    transcript = transcribe(audio_path)
    
    return client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"""
Analyze this meeting transcript:
1. Attendee summary (who spoke about what)
2. Decisions made
3. Action items with owners
4. Open questions

{transcript}
"""
        }],
        response_format={"type": "json_object"}
    )
```

### Sentiment Analysis

```python
def call_sentiment(transcript):
    return client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"""
Analyze the emotional tone of this call:
- Customer sentiment (1-10)
- Agent performance (1-10)
- Key issues raised
- Resolution status

{transcript}
"""
        }]
    )
```

---

## 🎬 Video Script

**[INTRO - Analysis pipeline]**

Transcribe then analyze. Whisper for text, LLM for understanding.

**[CUT TO: Meeting analysis]**

Meeting transcripts: attendees, decisions, action items. Structured output.

**[CUT TO: Sentiment]**

Call center analysis: sentiment, performance, issues. Automated QA.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What's the pipeline for audio analysis?

A) LLM only  
B) Transcribe with Whisper, then analyze with LLM  
C) Whisper only  
D) Manual transcription  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You can build audio applications.*
