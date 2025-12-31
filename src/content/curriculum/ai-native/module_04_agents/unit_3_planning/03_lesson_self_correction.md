# Lesson 3.3: Self-Correction

> **Duration**: 50 minutes | **Type**: Technical
> **Unit**: 3 - Planning and Reasoning

---

## 📚 Reading Material

### Why Self-Correction?

Agents make mistakes:
- Wrong tool selection
- Incorrect parameters
- Misinterpretation
- Incomplete answers

Self-correction allows recovery.

### Reflection Pattern

```python
def reflect_and_correct(task, initial_response):
    reflection = llm(f"""
Task: {task}
Response: {initial_response}

Was this response correct and complete?
If not, what needs to be fixed?
""")
    
    if "correct" in reflection.lower():
        return initial_response
    
    corrected = llm(f"""
Task: {task}
Previous attempt: {initial_response}
Issues: {reflection}

Provide a corrected response.
""")
    return corrected
```

### Verification Step

```python
def agent_with_verification(task, tools):
    # Initial attempt
    result = agent_execute(task, tools)
    
    # Verify
    verification = llm(f"""
Task: {task}
Result: {result}

Verify this is correct:
1. Does it fully answer the task?
2. Are there any errors?
3. Is anything missing?

Return "VERIFIED" if correct, otherwise describe issues.
""")
    
    if "VERIFIED" in verification:
        return result
    
    # Correct
    return agent_execute(f"{task}\n\nPrevious issues: {verification}", tools)
```

### Critique Pattern

```python
def critique_and_revise(output, criteria):
    critique = llm(f"""
Output: {output}
Criteria: {criteria}

Score 1-5 on each criterion. Identify specific improvements.
""")
    
    if all_scores_above_threshold(critique):
        return output
    
    revised = llm(f"""
Original: {output}
Critique: {critique}

Revise to address the critique.
""")
    return revised
```

---

## 🎬 Video Script

**[INTRO - Error → correction flow]**

Agents make mistakes. Good agents catch and fix them. Let me show you self-correction patterns.

**[CUT TO: Reflection]**

Reflection: ask the model to evaluate its own response. Did it work? What's wrong? Then fix.

**[CUT TO: Verification]**

Verification step: after execution, check against the original task. Only return if verified correct.

**[CUT TO: Critique]**

Critique and revise: score against criteria. Revise until quality threshold met.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What is the reflection pattern?

A) Using mirrors in code  
B) Having the agent evaluate and correct its own output  
C) Logging responses  
D) Parallel execution  

**Correct Answer**: B

---

*Congratulations on completing Unit 3! You understand agent planning and reasoning.*
