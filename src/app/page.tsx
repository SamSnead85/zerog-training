import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import {
  Brain,
  Layers,
  Shield,
  BarChart3,
  Users,
  ChevronRight,
  Check,
  ArrowRight,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZeroG" width={32} height={32} className="rounded" />
            <span className="text-xl font-bold">ZeroG</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Bold & Direct */}
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Training that actually
            <br />
            <span className="text-primary">makes sense</span>
          </h1>

          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Built from your docs. Speaks your language.
            <br />
            No more generic content that puts people to sleep.
          </p>

          <div className="mt-12">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-12 py-7 font-semibold">
                Try it free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Social proof - simple */}
      <section className="py-12 border-y border-border">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            <span className="text-xl font-semibold text-muted-foreground/60">Deloitte</span>
            <span className="text-xl font-semibold text-muted-foreground/60">McKinsey</span>
            <span className="text-xl font-semibold text-muted-foreground/60">Accenture</span>
            <span className="text-xl font-semibold text-muted-foreground/60">KPMG</span>
            <span className="text-xl font-semibold text-muted-foreground/60">PwC</span>
          </div>
        </div>
      </section>

      {/* Value props - bold headings */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Connect your knowledge base
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Upload your docs, connect Confluence, SharePoint, Notion—whatever you use.
                We index everything and actually understand it.
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 flex items-center justify-center aspect-square">
              <FileText className="h-24 w-24 text-muted-foreground/40" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 bg-muted/50 rounded-2xl p-8 flex items-center justify-center aspect-square">
              <Brain className="h-24 w-24 text-muted-foreground/40" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">
                AI that gets your context
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Not generic templates. Actual training that references your tools,
                your processes, your terminology. Like it was written by someone who works there.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Track everything
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Completion rates, quiz scores, time spent, knowledge gaps.
                Know exactly who knows what, and who needs more help.
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 flex items-center justify-center aspect-square">
              <BarChart3 className="h-24 w-24 text-muted-foreground/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Features grid - clean */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything you need
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Layers, title: "Context-aware lessons", desc: "References your actual policies and tools" },
              { icon: MessageSquare, title: "AI simulations", desc: "Practice conversations with realistic AI" },
              { icon: BarChart3, title: "Detailed analytics", desc: "Track progress across your org" },
              { icon: Shield, title: "Enterprise security", desc: "SOC 2 certified, SSO ready" },
              { icon: Users, title: "Team management", desc: "Assign, track, report on groups" },
              { icon: Check, title: "Certifications", desc: "Issue certs on completion" },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <item.icon className="h-6 w-6 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - real talk */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            What people are saying
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border">
              <p className="text-lg mb-4">
                "Finally, training that doesn't feel like it was written for a different company.
                Our team actually completes these."
              </p>
              <p className="text-sm text-muted-foreground">— VP of L&D, Fortune 500</p>
            </div>
            <div className="p-6 rounded-xl border border-border">
              <p className="text-lg mb-4">
                "Setup took 20 minutes. Connected our Confluence, and it generated
                onboarding training that referenced our actual systems."
              </p>
              <p className="text-sm text-muted-foreground">— Head of People Ops, Series B Startup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - direct */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-lg text-muted-foreground mb-12">Start free, scale when ready</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl border border-border bg-background text-left">
              <h3 className="font-semibold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal text-muted-foreground">/user/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Up to 50 users</li>
                <li>• Unlimited modules</li>
                <li>• Basic analytics</li>
              </ul>
              <Button variant="outline" className="w-full">Get started</Button>
            </div>
            <div className="p-8 rounded-xl border-2 border-primary bg-background text-left">
              <h3 className="font-semibold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">Custom</div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Unlimited users</li>
                <li>• SSO & advanced security</li>
                <li>• Dedicated support</li>
                <li>• Custom integrations</li>
              </ul>
              <Button className="w-full">Contact sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - bold */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to build training
            <br />that works?
          </h2>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-12 py-7 font-semibold">
              Start free trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - minimal */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZeroG" width={24} height={24} className="rounded" />
            <span className="font-semibold">ZeroG</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 ZeroG</p>
        </div>
      </footer>
    </div>
  );
}
