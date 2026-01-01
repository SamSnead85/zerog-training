// Capstone Projects - Portfolio-worthy projects for each certification level
// These projects demonstrate mastery and become portfolio pieces

import { CapstoneProject } from "./ai-native-curriculum";

// ============================================
// FOUNDATIONS CAPSTONE: AI-Powered Code Documentation Tool
// ============================================
export const foundationsCapstone: CapstoneProject = {
    id: "capstone-foundations",
    title: "AI-Powered Code Documentation Tool",
    description: "Build a complete tool that analyzes codebases and generates comprehensive documentation including README files, API docs, and inline comments.",
    duration: "8-10 hours",
    level: "foundations",

    businessCase: "Documentation is consistently the most neglected aspect of software development. An AI-powered documentation tool can reduce the time spent on documentation by 70% while improving consistency and completeness.",

    requirements: [
        {
            category: "Core Functionality",
            items: [
                "Accept a code file or directory as input",
                "Generate docstrings for all functions and classes",
                "Create a README.md with project overview, installation, and usage",
                "Produce API documentation in Markdown format"
            ]
        },
        {
            category: "Prompt Engineering",
            items: [
                "Use few-shot examples for consistent formatting",
                "Implement chain-of-thought for complex function analysis",
                "Handle edge cases: empty functions, decorators, async code"
            ]
        },
        {
            category: "Quality Assurance",
            items: [
                "Output must be grammatically correct",
                "Generated docs must be technically accurate",
                "Support Python and JavaScript at minimum"
            ]
        }
    ],

    technologyStack: ["Python", "OpenAI API", "Click CLI", "Markdown"],

    deliverables: [
        {
            name: "Working CLI Tool",
            description: "Command-line application that accepts file paths and outputs documentation",
            format: "Python package with entry point"
        },
        {
            name: "Prompt Library",
            description: "Collection of prompts for different documentation types",
            format: "JSON or YAML configuration file"
        },
        {
            name: "Sample Output",
            description: "Documentation generated for 3 open-source projects",
            format: "Markdown files"
        },
        {
            name: "Technical Write-up",
            description: "Document explaining design decisions and lessons learned",
            format: "1-2 page PDF"
        }
    ],

    rubric: [
        {
            category: "Functionality",
            weight: 40,
            criteria: [
                {
                    description: "Tool correctly generates documentation for valid input",
                    excellent: "Works on 95%+ of Python/JS files with accurate, complete docs",
                    satisfactory: "Works on 80%+ of files with mostly accurate docs",
                    needsImprovement: "Fails on common cases or produces inaccurate docs"
                }
            ]
        },
        {
            category: "Prompt Engineering",
            weight: 30,
            criteria: [
                {
                    description: "Prompts demonstrate advanced techniques",
                    excellent: "Uses few-shot, chain-of-thought, and structured output effectively",
                    satisfactory: "Uses at least 2 advanced techniques correctly",
                    needsImprovement: "Only basic zero-shot prompting"
                }
            ]
        },
        {
            category: "Code Quality",
            weight: 20,
            criteria: [
                {
                    description: "Code is well-organized and maintainable",
                    excellent: "Clean architecture, well-documented, handles errors gracefully",
                    satisfactory: "Reasonable organization, some error handling",
                    needsImprovement: "Messy code, no error handling"
                }
            ]
        },
        {
            category: "Documentation",
            weight: 10,
            criteria: [
                {
                    description: "Technical write-up explains decisions clearly",
                    excellent: "Clear rationale, lessons learned, future improvements",
                    satisfactory: "Covers main points but lacks depth",
                    needsImprovement: "Missing or superficial write-up"
                }
            ]
        }
    ]
};

