# Lesson 1.5: From GPT-1 to GPT-4 and Beyond

> **Duration**: 35 minutes | **Type**: Historical + Technical
> **Unit**: 1 - AI, ML, and the Generative Revolution

---

## 📚 Reading Material

### The Rapid Evolution of Language Models

In just six years (2018-2024), language models went from "interesting research" to "transformative technology." Understanding this evolution helps you anticipate where AI is heading.

### The GPT Timeline

**GPT-1 (June 2018)**
- Parameters: 117 million
- Training data: BooksCorpus (~7,000 books)
- Context window: 512 tokens
- **Key insight**: Pre-training on general text, then fine-tuning for tasks

**GPT-2 (February 2019)**
- Parameters: 1.5 billion (10x larger)
- Training data: WebText (40GB of web pages)
- Context window: 1024 tokens
- **Key insight**: Zero-shot task performance emerges with scale
- *OpenAI initially withheld release due to misuse concerns*

**GPT-3 (June 2020)**
- Parameters: 175 billion (100x larger than GPT-2)
- Training data: 300 billion tokens
- Context window: 2048 tokens
- **Key insight**: Few-shot learning—learn new tasks from examples in prompt
- *Launched as an API, created the "prompting" paradigm*

**GPT-3.5 / ChatGPT (November 2022)**
- Based on GPT-3.5 architecture
- RLHF alignment for helpfulness
- Conversational interface
- **Key insight**: Alignment makes models usable; UI matters
- *Reached 100M users in 2 months—fastest growing consumer app ever*

**GPT-4 (March 2023)**
- Parameters: ~1.76 trillion (mixture of experts, estimated)
- Training data: Undisclosed, much larger
- Context window: 8K → 32K → 128K tokens
- Multimodal (text + images)
- **Key insight**: Qualitative leap in reasoning and reliability

**GPT-4o (May 2024)**
- Omni-modal: text, vision, audio natively
- Real-time voice conversation
- Faster inference, lower cost
- **Key insight**: Multimodal interaction becomes seamless

### The Competitive Landscape

GPT sparked an arms race:

| Provider | Model Series | Key Strength |
|----------|--------------|--------------|
| **OpenAI** | GPT-4, o1 | Reasoning, reasoning chains |
| **Anthropic** | Claude 3/3.5 | Safety, long context (200K) |
| **Google** | Gemini | Multimodal, integration |
| **Meta** | Llama 3 | Open weights, efficiency |
| **Mistral** | Mixtral | Open source, efficient |
| **xAI** | Grok | Real-time information |

### The Open Source Revolution

While OpenAI and Anthropic kept models closed, others democratized access:

**Llama (Meta)**
- Llama 1 (2023): Released weights for research
- Llama 2 (2023): Commercial license
- Llama 3 (2024): Competitive with GPT-3.5/4 on many tasks

**Mistral**
- Mixtral 8x7B: Mixture of experts, open weights
- Competitive performance at lower cost

**Impact**: Organizations can now run capable models locally, without API dependencies.

### Key Technical Advances (2020-2025)

| Innovation | Impact |
|------------|--------|
| **RLHF** | Made models actually helpful |
| **Instruction tuning** | Follow diverse prompts |
| **Chain-of-thought** | Improved reasoning |
| **Tool use** | Actions in the world |
| **Mixture of experts** | Efficient scaling |
| **Flash Attention** | Longer contexts, lower cost |
| **Quantization** | Run on consumer hardware |

### What's Coming: 2025 and Beyond

**Agentic AI**
Models that can plan, use tools, and complete multi-step tasks autonomously.

**Longer Context**
From 2K to 128K to potentially unlimited context windows.

**Multimodal Native**
Models trained on text, images, audio, video from the start.

**Reasoning Models**
OpenAI's o1 and successors that "think" before responding.

**On-Device AI**
Capable models running on phones and laptops.

