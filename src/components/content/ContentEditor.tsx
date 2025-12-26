"use client";

import { useState, useRef } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Image,
    Code,
    Quote,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo,
    Redo,
    Save,
    Eye,
    FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
    placeholder?: string;
}

export function ContentEditor({
    initialContent = "",
    onSave,
    placeholder = "Start writing your content...",
}: ContentEditorProps) {
    const [content, setContent] = useState(initialContent);
    const [isPreview, setIsPreview] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleSave = () => {
        const htmlContent = editorRef.current?.innerHTML || "";
        setContent(htmlContent);
        setHasUnsavedChanges(false);
        onSave?.(htmlContent);
    };

    const handleInput = () => {
        setHasUnsavedChanges(true);
    };

    type ToolbarItem = {
        icon: React.ComponentType<{ className?: string }>;
        command: string;
        tooltip: string;
        value?: string;
        prompt?: string;
    };

    const toolbarGroups: ToolbarItem[][] = [
        [
            { icon: Undo, command: "undo", tooltip: "Undo" },
            { icon: Redo, command: "redo", tooltip: "Redo" },
        ],
        [
            { icon: Bold, command: "bold", tooltip: "Bold" },
            { icon: Italic, command: "italic", tooltip: "Italic" },
            { icon: Underline, command: "underline", tooltip: "Underline" },
        ],
        [
            { icon: Heading1, command: "formatBlock", value: "h1", tooltip: "Heading 1" },
            { icon: Heading2, command: "formatBlock", value: "h2", tooltip: "Heading 2" },
            { icon: Heading3, command: "formatBlock", value: "h3", tooltip: "Heading 3" },
        ],
        [
            { icon: List, command: "insertUnorderedList", tooltip: "Bullet List" },
            { icon: ListOrdered, command: "insertOrderedList", tooltip: "Numbered List" },
            { icon: Quote, command: "formatBlock", value: "blockquote", tooltip: "Quote" },
        ],
        [
            { icon: AlignLeft, command: "justifyLeft", tooltip: "Align Left" },
            { icon: AlignCenter, command: "justifyCenter", tooltip: "Center" },
            { icon: AlignRight, command: "justifyRight", tooltip: "Align Right" },
        ],
        [
            { icon: Link, command: "createLink", tooltip: "Insert Link", prompt: "Enter URL:" },
            { icon: Code, command: "formatBlock", value: "pre", tooltip: "Code Block" },
        ],
    ];

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <Card className="p-2">
                <div className="flex items-center gap-1 flex-wrap">
                    {toolbarGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex items-center">
                            {group.map((tool, toolIndex) => {
                                const Icon = tool.icon;
                                return (
                                    <button
                                        key={toolIndex}
                                        onClick={() => {
                                            if (tool.prompt) {
                                                const value = window.prompt(tool.prompt);
                                                if (value) handleFormat(tool.command, value);
                                            } else {
                                                handleFormat(tool.command, tool.value);
                                            }
                                        }}
                                        className="p-2 hover:bg-muted rounded transition-colors"
                                        title={tool.tooltip}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </button>
                                );
                            })}
                            {groupIndex < toolbarGroups.length - 1 && (
                                <div className="w-px h-6 bg-border mx-2" />
                            )}
                        </div>
                    ))}

                    <div className="flex-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPreview(!isPreview)}
                        className="gap-2"
                    >
                        {isPreview ? <FileText className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {isPreview ? "Edit" : "Preview"}
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges}
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                </div>
            </Card>

            {/* Status */}
            {hasUnsavedChanges && (
                <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                    Unsaved changes
                </Badge>
            )}

            {/* Editor / Preview */}
            <Card className="min-h-[400px] overflow-hidden">
                {isPreview ? (
                    <div
                        className="p-6 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || content }}
                    />
                ) : (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        className="p-6 min-h-[400px] outline-none prose prose-invert max-w-none
                            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
                            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3
                            [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2
                            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic
                            [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:font-mono
                            [&_a]:text-primary [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: content }}
                        data-placeholder={placeholder}
                    />
                )}
            </Card>

            {/* Word Count */}
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                    {(editorRef.current?.textContent || "").split(/\s+/).filter(Boolean).length} words
                </span>
                <span>Auto-save enabled</span>
            </div>
        </div>
    );
}
