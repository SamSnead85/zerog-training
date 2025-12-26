import { BulkAssignmentWizard } from "@/components/assignments/BulkAssignmentWizard";

export default function AssignPage() {
    return (
        <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">Assign Training</h1>
            <BulkAssignmentWizard />
        </div>
    );
}
