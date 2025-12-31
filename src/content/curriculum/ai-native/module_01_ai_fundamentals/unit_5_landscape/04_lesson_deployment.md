# Lesson 5.4: Deployment Landscape

> **Duration**: 40 minutes | **Type**: Practical
> **Unit**: 5 - The Landscape of AI

---

## 📚 Reading Material

### Deployment Options: The Spectrum

AI applications can be deployed across a spectrum of control and complexity:

```
API-Only ← → Managed Services ← → Self-Managed Cloud ← → On-Premises
[Simple]                                              [Complex]
```

### Option 1: API-Only

Use model providers' APIs directly.

**Architecture**:
```
Your App → OpenAI/Anthropic API → Response
```

**Pros**:
- Simplest setup
- No infrastructure management
- Automatic scaling
- Latest models immediately

**Cons**:
- Per-request costs scale linearly
- Data leaves your infrastructure
- Vendor dependency
- Limited customization

**Best for**: MVPs, low-volume production, non-sensitive data

### Option 2: Managed Cloud Services

Use cloud providers' AI platforms (Bedrock, Vertex AI, Azure AI).

**Architecture**:
```
Your App → Cloud Provider (Bedrock/Vertex) → Model → Response
```

**Pros**:
- Enterprise compliance (SOC2, HIPAA)
- Integration with cloud infrastructure
- Multiple models in one API
- Some cost optimization features

**Cons**:
- Higher complexity than direct API
- Cloud lock-in risk
- Still per-request pricing

**Best for**: Enterprise environments, regulated industries

### Option 3: Self-Managed Cloud

Deploy open models on cloud GPU instances.

**Architecture**:
```
Your App → Your Servers (vLLM/TGI) → Model → Response
```

**Pros**:
- Fixed costs (not per-request)
- Data stays on your infrastructure
- Full customization
- Fine-tuning possible

**Cons**:
- Infrastructure management overhead
- GPU availability challenges
- Need ML expertise
- Scaling complexity

**Best for**: High-volume workloads, privacy requirements, customization

### Option 4: On-Premises

Deploy on your own hardware.

**Architecture**:
```
Your App → Your Data Center → Model → Response
```

**Pros**:
- Complete control
- Air-gapped possible
- No cloud dependency
- Predictable costs (after hardware)

**Cons**:
- Capital expenditure (hardware)
- Physical infrastructure needs
- Longest setup time
- Maintenance responsibility

**Best for**: Maximum security, regulatory requirements, sovereign AI

### Deployment Decision Matrix

| Factor | API | Managed Cloud | Self-Cloud | On-Prem |
|--------|-----|---------------|------------|---------|
| Setup time | Hours | Days | Weeks | Months |
| Cost at low volume | $ | $$ | $$$ | $$$$ |
| Cost at high volume | $$$$ | $$$ | $ | $ |
| Data privacy | Low | Medium | High | Highest |
| Customization | None | Limited | Full | Full |
| Operational overhead | None | Low | Medium | High |

### Inference Optimization Techniques

Regardless of deployment, these techniques improve performance:

**Quantization**: Reduce model precision (FP16 → INT8 → INT4)
- 2-4x memory reduction
- 1.5-2x speed improvement
- Minor quality loss

**Batching**: Process multiple requests together
- Improves GPU utilization
- Increases latency for individual requests
- Best for non-real-time workloads

**Continuous Batching**: Dynamic request grouping
- Better than static batching
- vLLM's key innovation

**KV-Cache**: Reuse computed key-value pairs
- Accelerates generation
- Uses more memory

**Speculative Decoding**: Small model drafts, large model verifies
- 2-3x speedup possible
- Complex to implement

---

## 🎬 Video Script

**[INTRO - Deployment options diagram]**

Where you deploy AI matters as much as which models you use. Let me walk you through the options.

**[CUT TO: API-only architecture]**

Simplest: API-only. Your application calls OpenAI or Anthropic directly. No infrastructure. Automatic scaling. Latest models immediately. The trade-off: costs scale with usage, data leaves your infrastructure, and you're dependent on the provider.

**[CUT TO: Managed cloud diagram]**

