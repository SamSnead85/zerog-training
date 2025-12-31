# Lesson 5.2: Open Source vs Proprietary Models

> **Duration**: 45 minutes | **Type**: Strategic/Technical
> **Unit**: 5 - The Landscape of AI

---

## 📚 Reading Material

### The Great Divide

The AI world is split between **proprietary** models (OpenAI, Anthropic) and **open-weight** models (Llama, Mistral). Understanding the trade-offs is essential for architectural decisions.

### Terminology Matters

**Proprietary/Closed**
- Weights not available
- API access only
- Provider controls everything

**Open-Weight**
- Model weights downloadable
- Can run on your infrastructure
- BUT: May have usage restrictions

**Open-Source (True)**
- Weights + training code + data
- Fully reproducible
- Example: OLMo, Pythia

Most "open" models are open-weight, not fully open-source.

### The Competitive Landscape

**Proprietary Leaders**:
- GPT-4o (~1.7T parameters)
- Claude 3.5 Sonnet
- Gemini 1.5 Pro

**Open-Weight Leaders**:
- Llama 3.1 (8B, 70B, 405B)
- Mixtral 8x7B, 8x22B
- Qwen 2.5 (7B, 72B)
- Falcon 180B

### When to Use Proprietary

**Choose proprietary when**:
| Factor | Why |
|--------|-----|
| Maximum capability needed | GPT-4o/Claude still lead on complex tasks |
| Rapid development | No infrastructure setup |
| Low volume | API costs < hosting costs |
| Latest features | Proprietary models get new features first |
| No ML expertise | Zero model management overhead |

**Cost example (Low Volume)**:
```
10,000 requests/month × $0.01/request = $100/month
vs.
GPU server hosting = $1,500/month minimum

Winner: API
```

### When to Use Open-Weight

**Choose open-weight when**:
| Factor | Why |
|--------|-----|
| Data privacy | Data never leaves your infrastructure |
| Regulatory requirements | Some industries prohibit external data processing |
| High volume | Per-request costs scale linearly; hosting is fixed |
| Customization needed | Fine-tuning, prompt caching, custom inference |
| Cost optimization | At scale, hosting is dramatically cheaper |
| Low latency | On-prem eliminates network round-trip |

**Cost example (High Volume)**:
```
1M requests/month × $0.01/request = $10,000/month
vs.
GPU server (Llama 70B) = $2,000/month

Winner: Self-hosted (5x cheaper)
```

### The Llama Ecosystem

Meta's Llama is the dominant open model:

**Llama 3.1 Family**:
- 8B: Runs on consumer GPUs, good for simple tasks
- 70B: Production quality, rivals GPT-3.5
- 405B: Frontier quality, requires serious hardware

**Llama 3.2 Additions**:
- Vision models (11B, 90B)
- Lightweight models (1B, 3B for edge)

**Licensing**:
- Free for commercial use
- Restrictions: Can't use to train competing models
- Attribution required

### The Mistral Ecosystem

French startup with efficient models:

**Models**:
- Mistral 7B: Punches above weight
- Mixtral 8x7B: Mixture of experts, very efficient
- Mistral Large: Proprietary frontier model

**Strengths**:
- EU-based (data sovereignty)
- High efficiency (good for edge)
- Open-weight + commercial API options

### Running Open Models

**Self-Hosting Options**:

1. **Direct (vLLM, llama.cpp)**
   ```python
   # Using vLLM for production serving
   from vllm import LLM
   llm = LLM(model="meta-llama/Llama-3.1-70B-Instruct")
   ```

2. **Ollama (Local Development)**
   ```bash
   ollama run llama3.1
   ```

3. **Inference Providers (Hosted Open Models)**
   - Groq: Ultra-fast Llama inference
   - Together AI: Multiple open models
   - Replicate: Easy deployment

4. **Cloud ML Platforms**
   - AWS SageMaker
   - GCP Vertex AI
   - Azure ML

### Hardware Requirements

| Model Size | VRAM Required | Example Hardware |
|------------|---------------|------------------|
| 7-8B | 16GB | RTX 4090, A10G |
| 13B | 24GB | A10G, L4 |
| 70B | 140GB | 2-4× A100 80GB |
| 405B | 800GB+ | 8-16× A100/H100 |

**Quantization** reduces requirements at quality cost:
- 4-bit: 75% reduction, ~5% quality loss
- 8-bit: 50% reduction, ~2% quality loss

---

## 🎬 Video Script

**[INTRO - Split screen: cloud vs on-premises]**

Proprietary or open? It's one of the biggest architectural decisions you'll make. Let me break down the trade-offs.

