// AI & Technology Training Content
// Cutting-edge modules for AI transformation, Agentic AI, and enterprise deployment

export const aiNativeContent = {
    id: "ai-native-transformation",
    title: "AI Native & Enterprise AI Transformation",
    description: "Master the strategy and implementation of AI-first organizations",
    category: "AI & Technology",
    duration: "6 hours",
    level: "Advanced",

    lessons: [
        {
            id: "lesson-1",
            title: "What Does 'AI Native' Mean?",
            duration: "20 min",
            type: "video",
            content: `
# What Does "AI Native" Mean?

## Defining AI Native Organizations

An **AI Native** organization is one where artificial intelligence is embedded into the core of every business process, decision, and customer interaction—not as an afterthought, but as a foundational capability.

## The AI Maturity Spectrum

| Level | Description | Characteristics |
|-------|-------------|-----------------|
| **Level 0: AI Curious** | Exploring AI | Proof of concepts, isolated experiments |
| **Level 1: AI Enabled** | Using AI tools | ChatGPT for content, basic automation |
| **Level 2: AI Integrated** | AI in workflows | Embedded in products, some automation |
| **Level 3: AI Transformed** | AI-driven decisions | Predictive operations, augmented workforce |
| **Level 4: AI Native** | AI-first architecture | Every system AI-enabled by default |

## Key Characteristics of AI Native Companies

### 1. Data as a Strategic Asset
- Real-time data pipelines
- Unified data platforms
- Data governance at scale

### 2. AI-First Product Development
- AI features in every product decision
- Continuous model improvement
- A/B testing AI capabilities

### 3. Augmented Workforce
- AI copilots for every role
- Automation of routine tasks
- Focus on human creativity and judgment

### 4. Adaptive Operations
- Self-optimizing systems
- Predictive maintenance
- Dynamic resource allocation

## The Business Case

Companies that successfully transform to AI Native see:
- **40%** reduction in operational costs
- **60%** faster time-to-market
- **3x** improvement in customer satisfaction
- **25%** increase in employee productivity

## Warning Signs of AI Theater

Watch for organizations that:
- Have AI initiatives without business outcomes
- Focus on technology without use cases
- Lack executive sponsorship
- Don't measure AI impact
      `,
            quiz: {
                question: "What distinguishes an AI Native organization from an AI Integrated one?",
                options: [
                    "AI Native companies use ChatGPT",
                    "AI Native has AI embedded by default in every system, not just selected workflows",
                    "AI Native companies have more data scientists",
                    "There is no meaningful difference"
                ],
                correctIndex: 1,
                explanation: "AI Native organizations have AI built into their foundational architecture—every system, process, and decision is AI-enabled by default, rather than having AI added to specific workflows."
            }
        },
        {
            id: "lesson-2",
            title: "The AI Operating Model",
            duration: "25 min",
            type: "video",
            content: `
# The AI Operating Model

## Building the Foundation

An AI Operating Model defines how an organization systematically deploys, manages, and scales AI across the enterprise.

## The Six Pillars

### 1. Strategy & Governance
- AI vision aligned with business strategy
- Ethics and responsible AI framework
- Investment prioritization
- Risk management

### 2. Use Case Factory
- Systematic identification of AI opportunities
- Prioritization based on value and feasibility
- Rapid prototyping process
- Scale-up methodology

### 3. Data & Infrastructure
- Modern data platforms (Lakehouse, etc.)
- Feature stores for ML
- MLOps pipelines
- Compute optimization

### 4. Talent & Skills
- Data scientists and ML engineers
- AI product managers
- Prompt engineers (new role)
- Citizen developers with AI

### 5. Technology & Platforms
- Foundation model selection
- Build vs. buy decisions
- Vendor management
- Integration architecture

### 6. Change Management
- AI literacy programs
- Process redesign
- Role evolution
- Cultural transformation

## The AI Center of Excellence

A centralized team that:
- Sets standards and best practices
- Provides reusable assets
- Trains the organization
- Governs AI deployments

## Common Operating Model Patterns

| Pattern | Best For |
|---------|----------|
| **Centralized** | Early maturity, standardization |
| **Federated** | Business unit autonomy |
| **Hub & Spoke** | Balance of standards and speed |
| **Embedded** | High maturity, AI Native |

## Key Success Metrics

1. **Time to Value**: Weeks, not months
2. **Model Performance**: Accuracy, latency, cost
3. **Adoption Rate**: % of decisions AI-augmented
4. **Business Impact**: Revenue, cost, satisfaction
      `,
            quiz: {
                question: "What is the purpose of an AI Center of Excellence?",
                options: [
                    "To replace business units with AI",
                    "To set standards, provide reusable assets, and train the organization",
                    "To hire data scientists",
                    "To purchase AI software"
                ],
                correctIndex: 1,
                explanation: "An AI Center of Excellence (CoE) sets standards and best practices, provides reusable assets and accelerators, trains the organization on AI capabilities, and governs AI deployments across the enterprise."
            }
        },
        {
            id: "lesson-3",
            title: "Large Language Models (LLMs) Explained",
            duration: "30 min",
            type: "video",
            content: `
# Large Language Models (LLMs) Explained

## What is an LLM?

A Large Language Model is a type of AI trained on massive amounts of text data that can understand, generate, and reason about human language.

## How LLMs Work

### The Transformer Architecture
1. **Tokenization**: Text split into tokens (words/subwords)
2. **Embeddings**: Tokens converted to numbers
3. **Attention**: Model weighs which parts matter
4. **Generation**: Predicts next token, repeatedly

### Pre-training vs. Fine-tuning

| Stage | Purpose | Data |
|-------|---------|------|
| **Pre-training** | General knowledge | Internet-scale text |
| **Fine-tuning** | Task specialization | Domain-specific data |
| **RLHF** | Alignment | Human preferences |

## Key Concepts

### Context Window
- The amount of text an LLM can "see" at once
- GPT-4: 128K tokens (~300 pages)
- Longer context = better understanding

### Temperature
- Controls randomness in outputs
- Low (0.1): Deterministic, focused
- High (0.9): Creative, varied

### Prompt Engineering
The art of crafting inputs to get optimal outputs:
- Be specific and explicit
- Provide examples (few-shot)
- Use system prompts for behavior
- Chain-of-thought for reasoning

## Major LLM Providers

| Provider | Model | Strengths |
|----------|-------|-----------|
| OpenAI | GPT-4o | General capability, vision |
| Anthropic | Claude 3.5 | Long context, safety |
| Google | Gemini | Multimodal, efficiency |
| Meta | Llama 3 | Open weights, customizable |
| Mistral | Mixtral | Efficient, open |

## Enterprise Considerations

1. **Data Privacy**: Where does data go?
2. **Cost**: Token usage can scale quickly
3. **Latency**: Real-time vs. batch use cases
4. **Vendor Lock-in**: Portability of prompts
5. **Hallucinations**: Verification requirements
      `,
            quiz: {
                question: "What does 'context window' refer to in LLMs?",
                options: [
                    "The window on your screen",
                    "The amount of text the model can process at once",
                    "The time it takes to respond",
                    "The number of users who can access it"
                ],
                correctIndex: 1,
                explanation: "The context window is the amount of text (measured in tokens) that an LLM can 'see' and consider when generating a response. Larger context windows allow the model to understand longer documents and conversations."
            }
        },
        {
            id: "lesson-4",
            title: "Retrieval-Augmented Generation (RAG)",
            duration: "25 min",
            type: "video",
            content: `
# Retrieval-Augmented Generation (RAG)

## The Problem RAG Solves

LLMs have a knowledge cutoff and can hallucinate. RAG solves this by:
1. Retrieving relevant documents
2. Augmenting the prompt with that context
3. Generating accurate, grounded responses

## How RAG Works

\`\`\`
User Query → Embedding → Vector Search → Retrieved Docs → LLM + Context → Response
\`\`\`

### Step-by-Step Process

1. **Index Documents**
   - Chunk documents into segments
   - Create embeddings (vector representations)
   - Store in vector database

2. **Query Processing**
   - Convert user query to embedding
   - Search for similar document chunks
   - Retrieve top-k relevant passages

3. **Response Generation**
   - Combine query + retrieved context
   - Send to LLM for generation
   - Return grounded response

## Vector Databases

Specialized databases for similarity search:
- **Pinecone**: Managed, easy to scale
- **Weaviate**: Open source, multimodal
- **Chroma**: Simple, local development
- **Milvus**: High performance, open source
- **pgvector**: PostgreSQL extension

## RAG Best Practices

### Chunking Strategies
| Strategy | Use Case |
|----------|----------|
| Fixed size | Simple, consistent |
| Sentence | Natural boundaries |
| Semantic | Meaning-based |
| Hierarchical | Long documents |

### Improving Retrieval
- **Hybrid search**: Combine keyword + semantic
- **Re-ranking**: Reorder results by relevance
- **Query expansion**: Add synonyms/variations
- **Metadata filtering**: Narrow by attributes

## Advanced RAG Patterns

1. **Self-RAG**: Model decides when to retrieve
2. **Corrective RAG**: Verify and correct retrievals
3. **Agentic RAG**: Multi-step reasoning with retrieval
4. **Graph RAG**: Use knowledge graphs for structure
      `,
            quiz: {
                question: "What is the primary purpose of RAG in AI systems?",
                options: [
                    "To make AI faster",
                    "To ground AI responses in retrieved documents to reduce hallucinations",
                    "To replace search engines",
                    "To train new AI models"
                ],
                correctIndex: 1,
                explanation: "RAG (Retrieval-Augmented Generation) retrieves relevant documents and uses them to ground the AI's responses in factual information, significantly reducing hallucinations and providing up-to-date knowledge."
            }
        },
        {
            id: "lesson-5",
            title: "Knowledge Check: AI Fundamentals",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    question: "What percentage of cost reduction do AI Native companies typically see?",
                    options: ["10%", "25%", "40%", "75%"],
                    correctIndex: 2,
                    explanation: "Research shows AI Native companies typically see around 40% reduction in operational costs through automation, optimization, and efficiency gains."
                },
                {
                    question: "Which LLM provider is known for open weights models?",
                    options: ["OpenAI", "Anthropic", "Meta (Llama)", "Google"],
                    correctIndex: 2,
                    explanation: "Meta's Llama models are released with open weights, allowing organizations to run them locally and customize them for their specific needs."
                },
                {
                    question: "What is the purpose of 'embeddings' in RAG?",
                    options: ["To compress documents", "To convert text to numerical vectors for similarity search", "To encrypt data", "To format output"],
                    correctIndex: 1,
                    explanation: "Embeddings convert text into numerical vectors that capture semantic meaning, enabling similarity search to find relevant documents based on meaning rather than just keywords."
                }
            ]
        }
    ]
};

