# Lesson: AI Observability and Monitoring

## Overview

In this lesson, you'll learn to implement comprehensive observability for AI applications. We'll cover logging, metrics, tracing, and alerting—with a focus on AI-specific concerns like token usage, latency, and quality monitoring.

**Duration**: 30 minutes  
**Prerequisites**: Module 4 Lesson 1 (LLMOps Fundamentals)

## Learning Objectives

By the end of this lesson, you will:
- Understand the three pillars of observability for AI
- Implement structured logging for LLM interactions
- Track key AI metrics (latency, tokens, cost, quality)
- Set up distributed tracing for complex AI workflows
- Design alerting strategies for AI-specific issues

---

## Why AI Observability Matters

AI applications fail in ways that traditional software doesn't:
- **Silent failures**: Model returns plausible but wrong answer
- **Quality degradation**: Performance drifts over time
- **Cost spirals**: Token usage unexpectedly increases
- **Latency variance**: Response times fluctuate wildly

Without observability, these issues stay hidden until users complain.

---

## The Three Pillars of Observability

```
┌─────────────────────────────────────────────────────┐
│              AI OBSERVABILITY STACK                 │
├─────────────────────────────────────────────────────┤
│   ┌─────────┐    ┌─────────┐    ┌─────────┐        │
│   │ METRICS │    │  LOGS   │    │ TRACES  │        │
│   └────┬────┘    └────┬────┘    └────┬────┘        │
│        │              │              │              │
│   "What is      "What        "What's the          │
│   happening?"   happened?"   full path?"          │
├─────────────────────────────────────────────────────┤
│                    ALERTS                           │
│              "When to wake up?"                     │
└─────────────────────────────────────────────────────┘
```

---

## Pillar 1: Metrics

Metrics are aggregated measurements over time.

### Key AI Metrics

```python
from prometheus_client import Counter, Histogram, Gauge
import time

# Request counters
llm_requests_total = Counter(
    'llm_requests_total',
    'Total LLM API requests',
    ['model', 'status', 'app_id']
)

# Latency histogram
llm_latency_seconds = Histogram(
    'llm_latency_seconds',
    'LLM request latency',
    ['model'],
    buckets=[0.1, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0]
)

# Token usage
llm_tokens_total = Counter(
    'llm_tokens_total',
    'Total tokens used',
    ['model', 'direction']  # direction: input/output
)

# Cost tracking
llm_cost_dollars = Counter(
    'llm_cost_dollars',
    'Total cost in dollars',
    ['model', 'department']
)

# Quality score (from evaluations)
llm_quality_score = Gauge(
    'llm_quality_score',
    'Rolling quality score',
    ['app_id', 'model']
)
```

### Instrumenting LLM Calls

```python
class InstrumentedLLM:
    def __init__(self, model: str, client):
        self.model = model
        self.client = client
    
    def invoke(self, messages: list, **kwargs) -> dict:
        app_id = kwargs.get('app_id', 'unknown')
        department = kwargs.get('department', 'unknown')
        
        start_time = time.time()
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                **kwargs
            )
            
            # Record success
            llm_requests_total.labels(
                model=self.model,
                status='success',
                app_id=app_id
            ).inc()
            
            # Record latency
            latency = time.time() - start_time
            llm_latency_seconds.labels(model=self.model).observe(latency)
            
            # Record tokens
            usage = response.usage
            llm_tokens_total.labels(
                model=self.model,
                direction='input'
            ).inc(usage.prompt_tokens)
            
            llm_tokens_total.labels(
                model=self.model,
                direction='output'
            ).inc(usage.completion_tokens)
            
            # Record cost
            cost = self.calculate_cost(usage)
            llm_cost_dollars.labels(
                model=self.model,
                department=department
            ).inc(cost)
            
            return response
            
        except Exception as e:
            llm_requests_total.labels(
                model=self.model,
                status='error',
                app_id=app_id
            ).inc()
            raise
```

### Dashboard Queries (PromQL)

```promql
# Request rate by model
rate(llm_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(llm_latency_seconds_bucket[5m]))

# Cost per hour
rate(llm_cost_dollars[1h]) * 3600

# Error rate
rate(llm_requests_total{status="error"}[5m]) / rate(llm_requests_total[5m])
```

---

## Pillar 2: Logging

Logs provide detailed context for debugging.

### Structured Logging

