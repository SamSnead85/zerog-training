// CSV Parser for Employee Import
// Parses CSV files and validates employee data

import {
    CSVEmployeeRow,
    CSVImportResult,
    CSVImportError,
    Employee
} from './types';
import {
    createEmployee,
    getEmployeeByEmail,
    getAllEmployees,
    updateEmployee
} from './store';

// Parse CSV text into rows
function parseCSV(csvText: string): string[][] {
    const lines = csvText.trim().split('\n');
    return lines.map(line => {
        // Handle quoted values with commas
        const result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (const char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    });
}

// Validate email format
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Convert CSV rows to employee objects
export function parseEmployeeCSV(
    csvText: string,
    organizationId: string
): CSVImportResult {
    const rows = parseCSV(csvText);
    const errors: CSVImportError[] = [];
    const importedEmployees: Employee[] = [];

    if (rows.length < 2) {
        return {
            success: false,
            totalRows: 0,
            imported: 0,
            skipped: 0,
            errors: [{ row: 0, message: 'CSV file is empty or has no data rows' }],
            employees: [],
        };
    }

    // Get headers (first row)
    const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));

    // Required columns
    const requiredColumns = ['email', 'first_name', 'last_name'];
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));

    if (missingColumns.length > 0) {
        return {
            success: false,
            totalRows: rows.length - 1,
            imported: 0,
            skipped: rows.length - 1,
            errors: [{
                row: 0,
                message: `Missing required columns: ${missingColumns.join(', ')}`
            }],
            employees: [],
        };
    }

    // Column indices
    const emailIdx = headers.indexOf('email');
    const firstNameIdx = headers.indexOf('first_name');
    const lastNameIdx = headers.indexOf('last_name');
    const managerEmailIdx = headers.indexOf('manager_email');
    const departmentIdx = headers.indexOf('department');
    const roleIdx = headers.indexOf('role');

    // First pass: create all employees without manager relationships
    const emailToId: Map<string, string> = new Map();

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const email = row[emailIdx]?.trim();
        const firstName = row[firstNameIdx]?.trim();
        const lastName = row[lastNameIdx]?.trim();

        // Skip empty rows
        if (!email && !firstName && !lastName) continue;

        // Validate email
        if (!email || !isValidEmail(email)) {
            errors.push({ row: i + 1, email, message: 'Invalid or missing email address' });
            continue;
        }

        // Validate name
        if (!firstName || !lastName) {
            errors.push({ row: i + 1, email, message: 'First name and last name are required' });
            continue;
        }

        // Check for duplicates in CSV
        if (emailToId.has(email.toLowerCase())) {
            errors.push({ row: i + 1, email, message: 'Duplicate email in CSV' });
            continue;
        }

        // Check if already exists in system
        const existing = getEmployeeByEmail(email);
        if (existing) {
            errors.push({ row: i + 1, email, message: 'Employee already exists in system' });
            emailToId.set(email.toLowerCase(), existing.id);
            continue;
        }

        // Create employee
        const employee = createEmployee({
            email,
            firstName,
            lastName,
            department: departmentIdx >= 0 ? row[departmentIdx]?.trim() : undefined,
            role: roleIdx >= 0 ? row[roleIdx]?.trim() : undefined,
            organizationId,
        });

        emailToId.set(email.toLowerCase(), employee.id);
        importedEmployees.push(employee);
    }

    // Second pass: set manager relationships
    if (managerEmailIdx >= 0) {
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const email = row[emailIdx]?.trim().toLowerCase();
            const managerEmail = row[managerEmailIdx]?.trim().toLowerCase();

            if (!email || !managerEmail) continue;

            const employeeId = emailToId.get(email);
            const managerId = emailToId.get(managerEmail);

            if (employeeId && managerId && employeeId !== managerId) {
                updateEmployee(employeeId, { managerId });
            }
        }
    }

    return {
        success: errors.length === 0,
        totalRows: rows.length - 1,
        imported: importedEmployees.length,
        skipped: (rows.length - 1) - importedEmployees.length,
        errors,
        employees: importedEmployees,
    };
}

// Generate sample CSV content for download
export function generateSampleCSV(): string {
    return `email,first_name,last_name,manager_email,department,role
john.doe@company.com,John,Doe,jane.smith@company.com,Engineering,Senior Developer
sarah.jones@company.com,Sarah,Jones,jane.smith@company.com,Engineering,Developer
jane.smith@company.com,Jane,Smith,,Engineering,Engineering Manager
mike.brown@company.com,Mike,Brown,jane.smith@company.com,Engineering,Junior Developer
emily.davis@company.com,Emily,Davis,jane.smith@company.com,Engineering,DevOps Engineer`;
}
