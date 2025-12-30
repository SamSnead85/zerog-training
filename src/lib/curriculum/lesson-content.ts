// Lesson Content Data - Rich interactive learning content
// Each lesson contains videos, text, quizzes, and code exercises

import { type QuizQuestion } from "@/components/learning/Quiz";
import { type CodeExercise } from "@/components/learning/CodeEditor";

// =============================================================================
// LESSON TYPES
// =============================================================================

export interface LessonContent {
    id: string;
    moduleId: string;
    topicId: string;
    lessonNumber: number;
    title: string;
    duration: string;
    contentType: "video" | "text" | "interactive";
    content: LessonSection[];
}

export type LessonSection =
    | { type: "video"; title: string; videoUrl: string; duration: string; transcript?: string }
    | { type: "text"; content: string }
    | { type: "heading"; level: 1 | 2 | 3; text: string }
    | { type: "callout"; style: "info" | "tip" | "warning"; content: string }
    | { type: "code"; language: string; code: string; caption?: string }
    | { type: "quiz"; title: string; questions: QuizQuestion[] }
    | { type: "exercise"; exercise: CodeExercise }
    | { type: "resources"; items: { title: string; url: string; type: string }[] };

// =============================================================================
// MODULE 1 LESSON CONTENT
// =============================================================================

