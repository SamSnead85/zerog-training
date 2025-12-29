import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Users,
  Zap,
  Award,
  Play,
  BarChart3,
  Target,
  Brain,
  Sparkles,
} from "lucide-react";

export default function PremiumLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Premium Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-playfair text-2xl font-medium tracking-tight italic">
              ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">
              Framework
            </Link>
            <Link href="/ai-native" className="text-sm text-white/40 hover:text-white transition-colors">
              Platform
            </Link>
            <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">
              Enterprise
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/contact">
              <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all">
                Request Demo
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic Premium */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        {/* Background - Floating 3D Element with Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated rotating background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/images/premium-hero-bg.png"
              alt=""
              className="w-[150%] h-[150%] object-cover opacity-60 animate-[spin_60s_linear_infinite]"
              style={{ transformOrigin: 'center center' }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Subtle light sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-[shimmer_8s_ease-in-out_infinite]" />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_0%,black_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl w-full text-center pt-20">
          {/* Brand Name - Elegant Script */}
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium italic tracking-[-0.02em] mb-6">
            ScaledNative<sup className="text-xl md:text-2xl align-super ml-1">™</sup>
          </h1>

          {/* Tagline - Ultra Bold Sans */}
          <h2 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.92] mb-8 uppercase">
            AI-Powered Workforce
            <br />
            Transformation
          </h2>

          {/* Sub-headline - Clean and Light */}
          <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 font-light">
            The enterprise platform for building AI-Native teams.
          </p>

          {/* CTAs - Premium Pill Style */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                Request a Demo
              </button>
            </Link>
            <Link href="/ai-native">
              <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium text-base border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all">
                Explore Platform
              </button>
            </Link>
          </div>

          {/* Trust Badges - Minimal */}
          <div className="flex flex-wrap justify-center gap-8 text-xs text-white/30 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3" />
              SOC 2 Type II
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3" />
              HIPAA Ready
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3" />
              GDPR Compliant
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - High Contrast */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "634+", label: "Hours of Curriculum" },
              { value: "60%", label: "Faster Competency" },
              { value: "95%", label: "Completion Rate" },
              { value: "736%", label: "Average ROI" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-montserrat text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section - Editorial */}
      <section className="py-32 px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-8">
            Traditional training<br />
            <span className="text-white/20">doesn't work.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto mb-16">
            Static videos. Empty certificates. Generic content that doesn't apply to your work.
            It's time for something different.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "One-size-fits-all", desc: "Same content for everyone. No personalization." },
              { icon: Play, title: "Passive watching", desc: "Videos you forget immediately." },
              { icon: Award, title: "Empty credentials", desc: "Completion ≠ Competency." },
            ].map((item, idx) => (
              <div key={idx} className="text-left">
                <item.icon className="h-6 w-6 text-white/20 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Clean */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              ScaledNative is different.
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Real training. Verified skills. Powered by AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Adaptive AI", desc: "Content adapts to your role and performance in real-time." },
              { icon: Zap, title: "Hands-On Labs", desc: "Learn by doing with interactive skill verification." },
              { icon: Users, title: "Your Context", desc: "Training built on your company's tools and policies." },
              { icon: BarChart3, title: "Verified Skills", desc: "Build a portfolio that proves competency, not completion." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <item.icon className="h-6 w-6 text-white/60 mb-4" />
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATIVE Framework - Minimal */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold tracking-tight mb-8">
            The NATIVE Framework<sup className="text-lg md:text-xl align-super ml-1">™</sup>
          </h2>
          <p className="text-lg text-white/40 mb-16">
            The enterprise standard for AI-Native transformation.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            {["N", "A", "T", "I", "V", "E"].map((letter, idx) => (
              <div
                key={letter}
                className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl md:text-3xl font-bold"
              >
                {letter}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/40">
            <span>Navigate</span>
            <span>Architect</span>
            <span>Transform</span>
            <span>Integrate</span>
            <span>Validate</span>
            <span>Evolve</span>
          </div>

          <div className="mt-12">
            <Link href="/native">
              <button className="px-6 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2">
                Explore Framework
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
            Ready to transform?
          </h2>
          <p className="text-lg text-white/40 mb-10">
            Join the enterprises building AI-Native workforces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                Request a Demo
              </button>
            </Link>
            <Link href="/training/sample-lesson">
              <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all">
                Try Sample Lesson
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
          <div className="flex gap-8 text-sm text-white/30">
            <Link href="/native" className="hover:text-white transition-colors">Framework</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-xs text-white/20">© 2025 ScaledNative™. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
