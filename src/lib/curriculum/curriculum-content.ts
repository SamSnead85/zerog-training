// Deep Lesson Content System
// Comprehensive lesson content with conceptual explanations, worked examples,
// concept checks, and structured learning paths

// ============================================
// LESSON CONTENT TYPES
// ============================================

export interface ConceptExplanation {
    id: string;
    title: string;
    // Multi-paragraph explanation in markdown
    content: string;
    // Visual aids
    diagrams?: {
        type: "mermaid" | "image";
        content: string;
        caption: string;
    }[];
    // Key points to remember
    keyPoints: string[];
    // Common misconceptions
    avoidThese: string[];
    // Real-world applications
    realWorldExamples: string[];
}

export interface WorkedExample {
    id: string;
    title: string;
    scenario: string;
    // Step-by-step expert thinking
    steps: {
        step: number;
        title: string;
        thinking: string;  // Expert's thought process
        action: string;    // What we did
        result?: string;   // What we got
    }[];
    finalSolution: string;
    pitfallsAvoided: string[];
    alternativeApproaches?: string[];
}

export interface ConceptCheck {
    id: string;
    question: string;
    // Different question types
    type: "multiple-choice" | "code-completion" | "short-answer" | "ordering" | "matching";

    // For multiple choice
    options?: string[];
    correctIndex?: number;

    // For code completion
    starterCode?: string;
    solutionCode?: string;
    validationHints?: string[];

    // For ordering
    itemsToOrder?: string[];
    correctOrder?: number[];

    // For matching
    leftItems?: string[];
    rightItems?: string[];
    correctMatches?: number[];

    explanation: string;
    difficulty: "recall" | "apply" | "analyze" | "create";
    relatedObjectiveId: string;
}

export interface PracticeExercise {
    id: string;
    title: string;
    difficulty: "guided" | "scaffolded" | "independent";
    scenario: string;
    businessContext: string;

    // Step-by-step for guided exercises
    steps?: {
        instruction: string;
        hint: string;
        expectedOutput: string;
    }[];

    // Requirements for independent exercises
    requirements?: string[];

    starterCode?: string;
    solutionApproach: string;

    // Evaluation
    successCriteria: string[];
    commonMistakes: string[];
}

export interface Lesson {
    id: string;
    moduleId: string;
    number: number;
    title: string;
    duration: string;

    // Learning objective reference
    objectiveIds: string[];

    // Content structure
    conceptExplanations: ConceptExplanation[];
    workedExamples: WorkedExample[];
    conceptChecks: ConceptCheck[];
    practiceExercises: PracticeExercise[];

    // Summary
    summary: string;
    keyTerms: { term: string; definition: string }[];
    nextSteps: string;
}

// ============================================
// MODULE 1 LESSONS
// ============================================

