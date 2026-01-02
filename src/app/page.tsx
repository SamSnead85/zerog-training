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
import { FAQSchema, HowToSchema, CourseCatalogSchema } from "@/components/seo/StructuredData";
import { NavDemoButton, HeroDemoButton, FooterDemoButton } from "@/components/marketing/HomepageClientComponents";

// SEO-Optimized FAQs for Rich Snippets
const aiTrainingFAQs = [
  {
    question: "What is AI-Native training?",
    answer: "AI-Native training is a modern approach to workforce development that embeds AI literacy and AI-powered tools into every aspect of learning. Unlike traditional training, AI-Native programs teach employees to think, work, and innovate with AI assistance from day one."
  },
  {
    question: "How is ScaledNative different from Udemy or Coursera?",
    answer: "ScaledNative is specifically designed for enterprise AI transformation with our proprietary NATIVE framework, hands-on labs, compliance training (HIPAA, SOC 2, HITRUST), and role-based learning paths. Unlike generic platforms, we offer 95% completion rates and 736% average ROI through adaptive, outcome-focused training."
  },
  {
    question: "What is the NATIVE framework?",
    answer: "NATIVE stands for Navigate, Architect, Transform, Integrate, Validate, and Evolve. It's our proprietary 6-phase methodology for enterprise AI transformation that provides a structured approach to building AI-ready organizations."
  },
  {
    question: "Is ScaledNative compliant with healthcare regulations?",
    answer: "Yes, ScaledNative is HITRUST certified, SOC 2 Type II compliant, HIPAA compliant, and GDPR ready. We meet the strictest enterprise security and compliance requirements for healthcare, financial services, and government organizations."
  },
  {
    question: "How long does AI-Native training take?",
    answer: "Our programs range from 2-hour quick-start modules to comprehensive certification paths spanning 40-80 hours. Most employees complete foundational AI training within 2-4 weeks while continuing their regular work responsibilities."
  },
  {
    question: "What AI certification programs are available?",
    answer: "ScaledNative offers AI-Native Foundations Certificate, AI Transformation Leader Certificate, Prompt Engineering Professional Certificate, and Enterprise AI Adoption Specialist Certificate. All certifications are industry-recognized and include hands-on assessments."
  },
  {
    question: "Can ScaledNative integrate with our existing LMS?",
    answer: "Yes, ScaledNative integrates with major LMS platforms via LTI, SCORM, and xAPI standards. We also offer SSO integration with Azure AD, Okta, and other enterprise identity providers."
  },
  {
    question: "What is the ROI of AI training?",
    answer: "Our customers report an average 736% ROI from AI training investments, with productivity gains of 20-40% within 90 days. The NATIVE framework includes built-in ROI measurement and impact analytics."
  }
];

// SEO-Optimized Courses for Schema
const featuredCourses = [
  { name: "AI-Native Foundations", description: "Master the fundamentals of AI thinking and AI-powered workflows", url: "https://scalednative.com/training" },
  { name: "NATIVE Framework Certification", description: "Complete the 6-phase AI transformation methodology", url: "https://scalednative.com/certifications" },
  { name: "Prompt Engineering Professional", description: "Advanced techniques for effective AI prompting and automation", url: "https://scalednative.com/training" },
  { name: "AI for Business Analysts", description: "Leverage AI for data analysis, insights, and decision-making", url: "https://scalednative.com/training/business-analysts" },
  { name: "AI for Project Managers", description: "Integrate AI into project planning, resource allocation, and delivery", url: "https://scalednative.com/training/project-managers" },
];

// HowTo Steps for Schema
const aiTransformationSteps = [
  { name: "Navigate", text: "Assess your organization's AI readiness and identify transformation opportunities" },
  { name: "Architect", text: "Design the AI strategy, infrastructure, and governance framework" },
  { name: "Transform", text: "Implement AI solutions and train your workforce on new capabilities" },
  { name: "Integrate", text: "Embed AI into workflows, systems, and decision-making processes" },
  { name: "Validate", text: "Measure outcomes, ensure compliance, and verify AI effectiveness" },
  { name: "Evolve", text: "Continuously improve and scale AI adoption across the organization" },
];

