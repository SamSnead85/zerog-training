import { notFound } from "next/navigation";
import { LessonPage } from "@/components/learning/LessonPage";
import { getLessonsByModule, getLessonByModuleAndNumber, getLessonByModuleAndId } from "@/lib/curriculum/lesson-content";
import { getModuleById } from "@/lib/curriculum/ai-native-curriculum";
import { requireLearnerAuth } from "@/lib/auth/learnerAuth";

interface PageProps {
    params: Promise<{
        moduleId: string;
        lessonId: string;
    }>;
}

export default async function LearnerLessonRoute({ params }: PageProps) {
    // Require learner authentication - redirects to /learn/login if not authenticated
    await requireLearnerAuth();

    const { moduleId, lessonId } = await params;

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

    // Try to get lesson by number first (if lessonId is numeric)
    const lessonNum = parseInt(lessonId, 10);
    let lesson = !isNaN(lessonNum)
        ? getLessonByModuleAndNumber(moduleId, lessonNum)
        : getLessonByModuleAndId(moduleId, lessonId);

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
