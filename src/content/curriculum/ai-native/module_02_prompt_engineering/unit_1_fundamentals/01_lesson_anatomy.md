# Lesson 1.1: Anatomy of a Prompt

> **Duration**: 45 minutes | **Type**: Foundational
> **Unit**: 1 - Prompt Fundamentals

---

## 📚 Reading Material

### What Is a Prompt?

A **prompt** is the input you provide to a language model. Everything the model knows about your task comes from the prompt. There's no mind reading—if it's not in the prompt, the model doesn't know it.

### The Six Components of an Effective Prompt

Every effective prompt contains some combination of these elements:

```
┌─────────────────────────────────────────────────────────────┐
│  PROMPT COMPONENTS                                           │
├─────────────────────────────────────────────────────────────┤
│  1. TASK         - What do you want done?                   │
│  2. CONTEXT      - Background information needed            │
│  3. EXAMPLES     - What good output looks like              │
│  4. FORMAT       - How output should be structured          │
│  5. CONSTRAINTS  - What to avoid or limits to respect       │
│  6. PERSONA      - Who/what the model should act as         │
└─────────────────────────────────────────────────────────────┘
```

### Component 1: The Task

The core instruction—what you want the model to do.

**Weak task**:
```
Help me with this email.
```

**Strong task**:
```
Rewrite this customer complaint response to be more empathetic 
while maintaining our policy that refunds are not available after 30 days.
```

**Task writing principles**:
- Start with a verb (Write, Analyze, Extract, Generate)
- Be specific about the outcome
- Include the scope (how much, how long)

### Component 2: Context

Background information the model needs to complete the task well.

```
CONTEXT:
- You are helping a B2B SaaS company
- The customer is an enterprise client ($50K ARR)
- They have been a customer for 2 years
- This is their third complaint this month

TASK:
Write a response that acknowledges their concerns and offers 
a call with our Customer Success Manager.
```

**What context to include**:
- Domain/industry information
- Audience characteristics
- Relevant history
- Business rules or policies

### Component 3: Examples

Showing the model what good looks like:

```
TASK: Classify customer feedback as positive, negative, or neutral.

EXAMPLES:
"I love this product!" → positive
"It's okay, nothing special" → neutral
"This is the worst purchase I've ever made" → negative

NOW CLASSIFY:
"The product works but the shipping was slow"
```

Examples are especially powerful for:
- Classification tasks
- Style matching
- Specific output formats

### Component 4: Format

How the output should be structured:

```
TASK: Extract key information from this meeting transcript.

FORMAT:
{
  "attendees": ["name1", "name2"],
  "key_decisions": ["decision1", "decision2"],
  "action_items": [
    {"owner": "name", "task": "description", "due": "date"}
  ],
  "next_meeting": "date or null"
}
```

**Common formats**:
- JSON (best for parsing)
- Markdown (best for reading)
- Bullet points
- Numbered lists
- Tables

### Component 5: Constraints

What to avoid, limits, or requirements:

```
CONSTRAINTS:
- Response must be under 100 words
- Do not mention competitor products by name
- Use UK English spelling
- Do not include any pricing information
- If uncertain, say "I'm not sure" rather than guessing
```

**Common constraints**:
- Length limits
- Topics to avoid
- Required elements
- Style requirements
- Accuracy qualifiers

### Component 6: Persona

Who or what the model should act as:

```
PERSONA: You are a senior software engineer at Google with 15 years 
of experience in distributed systems. You give direct, technically 
precise answers and aren't afraid to say when something is a bad idea.

TASK: Review this system design and identify potential issues.
```

Personas influence:
- Tone and style
- Level of detail
- Types of suggestions
- Risk assessment

---

## 🎬 Video Script

**[INTRO - Blank prompt box]**

Everything a language model knows about your task comes from the prompt. There's no mind reading. If it's not in the prompt, the model doesn't know it. Let me break down what makes an effective prompt.

**[CUT TO: Six components diagram]**

Every effective prompt contains some combination of six components: Task, Context, Examples, Format, Constraints, and Persona.

**[CUT TO: Task examples]**

The task is what you want done. "Help me with this email" is vague. "Rewrite this response to be more empathetic while maintaining our 30-day refund policy" is specific. Start with a verb. Be clear about the outcome.

**[CUT TO: Context example]**

Context is background information. Who's the customer? What's the situation? What policies apply? The more relevant context you provide, the better the response.

**[CUT TO: Examples demonstration]**

Examples show what good looks like. This is few-shot learning. Show the model three examples of correct classifications, then ask it to classify a new one. Incredibly powerful for style matching and specific formats.

**[CUT TO: Format specification]**

Format specifies structure. Want JSON? Show the exact schema. Want bullet points? Say so. Want exactly three paragraphs? Specify it. Models are very good at following format instructions.

**[CUT TO: Constraints list]**

Constraints are what to avoid. Under 100 words. No competitor mentions. UK spelling. If uncertain, say so. These guardrails prevent common problems.

**[CUT TO: Persona example]**

Persona is who the model acts as. A senior engineer gives different advice than a junior one. A teacher explains differently than a researcher. Personas shift tone, detail level, and perspective.

**[CUT TO: Speaker on camera]**

