/**
 * Learning Path Types & Interfaces
 * 
 * Data structures for the structured learning path system
 * inspired by Google Cloud Skills Boost and AWS Skill Builder.
 */

// =============================================================================
// CORE TYPES
// =============================================================================

export interface LearningPath {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    thumbnail: string;
    duration: string;          // Estimated total duration
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";
    category: string;
    subcategory?: string;

    // Progress tracking
    totalModules: number;
    totalLessons: number;
    estimatedHours: number;

    // Prerequisites
    prerequisites?: string[];  // IDs of prerequisite paths
    requiredSkills?: string[];

    // Outcomes
    learningObjectives: string[];
    skills: string[];
    certification?: PathCertification;

    // Content structure
    modules: PathModule[];

    // Metadata
    author?: Author;
    tags: string[];
    featured: boolean;
    new: boolean;
    popular: boolean;

    // Stats
    enrollments: number;
    completions: number;
    rating: number;
    reviewCount: number;

    createdAt: string;
    updatedAt: string;
}

export interface PathModule {
    id: string;
    title: string;
    description: string;
    order: number;

    // Content
    lessons: PathLesson[];

    // Optional assessments
    checkpoint?: PathCheckpoint;

    // Progress
    requiredForCertification: boolean;
    unlockAfter?: string;  // Module ID that must be completed first
}

export interface PathLesson {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    order: number;
    duration: string;

    // Content type
    type: "video" | "article" | "interactive" | "lab" | "quiz" | "project";

    // Content references
    contentId?: string;  // Reference to actual content
    externalUrl?: string;

    // Requirements
    requiredForProgress: boolean;
    passingScore?: number;  // For quizzes
}

export interface PathCheckpoint {
    id: string;
    title: string;
    type: "quiz" | "project" | "peer-review";
    passingScore: number;
    questions?: number;
    timeLimit?: number;  // in minutes
}

export interface PathCertification {
    id: string;
    name: string;
    badge: string;
    description: string;
    validityPeriod?: string;  // e.g., "2 years"
    requirements: CertificationRequirement[];
}

export interface CertificationRequirement {
    type: "complete" | "score" | "time";
    description: string;
    target: number;
    unit?: string;
}

export interface Author {
    id: string;
    name: string;
    avatar?: string;
    title?: string;
    organization?: string;
}

// =============================================================================
// USER PROGRESS TYPES
// =============================================================================

export interface UserPathProgress {
    pathId: string;
    userId: string;

    // Status
    status: "not_started" | "in_progress" | "completed";
    startedAt?: string;
    completedAt?: string;

    // Progress metrics
    progressPercentage: number;
    modulesCompleted: number;
    lessonsCompleted: number;

    // Time tracking
    timeSpentMinutes: number;
    lastAccessedAt: string;

    // Module progress
    moduleProgress: ModuleProgress[];

    // Certification
    certificationEarned: boolean;
    certificationDate?: string;
}

export interface ModuleProgress {
    moduleId: string;
    status: "locked" | "not_started" | "in_progress" | "completed";
    lessonsCompleted: number;
    totalLessons: number;
    checkpointPassed: boolean;
    checkpointScore?: number;
    startedAt?: string;
    completedAt?: string;
}

export interface LessonProgress {
    lessonId: string;
    status: "not_started" | "in_progress" | "completed";
    score?: number;
    attempts?: number;
    timeSpentMinutes: number;
    completedAt?: string;
}

// =============================================================================
// CATALOG & FILTERING
// =============================================================================

export interface PathCatalogFilters {
    category?: string;
    difficulty?: LearningPath["difficulty"];
    duration?: "short" | "medium" | "long";  // <2h, 2-8h, >8h
    skills?: string[];
    hasCertification?: boolean;
    featured?: boolean;
    search?: string;
}

export interface PathCatalogSort {
    by: "popular" | "newest" | "rating" | "duration" | "alphabetical";
    order: "asc" | "desc";
}

