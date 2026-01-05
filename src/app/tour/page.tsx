"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge, Progress } from "@/components/ui";
import {
    Play, CheckCircle2, Code, Brain, GraduationCap, ArrowRight, ArrowLeft,
    Sparkles, Target, Award, BookOpen, Lightbulb, ChevronRight, FileText,
    Users, Shield, Layers, Trophy, Crown, Compass, Wrench, Database,
    Lock, Cpu, GitBranch, Terminal, Rocket, BarChart3, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// CERTIFICATION TRACKS DATA
// =============================================================================

const certificationTracks = [
    {
        id: "foundations",
        level: "NATIVE-F",
        title: "AI-Native Foundations",
        shortTitle: "Foundations",
        description: "Master AI fundamentals, prompt engineering, and the CRISP framework. Perfect for all employees.",
        duration: "16-20 hours",
        modules: 2,
        labs: 6,
        projects: 3,
        icon: GraduationCap,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "associate",
        level: "NATIVE-A",
        title: "AI-Native Associate Developer",
        shortTitle: "Associate",
        description: "Build AI agents, agentic workflows with LangGraph, and autonomous systems.",
        duration: "24-30 hours",
        modules: 2,
        labs: 8,
        projects: 4,
        icon: Layers,
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        id: "professional",
        level: "NATIVE-P",
        title: "AI-Native Professional Developer",
        shortTitle: "Professional",
        description: "Master RAG pipelines, knowledge bases, fine-tuning, and AI security.",
        duration: "30-35 hours",
        modules: 3,
        labs: 12,
        projects: 5,
        icon: Trophy,
        color: "purple",
        gradient: "from-purple-500 to-violet-500",
    },
    {
        id: "architect",
        level: "NATIVE-SA",
        title: "AI-Native Solutions Architect",
        shortTitle: "Architect",
        description: "Design enterprise AI platforms, multi-model orchestration, and governance frameworks.",
        duration: "35-45 hours",
        modules: 3,
        labs: 10,
        projects: 3,
        icon: Crown,
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
    },
];

// =============================================================================
// TRACK DEMO CONTENT
// =============================================================================

const trackDemoContent: Record<string, {
    stops: Array<{
        id: string;
        title: string;
        type: "video" | "lab" | "quiz" | "project" | "certification";
        icon: typeof Play;
        description: string;
    }>;
    videoUrl?: string;
    videoTitle?: string;
    labTitle?: string;
    labCode?: string;
    labSteps?: Array<{ title: string; completed: boolean; current?: boolean }>;
    quizQuestion?: string;
    quizOptions?: string[];
    quizCorrectIndex?: number;
    quizExplanation?: string;
    projectTitle?: string;
    projectScenario?: string;
    projectDeliverables?: string[];
}> = {
    foundations: {
        stops: [
            { id: "video", title: "Expert Introduction", type: "video", icon: Play, description: "Learn from industry leaders about AI-native development" },
            { id: "lab", title: "Prompt Engineering Lab", type: "lab", icon: Code, description: "Build effective prompts using the CRISP framework" },
            { id: "quiz", title: "Knowledge Validation", type: "quiz", icon: Brain, description: "Test your understanding with interactive assessments" },
            { id: "project", title: "Capstone Project", type: "project", icon: Target, description: "AI-Powered Documentation Generator" },
            { id: "cert", title: "NATIVE-F Certification", type: "certification", icon: Award, description: "Industry-recognized AI foundations credential" },
        ],
        videoUrl: "https://www.youtube.com/embed/FoXHScf1mjA",
        videoTitle: "The AI-Native Software Engineer - Addy Osmani (Google)",
        labTitle: "Prompt Engineering Fundamentals",
        labCode: `# CRISP Framework Lab
# Build effective prompts step-by-step

prompt = """
[Context] A junior developer needs to understand APIs
[Role] Act as a patient senior developer
[Instruction] Explain what APIs are and give 3 examples
[Style] Use simple language with code examples
[Parameters] Keep it under 200 words
"""

# Run this prompt with any LLM to see CRISP in action
print(prompt)`,
        labSteps: [
            { title: "Create a basic prompt", completed: true },
            { title: "Add role context", completed: true },
            { title: "Apply CRISP framework", completed: false, current: true },
            { title: "Test with real LLM", completed: false },
        ],
        quizQuestion: "What is the key difference between traditional programming and machine learning?",
        quizOptions: [
            "ML uses more memory",
            "Traditional requires explicit rules, ML learns from data",
            "ML can only do image recognition",
            "Traditional is faster",
        ],
        quizCorrectIndex: 1,
        quizExplanation: "Machine learning learns patterns from data rather than requiring developers to explicitly code every rule.",
        projectTitle: "AI-Powered Documentation Generator",
        projectScenario: "Your team has inherited a legacy codebase with minimal documentation. Use AI to rapidly generate comprehensive documentation.",
        projectDeliverables: [
            "Reusable prompt template for function documentation",
            "Module-level overview documentation prompt",
            "API reference documentation prompt",
            "Quality validation checklist",
        ],
    },
    associate: {
        stops: [
            { id: "video", title: "Agentic AI Introduction", type: "video", icon: Play, description: "Understanding autonomous AI systems and workflows" },
            { id: "lab", title: "Build an AI Agent", type: "lab", icon: Code, description: "Create a multi-turn agent with function calling" },
            { id: "quiz", title: "Agent Architecture Quiz", type: "quiz", icon: Brain, description: "Validate your understanding of agentic patterns" },
            { id: "project", title: "Support Agent Capstone", type: "project", icon: Target, description: "Autonomous Customer Support Agent" },
            { id: "cert", title: "NATIVE-A Certification", type: "certification", icon: Award, description: "Associate Developer credential" },
        ],
        videoUrl: "https://www.youtube.com/embed/sal78ACtGTc",
        videoTitle: "Building AI Agents - Andrew Ng (DeepLearning.AI)",
        labTitle: "Build a Multi-Turn AI Agent",
        labCode: `# AI Agent Builder Lab
# Create an agent with tool use capabilities

from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import tool

@tool
def search_knowledge_base(query: str) -> str:
    """Search the company knowledge base for relevant information."""
    # Simulated knowledge base search
    return f"Found 3 relevant articles for: {query}"

@tool  
def create_ticket(title: str, priority: str) -> str:
    """Create a support ticket in the system."""
    return f"Ticket created: {title} (Priority: {priority})"

@tool
def escalate_to_human(reason: str) -> str:
    """Escalate complex issues to human support."""
    return f"Escalated to human agent: {reason}"

# Agent uses ReAct pattern: Reason -> Act -> Observe
tools = [search_knowledge_base, create_ticket, escalate_to_human]
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

# Run agent with user query
result = executor.invoke({"input": "My order hasn't arrived"})`,
        labSteps: [
            { title: "Define agent tools", completed: true },
            { title: "Implement ReAct pattern", completed: true },
            { title: "Add multi-turn memory", completed: false, current: true },
            { title: "Test escalation logic", completed: false },
            { title: "Deploy to sandbox", completed: false },
        ],
        quizQuestion: "What is the ReAct pattern in AI agents?",
        quizOptions: [
            "A JavaScript framework for AI",
            "Reason → Act → Observe loop for autonomous decision making",
            "A method for training neural networks",
            "A type of prompt template",
        ],
        quizCorrectIndex: 1,
        quizExplanation: "ReAct (Reasoning + Acting) enables agents to reason about what action to take, execute it, and observe results before deciding next steps.",
        projectTitle: "Autonomous Customer Support Agent",
        projectScenario: "Build an intelligent support agent that handles customer inquiries, searches knowledge bases, creates tickets, and escalates complex issues.",
        projectDeliverables: [
            "Multi-intent classification system",
            "Knowledge base integration with RAG",
            "Automatic ticket creation workflow",
            "Human escalation decision logic",
            "Conversation memory implementation",
        ],
    },
    professional: {
        stops: [
            { id: "video", title: "RAG Architecture Deep Dive", type: "video", icon: Play, description: "Production RAG systems and semantic search" },
            { id: "lab", title: "Build a RAG Pipeline", type: "lab", icon: Database, description: "Create a knowledge base with vector search" },
            { id: "quiz", title: "RAG & Security Quiz", type: "quiz", icon: Shield, description: "Validate RAG patterns and AI security knowledge" },
            { id: "project", title: "Enterprise Knowledge System", type: "project", icon: Target, description: "Full production RAG implementation" },
            { id: "cert", title: "NATIVE-P Certification", type: "certification", icon: Award, description: "Professional Developer credential" },
        ],
        videoUrl: "https://www.youtube.com/embed/sVcwVQRHIc8",
        videoTitle: "Building Production RAG Systems - LangChain",
        labTitle: "Build a Production RAG Pipeline",
        labCode: `# Production RAG Pipeline Lab
# Build semantic search over enterprise documents

from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# 1. Document Processing
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", ". ", " "]
)
chunks = text_splitter.split_documents(documents)

# 2. Generate Embeddings
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# 3. Store in Vector Database
vectorstore = Pinecone.from_documents(
    chunks,
    embeddings,
    index_name="enterprise-knowledge"
)

# 4. Create Retrieval Chain
retriever = vectorstore.as_retriever(
    search_type="mmr",  # Maximal Marginal Relevance
    search_kwargs={"k": 5, "fetch_k": 20}
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

# Query the knowledge base
result = qa_chain.invoke("What is our refund policy?")`,
        labSteps: [
            { title: "Load and chunk documents", completed: true },
            { title: "Generate embeddings", completed: true },
            { title: "Configure vector store", completed: true },
            { title: "Implement retrieval chain", completed: false, current: true },
            { title: "Add re-ranking layer", completed: false },
            { title: "Implement security filters", completed: false },
        ],
        quizQuestion: "What is the purpose of chunking in RAG systems?",
        quizOptions: [
            "To make documents load faster",
            "To split documents into optimal sizes for embedding and retrieval",
            "To encrypt sensitive data",
            "To reduce API costs",
        ],
        quizCorrectIndex: 1,
        quizExplanation: "Chunking splits documents into appropriately sized pieces that can be effectively embedded and retrieved. Chunk size affects retrieval quality and context relevance.",
        projectTitle: "Enterprise Knowledge Management System",
        projectScenario: "Build a production-grade knowledge system that enables employees to query company documentation, policies, and procedures using natural language.",
        projectDeliverables: [
            "Document ingestion pipeline with metadata extraction",
            "Hybrid search (semantic + keyword) implementation",
            "Re-ranking with cross-encoders for precision",
            "Role-based access control for sensitive documents",
            "Query analytics and feedback loop",
            "Hallucination detection and source citation",
        ],
    },
    architect: {
        stops: [
            { id: "video", title: "Enterprise AI Architecture", type: "video", icon: Play, description: "Multi-model orchestration and platform design" },
            { id: "lab", title: "Design AI Platform", type: "lab", icon: Cpu, description: "Model registry and intelligent routing" },
            { id: "quiz", title: "Architecture Review", type: "quiz", icon: Building2, description: "Enterprise governance and cost optimization" },
            { id: "project", title: "AI Center of Excellence", type: "project", icon: Target, description: "Org-wide transformation blueprint" },
            { id: "cert", title: "NATIVE-SA Certification", type: "certification", icon: Award, description: "Solutions Architect credential with oral defense" },
        ],
        videoUrl: "https://www.youtube.com/embed/zjkBMFhNj_g",
        videoTitle: "Enterprise AI Strategy - Andrej Karpathy",
        labTitle: "Enterprise AI Platform Design",
        labCode: `# Enterprise AI Platform Architecture Lab
# Design multi-model orchestration with cost optimization

from typing import Literal
from pydantic import BaseModel

class ModelConfig(BaseModel):
    """Model registry entry with routing metadata"""
    name: str
    provider: Literal["openai", "anthropic", "google", "azure"]
    cost_per_1k_tokens: float
    latency_p95_ms: int
    capabilities: list[str]
    max_context: int

# Model Registry
MODEL_REGISTRY = {
    "gpt-4o": ModelConfig(
        name="gpt-4o", provider="openai",
        cost_per_1k_tokens=0.005, latency_p95_ms=800,
        capabilities=["reasoning", "code", "vision"],
        max_context=128000
    ),
    "claude-3-5-sonnet": ModelConfig(
        name="claude-3-5-sonnet", provider="anthropic",
        cost_per_1k_tokens=0.003, latency_p95_ms=600,
        capabilities=["reasoning", "code", "long-context"],
        max_context=200000
    ),
    "gemini-2-flash": ModelConfig(
        name="gemini-2.0-flash", provider="google",
        cost_per_1k_tokens=0.0001, latency_p95_ms=200,
        capabilities=["fast", "code", "multimodal"],
        max_context=1000000
    ),
}

class IntelligentRouter:
    """Route requests to optimal model based on requirements"""
    
    def route(self, task_type: str, priority: str, budget: str):
        if priority == "speed":
            return "gemini-2-flash"
        elif task_type == "complex_reasoning":
            return "claude-3-5-sonnet"
        elif budget == "optimize":
            return self._cheapest_capable(task_type)
        return "gpt-4o"  # Default fallback`,
        labSteps: [
            { title: "Design model registry schema", completed: true },
            { title: "Implement routing logic", completed: true },
            { title: "Add cost optimization layer", completed: false, current: true },
            { title: "Configure fallback chains", completed: false },
            { title: "Implement observability", completed: false },
            { title: "Design governance framework", completed: false },
        ],
        quizQuestion: "Why implement multi-model orchestration instead of using a single LLM provider?",
        quizOptions: [
            "It's required by law",
            "To optimize for cost, latency, capability, and vendor resilience",
            "Single providers don't offer good models",
            "It's simpler to manage",
        ],
        quizCorrectIndex: 1,
        quizExplanation: "Multi-model orchestration enables cost optimization (use cheaper models for simple tasks), latency optimization, capability matching, and vendor resilience through failover.",
        projectTitle: "AI Center of Excellence Blueprint",
        projectScenario: "Design the organizational structure, governance framework, and technical platform for an enterprise-wide AI transformation initiative.",
        projectDeliverables: [
            "Multi-model platform architecture with routing strategy",
            "AI governance framework aligned with EU AI Act",
            "Cost optimization playbook with tiered model selection",
            "Center of Excellence org structure and RACI matrix",
            "Risk assessment and mitigation framework",
            "12-month transformation roadmap with KPIs",
        ],
    },
};

// =============================================================================
// NATIVE FRAMEWORK PHASES
// =============================================================================

const nativePhases = [
    { letter: "N", title: "Navigate", description: "Assess readiness and identify opportunities" },
    { letter: "A", title: "Activate", description: "Build and deploy first AI workflow" },
    { letter: "T", title: "Transform", description: "Scale to production-grade systems" },
    { letter: "I", title: "Integrate", description: "Connect across enterprise systems" },
    { letter: "V", title: "Validate", description: "Measure impact and ensure compliance" },
    { letter: "E", title: "Evolve", description: "Continuous improvement and self-sufficiency" },
];

// =============================================================================
// MAIN TOUR COMPONENT
// =============================================================================

export default function EnterpriseTourPage() {
    const [view, setView] = useState<"overview" | "track">("overview");
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [currentStop, setCurrentStop] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSelectTrack = (trackId: string) => {
        setSelectedTrack(trackId);
        setView("track");
        setCurrentStop(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const handleBackToOverview = () => {
        setView("overview");
        setSelectedTrack(null);
        setCurrentStop(0);
    };

    const track = selectedTrack ? certificationTracks.find(t => t.id === selectedTrack) : null;
    const demoContent = selectedTrack ? trackDemoContent[selectedTrack] : null;
    const currentStopData = demoContent?.stops[currentStop];
    const progress = demoContent ? ((currentStop + 1) / demoContent.stops.length) * 100 : 0;

    // ==========================================================================
    // OVERVIEW VIEW
    // ==========================================================================
    if (view === "overview") {
        return (
            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                                <div>
                                    <h1 className="text-lg font-semibold">ScaledNative Platform Tour</h1>
                                    <p className="text-sm text-muted-foreground">Enterprise AI Transformation Training</p>
                                </div>
                            </div>
                            <Link href="/contact">
                                <Button>Schedule Demo <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* NATIVE Framework Overview */}
                    <section className="mb-16">
                        <div className="text-center mb-8">
                            <Badge variant="outline" className="mb-4">The NATIVE Framework™</Badge>
                            <h2 className="text-3xl font-bold mb-2">Enterprise AI Transformation Methodology</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Six phases from AI literacy to organizational self-sufficiency
                            </p>
                        </div>

                        <div className="flex justify-center gap-3 mb-8">
                            {nativePhases.map((phase, i) => (
                                <div key={phase.letter} className="text-center">
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary mb-2">
                                        {phase.letter}
                                    </div>
                                    <p className="text-xs font-medium">{phase.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certification Tracks */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Choose a Certification Track to Explore</h2>
                            <p className="text-muted-foreground">Experience the depth of each training path</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {certificationTracks.map((track) => (
                                <button
                                    key={track.id}
                                    onClick={() => handleSelectTrack(track.id)}
                                    className="text-left p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                            track.gradient
                                        )}>
                                            <track.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="secondary" className="text-xs">{track.level}</Badge>
                                                <span className="text-xs text-muted-foreground">{track.duration}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                                                {track.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-3.5 h-3.5" /> {track.modules} modules
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Code className="w-3.5 h-3.5" /> {track.labs} labs
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Target className="w-3.5 h-3.5" /> {track.projects} projects
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="mt-16 py-8 border-t border-border/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { value: "150+", label: "Interactive Lessons" },
                                { value: "36+", label: "Hands-On Labs" },
                                { value: "15+", label: "Capstone Projects" },
                                { value: "4", label: "Certification Levels" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // ==========================================================================
    // TRACK DEMO VIEW
    // ==========================================================================
    if (!track || !demoContent || !currentStopData) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={handleBackToOverview} className="text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{track.level}</Badge>
                                    <h1 className="text-lg font-semibold">{track.shortTitle} Track Demo</h1>
                                </div>
                                <p className="text-sm text-muted-foreground">{currentStop + 1} of {demoContent.stops.length}</p>
                            </div>
                        </div>
                        <Link href="/signup">
                            <Button>Start Learning <ArrowRight className="w-4 h-4 ml-2" /></Button>
                        </Link>
                    </div>
                    <Progress value={progress} className="mt-4 h-1" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar Navigation */}
                    <div className="space-y-2">
                        {demoContent.stops.map((stop, index) => (
                            <button
                                key={stop.id}
                                onClick={() => { setCurrentStop(index); setSelectedAnswer(null); setShowExplanation(false); }}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all",
                                    currentStop === index
                                        ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/5"
                                        : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                        currentStop === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <stop.icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={cn("font-medium text-sm", currentStop === index ? "text-foreground" : "text-muted-foreground")}>
                                            {stop.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{stop.description}</p>
                                    </div>
                                    {index < currentStop && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 ml-auto" />}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* VIDEO STOP */}
                        {currentStopData.type === "video" && (
                            <Card className="p-6 space-y-6">
                                <div>
                                    <Badge variant="outline" className="mb-2">Expert Content</Badge>
                                    <h2 className="text-2xl font-bold">{demoContent.videoTitle}</h2>
                                    <p className="text-muted-foreground mt-1">Learn from industry leaders</p>
                                </div>
                                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
                                    <iframe
                                        src={demoContent.videoUrl}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                                        <Lightbulb className="w-4 h-4" /> Why This Matters
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our curriculum integrates insights from Google, DeepLearning.AI, and enterprise practitioners
                                        to ensure your team learns from the best in the industry.
                                    </p>
                                </div>
                            </Card>
                        )}

                        {/* LAB STOP */}
                        {currentStopData.type === "lab" && (
                            <Card className="p-6 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge variant="outline" className="mb-2">Hands-On Lab</Badge>
                                        <h2 className="text-2xl font-bold">{demoContent.labTitle}</h2>
                                        <p className="text-muted-foreground mt-1">Interactive coding environment</p>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-[1fr_280px] gap-6">
                                    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-border">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                            </div>
                                            <span className="text-xs text-[#858585] ml-2">lab_exercise.py</span>
                                        </div>
                                        <pre className="p-4 text-sm font-mono text-[#d4d4d4] overflow-x-auto max-h-[400px]">
                                            <code>{demoContent.labCode}</code>
                                        </pre>
                                        <div className="px-4 py-3 bg-[#252526] border-t border-[#3c3c3c] flex items-center justify-between">
                                            <span className="text-xs text-[#858585]">Python 3.11</span>
                                            <Button size="sm" className="h-7 text-xs">
                                                <Play className="w-3 h-3 mr-1" /> Run Code
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-sm">Lab Progress</h3>
                                        {demoContent.labSteps?.map((step, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "p-3 rounded-lg border text-sm transition-all",
                                                    step.completed ? "bg-green-500/10 border-green-500/20"
                                                        : step.current ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
                                                            : "bg-muted/30 border-border/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {step.completed ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        : step.current ? <div className="w-4 h-4 rounded-full border-2 border-primary animate-pulse" />
                                                            : <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />}
                                                    <span className={step.current ? "font-medium" : ""}>{step.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* QUIZ STOP */}
                        {currentStopData.type === "quiz" && (
                            <Card className="p-6 space-y-6">
                                <div>
                                    <Badge variant="outline" className="mb-2">Knowledge Check</Badge>
                                    <h2 className="text-2xl font-bold">Validate Your Understanding</h2>
                                    <p className="text-muted-foreground mt-1">Interactive assessments with detailed explanations</p>
                                </div>
                                <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <p className="font-medium text-lg mb-4">{demoContent.quizQuestion}</p>
                                    <div className="space-y-3">
                                        {demoContent.quizOptions?.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setSelectedAnswer(i); setShowExplanation(true); }}
                                                disabled={showExplanation}
                                                className={cn(
                                                    "w-full text-left p-4 rounded-lg border transition-all",
                                                    selectedAnswer === i
                                                        ? i === demoContent.quizCorrectIndex
                                                            ? "bg-green-500/10 border-green-500 text-green-400"
                                                            : "bg-red-500/10 border-red-500 text-red-400"
                                                        : "bg-card border-border hover:border-primary/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                                        {String.fromCharCode(65 + i)}
                                                    </span>
                                                    {option}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {showExplanation && (
                                        <div className={cn(
                                            "mt-4 p-4 rounded-lg border",
                                            selectedAnswer === demoContent.quizCorrectIndex
                                                ? "bg-green-500/10 border-green-500/30"
                                                : "bg-amber-500/10 border-amber-500/30"
                                        )}>
                                            <p className="font-medium mb-1">
                                                {selectedAnswer === demoContent.quizCorrectIndex ? "✓ Correct!" : "✗ Not quite"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{demoContent.quizExplanation}</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* PROJECT STOP */}
                        {currentStopData.type === "project" && (
                            <Card className="p-6 space-y-6">
                                <div>
                                    <Badge variant="outline" className="mb-2">Capstone Project</Badge>
                                    <h2 className="text-2xl font-bold">{demoContent.projectTitle}</h2>
                                    <p className="text-muted-foreground mt-1">Real-world scenario</p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Scenario
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{demoContent.projectScenario}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-card border border-border">
                                    <h3 className="font-semibold mb-3">Deliverables</h3>
                                    <ul className="space-y-2 text-sm">
                                        {demoContent.projectDeliverables?.map((d, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <Rocket className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="font-medium">Real Outcomes</p>
                                        <p className="text-sm text-muted-foreground">
                                            Projects produce actual working systems, not just certificates
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* CERTIFICATION STOP */}
                        {currentStopData.type === "certification" && (
                            <Card className="p-6 space-y-6">
                                <div className="text-center">
                                    <Badge variant="outline" className="mb-4">Professional Certification</Badge>
                                    <h2 className="text-2xl font-bold">{track.title}</h2>
                                    <p className="text-muted-foreground mt-2">Verifiable credentials for career advancement</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 blur-3xl" />
                                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 text-center">
                                        <div className={cn("w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br", track.gradient)}>
                                            <track.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="text-amber-400/80 text-sm font-medium tracking-widest uppercase mb-2">
                                            Certificate of Completion
                                        </p>
                                        <h3 className="text-2xl font-bold text-white mb-1">[Your Name]</h3>
                                        <p className="text-slate-400 mb-4">has successfully completed</p>
                                        <p className="text-xl font-semibold text-amber-400 mb-6">{track.title}</p>
                                        <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                                            <div>
                                                <p className="text-slate-500">Credential ID</p>
                                                <p className="text-white font-mono">{track.level}-2026-XXXX</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                                        <p className="font-medium">Verified</p>
                                        <p className="text-xs text-muted-foreground">Tamper-proof credentials</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Award className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                        <p className="font-medium">LinkedIn Ready</p>
                                        <p className="text-xs text-muted-foreground">One-click profile add</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                                        <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                                        <p className="font-medium">Employer Verified</p>
                                        <p className="text-xs text-muted-foreground">Public verification page</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-4">
                            <Button
                                variant="outline"
                                onClick={() => { setCurrentStop(Math.max(0, currentStop - 1)); setSelectedAnswer(null); setShowExplanation(false); }}
                                disabled={currentStop === 0}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            {currentStop === demoContent.stops.length - 1 ? (
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleBackToOverview}>
                                        Explore Other Tracks
                                    </Button>
                                    <Link href="/signup">
                                        <Button size="lg" className="gap-2">
                                            Start Learning Now <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button onClick={() => { setCurrentStop(currentStop + 1); setSelectedAnswer(null); setShowExplanation(false); }}>
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
