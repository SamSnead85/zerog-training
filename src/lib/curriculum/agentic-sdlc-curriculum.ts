/**
 * Agentic Agile SDLC Curriculum
 * 
 * Based on the NATIVE Framework:
 * N - Normalize intent
 * A - Augment execution
 * T - Test continuously
 * I - Iterate autonomously
 * V - Validate outcomes
 * E - Evolve systems
 */

import type { ModuleSection } from "./types";

// =============================================================================
// MODULE 1: NATIVE FRAMEWORK FOUNDATIONS
// =============================================================================

export const nativeFoundationsModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Welcome to the AI Era of Software Delivery",
        type: "reading",
        content: {
            heading: "Why Agentic Agile SDLC?",
            paragraphs: [
                "The software industry is undergoing its most significant transformation since the Agile revolution. AI agents are now capable of writing code, reviewing pull requests, managing deployments, and even making architectural decisions.",
                "Traditional Agile and SAFe frameworks were designed for a world where humans performed all cognitive work. In that world, the constraint was human capacity—sprints, velocity, and ceremonies were optimizations for human coordination.",
                "But what happens when AI can do 80% of the implementation work? The constraint shifts from human execution to human judgment. This is the fundamental insight behind Agentic Agile SDLC.",
            ],
            keyPoints: [
                "AI agents are now capable of autonomous software development tasks",
                "Traditional frameworks optimize for human constraints that no longer apply",
                "The new constraint is human judgment, not human execution capacity",
            ],
        },
    },
    {
        id: "native-overview",
        title: "The NATIVE Framework",
        type: "reading",
        content: {
            heading: "NATIVE: An AI-Native Operating Model",
            paragraphs: [
                "NATIVE is not just a process—it is an operating model designed for human-AI collaboration. Each letter represents a fundamental shift in how we think about software delivery.",
                "Where Agile gave us sprints and user stories, NATIVE gives us intent-driven development and autonomous iteration. Where SAFe scaled human teams, NATIVE scales machine autonomy safely.",
            ],
            keyPoints: [
                "N - Normalize intent: From tasks to outcomes",
                "A - Augment execution: AI does the heavy lifting",
                "T - Test continuously: Automated quality at every step",
                "I - Iterate autonomously: Self-improving systems",
                "V - Validate outcomes: Measure what matters",
                "E - Evolve systems: Continuous adaptation",
            ],
            tip: "NATIVE is not a replacement for good engineering practices—it's an amplifier. Strong fundamentals + AI augmentation = exceptional results.",
        },
    },
    {
        id: "quiz-foundations",
        title: "Knowledge Check: NATIVE Foundations",
        type: "quiz",
        quiz: {
            question: "What is the fundamental shift that NATIVE addresses compared to traditional Agile?",
            options: [
                "Moving from waterfall to iterative development",
                "Shifting the constraint from human execution to human judgment",
                "Replacing project managers with AI",
                "Eliminating all human involvement in coding",
            ],
            correctIndex: 1,
            explanation: "NATIVE recognizes that when AI can handle most execution work, the constraint shifts to human judgment—deciding what to build, evaluating AI output quality, and ensuring alignment with business goals.",
        },
    },
    {
        id: "human-ai-roles",
        title: "Human-AI Role Definition",
        type: "reading",
        content: {
            heading: "Who Does What in Agentic Teams",
            paragraphs: [
                "In an agentic team, humans and AI agents have distinct responsibilities. Humans provide vision, judgment, and accountability. AI agents provide execution speed, consistency, and tireless iteration.",
                "The key insight is that humans should focus on 'why' and 'what' questions, while AI agents focus on 'how' and 'when'. This division allows each to play to their strengths.",
            ],
            keyPoints: [
                "Humans: Strategy, judgment, stakeholder relationships, ethical decisions",
                "AI Agents: Code generation, testing, documentation, routine decisions",
                "Shared: Quality review, continuous learning, process improvement",
            ],
            warning: "Never delegate accountability to AI. Humans remain responsible for all outcomes, even when AI performs the execution.",
        },
    },
    {
        id: "scenario-adoption",
        title: "Scenario: Starting Your NATIVE Journey",
        type: "scenario",
        scenario: {
            situation: "Your organization has decided to adopt Agentic Agile SDLC. The CTO asks you to identify the first area to pilot. You have three options: a greenfield project with a small team, a legacy modernization effort, or the company's core revenue-generating product.",
            question: "Which is the best choice for an initial NATIVE pilot?",
            options: [
                "The core revenue-generating product—biggest impact",
                "The legacy modernization—AI can handle boring refactoring",
                "The greenfield project—lowest risk, fastest learning",
                "All three simultaneously—go big or go home",
            ],
            correctIndex: 2,
            feedback: "Greenfield projects are ideal for NATIVE pilots because they have fewer constraints, allow the team to learn without legacy baggage, and minimize risk if the pilot faces challenges. Success here builds confidence for larger rollouts.",
        },
    },
];

