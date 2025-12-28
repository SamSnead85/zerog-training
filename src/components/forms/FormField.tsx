"use client";

/**
 * Form Field Components
 * 
 * Production-ready form fields with validation, error states,
 * and accessibility features.
 */

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// =============================================================================
// FORM FIELD WRAPPER
// =============================================================================

interface FormFieldProps {
    label?: string;
    description?: string;
    error?: string;
    success?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function FormField({
    label,
    description,
    error,
    success,
    required,
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {children}
            {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {success && !error && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{success}</span>
                </div>
            )}
        </div>
    );
}

// =============================================================================
// TEXT INPUT
// =============================================================================

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ error, icon, iconPosition = "left", className, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full h-10 px-3 rounded-lg border bg-background text-sm transition-colors",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-input hover:border-input/80",
                        icon && iconPosition === "left" && "pl-10",
                        icon && iconPosition === "right" && "pr-10",
                        className
                    )}
                    {...props}
                />
                {icon && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
TextInput.displayName = "TextInput";

// =============================================================================
// PASSWORD INPUT
// =============================================================================

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    error?: boolean;
    showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ error, showStrength, className, value, ...props }, ref) => {
        const [visible, setVisible] = useState(false);
        const strength = showStrength ? getPasswordStrength(String(value || "")) : null;

        return (
            <div className="space-y-2">
                <div className="relative">
                    <input
                        ref={ref}
                        type={visible ? "text" : "password"}
                        value={value}
                        className={cn(
                            "w-full h-10 px-3 pr-10 rounded-lg border bg-background text-sm transition-colors",
                            "placeholder:text-muted-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-input hover:border-input/80",
                            className
                        )}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setVisible(!visible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                    >
                        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {showStrength && strength && (
                    <div className="space-y-1">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={cn(
                                        "h-1 flex-1 rounded-full transition-colors",
                                        level <= strength.level
                                            ? strength.color
                                            : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                        <p className={cn("text-xs", strength.textColor)}>{strength.label}</p>
                    </div>
                )}
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";

function getPasswordStrength(password: string): { level: number; label: string; color: string; textColor: string } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 1, label: "Weak", color: "bg-red-500", textColor: "text-red-400" };
    if (score <= 3) return { level: 2, label: "Fair", color: "bg-amber-500", textColor: "text-amber-400" };
    if (score <= 4) return { level: 3, label: "Good", color: "bg-blue-500", textColor: "text-blue-400" };
    return { level: 4, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-400" };
}

// =============================================================================
// TEXTAREA
// =============================================================================

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    maxLength?: number;
    showCount?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ error, maxLength, showCount, value, className, ...props }, ref) => {
        const length = String(value || "").length;

        return (
            <div className="relative">
                <textarea
                    ref={ref}
                    value={value}
                    maxLength={maxLength}
                    className={cn(
                        "w-full min-h-[100px] p-3 rounded-lg border bg-background text-sm transition-colors resize-y",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-input hover:border-input/80",
                        className
                    )}
                    {...props}
                />
                {showCount && maxLength && (
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {length}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);
TextArea.displayName = "TextArea";

// =============================================================================
// SELECT
// =============================================================================

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    options: SelectOption[];
    error?: boolean;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, error, placeholder, className, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    "w-full h-10 px-3 rounded-lg border bg-background text-sm transition-colors appearance-none cursor-pointer",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-input hover:border-input/80",
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);
Select.displayName = "Select";

// =============================================================================
// CHECKBOX
// =============================================================================

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
                <input
                    ref={ref}
                    type="checkbox"
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-0"
                    {...props}
                />
                {label && <span className="text-sm">{label}</span>}
            </label>
        );
    }
);
Checkbox.displayName = "Checkbox";

// =============================================================================
// RADIO GROUP
// =============================================================================

interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function RadioGroup({ name, options, value, onChange, className }: RadioGroupProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                        value === option.value
                            ? "border-primary bg-primary/5"
                            : "border-input hover:border-input/80"
                    )}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="mt-0.5 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div>
                        <span className="text-sm font-medium">{option.label}</span>
                        {option.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                        )}
                    </div>
                </label>
            ))}
        </div>
    );
}

export default FormField;
