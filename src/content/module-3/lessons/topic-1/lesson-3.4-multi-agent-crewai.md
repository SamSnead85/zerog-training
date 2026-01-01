# Lesson: Building Multi-Agent Systems with CrewAI

## Overview

In this lesson, you'll learn to build sophisticated multi-agent systems using CrewAI. We'll design teams of specialized agents that collaborate on complex tasks, leveraging role-based architectures for better results.

**Duration**: 25 minutes  
**Prerequisites**: Lesson 3.1 (Agent Architecture), Lesson 3.2 (LangGraph)

## Learning Objectives

By the end of this lesson, you will:
- Understand the CrewAI framework architecture
- Design specialized agents with distinct roles
- Define tasks with dependencies and expected outputs
- Build crews with sequential and parallel execution
- Handle inter-agent communication and delegation

---

## Why Multi-Agent Systems?

Single agents have limitations:
- Context window constraints
- Skill generalization (jack of all trades)
- Long reasoning chains become unreliable

Multi-agent systems solve these by:
- **Specialization**: Each agent excels at one thing
- **Collaboration**: Agents share insights and verify each other
- **Decomposition**: Complex tasks become manageable subtasks

---

## CrewAI Architecture

CrewAI uses a role-based metaphor: you're assembling a crew of specialists.

```
┌─────────────────────────────────────────────────────┐
│                      CREW                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │  Researcher │ │   Writer    │ │   Editor    │   │
│  │  [Agent]    │ │   [Agent]   │ │   [Agent]   │   │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘   │
│         │               │               │           │
│  ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐   │
│  │  Research   │ │   Draft     │ │   Review    │   │
│  │   Task      │ │   Article   │ │   & Polish  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Core Components

1. **Agent**: A specialized worker with a role, goal, and backstory
2. **Task**: A specific objective with expected output
3. **Crew**: A team of agents working on tasks together
4. **Process**: How tasks flow (sequential, hierarchical)

---

## Defining Agents

Agents need clear identities to perform well:

```python
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# Define the LLM
llm = ChatOpenAI(model="gpt-4-turbo", temperature=0.7)

# Research Specialist
researcher = Agent(
    role="Senior Research Analyst",
    goal="Discover comprehensive, accurate information on assigned topics",
    backstory="""You are a veteran researcher with 15 years of experience 
    at top consulting firms. You're known for your thorough analysis and 
    ability to find hidden insights in complex topics. You always verify 
    facts from multiple sources.""",
    llm=llm,
    verbose=True,
    allow_delegation=False,
)

# Content Writer
writer = Agent(
    role="Content Strategist",
    goal="Create engaging, informative content that resonates with the audience",
    backstory="""You're an award-winning content creator who has written 
    for major publications. You excel at taking complex topics and making 
    them accessible without dumbing them down. Your writing is known for 
    being both authoritative and engaging.""",
    llm=llm,
    verbose=True,
    allow_delegation=True,  # Can delegate research questions
)

# Quality Editor
editor = Agent(
    role="Senior Editor",
    goal="Ensure content is polished, accurate, and publication-ready",
    backstory="""You've been an editor at leading publications for 20 years. 
    You have an eye for detail, strong opinions about quality, and you're 
    not afraid to push back if content doesn't meet your high standards. 
    You focus on clarity, accuracy, and impact.""",
    llm=llm,
    verbose=True,
    allow_delegation=False,
)
```

### Agent Design Best Practices

1. **Specific Roles**: "Senior Research Analyst" is better than "Researcher"
2. **Clear Goals**: What does success look like for this agent?
3. **Rich Backstory**: Give context that shapes behavior
4. **Appropriate Delegation**: Enable/disable based on role

---

## Defining Tasks

Tasks are the work units that agents complete:

```python
# Research Task
research_task = Task(
    description="""
    Research the current state of AI-native software development practices.
    Focus on:
    1. Key trends and adoption patterns
    2. Leading companies and their approaches
    3. Measurable productivity gains reported
    4. Challenges and failure modes
    
    Compile findings into a comprehensive research brief.
    """,
    expected_output="""A detailed research brief containing:
    - Executive summary (2-3 sentences)
    - Key trends section with supporting data
    - Case studies of 3+ companies
    - Quantified benefits where available
    - Challenges and recommendations
    - Sources list""",
    agent=researcher,
)

# Writing Task
writing_task = Task(
    description="""
    Using the research provided, write a 1500-word article titled 
    "The Rise of AI-Native Development: What Every Engineering Leader Needs to Know"
    
    Target audience: CTOs and VPs of Engineering
    Tone: Authoritative but accessible
    
    Include relevant statistics, case studies, and actionable recommendations.
    """,
    expected_output="A polished 1500-word article in markdown format, ready for publication",
    agent=writer,
    context=[research_task],  # Depends on research output
)

