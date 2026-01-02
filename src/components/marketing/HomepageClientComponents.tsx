"use client";

import { useState } from "react";
import { RequestDemoModal } from "@/components/marketing/RequestDemoModal";

interface HomepageWrapperProps {
    children: React.ReactNode;
}

export function HomepageWrapper({ children }: HomepageWrapperProps) {
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    return (
        <>
            {children}
            <RequestDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        </>
    );
}

// Client-side nav button - links to pricing (Contact Sales is in hero)
export function NavDemoButton() {
    return (
        <a
            href="/pricing"
            className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
        >
            Get Started
        </a>
    );
}

// Large CTA demo button (for hero sections)
export function HeroDemoButton({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={className || "px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all"}
            >
                Contact Sales
            </button>
            <RequestDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

// Footer CTA button
export function FooterDemoButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all"
            >
                Contact Sales
            </button>
            <RequestDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
