/**
 * Data Export Utilities
 * 
 * Export data to various formats including CSV, JSON, Excel, and PDF.
 */

// =============================================================================
// TYPES
// =============================================================================

export type ExportFormat = "csv" | "json" | "xlsx" | "pdf";

export interface ExportOptions {
    filename: string;
    format: ExportFormat;
    includeHeaders?: boolean;
    dateFormat?: string;
}

export interface ColumnConfig {
    key: string;
    label: string;
    format?: (value: unknown) => string;
}

// =============================================================================
// CSV EXPORT
// =============================================================================

export function exportToCSV<T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnConfig[],
    options: Omit<ExportOptions, "format">
): void {
    const { filename, includeHeaders = true } = options;

    const rows: string[] = [];

    // Headers
    if (includeHeaders) {
        rows.push(columns.map((col) => escapeCSV(col.label)).join(","));
    }

    // Data rows
    data.forEach((row) => {
        const values = columns.map((col) => {
            const value = row[col.key];
            const formatted = col.format ? col.format(value) : String(value ?? "");
            return escapeCSV(formatted);
        });
        rows.push(values.join(","));
    });

    const csv = rows.join("\n");
    downloadFile(csv, `${filename}.csv`, "text/csv");
}

function escapeCSV(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

// =============================================================================
// JSON EXPORT
// =============================================================================

export function exportToJSON<T>(
    data: T[],
    options: Omit<ExportOptions, "format">
): void {
    const { filename } = options;
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${filename}.json`, "application/json");
}

// =============================================================================
// EXCEL-COMPATIBLE CSV EXPORT
// =============================================================================

export function exportToExcel<T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnConfig[],
    options: Omit<ExportOptions, "format">
): void {
    const { filename, includeHeaders = true } = options;

    // BOM for Excel UTF-8 compatibility
    const BOM = "\uFEFF";
    const rows: string[] = [];

    // Headers
    if (includeHeaders) {
        rows.push(columns.map((col) => escapeCSV(col.label)).join("\t"));
    }

    // Data rows (tab-separated for Excel)
    data.forEach((row) => {
        const values = columns.map((col) => {
            const value = row[col.key];
            const formatted = col.format ? col.format(value) : String(value ?? "");
            return formatted.replace(/\t/g, " ");
        });
        rows.push(values.join("\t"));
    });

    const tsv = BOM + rows.join("\n");
    downloadFile(tsv, `${filename}.xlsx`, "application/vnd.ms-excel");
}

// =============================================================================
// PDF EXPORT (Simple table format)
// =============================================================================

export function exportToPDF<T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnConfig[],
    options: Omit<ExportOptions, "format"> & { title?: string }
): void {
    const { filename, title = "Report" } = options;

    // Generate HTML for print
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body { font-family: 'Helvetica', sans-serif; margin: 40px; }
                h1 { font-size: 24px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
                th { background-color: #f5f5f5; font-weight: 600; }
                tr:nth-child(even) { background-color: #fafafa; }
                .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">Generated on ${new Date().toLocaleString()} • ${data.length} records</div>
            <table>
                <thead>
                    <tr>
                        ${columns.map((col) => `<th>${col.label}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${data.map((row) => `
                        <tr>
                            ${columns.map((col) => {
        const value = row[col.key];
        const formatted = col.format ? col.format(value) : String(value ?? "");
        return `<td>${formatted}</td>`;
    }).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </body>
        </html>
    `;

    // Open print dialog
    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// =============================================================================
// UNIFIED EXPORT FUNCTION
// =============================================================================

export function exportData<T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnConfig[],
    options: ExportOptions
): void {
    switch (options.format) {
        case "csv":
            exportToCSV(data, columns, options);
            break;
        case "json":
            exportToJSON(data, options);
            break;
        case "xlsx":
            exportToExcel(data, columns, options);
            break;
        case "pdf":
            exportToPDF(data, columns, options);
            break;
    }
}

// =============================================================================
// COMMON FORMATTERS
// =============================================================================

export const formatters = {
    date: (value: unknown) => {
        if (!value) return "";
        return new Date(value as string).toLocaleDateString();
    },
    datetime: (value: unknown) => {
        if (!value) return "";
        return new Date(value as string).toLocaleString();
    },
    number: (value: unknown) => {
        if (value === null || value === undefined) return "";
        return Number(value).toLocaleString();
    },
    currency: (value: unknown) => {
        if (value === null || value === undefined) return "";
        return `$${Number(value).toFixed(2)}`;
    },
    percent: (value: unknown) => {
        if (value === null || value === undefined) return "";
        return `${(Number(value) * 100).toFixed(1)}%`;
    },
    duration: (minutes: unknown) => {
        if (!minutes) return "";
        const m = Number(minutes);
        const hours = Math.floor(m / 60);
        const mins = m % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    },
    boolean: (value: unknown) => {
        return value ? "Yes" : "No";
    },
};

export default {
    exportToCSV,
    exportToJSON,
    exportToExcel,
    exportToPDF,
    exportData,
    formatters,
};
