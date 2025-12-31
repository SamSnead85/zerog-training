# Lesson 3.1: Planning Strategies

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Planning and Reasoning

---

## 📚 Reading Material

### Planning Approaches

**Reactive (no planning)**: Decide action based on current state only
**Upfront planning**: Create full plan before executing
**Interleaved planning**: Plan and execute in alternating steps

### Upfront Planning

```python
def plan_then_execute(goal):
    # Create complete plan
    plan_prompt = f"""
Create a step-by-step plan to achieve: {goal}

Return as numbered list. Each step should be atomic and achievable.
"""
    plan = llm(plan_prompt)
    steps = parse_plan(plan)
    
    # Execute each step
    for step in steps:
        execute_step(step)
```

### Dynamic Replanning

```python
def plan_with_replanning(goal, max_replans=3):
    for attempt in range(max_replans):
        plan = create_plan(goal)
        
        for i, step in enumerate(plan):
            result = execute_step(step)
            
            if failed(result):
                # Replan from current state
                goal = f"Continue from step {i}: {goal}"
                break
        else:
            return "Success"
    
    return "Max replans exceeded"
```

### Hierarchical Planning

Break down into high-level and low-level plans:

```python
def hierarchical_plan(goal):
    # High-level strategy
    phases = llm(f"Break into 3-5 major phases: {goal}")
    
    # Low-level tactics for each phase
    for phase in phases:
        steps = llm(f"Detailed steps for phase: {phase}")
        for step in steps:
            execute(step)
```

---

## 🎬 Video Script

**[INTRO - Planning diagram]**

Agents need to plan. React for simple tasks, full plans for complex ones. Let me show you the approaches.

**[CUT TO: Upfront planning]**

Upfront: create the full plan first, then execute. Good for well-understood tasks.

**[CUT TO: Replanning]**

Things go wrong. Replanning adapts. When a step fails, create a new plan from current state.

**[CUT TO: Hierarchical]**

Hierarchical: high-level phases, low-level steps. Decomposes complex goals naturally.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
When should you replan?

A) After every step  
B) When a step fails and the original plan is invalid  
C) Never  
D) Only at the start  

**Correct Answer**: B
