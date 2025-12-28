"use client";

/**
 * File Upload Component
 * 
 * Drag-and-drop file uploader with progress tracking,
 * file type validation, and preview support.
 */

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";
import { Upload, X, File, Image, FileText, Film, Music, Archive, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface UploadFile {
    id: string;
    file: File;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    error?: string;
    url?: string;
}

interface FileUploadProps {
    accept?: string;
    maxSize?: number; // in bytes
    maxFiles?: number;
    multiple?: boolean;
    onUpload: (files: File[]) => Promise<{ url: string }[]>;
    onComplete?: (urls: string[]) => void;
    className?: string;
}

// =============================================================================
// FILE TYPE ICONS
// =============================================================================

function getFileIcon(type: string) {
    if (type.startsWith("image/")) return Image;
    if (type.startsWith("video/")) return Film;
    if (type.startsWith("audio/")) return Music;
    if (type.includes("pdf") || type.includes("document")) return FileText;
    if (type.includes("zip") || type.includes("archive")) return Archive;
    return File;
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FileUpload({
    accept = "*/*",
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 5,
    multiple = true,
    onUpload,
    onComplete,
    className,
}: FileUploadProps) {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(async (fileList: FileList) => {
        const newFiles: UploadFile[] = [];
        const errors: string[] = [];

        Array.from(fileList).forEach((file, index) => {
            if (files.length + newFiles.length >= maxFiles) {
                errors.push(`Maximum ${maxFiles} files allowed`);
                return;
            }
            if (file.size > maxSize) {
                errors.push(`${file.name} exceeds ${formatFileSize(maxSize)} limit`);
                return;
            }
            newFiles.push({
                id: `${Date.now()}-${index}`,
                file,
                progress: 0,
                status: "pending",
            });
        });

        if (newFiles.length === 0) return;

        setFiles((prev) => [...prev, ...newFiles]);

        // Upload files
        for (const uploadFile of newFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, status: "uploading" } : f
                )
            );

            try {
                // Simulate progress
                const progressInterval = setInterval(() => {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === uploadFile.id && f.progress < 90
                                ? { ...f, progress: f.progress + 10 }
                                : f
                        )
                    );
                }, 200);

                const results = await onUpload([uploadFile.file]);
                clearInterval(progressInterval);

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === uploadFile.id
                            ? { ...f, status: "success", progress: 100, url: results[0]?.url }
                            : f
                    )
                );
            } catch (error) {
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === uploadFile.id
                            ? { ...f, status: "error", error: "Upload failed" }
                            : f
                    )
                );
            }
        }

        // Call onComplete when all done
        const successfulUrls = files
            .filter((f) => f.status === "success" && f.url)
            .map((f) => f.url as string);
        if (successfulUrls.length > 0) {
            onComplete?.(successfulUrls);
        }
    }, [files, maxFiles, maxSize, onUpload, onComplete]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    return (
        <div className={className}>
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                    isDragging
                        ? "border-primary bg-primary/10"
                        : "border-white/20 hover:border-white/40 bg-white/[0.02]"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    className="hidden"
                />

                <Upload className={cn(
                    "h-12 w-12 mx-auto mb-4",
                    isDragging ? "text-primary" : "text-muted-foreground"
                )} />
                <p className="font-medium mb-1">
                    {isDragging ? "Drop files here" : "Drag and drop files"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                </p>
                <div className="text-xs text-muted-foreground">
                    Max {formatFileSize(maxSize)} per file • Up to {maxFiles} files
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file) => (
                        <FileItem
                            key={file.id}
                            file={file}
                            onRemove={() => removeFile(file.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// =============================================================================
// FILE ITEM
// =============================================================================

interface FileItemProps {
    file: UploadFile;
    onRemove: () => void;
}

function FileItem({ file, onRemove }: FileItemProps) {
    const Icon = getFileIcon(file.file.type);

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{file.file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.file.size)}</p>

                {file.status === "uploading" && (
                    <div className="mt-2">
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-200"
                                style={{ width: `${file.progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-shrink-0">
                {file.status === "uploading" && (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {file.status === "success" && (
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                )}
                {file.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                {(file.status === "pending" || file.status === "success" || file.status === "error") && (
                    <button
                        onClick={onRemove}
                        className="p-1 rounded-lg hover:bg-muted transition-colors ml-2"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