// ============================================
// ASSOCIATE CAPSTONE: Multi-Agent Research Assistant
// ============================================
export const associateCapstone: CapstoneProject = {
    id: "capstone-associate",
    title: "Multi-Agent Research Assistant",
    description: "Build a system of specialized AI agents that collaborate to research topics, synthesize information, and produce comprehensive reports.",
    duration: "15-20 hours",
    level: "associate",

    businessCase: "Knowledge workers spend 20% of their time searching for information. A multi-agent research system can automate literature review, competitive analysis, and market research, delivering structured insights in minutes instead of hours.",

    requirements: [
        {
            category: "Agent Architecture",
            items: [
                "Implement at least 4 specialized agents (e.g., Researcher, Analyst, Writer, Critic)",
                "Agents must communicate through defined interfaces",
                "Include an orchestrator that coordinates agent workflows"
            ]
        },
        {
            category: "Research Capabilities",
            items: [
                "Web search integration for real-time information",
                "Document ingestion for provided source materials",
                "Citation tracking and source attribution"
            ]
        },
        {
            category: "Output Quality",
            items: [
                "Generate structured reports with executive summary",
                "Include data visualizations where appropriate",
                "Provide confidence scores for claims"
            ]
        }
    ],

    suggestedArchitecture: `
    ┌─────────────────────────────────────────┐
    │            ORCHESTRATOR                  │
    │   (Manages workflow and agent comms)     │
    └─────────────────┬───────────────────────┘
                      │
    ┌─────────────────┼───────────────────────┐
    │                 │                       │
    ▼                 ▼                       ▼
┌─────────┐     ┌─────────┐            ┌─────────┐
│RESEARCHER│     │ ANALYST │            │ WRITER  │
│(Web/Docs)│────▶│(Synth)  │───────────▶│(Report) │
└─────────┘     └─────────┘            └────┬────┘
                                            │
                                            ▼
                                       ┌─────────┐
                                       │ CRITIC  │
                                       │(Review) │
                                       └─────────┘
    `,

    technologyStack: ["Python", "LangGraph or CrewAI", "OpenAI/Anthropic API", "Tavily or SerpAPI"],

    deliverables: [
        {
            name: "Multi-Agent System",
            description: "Complete implementation with all agents and orchestration",
            format: "Python package"
        },
        {
            name: "Agent Specifications",
            description: "Documentation of each agent's role, capabilities, and interfaces",
            format: "Markdown"
        },
        {
            name: "Sample Reports",
            description: "3 research reports generated by the system on different topics",
            format: "PDF or Markdown"
        },
        {
            name: "Architecture Document",
            description: "Detailed explanation of system design and agent communication patterns",
            format: "Markdown with diagrams"
        }
    ],

    rubric: [
        {
            category: "Agent Design",
            weight: 35,
            criteria: [
                {
                    description: "Agents have clear, well-defined responsibilities",
                    excellent: "Each agent has distinct role with minimal overlap, clean interfaces",
                    satisfactory: "Roles are defined but some overlap exists",
                    needsImprovement: "Agents are poorly defined or redundant"
                }
            ]
        },
        {
            category: "Orchestration",
            weight: 25,
            criteria: [
                {
                    description: "Workflow management is robust and efficient",
                    excellent: "Handles failures gracefully, optimizes agent calls, clear state management",
                    satisfactory: "Basic workflow works but limited error handling",
                    needsImprovement: "Brittle orchestration that fails on edge cases"
                }
            ]
        },
        {
            category: "Output Quality",
            weight: 25,
            criteria: [
                {
                    description: "Reports are accurate, well-structured, and useful",
                    excellent: "Reports are publication-ready with accurate citations",
                    satisfactory: "Reports are useful but need minor editing",
                    needsImprovement: "Reports have factual errors or poor structure"
                }
            ]
        },
        {
            category: "Documentation",
            weight: 15,
            criteria: [
                {
                    description: "Architecture and decisions are well-documented",
                    excellent: "Clear diagrams, rationale for choices, setup instructions",
                    satisfactory: "Basic documentation present",
                    needsImprovement: "Missing or inadequate documentation"
                }
            ]
        }
    ]
};

