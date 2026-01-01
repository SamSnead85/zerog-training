/**
 * Content Integration Utilities
 * Handles loading, parsing, and serving lesson content from markdown files
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export interface LessonMeta {
    id: string;
    title: string;
    description?: string;
    module: number;
    topic: number;
    order: number;
    duration?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    tags?: string[];
    prerequisites?: string[];
}

export interface Lesson extends LessonMeta {
    content: string; // HTML content
    rawContent: string; // Markdown content
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'mcq' | 'tf' | 'short';
    options?: string[];
    answer: number | boolean | string;
    explanation: string;
}

export interface ModuleMeta {
    id: number;
    title: string;
    description: string;
    lessons: LessonMeta[];
    quiz: QuizQuestion[];
    labs?: string[];
}

/**
 * Get all modules with their metadata
 */
export async function getAllModules(): Promise<ModuleMeta[]> {
    const modules: ModuleMeta[] = [];

    // Scan for module directories
    const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
    const moduleDirs = entries
        .filter(e => e.isDirectory() && e.name.startsWith('module-'))
        .sort((a, b) => {
            const numA = parseInt(a.name.replace('module-', ''));
            const numB = parseInt(b.name.replace('module-', ''));
            return numA - numB;
        });

    for (const dir of moduleDirs) {
        const moduleNum = parseInt(dir.name.replace('module-', ''));
        const modulePath = path.join(CONTENT_DIR, dir.name);

        // Get lessons
        const lessons = await getModuleLessons(moduleNum);

        // Get quiz
        const quiz = await getModuleQuiz(moduleNum);

        // Get labs
        const labs = await getModuleLabs(moduleNum);

        modules.push({
            id: moduleNum,
            title: getModuleTitle(moduleNum),
            description: getModuleDescription(moduleNum),
            lessons,
            quiz,
            labs,
        });
    }

    return modules;
}

/**
 * Get all lessons for a specific module
 */
export async function getModuleLessons(moduleNum: number): Promise<LessonMeta[]> {
    const lessonsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'lessons');

    if (!fs.existsSync(lessonsDir)) {
        return [];
    }

    const lessons: LessonMeta[] = [];

    // Recursively find .md files
    function scanDir(dir: string, topicNum: number = 1): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory() && entry.name.startsWith('topic-')) {
                const topic = parseInt(entry.name.replace('topic-', ''));
                scanDir(fullPath, topic);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const { data } = matter(fs.readFileSync(fullPath, 'utf-8'));

                // Extract lesson number from filename
                const match = entry.name.match(/lesson-?(\d+)?\.?(\d+)?/);
                const lessonOrder = match ? parseInt(match[1] || match[2] || '1') : 1;

                lessons.push({
                    id: entry.name.replace('.md', ''),
                    title: data.title || extractTitleFromFilename(entry.name),
                    description: data.description,
                    module: moduleNum,
                    topic: topicNum,
                    order: lessonOrder,
                    duration: data.duration || extractDuration(fullPath),
                    difficulty: data.difficulty || 'intermediate',
                    tags: data.tags || [],
                    prerequisites: data.prerequisites || [],
                });
            }
        }
    }

    scanDir(lessonsDir);
    return lessons.sort((a, b) => a.topic - b.topic || a.order - b.order);
}

/**
 * Get a single lesson by ID
 */
export async function getLesson(moduleNum: number, lessonId: string): Promise<Lesson | null> {
    const lessonsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'lessons');

    // Find the lesson file
    const filePath = findFile(lessonsDir, `${lessonId}.md`);

    if (!filePath) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);

    const htmlContent = processedContent.toString();

    return {
        id: lessonId,
        title: data.title || extractTitleFromFilename(lessonId),
        description: data.description,
        module: moduleNum,
        topic: data.topic || 1,
        order: data.order || 1,
        duration: data.duration,
        difficulty: data.difficulty || 'intermediate',
        tags: data.tags || [],
        prerequisites: data.prerequisites || [],
        content: htmlContent,
        rawContent: content,
    };
}

