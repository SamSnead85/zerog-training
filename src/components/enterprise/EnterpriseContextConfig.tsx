"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Building2,
    Code2,
    Database,
    Cloud,
    Shield,
    Users,
    Workflow,
    Save,
    Plus,
    X,
    CheckCircle2,
    Edit3,
    Sparkles,
    Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TechStackItem {
    id: string;
    name: string;
    category: "language" | "framework" | "cloud" | "database" | "tool";
    proficiencyLevel: "beginner" | "intermediate" | "advanced";
}

interface EnterpriseContext {
    companyName: string;
    industry: string;
    size: string;
    techStack: TechStackItem[];
    aiSdlcPhase: string;
    aiTools: string[];
    securityFrameworks: string[];
    complianceRequirements: string[];
    customTerminology: Record<string, string>;
    workflowsAndProcesses: string[];
}

const defaultContext: EnterpriseContext = {
    companyName: "",
    industry: "Healthcare",
    size: "1000+",
    techStack: [],
    aiSdlcPhase: "exploration",
    aiTools: [],
    securityFrameworks: [],
    complianceRequirements: ["HIPAA", "HITECH"],
    customTerminology: {},
    workflowsAndProcesses: [],
};

const aiSdlcPhases = [
    { id: "exploration", label: "AI Exploration", description: "Learning about AI capabilities" },
    { id: "pilot", label: "Pilot Projects", description: "Running initial AI experiments" },
    { id: "scaling", label: "Scaling AI", description: "Deploying AI across teams" },
    { id: "transformation", label: "AI-Native", description: "AI embedded in all workflows" },
];

const commonTechStacks = [
    { name: "Epic EHR", category: "tool" as const },
    { name: "Cerner", category: "tool" as const },
    { name: "Microsoft Azure", category: "cloud" as const },
    { name: "AWS", category: "cloud" as const },
    { name: "Python", category: "language" as const },
    { name: "SQL Server", category: "database" as const },
    { name: "Snowflake", category: "database" as const },
    { name: "Power BI", category: "tool" as const },
    { name: "Salesforce Health Cloud", category: "tool" as const },
];

const commonAITools = [
    "GitHub Copilot",
    "Microsoft Copilot",
    "ChatGPT Enterprise",
    "Claude",
    "Google Gemini",
    "Custom ML Models",
    "Azure OpenAI",
    "Amazon Bedrock",
];

