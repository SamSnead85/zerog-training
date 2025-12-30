// Employee Data Store
// In-memory store for development - can be swapped for DB later

import {
    Employee,
    TrainingAssignment,
    Organization,
    TeamMember,
    ManagerDashboardData,
    EmployeeStatus,
    AssignmentStatus
} from './types';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// In-memory storage
let employees: Employee[] = [];
let assignments: TrainingAssignment[] = [];
let organizations: Organization[] = [];

// Default organization for demo
const defaultOrg: Organization = {
    id: 'org-default',
    name: 'Demo Organization',
    domain: 'demo.com',
    createdAt: new Date(),
    settings: {
        autoInvite: false,
    }
};
organizations.push(defaultOrg);

// =============================================================================
// EMPLOYEE OPERATIONS
// =============================================================================

export function createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'status'>): Employee {
    const employee: Employee = {
        ...data,
        id: generateId(),
        status: 'pending',
        createdAt: new Date(),
    };
    employees.push(employee);
    return employee;
}

export function getEmployeeById(id: string): Employee | undefined {
    return employees.find(e => e.id === id);
}

export function getEmployeeByEmail(email: string): Employee | undefined {
    return employees.find(e => e.email.toLowerCase() === email.toLowerCase());
}

export function getEmployeesByOrganization(orgId: string): Employee[] {
    return employees.filter(e => e.organizationId === orgId);
}

export function getEmployeesByManager(managerId: string): Employee[] {
    return employees.filter(e => e.managerId === managerId);
}

export function updateEmployee(id: string, updates: Partial<Employee>): Employee | undefined {
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    employees[index] = { ...employees[index], ...updates };
    return employees[index];
}

export function inviteEmployee(id: string): Employee | undefined {
    return updateEmployee(id, {
        status: 'invited',
        invitedAt: new Date()
    });
}

export function getAllEmployees(): Employee[] {
    return [...employees];
}

// =============================================================================
// TRAINING ASSIGNMENT OPERATIONS
// =============================================================================

export function createAssignment(
    employeeId: string,
    certificationId: string,
    assignedBy: string,
    dueDate?: Date
): TrainingAssignment {
    const assignment: TrainingAssignment = {
        id: generateId(),
        employeeId,
        certificationId,
        assignedBy,
        dueDate,
        status: 'assigned',
        assignedAt: new Date(),
        progress: 0,
    };
    assignments.push(assignment);
    return assignment;
}

export function getAssignmentsByEmployee(employeeId: string): TrainingAssignment[] {
    return assignments.filter(a => a.employeeId === employeeId);
}

export function getAssignmentsByManager(managerId: string): TrainingAssignment[] {
    const teamMembers = getEmployeesByManager(managerId);
    const teamIds = teamMembers.map(m => m.id);
    return assignments.filter(a => teamIds.includes(a.employeeId));
}

export function updateAssignment(id: string, updates: Partial<TrainingAssignment>): TrainingAssignment | undefined {
    const index = assignments.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    assignments[index] = { ...assignments[index], ...updates };
    return assignments[index];
}

// =============================================================================
// MANAGER DASHBOARD DATA
// =============================================================================

export function getManagerDashboardData(managerId: string): ManagerDashboardData | undefined {
    const manager = getEmployeeById(managerId);
    if (!manager) return undefined;

    const teamMembers = getEmployeesByManager(managerId);
    const teamMembersWithAssignments: TeamMember[] = teamMembers.map(member => {
        const memberAssignments = getAssignmentsByEmployee(member.id);
        return {
            ...member,
            assignments: memberAssignments,
            completedCertifications: memberAssignments
                .filter(a => a.status === 'completed')
                .map(a => a.certificationId),
        };
    });

    const totalProgress = teamMembersWithAssignments.reduce((sum, m) => {
        const avgProgress = m.assignments.length > 0
            ? m.assignments.reduce((s, a) => s + a.progress, 0) / m.assignments.length
            : 0;
        return sum + avgProgress;
    }, 0);

    return {
        manager,
        teamMembers: teamMembersWithAssignments,
        teamStats: {
            totalMembers: teamMembers.length,
            activeMembers: teamMembers.filter(m => m.status === 'active').length,
            averageProgress: teamMembers.length > 0 ? totalProgress / teamMembers.length : 0,
            completedCertifications: teamMembersWithAssignments.reduce(
                (sum, m) => sum + m.completedCertifications.length, 0
            ),
        },
    };
}

// =============================================================================
// BULK OPERATIONS (for CSV import)
// =============================================================================

export function bulkCreateEmployees(employeeData: Omit<Employee, 'id' | 'createdAt' | 'status'>[]): Employee[] {
    return employeeData.map(data => createEmployee(data));
}

export function clearAllData(): void {
    employees = [];
    assignments = [];
}

// =============================================================================
// SEED DATA FOR DEMO
// =============================================================================

export function seedDemoData(): void {
    // Create a demo manager
    const manager = createEmployee({
        email: 'jane.smith@demo.com',
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Engineering',
        role: 'Engineering Manager',
        organizationId: 'org-default',
    });
    updateEmployee(manager.id, { status: 'active' });

    // Create team members
    const teamData = [
        { firstName: 'John', lastName: 'Doe', role: 'Senior Developer' },
        { firstName: 'Sarah', lastName: 'Jones', role: 'Developer' },
        { firstName: 'Mike', lastName: 'Brown', role: 'Junior Developer' },
        { firstName: 'Emily', lastName: 'Davis', role: 'DevOps Engineer' },
    ];

    teamData.forEach((data, i) => {
        const member = createEmployee({
            email: `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@demo.com`,
            firstName: data.firstName,
            lastName: data.lastName,
            department: 'Engineering',
            role: data.role,
            managerId: manager.id,
            organizationId: 'org-default',
        });
        updateEmployee(member.id, { status: i < 3 ? 'active' : 'invited' });

        // Assign some training
        if (i < 2) {
            const assignment = createAssignment(member.id, 'foundations', manager.id);
            updateAssignment(assignment.id, {
                progress: i === 0 ? 75 : 30,
                status: 'in_progress'
            });
        }
    });
}
