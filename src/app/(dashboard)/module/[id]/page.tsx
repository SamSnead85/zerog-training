import { TrainingModuleViewer } from "@/components/training/TrainingModuleViewer";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ModuleViewPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <div className="p-6 lg:p-8">
            <TrainingModuleViewer moduleId={id} />
        </div>
    );
}
