# Video Script: Module 8 - Enterprise AI Architecture

## Video Overview
- **Title**: Building Enterprise AI Platforms
- **Duration**: 14 minutes
- **Target Audience**: Architects and engineering leaders
- **Learning Objectives**: AI gateway, cost management, governance, observability

---

## Scene 1: Beyond Single Applications (0:00 - 1:00)

### Visuals
- Single app → Enterprise platform transition
- Multiple teams using AI

### Narration
"Building one AI application is a project. Building an AI platform that serves your entire enterprise—with governance, security, cost control, and scalability—that's architecture. Let's design one."

---

## Scene 2: The Enterprise AI Stack (1:00 - 3:00)

### Visuals
- Layered architecture diagram building up
- Each layer with examples

### Narration
"A proper enterprise AI platform has five layers. Each solves specific problems."

### Architecture Diagram
```
┌───────────────────────────────────────────────────────┐
│                  APPLICATIONS                          │
│  Sales Copilot  |  Support Bot  |  Code Assistant     │
├───────────────────────────────────────────────────────┤
│                  API GATEWAY                           │
│  Auth | Rate Limiting | Cost Attribution | Routing    │
├───────────────────────────────────────────────────────┤
│                ORCHESTRATION LAYER                     │
│  Prompt Registry | Model Router | RAG Service         │
├───────────────────────────────────────────────────────┤
│                   MODEL LAYER                          │
│  OpenAI | Anthropic | Internal Models | Fine-Tuned    │
├───────────────────────────────────────────────────────┤
│                    DATA LAYER                          │
│  Vector Store | Document Store | Cache | Audit Log    │
└───────────────────────────────────────────────────────┘
```

### Layer Benefits
- **Gateway**: Single entry point, unified security
- **Orchestration**: Shared capabilities across apps
- **Models**: Best model for each use case
- **Data**: Centralized knowledge and state

---

## Scene 3: The AI Gateway (3:00 - 5:30)

### Visuals
- Request flow through gateway
- Authentication and routing animation

### Narration
"The AI Gateway is your control plane. Every request flows through it. Let's see what it needs to do."

### Gateway Responsibilities
```python
class AIGateway:
    async def process(self, request, user, app_id):
        # 1. Authenticate
        if not self.auth.check(user, request.model):
            raise Forbidden("Not authorized")
        
        # 2. Rate limit
        if not self.rate_limiter.check(app_id, user.id):
            raise TooManyRequests("Rate limit exceeded")
        
        # 3. Check budget
        if not self.cost_manager.has_budget(app_id):
            raise PaymentRequired("Budget exhausted")
        
        # 4. Route to model
        response = await self.router.route(request)
        
        # 5. Track costs
        self.cost_manager.record(app_id, request.model, response.tokens)
        
        # 6. Audit log
        await self.audit.log(request, response, user, app_id)
        
        return response
```

### What the Gateway Provides
- **Single Auth Point**: One place to manage access
- **Rate Limiting**: Per user, per app, per model
- **Cost Attribution**: Know who spent what
- **Routing**: Smart model selection
- **Audit Trail**: Every request logged

---

## Scene 4: Smart Model Routing (5:30 - 7:00)

### Visuals
- Decision tree animation
- Request flowing to different models

### Narration
"Not every request needs GPT-4. Smart routing saves money and improves performance."

### Model Router
```python
class ModelRouter:
    def select_model(self, request):
        # Long context? Use Claude
        if request.context_length > 100000:
            return "anthropic/claude-3-5-sonnet"
        
        # Code task? Use specialized model
        if request.task_type == "code":
            return "openai/gpt-4o"
        
        # Latency critical? Use smaller model
        if request.max_latency_ms < 1000:
            return "openai/gpt-4o-mini"
        
        # Quality critical? Use best model
        if request.quality == "high":
            return "openai/gpt-4o"
        
        # Default: cost optimized
        return "openai/gpt-4o-mini"
```

### Routing Strategies
| Requirement | Route To |
|------------|----------|
| Long documents | Claude (200K context) |
| Fast response | GPT-4o mini |
| Highest quality | GPT-4o |
| Code generation | GPT-4o |
| Cost optimization | GPT-4o mini |
| Internal only | Self-hosted Llama |

---

## Scene 5: Cost Management (7:00 - 9:00)

### Visuals
- Cost dashboard
- Budget alerts animation
- Departmental breakdown

### Narration
"AI costs can spiral fast. A proper cost management system keeps spending visible and controlled."

### Cost Manager
```python
class CostManager:
    def __init__(self):
        self.pricing = {
            "gpt-4o": {"input": 2.50, "output": 10.00},
            "gpt-4o-mini": {"input": 0.15, "output": 0.60},
            "claude-3-5-sonnet": {"input": 3.00, "output": 15.00},
        }
    
    def record_usage(self, app_id, department, model, tokens):
        cost = self.calculate_cost(model, tokens)
        
        self.db.insert("usage_log", {
            "app_id": app_id,
            "department": department,
            "model": model,
            "tokens": tokens,
            "cost_usd": cost,
            "timestamp": now()
        })
        
        # Check budget alerts
        self.check_budget_alerts(app_id)
    
    def get_department_spend(self, department, period="month"):
        return self.db.query("""
            SELECT model, SUM(cost_usd) as total
            FROM usage_log
            WHERE department = ? AND timestamp >= ?
            GROUP BY model
        """, [department, start_of(period)])
```