**[CUT TO: Terminology explanation]**

First, terminology. Proprietary means API-only—you can't download the model. Open-weight means you can download and run the model yourself. True open-source means weights plus training code plus data—that's rare.

**[CUT TO: Proprietary advantages]**

Proprietary strengths: maximum capability—GPT-4o and Claude are still the best at complex tasks. Rapid development—no infrastructure to manage. And you don't need ML expertise.

**[CUT TO: Low volume calculation]**

At low volume, APIs win on cost. 10,000 requests at a penny each is $100 per month. A GPU server starts at $1,500. The API is 15 times cheaper.

**[CUT TO: Open-weight advantages]**

Open-weight strengths: data privacy—nothing leaves your infrastructure. Regulatory compliance. Customization—you can fine-tune to your domain. And low latency—no network round-trip.

**[CUT TO: High volume calculation]**

At high volume, the math flips. A million requests per month at API prices is $10,000. A dedicated GPU server running Llama 70B is $2,000. Self-hosting is five times cheaper.

**[CUT TO: Llama ecosystem]**

The dominant open model is Llama. The 8B runs on consumer GPUs. The 70B rivals GPT-3.5 and runs on a couple A100s. The 405B is frontier-quality but needs serious hardware.

**[CUT TO: Deployment options]**

Deployment options range from local development with Ollama, to production serving with vLLM, to managed providers like Groq and Together AI who host open models for you.

**[CUT TO: Hardware table]**

Hardware matters. A 70B model needs about 140 gigabytes of VRAM—that's two to four A100 GPUs. Quantization helps—4-bit reduces requirements by 75%, with about 5% quality loss.

**[CUT TO: Speaker on camera]**

The real answer: most organizations use both. APIs for development and low-volume production. Self-hosted for high-volume workloads and sensitive data. Know the break-even point for your use case.

**[END - Runtime: 6:45]**

---

## 🔬 Interactive Lab: Cost-Benefit Analysis

### Objective
Calculate when open models become more cost-effective than APIs.

### Part 1: Break-Even Analysis (25 minutes)

```python
class CostComparisonAnalyzer:
    def __init__(self):
        self.api_costs = {
            "gpt-4o": {"input": 2.50, "output": 10.00},
            "gpt-4o-mini": {"input": 0.15, "output": 0.60},
            "claude-3.5-sonnet": {"input": 3.00, "output": 15.00},
        }
        
        self.hosting_costs = {
            "llama-3.1-8b": {
                "monthly_gpu": 200,  # 1x A10G
                "capacity_requests_per_day": 50000,
            },
            "llama-3.1-70b": {
                "monthly_gpu": 2000,  # 2x A100
                "capacity_requests_per_day": 10000,
            },
            "llama-3.1-405b": {
                "monthly_gpu": 15000,  # 8x H100
                "capacity_requests_per_day": 2000,
            },
        }
    
    def calculate_api_cost(self, model, daily_requests, avg_input_tokens, avg_output_tokens):
        """Calculate monthly API cost"""
        pricing = self.api_costs[model]
        daily_cost = (
            (daily_requests * avg_input_tokens / 1_000_000) * pricing["input"] +
            (daily_requests * avg_output_tokens / 1_000_000) * pricing["output"]
        )
        return daily_cost * 30
    
    def calculate_hosting_cost(self, model, daily_requests):
        """Calculate monthly hosting cost"""
        hosting = self.hosting_costs[model]
        
        # Check if capacity is sufficient
        if daily_requests > hosting["capacity_requests_per_day"]:
            # Need multiple instances
            instances = (daily_requests // hosting["capacity_requests_per_day"]) + 1
        else:
            instances = 1
        
        return hosting["monthly_gpu"] * instances
    
    def find_breakeven(self, api_model, hosting_model, avg_input_tokens=500, avg_output_tokens=200):
        """Find daily request volume where hosting becomes cheaper"""
        
        for daily_requests in range(100, 1000000, 100):
            api_cost = self.calculate_api_cost(
                api_model, daily_requests, avg_input_tokens, avg_output_tokens
            )
            hosting_cost = self.calculate_hosting_cost(hosting_model, daily_requests)
            
            if hosting_cost < api_cost:
                return {
                    "breakeven_daily_requests": daily_requests,
                    "api_monthly_cost": api_cost,
                    "hosting_monthly_cost": hosting_cost,
                    "monthly_savings_at_breakeven": api_cost - hosting_cost
                }
        
        return {"message": "API remains cheaper at all volumes tested"}

# Analyze
analyzer = CostComparisonAnalyzer()

print("Break-Even Analysis: API vs Self-Hosted")
print("=" * 60)

comparisons = [
    ("gpt-4o-mini", "llama-3.1-8b"),
    ("gpt-4o", "llama-3.1-70b"),
]

for api_model, hosting_model in comparisons:
    result = analyzer.find_breakeven(api_model, hosting_model)
    print(f"\n{api_model} vs {hosting_model}:")
    if "breakeven_daily_requests" in result:
        print(f"  Break-even: {result['breakeven_daily_requests']:,} requests/day")
        print(f"  API cost at break-even: ${result['api_monthly_cost']:,.0f}/mo")
        print(f"  Hosting cost: ${result['hosting_monthly_cost']:,.0f}/mo")
    else:
        print(f"  {result['message']}")
```

