"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full shadow-lg transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}
        >
            <ArrowUp className="h-4 w-4" />
        </Button>
    );
}
