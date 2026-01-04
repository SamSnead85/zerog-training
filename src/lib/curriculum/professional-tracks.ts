// AI-Native Training V2.0 - Multi-Track Curriculum
// Comprehensive 5-Track Professional Transformation Program

export type TrackId = "developers" | "product-managers" | "business-analysts" | "project-managers" | "everyone" | "executives";
export type CertificationLevel = "foundation" | "professional" | "architect" | "essentials";

export interface LearningObjective {
    id: string;
    text: string;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    duration: string;
    subtopics?: string[];
    videoUrl?: string;
    imageAsset?: string;
}

export interface HandsOnProject {
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
}

export interface TrackModule {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    learningObjectives: LearningObjective[];
    topics: Topic[];
    handsOnProjects: HandsOnProject[];
}

export interface ProfessionalTrack {
    id: TrackId;
    title: string;
    headline: string;
    tagline: string;
    description: string;
    icon: string;
    color: string;
    certification: string;
    certificationCode: string;
    totalDuration: string;
    modules: TrackModule[];
    capstoneProject: {
        title: string;
        description: string;
        objectives: string[];
        deliverables: string[];
    };
}

// ============================================
// TRACK 2: AI-NATIVE FOR PRODUCT MANAGERS
// ============================================

export const productManagersTrack: ProfessionalTrack = {
    id: "product-managers",
    title: "AI-Native for Product Managers",
    headline: "Lead the AI Revolution: Become an AI-Native Product Manager",
    tagline: "Conceive, develop, and launch successful AI-powered products",
    description: "Based on the comprehensive IBM AI Product Manager curriculum, this track equips you with the skills to conceive, develop, and launch successful AI-powered products. Learn to build an AI product strategy, manage the AI product lifecycle, and use GenAI to 10x your effectiveness.",
    icon: "📊",
    color: "purple",
    certification: "AI-Native Product Manager",
    certificationCode: "ZGPM",
    totalDuration: "40-50 hours",
    modules: [
        {
            id: "pm-1",
            number: 1,
            title: "Product Management Foundations",
            subtitle: "The PM Lifecycle, Value Creation, and Stakeholder Collaboration",
            description: "Master the foundational principles of product management that serve as the bedrock for AI-enhanced practices. Understand the complete PM lifecycle from ideation to sunset, learn to quantify and communicate product value, and develop advanced stakeholder management skills.",
            duration: "5 hours",
            learningObjectives: [
                { id: "pm1-1", text: "Understand the complete product management lifecycle and key milestones" },
                { id: "pm1-2", text: "Master value proposition development and communication" },
                { id: "pm1-3", text: "Build effective stakeholder collaboration frameworks" },
                { id: "pm1-4", text: "Apply product discovery techniques to identify opportunities" },
            ],
            topics: [
                { id: "pm1-t1", title: "The Product Manager Role", description: "Defining the PM's responsibilities across organizations", duration: "1 hour", subtopics: ["PM vs PO vs PMM", "Cross-functional leadership", "Strategic vs tactical PM work"] },
                { id: "pm1-t2", title: "Product Lifecycle Management", description: "From ideation through growth, maturity, and sunset", duration: "1.5 hours", subtopics: ["Stage-gate processes", "Metrics at each stage", "Portfolio management"] },
                { id: "pm1-t3", title: "Value Creation & Measurement", description: "Quantifying product impact and ROI", duration: "1.5 hours", subtopics: ["Value proposition canvas", "Business model analysis", "Success metrics definition"] },
                { id: "pm1-t4", title: "Stakeholder Management", description: "Building alignment across the organization", duration: "1 hour", subtopics: ["Stakeholder mapping", "Communication strategies", "Managing competing priorities"] },
            ],
            handsOnProjects: [
                { id: "pm1-p1", title: "Stakeholder Map", description: "Create a comprehensive stakeholder map for a product initiative", difficulty: "beginner", duration: "1 hour" },
            ],
        },
        {
            id: "pm-2",
            number: 2,
            title: "AI & Generative AI Foundations",
            subtitle: "ML, Deep Learning, and GenAI from a Business Perspective",
            description: "Develop a strong conceptual understanding of AI technologies from a product perspective. Learn how machine learning, deep learning, and generative AI work—not to build them, but to effectively lead teams that do and make informed product decisions.",
            duration: "6 hours",
            learningObjectives: [
                { id: "pm2-1", text: "Explain AI, ML, and Deep Learning differences to stakeholders" },
                { id: "pm2-2", text: "Understand how LLMs and generative models work conceptually" },
                { id: "pm2-3", text: "Identify appropriate AI applications for business problems" },
                { id: "pm2-4", text: "Evaluate AI capabilities and limitations for product decisions" },
            ],
            topics: [
                { id: "pm2-t1", title: "AI/ML Fundamentals for PMs", description: "Understanding AI without needing to code", duration: "2 hours", subtopics: ["Supervised vs unsupervised learning", "Training data and model quality", "AI accuracy and confidence"] },
                { id: "pm2-t2", title: "Generative AI Landscape", description: "Text, image, video, and multimodal models", duration: "2 hours", subtopics: ["LLMs and how they work", "Diffusion models for images", "The API economy of AI"] },
                { id: "pm2-t3", title: "AI Capabilities Assessment", description: "Matching AI to business problems", duration: "2 hours", subtopics: ["When AI is the right solution", "Buy vs build vs fine-tune", "Technical feasibility assessment"] },
            ],
            handsOnProjects: [
                { id: "pm2-p1", title: "AI Opportunity Assessment", description: "Evaluate 5 business problems for AI suitability", difficulty: "intermediate", duration: "2 hours" },
            ],
        },
        {
            id: "pm-3",
            number: 3,
            title: "Prompt Engineering for Product Managers",
            subtitle: "Using AI for Research, User Stories, and Competitive Analysis",
            description: "Master prompt engineering techniques specifically designed for PM workflows. Learn to use AI for rapid market research, automated user story generation, competitive intelligence gathering, and stakeholder communication—multiplying your effectiveness.",
            duration: "6 hours",
            learningObjectives: [
                { id: "pm3-1", text: "Write effective prompts for PM-specific tasks" },
                { id: "pm3-2", text: "Use AI for market research and competitive analysis" },
                { id: "pm3-3", text: "Generate and refine user stories with AI assistance" },
                { id: "pm3-4", text: "Create stakeholder presentations using AI tools" },
            ],
            topics: [
                { id: "pm3-t1", title: "Prompt Engineering Fundamentals", description: "Core techniques for effective AI interaction", duration: "2 hours", subtopics: ["Zero-shot and few-shot prompting", "Chain-of-thought reasoning", "System prompts and personas"] },
                { id: "pm3-t2", title: "AI for Market Research", description: "Rapid intelligence gathering and synthesis", duration: "2 hours", subtopics: ["Competitive analysis prompts", "Market sizing with AI", "Trend identification"] },
                { id: "pm3-t3", title: "AI-Powered User Stories", description: "Generating and refining requirements", duration: "2 hours", subtopics: ["Story generation from interviews", "Acceptance criteria creation", "Edge case identification"] },
            ],
            handsOnProjects: [
                { id: "pm3-p1", title: "Competitive Landscape Report", description: "Generate a complete competitive analysis using AI", difficulty: "intermediate", duration: "3 hours" },
            ],
        },
        {
            id: "pm-4",
            number: 4,
            title: "AI Product Strategy & Roadmapping",
            subtitle: "Market Assessment, Business Cases, and AI-Centric Roadmaps",
            description: "Learn to develop comprehensive AI product strategies. This module covers market opportunity identification, building compelling business cases for AI investments, and creating roadmaps that account for the unique aspects of AI product development.",
            duration: "8 hours",
            learningObjectives: [
                { id: "pm4-1", text: "Identify and evaluate AI product opportunities" },
                { id: "pm4-2", text: "Build compelling business cases for AI investments" },
                { id: "pm4-3", text: "Create AI-centric product roadmaps with appropriate milestones" },
                { id: "pm4-4", text: "Manage uncertainty in AI product development" },
            ],
            topics: [
                { id: "pm4-t1", title: "AI Market Assessment", description: "Identifying opportunities in the AI landscape", duration: "2 hours", subtopics: ["Market sizing for AI products", "Competitive positioning", "Differentiation strategies"] },
                { id: "pm4-t2", title: "AI Business Case Development", description: "Building compelling investment proposals", duration: "3 hours", subtopics: ["ROI modeling for AI", "Risk assessment frameworks", "Stakeholder buy-in strategies"] },
                { id: "pm4-t3", title: "AI Product Roadmapping", description: "Planning for the unique aspects of AI development", duration: "3 hours", subtopics: ["Milestone definition for ML products", "Managing model iteration cycles", "Data dependency planning"] },
            ],
            handsOnProjects: [
                { id: "pm4-p1", title: "AI Product Roadmap", description: "Create a 12-month AI product roadmap with dependencies", difficulty: "advanced", duration: "4 hours" },
            ],
        },
        {
            id: "pm-5",
            number: 5,
            title: "Building AI-Powered Products",
            subtitle: "The AI Product Development Lifecycle and Data Science Collaboration",
            description: "Master the unique aspects of building AI-powered products. Learn to collaborate effectively with data science teams, define AI-specific success metrics, manage the iterative nature of ML development, and ensure your AI products deliver real value.",
            duration: "7 hours",
            learningObjectives: [
                { id: "pm5-1", text: "Manage the AI product development lifecycle effectively" },
                { id: "pm5-2", text: "Collaborate productively with data science teams" },
                { id: "pm5-3", text: "Define AI value propositions and success metrics" },
                { id: "pm5-4", text: "Handle the iterative nature of ML development" },
            ],
            topics: [
                { id: "pm5-t1", title: "AI Development Lifecycle", description: "From data collection to deployment", duration: "2 hours", subtopics: ["Data requirements gathering", "Model development phases", "Deployment and monitoring"] },
                { id: "pm5-t2", title: "Working with Data Science Teams", description: "Effective cross-functional collaboration", duration: "2.5 hours", subtopics: ["Speaking the DS language", "Requirement translation", "Managing expectations"] },
                { id: "pm5-t3", title: "AI Value Proposition", description: "Defining what AI success looks like", duration: "2.5 hours", subtopics: ["AI-specific metrics", "User experience for AI", "Handling model uncertainty"] },
            ],
            handsOnProjects: [
                { id: "pm5-p1", title: "AI PRD", description: "Write a complete PRD for an AI-powered feature", difficulty: "advanced", duration: "3 hours" },
            ],
        },
        {
            id: "pm-6",
            number: 6,
            title: "Supercharging the PM Role with GenAI",
            subtitle: "Daily PM Tasks Enhanced by ChatGPT, Gemini, and Copilot",
            description: "Transform your daily productivity with hands-on AI tool mastery. Learn to use ChatGPT, Gemini, and Copilot for writing PRDs, analyzing user feedback, creating presentations, and automating routine PM tasks—becoming 10x more effective.",
            duration: "5 hours",
            learningObjectives: [
                { id: "pm6-1", text: "Use AI tools for rapid PRD and spec creation" },
                { id: "pm6-2", text: "Analyze user feedback and survey data with AI" },
                { id: "pm6-3", text: "Create compelling presentations using AI" },
                { id: "pm6-4", text: "Automate routine PM workflows with AI assistance" },
            ],
            topics: [
                { id: "pm6-t1", title: "AI for Documentation", description: "PRDs, specs, and release notes", duration: "2 hours", subtopics: ["PRD generation and refinement", "Technical spec writing", "Changelog automation"] },
                { id: "pm6-t2", title: "AI for User Research", description: "Feedback analysis and insight generation", duration: "2 hours", subtopics: ["Survey analysis", "Interview synthesis", "Sentiment tracking"] },
                { id: "pm6-t3", title: "AI Productivity Stack", description: "Building your personal AI toolkit", duration: "1 hour", subtopics: ["Tool selection", "Workflow integration", "Best practices"] },
            ],
            handsOnProjects: [
                { id: "pm6-p1", title: "AI-Enhanced Sprint", description: "Complete one week of PM tasks using AI tools", difficulty: "intermediate", duration: "2 hours" },
            ],
        },
        {
            id: "pm-7",
            number: 7,
            title: "AI Ethics & Commercialization",
            subtitle: "Ethical Considerations, GTM Strategies, and Measuring AI ROI",
            description: "Navigate the critical ethical considerations of AI products and master go-to-market strategies specific to AI. Learn to measure and communicate AI ROI, handle bias and fairness concerns, and launch AI products successfully in the enterprise market.",
            duration: "5 hours",
            learningObjectives: [
                { id: "pm7-1", text: "Identify and mitigate ethical risks in AI products" },
                { id: "pm7-2", text: "Develop go-to-market strategies for AI products" },
                { id: "pm7-3", text: "Measure and communicate AI ROI effectively" },
                { id: "pm7-4", text: "Handle bias, fairness, and transparency concerns" },
            ],
            topics: [
                { id: "pm7-t1", title: "AI Ethics for PMs", description: "Responsible AI product development", duration: "2 hours", subtopics: ["Bias identification", "Fairness frameworks", "Transparency requirements"] },
                { id: "pm7-t2", title: "AI Go-to-Market", description: "Launching AI products successfully", duration: "2 hours", subtopics: ["Positioning AI products", "Managing expectations", "Building trust"] },
                { id: "pm7-t3", title: "AI ROI Measurement", description: "Demonstrating value to stakeholders", duration: "1 hour", subtopics: ["AI-specific KPIs", "Attribution models", "Executive reporting"] },
            ],
            handsOnProjects: [
                { id: "pm7-p1", title: "GTM Strategy", description: "Create a go-to-market plan for an AI product", difficulty: "advanced", duration: "3 hours" },
            ],
        },
    ],
    capstoneProject: {
        title: "AI Product Strategy & Launch Plan",
        description: "Develop a complete product strategy, roadmap, and business case for a new AI-powered product. This comprehensive capstone demonstrates mastery of all PM skills with AI enhancement.",
        objectives: [
            "Identify a market opportunity suitable for AI solution",
            "Develop comprehensive competitive analysis using AI tools",
            "Create detailed product requirements and roadmap",
            "Build compelling business case with ROI projections",
            "Design go-to-market strategy and launch plan",
        ],
        deliverables: [
            "Market opportunity analysis (AI-generated and refined)",
            "Product Requirements Document (PRD)",
            "12-month product roadmap",
            "Business case with financial projections",
            "Go-to-market strategy and launch timeline",
        ],
    },
};

