# Lab: Build a Reflection Agent

## Overview

In this lab, you'll build a **reflection agent** that can critique and improve its own outputs. This pattern is powerful for generating higher-quality content by having the agent iteratively refine its work.

**Time**: 2-3 hours  
**Difficulty**: Intermediate  
**Skills**: Agent architecture, LangGraph, self-improvement loops

## Learning Objectives

By completing this lab, you will:
- Implement the reflection pattern from scratch
- Build a LangGraph workflow with cycles
- Design effective self-critique prompts
- Handle iteration limits and convergence

## The Challenge

Your company needs an AI system that generates high-quality technical documentation. Rather than accepting the first draft, you'll build an agent that:

1. Generates initial documentation
2. Critiques its own output
3. Identifies specific improvements
4. Revises the documentation
5. Repeats until quality threshold is met (or iteration limit reached)

## Prerequisites

```bash
pip install langchain langchain-openai langgraph
```

Ensure you have `OPENAI_API_KEY` set in your environment.

## Step 1: Define the State

Create a new file `reflection_agent.py`:

```python
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
import operator

class ReflectionState(TypedDict):
    # The messages in the conversation
    messages: Annotated[Sequence[BaseMessage], operator.add]
    # The topic to document
    topic: str
    # Current draft
    current_draft: str
    # Critique of the current draft
    critique: str
    # Number of iterations
    iteration: int
    # Quality score (1-10)
    quality_score: int
```

## Step 2: Implement the Generator Node

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOpenAI(model="gpt-4-turbo", temperature=0.7)

def generate_draft(state: ReflectionState) -> dict:
    """Generate or revise documentation based on critique."""
    
    topic = state["topic"]
    current_draft = state.get("current_draft", "")
    critique = state.get("critique", "")
    iteration = state.get("iteration", 0)
    
    if iteration == 0:
        # First draft
        prompt = f"""Write technical documentation for: {topic}
        
Include:
- Overview
- Key concepts
- Code examples
- Best practices
- Common pitfalls

Make it comprehensive but concise."""
    else:
        # Revision based on critique
        prompt = f"""Revise this documentation based on the critique.

CURRENT DRAFT:
{current_draft}

CRITIQUE:
{critique}

Improve the documentation addressing every point in the critique.
Keep what's working well, fix what needs improvement."""
    
    response = llm.invoke([
        SystemMessage(content="You are a technical writer creating clear, accurate documentation."),
        HumanMessage(content=prompt)
    ])
    
    return {
        "current_draft": response.content,
        "iteration": iteration + 1,
        "messages": [response]
    }
```

## Step 3: Implement the Critic Node

```python
def critique_draft(state: ReflectionState) -> dict:
    """Critique the current draft and assign a quality score."""
    
    current_draft = state["current_draft"]
    
    critique_prompt = f"""Critically evaluate this technical documentation:

{current_draft}

Evaluate on these criteria (1-10 each):
1. Technical Accuracy
2. Clarity and Readability
3. Completeness
4. Code Example Quality
5. Practical Usefulness

For each criterion:
- Give a score
- Identify specific problems (if any)
- Suggest specific improvements

End with:
- OVERALL SCORE: [average of all scores, 1-10]
- TOP 3 PRIORITY IMPROVEMENTS: [numbered list]

Be constructively critical. Even good documentation can improve."""

    response = llm.invoke([
        SystemMessage(content="You are a demanding technical editor who maintains high standards."),
        HumanMessage(content=critique_prompt)
    ])
    
    # Parse the quality score from the response
    # TODO: You'll need to implement score extraction
    quality_score = extract_quality_score(response.content)
    
    return {
        "critique": response.content,
        "quality_score": quality_score,
        "messages": [response]
    }


def extract_quality_score(critique_text: str) -> int:
    """Extract the overall quality score from critique text."""
    # TODO: Implement this function
    # Hint: Look for "OVERALL SCORE:" in the text
    # Return an integer 1-10
    pass
```

## Step 4: Implement the Router

```python
from langgraph.graph import END

def should_continue(state: ReflectionState) -> str:
    """Decide whether to continue refining or finish."""
    
    quality_score = state.get("quality_score", 0)
    iteration = state.get("iteration", 0)
    
    # TODO: Implement the routing logic
    # Conditions to stop:
    # 1. Quality score >= 8
    # 2. iteration >= 3 (prevent infinite loops)
    # 
    # Return "continue" to keep refining
    # Return "finish" when done
    
    pass
```

## Step 5: Build the Graph

```python
from langgraph.graph import StateGraph

def build_reflection_agent():
    """Build and compile the reflection agent graph."""
    
    workflow = StateGraph(ReflectionState)
    
    # Add nodes
    workflow.add_node("generate", generate_draft)
    workflow.add_node("critique", critique_draft)
    workflow.add_node("finalize", finalize_output)
    
    # Set entry point
    workflow.set_entry_point("generate")
    
    # Add edges
    workflow.add_edge("generate", "critique")
    
    # Conditional routing after critique
    workflow.add_conditional_edges(
        "critique",
        should_continue,
        {
            "continue": "generate",  # Loop back for revision
            "finish": "finalize"     # Done refining
        }
    )
    
    workflow.add_edge("finalize", END)
    
    return workflow.compile()


def finalize_output(state: ReflectionState) -> dict:
    """Prepare the final output."""
    return {
        "messages": [HumanMessage(content=f"""
=== FINAL DOCUMENTATION ===
Iterations: {state['iteration']}
Final Quality Score: {state['quality_score']}/10

{state['current_draft']}
""")]
    }
```

## Step 6: Test Your Agent

```python
def main():
    # Build the agent
    agent = build_reflection_agent()
    
    # Test with a topic
    initial_state = {
        "topic": "Implementing retry logic with exponential backoff in Python",
        "messages": [],
        "current_draft": "",
        "critique": "",
        "iteration": 0,
        "quality_score": 0
    }
    
    # Run the agent
    print("Starting reflection agent...")
    
    for event in agent.stream(initial_state):
        for node_name, output in event.items():
            print(f"\n{'='*50}")
            print(f"Node: {node_name}")
            print(f"Iteration: {output.get('iteration', 'N/A')}")
            print(f"Quality Score: {output.get('quality_score', 'N/A')}")
            
            if 'current_draft' in output:
                print(f"Draft length: {len(output['current_draft'])} chars")
    
    print("\nAgent completed!")


if __name__ == "__main__":
    main()
```

## Deliverables

Submit a folder containing:

1. **`reflection_agent.py`**: Your complete implementation
2. **`test_output.md`**: Log showing the agent running on a test topic
3. **`reflection.md`**: Answer these questions:
   - How did the quality improve across iterations?
   - What critique points were most impactful?
   - How would you improve the reflection pattern?

## Evaluation Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Working agent | 30 | Agent runs without errors |
| Proper LangGraph structure | 20 | Nodes, edges, conditional routing correct |
| Score extraction | 15 | Quality score parsed correctly |
| Iteration logic | 15 | Proper stopping conditions |
| Code quality | 10 | Clean, documented code |
| Reflection depth | 10 | Thoughtful analysis |

**Passing score**: 70 points

## Bonus Challenges

For extra credit:

1. **Visualization**: Add Mermaid diagram export of the graph
2. **Persistence**: Add checkpointing for resume capability
3. **Multi-document**: Extend to refine multiple sections in parallel
4. **Human-in-the-loop**: Add option for human feedback between iterations

---

*Good luck! The reflection pattern is one of the most powerful techniques in agentic AI.*
