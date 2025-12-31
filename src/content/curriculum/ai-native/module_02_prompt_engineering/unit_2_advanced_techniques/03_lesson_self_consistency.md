# Lesson 2.3: Self-Consistency and Verification

> **Duration**: 50 minutes | **Type**: Technique
> **Unit**: 2 - Advanced Prompting Techniques

---

## 📚 Reading Material

### The Reliability Problem

LLMs are probabilistic. Ask the same question three times, you might get three different answers. For critical applications, this is unacceptable.

**Self-consistency** improves reliability by generating multiple responses and selecting the most consistent answer.

### How Self-Consistency Works

```
Prompt → [Generation 1] → Answer A
       → [Generation 2] → Answer A
       → [Generation 3] → Answer B
       → [Generation 4] → Answer A
       → [Generation 5] → Answer A

Most common answer: A (4/5 = 80% confidence)
```

### Implementation

**Basic approach**:
```python
def self_consistent_answer(prompt, n=5, temperature=0.7):
    answers = []
    
    for _ in range(n):
        response = llm.generate(prompt, temperature=temperature)
        answers.append(extract_answer(response))
    
    # Vote for most common
    from collections import Counter
    votes = Counter(answers)
    best_answer, count = votes.most_common(1)[0]
    
    return {
        "answer": best_answer,
        "confidence": count / n,
        "all_answers": answers
    }
```

### When to Use Self-Consistency

| Scenario | Benefit |
|----------|---------|
| Math problems | Catches calculation errors |
| Classification | More reliable category assignment |
| Critical decisions | Higher confidence |
| Extraction | Handles ambiguity |

### Self-Consistency with CoT

Combine with chain-of-thought for maximum effect:

```python
cot_prompt = """Question: If a car travels 60 mph for 2 hours and 40 mph for 1 hour, 
what's the average speed?

Let's solve this step by step:
"""

# Generate n reasoning paths
paths = []
for _ in range(5):
    response = llm.generate(cot_prompt, temperature=0.7)
    paths.append({
        "reasoning": response,
        "answer": extract_final_answer(response)
    })

# Majority vote on final answers
answers = [p["answer"] for p in paths]
final = majority_vote(answers)
```

### Verification Techniques

**Self-verification**: Ask the model to check its own work

```
[Original prompt + answer]

Now verify this answer is correct:
1. Check each calculation step
2. Confirm the logic is sound
3. State whether the answer is CORRECT or INCORRECT
4. If incorrect, provide the correct answer
```

**Cross-verification**: Use a different prompt to verify

```
# Original task
response1 = llm("What is 15% of 240?")  # → 36

# Verification task
response2 = llm("Is 36 equal to 15% of 240? Calculate to verify.")
```

**Constraint checking**: Verify output meets requirements

```python
def verify_output(output, constraints):
    """Check if output meets all constraints"""
    issues = []
    
    if constraints.get("max_words"):
        if len(output.split()) > constraints["max_words"]:
            issues.append(f"Exceeds word limit")
    
    if constraints.get("required_fields"):
        for field in constraints["required_fields"]:
            if field not in output:
                issues.append(f"Missing required field: {field}")
    
    if constraints.get("json_valid"):
        try:
            json.loads(output)
        except:
            issues.append("Invalid JSON")
    
    return len(issues) == 0, issues
```

---

## 🎬 Video Script

**[INTRO - Multiple responses visualization]**

LLMs are probabilistic. Same prompt, different answers. For critical applications, we need reliability. Self-consistency delivers it.

**[CUT TO: How it works]**

The approach is simple. Generate multiple responses—say, five. Extract the answer from each. Take a majority vote. If four out of five say the same thing, you have high confidence.

**[CUT TO: Code example]**

Implementation: loop, generate, extract, count. The `Counter` class makes voting easy. Return both the answer and the confidence—how many agreed.

**[CUT TO: Self-consistency + CoT]**

Combining with chain-of-thought is even more powerful. Each generation reasons through the problem step by step. Then you vote on final answers. Different reasoning paths, same destination—that's high reliability.

**[CUT TO: Verification techniques]**

Self-verification: ask the model to check its own work. "Verify this answer is correct. Check each step." Models can catch their own errors.

Cross-verification: use a different prompt. Asked "what's 15% of 240?" Got 36. Now ask "Is 36 equal to 15% of 240?" Independent verification.

**[CUT TO: Constraint checking code]**

Programmatic verification: check outputs meet constraints. Word limits, required fields, valid JSON. If it fails, regenerate.

**[CUT TO: Speaker on camera]**

Self-consistency adds latency—you're making multiple calls. But for critical tasks, the reliability improvement is worth it. Use it where accuracy matters most.

**[END - Runtime: 5:30]**

---

## 🔬 Interactive Lab: Reliability Engineering

### Objective
Implement and test self-consistency techniques.

### Part 1: Basic Self-Consistency (20 minutes)

