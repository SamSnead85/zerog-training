import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * GET /api/content/quiz?module=X
 * Returns quiz questions for a module
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const moduleNum = searchParams.get('module');

    if (!moduleNum) {
        return NextResponse.json(
            { success: false, error: 'Missing module parameter' },
            { status: 400 }
        );
    }

    try {
        const questions = await getModuleQuestions(parseInt(moduleNum));

        return NextResponse.json({
            success: true,
            module: parseInt(moduleNum),
            questions,
            stats: {
                total: questions.length,
                byType: countByType(questions),
            },
        });
    } catch (error) {
        console.error('Quiz API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to load quiz' },
            { status: 500 }
        );
    }
}

async function getModuleQuestions(moduleNum: number) {
    const assessmentsDir = path.join(CONTENT_DIR, `module-${moduleNum}`, 'assessments');

    if (!fs.existsSync(assessmentsDir)) {
        return [];
    }

    const allQuestions: any[] = [];

    // Read all JSON files in assessments directory
    const files = fs.readdirSync(assessmentsDir);

    for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(assessmentsDir, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(content);

            // Handle both array format and object with questions array
            if (Array.isArray(data)) {
                allQuestions.push(...data);
            } else if (data.questions && Array.isArray(data.questions)) {
                allQuestions.push(...data.questions);
            }
        } catch (e) {
            console.error(`Failed to parse ${file}:`, e);
        }
    }

    return allQuestions;
}

function countByType(questions: any[]) {
    const counts: Record<string, number> = {};

    for (const q of questions) {
        const type = q.type || 'unknown';
        counts[type] = (counts[type] || 0) + 1;
    }

    return counts;
}
