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
        id: "practitioner",
        level: "NATIVE-F",
        title: "AI NATIVE Practitioner",
        shortTitle: "Practitioner",
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
        id: "developer",
        level: "NATIVE-A",
        title: "AI NATIVE Developer",
        shortTitle: "Developer",
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
        id: "engineer",
        level: "NATIVE-P",
        title: "AI NATIVE Engineering Professional",
        shortTitle: "Engineer",
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
        title: "AI NATIVE Solutions Architect",
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
    {
        id: "leader",
        level: "NATIVE-TL",
        title: "AI NATIVE Transformation Leader",
        shortTitle: "Leader",
        description: "Lead enterprise AI transformation, change management, and strategic planning.",
        duration: "25-30 hours",
        modules: 2,
        labs: 4,
        projects: 2,
        icon: Rocket,
        color: "rose",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        id: "data",
        level: "NATIVE-DS",
        title: "AI NATIVE Data Strategist",
        shortTitle: "Data",
        description: "Master data pipelines, governance, and quality for AI/ML success.",
        duration: "30-35 hours",
        modules: 3,
        labs: 8,
        projects: 4,
        icon: Database,
        color: "cyan",
        gradient: "from-cyan-500 to-sky-500",
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
    videoChapters?: Array<{ time: string; title: string }>;
    resources?: Array<{ title: string; type: string; size: string }>;
    labTitle?: string;
    labCode?: string;
    labOutput?: string;
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
            { id: "video", title: "Healthcare AI Deep Dive", type: "video", icon: Play, description: "Building AI for regulated industries" },
            { id: "lab", title: "Patient Services CRM Lab", type: "lab", icon: Database, description: "Generate a healthcare CRM with AI" },
            { id: "quiz", title: "Healthcare AI Quiz", type: "quiz", icon: Shield, description: "HIPAA compliance and AI security" },
            { id: "project", title: "Enterprise Health Platform", type: "project", icon: Target, description: "Full patient services application" },
            { id: "cert", title: "NATIVE-P Certification", type: "certification", icon: Award, description: "Professional Developer credential" },
        ],
        videoUrl: "https://www.youtube.com/embed/sVcwVQRHIc8",
        videoTitle: "Building Production RAG Systems for Healthcare",
        videoChapters: [
            { time: "0:00", title: "Introduction to Healthcare AI" },
            { time: "4:32", title: "HIPAA Compliance Essentials" },
            { time: "12:18", title: "Patient Data Architecture" },
            { time: "23:45", title: "Secure RAG Implementation" },
            { time: "38:20", title: "Production Deployment" },
        ],
        resources: [
            { title: "Healthcare AI Compliance Guide", type: "PDF", size: "2.4 MB" },
            { title: "HIPAA Data Handling Checklist", type: "Article", size: "5 min read" },
            { title: "Patient CRM Reference Architecture", type: "Diagram", size: "1.2 MB" },
        ],
        labTitle: "Build a Patient Services CRM",
        labCode: `# Healthcare Patient Services CRM Generator
# AI-Powered Application Development Lab

from healthcrm import PatientModel, ServiceRecord
from ai_generator import CRMBuilder, HIPAAValidator

# 1. Define Patient Data Schema
class Patient(PatientModel):
    patient_id: str
    medical_record_number: str
    date_of_birth: date
    insurance_provider: str
    primary_physician: str
    conditions: list[str]
    medications: list[Medication]
    visit_history: list[Visit]

# 2. Generate HIPAA-Compliant API Endpoints
crm_builder = CRMBuilder(
    model=Patient,
    security="HIPAA",
    encryption="AES-256"
)

# 3. Auto-generate Database Schema
db_schema = crm_builder.generate_schema()
print("📊 Generated PostgreSQL schema...")

# 4. Create REST API with Audit Logging
api = crm_builder.generate_api(
    endpoints=["create", "read", "update", "search"],
    audit_logging=True,
    role_based_access=True
)
print("🔐 Generated secure API endpoints...")

# 5. Build React Dashboard Components
dashboard = crm_builder.generate_ui(
    theme="healthcare-professional",
    components=["PatientList", "RecordViewer", "AppointmentScheduler"]
)
print("🖥️  Generated React dashboard...")

# 6. Validate HIPAA Compliance
validator = HIPAAValidator()
report = validator.audit(api, db_schema)
print(f"✅ HIPAA Validation: {report.status}")`,
        labOutput: `📊 Generated PostgreSQL schema...
   → Created table: patients (12 columns)
   → Created table: medical_records (8 columns)
   → Created table: appointments (6 columns)
   → Applied encryption to PHI fields

🔐 Generated secure API endpoints...
   → POST /api/patients (with audit logging)
   → GET /api/patients/:id (role-based access)
   → PUT /api/patients/:id (HIPAA compliant)
   → GET /api/patients/search (encrypted query)

🖥️  Generated React dashboard...
   → PatientList.tsx (142 lines)
   → RecordViewer.tsx (89 lines)
   → AppointmentScheduler.tsx (156 lines)
   → index.css (healthcare-professional theme)

✅ HIPAA Validation: PASSED
   → PHI encryption: ✓
   → Audit logging: ✓
   → Access controls: ✓
   → Data retention policy: ✓`,
        labSteps: [
            { title: "Define patient data model", completed: true },
            { title: "Configure HIPAA security", completed: true },
            { title: "Generate database schema", completed: true },
            { title: "Create REST API endpoints", completed: true },
            { title: "Build React dashboard", completed: false, current: true },
            { title: "Run HIPAA validation", completed: false },
        ],
        quizQuestion: "What is required for HIPAA-compliant AI systems handling PHI?",
        quizOptions: [
            "Open-source models only",
            "End-to-end encryption, audit logging, and access controls",
            "Cloud deployment is prohibited",
            "AI cannot process patient data",
        ],
        quizCorrectIndex: 1,
        quizExplanation: "HIPAA requires technical safeguards including encryption, comprehensive audit trails, and role-based access controls when AI systems process Protected Health Information (PHI).",
        projectTitle: "Enterprise Patient Services Platform",
        projectScenario: "Build a complete patient services application for a regional healthcare network, including appointment scheduling, medical record access, prescription management, and provider messaging.",
        projectDeliverables: [
            "Patient portal with secure authentication",
            "Medical records viewer with role-based access",
            "AI-powered appointment scheduling assistant",
            "Prescription refill workflow automation",
            "Provider messaging with HIPAA encryption",
            "Analytics dashboard for administrators",
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
                                    <Badge variant="outline" className="mb-2">Expert Video Content</Badge>
                                    <h2 className="text-2xl font-bold">{demoContent.videoTitle}</h2>
                                    <p className="text-muted-foreground mt-1">Curated from industry practitioners and thought leaders</p>
                                </div>

                                <div className="grid lg:grid-cols-[1fr_300px] gap-6">
                                    {/* Video Player */}
                                    <div>
                                        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-border shadow-2xl">
                                            {/* Branded overlay header */}
                                            <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/80 to-transparent">
                                                <div className="flex items-center gap-2 text-xs text-white/60">
                                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                    ScaledNative Training
                                                </div>
                                            </div>
                                            <iframe
                                                src={`${demoContent.videoUrl}?modestbranding=1&rel=0&showinfo=0`}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>

                                        {/* Chapters */}
                                        {demoContent.videoChapters && (
                                            <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4 text-primary" />
                                                    Chapters
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    {demoContent.videoChapters.map((chapter, i) => (
                                                        <button key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-left">
                                                            <span className="text-xs text-primary font-mono">{chapter.time}</span>
                                                            <span className="text-muted-foreground">{chapter.title}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Resources Sidebar */}
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                                                <Lightbulb className="w-4 h-4" /> Why This Matters
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Our curriculum integrates insights from enterprise practitioners
                                                to ensure your team learns from the best in the industry.
                                            </p>
                                        </div>

                                        {demoContent.resources && (
                                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    Supplementary Materials
                                                </h3>
                                                <div className="space-y-2">
                                                    {demoContent.resources.map((resource, i) => (
                                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/30">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="secondary" className="h-5 text-[10px]">{resource.type}</Badge>
                                                                <span className="text-sm">{resource.title}</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">{resource.size}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                                        <p className="text-muted-foreground mt-1">AI-powered application development</p>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-[1fr_280px] gap-6">
                                    <div className="space-y-4">
                                        {/* Code Editor */}
                                        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-border">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                                </div>
                                                <span className="text-xs text-[#858585] ml-2">healthcare_crm_generator.py</span>
                                                <div className="ml-auto flex gap-2">
                                                    <Badge className="h-5 text-[10px] bg-green-500/20 text-green-400 border-green-500/30">✓ HIPAA Mode</Badge>
                                                </div>
                                            </div>
                                            <pre className="p-4 text-sm font-mono text-[#d4d4d4] overflow-x-auto max-h-[300px]">
                                                <code>{demoContent.labCode}</code>
                                            </pre>
                                            <div className="px-4 py-3 bg-[#252526] border-t border-[#3c3c3c] flex items-center justify-between">
                                                <span className="text-xs text-[#858585]">Python 3.11 • ScaledNative Runtime</span>
                                                <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700">
                                                    <Play className="w-3 h-3 mr-1" /> Run Code
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Terminal Output */}
                                        {demoContent.labOutput && (
                                            <div className="bg-black rounded-xl overflow-hidden border border-emerald-500/30">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border-b border-emerald-500/20">
                                                    <Terminal className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-xs text-emerald-400 font-mono">Output</span>
                                                    <Badge className="ml-auto h-5 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                                                        Executed
                                                    </Badge>
                                                </div>
                                                <pre className="p-4 text-sm font-mono text-emerald-300/90 overflow-x-auto max-h-[250px]">
                                                    <code>{demoContent.labOutput}</code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
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

                                        {/* Generated Files Preview */}
                                        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                                            <h4 className="font-semibold text-xs text-muted-foreground mb-3">GENERATED FILES</h4>
                                            <div className="space-y-2 text-xs font-mono">
                                                <div className="flex items-center gap-2 text-blue-400">
                                                    <FileText className="w-3 h-3" /> db/schema.sql
                                                </div>
                                                <div className="flex items-center gap-2 text-green-400">
                                                    <Code className="w-3 h-3" /> api/patients.ts
                                                </div>
                                                <div className="flex items-center gap-2 text-purple-400">
                                                    <Layers className="w-3 h-3" /> components/PatientList.tsx
                                                </div>
                                                <div className="flex items-center gap-2 text-amber-400">
                                                    <Shield className="w-3 h-3" /> middleware/hipaa.ts
                                                </div>
                                            </div>
                                        </div>
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
