# Video Script: Module 3 - Agentic AI Fundamentals

## Video Overview
- **Title**: Building AI Agents That Actually Work
- **Duration**: 15 minutes
- **Target Audience**: Developers building LLM-powered applications
- **Learning Objectives**: Agent architecture, ReAct pattern, tool design

---

## Scene 1: Hook Opening (0:00 - 0:30)

### Visuals
- Dramatic animation: AI agent solving complex multi-step problem
- Text: "What if AI could do more than just answer questions?"

### Narration
"What if AI could browse the web, execute code, query databases, and make decisions—all autonomously? That's not science fiction. That's agentic AI. And after this video, you'll know how to build one."

---

## Scene 2: Agents vs Chatbots (0:30 - 2:00)

### Visuals
- Side-by-side comparison animation
- Chatbot: simple request/response arrows
- Agent: complex loop diagram

### Narration
"First, let's clear up what makes an agent different from a chatbot. A chatbot waits for input and responds. That's it. An agent? An agent has goals. It observes its environment, thinks about what to do, takes action, and observes the result. Then it loops—again and again—until the goal is achieved."

### On-screen Diagram
```
CHATBOT:          AGENT:
User → AI → User  User → [Observe → Think → Act → Observe] → Result
                         ↑______________________________|
```

### Key Points (Animated)
1. **Chatbot**: Reactive, single turn
2. **Agent**: Proactive, multi-step, goal-oriented

---

## Scene 3: The Core Agent Loop (2:00 - 4:00)

### Visuals
- Animated circular diagram showing the loop
- Real code appearing step by step

### Narration
"The heart of every agent is the core loop. It goes like this: Observe, Think, Act, Observe again. Let's see this in code."

### Code Walkthrough
```python
while not goal_achieved:
    # 1. OBSERVE: Get current state
    observation = get_current_state()
    
    # 2. THINK: LLM decides what to do
    action = llm.decide(observation, goal, tools)
    
    # 3. ACT: Execute the chosen action
    result = execute(action)
    
    # 4. OBSERVE: Check the result
    if is_goal_met(result):
        goal_achieved = True
```

### Animation
- Highlight each step with different colors
- Show data flowing between steps

---

## Scene 4: The ReAct Pattern (4:00 - 6:30)

### Visuals
- ReAct paper screenshot
- Animated thought process

### Narration
"The ReAct pattern—Reasoning plus Acting—is the industry standard for building agents. Instead of just picking actions, the agent thinks out loud, explains its reasoning, then acts."

### ReAct Example (Animated)
```
Question: What's the weather in Paris and should I bring an umbrella?

Thought: I need to check the current weather in Paris.
Action: weather_lookup("Paris")
Observation: Paris: 12°C, 80% chance of rain

Thought: 80% rain chance is high. I should recommend an umbrella.
Action: respond("Yes, bring an umbrella. 80% chance of rain in Paris.")
```

### Why ReAct Works (Bullet Points)
- Transparent reasoning (debuggable)
- Better accuracy
- Self-correction ability

---

## Scene 5: Tools Make Agents Powerful (6:30 - 9:00)

### Visuals
- Toolbox animation opening
- Individual tools appearing

### Narration
"An agent without tools is just a chatbot with extra steps. Tools are how agents interact with the world. Let's look at how to design effective tools."

### Tool Design Principles

**1. Clear Descriptions**
```python
@tool
def search_database(query: str) -> list:
    """
    Search the customer database.
    
    Args:
        query: Natural language search query
               Examples: "customers in NYC", "orders over $500"
    
    Returns:
        List of matching records (max 10)
    """
```

**2. Strong Validation**
```python
from pydantic import BaseModel, validator

class SearchArgs(BaseModel):
    query: str
    limit: int = 10
    
    @validator('limit')
    def limit_must_be_reasonable(cls, v):
        if v > 100:
            raise ValueError('Limit cannot exceed 100')
        return v
```

**3. Structured Results**
```python
return {
    "success": True,
    "count": len(results),
    "results": results,
    "next_page": has_more
}
```

---

## Scene 6: Memory Systems (9:00 - 11:30)

### Visuals
- Brain diagram with different memory types
- Demo of conversation with memory

### Narration
"Agents need memory. Not just to remember the conversation, but to store knowledge, track their progress, and learn from past actions."

### Memory Types (Animated Diagram)

**Short-Term Memory**
- Current conversation
- Slides out of context window

**Working Memory**
- Current goal and progress
- Scratchpad for intermediate results

**Long-Term Memory**
- Vector database for knowledge
- Persists across sessions

### Code Example
```python
class AgentMemory:
    def __init__(self):
        self.conversation = []      # Short-term
        self.scratchpad = {}        # Working
        self.vectorstore = Chroma() # Long-term
    
    def remember(self, key, value):
        self.vectorstore.add(key, value)
    
    def recall(self, query):
        return self.vectorstore.search(query)
```

---

## Scene 7: When Agents Fail (11:30 - 13:00)

### Visuals
- Red warning signs
- Error scenarios

### Narration
"Agents can fail. Spectacularly. Let's talk about what goes wrong and how to prevent it."

### Failure Modes

**1. Infinite Loops**
```python
# Always set max_iterations!
agent = Agent(tools=tools, max_iterations=10)
```

**2. Tool Hallucination**
"Agent invents tool parameters that don't exist"
**Solution**: Use Pydantic validation

**3. Goal Drift**
"Agent forgets the original goal mid-task"
**Solution**: Include goal in every prompt

**4. Prompt Injection via Tools**
"Malicious data in tool output manipulates agent"
**Solution**: Sanitize tool outputs

---

## Scene 8: Building Your First Agent (13:00 - 14:30)

### Visuals
- Complete code walkthrough
- Live demo of agent running

### Narration
"Let's put it all together. Here's a complete agent that can search the web, run calculations, and answer questions."

### Complete Implementation
```python
from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI
from langchain.tools import tool

@tool
def search(query: str) -> str:
    """Search the web for information."""
    return search_api(query)

@tool
def calculate(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

tools = [search, calculate]
llm = ChatOpenAI(model="gpt-4-turbo")

agent = create_react_agent(llm, tools)
result = agent.invoke("What's 15% of the US population?")
```

### Demo Output
```
Thought: I need to find the US population, then calculate 15%
Action: search("current US population 2024")
Observation: US population is approximately 335 million
Thought: Now I calculate 15% of 335 million
Action: calculate("335000000 * 0.15")
Observation: 50250000.0
Final Answer: 15% of the US population is about 50.25 million people
```

---

## Scene 9: Conclusion (14:30 - 15:00)

### Visuals
- Key takeaways summary
- Next steps

### Narration
"You've just learned the fundamentals of agentic AI: the core loop, ReAct pattern, tools, and memory. In the next lesson, we'll go deeper into LangGraph and building multi-agent systems. But for now, go build your first agent."

### Final Screen
- "Key Takeaway: Agents = Observe + Think + Act + Loop"
- "Next: LangGraph Deep Dive"
- ScaledNative branding

---

## Production Notes

### Required Animations
- Core agent loop (circular)
- ReAct thinking visualization
- Memory brain diagram
- Tool interaction flows

### Code Display Requirements
- Syntax highlighting
- Step-by-step reveal
- Callout boxes for key lines

### Demo Recording
- Screen capture of agent running
- Live terminal output
- Possibly Picture-in-Picture of presenter

### Music & Sound
- Tech ambient background
- Success/completion sounds
- Typing sound effects for code
