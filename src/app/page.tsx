import Link from "next/link";
import { Button } from "@/components/ui";
import {
  Sparkles,
  Brain,
  Target,
  Layers,
  Zap,
  Shield,
  BarChart3,
  Users,
  BookOpen,
  Rocket,
  ChevronRight,
  Play,
  Check,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Rocket className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold">
              Zero<span className="text-gradient">G</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#simulations"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Simulations
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Start Free Trial
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Redesign */}
      <section className="relative min-h-screen overflow-hidden pt-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 -z-10">
          {/* Deep gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Animated orbs */}
          <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-secondary/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[60%] left-[50%] h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-5 py-2">
                <div className="flex h-2 w-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-primary opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm font-semibold text-primary tracking-wide">
                  AI-Native Training Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-foreground">Enterprise Training</span>
                <span className="block mt-2">
                  Powered by{" "}
                  <span className="relative">
                    <span className="text-gradient">Your Context</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 10C50 4 150 4 298 10" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00D4FF" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Connect your knowledge base, policies, and documents.
                Our AI creates customized training that speaks your language—
                literally referencing your tools, processes, and culture.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/signup">
                  <Button size="xl" className="group w-full sm:w-auto text-base px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/try">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-2 hover:bg-primary/5">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  SOC 2 Type II Certified
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  GDPR Compliant
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  99.9% Uptime SLA
                </div>
              </div>
            </div>

            {/* Right: Interactive Demo Preview */}
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-2xl opacity-60" />

              {/* Main demo card */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-800/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 rounded-md bg-slate-700/50 px-3 flex items-center">
                      <span className="text-xs text-slate-400">zerogtraining.com/studio</span>
                    </div>
                  </div>
                </div>

                {/* Demo content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-1">Create Training Module</h3>
                    <p className="text-sm text-muted-foreground">Select your content source</p>
                  </div>

                  {/* Source selection cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary cursor-pointer transition-all hover:scale-[1.02]">
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-medium text-sm">RAG Pipeline</p>
                      <p className="text-xs text-muted-foreground mt-1">Connect knowledge base</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10 cursor-pointer transition-all hover:border-white/20">
                      <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                        <Layers className="h-5 w-5 text-slate-400" />
                      </div>
                      <p className="font-medium text-sm">File Upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10 cursor-pointer transition-all hover:border-white/20">
                      <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                        <Target className="h-5 w-5 text-slate-400" />
                      </div>
                      <p className="font-medium text-sm">URL Import</p>
                      <p className="text-xs text-muted-foreground mt-1">Confluence, Notion</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10 cursor-pointer transition-all hover:border-white/20">
                      <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                        <Sparkles className="h-5 w-5 text-slate-400" />
                      </div>
                      <p className="font-medium text-sm">AI Generate</p>
                      <p className="text-xs text-muted-foreground mt-1">From description</p>
                    </div>
                  </div>

                  {/* Organization context preview */}
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-background">
                        AC
                      </div>
                      <div>
                        <p className="text-sm font-medium">Acme Corp</p>
                        <p className="text-xs text-muted-foreground">Connected: 24 sources</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">Salesforce</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary">JIRA</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">Confluence</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">+21 more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -right-4 top-24 p-3 rounded-xl bg-slate-900/90 backdrop-blur border border-white/10 shadow-xl">
                <p className="text-xs text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-success">98%</p>
              </div>
              <div className="absolute -left-4 bottom-24 p-3 rounded-xl bg-slate-900/90 backdrop-blur border border-white/10 shadow-xl">
                <p className="text-xs text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold text-primary">80%</p>
              </div>
            </div>
          </div>

          {/* Client logos */}
          <div className="mt-24 pt-16 border-t border-white/10">
            <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground mb-10">
              Trusted by Learning Leaders at the World&apos;s Best Companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-bold tracking-tight">Deloitte</span>
              <span className="text-2xl font-bold tracking-tight">Accenture</span>
              <span className="text-2xl font-bold tracking-tight">McKinsey</span>
              <span className="text-2xl font-bold tracking-tight">KPMG</span>
              <span className="text-2xl font-bold tracking-tight">PwC</span>
              <span className="text-2xl font-bold tracking-tight">EY</span>
            </div>
          </div>
        </div>
      </section>

      {/* University & Institution Partners */}
      <section className="border-y border-border bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Content Developed With
              </p>
              <p className="text-lg font-semibold">Leading Universities & Institutions</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <span className="text-sm font-medium">Stanford GSB</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">MIT Sloan</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">Wharton</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">Harvard Business</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">INSEAD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Training That Truly <span className="text-gradient">Understands</span> You
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Unlike generic training platforms, ZeroG learns your organization&apos;s
              context and creates training that references your actual reality.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Enterprise Content Integration</h3>
              <p className="text-sm text-muted-foreground">
                Upload PDFs, documents, videos, and connect knowledge bases. Our AI
                deeply understands your content and incorporates it into training.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-background">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Interactive Simulations</h3>
              <p className="text-sm text-muted-foreground">
                Web-based simulations let learners practice in realistic environments.
                Software interfaces, scenarios, and AI role-plays—no VR required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-background">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">50+ Training Modules</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive library covering leadership, compliance, technology, and
                more. Each module is AI-customized for your organization.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success transition-colors group-hover:bg-success group-hover:text-background">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">LLM-Agnostic AI</h3>
              <p className="text-sm text-muted-foreground">
                Choose your preferred AI provider—OpenAI, Anthropic, Google, or Azure.
                Switch providers without changing your training content.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-error/10 text-error transition-colors group-hover:bg-error group-hover:text-background">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Compliance-Ready</h3>
              <p className="text-sm text-muted-foreground">
                Built for regulated industries. HIPAA, GDPR, SOC 2, PCI DSS—your
                training automatically aligns with your compliance requirements.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-info/10 text-info transition-colors group-hover:bg-info group-hover:text-background">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Enterprise Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track progress, identify skill gaps, and generate compliance reports.
                Detailed simulation analytics show exactly where learners need help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              How <span className="text-gradient">ZeroG</span> Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Get started in minutes, not months. Our AI does the heavy lifting.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-background">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Upload Your Content</h3>
              <p className="text-sm text-muted-foreground">
                Upload policies, procedures, handbooks, or connect your knowledge
                base. Our AI extracts and understands everything.
              </p>
              <div className="absolute -right-4 top-4 hidden h-0.5 w-8 bg-border md:block" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-bold text-background">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">AI Creates Training</h3>
              <p className="text-sm text-muted-foreground">
                Select from 50+ templates or describe what you need. AI generates
                customized content with your tools, examples, and terminology.
              </p>
              <div className="absolute -right-4 top-4 hidden h-0.5 w-8 bg-border md:block" />
            </div>

            {/* Step 3 */}
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-background">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Train Your Team</h3>
              <p className="text-sm text-muted-foreground">
                Assign training, track progress, and generate compliance reports.
                Interactive simulations ensure real skill development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              See how enterprise organizations are transforming their training programs
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">★</span>
                ))}
              </div>
              <p className="mb-6 text-sm text-muted-foreground italic">
                &quot;ZeroG reduced our training development time by 80%. What used to take our L&amp;D team months now takes days. The AI customization is remarkably accurate to our processes.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background font-bold text-sm">
                  SJ
                </div>
                <div>
                  <p className="font-medium text-sm">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Chief Learning Officer, Fortune 100 Bank</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">★</span>
                ))}
              </div>
              <p className="mb-6 text-sm text-muted-foreground italic">
                &quot;The interactive simulations have completely changed how our teams learn. Completion rates went from 40% to 94%, and knowledge retention improved dramatically.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-background font-bold text-sm">
                  MC
                </div>
                <div>
                  <p className="font-medium text-sm">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">VP of Training, Global Healthcare Co.</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">★</span>
                ))}
              </div>
              <p className="mb-6 text-sm text-muted-foreground italic">
                &quot;Finally, compliance training that our employees actually engage with. The context-aware approach means examples are always relevant to their daily work.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-background font-bold text-sm">
                  ER
                </div>
                <div>
                  <p className="font-medium text-sm">Emily Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Director of Compliance, Insurance Enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Starter */}
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For small teams getting started
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/user/month</span>
              </div>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Up to 50 users
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  10 training modules
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Basic simulations
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Email support
                </li>
              </ul>
              <Link href="/signup?plan=starter">
                <Button variant="outline" className="mt-8 w-full">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Professional */}
            <div className="relative rounded-xl border-2 border-primary bg-card p-8 shadow-[0_0_30px_rgba(0,217,255,0.15)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-background">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold">Professional</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For growing organizations
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/user/month</span>
              </div>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Up to 500 users
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Unlimited modules
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  All simulation types
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  SSO & advanced analytics
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Priority support
                </li>
              </ul>
              <Link href="/signup?plan=professional">
                <Button className="mt-8 w-full">Get Started</Button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold">Enterprise</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For large organizations
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  White-label option
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  On-premises option
                </li>
              </ul>
              <Link href="/contact?type=enterprise">
                <Button variant="outline" className="mt-8 w-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-12 text-center md:p-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Transform Your Training?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of organizations using ZeroG to create training that
              actually works. Start your free trial today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/try">
                <Button size="lg" variant="outline">
                  Try Demo First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <Rocket className="h-5 w-5 text-background" />
                </div>
                <span className="text-xl font-bold">
                  Zero<span className="text-gradient">G</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Context-Aware Training That Elevates Your Organization
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#simulations" className="hover:text-foreground">Simulations</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/modules" className="hover:text-foreground">Module Library</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ZeroG AI Training. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Users className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <BookOpen className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
