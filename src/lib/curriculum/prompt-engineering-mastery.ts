/**
 * Prompt Engineering Mastery - Complete Curriculum
 * 
 * A comprehensive, research-backed training curriculum covering:
 * - CRAFT Framework for structured prompting
 * - Chain-of-Thought and reasoning techniques
 * - Enterprise prompt patterns and best practices
 * - Security and safety considerations
 * - Practical applications and assessments
 */

export interface LessonContent {
    id: string;
    title: string;
    description: string;
    duration: string;
    objectives: string[];
    sections: LessonSection[];
    quiz: QuizQuestion[];
    keyTakeaways: string[];
    practiceExercise?: PracticeExercise;
}

export interface LessonSection {
    id: string;
    title: string;
    content: string;
    type: "text" | "example" | "interactive" | "video";
    examples?: PromptExample[];
    tips?: string[];
}

export interface PromptExample {
    title: string;
    badPrompt?: string;
    goodPrompt: string;
    output?: string;
    explanation: string;
}

export interface QuizQuestion {
    id: string;
    type: "multiple-choice" | "multiple-select" | "ordering" | "fill-blank" | "scenario";
    question: string;
    options?: string[];
    correctAnswer: number | number[] | string;
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
}

export interface PracticeExercise {
    title: string;
    scenario: string;
    requirements: string[];
    sampleSolution: string;
    rubric: { criterion: string; points: number }[];
}

// =============================================================================
// LESSON 1: Introduction to Prompt Engineering
// =============================================================================

