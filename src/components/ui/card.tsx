import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
    "rounded-xl border bg-card text-card-foreground transition-all duration-300",
    {
        variants: {
            variant: {
                default: "border-border shadow-sm",
                elevated: "border-border shadow-lg",
                glass: "border-white/10 bg-white/5 backdrop-blur-lg",
                outline: "border-border bg-transparent",
                glow: "border-primary/30 shadow-[0_0_20px_rgba(0,217,255,0.1)]",
            },
            hover: {
                none: "",
                lift: "hover:-translate-y-1 hover:shadow-xl hover:border-primary/50",
                glow: "hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] hover:border-primary/50",
                scale: "hover:scale-[1.02]",
            },
            padding: {
                none: "",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            hover: "none",
            padding: "default",
        },
    }
);

export interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, hover, padding, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, hover, padding, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5", className)}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                "text-xl font-semibold leading-tight tracking-tight",
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex items-center pt-4", className)}
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
