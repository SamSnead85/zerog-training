import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SSO for AI Training | SAML, Okta, Azure AD | ScaledNative",
    description: "Enterprise SSO for AI training. Support for SAML 2.0, Okta, Azure AD, Google Workspace, and more. Seamless authentication for your entire workforce.",
    keywords: ["SSO AI training", "SAML AI training", "Okta integration AI", "Azure AD AI training", "enterprise authentication training"],
    alternates: { canonical: "https://scalednative.com/sso-integration" },
};

export default function SSOIntegrationPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-8">
                    <span className="text-sm text-green-400">Enterprise Security</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">SSO<br />Integration</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Seamless enterprise authentication. One login for all AI training.</p>
                <Link href="/demo" className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold">Request SSO Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Supported Identity Providers</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "Okta", desc: "Full Okta integration + SCIM" },
                        { name: "Azure AD", desc: "Microsoft Entra ID support" },
                        { name: "Google Workspace", desc: "Google SSO for all employees" },
                        { name: "OneLogin", desc: "Enterprise identity management" },
                        { name: "Ping Identity", desc: "Advanced authentication" },
                        { name: "Custom SAML 2.0", desc: "Any SAML-compliant IdP" },
                    ].map((idp, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{idp.name}</h3>
                            <p className="text-sm text-white/50">{idp.desc}</p>
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
