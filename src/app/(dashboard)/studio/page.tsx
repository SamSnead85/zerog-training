"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Input } from "@/components/ui";
import {
    ArrowLeft,
    Plus,
    FolderOpen,
    FileText,
    Upload,
    Trash2,
    Search,
    File,
    FileType,
    Sparkles,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    Link as LinkIcon,
} from "lucide-react";

interface Document {
    id: string;
    name: string;
    type: "pdf" | "docx" | "txt" | "url";
    size: string;
    uploadedAt: string;
    status: "processed" | "processing" | "pending";
    summary?: string;
}

// Mock documents for demo
const mockDocuments: Document[] = [
    {
        id: "1",
        name: "Company Data Security Policy 2024.pdf",
        type: "pdf",
        size: "245 KB",
        uploadedAt: "2 days ago",
        status: "processed",
        summary: "Covers data classification, access controls, encryption requirements, and incident response procedures.",
    },
    {
        id: "2",
        name: "Employee Onboarding Checklist.docx",
        type: "docx",
        size: "128 KB",
        uploadedAt: "1 week ago",
        status: "processed",
        summary: "30-60-90 day onboarding plan including HR forms, training requirements, and team introductions.",
    },
    {
        id: "3",
        name: "Sales Process Playbook.pdf",
        type: "pdf",
        size: "1.2 MB",
        uploadedAt: "2 weeks ago",
        status: "processed",
        summary: "Complete sales methodology including discovery, demo, proposal, and closing stages.",
    },
];

export default function KnowledgeBasePage() {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const filteredDocs = documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Handle file drop - in production, upload to storage
        const files = Array.from(e.dataTransfer.files);
        const newDocs: Document[] = files.map((file, i) => ({
            id: `new-${Date.now()}-${i}`,
            name: file.name,
            type: file.name.endsWith(".pdf") ? "pdf" : file.name.endsWith(".docx") ? "docx" : "txt",
            size: `${Math.round(file.size / 1024)} KB`,
            uploadedAt: "Just now",
            status: "processing" as const,
        }));
        setDocuments([...newDocs, ...documents]);

        // Simulate processing
        setTimeout(() => {
            setDocuments((prev) =>
                prev.map((doc) =>
                    doc.status === "processing"
                        ? { ...doc, status: "processed" as const, summary: "AI analysis complete. Ready to generate training." }
                        : doc
                )
            );
        }, 3000);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
            case "docx": return <FileType className="h-5 w-5 text-blue-500" />;
            case "url": return <LinkIcon className="h-5 w-5 text-green-500" />;
            default: return <File className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Knowledge Base</h1>
                    <p className="text-muted-foreground">
                        Upload documents to create custom training modules with AI
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Add URL
                    </Button>
                    <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                    </Button>
                </div>
            </div>

            {/* Upload Zone */}
            <Card
                className={`p-8 mb-8 border-2 border-dashed transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Drop files here or click to upload</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Support for PDF, DOCX, TXT, and more. Max 10MB per file.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary">Policy Documents</Badge>
                        <Badge variant="secondary">SOPs</Badge>
                        <Badge variant="secondary">Process Guides</Badge>
                        <Badge variant="secondary">Training Manuals</Badge>
                    </div>
                </div>
            </Card>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Documents Grid */}
            <div className="space-y-3">
                {filteredDocs.map((doc) => (
                    <Card key={doc.id} variant="outline" className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                {getTypeIcon(doc.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium truncate">{doc.name}</h3>
                                    {doc.status === "processing" && (
                                        <Badge variant="secondary" className="animate-pulse">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Processing
                                        </Badge>
                                    )}
                                    {doc.status === "processed" && (
                                        <Badge variant="outline" className="text-success border-success">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Ready
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {doc.size} • Uploaded {doc.uploadedAt}
                                </p>
                                {doc.summary && (
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {doc.summary}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href={`/studio/create?source=${doc.id}`}>
                                    <Button size="sm" className="gap-2" disabled={doc.status !== "processed"}>
                                        <Sparkles className="h-4 w-4" />
                                        Generate Training
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {filteredDocs.length === 0 && (
                    <Card className="p-12 text-center">
                        <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">No documents found</h3>
                        <p className="text-muted-foreground mb-4">
                            Upload your first document to start creating custom training
                        </p>
                        <Button className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Document
                        </Button>
                    </Card>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <Card variant="glass" className="p-4 text-center">
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                </Card>
                <Card variant="glass" className="p-4 text-center">
                    <p className="text-2xl font-bold">{documents.filter(d => d.status === "processed").length}</p>
                    <p className="text-sm text-muted-foreground">Processed</p>
                </Card>
                <Card variant="glass" className="p-4 text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Training Modules Created</p>
                </Card>
            </div>
        </div>
    );
}
