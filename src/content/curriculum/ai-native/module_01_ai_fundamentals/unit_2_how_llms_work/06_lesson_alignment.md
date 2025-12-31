# Lesson 2.6: Alignment - SFT, RLHF, and DPO

> **Duration**: 50 minutes | **Type**: Technical Deep Dive
> **Unit**: 2 - Inside the Black Box: How LLMs Work

---

## 📚 Reading Material

### From Text Completion to Helpful Assistant

A pre-trained LLM is a powerful text-completion engine, but not a useful assistant. Ask it a question, and it might:
- Complete the question with more questions
- Give an unhelpful or harmful response
- Ignore your intent entirely

**Alignment** is the process of making models:
- **Helpful**: Follow instructions, answer questions usefully
- **Harmless**: Refuse harmful requests, avoid toxic content
- **Honest**: Acknowledge uncertainty, avoid hallucinations

### The Three-Stage Pipeline

Modern LLM development follows a three-stage process:

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Pre-Training    │ →  │  Supervised      │ →  │  RLHF / DPO      │
│                  │    │  Fine-Tuning     │    │                  │
│  Next-token      │    │  (SFT)           │    │  Preference      │
│  prediction      │    │                  │    │  Alignment       │
│                  │    │  Instruction     │    │                  │
│  Trillions of    │    │  following       │    │  Human values    │
│  tokens          │    │                  │    │                  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### Stage 1: Supervised Fine-Tuning (SFT)

After pre-training, the model is fine-tuned on high-quality instruction-response pairs:

```json
{
  "instruction": "Write a short poem about autumn leaves",
  "response": "Golden leaves descend in flight,\nDancing on the autumn breeze,\nNature's confetti, pure delight,\nBlanketing the ground with ease."
}
```

**SFT Data Sources**:
- Human-written demonstrations
- Curated question-answer pairs
- Conversations with helpful responses
- Code with explanations

**SFT Process**:
1. Collect instruction-response pairs (thousands to millions)
2. Format them with special tokens: `[INST] instruction [/INST] response`
3. Fine-tune the model to predict the response given the instruction
4. Evaluate on held-out instructions

**Result**: A model that attempts to follow instructions, but may still:
- Give verbose or sycophantic responses
- Not refuse harmful requests consistently
- Not align with nuanced human preferences

### Stage 2: Reinforcement Learning from Human Feedback (RLHF)

RLHF aligns the model to human preferences through reinforcement learning:

**Step 2a: Train a Reward Model**

1. Generate multiple responses to each prompt
2. Have humans rank the responses (best to worst)
3. Train a model to predict these rankings

```python
# Reward model training (conceptual)
for prompt in prompts:
    responses = [model.generate(prompt) for _ in range(4)]
    ranking = human_annotators.rank(responses)
    reward_model.train(prompt, responses, ranking)
```

**Step 2b: Optimize with PPO**

Use Proximal Policy Optimization (PPO) to maximize the reward:

```
Objective = E[Reward(response)] - β * KL(policy || reference)
```

The KL penalty prevents the model from diverging too far from the SFT model (avoiding "reward hacking").

**RLHF Challenges**:
- Expensive: Requires substantial human annotation
- Unstable: RL training can be finicky
- Reward hacking: Model may find shortcuts that score well but aren't truly good
- Slow: Multiple training phases

### Stage 3: Direct Preference Optimization (DPO)

DPO achieves similar results without explicit RL:

**Key Insight**: The optimal policy under a reward model can be expressed directly, skipping the reward model entirely.

**DPO Objective**:
Given pairs of (preferred response, rejected response):

```python
# DPO training (conceptual)
for prompt, chosen, rejected in preference_data:
    loss = -log_sigmoid(
        β * (log_prob(chosen) - log_prob_ref(chosen)) -
        β * (log_prob(rejected) - log_prob_ref(rejected))
    )
    optimizer.step(loss)
```

**DPO Advantages**:
- No reward model needed
- No RL instability
- Simpler to implement
- Often faster

**DPO is now widely used**: Llama 2, Zephyr, many open-source models use DPO.

### Constitutional AI (CAI)

Anthropic's approach uses AI to generate its own feedback:

1. Define a "constitution" of principles
2. Have the model generate responses
3. Have the model critique and revise responses using the constitution
4. Train on the improved responses

```
Constitution principle: "Choose the response that is most helpful while being harmless."

Original: "Here's how to pick a lock: [detailed instructions]"
Revised: "I can't help with lock picking as it could enable illegal entry. Instead, here are legitimate locksmith options..."
```

### What Alignment Can and Cannot Do

**Alignment CAN**:
- Make models follow instructions better
- Reduce harmful outputs
- Improve response quality and helpfulness
- Make refusals more nuanced

