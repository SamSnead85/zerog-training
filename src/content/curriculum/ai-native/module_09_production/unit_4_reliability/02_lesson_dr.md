# Lesson 4.2: Disaster Recovery

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Reliability

---

## 📚 Reading Material

### Recovery Strategies

| Scenario | Recovery |
|----------|----------|
| Provider outage | Switch to fallback |
| Data corruption | Restore from backup |
| Region failure | Multi-region deploy |
| Key compromise | Rotate and redeploy |

### Multi-Provider Setup

```python
PROVIDERS = {
    "primary": OpenAIClient(key=OPENAI_KEY),
    "secondary": AnthropicClient(key=ANTHROPIC_KEY),
    "tertiary": TogetherClient(key=TOGETHER_KEY)
}

async def resilient_call(query):
    for name, provider in PROVIDERS.items():
        try:
            return await provider.complete(query)
        except Exception as e:
            log_failure(name, e)
    raise AllProvidersFailedError()
```

### Backup Procedures

```python
def backup_vector_db():
    """Daily backup of vector store"""
    export = vector_store.export_all()
    
    s3.upload(
        bucket="ai-backups",
        key=f"vectors/{date.today()}.json",
        data=export
    )

def restore_vector_db(date):
    """Restore from backup"""
    data = s3.download(f"vectors/{date}.json")
    vector_store.import_all(data)
```

### Runbook Template

```markdown
# LLM Provider Outage Runbook

## Detection
- Alert: `llm_error_rate > 10%`
- Health check: `GET /health returns degraded`

## Response
1. Confirm outage on status.openai.com
2. Activate fallback: `kubectl scale deployment fallback --replicas=3`
3. Update DNS if needed

## Recovery
1. Monitor provider status
2. Test primary thoroughly
3. Switch back with canary
```

---

## 🎬 Video Script

**[INTRO - DR diagram]**

Disaster recovery: what happens when things really fail. Multiple providers, backups, runbooks.

**[CUT TO: Multi-provider]**

Multiple providers: OpenAI → Anthropic → Together. Provider outage doesn't mean user outage.

**[CUT TO: Runbooks]**

Document recovery procedures. When 3am incident happens, you follow the runbook.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should a disaster recovery runbook include?

A) Just contact info  
B) Detection, response, and recovery procedures  
C) Only backup commands  
D) Nothing  

**Correct Answer**: B

---

*Congratulations on completing Module 9: Production Deployment!*
