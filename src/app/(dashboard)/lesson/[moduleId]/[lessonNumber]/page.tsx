import { notFound } from "next/navigation";
import { LessonPage } from "@/components/learning/LessonPage";
import { getLessonsByModule, getLessonByModuleAndNumber } from "@/lib/curriculum/lesson-content";
import { getModuleById } from "@/lib/curriculum/ai-native-curriculum";
import { requireAuth } from "@/lib/auth/lessonAuth";

interface PageProps {
    params: Promise<{
        moduleId: string;
        lessonNumber: string;
    }>;
}

export default async function LessonRoute({ params }: PageProps) {
    // Require authentication - redirects to /login if not authenticated
    await requireAuth();

    const { moduleId, lessonNumber } = await params;
    const lessonNum = parseInt(lessonNumber, 10);

    // Get module info
    const module = getModuleById(moduleId);
    if (!module) {
        notFound();
    }

    // Get all lessons for this module
    const lessons = getLessonsByModule(moduleId);
    if (lessons.length === 0) {
        notFound();
    }

    // Get specific lesson
    const lesson = getLessonByModuleAndNumber(moduleId, lessonNum);
    if (!lesson) {
        notFound();
    }

    return (
        <LessonPage
            lesson={lesson}
            lessons={lessons}
            moduleTitle={module.title}
        />
    );
}

// Generate static paths for known lessons
export async function generateStaticParams() {
    const lessons = getLessonsByModule("module-1");
    return lessons.map(lesson => ({
        moduleId: lesson.moduleId,
        lessonNumber: lesson.lessonNumber.toString(),
    }));
}