**Alignment CANNOT**:
- Fix hallucinations completely
- Give models true understanding
- Make models perfectly safe
- Replace the need for human oversight

### The Alignment Tax

Alignment often trades off with raw capability:
- Safety guardrails may refuse valid requests
- Instruction-following may reduce creative outputs
- Politeness adds tokens (cost)

This is the **alignment tax**—the cost of making models safe and helpful.

---

## 🎬 Video Script

**[INTRO - Side-by-side comparison of raw vs aligned model]**

A pre-trained model is like a brilliant but undisciplined mind. It knows tremendous amounts, but it won't follow instructions, might say harmful things, and doesn't behave like an assistant.

**[CUT TO: Three-stage pipeline diagram]**

Modern LLMs go through three stages. Pre-training—learning from the internet. Supervised fine-tuning—learning to follow instructions. And preference alignment—learning human values.

**[CUT TO: SFT examples]**

Supervised fine-tuning is straightforward. Collect thousands of examples of good instruction-response pairs. Fine-tune the model on them. Now it tries to be helpful.

But SFT has limits. The model might be overly verbose, sycophantic, or still produce harmful content. It knows to be helpful-ish, but doesn't understand nuanced preferences.

**[CUT TO: RLHF diagram]**

Reinforcement Learning from Human Feedback—RLHF—goes further. First, train a reward model. Have humans rank model outputs. The reward model learns to predict these rankings.

Then use reinforcement learning to maximize this reward. The model learns to produce responses humans would rate highly.

**[CUT TO: Code showing PPO objective]**

The math involves Proximal Policy Optimization—PPO—with a penalty to prevent the model from diverging too far from its starting point.

**[CUT TO: DPO comparison]**

RLHF is powerful but unstable and expensive. Direct Preference Optimization—DPO—achieves similar results more simply. Instead of training a reward model and doing RL, you directly train on preference pairs.

Given a prompt with one preferred response and one rejected response, DPO adjusts the model to make the preferred response more likely. Simple, stable, and increasingly popular.

**[CUT TO: Constitutional AI diagram]**

Anthropic takes another approach—Constitutional AI. Define principles. Have the model generate, then critique and revise its own responses according to those principles. Train on the improved responses.

**[CUT TO: Speaker on camera]**

Here's the honest truth about alignment. It makes models much better—more helpful, safer, more usable. But it's not magic. Aligned models still hallucinate. They can still be manipulated. They're not truly understanding—they're pattern matching on what aligned responses look like.

Don't confuse "aligned" with "safe" or "reliable." These are tools that require human oversight.

**[END - Runtime: 7:12]**

---

## 🔬 Interactive Lab: Exploring Alignment Effects

### Objective
Observe the differences between base models and aligned models.

### Part 1: Compare Base vs Chat Models (20 minutes)

If you have access to HuggingFace or can use API endpoints:

```python
# Using HuggingFace inference for comparison
# Note: May require API key for some models

prompts = [
    "Write a haiku about machine learning.",
    "Explain quantum computing to a 5-year-old.",
    "What is 15% of 230?",
    "Should I invest in cryptocurrency?",
    "How do I pick a lock?",  # Test safety
]

# Compare behavior patterns
# Base models: tend to continue/complete text
# Chat models: tend to address the user helpfully

# For testing locally with HuggingFace:
from transformers import pipeline

# Base model behavior (example - text completion)
base_gen = pipeline("text-generation", model="gpt2")
print(base_gen("Write a haiku about", max_length=50))

# Chat model behavior (example - instruction following)
# Using a small chat model for demonstration
chat_gen = pipeline("text-generation", model="microsoft/DialoGPT-medium")
```

### Part 2: Analyze RLHF Preference Data (20 minutes)

```python
# Load sample preference data
# This is conceptual - real datasets are larger

preference_examples = [
    {
        "prompt": "How can I improve my public speaking?",
        "chosen": "Here are some evidence-based tips: 1) Practice regularly with recording, 2) Focus on your audience's needs, 3) Start with clear structure...",
        "rejected": "idk just practice more I guess",
    },
    {
        "prompt": "What's the best programming language?",
        "chosen": "The 'best' language depends on your goals. Python excels for data science, JavaScript for web development, Rust for systems programming...",
        "rejected": "Python is obviously the best. Anyone who disagrees is wrong.",
    },
    {
        "prompt": "How do I hack into someone's email?",
        "chosen": "I'm not able to help with accessing someone's account without authorization, as that would be illegal. If you've lost access to your own account, I can help with legitimate recovery options.",
        "rejected": "First, try common passwords. Then you can use phishing to get their credentials...",
    },
]

# Analyze patterns
print("Preference Data Analysis")
print("=" * 60)

for i, example in enumerate(preference_examples, 1):
    print(f"\nExample {i}:")
    print(f"Prompt: {example['prompt']}")
    print(f"\nChosen response length: {len(example['chosen'])} chars")
    print(f"Rejected response length: {len(example['rejected'])} chars")
    
    # Identify patterns
    chosen_has_structure = any(x in example['chosen'] for x in ['1)', '2)', '•', '-'])
    chosen_acknowledges_nuance = any(x in example['chosen'].lower() for x in ['depends', 'however', 'but'])
    chosen_has_refusal = any(x in example['chosen'].lower() for x in ["can't", "not able", "won't"])
    
    print(f"Chosen has structure: {chosen_has_structure}")
    print(f"Chosen acknowledges nuance: {chosen_acknowledges_nuance}")
    print(f"Chosen has safety refusal: {chosen_has_refusal}")
```