export const agenticAIContent = {
    id: "agentic-ai",
    title: "Agentic AI: Autonomous AI Systems",
    description: "Design and deploy AI agents that reason, plan, and take action",
    category: "AI & Technology",
    duration: "5 hours",
    level: "Advanced",

    lessons: [
        {
            id: "lesson-1",
            title: "What is Agentic AI?",
            duration: "20 min",
            type: "video",
            content: `
# What is Agentic AI?

## Defining AI Agents

An **AI Agent** is a system that can:
1. **Perceive** its environment
2. **Reason** about goals
3. **Plan** multi-step actions
4. **Execute** using tools
5. **Learn** from outcomes

## From Chatbots to Agents

| Chatbot | AI Agent |
|---------|----------|
| Single turn | Multi-step |
| Reactive | Proactive |
| Text only | Tools + actions |
| Scripted | Autonomous |
| Stateless | Memory |

## The Agent Loop

\`\`\`
Observe → Think → Plan → Act → Observe → Think → Plan → Act → ...
\`\`\`

### Key Components

1. **LLM Brain**: The reasoning engine
2. **Tools**: APIs, databases, actions
3. **Memory**: Short-term and long-term
4. **Planning**: Breaking down complex tasks
5. **Execution**: Running actions

## Types of AI Agents

### 1. Simple Reflex Agents
- Condition-action rules
- No memory or planning
- Example: Spam filters

### 2. Model-Based Agents
- Internal state tracking
- Prediction capabilities
- Example: Navigation systems

### 3. Goal-Based Agents
- Work toward objectives
- Multi-step planning
- Example: Research assistants

### 4. Utility-Based Agents
- Optimize for preferences
- Trade-off analysis
- Example: Trading bots

### 5. Learning Agents
- Improve from experience
- Adaptive behavior
- Example: Game-playing AI

## Enterprise Agent Use Cases

| Domain | Agent Type |
|--------|------------|
| Customer Support | Issue resolution agent |
| Sales | Lead qualification agent |
| IT Operations | Incident response agent |
| HR | Onboarding assistant agent |
| Finance | Expense processing agent |
      `,
            quiz: {
                question: "What distinguishes an AI agent from a chatbot?",
                options: [
                    "Agents use newer technology",
                    "Agents can take multi-step actions, use tools, and work toward goals autonomously",
                    "Agents are more expensive",
                    "There is no real difference"
                ],
                correctIndex: 1,
                explanation: "AI agents go beyond chatbots by being able to reason about goals, plan multi-step actions, use tools to interact with external systems, maintain memory, and work autonomously toward objectives."
            }
        },
        {
            id: "lesson-2",
            title: "Agent Frameworks & Patterns",
            duration: "25 min",
            type: "video",
            content: `
# Agent Frameworks & Patterns

## Popular Agent Frameworks

### LangGraph
- State machine approach
- Visual workflow design
- Built on LangChain
- Great for complex flows

### AutoGPT / AutoGen
- Autonomous agents
- Multi-agent collaboration
- Task decomposition
- Microsoft-backed (AutoGen)

### CrewAI
- Role-based agents
- Team collaboration
- Hierarchical management
- Process-oriented

### OpenAI Assistants
- Managed infrastructure
- Tool use built-in
- Retrieval included
- Easy to deploy

## Core Agent Patterns

### 1. ReAct (Reason + Act)
The agent alternates between:
- **Thought**: Reasoning about the situation
- **Action**: Taking a step
- **Observation**: Seeing the result

### 2. Plan & Execute
1. Create full plan upfront
2. Execute steps sequentially
3. Re-plan if needed

### 3. Reflection
- Agent reviews its own work
- Critiques and improves
- Iterative refinement

### 4. Multi-Agent Collaboration
- Specialized agents for tasks
- Orchestrator coordinates
- Parallel execution

## Tool Design Principles

Good agent tools should be:
- **Single purpose**: One function per tool
- **Well-documented**: Clear descriptions
- **Error-handled**: Graceful failures
- **Deterministic**: Predictable behavior

## Memory Systems

| Type | Purpose | Example |
|------|---------|---------|
| **Working** | Current context | Conversation buffer |
| **Episodic** | Past experiences | Previous sessions |
| **Semantic** | Knowledge base | RAG retrieval |
| **Procedural** | How-to knowledge | Skill memory |
      `,
            quiz: {
                question: "What is the ReAct pattern in AI agents?",
                options: [
                    "A JavaScript framework for agents",
                    "An alternating cycle of Reasoning, Acting, and Observing",
                    "A type of neural network",
                    "A deployment strategy"
                ],
                correctIndex: 1,
                explanation: "ReAct (Reason + Act) is a pattern where the agent alternates between thinking/reasoning about the situation, taking an action, and observing the result before repeating the cycle."
            }
        },
        {
            id: "lesson-3",
            title: "Designing Enterprise Agents",
            duration: "30 min",
            type: "video",
            content: `
# Designing Enterprise Agents

## Enterprise Requirements

Unlike research agents, enterprise agents need:
- **Reliability**: Consistent performance
- **Security**: Access controls, audit logs
- **Compliance**: Regulatory adherence
- **Scalability**: Handle load
- **Observability**: Debugging, monitoring

## Agent Architecture Layers

### 1. Interface Layer
- Chat interface
- API endpoints
- Webhooks
- Email/Slack integration

### 2. Orchestration Layer
- Request routing
- Session management
- Context handling
- Rate limiting

### 3. Reasoning Layer
- LLM selection
- Prompt templating
- Tool dispatch
- Memory access

### 4. Tool Layer
- API integrations
- Database queries
- File operations
- External services

### 5. Governance Layer
- Approval workflows
- Human-in-the-loop
- Guardrails
- Audit logging

## Human-in-the-Loop Patterns

| Pattern | Use Case |
|---------|----------|
| **Approval gates** | High-impact actions |
| **Escalation** | Error handling |
| **Confirmation** | Irreversible changes |
| **Override** | Agent corrections |

## Guardrails for Safety

1. **Input validation**: Filter harmful inputs
2. **Output filtering**: Check responses
3. **Action limits**: Prevent dangerous operations
4. **Budget controls**: Token/call limits
5. **Time limits**: Prevent infinite loops

## Monitoring Agent Performance

Key Metrics:
- **Task completion rate**
- **Steps per task**
- **Tool success rate**
- **Latency**
- **User satisfaction**
- **Escalation rate**
      `,
            quiz: {
                question: "Why is human-in-the-loop important for enterprise agents?",
                options: [
                    "To slow down the agent",
                    "To provide approval for high-impact actions and error handling",
                    "To replace the agent entirely",
                    "It's not important for enterprise"
                ],
                correctIndex: 1,
                explanation: "Human-in-the-loop ensures that high-impact or irreversible actions get human approval, errors can be escalated and corrected, and there are safeguards against agent mistakes in enterprise environments."
            }
        }
    ]
};