// ============================================
// TRACK 3: AI-NATIVE FOR BUSINESS ANALYSTS
// ============================================

export const businessAnalystsTrack: ProfessionalTrack = {
    id: "business-analysts",
    title: "AI-Native for Business Analysts",
    headline: "From Data to Decisions: Become an AI-Native Business Analyst",
    tagline: "Deeper insights, automated analysis, strategic recommendations",
    description: "This track empowers Business Analysts to leverage AI for deeper insights, automated analysis, and more strategic recommendations. Learn to use AI for requirements engineering, predictive analytics, and process optimization.",
    icon: "📈",
    color: "emerald",
    certification: "AI-Native Business Analyst",
    certificationCode: "ZGBA",
    totalDuration: "30-40 hours",
    modules: [
        {
            id: "ba-1",
            number: 1,
            title: "AI Foundations for Business Analysis",
            subtitle: "Core AI Concepts and Their Application in BA Workflows",
            description: "Build a solid foundation in AI concepts specifically tailored for business analysts. Understand how AI can augment every phase of business analysis work, from requirements gathering to solution evaluation.",
            duration: "5 hours",
            learningObjectives: [
                { id: "ba1-1", text: "Understand AI/ML concepts relevant to business analysis" },
                { id: "ba1-2", text: "Identify AI augmentation opportunities in BA workflows" },
                { id: "ba1-3", text: "Evaluate AI tools for business analysis tasks" },
            ],
            topics: [
                { id: "ba1-t1", title: "AI for Business Professionals", description: "Core concepts without the technical jargon", duration: "2 hours" },
                { id: "ba1-t2", title: "The AI-Enhanced BA", description: "Where AI fits in the analysis lifecycle", duration: "1.5 hours" },
                { id: "ba1-t3", title: "AI Tool Landscape for BAs", description: "Survey of relevant AI tools and platforms", duration: "1.5 hours" },
            ],
            handsOnProjects: [
                { id: "ba1-p1", title: "AI Opportunity Map", description: "Map AI opportunities in your current BA workflow", difficulty: "beginner", duration: "1 hour" },
            ],
        },
        {
            id: "ba-2",
            number: 2,
            title: "AI-Powered Requirements Engineering",
            subtitle: "Using AI to Analyze Interviews, Generate Stories, and Find Gaps",
            description: "Transform your requirements engineering process with AI. Learn to automatically analyze stakeholder interviews, generate comprehensive user stories, identify requirement gaps, and ensure complete coverage.",
            duration: "8 hours",
            learningObjectives: [
                { id: "ba2-1", text: "Use AI to analyze and synthesize stakeholder interviews" },
                { id: "ba2-2", text: "Generate comprehensive user stories from various inputs" },
                { id: "ba2-3", text: "Identify requirement gaps and inconsistencies with AI" },
                { id: "ba2-4", text: "Create complete requirements documentation efficiently" },
            ],
            topics: [
                { id: "ba2-t1", title: "AI Interview Analysis", description: "Extracting insights from stakeholder conversations", duration: "2.5 hours" },
                { id: "ba2-t2", title: "Automated Story Generation", description: "From notes to user stories", duration: "3 hours" },
                { id: "ba2-t3", title: "Gap Analysis with AI", description: "Finding what's missing in requirements", duration: "2.5 hours" },
            ],
            handsOnProjects: [
                { id: "ba2-p1", title: "Requirements Suite", description: "Generate complete requirements from interview transcripts", difficulty: "intermediate", duration: "3 hours" },
            ],
        },
        {
            id: "ba-3",
            number: 3,
            title: "Predictive Analytics & Data Visualization",
            subtitle: "Forecasting Trends and Creating Data-Driven Narratives",
            description: "Leverage AI tools to move from descriptive to predictive analytics. Learn to forecast trends, create interactive dashboards, and generate compelling data-driven narratives that drive decision-making.",
            duration: "8 hours",
            learningObjectives: [
                { id: "ba3-1", text: "Use AI tools for trend forecasting and prediction" },
                { id: "ba3-2", text: "Create interactive dashboards with AI assistance" },
                { id: "ba3-3", text: "Generate data-driven narratives and insights" },
                { id: "ba3-4", text: "Present complex data in stakeholder-friendly formats" },
            ],
            topics: [
                { id: "ba3-t1", title: "Predictive Analytics Fundamentals", description: "From descriptive to predictive insights", duration: "3 hours" },
                { id: "ba3-t2", title: "AI-Enhanced Visualization", description: "Creating impactful dashboards", duration: "3 hours" },
                { id: "ba3-t3", title: "Data Storytelling with AI", description: "Generating narratives from numbers", duration: "2 hours" },
            ],
            handsOnProjects: [
                { id: "ba3-p1", title: "Predictive Dashboard", description: "Build an AI-enhanced analytics dashboard", difficulty: "intermediate", duration: "4 hours" },
            ],
        },
        {
            id: "ba-4",
            number: 4,
            title: "Process Mining & Optimization with AI",
            subtitle: "Identifying Bottlenecks and Automation Opportunities",
            description: "Use AI to analyze and optimize business processes. Learn process mining techniques, identify bottlenecks and inefficiencies, and recommend high-impact automation opportunities.",
            duration: "6 hours",
            learningObjectives: [
                { id: "ba4-1", text: "Apply process mining techniques using AI tools" },
                { id: "ba4-2", text: "Identify process bottlenecks and inefficiencies" },
                { id: "ba4-3", text: "Recommend automation opportunities with ROI analysis" },
            ],
            topics: [
                { id: "ba4-t1", title: "AI-Powered Process Mining", description: "Discovering process flows from data", duration: "2.5 hours" },
                { id: "ba4-t2", title: "Bottleneck Identification", description: "Finding inefficiencies automatically", duration: "2 hours" },
                { id: "ba4-t3", title: "Automation Opportunity Assessment", description: "Evaluating what to automate", duration: "1.5 hours" },
            ],
            handsOnProjects: [
                { id: "ba4-p1", title: "Process Optimization Report", description: "Analyze a process and recommend optimizations", difficulty: "advanced", duration: "3 hours" },
            ],
        },
        {
            id: "ba-5",
            number: 5,
            title: "Hands-On AI Tools for BAs",
            subtitle: "Practical Labs: Sentiment Analysis, Classification, and Market Analysis",
            description: "Get hands-on experience with AI tools specifically useful for business analysts. Complete practical labs in sentiment analysis, text classification, and market analysis using modern AI platforms.",
            duration: "6 hours",
            learningObjectives: [
                { id: "ba5-1", text: "Perform sentiment analysis on customer feedback" },
                { id: "ba5-2", text: "Classify and categorize text data automatically" },
                { id: "ba5-3", text: "Conduct AI-enhanced market analysis" },
            ],
            topics: [
                { id: "ba5-t1", title: "Sentiment Analysis", description: "Understanding customer and stakeholder sentiment", duration: "2 hours" },
                { id: "ba5-t2", title: "Text Classification", description: "Categorizing documents and feedback", duration: "2 hours" },
                { id: "ba5-t3", title: "Market Analysis with AI", description: "Competitive and market intelligence", duration: "2 hours" },
            ],
            handsOnProjects: [
                { id: "ba5-p1", title: "Customer Insight Report", description: "Analyze customer feedback using AI tools", difficulty: "intermediate", duration: "3 hours" },
            ],
        },
    ],
    capstoneProject: {
        title: "AI-Enhanced Business Analysis",
        description: "Conduct a complete business analysis for a new initiative using AI tools at every stage, from stakeholder analysis to solution recommendation.",
        objectives: [
            "Gather and analyze stakeholder requirements using AI",
            "Generate comprehensive user stories and acceptance criteria",
            "Perform predictive analysis on key business metrics",
            "Identify process optimization opportunities",
            "Present data-driven recommendations to stakeholders",
        ],
        deliverables: [
            "Stakeholder analysis and interview synthesis",
            "Complete requirements documentation",
            "Predictive analytics dashboard",
            "Process optimization recommendations",
            "Executive presentation with AI-generated insights",
        ],
    },
};

