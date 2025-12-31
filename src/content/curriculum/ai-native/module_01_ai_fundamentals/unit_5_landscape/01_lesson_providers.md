# Lesson 5.1: Model Providers and Platforms

> **Duration**: 50 minutes | **Type**: Reference
> **Unit**: 5 - The Landscape of AI

---

## 📚 Reading Material

### The Major Players (2024-2025)

The AI landscape is dominated by a handful of frontier model providers, but the ecosystem is broad.

### Tier 1: Frontier Labs

**OpenAI**
- Models: GPT-4o, GPT-4o-mini, o1, o1-mini, DALL-E 3, Whisper
- Strengths: General capability, developer experience, ecosystem
- Access: API, ChatGPT consumer product
- Pricing: Pay-per-token
- Best for: General purpose, balanced performance

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)
```

**Anthropic**
- Models: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- Strengths: Safety, long context (200K), nuanced reasoning
- Access: API, Claude.ai consumer product
- Pricing: Pay-per-token (prompt caching available)
- Best for: Document analysis, nuanced tasks, safety-critical

```python
import anthropic
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)
```

**Google**
- Models: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 2.0
- Strengths: Multimodal, 2M token context, Google integration
- Access: API (AI Studio, Vertex AI), Gemini consumer
- Pricing: Pay-per-token (generous free tier)
- Best for: Very long documents, multimodal, Google ecosystem

**xAI**
- Models: Grok 2, Grok 2 Vision
- Strengths: Real-time web access, humor
- Access: X (Twitter) integration, API
- Best for: Current events, social media context

### Tier 2: Open-Weight Leaders

**Meta (Llama)**
- Models: Llama 3.1 (8B, 70B, 405B), Llama 3.2 (vision)
- License: Open-weight (can deploy anywhere)
- Strengths: Free, deployable, competitive quality
- Best for: Self-hosting, privacy, cost control

**Mistral**
- Models: Mistral 7B, Mixtral 8x7B, Mistral Large
- Strengths: Efficiency, open-weights, EU-based
- Access: API + downloadable weights
- Best for: Efficient inference, European sovereignty

**Cohere**
- Models: Command R+, Embed v3, Rerank 3
- Strengths: Enterprise focus, retrieval, multilingual
- Access: API
- Best for: Enterprise search, RAG applications

### Tier 3: Specialized Providers

**Stability AI**: Image generation (Stable Diffusion)
**Runway**: Video generation
**ElevenLabs**: Voice synthesis
**Midjourney**: Artistic image generation
**Hugging Face**: Model hosting + open-source community

### Cloud Provider AI Services

**AWS**
- Amazon Bedrock: Multi-model API
- SageMaker: ML infrastructure
- Models: Claude, Llama, Titan, Cohere

**Microsoft Azure**
- Azure OpenAI: GPT models with enterprise compliance
- Cognitive Services: Vision, speech, etc.

**Google Cloud**
- Vertex AI: Enterprise Gemini
- Model Garden: Multiple model access

### Comparison Matrix

| Provider | Strengths | Context | Pricing Tier | Best For |
|----------|-----------|---------|--------------|----------|
| OpenAI | Balance, tools | 128K | $$$ | General |
| Anthropic | Safety, nuance | 200K | $$$ | Documents |
| Google | Multimodal | 2M | $$ | Long context |
| Meta Llama | Open, free | 128K | $ (hosting) | Self-host |
| Mistral | Efficient | 32K | $$ | EU/efficiency |

---

## 🎬 Video Script

**[INTRO - Logos of major AI companies]**

The AI ecosystem has exploded. Let me map the terrain so you know where to look for what.

**[CUT TO: Tier 1 - OpenAI]**

OpenAI leads in general capability. GPT-4o is the workhorse—fast, capable, multimodal. o1 is their reasoning model—slower, but better at complex problems. Best developer experience, largest ecosystem.

**[CUT TO: Anthropic]**

Anthropic focuses on safety and nuance. Claude 3.5 Sonnet is their flagship—200K context, excellent at nuanced tasks. Great for documents, regulated industries. My personal favorite for complex reasoning.

**[CUT TO: Google]**

Google's Gemini offers the largest context window—2 million tokens. That's entire codebases, thousands of pages. Deep Google integration. Flash version is blazing fast and cheap.

**[CUT TO: Tier 2 - Open weights]**

Tier two: open-weight models. Meta's Llama 3 is remarkable—competitive with GPT-3.5/4 on many tasks, completely free to deploy. Mistral brings efficiency—their Mixtral runs fast on modest hardware.

These matter because you can run them anywhere—your own servers, data stays private, no per-token costs.

**[CUT TO: Cloud providers diagram]**

Don't forget the cloud providers. AWS Bedrock gives you multiple models with one API. Azure OpenAI wraps GPT models with enterprise compliance. Google Vertex AI does the same for Gemini.

**[CUT TO: Comparison matrix]**

Quick rules of thumb: OpenAI for general balance, Anthropic for safety and documents, Google for very long context, Llama for self-hosting, Mistral for efficiency.

**[CUT TO: Speaker on camera]**

This landscape changes monthly. What matters is understanding the categories—frontier labs, open-weight providers, cloud services. When new players emerge, you'll know how to evaluate them.

**[END - Runtime: 6:12]**

---

## 🔬 Interactive Lab: Provider Comparison

### Objective
Compare same prompts across different providers.

### Part 1: API Comparison (25 minutes)

```python
# Compare responses from different providers
# Requires API keys for each

