# Lab: LLM Observability Dashboard

## Overview

In this lab, you'll build a complete observability solution for LLM applications. You'll implement metrics collection, structured logging, and a monitoring dashboard that tracks cost, latency, and quality.

**Duration**: 75 minutes  
**Difficulty**: Intermediate  
**Prerequisites**: Module 4 Lessons 1-2

---

## Learning Objectives

By completing this lab, you will:
- Implement Prometheus metrics for LLM calls
- Create structured logging with tracing
- Build a Grafana dashboard for visualization
- Set up alerting for anomalies
- Track costs and token usage

---

## The Challenge

Build an observability layer that tracks:
1. **Latency**: P50, P95, P99 of LLM calls
2. **Tokens**: Input and output token usage
3. **Costs**: Dollar amounts by model and department
4. **Errors**: Rate and types of failures
5. **Quality**: Rolling quality scores

---

## Starter Code

### `observability/metrics.py` - Prometheus Metrics

```python
"""
Lab: Implement LLM observability metrics.

Metrics to create:
- Request counter (by model, status)
- Latency histogram
- Token counter (input/output)
- Cost counter
- Quality gauge
"""

from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time
from functools import wraps
from typing import Optional
from dataclasses import dataclass


# TODO: Define your metrics
# Example:
# llm_requests_total = Counter(
#     'llm_requests_total',
#     'Total LLM API requests',
#     ['model', 'status', 'app_id']
# )

llm_requests_total = Counter(
    'llm_requests_total',
    'Total LLM API requests',
    ['model', 'status', 'app_id']
)

llm_latency_seconds = Histogram(
    'llm_latency_seconds',
    'LLM request latency in seconds',
    ['model'],
    buckets=[0.1, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0]
)

llm_tokens_total = Counter(
    'llm_tokens_total',
    'Total tokens used',
    ['model', 'direction', 'app_id']  # direction: input or output
)

llm_cost_dollars = Counter(
    'llm_cost_dollars',
    'Total cost in dollars',
    ['model', 'department']
)

llm_errors_total = Counter(
    'llm_errors_total',
    'Total LLM errors',
    ['model', 'error_type']
)

llm_quality_score = Gauge(
    'llm_quality_score',
    'Rolling quality score (0-5)',
    ['app_id']
)


# Pricing per 1M tokens
PRICING = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "gpt-4-turbo": {"input": 10.00, "output": 30.00},
    "claude-3-5-sonnet": {"input": 3.00, "output": 15.00},
}


@dataclass
class LLMMetrics:
    """Container for LLM call metrics."""
    model: str
    app_id: str
    department: str
    input_tokens: int
    output_tokens: int
    latency_seconds: float
    success: bool
    error_type: Optional[str] = None


def record_llm_call(metrics: LLMMetrics):
    """Record metrics for an LLM call."""
    
    # Request counter
    status = "success" if metrics.success else "error"
    llm_requests_total.labels(
        model=metrics.model,
        status=status,
        app_id=metrics.app_id
    ).inc()
    
    # Latency
    llm_latency_seconds.labels(model=metrics.model).observe(metrics.latency_seconds)
    
    # Tokens
    llm_tokens_total.labels(
        model=metrics.model,
        direction="input",
        app_id=metrics.app_id
    ).inc(metrics.input_tokens)
    
    llm_tokens_total.labels(
        model=metrics.model,
        direction="output",
        app_id=metrics.app_id
    ).inc(metrics.output_tokens)
    
    # Cost
    if metrics.model in PRICING:
        pricing = PRICING[metrics.model]
        cost = (
            metrics.input_tokens * pricing["input"] / 1_000_000 +
            metrics.output_tokens * pricing["output"] / 1_000_000
        )
        llm_cost_dollars.labels(
            model=metrics.model,
            department=metrics.department
        ).inc(cost)
    
    # Errors
    if not metrics.success and metrics.error_type:
        llm_errors_total.labels(
            model=metrics.model,
            error_type=metrics.error_type
        ).inc()


def instrumented_llm(model: str, app_id: str = "default", department: str = "engineering"):
    """Decorator to instrument LLM calls with metrics."""
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            success = True
            error_type = None
            input_tokens = 0
            output_tokens = 0
            
            try:
                result = func(*args, **kwargs)
                
                # Extract token usage from result
                if hasattr(result, 'usage'):
                    input_tokens = result.usage.prompt_tokens
                    output_tokens = result.usage.completion_tokens
                
                return result
                
            except Exception as e:
                success = False
                error_type = type(e).__name__
                raise
                
            finally:
                latency = time.time() - start_time
                
                record_llm_call(LLMMetrics(
                    model=model,
                    app_id=app_id,
                    department=department,
                    input_tokens=input_tokens,
                    output_tokens=output_tokens,
                    latency_seconds=latency,
                    success=success,
                    error_type=error_type
                ))
        
        return wrapper
    return decorator


def update_quality_score(app_id: str, score: float):
    """Update the quality score gauge for an app."""
    llm_quality_score.labels(app_id=app_id).set(score)


def start_metrics_server(port: int = 8000):
    """Start the Prometheus metrics server."""
    start_http_server(port)
    print(f"Metrics server running on port {port}")


if __name__ == "__main__":
    # Demo: Start server and generate some fake metrics
    start_metrics_server(8000)
    
    # Simulate some LLM calls
    import random
    
    while True:
        record_llm_call(LLMMetrics(
            model=random.choice(["gpt-4o", "gpt-4o-mini"]),
            app_id=random.choice(["support-bot", "code-assistant"]),
            department=random.choice(["engineering", "sales", "support"]),
            input_tokens=random.randint(100, 2000),
            output_tokens=random.randint(50, 500),
            latency_seconds=random.uniform(0.5, 3.0),
            success=random.random() > 0.05,
        ))
        time.sleep(1)
```