export const module1Lessons: Lesson[] = [
    {
        id: "lesson-1-1",
        moduleId: "module-1",
        number: 1,
        title: "Understanding Large Language Models",
        duration: "45 minutes",
        objectiveIds: ["1-1", "1-2"],

        conceptExplanations: [
            {
                id: "ce-1-1-1",
                title: "What is a Large Language Model?",
                content: `
A Large Language Model (LLM) is a type of artificial intelligence that has been trained on vast amounts of text data to understand and generate human-like text. But what does this actually mean for developers?

**The Core Insight**: LLMs predict the next most likely token (word or word piece) based on the context provided. This simple principle powers everything from chatbots to code generation.

**Why "Large" Matters**: 
- GPT-3 has 175 billion parameters
- GPT-4 is estimated at 1.7 trillion parameters
- These parameters are numerical weights learned during training that encode patterns in language

**How Training Works**:
1. **Pre-training**: The model reads billions of documents from the internet, learning grammar, facts, and reasoning patterns
2. **Fine-tuning**: The model is specialized for specific tasks like following instructions
3. **RLHF (Reinforcement Learning from Human Feedback)**: Human raters help teach the model which responses are helpful, safe, and accurate
                `,
                keyPoints: [
                    "LLMs predict tokens, they don't 'understand' in the human sense",
                    "More parameters generally means more capability, but also more cost",
                    "Training data cutoff means LLMs don't know about recent events",
                    "RLHF is what makes models helpful and aligned with human preferences"
                ],
                avoidThese: [
                    "Thinking LLMs have 'knowledge' like a database - they have probabilistic patterns",
                    "Assuming larger is always better - smaller models may be more cost-effective",
                    "Expecting LLMs to be deterministic - same input can produce different outputs"
                ],
                realWorldExamples: [
                    "GitHub Copilot predicts the next lines of code based on your file context",
                    "ChatGPT continues your conversation by predicting helpful responses",
                    "Translation services predict the target language tokens from source text"
                ],
                diagrams: [
                    {
                        type: "mermaid",
                        content: `
graph LR
    A[Input Text] --> B[Tokenizer]
    B --> C[Embeddings]
    C --> D[Transformer Layers]
    D --> E[Probability Distribution]
    E --> F[Next Token]
    F --> G[Output Text]
                        `,
                        caption: "How an LLM processes text: from input to predicted output"
                    }
                ]
            },
            {
                id: "ce-1-1-2",
                title: "The Transformer Architecture",
                content: `
The transformer architecture, introduced in the 2017 paper "Attention Is All You Need," is the foundation of all modern LLMs. Understanding it helps you write better prompts and debug unexpected behavior.

**The Key Innovation: Self-Attention**

Self-attention allows the model to look at all words in the input simultaneously and determine which words are most relevant to each other. This solves the problem of RNNs (Recurrent Neural Networks) which processed text sequentially and struggled with long documents.

**Context Windows**

The context window is the maximum number of tokens the model can "see" at once. This is a critical constraint:
- GPT-3.5: 4,096 tokens (~3,000 words)
- GPT-4: 8,192 or 128,000 tokens
- Claude 3.5: 200,000 tokens

**Why This Matters for Developers**:
- Long conversations get truncated, losing early context
- Large codebases may need to be chunked
- Strategic prompt design can maximize useful context
                `,
                keyPoints: [
                    "Self-attention enables parallel processing of entire sequences",
                    "Context window is a hard limit - plan for it",
                    "Tokens ≠ words: 'tokenization' might be 3 tokens",
                    "Position in context matters - models pay more attention to recent tokens"
                ],
                avoidThese: [
                    "Ignoring context limits - your prompt will be silently truncated",
                    "Putting important instructions at the end of very long prompts",
                    "Assuming all models have the same context window"
                ],
                realWorldExamples: [
                    "Document Q&A systems chunk documents to fit context windows",
                    "Code assistants use strategic file selection to stay within limits",
                    "RAG systems retrieve only relevant chunks to maximize useful context"
                ]
            }
        ],

        workedExamples: [
            {
                id: "we-1-1-1",
                title: "Estimating Token Count for a Prompt",
                scenario: "You're building a code review tool that analyzes entire files. You need to determine if a 500-line Python file will fit in GPT-4's context window.",
                steps: [
                    {
                        step: 1,
                        title: "Understand the constraint",
                        thinking: "GPT-4's standard context is 8,192 tokens. I need to reserve tokens for: my system prompt, the code, and the expected response.",
                        action: "Define token budget: 8,192 - 500 (system prompt) - 2,000 (response) = 5,692 tokens for code"
                    },
                    {
                        step: 2,
                        title: "Estimate tokens per line",
                        thinking: "A rule of thumb is 4 characters = 1 token for English text. Python code is often more token-dense due to short variable names.",
                        action: "Estimate: average Python line is ~40 characters = ~10 tokens per line"
                    },
                    {
                        step: 3,
                        title: "Calculate",
                        thinking: "500 lines × 10 tokens = 5,000 tokens. This is under our 5,692 budget. Should be safe.",
                        action: "Verify with OpenAI's tiktoken library for precise count"
                    },
                    {
                        step: 4,
                        title: "Verify with code",
                        thinking: "Never trust estimates for production - always measure",
                        action: "Use tiktoken to get exact count",
                        result: "Actual count: 4,872 tokens. We have margin."
                    }
                ],
                finalSolution: `
import tiktoken

def count_tokens(text: str, model: str = "gpt-4") -> int:
    """Count tokens using the appropriate tokenizer."""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

# Usage
with open("code.py") as f:
    code = f.read()

token_count = count_tokens(code)
print(f"Token count: {token_count}")

# Check if it fits
CONTEXT_LIMIT = 8192
RESERVED_FOR_PROMPT = 500
RESERVED_FOR_RESPONSE = 2000

available = CONTEXT_LIMIT - RESERVED_FOR_PROMPT - RESERVED_FOR_RESPONSE
if token_count <= available:
    print(f"✓ Fits with {available - token_count} tokens to spare")
else:
    print(f"✗ Over by {token_count - available} tokens - need chunking")
                `,
                pitfallsAvoided: [
                    "Didn't rely on character count alone",
                    "Reserved tokens for response, not just input",
                    "Used actual tokenizer instead of estimates"
                ],
                alternativeApproaches: [
                    "For very large files, implement sliding window chunking",
                    "Use Claude with 200K context for larger documents"
                ]
            }
        ],

        conceptChecks: [
            {
                id: "cc-1-1-1",
                question: "What happens when your prompt exceeds the model's context window?",
                type: "multiple-choice",
                options: [
                    "The model returns an error and refuses to process",
                    "The beginning of the prompt is silently truncated",
                    "The model compresses the prompt automatically",
                    "The model switches to a larger context version"
                ],
                correctIndex: 1,
                explanation: "Most APIs truncate from the beginning of the prompt to fit the context window. This means your carefully crafted system prompt or early instructions may be lost if you're not careful about token counts.",
                difficulty: "recall",
                relatedObjectiveId: "1-1"
            },
            {
                id: "cc-1-1-2",
                question: "A code file is 600 lines. Using the rule of thumb (4 chars ≈ 1 token), and assuming average line length of 50 characters, approximately how many tokens is this file?",
                type: "short-answer",
                explanation: "600 lines × 50 chars = 30,000 chars. 30,000 ÷ 4 = 7,500 tokens. This barely fits in GPT-4's 8K context, leaving little room for prompts and responses.",
                difficulty: "apply",
                relatedObjectiveId: "1-2"
            },
            {
                id: "cc-1-1-3",
                question: "Put these LLM training phases in the correct order:",
                type: "ordering",
                itemsToOrder: [
                    "Fine-tuning on instruction-following datasets",
                    "Pre-training on internet text",
                    "RLHF with human raters"
                ],
                correctOrder: [2, 1, 3],
                explanation: "Training proceeds from general (pre-training) to specific (fine-tuning) to aligned (RLHF). Pre-training establishes language understanding, fine-tuning adapts to tasks, and RLHF ensures helpful, safe responses.",
                difficulty: "recall",
                relatedObjectiveId: "1-1"
            }
        ],

        practiceExercises: [
            {
                id: "pe-1-1-1",
                title: "Token Budget Calculator",
                difficulty: "guided",
                scenario: "Build a utility to calculate token budgets for API calls",
                businessContext: "Before sending API requests, you need to verify they fit within limits to avoid errors and unexpected truncation.",
                steps: [
                    {
                        instruction: "Install tiktoken: pip install tiktoken",
                        hint: "This is OpenAI's official tokenizer library",
                        expectedOutput: "Successfully installed tiktoken"
                    },
                    {
                        instruction: "Create a function that takes text and model name, returns token count",
                        hint: "Use tiktoken.encoding_for_model() to get the right tokenizer",
                        expectedOutput: "Function returns integer token count"
                    },
                    {
                        instruction: "Add function to check if a prompt + expected response fits in context",
                        hint: "Consider system prompt, user prompt, and response tokens",
                        expectedOutput: "Function returns True/False with margin info"
                    }
                ],
                starterCode: `
import tiktoken

def count_tokens(text: str, model: str = "gpt-4") -> int:
    # TODO: Implement token counting
    pass

def check_fits(
    system_prompt: str,
    user_prompt: str,
    expected_response_tokens: int,
    model: str = "gpt-4"
) -> dict:
    # TODO: Return {fits: bool, total: int, available: int, margin: int}
    pass
                `,
                solutionApproach: "Use tiktoken to count tokens for each component, sum them, and compare to model limits.",
                successCriteria: [
                    "Correctly counts tokens for any text",
                    "Handles different models (gpt-3.5-turbo, gpt-4, etc.)",
                    "Returns clear fit/no-fit result with margin"
                ],
                commonMistakes: [
                    "Using character count instead of token count",
                    "Forgetting to account for response tokens",
                    "Using wrong tokenizer for model"
                ]
            }
        ],

        summary: "LLMs are token prediction machines trained on massive text datasets. The transformer architecture's self-attention mechanism enables processing of long sequences, but context windows impose hard limits. Understanding tokenization and context limits is essential for building reliable AI applications.",

        keyTerms: [
            { term: "LLM", definition: "Large Language Model - an AI trained to predict text sequences" },
            { term: "Token", definition: "The fundamental unit LLMs process - roughly 4 characters or 0.75 words" },
            { term: "Context Window", definition: "Maximum tokens the model can process at once" },
            { term: "Self-Attention", definition: "Mechanism allowing the model to weigh importance of different input parts" },
            { term: "RLHF", definition: "Reinforcement Learning from Human Feedback - alignment training phase" }
        ],

        nextSteps: "In the next lesson, we'll explore the AI development stack and learn how to choose between different LLM providers, vector databases, and orchestration frameworks."
    }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getLessonsByModule(moduleId: string): Lesson[] {
    // This would be expanded to include all modules
    if (moduleId === "module-1") {
        return module1Lessons;
    }
    return [];
}

export function getLessonById(lessonId: string): Lesson | undefined {
    // Search all modules
    return module1Lessons.find(l => l.id === lessonId);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
    const currentLesson = getLessonById(currentLessonId);
    if (!currentLesson) return undefined;

    const moduleLessons = getLessonsByModule(currentLesson.moduleId);
    const currentIndex = moduleLessons.findIndex(l => l.id === currentLessonId);

    if (currentIndex < moduleLessons.length - 1) {
        return moduleLessons[currentIndex + 1];
    }
    return undefined;
}
