# Lesson 4.3: When NOT to Use AI

> **Duration**: 45 minutes | **Type**: Practical/Risk-Focused
> **Unit**: 4 - The AI-Native Mindset

---

## 📚 Reading Material

### The Cost of AI Misapplication

The most expensive AI projects aren't the ones that fail technically—they're the ones that succeed technically but shouldn't have been built at all.

### Red Flags: Stop and Reconsider

**🚩 Flag 1: No Ground Truth**
If you can't measure whether AI is right, don't deploy it.

```
Bad: "AI should make customers happier"
Good: "AI should resolve 80% of L1 tickets with ≥4/5 satisfaction"
```

**🚩 Flag 2: Insufficient Data**
Small datasets lead to unreliable models.

- **Classification**: Need 100+ examples per class minimum
- **Generation/Fine-tuning**: Need thousands of examples
- **Edge cases**: Need explicit coverage

**🚩 Flag 3: High-Stakes Irreversible Decisions**
When mistakes can't be undone:
- Medical treatment decisions
- Criminal sentencing
- Financial loan approvals (sole decision maker)
- Safety-critical systems

**🚩 Flag 4: Legal/Regulatory Prohibition**
Some domains explicitly require human decision-makers:
- GDPR: Right to human review of automated decisions
- Healthcare: Certain diagnoses require licensed physicians
- Legal: Practice of law requires bar admission
- Financial: Fiduciary duties

**🚩 Flag 5: Adversarial Environment**
When users actively try to exploit AI:
- Security systems (attackers probe for weaknesses)
- Fraud detection (fraudsters learn to evade)
- Content moderation (bad actors adapt)

AI can help, but needs constant human oversight.

### Failure Modes to Watch For

**Failure Mode 1: Hallucination**
AI confidently generates false information.

*Example*: Legal AI citing non-existent cases
*Mitigation*: Verification systems, RAG over trusted sources

**Failure Mode 2: Distribution Shift**
Model trained on historical data fails on new patterns.

*Example*: COVID-19 broke many demand forecasting models
*Mitigation*: Monitoring, regular retraining

**Failure Mode 3: Specification Gaming**
AI optimizes the metric, not the intent.

*Example*: Recommendation AI maximizing engagement, not user benefit
*Mitigation*: Multiple metrics, human oversight

**Failure Mode 4: Automation Bias**
Humans over-trust AI recommendations.

*Example*: Humans rubber-stamp AI decisions without review
*Mitigation*: Friction in process, spot checks

**Failure Mode 5: Amplified Bias**
AI learns and scales existing biases.

*Example*: Hiring AI learns biased patterns from historical data
*Mitigation*: Bias audits, diverse training data

### The Decision Framework

```
Should we use AI? Ask:

1. Can we measure success objectively?
   No → STOP

2. Do we have sufficient, representative data?
   No → STOP (or start collecting)

3. Are errors bounded and recoverable?
   No → Extreme caution, human oversight required

4. Is there legal/regulatory clearance?
   No → STOP

5. Have we audited for bias and fairness?
   No → Do it first

6. Is there a human escalation path?
   No → Build one

Only if ALL yes → Proceed with appropriate oversight
```

### Case Studies: When AI Went Wrong

**Case 1: Amazon's Recruiting AI (2018)**
- Task: Screen resumes for technical roles
- Problem: Trained on 10 years of (male-dominated) hiring data
- Result: Penalized resumes with "women's" indicators
- Lesson: Historical data encodes historical biases

**Case 2: Healthcare Algorithms (2019)**
- Task: Identify high-risk patients for care management
- Problem: Used healthcare costs as proxy for health needs
- Result: Systematically underserved Black patients (who had lower costs due to access barriers)
- Lesson: Proxy metrics can embed systemic inequalities

**Case 3: ChatGPT in Legal Brief (2023)**
- Task: Lawyer used ChatGPT to research case law
- Problem: ChatGPT hallucinated fake cases
- Result: Lawyer sanctioned for citing non-existent precedents
- Lesson: AI-generated content in high-stakes domains requires verification

---

## 🎬 Video Script

**[INTRO - Warning sign animation]**

Knowing when NOT to use AI is as important as knowing when to use it. Let me walk you through the red flags.

**[CUT TO: Red flag 1]**

Red flag one: no ground truth. If you can't measure whether AI is getting it right, don't deploy it. "Make customers happier" isn't measurable. "Resolve 80% of tickets with 4+ satisfaction" is.

**[CUT TO: Red flag 2]**

Red flag two: insufficient data. Classification needs at least 100 examples per class. Fine-tuning needs thousands. And you need coverage of edge cases. If you don't have the data, stop.

**[CUT TO: Red flag 3]**

Red flag three: irreversible high-stakes decisions. Medical treatment. Criminal sentencing. Loan approvals when AI is the sole decision maker. When mistakes can't be undone and lives are affected, AI should inform, not decide.

