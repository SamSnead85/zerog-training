# Lesson 4.2: A/B Testing Models

> **Duration**: 50 minutes | **Type**: Practical
> **Unit**: 4 - Evaluation & Deployment

---

## 📚 Reading Material

### A/B Test Setup

```python
class ModelABTest:
    def __init__(self, control_model, treatment_model, traffic_split=0.1):
        self.control = control_model
        self.treatment = treatment_model
        self.split = traffic_split
        self.results = {"control": [], "treatment": []}
    
    def get_model(self, user_id):
        if hash(user_id) % 100 < self.split * 100:
            return "treatment", self.treatment
        return "control", self.control
    
    def record(self, group, success):
        self.results[group].append(success)
    
    def analyze(self):
        ctrl = self.results["control"]
        treat = self.results["treatment"]
        
        return {
            "control": {"n": len(ctrl), "rate": mean(ctrl)},
            "treatment": {"n": len(treat), "rate": mean(treat)}
        }
```

### Statistical Significance

```python
from scipy import stats

def is_significant(control, treatment, alpha=0.05):
    t_stat, p_value = stats.ttest_ind(control, treatment)
    return p_value < alpha

# Run test
if is_significant(results["control"], results["treatment"]):
    print("Treatment is significantly different")
```

### Gradual Rollout

```python
# Start: 5% treatment
# Day 1-3: Monitor metrics
# Happy: Increase to 20%
# Day 4-7: Monitor
# Happy: Increase to 50%
# Week 2: Full rollout or rollback
```

---

## 🎬 Video Script

**[INTRO - A/B diagram]**

Offline evaluation isn't enough. A/B test with real users to validate improvements.

**[CUT TO: Setup]**

Split traffic: small percentage to fine-tuned model. Track success metrics for each group.

**[CUT TO: Statistical significance]**

Don't declare winner too early. Wait for statistical significance. Avoid false positives.

**[CUT TO: Gradual rollout]**

Start small—5%. Monitor closely. Increase gradually. Roll back if issues appear.

**[END - Runtime: 4:00]**

---

## ✅ Knowledge Check

### Question 1
Why use gradual rollout for model changes?

A) Faster  
B) Limits blast radius if model has issues  
C) Cheaper  
D) Required by regulation  

**Correct Answer**: B