**AI Scientists/Engineers**
Models that can design experiments, write and test code autonomously.

---

## 🎬 Video Script

**[INTRO - Timeline animation from 2018 to 2024]**

In 2018, GPT-1 was an interesting research paper. In 2024, GPT-4 powers tools that millions use daily. Let's trace this remarkable evolution.

**[CUT TO: GPT-1 stats]**

GPT-1 had 117 million parameters. It showed that pre-training on books, then fine-tuning for specific tasks, worked surprisingly well. A promising result, not a revolution.

**[CUT TO: GPT-2 stats]**

GPT-2 scaled to 1.5 billion parameters—10x larger. Something unexpected happened: the model could do tasks it was never explicitly trained for. OpenAI was so concerned about misuse they initially withheld it.

**[CUT TO: GPT-3 stats with API diagram]**

GPT-3 scaled to 175 billion parameters—100x larger again. Now the model could learn new tasks from just a few examples in the prompt. This "few-shot learning" changed everything. OpenAI launched it as an API, and the prompting era began.

**[CUT TO: ChatGPT growth chart]**

Then came ChatGPT in November 2022. Same underlying model, but aligned with RLHF and wrapped in a chat interface. It reached 100 million users in two months—the fastest growing consumer application in history.

**[CUT TO: GPT-4 capabilities demo]**

GPT-4 arrived in March 2023—a qualitative leap. It could reason through complex problems, understand images, and perform reliably across domains. The exact size is undisclosed, but estimated around 1.7 trillion parameters in a mixture-of-experts architecture.

**[CUT TO: Competitive landscape diagram]**

GPT's success sparked an arms race. Anthropic's Claude emphasizes safety and offers 200K token context. Google's Gemini integrates across their products. Meta's Llama opened AI to everyone with free weights.

**[CUT TO: Open source logos]**

That open source movement is crucial. Meta's Llama, Mistral's models—you can now run capable AI locally, without depending on any API. This matters for privacy, cost, and control.

**[CUT TO: Future capabilities diagram]**

What's next? Agentic AI—models that plan and execute multi-step tasks. Even longer context windows. Native multimodal understanding. Reasoning models that think step-by-step before answering. AI running on your phone.

**[CUT TO: Speaker on camera]**

We're in year six of a revolution that's accelerating. The models you learn to work with today will be surpassed, but the fundamentals—attention, alignment, prompting, tool use—those will carry forward.

**[END - Runtime: 6:18]**

---

## 🔬 Interactive Lab: Model Comparison Across Generations

### Objective
Compare models of different scales and generations on various tasks.

### Part 1: Scale and Capability (20 minutes)

Test the same prompts across different model sizes:

```python
# If using OpenAI API
from openai import OpenAI
client = OpenAI()

def test_model(model, prompt, max_tokens=150):
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0
    )
    return response.choices[0].message.content

# Test prompts that probe different capabilities
test_prompts = [
    # Reasoning
    "If a bat and a ball cost $1.10 together, and the bat costs $1.00 more than the ball, how much does the ball cost? Think step by step.",
    
    # Multi-step logic
    "In a room, there are 3 switches and 1 light bulb. The light is off. You can only enter the room once. How do you figure out which switch controls the bulb?",
    
    # Coding
    "Write a Python function that finds all prime numbers up to n using the Sieve of Eratosthenes.",
    
    # Knowledge
    "What is the relationship between the Transformer architecture and BERT?",
]

models = ["gpt-3.5-turbo", "gpt-4o-mini", "gpt-4o"]

for prompt in test_prompts:
    print(f"\n{'='*60}")
    print(f"PROMPT: {prompt[:80]}...")
    print("="*60)
    for model in models:
        try:
            response = test_model(model, prompt)
            print(f"\n[{model}]:")
            print(response[:300] + "..." if len(response) > 300 else response)
        except Exception as e:
            print(f"[{model}]: Error - {e}")
```

### Part 2: Context Window Evolution (15 minutes)