You don't need all six components in every prompt. Simple tasks might just need Task and Format. Complex tasks might need all six. The skill is knowing what's necessary for your specific case.

**[END - Runtime: 6:15]**

---

## 🔬 Interactive Lab: Prompt Construction

### Objective
Practice constructing prompts using all six components.

### Part 1: Component Identification (15 minutes)

```python
# Identify which components are present in these prompts

prompts = [
    """You are a helpful customer service agent. 
    The customer is upset about a delayed order.
    Write a brief, apologetic response that offers 
    a 10% discount on their next order.""",
    
    """Classify these products as electronics, clothing, or home.
    
    iPhone 14 → electronics
    Blue jeans → clothing
    Coffee maker → home
    
    Now classify: Bluetooth headphones""",
    
    """Summarize this article in 3 bullet points.
    Do not include any opinions, only facts from the article.
    Output in markdown format.""",
]

components = ["task", "context", "examples", "format", "constraints", "persona"]

for i, prompt in enumerate(prompts, 1):
    print(f"\n{'='*50}")
    print(f"Prompt {i}:")
    print(prompt[:100] + "...")
    print(f"\nComponents present:")
    # Analyze each prompt for components
    # Your answers:
```

**Expected Analysis**:
- Prompt 1: Persona, Context, Task, Format (implicit)
- Prompt 2: Task, Examples, Format (implicit)
- Prompt 3: Task, Format, Constraints

### Part 2: Prompt Enhancement (20 minutes)

```python
# Transform weak prompts into strong prompts

weak_prompts = [
    "Write about AI",
    "Help me with code",
    "Summarize this",
]

# Example enhancement
weak = "Write about AI"
strong = """
PERSONA: You are a technology journalist writing for Harvard Business Review.

TASK: Write a 300-word article explaining why business leaders should 
care about AI adoption in 2025.

FORMAT:
- Opening hook (1 sentence)
- Three key points with supporting evidence
- Call to action conclusion

CONSTRAINTS:
- Target audience: C-suite executives
- Avoid technical jargon
- Include one specific statistic
"""

print("Enhanced prompt:")
print(strong)

# Now enhance the other weak prompts yourself
```

### Part 3: Build Complete Prompts (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def test_prompt(prompt, task_description=""):
    """Test a prompt and evaluate the response"""
    print(f"\n{'='*60}")
    print(f"Testing: {task_description}")
    print(f"{'='*60}")
    print(f"Prompt:\n{prompt[:200]}...")
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    
    result = response.choices[0].message.content
    print(f"\nResponse:\n{result}")
    return result

# Task: Build a complete prompt for product description generation

product_prompt = """
PERSONA: You are a senior copywriter for a premium e-commerce brand.

CONTEXT:
- The product is a wireless noise-cancelling headphone
- Target customer: Work-from-home professionals
- Price point: $349 (premium tier)
- Key features: 40-hour battery, adaptive noise cancellation, premium materials

TASK: Write a product description for our website.

FORMAT:
- Headline (max 10 words)
- One-sentence hook
- 3 benefit-focused bullet points
- Call to action

CONSTRAINTS:
- Max 150 words total
- Do not mention competitor brands
- Emphasize comfort and productivity benefits
- Use aspirational but not hyperbolic language

EXAMPLES of tone we want:
"Experience uninterrupted focus" ✓
"THE BEST HEADPHONES EVER!!!!" ✗
"""

test_prompt(product_prompt, "Product Description Generation")
```

### Submission
Submit three complete prompts you've created for different tasks, each using at least 4 of the 6 components.

---

## ✅ Knowledge Check

### Question 1
What are the six components of an effective prompt?

A) Input, Output, Model, Temperature, Tokens, Response  
B) Task, Context, Examples, Format, Constraints, Persona  
C) Question, Answer, Feedback, Retry, Success, Failure  
D) System, User, Assistant, Tool, Function, Response  

**Correct Answer**: B

**Explanation**: The six components are Task (what to do), Context (background info), Examples (what good looks like), Format (output structure), Constraints (limits/avoidance), and Persona (who to act as).

---

### Question 2
What is the most important principle for writing the "Task" component?

A) Make it as long as possible  
B) Use complex vocabulary  
C) Be specific and start with a verb  
D) Include emotional language  

**Correct Answer**: C

**Explanation**: Tasks should start with a verb (Write, Analyze, Extract) and be specific about the desired outcome. Vague tasks lead to vague outputs.

---

### Question 3
When are "Examples" most powerful in a prompt?

A) For simple yes/no questions  
B) For classification, style matching, and specific formats  
C) When you want random outputs  
D) Only for coding tasks  

**Correct Answer**: B

**Explanation**: Examples (few-shot learning) are especially powerful for classification tasks, matching a specific style or tone, and ensuring a particular output format is followed.

---

### Question 4
What should "Constraints" typically include?

A) Encouragement and praise  
B) Length limits, topics to avoid, required elements  
C) The history of the company  
D) Competitor product details  

**Correct Answer**: B

**Explanation**: Constraints define boundaries: what to avoid, length limits, required elements, style requirements, and accuracy qualifiers (e.g., "say 'I'm not sure' if uncertain").

---

*You've completed Lesson 1.1! You now understand the fundamental components of effective prompts.*