// =============================================================================
// MODULE 2: NORMALIZE INTENT (N)
// =============================================================================

export const normalizeIntentModule: ModuleSection[] = [
    {
        id: "intro",
        title: "From Tasks to Outcomes",
        type: "reading",
        content: {
            heading: "The 'N' in NATIVE: Normalize Intent",
            paragraphs: [
                "Traditional backlogs contain tasks: 'Build login page', 'Add database index', 'Fix bug #1234'. These tasks tell humans what to do. But AI agents need something different—they need to understand intent.",
                "Normalizing intent means expressing requirements in terms of outcomes rather than implementations. Instead of 'Add a login page', we say 'Users must be able to securely authenticate to access their personal data.'",
                "This shift is crucial because AI can often find better solutions than humans might specify. When you describe the outcome, you give AI the freedom to innovate on the implementation.",
            ],
            keyPoints: [
                "Intent = desired outcome + constraints + success criteria",
                "Tasks tell humans what to do; intent tells AI what to achieve",
                "Intent-driven development enables AI creativity within boundaries",
            ],
        },
    },
    {
        id: "intent-anatomy",
        title: "Anatomy of a Well-Defined Intent",
        type: "reading",
        content: {
            heading: "The Intent Specification Format",
            paragraphs: [
                "A well-defined intent has five components: Outcome (what success looks like), Context (relevant background), Constraints (what cannot change), Criteria (how to measure success), and Examples (concrete illustrations).",
                "This format—sometimes called OCCCE—gives AI agents everything they need to generate high-quality solutions while staying within acceptable boundaries.",
            ],
            keyPoints: [
                "Outcome: The end state you want to achieve",
                "Context: Business logic, existing systems, user needs",
                "Constraints: Security, performance, compatibility requirements",
                "Criteria: Measurable success metrics",
                "Examples: Concrete illustrations of expected behavior",
            ],
            tip: "The more specific your constraints and criteria, the better AI output you'll receive. Vague intent leads to vague implementation.",
        },
    },
    {
        id: "quiz-intent",
        title: "Knowledge Check: Intent Specification",
        type: "quiz",
        quiz: {
            question: "Which is the best example of a normalized intent?",
            options: [
                "'Build a dashboard with charts'",
                "'Create a React component called SalesDashboard.tsx'",
                "'Users need real-time visibility into sales performance with <2s latency, supporting drill-down by region and product'",
                "'Make the dashboard look like the competitor's dashboard'",
            ],
            correctIndex: 2,
            explanation: "The third option specifies the outcome (visibility into sales performance), includes constraints (<2s latency), and defines success criteria (drill-down capability). This gives AI the context to generate an optimal solution.",
        },
    },
    {
        id: "backlog-transformation",
        title: "Transforming Your Backlog",
        type: "reading",
        content: {
            heading: "From User Stories to Intent Stories",
            paragraphs: [
                "User stories follow the format: 'As a [role], I want [feature] so that [benefit]'. Intent stories go further: 'Intent: [outcome] | Context: [background] | Success: [criteria] | Constraints: [boundaries]'.",
                "The transformation isn't just reformatting—it requires deeper thinking about what you're really trying to achieve. Many teams discover that their task-based backlogs contained unclear or conflicting goals.",
            ],
            keyPoints: [
                "Review each story and ask: What outcome are we actually seeking?",
                "Identify hidden assumptions and make them explicit",
                "Add measurable success criteria to every intent",
                "Document constraints that AI must respect",
            ],
            warning: "Don't just rename your backlog items. True intent normalization requires rethinking how you express requirements.",
        },
    },
    {
        id: "scenario-intent",
        title: "Scenario: Normalizing a Feature Request",
        type: "scenario",
        scenario: {
            situation: "A product manager gives you this requirement: 'Users should be able to export data to Excel.' You need to transform this into a normalized intent for your AI development agents.",
            question: "Which transformation best normalizes this intent?",
            options: [
                "'Build an Excel export button using the xlsx library'",
                "'Intent: Users need to analyze their data in spreadsheet tools | Context: Current data is only viewable in-app | Success: Users can export any data view to common spreadsheet formats within 5 seconds | Constraints: Must work offline, must maintain data formatting'",
                "'Add export feature to match competitor functionality'",
                "'Create ExportButton component that calls /api/export endpoint'",
            ],
            correctIndex: 1,
            feedback: "The second option captures the real intent (data analysis in spreadsheets), provides context (current limitation), defines success criteria (5 seconds, any view), and specifies constraints (offline, formatting). This enables AI to potentially suggest better solutions like CSV, Google Sheets integration, or smart data summarization.",
        },
    },
];

