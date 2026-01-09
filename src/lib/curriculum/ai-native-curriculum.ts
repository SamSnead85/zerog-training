// AI-Native Training Curriculum - Flagship ScaledNative Offering
// Based on DeepLearning.AI, Google Cloud, Microsoft, and NATIVE Framework

export type CertificationLevel = "foundations" | "associate" | "professional" | "architect" | "leader" | "data";
export type ModuleStatus = "available" | "coming_soon" | "locked";
export type LabType = "guided" | "independent" | "debug" | "design";
export type AssessmentDifficulty = "recall" | "apply" | "analyze" | "create";

// ============================================
// LEARNING OBJECTIVE TAXONOMY (Bloom's)
// ============================================
export interface LearningObjective {
    id: string;
    text: string;
    // Optional for backward compatibility - will be added progressively
    bloomLevel?: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
    measurable?: string; // How this is measured
}

// ============================================
// ENHANCED TOPIC STRUCTURE
// ============================================
export interface Topic {
    id: string;
    title: string;
    description: string;
    duration: string;
    subtopics?: string[];
    // New: Concept mastery components
    keyTakeaways?: string[];
    commonMisconceptions?: string[];
    prerequisiteTopics?: string[];
}

// ============================================
// WORKED EXAMPLE (Expert Reasoning)
// ============================================
export interface WorkedExample {
    id: string;
    scenario: string;
    context: string;
    thinkingProcess: string[];   // Step-by-step expert reasoning
    implementation: string;       // Code or solution
    pitfalls: string[];          // What NOT to do
    alternativeApproaches?: string[];
}

// ============================================
// CONCEPT CHECK (Knowledge Verification)
// ============================================
export interface ConceptCheck {
    id: string;
    question: string;
    difficulty: AssessmentDifficulty;
    options: string[];
    correctIndex: number;
    explanation: string;         // Why this is correct
    relatedTopicId: string;
}

// ============================================
// MEANINGFUL LAB STRUCTURE
// ============================================
export interface Lab {
    id: string;
    title: string;
    type: LabType;
    duration: string;
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";

    // Context and setup
    scenario: string;
    businessContext: string;
    prerequisites: string[];

    // Multi-stage structure
    stages: {
        id: string;
        title: string;
        objective: string;
        instructions: string[];
        starterCode?: string;
        hints: string[];
        validationCriteria: string[];
        // Real validation - not just pattern matching
        testCases?: {
            input: string;
            expectedOutput: string;
            description: string;
        }[];
    }[];

    // Deliverables
    deliverables: string[];
    rubric: {
        criterion: string;
        weight: number;
        excellent: string;
        satisfactory: string;
        needsImprovement: string;
    }[];

    // Reflection
    reflectionQuestions: string[];
}

// ============================================
// HANDS-ON PROJECT (Legacy support + enhanced)
// ============================================
export interface HandsOnProject {
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
    // Enhanced with more detail
    businessContext?: string;
    deliverables?: string[];
    successCriteria?: string[];
}

// ============================================
// CAPSTONE PROJECT (Portfolio-worthy)
// ============================================
export interface CapstoneProject {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: CertificationLevel;

    // Project specification
    businessCase: string;
    requirements: {
        category: string;
        items: string[];
    }[];

    // Architecture guidance
    suggestedArchitecture?: string;
    technologyStack: string[];

    // Deliverables and evaluation
    deliverables: {
        name: string;
        description: string;
        format: string;
    }[];

    rubric: {
        category: string;
        weight: number;
        criteria: {
            description: string;
            excellent: string;
            satisfactory: string;
            needsImprovement: string;
        }[];
    }[];

    // For Architect level
    requiresOralDefense?: boolean;
    defenseTopics?: string[];
}

// ============================================
// COMPREHENSIVE ASSESSMENT STRUCTURE
// ============================================
export interface AssessmentDetails {
    // Theory assessment
    conceptChecks: {
        count: number;
        passingScore: number;
        timeLimit: string;
    };