// ============================================
// TRACK 4: AI-NATIVE FOR PROJECT MANAGERS
// ============================================

export const projectManagersTrack: ProfessionalTrack = {
    id: "project-managers",
    title: "AI-Native for Project Managers",
    headline: "Deliver Faster, Smarter, Better: Become an AI-Native Project Manager",
    tagline: "Enhanced planning, risk mitigation, and supercharged productivity",
    description: "Based on curricula from PMI and Google, this track teaches Project Managers how to use AI to enhance planning, mitigate risks, and supercharge team productivity. Move from being a project administrator to a strategic, AI-powered leader.",
    icon: "📋",
    color: "amber",
    certification: "AI-Native Project Manager",
    certificationCode: "ZG-PjM",
    totalDuration: "25-35 hours",
    modules: [
        {
            id: "pjm-1",
            number: 1,
            title: "AI in the Project Lifecycle",
            subtitle: "Understanding AI Augmentation at Every Project Phase",
            description: "Understand how AI can augment and enhance every phase of project management. From initiation through closure, learn where AI provides the highest value and how to integrate it effectively into your PM practice.",
            duration: "4 hours",
            learningObjectives: [
                { id: "pjm1-1", text: "Identify AI augmentation opportunities across project phases" },
                { id: "pjm1-2", text: "Evaluate AI tools for project management" },
                { id: "pjm1-3", text: "Build an AI-enhanced PM toolkit" },
            ],
            topics: [
                { id: "pjm1-t1", title: "AI Across the Project Lifecycle", description: "From initiation to closure", duration: "2 hours" },
                { id: "pjm1-t2", title: "AI Tool Landscape for PMs", description: "Available tools and platforms", duration: "1 hour" },
                { id: "pjm1-t3", title: "Building Your AI PM Toolkit", description: "Selecting and integrating tools", duration: "1 hour" },
            ],
            handsOnProjects: [
                { id: "pjm1-p1", title: "AI PM Toolkit", description: "Design your personalized AI PM toolkit", difficulty: "beginner", duration: "1 hour" },
            ],
        },
        {
            id: "pjm-2",
            number: 2,
            title: "AI-Powered Planning & Scheduling",
            subtitle: "Automated Timelines, Resource Optimization, and Scenario Modeling",
            description: "Transform your project planning with AI. Learn to use AI for automated timeline generation, intelligent resource optimization, and what-if scenario modeling that accounts for real-world complexity.",
            duration: "7 hours",
            learningObjectives: [
                { id: "pjm2-1", text: "Generate project timelines using AI tools" },
                { id: "pjm2-2", text: "Optimize resource allocation with AI recommendations" },
                { id: "pjm2-3", text: "Perform what-if scenario modeling" },
                { id: "pjm2-4", text: "Create adaptive project plans" },
            ],
            topics: [
                { id: "pjm2-t1", title: "AI Timeline Generation", description: "From requirements to schedules", duration: "2.5 hours" },
                { id: "pjm2-t2", title: "Intelligent Resource Optimization", description: "Balancing capacity and demand", duration: "2.5 hours" },
                { id: "pjm2-t3", title: "Scenario Modeling", description: "What-if analysis with AI", duration: "2 hours" },
            ],
            handsOnProjects: [
                { id: "pjm2-p1", title: "AI Project Plan", description: "Generate a complete project plan using AI", difficulty: "intermediate", duration: "3 hours" },
            ],
        },
        {
            id: "pjm-3",
            number: 3,
            title: "Predictive Risk Management",
            subtitle: "AI-Powered Risk Forecasting, Mitigation, and Real-Time Alerts",
            description: "Leverage AI to move from reactive to predictive risk management. Learn to forecast project risks before they materialize, receive AI-generated mitigation strategies, and implement real-time risk monitoring.",
            duration: "6 hours",
            learningObjectives: [
                { id: "pjm3-1", text: "Forecast project risks using AI analysis" },
                { id: "pjm3-2", text: "Generate AI-recommended mitigation strategies" },
                { id: "pjm3-3", text: "Implement real-time risk monitoring" },
                { id: "pjm3-4", text: "Communicate risk status effectively" },
            ],
            topics: [
                { id: "pjm3-t1", title: "Predictive Risk Identification", description: "Forecasting risks before they happen", duration: "2 hours" },
                { id: "pjm3-t2", title: "AI Mitigation Strategies", description: "Automated response recommendations", duration: "2 hours" },
                { id: "pjm3-t3", title: "Real-Time Risk Dashboards", description: "Continuous monitoring and alerts", duration: "2 hours" },
            ],
            handsOnProjects: [
                { id: "pjm3-p1", title: "Risk Dashboard", description: "Build an AI-powered risk monitoring dashboard", difficulty: "intermediate", duration: "3 hours" },
            ],
        },
        {
            id: "pjm-4",
            number: 4,
            title: "Enhancing Team Productivity with AI",
            subtitle: "Meeting Assistants, Automated Reporting, and Workload Balancing",
            description: "Supercharge your team's productivity with AI tools. Learn to use AI meeting assistants, automate status reporting, balance workloads intelligently, and free up time for high-value strategic work.",
            duration: "5 hours",
            learningObjectives: [
                { id: "pjm4-1", text: "Implement AI meeting assistants effectively" },
                { id: "pjm4-2", text: "Automate project status reporting" },
                { id: "pjm4-3", text: "Balance team workloads with AI insights" },
                { id: "pjm4-4", text: "Reduce administrative burden through automation" },
            ],
            topics: [
                { id: "pjm4-t1", title: "AI Meeting Assistants", description: "Notes, actions, and follow-ups", duration: "1.5 hours" },
                { id: "pjm4-t2", title: "Automated Status Reporting", description: "From manual updates to AI summaries", duration: "2 hours" },
                { id: "pjm4-t3", title: "Intelligent Workload Balancing", description: "Optimizing team capacity", duration: "1.5 hours" },
            ],
            handsOnProjects: [
                { id: "pjm4-p1", title: "Productivity Stack", description: "Implement AI productivity tools for a project", difficulty: "intermediate", duration: "2 hours" },
            ],
        },
        {
            id: "pjm-5",
            number: 5,
            title: "AI for Scrum Masters (Agile Focus)",
            subtitle: "AI-Enhanced Sprint Planning, Retrospectives, and Team Analytics",
            description: "Specifically for Scrum Masters and Agile practitioners. Learn to use AI for enhanced sprint planning, automated retrospective analysis, velocity prediction, and team performance analytics.",
            duration: "5 hours",
            learningObjectives: [
                { id: "pjm5-1", text: "Enhance sprint planning with AI predictions" },
                { id: "pjm5-2", text: "Automate retrospective analysis and insights" },
                { id: "pjm5-3", text: "Predict and improve team velocity" },
                { id: "pjm5-4", text: "Use AI for continuous improvement" },
            ],
            topics: [
                { id: "pjm5-t1", title: "AI-Enhanced Sprint Planning", description: "Better estimation and commitment", duration: "2 hours" },
                { id: "pjm5-t2", title: "Automated Retrospective Analysis", description: "Finding patterns and improvements", duration: "1.5 hours" },
                { id: "pjm5-t3", title: "Team Performance Analytics", description: "Data-driven coaching", duration: "1.5 hours" },
            ],
            handsOnProjects: [
                { id: "pjm5-p1", title: "Agile AI Integration", description: "Implement AI tools in an agile team workflow", difficulty: "advanced", duration: "3 hours" },
            ],
        },
    ],
    capstoneProject: {
        title: "AI-Enhanced Project Transformation",
        description: "Re-plan an existing project using a full suite of AI tools, demonstrating improvements in timeline, budget, and risk assessment.",
        objectives: [
            "Analyze an existing project for AI enhancement opportunities",
            "Regenerate the project plan using AI tools",
            "Implement predictive risk management",
            "Demonstrate productivity improvements",
            "Present before/after comparison to stakeholders",
        ],
        deliverables: [
            "Before/after project timeline comparison",
            "AI-generated resource optimization plan",
            "Predictive risk dashboard",
            "Team productivity improvement metrics",
            "Executive presentation on AI transformation results",
        ],
    },
};

