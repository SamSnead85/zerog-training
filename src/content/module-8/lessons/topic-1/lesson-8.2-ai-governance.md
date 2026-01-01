# Lesson: AI Governance and Compliance

## Overview

In this lesson, you'll learn to implement AI governance frameworks that ensure responsible, compliant, and ethical AI deployments. We'll cover policy design, access control, audit logging, and regulatory compliance.

**Duration**: 25 minutes  
**Prerequisites**: Module 8 Lesson 1 (Enterprise AI Architecture)

## Learning Objectives

By the end of this lesson, you will:
- Design AI governance policies
- Implement role-based access control for AI resources
- Build comprehensive audit trails
- Navigate regulatory requirements (EU AI Act, NIST AI RMF)
- Establish AI ethics review processes

---

## Why AI Governance Matters

Without governance:
- **Legal risk**: Regulatory non-compliance
- **Reputation risk**: Biased or harmful outputs
- **Operational risk**: Uncontrolled costs and access
- **Security risk**: Data leakage and misuse

---

## Governance Framework

```
┌─────────────────────────────────────────────────────────────┐
│                   AI GOVERNANCE FRAMEWORK                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  POLICIES   │ │   ACCESS    │ │   AUDIT     │           │
│  │             │ │   CONTROL   │ │   LOGGING   │           │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘           │
│         │               │               │                   │
│  ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐           │
│  │  Ethics     │ │  RBAC       │ │  Compliance │           │
│  │  Guidelines │ │  Rules      │ │  Reports    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    OVERSIGHT & REVIEW                        │
└─────────────────────────────────────────────────────────────┘
```

---

## AI Policy Design

### Policy Categories

```python
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class AIPolicy:
    name: str
    description: str
    risk_level: RiskLevel
    applicable_models: List[str]
    data_classes: List[str]
    approval_required: bool
    review_frequency_days: int
    owner: str

# Define policies
POLICIES = [
    AIPolicy(
        name="customer-data-processing",
        description="AI processing of customer personal data",
        risk_level=RiskLevel.HIGH,
        applicable_models=["*"],
        data_classes=["PII", "financial", "health"],
        approval_required=True,
        review_frequency_days=90,
        owner="privacy@company.com"
    ),
    AIPolicy(
        name="external-api-calls",
        description="Sending data to external AI APIs",
        risk_level=RiskLevel.MEDIUM,
        applicable_models=["gpt-*", "claude-*"],
        data_classes=["internal", "confidential"],
        approval_required=True,
        review_frequency_days=180,
        owner="security@company.com"
    ),
    AIPolicy(
        name="internal-model-usage",
        description="Using internal/self-hosted models",
        risk_level=RiskLevel.LOW,
        applicable_models=["llama-*", "mistral-*"],
        data_classes=["*"],
        approval_required=False,
        review_frequency_days=365,
        owner="ai-platform@company.com"
    ),
]
```

### Policy Enforcement

```python
class PolicyEngine:
    def __init__(self, policies: List[AIPolicy]):
        self.policies = {p.name: p for p in policies}
    
    def check_request(self, request: dict) -> dict:
        """Check if a request complies with policies."""
        violations = []
        required_approvals = []
        
        model = request.get("model", "")
        data_class = request.get("data_classification", "internal")
        user = request.get("user")
        
        for policy in self.policies.values():
            # Check if policy applies
            if not self._model_matches(model, policy.applicable_models):
                continue
            
            if data_class not in policy.data_classes and "*" not in policy.data_classes:
                continue
            
            # Policy applies - check compliance
            if policy.approval_required:
                if not self._has_approval(user, policy.name):
                    required_approvals.append(policy.name)
            
            # Risk-based checks
            if policy.risk_level == RiskLevel.CRITICAL:
                if not self._has_manager_approval(user, policy.name):
                    violations.append({
                        "policy": policy.name,
                        "reason": "Critical risk requires manager approval"
                    })
        
        return {
            "allowed": len(violations) == 0 and len(required_approvals) == 0,
            "violations": violations,
            "required_approvals": required_approvals,
        }
    
    def _model_matches(self, model: str, patterns: List[str]) -> bool:
        import fnmatch
        return any(fnmatch.fnmatch(model, p) for p in patterns)
```

---

## Role-Based Access Control

### RBAC Model

