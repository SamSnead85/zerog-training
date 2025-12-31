# Lesson 4.4: AI-First Problem Decomposition

> **Duration**: 55 minutes | **Type**: Strategic/Hands-On
> **Unit**: 4 - The AI-Native Mindset

---

## 📚 Reading Material

### The Art of Breaking Down Problems

AI works best on focused, well-defined tasks. Complex problems must be decomposed into components that AI can handle effectively.

### The Decomposition Process

**Step 1: Map the End-to-End Process**
Document every step from initial input to final output.

**Step 2: Classify Each Step**
For each step, determine:
- Can AI do this? (Tier 1-4 from Lesson 4.2)
- Human required? (From Lesson 4.3)
- Integration points?

**Step 3: Design Handoffs**
Define how work flows between:
- AI components
- Human reviewers
- External systems

**Step 4: Build Orchestration**
Create the "conductor" that coordinates:
- Routing logic
- Error handling
- Quality gates

### Example: Customer Complaint Resolution

**Traditional Process**:
```
Customer complaint → Agent reads → Research → Response → Review → Send
```

**AI-Native Decomposition**:
```
1. INTAKE (AI) 
   → Extract: customer info, product, issue type
   → Sentiment analysis
   → Priority scoring

2. CLASSIFICATION (AI)
   → Intent classification
   → Route to workflow
   → Look up relevant policies

3. RESPONSE GENERATION (AI)
   → Draft response based on policy
   → Personalize for customer
   → Include action items

4. QUALITY CHECK (AI + Human)
   → AI checks: policy compliance, tone, completeness
   → High-risk: human review
   → Low-risk: auto-approve

5. DELIVERY (AI)
   → Send response
   → Update CRM
   → Schedule follow-up if needed

6. LEARNING (AI)
   → Track resolution success
   → Update training data
   → Flag patterns
```

**Result**: 80% handled by AI, 20% escalated to humans for complex cases.

### The Chain Pattern

Many AI applications are **chains**—sequences of AI steps:

```python
# Chain pattern example
def process_document(document):
    # Step 1: Extract text
    text = ocr_model.extract(document)
    
    # Step 2: Classify document type
    doc_type = classifier.classify(text)
    
    # Step 3: Extract relevant fields
    fields = extractor.extract(text, schema=doc_type)
    
    # Step 4: Validate
    is_valid, issues = validator.check(fields)
    
    # Step 5: Route based on confidence
    if is_valid and all(f.confidence > 0.9 for f in fields):
        return auto_process(fields)
    else:
        return queue_for_review(fields, issues)
```

### The Agent Pattern

For tasks requiring dynamic decision-making, use **agents**:

```python
# Agent pattern (conceptual)
def agent_loop(task):
    while not task.is_complete():
        # Observe current state
        observation = gather_info(task)
        
        # Think: what should I do next?
        action = llm.decide_next_action(
            task=task,
            observation=observation,
            available_tools=TOOLS
        )
        
        # Act: execute the action
        result = execute_action(action)
        
        # Update task state
        task.update(result)
    
    return task.result
```

### The Router Pattern

For handling diverse inputs, use **routers**:

```python
def intelligent_router(query):
    # Classify query type
    query_type = llm.classify(
        query,
        categories=["sales", "support", "billing", "technical", "other"]
    )
    
    # Route to appropriate handler
    handlers = {
        "sales": sales_ai,
        "support": support_ai,
        "billing": billing_system,  # Traditional system
        "technical": tech_ai,
        "other": human_queue
    }
    
    return handlers[query_type].handle(query)
```

### Orchestration Frameworks

Modern orchestration tools:

| Tool | Type | Best For |
|------|------|----------|
| **LangChain** | Chain/Agent | Prototyping, versatility |
| **LangGraph** | Graph-based | Complex workflows |
| **CrewAI** | Multi-agent | Collaborative AI teams |
| **AutoGen** | Conversational | Agent conversations |
| **Temporal** | Workflow engine | Production reliability |

### Error Handling at Each Step

Every step needs:
1. **Confidence thresholds**: When to escalate
2. **Fallback paths**: What to do when AI fails
3. **Retry logic**: Transient failure handling
4. **Logging**: For debugging and improvement

```python
def robust_ai_step(input_data, ai_function, confidence_threshold=0.8):
    try:
        result, confidence = ai_function(input_data)
        
        if confidence < confidence_threshold:
            return escalate_to_human(input_data, result)
        
        return result
        
    except AIError as e:
        log_error(e)
        return fallback_response(input_data)
```

---

## 🎬 Video Script

**[INTRO - Complex flowchart simplifying]**

Complex problems don't fit neatly into AI. You need to break them down. Let me show you how.

