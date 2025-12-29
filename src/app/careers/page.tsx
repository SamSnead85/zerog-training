import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

const openings = [
    { title: "Senior Full-Stack Engineer", location: "Remote", type: "Full-time", dept: "Engineering" },
    { title: "Machine Learning Engineer", location: "Remote", type: "Full-time", dept: "AI/ML" },
    { title: "Product Designer", location: "Remote", type: "Full-time", dept: "Design" },
    { title: "Customer Success Manager", location: "Remote", type: "Full-time", dept: "Customer Success" },
    { title: "Technical Writer", location: "Remote", type: "Contract", dept: "Content" },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Zero G</span>
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
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Join <span className="text-primary">Zero G</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Help us build the future of enterprise training. We're looking for passionate people who want to make learning more effective.
                    </p>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {openings.map((job) => (
                            <div key={job.title} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" />
                                                {job.dept}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="gap-2">
                                        Apply <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
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
