# Lesson 2.1: LLM Providers - OpenAI, Anthropic, Google, and Open Source

## Introduction

Choosing an LLM provider is one of the most consequential decisions you'll make when building an AI application. Each provider offers different models with unique strengths, pricing structures, and API designs. This lesson will give you the knowledge to make informed choices.

## The Major Providers Landscape

[Image: Comparison chart of major LLM providers with logos and key stats]

### OpenAI: The Market Leader

**Key Models (2024)**:
- **GPT-4 Turbo**: Most capable, 128K context, $0.01/$0.03 per 1K tokens
- **GPT-4o (Omni)**: Multimodal (vision, audio), competitive pricing
- **GPT-3.5 Turbo**: Fast and cheap, 16K context
- **o1 (Reasoning)**: Chain-of-thought reasoning, specialized tasks

**Strengths**:
- Largest market presence, extensive documentation
- Excellent function calling and structured output
- Strong developer ecosystem

**Weaknesses**:
- Higher costs at scale
- Rate limits can be restrictive for new accounts

```python
from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY env variable

response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
```

### Anthropic: The Safety-Focused Challenger

**Key Models (2024)**:
- **Claude 3.5 Sonnet**: Best balance of capability and cost
- **Claude 3.5 Opus**: Maximum capability for complex tasks
- **Claude 3.5 Haiku**: Fastest, cheapest option

**Strengths**:
- 200K token context window (largest mainstream)
- Constitutional AI safety approach
- Excellent at following complex instructions
- Very good at code generation

**Weaknesses**:
- Smaller ecosystem than OpenAI
- More conservative responses (by design)

```python
import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Write a Python function to validate email addresses."}
    ]
)

print(message.content[0].text)
```

> **Pro Tip**: Claude excels at "system prompts on steroids." It faithfully follows long, complex instructions—great for building agents with specific behaviors.

### Google: The Enterprise Contender

**Key Models (2024)**:
- **Gemini 1.5 Pro**: 2M token context (!), multimodal
- **Gemini 1.5 Flash**: Fast and cost-effective
- **Gemini Ultra**: Maximum capability

**Strengths**:
- Massive context windows (up to 2 million tokens)
- Native multimodal (text, image, video, audio)
- Deep integration with Google Cloud

**Weaknesses**:
- API stability has varied
- Less third-party ecosystem support

```python
import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel("gemini-1.5-pro")

response = model.generate_content(
    "Analyze this image and describe what you see",
    # Can include images, videos, PDFs
)

print(response.text)
```

### Open Source: Control and Privacy

**Key Models (2024)**:
- **Llama 3.1 (Meta)**: 8B, 70B, 405B parameter variants
- **Mistral (Mistral AI)**: 7B, 8x7B MoE, efficient
- **Qwen 2.5 (Alibaba)**: Strong multilingual support
- **DeepSeek**: Excellent for code

**Strengths**:
- Full control over data and infrastructure
- No per-token costs (just compute)
- Can fine-tune for specific use cases
- Privacy—data never leaves your servers

**Weaknesses**:
- Requires infrastructure expertise
- Smaller models = less capability
- Need to manage scaling yourself

```python
# Running locally with Ollama
import ollama

response = ollama.chat(
    model='llama3.1:70b',
    messages=[
        {
            'role': 'user',
            'content': 'Explain the difference between REST and GraphQL'
        }
    ]
)

print(response['message']['content'])
```

## Provider Comparison Matrix

| Factor | OpenAI | Anthropic | Google | Open Source |
|--------|--------|-----------|--------|-------------|
| Max Context | 128K | 200K | 2M | Varies |
| Best For | General use | Complex tasks | Enterprise | Privacy |
| Pricing | $$ | $$ | $$ | $ (compute) |
| Fine-tuning | Limited | No | No | Full control |
| Multimodal | Yes | Limited | Best | Varies |
| API Stability | Excellent | Good | Variable | N/A |

## Choosing the Right Provider

### Decision Framework

```python
def choose_provider(requirements):
    """
    Select the best LLM provider based on requirements.
    """
    
    # Privacy is paramount
    if requirements.get("data_privacy") == "critical":
        return "open_source"
    
    # Need massive context
    if requirements.get("context_size") > 200000:
        return "google_gemini"
    
    # Complex reasoning or safety-critical
    if requirements.get("task_complexity") == "high":
        if requirements.get("safety_critical"):
            return "anthropic"
        return "openai"
    
    # Cost-sensitive high volume
    if requirements.get("volume") == "high" and requirements.get("budget") == "limited":
        return "open_source_hosted"  # e.g., Together AI, Fireworks
    
    # Default to the market leader
    return "openai"
```

### Real-World Provider Strategy

Many production systems use multiple providers:

```python
class MultiProviderClient:
    """Use the right provider for each task."""
    
    def __init__(self):
        self.openai = OpenAI()
        self.anthropic = anthropic.Anthropic()
    
    def simple_completion(self, prompt):
        """Fast, cheap completions with GPT-3.5."""
        return self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    
    def complex_reasoning(self, prompt):
        """Complex tasks with Claude."""
        return self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )
    
    def code_generation(self, prompt):
        """Code with GPT-4."""
        return self.openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are an expert programmer."},
                {"role": "user", "content": prompt}
            ]
        )
```

> **Common Mistake**: Don't lock yourself into a single provider. Design your code with abstraction layers that allow easy switching.

## API Authentication Best Practices

```python
import os
from dotenv import load_dotenv

# Load from .env file (never commit this!)
load_dotenv()

# Good: Use environment variables
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# Bad: Hardcoded keys (NEVER do this)
# api_key = "sk-xxxxxxxxxxxxx"

# For production: Use secrets managers
# - AWS Secrets Manager
# - Google Secret Manager
# - HashiCorp Vault
```

## Key Takeaways

- **OpenAI** is the market leader with excellent tooling and ecosystem
- **Anthropic's Claude** excels at complex instructions and has the largest context window (200K)
- **Google's Gemini** offers massive 2M context and best multimodal capabilities
- **Open source models** provide control and privacy but require infrastructure expertise
- Use **multiple providers** strategically—right tool for each job
- **Abstract your LLM calls** to avoid vendor lock-in
- Never hardcode API keys—use environment variables or secrets managers

## What's Next

In the next lesson, we'll explore vector databases—the technology that gives AI applications "memory" and enables powerful semantic search.

---

*Estimated completion time: 25 minutes*
*Difficulty: Foundational*
