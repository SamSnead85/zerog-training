"use client";

import { useState, useMemo } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    Search,
    Filter,
    SortAsc,
    SortDesc,
    ChevronDown,
    X,
    Check,
    Layout,
    List,
    Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Filter option type
interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

// Advanced search with filters
export function AdvancedSearchBar({
    value,
    onChange,
    filters,
    activeFilters,
    onFilterChange,
    placeholder = "Search...",
}: {
    value: string;
    onChange: (value: string) => void;
    filters: { id: string; label: string; options: FilterOption[] }[];
    activeFilters: Record<string, string[]>;
    onFilterChange: (filterId: string, values: string[]) => void;
    placeholder?: string;
}) {
    const [showFilters, setShowFilters] = useState(false);

    const activeFilterCount = Object.values(activeFilters).flat().length;

    return (
        <div className="space-y-4">
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                        type="search"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                        <Badge className="bg-primary text-white ml-1">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {showFilters && (
                <Card className="p-4 bg-white/[0.02] border-white/10">
                    <div className="flex flex-wrap gap-6">
                        {filters.map(filter => (
                            <div key={filter.id}>
                                <h4 className="text-sm font-medium mb-2">{filter.label}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {filter.options.map(option => {
                                        const isActive = activeFilters[filter.id]?.includes(option.id);
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    const current = activeFilters[filter.id] || [];
                                                    const newValues = isActive
                                                        ? current.filter(v => v !== option.id)
                                                        : [...current, option.id];
                                                    onFilterChange(filter.id, newValues);
                                                }}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1",
                                                    isActive
                                                        ? "bg-primary text-white"
                                                        : "bg-white/10 text-white/70 hover:bg-white/20"
                                                )}
                                            >
                                                {option.label}
                                                {option.count !== undefined && (
                                                    <span className="text-xs opacity-70">({option.count})</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}

// Sort dropdown
export function SortDropdown({
    options,
    value,
    onChange,
    direction,
    onDirectionChange,
}: {
    options: { id: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    direction: "asc" | "desc";
    onDirectionChange: (direction: "asc" | "desc") => void;
}) {
    const [open, setOpen] = useState(false);

    const currentOption = options.find(o => o.id === value);

    return (
        <div className="relative">
            <div className="flex">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-4 py-2 rounded-l-lg bg-white/5 border border-white/10 hover:bg-white/10"
                >
                    <span className="text-sm text-white/70">Sort by:</span>
                    <span className="text-sm font-medium">{currentOption?.label}</span>
                    <ChevronDown className="h-4 w-4 text-white/50" />
                </button>
                <button
                    onClick={() => onDirectionChange(direction === "asc" ? "desc" : "asc")}
                    className="px-3 py-2 rounded-r-lg bg-white/5 border border-l-0 border-white/10 hover:bg-white/10"
                >
                    {direction === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                    ) : (
                        <SortDesc className="h-4 w-4" />
                    )}
                </button>
            </div>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 z-20 w-48 rounded-lg bg-black/95 border border-white/10 shadow-xl">
                        <div className="p-1">
                            {options.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        onChange(option.id);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-3 py-2 text-left text-sm rounded-lg flex items-center justify-between",
                                        option.id === value
                                            ? "bg-primary/20 text-primary"
                                            : "hover:bg-white/10"
                                    )}
                                >
                                    {option.label}
                                    {option.id === value && <Check className="h-4 w-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// View toggle (grid/list)
export function ViewToggle({
    view,
    onChange,
}: {
    view: "grid" | "list";
    onChange: (view: "grid" | "list") => void;
}) {
    return (
        <div className="flex rounded-lg bg-white/5 border border-white/10 p-1">
            <button
                onClick={() => onChange("grid")}
                className={cn(
                    "p-2 rounded-md transition-colors",
                    view === "grid" ? "bg-white/10" : "hover:bg-white/5"
                )}
                title="Grid view"
            >
                <Grid className="h-4 w-4" />
            </button>
            <button
                onClick={() => onChange("list")}
                className={cn(
                    "p-2 rounded-md transition-colors",
                    view === "list" ? "bg-white/10" : "hover:bg-white/5"
                )}
                title="List view"
            >
                <List className="h-4 w-4" />
            </button>
        </div>
    );
}

// Active filters display
export function ActiveFilters({
    filters,
    onRemove,
    onClearAll,
}: {
    filters: { id: string; label: string; category: string }[];
    onRemove: (id: string) => void;
    onClearAll: () => void;
}) {
    if (filters.length === 0) return null;

    return (
        <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-white/50">Active filters:</span>
            {filters.map(filter => (
                <Badge
                    key={filter.id}
                    className="bg-white/10 text-white/80 gap-1 pr-1"
                >
                    <span className="text-white/40 mr-1">{filter.category}:</span>
                    {filter.label}
                    <button
                        onClick={() => onRemove(filter.id)}
                        className="p-0.5 hover:bg-white/20 rounded"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            <button
                onClick={onClearAll}
                className="text-sm text-primary hover:underline"
            >
                Clear all
            </button>
        </div>
    );
}

// Pagination component
export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showPageNumbers = true,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showPageNumbers?: boolean;
}) {
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </Button>

            {showPageNumbers && getPageNumbers().map((page, i) => (
                page === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-white/40">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                            page === currentPage
                                ? "bg-primary text-white"
                                : "hover:bg-white/10"
                        )}
                    >
                        {page}
                    </button>
                )
            ))}

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
}
