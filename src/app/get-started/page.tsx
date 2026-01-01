import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata = {
    title: "Get Started | ScaledNative",
    description: "Personalize your AI-Native learning path based on your goals and experience level.",
};

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />

            <div className="relative z-10 py-12 px-6">
                <OnboardingWizard />
            </div>
        </div>
    );
}
