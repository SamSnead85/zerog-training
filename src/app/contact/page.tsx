"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail,
    MessageCircle,
    Building2,
    Phone,
    MapPin,
    Send,
    Check,
    ChevronDown,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// CONTACT FORM DATA
// =============================================================================

const inquiryTypes = [
    { id: "demo", label: "Request a Demo" },
    { id: "enterprise", label: "Enterprise Sales" },
    { id: "support", label: "Technical Support" },
    { id: "partnership", label: "Partnership Inquiry" },
    { id: "press", label: "Press & Media" },
    { id: "other", label: "Other" },
];

const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees",
];

// =============================================================================
// CONTACT PAGE
// =============================================================================

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        companySize: "",
        inquiryType: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error("Contact form submission failed");
            }
        } catch (error) {
            console.error("Contact form error:", error);
        }

        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-6xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/catalog" className="text-sm text-white/60 hover:text-white transition-colors">Catalog</Link>
                        <Link href="/enterprise" className="text-sm text-white/60 hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/contact" className="text-sm text-white font-medium">Contact</Link>
                    </nav>
                </div>
            </header>

            <main className="px-6 py-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Info */}
                    <div>
                        <h1 className="font-montserrat text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-lg text-white/50 mb-8">
                            Have questions about our AI training platform? We'd love to hear from you.
                            Our team is here to help.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-white/60" />
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Email Us</p>
                                    <a href="mailto:hello@scalednative.com" className="text-white/50 hover:text-white">
                                        hello@scalednative.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-white/60" />
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Call Us</p>
                                    <a href="tel:+18005551234" className="text-white/50 hover:text-white">
                                        +1 (800) 555-1234
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-white/60" />
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Office</p>
                                    <p className="text-white/50">
                                        123 Innovation Way<br />
                                        San Francisco, CA 94105
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <Link href="/demo" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-sm">Schedule a Demo</span>
                                    <span className="text-white/40">→</span>
                                </Link>
                                <Link href="/enterprise" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-sm">Enterprise Solutions</span>
                                    <span className="text-white/40">→</span>
                                </Link>
                                <Link href="/pricing" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-sm">View Pricing</span>
                                    <span className="text-white/40">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-white/40 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/40 mb-2">Work Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-white/40 mb-2">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                            placeholder="Your Company"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/40 mb-2">Company Size</label>
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 appearance-none"
                                        >
                                            <option value="">Select size</option>
                                            {companySizes.map(size => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-white/40 mb-2">Inquiry Type *</label>
                                    <select
                                        name="inquiryType"
                                        required
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 appearance-none"
                                    >
                                        <option value="">Select inquiry type</option>
                                        {inquiryTypes.map(type => (
                                            <option key={type.id} value={type.id}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-white/40 mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 resize-none"
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2",
                                        isSubmitting
                                            ? "bg-white/50 cursor-not-allowed"
                                            : "bg-white text-black hover:bg-white/90"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-white/30 text-center">
                                    By submitting, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
                                </p>
                            </form>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                    <Check className="h-8 w-8 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                                <p className="text-white/50 mb-6">
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({
                                            name: "",
                                            email: "",
                                            company: "",
                                            companySize: "",
                                            inquiryType: "",
                                            message: "",
                                        });
                                    }}
                                    className="text-sm text-white/40 hover:text-white"
                                >
                                    Send another message
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-white/30">
                    <span>© 2025 ScaledNative™. All rights reserved.</span>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
