# Lesson 8.1: Enterprise AI Platform Architecture

## Introduction

Building AI applications is one thing. Building an AI platform that serves an entire enterprise—with governance, security, cost control, and scalability—is another. This lesson covers the architecture patterns that enable AI at enterprise scale.

## Enterprise AI Architecture Overview

[Image: Enterprise AI platform architecture diagram]

```
┌──────────────────────────────────────────────────────────────────┐
│                    ENTERPRISE AI PLATFORM                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Application A  │  │  Application B  │  │  Application C  │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│  ┌────────┴────────────────────┴────────────────────┴────────┐  │
│  │                    API GATEWAY                             │  │
│  │   (Auth, Rate Limiting, Routing, Cost Attribution)        │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────┴───────────────────────────────────┐  │
│  │                  AI ORCHESTRATION LAYER                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │  │
│  │  │ Prompt   │  │  Model   │  │  RAG     │  │ Cost     │   │  │
│  │  │ Registry │  │ Router   │  │ Service  │  │ Manager  │   │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────┴───────────────────────────────────┐  │
│  │                     MODEL LAYER                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │  │
│  │  │ OpenAI   │  │ Anthropic│  │ Internal │  │ Fine-    │   │  │
│  │  │ API      │  │ API      │  │ Models   │  │ Tuned    │   │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   DATA LAYER                                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │ │
│  │  │ Vector   │  │ Document │  │ Cache    │  │ Audit    │    │ │
│  │  │ Store    │  │ Store    │  │ (Redis)  │  │ Log      │    │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Component 1: API Gateway

The single entry point for all AI requests:

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import time

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class AIGateway:
    """Enterprise AI API Gateway."""
    
    def __init__(self):
        self.rate_limiter = RateLimiter()
        self.cost_tracker = CostTracker()
        self.router = ModelRouter()
    
    async def process_request(
        self,
        request: AIRequest,
        user: User,
        app_id: str
    ) -> AIResponse:
        """Process an AI request through the gateway."""
        
        # 1. Authenticate and authorize
        if not self._authorize(user, request.model, app_id):
            raise HTTPException(403, "Not authorized for this model")
        
        # 2. Check rate limits
        if not self.rate_limiter.check(app_id, user.id):
            raise HTTPException(429, "Rate limit exceeded")
        
        # 3. Check budget
        if not self.cost_tracker.has_budget(app_id):
            raise HTTPException(402, "Budget exhausted for this application")
        
        # 4. Route to appropriate model
        start_time = time.time()
        response = await self.router.route(request)
        latency = time.time() - start_time
        
        # 5. Track costs
        self.cost_tracker.record(
            app_id=app_id,
            user_id=user.id,
            model=request.model,
            tokens=response.usage.total_tokens,
            latency=latency
        )
        
        # 6. Audit log
        await self._audit_log(request, response, user, app_id)
        
        return response
```

## Component 2: Model Router

Intelligently route requests to the optimal model:

```python
class ModelRouter:
    """Route requests to optimal model based on requirements."""
    
    def __init__(self):
        self.models = {
            "fast": {"provider": "openai", "model": "gpt-4o-mini"},
            "quality": {"provider": "openai", "model": "gpt-4o"},
            "long_context": {"provider": "anthropic", "model": "claude-3-5-sonnet"},
            "code": {"provider": "openai", "model": "gpt-4o"},
            "internal": {"provider": "internal", "model": "llama-3-8b"}
        }
        
        self.fallback_chain = ["openai", "anthropic", "internal"]
    
    async def route(self, request: AIRequest) -> AIResponse:
        """Route request to best available model."""
        
        # Determine optimal model
        model_type = self._select_model_type(request)
        model_config = self.models[model_type]
        
        # Try primary, then fallbacks
        for provider in self._get_provider_chain(model_config["provider"]):
            try:
                return await self._call_model(provider, model_config, request)
            except Exception as e:
                logger.warning(f"Provider {provider} failed: {e}")
                continue
        
        raise Exception("All providers failed")
    
    def _select_model_type(self, request: AIRequest) -> str:
        """Select model type based on request characteristics."""
        
        # Long context?
        if request.context_length > 100000:
            return "long_context"
        
        # Code task?
        if request.task_type == "code":
            return "code"
        
        # Latency sensitive?
        if request.max_latency_ms < 1000:
            return "fast"
        
        # Quality critical?
        if request.quality_level == "high":
            return "quality"
        
        # Default: cost-optimized
        return "fast"
```

