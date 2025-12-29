"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    BookOpen,
    GraduationCap,
    Sparkles,
    Shield,
    Brain,
    Users,
    Award,
    BarChart3,
    Building2,
    Target,
    FileText,
    Video,
    Puzzle,
    Briefcase,
    Heart,
    Scale,
    Lock,
    TrendingUp,
    Zap,
    ExternalLink,
    ArrowRight,
} from "lucide-react";

interface MegaMenuItem {
    label: string;
    href: string;
    icon: React.ElementType;
    description?: string;
    badge?: string;
}

interface MegaMenuSection {
    title: string;
    items: MegaMenuItem[];
}

interface MegaMenuConfig {
    label: string;
    sections: MegaMenuSection[];
    featured?: {
        title: string;
        description: string;
        href: string;
        image?: string;
    };
}

const megaMenus: MegaMenuConfig[] = [
    {
        label: "Learning",
        sections: [
            {
                title: "My Learning",
                items: [
                    { label: "Dashboard", href: "/dashboard", icon: BarChart3, description: "Overview of your progress" },
                    { label: "My Courses", href: "/learning", icon: GraduationCap, description: "Continue learning" },
                    { label: "Learning Paths", href: "/paths", icon: Target, description: "Guided skill development" },
                    { label: "Certificates", href: "/certificates", icon: Award, description: "Earned credentials" },
                ],
            },
            {
                title: "Discover",
                items: [
                    { label: "Content Library", href: "/library", icon: BookOpen, description: "Browse all training" },
                    { label: "New Releases", href: "/library?filter=new", icon: Sparkles, description: "Latest content", badge: "New" },
                    { label: "Trending", href: "/library?filter=trending", icon: TrendingUp, description: "Popular courses" },
                    { label: "Skills Assessment", href: "/assessment", icon: Puzzle, description: "Find your gaps" },
                ],
            },
        ],
        featured: {
            title: "AI-Powered Learning",
            description: "Generate custom training modules in minutes with our AI engine",
            href: "/create",
        },
    },
    {
        label: "Courses",
        sections: [
            {
                title: "Compliance & Security",
                items: [
                    { label: "Cybersecurity", href: "/library?category=cybersecurity", icon: Shield, description: "NIST CSF 2.0 aligned" },
                    { label: "HIPAA Compliance", href: "/library?category=hipaa", icon: Lock, description: "Healthcare privacy" },
                    { label: "Harassment Prevention", href: "/library?category=harassment", icon: Scale, description: "Workplace safety" },
                    { label: "Data Privacy & GDPR", href: "/library?category=privacy", icon: FileText, description: "Data protection" },
                ],
            },
            {
                title: "Professional Skills",
                items: [
                    { label: "AI & Prompt Engineering", href: "/library?category=ai", icon: Brain, description: "Master AI tools", badge: "Hot" },
                    { label: "Leadership Development", href: "/library?category=leadership", icon: Briefcase, description: "Management skills" },
                    { label: "Cloud Computing", href: "/library?category=cloud", icon: Zap, description: "AWS, GCP, Azure" },
                    { label: "Data Analytics", href: "/library?category=analytics", icon: BarChart3, description: "Data-driven decisions" },
                ],
            },
        ],
    },
    {
        label: "Enterprise",
        sections: [
            {
                title: "Team Management",
                items: [
                    { label: "Organization Dashboard", href: "/org", icon: Building2, description: "Team overview" },
                    { label: "Assign Training", href: "/assign", icon: Users, description: "Deploy to teams" },
                    { label: "Team Progress", href: "/progress", icon: Target, description: "Track completion" },
                    { label: "Workforce Analytics", href: "/workforce", icon: BarChart3, description: "Skill insights" },
                ],
            },
            {
                title: "Compliance & Reporting",
                items: [
                    { label: "Compliance Tracking", href: "/compliance", icon: Shield, description: "Deadline management" },
                    { label: "Reports", href: "/reports", icon: FileText, description: "Custom reporting" },
                    { label: "Audit Log", href: "/audit", icon: Lock, description: "Activity history" },
                    { label: "Integrations", href: "/integrations", icon: Puzzle, description: "SSO, HRIS, LMS" },
                ],
            },
        ],
        featured: {
            title: "Enterprise Demo",
            description: "See how ScaledNative transforms organizational learning",
            href: "/demo",
        },
    },
];

export function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(label);
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovering(false);
            setActiveMenu(null);
        }, 150);
    };

    const handlePanelEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovering(true);
    };

    return (
        <nav className="hidden lg:flex items-center gap-1">
            {megaMenus.map((menu) => (
                <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menu.label)}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={cn(
                            "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeMenu === menu.label
                                ? "bg-white/10 text-white"
                                : "text-muted-foreground hover:text-white"
                        )}
                    >
                        {menu.label}
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            activeMenu === menu.label && "rotate-180"
                        )} />
                    </button>

                    {/* Dropdown Panel */}
                    {activeMenu === menu.label && (
                        <div
                            className="absolute top-full left-0 mt-2 w-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                            onMouseEnter={handlePanelEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex">
                                {/* Main Content */}
                                <div className="flex-1 p-6">
                                    <div className="grid grid-cols-2 gap-8">
                                        {menu.sections.map((section) => (
                                            <div key={section.title}>
                                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                                    {section.title}
                                                </h3>
                                                <ul className="space-y-1">
                                                    {section.items.map((item) => {
                                                        const Icon = item.icon;
                                                        return (
                                                            <li key={item.href}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group"
                                                                >
                                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-sm font-medium group-hover:text-white transition-colors">
                                                                                {item.label}
                                                                            </span>
                                                                            {item.badge && (
                                                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                                                                                    {item.badge}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {item.description && (
                                                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                                                {item.description}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Featured Section */}
                                {menu.featured && (
                                    <div className="w-56 bg-gradient-to-br from-primary/10 to-primary/5 p-6 border-l border-white/5">
                                        <div className="h-full flex flex-col">
                                            <Sparkles className="h-8 w-8 text-primary mb-4" />
                                            <h4 className="font-semibold mb-2">{menu.featured.title}</h4>
                                            <p className="text-sm text-muted-foreground mb-4 flex-1">
                                                {menu.featured.description}
                                            </p>
                                            <Link
                                                href={menu.featured.href}
                                                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                            >
                                                Learn more
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Direct Links */}
            <Link
                href="/pricing"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
                Pricing
            </Link>
            <Link
                href="/resources"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
                Resources
            </Link>
        </nav>
    );
}

export default MegaMenu;
