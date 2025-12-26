"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "@/components/ui";
import {
    Bookmark,
    BookmarkPlus,
    FileText,
    Plus,
    Trash2,
    Edit3,
    Save,
    X,
    Clock,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
    id: string;
    content: string;
    timestamp?: number;
    createdAt: Date;
    lessonId: string;
}

interface Bookmark {
    id: string;
    title: string;
    lessonId: string;
    lessonTitle: string;
    moduleId: string;
    createdAt: Date;
}

interface NotesAndBookmarksProps {
    lessonId: string;
    lessonTitle: string;
    moduleId: string;
    currentTimestamp?: number;
}

export function NotesAndBookmarks({
    lessonId,
    lessonTitle,
    moduleId,
    currentTimestamp,
}: NotesAndBookmarksProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [newNote, setNewNote] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");
    const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("notes");
    const [isExpanded, setIsExpanded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const savedNotes = localStorage.getItem(`zerog-notes-${lessonId}`);
        const savedBookmarks = localStorage.getItem(`zerog-bookmarks`);
        if (savedNotes) setNotes(JSON.parse(savedNotes));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    }, [lessonId]);

    // Save notes to localStorage
    useEffect(() => {
        localStorage.setItem(`zerog-notes-${lessonId}`, JSON.stringify(notes));
    }, [notes, lessonId]);

    // Save bookmarks to localStorage
    useEffect(() => {
        localStorage.setItem(`zerog-bookmarks`, JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addNote = () => {
        if (!newNote.trim()) return;

        const note: Note = {
            id: Date.now().toString(),
            content: newNote,
            timestamp: currentTimestamp,
            createdAt: new Date(),
            lessonId,
        };

        setNotes([note, ...notes]);
        setNewNote("");
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter((n) => n.id !== id));
    };

    const startEdit = (note: Note) => {
        setEditingId(note.id);
        setEditContent(note.content);
    };

    const saveEdit = () => {
        if (!editingId) return;
        setNotes(notes.map((n) =>
            n.id === editingId ? { ...n, content: editContent } : n
        ));
        setEditingId(null);
        setEditContent("");
    };

    const addBookmark = () => {
        const existingBookmark = bookmarks.find((b) => b.lessonId === lessonId);
        if (existingBookmark) {
            // Remove if already bookmarked
            setBookmarks(bookmarks.filter((b) => b.lessonId !== lessonId));
        } else {
            const bookmark: Bookmark = {
                id: Date.now().toString(),
                title: lessonTitle,
                lessonId,
                lessonTitle,
                moduleId,
                createdAt: new Date(),
            };
            setBookmarks([bookmark, ...bookmarks]);
        }
    };

    const isBookmarked = bookmarks.some((b) => b.lessonId === lessonId);

    const formatTimestamp = (seconds?: number) => {
        if (seconds === undefined) return null;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Card className="border-white/10">
            {/* Header */}
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <h3 className="font-medium">Notes & Bookmarks</h3>
                        <p className="text-xs text-muted-foreground">
                            {notes.length} notes • {bookmarks.length} bookmarks
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            addBookmark();
                        }}
                        className={isBookmarked ? "text-primary" : ""}
                    >
                        {isBookmarked ? (
                            <Bookmark className="h-5 w-5 fill-current" />
                        ) : (
                            <BookmarkPlus className="h-5 w-5" />
                        )}
                    </Button>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
            </div>

            {isExpanded && (
                <>
                    {/* Tabs */}
                    <div className="px-4 flex gap-4 border-b border-border">
                        <button
                            onClick={() => setActiveTab("notes")}
                            className={cn(
                                "py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                                activeTab === "notes"
                                    ? "border-primary text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Notes ({notes.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("bookmarks")}
                            className={cn(
                                "py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                                activeTab === "bookmarks"
                                    ? "border-primary text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Bookmarks ({bookmarks.length})
                        </button>
                    </div>

                    <div className="p-4">
                        {/* Notes Tab */}
                        {activeTab === "notes" && (
                            <div className="space-y-4">
                                {/* Add Note */}
                                <div className="flex gap-2">
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Add a note..."
                                        rows={2}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                                    />
                                    <Button onClick={addNote} disabled={!newNote.trim()}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Notes List */}
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {notes.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No notes yet. Add your first note above.
                                        </p>
                                    ) : (
                                        notes.map((note) => (
                                            <div
                                                key={note.id}
                                                className="p-3 rounded-lg bg-white/[0.02] border border-white/10 group"
                                            >
                                                {editingId === note.id ? (
                                                    <div className="space-y-2">
                                                        <textarea
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                            className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-sm resize-none"
                                                            rows={2}
                                                        />
                                                        <div className="flex gap-2 justify-end">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setEditingId(null)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="sm" onClick={saveEdit}>
                                                                <Save className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="text-sm">{note.content}</p>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                {note.timestamp !== undefined && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Clock className="h-3 w-3" />
                                                                        {formatTimestamp(note.timestamp)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => startEdit(note)}
                                                                >
                                                                    <Edit3 className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => deleteNote(note.id)}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bookmarks Tab */}
                        {activeTab === "bookmarks" && (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {bookmarks.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No bookmarks yet. Click the bookmark icon to save lessons.
                                    </p>
                                ) : (
                                    bookmarks.map((bookmark) => (
                                        <div
                                            key={bookmark.id}
                                            className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between group"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{bookmark.lessonTitle}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(bookmark.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id))
                                                }
                                                className="opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </Card>
    );
}
