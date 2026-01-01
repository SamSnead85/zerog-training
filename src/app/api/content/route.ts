import { NextRequest, NextResponse } from 'next/server';
import { getAllModules, getLesson, getModuleQuiz, getLabInstructions, generateScormManifest } from '@/lib/content/content-loader';
import JSZip from 'jszip';

/**
 * GET /api/content/modules
 * Returns all modules with their metadata
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    try {
        switch (action) {
            case 'scorm':
                return await generateScormExport();
            case 'xapi':
                return await getXapiEndpoint();
            default:
                return await getModulesHandler();
        }
    } catch (error) {
        console.error('Content API error:', error);
        return NextResponse.json(
            { error: 'Failed to load content' },
            { status: 500 }
        );
    }
}

async function getModulesHandler() {
    const modules = await getAllModules();

    return NextResponse.json({
        success: true,
        data: {
            modules,
            stats: {
                totalModules: modules.length,
                totalLessons: modules.reduce((sum, m) => sum + m.lessons.length, 0),
                totalQuestions: modules.reduce((sum, m) => sum + m.quiz.length, 0),
                totalLabs: modules.reduce((sum, m) => sum + (m.labs?.length || 0), 0),
            },
        },
    });
}

async function generateScormExport() {
    const manifest = await generateScormManifest();
    const modules = await getAllModules();

    // Create ZIP file with SCORM package
    const zip = new JSZip();

    // Add manifest
    zip.file('imsmanifest.xml', manifest);

    // Add module content
    for (const module of modules) {
        const moduleDir = zip.folder(`modules/module-${module.id}`);

        // Add module index
        moduleDir?.file('index.html', generateModuleHtml(module));

        // Add lessons
        const lessonsDir = moduleDir?.folder('lessons');
        for (const lessonMeta of module.lessons) {
            const lesson = await getLesson(module.id, lessonMeta.id);
            if (lesson) {
                lessonsDir?.file(`${lesson.id}.html`, generateLessonHtml(lesson));
            }
        }

        // Add quiz
        if (module.quiz.length > 0) {
            moduleDir?.file('quiz.html', generateQuizHtml(module));
        }
    }

    // Add SCORM API wrapper
    zip.file('scripts/scorm-api.js', getScormApiWrapper());
    zip.file('styles/theme.css', getThemeCss());

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(new Uint8Array(zipBuffer), {
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename=ai-native-curriculum-scorm.zip',
        },
    });
}

async function getXapiEndpoint() {
    return NextResponse.json({
        success: true,
        data: {
            endpoint: 'https://scalednative.com/api/lrs',
            auth: 'Basic BASE64_ENCODED_CREDENTIALS',
            activityPrefix: 'https://scalednative.com/content/',
            version: '1.0.3',
            documentation: {
                sendStatement: 'POST /api/lrs/statements',
                getStatements: 'GET /api/lrs/statements',
                getState: 'GET /api/lrs/activities/state',
                setState: 'PUT /api/lrs/activities/state',
            },
        },
    });
}

// Helper functions for HTML generation

function generateModuleHtml(module: any): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module ${module.id}: ${module.title}</title>
    <link rel="stylesheet" href="../styles/theme.css">
    <script src="../scripts/scorm-api.js"></script>
</head>
<body>
    <div class="module-container">
        <header>
            <h1>Module ${module.id}: ${module.title}</h1>
            <p>${module.description}</p>
        </header>
        
        <section class="lessons-list">
            <h2>Lessons</h2>
            <ul>
                ${module.lessons.map((l: any, i: number) => `
                <li>
                    <a href="lessons/${l.id}.html">
                        <span class="lesson-number">${i + 1}</span>
                        <span class="lesson-title">${l.title}</span>
                        <span class="lesson-duration">${l.duration || ''}</span>
                    </a>
                </li>
                `).join('')}
            </ul>
        </section>
        
        ${module.quiz.length > 0 ? `
        <section class="assessment">
            <h2>Module Assessment</h2>
            <p>${module.quiz.length} questions</p>
            <a href="quiz.html" class="btn-primary">Take Assessment</a>
        </section>
        ` : ''}
    </div>
    
    <script>
        ScormAPI.initialize();
        ScormAPI.setLocation('module-${module.id}-index');
    </script>
</body>
</html>`;
}

function generateLessonHtml(lesson: any): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lesson.title}</title>
    <link rel="stylesheet" href="../../styles/theme.css">
    <script src="../../scripts/scorm-api.js"></script>
</head>
<body>
    <div class="lesson-container">
        <nav class="breadcrumb">
            <a href="../index.html">Module ${lesson.module}</a> / ${lesson.title}
        </nav>
        
        <article class="lesson-content">
            ${lesson.content}
        </article>
        
        <footer class="lesson-nav">
            <button id="prev-btn" class="btn-secondary">Previous</button>
            <button id="complete-btn" class="btn-primary">Mark Complete</button>
            <button id="next-btn" class="btn-secondary">Next</button>
        </footer>
    </div>
    
    <script>
        ScormAPI.initialize();
        ScormAPI.setLocation('lesson-${lesson.id}');
        
        document.getElementById('complete-btn').addEventListener('click', function() {
            ScormAPI.setCompletion('completed');
            ScormAPI.commit();
            alert('Lesson completed!');
        });
    </script>
</body>
</html>`;
}

function generateQuizHtml(module: any): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module ${module.id} Assessment</title>
    <link rel="stylesheet" href="../styles/theme.css">
    <script src="../scripts/scorm-api.js"></script>
</head>
<body>
    <div class="quiz-container">
        <header>
            <h1>Module ${module.id} Assessment</h1>
            <p>${module.quiz.length} questions • 75% to pass</p>
        </header>
        
        <div id="quiz-content">
            ${module.quiz.map((q: any, i: number) => `
            <div class="question" data-question="${i}" data-correct="${q.answer}">
                <h3>Question ${i + 1}</h3>
                <p class="question-text">${q.question}</p>
                ${q.type === 'mcq' ? `
                <div class="options">
                    ${q.options.map((opt: string, j: number) => `
                    <label class="option">
                        <input type="radio" name="q${i}" value="${j}">
                        <span>${opt}</span>
                    </label>
                    `).join('')}
                </div>
                ` : q.type === 'tf' ? `
                <div class="options">
                    <label class="option">
                        <input type="radio" name="q${i}" value="true">
                        <span>True</span>
                    </label>
                    <label class="option">
                        <input type="radio" name="q${i}" value="false">
                        <span>False</span>
                    </label>
                </div>
                ` : ''}
                <p class="explanation hidden">${q.explanation}</p>
            </div>
            `).join('')}
        </div>
        
        <button id="submit-btn" class="btn-primary">Submit Assessment</button>
        <div id="results" class="hidden"></div>
    </div>
    
    <script>
        ScormAPI.initialize();
        
        document.getElementById('submit-btn').addEventListener('click', function() {
            const questions = document.querySelectorAll('.question');
            let correct = 0;
            
            questions.forEach((q, i) => {
                const correctAnswer = q.dataset.correct;
                const selected = document.querySelector(\`input[name="q\${i}"]:checked\`);
                
                if (selected && selected.value == correctAnswer) {
                    correct++;
                    q.classList.add('correct');
                } else {
                    q.classList.add('incorrect');
                }
                q.querySelector('.explanation').classList.remove('hidden');
            });
            
            const score = Math.round((correct / questions.length) * 100);
            const passed = score >= 75;
            
            document.getElementById('results').innerHTML = \`
                <h2>\${passed ? 'Congratulations!' : 'Keep Learning'}</h2>
                <p>Score: \${score}% (\${correct}/\${questions.length})</p>
                <p>\${passed ? 'You passed!' : 'You need 75% to pass.'}</p>
            \`;
            document.getElementById('results').classList.remove('hidden');
            
            ScormAPI.setScore(score, 100, 0);
            ScormAPI.setCompletion(passed ? 'passed' : 'failed');
            ScormAPI.commit();
        });
    </script>
</body>
</html>`;
}

function getScormApiWrapper(): string {
    return `/**
 * SCORM 1.2 API Wrapper
 */