# Editing Task
editing_task = Task(
    description="""
    Review and edit the article for:
    1. Factual accuracy - verify all claims
    2. Clarity and readability
    3. Grammar and style consistency
    4. Impact of the opening and closing
    5. Flow and structure
    
    Make corrections directly. Add comments for major suggestions.
    """,
    expected_output="Final publication-ready article with an editing notes appendix",
    agent=editor,
    context=[writing_task],
)
```

### Task Design Tips

- **Specific Instructions**: The more detail, the better
- **Clear Expected Output**: Define success criteria
- **Context Chaining**: Use `context=` to pass outputs between tasks
- **Output Types**: Can be text, JSON, structured data

---

## Building the Crew

Now assemble the crew and execute:

```python
# Create the Crew
content_crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,  # Tasks run in order
    verbose=True,
)

# Execute
result = content_crew.kickoff(
    inputs={
        "topic": "AI-Native Software Development",
        "word_count": 1500,
    }
)

# The result contains the final output
print(result)
```

### Process Types

**Sequential** (Default):
```python
process=Process.sequential
# Task 1 → Task 2 → Task 3
```

**Hierarchical** (Manager-led):
```python
process=Process.hierarchical
# Manager agent coordinates and delegates
```

---

## Adding Tools to Agents

Make agents more capable with tools:

```python
from crewai.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information on a topic."""
    # Implement your search logic
    return search_results

@tool
def verify_fact(claim: str) -> str:
    """Verify a factual claim using reliable sources."""
    # Implement fact-checking
    return verification_result

# Equip the researcher with tools
researcher = Agent(
    role="Senior Research Analyst",
    goal="Discover comprehensive, accurate information",
    backstory="...",
    llm=llm,
    tools=[search_web, verify_fact],
    verbose=True,
)
```

---

## Handling Delegation

When `allow_delegation=True`, agents can ask other agents for help:

```python
writer = Agent(
    role="Content Strategist",
    goal="Create excellent content",
    backstory="...",
    llm=llm,
    allow_delegation=True,  # Can delegate to other crew members
)

# The writer might delegate fact-checking to the researcher
# or clarification requests to any available agent
```

### When to Enable Delegation

| Role | Delegation | Reason |
|------|------------|--------|
| Researcher | Off | Should do their own research |
| Writer | On | May need to clarify facts |
| Editor | Off | Final authority on content |
| Manager | On | Coordinates the team |

---

## Real-World Example: Tech Due Diligence Crew

```python
# Analyst Agent
analyst = Agent(
    role="Tech Due Diligence Analyst",
    goal="Evaluate technical architecture and engineering practices",
    backstory="Former CTO who now advises PE firms on tech investments...",
    tools=[code_analyzer, architecture_reviewer],
)

# Market Researcher
market_researcher = Agent(
    role="Market Intelligence Specialist",
    goal="Assess market position and competitive landscape",
    tools=[market_data_tool, competitor_tracker],
)

# Report Writer  
report_writer = Agent(
    role="Investment Memo Writer",
    goal="Synthesize findings into actionable investment recommendations",
)

# Define tasks
tech_review = Task(
    description="Analyze the target company's engineering practices...",
    agent=analyst,
)

market_analysis = Task(
    description="Research the competitive landscape...",
    agent=market_researcher,
)

investment_memo = Task(
    description="Write the investment memo combining all findings...",
    agent=report_writer,
    context=[tech_review, market_analysis],  # Depends on both
)

# Run the due diligence
crew = Crew(
    agents=[analyst, market_researcher, report_writer],
    tasks=[tech_review, market_analysis, investment_memo],
    process=Process.sequential,
)

result = crew.kickoff(inputs={"company": "TechStartup Inc."})
```

---

## CrewAI vs Other Frameworks

| Feature | CrewAI | LangGraph | AutoGen |
|---------|--------|-----------|---------|
| Abstraction | High (role-based) | Low (graph-based) | Medium |
| Learning Curve | Easy | Steeper | Medium |
| Flexibility | Moderate | Very High | High |
| Best For | Role-based workflows | Custom flows | Chat-based |
| Tool Support | Built-in decorators | Manual | Built-in |

**Choose CrewAI when**:
- You have clearly defined roles
- Workflows are relatively linear
- Rapid prototyping is important
- Team metaphor fits your domain

---

## Common Pitfalls

1. **Vague Roles**: "Helper agent" doesn't work
2. **Missing Context**: Forgetting to pass outputs between tasks
3. **Too Many Agents**: Start with 2-3, add only if needed
4. **No Output Validation**: Always check what agents produce
5. **Ignoring Costs**: Multi-agent = multiple LLM calls

---

## Key Takeaways

- **CrewAI uses roles**: Define agents by who they are, not just what they do
- **Tasks chain together**: Use `context=` to pass information
- **Tools extend capabilities**: Give agents the right instruments
- **Delegation enables collaboration**: Let agents ask each other for help
- **Start simple**: 2-3 agents, sequential process, then iterate

---

## Next Steps

- **Lab**: Build a content production crew
- **Next Lesson**: AutoGen for conversational multi-agent systems
- **Advanced**: Hierarchical crews with manager agents