Next level: managed cloud services. AWS Bedrock, Google Vertex AI, Azure AI. You get enterprise compliance, integration with your cloud stack, and access to multiple models. Still per-request pricing, but with enterprise features.

**[CUT TO: Self-managed cloud diagram]**

Self-managed cloud: you deploy open models on GPU instances you control. Fixed costs instead of per-request. Data stays on your infrastructure. You can fine-tune and customize. The trade-off: you need ML expertise and GPU infrastructure management.

**[CUT TO: On-premises diagram]**

Full on-premises: your hardware, your data center, complete control. Required for air-gapped environments or maximum security. Longest setup, highest capital expenditure, but no ongoing per-request costs.

**[CUT TO: Decision matrix]**

How to decide: For low volume and simple needs, APIs win—fast, cheap to start. For enterprises with compliance needs, managed cloud. For high volume or privacy requirements, self-managed. For maximum security, on-premises.

**[CUT TO: Optimization techniques]**

Optimization matters everywhere. Quantization reduces model size by 2-4x. Batching improves GPU utilization. Continuous batching—that's vLLM's innovation—handles dynamic request grouping.

**[CUT TO: Speaker on camera]**

Start with APIs for development and early production. As you scale, the math shifts toward self-managed. But don't optimize prematurely—deployment complexity has its own costs.

**[END - Runtime: 6:00]**

---

## 🔬 Interactive Lab: Deployment Planning

### Objective
Create a deployment plan for a specific workload.

### Part 1: Workload Analysis (20 minutes)

```python
class DeploymentPlanner:
    def __init__(self, workload):
        self.workload = workload
    
    def analyze(self):
        """Recommend deployment option based on workload characteristics"""
        
        # Scoring for each option
        options = {
            "API-Only": 0,
            "Managed Cloud": 0,
            "Self-Managed Cloud": 0,
            "On-Premises": 0,
        }
        
        # Volume analysis
        volume = self.workload.get("daily_requests", 0)
        if volume < 1000:
            options["API-Only"] += 3
            options["Managed Cloud"] += 1
        elif volume < 10000:
            options["Managed Cloud"] += 2
            options["API-Only"] += 1
        elif volume < 100000:
            options["Self-Managed Cloud"] += 3
            options["Managed Cloud"] += 1
        else:
            options["Self-Managed Cloud"] += 3
            options["On-Premises"] += 2
        
        # Privacy requirements
        privacy = self.workload.get("privacy_level", "low")
        if privacy == "low":
            options["API-Only"] += 2
        elif privacy == "medium":
            options["Managed Cloud"] += 2
        elif privacy == "high":
            options["Self-Managed Cloud"] += 3
        elif privacy == "maximum":
            options["On-Premises"] += 3
            options["Self-Managed Cloud"] += 1
        
        # Compliance requirements
        if self.workload.get("hipaa_required"):
            options["Managed Cloud"] += 2
            options["On-Premises"] += 2
            options["API-Only"] -= 2
        
        if self.workload.get("soc2_required"):
            options["Managed Cloud"] += 2
        
        # Customization needs
        if self.workload.get("needs_finetuning"):
            options["Self-Managed Cloud"] += 2
            options["On-Premises"] += 2
            options["API-Only"] -= 1
        
        # Team expertise
        expertise = self.workload.get("ml_expertise", "low")
        if expertise == "low":
            options["API-Only"] += 2
            options["Managed Cloud"] += 1
            options["Self-Managed Cloud"] -= 2
        elif expertise == "high":
            options["Self-Managed Cloud"] += 1
            options["On-Premises"] += 1
        
        # Sort by score
        sorted_options = sorted(options.items(), key=lambda x: x[1], reverse=True)
        
        return {
            "recommendation": sorted_options[0][0],
            "scores": dict(sorted_options),
            "workload": self.workload
        }

# Example workloads
workloads = [
    {
        "name": "Startup ChatBot MVP",
        "daily_requests": 500,
        "privacy_level": "low",
        "ml_expertise": "low",
    },
    {
        "name": "Healthcare Document Analysis",
        "daily_requests": 5000,
        "privacy_level": "high",
        "hipaa_required": True,
        "ml_expertise": "medium",
    },
    {
        "name": "Enterprise Support Platform",
        "daily_requests": 50000,
        "privacy_level": "medium",
        "soc2_required": True,
        "needs_finetuning": True,
        "ml_expertise": "high",
    },
]

print("Deployment Recommendations")
print("=" * 60)
for workload in workloads:
    planner = DeploymentPlanner(workload)
    result = planner.analyze()
    print(f"\n📋 {workload['name']}")
    print(f"   Recommendation: {result['recommendation']}")
    print(f"   Scores: {result['scores']}")
```