export default function PremiumLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* SEO Schema Markup */}
      <FAQSchema faqs={aiTrainingFAQs} />
      <CourseCatalogSchema courses={featuredCourses} />
      <HowToSchema
        name="How to Become AI-Native: Enterprise Transformation Guide"
        description="Step-by-step guide to transform your organization with AI using the NATIVE framework methodology"
        steps={aiTransformationSteps}
      />

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
            <Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">
              Enterprise
            </Link>
            <Link href="/preview" className="text-sm text-white/40 hover:text-white transition-colors">
              Try Free
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors">
              Sign in
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
            <Link href="/pricing">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all">
                Get Started
              </button>
            </Link>
            <Link href="/ai-native">
              <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium text-base border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all">
                Explore Platform
              </button>
            </Link>
          </div>

          {/* Trust Badges - Minimal */}
          <div className="flex flex-wrap justify-center gap-8 text-xs text-white/30 uppercase tracking-wider mb-16">
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

          {/* Audience Selector - Clear Paths */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Choose your path</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link href="/enterprise" className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all text-left">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold">For Organizations</span>
                </div>
                <p className="text-sm text-white/50">Team training, compliance, enterprise features, and dedicated support.</p>
                <div className="mt-4 text-xs text-white/30 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Contact Sales <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
              <Link href="/learn" className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all text-left">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold">For Individuals</span>
                </div>
                <p className="text-sm text-white/50">Self-paced courses, certifications, and career development starting at $99.</p>
                <div className="mt-4 text-xs text-white/30 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Browse Courses <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-12 px-8">
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

      {/* Thought Leadership - Featured Insights */}
      <section className="py-16 px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Insights</p>
              <h2 className="text-2xl font-bold">Thought Leadership</h2>
            </div>
            <Link href="/insights/native-sdlc-evolution" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Article 1: NATIVE SDLC Evolution */}
            <Link href="/insights/native-sdlc-evolution" className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-white/5 hover:border-purple-500/30 hover:from-purple-500/10 hover:to-blue-500/10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] uppercase tracking-wider font-medium">Operating Model</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
                Beyond Agile: Why the AI Era Demands a New Operating Model
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Introducing NATIVE as the next evolution of software delivery. SAFe scaled human coordination. NATIVE scales machine autonomy safely.
              </p>
            </Link>

            {/* Article 2: AI Skills Gap Crisis */}
            <Link href="/insights/ai-skills-gap-crisis" className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-red-500/5 border border-white/5 hover:border-amber-500/30 hover:from-amber-500/10 hover:to-red-500/10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase tracking-wider font-medium">Workforce Crisis</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-200 transition-colors">
                The AI Skills Gap Crisis: Why Traditional Training Failed
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                87% of executives report critical AI skills gaps. The platforms they trusted have a 4% completion rate. Something is fundamentally broken.
              </p>
            </Link>

            {/* Article 3: AI Fluency */}
            <Link href="/insights/ai-fluency-new-literacy" className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-white/5 hover:border-emerald-500/30 hover:from-emerald-500/10 hover:to-cyan-500/10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase tracking-wider font-medium">AI Literacy</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-200 transition-colors">
                From Prompt Engineering to AI Fluency: The New Digital Literacy
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Prompt engineering was the gateway skill. But true AI fluency goes far beyond writing better prompts.
              </p>
            </Link>

            {/* Article 4: Why AI Initiatives Fail */}
            <Link href="/insights/why-ai-initiatives-fail" className="group p-6 rounded-2xl bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-white/5 hover:border-rose-500/30 hover:from-rose-500/10 hover:to-pink-500/10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] uppercase tracking-wider font-medium">Strategy</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-rose-200 transition-colors">
                Why 70% of AI Initiatives Fail: The Foundation First Approach
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                The technology works. The budgets are approved. So why do most AI initiatives fail to deliver value?
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Elite Companies - Scrolling Logos */}
      <section className="py-16 px-8 border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-10">
            Trusted by leading organizations worldwide
          </p>

          {/* Scrolling Logo Marquee */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Scrolling container */}
            <div className="flex animate-[scroll_30s_linear_infinite]">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex shrink-0">
                  {[
                    "NVIDIA",
                    "Google",
                    "OpenAI",
                    "Microsoft",
                    "Amazon",
                    "Anthropic",
                    "Meta",
                    "IBM",
                    "Salesforce",
                    "Oracle",
                    "ServiceNow",
                    "Snowflake",
                  ].map((company, i) => (
                    <div
                      key={`${setIdx}-${i}`}
                      className="px-10 py-4 mx-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-sm font-medium text-white/50 whitespace-nowrap">
                        {company}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs text-white/40 uppercase tracking-wider">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
              <Shield className="h-4 w-4 text-emerald-500" />
              HITRUST Certified
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
              <Shield className="h-4 w-4 text-blue-500" />
              SOC 2 Type II
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
              <Shield className="h-4 w-4 text-purple-500" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
              <Shield className="h-4 w-4 text-amber-500" />
              GDPR Ready
            </div>
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
            <FooterDemoButton />
            <Link href="/preview">
              <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all">
                Try Free Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/30">
            <Link href="/native" className="hover:text-white transition-colors">Framework</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/preview" className="hover:text-white transition-colors">Try Free</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-xs text-white/20">© 2025 ScaledNative™. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
