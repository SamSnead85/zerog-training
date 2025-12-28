"use client";

/**
 * Data Table Component
 * 
 * Production-ready data table with sorting, pagination,
 * filtering, selection, and responsive design.
 */

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Badge } from "@/components/ui";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Search,
    Filter,
    MoreHorizontal,
    Check,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export interface Column<T> {
    id: string;
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    sortable?: boolean;
    width?: string;
    className?: string;
    cell?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string | number }> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
    searchable?: boolean;
    searchKeys?: (keyof T)[];
    selectable?: boolean;
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    loading?: boolean;
    className?: string;
}

type SortDirection = "asc" | "desc" | null;

// =============================================================================
// COMPONENT
// =============================================================================

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    pageSize = 10,
    searchable = true,
    searchKeys,
    selectable = false,
    onSelectionChange,
    onRowClick,
    emptyMessage = "No data available",
    loading = false,
    className,
}: DataTableProps<T>) {
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data;

        const query = searchQuery.toLowerCase();
        const keys = searchKeys || (columns.map((c) => c.id) as (keyof T)[]);

        return data.filter((row) =>
            keys.some((key) => {
                const value = row[key];
                if (value == null) return false;
                return String(value).toLowerCase().includes(query);
            })
        );
    }, [data, searchQuery, searchKeys, columns]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortColumn || !sortDirection) return filteredData;

        const column = columns.find((c) => c.id === sortColumn);
        if (!column) return filteredData;

        return [...filteredData].sort((a, b) => {
            let aValue: unknown;
            let bValue: unknown;

            if (typeof column.accessor === "function") {
                aValue = column.accessor(a);
                bValue = column.accessor(b);
            } else {
                aValue = a[column.accessor];
                bValue = b[column.accessor];
            }

            if (aValue == null) return sortDirection === "asc" ? 1 : -1;
            if (bValue == null) return sortDirection === "asc" ? -1 : 1;

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortDirection, columns]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const start = page * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, page, pageSize]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handleSort = (columnId: string) => {
        if (sortColumn === columnId) {
            if (sortDirection === "asc") setSortDirection("desc");
            else if (sortDirection === "desc") {
                setSortColumn(null);
                setSortDirection(null);
            }
        } else {
            setSortColumn(columnId);
            setSortDirection("asc");
        }
    };

    const handleSelectAll = () => {
        if (selectedIds.size === paginatedData.length) {
            setSelectedIds(new Set());
            onSelectionChange?.([]);
        } else {
            const newSelected = new Set(paginatedData.map((row) => row.id));
            setSelectedIds(newSelected);
            onSelectionChange?.([...newSelected]);
        }
    };

    const handleSelectRow = (id: string | number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
        onSelectionChange?.([...newSelected]);
    };

    const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
        if (column.cell) return column.cell(row);
        if (typeof column.accessor === "function") return column.accessor(row);
        return row[column.accessor] as React.ReactNode;
    };

    const getSortIcon = (columnId: string) => {
        if (sortColumn !== columnId) return <ArrowUpDown className="h-4 w-4 text-muted-foreground/50" />;
        if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;
        return <ArrowDown className="h-4 w-4" />;
    };

    return (
        <div className={cn("rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden", className)}>
            {/* Toolbar */}
            {searchable && (
                <div className="p-4 border-b border-border">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(0);
                            }}
                            className="pl-10"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            {selectable && (
                                <th className="w-12 p-3">
                                    <button
                                        onClick={handleSelectAll}
                                        className={cn(
                                            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                            selectedIds.size === paginatedData.length && paginatedData.length > 0
                                                ? "bg-primary border-primary"
                                                : "border-white/30 hover:border-white/50"
                                        )}
                                    >
                                        {selectedIds.size === paginatedData.length && paginatedData.length > 0 && (
                                            <Check className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </button>
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className={cn(
                                        "p-3 text-left text-sm font-medium text-muted-foreground",
                                        column.width,
                                        column.className
                                    )}
                                >
                                    {column.sortable !== false ? (
                                        <button
                                            onClick={() => handleSort(column.id)}
                                            className="flex items-center gap-2 hover:text-foreground transition-colors"
                                        >
                                            {column.header}
                                            {getSortIcon(column.id)}
                                        </button>
                                    ) : (
                                        column.header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <span className="text-muted-foreground">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-muted-foreground">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick?.(row)}
                                    className={cn(
                                        "border-b border-border/50 transition-colors",
                                        onRowClick && "cursor-pointer hover:bg-white/5",
                                        selectedIds.has(row.id) && "bg-primary/5"
                                    )}
                                >
                                    {selectable && (
                                        <td className="w-12 p-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectRow(row.id);
                                                }}
                                                className={cn(
                                                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                    selectedIds.has(row.id)
                                                        ? "bg-primary border-primary"
                                                        : "border-white/30 hover:border-white/50"
                                                )}
                                            >
                                                {selectedIds.has(row.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                                            </button>
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={column.id} className={cn("p-3 text-sm", column.className)}>
                                            {getCellValue(row, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, sortedData.length)} of{" "}
                        {sortedData.length} results
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPage(0)}
                            disabled={page === 0}
                            className="h-8 w-8"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-3 text-sm">
                            Page {page + 1} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages - 1}
                            className="h-8 w-8"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPage(totalPages - 1)}
                            disabled={page >= totalPages - 1}
                            className="h-8 w-8"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataTable;