// =============================================================================
// MODULE 3: AUGMENT EXECUTION (A)
// =============================================================================

export const augmentExecutionModule: ModuleSection[] = [
    {
        id: "intro",
        title: "AI-Powered Implementation",
        type: "reading",
        content: {
            heading: "The 'A' in NATIVE: Augment Execution",
            paragraphs: [
                "Augmented execution is where AI agents do the heavy lifting of implementation. This isn't about AI writing occasional code snippets—it's about AI handling complete implementation tasks from intent to deployment.",
                "The key word is 'augment', not 'replace'. Humans remain in the loop for judgment calls, quality review, and course correction. But the actual coding, testing, and documentation is increasingly AI-driven.",
                "Modern AI agents can write entire features, create comprehensive test suites, generate documentation, and even suggest architectural improvements—all while maintaining consistency with your codebase style and patterns.",
            ],
            keyPoints: [
                "AI agents can complete implementation tasks end-to-end",
                "Humans focus on review, judgment, and strategic decisions",
                "Quality comes from well-defined intent + strong review processes",
            ],
        },
    },
    {
        id: "agent-types",
        title: "Types of AI Development Agents",
        type: "reading",
        content: {
            heading: "The Agentic Development Stack",
            paragraphs: [
                "Different AI agents specialize in different tasks. Coding agents generate and modify code. Review agents analyze code for issues and improvements. Testing agents create and maintain test suites. Documentation agents keep docs in sync with code.",
                "Orchestration agents coordinate the work of other agents, managing dependencies and ensuring consistent output. Some organizations use commercial platforms; others build custom agent pipelines.",
            ],
            keyPoints: [
                "Coding Agents: GitHub Copilot, Cursor, Claude, GPT-4",
                "Review Agents: CodeRabbit, Codacy AI, custom implementations",
                "Testing Agents: Mastra, TestPilot, custom test generators",
                "Documentation Agents: Mintlify, custom doc generators",
                "Orchestration: LangGraph, CrewAI, custom pipelines",
            ],
            tip: "Start with coding agents, then progressively add review and testing agents. Orchestration agents require maturity and clear processes.",
        },
    },
    {
        id: "quiz-agents",
        title: "Knowledge Check: Agent Selection",
        type: "quiz",
        quiz: {
            question: "When should you use an orchestration agent vs. individual specialized agents?",
            options: [
                "Always use orchestration—it's more powerful",
                "Use orchestration when tasks have dependencies and require coordination",
                "Never use orchestration—it's too complex",
                "Use orchestration only for testing",
            ],
            correctIndex: 1,
            explanation: "Orchestration agents add value when tasks have dependencies, require coordination, or need to maintain state across multiple operations. For simple, independent tasks, individual agents are often sufficient and simpler.",
        },
    },
    {
        id: "oversight",
        title: "Human Oversight Patterns",
        type: "reading",
        content: {
            heading: "Staying in Control of AI Execution",
            paragraphs: [
                "Augmented execution requires strong oversight patterns. The most common is 'human-in-the-loop' where every AI output requires human approval before action. This is safest but slowest.",
                "More mature organizations use 'human-on-the-loop' where AI executes autonomously but humans monitor dashboards and can intervene. The most advanced use 'human-over-the-loop' where humans set policies and AI operates within them.",
            ],
            keyPoints: [
                "Human-in-the-loop: AI proposes, human approves, then AI acts",
                "Human-on-the-loop: AI acts, human monitors and can override",
                "Human-over-the-loop: Human sets policies, AI operates within them",
            ],
            warning: "Start with human-in-the-loop for all new agent deployments. Move to less restrictive patterns only after establishing trust and safety measures.",
        },
    },
    {
        id: "scenario-execution",
        title: "Scenario: Choosing an Oversight Pattern",
        type: "scenario",
        scenario: {
            situation: "Your AI coding agent has been generating code for internal tools for 3 months with a 97% acceptance rate. The team wants to speed up development. Currently, every PR requires manual approval before merge.",
            question: "What's the most appropriate next step?",
            options: [
                "Remove all oversight—the agent has proven reliable",
                "Move to human-on-the-loop: auto-merge but monitor closely, with easy rollback",
                "Keep current process—97% isn't 100%",
                "Add more approval steps for safety",
            ],
            correctIndex: 1,
            feedback: "With a 97% acceptance rate over 3 months, the agent has demonstrated reliability. Moving to human-on-the-loop with auto-merge and monitoring is a reasonable progression. You maintain oversight through monitoring and can easily rollback issues, while accelerating development.",
        },
    },
];