### Part 2: Scenario Comparison (15 minutes)

```python
def compare_scenarios(scenarios):
    """Compare different deployment scenarios"""
    
    results = []
    
    for scenario in scenarios:
        name = scenario["name"]
        daily_requests = scenario["daily_requests"]
        avg_input = scenario.get("avg_input_tokens", 500)
        avg_output = scenario.get("avg_output_tokens", 200)
        
        # Calculate costs for each option
        options = []
        
        # API options
        for api_model in ["gpt-4o-mini", "gpt-4o"]:
            cost = analyzer.calculate_api_cost(
                api_model, daily_requests, avg_input, avg_output
            )
            options.append({"option": f"API: {api_model}", "monthly_cost": cost})
        
        # Hosting options
        for hosting_model in ["llama-3.1-8b", "llama-3.1-70b"]:
            cost = analyzer.calculate_hosting_cost(hosting_model, daily_requests)
            options.append({"option": f"Self-Host: {hosting_model}", "monthly_cost": cost})
        
        # Sort by cost
        options.sort(key=lambda x: x["monthly_cost"])
        
        results.append({
            "scenario": name,
            "daily_requests": daily_requests,
            "best_option": options[0],
            "all_options": options
        })
    
    return results

# Define scenarios
scenarios = [
    {"name": "Startup MVP", "daily_requests": 1000},
    {"name": "Growth Stage", "daily_requests": 10000},
    {"name": "Scale Up", "daily_requests": 50000},
    {"name": "Enterprise", "daily_requests": 200000},
]

results = compare_scenarios(scenarios)

print("\nScenario Comparison")
print("=" * 60)
for r in results:
    print(f"\n📊 {r['scenario']} ({r['daily_requests']:,} requests/day)")
    print(f"   Best: {r['best_option']['option']} @ ${r['best_option']['monthly_cost']:,.0f}/mo")
    print("   All options:")
    for opt in r['all_options']:
        print(f"     {opt['option']}: ${opt['monthly_cost']:,.0f}/mo")
```

### Submission
Create a cost analysis for your organization's projected AI usage.

---

## ✅ Knowledge Check

### Question 1
What is the key difference between "open-weight" and true "open-source" models?

A) Open-weight is free, open-source costs money  
B) Open-weight provides model weights; true open-source provides weights, code, and data  
C) There is no difference  
D) Open-source models are older  

**Correct Answer**: B

**Explanation**: Open-weight models provide downloadable weights. True open-source (like OLMo) provides weights plus training code plus training data, enabling full reproducibility.

---

### Question 2
At what point does self-hosting typically become cheaper than APIs?

A) Immediately for any volume  
B) When monthly request volume is in the tens of thousands  
C) Only for enterprise companies  
D) Self-hosting is never cheaper  

**Correct Answer**: B

**Explanation**: The break-even is typically in the tens of thousands of daily requests. Below that, fixed hosting costs exceed variable API costs. Above that, the fixed cost of hosting wins.

---

### Question 3
Which factor makes self-hosting essential regardless of cost?

A) Wanting the newest features  
B) Strict data privacy requirements where data cannot leave your infrastructure  
C) Needing the highest quality  
D) Wanting the simplest development experience  

**Correct Answer**: B

**Explanation**: For industries with strict data privacy regulations, self-hosting may be required regardless of cost because data cannot be sent to external APIs.

---

### Question 4
What does 4-bit quantization typically reduce?

A) Model accuracy by 50%  
B) VRAM requirements by ~75% with ~5% quality loss  
C) Inference speed  
D) Context window size  

**Correct Answer**: B

**Explanation**: 4-bit quantization reduces VRAM requirements by approximately 75% (from 16-bit), with typically around 5% reduction in output quality—a worthwhile trade-off in many cases.

---

*You've completed Lesson 5.2! You can now evaluate open vs proprietary models for your use cases.*
