/**
 * Mock Data Generators
 * 
 * Factory functions for generating realistic test data
 * for development and testing purposes.
 */

// =============================================================================
// ID GENERATORS
// =============================================================================

let idCounter = 0;

export function generateId(prefix: string = "id"): string {
    return `${prefix}_${Date.now().toString(36)}_${(++idCounter).toString(36)}`;
}

export function generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// =============================================================================
// RANDOM DATA HELPERS
// =============================================================================

function randomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

function randomDate(startDays: number = -365, endDays: number = 0): Date {
    const start = Date.now() + startDays * 24 * 60 * 60 * 1000;
    const end = Date.now() + endDays * 24 * 60 * 60 * 1000;
    return new Date(randomInt(start, end));
}

function randomBoolean(probability: number = 0.5): boolean {
    return Math.random() < probability;
}

// =============================================================================
// USER DATA
// =============================================================================

const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Quinn", "Avery", "Parker", "Hayden", "Sage", "Dakota", "Phoenix", "Rowan"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Anderson", "Taylor", "Thomas", "Moore", "Jackson"];
const roles = ["Learner", "Manager", "Admin", "Instructor", "Team Lead", "Director"];
const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Product", "Design", "Legal", "IT"];

export interface MockUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
    role: string;
    department: string;
    joinedAt: Date;
    lastActive: Date;
    completedCourses: number;
    hoursLearning: number;
}

export function generateUser(overrides: Partial<MockUser> = {}): MockUser {
    const firstName = randomFromArray(firstNames);
    const lastName = randomFromArray(lastNames);
    const id = generateId("user");

    return {
        id,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        avatar: randomBoolean(0.7) ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}` : undefined,
        role: randomFromArray(roles),
        department: randomFromArray(departments),
        joinedAt: randomDate(-730, -30),
        lastActive: randomDate(-30, 0),
        completedCourses: randomInt(0, 25),
        hoursLearning: randomFloat(0, 200),
        ...overrides,
    };
}

export function generateUsers(count: number): MockUser[] {
    return Array.from({ length: count }, () => generateUser());
}

// =============================================================================
// COURSE DATA
// =============================================================================

const courseTopics = ["Leadership Essentials", "Data Analytics Fundamentals", "Cybersecurity Basics", "Project Management", "Effective Communication", "AI & Machine Learning", "Cloud Computing", "Agile Methodology", "Financial Literacy", "Customer Service Excellence"];
const courseCategories = ["Technical", "Leadership", "Compliance", "Soft Skills", "Professional Development"];
const difficultyLevels = ["beginner", "intermediate", "advanced", "expert"] as const;

export interface MockCourse {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: typeof difficultyLevels[number];
    duration: number; // minutes
    lessonsCount: number;
    enrolledCount: number;
    completionRate: number;
    rating: number;
    ratingsCount: number;
    createdAt: Date;
    updatedAt: Date;
    thumbnail?: string;
    instructor: MockUser;
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
}

export function generateCourse(overrides: Partial<MockCourse> = {}): MockCourse {
    const id = generateId("course");
    const title = randomFromArray(courseTopics);

    return {
        id,
        title,
        description: `Master the fundamentals of ${title.toLowerCase()} with this comprehensive course designed for modern professionals.`,
        category: randomFromArray(courseCategories),
        difficulty: randomFromArray([...difficultyLevels]),
        duration: randomInt(30, 480),
        lessonsCount: randomInt(5, 30),
        enrolledCount: randomInt(50, 5000),
        completionRate: randomFloat(0.4, 0.95),
        rating: randomFloat(3.5, 5.0, 1),
        ratingsCount: randomInt(10, 500),
        createdAt: randomDate(-365, -30),
        updatedAt: randomDate(-30, 0),
        thumbnail: `https://picsum.photos/seed/${id}/640/360`,
        instructor: generateUser({ role: "Instructor" }),
        tags: [randomFromArray(courseCategories), randomFromArray([...difficultyLevels])],
        isPublished: randomBoolean(0.9),
        isFeatured: randomBoolean(0.2),
        ...overrides,
    };
}

export function generateCourses(count: number): MockCourse[] {
    return Array.from({ length: count }, () => generateCourse());
}

// =============================================================================
// NOTIFICATION DATA
// =============================================================================

const notificationTypes = ["info", "success", "warning", "error", "achievement", "team", "course", "reminder"] as const;

export interface MockNotification {
    id: string;
    type: typeof notificationTypes[number];
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    link?: string;
}

const notificationTemplates = [
    { type: "achievement", title: "Badge Earned!", message: "You've earned the 'Quick Learner' badge." },
    { type: "course", title: "New Course Available", message: "A new course has been added to your learning path." },
    { type: "team", title: "Team Update", message: "Your team completed 100 hours of training this month." },
    { type: "reminder", title: "Course Reminder", message: "Continue where you left off in your current course." },
    { type: "success", title: "Certificate Ready", message: "Your certificate is ready to download." },
    { type: "info", title: "System Update", message: "New features have been added to improve your experience." },
];

export function generateNotification(overrides: Partial<MockNotification> = {}): MockNotification {
    const template = randomFromArray(notificationTemplates);

    return {
        id: generateId("notif"),
        type: template.type as typeof notificationTypes[number],
        title: template.title,
        message: template.message,
        timestamp: randomDate(-7, 0),
        read: randomBoolean(0.4),
        link: randomBoolean(0.5) ? "/dashboard" : undefined,
        ...overrides,
    };
}

export function generateNotifications(count: number): MockNotification[] {
    return Array.from({ length: count }, () => generateNotification());
}

// =============================================================================
// PROGRESS DATA
// =============================================================================

export interface MockProgress {
    userId: string;
    courseId: string;
    progress: number; // 0-100
    startedAt: Date;
    lastAccessedAt: Date;
    completedAt?: Date;
    lessonsCompleted: number;
    totalLessons: number;
    quizScore?: number;
    timeSpent: number; // minutes
}

export function generateProgress(userId?: string, courseId?: string): MockProgress {
    const progress = randomFloat(0, 100);
    const totalLessons = randomInt(5, 20);

    return {
        userId: userId || generateId("user"),
        courseId: courseId || generateId("course"),
        progress,
        startedAt: randomDate(-60, -7),
        lastAccessedAt: randomDate(-7, 0),
        completedAt: progress >= 100 ? randomDate(-7, 0) : undefined,
        lessonsCompleted: Math.floor((progress / 100) * totalLessons),
        totalLessons,
        quizScore: progress >= 100 ? randomInt(70, 100) : undefined,
        timeSpent: randomInt(10, 300),
    };
}

// =============================================================================
// STATS DATA
// =============================================================================

export interface MockDashboardStats {
    totalUsers: number;
    activeUsers: number;
    coursesCompleted: number;
    averageScore: number;
    totalHoursLearning: number;
    certificatesIssued: number;
    newUsersThisMonth: number;
    coursesInProgress: number;
}

export function generateDashboardStats(): MockDashboardStats {
    return {
        totalUsers: randomInt(500, 5000),
        activeUsers: randomInt(100, 1000),
        coursesCompleted: randomInt(1000, 10000),
        averageScore: randomFloat(75, 95),
        totalHoursLearning: randomInt(5000, 50000),
        certificatesIssued: randomInt(500, 5000),
        newUsersThisMonth: randomInt(20, 200),
        coursesInProgress: randomInt(200, 2000),
    };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
    generateId,
    generateUUID,
    generateUser,
    generateUsers,
    generateCourse,
    generateCourses,
    generateNotification,
    generateNotifications,
    generateProgress,
    generateDashboardStats,
};