// ============================================
// PROFESSIONAL CAPSTONE: Production RAG System
// ============================================
export const professionalCapstone: CapstoneProject = {
    id: "capstone-professional",
    title: "Production RAG System with Analytics",
    description: "Build a production-ready Retrieval-Augmented Generation system with monitoring, evaluation, and continuous improvement capabilities.",
    duration: "25-30 hours",
    level: "professional",

    businessCase: "Enterprise knowledge bases contain critical information that's often inaccessible. A production RAG system with proper monitoring can answer 80% of employee questions accurately while tracking quality and identifying gaps.",

    requirements: [
        {
            category: "RAG Pipeline",
            items: [
                "Document ingestion with multiple format support (PDF, MD, HTML)",
                "Chunking strategy with overlap and semantic awareness",
                "Hybrid search: vector similarity + keyword matching",
                "Re-ranking for improved relevance"
            ]
        },
        {
            category: "Production Features",
            items: [
                "Response streaming for better UX",
                "Caching layer for common queries",
                "Rate limiting and authentication",
                "Graceful degradation on failures"
            ]
        },
        {
            category: "Monitoring & Evaluation",
            items: [
                "Track retrieval quality metrics (MRR, NDCG)",
                "Log response quality with user feedback",
                "Dashboard for system health and usage patterns",
                "Automated alerts for quality degradation"
            ]
        },
        {
            category: "Security",
            items: [
                "Input sanitization to prevent prompt injection",
                "PII detection and redaction in outputs",
                "Audit logging for compliance"
            ]
        }
    ],

    technologyStack: ["Python", "FastAPI", "PostgreSQL + pgvector", "Redis", "OpenAI/Anthropic", "Grafana/Prometheus"],

    deliverables: [
        {
            name: "RAG API Service",
            description: "Production-ready API with all required features",
            format: "Docker container"
        },
        {
            name: "Evaluation Suite",
            description: "Scripts and datasets for evaluating RAG quality",
            format: "Python package"
        },
        {
            name: "Monitoring Dashboard",
            description: "Visualizations for system health and quality metrics",
            format: "Grafana dashboard JSON"
        },
        {
            name: "Operations Runbook",
            description: "Guide for deploying, monitoring, and troubleshooting",
            format: "Markdown"
        }
    ],

    rubric: [
        {
            category: "RAG Quality",
            weight: 30,
            criteria: [
                {
                    description: "System retrieves relevant documents and generates accurate answers",
                    excellent: "MRR > 0.8, answers are accurate and well-sourced",
                    satisfactory: "MRR > 0.6, answers are mostly accurate",
                    needsImprovement: "Poor retrieval or inaccurate answers"
                }
            ]
        },
        {
            category: "Production Readiness",
            weight: 25,
            criteria: [
                {
                    description: "System handles production workloads reliably",
                    excellent: "Streaming, caching, auth, rate limiting all working",
                    satisfactory: "Core features work with some production features",
                    needsImprovement: "Not suitable for production use"
                }
            ]
        },
        {
            category: "Observability",
            weight: 25,
            criteria: [
                {
                    description: "System health and quality are measurable",
                    excellent: "Comprehensive dashboard, alerting, quality tracking",
                    satisfactory: "Basic metrics and logging present",
                    needsImprovement: "No monitoring or incomplete metrics"
                }
            ]
        },
        {
            category: "Security",
            weight: 20,
            criteria: [
                {
                    description: "System is secure against common attacks",
                    excellent: "Prompt injection, PII, audit logging all addressed",
                    satisfactory: "Basic security measures in place",
                    needsImprovement: "Obvious security vulnerabilities"
                }
            ]
        }
    ]
};

