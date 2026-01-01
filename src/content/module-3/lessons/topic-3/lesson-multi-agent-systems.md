# Lesson: Multi-Agent Systems with CrewAI and AutoGen

## Introduction

What if instead of one agent trying to do everything, you had a team of specialized agents collaborating? Multi-agent systems unlock new capabilities: agents can specialize, debate, delegate, and verify each other's work. This lesson covers the two leading frameworks: CrewAI and AutoGen.

## When to Use Multi-Agent Systems

| Single Agent | Multi-Agent |
|--------------|-------------|
| Simple tasks | Complex, multi-domain tasks |
| One perspective | Multiple perspectives needed |
| Fast execution | Quality > speed |
| Clear process | Discovery/research tasks |
| Limited tools | Many specialized tools |

**Example Use Cases for Multi-Agent**:
- Research reports needing multiple sources
- Code review with security + performance agents
- Customer support escalation chains
- Content creation with writer + editor + fact-checker

## CrewAI: Role-Based Agent Teams

CrewAI models multi-agent systems as "crews" with defined roles:

[Image: Crew structure with multiple agents working on a task]

### Core Concepts

```python
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# Create specialized agents with roles
researcher = Agent(
    role="Senior Research Analyst",
    goal="Uncover cutting-edge developments in AI and data science",
    backstory="""You are a seasoned researcher at a leading tech think tank.
    Your expertise lies in identifying emerging trends and analyzing 
    complex data. You have a knack for dissecting research papers.""",
    verbose=True,
    allow_delegation=False,
    llm=ChatOpenAI(model="gpt-4-turbo")
)

writer = Agent(
    role="Tech Content Strategist",
    goal="Craft compelling content about tech advancements",
    backstory="""You are a renowned content strategist known for 
    transforming complex tech concepts into engaging narratives.
    Your writing has influenced industry leaders.""",
    verbose=True,
    allow_delegation=True,
    llm=ChatOpenAI(model="gpt-4-turbo")
)

editor = Agent(
    role="Senior Editor",
    goal="Ensure content is accurate, engaging, and publication-ready",
    backstory="""You're a meticulous editor with 15 years of experience.
    You catch errors others miss and elevate good writing to great.""",
    verbose=True,
    allow_delegation=False,
    llm=ChatOpenAI(model="gpt-4-turbo")
)
```

### Defining Tasks

```python
# Define tasks for each agent
research_task = Task(
    description="""Analyze the latest developments in generative AI.
    Focus on: technical breakthroughs, business applications, and risks.
    Your final report should be detailed with citations.""",
    expected_output="A comprehensive report on 2024 AI developments",
    agent=researcher
)

writing_task = Task(
    description="""Using the research report, write a blog post for
    a technical audience. Include practical examples and code snippets.
    Length: 1500-2000 words.""",
    expected_output="A polished blog post in markdown format",
    agent=writer,
    context=[research_task]  # This task uses output from research_task
)

editing_task = Task(
    description="""Review and edit the blog post for:
    1. Technical accuracy
    2. Clarity and flow
    3. Grammar and style
    4. Engagement factor
    Provide the final edited version with tracked changes.""",
    expected_output="Final edited blog post ready for publication",
    agent=editor,
    context=[writing_task]
)
```

### Running the Crew

```python
# Assemble the crew
content_crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,  # Tasks run in order
    verbose=True
)

# Execute!
result = content_crew.kickoff()
print(result)
```

### Crew Process Types

```python
# Sequential: One task after another
crew_sequential = Crew(
    agents=[agent1, agent2, agent3],
    tasks=[task1, task2, task3],
    process=Process.sequential
)

# Hierarchical: Manager agent delegates to workers
manager = Agent(
    role="Project Manager",
    goal="Coordinate team to deliver high-quality results",
    backstory="Experienced PM who knows how to get the best from teams",
    allow_delegation=True
)

crew_hierarchical = Crew(
    agents=[researcher, writer, editor],
    tasks=[complex_task],
    process=Process.hierarchical,
    manager_agent=manager
)
```

### CrewAI with Tools

```python
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Give agents tools
search_tool = SerperDevTool()
web_tool = WebsiteSearchTool()

researcher_with_tools = Agent(
    role="Senior Research Analyst",
    goal="Uncover cutting-edge developments",
    backstory="...",
    tools=[search_tool, web_tool],  # Agent can use these
    verbose=True
)
```

## AutoGen: Conversational Multi-Agent

AutoGen models multi-agent systems as conversations between agents. Agents chat with each other until the task is complete.

### Core Concepts

```python
from autogen import ConversableAgent, UserProxyAgent, config_list_from_json

# Load LLM config
config_list = config_list_from_json("OAI_CONFIG_LIST")

# Create an assistant agent
assistant = ConversableAgent(
    name="assistant",
    system_message="""You are a helpful AI assistant that can write code.
    Complete tasks step by step. When you're done, reply TERMINATE.""",
    llm_config={"config_list": config_list}
)

# Create a user proxy that can execute code
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",  # Don't ask for human input
    max_consecutive_auto_reply=10,
    is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    code_execution_config={
        "work_dir": "coding",
        "use_docker": True,  # Safe code execution
    }
)

# Start a conversation
user_proxy.initiate_chat(
    assistant,
    message="Write a Python script to analyze stock data for AAPL."
)
```

