import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SOC 2 Compliant AI Training | Security Compliance | ScaledNative",
    description: "ScaledNative is SOC 2 Type II compliant. Enterprise-grade security for AI training with annual audits, penetration testing, and comprehensive security controls.",
    keywords: ["SOC 2 AI training", "compliant AI training", "secure AI training platform", "enterprise security training", "SOC 2 Type II learning"],
    alternates: { canonical: "https://scalednative.com/soc-2" },
};

export default function SOC2Page() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/security" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Security</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-8">
                    <span className="text-sm text-green-400">SOC 2 Type II Certified</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">SOC 2<br />Compliant</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Enterprise-grade security. Annual audits, pen testing, and comprehensive controls.</p>
                <Link href="/security" className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold">View Security Details</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Security Controls</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { name: "SOC 2 Type II", desc: "Annual third-party audit" },
                        { name: "Encryption at Rest", desc: "AES-256 encryption" },
                        { name: "Encryption in Transit", desc: "TLS 1.3" },
                        { name: "Penetration Testing", desc: "Annual third-party testing" },
                        { name: "Access Controls", desc: "Role-based, MFA enforced" },
                        { name: "Incident Response", desc: "24/7 security monitoring" },
                    ].map((control, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{control.name}</h3>
                            <p className="text-white/60 text-sm">{control.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
