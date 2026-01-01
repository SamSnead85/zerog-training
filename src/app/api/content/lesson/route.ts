import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Content directory
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * GET /api/content/lesson?module=X&lesson=Y
 * Returns a single lesson with parsed content
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const moduleNum = searchParams.get('module');
    const lessonId = searchParams.get('lesson');

    if (!moduleNum || !lessonId) {
        return NextResponse.json(
            { success: false, error: 'Missing module or lesson parameter' },
            { status: 400 }
        );
    }

    try {
        const lesson = await getLesson(parseInt(moduleNum), lessonId);

        if (!lesson) {
            return NextResponse.json(
                { success: false, error: 'Lesson not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            lesson,
        });
    } catch (error) {
        console.error('Lesson API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to load lesson' },
            { status: 500 }
        );
    }
}

async function getLesson(moduleNum: number, lessonId: string) {
    const lessonsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'lessons');

    // Find the lesson file
    const filePath = findFile(lessonsDir, `${lessonId}.md`);

    if (!filePath) {
        // Try with 'lesson-' prefix
        const prefixedPath = findFile(lessonsDir, `lesson-${lessonId}.md`);
        if (!prefixedPath) return null;
    }

    const actualPath = filePath || findFile(lessonsDir, `lesson-${lessonId}.md`);
    if (!actualPath) return null;

    const fileContent = fs.readFileSync(actualPath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML (simple version)
    const htmlContent = await convertMarkdownToHtml(content);

    // Get adjacent lessons for navigation
    const allLessons = await getAllModuleLessons(moduleNum);
    const currentIndex = allLessons.findIndex(l => l.id === lessonId || l.id === `lesson-${lessonId}`);

    return {
        id: lessonId,
        title: data.title || extractTitleFromContent(content) || extractTitleFromFilename(lessonId),
        module: moduleNum,
        topic: data.topic || 1,
        duration: data.duration || estimateDuration(content),
        content: htmlContent,
        prerequisites: data.prerequisites || [],
        prevLesson: currentIndex > 0 ? allLessons[currentIndex - 1].id : null,
        nextLesson: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null,
    };
}

async function getAllModuleLessons(moduleNum: number) {
    const lessonsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'lessons');

    if (!fs.existsSync(lessonsDir)) {
        return [];
    }

    const lessons: Array<{ id: string; order: number }> = [];

    function scanDir(dir: string): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                scanDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const id = entry.name.replace('.md', '');
                const match = id.match(/(\d+)/);
                const order = match ? parseInt(match[1]) : 0;
                lessons.push({ id, order });
            }
        }
    }

    scanDir(lessonsDir);
    return lessons.sort((a, b) => a.order - b.order);
}

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

async function convertMarkdownToHtml(markdown: string): Promise<string> {
    // Simple markdown to HTML conversion
    // In production, use remark/rehype for full support

    let html = markdown;

    // Headers with IDs for ToC
    html = html.replace(/^## (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return `<h2 id="${id}">${text}</h2>`;
    });

    html = html.replace(/^### (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return `<h3 id="${id}">${text}</h3>`;
    });

    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="language-${lang || 'plaintext'}"><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold and italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Paragraphs
    html = html.replace(/\n\n(?!<)/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6])/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');

    return html;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function extractTitleFromContent(content: string): string | null {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : null;
}

function extractTitleFromFilename(filename: string): string {
    return filename
        .replace(/^lesson-?\d*\.?\d*-?/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function estimateDuration(content: string): string {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(5, Math.round(words / 200)); // 200 WPM reading speed
    return `${minutes} min`;
}
