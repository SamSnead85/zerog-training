"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    FileText,
    Image,
    Video,
    Code,
    Plus,
    Trash2,
    GripVertical,
    Eye,
    Save,
    X,
    Settings,
    Copy,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Content block types
type ContentBlockType = "text" | "heading" | "code" | "image" | "video" | "quiz";

interface ContentBlock {
    id: string;
    type: ContentBlockType;
    content: string;
    metadata?: Record<string, unknown>;
}

// Content block editor
export function ContentBlockEditor({
    blocks,
    onChange,
    onAddBlock,
    onRemoveBlock,
    onReorder,
}: {
    blocks: ContentBlock[];
    onChange: (id: string, content: string, metadata?: Record<string, unknown>) => void;
    onAddBlock: (type: ContentBlockType, afterId?: string) => void;
    onRemoveBlock: (id: string) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
}) {
    const blockIcons: Record<ContentBlockType, React.ReactNode> = {
        text: <FileText className="h-4 w-4" />,
        heading: <span className="font-bold text-sm">H</span>,
        code: <Code className="h-4 w-4" />,
        image: <Image className="h-4 w-4" />,
        video: <Video className="h-4 w-4" />,
        quiz: <Check className="h-4 w-4" />,
    };

    return (
        <div className="space-y-2">
            {blocks.map((block, index) => (
                <div key={block.id} className="group relative">
                    <div className="flex gap-2">
                        {/* Drag handle */}
                        <div className="w-6 flex flex-col items-center pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="h-4 w-4 text-white/30 cursor-grab" />
                        </div>

                        {/* Block content */}
                        <div className="flex-1 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.02]">
                                <span className="text-white/40">{blockIcons[block.type]}</span>
                                <span className="text-sm text-white/60 capitalize">{block.type}</span>
                                <div className="ml-auto flex items-center gap-1">
                                    <button
                                        onClick={() => onRemoveBlock(block.id)}
                                        className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-red-400"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <BlockContentInput
                                    type={block.type}
                                    content={block.content}
                                    metadata={block.metadata}
                                    onChange={(content, metadata) => onChange(block.id, content, metadata)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Add block button */}
                    <div className="absolute left-6 -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <AddBlockMenu onAdd={(type) => onAddBlock(type, block.id)} />
                    </div>
                </div>
            ))}

            {/* Initial add block */}
            {blocks.length === 0 && (
                <div className="p-8 border-2 border-dashed border-white/10 rounded-lg text-center">
                    <p className="text-white/40 mb-4">Start building your content</p>
                    <AddBlockMenu onAdd={onAddBlock} showLabel />
                </div>
            )}
        </div>
    );
}

