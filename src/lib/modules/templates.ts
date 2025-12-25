// Training Module Templates
// 50+ professional training module templates organized by category

export type ModuleCategory =
    | 'leadership'
    | 'compliance'
    | 'technology'
    | 'soft_skills'
    | 'onboarding'
    | 'safety'
    | 'customer_service'
    | 'sales'
    | 'project_management'
    | 'diversity_inclusion';

export type ModuleDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type BloomLevel =
    | 'remember'
    | 'understand'
    | 'apply'
    | 'analyze'
    | 'evaluate'
    | 'create';

export interface ModuleTemplate {
    id: string;
    title: string;
    description: string;
    category: ModuleCategory;
    difficulty: ModuleDifficulty;
    estimatedDuration: number; // in minutes
    bloomLevels: BloomLevel[];
    learningObjectives: string[];
    prerequisites?: string[];
    targetAudience: string[];
    keywords: string[];
    hasSimulation: boolean;
    simulationType?: 'software_interface' | 'scenario_branching' | 'ai_roleplay' | 'assessment';
    isCustomizable: boolean;
    isPremium: boolean;
}

// =============================================================================
// LEADERSHIP & MANAGEMENT
// =============================================================================

export const leadershipModules: ModuleTemplate[] = [
    {
        id: 'leadership-fundamentals',
        title: 'Leadership Fundamentals',
        description: 'Core leadership principles for emerging leaders. Covers vision-setting, team motivation, and decision-making frameworks.',
        category: 'leadership',
        difficulty: 'beginner',
        estimatedDuration: 45,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Define key leadership qualities and styles',
            'Apply situational leadership techniques',
            'Create a personal leadership development plan',
        ],
        targetAudience: ['New managers', 'Team leads', 'Aspiring leaders'],
        keywords: ['leadership', 'management', 'team building', 'motivation'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'effective-feedback',
        title: 'Giving and Receiving Feedback',
        description: 'Master the art of constructive feedback using proven frameworks like SBI (Situation-Behavior-Impact).',
        category: 'leadership',
        difficulty: 'intermediate',
        estimatedDuration: 30,
        bloomLevels: ['understand', 'apply', 'evaluate'],
        learningObjectives: [
            'Apply the SBI feedback model',
            'Deliver difficult feedback with empathy',
            'Receive feedback without defensiveness',
        ],
        targetAudience: ['Managers', 'Team leads', 'HR professionals'],
        keywords: ['feedback', 'communication', 'performance management'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'remote-team-management',
        title: 'Managing Remote & Hybrid Teams',
        description: 'Strategies for leading distributed teams effectively. Communication, trust-building, and maintaining culture across distances.',
        category: 'leadership',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['understand', 'apply', 'analyze'],
        learningObjectives: [
            'Establish effective remote communication norms',
            'Build trust and accountability in distributed teams',
            'Maintain team culture across locations',
        ],
        targetAudience: ['Remote managers', 'Hybrid team leads'],
        keywords: ['remote work', 'hybrid', 'virtual teams', 'communication'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'conflict-resolution',
        title: 'Conflict Resolution for Managers',
        description: 'Transform workplace conflicts into opportunities for growth. Learn mediation techniques and preventive strategies.',
        category: 'leadership',
        difficulty: 'advanced',
        estimatedDuration: 50,
        bloomLevels: ['analyze', 'evaluate', 'apply'],
        learningObjectives: [
            'Identify conflict sources and escalation patterns',
            'Apply mediation techniques effectively',
            'Create team agreements that prevent conflicts',
        ],
        targetAudience: ['Managers', 'HR professionals', 'Team leads'],
        keywords: ['conflict', 'mediation', 'team dynamics'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: true,
    },
    {
        id: 'performance-reviews',
        title: 'Conducting Effective Performance Reviews',
        description: 'Create meaningful performance conversations that drive development and motivation.',
        category: 'leadership',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        bloomLevels: ['understand', 'apply', 'evaluate'],
        learningObjectives: [
            'Structure productive performance review conversations',
            'Set SMART goals collaboratively',
            'Document performance effectively',
        ],
        targetAudience: ['Managers', 'HR professionals'],
        keywords: ['performance', 'reviews', 'goals', 'development'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// COMPLIANCE & REGULATORY
// =============================================================================

export const complianceModules: ModuleTemplate[] = [
    {
        id: 'hipaa-essentials',
        title: 'HIPAA Essentials for Healthcare',
        description: 'Comprehensive HIPAA training covering PHI protection, patient rights, and breach prevention. Meets annual training requirements.',
        category: 'compliance',
        difficulty: 'beginner',
        estimatedDuration: 60,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Identify what constitutes Protected Health Information (PHI)',
            'Apply the minimum necessary standard',
            'Report potential HIPAA violations correctly',
        ],
        targetAudience: ['Healthcare workers', 'Administrative staff', 'IT personnel'],
        keywords: ['HIPAA', 'PHI', 'healthcare', 'privacy', 'compliance'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'gdpr-fundamentals',
        title: 'GDPR Data Protection',
        description: 'Understanding EU data protection requirements. Covers data subject rights, lawful processing, and cross-border transfers.',
        category: 'compliance',
        difficulty: 'intermediate',
        estimatedDuration: 45,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Explain the eight data subject rights under GDPR',
            'Identify lawful bases for data processing',
            'Apply data minimization principles',
        ],
        targetAudience: ['All employees handling EU data', 'IT staff', 'Marketing teams'],
        keywords: ['GDPR', 'data protection', 'privacy', 'EU', 'compliance'],
        hasSimulation: true,
        simulationType: 'assessment',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'anti-harassment',
        title: 'Preventing Workplace Harassment',
        description: 'Creating a respectful workplace free from harassment and discrimination. Includes bystander intervention training.',
        category: 'compliance',
        difficulty: 'beginner',
        estimatedDuration: 45,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Recognize forms of workplace harassment',
            'Understand reporting procedures',
            'Apply bystander intervention techniques',
        ],
        targetAudience: ['All employees'],
        keywords: ['harassment', 'discrimination', 'workplace', 'respect'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'information-security',
        title: 'Information Security Awareness',
        description: 'Protect organizational data from cyber threats. Covers phishing, password security, and social engineering.',
        category: 'compliance',
        difficulty: 'beginner',
        estimatedDuration: 40,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Identify phishing attempts and social engineering',
            'Create and manage strong passwords',
            'Report security incidents appropriately',
        ],
        targetAudience: ['All employees'],
        keywords: ['security', 'cybersecurity', 'phishing', 'passwords'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'anti-bribery-corruption',
        title: 'Anti-Bribery & Corruption',
        description: 'Navigate ethical challenges in business dealings. Covers FCPA, UK Bribery Act, and gift policies.',
        category: 'compliance',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Recognize situations that may constitute bribery',
            'Apply gift and entertainment policies',
            'Report concerns through appropriate channels',
        ],
        targetAudience: ['Sales', 'Procurement', 'Leadership'],
        keywords: ['bribery', 'corruption', 'ethics', 'FCPA'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'soc2-awareness',
        title: 'SOC 2 Security Awareness',
        description: 'Understanding SOC 2 trust principles and your role in maintaining compliance.',
        category: 'compliance',
        difficulty: 'intermediate',
        estimatedDuration: 30,
        bloomLevels: ['remember', 'understand'],
        learningObjectives: [
            'Explain the five SOC 2 trust principles',
            'Identify your responsibilities in security controls',
            'Document incidents and access appropriately',
        ],
        targetAudience: ['Tech companies', 'SaaS providers', 'IT staff'],
        keywords: ['SOC 2', 'security', 'trust', 'audit'],
        hasSimulation: false,
        isCustomizable: true,
        isPremium: true,
    },
];

// =============================================================================
// TECHNOLOGY & TOOLS
// =============================================================================

export const technologyModules: ModuleTemplate[] = [
    {
        id: 'microsoft-365-essentials',
        title: 'Microsoft 365 Productivity Suite',
        description: 'Master Teams, Outlook, SharePoint, and OneDrive for maximum productivity.',
        category: 'technology',
        difficulty: 'beginner',
        estimatedDuration: 60,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Navigate Microsoft Teams effectively',
            'Organize email and calendar in Outlook',
            'Collaborate using SharePoint and OneDrive',
        ],
        targetAudience: ['All employees', 'New hires'],
        keywords: ['Microsoft', 'Teams', 'Outlook', 'productivity'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'salesforce-basics',
        title: 'Salesforce CRM Fundamentals',
        description: 'Navigate Salesforce to manage leads, contacts, and opportunities effectively.',
        category: 'technology',
        difficulty: 'beginner',
        estimatedDuration: 50,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Navigate the Salesforce interface',
            'Create and manage leads and contacts',
            'Track opportunities through the sales pipeline',
        ],
        targetAudience: ['Sales representatives', 'Account managers'],
        keywords: ['Salesforce', 'CRM', 'sales', 'leads'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'jira-project-management',
        title: 'Jira for Project Management',
        description: 'Use Jira to plan sprints, track issues, and deliver projects on time.',
        category: 'technology',
        difficulty: 'intermediate',
        estimatedDuration: 45,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Create and manage Jira projects and boards',
            'Plan and execute sprints effectively',
            'Use filters and dashboards for insights',
        ],
        targetAudience: ['Project managers', 'Developers', 'Product teams'],
        keywords: ['Jira', 'agile', 'project management', 'sprints'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'slack-collaboration',
        title: 'Effective Slack Communication',
        description: 'Master Slack for team communication without the noise and distraction.',
        category: 'technology',
        difficulty: 'beginner',
        estimatedDuration: 25,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Organize channels and notifications effectively',
            'Use threads and reactions appropriately',
            'Integrate apps for productivity',
        ],
        targetAudience: ['All employees'],
        keywords: ['Slack', 'communication', 'messaging', 'collaboration'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'ai-tools-workplace',
        title: 'AI Tools in the Workplace',
        description: 'Leverage AI assistants like ChatGPT, Copilot, and Claude responsibly and effectively.',
        category: 'technology',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['understand', 'apply', 'evaluate'],
        learningObjectives: [
            'Write effective prompts for AI assistants',
            'Identify appropriate use cases for AI tools',
            'Avoid common pitfalls and security risks',
        ],
        targetAudience: ['Knowledge workers', 'All employees'],
        keywords: ['AI', 'ChatGPT', 'Copilot', 'productivity'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: true,
    },
];

// =============================================================================
// SOFT SKILLS
// =============================================================================

export const softSkillsModules: ModuleTemplate[] = [
    {
        id: 'effective-communication',
        title: 'Effective Communication Skills',
        description: 'Clear, concise, and impactful communication in any situation.',
        category: 'soft_skills',
        difficulty: 'beginner',
        estimatedDuration: 35,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Structure messages for clarity and impact',
            'Adapt communication style to audience',
            'Practice active listening techniques',
        ],
        targetAudience: ['All employees'],
        keywords: ['communication', 'listening', 'clarity', 'presentation'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'time-management',
        title: 'Time Management & Productivity',
        description: 'Take control of your time with proven prioritization and focus techniques.',
        category: 'soft_skills',
        difficulty: 'beginner',
        estimatedDuration: 30,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Apply prioritization frameworks (Eisenhower, etc.)',
            'Minimize distractions and deep work',
            'Plan effectively using time-blocking',
        ],
        targetAudience: ['All employees'],
        keywords: ['time management', 'productivity', 'prioritization', 'focus'],
        hasSimulation: false,
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'emotional-intelligence',
        title: 'Emotional Intelligence at Work',
        description: 'Develop self-awareness and social skills for better relationships and outcomes.',
        category: 'soft_skills',
        difficulty: 'intermediate',
        estimatedDuration: 45,
        bloomLevels: ['understand', 'apply', 'analyze'],
        learningObjectives: [
            'Recognize and manage your own emotions',
            'Read emotional cues in others',
            'Navigate difficult conversations with empathy',
        ],
        targetAudience: ['All employees', 'Leaders'],
        keywords: ['emotional intelligence', 'EQ', 'empathy', 'self-awareness'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'presentation-skills',
        title: 'Presentation Skills Mastery',
        description: 'Deliver compelling presentations that engage and persuade any audience.',
        category: 'soft_skills',
        difficulty: 'intermediate',
        estimatedDuration: 50,
        bloomLevels: ['understand', 'apply', 'create'],
        learningObjectives: [
            'Structure presentations for maximum impact',
            'Overcome presentation anxiety',
            'Use visual aids effectively',
        ],
        targetAudience: ['All employees'],
        keywords: ['presentations', 'public speaking', 'storytelling'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'critical-thinking',
        title: 'Critical Thinking & Problem Solving',
        description: 'Analyze problems systematically and make better decisions.',
        category: 'soft_skills',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['analyze', 'evaluate', 'apply'],
        learningObjectives: [
            'Apply structured problem-solving frameworks',
            'Identify cognitive biases in decision-making',
            'Evaluate evidence and arguments objectively',
        ],
        targetAudience: ['All employees', 'Leaders'],
        keywords: ['critical thinking', 'problem solving', 'decision making'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// ONBOARDING
// =============================================================================

export const onboardingModules: ModuleTemplate[] = [
    {
        id: 'new-hire-orientation',
        title: 'New Employee Orientation',
        description: 'Welcome to the team! Everything you need to know to get started.',
        category: 'onboarding',
        difficulty: 'beginner',
        estimatedDuration: 60,
        bloomLevels: ['remember', 'understand'],
        learningObjectives: [
            'Navigate company resources and tools',
            'Understand organizational structure',
            'Know key policies and procedures',
        ],
        targetAudience: ['New hires'],
        keywords: ['onboarding', 'orientation', 'new hire', 'welcome'],
        hasSimulation: false,
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'it-systems-onboarding',
        title: 'IT Systems & Tools Setup',
        description: 'Get up and running with all the technology you need.',
        category: 'onboarding',
        difficulty: 'beginner',
        estimatedDuration: 45,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Set up essential accounts and access',
            'Navigate core business systems',
            'Know how to get IT support',
        ],
        targetAudience: ['New hires'],
        keywords: ['IT', 'technology', 'setup', 'onboarding'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'first-90-days',
        title: 'Your First 90 Days Success Plan',
        description: 'A roadmap to make an impact in your first three months.',
        category: 'onboarding',
        difficulty: 'beginner',
        estimatedDuration: 30,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Set meaningful 30/60/90 day goals',
            'Build key relationships quickly',
            'Avoid common new hire mistakes',
        ],
        targetAudience: ['New hires'],
        keywords: ['90 days', 'success', 'onboarding', 'goals'],
        hasSimulation: false,
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// SAFETY
// =============================================================================

export const safetyModules: ModuleTemplate[] = [
    {
        id: 'workplace-safety-essentials',
        title: 'Workplace Safety Essentials',
        description: 'Fundamental safety practices to prevent accidents and injuries.',
        category: 'safety',
        difficulty: 'beginner',
        estimatedDuration: 40,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Identify common workplace hazards',
            'Use safety equipment correctly',
            'Report incidents and near-misses',
        ],
        targetAudience: ['All employees'],
        keywords: ['safety', 'hazards', 'prevention', 'OSHA'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'ergonomics',
        title: 'Ergonomics for Office Workers',
        description: 'Set up your workspace to prevent strain and injury.',
        category: 'safety',
        difficulty: 'beginner',
        estimatedDuration: 25,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Set up an ergonomic workstation',
            'Practice healthy posture habits',
            'Incorporate movement into your workday',
        ],
        targetAudience: ['Office workers', 'Remote workers'],
        keywords: ['ergonomics', 'posture', 'workstation', 'health'],
        hasSimulation: false,
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'emergency-response',
        title: 'Emergency Response Procedures',
        description: 'Know what to do in fire, medical, and other emergencies.',
        category: 'safety',
        difficulty: 'beginner',
        estimatedDuration: 35,
        bloomLevels: ['remember', 'understand', 'apply'],
        learningObjectives: [
            'Execute evacuation procedures correctly',
            'Respond to medical emergencies',
            'Use emergency equipment appropriately',
        ],
        targetAudience: ['All employees'],
        keywords: ['emergency', 'evacuation', 'fire', 'first aid'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// CUSTOMER SERVICE
// =============================================================================

export const customerServiceModules: ModuleTemplate[] = [
    {
        id: 'customer-service-excellence',
        title: 'Customer Service Excellence',
        description: 'Deliver exceptional customer experiences that build loyalty.',
        category: 'customer_service',
        difficulty: 'beginner',
        estimatedDuration: 45,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Apply the customer service mindset',
            'Handle inquiries efficiently and warmly',
            'Turn complaints into opportunities',
        ],
        targetAudience: ['Customer service reps', 'Front-line staff'],
        keywords: ['customer service', 'experience', 'satisfaction'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'difficult-customers',
        title: 'Handling Difficult Customers',
        description: 'De-escalate tense situations and turn angry customers around.',
        category: 'customer_service',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['understand', 'apply', 'evaluate'],
        learningObjectives: [
            'Recognize escalation triggers',
            'Apply de-escalation techniques',
            'Set appropriate boundaries professionally',
        ],
        targetAudience: ['Customer service reps', 'Managers'],
        keywords: ['difficult customers', 'de-escalation', 'conflict'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: true,
    },
    {
        id: 'phone-etiquette',
        title: 'Professional Phone Etiquette',
        description: 'Project professionalism in every phone interaction.',
        category: 'customer_service',
        difficulty: 'beginner',
        estimatedDuration: 25,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Answer and transfer calls professionally',
            'Use active listening on calls',
            'Handle holds and voicemails appropriately',
        ],
        targetAudience: ['All employees with phone responsibilities'],
        keywords: ['phone', 'etiquette', 'communication', 'professional'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// SALES
// =============================================================================

export const salesModules: ModuleTemplate[] = [
    {
        id: 'consultative-selling',
        title: 'Consultative Selling Techniques',
        description: 'Sell by solving problems, not pushing products.',
        category: 'sales',
        difficulty: 'intermediate',
        estimatedDuration: 50,
        bloomLevels: ['understand', 'apply', 'analyze'],
        learningObjectives: [
            'Uncover customer needs through effective questioning',
            'Position solutions to address specific pain points',
            'Build long-term customer relationships',
        ],
        targetAudience: ['Sales representatives', 'Account executives'],
        keywords: ['sales', 'consultative', 'selling', 'relationships'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'objection-handling',
        title: 'Mastering Objection Handling',
        description: 'Turn objections into opportunities to close.',
        category: 'sales',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Anticipate common objections',
            'Apply objection handling frameworks',
            'Maintain rapport during objections',
        ],
        targetAudience: ['Sales representatives'],
        keywords: ['objections', 'sales', 'closing', 'negotiation'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'product-demos',
        title: 'Delivering Compelling Product Demos',
        description: 'Demonstrate value, not features.',
        category: 'sales',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['understand', 'apply', 'create'],
        learningObjectives: [
            'Structure demos around customer outcomes',
            'Handle questions and technical issues gracefully',
            'Close demos with clear next steps',
        ],
        targetAudience: ['Sales engineers', 'Account executives'],
        keywords: ['demos', 'presentations', 'sales', 'product'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: true,
    },
];

// =============================================================================
// PROJECT MANAGEMENT
// =============================================================================

export const projectManagementModules: ModuleTemplate[] = [
    {
        id: 'project-management-fundamentals',
        title: 'Project Management Fundamentals',
        description: 'Core skills for managing projects of any size.',
        category: 'project_management',
        difficulty: 'beginner',
        estimatedDuration: 50,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Define project scope and objectives',
            'Create work breakdown structures',
            'Track progress and manage changes',
        ],
        targetAudience: ['Project managers', 'Team leads'],
        keywords: ['project management', 'planning', 'scope', 'WBS'],
        hasSimulation: true,
        simulationType: 'software_interface',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'agile-scrum',
        title: 'Agile & Scrum Methodology',
        description: 'Work iteratively and deliver value faster.',
        category: 'project_management',
        difficulty: 'intermediate',
        estimatedDuration: 60,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Understand agile principles and values',
            'Run effective scrum ceremonies',
            'Manage product backlogs and sprints',
        ],
        targetAudience: ['Scrum masters', 'Product owners', 'Dev teams'],
        keywords: ['agile', 'scrum', 'sprints', 'backlogs'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'stakeholder-management',
        title: 'Stakeholder Management',
        description: 'Keep stakeholders informed, aligned, and supportive.',
        category: 'project_management',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        bloomLevels: ['understand', 'apply', 'analyze'],
        learningObjectives: [
            'Identify and map stakeholders',
            'Develop stakeholder communication plans',
            'Manage expectations and conflicts',
        ],
        targetAudience: ['Project managers', 'Product managers'],
        keywords: ['stakeholders', 'communication', 'management'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// DIVERSITY & INCLUSION
// =============================================================================

export const diversityModules: ModuleTemplate[] = [
    {
        id: 'unconscious-bias',
        title: 'Understanding Unconscious Bias',
        description: 'Recognize and counteract biases that affect decisions.',
        category: 'diversity_inclusion',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        bloomLevels: ['understand', 'analyze', 'apply'],
        learningObjectives: [
            'Identify common types of unconscious bias',
            'Recognize bias in decision-making',
            'Apply strategies to counteract bias',
        ],
        targetAudience: ['All employees', 'Hiring managers'],
        keywords: ['bias', 'diversity', 'inclusion', 'unconscious'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
    {
        id: 'inclusive-leadership',
        title: 'Inclusive Leadership',
        description: 'Create environments where everyone can thrive.',
        category: 'diversity_inclusion',
        difficulty: 'intermediate',
        estimatedDuration: 45,
        bloomLevels: ['understand', 'apply', 'evaluate'],
        learningObjectives: [
            'Model inclusive behaviors consistently',
            'Foster psychological safety in teams',
            'Address microaggressions appropriately',
        ],
        targetAudience: ['Leaders', 'Managers'],
        keywords: ['inclusion', 'leadership', 'belonging', 'diversity'],
        hasSimulation: true,
        simulationType: 'ai_roleplay',
        isCustomizable: true,
        isPremium: true,
    },
    {
        id: 'allyship-action',
        title: 'Allyship in Action',
        description: 'Be an active ally for underrepresented colleagues.',
        category: 'diversity_inclusion',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        bloomLevels: ['understand', 'apply'],
        learningObjectives: [
            'Understand the role and impact of allies',
            'Recognize opportunities for allyship',
            'Take concrete actions as an ally',
        ],
        targetAudience: ['All employees'],
        keywords: ['allyship', 'support', 'diversity', 'action'],
        hasSimulation: true,
        simulationType: 'scenario_branching',
        isCustomizable: true,
        isPremium: false,
    },
];

// =============================================================================
// ALL MODULES COMBINED
// =============================================================================

export const allModuleTemplates: ModuleTemplate[] = [
    ...leadershipModules,
    ...complianceModules,
    ...technologyModules,
    ...softSkillsModules,
    ...onboardingModules,
    ...safetyModules,
    ...customerServiceModules,
    ...salesModules,
    ...projectManagementModules,
    ...diversityModules,
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getModulesByCategory(category: ModuleCategory): ModuleTemplate[] {
    return allModuleTemplates.filter((m) => m.category === category);
}

export function getModuleById(id: string): ModuleTemplate | undefined {
    return allModuleTemplates.find((m) => m.id === id);
}

export function searchModules(query: string): ModuleTemplate[] {
    const lowerQuery = query.toLowerCase();
    return allModuleTemplates.filter(
        (m) =>
            m.title.toLowerCase().includes(lowerQuery) ||
            m.description.toLowerCase().includes(lowerQuery) ||
            m.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    );
}

export function getModulesWithSimulation(): ModuleTemplate[] {
    return allModuleTemplates.filter((m) => m.hasSimulation);
}

export function getPremiumModules(): ModuleTemplate[] {
    return allModuleTemplates.filter((m) => m.isPremium);
}

export function getFreeModules(): ModuleTemplate[] {
    return allModuleTemplates.filter((m) => !m.isPremium);
}

export function getModulesByDifficulty(difficulty: ModuleDifficulty): ModuleTemplate[] {
    return allModuleTemplates.filter((m) => m.difficulty === difficulty);
}

export const MODULE_CATEGORIES: { value: ModuleCategory; label: string; icon: string }[] = [
    { value: 'leadership', label: 'Leadership & Management', icon: 'Crown' },
    { value: 'compliance', label: 'Compliance & Regulatory', icon: 'Shield' },
    { value: 'technology', label: 'Technology & Tools', icon: 'Laptop' },
    { value: 'soft_skills', label: 'Soft Skills', icon: 'Users' },
    { value: 'onboarding', label: 'Onboarding', icon: 'UserPlus' },
    { value: 'safety', label: 'Safety', icon: 'HardHat' },
    { value: 'customer_service', label: 'Customer Service', icon: 'Headphones' },
    { value: 'sales', label: 'Sales', icon: 'TrendingUp' },
    { value: 'project_management', label: 'Project Management', icon: 'ClipboardList' },
    { value: 'diversity_inclusion', label: 'Diversity & Inclusion', icon: 'Heart' },
];