// =============================================================================
// MODULE 4: TEST CONTINUOUSLY (T)  
// =============================================================================

export const testContinuouslyModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Quality at AI Speed",
        type: "reading",
        content: {
            heading: "The 'T' in NATIVE: Test Continuously",
            paragraphs: [
                "When AI can generate code faster than humans can review it, testing becomes the critical bottleneck. Traditional testing strategies—write tests after code, run tests on PR—are too slow for agentic development.",
                "Continuous testing means tests run constantly, at every change, automatically. AI-generated code must be accompanied by AI-generated tests. The test suite itself becomes a living specification.",
                "This isn't just about speed—it's about confidence. When AI generates code, you need automated verification that it matches intent. Tests become your primary mechanism for ensuring AI output quality.",
            ],
            keyPoints: [
                "Tests run at every change, not just at PR time",
                "AI-generated code requires AI-generated tests",
                "The test suite is a living specification of system behavior",
            ],
        },
    },
    {
        id: "test-generation",
        title: "AI-Powered Test Generation",
        type: "reading",
        content: {
            heading: "Generating Tests from Intent",
            paragraphs: [
                "The best approach is to generate tests from intent before generating implementation. This is 'Test-Driven AI Development' (TDAD). You specify intent, AI generates tests, you review tests, then AI generates implementation that passes those tests.",
                "This ensures tests actually verify intent rather than just verifying that code does what code does. It also gives you a chance to catch misunderstandings before implementation begins.",
            ],
            keyPoints: [
                "Generate tests before implementation",
                "Review tests to verify they capture intent",
                "Implementation is then constrained to pass tests",
                "Tests become documentation of expected behavior",
            ],
            tip: "Treat test review with the same rigor as code review. Tests that don't capture intent are worse than no tests—they give false confidence.",
        },
    },
    {
        id: "quiz-testing",
        title: "Knowledge Check: Test Strategy",
        type: "quiz",
        quiz: {
            question: "In Test-Driven AI Development (TDAD), what is the correct sequence?",
            options: [
                "Write code → Generate tests → Run tests → Fix failures",
                "Specify intent → Generate tests → Review tests → Generate implementation",
                "Copy tests from similar features → Modify for new feature",
                "Generate code and tests simultaneously → Review both together",
            ],
            correctIndex: 1,
            explanation: "TDAD starts with intent specification, then generates tests from that intent. Human review of tests ensures they capture intent correctly. Only then does AI generate implementation that must pass those tests.",
        },
    },
    {
        id: "quality-gates",
        title: "Quality Gates for AI Output",
        type: "reading",
        content: {
            heading: "Automated Quality Verification",
            paragraphs: [
                "Quality gates are automated checks that AI output must pass before proceeding. Unlike human code review, quality gates are fast, consistent, and always-on.",
                "Common quality gates include: test coverage thresholds, security scanning, performance benchmarks, accessibility checks, and style consistency. Each gate should have clear pass/fail criteria.",
            ],
            keyPoints: [
                "Test coverage: AI code must meet minimum coverage thresholds",
                "Security: Automated scanning for vulnerabilities and secrets",
                "Performance: Benchmark tests for latency and resource usage",
                "Accessibility: Automated checks for WCAG compliance",
                "Style: Linting and formatting consistency",
            ],
            warning: "Quality gates should fail fast. Don't let AI continue building on a foundation that has already failed quality checks.",
        },
    },
    {
        id: "scenario-testing",
        title: "Scenario: Test Coverage Dispute",
        type: "scenario",
        scenario: {
            situation: "Your AI agent generated a feature with 65% test coverage. Your quality gate requires 80%. The agent argues that the uncovered code is simple getter/setter methods that don't need testing. The feature is needed urgently.",
            question: "How should you handle this?",
            options: [
                "Override the gate—the agent's reasoning is sound",
                "Require the agent to meet 80% coverage, even for simple code",
                "Lower the threshold to 65% permanently",
                "Accept this once but log an exception for review",
            ],
            correctIndex: 1,
            feedback: "Quality gates exist for a reason. AI agents should be held to the same standards as human developers. Simple code still has bugs, and coverage thresholds ensure comprehensive testing. The agent should generate additional tests to meet the threshold.",
        },
    },
];