export const legacyModernizationContent = {
    id: "legacy-modernization-ai",
    title: "Legacy Modernization with AI",
    description: "Transform legacy systems using AI-powered approaches",
    category: "AI & Technology",
    duration: "4 hours",
    level: "Intermediate",

    lessons: [
        {
            id: "lesson-1",
            title: "The Legacy System Challenge",
            duration: "20 min",
            type: "video",
            content: `
# The Legacy System Challenge

## What is a Legacy System?

A legacy system is any technology that:
- Is outdated but still critical to operations
- Is expensive to maintain
- Has limited documentation
- Uses outdated languages/platforms
- Has accumulated technical debt

## The Scale of the Problem

- **75%** of enterprise IT budgets go to maintaining legacy systems
- **60%** of organizations cite legacy modernization as a top priority
- **$2.5 trillion** spent annually on legacy maintenance globally

## Why Modernization Is Hard

### Technical Challenges
- **Undocumented code**: Knowledge in developers' heads
- **Tight coupling**: Changes ripple everywhere
- **Testing gaps**: No automated tests
- **Data complexity**: Years of schema evolution

### Business Challenges
- **Risk**: Can't afford downtime
- **Cost**: Multi-year investments
- **Talent**: COBOL developers retiring
- **Politics**: Ownership unclear

## The AI Opportunity

AI can accelerate modernization by:
1. **Understanding** legacy code automatically
2. **Documenting** systems at scale
3. **Translating** between languages
4. **Testing** generated code
5. **Validating** equivalence

## Modernization Approaches

| Approach | Description | Risk |
|----------|-------------|------|
| **Rehost** | Lift and shift | Low |
| **Replatform** | Minor changes | Low-Medium |
| **Refactor** | Restructure code | Medium |
| **Rearchitect** | Rebuild architecture | High |
| **Replace** | New system | Highest |
      `,
            quiz: {
                question: "What percentage of enterprise IT budgets typically goes to legacy maintenance?",
                options: ["25%", "50%", "75%", "90%"],
                correctIndex: 2,
                explanation: "Research consistently shows that approximately 75% of enterprise IT budgets are spent maintaining legacy systems, leaving only 25% for innovation and new development."
            }
        },
        {
            id: "lesson-2",
            title: "AI-Powered Code Analysis",
            duration: "25 min",
            type: "video",
            content: `
# AI-Powered Code Analysis

## Understanding Legacy Code with AI

LLMs can analyze legacy code to:
- Generate documentation
- Explain business logic
- Map dependencies
- Identify patterns
- Detect issues

## Code Analysis Techniques

### 1. Static Analysis + AI
Combine traditional parsing with LLM understanding:
- AST (Abstract Syntax Tree) extraction
- Call graph generation
- LLM interpretation of patterns

### 2. Natural Language Documentation
AI generates:
- Function summaries
- Module documentation
- API specifications
- Architecture diagrams (text-to-diagram)

### 3. Business Rule Extraction
AI identifies:
- Validation rules
- Calculation logic
- Workflow patterns
- Conditional branches

## Practical Example: COBOL Analysis

Given legacy COBOL:
\`\`\`cobol
PERFORM VARYING I FROM 1 BY 1 UNTIL I > 10
    COMPUTE TOTAL = TOTAL + AMOUNT(I)
END-PERFORM
\`\`\`

AI explains:
> "This loop sums the first 10 elements of the AMOUNT array into TOTAL."

## Tools for AI Code Analysis

| Tool | Capability |
|------|------------|
| **GitHub Copilot** | Inline explanations |
| **Amazon Q** | AWS code understanding |
| **Cursor** | Full codebase analysis |
| **Sourcegraph Cody** | Code search + explain |

## Building a Code Knowledge Base

1. Parse all source files
2. Extract functions and relationships
3. Generate embeddings
4. Store in vector database
5. Query with natural language
      `,
            quiz: {
                question: "What is a key benefit of using AI for legacy code analysis?",
                options: [
                    "It automatically fixes all bugs",
                    "It generates documentation and explanations at scale",
                    "It eliminates the need for developers",
                    "It makes code run faster"
                ],
                correctIndex: 1,
                explanation: "AI can analyze legacy code and automatically generate documentation, explanations, and dependency maps at a scale that would be impossibly time-consuming for humans to do manually."
            }
        },
        {
            id: "lesson-3",
            title: "AI-Assisted Code Translation",
            duration: "30 min",
            type: "video",
            content: `
# AI-Assisted Code Translation

## Language Translation with LLMs

Modern LLMs can translate between programming languages:
- COBOL → Java/C#
- VB6 → C#/.NET
- PL/SQL → PostgreSQL
- Fortran → Python

## Translation Workflow

### 1. Analysis Phase
- Parse source code
- Understand business logic
- Map data structures
- Identify patterns

### 2. Translation Phase
- Convert syntax
- Map equivalent constructs
- Preserve semantics
- Handle edge cases

### 3. Validation Phase
- Unit test generation
- Integration testing
- Behavioral verification
- Performance comparison

## Challenges in Code Translation

### Semantic Preservation
The translated code must behave identically:
- Same outputs for same inputs
- Same error handling
- Same edge case behavior

### Idiomatic Code
Good translations use target language patterns:
- Not just literal translation
- Leverage modern features
- Follow conventions

### Runtime Differences
Languages behave differently:
- Numeric precision
- String handling
- Date/time zones
- Null semantics

## AI Translation Best Practices

1. **Chunk appropriately**: Function-by-function
2. **Preserve tests**: Translate tests first
3. **Incremental approach**: Strangler fig pattern
4. **Human review**: AI + expert validation
5. **Dual-run period**: Run both systems in parallel

## The Strangler Fig Pattern

Gradually replace legacy:
1. Route new features to modern code
2. Migrate functionality piece by piece
3. Legacy system shrinks over time
4. Eventually, fully replaced
      `,
            quiz: {
                question: "What is the 'Strangler Fig' pattern in modernization?",
                options: [
                    "A type of plant used in offices",
                    "Gradually replacing legacy by routing new features to modern code while migrating piece by piece",
                    "A debugging technique",
                    "A deployment strategy for containers"
                ],
                correctIndex: 1,
                explanation: "The Strangler Fig pattern involves gradually replacing a legacy system by routing new functionality to modern code while incrementally migrating existing features, until the legacy system is fully replaced."
            }
        }
    ]
};

// Export all AI content
export const aiTrainingContent = {
    "ai-native-transformation": aiNativeContent,
    "agentic-ai": agenticAIContent,
    "legacy-modernization-ai": legacyModernizationContent,
};