export interface PathCatalogResponse {
    paths: LearningPath[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// =============================================================================
// RECOMMENDATIONS
// =============================================================================

export interface PathRecommendation {
    path: LearningPath;
    reason: string;
    matchScore: number;
    basedOn: "skills" | "history" | "role" | "popularity" | "related";
}

export interface PersonalizedDashboard {
    continueLearning: UserPathProgress[];
    recommended: PathRecommendation[];
    trending: LearningPath[];
    newPaths: LearningPath[];
    upcomingDeadlines: AssignedPath[];
}

export interface AssignedPath {
    path: LearningPath;
    assignedBy: string;
    assignedAt: string;
    dueDate?: string;
    priority: "required" | "recommended" | "optional";
    progress: UserPathProgress;
}

// =============================================================================
// SAMPLE DATA
// =============================================================================

export const sampleLearningPaths: LearningPath[] = [
    {
        id: "path-ai-fundamentals",
        slug: "ai-fundamentals",
        title: "AI & Machine Learning Fundamentals",
        description: "Build a strong foundation in artificial intelligence and machine learning concepts. Learn about AI applications, ML algorithms, and how to evaluate AI solutions for business problems.",
        shortDescription: "Master AI/ML concepts for business professionals",
        thumbnail: "/images/paths/ai-fundamentals.jpg",
        duration: "4 hours",
        difficulty: "beginner",
        category: "Artificial Intelligence",
        totalModules: 4,
        totalLessons: 16,
        estimatedHours: 4,
        learningObjectives: [
            "Understand the AI/ML landscape",
            "Identify AI use cases in business",
            "Evaluate AI solutions effectively",
            "Apply ethical AI principles"
        ],
        skills: ["AI Literacy", "ML Concepts", "AI Strategy", "Ethical AI"],
        modules: [
            {
                id: "mod-ai-1",
                title: "Understanding AI",
                description: "Introduction to AI concepts and terminology",
                order: 1,
                lessons: [],
                requiredForCertification: true
            }
        ],
        author: {
            id: "author-1",
            name: "Dr. Sarah Chen",
            title: "AI Research Lead",
            organization: "Tech Corp"
        },
        tags: ["AI", "Machine Learning", "Business"],
        featured: true,
        new: false,
        popular: true,
        enrollments: 15420,
        completions: 8930,
        rating: 4.8,
        reviewCount: 2341,
        createdAt: "2024-01-15",
        updatedAt: "2024-11-01"
    },
    {
        id: "path-cloud-architect",
        slug: "cloud-architect",
        title: "Cloud Architecture Fundamentals",
        description: "Learn cloud computing concepts, service models, and architectural best practices. Covers AWS, GCP, and Azure fundamentals with hands-on labs.",
        shortDescription: "Master cloud computing and architecture",
        thumbnail: "/images/paths/cloud-architect.jpg",
        duration: "8 hours",
        difficulty: "intermediate",
        category: "Cloud Computing",
        totalModules: 6,
        totalLessons: 24,
        estimatedHours: 8,
        learningObjectives: [
            "Understand cloud service models",
            "Design scalable architectures",
            "Implement security best practices",
            "Optimize cloud costs"
        ],
        skills: ["Cloud Architecture", "AWS", "Azure", "GCP", "Security"],
        certification: {
            id: "cert-cloud-arch",
            name: "Cloud Architecture Certified",
            badge: "cloud-architect-badge",
            description: "Demonstrates proficiency in cloud architecture concepts",
            validityPeriod: "2 years",
            requirements: [
                { type: "complete", description: "Complete all modules", target: 100, unit: "%" },
                { type: "score", description: "Pass final assessment", target: 80, unit: "%" }
            ]
        },
        modules: [],
        author: {
            id: "author-2",
            name: "James Wilson",
            title: "Cloud Solutions Architect",
            organization: "Cloud Solutions Inc"
        },
        tags: ["Cloud", "Architecture", "AWS", "Azure", "GCP"],
        featured: true,
        new: true,
        popular: true,
        enrollments: 12350,
        completions: 6420,
        rating: 4.9,
        reviewCount: 1876,
        createdAt: "2024-06-01",
        updatedAt: "2024-11-15"
    }
];
