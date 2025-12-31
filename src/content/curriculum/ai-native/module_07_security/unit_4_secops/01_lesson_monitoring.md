# Lesson 4.1: Security Monitoring

> **Duration**: 55 minutes | **Type**: Security
> **Unit**: 4 - Security Operations

---

## 📚 Reading Material

### What to Monitor

| Category | Signals |
|----------|---------|
| Injection attempts | Known patterns, anomalies |
| Jailbreak attempts | Role-play, DAN, encoding |
| Data exfiltration | System prompt leaks, PII |
| Abuse | High volume, unusual patterns |
| Model behavior | Safety violations, drift |

### Logging Security Events

```python
def log_security_event(event_type, details, severity):
    event = {
        "timestamp": datetime.now().isoformat(),
        "type": event_type,
        "severity": severity,  # low, medium, high, critical
        "details": sanitize(details),  # Remove sensitive data
        "user_id": hash(user_id),  # Pseudonymized
        "session_id": session_id,
        "request_id": request_id
    }
    
    security_logger.log(event)
    
    if severity in ["high", "critical"]:
        send_alert(event)
```

### Alerting Rules

```python
ALERT_RULES = [
    {
        "name": "injection_burst",
        "condition": "injection_attempts > 10 in 5 minutes",
        "severity": "high",
        "action": "block_user"
    },
    {
        "name": "system_prompt_leak",
        "condition": "canary_token in output",
        "severity": "critical",
        "action": "alert_security_team"
    }
]
```

---

## 🎬 Video Script

**[INTRO - Monitoring dashboard]**

You can't defend what you can't see. Security monitoring is essential.

**[CUT TO: What to monitor]**

Injection attempts, jailbreaks, exfiltration, abuse, behavior drift. Log everything security-relevant.

**[CUT TO: Alerting]**

Define rules. High severity = immediate alert. Critical = wake someone up.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should trigger a critical security alert?

A) Any request  
B) System prompt leakage or confirmed breach  
C) High latency  
D) Normal usage  

**Correct Answer**: B
