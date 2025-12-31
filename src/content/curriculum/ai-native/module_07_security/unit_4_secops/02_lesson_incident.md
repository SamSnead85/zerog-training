# Lesson 4.2: Incident Response

> **Duration**: 55 minutes | **Type**: Security
> **Unit**: 4 - Security Operations

---

## 📚 Reading Material

### AI Incident Types

| Incident | Response |
|----------|----------|
| Prompt injection success | Block user, patch defense |
| Data leakage | Disable endpoint, assess scope |
| Jailbreak spread | Update filters, rotate prompts |
| Model compromise | Rollback, investigate source |

### Response Playbook

```python
class IncidentResponse:
    def handle_prompt_injection(self, incident):
        # 1. Contain
        self.block_user(incident.user_id)
        self.rate_limit_endpoint(incident.endpoint)
        
        # 2. Assess
        scope = self.analyze_injection_impact(incident)
        
        # 3. Remediate
        self.update_filters(incident.payload)
        self.add_to_blocklist(incident.pattern)
        
        # 4. Recover
        if scope.data_leaked:
            self.notify_affected_users()
        
        # 5. Document
        self.create_incident_report(incident, scope)
```

### Post-Incident

1. **Root cause analysis**: How did it succeed?
2. **Defense improvement**: Patch the gap
3. **Detection improvement**: Catch it earlier
4. **Documentation**: Update runbooks
5. **Training**: Share lessons learned

---

## 🎬 Video Script

**[INTRO - Incident response flow]**

When attacks succeed, respond fast. Contain, assess, remediate, recover.

**[CUT TO: Playbook]**

Each incident type has a playbook. Block the user. Rate limit. Update filters. Notify if needed.

**[CUT TO: Post-incident]**

After: root cause, improve defenses, improve detection, document, train.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What's the first step in incident response?

A) Document everything  
B) Contain the threat  
C) Notify press  
D) Ignore it  

**Correct Answer**: B

---

*Congratulations on completing Module 7: AI Security!*
