"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    GraduationCap,
    ArrowRight,
    CheckCircle2,
    BookOpen,
    Trophy,
    X
} from "lucide-react";
import Link from "next/link";
import { useAuthSafe } from "@/lib/auth/AuthContext";

const WELCOME_SHOWN_KEY = "zerog_welcome_shown";

interface WelcomeModalProps {
    userName?: string;
    certificationPath?: string;
}

export function WelcomeModal({ userName, certificationPath }: WelcomeModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuthSafe();
    const user = auth?.user;

    // Check if this is the first time the user is seeing the dashboard
    useEffect(() => {
        if (user && typeof window !== "undefined") {
            const welcomeKey = `${WELCOME_SHOWN_KEY}_${user.id}`;
            const hasShownWelcome = localStorage.getItem(welcomeKey);

            if (!hasShownWelcome) {
                // Small delay for better UX after page load
                const timer = setTimeout(() => setIsOpen(true), 500);
                return () => clearTimeout(timer);
            }
        }
    }, [user]);

    const handleClose = () => {
        if (user) {
            localStorage.setItem(`${WELCOME_SHOWN_KEY}_${user.id}`, "true");
        }
        setIsOpen(false);
    };

    const displayName = userName || user?.name || "there";
    const assignedPath = certificationPath || "AI-Native Foundations";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-4"
                    >
                        <div className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                            >
                                <X className="h-4 w-4 text-white/60" />
                            </button>

                            {/* Header with celebration */}
                            <div className="p-8 pb-6 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4"
                                >
                                    <Sparkles className="h-8 w-8 text-white" />
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold text-white mb-2"
                                >
                                    Welcome to ScaledNative, {displayName}! 🎉
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/50"
                                >
                                    You've been enrolled in AI-Native training. Here's what's next.
                                </motion.p>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-6 space-y-4">
                                {/* Assigned Training */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                                >
                                    <div className="p-2 rounded-lg bg-cyan-500/20">
                                        <GraduationCap className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Your Assigned Training</h3>
                                        <p className="text-sm text-white/60 mt-1">{assignedPath}</p>
                                    </div>
                                </motion.div>

                                {/* Quick tips */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        <span>Complete modules at your own pace</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        <span>Track your progress in the dashboard</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        <span>Earn your certification upon completion</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CTA */}
                            <div className="px-8 pb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Link
                                        href="/training"
                                        onClick={handleClose}
                                        className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-white text-black font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                                    >
                                        Start Training
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={handleClose}
                                    className="w-full mt-3 py-2 text-sm text-white/50 hover:text-white/70 transition-colors"
                                >
                                    I'll explore on my own
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
