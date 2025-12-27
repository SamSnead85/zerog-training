import { TrainingModuleViewer } from "@/components/training/TrainingModuleViewer";

export default function ModuleViewPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-6 lg:p-8">
            <TrainingModuleViewer />
        </div>
    );
}
