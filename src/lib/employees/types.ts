// Employee Onboarding Types
// Used for CSV import and manager-employee relationships

export type EmployeeStatus = 'pending' | 'invited' | 'active' | 'inactive';
export type AssignmentStatus = 'assigned' | 'in_progress' | 'completed' | 'overdue';

export interface Employee {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    department?: string;
    role?: string;
    managerId?: string;
    organizationId: string;
    status: EmployeeStatus;
    createdAt: Date;
    invitedAt?: Date;
    lastLoginAt?: Date;
}

export interface TrainingAssignment {
    id: string;
    employeeId: string;
    certificationId: string; // foundations, associate, professional, architect
    assignedBy: string;
    dueDate?: Date;
    status: AssignmentStatus;
    assignedAt: Date;
    completedAt?: Date;
    progress: number; // 0-100
}

export interface Organization {
    id: string;
    name: string;
    domain: string;
    createdAt: Date;
    settings: {
        autoInvite: boolean;
        defaultCertification?: string;
    };
}

// CSV Import Types
export interface CSVEmployeeRow {
    email: string;
    first_name: string;
    last_name: string;
    manager_email?: string;
    department?: string;
    role?: string;
}

export interface CSVImportResult {
    success: boolean;
    totalRows: number;
    imported: number;
    skipped: number;
    errors: CSVImportError[];
    employees: Employee[];
}

export interface CSVImportError {
    row: number;
    email?: string;
    message: string;
}

// Manager View Types
export interface TeamMember extends Employee {
    assignments: TrainingAssignment[];
    completedCertifications: string[];
}

export interface ManagerDashboardData {
    manager: Employee;
    teamMembers: TeamMember[];
    teamStats: {
        totalMembers: number;
        activeMembers: number;
        averageProgress: number;
        completedCertifications: number;
    };
}