function BlockContentInput({
    type,
    content,
    metadata,
    onChange,
}: {
    type: ContentBlockType;
    content: string;
    metadata?: Record<string, unknown>;
    onChange: (content: string, metadata?: Record<string, unknown>) => void;
}) {
    switch (type) {
        case "heading":
            return (
                <input
                    type="text"
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Heading text..."
                    className="w-full bg-transparent text-xl font-semibold focus:outline-none"
                />
            );
        case "code":
            return (
                <div>
                    <select
                        value={metadata?.language as string || "javascript"}
                        onChange={(e) => onChange(content, { ...metadata, language: e.target.value })}
                        className="mb-2 px-2 py-1 text-xs rounded bg-white/10 border border-white/10"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>
                    <textarea
                        value={content}
                        onChange={(e) => onChange(e.target.value, metadata)}
                        placeholder="// Enter code..."
                        rows={6}
                        className="w-full bg-black/30 p-3 rounded font-mono text-sm focus:outline-none resize-none"
                    />
                </div>
            );
        case "image":
        case "video":
            return (
                <input
                    type="url"
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Enter ${type} URL...`}
                    className="w-full bg-transparent focus:outline-none text-sm"
                />
            );
        case "quiz":
            return (
                <div className="text-sm text-white/60">
                    Quiz configuration (embed quiz component here)
                </div>
            );
        default:
            return (
                <textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter text content..."
                    rows={3}
                    className="w-full bg-transparent focus:outline-none resize-none"
                />
            );
    }
}

function AddBlockMenu({
    onAdd,
    showLabel = false,
}: {
    onAdd: (type: ContentBlockType) => void;
    showLabel?: boolean;
}) {
    const [open, setOpen] = useState(false);

    const blockTypes: { type: ContentBlockType; label: string; icon: React.ReactNode }[] = [
        { type: "text", label: "Text", icon: <FileText className="h-4 w-4" /> },
        { type: "heading", label: "Heading", icon: <span className="font-bold">H</span> },
        { type: "code", label: "Code", icon: <Code className="h-4 w-4" /> },
        { type: "image", label: "Image", icon: <Image className="h-4 w-4" /> },
        { type: "video", label: "Video", icon: <Video className="h-4 w-4" /> },
        { type: "quiz", label: "Quiz", icon: <Check className="h-4 w-4" /> },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
                    "bg-primary/20 text-primary hover:bg-primary/30"
                )}
            >
                <Plus className="h-4 w-4" />
                {showLabel && <span className="text-sm">Add block</span>}
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 z-20 w-48 rounded-lg bg-black/95 border border-white/10 shadow-xl p-1">
                        {blockTypes.map(({ type, label, icon }) => (
                            <button
                                key={type}
                                onClick={() => {
                                    onAdd(type);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-sm"
                            >
                                <span className="text-white/50">{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// Lesson editor header
export function LessonEditorHeader({
    title,
    status,
    onSave,
    onPreview,
    onPublish,
    isSaving,
}: {
    title: string;
    status: "draft" | "published" | "archived";
    onSave: () => void;
    onPreview: () => void;
    onPublish: () => void;
    isSaving: boolean;
}) {
    const statusConfig = {
        draft: { label: "Draft", color: "bg-amber-500/20 text-amber-400" },
        published: { label: "Published", color: "bg-emerald-500/20 text-emerald-400" },
        archived: { label: "Archived", color: "bg-white/10 text-white/50" },
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg truncate max-w-md">{title || "Untitled Lesson"}</h1>
                <Badge className={statusConfig[status].color}>
                    {statusConfig[status].label}
                </Badge>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onPreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>
                <Button variant="outline" size="sm" onClick={onSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                </Button>
                {status === "draft" && (
                    <Button size="sm" onClick={onPublish}>
                        Publish
                    </Button>
                )}
            </div>
        </div>
    );
}

// Lesson metadata type
interface LessonMetadata {
    title: string;
    description: string;
    duration: number;
    difficulty: string;
    tags: string[];
}

// Lesson metadata editor
export function LessonMetadataEditor({
    metadata,
    onChange,
}: {
    metadata: LessonMetadata;
    onChange: (metadata: LessonMetadata) => void;
}) {
    const [tagInput, setTagInput] = useState("");

    const addTag = () => {
        if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
            onChange({ ...metadata, tags: [...metadata.tags, tagInput.trim()] });
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        onChange({ ...metadata, tags: metadata.tags.filter(t => t !== tag) });
    };

    return (
        <Card className="p-4 bg-white/[0.02] border-white/10 space-y-4">
            <div>
                <label className="block text-sm text-white/60 mb-1">Title</label>
                <input
                    type="text"
                    value={metadata.title}
                    onChange={(e) => onChange({ ...metadata, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm text-white/60 mb-1">Description</label>
                <textarea
                    value={metadata.description}
                    onChange={(e) => onChange({ ...metadata, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none resize-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-white/60 mb-1">Duration (minutes)</label>
                    <input
                        type="number"
                        value={metadata.duration}
                        onChange={(e) => onChange({ ...metadata, duration: Number(e.target.value) })}
                        min={1}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm text-white/60 mb-1">Difficulty</label>
                    <select
                        value={metadata.difficulty}
                        onChange={(e) => onChange({ ...metadata, difficulty: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm text-white/60 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {metadata.tags.map(tag => (
                        <Badge key={tag} className="bg-white/10 gap-1 pr-1">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        placeholder="Add tag..."
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={addTag}>
                        Add
                    </Button>
                </div>
            </div>
        </Card>
    );
}
