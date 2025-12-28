"use client";

/**
 * Cookie Consent Banner
 * 
 * GDPR/CCPA compliant cookie consent with granular preferences.
 */

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Cookie, X, Shield, Settings } from "lucide-react";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

const COOKIE_CONSENT_KEY = "zerog_cookie_consent";
const COOKIE_PREFS_KEY = "zerog_cookie_prefs";

// =============================================================================
// COMPONENT
// =============================================================================

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        // Check if user already consented
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            // Delay showing banner for better UX
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }

        // Load saved preferences
        const savedPrefs = localStorage.getItem(COOKIE_PREFS_KEY);
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        saveConsent(allAccepted);
    };

    const handleRejectNonEssential = () => {
        const essentialOnly: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        saveConsent(essentialOnly);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (prefs: CookiePreferences) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, new Date().toISOString());
        localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
        setPreferences(prefs);
        setVisible(false);

        // Emit event for analytics initialization
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: prefs }));
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
            <div className="max-w-4xl mx-auto">
                <div className={cn(
                    "rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden",
                    showPreferences ? "p-0" : "p-6"
                )}>
                    {!showPreferences ? (
                        // Simple Banner
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Cookie className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Cookie Settings</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    We use cookies to enhance your experience. By continuing, you agree to our{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="ghost" size="sm" onClick={handleRejectNonEssential}>
                                    Reject All
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setShowPreferences(true)}>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Customize
                                </Button>
                                <Button size="sm" onClick={handleAcceptAll}>
                                    Accept All
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Detailed Preferences
                        <div>
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Cookie Preferences</h3>
                                </div>
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                {/* Necessary */}
                                <CookieCategory
                                    title="Essential Cookies"
                                    description="Required for the website to function. Cannot be disabled."
                                    checked={true}
                                    disabled={true}
                                    onChange={() => { }}
                                />

                                {/* Analytics */}
                                <CookieCategory
                                    title="Analytics Cookies"
                                    description="Help us understand how visitors interact with our website."
                                    checked={preferences.analytics}
                                    onChange={(checked) =>
                                        setPreferences({ ...preferences, analytics: checked })
                                    }
                                />

                                {/* Marketing */}
                                <CookieCategory
                                    title="Marketing Cookies"
                                    description="Used to track visitors across websites for advertising purposes."
                                    checked={preferences.marketing}
                                    onChange={(checked) =>
                                        setPreferences({ ...preferences, marketing: checked })
                                    }
                                />

                                {/* Preferences */}
                                <CookieCategory
                                    title="Preference Cookies"
                                    description="Remember your settings and preferences for a better experience."
                                    checked={preferences.preferences}
                                    onChange={(checked) =>
                                        setPreferences({ ...preferences, preferences: checked })
                                    }
                                />
                            </div>

                            <div className="p-4 border-t border-border flex justify-end gap-2">
                                <Button variant="outline" onClick={handleRejectNonEssential}>
                                    Reject All
                                </Button>
                                <Button onClick={handleSavePreferences}>
                                    Save Preferences
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// COOKIE CATEGORY
// =============================================================================

interface CookieCategoryProps {
    title: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
}

function CookieCategory({ title, description, checked, disabled, onChange }: CookieCategoryProps) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
            <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <div className={cn(
                    "w-11 h-6 rounded-full transition-colors",
                    "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50",
                    checked ? "bg-primary" : "bg-muted-foreground/30",
                    disabled && "opacity-50 cursor-not-allowed"
                )}>
                    <div className={cn(
                        "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                        checked && "translate-x-5"
                    )} />
                </div>
            </label>
            <div className="flex-1">
                <p className="font-medium text-sm">{title}</p>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
        </div>
    );
}

export default CookieConsent;
