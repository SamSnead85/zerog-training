// Assessment Engine
// Handles quiz, knowledge check, and assignment grading

import { getDefaultLLMService } from '../ai/llm-service';

// =============================================================================
// ASSESSMENT TYPES
// =============================================================================

export type AssessmentType = 'quiz' | 'knowledge_check' | 'assignment' | 'survey';

export type QuestionType =
    | 'multiple_choice'
    | 'multiple_select'
    | 'true_false'
    | 'short_answer'
    | 'long_answer'
    | 'matching'
    | 'ordering'
    | 'fill_blank';

export interface Question {
    id: string;
    type: QuestionType;
    question: string;
    options?: string[];
    correctAnswer?: string | number | number[] | string[];
    points: number;
    explanation?: string;
    hints?: string[];
    mediaUrl?: string;
    metadata?: {
        bloomLevel?: string;
        learningObjective?: string;
        difficulty?: 'easy' | 'medium' | 'hard';
    };
}

export interface Assessment {
    id: string;
    moduleId: string;
    type: AssessmentType;
    title: string;
    description: string;
    instructions?: string;
    questions: Question[];
    settings: AssessmentSettings;
    createdAt: Date;
    updatedAt: Date;
}

export interface AssessmentSettings {
    passingScore: number; // percentage
    timeLimit?: number; // minutes
    maxAttempts: number;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    showFeedback: 'immediate' | 'after_submit' | 'after_review' | 'never';
    allowReview: boolean;
    requireCompletion: boolean;
}

// =============================================================================
// ANSWER HANDLING
// =============================================================================

export interface Answer {
    questionId: string;
    value: string | number | number[] | string[];
    timeSpent?: number; // seconds
    attempts?: number;
}

export interface QuestionResult {
    questionId: string;
    isCorrect: boolean;
    pointsEarned: number;
    pointsPossible: number;
    feedback?: string;
    correctAnswer?: string | number | number[] | string[];
    userAnswer: string | number | number[] | string[];
}

export interface AssessmentResult {
    id: string;
    assessmentId: string;
    userId: string;
    startedAt: Date;
    completedAt?: Date;
    score: number;
    percentage: number;
    passed: boolean;
    timeSpent: number; // seconds
    attemptNumber: number;
    questionResults: QuestionResult[];
    feedback?: string;
}

// =============================================================================
// ASSESSMENT ENGINE
// =============================================================================

export class AssessmentEngine {
    private assessment: Assessment;
    private llmService = getDefaultLLMService();

    constructor(assessment: Assessment) {
        this.assessment = assessment;
    }

    /**
     * Start an assessment attempt
     */
    startAttempt(): { questions: Question[]; startTime: Date } {
        let questions = [...this.assessment.questions];

        if (this.assessment.settings.shuffleQuestions) {
            questions = this.shuffle(questions);
        }

        if (this.assessment.settings.shuffleOptions) {
            questions = questions.map(q => {
                if (q.options && (q.type === 'multiple_choice' || q.type === 'multiple_select')) {
                    return {
                        ...q,
                        options: this.shuffle([...q.options]),
                    };
                }
                return q;
            });
        }

        return {
            questions,
            startTime: new Date(),
        };
    }

    /**
     * Grade all answers
     */
    async gradeAssessment(
        userId: string,
        answers: Answer[],
        startTime: Date,
        attemptNumber: number
    ): Promise<AssessmentResult> {
        const completedAt = new Date();
        const timeSpent = Math.floor((completedAt.getTime() - startTime.getTime()) / 1000);

        const questionResults: QuestionResult[] = [];
        let totalPointsEarned = 0;
        let totalPointsPossible = 0;

        for (const question of this.assessment.questions) {
            const answer = answers.find(a => a.questionId === question.id);
            const result = await this.gradeQuestion(question, answer);

            questionResults.push(result);
            totalPointsEarned += result.pointsEarned;
            totalPointsPossible += result.pointsPossible;
        }

        const percentage = totalPointsPossible > 0
            ? Math.round((totalPointsEarned / totalPointsPossible) * 100)
            : 0;

        const passed = percentage >= this.assessment.settings.passingScore;

        return {
            id: `result-${Date.now()}`,
            assessmentId: this.assessment.id,
            userId,
            startedAt: startTime,
            completedAt,
            score: totalPointsEarned,
            percentage,
            passed,
            timeSpent,
            attemptNumber,
            questionResults,
            feedback: passed
                ? 'Congratulations! You passed the assessment.'
                : `You scored ${percentage}%. You need ${this.assessment.settings.passingScore}% to pass.`,
        };
    }

