# Lesson 1.4: When NOT to Use Agents

> **Duration**: 45 minutes | **Type**: Strategic
> **Unit**: 1 - Agent Fundamentals

---

## 📚 Reading Material

### The Agent Tax

Agents add complexity:
- Multiple LLM calls (cost)
- Unpredictable iterations (latency)
- More failure points (reliability)
- Harder to debug (observability)

### When Simpler Is Better

| Situation | Use Instead |
|-----------|-------------|
| Fixed steps | Chain/Pipeline |
| Single tool | Direct function call |
| Known flow | Prompt template |
| Simple routing | If/else logic |
| Deterministic | No LLM needed |

### Red Flags: Don't Use Agents

❌ "Agent for simple CRUD operations"
❌ "Agent to parse fixed-format data"
❌ "Agent for known step-by-step workflow"
❌ "Agent when latency must be <500ms"
❌ "Agent when 100% reliability required"

### When Agents ARE Worth It

✅ Dynamic problem-solving
✅ Unknown number of steps
✅ Tool selection at runtime
✅ Exploratory research
✅ User intent is ambiguous

### The Decision Framework

```
1. Is the task well-defined with fixed steps?
   YES → Use a chain
   NO → Continue

2. Can it be done in 1-2 tool calls?
   YES → Use simple function calling
   NO → Continue

3. Does the task require iteration and reasoning?
   YES → Consider an agent
   NO → Re-examine requirements

4. Is reliability more important than flexibility?
   YES → Use chains with fallbacks
   NO → Agent is appropriate
```

---

## 🎬 Video Script

**[INTRO - Cost/complexity diagram]**

Agents are powerful but expensive. More calls, more latency, more failure points. Let me show you when to avoid them.

**[CUT TO: Simpler alternatives]**

Fixed steps? Use a chain. Single tool? Direct call. Known flow? Template. Don't use agents as a default.

**[CUT TO: Red flags]**

Red flags: CRUD operations, fixed format parsing, step-by-step workflows, low latency requirements. All these scream "don't use an agent."

**[CUT TO: Decision framework]**

Ask: Is it fixed steps? Can it be done in 1-2 calls? Does it need iteration? Is reliability paramount? Navigate to the right architecture.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
When should you avoid using agents?

A) When tasks are well-defined with fixed steps  
B) When you have powerful LLMs  
C) When you want intelligence  
D) Always use agents  

**Correct Answer**: A

---

*Congratulations on completing Unit 1! You understand agent fundamentals.*