// ============================================
// TRACK 5: AI FOR EVERYONE
// ============================================

export const everyoneTrack: ProfessionalTrack = {
    id: "everyone",
    title: "AI for Everyone",
    headline: "Master the AI Toolkit: Essential Skills for the Modern Professional",
    tagline: "Foundational AI literacy for every role in your organization",
    description: "This foundational track is designed for all professionals in an organization. It provides the essential literacy and hands-on skills needed to use generative AI tools effectively, ethically, and productively in any role.",
    icon: "🌟",
    color: "blue",
    certification: "AI-Native Essentials",
    certificationCode: "ZGE",
    totalDuration: "12-15 hours",
    modules: [
        {
            id: "e-1",
            number: 1,
            title: "What is Generative AI?",
            subtitle: "A Beginner-Friendly Introduction to LLMs and AI Models",
            description: "Start your AI journey with a clear, jargon-free introduction to generative AI. Understand how Large Language Models work, explore text-to-image models, and learn the fundamentals that will make you an informed AI user.",
            duration: "3 hours",
            learningObjectives: [
                { id: "e1-1", text: "Explain what generative AI is and how it works" },
                { id: "e1-2", text: "Understand the difference between AI, ML, and GenAI" },
                { id: "e1-3", text: "Recognize the capabilities and limitations of AI" },
            ],
            topics: [
                { id: "e1-t1", title: "The AI Revolution", description: "What changed and why it matters", duration: "1 hour" },
                { id: "e1-t2", title: "How LLMs Work", description: "Simple explanation of complex technology", duration: "1 hour" },
                { id: "e1-t3", title: "The AI Landscape", description: "Text, image, and multimodal models", duration: "1 hour" },
            ],
            handsOnProjects: [
                { id: "e1-p1", title: "AI Exploration", description: "Try 5 different AI tools and compare them", difficulty: "beginner", duration: "1 hour" },
            ],
        },
        {
            id: "e-2",
            number: 2,
            title: "Prompt Engineering Fundamentals",
            subtitle: "Core Principles of Writing Effective Prompts",
            description: "Based on the DeepLearning.AI course, this module teaches the core principles of writing effective prompts. Learn to communicate clearly with AI, get better results, and avoid common mistakes.",
            duration: "4 hours",
            learningObjectives: [
                { id: "e2-1", text: "Write clear, effective prompts for AI tools" },
                { id: "e2-2", text: "Use formatting and structure to improve responses" },
                { id: "e2-3", text: "Iterate and refine prompts for better results" },
                { id: "e2-4", text: "Avoid common prompting mistakes" },
            ],
            topics: [
                { id: "e2-t1", title: "Prompting Principles", description: "The fundamentals of AI communication", duration: "1.5 hours" },
                { id: "e2-t2", title: "Structured Prompts", description: "Formatting for better results", duration: "1.5 hours" },
                { id: "e2-t3", title: "Iterative Refinement", description: "Getting from good to great", duration: "1 hour" },
            ],
            handsOnProjects: [
                { id: "e2-p1", title: "Prompt Challenge", description: "Complete 10 prompting challenges", difficulty: "beginner", duration: "1.5 hours" },
            ],
        },
        {
            id: "e-3",
            number: 3,
            title: "The Modern AI Toolkit in Practice",
            subtitle: "Hands-On Labs with ChatGPT, Claude, Gemini, and DALL-E",
            description: "Get hands-on experience with the AI tools you'll use every day. Complete practical labs using ChatGPT, Claude, Gemini, and DALL-E for common business tasks like writing emails, summarizing documents, creating presentations, and brainstorming.",
            duration: "4 hours",
            learningObjectives: [
                { id: "e3-1", text: "Use ChatGPT effectively for daily tasks" },
                { id: "e3-2", text: "Leverage Claude for analysis and writing" },
                { id: "e3-3", text: "Create images with DALL-E and similar tools" },
                { id: "e3-4", text: "Choose the right tool for each task" },
            ],
            topics: [
                { id: "e3-t1", title: "ChatGPT Mastery", description: "The most versatile AI assistant", duration: "1.5 hours" },
                { id: "e3-t2", title: "Claude for Analysis", description: "Long-form content and reasoning", duration: "1 hour" },
                { id: "e3-t3", title: "Visual AI Tools", description: "Creating images and graphics", duration: "1 hour" },
                { id: "e3-t4", title: "Choosing the Right Tool", description: "Matching tools to tasks", duration: "0.5 hours" },
            ],
            handsOnProjects: [
                { id: "e3-p1", title: "AI Work Day", description: "Complete a full day of tasks using AI assistance", difficulty: "beginner", duration: "2 hours" },
            ],
        },
        {
            id: "e-4",
            number: 4,
            title: "Responsible & Ethical AI Use",
            subtitle: "The Critical Do's and Don'ts of Using AI",
            description: "Understand the critical responsibilities that come with AI use. Learn about data privacy, avoiding bias, preventing misinformation, and using AI ethically and appropriately in a professional setting.",
            duration: "3 hours",
            learningObjectives: [
                { id: "e4-1", text: "Understand data privacy considerations with AI" },
                { id: "e4-2", text: "Recognize and avoid AI bias issues" },
                { id: "e4-3", text: "Prevent misinformation from AI outputs" },
                { id: "e4-4", text: "Apply ethical guidelines in AI use" },
            ],
            topics: [
                { id: "e4-t1", title: "Data Privacy & AI", description: "What not to share with AI tools", duration: "1 hour" },
                { id: "e4-t2", title: "Bias & Fairness", description: "Recognizing AI limitations", duration: "1 hour" },
                { id: "e4-t3", title: "Truth & Verification", description: "Avoiding AI hallucinations", duration: "1 hour" },
            ],
            handsOnProjects: [
                { id: "e4-p1", title: "Ethics Scenarios", description: "Navigate 5 ethical dilemma scenarios", difficulty: "beginner", duration: "1 hour" },
            ],
        },
    ],
    capstoneProject: {
        title: "AI-Enhanced Workflow",
        description: "Create and document a personal AI-enhanced workflow for your specific role, demonstrating productivity improvements.",
        objectives: [
            "Identify 5 daily tasks suitable for AI enhancement",
            "Implement AI tools for each task",
            "Measure and document productivity improvements",
            "Create a personal AI usage guide",
        ],
        deliverables: [
            "Personal AI workflow documentation",
            "Before/after productivity comparison",
            "AI tool selection rationale",
            "Personal best practices guide",
        ],
    },
};

