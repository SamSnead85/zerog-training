# Lesson 2.5: Prompt Chaining

> **Duration**: 60 minutes | **Type**: Technique
> **Unit**: 2 - Advanced Prompting Techniques

---

## 📚 Reading Material

### Why Chain Prompts?

Complex tasks often can't be solved in a single prompt. **Prompt chaining** breaks tasks into steps, where each prompt's output becomes the next prompt's input.

**Single prompt limitations**:
- Context gets overwhelmed
- Instructions compete
- Hard to debug errors
- Quality degrades for complex tasks

**Chained approach**:
```
Prompt 1 → Output 1 → Prompt 2 → Output 2 → Final Result
```

### Chain Patterns

**Sequential Chain**:
Step by step, each builds on the last.
```
[Extract entities] → [Classify sentiment] → [Generate response]
```

**Branching Chain**:
Route based on classification.
```
[Classify] → Simple? → [Simple handler]
           → Complex? → [Complex handler]
```

**Aggregation Chain**:
Parallel steps, then combine.
```
[Analyze A] →
[Analyze B] → [Synthesize]
[Analyze C] →
```

### Basic Chain Implementation

```python
def chain_prompts(initial_input, steps):
    """Execute a sequence of prompts"""
    current_data = initial_input
    
    for step in steps:
        prompt = step["prompt_template"].format(input=current_data)
        
        response = llm.generate(prompt)
        
        if step.get("parser"):
            current_data = step["parser"](response)
        else:
            current_data = response
        
        # Optional: validation
        if step.get("validator"):
            if not step["validator"](current_data):
                raise ValueError(f"Step {step['name']} validation failed")
    
    return current_data
```

### Example: Document Analysis Chain

**Step 1: Extract key information**
```
Extract the key facts from this document:
{input}

Return as JSON: {{"facts": [list of facts]}}
```

**Step 2: Identify themes**
```
Given these facts:
{input}

Identify 3-5 major themes. Return as JSON: {{"themes": [list]}}
```

**Step 3: Generate summary**
```
Using these themes:
{input}

Write a 100-word executive summary.
```

**Step 4: Create actionable insights**
```
Based on this summary:
{input}

List 3 specific action items with owners.
```

### Error Handling in Chains

```python
def robust_chain(initial_input, steps, max_retries=2):
    """Chain with retry logic"""
    current_data = initial_input
    
    for step in steps:
        for attempt in range(max_retries + 1):
            try:
                prompt = step["prompt_template"].format(input=current_data)
                response = llm.generate(prompt)
                
                if step.get("parser"):
                    current_data = step["parser"](response)
                else:
                    current_data = response
                
                if step.get("validator"):
                    if step["validator"](current_data):
                        break  # Success
                    else:
                        if attempt == max_retries:
                            # Fall back to default or error
                            current_data = step.get("fallback", current_data)
            except Exception as e:
                if attempt == max_retries:
                    raise
                continue
    
    return current_data
```

### Routing Chains

```python
def routing_chain(input_text):
    """Route to different handlers based on classification"""
    
    # Step 1: Classify
    classification = llm.generate(
        f"Classify this as: question, complaint, request, or feedback:\n{input_text}"
    )
    
    # Step 2: Route to appropriate handler
    handlers = {
        "question": handle_question,
        "complaint": handle_complaint,
        "request": handle_request,
        "feedback": handle_feedback,
    }
    
    handler = handlers.get(classification.strip().lower(), handle_default)
    return handler(input_text)
```

### Using LangChain

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")

# Define chain steps
extract = ChatPromptTemplate.from_template(
    "Extract key points from: {text}"
) | llm | StrOutputParser()

summarize = ChatPromptTemplate.from_template(
    "Summarize these points in one paragraph: {points}"
) | llm | StrOutputParser()

# Chain them
def analysis_chain(text):
    points = extract.invoke({"text": text})
    summary = summarize.invoke({"points": points})
    return summary
