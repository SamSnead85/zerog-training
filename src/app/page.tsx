import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { HeroGenerator } from "@/components/hero/HeroGenerator";
import {
  ArrowRight,
  Check,
  Sparkles,
  FileText,
  Brain,
  BarChart3,
  Layers,
  MessageSquare,
  Shield,
  Users,
  Zap,
  Award,
  Globe,
  Lock,
  Star,
  Play,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image src="/logo.png" alt="ZeroG" width={36} height={36} className="rounded-lg relative" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Zero<span className="text-primary">G</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              v3.0 DEC-27
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/signup">
              <Button className="gap-2 font-medium">
                <Sparkles className="h-4 w-4" />
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Dramatic & Premium */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-[800px] h-[800px] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-primary/8 via-primary/3 to-transparent rounded-full blur-[120px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,var(--background)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">60+ Pre-built Courses • AI-Powered Customization</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              <span className="block text-foreground/90">Enterprise Training</span>
              <span className="block mt-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                in Minutes, Not Months
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              AI Training Studio transforms your policies and procedures into
              <span className="text-foreground/70 block mt-1">engaging, interactive training your team will actually complete.</span>
            </p>

            {/* AI Training Studio Label */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Try AI Training Studio Free</span>
              <span className="text-sm text-muted-foreground">— Create your first course in 60 seconds</span>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <HeroGenerator />
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              5 minute setup
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              SOC 2 certified
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Premium Logos */}
      <section className="py-16 border-y border-white/5 bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="text-foreground font-semibold">50,000+</span> learners at leading companies
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Lock className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">GDPR Ready</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {["Deloitte", "McKinsey", "Accenture", "KPMG", "PwC", "EY"].map((company) => (
              <span
                key={company}
                className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props - Glassmorphism Cards */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The smarter way to train
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop wasting time on generic training that doesn't stick.
              ZeroG creates content that actually matters to your team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect your knowledge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upload docs, connect Confluence, SharePoint, Notion—we index everything and actually understand it.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI that gets context</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Not generic templates. Training that references your tools, processes, and terminology.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track everything</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Completion rates, quiz scores, knowledge gaps. Know exactly who knows what.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-32 px-6 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Enterprise-grade features built for modern teams
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large Card */}
            <div className="md:col-span-2 lg:col-span-2 group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-primary/20 transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Simulations</h3>
                  <p className="text-muted-foreground mb-4">
                    Practice difficult conversations with realistic AI personas. From sales calls to HR scenarios—safe space to learn.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs">Sales Training</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs">Customer Service</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs">Leadership</span>
                  </div>
                </div>
                <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary/60" />
                </div>
              </div>
            </div>

            {/* Small Cards */}
            {[
              { icon: Layers, title: "Context-aware", desc: "References your actual policies" },
              { icon: BarChart3, title: "Analytics", desc: "Track org-wide progress" },
              { icon: Shield, title: "Enterprise security", desc: "SOC 2, SSO ready" },
              { icon: Users, title: "Team management", desc: "Assign, track, report" },
              { icon: Award, title: "Certifications", desc: "Issue on completion" },
              { icon: Globe, title: "Multi-language", desc: "40+ languages supported" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/20 hover:bg-white/[0.04] transition-all"
              >
                <feature.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Cards */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by L&D leaders
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              See why teams are switching to ZeroG
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Finally, training that doesn't feel like it was written for a different company. Our team actually completes these.",
                author: "Sarah Chen",
                role: "VP of L&D",
                company: "Fortune 500 Tech",
                rating: 5,
              },
              {
                quote: "Setup took 20 minutes. Connected our Confluence, and it generated onboarding that referenced our actual systems.",
                author: "Mike Thompson",
                role: "Head of People Ops",
                company: "Series B Startup",
                rating: 5,
              },
              {
                quote: "The AI simulations are game-changing. Our sales reps improved close rates by 23% after practicing objection handling.",
                author: "Lisa Park",
                role: "Sales Enablement",
                company: "SaaS Unicorn",
                rating: 5,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center text-sm font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Premium */}
      <section id="pricing" className="py-32 px-6 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, scale when ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="font-semibold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-1">$0</div>
              <p className="text-sm text-muted-foreground mb-6">Free forever</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Up to 10 users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  5 modules
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Basic analytics
                </li>
              </ul>
              <Button variant="outline" className="w-full">Get started</Button>
            </div>

            {/* Pro - Popular */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent border-2 border-primary/50 hover:border-primary transition-colors">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="font-semibold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-1">$29<span className="text-lg font-normal text-muted-foreground">/user/mo</span></div>
              <p className="text-sm text-muted-foreground mb-6">For growing teams</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Up to 100 users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Unlimited modules
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  AI simulations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Advanced analytics
                </li>
              </ul>
              <Button className="w-full">Start free trial</Button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="font-semibold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-1">Custom</div>
              <p className="text-sm text-muted-foreground mb-6">For large organizations</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  SSO & SAML
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Dedicated support
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact sales</Button>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              30-day money-back guarantee. No questions asked.
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8">
            <Users className="h-4 w-4 text-primary" />
            <span>Join 500+ companies already using ZeroG</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to build training<br />
            <span className="text-primary">that actually works?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-10 py-7 font-semibold gap-2">
                Start free trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-10 py-7 font-semibold gap-2">
                <Play className="h-5 w-5" />
                Watch demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Premium */}
      <footer className="py-16 px-6 border-t border-white/5 bg-gradient-to-t from-muted/20 to-transparent">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="ZeroG" width={32} height={32} className="rounded-lg" />
                <span className="text-lg font-semibold">ZeroG</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                AI-powered training that adapts to your organization's unique context and knowledge.
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs">SOC 2</div>
                <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs">GDPR</div>
                <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs">ISO 27001</div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 ZeroG AI Training. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</Link>
              <Link href="https://linkedin.com" className="hover:text-foreground transition-colors">LinkedIn</Link>
              <Link href="https://github.com" className="hover:text-foreground transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