```python
from openai import OpenAI
from collections import Counter
import re

client = OpenAI()

def self_consistent_answer(prompt, n=5, temperature=0.7):
    """Generate multiple answers and vote"""
    answers = []
    reasoning = []
    
    for _ in range(n):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=temperature
        )
        text = response.choices[0].message.content
        reasoning.append(text)
        
        # Extract final answer (look for pattern)
        # Adjust regex based on expected answer format
        match = re.search(r'(?:answer is|=|result:?)\s*([0-9,]+(?:\.[0-9]+)?)', text.lower())
        if match:
            answers.append(match.group(1))
        else:
            # Take last number as fallback
            numbers = re.findall(r'\d+(?:\.\d+)?', text)
            if numbers:
                answers.append(numbers[-1])
    
    # Vote
    if not answers:
        return {"answer": "Unable to extract", "confidence": 0}
    
    votes = Counter(answers)
    best, count = votes.most_common(1)[0]
    
    return {
        "answer": best,
        "confidence": count / len(answers),
        "all_answers": answers,
        "votes": dict(votes)
    }

# Test on math problems
problems = [
    "A store has a 25% off sale. If an item costs $80, what is the final price? Show your work.",
    "If you have 3.5 hours and need to complete 7 tasks equally, how many minutes per task?",
    "A recipe serves 4. You need to serve 10. If original uses 2.5 cups flour, how much do you need?",
]

for problem in problems:
    print(f"\nProblem: {problem[:60]}...")
    result = self_consistent_answer(problem, n=5)
    print(f"Answer: {result['answer']} (confidence: {result['confidence']:.0%})")
    print(f"Votes: {result['votes']}")
```

### Part 2: Self-Verification (15 minutes)

```python
def generate_with_verification(prompt, max_retries=3):
    """Generate answer, then verify it"""
    
    for attempt in range(max_retries):
        # Generate answer
        answer_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt + "\n\nShow your work step by step."}],
            max_tokens=500
        )
        answer = answer_response.choices[0].message.content
        
        # Verify
        verify_prompt = f"""
Original question: {prompt}

Proposed answer:
{answer}

Carefully verify this answer:
1. Check each calculation step
2. Verify the logic is sound
3. Confirm the final answer is correct

State VERIFIED if correct, or INCORRECT with the right answer.
"""
        
        verify_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": verify_prompt}],
            max_tokens=300
        )
        verification = verify_response.choices[0].message.content
        
        if "VERIFIED" in verification.upper():
            return {
                "answer": answer,
                "verified": True,
                "attempts": attempt + 1
            }
        else:
            print(f"Attempt {attempt + 1} failed verification, retrying...")
    
    return {
        "answer": answer,
        "verified": False,
        "attempts": max_retries
    }

# Test
problem = "If 12 workers can build a wall in 8 days, how long will 16 workers take?"
result = generate_with_verification(problem)
print(f"\nFinal Answer:\n{result['answer'][:300]}...")
print(f"\nVerified: {result['verified']} (attempts: {result['attempts']})")
```

### Part 3: Constraint Verification (15 minutes)

```python
import json

def generate_with_constraints(prompt, constraints, max_retries=3):
    """Generate output that meets all constraints"""
    
    # Add constraints to prompt
    constraint_text = "\n".join([f"- {c}" for c in constraints["rules"]])
    full_prompt = f"""
{prompt}

CONSTRAINTS (you must follow all of these):
{constraint_text}
"""
    
    for attempt in range(max_retries):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": full_prompt}],
            max_tokens=constraints.get("max_tokens", 500)
        )
        output = response.choices[0].message.content
        
        # Verify constraints
        issues = []
        
        if "max_words" in constraints:
            word_count = len(output.split())
            if word_count > constraints["max_words"]:
                issues.append(f"Word count {word_count} exceeds limit {constraints['max_words']}")
        
        if "must_include" in constraints:
            for phrase in constraints["must_include"]:
                if phrase.lower() not in output.lower():
                    issues.append(f"Missing required phrase: {phrase}")
        
        if "json_required" in constraints and constraints["json_required"]:
            try:
                json.loads(output)
            except json.JSONDecodeError:
                issues.append("Output is not valid JSON")
        
        if not issues:
            return {"output": output, "valid": True, "attempts": attempt + 1}
        else:
            print(f"Attempt {attempt + 1} failed: {issues}")
    
    return {"output": output, "valid": False, "issues": issues}

# Test
result = generate_with_constraints(
    "Describe the benefits of cloud computing",
    {
        "rules": [
            "Maximum 50 words",
            "Include a mention of 'cost savings'",
            "Use bullet points"
        ],
        "max_words": 50,
        "must_include": ["cost savings"],
        "max_tokens": 200
    }
)

print(f"\nOutput:\n{result['output']}")
print(f"Valid: {result['valid']}")
```

### Submission
Build a self-consistent math solver that achieves >90% accuracy on a 10-problem test set.

---

## ✅ Knowledge Check

### Question 1
What is the core principle of self-consistency?

A) Use the first answer generated  
B) Generate multiple answers and select the most common  
C) Always use temperature 0  
D) Use longer prompts  

**Correct Answer**: B

**Explanation**: Self-consistency generates multiple responses (typically 3-5) and selects the answer that appears most frequently—a majority vote that improves reliability.

---

### Question 2
How does self-consistency improve reliability for math problems?

A) It makes the model smarter  
B) Different reasoning paths catch different errors; voting surfaces the correct answer  
C) It uses more tokens  
D) It reduces hallucinations completely  

**Correct Answer**: B

**Explanation**: Each generation may make different errors. By generating multiple reasoning paths and voting on answers, calculation errors are less likely to survive the majority vote.

---

### Question 3
What is "self-verification"?

A) Checking your own prompt for errors  
B) Asking the model to verify its own answer  
C) Using a different model  
D) Running code to check outputs  

**Correct Answer**: B

**Explanation**: Self-verification asks the model to review and verify its own output, checking calculations, logic, and correctness. Models can often catch their own errors when asked to verify.

---

### Question 4
When is self-consistency NOT worth the extra cost?

A) Critical business decisions  
B) Simple, low-stakes tasks  
C) Math word problems  
D) Classification of important data  

**Correct Answer**: B

**Explanation**: Self-consistency multiplies API costs by the number of samples. For simple, low-stakes tasks, the extra cost isn't justified. Save it for critical applications.

---

*You've completed Lesson 2.3! You now know how to improve LLM reliability.*