    // Practical assessment
    labs: {
        required: number;
        types: LabType[];
        mustPassAll: boolean;
    };

    // Portfolio component
    portfolio: {
        required: boolean;
        projectId?: string;
        peerReview?: boolean;
    };

    // Proctoring
    proctored: boolean;
    identityVerification?: boolean;

    // Final certification
    finalExam?: {
        format: string;
        duration: string;
        passingScore: number;
        retakePolicy: string;
    };
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

// ============================================
// ENHANCED AI MODULE
// ============================================
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

    // Learning objectives with Bloom's taxonomy
    learningObjectives: LearningObjective[];

    // Content structure
    topics: Topic[];

    // Practical components
    handsOnProjects: HandsOnProject[];
    labs?: Lab[];

    // External resources (supplementary)
    resources?: LearningResource[];

    // Assessment (legacy string for backward compatibility)
    assessmentType: string;

    // New: Comprehensive assessment details
    assessmentDetails?: AssessmentDetails;

    // New: Worked examples for the module
    workedExamples?: WorkedExample[];

    // New: Concept checks for the module
    conceptChecks?: ConceptCheck[];

    // Capstone reference (if this module is part of a capstone)
    capstoneProjectId?: string;

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

    // Enhanced exam details for rigorous certification
    examDetails: {
        format: string;
        passingScore: string;
        duration: string;
    };

    // NEW: Comprehensive assessment structure
    assessmentRequirements?: {
        // Theory component
        writtenExam: {
            questionTypes: ("mcq" | "short-answer" | "case-study" | "essay")[];
            questionCount: number;
            passingScore: number;
            timeLimit: string;
            proctored: boolean;
            identityVerification?: boolean;
        };

        // Practical component
        practicalExam?: {
            format: "timed-lab" | "take-home-project" | "live-coding" | "architecture-review";
            duration: string;
            rubricCriteria: string[];
            passingScore: number;
        };

        // Portfolio component
        portfolio?: {
            required: boolean;
            capstoneProjectId: string;
            peerReviewRequired: boolean;
            minimumScore: number;
        };

        // Oral examination (Architect level)
        oralExam?: {
            required: boolean;
            duration: string;
            panelSize: number;
            topics: string[];
            passingScore: number;
        };

        // Recertification
        recertification: {
            requiredEvery: string;
            options: ("exam" | "continuing-education" | "project-portfolio")[];
            continuingEducationHours?: number;
        };
    };
}

// ============================================
// CERTIFICATION TRACKS - STANDARD 4-LEVEL HIERARCHY
// ============================================

