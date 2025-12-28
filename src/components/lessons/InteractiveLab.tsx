"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Play,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowLeft,
    Code,
    Brain,
    Terminal,
    Rocket,
    Lightbulb,
    AlertCircle,
    RefreshCw,
    Copy,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LabStep {
    id: string;
    title: string;
    description: string;
    instruction: string;
    starterCode: string;
    expectedPatterns: string[];
    hints: string[];
    validation: (code: string) => { valid: boolean; feedback: string };
}

const labSteps: LabStep[] = [
    {
        id: "step1",
        title: "Step 1: Define the Generator Prompt",
        description: "Create a prompt template that tells the LLM to generate an initial solution.",
        instruction: "Complete the generator_prompt by adding the template string. It should instruct the AI to 'Generate a solution for: {task}' and remind it to 'Be thorough and consider edge cases.'",
        starterCode: `from langchain import PromptTemplate

# TODO: Complete this prompt template
generator_prompt = PromptTemplate(
    input_variables=["task"],
    template="""
    
    """
)`,
        expectedPatterns: ["Generate", "solution", "{task}", "edge cases"],
        hints: [
            "The template should reference {task} as a variable",
            "Include instructions about being thorough",
            "Mention edge cases in the prompt"
        ],
        validation: (code: string) => {
            const hasTask = code.includes("{task}");
            const hasGenerate = code.toLowerCase().includes("generate");
            const hasSolution = code.toLowerCase().includes("solution");
            const hasEdgeCases = code.toLowerCase().includes("edge case");

            if (!hasTask) return { valid: false, feedback: "Missing {task} variable in template" };
            if (!hasGenerate) return { valid: false, feedback: "Template should mention 'generate'" };
            if (!hasSolution) return { valid: false, feedback: "Template should mention 'solution'" };
            if (!hasEdgeCases) return { valid: false, feedback: "Don't forget to mention edge cases!" };

            return { valid: true, feedback: "Excellent! Your generator prompt is well-structured." };
        }
    },
    {
        id: "step2",
        title: "Step 2: Create the Critic Prompt",
        description: "Build a prompt that critiques the generated solution with specific feedback categories.",
        instruction: "Complete the critic_prompt. It should review the solution and provide feedback on: 1) Correctness, 2) Completeness, 3) Edge cases, 4) Improvements needed.",
        starterCode: `# TODO: Complete the critic prompt
critic_prompt = PromptTemplate(
    input_variables=["solution", "task"],
    template="""Review this solution for the task: {task}

Solution: {solution}

Provide specific, actionable feedback on:

    """
)`,
        expectedPatterns: ["Correctness", "Completeness", "edge case", "Improvement"],
        hints: [
            "Include numbered feedback categories",
            "Reference both {task} and {solution}",
            "Ask for actionable, specific feedback"
        ],
        validation: (code: string) => {
            const hasTask = code.includes("{task}");
            const hasSolution = code.includes("{solution}");
            const hasCorrectness = code.toLowerCase().includes("correct");
            const hasComplete = code.toLowerCase().includes("complet");

            if (!hasTask || !hasSolution) return { valid: false, feedback: "Include both {task} and {solution} variables" };
            if (!hasCorrectness) return { valid: false, feedback: "Include 'Correctness' as a feedback category" };
            if (!hasComplete) return { valid: false, feedback: "Include 'Completeness' as a feedback category" };

            return { valid: true, feedback: "Great critic prompt! It covers all the key evaluation areas." };
        }
    },
    {
        id: "step3",
        title: "Step 3: Implement the Reflection Loop",
        description: "Write the iteration logic that generates, critiques, and refines until quality is sufficient.",
        instruction: "Complete the reflection_agent function. It should: 1) Generate initial solution, 2) Loop up to max_iterations, 3) Get critique, 4) Check if quality is sufficient, 5) Refine if needed.",
        starterCode: `def reflection_agent(task: str, max_iterations: int = 3):
    """Implement the reflection pattern"""
    
    # Step 1: Initial generation
    generator = LLMChain(llm=llm, prompt=generator_prompt)
    solution = generator.run(task=task)
    
    # TODO: Add the iteration loop
    for i in range(max_iterations):
        # Get critique
        
        # Check if quality is sufficient (hint: look for "no major issues")
        
        # Refine the solution
        
        pass
    
    return solution`,
        expectedPatterns: ["critic", "critique", "no major issues", "refiner", "break"],
        hints: [
            "Create a critic chain to evaluate the solution",
            "Check if the critique contains 'no major issues' to break early",
            "Use a refiner chain to improve based on critique"
        ],
        validation: (code: string) => {
            const hasCritic = code.toLowerCase().includes("critic");
            const hasCritique = code.includes("critique");
            const hasBreak = code.includes("break");
            const hasRefine = code.toLowerCase().includes("refin");

            if (!hasCritic) return { valid: false, feedback: "Add a critic chain to evaluate the solution" };
            if (!hasCritique) return { valid: false, feedback: "Store the critique result in a variable" };
            if (!hasBreak) return { valid: false, feedback: "Add a break condition when quality is sufficient" };
            if (!hasRefine) return { valid: false, feedback: "Add refinement logic to improve the solution" };

            return { valid: true, feedback: "Perfect! Your reflection loop implements all the key patterns." };
        }
    },
    {
        id: "step4",
        title: "Step 4: Test Your Agent",
        description: "Run a test to verify your reflection agent works correctly.",
        instruction: "Write a test call that uses your reflection_agent to solve a real problem. Try: 'Write a Python function to validate email addresses'",
        starterCode: `# TODO: Test your reflection agent
# Call reflection_agent with a real task

result = 

# Print the result
print("Final Solution:")
print(result)`,
        expectedPatterns: ["reflection_agent", "(", ")"],
        hints: [
            "Call reflection_agent() with a task string",
            "Try a coding task like email validation",
            "Store the result to see the refined output"
        ],
        validation: (code: string) => {
            const hasCall = code.includes("reflection_agent(");
            const hasTask = code.includes('"') || code.includes("'");
            const hasResult = code.includes("result");

            if (!hasCall) return { valid: false, feedback: "Call the reflection_agent function" };
            if (!hasTask) return { valid: false, feedback: "Pass a task string to the function" };
            if (!hasResult) return { valid: false, feedback: "Store the result to verify it works" };

            return { valid: true, feedback: "Excellent! You've completed the Reflection Pattern lab!" };
        }
    }
];

