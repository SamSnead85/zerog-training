import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-[0.98]",
                secondary:
                    "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:border-border/80",
                outline:
                    "border border-border bg-transparent hover:bg-white/5 hover:border-primary/50",
                ghost: "hover:bg-white/5",
                link: "text-primary underline-offset-4 hover:underline",
                destructive:
                    "bg-error text-error-foreground hover:brightness-110",
                success:
                    "bg-success text-success-foreground hover:brightness-110",
            },
            size: {
                default: "h-11 px-6 py-2.5",
                sm: "h-9 px-4 text-xs",
                lg: "h-13 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                icon: "h-11 w-11",
                "icon-sm": "h-9 w-9",
                "icon-lg": "h-13 w-13",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
