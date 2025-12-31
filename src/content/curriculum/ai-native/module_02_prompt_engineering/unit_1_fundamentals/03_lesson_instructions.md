# Lesson 1.3: Clear Instructions and Constraints

> **Duration**: 50 minutes | **Type**: Practical
> **Unit**: 1 - Prompt Fundamentals

---

## 📚 Reading Material

### The Clarity Principle

Vague instructions produce vague outputs. The model can only work with what you give it.

**Vague**:
```
Write something about our product.
```

**Clear**:
```
Write a 100-word product description for our project management software.
Target audience: Small business owners.
Focus on: Time savings and ease of use.
Tone: Professional but approachable.
```

### The Instruction Hierarchy

Structure instructions from most important to least:

```
1. TASK: What to do (most critical)
2. FORMAT: How to structure output
3. CONSTRAINTS: What to avoid or limit
4. DETAILS: Additional specifications
5. EXAMPLES: What good looks like
```

### Verbs Matter

Start with strong, specific action verbs:

| Weak | Strong |
|------|--------|
| Talk about | Explain |
| Do something with | Analyze |
| Help with | Generate / Create / Write |
| Look at | Compare / Evaluate / Assess |
| Think about | Outline / Identify / List |

**Weak**: "Talk about the pros and cons"
**Strong**: "List 3 advantages and 3 disadvantages"

### Quantify Everything

Replace vague qualifiers with numbers:

| Vague | Specific |
|-------|----------|
| Short response | Under 100 words |
| Some examples | Exactly 3 examples |
| Detailed analysis | 5 key points, each with evidence |
| Comprehensive list | At least 10 items |
| Brief summary | 2-3 sentences |

### Constraint Types

**Length constraints**:
```
- Maximum 150 words
- Exactly 5 bullet points
- Between 300-400 words
- One paragraph
```

**Content constraints**:
```
- Do not include pricing information
- Focus only on features mentioned in the input
- Exclude any speculation about future updates
- Use only information from the provided context
```

**Style constraints**:
```
- Use formal business English
- Write at an 8th-grade reading level
- Avoid jargon and acronyms
- Use active voice only
```

**Structural constraints**:
```
- Start with a one-sentence summary
- Include headers for each section
- End with a call to action
- Use numbered lists, not bullets
```

### The "Do NOT" Pattern

Negative constraints are powerful:

```
IMPORTANT - DO NOT:
- Invent information not present in the source
- Use hyperbolic language ("amazing", "revolutionary")
- Include personal opinions
- Exceed the specified word limit
- Mention competitor products
```

### Handling Uncertainty

Tell the model what to do when unsure:

```
If the answer is not clearly supported by the provided context:
- Say "Based on the available information, I cannot determine..."
- Do not guess or speculate
- Suggest what additional information would be needed
```

### Priority Ordering

When instructions might conflict, set priority:

```
PRIORITY ORDER:
1. Accuracy - Never include false information
2. Completeness - Cover all required points
3. Brevity - Keep within word limits
4. Style - Match the requested tone

If you cannot meet all requirements, prioritize higher-ranked items.
```

---

## 🎬 Video Script

**[INTRO - Side by side vague vs clear prompts]**

Vague instructions produce vague outputs. The model can only work with what you give it. Let me show you how to write crystal-clear instructions.

**[CUT TO: Instruction hierarchy]**

Structure matters. Put the most important instruction first—what you want done. Then format, then constraints, then details, then examples. If the model runs out of attention, the important stuff comes first.

**[CUT TO: Verb comparison table]**

Verbs matter. "Talk about pros and cons" is vague. "List 3 advantages and 3 disadvantages" is specific. Start with strong action verbs: explain, analyze, generate, compare, evaluate, identify.

**[CUT TO: Quantification examples]**

Quantify everything. "Short response" means different things to different people. "Under 100 words" is unambiguous. "Some examples" could be two or twenty. "Exactly 3 examples" is clear.

**[CUT TO: Constraint types]**

Use different types of constraints together. Length: under 150 words. Content: only use provided information. Style: formal business English. Structure: start with a summary. Stack these to get precise control.

**[CUT TO: DO NOT pattern]**

The "do not" pattern is powerful. Don't invent information. Don't use hyperbolic language. Don't mention competitors. Negative constraints prevent common problems before they happen.

**[CUT TO: Uncertainty handling]**

Tell the model what to do when unsure. "If you can't find the answer in the context, say 'I cannot determine from the available information.'" This prevents hallucination.

**[CUT TO: Priority ordering]**

When constraints might conflict, set priorities. Accuracy first, then completeness, then brevity, then style. If the model can't do everything, it knows what to sacrifice.

**[CUT TO: Speaker on camera]**

Clear instructions aren't longer—they're more precise. Every word should reduce ambiguity. If you find yourself re-prompting, your original instructions weren't clear enough.

**[END - Runtime: 6:20]**

---

## 🔬 Interactive Lab: Instruction Precision

### Objective
Practice writing precise, unambiguous instructions.

### Part 1: Clarity Transformation (20 minutes)

