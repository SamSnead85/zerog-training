"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Building2,
    Mail,
    User,
    Briefcase,
    Users,
    Check,
    Sparkles,
    ArrowRight,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface DemoRequestFormData {
    name: string;
    email: string;
    company: string;
    role: string;
    teamSize: string;
    message?: string;
}

interface RequestDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// =============================================================================
// LEAD STORAGE
// =============================================================================

const LEADS_KEY = "zerog_demo_leads";

async function saveLead(data: DemoRequestFormData): Promise<{ success: boolean }> {
    // Try to save to database via API
    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Lead saved to database successfully");
            return { success: true };
        }
    } catch (error) {
        console.log("Database unavailable, saving to localStorage");
    }

    // Fallback to localStorage if API fails
    const existingLeads = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
    const lead = {
        ...data,
        submittedAt: new Date().toISOString(),
        id: `lead_${Date.now()}`,
    };
    existingLeads.push(lead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(existingLeads));

    // Log for manual follow-up
    console.log("=== NEW DEMO REQUEST LEAD ===");
    console.log(`Name: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Company: ${data.company}`);
    console.log(`Role: ${data.role}`);
    console.log(`Team Size: ${data.teamSize}`);
    if (data.message) console.log(`Message: ${data.message}`);
    console.log(`Submitted: ${new Date().toLocaleString()}`);
    console.log("=== END LEAD ===");

    return { success: true };
}

// =============================================================================
// REQUEST DEMO MODAL
// =============================================================================

export function RequestDemoModal({ isOpen, onClose }: RequestDemoModalProps) {
    const [formData, setFormData] = useState<DemoRequestFormData>({
        name: "",
        email: "",
        company: "",
        role: "",
        teamSize: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name || !formData.email) {
            setError("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        // Save lead (tries API first, falls back to localStorage)
        await saveLead(formData);

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setFormData({
            name: "",
            email: "",
            company: "",
            role: "",
            teamSize: "",
            message: "",
        });
        setError(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 shadow-2xl overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                            >
                                <X className="h-5 w-5 text-white/60" />
                            </button>

                            {!isSubmitted ? (
                                <>
                                    {/* Header */}
                                    <div className="p-6 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                                <Sparkles className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Contact Sales</h2>
                                                <p className="text-sm text-white/50">sales@scalednative.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                                        {error && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Name */}
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="Full name *"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                                <input
                                                    type="email"
                                                    placeholder="Work email *"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Company */}
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="Company"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                                />
                                            </div>

                                            {/* Role */}
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="Job title"
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Team Size */}
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                            <select
                                                value={formData.teamSize}
                                                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-zinc-900">Team size</option>
                                                <option value="1-10" className="bg-zinc-900">1-10 employees</option>
                                                <option value="11-50" className="bg-zinc-900">11-50 employees</option>
                                                <option value="51-200" className="bg-zinc-900">51-200 employees</option>
                                                <option value="201-1000" className="bg-zinc-900">201-1000 employees</option>
                                                <option value="1000+" className="bg-zinc-900">1000+ employees</option>
                                            </select>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={cn(
                                                "w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                                                isSubmitting
                                                    ? "bg-white/20 cursor-not-allowed"
                                                    : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Contact Sales
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-white/40 text-center">
                                            By submitting, you agree to our{" "}
                                            <a href="/privacy" className="underline hover:text-white/60">Privacy Policy</a>
                                        </p>
                                    </form>
                                </>
                            ) : (
                                /* Success State */
                                <div className="p-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                                        className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"
                                    >
                                        <Check className="h-8 w-8 text-emerald-400" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl font-bold text-white mb-2"
                                    >
                                        Message Received!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/50 mb-6"
                                    >
                                        Our sales team will reach out within 24 hours.
                                    </motion.p>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        onClick={handleClose}
                                        className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                                    >
                                        Close
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// =============================================================================
// DEMO REQUEST BUTTON (convenience wrapper)
// =============================================================================

interface DemoButtonProps {
    className?: string;
    children?: React.ReactNode;
    variant?: "primary" | "secondary";
}

export function DemoButton({ className, children, variant = "primary" }: DemoButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    variant === "primary"
                        ? "px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all"
                        : "px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all",
                    className
                )}
            >
                {children || "Contact Sales"}
            </button>
            <RequestDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
