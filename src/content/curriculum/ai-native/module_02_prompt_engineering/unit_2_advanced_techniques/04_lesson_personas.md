# Lesson 2.4: Role Prompting and Personas

> **Duration**: 50 minutes | **Type**: Technique
> **Unit**: 2 - Advanced Prompting Techniques

---

## 📚 Reading Material

### The Power of Personas

Telling the model WHO to be changes HOW it responds. Different personas produce dramatically different outputs.

**Same question, different personas**:

"Explain machine learning"

**As a teacher**: Simple, builds from basics, uses analogies
**As a researcher**: Technical, cites papers, assumes background
**As a marketer**: Benefits-focused, ROI, competitive advantage
**As a skeptic**: Limitations, cautions, balanced view

### Why Personas Work

1. **Activates relevant training**: Models have learned from experts
2. **Sets tone and vocabulary**: Consistent style
3. **Establishes perspective**: What to emphasize
4. **Defines boundaries**: What a persona would/wouldn't say

### Designing Effective Personas

**The Persona Formula**:
```
You are a [role] at [organization] with [experience].
You [key behaviors/traits].
You [communication style].
```

**Example**:
```
You are a senior product manager at a Fortune 500 tech company 
with 15 years of experience launching consumer products.

You focus on user impact and business metrics.
You give direct, actionable feedback without sugarcoating.
You use frameworks like RICE and OKRs naturally in conversation.
```

### Persona Categories

**Expert roles**:
- Senior software engineer at Google
- Chief Financial Officer
- Harvard Business School professor
- Medical doctor specializing in cardiology

**Defined behaviors**:
- Direct and concise communicator
- Patient teacher who loves analogies
- Skeptical analyst who plays devil's advocate
- Cheerful assistant who celebrates wins

**Composite personas**:
```
You are Alex, a startup CTO who:
- Has built three companies (one successful exit)
- Prefers pragmatic solutions over elegant ones
- Values shipping fast and iterating
- Is skeptical of new frameworks without proven track record
- Communicates in short, direct sentences
```

### Expert Personas

For domain expertise, be specific:

**Generic** (weak):
```
You are an expert in finance.
```

**Specific** (strong):
```
You are a CPA with 20 years of experience in corporate tax 
at a Big Four firm. You specialize in international tax 
structures for multinational corporations. You explain complex 
tax concepts clearly but always caveat that professional advice 
should be sought for actual tax decisions.
```

### Style Personas

For writing style, define characteristics:

```
You are a copywriter known for:
- Punchy, short sentences
- Using power words that drive action
- Avoiding jargon and corporate speak
- Writing at an 8th-grade reading level
- Strong calls to action
```

### Contrarian Personas

For critical analysis, use skeptics:

```
You are a senior engineer known for playing devil's advocate 
in design reviews. Your job is to:
- Find weaknesses in proposals
- Identify edge cases that could break systems
- Challenge assumptions even if they seem reasonable
- Ask "what could go wrong?" at every step
```

### Persona Combinations

Use multiple personas in conversation:

```python
messages = [
    {"role": "system", "content": "You will roleplay different experts."},
    {"role": "user", "content": "As CEO, what are your priorities?"},
    {"role": "assistant", "content": "[CEO perspective]..."},
    {"role": "user", "content": "As CTO, what concerns do you have?"},
    {"role": "assistant", "content": "[CTO perspective]..."},
    {"role": "user", "content": "As CFO, what about costs?"},
]
```

---

## 🎬 Video Script

**[INTRO - Same question, different responses shown]**

Watch this. Same question—"Explain machine learning"—to the same model. As a teacher, you get simple analogies. As a researcher, technical depth. As a marketer, business value. The persona changes everything.

**[CUT TO: Why it works]**

Why does this work? The model has learned from millions of experts. When you say "you are a senior engineer at Google," you're activating patterns from engineers, from Google's engineering blog, from Stack Overflow discussions. The persona focuses the model.

**[CUT TO: Persona formula]**

The formula: You are a [role] at [organization] with [experience]. Then add behaviors: direct communicator, uses specific frameworks, focuses on practical solutions. Be specific— "senior software engineer with 15 years at FAANG" beats "coding expert."

**[CUT TO: Expert persona example]**

For domain expertise, get specific. Not "expert in finance." Instead: "CPA with 20 years at a Big Four firm, specializing in international tax structures." The model has learned from exactly those discussions.

**[CUT TO: Style persona example]**

For writing, define the style. "Punchy, short sentences. Power words. No jargon. 8th-grade reading level. Strong calls to action." You'll get completely different copy than with a generic prompt.

**[CUT TO: Contrarian persona]**

Contrarian personas are gold for review. "You're a senior engineer known for playing devil's advocate. Find weaknesses. Identify edge cases. Challenge assumptions." Use this before shipping.

**[CUT TO: Speaker on camera]**

Personas aren't just flavor—they're precision tools. The right persona activates the right training data, sets the right tone, and establishes the right perspective. Choose your persona to match your need.

**[END - Runtime: 5:40]**

---

## 🔬 Interactive Lab: Persona Engineering

### Objective
Design and test personas for different use cases.

### Part 1: Persona Comparison (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def compare_personas(question, personas):
    """Compare responses from different personas"""
    results = {}
    
    for name, persona in personas.items():
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": persona},
                {"role": "user", "content": question}
            ],
            max_tokens=300
        )
        results[name] = response.choices[0].message.content
    
    return results