export const lesson1_introduction: LessonContent = {
    id: "pe-101",
    title: "Introduction to Prompt Engineering",
    description: "Understand what prompt engineering is, why it matters, and how it transforms AI interactions",
    duration: "25 min",
    objectives: [
        "Define prompt engineering and its role in AI systems",
        "Explain why prompt design significantly impacts AI output quality",
        "Identify the key components of an effective prompt",
        "Recognize common prompting mistakes and how to avoid them"
    ],
    sections: [
        {
            id: "1-1",
            title: "What is Prompt Engineering?",
            type: "text",
            content: `
# What is Prompt Engineering?

**Prompt engineering** is the art and science of designing inputs (prompts) that effectively communicate with AI language models to produce desired outputs. It's the bridge between human intent and AI capability.

## Why It Matters

Large Language Models (LLMs) like GPT-4, Claude, and Gemini are incredibly powerful, but they're also highly sensitive to how questions and instructions are framed. The same underlying capability can produce vastly different results based on prompt design.

### The Prompt Engineering Impact

Research from OpenAI and academic institutions has shown that:

- **Quality variance**: The same model can perform 30-50% better on the exact same task with optimized prompts
- **Cost efficiency**: Better prompts reduce token usage and API costs by up to 40%
- **Consistency**: Structured prompts produce more reliable, repeatable outputs
- **Safety**: Properly designed prompts reduce harmful or biased outputs

## The Prompt Engineering Mindset

Think of yourself as a translator between human needs and AI capabilities. Your role is to:

1. **Clarify intent** - What exactly do you want the AI to do?
2. **Provide context** - What background information does the AI need?
3. **Set constraints** - What boundaries should the output respect?
4. **Define format** - How should the response be structured?
            `,
            tips: [
                "Treat prompts as code - they should be tested, versioned, and refined",
                "The AI has no memory of previous interactions (unless explicitly provided)",
                "More specific prompts almost always outperform vague ones"
            ]
        },
        {
            id: "1-2",
            title: "Anatomy of an Effective Prompt",
            type: "text",
            content: `
# The Anatomy of an Effective Prompt

Every well-designed prompt contains several key components working together:

## Core Components

### 1. Context
The background information that frames the request:
- Who is asking?
- What is the situation?
- What has happened before?

### 2. Task/Instruction
The specific action you want the AI to perform:
- Be explicit and unambiguous
- Use action verbs (analyze, create, summarize, compare)
- Define scope (word count, number of items, depth)

### 3. Format Specification
How the output should be structured:
- Response format (bullet points, paragraphs, JSON)
- Length constraints
- Style requirements

### 4. Examples (Optional but Powerful)
Demonstrations of desired behavior:
- Show input/output pairs
- Provide templates
- Illustrate edge cases

### 5. Constraints
Boundaries and guardrails:
- What to avoid
- Tone and language requirements
- Factual accuracy requirements
            `
        },
        {
            id: "1-3",
            title: "Good vs. Bad Prompts",
            type: "example",
            content: "Let's examine real examples showing the dramatic difference prompt quality makes:",
            examples: [
                {
                    title: "Vague vs. Specific Task",
                    badPrompt: "Tell me about cybersecurity.",
                    goodPrompt: "Explain the three most critical cybersecurity threats facing small businesses in 2024, including practical prevention steps for each. Format as a numbered list with threat name, description (2-3 sentences), and 3 prevention steps.",
                    explanation: "The good prompt specifies: audience (small businesses), scope (3 threats), time frame (2024), required content (prevention steps), and format (numbered list with specific structure)."
                },
                {
                    title: "Missing Context vs. Rich Context",
                    badPrompt: "Write a response to this email.",
                    goodPrompt: "You are a customer service representative for a SaaS company. A customer is frustrated because their data export feature isn't working. Write a professional, empathetic response that: 1) Acknowledges their frustration, 2) Explains we're aware of the issue and working on it, 3) Offers a workaround (manual export via settings), 4) Provides a timeline (fix expected within 48 hours).",
                    explanation: "The good prompt establishes role, situation, emotional tone, and specific content requirements."
                },
                {
                    title: "Open-Ended vs. Constrained",
                    badPrompt: "Generate some marketing copy.",
                    goodPrompt: "Write a 50-word product description for our AI-powered scheduling app targeting busy executives. Tone: professional yet approachable. Include: one key benefit, one differentiator from competitors, and a call-to-action. Avoid: jargon, hyperbole, exclamation marks.",
                    explanation: "The good prompt sets word limit, target audience, tone, required elements, and things to avoid."
                }
            ]
        },
        {
            id: "1-4",
            title: "Common Prompting Mistakes",
            type: "text",
            content: `
# Common Prompting Mistakes to Avoid

## 1. The Vagueness Trap
❌ "Make this better"
✅ "Improve this paragraph by: making sentences shorter, using active voice, and removing jargon"

## 2. Assuming Context
❌ "Respond to John's email" (Who's John? What email?)
✅ Provide the full context or paste the relevant content

## 3. Overloading Single Prompts
❌ One massive prompt trying to accomplish 10 things
✅ Break complex tasks into sequential, focused steps

## 4. Ignoring Format
❌ Long, prose-heavy prompts for simple tasks
✅ Use structure (bullets, numbers) to organize complex instructions

## 5. The Please/Thank You Misconception
- Politeness doesn't hurt, but it doesn't help AI performance
- What matters is clarity and specificity
- "Please write a summary" = "Write a summary" (functionally identical)

## 6. Not Iterating
- First attempt rarely optimal
- Treat prompts as experiments
- Keep what works, refine what doesn't
            `
        }
    ],
    quiz: [
        {
            id: "q1-1",
            type: "multiple-choice",
            question: "What is the PRIMARY purpose of prompt engineering?",
            options: [
                "To make AI systems run faster",
                "To effectively communicate intent to AI models for desired outputs",
                "To reduce the cost of AI hardware",
                "To replace human programmers"
            ],
            correctAnswer: 1,
            explanation: "Prompt engineering is about designing inputs that effectively communicate with AI models to produce desired outputs. It's the bridge between human intent and AI capability.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q1-2",
            type: "multiple-select",
            question: "Which of the following are core components of an effective prompt? (Select all that apply)",
            options: [
                "Context",
                "Format specification",
                "AI model temperature settings",
                "Task/Instruction",
                "Hardware specifications"
            ],
            correctAnswer: [0, 1, 3],
            explanation: "Context, format specification, and task/instruction are core prompt components. Temperature is a model parameter, not a prompt component. Hardware specs are infrastructure concerns.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "q1-3",
            type: "scenario",
            question: "A colleague asks you to review their prompt: 'Write something about our product.' What is the MOST critical improvement needed?",
            options: [
                "Add 'please' to be polite",
                "Specify what aspect of the product, the format, length, and audience",
                "Use more technical language",
                "Make the prompt longer"
            ],
            correctAnswer: 1,
            explanation: "The prompt is too vague. It needs specificity: what to write (description, benefits, comparison?), format (paragraph, bullets?), length, target audience, and tone.",
            difficulty: "medium",
            points: 20
        },
        {
            id: "q1-4",
            type: "multiple-choice",
            question: "Research shows that optimized prompts can improve AI performance by how much compared to naive prompts?",
            options: [
                "5-10%",
                "10-20%",
                "30-50%",
                "Over 100%"
            ],
            correctAnswer: 2,
            explanation: "Research indicates that well-designed prompts can improve model performance by 30-50% on the same task, highlighting the significant impact of prompt engineering.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q1-5",
            type: "ordering",
            question: "Arrange these steps in the correct order for developing an effective prompt:",
            options: [
                "Test and iterate on the prompt",
                "Define the desired output format",
                "Clarify your intent and goal",
                "Provide necessary context",
                "Add constraints and guardrails"
            ],
            correctAnswer: [2, 3, 1, 4, 0],
            explanation: "The optimal order is: 1) Clarify intent, 2) Provide context, 3) Define format, 4) Add constraints, 5) Test and iterate. This mirrors the CRAFT framework structure.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "Prompt engineering is the science of designing effective AI inputs",
        "Quality prompts can improve AI output by 30-50%",
        "Every prompt should have: context, task, format, and constraints",
        "Avoid vagueness - be specific about what you want",
        "Treat prompts as code: iterate, test, and refine"
    ],
    practiceExercise: {
        title: "Prompt Improvement Challenge",
        scenario: "Your manager gave you this prompt to fix: 'Write an email about the meeting.' Improve it to be production-ready.",
        requirements: [
            "Add appropriate context (who, what meeting, why)",
            "Specify the email's purpose and key points to cover",
            "Define the tone and format",
            "Include any necessary constraints"
        ],
        sampleSolution: "You are an executive assistant at a tech company. Write a professional email to the product team (10 people) announcing next Tuesday's sprint planning meeting. Include: meeting time (2pm EST), location (Zoom link: [link]), agenda topics (Q1 roadmap review, resource allocation, timeline discussion), and ask recipients to prepare their status updates. Tone: friendly but professional. Length: 100-150 words. End with a clear call-to-action.",
        rubric: [
            { criterion: "Added relevant context", points: 25 },
            { criterion: "Specified clear task/purpose", points: 25 },
            { criterion: "Defined format requirements", points: 25 },
            { criterion: "Included appropriate constraints", points: 25 }
        ]
    }
};

// =============================================================================
// LESSON 2: The CRAFT Framework
// =============================================================================

export const lesson2_craft: LessonContent = {
    id: "pe-102",
    title: "The CRAFT Framework for Prompt Engineering",
    description: "Master the CRAFT framework - a systematic approach to constructing effective prompts",
    duration: "35 min",
    objectives: [
        "Explain each component of the CRAFT framework",
        "Apply CRAFT to construct well-structured prompts",
        "Identify missing CRAFT elements in existing prompts",
        "Adapt CRAFT for different use cases and industries"
    ],
    sections: [
        {
            id: "2-1",
            title: "Introducing CRAFT",
            type: "text",
            content: `
# The CRAFT Framework

**CRAFT** is a structured methodology for building effective prompts. It ensures you include all essential elements for high-quality AI outputs.

## C.R.A.F.T. Breakdown

| Letter | Component | Purpose |
|--------|-----------|---------|
| **C** | Context | Background information and situation |
| **R** | Role | The persona or expertise the AI should embody |
| **A** | Action | The specific task to perform |
| **F** | Format | How the output should be structured |
| **T** | Tone | The voice and style of the response |

## Why CRAFT Works

CRAFT works because it addresses the five dimensions that most significantly impact AI output quality:

1. **Reduces ambiguity** - Each component adds clarity
2. **Primes the model** - Role-setting activates relevant knowledge
3. **Constrains scope** - Format and tone prevent rambling
4. **Enables consistency** - Same CRAFT template, consistent outputs
5. **Facilitates iteration** - Easy to adjust individual components
            `
        },
        {
            id: "2-2",
            title: "C - Context",
            type: "text",
            content: `
# C: Context - Setting the Stage

Context provides the background information the AI needs to understand the situation.

## What to Include in Context

### Situational Context
- Who is asking? (job role, expertise level)
- What has happened? (preceding events)
- What is the environment? (company, industry, constraints)

### Knowledge Context
- Relevant data or documents
- Previous decisions or requirements
- Domain-specific information

### Relational Context
- Who is the audience?
- What is the relationship?
- What are the expectations?

## Context Depth Guide

| Task Complexity | Context Needed |
|----------------|----------------|
| Simple query | 1-2 sentences |
| Business task | Short paragraph |
| Complex analysis | Multiple paragraphs + data |
| Strategic decision | Comprehensive background |

## Context Examples

❌ **Insufficient**: "Review this proposal."

✅ **Good Context**: "I'm a product manager at a B2B SaaS startup. We're preparing a proposal for our first enterprise client (Fortune 500 healthcare company). They've expressed concerns about HIPAA compliance and data security. Here's the proposal draft: [content]. Review it for..."
            `,
            tips: [
                "More context is almost always better than less",
                "Include stakeholder perspectives when relevant",
                "Reference industry standards or regulations if applicable"
            ]
        },
        {
            id: "2-3",
            title: "R - Role",
            type: "text",
            content: `
# R: Role - Activating Expertise

The Role component tells the AI what persona or expertise to embody. This primes the model to access relevant knowledge and adopt appropriate communication patterns.

## Why Roles Matter

When you assign a role, the AI:
- Accesses domain-specific vocabulary
- Applies field-relevant frameworks
- Adopts appropriate communication style
- Considers professional best practices

## Effective Role Definitions

### Basic Role
"You are a marketing copywriter."

### Enhanced Role
"You are a senior marketing copywriter with 10 years of experience in B2B technology companies. You specialize in converting complex technical features into compelling business benefits."

### Expert Role
"You are a Chief Information Security Officer (CISO) who has led security programs at Fortune 500 companies. You've handled multiple data breaches, led SOC 2 and ISO 27001 certifications, and regularly present to board-level audiences. You prioritize practical, actionable security advice over theoretical perfection."

## Role Selection Guide

| Task Type | Recommended Role |
|-----------|------------------|
| Writing | Copywriter, Editor, Journalist |
| Analysis | Analyst, Consultant, Researcher |
| Technical | Engineer, Architect, Developer |
| Strategy | Strategist, Executive, Advisor |
| Teaching | Instructor, Tutor, Mentor |
| Review | Critic, Editor, QA Specialist |

## Combining Multiple Roles

For complex tasks, you can layer roles:
"You are a technical writer who also has a background in UX design. You create documentation that is both technically accurate and user-friendly."
            `,
            examples: [
                {
                    title: "Role Impact on Output",
                    goodPrompt: "As an experienced data privacy attorney, explain GDPR's 'right to be forgotten' to a non-technical business executive.",
                    explanation: "This role assignment ensures legal accuracy while the audience specification ensures accessible language."
                }
            ]
        },
        {
            id: "2-4",
            title: "A - Action",
            type: "text",
            content: `
# A: Action - Defining the Task

The Action component specifies exactly what you want the AI to do. This is the heart of your prompt.

## Action Verb Categories

### Creative Actions
- Write, compose, create, generate, design, develop

### Analytical Actions
- Analyze, evaluate, assess, compare, contrast, critique

### Transformative Actions
- Summarize, expand, simplify, translate, reformat, adapt

### Organizational Actions
- Categorize, prioritize, rank, structure, outline, organize

### Investigative Actions
- Research, investigate, explore, examine, identify, discover

## Writing Effective Actions

### Be Specific About Scope
❌ "Analyze the data"
✅ "Analyze these Q3 sales figures to identify the top 3 performing products and explain why they outperformed others"

### Include Success Criteria
❌ "Write a summary"
✅ "Write a 100-word executive summary that a CEO could read in 30 seconds to understand our market position"

### Break Complex Actions into Steps
❌ "Do a complete analysis and make recommendations"
✅ "1) Analyze current state, 2) Identify top 3 issues, 3) For each issue, provide one recommendation with expected impact"
            `
        },
        {
            id: "2-5",
            title: "F - Format",
            type: "text",
            content: `
# F: Format - Structuring the Output

The Format component defines how the response should be organized and presented.

## Common Format Specifications

### Length Constraints
- Word count: "in 100 words or less"
- Time to read: "a 2-minute read"
- Character limit: "under 280 characters"
- Page equivalent: "one-page summary"

### Structure Formats
- Bullet points / numbered lists
- Tables / comparison matrices
- Headers with sections
- Q&A format
- Step-by-step instructions

### Technical Formats
- JSON, XML, YAML
- Markdown
- Code with comments
- API documentation style

### Document Formats
- Email / memo
- Executive summary
- Detailed report
- Slide deck outline
- FAQ format

## Format Examples

✅ **Structured Output**:
"Format your response as:
1. Executive Summary (2-3 sentences)
2. Key Findings (bullet points)
3. Recommendations (numbered list with priority)
4. Next Steps (action items with owners)"

✅ **Table Format**:
"Present your analysis as a table with columns: Feature | Current State | Gap | Recommendation | Priority (High/Med/Low)"
            `
        },
        {
            id: "2-6",
            title: "T - Tone",
            type: "text",
            content: `
# T: Tone - Setting the Voice

The Tone component defines the voice, style, and emotional register of the response.

## Tone Dimensions

### Formality Spectrum
- Formal → Professional → Conversational → Casual → Playful

### Authority Spectrum
- Authoritative → Confident → Balanced → Humble → Uncertain

### Warmth Spectrum
- Warm/Friendly → Neutral → Cool/Distant

### Energy Spectrum
- Enthusiastic → Measured → Calm → Reserved

## Industry-Appropriate Tones

| Industry | Typical Tone |
|----------|--------------|
| Legal | Formal, precise, authoritative |
| Healthcare | Professional, empathetic, clear |
| Technology | Clear, practical, progressive |
| Finance | Conservative, trustworthy, precise |
| Marketing | Engaging, benefit-focused, energetic |
| Education | Supportive, clear, encouraging |

## Tone Examples

❌ **No Tone Specified**: May get inconsistent voice

✅ **Clear Tone**: "Write in a professional but approachable tone, suitable for communicating with senior executives who appreciate directness and data-driven insights."

✅ **Balanced Tone**: "Use a confident but not arrogant tone. Be helpful without being condescending. Use 'we' language to emphasize partnership."
            `
        },
        {
            id: "2-7",
            title: "CRAFT in Action",
            type: "example",
            content: "Let's see complete CRAFT prompts in action:",
            examples: [
                {
                    title: "Customer Service Response",
                    goodPrompt: `**Context**: I'm a customer service representative for CloudStorage Pro. A premium customer ($500/month) is upset because they experienced 2 hours of downtime during a product demo to their CEO.

**Role**: Act as an empathetic, solution-focused senior customer success manager.

**Action**: Write an apology email that acknowledges the impact, explains briefly what happened (our AWS region had an outage), and offers concrete remediation (service credit, direct line to our VP of Engineering for future concerns).

**Format**: Email format with subject line, greeting, 3-4 paragraphs, professional closing.

**Tone**: Sincere, professional, empathetic but not groveling. Acknowledge the seriousness without over-apologizing.`,
                    explanation: "Each CRAFT element is explicitly defined, resulting in a well-targeted, appropriate response."
                },
                {
                    title: "Technical Documentation",
                    goodPrompt: `**Context**: We're documenting our REST API for third-party developers. This endpoint handles user authentication via OAuth 2.0.

**Role**: You are a senior technical writer who specializes in API documentation. You follow industry standards like OpenAPI/Swagger.

**Action**: Write documentation for the /auth/token endpoint including: description, request parameters, response formats, error codes, and a cURL example.

**Format**: Markdown format suitable for a developer portal. Use code blocks for examples. Include tables for parameters and responses.

**Tone**: Clear, concise, developer-friendly. Assume readers have basic API knowledge but explain OAuth-specific concepts briefly.`,
                    explanation: "This prompt would generate professional-grade API documentation ready for a developer portal."
                }
            ]
        }
    ],
    quiz: [
        {
            id: "q2-1",
            type: "multiple-choice",
            question: "In the CRAFT framework, what does the 'R' stand for?",
            options: ["Requirements", "Role", "Results", "Research"],
            correctAnswer: 1,
            explanation: "R stands for Role - the persona or expertise the AI should embody when generating the response.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q2-2",
            type: "multiple-choice",
            question: "Why is the Role component important in prompt engineering?",
            options: [
                "It makes the AI respond faster",
                "It activates domain-specific knowledge and appropriate communication patterns",
                "It reduces token costs",
                "It's required by most AI models"
            ],
            correctAnswer: 1,
            explanation: "Assigning a role primes the AI to access relevant domain knowledge, use appropriate vocabulary, and apply field-relevant frameworks.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "q2-3",
            type: "scenario",
            question: "You need to generate a compliance report for healthcare executives. Which CRAFT element would specify that the report should be 'formal, data-driven, and suitable for regulatory audiences'?",
            options: ["Context", "Role", "Format", "Tone"],
            correctAnswer: 3,
            explanation: "Tone defines the voice and style of the response. Specifications like formal, data-driven, and audience-appropriateness are tone considerations.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "q2-4",
            type: "fill-blank",
            question: "Complete the CRAFT acronym: C = Context, R = Role, A = _____, F = Format, T = Tone",
            correctAnswer: "Action",
            explanation: "A stands for Action - the specific task you want the AI to perform.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q2-5",
            type: "multiple-select",
            question: "Which of these are valid Format specifications? (Select all that apply)",
            options: [
                "Bullet points with no more than 5 items",
                "JSON with specific keys defined",
                "Being friendly and approachable",
                "A 2-paragraph executive summary",
                "Professional confidence"
            ],
            correctAnswer: [0, 1, 3],
            explanation: "Format specifications include structural elements (bullets, JSON, paragraphs). 'Friendly and approachable' and 'professional confidence' are Tone, not Format.",
            difficulty: "medium",
            points: 20
        },
        {
            id: "q2-6",
            type: "scenario",
            question: "A prompt reads: 'Write a product description.' Which CRAFT elements are MISSING?",
            options: [
                "Context, Format, Tone - only Action is present",
                "Only Tone is present",
                "Context, Role, Format, Tone - only a vague Action is present",
                "All CRAFT elements are present"
            ],
            correctAnswer: 2,
            explanation: "The prompt only has a basic action (write description). It's missing: Context (what product? for whom?), Role (what expertise?), Format (length? structure?), and Tone (formal? playful?).",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "CRAFT = Context, Role, Action, Format, Tone",
        "Context provides the necessary background information",
        "Role primes the AI with appropriate expertise and vocabulary",
        "Action specifies exactly what task to perform",
        "Format defines output structure and constraints",
        "Tone sets the voice and emotional register"
    ],
    practiceExercise: {
        title: "Build a Complete CRAFT Prompt",
        scenario: "Your company needs to generate monthly newsletter content for your B2B software product. Build a complete CRAFT prompt that would generate the newsletter draft.",
        requirements: [
            "Include all five CRAFT components clearly labeled",
            "Make each component specific and actionable",
            "The prompt should be ready to use as-is"
        ],
        sampleSolution: `**Context**: Our company, DataFlow Analytics, provides data visualization tools for enterprise clients. This is our monthly newsletter to 5,000 subscribers who are primarily data analysts and BI managers. This month's key updates: new dashboard templates, a customer success story from Nike, and our upcoming webinar on data storytelling.

**Role**: Act as a senior content marketing specialist who understands B2B SaaS, data analytics, and creates engaging but professional content.

**Action**: Write an 800-word newsletter draft covering: (1) intro with hook about data trends, (2) new templates announcement with benefits, (3) Nike case study summary, (4) webinar promotion with registration CTA.

**Format**: Email newsletter format with:
- Subject line and preview text
- Hero section with main hook
- 3 content sections with headers
- Clear CTAs throughout
- Brief closing with social links

**Tone**: Professional yet personable. Data-literate (assume readers understand analytics terminology). Enthusiastic about product without being salesy. Benefit-focused.`,
        rubric: [
            { criterion: "Context is specific and complete", points: 20 },
            { criterion: "Role defines appropriate expertise", points: 20 },
            { criterion: "Action is clear and measurable", points: 20 },
            { criterion: "Format provides useful structure", points: 20 },
            { criterion: "Tone is well-defined for audience", points: 20 }
        ]
    }
};

// =============================================================================
// LESSON 3: Chain-of-Thought Prompting
// =============================================================================

export const lesson3_cot: LessonContent = {
    id: "pe-103",
    title: "Chain-of-Thought Prompting",
    description: "Master reasoning techniques that dramatically improve AI accuracy on complex problems",
    duration: "40 min",
    objectives: [
        "Explain how Chain-of-Thought (CoT) prompting improves AI reasoning",
        "Apply zero-shot and few-shot CoT techniques",
        "Implement Tree-of-Thought for complex problem-solving",
        "Use the ReAct framework for tasks requiring actions"
    ],
    sections: [
        {
            id: "3-1",
            title: "Why Reasoning Matters",
            type: "text",
            content: `
# The Reasoning Revolution

Chain-of-Thought (CoT) prompting was introduced in a landmark 2022 paper by Google researchers. It showed that simply asking AI models to "think step by step" dramatically improves performance on tasks requiring reasoning.

## The Research

Wei et al. (2022) demonstrated that:
- CoT improved math problem accuracy from 17.9% to 78.7% on GSM8K benchmark
- Improvements were most dramatic for complex, multi-step problems
- The technique works across different types of reasoning tasks

## Why Does CoT Work?

### 1. Breaks Down Complexity
Large problems are decomposed into manageable steps, reducing cognitive load on the model.

### 2. Exposes Intermediate Reasoning
Each step is visible, making errors easier to catch and correct.

### 3. Activates Relevant Knowledge
Walking through reasoning explicitly accesses connected concepts.

### 4. Mimics Human Problem-Solving
Humans rarely solve complex problems in one mental leap; neither should AI.
            `
        },
        {
            id: "3-2",
            title: "Zero-Shot Chain-of-Thought",
            type: "example",
            content: "The simplest CoT technique requires just adding a trigger phrase:",
            examples: [
                {
                    title: "Math Problem Without CoT",
                    badPrompt: "If a shirt costs $25 and is 20% off, then another 10% off the sale price, what's the final cost?",
                    goodPrompt: "If a shirt costs $25 and is 20% off, then another 10% off the sale price, what's the final cost? Let's work through this step by step.",
                    output: `Let me solve this step by step:

1. Original price: $25
2. First discount (20% off): 
   - 20% of $25 = $5
   - Price after first discount: $25 - $5 = $20
3. Second discount (10% off the sale price):
   - 10% of $20 = $2
   - Price after second discount: $20 - $2 = $18

The final cost is $18.`,
                    explanation: "Adding 'Let's work through this step by step' triggers explicit reasoning, making the AI show its work and arrive at the correct answer."
                }
            ]
        },
        {
            id: "3-3",
            title: "Few-Shot Chain-of-Thought",
            type: "text",
            content: `
# Few-Shot CoT: Teaching by Example

Few-shot CoT provides examples of the reasoning process you want the AI to follow.

## Structure

1. **Example problem** → **Reasoning steps** → **Answer**
2. **Example problem** → **Reasoning steps** → **Answer**
3. **New problem** → (AI completes reasoning and answer)

## When to Use Few-Shot CoT

- Complex domain-specific reasoning
- When you need a specific reasoning format
- For tasks where zero-shot CoT underperforms
- When consistency in approach is important

## Example: Business Analysis

**Example 1:**
Question: A company has $1M revenue, 40% gross margin, and $200K operating expenses. Is it profitable?

Reasoning:
1. Calculate gross profit: $1M × 40% = $400K
2. Subtract operating expenses: $400K - $200K = $200K
3. Result is positive, so the company is profitable.
Answer: Yes, with $200K operating profit.

**Example 2:**
Question: A startup has $500K revenue, 60% gross margin, and $350K operating expenses. Is it profitable?

Reasoning:
1. Calculate gross profit: $500K × 60% = $300K
2. Subtract operating expenses: $300K - $350K = -$50K
3. Result is negative, so the company is not profitable.
Answer: No, with $50K operating loss.

**Your question:**
[Insert actual business scenario here]
            `
        },
        {
            id: "3-4",
            title: "Tree-of-Thought (ToT)",
            type: "text",
            content: `
# Tree-of-Thought: Exploring Multiple Paths

Tree-of-Thought (ToT) extends CoT by exploring multiple reasoning paths and selecting the most promising.

## How ToT Works

1. **Branch**: Generate 3-5 potential first steps
2. **Evaluate**: Assess which branches are most promising
3. **Expand**: Develop promising branches further
4. **Select**: Choose the best overall path

## ToT Prompt Template

"Consider this problem: [PROBLEM]

Generate 3 possible approaches to solve this:
Approach 1: [description]
Approach 2: [description]
Approach 3: [description]

Now evaluate each approach:
- Approach 1 pros/cons: ...
- Approach 2 pros/cons: ...
- Approach 3 pros/cons: ...

Select the best approach and complete the solution using that method."

## Best Use Cases

- Complex problems with multiple valid approaches
- Creative tasks requiring exploration
- Strategic decisions with trade-offs
- Debugging or troubleshooting
            `
        },
        {
            id: "3-5",
            title: "ReAct: Reasoning + Acting",
            type: "text",
            content: `
# ReAct Framework: Think, Then Do

ReAct (Reasoning + Acting) combines chain-of-thought reasoning with actions, perfect for tasks requiring information gathering or tool use.

## The ReAct Loop

**Thought**: Reason about the current situation and what to do next
**Action**: Perform an action (search, calculate, execute)
**Observation**: Note the result of the action
**Repeat**: Continue until the task is complete

## ReAct Example

**Task**: Find the current CEO of Microsoft and their educational background.

**Thought**: I need to find who the current CEO of Microsoft is.
**Action**: Search "Microsoft CEO 2024"
**Observation**: Satya Nadella is the CEO of Microsoft since 2014.

**Thought**: Now I need to find Satya Nadella's educational background.
**Action**: Search "Satya Nadella education"
**Observation**: Satya Nadella has: B.E. in Electrical Engineering from Mangalore University, M.S. in Computer Science from University of Wisconsin-Milwaukee, MBA from University of Chicago Booth School of Business.

**Thought**: I now have all the information needed.
**Answer**: The current CEO of Microsoft is Satya Nadella. He holds a Bachelor's in Electrical Engineering, a Master's in Computer Science, and an MBA.

## When to Use ReAct

- Tasks requiring information lookup
- Multi-step research tasks
- Problems needing tool/API interaction
- Debugging and investigation
            `
        }
    ],
    quiz: [
        {
            id: "q3-1",
            type: "multiple-choice",
            question: "What is the key insight behind Chain-of-Thought prompting?",
            options: [
                "Making AI models run faster",
                "Explicitly showing reasoning steps improves accuracy on complex problems",
                "Reducing the length of prompts",
                "Using more training data"
            ],
            correctAnswer: 1,
            explanation: "CoT works by making the AI show its reasoning process step by step, which dramatically improves accuracy especially on problems requiring multiple reasoning steps.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q3-2",
            type: "multiple-choice",
            question: "Which phrase is commonly used to trigger zero-shot Chain-of-Thought?",
            options: [
                "Please explain your answer",
                "Let's think step by step",
                "Be careful and precise",
                "Show your work"
            ],
            correctAnswer: 1,
            explanation: "'Let's think step by step' is the canonical trigger phrase for zero-shot CoT, as established in the original research.",
            difficulty: "easy",
            points: 10
        },
        {
            id: "q3-3",
            type: "scenario",
            question: "A task requires the AI to search for information, process it, and make a decision. Which technique is MOST appropriate?",
            options: [
                "Zero-shot CoT",
                "Few-shot CoT",
                "Tree-of-Thought",
                "ReAct (Reasoning + Acting)"
            ],
            correctAnswer: 3,
            explanation: "ReAct is designed for tasks that require alternating between reasoning and taking actions (like searching for information). It combines thought, action, and observation loops.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "q3-4",
            type: "multiple-choice",
            question: "According to research, by how much did CoT improve accuracy on the GSM8K math benchmark?",
            options: [
                "From 17.9% to 78.7% (about 4x improvement)",
                "From 50% to 55% (5% improvement)",
                "From 80% to 95% (15% improvement)",
                "From 30% to 35% (5% improvement)"
            ],
            correctAnswer: 0,
            explanation: "Wei et al. showed that CoT improved accuracy from 17.9% to 78.7% on GSM8K, a roughly 4x improvement, demonstrating the dramatic impact of explicit reasoning.",
            difficulty: "medium",
            points: 15
        },
        {
            id: "q3-5",
            type: "multiple-choice",
            question: "When is Tree-of-Thought (ToT) more appropriate than standard Chain-of-Thought?",
            options: [
                "When you need faster responses",
                "When there are multiple possible approaches worth exploring",
                "When the problem is simple and straightforward",
                "When you want to reduce token usage"
            ],
            correctAnswer: 1,
            explanation: "ToT is best when problems have multiple potential solution paths worth exploring. It branches out, evaluates different approaches, and selects the best one.",
            difficulty: "hard",
            points: 25
        }
    ],
    keyTakeaways: [
        "Chain-of-Thought makes AI show its reasoning, dramatically improving accuracy",
        "Zero-shot CoT: Just add 'Let's think step by step'",
        "Few-shot CoT: Provide examples of the reasoning format you want",
        "Tree-of-Thought explores multiple approaches before selecting the best",
        "ReAct combines reasoning with actions for tasks requiring information gathering"
    ]
};

// =============================================================================
// Module Exports and Final Assessment
// =============================================================================

export const promptEngineeringCurriculum = {
    moduleId: "prompt-engineering-mastery",
    title: "Prompt Engineering Mastery",
    description: "Comprehensive training on effective AI communication techniques",
    lessons: [
        lesson1_introduction,
        lesson2_craft,
        lesson3_cot
    ],
    totalDuration: "100 min",
    certification: {
        name: "Certified Prompt Engineer",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "prompt-engineer-certified"
    }
};

// Final Assessment
export const finalAssessment: QuizQuestion[] = [
    {
        id: "final-1",
        type: "scenario",
        question: "Your company wants to use AI to generate customer support responses. You've been asked to create a prompt template. Using CRAFT, which element would you use to ensure responses 'acknowledge customer frustration before offering solutions'?",
        options: ["Context", "Role", "Action", "Tone"],
        correctAnswer: 3,
        explanation: "The empathetic approach (acknowledging frustration before solutions) is a communication style characteristic, which falls under Tone in the CRAFT framework.",
        difficulty: "medium",
        points: 15
    },
    {
        id: "final-2",
        type: "multiple-select",
        question: "Which techniques would improve AI performance on a complex financial analysis task? (Select all that apply)",
        options: [
            "Chain-of-Thought prompting",
            "Providing few-shot examples of similar analyses",
            "Assigning an 'expert financial analyst' role",
            "Making the prompt shorter",
            "Specifying the output format (tables, sections)"
        ],
        correctAnswer: [0, 1, 2, 4],
        explanation: "CoT, examples, role assignment, and format specification all improve quality. Making prompts shorter often reduces quality by removing important context.",
        difficulty: "hard",
        points: 25
    },
    {
        id: "final-3",
        type: "scenario",
        question: "An AI keeps giving overly long responses when you need concise summaries. Which CRAFT component should you strengthen?",
        options: ["Context", "Role", "Action", "Format"],
        correctAnswer: 3,
        explanation: "Format specifies structural constraints including length. Adding explicit length limits (e.g., 'in under 100 words', '3 bullet points max') in Format solves this issue.",
        difficulty: "medium",
        points: 15
    },
    {
        id: "final-4",
        type: "multiple-choice",
        question: "You're building a prompt for legal document analysis. For maximum accuracy, you should:",
        options: [
            "Keep the prompt brief to avoid confusion",
            "Use CRAFT with a 'legal expert' role, provide document context, specify outputs, and use CoT for reasoning",
            "Just paste the document and ask 'What does this mean?'",
            "Use casual, friendly language to make it accessible"
        ],
        correctAnswer: 1,
        explanation: "Legal analysis requires maximum precision. The combination of CRAFT elements (especially expert role and clear format) plus CoT for reasoning provides the highest accuracy.",
        difficulty: "medium",
        points: 15
    },
    {
        id: "final-5",
        type: "scenario",
        question: "A prompt returns inconsistent results - sometimes formal, sometimes casual, sometimes too short, sometimes too long. What's the most likely root cause?",
        options: [
            "The AI model is broken",
            "The prompt lacks clear format and tone specifications",
            "The context is too detailed",
            "Chain-of-Thought is being used incorrectly"
        ],
        correctAnswer: 1,
        explanation: "Inconsistency in voice and length indicates missing Format and Tone specifications. Without these constraints, the AI fills in defaults unpredictably.",
        difficulty: "medium",
        points: 15
    }
];