/**
 * Get quiz questions for a module
 */
export async function getModuleQuiz(moduleNum: number): Promise<QuizQuestion[]> {
    const quizPath = path.join(CONTENT_DIR, `module-${moduleNum}`, 'assessments', 'quiz.json');

    if (!fs.existsSync(quizPath)) {
        return [];
    }

    try {
        const content = fs.readFileSync(quizPath, 'utf-8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

/**
 * Get lab names for a module
 */
export async function getModuleLabs(moduleNum: number): Promise<string[]> {
    const labsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'labs');

    if (!fs.existsSync(labsDir)) {
        return [];
    }

    const entries = fs.readdirSync(labsDir, { withFileTypes: true });
    return entries
        .filter(e => e.isDirectory())
        .map(e => e.name);
}

/**
 * Get lab instructions
 */
export async function getLabInstructions(moduleNum: number, labId: string): Promise<string | null> {
    const labPath = path.join(CONTENT_DIR, `module-${moduleNum}`, 'labs', labId, 'instructions.md');

    if (!fs.existsSync(labPath)) {
        return null;
    }

    const content = fs.readFileSync(labPath, 'utf-8');
    const { content: markdown } = matter(content);

    const processed = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(markdown);

    return processed.toString();
}

// Helper functions

function findFile(dir: string, filename: string): string | null {
    if (!fs.existsSync(dir)) return null;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isFile() && entry.name === filename) {
            return fullPath;
        }

        if (entry.isDirectory()) {
            const found = findFile(fullPath, filename);
            if (found) return found;
        }
    }

    return null;
}

