"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    BookOpen,
    Check,
    Clock,
    List,
    StickyNote,
    Bookmark,
    BookmarkCheck,
    ChevronDown,
    ChevronUp,
    Target,
    Lightbulb,
    HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonSection {
    id: string;
    title: string;
    content: string;
    type: "text" | "example" | "interactive" | "video";
    examples?: { title: string; badPrompt?: string; goodPrompt: string; explanation: string }[];
    tips?: string[];
}

interface EnhancedLessonPlayerProps {
    lessonId: string;
    title: string;
    description: string;
    duration: string;
    objectives: string[];
    sections: LessonSection[];
    keyTakeaways: string[];
    onComplete: () => void;
    onProgress?: (progress: number) => void;
}

export function EnhancedLessonPlayer({
    lessonId,
    title,
    description,
    duration,
    objectives,
    sections,
    keyTakeaways,
    onComplete,
    onProgress
}: EnhancedLessonPlayerProps) {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [bookmarkedSections, setBookmarkedSections] = useState<Set<string>>(new Set());
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [showNotes, setShowNotes] = useState(false);
    const [showOutline, setShowOutline] = useState(false);
    const [showObjectives, setShowObjectives] = useState(true);
    const [readingProgress, setReadingProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const currentSection = sections[currentSectionIndex];
    const progress = (completedSections.size / sections.length) * 100;
    const isComplete = completedSections.size === sections.length;

    // Track reading progress
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
                const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
                setReadingProgress(Math.min(scrollProgress, 100));
            }
        };

        const content = contentRef.current;
        content?.addEventListener('scroll', handleScroll);
        return () => content?.removeEventListener('scroll', handleScroll);
    }, [currentSectionIndex]);

    // Mark section complete when scrolled
    useEffect(() => {
        if (readingProgress > 80) {
            markSectionComplete(currentSection.id);
        }
    }, [readingProgress, currentSection.id]);

    // Report progress
    useEffect(() => {
        onProgress?.(progress);
    }, [progress, onProgress]);

    const markSectionComplete = (sectionId: string) => {
        if (!completedSections.has(sectionId)) {
            setCompletedSections(new Set([...completedSections, sectionId]));
        }
    };

    const toggleBookmark = (sectionId: string) => {
        const newBookmarks = new Set(bookmarkedSections);
        if (newBookmarks.has(sectionId)) {
            newBookmarks.delete(sectionId);
        } else {
            newBookmarks.add(sectionId);
        }
        setBookmarkedSections(newBookmarks);
    };

    const saveNote = (sectionId: string, note: string) => {
        setNotes({ ...notes, [sectionId]: note });
    };

    const goToSection = (index: number) => {
        setCurrentSectionIndex(index);
        setReadingProgress(0);
        setShowOutline(false);
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    };

    const goNext = () => {
        if (currentSectionIndex < sections.length - 1) {
            markSectionComplete(currentSection.id);
            goToSection(currentSectionIndex + 1);
        }
    };

    const goPrevious = () => {
        if (currentSectionIndex > 0) {
            goToSection(currentSectionIndex - 1);
        }
    };

    // Render markdown-like content
    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeContent = '';
        let inTable = false;
        let tableRows: string[][] = [];

        lines.forEach((line, i) => {
            // Code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    elements.push(
                        <pre key={i} className="p-4 rounded-xl bg-black/30 border border-white/10 font-mono text-sm overflow-x-auto my-4">
                            {codeContent}
                        </pre>
                    );
                    codeContent = '';
                }
                inCodeBlock = !inCodeBlock;
                return;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                return;
            }

            // Tables
            if (line.startsWith('|')) {
                if (!inTable) inTable = true;
                const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
                if (!cells.every(c => c.match(/^[-:]+$/))) {
                    tableRows.push(cells);
                }
                return;
            } else if (inTable) {
                elements.push(
                    <div key={`table-${i}`} className="overflow-x-auto my-4">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    {tableRows[0]?.map((cell, ci) => (
                                        <th key={ci} className="p-3 text-left font-medium">{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.slice(1).map((row, ri) => (
                                    <tr key={ri} className="border-b border-white/5">
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="p-3">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableRows = [];
                inTable = false;
            }

            // Headers
            if (line.startsWith('# ')) {
                elements.push(<h1 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h1>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>);
            } else if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>);
            }
            // Lists
            else if (line.startsWith('- ') || line.startsWith('* ')) {
                elements.push(
                    <li key={i} className="ml-6 mb-1 list-disc">{line.slice(2)}</li>
                );
            }
            // Divider
            else if (line.startsWith('---')) {
                elements.push(<hr key={i} className="border-white/10 my-6" />);
            }
            // Bold text
            else if (line.includes('**')) {
                const parts = line.split(/\*\*(.+?)\*\*/g);
                elements.push(
                    <p key={i} className="mb-4">
                        {parts.map((part, pi) =>
                            pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part
                        )}
                    </p>
                );
            }
            // Emoji lines (common in content)
            else if (line.match(/^[✅❌✓]/)) {
                elements.push(<p key={i} className="mb-2">{line}</p>);
            }
            // Regular paragraph
            else if (line.trim()) {
                elements.push(<p key={i} className="mb-4 text-muted-foreground">{line}</p>);
            }
        });

        return elements;
    };

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col">
            {/* Top Bar */}
            <Card className="p-4 bg-white/[0.02] border-white/10 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setShowOutline(!showOutline)}>
                            <List className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-semibold">{title}</h1>
                            <p className="text-sm text-muted-foreground">
                                Section {currentSectionIndex + 1} of {sections.length}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {duration}
                        </div>
                        <Badge className={cn(
                            progress === 100 ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary"
                        )}>
                            {Math.round(progress)}% Complete
                        </Badge>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleBookmark(currentSection.id)}
                        >
                            {bookmarkedSections.has(currentSection.id) ? (
                                <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                                <Bookmark className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowNotes(!showNotes)}
                        >
                            <StickyNote className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <Progress value={progress} className="h-1 mt-3" />
            </Card>

            {/* Main Content Area */}
            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Outline Sidebar */}
                {showOutline && (
                    <Card className="w-72 p-4 bg-white/[0.02] border-white/10 overflow-y-auto flex-shrink-0">
                        <h3 className="font-semibold mb-4">Lesson Outline</h3>
                        <div className="space-y-2">
                            {sections.map((section, i) => (
                                <button
                                    key={section.id}
                                    onClick={() => goToSection(i)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all",
                                        currentSectionIndex === i
                                            ? "bg-primary/10 text-white"
                                            : "hover:bg-white/5 text-muted-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                                        completedSections.has(section.id)
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-white/10"
                                    )}>
                                        {completedSections.has(section.id) ? (
                                            <Check className="h-3 w-3" />
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                    <span className="text-sm line-clamp-2">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Content */}
                <Card
                    ref={contentRef}
                    className="flex-1 p-8 bg-white/[0.02] border-white/10 overflow-y-auto"
                >
                    {/* Objectives (collapsible) */}
                    {currentSectionIndex === 0 && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowObjectives(!showObjectives)}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20"
                            >
                                <div className="flex items-center gap-3">
                                    <Target className="h-5 w-5 text-primary" />
                                    <span className="font-medium">Learning Objectives</span>
                                </div>
                                {showObjectives ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                            {showObjectives && (
                                <ul className="mt-3 space-y-2 pl-4">
                                    {objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Section Title */}
                    <h2 className="text-2xl font-bold mb-6">{currentSection.title}</h2>

                    {/* Section Content */}
                    <div className="prose prose-invert prose-slate max-w-none">
                        {renderContent(currentSection.content)}
                    </div>

                    {/* Examples */}
                    {currentSection.examples && currentSection.examples.length > 0 && (
                        <div className="mt-8 space-y-4">
                            {currentSection.examples.map((example, i) => (
                                <Card key={i} className="p-5 bg-white/[0.02] border-white/10">
                                    <h4 className="font-semibold mb-4">{example.title}</h4>
                                    {example.badPrompt && (
                                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <span className="text-xs text-red-400 font-medium">❌ Bad Example</span>
                                            <p className="mt-1 text-sm">{example.badPrompt}</p>
                                        </div>
                                    )}
                                    <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                        <span className="text-xs text-emerald-400 font-medium">✅ Good Example</span>
                                        <p className="mt-1 text-sm">{example.goodPrompt}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{example.explanation}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Tips */}
                    {currentSection.tips && currentSection.tips.length > 0 && (
                        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="h-5 w-5 text-amber-400" />
                                <span className="font-medium text-amber-400">Pro Tips</span>
                            </div>
                            <ul className="space-y-2">
                                {currentSection.tips.map((tip, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-amber-400">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Key Takeaways (on last section) */}
                    {currentSectionIndex === sections.length - 1 && (
                        <div className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                Key Takeaways
                            </h3>
                            <ul className="space-y-2">
                                {keyTakeaways.map((takeaway, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                        {takeaway}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Section Reading Progress */}
                    <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Progress value={readingProgress} className="h-1 flex-1" />
                        {readingProgress > 80 && completedSections.has(currentSection.id) && (
                            <span className="flex items-center gap-1 text-emerald-400">
                                <Check className="h-4 w-4" />
                                Complete
                            </span>
                        )}
                    </div>
                </Card>

                {/* Notes Sidebar */}
                {showNotes && (
                    <Card className="w-80 p-4 bg-white/[0.02] border-white/10 flex flex-col flex-shrink-0">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <StickyNote className="h-5 w-5 text-primary" />
                            Notes
                        </h3>
                        <textarea
                            value={notes[currentSection.id] || ''}
                            onChange={(e) => saveNote(currentSection.id, e.target.value)}
                            placeholder="Take notes for this section..."
                            className="flex-1 p-3 rounded-xl bg-black/30 border border-white/10 resize-none focus:outline-none focus:border-primary text-sm"
                        />
                    </Card>
                )}
            </div>

            {/* Navigation */}
            <Card className="p-4 bg-white/[0.02] border-white/10 mt-4">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={goPrevious}
                        disabled={currentSectionIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        {sections.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSection(i)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    currentSectionIndex === i
                                        ? "w-6 bg-primary"
                                        : completedSections.has(sections[i].id)
                                            ? "bg-emerald-500"
                                            : "bg-white/20"
                                )}
                            />
                        ))}
                    </div>

                    {currentSectionIndex < sections.length - 1 ? (
                        <Button onClick={goNext}>
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={onComplete}
                            className="bg-emerald-600 hover:bg-emerald-700"
                            disabled={!isComplete}
                        >
                            {isComplete ? "Complete Lesson" : "Finish All Sections"}
                            <Check className="h-4 w-4 ml-2" />
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}