### `observability/logging.py` - Structured Logging

```python
"""
Lab: Implement structured logging for LLM applications.

Features:
- JSON formatted logs
- Request tracing with IDs
- PII redaction
- Log levels by environment
"""

import structlog
import logging
import json
from datetime import datetime
from typing import Optional
import hashlib
import re


def configure_logging(environment: str = "development"):
    """Configure structured logging."""
    
    log_level = logging.DEBUG if environment == "development" else logging.INFO
    
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer()
        ],
        wrapper_class=structlog.stdlib.BoundLogger,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )
    
    logging.basicConfig(
        format="%(message)s",
        level=log_level,
    )


def get_logger(name: str = __name__):
    """Get a configured logger."""
    return structlog.get_logger(name)


def redact_pii(text: str) -> str:
    """Redact potentially sensitive information."""
    # Email
    text = re.sub(r'\b[\w.-]+@[\w.-]+\.\w+\b', '[EMAIL]', text)
    # Phone
    text = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE]', text)
    # SSN
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN]', text)
    # Credit card
    text = re.sub(r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b', '[CARD]', text)
    return text


def hash_content(content: str) -> str:
    """Create a hash for content (for logging without exposing content)."""
    return hashlib.sha256(content.encode()).hexdigest()[:16]


class LLMLogger:
    """Logger specialized for LLM operations."""
    
    def __init__(self, app_id: str):
        self.app_id = app_id
        self.logger = get_logger(f"llm.{app_id}")
    
    def log_request_start(self, request_id: str, model: str, 
                          prompt_length: int, user_id: Optional[str] = None):
        """Log the start of an LLM request."""
        self.logger.info(
            "llm_request_started",
            request_id=request_id,
            app_id=self.app_id,
            model=model,
            prompt_length=prompt_length,
            user_id=user_id,
        )
    
    def log_request_complete(self, request_id: str, model: str,
                             input_tokens: int, output_tokens: int,
                             latency_ms: float, finish_reason: str):
        """Log successful completion of an LLM request."""
        self.logger.info(
            "llm_request_completed",
            request_id=request_id,
            app_id=self.app_id,
            model=model,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            latency_ms=round(latency_ms, 2),
            finish_reason=finish_reason,
        )
    
    def log_request_error(self, request_id: str, model: str,
                          error_type: str, error_message: str,
                          prompt_preview: Optional[str] = None):
        """Log an LLM request error."""
        self.logger.error(
            "llm_request_failed",
            request_id=request_id,
            app_id=self.app_id,
            model=model,
            error_type=error_type,
            error_message=error_message,
            # Only include sanitized preview
            prompt_preview=redact_pii(prompt_preview[:100]) if prompt_preview else None,
        )
    
    def log_quality_evaluation(self, request_id: str, score: float,
                               criteria_scores: dict):
        """Log quality evaluation results."""
        self.logger.info(
            "llm_quality_evaluated",
            request_id=request_id,
            app_id=self.app_id,
            overall_score=score,
            criteria_scores=criteria_scores,
        )


# Example usage
if __name__ == "__main__":
    configure_logging("development")
    
    logger = LLMLogger("support-bot")
    
    # Simulate a request
    request_id = "req_abc123"
    
    logger.log_request_start(
        request_id=request_id,
        model="gpt-4o-mini",
        prompt_length=500,
        user_id="user_456"
    )
    
    logger.log_request_complete(
        request_id=request_id,
        model="gpt-4o-mini",
        input_tokens=500,
        output_tokens=150,
        latency_ms=1234.5,
        finish_reason="stop"
    )
```

