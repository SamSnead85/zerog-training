# Lesson 4.3: Deployment Strategies

> **Duration**: 55 minutes | **Type**: Production
> **Unit**: 4 - Evaluation & Deployment

---

## 📚 Reading Material

### OpenAI Deployment

Already deployed:
```python
# Your model is live the moment training completes
model_id = "ft:gpt-4o-mini:my-org:my-model:abc123"
response = client.chat.completions.create(model=model_id, ...)
```

### Self-Hosted Deployment

```python
# Using vLLM for inference
from vllm import LLM, SamplingParams

llm = LLM(model="./my-fine-tuned-model")
params = SamplingParams(temperature=0.7, max_tokens=100)

outputs = llm.generate(prompts, params)
```

### Model Versioning

```python
class ModelRegistry:
    def __init__(self):
        self.models = {}
        self.active = None
    
    def register(self, name, model_id, metadata):
        self.models[name] = {
            "id": model_id,
            "created": datetime.now(),
            "metadata": metadata
        }
    
    def set_active(self, name):
        self.active = name
    
    def get_active(self):
        return self.models[self.active]["id"]
```

### Monitoring

Track in production:
- Latency per request
- Token usage/costs
- Error rates
- User feedback
- Output quality samples

---

## 🎬 Video Script

**[INTRO - Deployment options]**

You've trained a model. Now deploy it safely.

**[CUT TO: OpenAI]**

OpenAI models are already deployed. Just use your model ID.

**[CUT TO: Self-hosted]**

Self-hosted needs infrastructure. vLLM for efficient inference. Consider latency and scaling.

**[CUT TO: Versioning]**

Version your models. Track which is active. Easy rollback if needed.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
What should you monitor in production?

A) Just errors  
B) Latency, costs, error rates, user feedback, and output quality  
C) Only token counts  
D) Nothing after deployment  

**Correct Answer**: B

---

*Congratulations on completing Module 5: Fine-Tuning!*