// ============================================
// TRACK 6: AI TRANSFORMATION LEADERSHIP (EXECUTIVES)
// ============================================

export const executiveTrack: ProfessionalTrack = {
    id: "executives" as TrackId,
    title: "AI Transformation Leadership",
    headline: "Lead the AI Revolution: Strategic Leadership for Enterprise Transformation",
    tagline: "Drive AI adoption, measure ROI, and build an AI-native culture",
    description: "Designed for C-suite executives, VPs, and senior leaders driving AI transformation. This strategic track equips you to build enterprise AI strategy, establish governance frameworks, measure and communicate AI ROI, and lead the organizational change required for AI-native success.",
    icon: "🎯",
    color: "rose",
    certification: "AI Transformation Leader",
    certificationCode: "ZGTL",
    totalDuration: "8-10 hours",
    modules: [
        {
            id: "exec-1",
            number: 1,
            title: "The AI Transformation Imperative",
            subtitle: "Understanding Why AI-Native Organizations Win",
            description: "Understand the strategic imperative for AI transformation. Learn how AI-native organizations are outperforming competitors, the risks of delayed adoption, and how to assess your organization's readiness for transformation.",
            duration: "2 hours",
            learningObjectives: [
                { id: "exec1-1", text: "Articulate the business case for enterprise AI transformation" },
                { id: "exec1-2", text: "Identify competitive risks of delayed AI adoption" },
                { id: "exec1-3", text: "Assess organizational readiness for AI transformation" },
            ],
            topics: [
                { id: "exec1-t1", title: "The AI-Native Advantage", description: "How leaders are pulling ahead with AI", duration: "45 min" },
                { id: "exec1-t2", title: "Competitive Landscape Analysis", description: "What your competitors are doing with AI", duration: "45 min" },
                { id: "exec1-t3", title: "Readiness Assessment Framework", description: "Evaluating your organization's AI maturity", duration: "30 min" },
            ],
            handsOnProjects: [
                { id: "exec1-p1", title: "AI Readiness Report", description: "Assess your organization using the NATIVE framework", difficulty: "beginner", duration: "1 hour" },
            ],
        },
        {
            id: "exec-2",
            number: 2,
            title: "Building Enterprise AI Strategy",
            subtitle: "From Vision to Actionable Roadmap",
            description: "Develop a comprehensive enterprise AI strategy aligned with business objectives. Learn to prioritize AI initiatives, allocate resources effectively, and create roadmaps that deliver measurable value.",
            duration: "2.5 hours",
            learningObjectives: [
                { id: "exec2-1", text: "Develop an enterprise AI vision aligned with business strategy" },
                { id: "exec2-2", text: "Prioritize AI initiatives using value/complexity frameworks" },
                { id: "exec2-3", text: "Create phased AI transformation roadmaps" },
                { id: "exec2-4", text: "Allocate budget and resources for AI initiatives" },
            ],
            topics: [
                { id: "exec2-t1", title: "Strategic Vision Development", description: "Aligning AI with business objectives", duration: "45 min" },
                { id: "exec2-t2", title: "Initiative Prioritization", description: "Identifying high-value AI opportunities", duration: "45 min" },
                { id: "exec2-t3", title: "Roadmap Development", description: "Phased approach to transformation", duration: "30 min" },
                { id: "exec2-t4", title: "Investment Planning", description: "Budgeting for AI success", duration: "30 min" },
            ],
            handsOnProjects: [
                { id: "exec2-p1", title: "AI Strategy Blueprint", description: "Create a 12-month AI transformation roadmap", difficulty: "intermediate", duration: "1.5 hours" },
            ],
        },
        {
            id: "exec-3",
            number: 3,
            title: "AI Governance & Risk Management",
            subtitle: "Establishing Trust, Ethics, and Compliance Frameworks",
            description: "Build robust AI governance frameworks that address ethics, compliance, and risk. Learn to establish AI policies, manage bias and fairness concerns, and ensure responsible AI deployment across the enterprise.",
            duration: "2 hours",
            learningObjectives: [
                { id: "exec3-1", text: "Establish enterprise AI governance frameworks" },
                { id: "exec3-2", text: "Address AI ethics and responsible use requirements" },
                { id: "exec3-3", text: "Manage AI-specific risks and compliance needs" },
                { id: "exec3-4", text: "Create AI transparency and accountability policies" },
            ],
            topics: [
                { id: "exec3-t1", title: "AI Governance Foundations", description: "Building the governance structure", duration: "45 min" },
                { id: "exec3-t2", title: "Ethics & Responsible AI", description: "Principles for trustworthy AI", duration: "45 min" },
                { id: "exec3-t3", title: "Risk & Compliance", description: "Managing AI-specific risks", duration: "30 min" },
            ],
            handsOnProjects: [
                { id: "exec3-p1", title: "AI Governance Charter", description: "Draft an AI governance framework for your organization", difficulty: "intermediate", duration: "1 hour" },
            ],
        },
        {
            id: "exec-4",
            number: 4,
            title: "Measuring AI ROI & Value",
            subtitle: "Demonstrating Impact to Stakeholders and Boards",
            description: "Master the art of measuring and communicating AI value. Learn to define AI success metrics, build business cases that resonate with boards, and demonstrate tangible ROI from AI investments.",
            duration: "1.5 hours",
            learningObjectives: [
                { id: "exec4-1", text: "Define meaningful AI success metrics and KPIs" },
                { id: "exec4-2", text: "Calculate and demonstrate AI ROI" },
                { id: "exec4-3", text: "Present AI value to boards and stakeholders" },
            ],
            topics: [
                { id: "exec4-t1", title: "AI Metrics Framework", description: "Defining what success looks like", duration: "30 min" },
                { id: "exec4-t2", title: "ROI Calculation Methods", description: "Quantifying AI value", duration: "30 min" },
                { id: "exec4-t3", title: "Executive Communication", description: "Presenting AI impact to stakeholders", duration: "30 min" },
            ],
            handsOnProjects: [
                { id: "exec4-p1", title: "AI Value Dashboard", description: "Create an executive dashboard for AI metrics", difficulty: "beginner", duration: "45 min" },
            ],
        },
        {
            id: "exec-5",
            number: 5,
            title: "Leading AI Cultural Transformation",
            subtitle: "Building an AI-Native Organization",
            description: "Lead the cultural transformation required for AI success. Learn to overcome resistance, build AI champions across the organization, develop AI talent, and create a sustainable culture of AI innovation.",
            duration: "2 hours",
            learningObjectives: [
                { id: "exec5-1", text: "Lead organizational change for AI adoption" },
                { id: "exec5-2", text: "Build AI champions and centers of excellence" },
                { id: "exec5-3", text: "Develop AI talent and skills strategies" },
                { id: "exec5-4", text: "Create sustainable AI innovation culture" },
            ],
            topics: [
                { id: "exec5-t1", title: "Change Management for AI", description: "Overcoming resistance and building momentum", duration: "45 min" },
                { id: "exec5-t2", title: "Building AI Champions", description: "Creating advocates across the organization", duration: "30 min" },
                { id: "exec5-t3", title: "Talent & Skills Strategy", description: "Developing AI capabilities in your workforce", duration: "30 min" },
                { id: "exec5-t4", title: "Innovation Culture", description: "Sustaining AI-native practices", duration: "15 min" },
            ],
            handsOnProjects: [
                { id: "exec5-p1", title: "Transformation Playbook", description: "Create a change management plan for AI adoption", difficulty: "advanced", duration: "1 hour" },
            ],
        },
    ],
    capstoneProject: {
        title: "Enterprise AI Transformation Strategy",
        description: "Develop a complete executive presentation for AI transformation at your organization, including strategy, governance, ROI projections, and change management plan.",
        objectives: [
            "Assess current organizational AI maturity",
            "Develop comprehensive AI vision and strategy",
            "Create governance and risk framework",
            "Build business case with ROI projections",
            "Design change management and talent strategy",
        ],
        deliverables: [
            "Executive AI Strategy Presentation",
            "AI Transformation Roadmap (12-24 months)",
            "AI Governance Framework Document",
            "ROI Model and Business Case",
            "Change Management Playbook",
        ],
    },
};

// ============================================
// EXPORTS
// ============================================

export const allTracks: ProfessionalTrack[] = [
    productManagersTrack,
    businessAnalystsTrack,
    projectManagersTrack,
    everyoneTrack,
    executiveTrack,
];

export const getTrackById = (id: TrackId): ProfessionalTrack | undefined => {
    return allTracks.find(t => t.id === id);
};

export const getTrackColor = (color: string): string => {
    const colors: Record<string, string> = {
        purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
        emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
        amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
        blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
        rose: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
    };
    return colors[color] || colors.blue;
};
