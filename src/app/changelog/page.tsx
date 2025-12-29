import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";

const releases = [
    {
        version: "2.5.0",
        date: "December 20, 2024",
        type: "feature",
        changes: [
            "AI-powered training generation with document upload",
            "New Netflix-style content library",
            "Enhanced dashboard with gamification elements",
            "Team progress tracking and analytics",
        ],
    },
    {
        version: "2.4.0",
        date: "December 1, 2024",
        type: "feature",
        changes: [
            "SCORM export for LMS integration",
            "Custom branding for enterprise customers",
            "Improved quiz builder with new question types",
            "SSO support for Azure AD and Okta",
        ],
    },
    {
        version: "2.3.5",
        date: "November 15, 2024",
        type: "fix",
        changes: [
            "Fixed video playback issues on Safari",
            "Improved loading performance by 40%",
            "Bug fixes for certificate generation",
        ],
    },
    {
        version: "2.3.0",
        date: "November 1, 2024",
        type: "feature",
        changes: [
            "Learning paths with certification tracks",
            "Leaderboards and achievements system",
            "Mobile-responsive training viewer",
        ],
    },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="font-playfair italic">ScaledNative<sup className="text-[10px]">™</sup></span>
                            <span className="text-muted-foreground ml-1 font-light">Training</span>
                        </span>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Changelog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        All the latest updates, improvements, and fixes to ScaledNative.
                    </p>
                </div>
            </section>

            {/* Releases */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                        <div className="space-y-12">
                            {releases.map((release) => (
                                <div key={release.version} className="relative pl-12">
                                    {/* Timeline dot */}
                                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-xl font-bold">v{release.version}</h2>
                                        <Badge variant={release.type === "feature" ? "default" : "secondary"}>
                                            {release.type === "feature" ? "New Features" : "Bug Fixes"}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">{release.date}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {release.changes.map((change, i) => (
                                            <li key={i} className="text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
                    <p>© 2024 ScaledNative. All rights reserved.</p>
                    <Link href="/" className="hover:text-foreground">Back to Home</Link>
                </div>
            </footer>
        </div>
    );
}