export const module1Lessons: LessonContent[] = [
    {
        id: "m1-l1",
        moduleId: "module-1",
        topicId: "1-1",
        lessonNumber: 1,
        title: "What is AI? A Developer's Perspective",
        duration: "25 min",
        contentType: "interactive",
        content: [
            { type: "heading", level: 1, text: "Introduction to AI for Developers" },
            {
                type: "video",
                title: "Welcome to AI-Native Development",
                videoUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
                duration: "10 min",
                transcript: "In this lesson, we'll explore what AI means from a developer's perspective..."
            },
            {
                type: "text",
                content: `Artificial Intelligence isn't just a buzzword—it's fundamentally changing how we build software. As developers, we need to understand not just *what* AI is, but *how* to think about it as a tool in our development toolkit.

Traditional programming involves writing explicit rules: if X, then Y. AI, and specifically machine learning, flips this paradigm. Instead of writing rules, we provide examples (data) and let the system learn the rules.`
            },
            { type: "heading", level: 2, text: "The AI Paradigm Shift" },
            {
                type: "callout",
                style: "tip",
                content: "Think of AI as a new kind of programming: instead of explicitly coding logic, you're training a system to recognize patterns and make decisions."
            },
            {
                type: "text",
                content: `Here's a concrete comparison:

**Traditional Programming:**
- Input: Data + Explicit Rules → Output
- Example: \`if temperature > 90: return "hot"\`

**Machine Learning:**
- Input: Data + Expected Outputs → Learned Model
- Example: Show 10,000 temperature readings labeled "hot" or "cold", model learns the pattern

**Large Language Models (LLMs):**
- Input: Massive text data → Model that predicts next tokens
- Example: GPT-4 trained on internet text, can generate human-like responses`
            },
            { type: "heading", level: 2, text: "Key AI Terms Every Developer Should Know" },
            {
                type: "code",
                language: "python",
                code: `# AI Terminology Illustrated

# 1. Model: A trained algorithm that makes predictions
model = load_pretrained_model("gpt-4")

# 2. Prompt: Input text that guides the model's response
prompt = "Explain recursion to a 5-year-old"

# 3. Token: The basic unit of text (roughly 4 characters)
tokens = tokenize(prompt)  # ["Explain", "recurs", "ion", ...]

# 4. Inference: Using a trained model to make predictions
response = model.generate(prompt)  # "Imagine you have a box..."

# 5. Context Window: Maximum tokens the model can process
# GPT-4: ~128k tokens, Claude: ~200k tokens`,
                caption: "Core AI terminology with Python examples"
            },
            { type: "heading", level: 2, text: "Knowledge Check" },
            {
                type: "quiz",
                title: "AI Fundamentals Quiz",
                questions: [
                    {
                        id: "q1",
                        type: "multiple-choice",
                        question: "What is the key difference between traditional programming and machine learning?",
                        options: [
                            { id: "a", text: "ML uses more memory than traditional programming" },
                            { id: "b", text: "Traditional programming requires explicit rules, ML learns patterns from data" },
                            { id: "c", text: "ML can only be used for image recognition" },
                            { id: "d", text: "Traditional programming is faster than ML" },
                        ],
                        correctAnswers: ["b"],
                        explanation: "Machine learning learns patterns from data rather than requiring developers to explicitly code every rule. This is the fundamental paradigm shift.",
                        hint: "Think about how you would teach a computer to recognize a cat photo."
                    },
                    {
                        id: "q2",
                        type: "multiple-choice",
                        question: "What does 'token' refer to in the context of LLMs?",
                        options: [
                            { id: "a", text: "A security credential for API access" },
                            { id: "b", text: "The basic unit of text that models process" },
                            { id: "c", text: "A type of cryptocurrency" },
                            { id: "d", text: "A complete sentence" },
                        ],
                        correctAnswers: ["b"],
                        explanation: "Tokens are the basic units of text that LLMs process. They're typically 3-4 characters on average. Understanding tokens is crucial for managing costs and context limits."
                    },
                    {
                        id: "q3",
                        type: "multi-select",
                        question: "Which of the following are examples of Large Language Models?",
                        options: [
                            { id: "a", text: "GPT-4" },
                            { id: "b", text: "Claude" },
                            { id: "c", text: "MySQL" },
                            { id: "d", text: "Gemini" },
                        ],
                        correctAnswers: ["a", "b", "d"],
                        explanation: "GPT-4 (OpenAI), Claude (Anthropic), and Gemini (Google) are all Large Language Models. MySQL is a relational database, not an AI model."
                    },
                ]
            },
            { type: "heading", level: 2, text: "Hands-On Exercise" },
            {
                type: "exercise",
                exercise: {
                    id: "ex-m1-l1",
                    title: "Your First AI Prompt",
                    description: "Create a simple prompt to ask an AI to explain a programming concept. Replace the placeholder with a real topic.",
                    language: "python",
                    starterCode: `# Create a prompt for an AI assistant
# Replace [TOPIC] with a programming concept you want explained

topic = "[TOPIC]"
prompt = f"Explain {topic} to a junior developer in simple terms."

# Print your prompt
print(prompt)`,
                    solution: `# Create a prompt for an AI assistant
# Replace [TOPIC] with a programming concept you want explained

topic = "recursion"
prompt = f"Explain {topic} to a junior developer in simple terms."

# Print your prompt
print(prompt)`,
                    expectedOutput: "Explain recursion to a junior developer in simple terms.",
                    hint: "Replace [TOPIC] with any programming concept like 'recursion', 'APIs', or 'async/await'"
                }
            },
            { type: "heading", level: 2, text: "Additional Resources" },
            {
                type: "resources",
                items: [
                    { title: "What is Machine Learning? (Google)", url: "https://developers.google.com/machine-learning/intro-to-ml", type: "article" },
                    { title: "Intro to Large Language Models (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", type: "video" },
                    { title: "OpenAI API Documentation", url: "https://platform.openai.com/docs", type: "documentation" },
                ]
            }
        ]
    },
    {
        id: "m1-l2",
        moduleId: "module-1",
        topicId: "1-2",
        lessonNumber: 2,
        title: "Understanding LLM Architecture",
        duration: "35 min",
        contentType: "interactive",
        content: [
            { type: "heading", level: 1, text: "How Large Language Models Work" },
            {
                type: "video",
                title: "Visual Introduction to Transformers",
                videoUrl: "https://www.youtube.com/watch?v=wjZofJX0v4M",
                duration: "15 min",
                transcript: "Let's explore the transformer architecture that powers modern AI..."
            },
            {
                type: "text",
                content: `At the heart of every modern LLM is the **Transformer architecture**. Introduced in the seminal 2017 paper "Attention Is All You Need," transformers revolutionized natural language processing.

The key innovation? **Self-attention**—allowing the model to weigh the importance of different parts of the input when generating each output token.`
            },
            { type: "heading", level: 2, text: "The Transformer Architecture" },
            {
                type: "callout",
                style: "info",
                content: "GPT stands for 'Generative Pre-trained Transformer'. The 'T' refers to the transformer architecture we're about to explore."
            },
            {
                type: "text",
                content: `**Key Components:**

1. **Embedding Layer**: Converts tokens into numerical vectors
2. **Positional Encoding**: Adds position information (word order matters!)
3. **Self-Attention Blocks**: The magic ingredient—computes relationships between all tokens
4. **Feed-Forward Networks**: Processes attention outputs
5. **Output Layer**: Predicts the next token probabilities

The model doesn't "understand" in the human sense—it predicts statistically likely continuations based on patterns learned during training.`
            },
            {
                type: "code",
                language: "python",
                code: `# Simplified view of how an LLM generates text

def generate_response(prompt, model, max_tokens=100):
    """
    Conceptual flow of LLM text generation
    """
    # 1. Tokenize the input prompt
    tokens = tokenize(prompt)  # "Hello world" → [15496, 995]
    
    # 2. Convert tokens to embeddings (vectors)
    embeddings = model.embed(tokens)  # → [[0.1, 0.2, ...], ...]
    
    # 3. Apply self-attention (understand context)
    context = model.attention(embeddings)
    
    # 4. Generate tokens one at a time (autoregressive)
    output_tokens = []
    for _ in range(max_tokens):
        # Predict probabilities for next token
        probs = model.predict_next(context)
        
        # Sample from probability distribution
        next_token = sample(probs, temperature=0.7)
        
        # Stop if we hit end-of-sequence
        if next_token == EOS:
            break
            
        output_tokens.append(next_token)
        
        # Update context with new token
        context = model.update_context(context, next_token)
    
    # 5. Convert tokens back to text
    return detokenize(output_tokens)`,
                caption: "Conceptual view of LLM text generation"
            },
            { type: "heading", level: 2, text: "Key Parameters" },
            {
                type: "text",
                content: `Understanding these parameters helps you use LLMs effectively:

**Temperature** (0-2):
- Low (0.1-0.3): More deterministic, focused outputs
- Medium (0.5-0.7): Balanced creativity and coherence
- High (0.8-1.0+): More random, creative outputs

**Max Tokens**:
- Controls output length
- Remember: input + output must fit in context window

**Top-P (Nucleus Sampling)**:
- Limits token selection to most probable options
- 0.9 means consider tokens that make up 90% of probability mass`
            },
            {
                type: "quiz",
                title: "LLM Architecture Check",
                questions: [
                    {
                        id: "arch-q1",
                        type: "multiple-choice",
                        question: "What is the 'T' in GPT?",
                        options: [
                            { id: "a", text: "Training" },
                            { id: "b", text: "Transformer" },
                            { id: "c", text: "Text" },
                            { id: "d", text: "Tensor" },
                        ],
                        correctAnswers: ["b"],
                        explanation: "GPT = Generative Pre-trained Transformer. The transformer architecture is the foundation of modern LLMs."
                    },
                    {
                        id: "arch-q2",
                        type: "multiple-choice",
                        question: "What does a lower temperature value (e.g., 0.1) produce?",
                        options: [
                            { id: "a", text: "More random, creative outputs" },
                            { id: "b", text: "More deterministic, focused outputs" },
                            { id: "c", text: "Longer responses" },
                            { id: "d", text: "Faster processing" },
                        ],
                        correctAnswers: ["b"],
                        explanation: "Lower temperature makes outputs more deterministic and focused. Use low temperature for factual tasks and higher for creative tasks."
                    },
                ]
            }
        ]
    },
    {
        id: "m1-l3",
        moduleId: "module-1",
        topicId: "1-3",
        lessonNumber: 3,
        title: "Prompt Engineering Fundamentals",
        duration: "40 min",
        contentType: "interactive",
        content: [
            { type: "heading", level: 1, text: "The Art of Prompt Engineering" },
            {
                type: "text",
                content: `Prompt engineering is the skill of crafting effective inputs to get desired outputs from AI models. It's part art, part science, and an essential skill for any developer working with LLMs.

In this lesson, you'll learn frameworks and techniques that dramatically improve your results.`
            },
            { type: "heading", level: 2, text: "The CRISP Framework" },
            {
                type: "callout",
                style: "tip",
                content: "CRISP: Context, Role, Instructions, Style, Parameters—a systematic approach to prompt engineering."
            },
            {
                type: "code",
                language: "text",
                code: `# The CRISP Framework

C - CONTEXT: Provide relevant background information
R - ROLE: Define who the AI should act as
I - INSTRUCTIONS: Give clear, specific tasks
S - STYLE: Specify tone, format, length
P - PARAMETERS: Set constraints and requirements

# Example Prompt using CRISP:

[Context]
You are helping a fintech startup.

[Role]  
Act as a senior software architect with 15 years of experience.

[Instructions]
Design a secure payment processing system that handles credit card transactions.

[Style]
Use technical language appropriate for a developer audience.
Format as a numbered list with sub-points.

[Parameters]
- Must be PCI-DSS compliant
- Handle 10,000 transactions per second
- Include error handling strategy`,
                caption: "The CRISP framework for structured prompts"
            },
            { type: "heading", level: 2, text: "Prompting Techniques" },
            {
                type: "text",
                content: `**1. Zero-Shot Prompting**
Just ask directly without examples:
\`Translate "Hello" to French\`

**2. Few-Shot Prompting**
Provide examples to guide the format:
\`Convert to past tense:\nhappy → was happy\nrun → ran\njump → ?\`

**3. Chain-of-Thought (CoT)**
Ask the model to reason step-by-step:
\`Solve this problem step by step: A train travels 60 mph for 2 hours, then 80 mph for 3 hours. Total distance?\`

**4. Role Prompting**
Assign an expert persona:
\`You are a security expert. Review this code for vulnerabilities...\``
            },
            {
                type: "exercise",
                exercise: {
                    id: "ex-prompt-1",
                    title: "Practice: Few-Shot Prompting",
                    description: "Complete the few-shot prompt by adding one more example and asking the model to convert a new word.",
                    language: "python",
                    starterCode: `# Few-shot prompting example
# Add one more example, then ask to convert "swim"

prompt = """Convert verbs to past tense:

run → ran
eat → ate
# Add your example here

swim → """

print(prompt)`,
                    solution: `# Few-shot prompting example
# Add one more example, then ask to convert "swim"

prompt = """Convert verbs to past tense:

run → ran
eat → ate
go → went

swim → """

print(prompt)`,
                    expectedOutput: `Convert verbs to past tense:

run → ran
eat → ate
go → went

swim → `,
                    hint: "Add another irregular verb conversion like 'go → went' or 'see → saw'"
                }
            },
            {
                type: "quiz",
                title: "Prompt Engineering Quiz",
                questions: [
                    {
                        id: "prompt-q1",
                        type: "multiple-choice",
                        question: "Which prompting technique provides examples to guide the model's output format?",
                        options: [
                            { id: "a", text: "Zero-shot prompting" },
                            { id: "b", text: "Few-shot prompting" },
                            { id: "c", text: "Chain-of-thought prompting" },
                            { id: "d", text: "Role prompting" },
                        ],
                        correctAnswers: ["b"],
                        explanation: "Few-shot prompting provides examples to guide the model. It's especially useful when you need a specific output format."
                    },
                    {
                        id: "prompt-q2",
                        type: "multiple-choice",
                        question: "What does the 'R' in the CRISP framework stand for?",
                        options: [
                            { id: "a", text: "Response" },
                            { id: "b", text: "Requirements" },
                            { id: "c", text: "Role" },
                            { id: "d", text: "Rules" },
                        ],
                        correctAnswers: ["c"],
                        explanation: "R = Role. Defining a role (e.g., 'Act as a senior developer') helps the model adopt the appropriate expertise and tone."
                    },
                ]
            }
        ]
    }
];

// =============================================================================
// LESSON LOOKUP HELPERS
// =============================================================================

export function getLessonsByModule(moduleId: string): LessonContent[] {
    return module1Lessons.filter(l => l.moduleId === moduleId);
}

export function getLessonById(lessonId: string): LessonContent | undefined {
    return module1Lessons.find(l => l.id === lessonId);
}

export function getLessonByModuleAndNumber(moduleId: string, lessonNumber: number): LessonContent | undefined {
    return module1Lessons.find(l => l.moduleId === moduleId && l.lessonNumber === lessonNumber);
}