    /**
     * Grade a single question
     */
    async gradeQuestion(question: Question, answer?: Answer): Promise<QuestionResult> {
        const baseResult = {
            questionId: question.id,
            pointsPossible: question.points,
            correctAnswer: question.correctAnswer,
            userAnswer: answer?.value ?? '',
        };

        if (!answer) {
            return {
                ...baseResult,
                isCorrect: false,
                pointsEarned: 0,
                feedback: 'No answer provided.',
            };
        }

        // Handle different question types
        switch (question.type) {
            case 'multiple_choice':
            case 'true_false':
                return this.gradeExactMatch(question, answer);

            case 'multiple_select':
                return this.gradeMultipleSelect(question, answer);

            case 'short_answer':
                return await this.gradeShortAnswer(question, answer);

            case 'long_answer':
                return await this.gradeLongAnswer(question, answer);

            case 'matching':
            case 'ordering':
                return this.gradeOrdering(question, answer);

            case 'fill_blank':
                return this.gradeFillBlank(question, answer);

            default:
                return {
                    ...baseResult,
                    isCorrect: false,
                    pointsEarned: 0,
                    feedback: 'Unknown question type.',
                };
        }
    }

    private gradeExactMatch(question: Question, answer: Answer): QuestionResult {
        const isCorrect = question.correctAnswer === answer.value;

        return {
            questionId: question.id,
            isCorrect,
            pointsEarned: isCorrect ? question.points : 0,
            pointsPossible: question.points,
            feedback: isCorrect
                ? question.explanation || 'Correct!'
                : question.explanation || 'Incorrect.',
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private gradeMultipleSelect(question: Question, answer: Answer): QuestionResult {
        const correct = question.correctAnswer as number[];
        const selected = answer.value as number[];

        const correctSet = new Set(correct);
        const selectedSet = new Set(selected);

        const correctSelections = selected.filter(s => correctSet.has(s)).length;
        const incorrectSelections = selected.filter(s => !correctSet.has(s)).length;
        const missedSelections = correct.filter(c => !selectedSet.has(c)).length;

        const isFullyCorrect = incorrectSelections === 0 && missedSelections === 0;
        const partialCredit = Math.max(0, (correctSelections - incorrectSelections) / correct.length);
        const pointsEarned = isFullyCorrect ? question.points : Math.round(question.points * partialCredit);

        return {
            questionId: question.id,
            isCorrect: isFullyCorrect,
            pointsEarned,
            pointsPossible: question.points,
            feedback: isFullyCorrect
                ? 'Correct!'
                : `You selected ${correctSelections} correct and ${incorrectSelections} incorrect options.`,
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private async gradeShortAnswer(question: Question, answer: Answer): Promise<QuestionResult> {
        const userAnswer = String(answer.value).toLowerCase().trim();
        const correctAnswers = Array.isArray(question.correctAnswer)
            ? question.correctAnswer.map(a => String(a).toLowerCase().trim())
            : [String(question.correctAnswer).toLowerCase().trim()];

        // Check for exact or close match
        const isExactMatch = correctAnswers.some(correct =>
            userAnswer === correct ||
            this.levenshteinDistance(userAnswer, correct) <= 2
        );

        if (isExactMatch) {
            return {
                questionId: question.id,
                isCorrect: true,
                pointsEarned: question.points,
                pointsPossible: question.points,
                feedback: 'Correct!',
                correctAnswer: question.correctAnswer,
                userAnswer: answer.value,
            };
        }

        // Use AI to evaluate if close enough
        const isClose = await this.evaluateShortAnswerWithAI(question, userAnswer);

        return {
            questionId: question.id,
            isCorrect: isClose,
            pointsEarned: isClose ? question.points * 0.8 : 0, // Partial credit for AI-accepted answers
            pointsPossible: question.points,
            feedback: isClose
                ? 'Your answer is acceptable.'
                : `Incorrect. Expected: ${correctAnswers[0]}`,
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private async gradeLongAnswer(question: Question, answer: Answer): Promise<QuestionResult> {
        const userAnswer = String(answer.value);

        if (userAnswer.length < 20) {
            return {
                questionId: question.id,
                isCorrect: false,
                pointsEarned: 0,
                pointsPossible: question.points,
                feedback: 'Response too short. Please provide a more detailed answer.',
                correctAnswer: question.correctAnswer,
                userAnswer: answer.value,
            };
        }

        // Use AI to grade
        const evaluation = await this.evaluateLongAnswerWithAI(question, userAnswer);

        return {
            questionId: question.id,
            isCorrect: evaluation.score >= 70,
            pointsEarned: Math.round(question.points * (evaluation.score / 100)),
            pointsPossible: question.points,
            feedback: evaluation.feedback,
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private gradeOrdering(question: Question, answer: Answer): QuestionResult {
        const correct = question.correctAnswer as string[];
        const submitted = answer.value as string[];

        const correctCount = submitted.filter((item, index) => item === correct[index]).length;
        const percentage = correctCount / correct.length;
        const isFullyCorrect = percentage === 1;

        return {
            questionId: question.id,
            isCorrect: isFullyCorrect,
            pointsEarned: Math.round(question.points * percentage),
            pointsPossible: question.points,
            feedback: isFullyCorrect
                ? 'Correct order!'
                : `${correctCount} of ${correct.length} items in correct position.`,
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private gradeFillBlank(question: Question, answer: Answer): QuestionResult {
        const userAnswer = String(answer.value).toLowerCase().trim();
        const correctAnswers = Array.isArray(question.correctAnswer)
            ? question.correctAnswer.map(a => String(a).toLowerCase().trim())
            : [String(question.correctAnswer).toLowerCase().trim()];

        const isCorrect = correctAnswers.includes(userAnswer);

        return {
            questionId: question.id,
            isCorrect,
            pointsEarned: isCorrect ? question.points : 0,
            pointsPossible: question.points,
            feedback: isCorrect ? 'Correct!' : `Incorrect. Accepted answers: ${correctAnswers.join(', ')}`,
            correctAnswer: question.correctAnswer,
            userAnswer: answer.value,
        };
    }

    private async evaluateShortAnswerWithAI(question: Question, userAnswer: string): Promise<boolean> {
        const prompt = `Evaluate if this answer is acceptable.

Question: ${question.question}
Expected Answer(s): ${JSON.stringify(question.correctAnswer)}
User's Answer: ${userAnswer}

Is the user's answer semantically equivalent or close enough to be correct? 
Reply with only "yes" or "no".`;

        try {
            const response = await this.llmService.generateText('grading', prompt, {
                temperature: 0.1,
                maxTokens: 10,
            });
            return response.toLowerCase().includes('yes');
        } catch {
            return false;
        }
    }

    private async evaluateLongAnswerWithAI(
        question: Question,
        userAnswer: string
    ): Promise<{ score: number; feedback: string }> {
        const prompt = `Grade this written response.

Question: ${question.question}
${question.correctAnswer ? `Expected Key Points: ${question.correctAnswer}` : ''}

Student's Response:
${userAnswer}

Provide a JSON response:
{
  "score": <0-100>,
  "feedback": "<specific constructive feedback>"
}

Only return the JSON.`;

        try {
            const response = await this.llmService.generateText('grading', prompt, {
                temperature: 0.2,
                maxTokens: 200,
            });

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('AI grading error:', error);
        }

        return { score: 70, feedback: 'Answer recorded. Manual review may be required.' };
    }

    // Utility functions
    private shuffle<T>(array: T[]): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    private levenshteinDistance(a: string, b: string): number {
        const matrix: number[][] = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }
}

// =============================================================================
// ASSESSMENT GENERATION
// =============================================================================

export async function generateQuestions(
    topic: string,
    count: number,
    types: QuestionType[],
    difficulty: 'easy' | 'medium' | 'hard'
): Promise<Question[]> {
    const llmService = getDefaultLLMService();

    const prompt = `Generate ${count} assessment questions about: ${topic}

Difficulty: ${difficulty}
Question types to include: ${types.join(', ')}

Return as JSON array:
[
  {
    "type": "multiple_choice",
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "points": 10,
    "explanation": "Why this is correct"
  }
]

For true_false, correctAnswer should be "true" or "false".
For multiple_select, correctAnswer should be array of indices [0, 2].
For short_answer, correctAnswer should be a string or array of acceptable strings.

Only return the JSON array.`;

    try {
        const response = await llmService.generateText('assessment_generation', prompt, {
            temperature: 0.6,
            maxTokens: 2000,
        });

        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const questions = JSON.parse(jsonMatch[0]);
            return questions.map((q: Question, i: number) => ({
                ...q,
                id: `q-${Date.now()}-${i}`,
            }));
        }
    } catch (error) {
        console.error('Question generation error:', error);
    }

    return [];
}
