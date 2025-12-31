// Training Content - NATIVE Framework Training (Replaced SAFe Scrum Master)
// This provides lesson content for the lesson player

interface LessonContent {
    id: string;
    title: string;
    type: "video" | "reading" | "quiz";
    duration: string;
    content?: string;
    quiz?: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
}

interface ModuleContent {
    title: string;
    lessons: LessonContent[];
}

// NATIVE Framework Content (Replaces SAFe Scrum Master)
export const safeScrumMasterContent: ModuleContent = {
    title: "NATIVE Framework Foundations",
    lessons: [
        {
            id: "native-intro",
            title: "Introduction to NATIVE",
            type: "reading",
            duration: "15 min",
            content: `# Introduction to the NATIVE Framework

## What is NATIVE?

NATIVE is an AI-native software delivery lifecycle operating model designed for human-AI collaboration. Unlike traditional frameworks that optimize for human constraints, NATIVE recognizes that AI agents can now handle significant portions of implementation work.

## The Five Principles

NATIVE stands for:
- **N - Normalize intent**: From tasks to outcomes
- **A - Augment execution**: AI does the heavy lifting
- **T - Test continuously**: Automated quality at every step
- **I - Iterate autonomously**: Self-improving systems
- **V - Validate outcomes**: Measure what matters
- **E - Evolve systems**: Continuous adaptation

## Why NATIVE Now?

Traditional Agile and SAFe frameworks were designed for a world where humans performed all cognitive work. The constraint was human capacity—sprints, velocity, and ceremonies were optimizations for human coordination.

But what happens when AI can do 80% of the implementation work? The constraint shifts from human execution to human judgment.

## Key Takeaways

1. NATIVE is designed for human-AI collaboration
2. The framework focuses on intent rather than tasks
3. AI agents handle execution while humans provide judgment`,
        },
        {
            id: "normalize-intent",
            title: "Normalize Intent",
            type: "reading",
            duration: "20 min",
            content: `# Normalize Intent: From Tasks to Outcomes

## The Problem with Task-Based Thinking

Traditional backlogs contain tasks: "Build login page", "Add database index", "Fix bug #1234". These tasks tell humans what to do. But AI agents need something different—they need to understand intent.

## What is Intent Normalization?

Normalizing intent means expressing requirements in terms of outcomes rather than implementations. Instead of "Add a login page", we say "Users must be able to securely authenticate to access their personal data."

## The OCCCE Format

A well-defined intent has five components:
- **O - Outcome**: What success looks like
- **C - Context**: Relevant background
- **C - Constraints**: What cannot change
- **C - Criteria**: How to measure success
- **E - Examples**: Concrete illustrations

## Transforming Your Backlog

Review each story and ask:
1. What outcome are we actually seeking?
2. What assumptions are we making?
3. How will we measure success?
4. What constraints must AI respect?`,
        },
        {
            id: "quiz-1",
            title: "Knowledge Check: NATIVE Basics",
            type: "quiz",
            duration: "5 min",
            quiz: {
                question: "What does the 'N' in NATIVE stand for?",
                options: [
                    "New approaches",
                    "Normalize intent",
                    "Native development",
                    "Natural language"
                ],
                correctIndex: 1,
                explanation: "The 'N' in NATIVE stands for 'Normalize intent' - expressing requirements in terms of outcomes rather than implementations. This allows AI agents to understand what success looks like rather than just following prescribed steps."
            }
        },
        {
            id: "augment-execution",
            title: "Augment Execution",
            type: "reading",
            duration: "20 min",
            content: `# Augment Execution: AI-Powered Implementation

## What is Augmented Execution?

Augmented execution is where AI agents do the heavy lifting of implementation. This isn't about AI writing occasional code snippets—it's about AI handling complete implementation tasks from intent to deployment.

## Types of AI Agents

Different AI agents specialize in different tasks:
- **Coding Agents**: Generate and modify code
- **Review Agents**: Analyze code for issues
- **Testing Agents**: Create and maintain tests
- **Documentation Agents**: Keep docs in sync

## Human Oversight Patterns

1. **Human-in-the-loop**: AI proposes, human approves
2. **Human-on-the-loop**: AI acts, human monitors
3. **Human-over-the-loop**: Human sets policies, AI operates

## Best Practices

- Start with human-in-the-loop for new deployments
- Graduate to less restrictive patterns with trust
- Always maintain escape valves for human intervention`,
        },
        {
            id: "quiz-2",
            title: "Final Assessment",
            type: "quiz",
            duration: "10 min",
            quiz: {
                question: "Which oversight pattern requires AI to wait for human approval before taking action?",
                options: [
                    "Human-over-the-loop",
                    "Human-on-the-loop",
                    "Human-in-the-loop",
                    "Autonomous operation"
                ],
                correctIndex: 2,
                explanation: "Human-in-the-loop is the most restrictive pattern where AI proposes actions but waits for human approval before executing. This is the safest pattern for new or high-risk deployments."
            }
        },
    ]
};