**[CUT TO: Red flag 4]**

Red flag four: legal prohibition. GDPR gives people the right to human review of automated decisions. Healthcare, legal, and financial domains often require licensed humans. Check regulations first.

**[CUT TO: Red flag 5]**

Red flag five: adversarial environment. When bad actors actively try to game your AI—fraud, security, content moderation—the model is always being probed for weaknesses. AI helps, but humans must monitor constantly.

**[CUT TO: Failure modes diagram]**

Know the failure modes. Hallucination—AI confidently making things up. Distribution shift—the world changes and your model doesn't. Specification gaming—optimizing the metric instead of the goal. Automation bias—humans over-trusting AI.

**[CUT TO: Case study montage]**

Real failures teach us. Amazon's recruiting AI learned gender bias from historical hiring. A healthcare algorithm systematically underserved Black patients because costs were a biased proxy. A lawyer was sanctioned for citing fake cases that ChatGPT invented.

**[CUT TO: Speaker on camera]**

The lesson isn't "don't use AI." It's use it with eyes open. Measure success objectively. Have enough data. Keep errors bounded. Check regulations. Audit for bias. Always have a human escalation path.

**[END - Runtime: 6:15]**

---

## 🔬 Interactive Lab: Risk Assessment

### Objective
Develop skills to identify AI-inappropriate use cases.

### Part 1: Red Flag Detection (20 minutes)

```python
class AIRiskAssessment:
    """Assess risks of AI application"""
    
    def __init__(self, use_case):
        self.use_case = use_case
        self.red_flags = []
        self.yellow_flags = []
    
    def check_ground_truth(self, can_measure_success):
        if not can_measure_success:
            self.red_flags.append("🚩 Cannot measure success objectively")
        return self
    
    def check_data_sufficiency(self, examples_available, classes=1):
        min_required = 100 * classes
        if examples_available < min_required:
            self.red_flags.append(f"🚩 Insufficient data ({examples_available} < {min_required} needed)")
        elif examples_available < min_required * 3:
            self.yellow_flags.append(f"⚠️ Data on lower end ({examples_available} examples)")
        return self
    
    def check_stakes(self, irreversible, high_impact):
        if irreversible and high_impact:
            self.red_flags.append("🚩 High-stakes irreversible decisions")
        elif irreversible or high_impact:
            self.yellow_flags.append("⚠️ Elevated stakes - require oversight")
        return self
    
    def check_regulatory(self, regulated_domain, human_required):
        if human_required:
            self.red_flags.append("🚩 Regulations require human decision-maker")
        elif regulated_domain:
            self.yellow_flags.append("⚠️ Regulated domain - legal review recommended")
        return self
    
    def check_adversarial(self, users_may_exploit):
        if users_may_exploit:
            self.yellow_flags.append("⚠️ Adversarial environment - continuous monitoring needed")
        return self
    
    def check_bias_risk(self, sensitive_attributes, historical_data):
        if sensitive_attributes and historical_data:
            self.yellow_flags.append("⚠️ Bias risk - audit required before deployment")
        return self
    
    def get_recommendation(self):
        if len(self.red_flags) > 0:
            return "❌ DO NOT PROCEED - Address red flags first"
        elif len(self.yellow_flags) >= 3:
            return "⚠️ PROCEED WITH CAUTION - Significant mitigation needed"
        elif len(self.yellow_flags) > 0:
            return "✅ PROCEED WITH OVERSIGHT - Address yellow flags"
        else:
            return "✅ PROCEED - Low risk identified"
    
    def report(self):
        print(f"\n{'='*60}")
        print(f"AI Risk Assessment: {self.use_case}")
        print(f"{'='*60}")
        
        if self.red_flags:
            print("\n🚩 RED FLAGS (Blocking):")
            for flag in self.red_flags:
                print(f"  {flag}")
        
        if self.yellow_flags:
            print("\n⚠️ YELLOW FLAGS (Mitigate):")
            for flag in self.yellow_flags:
                print(f"  {flag}")
        
        if not self.red_flags and not self.yellow_flags:
            print("\n✅ No significant flags identified")
        
        print(f"\n📋 RECOMMENDATION: {self.get_recommendation()}")

# Test cases
print("=" * 60)
print("USE CASE 1: Customer Email Classification")
print("=" * 60)
assessment1 = AIRiskAssessment("Customer Email Classification")
(assessment1
    .check_ground_truth(can_measure_success=True)
    .check_data_sufficiency(examples_available=10000, classes=5)
    .check_stakes(irreversible=False, high_impact=False)
    .check_regulatory(regulated_domain=False, human_required=False)
    .check_adversarial(users_may_exploit=False)
    .report())

print("\n" + "=" * 60)
print("USE CASE 2: Medical Diagnosis AI")
print("=" * 60)
assessment2 = AIRiskAssessment("Medical Diagnosis AI")
(assessment2
    .check_ground_truth(can_measure_success=True)
    .check_data_sufficiency(examples_available=5000, classes=20)
    .check_stakes(irreversible=True, high_impact=True)
    .check_regulatory(regulated_domain=True, human_required=True)
    .check_bias_risk(sensitive_attributes=True, historical_data=True)
    .report())

print("\n" + "=" * 60)
print("USE CASE 3: Resume Screening")
print("=" * 60)
assessment3 = AIRiskAssessment("Resume Screening for Hiring")
(assessment3
    .check_ground_truth(can_measure_success=True)
    .check_data_sufficiency(examples_available=800, classes=1)
    .check_stakes(irreversible=False, high_impact=True)
    .check_regulatory(regulated_domain=True, human_required=False)
    .check_bias_risk(sensitive_attributes=True, historical_data=True)
    .report())
```

