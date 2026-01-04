// AI Maturity Model - ScaledNative NATIVE Framework Integration
// Aligns with the "Navigate" phase of the NATIVE Framework™

export interface MaturityLevel {
    level: number;
    name: string;
    description: string;
    characteristics: string[];
    recommendedTracks: string[];
    nextSteps: string[];
}

export interface MaturityQuestion {
    id: string;
    category: "strategy" | "skills" | "tools" | "culture" | "governance";
    question: string;
    options: {
        text: string;
        score: number;
    }[];
}

// 5-Level AI Maturity Model
export const maturityLevels: MaturityLevel[] = [
    {
        level: 1,
        name: "Aware",
        description: "Your organization recognizes AI's potential but hasn't begun systematic adoption.",
        characteristics: [
            "Limited understanding of AI capabilities",
            "No formal AI training programs",
            "Ad-hoc tool usage by individuals",
            "No AI strategy or governance",
        ],
        recommendedTracks: ["everyone"],
        nextSteps: [
            "Start with foundational AI literacy for all employees",
            "Identify AI champions across departments",
            "Complete the 'AI for Everyone' certification track",
        ],
    },
    {
        level: 2,
        name: "Exploring",
        description: "Your organization is experimenting with AI tools and building foundational knowledge.",
        characteristics: [
            "Pockets of AI tool usage across teams",
            "Some employees self-learning AI skills",
            "Beginning to discuss AI strategy",
            "Limited governance or policies",
        ],
        recommendedTracks: ["everyone", "product-managers"],
        nextSteps: [
            "Formalize AI training across key roles",
            "Develop initial AI usage guidelines",
            "Pilot AI tools in specific workflows",
        ],
    },
    {
        level: 3,
        name: "Implementing",
        description: "Your organization is actively deploying AI across multiple functions with growing expertise.",
        characteristics: [
            "Role-specific AI training programs",
            "Multiple AI tools in production use",
            "Emerging AI governance framework",
            "Measurable productivity improvements",
        ],
        recommendedTracks: ["product-managers", "business-analysts", "project-managers"],
        nextSteps: [
            "Scale AI training to all professional roles",
            "Establish AI Center of Excellence",
            "Define AI success metrics and KPIs",
        ],
    },
    {
        level: 4,
        name: "Scaling",
        description: "AI is embedded across your organization with mature practices and measurable ROI.",
        characteristics: [
            "Comprehensive AI skills across workforce",
            "AI integrated into core business processes",
            "Robust AI governance and ethics framework",
            "Clear ROI tracking and optimization",
        ],
        recommendedTracks: ["executives"],
        nextSteps: [
            "Develop AI innovation capabilities",
            "Build AI-powered products and services",
            "Establish industry leadership position",
        ],
    },
    {
        level: 5,
        name: "Transformative",
        description: "Your organization leads the industry in AI-native practices and drives innovation.",
        characteristics: [
            "AI-native culture and mindset",
            "Continuous AI innovation and experimentation",
            "AI-powered products and competitive advantage",
            "Thought leadership and industry influence",
        ],
        recommendedTracks: ["executives"],
        nextSteps: [
            "Share learnings through industry contributions",
            "Build next-generation AI capabilities",
            "Lead AI transformation for partners and ecosystem",
        ],
    },
];

