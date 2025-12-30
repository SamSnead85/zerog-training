"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, Copy, Check, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface CodeExercise {
    id: string;
    title: string;
    description: string;
    language: "python" | "javascript" | "typescript" | "json";
    starterCode: string;
    solution?: string;
    expectedOutput?: string;
    hint?: string;
    testCases?: {
        input: string;
        expectedOutput: string;
        description: string;
    }[];
}

export interface CodeEditorProps {
    exercise: CodeExercise;
    onComplete?: (success: boolean) => void;
    height?: string;
}

// =============================================================================
// SYNTAX HIGHLIGHTING (LIGHTWEIGHT)
// =============================================================================

const highlightCode = (code: string, language: string): string => {
    // Simple syntax highlighting for display
    // In production, use a library like Prism or Monaco
    const keywords = {
        python: ["def", "class", "import", "from", "return", "if", "else", "elif", "for", "while", "in", "not", "and", "or", "True", "False", "None", "try", "except", "with", "as", "async", "await"],
        javascript: ["function", "const", "let", "var", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "true", "false", "null", "undefined"],
        typescript: ["function", "const", "let", "var", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "true", "false", "null", "undefined", "interface", "type", "extends", "implements"],
        json: [],
    };

    let highlighted = code;

    // Highlight strings
    highlighted = highlighted.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="text-emerald-400">$&</span>');

    // Highlight comments
    highlighted = highlighted.replace(/(#.*$|\/\/.*$)/gm, '<span class="text-white/30">$&</span>');

    // Highlight keywords
    const langKeywords = keywords[language as keyof typeof keywords] || [];
    langKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>');
    });

    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>');

    // Highlight function calls
    highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="text-blue-400">$1</span>(');

    return highlighted;
};

// =============================================================================
// CODE EDITOR COMPONENT
// =============================================================================

export function CodeEditor({ exercise, onComplete, height = "300px" }: CodeEditorProps) {
    const [code, setCode] = useState(exercise.starterCode);
    const [output, setOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Language icons
    const languageConfig = {
        python: { icon: "🐍", name: "Python" },
        javascript: { icon: "JS", name: "JavaScript" },
        typescript: { icon: "TS", name: "TypeScript" },
        json: { icon: "{}", name: "JSON" },
    };

    const langInfo = languageConfig[exercise.language];

    // Handle code change
    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        setIsCorrect(null);
    };

    // Copy code
    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Run code (simulated)
    const handleRun = async () => {
        setIsRunning(true);
        setOutput("");

        // Simulate execution delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simple simulation of output
        // In production, this would send to a sandboxed execution environment
        try {
            let simulatedOutput = "";

            if (exercise.language === "python") {
                // Check for print statements
                const printMatches = code.match(/print\s*\((.*?)\)/g);
                if (printMatches) {
                    simulatedOutput = printMatches
                        .map(match => {
                            const content = match.replace(/print\s*\(/, '').replace(/\)$/, '');
                            // Remove quotes for string literals
                            return content.replace(/^["']|["']$/g, '');
                        })
                        .join('\n');
                }
            } else if (exercise.language === "javascript" || exercise.language === "typescript") {
                // Check for console.log statements
                const logMatches = code.match(/console\.log\s*\((.*?)\)/g);
                if (logMatches) {
                    simulatedOutput = logMatches
                        .map(match => {
                            const content = match.replace(/console\.log\s*\(/, '').replace(/\)$/, '');
                            return content.replace(/^["'`]|["'`]$/g, '');
                        })
                        .join('\n');
                }
            } else if (exercise.language === "json") {
                // Validate JSON
                JSON.parse(code);
                simulatedOutput = "✓ Valid JSON";
            }

            setOutput(simulatedOutput || "Code executed successfully (no output)");

            // Check against expected output
            if (exercise.expectedOutput) {
                const correct = simulatedOutput.trim() === exercise.expectedOutput.trim();
                setIsCorrect(correct);
                if (correct) {
                    onComplete?.(true);
                }
            }
        } catch (error) {
            setOutput(`Error: ${(error as Error).message}`);
            setIsCorrect(false);
        }

        setIsRunning(false);
    };

    // Reset to starter code
    const handleReset = () => {
        setCode(exercise.starterCode);
        setOutput("");
        setIsCorrect(null);
        setShowSolution(false);
    };

    // Show solution
    const handleShowSolution = () => {
        if (exercise.solution) {
            setCode(exercise.solution);
            setShowSolution(true);
        }
    };

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-white/60" />
                    <span className="font-medium">{exercise.title}</span>
                    <span className="px-2 py-0.5 text-xs bg-white/10 rounded-full">
                        {langInfo.icon} {langInfo.name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                        title="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                        title="Reset code"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className="px-4 py-3 border-b border-white/10 bg-blue-500/5">
                <p className="text-sm text-white/70">{exercise.description}</p>
                {exercise.hint && (
                    <p className="text-xs text-yellow-400/70 mt-2">💡 Hint: {exercise.hint}</p>
                )}
            </div>

            {/* Code Area */}
            <div className="relative" style={{ height }}>
                {/* Line numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-white/[0.02] border-r border-white/10 flex flex-col text-xs text-white/20 pt-3 select-none font-mono">
                    {code.split('\n').map((_, i) => (
                        <div key={i} className="px-2 h-5 leading-5 text-right">{i + 1}</div>
                    ))}
                </div>

                {/* Textarea (editable) */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    spellCheck={false}
                    className="absolute inset-0 w-full h-full bg-transparent text-white font-mono text-sm p-3 pl-12 resize-none focus:outline-none leading-5"
                    style={{ caretColor: 'white' }}
                />
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    {exercise.solution && !showSolution && (
                        <button
                            onClick={handleShowSolution}
                            className="text-xs text-white/40 hover:text-white/60 transition-colors"
                        >
                            Show solution
                        </button>
                    )}
                    {showSolution && (
                        <span className="text-xs text-yellow-400">Viewing solution</span>
                    )}
                </div>
                <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className={cn(
                        "px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2",
                        isRunning
                            ? "bg-white/10 text-white/40"
                            : "bg-emerald-500 text-white hover:bg-emerald-400"
                    )}
                >
                    <Play className={cn("h-4 w-4", isRunning && "animate-pulse")} />
                    {isRunning ? "Running..." : "Run Code"}
                </button>
            </div>

            {/* Output */}
            {output && (
                <div className={cn(
                    "border-t",
                    isCorrect === true ? "border-emerald-500/30 bg-emerald-500/5" :
                        isCorrect === false ? "border-red-500/30 bg-red-500/5" :
                            "border-white/10 bg-black/30"
                )}>
                    <div className="px-4 py-2 flex items-center gap-2 border-b border-white/10">
                        <Terminal className="h-4 w-4 text-white/60" />
                        <span className="text-xs text-white/60">Output</span>
                        {isCorrect === true && (
                            <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                                <CheckCircle2 className="h-4 w-4" />
                                Correct!
                            </span>
                        )}
                        {isCorrect === false && (
                            <span className="ml-auto flex items-center gap-1 text-xs text-red-400">
                                <XCircle className="h-4 w-4" />
                                Try again
                            </span>
                        )}
                    </div>
                    <pre className="p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                        {output}
                    </pre>
                    {isCorrect === false && exercise.expectedOutput && (
                        <div className="px-4 pb-4">
                            <p className="text-xs text-white/40 mb-1">Expected output:</p>
                            <pre className="text-xs font-mono text-white/60">{exercise.expectedOutput}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// =============================================================================
// SAMPLE EXERCISES
// =============================================================================

export const sampleCodeExercise: CodeExercise = {
    id: "ex1",
    title: "Your First Prompt",
    description: "Complete the code to create a simple prompt that asks the AI to explain a concept.",
    language: "python",
    starterCode: `# Define a prompt for explaining AI concepts
prompt = "Explain what ___ is in simple terms"

# Replace ___ with "machine learning"
# Then print the prompt

print(prompt)`,
    solution: `# Define a prompt for explaining AI concepts
prompt = "Explain what machine learning is in simple terms"

# Replace ___ with "machine learning"
# Then print the prompt

print(prompt)`,
    expectedOutput: "Explain what machine learning is in simple terms",
    hint: "Replace the ___ placeholder with 'machine learning'",
};
