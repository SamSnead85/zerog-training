# Lesson 1.1: What is Artificial Intelligence?

> **Duration**: 35 minutes | **Type**: Foundational Concepts
> **Unit**: 1 - AI, ML, and the Generative Revolution

---

## 📚 Reading Material

### The Definition Problem

Ask ten AI researchers to define artificial intelligence, and you'll get twelve different answers. This isn't because the field is confused—it's because "intelligence" itself is one of the most debated concepts in philosophy and cognitive science.

For our purposes, let's start with a practical definition:

> **Artificial Intelligence (AI)**: The science and engineering of creating systems that can perform tasks that typically require human intelligence—such as understanding language, recognizing patterns, making decisions, and learning from experience.

This definition is deliberately broad. It encompasses everything from the spam filter in your email (narrow AI) to the science fiction dream of human-like general intelligence (AGI).

### A Brief History: Three Waves of AI

**The First Wave: Symbolic AI (1956-1980s)**

AI was born at a 1956 Dartmouth workshop where researchers proposed that "every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it."

Early AI was **symbolic**—systems of explicit rules and logic. If a patient has symptoms X, Y, and Z, then diagnose disease A. These "expert systems" achieved real commercial success in the 1980s but hit a wall: encoding human knowledge into rules proved impossibly tedious and brittle.

**The Second Wave: Machine Learning (1990s-2010s)**

Instead of programming rules, what if we showed computers examples and let them figure out the rules themselves? This insight—learning from data—revolutionized the field.

Key milestones:
- **1997**: IBM's Deep Blue defeats chess champion Garry Kasparov
- **2011**: IBM Watson wins Jeopardy!
- **2012**: AlexNet demolishes ImageNet competition, igniting the deep learning revolution
- **2016**: AlphaGo defeats world Go champion Lee Sedol

**The Third Wave: Generative AI (2017-Present)**

The publication of "Attention Is All You Need" in 2017 introduced the **transformer architecture**, which proved spectacularly good at understanding and generating human language. This led to:

- **2018**: BERT shows the power of pre-training on massive text data
- **2020**: GPT-3 demonstrates that scale leads to emergent capabilities
- **2022**: ChatGPT brings AI to the mainstream
- **2023-2024**: Claude, Gemini, and open-source models create a competitive ecosystem
- **2025**: Agentic AI and AI workflows become enterprise-ready

### Types of AI Systems

Understanding the taxonomy helps you navigate vendor claims and identify appropriate solutions:

