# Lesson: LLM Monitoring and Observability

## Introduction

In production, you can't just hope your LLM application works—you need to **know**. Monitoring LLM systems is challenging because traditional metrics (CPU, latency) don't capture the full picture. This lesson covers how to monitor quality, detect issues, and maintain visibility into your AI systems.

## What Makes LLM Monitoring Different?

| Traditional Web APIs | LLM Applications |
|---------------------|------------------|
| Errors are explicit | Failures can be silent (hallucinations) |
| Output is deterministic | Output varies between calls |
| Success = 200 status | Success = useful, accurate response |
| Fixed response size | Variable response length |
| Predictable costs | Costs vary by input/output |

## The Observability Triad

### 1. Logging: What Happened

```python
import logging
import json
from datetime import datetime

# Structured logging for LLM calls
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s'
)
logger = logging.getLogger("llm_ops")

class LLMLogger:
    """Log all LLM interactions for debugging and analysis."""
    
    def log_request(self, request_id: str, model: str, 
                    messages: list, config: dict):
        """Log the outgoing request."""
        logger.info(json.dumps({
            "event": "llm_request",
            "request_id": request_id,
            "timestamp": datetime.now().isoformat(),
            "model": model,
            "messages": messages,
            "config": {
                "temperature": config.get("temperature"),
                "max_tokens": config.get("max_tokens")
            },
            "input_tokens": self._estimate_tokens(messages)
        }))
    
    def log_response(self, request_id: str, response: str,
                     usage: dict, latency_ms: float):
        """Log the response."""
        logger.info(json.dumps({
            "event": "llm_response",
            "request_id": request_id,
            "timestamp": datetime.now().isoformat(),
            "response_preview": response[:500],  # First 500 chars
            "response_length": len(response),
            "usage": usage,
            "latency_ms": latency_ms
        }))
    
    def log_error(self, request_id: str, error: Exception,
                  retried: bool = False):
        """Log errors."""
        logger.error(json.dumps({
            "event": "llm_error",
            "request_id": request_id,
            "timestamp": datetime.now().isoformat(),
            "error_type": type(error).__name__,
            "error_message": str(error),
            "retried": retried
        }))
```

### 2. Metrics: What's the Trend

```python
from prometheus_client import Counter, Histogram, Gauge
import time

# Define metrics
llm_requests_total = Counter(
    'llm_requests_total',
    'Total LLM requests',
    ['model', 'status']
)

llm_latency_seconds = Histogram(
    'llm_latency_seconds',
    'LLM request latency',
    ['model'],
    buckets=[0.1, 0.5, 1, 2, 5, 10, 30]
)

llm_tokens_used = Counter(
    'llm_tokens_used_total',
    'Total tokens used',
    ['model', 'type']  # type: input or output
)

llm_cost_dollars = Counter(
    'llm_cost_dollars_total',
    'Total API cost in dollars',
    ['model']
)

llm_quality_score = Gauge(
    'llm_quality_score',
    'Latest quality score (1-10)',
    ['use_case']
)


class MetricsClient:
    """Track LLM metrics for dashboards and alerting."""
    
    def record_request(self, model: str, input_tokens: int, 
                       output_tokens: int, latency: float,
                       success: bool):
        """Record metrics for a completed request."""
        status = "success" if success else "error"
        
        llm_requests_total.labels(model=model, status=status).inc()
        llm_latency_seconds.labels(model=model).observe(latency)
        
        llm_tokens_used.labels(model=model, type="input").inc(input_tokens)
        llm_tokens_used.labels(model=model, type="output").inc(output_tokens)
        
        cost = self._calculate_cost(model, input_tokens, output_tokens)
        llm_cost_dollars.labels(model=model).inc(cost)
    
    def _calculate_cost(self, model: str, input_tokens: int, 
                       output_tokens: int) -> float:
        pricing = {
            "gpt-4-turbo": {"input": 0.01/1000, "output": 0.03/1000},
            "gpt-3.5-turbo": {"input": 0.0005/1000, "output": 0.0015/1000},
        }
        rates = pricing.get(model, {"input": 0.01/1000, "output": 0.03/1000})
        return input_tokens * rates["input"] + output_tokens * rates["output"]
```

### 3. Tracing: How Did It Happen

Traces show the full journey of a request through your system:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Setup tracing
provider = TracerProvider()
exporter = OTLPSpanExporter(endpoint="http://jaeger:4317")
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

class TracedLLMClient:
    """LLM client with distributed tracing."""
    
    def complete(self, messages: list, **kwargs):
        with tracer.start_as_current_span("llm_completion") as span:
            span.set_attribute("llm.model", kwargs.get("model", "gpt-4"))
            span.set_attribute("llm.input_messages", len(messages))
            
            # Embed retrieval (if RAG)
            with tracer.start_span("embed_query") as embed_span:
                query_embedding = self._embed(messages[-1]["content"])
                embed_span.set_attribute("embedding.dimensions", len(query_embedding))
            
            # Vector search
            with tracer.start_span("vector_search") as search_span:
                documents = self._search(query_embedding)
                search_span.set_attribute("search.results", len(documents))
            
            # LLM call
            with tracer.start_span("llm_api_call") as llm_span:
                start = time.time()
                response = self._call_llm(messages, documents)
                latency = time.time() - start
                
                llm_span.set_attribute("llm.latency_ms", latency * 1000)
                llm_span.set_attribute("llm.output_tokens", 
                                       response.usage.completion_tokens)
            
            span.set_attribute("llm.total_tokens", response.usage.total_tokens)
            return response
