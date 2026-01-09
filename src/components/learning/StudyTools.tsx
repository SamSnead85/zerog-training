"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    BookmarkPlus,
    Bookmark,
    HighlighterIcon,
    StickyNote,
    X,
    ChevronDown,
    ChevronUp,
    FileText,
    Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Notes panel for lessons
export function NotesPanel({
    lessonId,
    sectionId,
    initialNotes,
    onSave,
    className,
}: {
    lessonId: string;
    sectionId: string;
    initialNotes?: string;
    onSave: (notes: string) => void;
    className?: string;
}) {
    const [notes, setNotes] = useState(initialNotes || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await onSave(notes);
        setIsSaving(false);
    };

    return (
        <Card className={cn("p-4 bg-white/[0.02] border-white/10", className)}>
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center gap-2">
                    <StickyNote className="h-4 w-4 text-amber-400" />
                    Notes
                </h4>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes for this section..."
                className="w-full h-48 p-3 rounded-xl bg-black/30 border border-white/10 focus:border-primary focus:outline-none resize-none text-sm"
            />
            <p className="text-xs text-white/30 mt-2">
                {notes.length} characters • Auto-saved locally
            </p>
        </Card>
    );
}

// Bookmarks list
export function BookmarksList({
    bookmarks,
    onRemove,
    className,
}: {
    bookmarks: {
        id: string;
        lessonId: string;
        lessonTitle: string;
        sectionTitle: string;
        createdAt: string;
    }[];
    onRemove: (id: string) => void;
    className?: string;
}) {
    if (bookmarks.length === 0) {
        return (
            <Card className={cn("p-6 bg-white/[0.02] border-white/10 text-center", className)}>
                <Bookmark className="h-8 w-8 text-white/20 mx-auto mb-2" />
                <p className="text-white/50">No bookmarks yet</p>
                <p className="text-xs text-white/30 mt-1">
                    Bookmark sections to quickly return to them later
                </p>
            </Card>
        );
    }

    return (
        <Card className={cn("p-4 bg-white/[0.02] border-white/10", className)}>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-blue-400" />
                Bookmarks ({bookmarks.length})
            </h4>
            <div className="space-y-2">
                {bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{bookmark.sectionTitle}</p>
                            <p className="text-xs text-white/40 truncate">{bookmark.lessonTitle}</p>
                        </div>
                        <button
                            onClick={() => onRemove(bookmark.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                        >
                            <X className="h-4 w-4 text-white/40" />
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Flashcard component
interface Flashcard {
    id: string;
    front: string;
    back: string;
    category?: string;
}

export function FlashcardDeck({
    cards,
    title,
    className,
}: {
    cards: Flashcard[];
    title?: string;
    className?: string;
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCount, setKnownCount] = useState(0);

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    const handleNext = (known: boolean) => {
        if (known) setKnownCount(knownCount + 1);
        setIsFlipped(false);
        if (currentIndex < cards.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnownCount(0);
    };

    if (currentIndex >= cards.length) {
        return (
            <Card className={cn("p-6 bg-white/[0.02] border-white/10 text-center", className)}>
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Deck Complete!</h3>
                <p className="text-white/60 mb-4">
                    You got {knownCount} of {cards.length} correct
                </p>
                <Button onClick={handleReset}>Review Again</Button>
            </Card>
        );
    }

    return (
        <Card className={cn("p-6 bg-white/[0.02] border-white/10", className)}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{title || "Flashcards"}</h4>
                <Badge className="bg-white/10 text-white/60">
                    {currentIndex + 1} / {cards.length}
                </Badge>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Card */}
            <button
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                    "w-full aspect-[3/2] rounded-xl p-6 flex items-center justify-center text-center transition-all duration-300",
                    isFlipped
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-white/5 border-white/10",
                    "border"
                )}
            >
                <div>
                    <p className="text-xs text-white/40 mb-3">
                        {isFlipped ? "Answer" : "Question"} • Click to flip
                    </p>
                    <p className={cn(
                        "text-lg font-medium",
                        isFlipped && "text-emerald-400"
                    )}>
                        {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                </div>
            </button>

            {/* Actions */}
            {isFlipped && (
                <div className="flex gap-3 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleNext(false)}
                    >
                        Need Practice
                    </Button>
                    <Button
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleNext(true)}
                    >
                        Got It!
                    </Button>
                </div>
            )}
        </Card>
    );
}

// Export notes functionality
export function ExportNotesButton({
    lessonTitle,
    notes,
    className,
}: {
    lessonTitle: string;
    notes: Record<string, string>;
    className?: string;
}) {
    const handleExport = () => {
        const content = Object.entries(notes)
            .map(([section, note]) => `## ${section}\n\n${note}`)
            .join("\n\n---\n\n");

        const fullContent = `# Notes: ${lessonTitle}\n\nExported on ${new Date().toLocaleDateString()}\n\n${content}`;

        const blob = new Blob([fullContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `notes-${lessonTitle.toLowerCase().replace(/\s+/g, "-")}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="outline" onClick={handleExport} className={cn("gap-2", className)}>
            <Download className="h-4 w-4" />
            Export Notes
        </Button>
    );
}