// Leadership Content
export const leadershipContent: ModuleContent = {
    title: "Leadership Fundamentals",
    lessons: [
        {
            id: "leadership-intro",
            title: "Introduction to Leadership",
            type: "reading",
            duration: "15 min",
            content: `# Leadership Fundamentals

## What Makes a Great Leader?

Leadership is not about titles or positions—it's about influence, vision, and the ability to guide others toward shared goals.

## Core Leadership Qualities

- **Vision**: Seeing the future and inspiring others
- **Integrity**: Consistent ethical behavior
- **Empathy**: Understanding team members
- **Decisiveness**: Making timely decisions
- **Communication**: Clear and effective messaging

## Leadership Styles

Different situations require different approaches:
1. Directive leadership for crisis situations
2. Participative leadership for complex problems
3. Servant leadership for team development`,
        },
        {
            id: "leadership-quiz",
            title: "Leadership Assessment",
            type: "quiz",
            duration: "5 min",
            quiz: {
                question: "Which leadership quality involves understanding team members' perspectives?",
                options: ["Vision", "Integrity", "Empathy", "Decisiveness"],
                correctIndex: 2,
                explanation: "Empathy is the ability to understand and share the feelings of others. Great leaders use empathy to connect with their team members and make better decisions."
            }
        },
    ]
};

// HIPAA Content
export const hipaaContent: ModuleContent = {
    title: "HIPAA Privacy & Security",
    lessons: [
        {
            id: "hipaa-intro",
            title: "Understanding HIPAA",
            type: "reading",
            duration: "20 min",
            content: `# HIPAA Privacy & Security Essentials

## What is HIPAA?

The Health Insurance Portability and Accountability Act (HIPAA) establishes national standards for protecting sensitive patient health information.

## Key Components

1. **Privacy Rule**: Controls use and disclosure of PHI
2. **Security Rule**: Technical safeguards for ePHI
3. **Breach Notification Rule**: Requirements for reporting

## Protected Health Information (PHI)

PHI includes any information that can identify a patient:
- Names and addresses
- Dates (birth, treatment, death)
- Medical record numbers
- Health conditions and treatments

## Your Responsibilities

- Access only the minimum necessary information
- Never share PHI inappropriately
- Report suspected breaches immediately`,
        },
        {
            id: "hipaa-quiz",
            title: "HIPAA Knowledge Check",
            type: "quiz",
            duration: "5 min",
            quiz: {
                question: "What should you do if you suspect a HIPAA breach?",
                options: [
                    "Ignore it if it seems minor",
                    "Report it immediately to your supervisor",
                    "Wait to see if anyone notices",
                    "Try to fix it yourself first"
                ],
                correctIndex: 1,
                explanation: "You should report suspected HIPAA breaches immediately to your supervisor or designated privacy officer. Timely reporting is required by law and helps minimize potential damage."
            }
        },
    ]
};
