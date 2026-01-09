"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle, Check, Search, X } from "lucide-react";

// Accessible text input with label and error handling
interface TextInputProps {
    label: string;
    name: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url";
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
}

export function TextInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    hint,
    required = false,
    disabled = false,
    autoComplete,
}: TextInputProps) {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-white/80"
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-white/10 focus:border-primary",
                        disabled && "opacity-50 cursor-not-allowed",
                        isPassword && "pr-10"
                    )}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="text-sm text-red-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </p>
            )}

            {hint && !error && (
                <p id={`${id}-hint`} className="text-xs text-white/40">
                    {hint}
                </p>
            )}
        </div>
    );
}

// Accessible textarea
interface TextareaProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    maxLength?: number;
}

export function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    hint,
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
}: TextareaProps) {
    const id = useId();

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-white/80"
                >
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
                {maxLength && (
                    <span className="text-xs text-white/40">
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>

            <textarea
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                aria-invalid={!!error}
                className={cn(
                    "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-colors resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-primary",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            />

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </p>
            )}

            {hint && !error && (
                <p className="text-xs text-white/40">{hint}</p>
            )}
        </div>
    );
}

// Accessible select
interface SelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}

export function Select({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    error,
    required = false,
    disabled = false,
}: SelectProps) {
    const id = useId();

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-white/80"
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <select
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                className={cn(
                    "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-colors appearance-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-primary",
                    disabled && "opacity-50 cursor-not-allowed",
                    !value && "text-white/40"
                )}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </p>
            )}
        </div>
    );
}

// Accessible checkbox
interface CheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
    disabled?: boolean;
}

export function Checkbox({
    label,
    name,
    checked,
    onChange,
    description,
    disabled = false,
}: CheckboxProps) {
    const id = useId();

    return (
        <div className="flex items-start gap-3">
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={cn(
                    "mt-1 h-4 w-4 rounded border-white/30 bg-white/5",
                    "text-primary focus:ring-primary/50 focus:ring-offset-0",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            />
            <div>
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-white/50 mt-0.5">{description}</p>
                )}
            </div>
        </div>
    );
}

// Search input with clear button
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    className,
}: SearchInputProps) {
    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}

// Form validation helpers
export const validators = {
    required: (value: string) => !value.trim() ? "This field is required" : undefined,
    email: (value: string) => {
        if (!value) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Please enter a valid email" : undefined;
    },
    minLength: (min: number) => (value: string) =>
        value.length < min ? `Must be at least ${min} characters` : undefined,
    maxLength: (max: number) => (value: string) =>
        value.length > max ? `Must be at most ${max} characters` : undefined,
    pattern: (regex: RegExp, message: string) => (value: string) =>
        !regex.test(value) ? message : undefined,
};
