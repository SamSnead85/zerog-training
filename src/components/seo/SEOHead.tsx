"use client";

/**
 * SEO Head Component
 * 
 * Manages meta tags, Open Graph, Twitter Cards, and structured data
 * for optimal search engine visibility and social sharing.
 */

import Head from "next/head";

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: "website" | "article" | "product";
    twitterCard?: "summary" | "summary_large_image";
    noindex?: boolean;
    nofollow?: boolean;
    keywords?: string[];
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "ScaledNative";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zerog.ai";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export function SEOHead({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterCard = "summary_large_image",
    noindex = false,
    nofollow = false,
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
    section,
    jsonLd,
}: SEOProps) {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href : "");
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

    const robotsContent = [
        noindex ? "noindex" : "index",
        nofollow ? "nofollow" : "follow",
    ].join(", ");

    // Default organization structured data
    const defaultJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [
            "https://twitter.com/zerogai",
            "https://linkedin.com/company/zerogai",
        ],
    };

    return (
        <Head>
            {/* Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
            <meta name="robots" content={robotsContent} />
            {canonical && <link rel="canonical" href={canonicalUrl} />}
            {author && <meta name="author" content={author} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            {/* Article-specific Open Graph */}
            {ogType === "article" && (
                <>
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    {section && <meta property="article:section" content={section} />}
                    {author && <meta property="article:author" content={author} />}
                </>
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content="@zerogai" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* PWA & Mobile */}
            <meta name="theme-color" content="#d97706" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd || defaultJsonLd),
                }}
            />
        </Head>
    );
}

// =============================================================================
// PAGE-SPECIFIC SEO PRESETS
// =============================================================================

export function DashboardSEO() {
    return (
        <SEOHead
            title="Dashboard"
            description="Access your AI-powered training dashboard. Track progress, manage courses, and continue learning."
            noindex={true}
        />
    );
}

export function LibrarySEO() {
    return (
        <SEOHead
            title="Training Library"
            description="Explore our comprehensive library of AI-powered training modules covering cybersecurity, leadership, compliance, and more."
            keywords={["training", "e-learning", "courses", "professional development"]}
        />
    );
}

export function CourseSEO({
    title,
    description,
    author
}: {
    title: string;
    description: string;
    author?: string;
}) {
    return (
        <SEOHead
            title={title}
            description={description}
            ogType="article"
            author={author}
            keywords={["training", "course", title.toLowerCase()]}
            jsonLd={{
                "@context": "https://schema.org",
                "@type": "Course",
                name: title,
                description,
                provider: {
                    "@type": "Organization",
                    name: SITE_NAME,
                    sameAs: SITE_URL,
                },
            }}
        />
    );
}

export function PricingSEO() {
    return (
        <SEOHead
            title="Pricing - AI Training Platform"
            description="Flexible pricing plans for individuals, teams, and enterprises. Start free or choose the plan that fits your needs."
            keywords={["pricing", "plans", "enterprise", "team training"]}
            jsonLd={{
                "@context": "https://schema.org",
                "@type": "PriceSpecification",
                priceCurrency: "USD",
            }}
        />
    );
}

export default SEOHead;
