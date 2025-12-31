# Lesson 1.3: Threat Modeling for AI

> **Duration**: 55 minutes | **Type**: Security
> **Unit**: 1 - Threat Landscape

---

## 📚 Reading Material

### STRIDE for AI

| Threat | AI Example | Mitigation |
|--------|------------|------------|
| **Spoofing** | Fake model endpoints | Authentication |
| **Tampering** | Prompt manipulation | Input validation |
| **Repudiation** | Denying LLM actions | Logging |
| **Information Disclosure** | Training data leakage | Access control |
| **Denial of Service** | Context flooding | Rate limiting |
| **Elevation of Privilege** | Jailbreaking | Guardrails |

### AI-Specific Threat Model

```yaml
Asset: Customer Support LLM
Data Flow:
  - User → API → LLM → Response
  
Threats:
  - Prompt injection via user messages
  - PII leakage in responses
  - Jailbreak to generate harmful content
  - Resource exhaustion attacks
  
Trust Boundaries:
  - User input (untrusted)
  - System prompts (trusted)
  - RAG context (partially trusted)
```

### Risk Assessment

| Threat | Likelihood | Impact | Priority |
|--------|------------|--------|----------|
| Prompt Injection | High | High | Critical |
| Jailbreak | Medium | Medium | High |
| Data Extraction | Medium | High | High |
| DoS | Low | Medium | Medium |

---

## 🎬 Video Script

**[INTRO - Threat model diagram]**

Threat modeling for AI uses familiar frameworks with AI-specific adaptations.

**[CUT TO: STRIDE]**

STRIDE works for AI: spoofing endpoints, tampering prompts, repudiating actions, disclosing data, denial of service, privilege escalation via jailbreaks.

**[CUT TO: Risk assessment]**

Prioritize by likelihood and impact. Prompt injection: high/high = critical. DoS: lower priority.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
What is the "T" in STRIDE for AI?

A) Training  
B) Tampering (e.g., prompt manipulation)  
C) Testing  
D) Tokens  

**Correct Answer**: B

---

*Congratulations on completing Unit 1! You understand the AI threat landscape.*
