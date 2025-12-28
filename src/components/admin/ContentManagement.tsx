"use client";

/**
 * Content Management Component
 * 
 * Admin interface for managing courses, modules,
 * and learning content with CRUD operations.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Copy,
    Archive,
    Globe,
    Lock,
    Clock,
    Users,
    BarChart3,
    BookOpen,
    GraduationCap,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface ContentItem {
    id: string;
    type: "course" | "module" | "path" | "quiz";
    title: string;
    description?: string;
    status: "draft" | "review" | "published" | "archived";
    visibility: "public" | "private" | "team";
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    stats: {
        enrollments: number;
        completions: number;
        avgRating: number;
        avgDuration: number;
    };
    thumbnail?: string;
    tags: string[];
}

interface ContentManagementProps {
    items: ContentItem[];
    onView: (item: ContentItem) => void;
    onEdit: (item: ContentItem) => void;
    onDelete: (item: ContentItem) => void;
    onDuplicate: (item: ContentItem) => void;
    onArchive: (item: ContentItem) => void;
    onPublish: (item: ContentItem) => void;
    onCreate: () => void;
    className?: string;
}

// =============================================================================
// CONFIGS
// =============================================================================

const typeIcons: Record<ContentItem["type"], React.ElementType> = {
    course: BookOpen,
    module: GraduationCap,
    path: BarChart3,
    quiz: CheckCircle,
};

const statusConfig: Record<ContentItem["status"], { label: string; color: string }> = {
    draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400" },
    review: { label: "In Review", color: "bg-amber-500/20 text-amber-400" },
    published: { label: "Published", color: "bg-emerald-500/20 text-emerald-400" },
    archived: { label: "Archived", color: "bg-gray-500/20 text-gray-500" },
};

const visibilityIcons: Record<ContentItem["visibility"], React.ElementType> = {
    public: Globe,
    private: Lock,
    team: Users,
};

// =============================================================================
// COMPONENT
// =============================================================================

export function ContentManagement({
    items,
    onView,
    onEdit,
    onDelete,
    onDuplicate,
    onArchive,
    onPublish,
    onCreate,
    className,
}: ContentManagementProps) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<ContentItem["type"] | "all">("all");
    const [statusFilter, setStatusFilter] = useState<ContentItem["status"] | "all">("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const searchLower = search.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(searchLower) ||
                item.description?.toLowerCase().includes(searchLower) ||
                item.tags.some((t) => t.toLowerCase().includes(searchLower));
            const matchesType = typeFilter === "all" || item.type === typeFilter;
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [items, search, typeFilter, statusFilter]);

    const stats = useMemo(() => ({
        total: items.length,
        published: items.filter((i) => i.status === "published").length,
        draft: items.filter((i) => i.status === "draft").length,
        review: items.filter((i) => i.status === "review").length,
    }), [items]);

    return (
        <div className={cn("space-y-6", className)}>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Total Content" value={stats.total} />
                <StatCard label="Published" value={stats.published} color="text-emerald-400" />
                <StatCard label="Drafts" value={stats.draft} color="text-gray-400" />
                <StatCard label="In Review" value={stats.review} color="text-amber-400" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search content..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as ContentItem["type"] | "all")}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Types</option>
                    <option value="course">Courses</option>
                    <option value="module">Modules</option>
                    <option value="path">Paths</option>
                    <option value="quiz">Quizzes</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ContentItem["status"] | "all")}
                    className="h-10 px-3 rounded-lg border border-white/20 bg-transparent text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>

                <Button onClick={onCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                </Button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <ContentCard
                        key={item.id}
                        item={item}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        onArchive={onArchive}
                        onPublish={onPublish}
                        menuOpen={activeMenu === item.id}
                        onMenuToggle={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                    No content found matching your filters.
                </div>
            )}
        </div>
    );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function StatCard({ label, value, color = "" }: { label: string; value: number; color?: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className={cn("text-2xl font-bold", color)}>{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}

function ContentCard({
    item,
    onView,
    onEdit,
    onDelete,
    onDuplicate,
    onArchive,
    onPublish,
    menuOpen,
    onMenuToggle,
}: {
    item: ContentItem;
    onView: (item: ContentItem) => void;
    onEdit: (item: ContentItem) => void;
    onDelete: (item: ContentItem) => void;
    onDuplicate: (item: ContentItem) => void;
    onArchive: (item: ContentItem) => void;
    onPublish: (item: ContentItem) => void;
    menuOpen: boolean;
    onMenuToggle: () => void;
}) {
    const TypeIcon = typeIcons[item.type];
    const VisibilityIcon = visibilityIcons[item.visibility];
    const status = statusConfig[item.status];

    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors">
            {/* Thumbnail */}
            <div className="relative h-32 bg-muted/30">
                {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <TypeIcon className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                    <Badge className={status.color}>{status.label}</Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={onMenuToggle}
                            className="p-1.5 rounded-lg hover:bg-muted"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-40 py-1 rounded-lg border border-border bg-background shadow-lg z-10">
                                <DropdownItem icon={Eye} onClick={() => onView(item)}>View</DropdownItem>
                                <DropdownItem icon={Edit} onClick={() => onEdit(item)}>Edit</DropdownItem>
                                <DropdownItem icon={Copy} onClick={() => onDuplicate(item)}>Duplicate</DropdownItem>
                                {item.status === "draft" && (
                                    <DropdownItem icon={Globe} onClick={() => onPublish(item)}>Publish</DropdownItem>
                                )}
                                <DropdownItem icon={Archive} onClick={() => onArchive(item)}>Archive</DropdownItem>
                                <hr className="my-1 border-border" />
                                <DropdownItem icon={Trash2} onClick={() => onDelete(item)} danger>Delete</DropdownItem>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {item.stats.enrollments}
                    </span>
                    <span className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {item.stats.completions}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {item.stats.avgDuration}m
                    </span>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function DropdownItem({
    icon: Icon,
    onClick,
    danger,
    children,
}: {
    icon: React.ElementType;
    onClick: () => void;
    danger?: boolean;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors",
                danger && "text-red-400 hover:bg-red-500/10"
            )}
        >
            <Icon className="h-4 w-4" />
            {children}
        </button>
    );
}

export default ContentManagement;