Test how models handle long context:

```python
# Create a long context with a "needle" we'll ask about
def create_needle_test(total_tokens=5000, needle_position="middle"):
    """Create a long document with a hidden fact."""
    
    # Filler text
    filler = "The weather today is partly cloudy with a chance of rain. " * 100
    
    # The needle (fact to find)
    needle = "IMPORTANT: The secret code is BLUE-TIGER-42. Remember this code."
    
    # Position the needle
    filler_list = filler.split('. ')
    position = len(filler_list) // 2 if needle_position == "middle" else -5
    filler_list.insert(position, needle)
    
    return '. '.join(filler_list)

# Test
long_context = create_needle_test()
query = "What is the secret code mentioned in the document?"

full_prompt = f"""Document:
{long_context}

Question: {query}
Answer:"""

# Test with different models
for model in ["gpt-3.5-turbo", "gpt-4o"]:
    response = test_model(model, full_prompt, max_tokens=50)
    print(f"[{model}]: {response}")
```

### Part 3: Multimodal Capabilities (15 minutes)

Test vision capabilities (GPT-4V, GPT-4o):

```python
import base64
import requests

def encode_image_url(image_url):
    """Test with an image URL"""
    return image_url

def test_vision(prompt, image_url):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            }
        ],
        max_tokens=300,
    )
    return response.choices[0].message.content

# Test with a public image
image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/300px-PNG_transparency_demonstration_1.png"

response = test_vision("What do you see in this image? Describe it in detail.", image_url)
print(response)
```

### Submission
Create a comparison table documenting which model handles which tasks best and why.

---

## ✅ Knowledge Check

### Question 1
What was the key insight from GPT-3 that changed how we use language models?

A) Models should be very large  
B) Few-shot learning—learning tasks from examples in the prompt  
C) RLHF is necessary  
D) Models need multimodal input  

**Correct Answer**: B

**Explanation**: GPT-3 demonstrated few-shot learning: you could provide a few examples in the prompt, and the model would learn to perform the task without any fine-tuning. This created the "prompting" paradigm.

---

### Question 2
What made ChatGPT so successful compared to GPT-3?

A) It was a much larger model  
B) It combined RLHF alignment with a chat interface  
C) It was free to use  
D) It had vision capabilities  

**Correct Answer**: B

**Explanation**: ChatGPT used GPT-3.5 with RLHF alignment and a conversational interface. This made it usable by anyone, not just developers. The UI and alignment were as important as the underlying model.

---

### Question 3
Why is the Llama model series significant?

A) It's the largest model  
B) It's the fastest model  
C) It released weights openly, enabling local deployment  
D) It was the first language model  

**Correct Answer**: C

**Explanation**: Meta's Llama models released open weights, allowing anyone to run, fine-tune, and deploy capable models without API dependencies. This democratized access to frontier AI.

---

### Question 4
What is "mixture of experts" architecture used in models like GPT-4 and Mixtral?

A) A team of human experts reviewing outputs  
B) Multiple specialized sub-networks, with only some activated per input  
C) Combining multiple different models  
D) Training on expert-curated data  

**Correct Answer**: B

**Explanation**: Mixture of experts (MoE) uses multiple specialized sub-networks ("experts"). For each input, only a subset of experts are activated, enabling larger total capacity without proportionally higher compute costs.

---

### Question 5
What is the trend for context window sizes in recent models?

A) Staying constant at 2K tokens  
B) Steadily increasing (8K → 32K → 128K → 200K+)  
C) Decreasing for efficiency  
D) Context windows are being removed  

**Correct Answer**: B

**Explanation**: Context windows have grown dramatically: GPT-3 had 2K, GPT-4 Turbo has 128K, and Claude 3 offers 200K. This enables processing entire codebases, long documents, and complex conversations.

---

*You've completed Unit 1! You now have a strong foundation in AI history, concepts, and the evolution of language models.*
