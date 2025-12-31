// AI-Native Training Curriculum - Flagship ScaledNative Offering
// Based on SAFe, DeepLearning.AI, Google Cloud, Microsoft

export type CertificationLevel = "foundations" | "associate" | "professional" | "architect";
export type ModuleStatus = "available" | "coming_soon" | "locked";

export interface LearningObjective {
    id: string;
    text: string;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    duration: string;
    subtopics?: string[];
}

export interface HandsOnProject {
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
}

export interface LearningResource {
    id: string;
    type: "video" | "article" | "documentation" | "course";
    title: string;
    source: string;
    url: string;
    duration?: string;
    description?: string;
}

export interface AIModule {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    level: CertificationLevel;
    status: ModuleStatus;
    prerequisites?: string[];
    learningObjectives: LearningObjective[];
    topics: Topic[];
    handsOnProjects: HandsOnProject[];
    resources?: LearningResource[];
    assessmentType: string;
    thumbnail?: string;
}

export interface CertificationTrack {
    id: string;
    level: CertificationLevel;
    title: string;
    shortTitle: string;
    description: string;
    duration: string;
    modules: string[];
    prerequisites?: string[];
    validityPeriod: string;
    badge: string;
    badgeColor: string;
    nativeCertified: boolean;
    certificationCode: string;
    examDetails: {
        format: string;
        passingScore: string;
        duration: string;
    };
}

// ============================================
// CERTIFICATION TRACKS - STANDARD 4-LEVEL HIERARCHY
// ============================================

export const certificationTracks: CertificationTrack[] = [
    {
        id: "foundations-cert",
        level: "foundations",
        shortTitle: "Foundations",
        title: "AI-Native Foundations",
        description: "Master the fundamentals of AI and become AI-literate. Understand LLMs, prompt engineering, and the AI development ecosystem. Perfect for all employees beginning their AI-Native journey.",
        duration: "16-20 hours",
        modules: ["module-1", "module-2"],
        validityPeriod: "Lifetime",
        badge: "graduation-cap",
        badgeColor: "bg-blue-500",
        nativeCertified: true,
        certificationCode: "NATIVE-F",
        examDetails: {
            format: "50 multiple choice + 2 practical exercises",
            passingScore: "75%",
            duration: "90 minutes"
        }
    },
    {
        id: "associate-cert",
        level: "associate",
        shortTitle: "Associate",
        title: "AI-Native Associate Developer",
        description: "Build AI-powered applications with agentic workflows and MLOps practices. Learn from Andrew Ng's Agentic AI curriculum. Design, build, and deploy production AI systems.",
        duration: "24-30 hours",
        modules: ["module-3", "module-4"],
        prerequisites: ["AI-Native Foundations"],
        validityPeriod: "2 years",
        badge: "layers",
        badgeColor: "bg-emerald-500",
        nativeCertified: true,
        certificationCode: "NATIVE-A",
        examDetails: {
            format: "40 multiple choice + 3 hands-on labs",
            passingScore: "80%",
            duration: "2 hours"
        }
    },
    {
        id: "professional-cert",
        level: "professional",
        shortTitle: "Professional",
        title: "AI-Native Professional Developer",
        description: "Master advanced frameworks (LangGraph, CrewAI, AutoGen), production RAG systems, fine-tuning, and AI security. Lead enterprise AI implementations with responsible AI practices.",
        duration: "30-35 hours",
        modules: ["module-5", "module-6", "module-7"],
        prerequisites: ["AI-Native Associate Developer"],
        validityPeriod: "2 years",
        badge: "trophy",
        badgeColor: "bg-purple-500",
        nativeCertified: true,
        certificationCode: "NATIVE-P",
        examDetails: {
            format: "30 multiple choice + 4 hands-on labs + 1 capstone project",
            passingScore: "80%",
            duration: "3 hours"
        }
    },
    {
        id: "architect-cert",
        level: "architect",
        shortTitle: "Architect",
        title: "AI-Native Solutions Architect",
        description: "Design enterprise-scale AI platforms with multi-model orchestration, production deployment, cost optimization, and governance frameworks. Lead AI transformation initiatives across organizations.",
        duration: "35-45 hours",
        modules: ["module-8", "module-9", "module-10"],
        prerequisites: ["AI-Native Professional Developer"],
        validityPeriod: "3 years",
        badge: "crown",
        badgeColor: "bg-amber-500",
        nativeCertified: true,
        certificationCode: "NATIVE-SA",
        examDetails: {
            format: "Architecture design challenge + oral examination",
            passingScore: "85%",
            duration: "4 hours"
        }
    },
];

