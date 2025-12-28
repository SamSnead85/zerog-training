/**
 * Form Validation Utilities
 * 
 * Production-ready validation schemas and helpers using Zod.
 * Ensures data integrity for all user inputs.
 */

import { z } from "zod";

// =============================================================================
// COMMON SCHEMAS
// =============================================================================

export const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address");

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const nameSchema = z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters");

export const phoneSchema = z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal(""));

export const urlSchema = z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(""));

// =============================================================================
// AUTHENTICATION SCHEMAS
// =============================================================================

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

export const signupSchema = z
    .object({
        firstName: nameSchema,
        lastName: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
        organization: z.string().optional(),
        role: z.string().optional(),
        acceptTerms: z.literal(true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// =============================================================================
// PROFILE SCHEMAS
// =============================================================================

export const profileSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    title: z.string().max(100, "Title must be less than 100 characters").optional(),
    department: z.string().max(100).optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    linkedin: urlSchema,
    timezone: z.string().optional(),
    language: z.string().optional(),
});

// =============================================================================
// ORGANIZATION SCHEMAS
// =============================================================================

export const organizationSchema = z.object({
    name: z.string().min(2, "Organization name is required").max(200),
    domain: z.string().optional(),
    industry: z.string().optional(),
    size: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]).optional(),
    website: urlSchema,
    address: z.string().max(500).optional(),
});

export const teamInviteSchema = z.object({
    emails: z.string().min(1, "At least one email is required"),
    role: z.enum(["admin", "manager", "learner"]),
    message: z.string().max(500).optional(),
});

// =============================================================================
// TRAINING MODULE SCHEMAS
// =============================================================================

export const trainingModuleSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(200),
    description: z.string().max(1000).optional(),
    category: z.string().min(1, "Category is required"),
    difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    estimatedDuration: z.number().min(1).max(480).optional(),
    tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
    isPublic: z.boolean().optional(),
    passingScore: z.number().min(0).max(100).optional(),
});

export const lessonSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    content: z.string().min(10, "Content must be at least 10 characters"),
    type: z.enum(["text", "video", "interactive", "quiz"]),
    order: z.number().min(0),
    duration: z.number().min(1).optional(),
});

// =============================================================================
// QUIZ SCHEMAS
// =============================================================================

export const quizQuestionSchema = z.object({
    question: z.string().min(5, "Question must be at least 5 characters"),
    type: z.enum(["multiple-choice", "true-false", "ordering", "matching", "scenario", "multiple-select"]),
    options: z.array(z.string()).min(2, "At least 2 options required"),
    correctAnswer: z.union([z.number(), z.array(z.number())]),
    explanation: z.string().optional(),
    points: z.number().min(1).max(100).optional(),
});

// =============================================================================
// FEEDBACK SCHEMAS
// =============================================================================

export const courseRatingSchema = z.object({
    rating: z.number().min(1).max(5),
    title: z.string().max(100).optional(),
    review: z.string().max(2000).optional(),
    wouldRecommend: z.boolean().optional(),
});

export const supportTicketSchema = z.object({
    subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
    description: z.string().min(20, "Please provide more details").max(5000),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    category: z.enum(["technical", "billing", "content", "account", "other"]),
});

// =============================================================================
// BILLING SCHEMAS
// =============================================================================

export const billingAddressSchema = z.object({
    country: z.string().min(2, "Country is required"),
    addressLine1: z.string().min(5, "Address is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().optional(),
    postalCode: z.string().min(3, "Postal code is required"),
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type OrganizationInput = z.infer<typeof organizationSchema>;
export type TeamInviteInput = z.infer<typeof teamInviteSchema>;
export type TrainingModuleInput = z.infer<typeof trainingModuleSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type QuizQuestionInput = z.infer<typeof quizQuestionSchema>;
export type CourseRatingInput = z.infer<typeof courseRatingSchema>;
export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type BillingAddressInput = z.infer<typeof billingAddressSchema>;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

export function validateField<T>(
    schema: z.ZodSchema<T>,
    value: unknown
): { success: true; data: T } | { success: false; error: string } {
    const result = schema.safeParse(value);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error.issues[0]?.message || "Invalid value" };
}

export function getFieldErrors(error: z.ZodError): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const issue of error.issues) {
        const path = issue.path.join(".");
        if (!errors[path]) {
            errors[path] = issue.message;
        }
    }
    return errors;
}
