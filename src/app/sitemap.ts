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
    ];

    // Insights/Thought Leadership pages (high priority for SEO)
    const insightPages = [
        { url: '/insights/native-sdlc-evolution', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-skills-gap-crisis', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/ai-fluency-new-literacy', priority: 0.85, changeFrequency: 'monthly' as const },
        { url: '/insights/why-ai-initiatives-fail', priority: 0.85, changeFrequency: 'monthly' as const },
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
        ...trainingPages,
        ...platformPages,
        ...companyPages,
        ...insightPages,
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
