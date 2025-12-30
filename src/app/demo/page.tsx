"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    Users,
    Building2,
    Check,
    ChevronLeft,
    ChevronRight,
    Play,
    Zap,
    Shield,
    Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// DEMO BOOKING DATA
// =============================================================================

const demoTypes = [
    {
        id: "individual",
        title: "Individual Demo",
        description: "30-minute personalized walkthrough",
        duration: "30 min",
        icon: Users,
    },
    {
        id: "team",
        title: "Team Demo",
        description: "45-minute demo with Q&A for your team",
        duration: "45 min",
        icon: Building2,
    },
    {
        id: "enterprise",
        title: "Enterprise Demo",
        description: "60-minute comprehensive demo with custom content",
        duration: "60 min",
        icon: Award,
    },
];

const features = [
    "Live platform walkthrough",
    "Custom use case discussion",
    "Pricing and implementation Q&A",
    "Integration options review",
    "ROI calculation for your team",
];

// Generate available time slots for demo
const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        if (hour !== 12) { // Skip lunch
            slots.push(`${hour}:00`);
            if (hour < 17) slots.push(`${hour}:30`);
        }
    }
    return slots;
};

const timeSlots = generateTimeSlots();

// =============================================================================
// DEMO PAGE
// =============================================================================

export default function DemoPage() {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        role: "",
        teamSize: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate dates for the next 2 weeks (skip weekends)
    const availableDates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const day = date.getDay();
        if (day !== 0 && day !== 6) { // Skip weekends
            availableDates.push(date);
        }
    }

    const handleSubmit = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-16 px-6 max-w-4xl mx-auto">
                    <Link href="/" className="font-playfair text-xl font-medium italic tracking-tight">
                        ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                    </Link>
                    <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                        View Pricing
                    </Link>
                </div>
            </header>

            <main className="px-6 py-12 max-w-4xl mx-auto">
                {!isSubmitted ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold mb-3">Schedule a Demo</h1>
                            <p className="text-white/50">See how ScaledNative can transform your team's AI capabilities</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            {[1, 2, 3].map(s => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                        step >= s ? "bg-white text-black" : "bg-white/10"
                                    )}>
                                        {step > s ? <Check className="h-4 w-4" /> : s}
                                    </div>
                                    <span className={cn(
                                        "text-sm hidden sm:block",
                                        step >= s ? "text-white" : "text-white/40"
                                    )}>
                                        {s === 1 ? "Type" : s === 2 ? "Time" : "Details"}
                                    </span>
                                    {s < 3 && <div className="w-8 h-px bg-white/20" />}
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Select Demo Type */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold mb-4">Select your demo type</h2>
                                {demoTypes.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setSelectedType(type.id);
                                            setStep(2);
                                        }}
                                        className={cn(
                                            "w-full p-6 rounded-2xl border text-left transition-all",
                                            selectedType === type.id
                                                ? "bg-white/10 border-white/30"
                                                : "bg-white/[0.02] border-white/10 hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                <type.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">{type.title}</h3>
                                                <p className="text-sm text-white/50">{type.description}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-white/40">
                                                <Clock className="h-4 w-4" />
                                                {type.duration}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Select Date & Time */}
                        {step === 2 && (
                            <div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-1 text-sm text-white/40 hover:text-white mb-6"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </button>

                                <h2 className="text-lg font-semibold mb-4">Select a date</h2>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {availableDates.slice(0, 10).map((date, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDate(date)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm transition-colors",
                                                selectedDate?.toDateString() === date.toDateString()
                                                    ? "bg-white text-black"
                                                    : "bg-white/5 hover:bg-white/10"
                                            )}
                                        >
                                            {formatDate(date)}
                                        </button>
                                    ))}
                                </div>

                                {selectedDate && (
                                    <>
                                        <h2 className="text-lg font-semibold mb-4">Select a time (EST)</h2>
                                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-8">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={cn(
                                                        "px-3 py-2 rounded-lg text-sm transition-colors",
                                                        selectedTime === time
                                                            ? "bg-white text-black"
                                                            : "bg-white/5 hover:bg-white/10"
                                                    )}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setStep(3)}
                                            disabled={!selectedTime}
                                            className={cn(
                                                "w-full py-4 rounded-full font-medium transition-colors",
                                                selectedTime
                                                    ? "bg-white text-black hover:bg-white/90"
                                                    : "bg-white/20 cursor-not-allowed"
                                            )}
                                        >
                                            Continue
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Step 3: Contact Details */}
                        {step === 3 && (
                            <div>
                                <button
                                    onClick={() => setStep(2)}
                                    className="flex items-center gap-1 text-sm text-white/40 hover:text-white mb-6"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </button>

                                <div className="p-4 rounded-xl bg-white/5 mb-6">
                                    <div className="flex items-center gap-4">
                                        <Calendar className="h-5 w-5 text-white/40" />
                                        <div>
                                            <p className="font-medium">{selectedDate && formatDate(selectedDate)} at {selectedTime} EST</p>
                                            <p className="text-sm text-white/40">
                                                {demoTypes.find(t => t.id === selectedType)?.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-lg font-semibold mb-4">Your details</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full name *"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Work email *"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Company"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Job title"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                    <select
                                        value={formData.teamSize}
                                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20"
                                    >
                                        <option value="">Team size</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-1000">201-1000</option>
                                        <option value="1000+">1000+</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                                    >
                                        Book Demo
                                    </button>
                                </form>
                            </div>
                        )}
                    </>
                ) : (
                    /* Success State */
                    <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="h-10 w-10 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
                        <p className="text-white/50 mb-2">
                            Your demo is scheduled for <span className="text-white">{selectedDate && formatDate(selectedDate)}</span> at <span className="text-white">{selectedTime} EST</span>
                        </p>
                        <p className="text-sm text-white/40 mb-8">
                            Check your email for calendar invite and meeting link.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/catalog">
                                <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                                    Explore Catalog
                                </button>
                            </Link>
                            <Link href="/">
                                <button className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Features sidebar (visible on step 1) */}
                {step === 1 && !isSubmitted && (
                    <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                        <h3 className="font-semibold mb-4">What you'll get</h3>
                        <ul className="space-y-3">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}