**[CUT TO: Four-step process]**

Decomposition is four steps. First, map the entire process from input to output. Second, classify each step—can AI do it, does it need humans? Third, design hand-offs between components. Fourth, build orchestration to coordinate everything.

**[CUT TO: Customer complaint example]**

Let's decompose customer complaint resolution. Traditionally: agent reads complaint, researches, writes response, gets reviewed, sends.

AI-native: AI extracts information and classifies. AI drafts response based on policy. AI checks quality—high risk goes to humans, low risk auto-approves. AI sends and tracks success.

Result: 80% handled automatically, 20% escalated.

**[CUT TO: Chain pattern code]**

The simplest pattern is a chain. AI steps in sequence. OCR extracts text. Classifier determines document type. Extractor pulls fields. Validator checks. Router decides: auto-process or human review.

**[CUT TO: Agent pattern diagram]**

For dynamic tasks, use agents. They observe, decide, act, update. Tools like LangGraph and CrewAI help build these.

**[CUT TO: Router pattern]**

For diverse inputs, use routers. Classify the input type, route to the right handler. Sales queries go to sales AI. Technical queries to tech AI. Edge cases to humans.

**[CUT TO: Error handling code]**

Every step needs error handling. Confidence thresholds—when to escalate. Fallback paths—what to do when AI fails. Logging—for debugging. Without this, your system is fragile.

**[CUT TO: Speaker on camera]**

The key insight: don't try to make AI do everything at once. Break the problem down. Let AI handle the parts it excels at. Keep humans for judgment and exceptions. Orchestrate the whole thing reliably.

**[END - Runtime: 6:55]**

---

## 🔬 Interactive Lab: Process Decomposition

### Objective
Decompose a real business process for AI-native implementation.

### Part 1: Process Mapping (20 minutes)

```python
class ProcessStep:
    def __init__(self, name, description, 
                 ai_suitable=None, human_required=False,
                 confidence_check=False, fallback=None):
        self.name = name
        self.description = description
        self.ai_suitable = ai_suitable  # None means not assessed
        self.human_required = human_required
        self.confidence_check = confidence_check
        self.fallback = fallback

class ProcessDecomposition:
    def __init__(self, process_name):
        self.process_name = process_name
        self.steps = []
        
    def add_step(self, step):
        self.steps.append(step)
        return self
    
    def visualize(self):
        print(f"\n{'='*60}")
        print(f"Process: {self.process_name}")
        print(f"{'='*60}")
        
        for i, step in enumerate(self.steps, 1):
            owner = "🤖 AI" if step.ai_suitable else "👤 Human" if step.human_required else "❓ TBD"
            confidence = "✓ Check" if step.confidence_check else ""
            fallback = f" → {step.fallback}" if step.fallback else ""
            
            print(f"\n{i}. [{owner}] {step.name}")
            print(f"   {step.description}")
            if confidence:
                print(f"   {confidence}{fallback}")
    
    def calculate_automation(self):
        ai_steps = sum(1 for s in self.steps if s.ai_suitable)
        total = len(self.steps)
        return {
            "total_steps": total,
            "ai_steps": ai_steps,
            "human_steps": total - ai_steps,
            "automation_rate": ai_steps / total if total > 0 else 0
        }

# Example: Invoice Processing
invoice_process = ProcessDecomposition("Invoice Processing")

(invoice_process
    .add_step(ProcessStep(
        "Receive Invoice",
        "Accept invoice via email, upload, or EDI",
        ai_suitable=True
    ))
    .add_step(ProcessStep(
        "OCR/Extract Data",
        "Extract vendor, amounts, line items, dates",
        ai_suitable=True,
        confidence_check=True,
        fallback="Human data entry"
    ))
    .add_step(ProcessStep(
        "Validate Fields",
        "Check required fields, format validation",
        ai_suitable=True
    ))
    .add_step(ProcessStep(
        "Match to Purchase Order",
        "Find corresponding PO, verify quantities",
        ai_suitable=True,
        confidence_check=True,
        fallback="Human matching"
    ))
    .add_step(ProcessStep(
        "3-Way Match",
        "Compare PO, Receipt, Invoice amounts",
        ai_suitable=True
    ))
    .add_step(ProcessStep(
        "Flag Discrepancies",
        "Identify mismatches beyond tolerance",
        ai_suitable=True
    ))
    .add_step(ProcessStep(
        "Approve Payment",
        "Final authorization for payment",
        human_required=True,
        ai_suitable=False
    ))
    .add_step(ProcessStep(
        "Handle Exceptions",
        "Resolve discrepancies, contact vendors",
        human_required=True,
        ai_suitable=False
    ))
)

invoice_process.visualize()
metrics = invoice_process.calculate_automation()
print(f"\n📊 Automation Potential:")
print(f"   AI Steps: {metrics['ai_steps']}/{metrics['total_steps']}")
print(f"   Rate: {metrics['automation_rate']:.0%}")
```