// 10-Question Maturity Assessment
export const maturityQuestions: MaturityQuestion[] = [
    {
        id: "q1",
        category: "strategy",
        question: "Does your organization have a formal AI strategy?",
        options: [
            { text: "No, we haven't discussed AI strategy", score: 1 },
            { text: "We're beginning to discuss it informally", score: 2 },
            { text: "We have a documented AI strategy", score: 3 },
            { text: "Our AI strategy is actively driving investments", score: 4 },
            { text: "AI is core to our business strategy and competitive advantage", score: 5 },
        ],
    },
    {
        id: "q2",
        category: "skills",
        question: "How would you describe AI skills across your workforce?",
        options: [
            { text: "Very few employees understand AI", score: 1 },
            { text: "Some individuals are self-learning AI tools", score: 2 },
            { text: "We have role-specific AI training programs", score: 3 },
            { text: "Most employees are AI-proficient in their roles", score: 4 },
            { text: "AI literacy is universal and continuously developed", score: 5 },
        ],
    },
    {
        id: "q3",
        category: "tools",
        question: "How are AI tools used in your organization?",
        options: [
            { text: "Minimal or no AI tool usage", score: 1 },
            { text: "Ad-hoc usage by individuals", score: 2 },
            { text: "Approved AI tools for specific use cases", score: 3 },
            { text: "AI tools integrated into core workflows", score: 4 },
            { text: "AI tools are essential to how we work", score: 5 },
        ],
    },
    {
        id: "q4",
        category: "governance",
        question: "What AI governance and policies exist?",
        options: [
            { text: "No AI-specific policies", score: 1 },
            { text: "Informal guidelines being developed", score: 2 },
            { text: "Documented policies for AI usage and data", score: 3 },
            { text: "Comprehensive governance framework in place", score: 4 },
            { text: "Mature governance with continuous improvement", score: 5 },
        ],
    },
    {
        id: "q5",
        category: "culture",
        question: "How do leaders view AI adoption?",
        options: [
            { text: "Skeptical or uninformed about AI", score: 1 },
            { text: "Curious but not actively engaged", score: 2 },
            { text: "Supportive and allocating resources", score: 3 },
            { text: "Championing AI transformation", score: 4 },
            { text: "Leading by example with AI-native practices", score: 5 },
        ],
    },
    {
        id: "q6",
        category: "skills",
        question: "How do product teams use AI in their work?",
        options: [
            { text: "Rarely or never", score: 1 },
            { text: "Occasionally for specific tasks", score: 2 },
            { text: "Regularly for research and documentation", score: 3 },
            { text: "Integrated throughout the product lifecycle", score: 4 },
            { text: "AI-first approach to product development", score: 5 },
        ],
    },
    {
        id: "q7",
        category: "tools",
        question: "How do you measure AI's impact on productivity?",
        options: [
            { text: "We don't measure AI impact", score: 1 },
            { text: "Anecdotal observations only", score: 2 },
            { text: "Some metrics for specific use cases", score: 3 },
            { text: "Systematic measurement across teams", score: 4 },
            { text: "Clear ROI tracking with continuous optimization", score: 5 },
        ],
    },
    {
        id: "q8",
        category: "governance",
        question: "How do you handle AI ethics and responsible use?",
        options: [
            { text: "Haven't addressed ethics formally", score: 1 },
            { text: "General awareness but no framework", score: 2 },
            { text: "Ethics guidelines documented and communicated", score: 3 },
            { text: "Ethics review integrated into AI deployments", score: 4 },
            { text: "Industry-leading responsible AI practices", score: 5 },
        ],
    },
    {
        id: "q9",
        category: "culture",
        question: "How do employees view AI in their daily work?",
        options: [
            { text: "Fear or resistance to AI", score: 1 },
            { text: "Cautious curiosity", score: 2 },
            { text: "Willing to adopt with guidance", score: 3 },
            { text: "Enthusiastic early adopters", score: 4 },
            { text: "AI-native mindset—can't imagine working without it", score: 5 },
        ],
    },
    {
        id: "q10",
        category: "strategy",
        question: "What's the scope of your AI training initiatives?",
        options: [
            { text: "No formal AI training", score: 1 },
            { text: "Voluntary, self-directed learning", score: 2 },
            { text: "Structured training for specific roles", score: 3 },
            { text: "Comprehensive training across all roles", score: 4 },
            { text: "Continuous AI upskilling with certifications", score: 5 },
        ],
    },
];

// Calculate maturity level from assessment answers
export function calculateMaturityLevel(answers: Record<string, number>): number {
    const scores = Object.values(answers);
    if (scores.length === 0) return 1;

    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(averageScore);
}

// Get maturity level details
export function getMaturityLevel(level: number): MaturityLevel {
    const clampedLevel = Math.max(1, Math.min(5, level));
    return maturityLevels[clampedLevel - 1];
}

// Get category breakdown from answers
export function getCategoryBreakdown(answers: Record<string, number>): Record<string, number> {
    const categories: Record<string, number[]> = {
        strategy: [],
        skills: [],
        tools: [],
        culture: [],
        governance: [],
    };

    maturityQuestions.forEach((q) => {
        if (answers[q.id] !== undefined) {
            categories[q.category].push(answers[q.id]);
        }
    });

    const result: Record<string, number> = {};
    Object.entries(categories).forEach(([category, scores]) => {
        if (scores.length > 0) {
            result[category] = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        }
    });

    return result;
}