```
┌─────────────────────────────────────────────────────────┐
│                    Artificial Intelligence               │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Machine Learning                       │ │
│  │                                                     │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │           Deep Learning                       │  │ │
│  │  │                                               │  │ │
│  │  │  ┌─────────────────────────────────────────┐ │  │ │
│  │  │  │      Generative AI / LLMs              │ │  │ │
│  │  │  └─────────────────────────────────────────┘ │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Narrow AI (ANI)**: Systems designed for specific tasks. This is what we have today. Every AI product you use—from Siri to Tesla Autopilot to ChatGPT—is narrow AI, even if impressively capable within its domain.

**General AI (AGI)**: A hypothetical system with human-like reasoning across any intellectual task. We don't have this. Current estimates range from 5 to 50+ years away, if ever.

**Superintelligent AI (ASI)**: AI that surpasses human intelligence in all domains. Purely theoretical—the subject of philosophy and science fiction.

### Why Now? The Convergence Factors

AI isn't new, so why did it suddenly explode in 2022? Four factors converged:

1. **Compute**: NVIDIA GPUs and cloud infrastructure made massive parallel processing affordable
2. **Data**: The internet created an unprecedented corpus of human-generated text, images, and video
3. **Algorithms**: Transformers proved remarkably efficient at learning from this data
4. **Scale**: Researchers discovered that bigger models exhibit "emergent" capabilities that smaller models lack

### The AI-Native Perspective

As you progress through this curriculum, you'll develop an "AI-native" perspective—the ability to see problems through the lens of what AI can and cannot do. This starts with understanding that AI systems are:

- **Statistical pattern matchers**, not logical reasoners
- **Probabilistic**, not deterministic
- **Trained**, not programmed
- **Narrow experts**, not general intelligences
- **Tools**, not replacements for human judgment

---

## 🎬 Video Script

**[INTRO - Speaker on camera with AI timeline graphic in background]**

Welcome to your first lesson in the AI-Native curriculum. I'm going to tell you something that might surprise you: most people who use AI every day don't actually know what it is. And that's a problem—because misunderstanding AI leads to either overestimating what it can do, or completely missing opportunities to use it.

**[CUT TO: Animation of brain vs computer chip]**

So let's fix that right now. Artificial intelligence is NOT about creating machines that think like humans. That's science fiction. Real AI is about creating systems that can learn patterns from data and use those patterns to make predictions or generate new content.

**[CUT TO: Timeline animation showing three waves]**

AI has gone through three major phases. In the first wave, from the 1950s to 1980s, we tried to program intelligence explicitly—writing rules for everything. "If the patient has these symptoms, it's this disease." This worked for narrow domains but couldn't scale.

The second wave was machine learning. Instead of programming rules, we show the computer thousands of examples and say "figure out the pattern yourself." This gave us spam filters, recommendation engines, and eventually, in 2012, a breakthrough—

**[CUT TO: ImageNet results graph]**

—a neural network called AlexNet crushed the competition in image recognition. This kicked off the deep learning revolution.

**[CUT TO: Transformer architecture diagram]**

Then in 2017, Google researchers published a paper called "Attention Is All You Need." They introduced something called the transformer architecture. This is the foundation of every large language model you've heard of—GPT-4, Claude, Gemini, Llama. All of them are transformers.

**[CUT TO: Speaker back on camera]**

Now here's what you need to understand for the rest of this curriculum: these models are not intelligent in the way you are. They're incredibly sophisticated pattern matching systems. They've seen so much text that they can predict, with remarkable accuracy, what word should come next.

**[CUT TO: Demo of ChatGPT completing a sentence]**

When you ask ChatGPT a question, it's not "thinking" about it. It's predicting what text would most likely follow your question, based on patterns learned from training data. The fact that this produces useful, coherent, even creative responses is what's remarkable.

**[CUT TO: AI types diagram]**

Quick terminology check. When we say AI, we typically mean narrow AI—systems designed for specific tasks. General AI, sometimes called AGI, would be a system with human-like reasoning across any domain. We don't have that. Despite what headlines might suggest, we're nowhere close.

**[CUT TO: Four convergence factors graphic]**

Why did AI explode in 2022? Four things came together: massive computing power from GPUs, unprecedented amounts of training data from the internet, the transformer algorithm, and the discovery that scaling up models leads to emergent capabilities—abilities that smaller models simply don't have.

**[OUTRO - Speaker on camera]**

Here's your takeaway: AI systems are statistical pattern matchers trained on data. They're incredibly useful tools, but they're not magic, and they're not thinking. In the next lesson, we'll go deeper into how machine learning actually works at the algorithmic level. See you there.

**[END - Runtime: 6:42]**

---

## 🔬 Interactive Lab: Exploring AI System Types

### Objective
Interact with different types of AI systems to understand their capabilities and limitations.

### Prerequisites
- Web browser
- (Optional) OpenAI API key for Part 3

### Part 1: Rule-Based vs. Learning-Based Systems (15 minutes)

**Scenario**: You're building a customer support routing system.

**Task 1.1**: Write explicit rules to route the following customer messages to the correct department (Sales, Support, Billing):

```python
# Rule-based approach
def route_message_rules(message):
    message_lower = message.lower()
    
    # TODO: Add your rules here
    # Example: if "price" in message_lower or "cost" in message_lower:
    #     return "Sales"
    
    return "Support"  # Default

# Test messages
test_messages = [
    "I want to upgrade my subscription",
    "My payment didn't go through",
    "How do I reset my password?",
    "Can you give me a discount?",
    "The app keeps crashing",
    "I'd like a refund for last month"
]

for msg in test_messages:
    print(f"'{msg}' -> {route_message_rules(msg)}")
```

**Expected Output After Your Rules**:
- Upgrade subscription → Sales
- Payment didn't go through → Billing
- Reset password → Support
- Discount → Sales
- App crashing → Support
- Refund → Billing

**Reflection Question**: How many rules did you need? What messages might your rules fail on?

**Task 1.2**: Now let's see how an LLM handles the same task:

```python
# You can test this at chat.openai.com or claude.ai
PROMPT = """
You are a customer support router. Route each message to exactly one department:
- Sales: pricing, upgrades, new purchases, discounts
- Support: technical issues, how-to questions, bugs
- Billing: payments, invoices, refunds, charges

Message: "{message}"

Respond with only the department name.
"""
```

Test the same messages. How does the LLM's accuracy compare?

### Part 2: Exploring Model Capabilities (20 minutes)

Visit each of these free AI tools and complete the comparison:

| Task | ChatGPT | Claude | Gemini |
|------|---------|--------|--------|
| Summarize: "The transformer architecture uses self-attention mechanisms..." (paste 2 paragraphs from Wikipedia) | | | |
| Math: "If I buy 3 items at $12.99 and tax is 8.25%, what's my total?" | | | |
| Code: "Write a Python function to check if a string is a palindrome" | | | |
| Creative: "Write a haiku about machine learning" | | | |
| Reasoning: "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?" | | | |

**Record Your Observations**:
1. Which model was fastest?
2. Which gave the most accurate answers?
3. Did any model get the bat-and-ball question wrong? (It's a famous cognitive bias test)

### Part 3: API Exploration (Optional - 15 minutes)

If you have an OpenAI API key, explore the difference between models:

```python
from openai import OpenAI
client = OpenAI()