export function EnterpriseContextConfig() {
    const [context, setContext] = useState<EnterpriseContext>(defaultContext);
    const [isSaving, setIsSaving] = useState(false);
    const [newTermKey, setNewTermKey] = useState("");
    const [newTermValue, setNewTermValue] = useState("");
    const [newProcess, setNewProcess] = useState("");

    const handleSave = async () => {
        setIsSaving(true);
        // Save to API/localStorage
        localStorage.setItem("zerog_enterprise_context", JSON.stringify(context));
        await new Promise((r) => setTimeout(r, 1000));
        setIsSaving(false);
    };

    const addTechStack = (item: { name: string; category: TechStackItem["category"] }) => {
        setContext({
            ...context,
            techStack: [
                ...context.techStack,
                { id: Date.now().toString(), ...item, proficiencyLevel: "intermediate" },
            ],
        });
    };

    const removeTechStack = (id: string) => {
        setContext({
            ...context,
            techStack: context.techStack.filter((t) => t.id !== id),
        });
    };

    const toggleAITool = (tool: string) => {
        const exists = context.aiTools.includes(tool);
        setContext({
            ...context,
            aiTools: exists
                ? context.aiTools.filter((t) => t !== tool)
                : [...context.aiTools, tool],
        });
    };

    const addTerminology = () => {
        if (newTermKey && newTermValue) {
            setContext({
                ...context,
                customTerminology: { ...context.customTerminology, [newTermKey]: newTermValue },
            });
            setNewTermKey("");
            setNewTermValue("");
        }
    };

    const addProcess = () => {
        if (newProcess) {
            setContext({
                ...context,
                workflowsAndProcesses: [...context.workflowsAndProcesses, newProcess],
            });
            setNewProcess("");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="h-7 w-7 text-primary" />
                        AI-Native Context Configuration
                    </h1>
                    <p className="text-muted-foreground">
                        Configure your organization's context for personalized AI training
                    </p>
                </div>
                <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Configuration"}
                </Button>
            </div>

            {/* Company Info */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Organization Profile
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Company Name</label>
                        <input
                            type="text"
                            value={context.companyName}
                            onChange={(e) => setContext({ ...context, companyName: e.target.value })}
                            placeholder="e.g., Metro Health System"
                            className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Industry</label>
                        <select
                            value={context.industry}
                            onChange={(e) => setContext({ ...context, industry: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg bg-muted border-0"
                        >
                            <option value="Healthcare">Healthcare</option>
                            <option value="Hospital System">Hospital System</option>
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Pharmaceutical">Pharmaceutical</option>
                            <option value="Medical Devices">Medical Devices</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Organization Size</label>
                        <select
                            value={context.size}
                            onChange={(e) => setContext({ ...context, size: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg bg-muted border-0"
                        >
                            <option value="50-200">50-200 employees</option>
                            <option value="200-500">200-500 employees</option>
                            <option value="500-1000">500-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                            <option value="5000+">5000+ employees</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* AI SDLC Phase */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    AI Maturity & SDLC Phase
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Where is your organization in the AI transformation journey?
                </p>
                <div className="grid md:grid-cols-4 gap-3">
                    {aiSdlcPhases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setContext({ ...context, aiSdlcPhase: phase.id })}
                            className={cn(
                                "p-4 rounded-xl text-left transition-all border",
                                context.aiSdlcPhase === phase.id
                                    ? "bg-primary/10 border-primary"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            )}
                        >
                            <p className="font-medium text-sm">{phase.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Tech Stack */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Technology Stack
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    AI training will reference your specific tools and technologies
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {context.techStack.map((item) => (
                        <Badge key={item.id} className="gap-1 py-1.5 px-3">
                            {item.name}
                            <button onClick={() => removeTechStack(item.id)}>
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {commonTechStacks
                        .filter((ts) => !context.techStack.some((t) => t.name === ts.name))
                        .map((item) => (
                            <button
                                key={item.name}
                                onClick={() => addTechStack(item)}
                                className="px-3 py-1.5 rounded-lg bg-muted text-sm hover:bg-muted/80 transition-colors"
                            >
                                + {item.name}
                            </button>
                        ))}
                </div>
            </Card>

            {/* AI Tools */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Tools in Use
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Which AI tools does your organization use or plan to use?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {commonAITools.map((tool) => (
                        <button
                            key={tool}
                            onClick={() => toggleAITool(tool)}
                            className={cn(
                                "p-3 rounded-lg text-sm text-left transition-all border",
                                context.aiTools.includes(tool)
                                    ? "bg-primary/10 border-primary"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            )}
                        >
                            {context.aiTools.includes(tool) && (
                                <CheckCircle2 className="h-4 w-4 text-primary inline mr-2" />
                            )}
                            {tool}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Custom Terminology */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Organization Terminology
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Define terms specific to your organization for AI context
                </p>
                <div className="space-y-2 mb-4">
                    {Object.entries(context.customTerminology).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 p-2 rounded bg-muted">
                            <strong className="text-sm">{key}:</strong>
                            <span className="text-sm text-muted-foreground">{value}</span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTermKey}
                        onChange={(e) => setNewTermKey(e.target.value)}
                        placeholder="Term (e.g., EMR)"
                        className="flex-1 h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10"
                    />
                    <input
                        type="text"
                        value={newTermValue}
                        onChange={(e) => setNewTermValue(e.target.value)}
                        placeholder="Definition"
                        className="flex-1 h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10"
                    />
                    <Button onClick={addTerminology}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </Card>

            {/* Workflows */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    Key Workflows & Processes
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    AI training will incorporate your specific processes
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {context.workflowsAndProcesses.map((process, i) => (
                        <Badge key={i} variant="outline" className="py-1.5">
                            {process}
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newProcess}
                        onChange={(e) => setNewProcess(e.target.value)}
                        placeholder="e.g., Patient intake process, Code review workflow"
                        className="flex-1 h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10"
                    />
                    <Button onClick={addProcess}>Add Process</Button>
                </div>
            </Card>
        </div>
    );
}