## Component 3: Cost Management

Track and control AI spending:

```python
from datetime import datetime, timedelta
from collections import defaultdict

class CostManager:
    """Manage AI costs across the enterprise."""
    
    def __init__(self, db):
        self.db = db
        self.pricing = {
            "gpt-4o": {"input": 2.50, "output": 10.00},  # per 1M tokens
            "gpt-4o-mini": {"input": 0.15, "output": 0.60},
            "claude-3-5-sonnet": {"input": 3.00, "output": 15.00},
        }
        
        self.budgets = {}  # app_id: monthly_budget_usd
    
    def calculate_cost(self, model: str, input_tokens: int, 
                       output_tokens: int) -> float:
        """Calculate cost for a request."""
        rates = self.pricing.get(model, {"input": 5, "output": 15})
        
        input_cost = (input_tokens / 1_000_000) * rates["input"]
        output_cost = (output_tokens / 1_000_000) * rates["output"]
        
        return input_cost + output_cost
    
    def record_usage(self, app_id: str, department: str, 
                     model: str, tokens: dict):
        """Record usage for billing and reporting."""
        
        cost = self.calculate_cost(
            model, 
            tokens["input"], 
            tokens["output"]
        )
        
        self.db.insert("usage_log", {
            "app_id": app_id,
            "department": department,
            "model": model,
            "input_tokens": tokens["input"],
            "output_tokens": tokens["output"],
            "cost_usd": cost,
            "timestamp": datetime.now()
        })
    
    def get_department_spend(self, department: str, 
                             period: str = "month") -> dict:
        """Get spending breakdown for a department."""
        
        if period == "month":
            start = datetime.now().replace(day=1)
        elif period == "week":
            start = datetime.now() - timedelta(days=7)
        else:
            start = datetime.now() - timedelta(days=1)
        
        results = self.db.query("""
            SELECT model, SUM(cost_usd) as total_cost,
                   SUM(input_tokens + output_tokens) as total_tokens
            FROM usage_log
            WHERE department = ? AND timestamp >= ?
            GROUP BY model
        """, [department, start])
        
        return {
            "period": period,
            "department": department,
            "by_model": results,
            "total": sum(r["total_cost"] for r in results)
        }
    
    def check_budget(self, app_id: str) -> bool:
        """Check if application is within budget."""
        budget = self.budgets.get(app_id, float('inf'))
        current_spend = self._get_current_month_spend(app_id)
        
        return current_spend < budget
    
    def set_budget(self, app_id: str, monthly_budget: float):
        """Set monthly budget for an application."""
        self.budgets[app_id] = monthly_budget


# Usage
cost_manager = CostManager(db)
cost_manager.set_budget("sales-copilot", 5000)  # $5000/month

# Record usage
cost_manager.record_usage(
    app_id="sales-copilot",
    department="sales",
    model="gpt-4o",
    tokens={"input": 1000, "output": 500}
)

# Get report
report = cost_manager.get_department_spend("sales", "month")
print(f"Sales department spent ${report['total']:.2f} this month")
```

## Component 4: Prompt Registry

Centralized prompt management:

```python
class PromptRegistry:
    """Centralized prompt management for the enterprise."""
    
    def __init__(self, db):
        self.db = db
    
    def register(self, name: str, version: str, prompt: str,
                 owner: str, metadata: dict = None) -> str:
        """Register a new prompt version."""
        
        prompt_id = f"{name}:{version}"
        
        self.db.insert("prompts", {
            "id": prompt_id,
            "name": name,
            "version": version,
            "content": prompt,
            "owner": owner,
            "metadata": metadata or {},
            "status": "draft",
            "created_at": datetime.now()
        })
        
        return prompt_id
    
    def approve(self, prompt_id: str, approver: str):
        """Approve a prompt for production use."""
        self.db.update("prompts", 
            {"status": "approved", "approved_by": approver},
            {"id": prompt_id}
        )
    
    def get_active(self, name: str) -> dict:
        """Get the active version of a prompt."""
        return self.db.query_one("""
            SELECT * FROM prompts 
            WHERE name = ? AND status = 'approved'
            ORDER BY created_at DESC
            LIMIT 1
        """, [name])
    
    def get_for_app(self, app_id: str) -> list:
        """Get all prompts assigned to an application."""
        return self.db.query("""
            SELECT p.* FROM prompts p
            JOIN app_prompts ap ON p.id = ap.prompt_id
            WHERE ap.app_id = ? AND p.status = 'approved'
        """, [app_id])


# Usage
registry = PromptRegistry(db)

# Development workflow
prompt_id = registry.register(
    name="customer-support-greeting",
    version="v2.0",
    prompt="You are a friendly support agent for {company}...",
    owner="support-team",
    metadata={"task": "greeting", "language": "en"}
)

# After review
registry.approve(prompt_id, approver="ai-governance@company.com")

# Production use
active_prompt = registry.get_active("customer-support-greeting")
```

