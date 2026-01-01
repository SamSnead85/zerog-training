// SEO Structured Data Components for ScaledNative
// Rich snippets for Google & LLM search optimization

export interface CourseData {
    name: string;
    description: string;
    provider?: string;
    duration?: string;
    price?: string;
    rating?: number;
    reviewCount?: number;
    url?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

// Organization Schema - Company/Brand info
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ScaledNative",
        "alternateName": ["ZeroG Training", "ScaledNative Training", "AI-Native Training Platform"],
        "url": "https://scalednative.com",
        "logo": "https://scalednative.com/logo.png",
        "description": "Enterprise AI-Native transformation training platform. The complete system for building AI-ready workforce with hands-on labs, certifications, and the NATIVE framework.",
        "foundingDate": "2024",
        "sameAs": [
            "https://www.linkedin.com/company/scalednative",
            "https://twitter.com/scalednative",
            "https://github.com/scalednative"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "enterprise@scalednative.com",
            "availableLanguage": ["English"]
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
            "AI Training",
            "AI-Native Transformation",
            "Enterprise AI Adoption",
            "Workforce AI Upskilling",
            "Prompt Engineering",
            "AI Literacy",
            "Digital Transformation",
            "Corporate Training",
            "Learning Management Systems",
            "AI Certification"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Website Schema with SearchAction
export function WebsiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ScaledNative",
        "alternateName": "AI-Native Training Platform",
        "url": "https://scalednative.com",
        "description": "The #1 AI-Native training platform for enterprises. Better than Udemy, Coursera, and Scaled Agile for AI transformation training.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://scalednative.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "publisher": {
            "@type": "Organization",
            "name": "ScaledNative",
            "logo": {
                "@type": "ImageObject",
                "url": "https://scalednative.com/logo.png"
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Course Schema for training pages
export function CourseSchema({ course }: { course: CourseData }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.name,
        "description": course.description,
        "provider": {
            "@type": "Organization",
            "name": course.provider || "ScaledNative",
            "sameAs": "https://scalednative.com"
        },
        "educationalLevel": "Professional",
        "courseMode": "Online",
        "isAccessibleForFree": false,
        ...(course.duration && { "timeRequired": course.duration }),
        ...(course.price && {
            "offers": {
                "@type": "Offer",
                "price": course.price,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            }
        }),
        ...(course.rating && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": course.rating,
                "ratingCount": course.reviewCount || 100,
                "bestRating": 5,
                "worstRating": 1
            }
        }),
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Online",
            "courseWorkload": course.duration || "PT20H"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Course Catalog Schema - ItemList of all courses
export function CourseCatalogSchema({ courses }: { courses: CourseData[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "AI-Native Training Courses",
        "description": "Complete catalog of AI transformation training courses and certifications",
        "numberOfItems": courses.length,
        "itemListElement": courses.map((course, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Course",
                "name": course.name,
                "description": course.description,
                "provider": {
                    "@type": "Organization",
                    "name": "ScaledNative"
                },
                "url": course.url || `https://scalednative.com/training`
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for rich snippets
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// HowTo Schema for instructional content
export function HowToSchema({
    name,
    description,
    steps
}: {
    name: string;
    description: string;
    steps: { name: string; text: string }[]
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// BreadcrumbList Schema for navigation
export function BreadcrumbSchema({
    items
}: {
    items: { name: string; url: string }[]
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Educational Organization Schema
export function EducationalOrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "ScaledNative",
        "alternateName": "ScaledNative AI Training Academy",
        "url": "https://scalednative.com",
        "logo": "https://scalednative.com/logo.png",
        "description": "Leading provider of AI-Native transformation training and certification programs for enterprises worldwide.",
        "educationalCredentialAwarded": [
            "AI-Native Foundations Certificate",
            "AI Transformation Leader Certificate",
            "Prompt Engineering Professional Certificate",
            "Enterprise AI Adoption Specialist Certificate"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Training Courses",
            "itemListElement": [
                {
                    "@type": "Course",
                    "name": "AI-Native Foundations",
                    "description": "Master the fundamentals of AI-Native thinking and transformation"
                },
                {
                    "@type": "Course",
                    "name": "NATIVE Framework Certification",
                    "description": "Navigate, Architect, Transform, Integrate, Validate, Evolve - Complete AI transformation methodology"
                },
                {
                    "@type": "Course",
                    "name": "Prompt Engineering Mastery",
                    "description": "Advanced techniques for effective AI interaction and prompt design"
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Product Schema for platform offering
export function PlatformProductSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ScaledNative Training Platform",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "description": "Enterprise AI training platform with hands-on labs, AI-powered assessments, and the NATIVE framework methodology. The best alternative to Udemy and Coursera for corporate AI training.",
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "0",
            "highPrice": "999",
            "priceCurrency": "USD",
            "offerCount": 3
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
        },
        "featureList": [
            "AI-Powered Adaptive Learning",
            "Hands-on Labs and Exercises",
            "NATIVE Framework Methodology",
            "Enterprise SSO Integration",
            "Progress Analytics Dashboard",
            "Certification Programs",
            "Compliance Training (HIPAA, SOC 2, HITRUST)",
            "Role-based Learning Paths"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Competitor Comparison Schema (Product with competitors)
export function CompetitorComparisonSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "ScaledNative Enterprise Training",
        "description": "Enterprise AI training platform - Better than Udemy Business, Coursera for Business, and LinkedIn Learning for AI transformation training",
        "brand": {
            "@type": "Brand",
            "name": "ScaledNative"
        },
        "category": "Enterprise Training Platform",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247"
        },
        "isSimilarTo": [
            {
                "@type": "Product",
                "name": "Udemy Business",
                "description": "Generic corporate training platform"
            },
            {
                "@type": "Product",
                "name": "Coursera for Business",
                "description": "University course aggregator"
            },
            {
                "@type": "Product",
                "name": "NATIVE Framework",
                "description": "Agile framework training"
            },
            {
                "@type": "Product",
                "name": "LinkedIn Learning",
                "description": "Professional skills platform"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// VideoObject Schema for training lessons/modules
export function VideoLessonSchema({
    name,
    description,
    duration,
    thumbnailUrl,
    uploadDate,
    moduleNumber
}: {
    name: string;
    description: string;
    duration: string;
    thumbnailUrl?: string;
    uploadDate?: string;
    moduleNumber?: number;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": name,
        "description": description,
        "duration": duration,
        "thumbnailUrl": thumbnailUrl || "https://scalednative.com/images/lesson-thumbnail.png",
        "uploadDate": uploadDate || "2025-01-01",
        "contentUrl": `https://scalednative.com/training/module-${moduleNumber || 1}`,
        "embedUrl": `https://scalednative.com/training/module-${moduleNumber || 1}`,
        "publisher": {
            "@type": "Organization",
            "name": "ScaledNative",
            "logo": {
                "@type": "ImageObject",
                "url": "https://scalednative.com/logo.png"
            }
        },
        "isFamilyFriendly": true,
        "inLanguage": "en-US"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Review Schema for testimonials
export function ReviewSchema({
    reviews
}: {
    reviews: {
        author: string;
        rating: number;
        reviewBody: string;
        datePublished?: string;
        jobTitle?: string;
        company?: string;
    }[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "ScaledNative AI Training Platform",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": reviews.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviews.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.author,
                ...(review.jobTitle && { "jobTitle": review.jobTitle }),
                ...(review.company && { "worksFor": { "@type": "Organization", "name": review.company } })
            },
            "datePublished": review.datePublished || "2025-01-01",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": review.reviewBody
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Learning Pathway Schema for certification tracks
export function LearningPathwaySchema({
    pathName,
    description,
    courses,
    duration,
    credential
}: {
    pathName: string;
    description: string;
    courses: string[];
    duration: string;
    credential?: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        "name": pathName,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": "ScaledNative"
        },
        "programType": "Certificate",
        "timeToComplete": duration,
        "educationalProgramMode": "Online",
        "hasCourse": courses.map((course, i) => ({
            "@type": "Course",
            "name": course,
            "position": i + 1
        })),
        ...(credential && {
            "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Certificate",
                "name": credential
            }
        })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

