"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Play,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowLeft,
    Code,
    Terminal,
    Rocket,
    Lightbulb,
    AlertCircle,
    RefreshCw,
    Copy,
    Check,
    Clock,
    Target,
    BookOpen,
    MessageSquare,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// LAB DATA TYPES
// ============================================

interface TestCase {
    input: string;
    expectedOutput: string;
    description: string;
}

interface LabStage {
    id: string;
    title: string;
    objective: string;
    context: string;
    instructions: string[];
    starterCode: string;
    hints: string[];

    // Validation criteria
    validationCriteria: string[];
    testCases?: TestCase[];

    // Enhanced validation function
    validate: (code: string) => ValidationResult;
}

interface ValidationResult {
    passed: boolean;
    score: number; // 0-100
    feedback: {
        criterion: string;
        passed: boolean;
        message: string;
    }[];
    suggestions?: string[];
}

interface LabConfig {
    id: string;
    title: string;
    subtitle: string;
    difficulty: "guided" | "scaffolded" | "independent" | "challenge";
    estimatedTime: string;
    prerequisites: string[];
    businessContext: string;
    learningObjectives: string[];
    stages: LabStage[];
    reflectionQuestions: string[];
}

// ============================================
// ENHANCED LAB DATA
// ============================================

const reflectionAgentLab: LabConfig = {
    id: "lab-reflection-agent",
    title: "Build a Reflection Agent",
    subtitle: "Implement the Reflection Pattern for Self-Improving AI Systems",
    difficulty: "scaffolded",
    estimatedTime: "60-90 minutes",
    prerequisites: [
        "Understanding of LLM APIs",
        "Basic Python proficiency",
        "Familiarity with prompt engineering"
    ],
    businessContext: "Reflection agents are used in production systems for code generation, content creation, and complex analysis tasks. Companies like Anthropic and OpenAI use similar patterns to improve their models' outputs. This is a foundational skill for building reliable AI systems.",
    learningObjectives: [
        "Implement the reflection design pattern",
        "Build a generator → critic → refiner workflow",
        "Use LangChain for structured LLM interactions",
        "Apply quality evaluation criteria"
    ],
    stages: [
        {
            id: "stage-1",
            title: "Create the Generator Prompt",
            objective: "Build a prompt template that generates initial solutions to problems",
            context: "The generator is the first component of our reflection agent. It takes a task description and produces an initial solution. The quality of this first attempt sets the foundation for the refinement process.",
            instructions: [
                "Define a PromptTemplate with 'task' as an input variable",
                "Include clear instructions for generating a thorough solution",
                "Ask the model to consider edge cases in its response",
                "Keep the prompt focused but comprehensive"
            ],
            starterCode: `from langchain import PromptTemplate

# TODO: Create a generator prompt template
# This prompt should:
# 1. Take a 'task' variable as input
# 2. Instruct the LLM to generate a complete solution
# 3. Ask it to consider edge cases

generator_prompt = PromptTemplate(
    input_variables=["task"],
    template="""
    
    """
)`,
            hints: [
                "Start with a role: 'You are an expert software engineer...'",
                "Explicitly mention the {task} variable in the template",
                "Ask for consideration of edge cases",
                "Request structured output with clear sections"
            ],
            validationCriteria: [
                "Template includes {task} variable",
                "Prompt asks for solution generation",
                "Edge cases are mentioned",
                "Instructions are clear and specific"
            ],
            validate: (code: string): ValidationResult => {
                const feedback: ValidationResult["feedback"] = [];
                let score = 0;

                // Check for task variable
                const hasTask = code.includes("{task}");
                feedback.push({
                    criterion: "Template includes {task} variable",
                    passed: hasTask,
                    message: hasTask
                        ? "✓ Task variable properly included"
                        : "Missing {task} variable - the template needs to reference the input"
                });
                if (hasTask) score += 25;

                // Check for solution/generate keywords
                const asksForSolution = /generat|solut|creat|implement/i.test(code);
                feedback.push({
                    criterion: "Prompt asks for solution generation",
                    passed: asksForSolution,
                    message: asksForSolution
                        ? "✓ Clear instruction to generate a solution"
                        : "Add explicit instructions to generate/create a solution"
                });
                if (asksForSolution) score += 25;

                // Check for edge cases
                const mentionsEdgeCases = /edge.?case|corner.?case|boundar/i.test(code);
                feedback.push({
                    criterion: "Edge cases are mentioned",
                    passed: mentionsEdgeCases,
                    message: mentionsEdgeCases
                        ? "✓ Edge case consideration included"
                        : "Add instructions to consider edge cases and boundary conditions"
                });
                if (mentionsEdgeCases) score += 25;

                // Check for sufficient length (indicates thoroughness)
                const isDetailed = code.length > 200;
                feedback.push({
                    criterion: "Instructions are clear and specific",
                    passed: isDetailed,
                    message: isDetailed
                        ? "✓ Prompt has sufficient detail"
                        : "The prompt seems too brief - add more specific instructions"
                });
                if (isDetailed) score += 25;

                return {
                    passed: score >= 75,
                    score,
                    feedback,
                    suggestions: score < 100 ? [
                        "Consider adding a role/persona for the LLM",
                        "Specify the output format you expect",
                        "Ask for step-by-step reasoning"
                    ] : undefined
                };
            }
        },
        {
            id: "stage-2",
            title: "Build the Critic Prompt",
            objective: "Create a prompt that evaluates and critiques generated solutions",
            context: "The critic is the heart of the reflection pattern. It identifies issues in the solution and provides actionable feedback. A good critic is specific, constructive, and thorough.",
            instructions: [
                "Create a PromptTemplate with 'task' and 'solution' variables",
                "Include specific evaluation categories (correctness, completeness, etc.)",
                "Ask for numbered, actionable feedback",
                "Request that the critic identify if the solution is 'good enough'"
            ],
            starterCode: `# TODO: Create a critic prompt template
# This prompt should evaluate a solution against the original task
# Include categories: Correctness, Completeness, Edge Cases, Improvements

critic_prompt = PromptTemplate(
    input_variables=["task", "solution"],
    template="""Review this solution for the task: {task}

Solution: {solution}

Evaluate the solution on these criteria:

"""
)`,
            hints: [
                "Number your feedback categories for clarity",
                "Include a section for 'major issues' vs 'minor suggestions'",
                "Ask the critic to state if the solution is acceptable",
                "Request specific, actionable improvements"
            ],
            validationCriteria: [
                "Includes both {task} and {solution} variables",
                "Has multiple evaluation categories",
                "Asks for actionable improvements",
                "Provides structure for the critique"
            ],
            validate: (code: string): ValidationResult => {
                const feedback: ValidationResult["feedback"] = [];
                let score = 0;

                // Check for both variables
                const hasTask = code.includes("{task}");
                const hasSolution = code.includes("{solution}");
                feedback.push({
                    criterion: "Includes both {task} and {solution} variables",
                    passed: hasTask && hasSolution,
                    message: hasTask && hasSolution
                        ? "✓ Both input variables included"
                        : `Missing: ${!hasTask ? "{task}" : ""} ${!hasSolution ? "{solution}" : ""}`
                });
                if (hasTask && hasSolution) score += 25;

                // Check for evaluation categories
                const categories = ["correct", "complet", "edge", "improv"].filter(
                    cat => code.toLowerCase().includes(cat)
                );
                const hasCategories = categories.length >= 2;
                feedback.push({
                    criterion: "Has multiple evaluation categories",
                    passed: hasCategories,
                    message: hasCategories
                        ? `✓ Found categories: ${categories.join(", ")}`
                        : "Add evaluation categories like Correctness, Completeness, Edge Cases"
                });
                if (hasCategories) score += 25;

                // Check for actionable feedback request
                const asksForAction = /action|specific|suggest|improv|recomm|fix/i.test(code);
                feedback.push({
                    criterion: "Asks for actionable improvements",
                    passed: asksForAction,
                    message: asksForAction
                        ? "✓ Requests actionable feedback"
                        : "Ask the critic to provide specific, actionable suggestions"
                });
                if (asksForAction) score += 25;

                // Check for structure
                const hasStructure = /^\s*\d+[.)]|\n-\s+|\n\*/m.test(code) ||
                    code.includes("Evaluate") ||
                    code.includes("Review");
                feedback.push({
                    criterion: "Provides structure for the critique",
                    passed: hasStructure,
                    message: hasStructure
                        ? "✓ Well-structured critique format"
                        : "Add structure with numbered sections or clear headings"
                });
                if (hasStructure) score += 25;

                return {
                    passed: score >= 75,
                    score,
                    feedback
                };
            }
        },
        {
            id: "stage-3",
            title: "Implement the Reflection Loop",
            objective: "Write the core logic that iteratively improves solutions",
            context: "The reflection loop ties everything together. It generates an initial solution, gets critique, checks if quality is sufficient, and refines if needed. The key is knowing when to stop iterating.",
            instructions: [
                "Create a function that takes 'task' and 'max_iterations' parameters",
                "Generate initial solution using the generator prompt",
                "Loop up to max_iterations times",
                "Get critique and check if it indicates the solution is good enough",
                "Refine the solution based on critique",
                "Return the final solution"
            ],
            starterCode: `def reflection_agent(task: str, max_iterations: int = 3) -> str:
    """
    Implement a reflection agent that iteratively improves solutions.
    
    Args:
        task: The problem to solve
        max_iterations: Maximum refinement iterations
        
    Returns:
        The final, refined solution
    """
    # Step 1: Generate initial solution
    generator = LLMChain(llm=llm, prompt=generator_prompt)
    solution = generator.run(task=task)
    
    # Step 2: Iterative refinement
    for i in range(max_iterations):
        # Get critique of current solution
        
        # Check if solution is good enough (look for "no major issues")
        
        # If not good enough, refine the solution
        
        pass
    
    return solution`,
            hints: [
                "Create a critic chain similar to the generator",
                "Store the critique result and check for quality indicators",
                "Use 'break' to exit early when the solution is good",
                "You'll need a refiner prompt that takes task, solution, and critique"
            ],
            validationCriteria: [
                "Creates and uses a critic chain",
                "Implements proper loop with early exit",
                "Includes refinement logic",
                "Returns the final solution"
            ],
            validate: (code: string): ValidationResult => {
                const feedback: ValidationResult["feedback"] = [];
                let score = 0;

                // Check for critic usage
                const usesCritic = /critic|LLMChain.*critic|critique/i.test(code);
                feedback.push({
                    criterion: "Creates and uses a critic chain",
                    passed: usesCritic,
                    message: usesCritic
                        ? "✓ Critic chain implemented"
                        : "Add a critic chain to evaluate the solution"
                });
                if (usesCritic) score += 25;

                // Check for loop with break
                const hasBreak = code.includes("break");
                const hasCondition = /(if|while).*("no|good|accept|sufficient)/i.test(code) ||
                    /if.*break/i.test(code);
                feedback.push({
                    criterion: "Implements proper loop with early exit",
                    passed: hasBreak,
                    message: hasBreak
                        ? "✓ Early exit condition present"
                        : "Add a 'break' statement when the solution is good enough"
                });
                if (hasBreak) score += 25;

                // Check for refinement
                const hasRefinement = /refin|improv|updat|regenerat/i.test(code) &&
                    !/pass\s*$/.test(code);
                feedback.push({
                    criterion: "Includes refinement logic",
                    passed: hasRefinement,
                    message: hasRefinement
                        ? "✓ Refinement step implemented"
                        : "Add logic to refine the solution based on critique"
                });
                if (hasRefinement) score += 25;

                // Check for return
                const hasReturn = /return\s+solution/i.test(code);
                feedback.push({
                    criterion: "Returns the final solution",
                    passed: hasReturn,
                    message: hasReturn
                        ? "✓ Returns solution correctly"
                        : "Ensure you return the solution variable"
                });
                if (hasReturn) score += 25;

                return {
                    passed: score >= 75,
                    score,
                    feedback,
                    suggestions: score < 100 ? [
                        "Consider logging each iteration for debugging",
                        "Add a counter to track how many iterations were needed",
                        "Handle the case where max_iterations is reached"
                    ] : undefined
                };
            }
        },
        {
            id: "stage-4",
            title: "Test and Validate Your Agent",
            objective: "Run your reflection agent and verify it works correctly",
            context: "Testing is crucial for production AI systems. You need to verify that your agent produces quality outputs and stops appropriately. We'll also discuss evaluation strategies.",
            instructions: [
                "Call your reflection_agent with a real coding task",
                "Try a task like: 'Write a Python function to validate email addresses'",
                "Print the final solution",
                "Observe how many iterations were needed",
                "Consider edge cases in the output"
            ],
            starterCode: `# Test your reflection agent with a real task

# Define a challenging task
task = "Write a Python function to validate email addresses. It should handle common edge cases and return a boolean."

# Run the reflection agent
print("Starting reflection agent...")
result = reflection_agent(task, max_iterations=3)

# Display the result
print("\\n" + "="*50)
print("FINAL SOLUTION:")
print("="*50)
print(result)

# TODO: Add some validation - does the solution actually work?
`,
            hints: [
                "Try running the generated code to see if it works",
                "Consider testing with valid and invalid emails",
                "Observe the quality improvement across iterations",
                "Think about automated testing strategies"
            ],
            validationCriteria: [
                "Calls reflection_agent with a task",
                "Uses appropriate max_iterations",
                "Prints or displays the result",
                "Includes meaningful test task"
            ],
            validate: (code: string): ValidationResult => {
                const feedback: ValidationResult["feedback"] = [];
                let score = 0;

                // Check for agent call
                const callsAgent = /reflection_agent\s*\(/i.test(code);
                feedback.push({
                    criterion: "Calls reflection_agent with a task",
                    passed: callsAgent,
                    message: callsAgent
                        ? "✓ Agent function called"
                        : "Call the reflection_agent() function with a task"
                });
                if (callsAgent) score += 25;

                // Check for iterations parameter
                const hasIterations = /max_iterations\s*=\s*\d+/i.test(code);
                feedback.push({
                    criterion: "Uses appropriate max_iterations",
                    passed: hasIterations,
                    message: hasIterations
                        ? "✓ Max iterations specified"
                        : "Consider specifying max_iterations parameter"
                });
                if (hasIterations) score += 25;

                // Check for output
                const printsResult = /print.*result|print.*solution|result/i.test(code);
                feedback.push({
                    criterion: "Prints or displays the result",
                    passed: printsResult,
                    message: printsResult
                        ? "✓ Result is displayed"
                        : "Add print statements to see the output"
                });
                if (printsResult) score += 25;

                // Check for meaningful task
                const hasTask = /["'].*[A-Z].*["']/i.test(code) && code.length > 100;
                feedback.push({
                    criterion: "Includes meaningful test task",
                    passed: hasTask,
                    message: hasTask
                        ? "✓ Real task provided for testing"
                        : "Provide a meaningful task string to test"
                });
                if (hasTask) score += 25;

                return {
                    passed: score >= 75,
                    score,
                    feedback
                };
            }
        }
    ],
    reflectionQuestions: [
        "What determines when the reflection loop should stop? How might you improve this?",
        "How would you handle cases where the solution never becomes 'good enough'?",
        "What are the cost implications of multiple LLM calls? How might you optimize?",
        "How could you adapt this pattern for a different use case (e.g., essay writing, data analysis)?",
        "What observability would you add for production deployment?"
    ]
};

// ============================================
// MAIN COMPONENT
// ============================================

export function MeaningfulLab() {
    const lab = reflectionAgentLab;

    const [currentStage, setCurrentStage] = useState(0);
    const [userCode, setUserCode] = useState<string[]>(lab.stages.map(s => s.starterCode));
    const [validationResults, setValidationResults] = useState<(ValidationResult | null)[]>(
        lab.stages.map(() => null)
    );
    const [showHints, setShowHints] = useState<boolean[]>(lab.stages.map(() => false));
    const [showReflection, setShowReflection] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const stage = lab.stages[currentStage];
    const completedStages = validationResults.filter(r => r?.passed).length;
    const isLabComplete = completedStages === lab.stages.length;

    const handleCodeChange = (value: string) => {
        const newCode = [...userCode];
        newCode[currentStage] = value;
        setUserCode(newCode);
        // Clear validation when code changes
        const newResults = [...validationResults];
        newResults[currentStage] = null;
        setValidationResults(newResults);
    };

    const validateCode = async () => {
        setIsValidating(true);
        // Simulate async validation (in real implementation, could call backend)
        await new Promise(resolve => setTimeout(resolve, 500));

        const result = stage.validate(userCode[currentStage]);
        const newResults = [...validationResults];
        newResults[currentStage] = result;
        setValidationResults(newResults);
        setIsValidating(false);
    };

    const toggleHints = () => {
        const newHints = [...showHints];
        newHints[currentStage] = !newHints[currentStage];
        setShowHints(newHints);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(userCode[currentStage]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const canProceed = validationResults[currentStage]?.passed;
    const currentResult = validationResults[currentStage];

    const difficultyColors = {
        guided: "bg-emerald-500/20 text-emerald-500",
        scaffolded: "bg-blue-500/20 text-blue-500",
        independent: "bg-amber-500/20 text-amber-500",
        challenge: "bg-red-500/20 text-red-500"
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-muted/30 py-4 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Link href="/training/module-3">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Module
                                </Button>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge className={difficultyColors[lab.difficulty]}>
                                        {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)} Lab
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {lab.estimatedTime}
                                    </Badge>
                                </div>
                                <h1 className="text-xl font-bold">{lab.title}</h1>
                                <p className="text-sm text-muted-foreground">{lab.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium">Progress</p>
                                <p className="text-2xl font-bold">{completedStages}/{lab.stages.length}</p>
                            </div>
                            <Progress
                                value={(completedStages / lab.stages.length) * 100}
                                className="w-32 h-3"
                            />
                        </div>
                    </div>

                    {/* Learning Objectives */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Objectives:</span>
                        </div>
                        {lab.learningObjectives.map((obj, i) => (
                            <span key={i} className="text-muted-foreground">{obj}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-6 grid lg:grid-cols-4 gap-8">
                {/* Stage Navigator */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4">Lab Stages</h3>
                        <div className="space-y-2">
                            {lab.stages.map((s, i) => {
                                const result = validationResults[i];
                                const isComplete = result?.passed;
                                const isFailed = result && !result.passed;
                                const isCurrent = currentStage === i;
                                const isLocked = i > 0 && !validationResults[i - 1]?.passed;
                                const score = result?.score || 0;

                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => !isLocked && setCurrentStage(i)}
                                        disabled={isLocked}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all relative",
                                            isCurrent && "bg-primary/10 border border-primary/30",
                                            isComplete && !isCurrent && "bg-emerald-500/10",
                                            isFailed && !isCurrent && "bg-amber-500/10",
                                            isLocked && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                                            isComplete ? "bg-emerald-500 text-white" :
                                                isFailed ? "bg-amber-500 text-white" :
                                                    isCurrent ? "bg-primary text-primary-foreground" :
                                                        "bg-muted"
                                        )}>
                                            {isComplete ? <CheckCircle2 className="h-4 w-4" /> :
                                                isFailed ? <AlertCircle className="h-4 w-4" /> :
                                                    i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm font-medium block truncate">
                                                {s.title}
                                            </span>
                                            {result && (
                                                <span className={cn(
                                                    "text-xs",
                                                    isComplete ? "text-emerald-500" : "text-amber-500"
                                                )}>
                                                    {score}% complete
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Context */}
                    <Card className="p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Business Context
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {lab.businessContext}
                        </p>
                    </Card>

                    {/* Hints */}
                    <Card className="p-4">
                        <button
                            onClick={toggleHints}
                            className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors w-full"
                        >
                            <Lightbulb className="h-4 w-4" />
                            <span className="font-medium text-sm">
                                {showHints[currentStage] ? "Hide Hints" : "Need Help?"}
                            </span>
                        </button>
                        {showHints[currentStage] && (
                            <ul className="mt-3 space-y-2">
                                {stage.hints.map((hint, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-amber-500 shrink-0">•</span>
                                        {hint}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Stage Header */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Terminal className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">{stage.title}</h2>
                                    <p className="text-sm text-muted-foreground">{stage.objective}</p>
                                </div>
                            </div>
                            <Badge variant="outline">Stage {currentStage + 1} of {lab.stages.length}</Badge>
                        </div>

                        {/* Context */}
                        <div className="p-4 rounded-lg bg-muted/50 mb-6">
                            <p className="text-sm">{stage.context}</p>
                        </div>

                        {/* Instructions */}
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-6">
                            <div className="flex items-start gap-2">
                                <Code className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-medium text-blue-500 mb-2">Your Task</h4>
                                    <ol className="space-y-1">
                                        {stage.instructions.map((instruction, i) => (
                                            <li key={i} className="text-sm flex items-start gap-2">
                                                <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                                                {instruction}
                                            </li>
                                        ))}
                                    </ol>
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
                                value={userCode[currentStage]}
                                onChange={(e) => handleCodeChange(e.target.value)}
                                className="w-full h-80 bg-zinc-900 text-emerald-400 font-mono text-sm p-4 rounded-lg border border-border focus:border-primary focus:outline-none resize-none"
                                spellCheck={false}
                            />
                        </div>

                        {/* Validation Result */}
                        {currentResult && (
                            <div className={cn(
                                "mt-4 p-4 rounded-lg border",
                                currentResult.passed
                                    ? "bg-emerald-500/10 border-emerald-500/30"
                                    : "bg-amber-500/10 border-amber-500/30"
                            )}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {currentResult.passed ? (
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 text-amber-500" />
                                        )}
                                        <span className="font-medium">
                                            {currentResult.passed ? "Stage Complete!" : "Almost There..."}
                                        </span>
                                    </div>
                                    <Badge variant="outline">
                                        Score: {currentResult.score}%
                                    </Badge>
                                </div>

                                {/* Detailed feedback */}
                                <div className="space-y-2">
                                    {currentResult.feedback.map((fb, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm">
                                            {fb.passed ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                            )}
                                            <span>{fb.message}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Suggestions */}
                                {currentResult.suggestions && currentResult.suggestions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-border">
                                        <p className="text-sm font-medium mb-2">Suggestions for improvement:</p>
                                        <ul className="space-y-1">
                                            {currentResult.suggestions.map((sug, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary">→</span>
                                                    {sug}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between mt-6">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const newCode = [...userCode];
                                    newCode[currentStage] = stage.starterCode;
                                    setUserCode(newCode);
                                    const newResults = [...validationResults];
                                    newResults[currentStage] = null;
                                    setValidationResults(newResults);
                                }}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset Code
                            </Button>

                            <div className="flex gap-3">
                                <Button onClick={validateCode} variant="secondary" disabled={isValidating}>
                                    {isValidating ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                    )}
                                    Validate Code
                                </Button>

                                {currentStage < lab.stages.length - 1 ? (
                                    <Button
                                        onClick={() => setCurrentStage(currentStage + 1)}
                                        disabled={!canProceed}
                                    >
                                        Next Stage
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setShowReflection(true)}
                                        disabled={!canProceed}
                                        className="bg-emerald-500 hover:bg-emerald-600"
                                    >
                                        <Rocket className="h-4 w-4 mr-2" />
                                        Complete Lab
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Reflection Section */}
                    {showReflection && isLabComplete && (
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">Reflection</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Take a moment to reflect on what you learned. Consider these questions:
                            </p>
                            <div className="space-y-3">
                                {lab.reflectionQuestions.map((q, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm">{i + 1}. {q}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Link href="/training/module-3">
                                    <Button>
                                        Return to Module
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MeaningfulLab;