### Part 2: Build a Chain (25 minutes)

```python
from typing import Dict, Any, List
from enum import Enum

class StepResult(Enum):
    SUCCESS = "success"
    NEEDS_REVIEW = "needs_review"
    FAILED = "failed"

class ChainStep:
    def __init__(self, name, executor, confidence_threshold=0.8):
        self.name = name
        self.executor = executor
        self.confidence_threshold = confidence_threshold
    
    def run(self, input_data):
        try:
            result = self.executor(input_data)
            
            confidence = result.get("confidence", 1.0)
            
            if confidence < self.confidence_threshold:
                return {
                    "status": StepResult.NEEDS_REVIEW,
                    "result": result,
                    "step": self.name
                }
            
            return {
                "status": StepResult.SUCCESS,
                "result": result,
                "step": self.name
            }
        except Exception as e:
            return {
                "status": StepResult.FAILED,
                "error": str(e),
                "step": self.name
            }

class ProcessingChain:
    def __init__(self):
        self.steps: List[ChainStep] = []
        self.execution_log = []
    
    def add_step(self, step: ChainStep):
        self.steps.append(step)
        return self
    
    def run(self, initial_input):
        current_data = initial_input
        
        for step in self.steps:
            print(f"Running: {step.name}...")
            
            result = step.run(current_data)
            self.execution_log.append(result)
            
            if result["status"] != StepResult.SUCCESS:
                print(f"  → {result['status'].value}")
                return {
                    "completed": False,
                    "stopped_at": step.name,
                    "reason": result["status"],
                    "data": result
                }
            
            current_data = result["result"]
            print(f"  → Success (confidence: {current_data.get('confidence', 'N/A')})")
        
        return {
            "completed": True,
            "final_result": current_data
        }

# Build example chain with mock executors
def mock_extract(data):
    return {
        "text": "Invoice #12345 from Acme Corp, Total: $1,234.56",
        "confidence": 0.95
    }

def mock_classify(data):
    return {
        "document_type": "invoice",
        "vendor": "Acme Corp",
        "confidence": 0.92
    }

def mock_extract_fields(data):
    return {
        "invoice_number": "12345",
        "vendor": data["vendor"],
        "total": 1234.56,
        "confidence": 0.88
    }

def mock_validate(data):
    is_valid = data.get("total", 0) > 0
    return {
        **data,
        "valid": is_valid,
        "confidence": 0.95
    }

# Build and run chain
chain = ProcessingChain()
(chain
    .add_step(ChainStep("Extract Text", mock_extract))
    .add_step(ChainStep("Classify Document", mock_classify))
    .add_step(ChainStep("Extract Fields", mock_extract_fields))
    .add_step(ChainStep("Validate", mock_validate))
)

result = chain.run({"raw_document": "binary_data"})
print(f"\n📋 Final Result:")
print(f"   Completed: {result['completed']}")
if result['completed']:
    print(f"   Data: {result['final_result']}")
```

### Submission
Decompose a process from your work and implement a processing chain.

---

## ✅ Knowledge Check

### Question 1
What is the first step in AI-first problem decomposition?

A) Build the AI model  
B) Map the end-to-end process  
C) Deploy to production  
D) Choose an AI vendor  

**Correct Answer**: B

**Explanation**: Before you can decide what to automate, you must understand the complete process. Mapping every step from input to output is the foundation of decomposition.

---

### Question 2
What is the "chain" pattern in AI orchestration?

A) Connecting AI to blockchain  
B) A sequence of AI steps where output flows to the next step  
C) A single large AI model  
D) Chaining together human workers  

**Correct Answer**: B

**Explanation**: The chain pattern sequences AI operations, with each step's output becoming the next step's input: extract → classify → extract fields → validate → route.

---

### Question 3
What should you do when an AI step has low confidence?

A) Ignore it and continue  
B) Escalate to human review  
C) Retry infinitely  
D) Skip the step  

**Correct Answer**: B

**Explanation**: Low confidence indicates the AI is uncertain. Escalating to human review ensures quality when AI is not confident in its output.

---

### Question 4
Which orchestration pattern is best for tasks with dynamic decision-making?

A) Chain  
B) Router  
C) Agent  
D) Pipeline  

**Correct Answer**: C

**Explanation**: The agent pattern uses observe-decide-act loops for dynamic decision-making. Agents can adapt their behavior based on observations, unlike fixed chains.

---

*You've completed Lesson 4.4! You can now decompose complex problems into AI-suitable components.*
