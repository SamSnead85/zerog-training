/**
 * Expanded AI & Prompt Engineering Curriculum
 * 
 * Comprehensive training content based on industry best practices,
 * covering 20+ sections from fundamentals to enterprise applications.
 */

import type { ModuleSection } from "./types";

export const expandedAIPromptEngineeringModule: ModuleSection[] = [
    // =========================================================================
    // MODULE 1: FOUNDATIONS (Sections 1-4)
    // =========================================================================
    {
        id: "intro-what-is-ai",
        title: "What is AI & How LLMs Work",
        type: "reading",
        content: {
            heading: "Understanding AI Language Models",
            paragraphs: [
                "Large Language Models (LLMs) like GPT-4, Claude, and Gemini are AI systems trained on massive amounts of text data. They predict the next word in a sequence based on patterns learned during training, which enables them to generate human-like text.",
                "These models don't actually 'know' anything—they statistically predict likely responses based on their training data. This is why the quality of your prompt dramatically affects the quality of the output.",
                "LLMs work best when given clear instructions, relevant context, and examples of desired output. Think of them as extremely capable interns who need specific guidance to produce great work.",
                "Understanding this fundamental mechanism helps you write better prompts: you're not commanding a knowing entity, you're steering a pattern-matching system toward useful outputs."
            ],
            keyPoints: [
                "LLMs predict the most likely next words based on training patterns",
                "They don't 'know' facts—they estimate probable responses",
                "Clear, specific instructions dramatically improve output quality",
                "Context and examples help the model understand what you want"
            ],
        },
    },
    {
        id: "intro-prompt-engineering",
        title: "Introduction to Prompt Engineering",
        type: "reading",
        content: {
            heading: "What is Prompt Engineering?",
            paragraphs: [
                "Prompt engineering is the art and science of designing inputs for AI language models to get the most useful, accurate, and relevant outputs. As AI becomes integral to work, prompt engineering is becoming an essential skill.",
                "The same AI model can give vastly different results based on how you ask. Research shows that well-crafted prompts can improve task accuracy by 50% or more compared to naive prompts.",
                "Prompt engineering combines elements of clear writing, domain expertise, and understanding of how AI models process language. It's not about magic words—it's about clear communication.",
                "This training will equip you with techniques to write clear, effective prompts that get accurate results from ChatGPT, Claude, Gemini, and other AI assistants."
            ],
            keyPoints: [
                "AI is only as good as the prompts you give it",
                "Well-crafted prompts can improve accuracy by 50%+",
                "Specific prompts get specific, useful results",
                "Vague prompts lead to generic, unhelpful outputs"
            ],
        },
    },
    {
        id: "quiz-ai-fundamentals",
        title: "Knowledge Check: AI Fundamentals",
        type: "quiz",
        quiz: {
            question: "What is the primary reason that prompt quality matters when using AI language models?",
            options: [
                "AI models charge more for vague prompts",
                "LLMs predict responses based on patterns, so clear inputs produce better outputs",
                "The AI needs time to 'think' about complex prompts",
                "Different prompts activate different AI personalities"
            ],
            correctIndex: 1,
            explanation: "LLMs work by predicting likely responses based on patterns in their training data. Clear, specific prompts activate more relevant patterns, leading to better outputs. The model doesn't truly 'understand'—it matches patterns, so your prompt quality directly determines output quality."
        },
    },
    {
        id: "prompt-anatomy",
        title: "Anatomy of an Effective Prompt",
        type: "reading",
        content: {
            heading: "The Building Blocks of Great Prompts",
            paragraphs: [
                "Every effective prompt contains several key components that work together to guide the AI toward your desired output. Understanding these components helps you consistently create high-quality prompts.",
                "The core components are: Instructions (what you want), Context (background information), Input Data (what the AI should process), and Output Format (how you want results structured).",
                "Optional but powerful additions include: Examples (showing desired patterns), Constraints (limitations and boundaries), and Persona (the perspective or expertise the AI should adopt).",
                "The order of these components matters. Generally, putting the most important instructions at the beginning and end of your prompt yields better results, as LLMs pay more attention to these positions."
            ],
            keyPoints: [
                "Core: Instructions, Context, Input Data, Output Format",
                "Optional: Examples, Constraints, Persona",
                "Position matters: Important info at start and end",
                "Each component serves a specific purpose in guiding the AI"
            ],
            tip: "Start developing your own prompt templates for recurring tasks. Template-based prompting saves time and ensures consistency."
        },
    },

    // =========================================================================
    // MODULE 2: THE CRAFT FRAMEWORK (Sections 5-8)
    // =========================================================================
    {
        id: "craft-overview",
        title: "The CRAFT Framework",
        type: "reading",
        content: {
            heading: "A Systematic Approach to Prompt Design",
            paragraphs: [
                "CRAFT is a memorable framework for structuring effective prompts: Context, Role, Action, Format, and Tone. Each element addresses a different aspect of what makes prompts work.",
                "Using CRAFT systematically helps you avoid the most common prompting mistakes: missing context, unclear requests, and unspecified formats. It turns prompting from guesswork into a repeatable process.",
                "You don't need every CRAFT element in every prompt. Simple tasks might only need Action and Format. Complex tasks benefit from all five elements working together.",
                "Think of CRAFT as a checklist to run through when your prompts aren't producing desired results. Often, you'll find you're missing one or more elements."
            ],
            keyPoints: [
                "C = Context: Background information and situation",
                "R = Role: What expertise the AI should adopt",
                "A = Action: Clearly state what you want done",
                "F = Format: Specify desired output structure",
                "T = Tone: Indicate style, formality, voice"
            ],
        },
    },
    {
        id: "craft-context-role",
        title: "CRAFT: Context & Role",
        type: "reading",
        content: {
            heading: "Setting the Stage for AI Responses",
            paragraphs: [
                "Context provides the AI with background information it needs to give relevant responses. Without context, the AI has to guess what you mean, often incorrectly.",
                "Good context includes: your situation, relevant constraints, who the output is for, and any important background facts. Be specific about what makes your situation unique.",
                "Role tells the AI what perspective or expertise to adopt. 'You are an expert data scientist' produces different outputs than 'You are a marketing copywriter.'",
                "Roles prime the model to use domain-specific language, consider relevant factors, and adopt appropriate reasoning patterns. They're one of the highest-leverage prompt improvements."
            ],
            keyPoints: [
                "Context: Your situation, constraints, audience, background",
                "Role: Expert persona, perspective, or discipline",
                "Roles activate domain-specific language and reasoning",
                "Missing context forces AI to make assumptions"
            ],
            tip: "For complex tasks, combine multiple role aspects: 'You are a senior product manager with 10 years of experience in B2B SaaS, known for user-centered design thinking.'"
        },
    },
    {
        id: "craft-action-format-tone",
        title: "CRAFT: Action, Format & Tone",
        type: "reading",
        content: {
            heading: "Directing the AI Output",
            paragraphs: [
                "Action is your clear directive—what you want the AI to do. Use specific action verbs: analyze, compare, summarize, critique, generate, explain, simplify, expand, translate, or rewrite.",
                "Format specifies how you want the output structured. Options include: bullet points, numbered lists, tables, JSON, markdown, essays, emails, scripts, or specific templates.",
                "Tone indicates the style and voice. Consider: formal/casual, technical/simple, encouraging/neutral, concise/detailed, or specific voices like 'conversational but professional.'",
                "These three elements together transform vague requests into precise specifications that consistently produce usable outputs."
            ],
            keyPoints: [
                "Action: Use specific verbs (analyze, compare, summarize)",
                "Format: Bullet points, tables, JSON, specific templates",
                "Tone: Formal/casual, technical/simple, voice specifications",
                "Combine all three for precise, reliable outputs"
            ],
            warning: "Avoid compound actions in a single prompt. 'Analyze AND summarize AND create recommendations' often produces worse results than three separate prompts."
        },
    },
    {
        id: "quiz-craft",
        title: "Knowledge Check: CRAFT Framework",
        type: "quiz",
        quiz: {
            question: "Which prompt best demonstrates the complete CRAFT framework?",
            options: [
                "'Write about marketing for my startup.'",
                "'You are a B2B marketing expert. My SaaS startup helps HR teams automate onboarding. Write 5 LinkedIn post ideas in a professional but engaging tone, each under 150 words, focusing on pain points HR managers face.'",
                "'Create marketing content please.'",
                "'Marketing expert needed. Write posts.'"
            ],
            correctIndex: 1,
            explanation: "The second option includes all CRAFT elements: Context (SaaS startup, HR automation), Role (B2B marketing expert), Action (write LinkedIn post ideas), Format (5 posts, under 150 words), and Tone (professional but engaging, focused on pain points)."
        },
    },

    // =========================================================================
    // MODULE 3: ADVANCED TECHNIQUES (Sections 9-14)
    // =========================================================================
    {
        id: "zero-shot-prompting",
        title: "Zero-Shot Prompting",
        type: "reading",
        content: {
            heading: "Direct Instructions Without Examples",
            paragraphs: [
                "Zero-shot prompting means giving the AI instructions without providing examples. This is the default way most people use AI—simply asking for what they want.",
                "Zero-shot works well for straightforward tasks where the AI has clear training data: summarization, translation, simple Q&A, and common text transformations.",
                "The key to effective zero-shot prompting is extreme clarity. Since you're not showing examples, your instructions must be unambiguous.",
                "Zero-shot is faster to write but may require more iteration. If you're getting inconsistent results, consider switching to few-shot prompting with examples."
            ],
            keyPoints: [
                "No examples provided—direct instructions only",
                "Works best for straightforward, well-defined tasks",
                "Requires very clear, unambiguous instructions",
                "Fast to write but may need more iteration"
            ],
            tip: "Zero-shot prompts benefit from explicit constraints: 'Do not include X. Focus only on Y. Limit response to Z words.'"
        },
    },
    {
        id: "few-shot-prompting",
        title: "Few-Shot Learning",
        type: "reading",
        content: {
            heading: "Teaching by Example",
            paragraphs: [
                "Few-shot prompting provides 2-5 examples of the input-output pattern you want. The AI learns the pattern from your examples and applies it to new inputs.",
                "This technique dramatically improves consistency and accuracy for complex or nuanced tasks. Research shows few-shot can improve accuracy by 10-30% over zero-shot for many tasks.",
                "Choose examples that are diverse and representative of edge cases. Poor examples will teach poor patterns. Your examples should cover the variety of inputs you expect.",
                "Format your examples clearly with consistent structure. Use delimiters like '---' or 'Input:' and 'Output:' labels to help the AI understand the pattern."
            ],
            keyPoints: [
                "Provide 2-5 input/output examples before your actual request",
                "Examples teach patterns better than instructions",
                "Choose diverse, representative examples",
                "Consistent formatting helps the AI learn the pattern"
            ],
            tip: "For classification tasks, include at least one example of each category. For generation tasks, show the variety of styles you'd accept."
        },
    },
    {
        id: "chain-of-thought",
        title: "Chain-of-Thought Prompting",
        type: "reading",
        content: {
            heading: "Reasoning Step by Step",
            paragraphs: [
                "Chain-of-Thought (CoT) prompting asks the AI to show its reasoning steps before giving a final answer. This dramatically improves accuracy on complex reasoning tasks.",
                "Research by Google showed CoT improved math problem accuracy from 17.7% to 78.7%. It helps because it forces the model through intermediate reasoning rather than jumping to conclusions.",
                "The simplest CoT trigger is adding 'Let's think step by step' or 'Explain your reasoning' to your prompt. For more control, explicitly structure the reasoning steps you want.",
                "CoT is especially powerful for: math problems, logical reasoning, complex analysis, debugging, multi-step processes, and any task requiring careful thought."
            ],
            keyPoints: [
                "Add 'Let's think step by step' for simple CoT",
                "Improves accuracy on complex reasoning by 50%+",
                "Forces intermediate reasoning instead of jumping to conclusions",
                "Best for math, logic, analysis, multi-step problems"
            ],
            warning: "CoT increases token usage significantly. For simple tasks, it may be overkill. Reserve it for genuinely complex problems."
        },
    },
    {
        id: "tree-of-thoughts",
        title: "Tree-of-Thoughts & Self-Consistency",
        type: "reading",
        content: {
            heading: "Exploring Multiple Reasoning Paths",
            paragraphs: [
                "Tree-of-Thoughts (ToT) extends Chain-of-Thought by exploring multiple reasoning paths and evaluating which path leads to the best solution.",
                "In ToT, you ask the AI to consider several different approaches, reason through each one, and then select the most promising path. This mimics how experts think through complex problems.",
                "Self-Consistency is a related technique: generate multiple responses to the same prompt, then take the most common answer. This reduces random errors and hallucinations.",
                "Both techniques trade speed for accuracy. Use them for high-stakes decisions where getting the right answer matters more than getting a fast answer."
            ],
            keyPoints: [
                "Tree-of-Thoughts: Explore multiple reasoning approaches",
                "Self-Consistency: Generate multiple answers, take the consensus",
                "Both improve accuracy on complex, ambiguous problems",
                "Trade speed for accuracy—use for high-stakes decisions"
            ],
            tip: "For ToT, use prompts like: 'Consider three different approaches to this problem. For each approach, work through the reasoning. Then evaluate which approach is most likely to succeed.'"
        },
    },
    {
        id: "scenario-advanced",
        title: "Scenario: Choosing the Right Technique",
        type: "scenario",
        scenario: {
            situation: "You need to analyze a complex financial report to identify potential risks. The analysis requires understanding numerical data, industry context, and regulatory implications. Which prompting technique would be most effective?",
            question: "What's the best approach for this complex analytical task?",
            options: [
                "Zero-shot: 'Analyze this financial report for risks.'",
                "Few-shot with examples of risk analyses",
                "Chain-of-Thought: 'Analyze step by step, examining financials, industry context, and regulations. Show your reasoning for each potential risk identified.'",
                "Just paste the report and ask 'What do you think?'"
            ],
            correctIndex: 2,
            feedback: "Complex analytical tasks with multiple dimensions (financial, industry, regulatory) benefit most from Chain-of-Thought prompting. By requiring explicit reasoning through each dimension, you get more thorough analysis and can verify the AI's logic."
        },
    },
    {
        id: "quiz-advanced-techniques",
        title: "Knowledge Check: Advanced Techniques",
        type: "quiz",
        quiz: {
            question: "When would few-shot prompting be MORE effective than chain-of-thought?",
            options: [
                "Solving complex math problems",
                "Classifying customer support tickets into predefined categories",
                "Analyzing legal documents for risks",
                "Debugging code logic errors"
            ],
            correctIndex: 1,
            explanation: "Classification into predefined categories benefits most from few-shot prompting—showing examples of each category teaches the pattern clearly. Chain-of-thought is better for problems requiring step-by-step reasoning like math, analysis, or debugging."
        },
    },

    // =========================================================================
    // MODULE 4: ENTERPRISE PATTERNS (Sections 15-18)
    // =========================================================================
    {
        id: "enterprise-prompts",
        title: "Enterprise Prompt Patterns",
        type: "reading",
        content: {
            heading: "Patterns for Business Applications",
            paragraphs: [
                "Enterprise use cases require prompts that are reliable, consistent, and produce outputs suitable for professional contexts. Several patterns have emerged as best practices.",
                "The Persona Pattern assigns business-specific roles: 'You are a senior compliance officer reviewing this policy...' This ensures appropriate professional framing.",
                "The Template Pattern creates reusable prompt structures for recurring tasks. Teams can share and refine templates, ensuring consistency across the organization.",
                "The Guardrail Pattern explicitly states what the AI should NOT do: 'Do not make up statistics. If uncertain, say so. Do not provide legal/medical advice.' This reduces risk."
            ],
            keyPoints: [
                "Persona Pattern: Assign business-specific expert roles",
                "Template Pattern: Create reusable, shareable prompts",
                "Guardrail Pattern: Explicitly state boundaries and limitations",
                "These patterns increase reliability and reduce risk"
            ],
        },
    },
    {
        id: "prompt-chaining",
        title: "Prompt Chaining & Decomposition",
        type: "reading",
        content: {
            heading: "Breaking Down Complex Tasks",
            paragraphs: [
                "Prompt chaining breaks complex tasks into a sequence of simpler prompts, where each prompt's output becomes input for the next. This dramatically improves quality on multi-step tasks.",
                "Instead of 'Analyze this data, create a report, and make recommendations,' chain: First analyze → then summarize findings → then generate recommendations → then format as report.",
                "Each step can use different techniques: analysis might use CoT, classification might use few-shot, and final formatting might be zero-shot with clear format specifications.",
                "Chaining enables human review at each step, catching errors before they propagate. It also allows mixing AI types or adding external data between steps."
            ],
            keyPoints: [
                "Break complex tasks into sequential simpler prompts",
                "Each step can use the optimal technique",
                "Enables human review and correction at each stage",
                "Prevents error accumulation in multi-step processes"
            ],
            tip: "Design your chains with clear 'handoff' formats. If Step 1 outputs JSON, Step 2 should be designed to accept JSON input."
        },
    },
    {
        id: "system-prompts",
        title: "System Prompts & Custom Instructions",
        type: "reading",
        content: {
            heading: "Persistent AI Behavior Configuration",
            paragraphs: [
                "System prompts (or custom instructions) set persistent behavior that applies to all subsequent interactions. They're like giving the AI a job description before it starts work.",
                "Effective system prompts include: the AI's role and expertise, organizational context, output preferences, things to always/never do, and how to handle edge cases.",
                "System prompts reduce repetition—you don't have to re-specify role and context in every message. They're especially valuable for team-wide deployments.",
                "Keep system prompts focused and well-organized. Too many instructions can cause the AI to ignore or forget some of them. Prioritize the most important behaviors."
            ],
            keyPoints: [
                "Set persistent behavior across all interactions",
                "Include: role, context, preferences, constraints",
                "Reduces repetition in individual prompts",
                "Keep focused—too many instructions cause drops"
            ],
            warning: "Test your system prompts thoroughly. Interactions between system-level and user-level instructions can produce unexpected behaviors."
        },
    },
    {
        id: "scenario-enterprise",
        title: "Scenario: Building a Team Template",
        type: "scenario",
        scenario: {
            situation: "Your marketing team frequently uses AI to write product descriptions. Results are inconsistent—some team members get great outputs while others struggle. You've been asked to create a team-wide template.",
            question: "What elements should your template include?",
            options: [
                "Just 'Write a product description for [PRODUCT]'",
                "A long, detailed example of a perfect product description",
                "Role (brand voice expert), Context (product category, target audience), Action (write description), Format (length, sections, keywords), Tone (brand voice guide), and 2-3 example outputs",
                "Links to competitor product descriptions to copy"
            ],
            correctIndex: 2,
            feedback: "A comprehensive template includes all CRAFT elements plus examples. This ensures any team member can produce consistent, on-brand outputs. The template should be documented and updated based on what produces the best results."
        },
    },

    // =========================================================================
    // MODULE 5: RESPONSIBLE AI & VERIFICATION (Sections 19-21)
    // =========================================================================
    {
        id: "ai-limitations",
        title: "Understanding AI Limitations",
        type: "reading",
        content: {
            heading: "What AI Can and Cannot Do",
            paragraphs: [
                "AI language models have significant limitations that every user must understand. They can generate plausible-sounding but completely false information ('hallucinations').",
                "Models have knowledge cutoff dates—they don't know about events after their training. They also have biases from their training data that can appear in outputs.",
                "AI cannot access the internet in real-time (unless specifically told), verify facts, or truly 'understand' context the way humans do. It predicts likely text, not truth.",
                "These limitations mean AI outputs require human verification, especially for: factual claims, legal/medical advice, financial figures, and any high-stakes decisions."
            ],
            keyPoints: [
                "Hallucinations: AI can confidently state false information",
                "Knowledge cutoff: No awareness of recent events",
                "Bias: Training data biases appear in outputs",
                "No real-time access or true understanding"
            ],
            warning: "Never use AI outputs for legal, medical, or financial decisions without expert human verification. AI can be confidently wrong."
        },
    },
    {
        id: "verification-practices",
        title: "Output Verification Best Practices",
        type: "reading",
        content: {
            heading: "Validating AI-Generated Content",
            paragraphs: [
                "Every AI output should be reviewed before use. The level of scrutiny should match the stakes—a casual email needs less verification than a customer-facing document.",
                "For factual content, verify specific claims against authoritative sources. Don't assume numbers, dates, quotes, or citations are accurate—they often aren't.",
                "Cross-check by asking the same question differently, or by asking the AI to verify its own previous answer. Inconsistencies reveal uncertainty.",
                "Develop domain expertise so you can spot errors. AI may produce content that sounds good but is technically wrong. Without expertise, these errors slip through."
            ],
            keyPoints: [
                "Review level should match stakes",
                "Verify facts against authoritative sources",
                "Cross-check with different phrasings",
                "Domain expertise helps catch technical errors"
            ],
            tip: "Add verification prompts: 'What sources would you recommend I check to verify this information?' or 'What parts of this response are you least confident about?'"
        },
    },
    {
        id: "data-privacy-ai",
        title: "Data Privacy & Security",
        type: "reading",
        content: {
            heading: "Protecting Sensitive Information",
            paragraphs: [
                "When using external AI tools, assume your inputs may be logged, reviewed, or used for training. Never input data that shouldn't be exposed.",
                "Prohibited inputs include: personally identifiable information (PII), confidential customer data, trade secrets, internal financial data, proprietary code, and anything covered by NDA.",
                "If you need to work with sensitive data and AI, use your organization's approved internal tools, or anonymize data before using external tools.",
                "Follow your organization's AI use policy. When in doubt, check with your manager or compliance team before inputting potentially sensitive information."
            ],
            keyPoints: [
                "External AI may log and use your inputs",
                "Never input: PII, customer data, trade secrets, NDA content",
                "Use approved internal tools for sensitive work",
                "When in doubt, check before inputting"
            ],
            warning: "Data breaches through AI tools can result in regulatory penalties, lawsuits, and reputational damage. When in doubt, don't input it."
        },
    },
    {
        id: "quiz-responsible-ai",
        title: "Knowledge Check: Responsible AI Use",
        type: "quiz",
        quiz: {
            question: "You're drafting a press release and use AI to generate a quote attributed to your CEO. What should you do before publishing?",
            options: [
                "Publish it—the AI created a realistic quote",
                "Get the CEO's approval for the AI-generated quote",
                "Add a disclaimer that quotes were AI-generated",
                "Delete the quote—you can't use AI for this"
            ],
            correctIndex: 1,
            explanation: "AI-generated quotes attributed to real people should always be approved by that person. The quote may not reflect what they'd actually say, could be taken out of context, or might conflict with their known positions. Human approval for any content attributed to specific individuals is essential."
        },
    },

    // =========================================================================
    // MODULE 6: PRACTICAL APPLICATION (Sections 22-24)
    // =========================================================================
    {
        id: "iterative-refinement",
        title: "Iterative Prompt Refinement",
        type: "reading",
        content: {
            heading: "Improving Prompts Through Iteration",
            paragraphs: [
                "Great prompts rarely emerge on the first try. Skilled prompt engineers iterate rapidly, adjusting based on what they see in the outputs.",
                "Start with a simple prompt and add specificity based on what's missing or wrong in the output. Each iteration should address one or two specific issues.",
                "Keep a prompt journal for important tasks. Document what worked, what didn't, and why. This accelerates learning and creates a reference for future tasks.",
                "When iterating, change one thing at a time when possible. This helps you understand what each change contributed to the improvement."
            ],
            keyPoints: [
                "Start simple, add specificity based on outputs",
                "Address 1-2 issues per iteration",
                "Document what works and why",
                "Change one thing at a time to learn what helps"
            ],
            tip: "Ask the AI for feedback: 'What's unclear about this prompt? What additional information would help you give a better response?'"
        },
    },
    {
        id: "common-use-cases",
        title: "Common Enterprise Use Cases",
        type: "reading",
        content: {
            heading: "Practical Applications Across Functions",
            paragraphs: [
                "Writing & Communication: Draft emails, reports, presentations, documentation. AI excels at first drafts and overcoming 'blank page' syndrome.",
                "Research & Analysis: Summarize documents, extract key points, compare options, identify patterns. AI processes text faster than humans but needs verification.",
                "Code & Technical: Explain code, generate boilerplate, review for bugs, create documentation. Technical prompts benefit from specific language and version information.",
                "Creative & Strategy: Brainstorm ideas, explore scenarios, generate options, challenge assumptions. Use AI as a thinking partner, not the final decision-maker."
            ],
            keyPoints: [
                "Writing: Drafts, editing, formatting, localization",
                "Research: Summarization, extraction, comparison",
                "Technical: Code, documentation, debugging",
                "Creative: Brainstorming, scenarios, options"
            ],
            tip: "For each use case, develop your own optimized prompts and templates. Generic prompts give generic results."
        },
    },
    {
        id: "final-assessment",
        title: "Final Assessment",
        type: "quiz",
        quiz: {
            question: "You need to use AI to help draft a competitive analysis report for an upcoming board meeting. What's the most comprehensive approach?",
            options: [
                "Single prompt: 'Write a competitive analysis of our top 5 competitors for the board.'",
                "Chain of prompts: (1) Summarize each competitor's public information, (2) Analyze strengths and weaknesses using CoT, (3) Identify threats and opportunities, (4) Format as executive brief with verification notes for claims you'll need to check.",
                "Copy competitor websites into the AI and ask for analysis.",
                "Ask the AI to make up impressive-sounding data about competitors."
            ],
            correctIndex: 1,
            explanation: "High-stakes board documents require a chained approach with appropriate techniques at each step. This ensures thorough analysis, enables human review at each stage, uses CoT for complex reasoning, and includes verification notes recognizing that AI claims need fact-checking. Never fabricate data."
        },
    },
    {
        id: "certification-complete",
        title: "Certification Complete",
        type: "reading",
        content: {
            heading: "Congratulations! Prompt Engineering Mastery Achieved",
            paragraphs: [
                "You've completed the Prompt Engineering Masterclass. You now understand the fundamentals of how LLMs work, the CRAFT framework for structuring prompts, and advanced techniques like Chain-of-Thought and Few-Shot learning.",
                "You've learned enterprise patterns for reliable, consistent outputs, and the critical importance of verification and responsible AI use.",
                "The most important takeaway: prompt engineering is a skill that improves with practice. Start applying these techniques today and iterate on what works best for your specific use cases.",
                "Remember to bookmark this training for reference, share effective prompts with your team, and continue developing your AI collaboration skills."
            ],
            keyPoints: [
                "Practice daily to build prompt engineering intuition",
                "Create and refine templates for your recurring tasks",
                "Share effective prompts with your team",
                "Always verify AI outputs before important use",
                "Stay updated—AI capabilities evolve rapidly"
            ],
        },
    },
];

export default expandedAIPromptEngineeringModule;