def compare_models(prompt):
    models = ["gpt-3.5-turbo", "gpt-4o-mini", "gpt-4o"]
    
    for model in models:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100
        )
        print(f"\n{model}:")
        print(response.choices[0].message.content)
        print(f"Tokens used: {response.usage.total_tokens}")

# Test with a complex reasoning question
compare_models("Explain why the sky appears blue in exactly 2 sentences.")
```

**Observation Questions**:
1. Do larger models give qualitatively better answers?
2. How do token counts differ between models for the same output length?

### Submission
Complete the reflection form with your observations about the differences between rule-based and learning-based systems, and between different AI models.

---

## ✅ Knowledge Check

### Question 1
Which of the following best describes artificial intelligence?

A) Computer programs that can think exactly like humans  
B) Systems that can perform tasks typically requiring human intelligence  
C) Robots with consciousness  
D) Programs that follow explicit rules  

**Correct Answer**: B

**Explanation**: AI encompasses systems that can perform tasks typically requiring human intelligence—like understanding language, recognizing patterns, and making decisions. This includes both rule-based systems and learning-based systems. AI does not require consciousness or human-like thinking.

---

### Question 2
What technological breakthrough in 2017 enabled the current wave of large language models?

A) The invention of the GPU  
B) The creation of the internet  
C) The transformer architecture  
D) Quantum computing  

**Correct Answer**: C

**Explanation**: The 2017 paper "Attention Is All You Need" introduced the transformer architecture, which uses self-attention mechanisms to process sequences efficiently. This became the foundation for GPT, BERT, Claude, and all modern LLMs.

---

### Question 3
What is the key difference between "narrow AI" and "general AI"?

A) Narrow AI is faster than general AI  
B) Narrow AI is designed for specific tasks; general AI would handle any intellectual task  
C) Narrow AI requires more data than general AI  
D) General AI already exists in products like ChatGPT  

**Correct Answer**: B

**Explanation**: Narrow AI (also called ANI) is designed and optimized for specific tasks—like image recognition, language translation, or playing chess. General AI (AGI) would be able to reason across any intellectual domain, like a human can. All current AI systems, including ChatGPT and Claude, are narrow AI.

---

### Question 4
Why did the "second wave" of AI (machine learning) succeed where the "first wave" (symbolic AI) struggled?

A) Computers became powerful enough to run rule-based systems  
B) Instead of programming rules explicitly, systems learned patterns from data  
C) Scientists finally understood human consciousness  
D) The internet made it easier to share rules between systems  

**Correct Answer**: B

**Explanation**: The first wave required humans to explicitly encode knowledge as rules, which proved tedious, incomplete, and brittle. Machine learning flipped the script: instead of programming rules, you provide examples and let the algorithm discover patterns. This scales much better to complex, real-world problems.

---

### Question 5
According to this lesson, what is an LLM actually doing when it responds to your question?

A) Looking up the answer in a database  
B) Thinking logically about the problem  
C) Predicting what text would most likely follow your input  
D) Connecting to the internet to find relevant information  

**Correct Answer**: C

**Explanation**: LLMs are trained to predict the next token (word or word-piece) given the preceding context. When you ask a question, the model generates a response by repeatedly predicting the most likely next token. It's statistical pattern matching at scale, not logical reasoning or database lookup.

---

### Question 6
Which four factors converged to enable the AI breakthrough of 2022?

A) Smartphones, cloud computing, blockchain, and 5G  
B) Compute, data, transformer algorithms, and scale  
C) Social media, open-source software, venture capital, and regulation  
D) Robotics, natural language processing, computer vision, and reinfortic learning  

**Correct Answer**: B

**Explanation**: The four convergence factors are: (1) Compute—GPU clusters made massive parallel processing affordable; (2) Data—the internet provided unprecedented training corpora; (3) Algorithms—transformers proved remarkably efficient; (4) Scale—researchers discovered that larger models exhibit emergent capabilities.

---

### Question 7
Based on this lesson, which statement about current AI systems is TRUE?

A) They can reason logically about any problem  
B) They are statistical pattern matchers trained on data  
C) They understand concepts the way humans do  
D) They have achieved general intelligence  

**Correct Answer**: B

**Explanation**: Current AI systems, even the most impressive ones, are fundamentally statistical pattern matchers. They find patterns in training data and use those patterns to make predictions. They don't "understand" in the human sense, and they don't reason logically—they generate probable outputs based on learned patterns.

---

### Question 8
What is the practical implication of AI being "probabilistic rather than deterministic"?

A) AI always gives correct answers  
B) AI gives the same answer every time for the same input  
C) AI outputs can vary and may include errors or "hallucinations"  
D) AI cannot be used for important business decisions  

**Correct Answer**: C

**Explanation**: Because AI systems are probabilistic (predicting likely outputs rather than following fixed rules), they can produce different outputs for the same input and may confidently generate incorrect information ("hallucinations"). This is why human oversight remains essential for AI systems.

---

*Congratulations on completing Lesson 1.1! You now have a solid foundation for understanding AI. In the next lesson, we'll dive into the machine learning paradigm.*