function extractTitleFromFilename(filename: string): string {
    return filename
        .replace('.md', '')
        .replace(/^lesson-?\d*\.?\d*-?/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function extractDuration(filePath: string): string {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    // Estimate: ~200 words per minute reading, ~5 words per line
    const minutes = Math.max(5, Math.round(lines * 5 / 200));
    return `${minutes} min`;
}

function getModuleTitle(num: number): string {
    const titles: Record<number, string> = {
        1: 'AI Fundamentals',
        2: 'AI-Assisted Coding',
        3: 'Agentic AI',
        4: 'MLOps & Deployment',
        5: 'RAG & Knowledge Systems',
        6: 'AI Security & Safety',
        7: 'Fine-Tuning & Custom Models',
        8: 'Enterprise AI Architecture',
    };
    return titles[num] || `Module ${num}`;
}

function getModuleDescription(num: number): string {
    const descriptions: Record<number, string> = {
        1: 'Master the fundamentals of large language models, tokens, embeddings, and AI economics',
        2: 'Leverage GitHub Copilot, ChatGPT, and Claude to supercharge your development workflow',
        3: 'Build autonomous AI agents with ReAct patterns, tools, and multi-agent systems',
        4: 'Deploy and monitor LLM applications with production-grade LLMOps practices',
        5: 'Implement retrieval-augmented generation with advanced retrieval strategies',
        6: 'Defend against prompt injection and implement AI safety guardrails',
        7: 'When and how to fine-tune LLMs for domain-specific applications',
        8: 'Design enterprise AI platforms with governance, cost control, and scalability',
    };
    return descriptions[num] || '';
}

/**
 * Generate SCORM manifest for LMS export
 */
export async function generateScormManifest(): Promise<string> {
    const modules = await getAllModules();

    const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="scalednative-ai-native-curriculum"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1">
    
    <metadata>
        <schema>ADL SCORM</schema>
        <schemaversion>1.2</schemaversion>
        <imsmd:lom>
            <imsmd:general>
                <imsmd:title>
                    <imsmd:langstring>AI-Native Development Curriculum</imsmd:langstring>
                </imsmd:title>
                <imsmd:description>
                    <imsmd:langstring>Comprehensive training in AI-Native software development practices</imsmd:langstring>
                </imsmd:description>
            </imsmd:general>
        </imsmd:lom>
    </metadata>
    
    <organizations default="org1">
        <organization identifier="org1">
            <title>AI-Native Development Curriculum</title>
            ${modules.map(m => `
            <item identifier="module-${m.id}" identifierref="module-${m.id}-res">
                <title>${m.title}</title>
                ${m.lessons.map((l, i) => `
                <item identifier="lesson-${m.id}-${i}" identifierref="lesson-${m.id}-${i}-res">
                    <title>${l.title}</title>
                </item>
                `).join('')}
                <item identifier="quiz-${m.id}" identifierref="quiz-${m.id}-res">
                    <title>Module ${m.id} Assessment</title>
                </item>
            </item>
            `).join('')}
        </organization>
    </organizations>
    
    <resources>
        ${modules.map(m => `
        <resource identifier="module-${m.id}-res" type="webcontent" adlcp:scormtype="sco" href="modules/module-${m.id}/index.html">
            <file href="modules/module-${m.id}/index.html"/>
        </resource>
        ${m.lessons.map((l, i) => `
        <resource identifier="lesson-${m.id}-${i}-res" type="webcontent" adlcp:scormtype="sco" href="modules/module-${m.id}/lessons/${l.id}.html">
            <file href="modules/module-${m.id}/lessons/${l.id}.html"/>
        </resource>
        `).join('')}
        <resource identifier="quiz-${m.id}-res" type="webcontent" adlcp:scormtype="sco" href="modules/module-${m.id}/quiz.html">
            <file href="modules/module-${m.id}/quiz.html"/>
        </resource>
        `).join('')}
    </resources>
</manifest>`;

    return manifest;
}

/**
 * Generate xAPI statements for learning record store
 */
export function generateXapiStatement(
    actor: { name: string; email: string },
    verb: 'launched' | 'completed' | 'passed' | 'failed' | 'progressed',
    object: { type: 'lesson' | 'module' | 'quiz'; id: string; name: string },
    result?: { score?: number; duration?: string; success?: boolean }
): object {
    const verbs: Record<string, { id: string; display: string }> = {
        launched: { id: 'http://adlnet.gov/expapi/verbs/launched', display: 'launched' },
        completed: { id: 'http://adlnet.gov/expapi/verbs/completed', display: 'completed' },
        passed: { id: 'http://adlnet.gov/expapi/verbs/passed', display: 'passed' },
        failed: { id: 'http://adlnet.gov/expapi/verbs/failed', display: 'failed' },
        progressed: { id: 'http://adlnet.gov/expapi/verbs/progressed', display: 'progressed' },
    };

    const activityTypes: Record<string, string> = {
        lesson: 'http://adlnet.gov/expapi/activities/lesson',
        module: 'http://adlnet.gov/expapi/activities/module',
        quiz: 'http://adlnet.gov/expapi/activities/assessment',
    };

    return {
        actor: {
            name: actor.name,
            mbox: `mailto:${actor.email}`,
            objectType: 'Agent',
        },
        verb: {
            id: verbs[verb].id,
            display: { 'en-US': verbs[verb].display },
        },
        object: {
            id: `https://scalednative.com/content/${object.type}/${object.id}`,
            objectType: 'Activity',
            definition: {
                type: activityTypes[object.type],
                name: { 'en-US': object.name },
            },
        },
        result: result ? {
            score: result.score !== undefined ? {
                scaled: result.score / 100,
                raw: result.score,
                max: 100,
            } : undefined,
            success: result.success,
            duration: result.duration,
        } : undefined,
        timestamp: new Date().toISOString(),
        context: {
            platform: 'ScaledNative AI-Native Training',
            extensions: {
                'https://scalednative.com/xapi/version': '1.0.0',
            },
        },
    };
}