```

## Quality Monitoring

### LLM-as-Judge

Use a secondary LLM to evaluate output quality:

```python
class QualityMonitor:
    """Monitor LLM output quality using LLM-as-judge."""
    
    def __init__(self, sample_rate: float = 0.1):
        self.sample_rate = sample_rate
        self.eval_llm = ChatOpenAI(model="gpt-3.5-turbo")  # Cheaper model
    
    def evaluate(self, prompt: str, response: str, 
                 context: str = None) -> dict:
        """Evaluate response quality on multiple dimensions."""
        
        eval_prompt = f"""
Evaluate this AI response on a scale of 1-10 for each criterion:

PROMPT: {prompt}

RESPONSE: {response}

{"CONTEXT PROVIDED: " + context if context else ""}

Rate each criterion (1=terrible, 10=excellent):
1. RELEVANCE: Does it answer the question?
2. ACCURACY: Is the information correct?
3. HELPFULNESS: Is it useful and actionable?
4. CLARITY: Is it easy to understand?
5. SAFETY: Is it appropriate and safe?

Output as JSON: {{"relevance": X, "accuracy": X, ...}}
"""
        
        result = self.eval_llm.invoke(eval_prompt)
        scores = json.loads(result.content)
        
        # Update metrics
        for dimension, score in scores.items():
            llm_quality_score.labels(use_case=dimension).set(score)
        
        return scores
    
    def should_evaluate(self) -> bool:
        """Probabilistic sampling to control evaluation cost."""
        return random.random() < self.sample_rate
```

### Hallucination Detection

```python
class HallucinationDetector:
    """Detect when LLM outputs aren't grounded in provided context."""
    
    def check_grounding(self, response: str, context: str) -> dict:
        """Check if response claims are supported by context."""
        
        check_prompt = f"""
Analyze if the AI response is grounded in the provided context.

CONTEXT (source of truth):
{context}

AI RESPONSE:
{response}

For each factual claim in the response:
1. Is it supported by the context?
2. Is it contradicted by the context?
3. Is it not mentioned in the context (potential hallucination)?

Output JSON:
{{
  "grounded_claims": ["claim1", "claim2"],
  "contradicted_claims": ["claim3"],
  "ungrounded_claims": ["claim4", "claim5"],
  "hallucination_risk": "low|medium|high"
}}
"""
        
        result = self.eval_llm.invoke(check_prompt)
        analysis = json.loads(result.content)
        
        # Alert if high risk
        if analysis["hallucination_risk"] == "high":
            self._alert("High hallucination risk detected", analysis)
        
        return analysis
```

## Cost Tracking Dashboard

```python
class CostDashboard:
    """Track and visualize LLM costs."""
    
    def __init__(self):
        self.daily_costs = defaultdict(lambda: defaultdict(float))
    
    def record_cost(self, model: str, cost: float, use_case: str):
        """Record a cost entry."""
        today = datetime.now().strftime("%Y-%m-%d")
        self.daily_costs[today][f"{model}:{use_case}"] += cost
    
    def get_daily_summary(self, date: str) -> dict:
        """Get cost breakdown for a day."""
        costs = self.daily_costs[date]
        
        by_model = defaultdict(float)
        by_use_case = defaultdict(float)
        
        for key, cost in costs.items():
            model, use_case = key.split(":")
            by_model[model] += cost
            by_use_case[use_case] += cost
        
        return {
            "date": date,
            "total": sum(costs.values()),
            "by_model": dict(by_model),
            "by_use_case": dict(by_use_case),
            "projected_monthly": sum(costs.values()) * 30
        }
    
    def alert_if_budget_exceeded(self, daily_budget: float):
        """Alert if daily spending exceeds budget."""
        today = datetime.now().strftime("%Y-%m-%d")
        total = sum(self.daily_costs[today].values())
        
        if total > daily_budget:
            self._send_alert(
                f"Daily LLM budget exceeded: ${total:.2f} / ${daily_budget:.2f}"
            )
```

## Alerting Rules

```yaml
# prometheus_rules.yml
groups:
  - name: llm_alerts
    rules:
      - alert: LLMHighLatency
        expr: histogram_quantile(0.95, llm_latency_seconds) > 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "LLM latency is high"
          description: "95th percentile latency is {{ $value }}s"
      
      - alert: LLMHighErrorRate
        expr: rate(llm_requests_total{status="error"}[5m]) / rate(llm_requests_total[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "LLM error rate above 5%"
      
      - alert: LLMQualityDegraded
        expr: llm_quality_score < 6
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "LLM quality score dropped below 6"
      
      - alert: LLMCostSpike
        expr: increase(llm_cost_dollars_total[1h]) > 100
        labels:
          severity: critical
        annotations:
          summary: "Unusual LLM cost spike: ${{ $value }} in last hour"
```

## Key Takeaways

- **Log everything**: Requests, responses, errors—you'll need it for debugging
- **Track the right metrics**: Latency, tokens, cost, quality scores
- **Use distributed tracing**: See the complete request journey through RAG, tools, etc.
- **Monitor quality with LLM-as-judge**: Sample outputs and evaluate automatically
- **Detect hallucinations**: Check if responses are grounded in provided context
- **Set up cost alerts**: LLM costs can spike unexpectedly
- **Alert on quality degradation**: Don't wait for user complaints

## What's Next

You've completed Module 4! Apply these concepts in the hands-on lab where you'll build a complete LLM monitoring stack.

---

*Estimated completion time: 35 minutes*
*Difficulty: Advanced*
