# Lesson 2.2: Chain-of-Thought Reasoning

> **Duration**: 55 minutes | **Type**: Technique
> **Unit**: 2 - Advanced Prompting Techniques

---

## 📚 Reading Material

### What Is Chain-of-Thought?

**Chain-of-Thought (CoT)** prompting encourages the model to show its reasoning step by step before giving an answer.

**Without CoT**:
```
Q: Roger has 5 tennis balls. He buys 2 more cans with 3 balls each. How many balls does he have?
A: 11
```

**With CoT**:
```
Q: Roger has 5 tennis balls. He buys 2 more cans with 3 balls each. How many balls does he have?
A: Let me think step by step.
   1. Roger starts with 5 balls
   2. He buys 2 cans
   3. Each can has 3 balls, so 2 × 3 = 6 new balls
   4. Total: 5 + 6 = 11 balls
   The answer is 11.
```

### Why CoT Works

1. **Breaks complex problems into steps**: Each step is simpler
2. **Reduces errors**: Model can catch mistakes as it reasons
3. **Shows work**: You can debug where reasoning went wrong
4. **Activates reasoning**: Models trained on reasoning examples

### When to Use CoT

| Task Type | Use CoT? | Why |
|-----------|----------|-----|
| Math problems | ✅ Yes | Multi-step calculations |
| Logic puzzles | ✅ Yes | Requires inference chains |
| Code debugging | ✅ Yes | Trace through execution |
| Classification | ❌ Usually not | Simple pattern matching |
| Summarization | ❌ Usually not | Not much reasoning needed |
| Complex decisions | ✅ Yes | Weighing factors |

### CoT Trigger Phrases

**Simple triggers**:
- "Let's think step by step"
- "Think through this carefully"
- "Walk me through your reasoning"

**Structured triggers**:
- "Break this down into steps"
- "First, analyze... Then, consider... Finally, conclude..."
- "Explain your reasoning before answering"

### Zero-Shot CoT

Just add "Let's think step by step":

```
Q: A train travels 60 mph for 2 hours, then 40 mph for 1.5 hours. 
   What's the total distance?

Let's think step by step.
```

**Output**:
```
1. First segment: 60 mph × 2 hours = 120 miles
2. Second segment: 40 mph × 1.5 hours = 60 miles
3. Total distance: 120 + 60 = 180 miles
```

### Few-Shot CoT

Show examples with reasoning:

```
Q: There are 24 cookies. 3/4 get eaten. How many left?
A: Let me solve this step by step.
   - Total cookies: 24
   - Cookies eaten: 24 × (3/4) = 18
   - Cookies remaining: 24 - 18 = 6
   The answer is 6 cookies.

Q: A store has 100 items. 40% are sold, 10% are returned. How many in stock?
A: Let me solve this step by step.
   - Starting items: 100
   - Items sold: 100 × 0.40 = 40
   - After sales: 100 - 40 = 60
   - Items returned: 100 × 0.10 = 10
   - Final stock: 60 + 10 = 70
   The answer is 70 items.
   
Q: [Your new problem]
A: Let me solve this step by step.
```

### Structured Reasoning Templates

**Problem → Analysis → Solution**:
```
PROBLEM: [State the problem clearly]

ANALYSIS:
1. [First consideration]
2. [Second consideration]
3. [Third consideration]

SOLUTION: Based on the above analysis, [answer]
```

**Given → Find → Steps → Answer**:
```
GIVEN:
- [Fact 1]
- [Fact 2]

FIND: [What we need to determine]

STEPS:
1. [First step]
2. [Second step]
3. [Third step]

ANSWER: [Final answer]
```

### CoT for Code

```
Debug this code:
```python
def factorial(n):
    if n == 0:
        return 0
    return n * factorial(n-1)
```

Let me trace through factorial(3):
1. factorial(3): 3 * factorial(2)
2. factorial(2): 2 * factorial(1)
3. factorial(1): 1 * factorial(0)
4. factorial(0): returns 0  ← BUG! Should return 1

The base case is wrong. factorial(0) should return 1, not 0.
```

### CoT Pitfalls

**Pitfall 1: Overthinking simple tasks**
Don't use CoT for "What's the capital of France?"

