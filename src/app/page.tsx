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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Training Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Context-Aware Training That{" "}
            <span className="text-gradient">Elevates</span> Your Organization
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload your policies, procedures, and documentation. Our AI learns
            your organization and creates training that references your actual
            tools, workflows, and reality.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="xl" className="group">
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="xl" variant="outline" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-sm">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl" />
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-error/80" />
                <div className="h-3 w-3 rounded-full bg-warning/80" />
                <div className="h-3 w-3 rounded-full bg-success/80" />
                <span className="ml-4 text-xs text-muted-foreground">
                  ZeroG AI Training Dashboard
                </span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-muted to-background p-8">
                <div className="grid h-full grid-cols-3 gap-4">
                  <div className="col-span-2 rounded-lg border border-border bg-card p-4">
                    <div className="mb-4 h-4 w-32 rounded bg-muted" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-4/5 rounded bg-muted" />
                      <div className="h-3 w-3/5 rounded bg-muted" />
                    </div>
                    <div className="mt-6 flex gap-2">
                      <div className="h-8 w-24 rounded-lg bg-primary/20" />
                      <div className="h-8 w-20 rounded-lg bg-secondary/20" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="mb-2 h-3 w-20 rounded bg-muted" />
                      <div className="text-2xl font-bold text-primary">87%</div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="mb-2 h-3 w-16 rounded bg-muted" />
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-success/20" />
                        <div className="h-8 w-8 rounded-full bg-warning/20" />
                        <div className="h-8 w-8 rounded-full bg-primary/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <Link href="/demo">
                <Button size="lg" variant="outline">
                  Schedule Demo
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