```

---

## 🎬 Video Script

**[INTRO - Complex task diagram breaking into steps]**

Some tasks are too complex for a single prompt. The context gets overwhelmed. Instructions compete. Quality degrades. The solution? Chain your prompts.

**[CUT TO: Chain concept]**

Prompt chaining breaks work into steps. Each prompt's output becomes the next prompt's input. Extract, then classify, then generate. Each step is focused and manageable.

**[CUT TO: Chain patterns]**

Three patterns. Sequential: step by step, each builds on the last. Branching: classify, then route to different handlers. Aggregation: parallel analysis, then synthesize results.

**[CUT TO: Code example]**

Implementation is straightforward. Loop through steps. Format the prompt with current data. Generate. Parse if needed. Validate. Pass output to next step.

**[CUT TO: Document analysis example]**

Real example: document analysis. Step one extracts key facts. Step two identifies themes from those facts. Step three generates a summary from themes. Step four creates action items from the summary. Each step is simple; the chain is powerful.

**[CUT TO: Error handling]**

Error handling matters. Add retry logic. Include fallbacks. Validate at each step. One failed step shouldn't crash the whole chain.

**[CUT TO: Routing chain diagram]**

Routing chains are especially useful. Classify the input first. Route to the appropriate specialized handler. Questions get question logic. Complaints get complaint logic. Each path is optimized.

**[CUT TO: Speaker on camera]**

Chaining unlocks tasks you couldn't do otherwise. Complex analysis, multi-step workflows, conditional processing. Break it down, chain it up, and watch complex tasks become manageable.

**[END - Runtime: 5:50]**

---

## 🔬 Interactive Lab: Building Chains

### Objective
Build and test prompt chains for different use cases.

### Part 1: Simple Sequential Chain (20 minutes)

```python
from openai import OpenAI
import json

client = OpenAI()

def call_llm(prompt, parse_json=False):
    """Make an LLM call with optional JSON parsing"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"} if parse_json else None,
        max_tokens=500
    )
    content = response.choices[0].message.content
    if parse_json:
        return json.loads(content)
    return content

def document_analysis_chain(document):
    """Multi-step document analysis"""
    
    # Step 1: Extract facts
    print("Step 1: Extracting facts...")
    facts = call_llm(
        f"""Extract the key facts from this document. Return JSON:
{{"facts": ["fact1", "fact2", ...]}}

Document:
{document}""",
        parse_json=True
    )
    print(f"  Found {len(facts.get('facts', []))} facts")
    
    # Step 2: Identify themes
    print("Step 2: Identifying themes...")
    themes = call_llm(
        f"""Based on these facts, identify 3-5 major themes. Return JSON:
{{"themes": [{{"name": "theme", "description": "brief"}}]}}

Facts: {json.dumps(facts['facts'])}""",
        parse_json=True
    )
    print(f"  Found {len(themes.get('themes', []))} themes")
    
    # Step 3: Generate summary
    print("Step 3: Generating summary...")
    summary = call_llm(
        f"""Write a 100-word executive summary based on these themes:

{json.dumps(themes['themes'], indent=2)}"""
    )
    
    # Step 4: Action items
    print("Step 4: Creating action items...")
    actions = call_llm(
        f"""Based on this analysis, create 3 specific action items. Return JSON:
{{"action_items": [{{"action": "description", "owner": "role", "priority": "high/medium/low"}}]}}

Summary: {summary}""",
        parse_json=True
    )
    
    return {
        "facts": facts,
        "themes": themes,
        "summary": summary,
        "actions": actions
    }

# Test
document = """
Our Q4 sales increased 15% year-over-year, reaching $12.5M. 
The new enterprise segment grew 45%, driven by the Premium tier launch.
Customer churn decreased from 5.2% to 3.8% after implementing the 
new onboarding program. However, support ticket volume increased 22%, 
straining the team. Engineering velocity improved with the DevOps 
investments, shipping 40% more features than Q3. Next quarter we 
plan to expand into Europe and hire 12 additional engineers.
"""

result = document_analysis_chain(document)
print("\n" + "="*50)
print("FINAL ANALYSIS")
print("="*50)
print(f"\nSummary:\n{result['summary']}")
print(f"\nAction Items:")
for item in result['actions'].get('action_items', []):
    print(f"  [{item['priority']}] {item['action']} - {item['owner']}")
```

### Part 2: Routing Chain (20 minutes)

```python
def classify_intent(text):
    """Step 1: Classify user intent"""
    result = call_llm(
        f"""Classify this message into exactly one category:
- question: asking for information
- complaint: expressing dissatisfaction
- request: asking for something to be done
- feedback: sharing positive experience
- other: doesn't fit above

Message: "{text}"

Return JSON: {{"category": "category_name", "confidence": 0.0-1.0}}""",
        parse_json=True
    )
    return result

def handle_question(text):
    return call_llm(f"""The user has a question. Provide a helpful, 
informative answer:\n\n{text}""")

def handle_complaint(text):
    return call_llm(f"""The user has a complaint. Acknowledge their 