### Group Chat: Many Agents Conversing

```python
from autogen import GroupChat, GroupChatManager

# Create specialized agents
coder = ConversableAgent(
    name="Coder",
    system_message="You are a Python expert. Write clean, efficient code.",
    llm_config={"config_list": config_list}
)

reviewer = ConversableAgent(
    name="Reviewer",
    system_message="You review code for bugs, security issues, and best practices.",
    llm_config={"config_list": config_list}
)

tester = ConversableAgent(
    name="Tester",
    system_message="You write comprehensive unit tests for code.",
    llm_config={"config_list": config_list}
)

# Create a group chat
groupchat = GroupChat(
    agents=[user_proxy, coder, reviewer, tester],
    messages=[],
    max_round=20
)

# Manager coordinates the conversation
manager = GroupChatManager(
    groupchat=groupchat,
    llm_config={"config_list": config_list}
)

# Start the group project
user_proxy.initiate_chat(
    manager,
    message="Create a Python function to validate credit card numbers using Luhn algorithm."
)
```

### Custom Speaker Selection

```python
def custom_speaker_selection(last_speaker, groupchat):
    """Custom logic for who speaks next."""
    messages = groupchat.messages
    
    if len(messages) < 2:
        return coder  # Start with coder
    
    if last_speaker == coder:
        return reviewer  # Coder -> Reviewer
    elif last_speaker == reviewer:
        if "APPROVED" in messages[-1]["content"]:
            return tester  # If approved, test
        else:
            return coder  # If issues, back to coder
    elif last_speaker == tester:
        if "TESTS PASS" in messages[-1]["content"]:
            return None  # Done
        else:
            return coder  # Fix failing tests
    
    return None

groupchat = GroupChat(
    agents=[coder, reviewer, tester],
    messages=[],
    max_round=20,
    speaker_selection_method=custom_speaker_selection
)
```

## CrewAI vs. AutoGen: When to Use Which

| Factor | CrewAI | AutoGen |
|--------|--------|---------|
| **Mental Model** | Task-based crews | Conversation-based |
| **Best For** | Content workflows | Code development |
| **Delegation** | Explicit in roles | Organic in chat |
| **Code Execution** | Via tools | Built-in with Docker |
| **Human-in-Loop** | Yes | Yes (UserProxy) |
| **Learning Curve** | Easier | Moderate |

### Choose CrewAI When:
- You have clearly defined roles and tasks
- Workflow is mostly sequential
- Building content or research pipelines
- Want role-playing personas

### Choose AutoGen When:
- Agents need to debate/iterate freely
- Code generation and execution is central
- You want organic conversation flow
- Building coding assistants

## Design Patterns for Multi-Agent Systems

### Pattern 1: Expert Panel

```python
# Multiple experts contribute, one synthesizes
experts = [
    Agent(role="Security Expert", goal="Identify security vulnerabilities"),
    Agent(role="Performance Expert", goal="Identify performance issues"),
    Agent(role="UX Expert", goal="Identify usability concerns"),
]

synthesizer = Agent(
    role="Lead Architect",
    goal="Synthesize expert opinions into actionable recommendations"
)

# Each expert analyzes, synthesizer combines insights
```

### Pattern 2: Adversarial Review

```python
# Generator and critic in tension
generator = Agent(
    role="Solution Generator",
    goal="Propose creative solutions to problems"
)

critic = Agent(
    role="Critical Reviewer",
    goal="Find flaws and weaknesses in proposed solutions"
)

# Generator proposes, critic attacks, generator improves
# Iterate until critic is satisfied
```

### Pattern 3: Hierarchical Delegation

```python
# Manager delegates to specialists
manager = Agent(
    role="Project Manager",
    goal="Deliver project on time with high quality",
    allow_delegation=True
)

specialists = [
    Agent(role="Frontend Developer", ...),
    Agent(role="Backend Developer", ...),
    Agent(role="QA Engineer", ...),
]

# Manager breaks task down, delegates, reviews results
```

## Common Pitfalls

> **Common Mistake**: Creating too many agents. Start with 2-3 agents and add more only when needed. More agents = more complexity and cost.

> **Common Mistake**: Not defining clear termination conditions. Agents can chat forever without explicit stop conditions.

> **Common Mistake**: Giving all agents the same tools. Specialize tool access based on agent role.

## Key Takeaways

- **Multi-agent systems** divide complex tasks among specialists
- **CrewAI**: Task-based, role-playing agents in structured workflows
- **AutoGen**: Conversation-based agents that chat until done
- **Choose based on your domain**: Content → CrewAI, Code → AutoGen
- **Start simple**: 2-3 agents, add more as needed
- **Define clear roles**: Overlap causes confusion
- **Set termination**: Know when you're done

## What's Next

In the hands-on lab, you'll build a **Multi-Agent Research System** that uses specialized agents to research a topic, fact-check findings, and produce a polished report.

---

*Estimated completion time: 35 minutes*
*Difficulty: Advanced*