### Part 2: Failure Mode Analysis (20 minutes)

```python
def analyze_failure_modes(use_case_details):
    """Analyze potential failure modes for a use case"""
    
    failure_modes = []
    
    # Check for hallucination risk
    if use_case_details.get("factual_claims"):
        failure_modes.append({
            "mode": "Hallucination",
            "risk": "HIGH" if not use_case_details.get("verification_system") else "MEDIUM",
            "mitigation": "Implement fact-checking or RAG over verified sources"
        })
    
    # Check for distribution shift
    if use_case_details.get("time_sensitive_patterns"):
        failure_modes.append({
            "mode": "Distribution Shift",
            "risk": "HIGH" if not use_case_details.get("continuous_monitoring") else "MEDIUM",
            "mitigation": "Regular model retraining and drift monitoring"
        })
    
    # Check for specification gaming
    if use_case_details.get("single_metric_optimization"):
        failure_modes.append({
            "mode": "Specification Gaming",
            "risk": "MEDIUM",
            "mitigation": "Multiple metrics, human review of edge cases"
        })
    
    # Check for automation bias
    if use_case_details.get("human_in_loop"):
        failure_modes.append({
            "mode": "Automation Bias",
            "risk": "MEDIUM" if use_case_details.get("friction_in_approval") else "HIGH",
            "mitigation": "Add friction to approval, random spot checks"
        })
    
    # Check for bias amplification
    if use_case_details.get("sensitive_decisions"):
        failure_modes.append({
            "mode": "Bias Amplification",
            "risk": "HIGH" if not use_case_details.get("bias_audited") else "LOW",
            "mitigation": "Regular bias audits, diverse training data"
        })
    
    return failure_modes

# Example analysis
content_moderation = {
    "name": "Content Moderation AI",
    "factual_claims": False,
    "time_sensitive_patterns": True,
    "single_metric_optimization": True,
    "human_in_loop": True,
    "friction_in_approval": False,
    "sensitive_decisions": True,
    "bias_audited": False,
}

modes = analyze_failure_modes(content_moderation)
print(f"\nFailure Mode Analysis: {content_moderation['name']}")
print("=" * 60)
for mode in modes:
    print(f"\n{mode['mode']} ({mode['risk']} RISK)")
    print(f"  Mitigation: {mode['mitigation']}")
```

### Submission
Conduct a full risk assessment for an AI use case in your organization.

---

## ✅ Knowledge Check

### Question 1
What is the first question in the "Should we use AI?" decision framework?

A) Do we have enough data?  
B) Can we measure success objectively?  
C) Is AI cheaper than humans?  
D) Do competitors use AI?  

**Correct Answer**: B

**Explanation**: If you can't measure whether AI is succeeding, you cannot evaluate or improve it. Objective success measurement is the foundational requirement.

---

### Question 2
What happened with Amazon's recruiting AI that led to its discontinuation?

A) It was too slow  
B) It learned gender bias from historical hiring data  
C) It was too expensive  
D) It didn't find enough candidates  

**Correct Answer**: B

**Explanation**: The AI was trained on 10 years of hiring data that reflected male-dominated hiring patterns. It learned to penalize resumes with indicators associated with women.

---

### Question 3
What is "distribution shift" in the context of AI failure modes?

A) Moving data to different servers  
B) The world changes and the model's training data no longer matches reality  
C) Shifting model parameters  
D) Distributing AI across regions  

**Correct Answer**: B

**Explanation**: Distribution shift occurs when the patterns in production differ from training patterns. COVID-19 breaking demand forecasting models is a classic example—historical patterns became irrelevant.

---

### Question 4
Which of these is a red flag that should STOP AI development?

A) High volume of tasks  
B) Available training data  
C) Legal requirement for human decision-makers  
D) Clear success metrics  

**Correct Answer**: C

**Explanation**: If regulations require human decision-makers (GDPR, healthcare, legal domains), AI cannot be the sole decision authority. This is a blocking red flag.

---

*You've completed Lesson 4.3! You can now identify when AI is not appropriate and assess risks before deployment.*
