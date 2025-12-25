import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, helperText, id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "flex h-10 w-full rounded-lg border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-primary",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-error focus:ring-error" : "border-border",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {(error || helperText) && (
                    <p
                        className={cn(
                            "mt-1.5 text-xs",
                            error ? "text-error" : "text-muted-foreground"
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