---

## Lab Tasks

### Task 1: Set Up Metrics Collection (20 min)

1. Start the metrics server
2. Verify metrics are exposed at `http://localhost:8000/metrics`
3. Generate some test calls and verify counters increment

```bash
# In terminal 1
python observability/metrics.py

# In terminal 2
curl http://localhost:8000/metrics | grep llm_
```

### Task 2: Create Grafana Dashboard (25 min)

Create a dashboard with these panels:

1. **Request Rate** (Graph)
   ```promql
   rate(llm_requests_total[5m])
   ```

2. **P95 Latency** (Graph)
   ```promql
   histogram_quantile(0.95, rate(llm_latency_seconds_bucket[5m]))
   ```

3. **Error Rate** (Gauge)
   ```promql
   rate(llm_requests_total{status="error"}[5m]) / rate(llm_requests_total[5m])
   ```

4. **Cost by Department** (Table)
   ```promql
   sum by(department) (increase(llm_cost_dollars[24h]))
   ```

5. **Token Usage** (Graph)
   ```promql
   rate(llm_tokens_total[5m])
   ```

### Task 3: Implement Logging Integration (15 min)

1. Add structured logging to the metrics module
2. Ensure request IDs link logs to metrics
3. Test PII redaction

```python
# Test PII redaction
text = "Contact john@email.com or 555-123-4567"
print(redact_pii(text))
# Should print: "Contact [EMAIL] or [PHONE]"
```

### Task 4: Create Alerting Rules (15 min)

Define alerts for:

```yaml
# alerts.yml
groups:
  - name: llm_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(llm_requests_total{status="error"}[5m]) / rate(llm_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "LLM error rate above 5%"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(llm_latency_seconds_bucket[5m])) > 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "P95 latency above 5 seconds"
          
      - alert: BudgetWarning
        expr: sum(llm_cost_dollars) > 100
        labels:
          severity: warning
        annotations:
          summary: "Daily LLM spend exceeding $100"
```

---

## Evaluation Rubric

| Criteria | Points |
|----------|--------|
| Metrics server running | 20 |
| Dashboard created | 25 |
| Logging integrated | 20 |
| Alerts configured | 20 |
| PII redaction working | 15 |
| **Total** | **100** |

---

## Bonus Challenges

1. **Distributed Tracing**: Add OpenTelemetry tracing
2. **Cost Predictions**: Forecast monthly spend
3. **Anomaly Detection**: Alert on unusual patterns
4. **Quality Tracking**: Implement LLM-as-judge scoring

---

## Submission

1. Screenshots of working Grafana dashboard
2. Your modified `metrics.py` and `logging.py`
3. Alert rules file
4. Brief explanation of your dashboard design choices