```python
@dataclass
class AIPermission:
    resource: str  # model, prompt, data
    action: str    # read, write, execute, admin
    conditions: dict = None

@dataclass
class AIRole:
    name: str
    description: str
    permissions: List[AIPermission]

# Define roles
ROLES = {
    "ai-developer": AIRole(
        name="AI Developer",
        description="Can develop and test AI applications",
        permissions=[
            AIPermission("model:gpt-4o-mini", "execute"),
            AIPermission("model:gpt-4o", "execute", {"env": ["dev", "staging"]}),
            AIPermission("prompt:*", "read"),
            AIPermission("prompt:owned", "write"),
        ]
    ),
    "ai-admin": AIRole(
        name="AI Administrator",
        description="Full AI platform administration",
        permissions=[
            AIPermission("model:*", "execute"),
            AIPermission("prompt:*", "admin"),
            AIPermission("policy:*", "admin"),
            AIPermission("audit:*", "read"),
        ]
    ),
    "analyst": AIRole(
        name="Business Analyst",
        description="Can use approved AI tools",
        permissions=[
            AIPermission("model:gpt-4o-mini", "execute"),
            AIPermission("prompt:approved", "execute"),
        ]
    ),
}

class RBACEngine:
    def __init__(self, roles: dict):
        self.roles = roles
        self.user_roles = {}  # user_id -> list of role names
    
    def assign_role(self, user_id: str, role_name: str):
        if user_id not in self.user_roles:
            self.user_roles[user_id] = []
        if role_name not in self.user_roles[user_id]:
            self.user_roles[user_id].append(role_name)
    
    def check_permission(self, user_id: str, resource: str, 
                         action: str, context: dict = None) -> bool:
        user_roles = self.user_roles.get(user_id, [])
        
        for role_name in user_roles:
            role = self.roles.get(role_name)
            if not role:
                continue
            
            for perm in role.permissions:
                if self._matches_permission(perm, resource, action, context):
                    return True
        
        return False
    
    def _matches_permission(self, perm: AIPermission, resource: str,
                            action: str, context: dict) -> bool:
        import fnmatch
        
        if not fnmatch.fnmatch(resource, perm.resource):
            return False
        
        if perm.action != action and perm.action != "admin":
            return False
        
        if perm.conditions and context:
            for key, values in perm.conditions.items():
                if context.get(key) not in values:
                    return False
        
        return True
```

---

## Audit Logging

### Comprehensive Audit Trail

```python
from datetime import datetime
from typing import Any
import json

@dataclass
class AuditEvent:
    timestamp: datetime
    event_type: str
    user_id: str
    resource: str
    action: str
    outcome: str  # success, denied, error
    details: dict
    request_id: str
    ip_address: str

class AuditLogger:
    def __init__(self, storage):
        self.storage = storage
    
    async def log(self, event: AuditEvent):
        record = {
            "timestamp": event.timestamp.isoformat(),
            "event_type": event.event_type,
            "user_id": event.user_id,
            "resource": event.resource,
            "action": event.action,
            "outcome": event.outcome,
            "details": event.details,
            "request_id": event.request_id,
            "ip_address": event.ip_address,
        }
        
        await self.storage.insert("audit_log", record)
        
        # Also send to SIEM for security monitoring
        if event.outcome == "denied" or event.event_type in ["policy_violation", "suspicious_activity"]:
            await self.send_to_siem(record)
    
    async def log_ai_request(self, request, response, user, outcome):
        await self.log(AuditEvent(
            timestamp=datetime.utcnow(),
            event_type="ai_request",
            user_id=user.id,
            resource=f"model:{request.model}",
            action="execute",
            outcome=outcome,
            details={
                "model": request.model,
                "tokens_in": response.usage.prompt_tokens if response else None,
                "tokens_out": response.usage.completion_tokens if response else None,
                "latency_ms": request.latency_ms,
                "app_id": request.app_id,
                # Don't log full prompts - privacy concern
                "prompt_hash": hash(request.prompt),
            },
            request_id=request.id,
            ip_address=request.ip,
        ))
    
    async def search(self, filters: dict, limit: int = 100) -> list:
        """Search audit logs with filters."""
        query = self.storage.query("audit_log")
        
        if "user_id" in filters:
            query = query.where("user_id", "==", filters["user_id"])
        if "resource" in filters:
            query = query.where("resource", "==", filters["resource"])
        if "start_date" in filters:
            query = query.where("timestamp", ">=", filters["start_date"])
        if "outcome" in filters:
            query = query.where("outcome", "==", filters["outcome"])
        
        return await query.limit(limit).execute()
```

### Audit Reports

```python
class AuditReporter:
    def __init__(self, audit_logger: AuditLogger):
        self.logger = audit_logger
    
    async def generate_compliance_report(self, start_date, end_date) -> dict:
        events = await self.logger.search({
            "start_date": start_date,
            "end_date": end_date,
        })
        
        return {
            "period": {"start": start_date, "end": end_date},
            "total_requests": len(events),
            "by_outcome": self._count_by("outcome", events),
            "by_user": self._count_by("user_id", events),
            "by_model": self._count_by_resource_type("model", events),
            "policy_violations": [e for e in events if e["event_type"] == "policy_violation"],
            "access_denials": [e for e in events if e["outcome"] == "denied"],
            "summary": self._generate_summary(events),
        }
    
    def _count_by(self, field: str, events: list) -> dict:
        counts = {}
        for e in events:
            key = e.get(field, "unknown")
            counts[key] = counts.get(key, 0) + 1
        return counts
```

---

## Regulatory Compliance

### EU AI Act Mapping