### Part 2: Cost Projection (15 minutes)

```python
def project_costs(deployment, workload, months=12):
    """Project costs for each deployment option"""
    
    daily_requests = workload.get("daily_requests", 1000)
    avg_cost_per_request = 0.01  # Average API cost
    
    projections = {}
    
    # API-Only
    api_monthly = daily_requests * 30 * avg_cost_per_request
    projections["API-Only"] = {
        "setup": 0,
        "monthly": api_monthly,
        "total_12mo": api_monthly * months,
        "trend": "scales linearly"
    }
    
    # Managed Cloud (slightly cheaper + setup)
    managed_monthly = daily_requests * 30 * avg_cost_per_request * 0.85
    projections["Managed Cloud"] = {
        "setup": 5000,
        "monthly": managed_monthly,
        "total_12mo": 5000 + managed_monthly * months,
        "trend": "scales linearly, better discounts at volume"
    }
    
    # Self-Managed Cloud (fixed-ish)
    if daily_requests < 10000:
        gpu_monthly = 1500  # 1 GPU
    elif daily_requests < 50000:
        gpu_monthly = 4000  # 2-3 GPUs
    else:
        gpu_monthly = 10000  # Cluster
    
    projections["Self-Managed Cloud"] = {
        "setup": 20000,  # Setup, training, etc.
        "monthly": gpu_monthly,
        "total_12mo": 20000 + gpu_monthly * months,
        "trend": "fixed until capacity exceeded"
    }
    
    # On-Premises
    hardware = 150000  # Example: GPU cluster
    ops_monthly = 5000   # Operations
    projections["On-Premises"] = {
        "setup": hardware,
        "monthly": ops_monthly,
        "total_12mo": hardware + ops_monthly * months,
        "trend": "high upfront, low ongoing"
    }
    
    return projections

# Project for high-volume workload
workload = {"name": "Scale Platform", "daily_requests": 50000}
projections = project_costs(None, workload)

print(f"\nCost Projections: {workload['name']}")
print(f"Volume: {workload['daily_requests']:,} requests/day")
print("=" * 60)

for option, costs in projections.items():
    print(f"\n{option}:")
    print(f"  Setup: ${costs['setup']:,}")
    print(f"  Monthly: ${costs['monthly']:,}")
    print(f"  12-Month Total: ${costs['total_12mo']:,}")
```

### Submission
Create a deployment plan for a real or hypothetical workload in your organization.

---

## ✅ Knowledge Check

### Question 1
Which deployment option has the lowest setup time?

A) On-Premises  
B) Self-Managed Cloud  
C) API-Only  
D) Managed Cloud  

**Correct Answer**: C

**Explanation**: API-Only deployment can be set up in hours—just get an API key and start making requests. No infrastructure required.

---

### Question 2
For HIPAA-compliant applications, which options are most suitable?

A) API-Only only  
B) Managed Cloud (with compliance features) or On-Premises  
C) Self-Managed Cloud only  
D) Any option works equally  

**Correct Answer**: B

**Explanation**: HIPAA compliance requires specific controls. Managed cloud services (like AWS HIPAA-eligible services) or on-premises deployment provide the necessary compliance features.

---

### Question 3
What is the main innovation of vLLM for inference?

A) Larger context windows  
B) Continuous batching with PagedAttention  
C) Better model quality  
D) Cheaper hosting  

**Correct Answer**: B

**Explanation**: vLLM's key innovations are PagedAttention for efficient memory management and continuous batching for handling dynamic request grouping—dramatically improving inference efficiency.

---

*Congratulations on completing Unit 5! You now have a comprehensive understanding of the AI landscape—providers, tools, and deployment options.*