// ============================================
// ARCHITECT CAPSTONE: Enterprise AI Platform Blueprint
// ============================================
export const architectCapstone: CapstoneProject = {
    id: "capstone-architect",
    title: "Enterprise AI Platform Blueprint",
    description: "Design and document a complete enterprise AI platform architecture with governance, multi-model orchestration, and cost optimization strategies.",
    duration: "40-50 hours",
    level: "architect",

    businessCase: "Enterprises need a unified AI platform to avoid fragmented point solutions, control costs, ensure governance, and accelerate AI adoption across business units.",

    requirements: [
        {
            category: "Platform Architecture",
            items: [
                "Multi-model gateway with routing and fallback",
                "Centralized prompt management and versioning",
                "Feature store for ML/AI embeddings",
                "Model registry with deployment automation"
            ]
        },
        {
            category: "Governance & Security",
            items: [
                "Role-based access control for models and data",
                "Audit logging for compliance (SOC2, HIPAA)",
                "Data residency and sovereignty controls",
                "AI ethics review workflow"
            ]
        },
        {
            category: "Cost Management",
            items: [
                "Usage tracking and chargeback by business unit",
                "Cost optimization recommendations",
                "Budget alerts and spending controls",
                "Model selection based on cost/quality tradeoffs"
            ]
        },
        {
            category: "Developer Experience",
            items: [
                "Self-service portal for AI capabilities",
                "SDK and API documentation",
                "Sandbox environments for experimentation",
                "Integration patterns and templates"
            ]
        }
    ],

    suggestedArchitecture: `
    ┌──────────────────────────────────────────────────────────┐
    │                    API GATEWAY                            │
    │  (Authentication, Rate Limiting, Routing, Caching)        │
    └────────────────────────┬─────────────────────────────────┘
                             │
    ┌────────────────────────┼─────────────────────────────────┐
    │                        ▼                                 │
    │  ┌─────────────────────────────────────────────────────┐ │
    │  │              MODEL ORCHESTRATOR                      │ │
    │  │  (Model Selection, Fallback, Load Balancing)         │ │
    │  └────────────┬───────────────────┬─────────────────────┘ │
    │               │                   │                      │
    │       ┌───────▼──────┐    ┌───────▼──────┐               │
    │       │  OpenAI      │    │  Anthropic   │   ...         │
    │       └──────────────┘    └──────────────┘               │
    │                                                          │
    │  ┌─────────────────────────────────────────────────────┐ │
    │  │            OBSERVABILITY LAYER                       │ │
    │  │  (Logging, Metrics, Tracing, Quality Monitoring)     │ │
    │  └─────────────────────────────────────────────────────┘ │
    │                                                          │
    │  ┌─────────────────────────────────────────────────────┐ │
    │  │              GOVERNANCE LAYER                        │ │
    │  │  (RBAC, Audit, Compliance, Ethics Review)            │ │
    │  └─────────────────────────────────────────────────────┘ │
    └──────────────────────────────────────────────────────────┘
    `,

    technologyStack: ["Architecture Documentation", "Mermaid/Lucidchart", "OpenAPI", "Terraform"],

    deliverables: [
        {
            name: "Architecture Document",
            description: "Comprehensive 20-30 page architecture specification",
            format: "PDF with diagrams"
        },
        {
            name: "Component Specifications",
            description: "Detailed specs for each major component",
            format: "Markdown"
        },
        {
            name: "Decision Records",
            description: "ADRs documenting key architectural decisions",
            format: "Markdown (ADR format)"
        },
        {
            name: "Reference Implementation",
            description: "Working prototype of model gateway component",
            format: "Python/FastAPI"
        },
        {
            name: "Cost Model",
            description: "Spreadsheet with TCO analysis and cost projections",
            format: "Excel/Google Sheets"
        }
    ],

    rubric: [
        {
            category: "Architecture Quality",
            weight: 35,
            criteria: [
                {
                    description: "Architecture is sound, scalable, and addresses requirements",
                    excellent: "Enterprise-ready design with clear separation of concerns",
                    satisfactory: "Reasonable architecture with minor gaps",
                    needsImprovement: "Architecture has fundamental flaws"
                }
            ]
        },
        {
            category: "Governance & Security",
            weight: 25,
            criteria: [
                {
                    description: "Security and compliance are thoroughly addressed",
                    excellent: "Comprehensive controls for enterprise compliance",
                    satisfactory: "Basic governance with some gaps",
                    needsImprovement: "Inadequate governance consideration"
                }
            ]
        },
        {
            category: "Documentation Quality",
            weight: 20,
            criteria: [
                {
                    description: "Documentation is clear, complete, and actionable",
                    excellent: "Could be used to implement by another team",
                    satisfactory: "Covers main points but needs clarification",
                    needsImprovement: "Incomplete or unclear documentation"
                }
            ]
        },
        {
            category: "Business Alignment",
            weight: 20,
            criteria: [
                {
                    description: "Solution addresses business needs with clear ROI",
                    excellent: "Clear business case, cost model, adoption strategy",
                    satisfactory: "Business value is evident but not quantified",
                    needsImprovement: "Disconnected from business requirements"
                }
            ]
        }
    ],

    requiresOralDefense: true,
    defenseTopics: [
        "Justify your choice of multi-model strategy over single-vendor",
        "Explain how you would handle a 10x increase in usage",
        "Describe the security review process for deploying a new AI use case",
        "Walk through a disaster recovery scenario",
        "Critique a proposed AI implementation and suggest improvements"
    ]
};

// Export all capstones
export const capstoneProjects = [
    foundationsCapstone,
    associateCapstone,
    professionalCapstone,
    architectCapstone
];

export function getCapstoneByLevel(level: string): CapstoneProject | undefined {
    return capstoneProjects.find(c => c.level === level);
}

export function getCapstoneById(id: string): CapstoneProject | undefined {
    return capstoneProjects.find(c => c.id === id);
}
