/**
 * Types for Training Module Content
 */

export interface ModuleSection {
    id: string;
    title: string;
    type: "reading" | "quiz" | "scenario";
    content?: ReadingContent;
    quiz?: QuizContent;
    scenario?: ScenarioContent;
}

export interface ReadingContent {
    heading: string;
    paragraphs: string[];
    keyPoints?: string[];
    warning?: string;
    tip?: string;
    imageUrl?: string;
    imageCaption?: string;
}

export interface QuizContent {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface ScenarioContent {
    situation: string;
    question: string;
    options: string[];
    correctIndex: number;
    feedback: string;
}