## Component 5: Observability Stack

```python
class EnterpriseObservability:
    """Comprehensive observability for AI platform."""
    
    def __init__(self):
        self.metrics = MetricsClient()
        self.logger = StructuredLogger()
        self.tracer = DistributedTracer()
    
    def track_request(self, request_id: str, app_id: str,
                      model: str, user_id: str):
        """Start tracking a request."""
        
        span = self.tracer.start_span("ai_request", {
            "request_id": request_id,
            "app_id": app_id,
            "model": model,
            "user_id": user_id
        })
        
        return span
    
    def record_success(self, span, response: AIResponse):
        """Record successful request."""
        
        span.set_attribute("status", "success")
        span.set_attribute("tokens.input", response.usage.input_tokens)
        span.set_attribute("tokens.output", response.usage.output_tokens)
        span.end()
        
        # Metrics
        self.metrics.increment("ai_requests_total", 
            tags={"status": "success", "model": response.model})
        self.metrics.histogram("ai_latency_seconds", span.duration,
            tags={"model": response.model})
    
    def record_failure(self, span, error: Exception):
        """Record failed request."""
        
        span.set_attribute("status", "error")
        span.set_attribute("error.message", str(error))
        span.end()
        
        self.metrics.increment("ai_requests_total",
            tags={"status": "error"})
        
        self.logger.error("AI request failed", {
            "request_id": span.request_id,
            "error": str(error)
        })
    
    def create_dashboard(self) -> dict:
        """Generate dashboard configuration."""
        return {
            "panels": [
                {
                    "title": "Requests by Model",
                    "query": "sum(rate(ai_requests_total[5m])) by (model)"
                },
                {
                    "title": "Latency P95",
                    "query": "histogram_quantile(0.95, ai_latency_seconds)"
                },
                {
                    "title": "Daily Cost by Department",
                    "query": "sum(ai_cost_dollars) by (department)"
                },
                {
                    "title": "Error Rate",
                    "query": "rate(ai_requests_total{status='error'}[5m])"
                }
            ]
        }
```

## Governance Framework

### Model Access Control

```python
class ModelGovernance:
    """Governance controls for model access."""
    
    def __init__(self):
        self.access_policies = {}
    
    def set_policy(self, model: str, policy: dict):
        """Set access policy for a model."""
        self.access_policies[model] = {
            "allowed_departments": policy.get("departments", []),
            "required_approval": policy.get("approval", False),
            "use_cases": policy.get("use_cases", []),
            "data_classification": policy.get("data_class", "internal")
        }
    
    def can_access(self, user: User, model: str, use_case: str) -> bool:
        """Check if user can access model for use case."""
        policy = self.access_policies.get(model)
        
        if not policy:
            return False
        
        # Check department
        if user.department not in policy["allowed_departments"]:
            return False
        
        # Check use case
        if use_case not in policy["use_cases"]:
            return False
        
        return True


# Example policy
governance = ModelGovernance()

governance.set_policy("gpt-4o", {
    "departments": ["engineering", "product", "research"],
    "approval": False,
    "use_cases": ["code", "analysis", "writing"],
    "data_class": "internal"
})

governance.set_policy("claude-3-opus", {
    "departments": ["research"],
    "approval": True,
    "use_cases": ["research"],
    "data_class": "confidential"
})
```

## Key Takeaways

- **Centralize AI access** through an API gateway with auth, rate limiting, and cost tracking
- **Implement model routing** to optimize for cost, quality, or latency
- **Track costs rigorously** with budgets, alerts, and departmental attribution
- **Manage prompts centrally** with versioning and approval workflows
- **Build comprehensive observability** for debugging and optimization
- **Establish governance** for model access and data classification
- **Plan for scale** with caching, load balancing, and failover

## What's Next

In the next lesson, we'll cover **Leading AI Transformation**—how to evangelize AI adoption, build AI centers of excellence, and drive organizational change.

---

*Estimated completion time: 40 minutes*
*Difficulty: Advanced*