// ============================================
// MODULE 1: AI FUNDAMENTALS FOR DEVELOPERS
// ============================================

export const module1: AIModule = {
    id: "module-1",
    number: 1,
    title: "AI Fundamentals for Developers",
    subtitle: "Understanding LLMs, Transformers, and the AI Development Stack",
    description: "Build a solid foundation in AI concepts from a developer's perspective. Understand how LLMs work, explore the AI development stack, and master prompt engineering for code generation.",
    duration: "8-10 hours",
    level: "foundations",
    status: "available",
    learningObjectives: [
        { id: "1-1", text: "Understand how Large Language Models (LLMs) work at a conceptual level" },
        { id: "1-2", text: "Explain transformers, embeddings, and attention mechanisms" },
        { id: "1-3", text: "Differentiate between AI, ML, Deep Learning, and Generative AI" },
        { id: "1-4", text: "Recognize when to use AI vs traditional programming approaches" },
    ],
    topics: [
        {
            id: "1-1",
            title: "What is AI? A Developer's Perspective",
            description: "The evolution from rule-based systems to neural networks",
            duration: "2 hours",
            subtopics: [
                "How LLMs are trained: pre-training, fine-tuning, RLHF",
                "Understanding tokens, context windows, and model parameters",
                "The economics of AI: API costs, latency, and throughput",
            ],
        },
        {
            id: "1-2",
            title: "The AI Development Stack",
            description: "Comprehensive overview of AI tools and platforms",
            duration: "3 hours",
            subtopics: [
                "LLM providers: OpenAI, Anthropic, Google, open-source models",
                "Vector databases: Pinecone, Weaviate, Chroma",
                "Orchestration frameworks: LangChain, LlamaIndex, Semantic Kernel",
                "Agent frameworks: LangGraph, CrewAI, AutoGen",
                "Deployment platforms: Vertex AI, Azure AI, AWS Bedrock",
            ],
        },
        {
            id: "1-3",
            title: "Prompt Engineering for Developers",
            description: "Advanced techniques for effective AI prompting",
            duration: "3 hours",
            subtopics: [
                "Zero-shot, few-shot, and chain-of-thought prompting",
                "System prompts vs user prompts",
                "Prompt templates and variables",
                "Structured output generation (JSON, XML)",
                "Prompt chaining for complex workflows",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p1-1", title: "Code Documentation Generator", description: "Build a code documentation generator using prompt engineering", difficulty: "beginner", duration: "2 hours" },
        { id: "p1-2", title: "Bug Analysis Assistant", description: "Create a bug analysis assistant with structured output", difficulty: "beginner", duration: "2 hours" },
        { id: "p1-3", title: "Code Review Workflow", description: "Implement a multi-step code review workflow", difficulty: "intermediate", duration: "3 hours" },
    ],
    resources: [
        { id: "r1-1", type: "video", title: "But what is a GPT? Visual intro to transformers", source: "3Blue1Brown", url: "https://www.youtube.com/watch?v=wjZofJX0v4M", duration: "27 min", description: "Visual explanation of how transformers work" },
        { id: "r1-2", type: "video", title: "Intro to Large Language Models", source: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", duration: "1 hour", description: "Comprehensive overview of LLMs by OpenAI co-founder" },
        { id: "r1-3", type: "article", title: "Attention Is All You Need", source: "Google Research", url: "https://arxiv.org/abs/1706.03762", description: "The original transformer paper" },
        { id: "r1-4", type: "article", title: "Prompt Engineering Guide", source: "DAIR.AI", url: "https://www.promptingguide.ai/", description: "Comprehensive guide to prompt engineering techniques" },
        { id: "r1-5", type: "course", title: "ChatGPT Prompt Engineering for Developers", source: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", duration: "1 hour", description: "Free course by Andrew Ng and OpenAI" },
        { id: "r1-6", type: "documentation", title: "OpenAI API Documentation", source: "OpenAI", url: "https://platform.openai.com/docs", description: "Official API docs and best practices" },
    ],
    assessmentType: "Prompt engineering challenge + LLM architecture quiz + Project submission",
};

// ============================================
// MODULE 2: AI-ASSISTED CODING MASTERY
// ============================================

export const module2: AIModule = {
    id: "module-2",
    number: 2,
    title: "AI-Assisted Coding Mastery",
    subtitle: "GitHub Copilot, ChatGPT, and AI-Powered Development Workflows",
    description: "Master the tools that are transforming software development. Learn to leverage GitHub Copilot, ChatGPT, and Claude effectively while understanding their limitations.",
    duration: "8-10 hours",
    level: "foundations",
    status: "available",
    learningObjectives: [
        { id: "2-1", text: "Master GitHub Copilot for maximum productivity" },
        { id: "2-2", text: "Use ChatGPT and Claude effectively for coding tasks" },
        { id: "2-3", text: "Integrate AI into your development workflow" },
        { id: "2-4", text: "Understand the limitations and risks of AI-generated code" },
    ],
    topics: [
        {
            id: "2-1",
            title: "GitHub Copilot Deep Dive",
            description: "Maximize productivity with AI pair programming",
            duration: "2.5 hours",
            subtopics: [
                "Triggering and accepting suggestions effectively",
                "Writing comments that generate better code",
                "Using Copilot for test generation",
                "Copilot Chat for complex problem-solving",
                "Copilot for documentation and README generation",
            ],
        },
        {
            id: "2-2",
            title: "ChatGPT/Claude for Development",
            description: "Leveraging conversational AI for coding",
            duration: "2.5 hours",
            subtopics: [
                "Code generation and refactoring",
                "Debugging and error analysis",
                "Algorithm explanation and optimization",
                "Converting between programming languages",
                "Generating boilerplate and scaffolding",
            ],
        },
        {
            id: "2-3",
            title: "AI-Assisted Development Workflow",
            description: "Integrating AI across the SDLC",
            duration: "2 hours",
            subtopics: [
                "Planning: Using AI for technical design documents",
                "Coding: Pair programming with AI",
                "Testing: AI-generated unit tests and test data",
                "Debugging: AI-powered error analysis",
                "Documentation: Automated docs and comments",
                "Code Review: AI as a second reviewer",
            ],
        },
        {
            id: "2-4",
            title: "Best Practices and Pitfalls",
            description: "Avoiding common mistakes with AI-generated code",
            duration: "1 hour",
            subtopics: [
                "Verifying AI-generated code for correctness",
                "Security considerations (avoiding credential leaks)",
                "Licensing and copyright issues",
                "When NOT to use AI assistance",
                "Maintaining code quality standards",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p2-1", title: "Legacy Code Refactoring", description: "Refactor a legacy codebase using AI assistance", difficulty: "intermediate", duration: "3 hours" },
        { id: "p2-2", title: "REST API with AI", description: "Build a REST API entirely with AI pair programming", difficulty: "intermediate", duration: "3 hours" },
        { id: "p2-3", title: "Test Suite Generation", description: "Generate comprehensive test suite for existing code", difficulty: "intermediate", duration: "2 hours" },
    ],
    assessmentType: "Timed coding challenge with AI assistance + Code quality review",
};

// ============================================
// MODULE 3: AGENTIC AI (BASED ON ANDREW NG)
// ============================================

export const module3: AIModule = {
    id: "module-3",
    number: 3,
    title: "Agentic AI - Building Autonomous Systems",
    subtitle: "Reflection, Tool Use, Planning, and Multi-Agent Workflows",
    description: "Based on DeepLearning.AI's Agentic AI course by Andrew Ng. Build agentic design patterns that enable AI to plan, execute, reflect, and adapt to complete complex tasks autonomously.",
    duration: "12-15 hours",
    level: "associate",
    status: "available",
    learningObjectives: [
        { id: "3-1", text: "Build agentic design patterns: reflection, tool use, planning, multi-agent workflows" },
        { id: "3-2", text: "Integrate AI with external tools: databases, APIs, web search, code execution" },
        { id: "3-3", text: "Evaluate and optimize AI systems for production deployment" },
        { id: "3-4", text: "Understand degrees of autonomy in AI agents" },
    ],
    topics: [
        {
            id: "3-1",
            title: "Introduction to Agentic Workflows",
            description: "Understanding agentic AI and its benefits",
            duration: "2 hours",
            subtopics: [
                "What is Agentic AI vs traditional prompt-response",
                "Degrees of autonomy: assisted to fully autonomous",
                "Real-world applications and use cases",
                "Task decomposition for agent workflows",
            ],
        },
        {
            id: "3-2",
            title: "The Reflection Design Pattern",
            description: "AI that critiques and improves its own work",
            duration: "2.5 hours",
            subtopics: [
                "Self-critique and iteration for quality improvement",
                "Implementation: generate → critique → refine → iterate",
                "Use cases: chart generation, SQL queries, code generation",
                "External feedback integration",
            ],
        },
        {
            id: "3-3",
            title: "The Tool Use Pattern",
            description: "Connecting AI to databases, APIs, and external services",
            duration: "3 hours",
            subtopics: [
                "Creating tools: schemas, functions, error handling",
                "Tool syntax standards and function calling",
                "Model Context Protocol (MCP)",
                "Code execution as a tool",
                "Common tool categories: data, action, computation, search",
            ],
        },
        {
            id: "3-4",
            title: "The Planning Pattern",
            description: "Breaking complex tasks into executable steps",
            duration: "2.5 hours",
            subtopics: [
                "Upfront, iterative, hierarchical, and adaptive planning",
                "Creating and executing LLM plans",
                "Plan representation formats (JSON, YAML)",
                "Planning with code execution",
            ],
        },
        {
            id: "3-5",
            title: "The Multi-Agent Pattern",
            description: "Coordinating multiple specialized AI systems",
            duration: "2.5 hours",
            subtopics: [
                "Multi-agent architectures: sequential, parallel, hierarchical, collaborative",
                "Communication patterns: broadcast, point-to-point, pub-sub, shared state",
                "Agent specialization: research, analysis, writing, critique, orchestrator",
            ],
        },
        {
            id: "3-6",
            title: "Evaluating and Optimizing Agentic Systems",
            description: "Production-ready agent development",
            duration: "2 hours",
            subtopics: [
                "Evaluation frameworks and metrics",
                "Error analysis and debugging",
                "Component-level evaluations",
                "Cost and latency optimization",
            ],
        },
        {
            id: "3-7",
            title: "Agent Memory and Context Management",
            description: "LLMs as Operating Systems: Managing state across interactions",
            duration: "2 hours",
            subtopics: [
                "Short-term vs long-term agent memory",
                "Context window management strategies",
                "Semantic caching for efficiency",
                "Memory retrieval and summarization",
                "Persistent state across sessions",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p3-1", title: "Chart Generation Agent", description: "Build a chart generation agent with reflection pattern", difficulty: "intermediate", duration: "3 hours" },
        { id: "p3-2", title: "Research Agent with Tools", description: "Create a web search and summarization agent", difficulty: "intermediate", duration: "3 hours" },
        { id: "p3-3", title: "Multi-Agent Research Team", description: "Build a market research team with specialized agents", difficulty: "advanced", duration: "4 hours" },
        { id: "p3-4", title: "Complete Agentic System", description: "Implement all four design patterns in one system", difficulty: "advanced", duration: "5 hours" },
    ],
    assessmentType: "Build complete agentic system + Deploy to production environment + Evaluation report",
};

// ============================================
// MODULE 4: AI ENGINEERING AND MLOPS
// ============================================

export const module4: AIModule = {
    id: "module-4",
    number: 4,
    title: "AI Engineering and MLOps",
    subtitle: "Design, Build, and Productionize ML Models",
    description: "Based on Google Cloud ML Engineer Learning Path. Learn to design, build, and productionize ML models with enterprise-grade MLOps practices.",
    duration: "12-15 hours",
    level: "associate",
    status: "available",
    learningObjectives: [
        { id: "4-1", text: "Design, build, and productionize ML models" },
        { id: "4-2", text: "Implement MLOps practices for generative AI" },
        { id: "4-3", text: "Deploy and maintain AI systems at scale" },
        { id: "4-4", text: "Optimize ML systems for performance and cost" },
    ],
    topics: [
        {
            id: "4-1",
            title: "Introduction to AI/ML on Cloud",
            description: "The AI/ML ecosystem and project lifecycle",
            duration: "2 hours",
            subtopics: [
                "Vertex AI: Unified ML platform",
                "BigQuery ML: SQL-based ML",
                "AutoML: No-code ML solutions",
                "ML project lifecycle phases",
            ],
        },
        {
            id: "4-2",
            title: "Data Preparation and Feature Engineering",
            description: "Building robust data pipelines",
            duration: "3 hours",
            subtopics: [
                "Data pipeline design with cloud services",
                "Feature selection and extraction",
                "Feature scaling and normalization",
                "Feature store management",
            ],
        },
        {
            id: "4-3",
            title: "Model Training and Evaluation",
            description: "Training approaches and evaluation metrics",
            duration: "3 hours",
            subtopics: [
                "Custom training with TensorFlow/PyTorch",
                "AutoML for automated model selection",
                "Transfer learning and fine-tuning",
                "Evaluation metrics for different model types",
            ],
        },
        {
            id: "4-4",
            title: "Machine Learning Operations (MLOps)",
            description: "CI/CD for ML and continuous monitoring",
            duration: "4 hours",
            subtopics: [
                "MLOps principles: CI/CT/CD/CM",
                "Version control: code, data, models",
                "Automated testing and validation pipelines",
                "Monitoring: drift detection, alerts, incident response",
            ],
        },
        {
            id: "4-5",
            title: "Building and Deploying on Cloud",
            description: "Production deployment and scaling",
            duration: "3 hours",
            subtopics: [
                "Deployment options: online, batch, edge",
                "Autoscaling and load balancing",
                "A/B testing and canary deployments",
                "Disaster recovery planning",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p4-1", title: "End-to-End ML Pipeline", description: "Build complete ML pipeline on cloud platform", difficulty: "intermediate", duration: "4 hours" },
        { id: "p4-2", title: "CI/CD for ML", description: "Implement CI/CD pipeline for ML model", difficulty: "advanced", duration: "3 hours" },
        { id: "p4-3", title: "Production Deployment", description: "Deploy model with monitoring and alerting", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Design ML system architecture + Implement MLOps workflow + Deploy production model",
};

// ============================================
// MODULE 5: ADVANCED AGENTIC FRAMEWORKS
// ============================================

export const module5: AIModule = {
    id: "module-5",
    number: 5,
    title: "Advanced Agentic AI Frameworks",
    subtitle: "LangGraph, CrewAI, AutoGen + SAFe AI Workflows",
    description: "Master the leading frameworks for building sophisticated agent systems. Learn when to use each framework and how to integrate AI into SAFe Agile workflows.",
    duration: "12-15 hours",
    level: "professional",
    status: "available",
    prerequisites: ["AI-Native Developer Foundations"],
    learningObjectives: [
        { id: "5-1", text: "Master LangGraph for complex agent workflows" },
        { id: "5-2", text: "Build multi-agent systems with CrewAI" },
        { id: "5-3", text: "Implement enterprise agents with AutoGen" },
        { id: "5-4", text: "Integrate AI into SAFe Agile ceremonies and workflows" },
    ],
    topics: [
        {
            id: "5-1",
            title: "LangGraph for State Management",
            description: "Graph-based agent architecture",
            duration: "3 hours",
            subtopics: [
                "State management across workflow steps",
                "Conditional edges and branching logic",
                "Human-in-the-loop workflows",
                "Parallel execution and streaming",
            ],
        },
        {
            id: "5-2",
            title: "CrewAI for Business Workflow Automation",
            description: "Multi-agent teams for enterprise tasks",
            duration: "3 hours",
            subtopics: [
                "Role-based agent design (researcher, writer, analyst)",
                "Task delegation and coordination patterns",
                "Sequential vs parallel crew execution",
                "Real-world use cases: content creation, research, analysis",
                "Integrating crews with existing business processes",
            ],
        },
        {
            id: "5-3",
            title: "AutoGen for Enterprise Agents",
            description: "Conversational and code execution agents",
            duration: "3 hours",
            subtopics: [
                "Conversational and code execution agents",
                "Enterprise integration patterns",
                "Authentication, logging, audit trails",
            ],
        },
        {
            id: "5-4",
            title: "SAFe AI: AI-Empowered Agile Workflows",
            description: "Integrating AI into Scaled Agile Framework (SAFe 6.0)",
            duration: "3 hours",
            subtopics: [
                "AI in PI Planning and sprint ceremonies",
                "Predictive backlog management and prioritization",
                "AI-assisted retrospectives and continuous improvement",
                "AI for Scrum Masters: automating facilitation tasks",
                "Responsible AI governance in Agile teams",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p5-1", title: "LangGraph Workflow", description: "Build complex workflow with state management", difficulty: "advanced", duration: "3 hours" },
        { id: "p5-2", title: "CrewAI Business Team", description: "Create multi-agent content creation team", difficulty: "advanced", duration: "3 hours" },
        { id: "p5-3", title: "SAFe AI Sprint Assistant", description: "Build AI assistant for sprint planning and retrospectives", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Framework comparison report + SAFe AI integration plan",
};

// ============================================
// MODULE 6: GENERATIVE AI APPLICATION DEV
// ============================================

export const module6: AIModule = {
    id: "module-6",
    number: 6,
    title: "Generative AI Application Development",
    subtitle: "RAG, Fine-Tuning, and Production GenAI Systems",
    description: "Build production-ready generative AI applications with RAG, fine-tuning, and enterprise security. Learn to optimize for cost and performance.",
    duration: "10-12 hours",
    level: "professional",
    status: "available",
    prerequisites: ["AI-Native Developer Foundations"],
    learningObjectives: [
        { id: "6-1", text: "Build production-ready GenAI applications" },
        { id: "6-2", text: "Implement Retrieval-Augmented Generation (RAG)" },
        { id: "6-3", text: "Fine-tune models for specific domains" },
        { id: "6-4", text: "Optimize for cost and performance" },
    ],
    topics: [
        {
            id: "6-1",
            title: "RAG (Retrieval-Augmented Generation)",
            description: "Complete RAG architecture and implementation",
            duration: "4 hours",
            subtopics: [
                "Document ingestion and chunking strategies",
                "Embedding generation and vector databases",
                "Semantic search and hybrid retrieval",
                "Advanced techniques: multi-query, HyDE, re-ranking",
            ],
        },
        {
            id: "6-2",
            title: "Fine-Tuning vs RAG",
            description: "When to use each approach",
            duration: "3 hours",
            subtopics: [
                "Use case analysis: when to use each",
                "Fine-tuning process and best practices",
                "Cost-benefit analysis",
                "Hybrid approaches",
            ],
        },
        {
            id: "6-3",
            title: "Production GenAI Applications",
            description: "Architecture, UX, and security",
            duration: "3 hours",
            subtopics: [
                "API layer design and rate limiting",
                "Streaming responses and caching",
                "Prompt injection prevention",
                "PII detection and compliance",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p6-1", title: "Production RAG System", description: "Build production-ready RAG application", difficulty: "advanced", duration: "5 hours" },
        { id: "p6-2", title: "Fine-Tuned Model", description: "Implement fine-tuned model for specific domain", difficulty: "advanced", duration: "4 hours" },
        { id: "p6-3", title: "Secure GenAI API", description: "Create secure GenAI API with authentication", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Production RAG deployment + Security assessment",
};

// ============================================
// MODULE 7: AI SECURITY AND RESPONSIBLE AI
// ============================================

export const module7: AIModule = {
    id: "module-7",
    number: 7,
    title: "AI Security and Responsible AI",
    subtitle: "AISec, Ethics, Governance, and Compliance",
    description: "Understand AI security threats and implement responsible AI practices. Ensure fairness, transparency, and compliance with emerging AI regulations.",
    duration: "8-10 hours",
    level: "professional",
    status: "available",
    prerequisites: ["AI-Native Developer Foundations"],
    learningObjectives: [
        { id: "7-1", text: "Understand AI security threats and mitigations" },
        { id: "7-2", text: "Implement responsible AI practices" },
        { id: "7-3", text: "Ensure fairness, transparency, and accountability" },
        { id: "7-4", text: "Comply with AI regulations and standards" },
    ],
    topics: [
        {
            id: "7-1",
            title: "AI Security (AISec)",
            description: "Threat landscape and security best practices",
            duration: "3 hours",
            subtopics: [
                "Prompt injection, data poisoning, adversarial attacks",
                "Input validation and output filtering",
                "Secure API design and access control",
            ],
        },
        {
            id: "7-2",
            title: "Responsible AI Principles",
            description: "Fairness, transparency, accountability, privacy, safety",
            duration: "3 hours",
            subtopics: [
                "Bias detection and mitigation",
                "Explainable AI (XAI) techniques",
                "Red teaming and adversarial testing",
            ],
        },
        {
            id: "7-3",
            title: "AI Governance and Compliance",
            description: "Regulatory landscape and governance frameworks",
            duration: "2 hours",
            subtopics: [
                "EU AI Act, GDPR, industry-specific regulations",
                "AI ethics committees and approval processes",
                "Incident response and continuous monitoring",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p7-1", title: "Security Assessment", description: "Conduct security assessment of AI application", difficulty: "advanced", duration: "3 hours" },
        { id: "p7-2", title: "Bias Detection", description: "Implement bias detection and mitigation", difficulty: "advanced", duration: "3 hours" },
        { id: "p7-3", title: "Governance Framework", description: "Design AI governance framework", difficulty: "advanced", duration: "2 hours" },
    ],
    assessmentType: "Security and bias assessment + Governance framework design",
};

// ============================================
// MODULE 8: ENTERPRISE AI ARCHITECTURE
// ============================================

export const module8: AIModule = {
    id: "module-8",
    number: 8,
    title: "Enterprise AI Architecture",
    subtitle: "Platform Design, Multi-Model Orchestration, and Governance",
    description: "Design enterprise-scale AI systems with multi-model orchestration and comprehensive governance. Optimize for cost, performance, and reliability at scale.",
    duration: "15-20 hours",
    level: "architect",
    status: "available",
    prerequisites: ["AI-Native Developer Professional"],
    learningObjectives: [
        { id: "8-1", text: "Design enterprise-scale AI systems" },
        { id: "8-2", text: "Architect multi-model AI platforms" },
        { id: "8-3", text: "Implement AI governance at scale" },
        { id: "8-4", text: "Optimize for cost, performance, and reliability" },
    ],
    topics: [
        {
            id: "8-1",
            title: "Enterprise AI Platform Design",
            description: "Platform components and architecture patterns",
            duration: "5 hours",
            subtopics: [
                "Model serving infrastructure and feature stores",
                "Microservices for AI, event-driven systems",
                "Hybrid cloud and edge deployment",
            ],
        },
        {
            id: "8-2",
            title: "Multi-Model Orchestration",
            description: "Model selection, routing, and ensemble methods",
            duration: "4 hours",
            subtopics: [
                "Model routing based on task",
                "Fallback models for reliability",
                "Ensemble methods for accuracy",
            ],
        },
        {
            id: "8-3",
            title: "Cost Optimization at Scale",
            description: "Cost drivers and optimization techniques",
            duration: "3 hours",
            subtopics: [
                "Prompt compression and response caching",
                "Model quantization and distillation",
                "Spot instances and reserved capacity",
            ],
        },
        {
            id: "8-4",
            title: "Enterprise AI Governance",
            description: "Strategy, CoE, risk management",
            duration: "3 hours",
            subtopics: [
                "AI strategy and Center of Excellence",
                "Risk assessment framework",
                "Continuous monitoring and auditing",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p8-1", title: "Enterprise Platform Design", description: "Design enterprise AI platform architecture", difficulty: "advanced", duration: "5 hours" },
        { id: "p8-2", title: "Multi-Model System", description: "Implement multi-model orchestration", difficulty: "advanced", duration: "4 hours" },
        { id: "p8-3", title: "Cost Optimization Strategy", description: "Create cost optimization strategy", difficulty: "advanced", duration: "3 hours" },
        { id: "p8-4", title: "Governance Framework", description: "Develop enterprise AI governance framework", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Enterprise architecture capstone project + Architect certification exam",
};

// ============================================
// MODULE 9: PRODUCTION DEPLOYMENT
// ============================================

export const module9: AIModule = {
    id: "module-9",
    number: 9,
    title: "Production Deployment",
    subtitle: "Infrastructure, Scaling, and Reliability at Scale",
    description: "Deploy AI applications to production with proper infrastructure, scaling strategies, cost management, and disaster recovery. Build reliable systems that handle real-world traffic.",
    duration: "10-12 hours",
    level: "architect",
    status: "available",
    prerequisites: ["AI-Native Professional Developer"],
    learningObjectives: [
        { id: "9-1", text: "Design scalable AI infrastructure patterns" },
        { id: "9-2", text: "Implement load balancing and caching strategies" },
        { id: "9-3", text: "Optimize AI costs at production scale" },
        { id: "9-4", text: "Build reliable systems with fallbacks and disaster recovery" },
    ],
    topics: [
        {
            id: "9-1",
            title: "Infrastructure Patterns",
            description: "API gateways, microservices, serverless, and containers",
            duration: "3 hours",
            subtopics: [
                "API gateway patterns for AI services",
                "Microservices vs monolithic AI systems",
                "Containerization with Docker and Kubernetes",
                "Serverless AI deployments",
            ],
        },
        {
            id: "9-2",
            title: "Scaling Strategies",
            description: "Load balancing, caching, and queue-based architectures",
            duration: "3 hours",
            subtopics: [
                "Load balancing for LLM services",
                "Response and semantic caching",
                "Queue-based architectures for async processing",
                "Auto-scaling configurations",
            ],
        },
        {
            id: "9-3",
            title: "Cost Optimization",
            description: "Managing AI costs at scale",
            duration: "2 hours",
            subtopics: [
                "Cost tracking and analysis",
                "Model routing by complexity",
                "Token optimization techniques",
                "Batch processing strategies",
            ],
        },
        {
            id: "9-4",
            title: "Reliability Engineering",
            description: "Building resilient AI systems",
            duration: "2 hours",
            subtopics: [
                "Health checks and monitoring",
                "Multi-provider fallback chains",
                "Circuit breakers for AI services",
                "Disaster recovery planning",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p9-1", title: "Production AI Platform", description: "Deploy containerized AI service with load balancing", difficulty: "advanced", duration: "4 hours" },
        { id: "p9-2", title: "Cost Optimization System", description: "Implement model routing and caching", difficulty: "advanced", duration: "3 hours" },
        { id: "p9-3", title: "Reliability Framework", description: "Build fallback chain and health monitoring", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Production deployment capstone + Infrastructure design review",
};

// ============================================
// MODULE 10: AI LEADERSHIP AND STRATEGY
// ============================================

export const module10: AIModule = {
    id: "module-10",
    number: 10,
    title: "AI Leadership and Strategy",
    subtitle: "Vision, Teams, Governance, and Organizational Transformation",
    description: "Lead AI transformation initiatives with strategic vision, effective team building, governance frameworks, and change management. Drive organizational AI adoption and measure business value.",
    duration: "8-10 hours",
    level: "architect",
    status: "available",
    prerequisites: ["AI-Native Professional Developer"],
    learningObjectives: [
        { id: "10-1", text: "Develop AI vision and strategic roadmap" },
        { id: "10-2", text: "Build and lead effective AI teams" },
        { id: "10-3", text: "Establish AI governance and ethics frameworks" },
        { id: "10-4", text: "Measure ROI and drive organizational adoption" },
    ],
    topics: [
        {
            id: "10-1",
            title: "AI Strategy",
            description: "Vision, roadmap, and competitive positioning",
            duration: "2 hours",
            subtopics: [
                "Developing AI vision and roadmap",
                "Build vs buy decision framework",
                "Competitive positioning with AI",
                "AI maturity assessment",
            ],
        },
        {
            id: "10-2",
            title: "Team Building",
            description: "Structure, talent, and culture",
            duration: "2 hours",
            subtopics: [
                "AI team structures and models",
                "Hiring and growing AI talent",
                "Building innovation culture",
                "Cross-functional collaboration",
            ],
        },
        {
            id: "10-3",
            title: "Governance and Ethics",
            description: "Responsible AI leadership",
            duration: "2 hours",
            subtopics: [
                "AI governance frameworks",
                "Ethics and responsibility principles",
                "Risk-tiered approval processes",
                "Compliance requirements",
            ],
        },
        {
            id: "10-4",
            title: "Value and Adoption",
            description: "Measuring and driving impact",
            duration: "2 hours",
            subtopics: [
                "ROI and value measurement",
                "Leading vs lagging indicators",
                "Change management strategies",
                "Executive communication",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p10-1", title: "AI Transformation Plan", description: "Develop comprehensive AI strategy for organization", difficulty: "advanced", duration: "4 hours" },
        { id: "p10-2", title: "Governance Framework", description: "Design AI governance and ethics framework", difficulty: "advanced", duration: "2 hours" },
        { id: "p10-3", title: "ROI Model", description: "Build AI value measurement framework", difficulty: "advanced", duration: "2 hours" },
    ],
    assessmentType: "Strategic transformation plan + Executive presentation",
};

// ============================================
// COMPLETE CURRICULUM EXPORT
// ============================================

export const aiNativeCurriculum: AIModule[] = [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9,
    module10,
];

export const getModuleById = (id: string): AIModule | undefined => {
    return aiNativeCurriculum.find(m => m.id === id);
};

export const getModulesByLevel = (level: CertificationLevel): AIModule[] => {
    return aiNativeCurriculum.filter(m => m.level === level);
};

export const getCertificationTrack = (level: CertificationLevel): CertificationTrack | undefined => {
    return certificationTracks.find(t => t.level === level);
};

export const getTotalDuration = (): string => {
    return "90-120 hours";
};

export const getTotalModules = (): number => {
    return aiNativeCurriculum.length;
};