export const certificationTracks: CertificationTrack[] = [
    {
        id: "foundations-cert",
        level: "foundations",
        shortTitle: "Practitioner",
        title: "AI NATIVE Practitioner",
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
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["mcq", "short-answer"],
                questionCount: 50,
                passingScore: 75,
                timeLimit: "60 minutes",
                proctored: false
            },
            practicalExam: {
                format: "take-home-project",
                duration: "24 hours",
                rubricCriteria: [
                    "Prompt engineering technique application",
                    "Code quality and documentation",
                    "Edge case handling",
                    "Clear explanation of approach"
                ],
                passingScore: 70
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-foundations",
                peerReviewRequired: false,
                minimumScore: 70
            },
            recertification: {
                requiredEvery: "Never (Lifetime)",
                options: []
            }
        }
    },
    {
        id: "associate-cert",
        level: "associate",
        shortTitle: "Developer",
        title: "AI NATIVE Developer",
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
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["mcq", "short-answer", "case-study"],
                questionCount: 40,
                passingScore: 80,
                timeLimit: "90 minutes",
                proctored: true,
                identityVerification: true
            },
            practicalExam: {
                format: "timed-lab",
                duration: "3 hours",
                rubricCriteria: [
                    "Agentic workflow implementation",
                    "LangChain/LangGraph proficiency",
                    "Error handling and resilience",
                    "Code organization and documentation",
                    "Deployment-ready implementation"
                ],
                passingScore: 80
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-associate",
                peerReviewRequired: false,
                minimumScore: 75
            },
            recertification: {
                requiredEvery: "2 years",
                options: ["exam", "continuing-education"],
                continuingEducationHours: 20
            }
        }
    },
    {
        id: "professional-cert",
        level: "professional",
        shortTitle: "Engineer",
        title: "AI NATIVE Engineering Professional",
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
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["mcq", "case-study", "essay"],
                questionCount: 35,
                passingScore: 80,
                timeLimit: "2 hours",
                proctored: true,
                identityVerification: true
            },
            practicalExam: {
                format: "live-coding",
                duration: "4 hours",
                rubricCriteria: [
                    "Production-ready RAG implementation",
                    "Security best practices (prompt injection, PII)",
                    "Observability and monitoring",
                    "Performance optimization",
                    "Cost efficiency",
                    "Documentation quality"
                ],
                passingScore: 80
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-professional",
                peerReviewRequired: true,
                minimumScore: 80
            },
            recertification: {
                requiredEvery: "2 years",
                options: ["exam", "continuing-education", "project-portfolio"],
                continuingEducationHours: 30
            }
        }
    },
    {
        id: "architect-cert",
        level: "architect",
        shortTitle: "Architect",
        title: "AI NATIVE Solutions Architect",
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
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["case-study", "essay"],
                questionCount: 20,
                passingScore: 85,
                timeLimit: "2.5 hours",
                proctored: true,
                identityVerification: true
            },
            practicalExam: {
                format: "architecture-review",
                duration: "48 hours",
                rubricCriteria: [
                    "Enterprise architecture quality",
                    "Scalability and performance design",
                    "Security and governance framework",
                    "Cost optimization strategy",
                    "Multi-model orchestration design",
                    "Documentation comprehensiveness",
                    "Business alignment and ROI"
                ],
                passingScore: 85
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-architect",
                peerReviewRequired: true,
                minimumScore: 85
            },
            oralExam: {
                required: true,
                duration: "60 minutes",
                panelSize: 2,
                topics: [
                    "Justify multi-model strategy over single-vendor",
                    "Handle 10x usage scaling",
                    "Security review process for new AI use cases",
                    "Disaster recovery walkthrough",
                    "Critique and improve proposed AI implementation"
                ],
                passingScore: 80
            },
            recertification: {
                requiredEvery: "3 years",
                options: ["exam", "project-portfolio"],
                continuingEducationHours: 40
            }
        }
    },
    {
        id: "leader-cert",
        level: "leader",
        shortTitle: "Leader",
        title: "AI NATIVE Transformation Leader",
        description: "Lead enterprise-wide AI transformation initiatives. Master change management, AI governance, strategic planning, and stakeholder alignment. Guide organizations through the cultural and operational shifts required for AI adoption.",
        duration: "25-30 hours",
        modules: ["module-leader-1", "module-leader-2"],
        prerequisites: ["AI NATIVE Practitioner"],
        validityPeriod: "3 years",
        badge: "rocket",
        badgeColor: "bg-rose-500",
        nativeCertified: true,
        certificationCode: "NATIVE-TL",
        examDetails: {
            format: "Case study analysis + transformation roadmap",
            passingScore: "80%",
            duration: "3 hours"
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["case-study", "essay"],
                questionCount: 25,
                passingScore: 80,
                timeLimit: "2 hours",
                proctored: true,
                identityVerification: true
            },
            practicalExam: {
                format: "take-home-project",
                duration: "48 hours",
                rubricCriteria: [
                    "Strategic vision and alignment",
                    "Change management approach",
                    "Stakeholder communication plan",
                    "Risk mitigation strategy",
                    "Success metrics and KPIs",
                    "Governance framework design"
                ],
                passingScore: 80
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-leader",
                peerReviewRequired: true,
                minimumScore: 80
            },
            recertification: {
                requiredEvery: "3 years",
                options: ["exam", "continuing-education"],
                continuingEducationHours: 30
            }
        }
    },
    {
        id: "data-cert",
        level: "data",
        shortTitle: "Data",
        title: "AI NATIVE Data Strategist",
        description: "Master data strategies for AI success. Design data pipelines, implement data governance, ensure data quality, and build the foundation for effective AI/ML systems. Bridge the gap between data engineering and AI implementation.",
        duration: "30-35 hours",
        modules: ["module-data-1", "module-data-2", "module-data-3"],
        prerequisites: ["AI NATIVE Practitioner"],
        validityPeriod: "2 years",
        badge: "database",
        badgeColor: "bg-cyan-500",
        nativeCertified: true,
        certificationCode: "NATIVE-DS",
        examDetails: {
            format: "40 multiple choice + data pipeline design challenge",
            passingScore: "80%",
            duration: "3 hours"
        },
        assessmentRequirements: {
            writtenExam: {
                questionTypes: ["mcq", "case-study"],
                questionCount: 40,
                passingScore: 80,
                timeLimit: "90 minutes",
                proctored: true,
                identityVerification: true
            },
            practicalExam: {
                format: "take-home-project",
                duration: "4 hours",
                rubricCriteria: [
                    "Data pipeline architecture",
                    "Data quality controls",
                    "Governance and compliance",
                    "Scalability design",
                    "ML feature engineering",
                    "Documentation quality"
                ],
                passingScore: 80
            },
            portfolio: {
                required: true,
                capstoneProjectId: "capstone-data",
                peerReviewRequired: true,
                minimumScore: 80
            },
            recertification: {
                requiredEvery: "2 years",
                options: ["exam", "continuing-education"],
                continuingEducationHours: 25
            }
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
        {
            id: "1-1",
            text: "Understand how Large Language Models (LLMs) work at a conceptual level",
            bloomLevel: "understand",
            measurable: "Correctly explain the transformer architecture and attention mechanism in your own words"
        },
        {
            id: "1-2",
            text: "Explain transformers, embeddings, and attention mechanisms",
            bloomLevel: "understand",
            measurable: "Create a diagram showing how tokens flow through a transformer model"
        },
        {
            id: "1-3",
            text: "Differentiate between AI, ML, Deep Learning, and Generative AI",
            bloomLevel: "analyze",
            measurable: "Correctly categorize 10 different AI applications into their appropriate technology category"
        },
        {
            id: "1-4",
            text: "Recognize when to use AI vs traditional programming approaches",
            bloomLevel: "evaluate",
            measurable: "Given 5 business scenarios, correctly recommend AI or traditional approach with justification"
        },
        {
            id: "1-5",
            text: "Apply prompt engineering techniques to generate high-quality code",
            bloomLevel: "apply",
            measurable: "Write prompts that successfully generate working code for 3 different use cases"
        },
        {
            id: "1-6",
            text: "Design a multi-step prompt workflow for complex development tasks",
            bloomLevel: "create",
            measurable: "Build a prompt chain that decomposes a complex coding task into manageable steps"
        }
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
            keyTakeaways: [
                "LLMs predict the next token based on patterns learned from massive text datasets",
                "Context window size is a critical constraint for production AI applications",
                "Token-based pricing means prompt optimization directly impacts costs"
            ],
            commonMisconceptions: [
                "LLMs don't 'understand' - they predict statistically likely continuations",
                "More parameters doesn't always mean better results for your use case",
                "Fine-tuning is not always necessary - RAG may be more cost-effective"
            ]
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
            keyTakeaways: [
                "Choose LLM provider based on: capability, cost, latency, and compliance requirements",
                "Vector databases enable semantic search over unstructured data",
                "Orchestration frameworks reduce boilerplate but add complexity"
            ],
            commonMisconceptions: [
                "OpenAI is not always the best choice - Claude excels at certain tasks",
                "You don't always need a vector database - simple caching may suffice",
                "Framework lock-in is real - evaluate before committing"
            ],
            prerequisiteTopics: ["1-1"]
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
            keyTakeaways: [
                "Few-shot examples dramatically improve output quality for specific formats",
                "Chain-of-thought prompting helps with reasoning tasks",
                "Structured output (JSON mode) is essential for production integrations"
            ],
            commonMisconceptions: [
                "Long prompts aren't always better - clarity beats verbosity",
                "Temperature affects creativity, not accuracy",
                "Prompt engineering is not 'magic words' - it's clear communication"
            ],
            prerequisiteTopics: ["1-1", "1-2"]
        },
    ],
    handsOnProjects: [
        {
            id: "p1-1",
            title: "Code Documentation Generator",
            description: "Build a code documentation generator using prompt engineering",
            difficulty: "beginner",
            duration: "2 hours",
            businessContext: "Automate the tedious task of writing docstrings and README files",
            deliverables: ["Working Python script", "5 example outputs", "Prompt template documentation"],
            successCriteria: ["Generates accurate docstrings", "Handles multiple languages", "Produces consistent formatting"]
        },
        {
            id: "p1-2",
            title: "Bug Analysis Assistant",
            description: "Create a bug analysis assistant with structured output",
            difficulty: "beginner",
            duration: "2 hours",
            businessContext: "Help developers quickly understand and categorize bug reports",
            deliverables: ["Bug analyzer script", "JSON schema for output", "Test with 10 real bugs"],
            successCriteria: ["Correctly identifies bug type", "Suggests root cause", "Provides fix recommendations"]
        },
        {
            id: "p1-3",
            title: "Code Review Workflow",
            description: "Implement a multi-step code review workflow",
            difficulty: "intermediate",
            duration: "3 hours",
            businessContext: "Augment human code review with AI-powered analysis",
            deliverables: ["Multi-stage review pipeline", "Report generator", "Integration documentation"],
            successCriteria: ["Identifies security issues", "Suggests performance improvements", "Maintains consistent review quality"]
        },
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

    // NEW: Comprehensive assessment details
    assessmentDetails: {
        conceptChecks: {
            count: 20,
            passingScore: 80,
            timeLimit: "30 minutes"
        },
        labs: {
            required: 2,
            types: ["guided", "independent"],
            mustPassAll: true
        },
        portfolio: {
            required: true,
            projectId: "p1-3",
            peerReview: false
        },
        proctored: false,
        finalExam: {
            format: "20 MCQ + 3 short answer + 1 prompt engineering challenge",
            duration: "90 minutes",
            passingScore: 75,
            retakePolicy: "Unlimited retakes after 24 hours"
        }
    },

    // NEW: Worked examples with expert reasoning
    workedExamples: [
        {
            id: "we1-1",
            scenario: "Building a prompt to generate unit tests",
            context: "A developer needs to generate comprehensive unit tests for a Python function that validates email addresses",
            thinkingProcess: [
                "First, I need to understand what the function does and its expected inputs/outputs",
                "I should specify the testing framework (pytest) in the prompt for consistency",
                "Edge cases are crucial - I need to prompt for boundary conditions explicitly",
                "I'll use few-shot examples to show the expected test format",
                "Finally, I'll ask for test descriptions to ensure readability"
            ],
            implementation: `def generate_unit_tests(function_code: str) -> str:
    prompt = f"""You are an expert Python test engineer. Generate comprehensive pytest unit tests for this function:

{function_code}

Requirements:
1. Include at least 5 test cases
2. Cover edge cases: empty input, invalid format, boundary conditions
3. Use descriptive test names following: test_<what>_<condition>_<expected>
4. Include docstrings explaining each test's purpose

Example format:
def test_validate_email_valid_format_returns_true():
    \"\"\"Verify that properly formatted emails are accepted.\"\"\"
    assert validate_email("user@example.com") == True

Generate tests now:"""
    return call_llm(prompt)`,
            pitfalls: [
                "Don't assume the LLM knows your testing conventions - be explicit",
                "Avoid vague instructions like 'write good tests' - specify criteria",
                "Don't forget to ask for edge case coverage explicitly"
            ],
            alternativeApproaches: [
                "Use chain-of-thought: first analyze the function, then generate tests",
                "Provide existing tests as examples for consistent style"
            ]
        }
    ],

    // NEW: Concept checks for knowledge verification
    conceptChecks: [
        {
            id: "cc1-1",
            question: "What is the primary mechanism that allows transformers to process long sequences efficiently?",
            difficulty: "recall",
            options: [
                "Recurrent connections",
                "Self-attention mechanism",
                "Convolutional layers",
                "Memory cells"
            ],
            correctIndex: 1,
            explanation: "The self-attention mechanism allows transformers to process all positions in a sequence simultaneously, computing relationships between every pair of tokens in parallel. This is fundamentally different from RNNs which process sequentially.",
            relatedTopicId: "1-1"
        },
        {
            id: "cc1-2",
            question: "A developer wants to build a customer support chatbot. The company has 10,000 support documents. Which approach is most cost-effective for the initial implementation?",
            difficulty: "analyze",
            options: [
                "Fine-tune GPT-4 on all support documents",
                "Use RAG with a vector database",
                "Train a custom model from scratch",
                "Use few-shot prompting with random documents"
            ],
            correctIndex: 1,
            explanation: "RAG (Retrieval Augmented Generation) is most cost-effective because it doesn't require expensive fine-tuning. Documents are embedded once and retrieved at query time, allowing the base model to generate responses grounded in relevant documents.",
            relatedTopicId: "1-2"
        },
        {
            id: "cc1-3",
            question: "When using chain-of-thought prompting, what is the primary benefit?",
            difficulty: "apply",
            options: [
                "Reduces API costs by using fewer tokens",
                "Improves reasoning accuracy on complex problems",
                "Generates responses faster",
                "Eliminates the need for examples"
            ],
            correctIndex: 1,
            explanation: "Chain-of-thought prompting encourages the model to 'show its work' by reasoning step-by-step. This dramatically improves accuracy on math, logic, and multi-step reasoning tasks by making the reasoning process explicit.",
            relatedTopicId: "1-3"
        }
    ]
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
    subtitle: "LangGraph, CrewAI, AutoGen + NATIVE Workflows",
    description: "Master the leading frameworks for building sophisticated agent systems. Learn when to use each framework and how to integrate AI into NATIVE software delivery workflows.",
    duration: "12-15 hours",
    level: "professional",
    status: "available",
    prerequisites: ["AI-Native Developer Foundations"],
    learningObjectives: [
        { id: "5-1", text: "Master LangGraph for complex agent workflows" },
        { id: "5-2", text: "Build multi-agent systems with CrewAI" },
        { id: "5-3", text: "Implement enterprise agents with AutoGen" },
        { id: "5-4", text: "Integrate AI into NATIVE software delivery workflows" },
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
            title: "NATIVE Workflows: AI-Powered Delivery",
            description: "Integrating AI into NATIVE software delivery",
            duration: "3 hours",
            subtopics: [
                "AI in delivery planning and ceremonies",
                "Predictive backlog management and prioritization",
                "AI-assisted retrospectives and continuous improvement",
                "AI for delivery leads: automating facilitation tasks",
                "Responsible AI governance in delivery teams",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p5-1", title: "LangGraph Workflow", description: "Build complex workflow with state management", difficulty: "advanced", duration: "3 hours" },
        { id: "p5-2", title: "CrewAI Business Team", description: "Create multi-agent content creation team", difficulty: "advanced", duration: "3 hours" },
        { id: "p5-3", title: "NATIVE Delivery Assistant", description: "Build AI assistant for delivery planning and retrospectives", difficulty: "advanced", duration: "3 hours" },
    ],
    assessmentType: "Framework comparison report + NATIVE AI integration plan",
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
// MODULE 11: CONTEXT ENGINEERING MASTERY
// ============================================

export const module11: AIModule = {
    id: "module-11",
    number: 11,
    title: "Context Engineering Mastery",
    subtitle: "Beyond Prompt Engineering: The Production AI Paradigm",
    description: "Master the cutting-edge discipline of context engineering — the skill that separates experimental AI from production-grade systems. Learn memory architectures, MCP integration, and optimization strategies that enable reliable, cost-effective AI at scale.",
    duration: "12-15 hours",
    level: "professional",
    status: "available",
    prerequisites: ["AI-Native Developer Foundations", "Module 3: Agentic AI"],
    learningObjectives: [
        { id: "11-1", text: "Apply the 5 Pillars of Context Engineering to production systems" },
        { id: "11-2", text: "Design multi-tier memory architectures for AI agents" },
        { id: "11-3", text: "Implement Model Context Protocol (MCP) for enterprise integration" },
        { id: "11-4", text: "Optimize context windows for cost and performance" },
    ],
    topics: [
        {
            id: "11-1",
            title: "Beyond Prompt Engineering",
            description: "The paradigm shift from prompts to context",
            duration: "2.5 hours",
            subtopics: [
                "Why prompts alone fail in production",
                "The 5 Pillars: Curation, Persistence, Isolation, Compression, Selection",
                "Context-first design patterns",
                "RAG as a technique within context engineering",
            ],
        },
        {
            id: "11-2",
            title: "Context Window Optimization",
            description: "Token economics and cache optimization",
            duration: "2.5 hours",
            subtopics: [
                "Token budget architecture and allocation",
                "KV-cache hit rate optimization",
                "Stable prompt prefixes and append-only patterns",
                "Smart truncation and priority-based compression",
            ],
        },
        {
            id: "11-3",
            title: "Memory Architectures for AI Agents",
            description: "Building persistent, intelligent memory systems",
            duration: "3 hours",
            subtopics: [
                "Episodic, semantic, and procedural memory",
                "Tiered memory architecture (working, short-term, long-term)",
                "Memory compaction and retrieval pipelines",
                "Reflection patterns for memory consolidation",
            ],
        },
        {
            id: "11-4",
            title: "Model Context Protocol (MCP)",
            description: "The universal standard for AI integration",
            duration: "3 hours",
            subtopics: [
                "MCP architecture: hosts, clients, servers",
                "Building MCP servers for enterprise data",
                "Tools vs resources vs prompts capabilities",
                "Security, authentication, and audit logging",
            ],
        },
        {
            id: "11-5",
            title: "Layered Context Architecture",
            description: "Production context assembly systems",
            duration: "2 hours",
            subtopics: [
                "Instruction layer design",
                "Knowledge layer curation",
                "Dynamic context loading with intent routing",
                "Production context assembly pipelines",
            ],
        },
    ],
    handsOnProjects: [
        { id: "p11-1", title: "Production Context System", description: "Build complete context engineering system with memory and budget management", difficulty: "advanced", duration: "5 hours" },
        { id: "p11-2", title: "MCP Enterprise Server", description: "Create MCP server for enterprise data integration", difficulty: "advanced", duration: "3 hours" },
        { id: "p11-3", title: "Context Optimization Challenge", description: "Reduce token costs by 80% while maintaining quality", difficulty: "advanced", duration: "2 hours" },
    ],
    assessmentType: "Production context system deployment + Performance optimization report",
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
    module11,
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
    return "100-135 hours";
};

export const getTotalModules = (): number => {
    return aiNativeCurriculum.length;
};