var ScormAPI = (function() {
    var api = null;
    
    function findAPI(win) {
        try {
            if (win.API) return win.API;
            if (win.parent && win.parent !== win) return findAPI(win.parent);
            if (win.opener) return findAPI(win.opener);
        } catch(e) {}
        return null;
    }
    
    return {
        initialize: function() {
            api = findAPI(window);
            if (api) {
                api.LMSInitialize('');
            }
        },
        
        setLocation: function(location) {
            if (api) api.LMSSetValue('cmi.core.lesson_location', location);
        },
        
        setCompletion: function(status) {
            if (api) {
                api.LMSSetValue('cmi.core.lesson_status', status);
            }
        },
        
        setScore: function(score, max, min) {
            if (api) {
                api.LMSSetValue('cmi.core.score.raw', score);
                api.LMSSetValue('cmi.core.score.max', max);
                api.LMSSetValue('cmi.core.score.min', min);
            }
        },
        
        commit: function() {
            if (api) api.LMSCommit('');
        },
        
        finish: function() {
            if (api) api.LMSFinish('');
        }
    };
})();`;
}

function getThemeCss(): string {
    return `/* ScaledNative SCORM Theme */
:root {
    --primary: #0ea5e9;
    --secondary: #64748b;
    --success: #22c55e;
    --danger: #ef4444;
    --bg: #0f172a;
    --surface: #1e293b;
    --text: #f8fafc;
    --text-muted: #94a3b8;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
}

.module-container, .lesson-container, .quiz-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
}

h1, h2, h3 { margin-bottom: 1rem; }
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.2rem; }

p { margin-bottom: 1rem; color: var(--text-muted); }

a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }

.btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.25rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--secondary);
}

.lessons-list ul {
    list-style: none;
}

.lessons-list li {
    padding: 1rem;
    background: var(--surface);
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.lessons-list a {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.lesson-number {
    width: 2rem;
    height: 2rem;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

.lesson-content {
    background: var(--surface);
    padding: 2rem;
    border-radius: 0.5rem;
}

.lesson-content pre {
    background: #0d1117;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
}

.lesson-content code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
}

.question {
    background: var(--surface);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.question.correct { border: 2px solid var(--success); }
.question.incorrect { border: 2px solid var(--danger); }

.options { margin: 1rem 0; }

.option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--bg);
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

.option:hover { background: #0f172a; }

.hidden { display: none; }

.explanation {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--bg);
    border-left: 3px solid var(--primary);
    font-style: italic;
}

#results {
    margin-top: 2rem;
    padding: 2rem;
    background: var(--surface);
    border-radius: 0.5rem;
    text-align: center;
}`;
}