```python
import structlog
import json

# Configure structured logging
structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ]
)

logger = structlog.get_logger()

class LoggedLLM:
    def invoke(self, messages: list, **kwargs):
        request_id = generate_request_id()
        
        # Log request (without full content for privacy)
        logger.info(
            "llm_request_started",
            request_id=request_id,
            model=self.model,
            message_count=len(messages),
            app_id=kwargs.get('app_id'),
            user_id=kwargs.get('user_id'),
        )
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
            )
            
            # Log success
            logger.info(
                "llm_request_completed",
                request_id=request_id,
                model=self.model,
                latency_ms=elapsed_ms,
                input_tokens=response.usage.prompt_tokens,
                output_tokens=response.usage.completion_tokens,
                finish_reason=response.choices[0].finish_reason,
            )
            
            return response
            
        except Exception as e:
            # Log error with full context
            logger.error(
                "llm_request_failed",
                request_id=request_id,
                model=self.model,
                error_type=type(e).__name__,
                error_message=str(e),
                # Include first 100 chars of input for debugging
                input_preview=messages[-1]["content"][:100] if messages else None,
            )
            raise
```

### Log Schema

```json
{
  "timestamp": "2024-01-15T14:30:00Z",
  "level": "info",
  "event": "llm_request_completed",
  "request_id": "req_abc123",
  "model": "gpt-4-turbo",
  "app_id": "support-bot",
  "user_id": "user_456",
  "latency_ms": 1234,
  "input_tokens": 500,
  "output_tokens": 200,
  "finish_reason": "stop",
  "cost_usd": 0.012
}
```

### What to Log

| Always Log | Consider Logging | Never Log |
|------------|------------------|-----------|
| Request ID | Input preview (truncated) | Full prompts (PII risk) |
| Model used | Output preview | API keys |
| Latency | Error details | User passwords |
| Token counts | User context | Sensitive data |
| Finish reason | Model parameters | System prompts |

---

## Pillar 3: Tracing

Traces show the full journey of a request through your system.

### Implementing Traces

```python
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode

tracer = trace.get_tracer(__name__)

class TracedRAGPipeline:
    def query(self, question: str) -> dict:
        with tracer.start_as_current_span("rag_query") as span:
            span.set_attribute("question.length", len(question))
            
            # Retrieval span
            with tracer.start_as_current_span("retrieval") as ret_span:
                docs = self.retrieve(question)
                ret_span.set_attribute("docs.count", len(docs))
                ret_span.set_attribute("retrieval.method", "hybrid")
            
            # Generation span
            with tracer.start_as_current_span("generation") as gen_span:
                gen_span.set_attribute("model", self.model_name)
                answer = self.generate(question, docs)
                gen_span.set_attribute("output.tokens", answer.token_count)
            
            # Optional: Quality check span
            with tracer.start_as_current_span("quality_check"):
                score = self.evaluate(question, answer)
                span.set_attribute("quality.score", score)
            
            return {"answer": answer, "sources": docs, "quality": score}
```

### Trace Visualization

```
[RAG Query] 2.3s total
├─[Retrieval] 0.8s
│  ├─[Embed Query] 0.1s
│  ├─[Vector Search] 0.4s
│  └─[Rerank] 0.3s
├─[Generation] 1.2s
│  ├─[Format Prompt] 0.01s
│  └─[LLM Call] 1.19s
└─[Quality Check] 0.3s
```

### Trace Attributes

```python
# Useful attributes to add
span.set_attributes({
    # Request context
    "request.id": request_id,
    "user.id": user_id,
    "app.id": app_id,
    
    # Model info
    "llm.model": model_name,
    "llm.provider": "openai",
    "llm.temperature": 0.7,
    
    # Performance
    "tokens.input": input_tokens,
    "tokens.output": output_tokens,
    "tokens.total": total_tokens,
    
    # Quality
    "output.finish_reason": "stop",
    "output.quality_score": 0.92,
})
```

---

## AI-Specific Alerting

### Alert Categories