import time
from openai import OpenAI
import anthropic
# import google.generativeai as genai

openai_client = OpenAI()
anthropic_client = anthropic.Anthropic()

def test_openai(prompt, model="gpt-4o-mini"):
    start = time.time()
    response = openai_client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return {
        "provider": "OpenAI",
        "model": model,
        "response": response.choices[0].message.content,
        "latency": time.time() - start,
        "tokens": response.usage.total_tokens
    }

def test_anthropic(prompt, model="claude-3-5-haiku-20241022"):
    start = time.time()
    response = anthropic_client.messages.create(
        model=model,
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    return {
        "provider": "Anthropic",
        "model": model,
        "response": response.content[0].text,
        "latency": time.time() - start,
        "tokens": response.usage.input_tokens + response.usage.output_tokens
    }

# Test prompts
test_prompts = [
    "Explain quantum computing in 2 sentences for a business executive.",
    "What are the ethical implications of AI in healthcare?",
    "Write a Python function to implement binary search.",
]

print("Provider Comparison")
print("=" * 60)

for prompt in test_prompts:
    print(f"\n📝 Prompt: {prompt[:60]}...")
    print("-" * 60)
    
    for test_fn in [test_openai, test_anthropic]:
        try:
            result = test_fn(prompt)
            print(f"\n[{result['provider']} - {result['model']}]")
            print(f"Latency: {result['latency']:.2f}s | Tokens: {result['tokens']}")
            print(f"Response: {result['response'][:200]}...")
        except Exception as e:
            print(f"Error: {e}")
```

### Part 2: Feature Comparison (20 minutes)

```python
# Document the capabilities of each provider

provider_features = {
    "OpenAI": {
        "models": ["gpt-4o", "gpt-4o-mini", "o1-preview", "o1-mini"],
        "max_context": 128000,
        "modalities": ["text", "vision", "audio"],
        "tools": ["function_calling", "code_interpreter", "file_search"],
        "streaming": True,
        "batch_api": True,
        "fine_tuning": True,
    },
    "Anthropic": {
        "models": ["claude-3.5-sonnet", "claude-3.5-haiku", "claude-3-opus"],
        "max_context": 200000,
        "modalities": ["text", "vision"],
        "tools": ["function_calling", "computer_use"],
        "streaming": True,
        "batch_api": True,
        "fine_tuning": False,
        "prompt_caching": True,
    },
    "Google Gemini": {
        "models": ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0"],
        "max_context": 2000000,
        "modalities": ["text", "vision", "audio", "video"],
        "tools": ["function_calling", "code_execution"],
        "streaming": True,
        "batch_api": False,
        "fine_tuning": True,
    },
    "Meta Llama (via Groq)": {
        "models": ["llama-3.1-70b", "llama-3.1-8b"],
        "max_context": 128000,
        "modalities": ["text"],
        "open_weights": True,
        "streaming": True,
        "self_hostable": True,
    },
}

def compare_features(*features, providers=provider_features):
    """Compare specific features across providers"""
    print(f"\nComparing: {', '.join(features)}")
    print("=" * 60)
    
    for provider, attrs in providers.items():
        print(f"\n{provider}:")
        for feat in features:
            val = attrs.get(feat, "N/A")
            print(f"  {feat}: {val}")

compare_features("max_context", "modalities", "streaming")
compare_features("fine_tuning", "open_weights")
```

### Submission
Create your own provider comparison scorecard for a specific use case.

---

## ✅ Knowledge Check

### Question 1
Which provider offers the longest context window?

A) OpenAI (128K)  
B) Anthropic (200K)  
C) Google Gemini (2M)  
D) Meta Llama (128K)  

**Correct Answer**: C

**Explanation**: Google's Gemini 1.5 Pro offers a 2 million token context window—the largest commercially available, enabling processing of entire codebases or very long documents.

---

### Question 2
What is the main advantage of "open-weight" models like Llama?

A) They're faster  
B) They can be deployed anywhere without per-token API costs  
C) They're more accurate  
D) They have larger context windows  

**Correct Answer**: B

**Explanation**: Open-weight models can be deployed on your own infrastructure—no per-token costs, data stays private, no dependency on external APIs.

---

### Question 3
Which provider is known for emphasis on AI safety and nuanced reasoning?

A) OpenAI  
B) Anthropic  
C) Google  
D) Meta  

**Correct Answer**: B

**Explanation**: Anthropic was founded with a focus on AI safety. Claude models are designed with strong safety properties and excel at nuanced, thoughtful responses.

---

### Question 4
What does AWS Bedrock provide?

A) A single AI model  
B) Multi-model API access (Claude, Llama, Titan, etc.)  
C) Only image generation  
D) Open-source model weights  

**Correct Answer**: B

**Explanation**: AWS Bedrock provides a unified API to access multiple foundation models from different providers, including Claude, Llama, Cohere, and Amazon's own Titan models.

---

*You've completed Lesson 5.1! You now understand the major AI providers and their offerings.*