**Pitfall 2: Long chains drift**
Very long reasoning chains can lose coherence. Break into multiple prompts if needed.

**Pitfall 3: Confident wrong reasoning**
The model can sound confident while being wrong. Always verify critical reasoning.

---

## 🎬 Video Script

**[INTRO - Side by side comparison]**

Watch what happens when we ask the model to think step by step. Without chain-of-thought: brief answer, often wrong on complex problems. With chain-of-thought: detailed reasoning, much higher accuracy.

**[CUT TO: Why it works]**

Why does this work? It breaks complex problems into simple steps. The model can catch errors as it reasons. And it activates reasoning patterns from training.

**[CUT TO: Task selection]**

Use chain-of-thought for math, logic, code debugging, and complex decisions. Don't use it for simple classification or summarization—you'll just waste tokens.

**[CUT TO: Trigger phrases]**

The simplest trigger is just adding "Let's think step by step" to your prompt. This alone can increase accuracy 50% on reasoning tasks.

**[CUT TO: Structured template]**

For more control, use structured templates. Given, find, steps, answer. Or problem, analysis, solution. These force systematic reasoning.

**[CUT TO: Code debugging example]**

Chain-of-thought is fantastic for debugging. "Trace through factorial of 3 step by step." The model walks through each recursive call and spots the bug at the base case.

**[CUT TO: Pitfalls]**

Watch for pitfalls. Don't overthink simple tasks. Very long chains can drift—break them up. And always verify critical reasoning—the model can be confidently wrong.

**[CUT TO: Speaker on camera]**

Chain-of-thought is one of the highest-impact techniques. On the right problems, you'll see 70% error reduction. Add "think step by step" and watch accuracy jump.

**[END - Runtime: 5:55]**

---

## 🔬 Interactive Lab: CoT Practice

### Objective
Apply chain-of-thought to different problem types.

### Part 1: Zero-Shot CoT (15 minutes)

```python
from openai import OpenAI
client = OpenAI()

def compare_cot(problem, with_cot=True):
    """Compare responses with and without CoT"""
    
    direct_prompt = problem
    cot_prompt = f"{problem}\n\nLet's think through this step by step."
    
    # Direct answer
    direct_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": direct_prompt}],
        max_tokens=300
    ).choices[0].message.content
    
    # CoT answer
    cot_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": cot_prompt}],
        max_tokens=500
    ).choices[0].message.content
    
    return {
        "direct": direct_response,
        "cot": cot_response
    }

# Test problems
problems = [
    "If a shirt costs $25 and is on sale for 20% off, and you have a $5 coupon, how much do you pay?",
    "A farmer has 17 sheep. All but 9 run away. How many are left?",
    "If you have a 3-gallon jug and a 5-gallon jug, how do you measure exactly 4 gallons?",
]

for problem in problems:
    print(f"\n{'='*60}")
    print(f"Problem: {problem}")
    print("="*60)
    
    results = compare_cot(problem)
    
    print(f"\nDirect Answer:\n{results['direct']}")
    print(f"\nWith CoT:\n{results['cot']}")
```

### Part 2: Few-Shot CoT (25 minutes)

```python
def few_shot_cot(problem, examples):
    """Apply few-shot chain-of-thought"""
    
    examples_text = "\n\n".join([
        f"Q: {ex['question']}\nA: {ex['reasoning']}\nAnswer: {ex['answer']}"
        for ex in examples
    ])
    
    prompt = f"""{examples_text}

Q: {problem}
A: Let me work through this step by step.
"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=600
    )
    
    return response.choices[0].message.content

# Math word problems with reasoning examples
math_examples = [
    {
        "question": "A baker makes 12 loaves per hour. She works 6 hours and sells 2/3 of them. How many are left?",
        "reasoning": """1. First, calculate total loaves: 12 × 6 = 72 loaves
2. Calculate loaves sold: 72 × (2/3) = 48 loaves
3. Calculate remaining: 72 - 48 = 24 loaves""",
        "answer": "24 loaves"
    },
    {
        "question": "A train leaves at 9am going 50mph. Another leaves at 11am going 70mph. When does the second catch up?",
        "reasoning": """1. First train has 2 hour head start = 2 × 50 = 100 miles ahead
2. Second train gains 70 - 50 = 20 mph on the first
3. Time to catch up: 100 miles ÷ 20 mph = 5 hours
4. Second train left at 11am, so catches up at 4pm""",
        "answer": "4:00 PM"
    }
]

# Test problem
test_problem = """A pool has 3 inlet pipes. Pipe A fills it in 6 hours, 
Pipe B in 8 hours, and Pipe C in 12 hours. If all three pipes 
work together, how long does it take to fill the pool?"""

result = few_shot_cot(test_problem, math_examples)
print(f"Problem:\n{test_problem}")
print(f"\nSolution:\n{result}")
```

