"use client";

import { useState } from "react";
import { Button, Badge } from "@/components/ui";
import { UserPlus, Mail, CheckCircle, Loader2, X, Gift, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
}

export function InviteModal({ isOpen, onClose, userName = "member" }: InviteModalProps) {
    const [emails, setEmails] = useState("");
    const [message, setMessage] = useState(
        "I've been learning AI-Native development on ScaledNative and thought you'd find it valuable. Join me!"
    );
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emails.trim()) return;

        setStatus("loading");

        try {
            const emailList = emails.split(",").map((e) => e.trim()).filter(Boolean);

            const response = await fetch("/api/invites/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emails: emailList,
                    message,
                    inviterName: userName
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus("success");
                setResponseMessage(`Sent ${data.sent} invite${data.sent !== 1 ? "s" : ""}!`);
                setEmails("");
            } else {
                const data = await response.json();
                setStatus("error");
                setResponseMessage(data.error || "Failed to send invites. Please try again.");
            }
        } catch {
            setStatus("error");
            setResponseMessage("Network error. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <X className="h-5 w-5 text-white/50" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Invite Colleagues</h2>
                        <p className="text-sm text-white/50">Share the AI-Native journey</p>
                    </div>
                </div>

                {status === "success" ? (
                    <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{responseMessage}</h3>
                        <p className="text-sm text-white/50 mb-6">
                            Your colleagues will receive an invitation email with a special welcome offer.
                        </p>
                        <Button onClick={() => { setStatus("idle"); onClose(); }}>
                            Done
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Benefit banner */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <Gift className="h-5 w-5 text-amber-400 flex-shrink-0" />
                            <p className="text-sm text-amber-200">
                                Invitees get 10% off their first purchase
                            </p>
                        </div>

                        {/* Email input */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Email addresses (comma-separated)
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                                <input
                                    type="text"
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                    placeholder="colleague@company.com, friend@email.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Personal message */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Personal message (optional)
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-white/40 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-sm text-red-400">{responseMessage}</p>
                        )}

                        {/* Submit */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={status === "loading" || !emails.trim()}
                                className="flex-1 gap-2"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                {status === "loading" ? "Sending..." : "Send Invites"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// Invite button component for use in dashboard/navigation
interface InviteButtonProps {
    userName?: string;
    className?: string;
    variant?: "default" | "outline" | "ghost";
}

export function InviteButton({ userName, className, variant = "outline" }: InviteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                onClick={() => setIsOpen(true)}
                className={cn("gap-2", className)}
            >
                <UserPlus className="h-4 w-4" />
                Invite
            </Button>
            <InviteModal isOpen={isOpen} onClose={() => setIsOpen(false)} userName={userName} />
        </>
    );
}