export function InteractiveLab() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userCode, setUserCode] = useState<string[]>(labSteps.map(s => s.starterCode));
    const [validationResults, setValidationResults] = useState<{ valid: boolean; feedback: string }[]>([]);
    const [showHints, setShowHints] = useState<boolean[]>(labSteps.map(() => false));
    const [copied, setCopied] = useState(false);

    const step = labSteps[currentStep];
    const completedSteps = validationResults.filter(r => r?.valid).length;

    const handleCodeChange = (value: string) => {
        const newCode = [...userCode];
        newCode[currentStep] = value;
        setUserCode(newCode);
    };

    const validateCode = () => {
        const result = step.validation(userCode[currentStep]);
        const newResults = [...validationResults];
        newResults[currentStep] = result;
        setValidationResults(newResults);
    };

    const toggleHints = () => {
        const newHints = [...showHints];
        newHints[currentStep] = !newHints[currentStep];
        setShowHints(newHints);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(userCode[currentStep]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const canProceed = validationResults[currentStep]?.valid;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-muted/30 py-3 sm:py-4 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <Link href="/ai-native/sample-lesson">
                            <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Back to Lesson</span>
                            </Button>
                        </Link>
                        <div className="flex-1 sm:flex-initial">
                            <Badge className="bg-emerald-500/20 text-emerald-500 text-[10px] sm:text-xs mb-0.5">
                                Interactive Lab
                            </Badge>
                            <h1 className="text-base sm:text-xl font-bold leading-tight">Build a Reflection Agent</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <Progress value={(completedSteps / labSteps.length) * 100} className="w-full sm:w-32 h-2 max-w-[120px] sm:max-w-none" />
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                            {completedSteps}/{labSteps.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6 grid lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Step Navigator */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4">Lab Progress</h3>
                        <div className="space-y-2">
                            {labSteps.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setCurrentStep(i)}
                                    disabled={i > 0 && !validationResults[i - 1]?.valid}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                                        currentStep === i ? "bg-primary/10 border border-primary/30" :
                                            validationResults[i]?.valid ? "bg-emerald-500/10" : "hover:bg-muted",
                                        i > 0 && !validationResults[i - 1]?.valid && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                        validationResults[i]?.valid ? "bg-emerald-500 text-white" :
                                            currentStep === i ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        {validationResults[i]?.valid ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                                    </div>
                                    <span className="text-sm flex-1">{s.title.replace(/Step \d+: /, '')}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Hints */}
                    <Card className="p-4">
                        <button
                            onClick={toggleHints}
                            className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            <Lightbulb className="h-4 w-4" />
                            <span className="font-medium text-sm">
                                {showHints[currentStep] ? "Hide Hints" : "Need a Hint?"}
                            </span>
                        </button>
                        {showHints[currentStep] && (
                            <ul className="mt-3 space-y-2">
                                {step.hints.map((hint, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-amber-500">•</span>
                                        {hint}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold">{step.title}</h2>
                        </div>

                        <p className="text-muted-foreground mb-4">{step.description}</p>

                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-6">
                            <div className="flex items-start gap-2">
                                <Code className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-blue-500 mb-1">Your Task</h4>
                                    <p className="text-sm">{step.instruction}</p>
                                </div>
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Python</span>
                                <Button variant="ghost" size="sm" onClick={copyCode}>
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <textarea
                                value={userCode[currentStep]}
                                onChange={(e) => handleCodeChange(e.target.value)}
                                className="w-full h-64 bg-zinc-900 text-emerald-400 font-mono text-sm p-4 rounded-lg border border-border focus:border-primary focus:outline-none resize-none"
                                spellCheck={false}
                            />
                        </div>

                        {/* Validation Result */}
                        {validationResults[currentStep] && (
                            <div className={cn(
                                "mt-4 p-4 rounded-lg border",
                                validationResults[currentStep].valid
                                    ? "bg-emerald-500/10 border-emerald-500/30"
                                    : "bg-red-500/10 border-red-500/30"
                            )}>
                                <div className="flex items-start gap-2">
                                    {validationResults[currentStep].valid ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                    <p className="text-sm">{validationResults[currentStep].feedback}</p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between mt-6">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const newCode = [...userCode];
                                    newCode[currentStep] = step.starterCode;
                                    setUserCode(newCode);
                                    const newResults = [...validationResults];
                                    newResults[currentStep] = undefined as any;
                                    setValidationResults(newResults);
                                }}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset Code
                            </Button>

                            <div className="flex gap-3">
                                <Button onClick={validateCode} variant="secondary">
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Validate Code
                                </Button>

                                {currentStep < labSteps.length - 1 ? (
                                    <Button
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        disabled={!canProceed}
                                    >
                                        Next Step
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Link href="/ai-native">
                                        <Button
                                            className="bg-emerald-500 hover:bg-emerald-600"
                                            disabled={!canProceed}
                                        >
                                            <Rocket className="h-4 w-4 mr-2" />
                                            Complete Lab
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default InteractiveLab;