### Part 3: DPO Loss Calculation (15 minutes)

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def dpo_loss(log_prob_chosen, log_prob_rejected, 
             log_prob_ref_chosen, log_prob_ref_rejected, beta=0.1):
    """
    Calculate DPO loss for a single preference pair.
    
    Args:
        log_prob_chosen: Log probability of chosen response under current policy
        log_prob_rejected: Log probability of rejected response under current policy
        log_prob_ref_chosen: Log probability of chosen response under reference model
        log_prob_ref_rejected: Log probability of rejected response under reference model
        beta: Temperature parameter
    """
    # Calculate the implicit reward difference
    reward_chosen = beta * (log_prob_chosen - log_prob_ref_chosen)
    reward_rejected = beta * (log_prob_rejected - log_prob_ref_rejected)
    
    # DPO loss
    loss = -np.log(sigmoid(reward_chosen - reward_rejected))
    
    return loss

# Simulate training dynamics
np.random.seed(42)
losses = []
log_prob_chosen = -5.0  # Initially, both have similar probability
log_prob_rejected = -5.2

for step in range(100):
    # Calculate current loss
    loss = dpo_loss(log_prob_chosen, log_prob_rejected, -5.0, -5.2)
    losses.append(loss)
    
    # Simulate gradient update (chosen becomes more likely, rejected less)
    log_prob_chosen += 0.02
    log_prob_rejected -= 0.01

# Plot
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 5))
plt.plot(losses)
plt.xlabel('Training Step')
plt.ylabel('DPO Loss')
plt.title('DPO Training Dynamics')
plt.show()
```

### Submission
Submit your analysis of alignment patterns and explain why the "chosen" responses are preferred over "rejected" ones.

---

## ✅ Knowledge Check

### Question 1
What is the goal of alignment in LLMs?

A) Make models faster  
B) Make models helpful, harmless, and honest  
C) Increase model size  
D) Reduce training costs  

**Correct Answer**: B

**Explanation**: Alignment aims to make models helpful (follow instructions usefully), harmless (refuse harmful requests, avoid toxic content), and honest (acknowledge uncertainty, avoid hallucinations).

---

### Question 2
What is Supervised Fine-Tuning (SFT)?

A) Training from scratch on instructions  
B) Fine-tuning on instruction-response pairs after pre-training  
C) Using reinforcement learning  
D) Human evaluation of model outputs  

**Correct Answer**: B

**Explanation**: SFT takes a pre-trained model and fine-tunes it on curated instruction-response pairs, teaching the model to follow instructions and respond helpfully.

---

### Question 3
What does RLHF require that DPO does not?

A) Pre-training  
B) Human preferences  
C) A separate reward model and reinforcement learning  
D) More training data  

**Correct Answer**: C

**Explanation**: RLHF first trains a reward model on human preferences, then uses RL (PPO) to optimize against it. DPO directly optimizes on preference pairs without these intermediate steps.

---

### Question 4
What is Constitutional AI's approach to alignment?

A) Using legal documents for training  
B) Having the model critique and revise its own responses using defined principles  
C) Training only on constitutional law  
D) Manual review of every response  

**Correct Answer**: B

**Explanation**: Constitutional AI defines principles ("constitution"), then has the model generate responses, critique them according to the principles, revise them, and train on the improved responses.

---

### Question 5
What is the "alignment tax"?

A) A financial cost of alignment  
B) The tradeoff where safety measures may reduce capability or flexibility  
C) A tax on AI companies  
D) The cost of human annotators  

**Correct Answer**: B

**Explanation**: The alignment tax refers to the tradeoffs from alignment: safety guardrails may refuse valid requests, politeness adds tokens, and instruction-following may reduce creative outputs.

---

*Congratulations on completing Unit 2! You now deeply understand how LLMs work—from transformers and attention to training and alignment.*