frustration and provide a solution or escalation path:\n\n{text}""")

def handle_request(text):
    return call_llm(f"""The user has a request. Confirm understanding 
and outline next steps:\n\n{text}""")

def handle_feedback(text):
    return call_llm(f"""The user sent positive feedback. Thank them 
warmly and encourage continued engagement:\n\n{text}""")

def handle_other(text):
    return call_llm(f"""Handle this message appropriately:\n\n{text}""")

def routing_chain(message):
    """Route message to appropriate handler"""
    # Classify
    classification = classify_intent(message)
    category = classification.get("category", "other")
    confidence = classification.get("confidence", 0)
    
    print(f"Classified as: {category} (confidence: {confidence:.0%})")
    
    # Route
    handlers = {
        "question": handle_question,
        "complaint": handle_complaint,
        "request": handle_request,
        "feedback": handle_feedback,
        "other": handle_other,
    }
    
    handler = handlers.get(category, handle_other)
    response = handler(message)
    
    return {
        "category": category,
        "confidence": confidence,
        "response": response
    }

# Test with different messages
test_messages = [
    "How do I reset my password?",
    "Your product broke after two days. This is unacceptable!",
    "Can you please expedite my order?",
    "Just wanted to say your team is amazing!",
]

for msg in test_messages:
    print(f"\n{'='*50}")
    print(f"INPUT: {msg}")
    result = routing_chain(msg)
    print(f"RESPONSE:\n{result['response']}")
```

### Part 3: Aggregation Chain (15 minutes)

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def analyze_aspect(text, aspect):
    """Analyze one aspect of the text"""
    response = await async_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"""
Analyze this text from the perspective of {aspect}.
Provide 2-3 key insights.

Text: {text}"""}],
        max_tokens=200
    )
    return {
        "aspect": aspect,
        "analysis": response.choices[0].message.content
    }

async def aggregation_chain(text):
    """Analyze from multiple perspectives, then synthesize"""
    aspects = [
        "market opportunity",
        "technical feasibility",
        "team capability",
        "financial viability"
    ]
    
    # Parallel analysis
    print("Analyzing from multiple perspectives...")
    tasks = [analyze_aspect(text, aspect) for aspect in aspects]
    analyses = await asyncio.gather(*tasks)
    
    # Synthesize
    print("Synthesizing...")
    combined = "\n".join([
        f"## {a['aspect']}\n{a['analysis']}" 
        for a in analyses
    ])
    
    synthesis = call_llm(f"""
You have analysis from multiple perspectives:

{combined}

Synthesize these into a unified assessment with:
1. Overall verdict (strong/moderate/weak opportunity)
2. Key strengths
3. Critical risks
4. Recommendation
""")
    
    return {
        "analyses": analyses,
        "synthesis": synthesis
    }

# Run async
pitch = """
We're building an AI-powered code review tool. The market is $2B 
and growing 25% annually. Our team includes ex-Google engineers 
and we have a working prototype. We're seeking $1M to expand 
sales and hire 3 more engineers. Current MRR is $15K with 
20 paying customers.
"""

result = asyncio.run(aggregation_chain(pitch))
print("\n" + "="*50)
print("SYNTHESIZED ASSESSMENT")
print("="*50)
print(result['synthesis'])
```

### Submission
Build a 3+ step chain for a use case relevant to your work.

---

## ✅ Knowledge Check

### Question 1
Why use prompt chaining instead of a single complex prompt?

A) It's faster  
B) Each step is focused, easier to debug, and maintains quality  
C) It uses fewer tokens  
D) It's simpler  

**Correct Answer**: B

**Explanation**: Chaining keeps each step focused, prevents context overload, makes debugging easier (you can see where things went wrong), and maintains quality that degrades with overly complex single prompts.

---

### Question 2
What is a routing chain?

A) A chain that runs in a specific order  
B) A chain that classifies input and routes to different handlers  
C) A chain for network requests  
D) A chain that aggregates results  

**Correct Answer**: B

**Explanation**: A routing chain classifies input first, then routes to specialized handlers based on the classification. Questions go to question logic, complaints to complaint logic, etc.

---

### Question 3
What should you include in chain error handling?

A) Just ignore errors  
B) Retry logic, fallbacks, and validation at each step  
C) Stop on first error  
D) Log and continue without the failed step  

**Correct Answer**: B

**Explanation**: Robust chains include retry logic for transient failures, fallbacks if retries fail, and validation at each step to catch problems early.

---

*Congratulations on completing Unit 2! You now command advanced prompting techniques.*