// =============================================================================
// MODULE 5: ITERATE & EVOLVE (I + E)
// =============================================================================

export const iterateEvolveModule: ModuleSection[] = [
    {
        id: "intro",
        title: "Self-Improving Systems",
        type: "reading",
        content: {
            heading: "The 'I' and 'E' in NATIVE: Iterate Autonomously, Evolve Systems",
            paragraphs: [
                "The final principles of NATIVE address long-term system health. Iterate Autonomously means AI agents can improve their own output based on feedback. Evolve Systems means the operating model itself adapts over time.",
                "This is where NATIVE becomes truly powerful. Instead of static processes that decay over time, you have a dynamic system that continuously improves based on real-world outcomes.",
                "Autonomous iteration requires feedback loops: production metrics, user behavior, error rates, and performance data all feed back into the development process automatically.",
            ],
            keyPoints: [
                "Iterate: AI improves its output based on automated feedback",
                "Evolve: The process itself adapts to changing conditions",
                "Feedback loops connect production outcomes to development",
            ],
        },
    },
    {
        id: "feedback-loops",
        title: "Designing Effective Feedback Loops",
        type: "reading",
        content: {
            heading: "The Anatomy of Autonomous Improvement",
            paragraphs: [
                "Effective feedback loops have four components: Sensors (what you measure), Signals (how you interpret measurements), Actions (what changes based on signals), and Validation (how you confirm improvement).",
                "For AI development, sensors might include error rates, latency percentiles, user satisfaction scores, and code complexity metrics. Signals are the interpretations—'error rate increased by 50%' becomes 'likely regression introduced.'",
            ],
            keyPoints: [
                "Sensors: Error rates, latency, user metrics, code quality",
                "Signals: Interpreted meanings of sensor data",
                "Actions: Automated or human-triggered responses",
                "Validation: Confirmation that actions improved outcomes",
            ],
            tip: "Start with a few high-signal feedback loops rather than trying to measure everything. Signal-to-noise ratio matters more than sensor count.",
        },
    },
    {
        id: "quiz-iteration",
        title: "Knowledge Check: Feedback Loops",
        type: "quiz",
        quiz: {
            question: "Your production error rate spiked after an AI-generated deployment. What's the correct NATIVE response?",
            options: [
                "Manually fix the issue and continue",
                "Roll back, analyze the failure, and feed insights back into agent training",
                "Disable the AI agent permanently",
                "Accept higher error rates as the cost of AI speed",
            ],
            correctIndex: 1,
            explanation: "NATIVE emphasizes learning from failures. Rolling back addresses the immediate issue, analysis identifies root cause, and feeding insights back improves future agent output. This is the iterate-evolve cycle in action.",
        },
    },
    {
        id: "process-evolution",
        title: "Evolving Your Operating Model",
        type: "reading",
        content: {
            heading: "Meta-Improvement: When the Process Improves Itself",
            paragraphs: [
                "The highest form of NATIVE maturity is when your operating model itself evolves. Quality gates that are too strict loosen automatically when trust increases. Oversight patterns shift from in-loop to on-loop based on agent reliability.",
                "This requires meta-metrics: not just 'is the code good?' but 'is our process for judging code effective?' and 'are our quality thresholds appropriate?'",
            ],
            keyPoints: [
                "Track process effectiveness, not just output quality",
                "Adjust thresholds based on historical data",
                "Graduate agents through oversight levels automatically",
                "Sunset unnecessary checks when they stop finding issues",
            ],
            warning: "Process evolution should be gradual and reversible. Rapid changes can destabilize systems that depend on consistency.",
        },
    },
    {
        id: "final-assessment",
        title: "Final Assessment: NATIVE Mastery",
        type: "quiz",
        quiz: {
            question: "A team has implemented all NATIVE principles. What is the ultimate sign of success?",
            options: [
                "No human involvement in coding at all",
                "Zero production bugs ever",
                "Systems that continuously improve business outcomes with minimal human intervention",
                "Fastest deployment speed in the industry",
            ],
            correctIndex: 2,
            explanation: "NATIVE success is measured by continuous improvement in business outcomes with appropriate—not zero—human involvement. Speed and quality are means to an end; the goal is sustainable, improving value delivery.",
        },
    },
];