question = "Should our startup build or buy our data infrastructure?"

personas = {
    "VC Partner": """You are a partner at a top-tier venture capital firm.
You've seen hundreds of startups and focus on:
- Speed to market
- Burn rate efficiency
- CEO attention and focus
You give direct, sometimes blunt advice.""",

    "CTO": """You are a startup CTO with 3 previous exits.
You focus on:
- Technical debt implications
- Team velocity
- Long-term scalability
You're practical and prefer proven technology.""",

    "CFO": """You are a CFO who's taken two companies public.
You focus on:
- Total cost of ownership
- Cash flow implications
- Investor perception
You provide analysis with numbers when possible.""",
}

results = compare_personas(question, personas)

for name, response in results.items():
    print(f"\n{'='*50}")
    print(f"PERSONA: {name}")
    print("="*50)
    print(response)
```

### Part 2: Expert Persona Design (20 minutes)

```python
def test_expert_depth(generic_persona, specific_persona, domain_questions):
    """Compare generic vs specific expert personas"""
    
    comparisons = []
    
    for question in domain_questions:
        # Generic
        generic_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": generic_persona},
                {"role": "user", "content": question}
            ],
            max_tokens=400
        ).choices[0].message.content
        
        # Specific
        specific_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": specific_persona},
                {"role": "user", "content": question}
            ],
            max_tokens=400
        ).choices[0].message.content
        
        comparisons.append({
            "question": question,
            "generic": generic_response,
            "specific": specific_response
        })
    
    return comparisons

# Compare generic vs specific legal persona
generic = "You are a legal expert."

specific = """You are a senior corporate attorney at a Silicon Valley law firm 
with 18 years of experience. You specialize in:
- Startup formation and financing
- Employee equity arrangements
- M&A transactions

You've handled 50+ venture rounds and 15 acquisitions. You explain legal 
concepts clearly but always note when formal legal advice is needed."""

questions = [
    "What should founders know about vesting schedules?",
    "How does a SAFE note work?",
    "What are key terms in a Series A term sheet?",
]

comparisons = test_expert_depth(generic, specific, questions)

for comp in comparisons:
    print(f"\nQ: {comp['question']}")
    print(f"\nGENERIC ({len(comp['generic'].split())} words):")
    print(comp['generic'][:300] + "...")
    print(f"\nSPECIFIC ({len(comp['specific'].split())} words):")
    print(comp['specific'][:300] + "...")
```

### Part 3: Contrarian Review (10 minutes)

```python
def devil_advocate_review(proposal):
    """Get critical review from a contrarian persona"""
    
    personas = {
        "Optimist": "You are an enthusiastic supporter of new ideas. Focus on potential.",
        
        "Devil's Advocate": """You are a senior engineer known for rigorous 
critical thinking. Your job is to:
- Identify weaknesses and blind spots
- Question assumptions
- Find edge cases that could fail
- Challenge optimistic projections
Be direct and constructive. Don't soften criticism.""",
        
        "Risk Analyst": """You are a risk analyst who focuses on:
- What could go wrong
- Probability and impact of failures
- Mitigation strategies
- Dependencies and single points of failure"""
    }
    
    reviews = {}
    for name, persona in personas.items():
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": persona},
                {"role": "user", "content": f"Review this proposal:\n\n{proposal}"}
            ],
            max_tokens=400
        )
        reviews[name] = response.choices[0].message.content
    
    return reviews

proposal = """
We propose migrating our monolith to microservices over 6 months.
- Phase 1: Extract user service (2 months)
- Phase 2: Extract payments (2 months)
- Phase 3: Extract notifications (2 months)
Team: 4 engineers, no additional hires
"""

reviews = devil_advocate_review(proposal)
for name, review in reviews.items():
    print(f"\n{'='*50}")
    print(f"REVIEW BY: {name}")
    print("="*50)
    print(review)
```

### Submission
Design 3 specialized personas for your domain and test them on 5 questions.

---

## ✅ Knowledge Check

### Question 1
Why do personas improve AI responses?

A) They make the model faster  
B) They activate relevant training patterns and set consistent perspective  
C) They reduce token usage  
D) They make the model smarter  

**Correct Answer**: B

**Explanation**: Personas activate training patterns learned from experts, establish consistent tone and vocabulary, and focus the model on a specific perspective relevant to your needs.

---

### Question 2
What makes a weak persona?

A) Too specific about role and experience  
B) Too vague: "You are an expert in finance"  
C) Including behavioral traits  
D) Defining communication style  

**Correct Answer**: B

**Explanation**: Vague personas like "expert in finance" don't activate specific training patterns. Specific personas ("CPA with 20 years at Big Four, specializing in international tax") are much more effective.

---

### Question 3
What is a contrarian persona useful for?

A) Being agreeable  
B) Finding weaknesses and challenging assumptions before decisions  
C) Writing marketing copy  
D) Summarizing documents  

**Correct Answer**: B

**Explanation**: Contrarian or "devil's advocate" personas are valuable for critical review—identifying weaknesses, questioning assumptions, and finding edge cases before shipping.

---

*You've completed Lesson 2.4! You can now design effective personas for any use case.*