### Part 3: Structured CoT Templates (15 minutes)

```python
def structured_reasoning(problem, template="standard"):
    """Apply structured reasoning template"""
    
    templates = {
        "standard": """
PROBLEM: {problem}

I'll solve this systematically:

GIVEN:
[List all known information]

FIND:
[What we need to determine]

APPROACH:
[Strategy to solve]

SOLUTION:
[Step-by-step work]

ANSWER:
[Final answer with units if applicable]
""",
        "decision": """
DECISION PROBLEM: {problem}

OPTIONS ANALYSIS:

Option A:
- Pros: [list]
- Cons: [list]
- Score: [1-10]

Option B:
- Pros: [list]
- Cons: [list]
- Score: [1-10]

RECOMMENDATION:
Based on the analysis, [recommendation]

REASONING:
[Why this option is best]
""",
        "debugging": """
CODE ISSUE: {problem}

TRACE ANALYSIS:
[Walk through the code execution]

ROOT CAUSE:
[What's actually wrong]

FIX:
[How to correct it]

VERIFICATION:
[How to confirm the fix works]
"""
    }
    
    prompt = templates[template].format(problem=problem)
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )
    
    return response.choices[0].message.content

# Test with different templates
math_problem = "A cone has height 10cm and base radius 5cm. What's its volume?"
print("MATH PROBLEM:")
print(structured_reasoning(math_problem, "standard"))

decision_problem = "Should we use PostgreSQL or MongoDB for our e-commerce product catalog?"
print("\n\nDECISION PROBLEM:")
print(structured_reasoning(decision_problem, "decision"))

code_problem = """
This function should return the second largest number, but it's buggy:
def second_largest(nums):
    nums.sort()
    return nums[-2]
    
It fails on [5, 5, 5, 5]
"""
print("\n\nCODE PROBLEM:")
print(structured_reasoning(code_problem, "debugging"))
```

### Submission
Create a CoT prompt that correctly solves 5 multi-step word problems.

---

## ✅ Knowledge Check

### Question 1
What is the simplest way to enable chain-of-thought reasoning?

A) Use a larger model  
B) Add "Let's think step by step" to your prompt  
C) Use more examples  
D) Increase temperature  

**Correct Answer**: B

**Explanation**: Zero-shot CoT is as simple as adding "Let's think step by step" to your prompt. This single phrase can significantly improve reasoning accuracy.

---

### Question 2
When should you NOT use chain-of-thought?

A) Math word problems  
B) Simple classification tasks  
C) Logic puzzles  
D) Code debugging  

**Correct Answer**: B

**Explanation**: Simple classification tasks don't require step-by-step reasoning. Using CoT would waste tokens without improving accuracy. Save CoT for complex reasoning tasks.

---

### Question 3
What is "few-shot CoT"?

A) Using very few tokens  
B) Providing examples that include step-by-step reasoning  
C) A fast version of chain-of-thought  
D) Only showing 2 examples  

**Correct Answer**: B

**Explanation**: Few-shot CoT combines few-shot learning with chain-of-thought: you provide examples that demonstrate step-by-step reasoning, teaching the model your exact reasoning pattern.

---

### Question 4
What is a key benefit of CoT that helps with debugging?

A) It's faster  
B) It shows the reasoning steps, so you can identify where errors occur  
C) It uses fewer tokens  
D) It always gets the right answer  

**Correct Answer**: B

**Explanation**: CoT makes reasoning explicit. When the model gets an answer wrong, you can trace through its steps to identify exactly where it went astray.

---

*You've completed Lesson 2.2! You now understand how to use chain-of-thought reasoning.*
