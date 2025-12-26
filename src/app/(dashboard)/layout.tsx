import { Sidebar, TopBar } from "@/components/layout";
import { CommandPalette } from "@/components/navigation/CommandPalette";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
            <CommandPalette />
        </div>
    );
}
