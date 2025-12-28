"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, Badge, Button } from "@/components/ui";
import {
    CheckCircle2,
    Users,
    BookOpen,
    Shield,
    ArrowRight,
    Loader2,
    AlertCircle,
    Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock organization data - in production this would come from API
const mockOrgs: Record<string, { name: string; logo?: string; modules: number; memberCount: number }> = {
    "ABC123": { name: "Acme Corporation", modules: 5, memberCount: 8 },
    "XYZ789": { name: "TechStart Inc.", modules: 3, memberCount: 4 },
    "DEMO01": { name: "Demo Company", modules: 2, memberCount: 1 },
};

interface JoinStep {
    id: number;
    title: string;
    description: string;
}

const steps: JoinStep[] = [
    { id: 1, title: "Review invitation", description: "Confirm the organization" },
    { id: 2, title: "Create account", description: "Sign up or log in" },
    { id: 3, title: "Access training", description: "Start learning" },
];

export default function JoinTeamPage() {
    const params = useParams();
    const router = useRouter();
    const inviteCode = (params.code as string)?.toUpperCase();

    const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "expired">("loading");
    const [currentStep, setCurrentStep] = useState(1);
    const [isJoining, setIsJoining] = useState(false);

    const org = inviteCode ? mockOrgs[inviteCode] : null;

    useEffect(() => {
        // Simulate API call to validate invite code
        const timer = setTimeout(() => {
            if (org) {
                setStatus("valid");
            } else {
                setStatus("invalid");
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [org, inviteCode]);

    const handleJoin = async () => {
        setIsJoining(true);
        // Simulate joining process
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(2);
        // In production, this would redirect to signup/login with invite context
        router.push(`/signup?invite=${inviteCode}`);
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Validating invite code...</p>
                </div>
            </div>
        );
    }

    if (status === "invalid" || !org) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <Card className="max-w-md w-full p-8 text-center bg-white/[0.02] border-white/10">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Invalid Invite Code</h1>
                    <p className="text-muted-foreground mb-6">
                        The invite code "{inviteCode}" is not valid or has expired. Please check the code and try again, or contact the person who invited you.
                    </p>
                    <div className="space-y-3">
                        <Link href="/">
                            <Button className="w-full">Go to Homepage</Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="w-full border-white/10">
                                Log In
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-white/10 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="ZeroG"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold">ZeroG Training</span>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="sm" className="border-white/10">
                            Already have an account?
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {steps.map((step, i) => (
                        <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                                    currentStep > step.id
                                        ? "bg-emerald-500 text-white"
                                        : currentStep === step.id
                                            ? "bg-primary text-white"
                                            : "bg-white/10 text-muted-foreground"
                                )}>
                                    {currentStep > step.id ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <p className="text-sm font-medium">{step.title}</p>
                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={cn(
                                    "w-24 h-0.5 mx-4",
                                    currentStep > step.id ? "bg-emerald-500" : "bg-white/10"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Invitation Card */}
                <Card className="p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10">
                    <div className="text-center mb-8">
                        <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            You're Invited!
                        </Badge>
                        <h1 className="text-3xl font-bold mb-2">Join {org.name}</h1>
                        <p className="text-muted-foreground">
                            You've been invited to access training modules from {org.name}
                        </p>
                    </div>

                    {/* Organization Preview */}
                    <div className="flex items-center justify-center gap-8 mb-8 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mb-2 mx-auto">
                                <Building2 className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="font-semibold">{org.name}</p>
                        </div>
                        <div className="h-16 w-px bg-white/10" />
                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                                    <BookOpen className="h-6 w-6 text-blue-400" />
                                    {org.modules}
                                </div>
                                <p className="text-sm text-muted-foreground">Training Modules</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                                    <Users className="h-6 w-6 text-purple-400" />
                                    {org.memberCount}
                                </div>
                                <p className="text-sm text-muted-foreground">Team Members</p>
                            </div>
                        </div>
                    </div>

                    {/* What You'll Get */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-center">What you'll get access to:</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { icon: BookOpen, title: "Training Modules", desc: "Access all assigned courses" },
                                { icon: Shield, title: "Progress Tracking", desc: "Track your completion status" },
                                { icon: CheckCircle2, title: "Certificates", desc: "Earn certificates on completion" },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                        <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            size="lg"
                            className="gap-2 w-full max-w-sm"
                            onClick={handleJoin}
                            disabled={isJoining}
                        >
                            {isJoining ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                <>
                                    Accept Invitation
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            By joining, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </Card>

                {/* Enter Code Manually */}
                <Card className="mt-8 p-6 bg-white/[0.02] border-white/10">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Have a different invite code?
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <input
                                type="text"
                                placeholder="Enter code"
                                maxLength={6}
                                className="w-32 h-11 px-4 text-center uppercase font-mono text-lg rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:outline-none"
                            />
                            <Button variant="outline" className="border-white/10">
                                Verify
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}
