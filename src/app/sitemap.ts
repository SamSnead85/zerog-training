import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://scalednative.com';
    const currentDate = new Date().toISOString();

    // Core pages - highest priority
    const corePages = [
        { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
        { url: '/training', priority: 0.95, changeFrequency: 'daily' as const },
        { url: '/native', priority: 0.95, changeFrequency: 'weekly' as const },
        { url: '/ai-native', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/enterprise', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/certifications', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/pricing', priority: 0.85, changeFrequency: 'weekly' as const },
    ];

    // SEO Landing Pages - HIGH PRIORITY for organic traffic
    const seoLandingPages = [
        // Primary AI Training Keywords
        { url: '/ai-training', priority: 0.95, changeFrequency: 'weekly' as const },
        { url: '/ai-native-training', priority: 0.95, changeFrequency: 'weekly' as const },
        { url: '/enterprise-ai-training', priority: 0.95, changeFrequency: 'weekly' as const },
        { url: '/prompt-engineering', priority: 0.95, changeFrequency: 'weekly' as const },

        // Competitor Alternative Keywords
        { url: '/udemy-alternative', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/coursera-alternative', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/linkedin-learning-alternative', priority: 0.9, changeFrequency: 'monthly' as const },

        // Use Case Keywords
        { url: '/ai-upskilling', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-workforce-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/generative-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/chatgpt-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // Industry Keywords
        { url: '/healthcare-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/financial-services-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // Role-based Keywords
        { url: '/ai-training-executives', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-managers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-developers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-sales', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-hr', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-marketing', priority: 0.8, changeFrequency: 'weekly' as const },

        // Certifications & Platform
        { url: '/ai-certifications', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/platform-features', priority: 0.8, changeFrequency: 'monthly' as const },

        // Extended Role-based Pages
        { url: '/ai-training-customer-service', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-operations', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-legal', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-business-analysts', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-project-managers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-product-managers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-finance', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-it', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-data-scientists', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-consultants', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-accountants', priority: 0.8, changeFrequency: 'weekly' as const },

        // Industry Verticals
        { url: '/government-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/manufacturing-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/retail-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/insurance-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/telecom-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/education-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/energy-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/logistics-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/real-estate-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/pharma-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/nonprofit-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/startup-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // AI Tool Training
        { url: '/claude-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/copilot-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/midjourney-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/microsoft-copilot-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/gemini-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/gpt-4-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-agent-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/rag-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // Solution Pages
        { url: '/case-studies', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/learning-paths', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-labs', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/small-business-ai-training', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-literacy-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/enterprise-solutions', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/team-ai-training', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-onboarding-training', priority: 0.8, changeFrequency: 'weekly' as const },

        // Regional Pages
        { url: '/ai-training-uk', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/ai-training-canada', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/ai-training-australia', priority: 0.8, changeFrequency: 'monthly' as const },

        // Creative & Specialist Roles
        { url: '/ai-training-writers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-designers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-researchers', priority: 0.8, changeFrequency: 'weekly' as const },

        // Specialty Training
        { url: '/ai-automation-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-ethics-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-security-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // Integration & Compliance
        { url: '/lms-integration', priority: 0.75, changeFrequency: 'monthly' as const },
        { url: '/sso-integration', priority: 0.75, changeFrequency: 'monthly' as const },
        { url: '/api', priority: 0.75, changeFrequency: 'monthly' as const },
        { url: '/training-analytics', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/soc-2', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/gdpr', priority: 0.7, changeFrequency: 'monthly' as const },

        // Additional Industries
        { url: '/construction-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/hospitality-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/agriculture-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/media-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/automotive-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/supply-chain-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/procurement-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // Additional Regions
        { url: '/ai-training-europe', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/ai-training-apac', priority: 0.8, changeFrequency: 'monthly' as const },

        // Additional Roles
        { url: '/ai-training-technical-writers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-qa', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-educators', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-architects', priority: 0.8, changeFrequency: 'weekly' as const },

        // Solutions & Programs
        { url: '/ai-readiness-assessment', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/pilot-program', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/champion-program', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/custom-training', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/implementation-services', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/webinars', priority: 0.75, changeFrequency: 'weekly' as const },
        { url: '/remote-team-training', priority: 0.8, changeFrequency: 'monthly' as const },

        // More Industries
        { url: '/banking-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/aerospace-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/mining-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ecommerce-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/cpg-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/life-sciences-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/sports-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/gaming-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // More Roles
        { url: '/ai-training-engineers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-analysts', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-trainers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-recruiters', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-social-media', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-ux-designers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/ai-training-security-professionals', priority: 0.8, changeFrequency: 'weekly' as const },

        // More Industries (Batch 2)
        { url: '/fashion-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/food-beverage-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/utilities-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/wealth-management-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/credit-union-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/professional-services-ai-training', priority: 0.85, changeFrequency: 'weekly' as const },

        // More Solutions
        { url: '/enterprise-genai-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-fluency-training', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/ai-learning-management', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/startup-team-training', priority: 0.8, changeFrequency: 'monthly' as const },
    ];

    // Training & Learning pages
    const trainingPages = [
        { url: '/training/sample-lesson', priority: 0.85, changeFrequency: 'weekly' as const },
        { url: '/training/everyone', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/training/business-analysts', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/training/project-managers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/training/product-managers', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/curriculum', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/certificates', priority: 0.75, changeFrequency: 'weekly' as const },
        { url: '/paths', priority: 0.75, changeFrequency: 'weekly' as const },
    ];

    // Platform & Features pages
    const platformPages = [
        { url: '/platform', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/methodology', priority: 0.75, changeFrequency: 'monthly' as const },
        { url: '/how-it-works', priority: 0.75, changeFrequency: 'monthly' as const },
        { url: '/tracks', priority: 0.7, changeFrequency: 'weekly' as const },
        { url: '/demo', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/tour', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/try', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Company pages
    const companyPages = [
        { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
        { url: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
        { url: '/careers', priority: 0.5, changeFrequency: 'weekly' as const },
        { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
        { url: '/security', priority: 0.5, changeFrequency: 'monthly' as const },
        { url: '/tutorial', priority: 0.6, changeFrequency: 'monthly' as const },
        { url: '/help', priority: 0.5, changeFrequency: 'monthly' as const },
        { url: '/team', priority: 0.5, changeFrequency: 'monthly' as const },
        { url: '/partners', priority: 0.5, changeFrequency: 'monthly' as const },
        { url: '/industries', priority: 0.6, changeFrequency: 'monthly' as const },
        { url: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
    ];

    // Insights/Thought Leadership pages (high priority for SEO)
    const insightPages = [
        { url: '/insights/native-sdlc-evolution', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-skills-gap-crisis', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-fluency-new-literacy', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/why-ai-initiatives-fail', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-native-transformation-guide', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/prompt-engineering-best-practices', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-training-roi-calculator', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/how-to-choose-ai-training-platform', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-skills-gap-statistics', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/enterprise-ai-adoption-roadmap', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/chatgpt-vs-claude', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/top-ai-skills-2025', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-training-metrics-kpis', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-governance-framework', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/build-vs-buy-ai-training', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-training-change-management', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/llm-selection-guide', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-training-budget-template', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-use-cases-by-department', priority: 0.8, changeFrequency: 'monthly' as const },
    ];

    // Comparison pages (for competitor keywords)
    const comparisonPages = [
        { url: '/compare/scalednative-vs-udemy', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/compare/scalednative-vs-coursera', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/compare/scalednative-vs-linkedin-learning', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/compare/scalednative-vs-pluralsight', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/compare/scalednative-vs-skillsoft', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Legal pages
    const legalPages = [
        { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
        { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    ];

    // Dashboard pages (lower priority but indexable for brand searches)
    const dashboardPages = [
        { url: '/dashboard', priority: 0.4, changeFrequency: 'daily' as const },
        { url: '/learning', priority: 0.4, changeFrequency: 'daily' as const },
        { url: '/login', priority: 0.3, changeFrequency: 'monthly' as const },
        { url: '/signup', priority: 0.5, changeFrequency: 'monthly' as const },
    ];

    const allPages = [
        ...corePages,
        ...seoLandingPages,
        ...trainingPages,
        ...platformPages,
        ...companyPages,
        ...insightPages,
        ...comparisonPages,
        ...legalPages,
        ...dashboardPages,
    ];

    return allPages.map((page) => ({
        url: `${baseUrl}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
