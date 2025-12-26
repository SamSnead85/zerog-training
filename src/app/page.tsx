import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import {
  Brain,
  Target,
  Layers,
  Zap,
  Shield,
  BarChart3,
  Users,
  BookOpen,
  ChevronRight,
  Play,
  Check,
  ArrowRight,
  FileText,
  MessageSquare,
  Award,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ZeroG"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="text-lg font-semibold">ZeroG</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Minimal */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 text-sm font-medium text-primary">
            AI-powered enterprise training
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-foreground">
            Training built from
            <br />
            your organization's knowledge
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect your documentation, policies, and processes.
            ZeroG creates personalized training that reflects how your organization actually works.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="px-8">
                <Play className="mr-2 h-4 w-4" />
                Watch demo
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/60">
              <span className="text-lg font-medium">Deloitte</span>
              <span className="text-lg font-medium">Accenture</span>
              <span className="text-lg font-medium">McKinsey</span>
              <span className="text-lg font-medium">KPMG</span>
              <span className="text-lg font-medium">PwC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-semibold text-foreground">2.4M+</div>
              <div className="mt-1 text-sm text-muted-foreground">Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-foreground">500+</div>
              <div className="mt-1 text-sm text-muted-foreground">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-foreground">98%</div>
              <div className="mt-1 text-sm text-muted-foreground">Completion rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-foreground">4.9/5</div>
              <div className="mt-1 text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground">How it works</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Three steps to transform your organizational knowledge into effective training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">1. Connect your sources</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload documents, connect to Confluence, SharePoint, or any knowledge base.
                We index and understand your organizational context.
              </p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Brain className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">2. AI generates training</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI creates lessons, quizzes, and simulations that reference your actual
                tools, processes, and terminology.
              </p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">3. Deploy to your team</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Assign training to individuals or teams. Track progress, completion,
                and comprehension with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground">Built for enterprise</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything you need to create, deploy, and measure training at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-border bg-background">
              <Layers className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">Context-aware content</h3>
              <p className="text-sm text-muted-foreground">
                Training that references your specific tools, policies, and workflows—not generic content.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <MessageSquare className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">AI role-play simulations</h3>
              <p className="text-sm text-muted-foreground">
                Practice difficult conversations and scenarios with AI that responds like real stakeholders.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <BarChart3 className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">Detailed analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track completion, quiz scores, time-on-task, and knowledge retention across your organization.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <Shield className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">Enterprise security</h3>
              <p className="text-sm text-muted-foreground">
                SOC 2 Type II certified. SSO integration. Your data never trains our models.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <Target className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">Adaptive learning</h3>
              <p className="text-sm text-muted-foreground">
                Content adjusts based on learner performance, focusing on areas that need reinforcement.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <Award className="h-5 w-5 text-foreground mb-4" />
              <h3 className="font-medium mb-2">Certifications</h3>
              <p className="text-sm text-muted-foreground">
                Issue certificates upon completion. Track compliance and professional development credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground">Training for every team</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Pre-built modules and custom content for any learning objective
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Leadership Development", desc: "Executive coaching, management skills" },
              { title: "Compliance & Risk", desc: "HIPAA, SOX, security awareness" },
              { title: "Sales Enablement", desc: "Product training, objection handling" },
              { title: "Technical Skills", desc: "AI/ML, cloud, software development" },
              { title: "Onboarding", desc: "Role-specific new hire training" },
              { title: "DEI & Culture", desc: "Inclusive leadership, bias training" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors">
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground">Simple pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg border border-border bg-background">
              <h3 className="font-medium mb-1">Starter</h3>
              <p className="text-sm text-muted-foreground mb-4">For small teams</p>
              <div className="text-3xl font-semibold mb-4">$29<span className="text-sm font-normal text-muted-foreground">/user/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Up to 25 users</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 10 custom modules</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Basic analytics</li>
              </ul>
              <Button variant="outline" className="w-full">Get started</Button>
            </div>
            <div className="p-6 rounded-lg border-2 border-foreground bg-background">
              <h3 className="font-medium mb-1">Professional</h3>
              <p className="text-sm text-muted-foreground mb-4">For growing organizations</p>
              <div className="text-3xl font-semibold mb-4">$49<span className="text-sm font-normal text-muted-foreground">/user/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Up to 500 users</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited modules</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Advanced analytics</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> SSO integration</li>
              </ul>
              <Button className="w-full">Get started</Button>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <h3 className="font-medium mb-1">Enterprise</h3>
              <p className="text-sm text-muted-foreground mb-4">For large organizations</p>
              <div className="text-3xl font-semibold mb-4">Custom</div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited users</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Dedicated support</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Custom integrations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> SLA guarantee</li>
              </ul>
              <Button variant="outline" className="w-full">Contact sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Ready to transform your training?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="ZeroG" width={24} height={24} className="rounded" />
              <span className="font-semibold">ZeroG</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Security</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ZeroG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