```python
class EUAIActCompliance:
    """EU AI Act risk classification and requirements."""
    
    RISK_LEVELS = {
        "unacceptable": {
            "description": "Banned AI systems",
            "examples": ["social_scoring", "real_time_biometric_mass"],
            "allowed": False,
        },
        "high": {
            "description": "High-risk AI systems",
            "examples": ["recruitment", "credit_scoring", "medical_diagnosis"],
            "requirements": [
                "risk_management_system",
                "data_governance",
                "technical_documentation",
                "record_keeping",
                "transparency",
                "human_oversight",
                "accuracy_robustness",
            ],
        },
        "limited": {
            "description": "AI with transparency obligations",
            "examples": ["chatbots", "emotion_recognition"],
            "requirements": [
                "disclosure_to_users",
            ],
        },
        "minimal": {
            "description": "Low-risk AI",
            "examples": ["spam_filters", "video_games"],
            "requirements": [],
        },
    }
    
    def classify_use_case(self, use_case: str) -> dict:
        """Classify an AI use case under EU AI Act."""
        # Check against known high-risk domains
        high_risk_domains = [
            "biometrics", "critical_infrastructure", "education",
            "employment", "essential_services", "law_enforcement",
            "migration", "justice"
        ]
        
        for domain in high_risk_domains:
            if domain in use_case.lower():
                return self.RISK_LEVELS["high"]
        
        if "chatbot" in use_case.lower():
            return self.RISK_LEVELS["limited"]
        
        return self.RISK_LEVELS["minimal"]
    
    def get_requirements_checklist(self, risk_level: str) -> list:
        """Get compliance requirements checklist."""
        level = self.RISK_LEVELS.get(risk_level, {})
        requirements = level.get("requirements", [])
        
        checklist = []
        for req in requirements:
            checklist.append({
                "requirement": req,
                "description": self._get_requirement_description(req),
                "evidence_needed": self._get_evidence_types(req),
            })
        
        return checklist
```

### NIST AI RMF Alignment

```python
class NISTAIFramework:
    """NIST AI Risk Management Framework implementation."""
    
    FUNCTIONS = {
        "govern": {
            "description": "Cultivate AI governance",
            "categories": [
                "policies_and_procedures",
                "roles_and_responsibilities",
                "risk_culture",
            ],
        },
        "map": {
            "description": "Identify AI system context and impacts",
            "categories": [
                "system_context",
                "stakeholder_analysis",
                "impact_assessment",
            ],
        },
        "measure": {
            "description": "Assess AI risks",
            "categories": [
                "risk_identification",
                "risk_analysis",
                "risk_evaluation",
            ],
        },
        "manage": {
            "description": "Treat and monitor AI risks",
            "categories": [
                "risk_treatment",
                "risk_monitoring",
                "continuous_improvement",
            ],
        },
    }
    
    def assess_maturity(self, organization_data: dict) -> dict:
        """Assess organization's AI RMF maturity."""
        maturity = {}
        
        for function, details in self.FUNCTIONS.items():
            scores = []
            for category in details["categories"]:
                score = self._evaluate_category(category, organization_data)
                scores.append(score)
            
            maturity[function] = {
                "average_score": sum(scores) / len(scores),
                "category_scores": dict(zip(details["categories"], scores)),
            }
        
        maturity["overall"] = sum(m["average_score"] for m in maturity.values()) / 4
        maturity["recommendations"] = self._generate_recommendations(maturity)
        
        return maturity
```

---

## Ethics Review Process

```python
class AIEthicsReview:
    REVIEW_CRITERIA = [
        "fairness",
        "transparency",
        "accountability",
        "privacy",
        "safety",
        "human_oversight",
    ]
    
    def __init__(self):
        self.pending_reviews = []
        self.completed_reviews = []
    
    def submit_for_review(self, ai_system: dict) -> str:
        review = {
            "id": generate_id(),
            "submitted_at": datetime.utcnow(),
            "ai_system": ai_system,
            "status": "pending",
            "criteria_assessments": {},
        }
        
        self.pending_reviews.append(review)
        return review["id"]
    
    def conduct_review(self, review_id: str, assessments: dict) -> dict:
        review = self._get_review(review_id)
        
        review["criteria_assessments"] = assessments
        review["reviewed_at"] = datetime.utcnow()
        
        # Calculate overall score
        scores = list(assessments.values())
        avg_score = sum(scores) / len(scores)
        
        # Determine outcome
        if all(s >= 3 for s in scores):
            review["outcome"] = "approved"
        elif any(s < 2 for s in scores):
            review["outcome"] = "rejected"
        else:
            review["outcome"] = "conditional"
        
        review["status"] = "completed"
        review["overall_score"] = avg_score
        
        return review
```

---

## Key Takeaways

1. **Governance is essential**: AI without governance is a liability
2. **Policies define boundaries**: Clear rules for who, what, how
3. **RBAC scales access control**: Roles simplify permission management
4. **Audit everything**: You can't prove compliance without logs
5. **Regulations are real**: EU AI Act and NIST guide requirements
6. **Ethics requires process**: Build review into your workflow

---

## Next Steps

- **Lab**: Build a governance dashboard
- **Assessment**: AI governance policy design exercise
- **Advanced**: Automated compliance monitoring