```python
# Transform vague instructions into clear ones

vague_instructions = [
    "Summarize this article",
    "Write a good email response",
    "Analyze the data",
    "Make it better",
    "Add some examples",
]

# Example transformation
vague = "Summarize this article"
clear = """
Summarize this article in exactly 3 bullet points.
Each bullet should be one sentence.
Focus on: key findings, methodology, and conclusions.
Use present tense.
Maximum 75 words total.
"""

# Transform each vague instruction
transformations = {
    "Summarize this article": """
Summarize this article in exactly 3 bullet points.
Each bullet: one sentence, max 25 words.
Include: main finding, supporting evidence, conclusion.
Use present tense, formal tone.
""",
    
    "Write a good email response": """
Write a professional email response that:
- Acknowledges the sender's main point
- Provides a clear answer or next step
- Closes with a specific call to action
Length: 75-100 words
Tone: Friendly but professional
Start with a greeting, end with "Best regards"
""",
    
    # Add your transformations for the others
}

for vague, clear in transformations.items():
    print(f"VAGUE: {vague}")
    print(f"CLEAR:{clear}")
    print("-" * 50)
```

### Part 2: Constraint Testing (20 minutes)

```python
from openai import OpenAI
client = OpenAI()

def test_constraints(base_prompt, constraint_sets):
    """Test how different constraints affect output"""
    
    for name, constraints in constraint_sets.items():
        full_prompt = f"{base_prompt}\n\nCONSTRAINTS:\n{constraints}"
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": full_prompt}],
            max_tokens=300
        )
        
        result = response.choices[0].message.content
        word_count = len(result.split())
        
        print(f"\n{'='*50}")
        print(f"Constraint Set: {name}")
        print(f"Word Count: {word_count}")
        print(f"Response:\n{result}")

base = "Describe the benefits of cloud computing."

constraint_sets = {
    "No constraints": "",
    
    "Length only": """
- Maximum 50 words
""",
    
    "Format only": """
- Use exactly 3 bullet points
- Each bullet is one sentence
""",
    
    "Style only": """
- Target audience: CEOs
- Focus on ROI and strategic value
- Use business terminology
""",
    
    "Full constraints": """
- Maximum 50 words
- Exactly 3 benefits
- Target: CEOs making buying decisions
- Focus on cost savings and competitive advantage
- Do not mention technical details
"""
}

test_constraints(base, constraint_sets)
```

### Part 3: Conflict Resolution (10 minutes)

```python
# Practice setting priority when constraints conflict

conflicting_scenario = """
TASK: Explain blockchain technology

CONSTRAINTS:
- Be comprehensive and cover all aspects
- Keep response under 100 words
- Include technical details for engineers
- Make it accessible to non-technical executives

These constraints partially conflict. Set a priority order.
"""

with_priority = """
TASK: Explain blockchain technology

PRIORITY ORDER (if constraints conflict, prioritize higher):
1. Word limit (must be under 100 words)
2. Accessibility (non-technical readers must understand)
3. Coverage (hit key concepts)
4. Technical depth (nice to have, sacrifice if needed)

RESPONSE: Provide a brief explanation that a CEO would understand.
Include max 1 technical term, explained in parentheses.
"""

# Test both
for prompt in [conflicting_scenario, with_priority]:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    print(f"Response ({len(response.choices[0].message.content.split())} words):")
    print(response.choices[0].message.content)
    print("\n" + "="*50 + "\n")
```

### Submission
Write a complete instruction set for a specific task with at least 5 constraints covering length, content, style, and format.

---

## ✅ Knowledge Check

### Question 1
What is the most important element to place first in your instructions?

A) Examples  
B) The task/what to do  
C) Word count  
D) Tone specifications  

**Correct Answer**: B

**Explanation**: The task is the most critical instruction. Put it first so the model knows the primary objective before processing constraints and details.

---

### Question 2
How should you handle vague qualifiers like "short" or "some"?

A) Trust the model to interpret them correctly  
B) Replace them with specific numbers or ranges  
C) Add "very" to make them stronger  
D) Remove them entirely  

**Correct Answer**: B

**Explanation**: Replace vague qualifiers with specifics: "short" becomes "under 100 words"; "some" becomes "exactly 3"; "detailed" becomes "5 points with evidence."

---

### Question 3
What is the purpose of the "DO NOT" pattern?

A) To make the prompt longer  
B) To prevent common problems before they occur  
C) To confuse the model  
D) To increase creativity  

**Correct Answer**: B

**Explanation**: Negative constraints ("do not invent information," "do not use jargon") prevent specific problems proactively rather than fixing them after they occur.

---

### Question 4
When constraints conflict, what should you do?

A) Remove half of them  
B) Hope the model figures it out  
C) Set explicit priority ordering  
D) Use only one constraint  

**Correct Answer**: C

**Explanation**: When constraints might conflict, set explicit priorities. "If you cannot meet all requirements: 1. Accuracy, 2. Brevity, 3. Style" tells the model what to sacrifice if needed.

---

*You've completed Lesson 1.3! You now know how to write clear, precise instructions.*