```yaml
# High Priority - Immediate attention
- name: LLM_HIGH_ERROR_RATE
  condition: rate(llm_requests_total{status="error"}[5m]) > 0.05
  severity: critical
  message: "LLM error rate above 5%"

- name: LLM_HIGH_LATENCY
  condition: histogram_quantile(0.95, rate(llm_latency_seconds_bucket[5m])) > 5
  severity: critical
  message: "95th percentile latency above 5 seconds"

# Medium Priority - Investigate soon
- name: BUDGET_80_PERCENT
  condition: llm_monthly_cost > (budget * 0.8)
  severity: warning
  message: "AI spending at 80% of monthly budget"

- name: QUALITY_DEGRADATION
  condition: avg_over_time(llm_quality_score[1h]) < 0.75
  severity: warning
  message: "Quality score degraded below threshold"

# Low Priority - Review daily
- name: TOKEN_USAGE_ANOMALY
  condition: rate(llm_tokens_total[1h]) > 2 * avg_over_time(rate(llm_tokens_total[24h])[7d])
  severity: info
  message: "Token usage anomaly detected"
```

### Alert Runbook Example

```markdown
## Alert: LLM_HIGH_ERROR_RATE

### Description
LLM error rate is above 5% for the past 5 minutes.

### Troubleshooting Steps
1. Check provider status page (status.openai.com)
2. Review recent logs: `grep "llm_request_failed" logs | tail -50`
3. Check if specific model or app is affected
4. Verify API key is not expired or rate-limited

### Resolution Options
- If provider issue: Enable fallback provider
- If rate limited: Reduce traffic or upgrade plan
- If key issue: Rotate API key
- If code issue: Roll back recent deployment

### Escalation
If not resolved in 15 minutes, page on-call engineer.
```

---

## Building a Monitoring Dashboard

### Essential Panels

```
┌─────────────────────────────────────────────────────────────┐
│                    AI MONITORING DASHBOARD                   │
├────────────────────────┬────────────────────────────────────┤
│   Request Rate         │   Error Rate                       │
│   ████████████░░ 240/m │   ░░░░░░░░░░░░░░░ 0.1%            │
├────────────────────────┼────────────────────────────────────┤
│   P95 Latency          │   Token Usage                      │
│   ████████░░░░ 1.8s    │   In: 45M  Out: 12M               │
├────────────────────────┴────────────────────────────────────┤
│   Monthly Spend by Model                                     │
│   ┌────────────────────────────────────────────────────┐   │
│   │ GPT-4o      ████████████████████ $8,500            │   │
│   │ GPT-4o-mini ██████ $2,100                          │   │
│   │ Claude      ████ $1,200                            │   │
│   └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│   Quality Score (7-day rolling)                              │
│   ─────────────────────────────────────░░░ 0.89             │
└──────────────────────────────────────────────────────────────┘
```

### Quality Monitoring

```python
class QualityMonitor:
    def __init__(self):
        self.evaluator = LLMAsJudge()
    
    async def evaluate_sample(self, app_id: str):
        """Sample and evaluate recent requests."""
        # Get random sample of recent requests
        requests = await self.db.get_random_sample(
            app_id=app_id,
            count=10,
            period="1h"
        )
        
        scores = []
        for req in requests:
            score = await self.evaluator.evaluate(
                prompt=req["prompt"],
                response=req["response"]
            )
            scores.append(score)
        
        avg_score = sum(scores) / len(scores)
        
        # Update gauge
        llm_quality_score.labels(
            app_id=app_id,
            model=req["model"]
        ).set(avg_score)
        
        return avg_score
```

---

## Complete Observability Setup

### Production Configuration

```python
# observability.py

import structlog
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from prometheus_client import start_http_server

def setup_observability():
    # 1. Configure structured logging
    structlog.configure(
        processors=[
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.JSONRenderer()
        ],
        wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
    )
    
    # 2. Set up OpenTelemetry tracing
    tracer_provider = TracerProvider()
    otlp_exporter = OTLPSpanExporter(
        endpoint="http://otel-collector:4317",
        insecure=True
    )
    tracer_provider.add_span_processor(
        BatchSpanProcessor(otlp_exporter)
    )
    trace.set_tracer_provider(tracer_provider)
    
    # 3. Start Prometheus metrics server
    start_http_server(8000)
    
    return structlog.get_logger()
```

---

## Key Takeaways

1. **Metrics for aggregates**: Track rates, latencies, costs
2. **Logs for details**: Debug individual requests
3. **Traces for flow**: Understand complex pipelines
4. **AI-specific monitoring**: Quality scores, token usage, cost attribution
5. **Proactive alerting**: Catch issues before users do

---

## Next Steps

- **Lab**: Set up Grafana dashboard for AI metrics
- **Next Lesson**: Cost optimization strategies
- **Advanced**: Custom quality evaluation pipelines