### Cost Controls
1. **Budgets**: Monthly limits per app/department
2. **Alerts**: Notify at 80%, block at 100%
3. **Attribution**: Track who spent what
4. **Reports**: Monthly breakdowns by model, app, department

### Dashboard Animation
```
┌─────────────────────────────────────────────┐
│         AI Spending Dashboard               │
├─────────────────────────────────────────────┤
│ This Month: $12,450 / $20,000 budget        │
│ ████████████░░░░░░░░ 62%                    │
├─────────────────────────────────────────────┤
│ By Department:                              │
│ Engineering  $6,200  ████████████           │
│ Sales        $3,100  ██████                 │
│ Support      $2,150  ████                   │
│ Marketing    $1,000  ██                     │
└─────────────────────────────────────────────┘
```

---

## Scene 6: Prompt Registry (9:00 - 10:30)

### Visuals
- Version control visualization
- Approval workflow

### Narration
"In production, prompts are code. They need versioning, approval, and rollback capabilities."

### Prompt Registry
```python
class PromptRegistry:
    def register(self, name, version, template, owner, metadata):
        self.db.insert("prompts", {
            "name": name,
            "version": version,
            "template": template,
            "owner": owner,
            "status": "draft",  # draft → review → approved
            "created_at": now(),
            "metadata": metadata
        })
    
    def approve(self, name, version, approver):
        # Mark current approved version as archived
        self.db.update("prompts", 
            {"status": "archived"}, 
            {"name": name, "status": "approved"})
        
        # Approve new version
        self.db.update("prompts",
            {"status": "approved", "approved_by": approver},
            {"name": name, "version": version})
    
    def get_active(self, name):
        return self.db.query_one("""
            SELECT * FROM prompts
            WHERE name = ? AND status = 'approved'
            ORDER BY created_at DESC
            LIMIT 1
        """, [name])
```

### Workflow
```
Developer creates prompt (v1.0.0)
        ↓
Submits for review
        ↓
Reviewer tests & approves
        ↓
Deployed to production
        ↓
Metrics collected
        ↓
New version? Repeat cycle
```

---

## Scene 7: Observability (10:30 - 12:00)

### Visuals
- Monitoring dashboard
- Trace visualization
- Alert notification

### Narration
"You can't improve what you can't measure. Enterprise AI needs comprehensive observability."

### The Three Pillars

**1. Metrics**
```python
# What to track
metrics = {
    "requests_total": Counter(),
    "latency_seconds": Histogram(buckets=[0.1, 0.5, 1, 2, 5]),
    "tokens_used": Counter(labels=["model", "direction"]),
    "cost_dollars": Counter(labels=["model", "department"]),
    "errors_total": Counter(labels=["error_type"]),
}
```

**2. Logging**
```python
logger.info("AI request completed", extra={
    "request_id": req_id,
    "model": model,
    "tokens": {"input": 1000, "output": 500},
    "latency_ms": 1234,
    "user_id": user.id,
    "app_id": app_id,
})
```

**3. Tracing**
```python
with tracer.start_span("ai_request") as span:
    span.set_attribute("model", model)
    span.set_attribute("app_id", app_id)
    
    # Retrieval span
    with tracer.start_span("retrieval"):
        docs = retriever.get(query)
    
    # Generation span
    with tracer.start_span("generation"):
        response = llm.invoke(prompt)
    
    span.set_attribute("tokens", response.usage.total)
```

---

## Scene 8: Governance (12:00 - 13:00)

### Visuals
- Access control matrix
- Compliance checklist

### Narration
"Enterprise AI needs governance—who can use what models, for which purposes, with what data."

### Access Control
```python
class ModelGovernance:
    policies = {
        "gpt-4o": {
            "departments": ["engineering", "product"],
            "data_classification": "internal",
            "approval_required": False
        },
        "claude-3-opus": {
            "departments": ["research"],
            "data_classification": "confidential",
            "approval_required": True
        }
    }
    
    def can_access(self, user, model, use_case):
        policy = self.policies.get(model)
        
        if user.department not in policy["departments"]:
            return False, "Department not authorized"
        
        if policy["approval_required"] and not has_approval(user):
            return False, "Manager approval required"
        
        return True, None
```

### Governance Checklist
- [ ] Model access by department defined
- [ ] Data classification policies in place
- [ ] Approval workflows for sensitive models
- [ ] Audit trail for compliance
- [ ] Regular access reviews

---

## Scene 9: Conclusion (13:00 - 14:00)

### Visuals
- Complete architecture recap
- Key principles

### Narration
"Building an enterprise AI platform is about more than the models. It's about control, visibility, and governance at scale. Get the architecture right, and AI becomes a managed capability, not a wild west."

### Key Principles
1. **Centralize access** through a gateway
2. **Route intelligently** to optimize cost and quality
3. **Track everything**: costs, usage, performance
4. **Version prompts** like code
5. **Govern access** with clear policies
6. **Monitor continuously** for issues and optimization

### Final Screen
- "Enterprise-Ready AI Architecture"
- "Congratulations on completing the curriculum!"
- ScaledNative branding

---

## Production Notes

### Key Animations
- Architecture layers building up
- Request flow through system
- Cost dashboard updating in real-time

### Diagrams
- Multi-layer architecture
- Model routing decision tree
- Governance access matrix

### Dashboard Mockups
- Cost management interface
- Observability dashboard
- Prompt registry UI