// =============================================================================
// EXPORTS
// =============================================================================

export const expandedAgenticSDLCModule: ModuleSection[] = [
    ...nativeFoundationsModule,
    ...normalizeIntentModule,
    ...augmentExecutionModule,
    ...testContinuouslyModule,
    ...iterateEvolveModule,
];

export const agenticSDLCCurriculum = {
    id: "agentic-sdlc",
    title: "Agentic Agile SDLC",
    subtitle: "The NATIVE Framework for AI-Era Software Delivery",
    description: "Master the NATIVE operating model for human-AI collaborative development.",
    modules: [
        {
            id: "native-foundations",
            title: "NATIVE Framework Foundations",
            sections: nativeFoundationsModule,
            duration: "2 hours",
        },
        {
            id: "normalize-intent",
            title: "Normalize Intent",
            sections: normalizeIntentModule,
            duration: "2 hours",
        },
        {
            id: "augment-execution",
            title: "Augment Execution",
            sections: augmentExecutionModule,
            duration: "2 hours",
        },
        {
            id: "test-continuously",
            title: "Test Continuously",
            sections: testContinuouslyModule,
            duration: "2 hours",
        },
        {
            id: "iterate-evolve",
            title: "Iterate & Evolve",
            sections: iterateEvolveModule,
            duration: "2 hours",
        },
    ],
    totalDuration: "10 hours",
    certification: {
        name: "NATIVE Certified Practitioner",
        passingScore: 80,
        validityPeriod: "2 years",
        badge: "native-certified",
    },
};
