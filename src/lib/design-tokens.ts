/**
 * ScaledNative Design Tokens
 * 
 * Centralized design system tokens for consistent styling across the platform.
 * Based on research from leading LMS platforms and modern design practices.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
    // Primary Brand
    primary: {
        50: "hsl(38, 92%, 95%)",
        100: "hsl(38, 92%, 90%)",
        200: "hsl(38, 92%, 80%)",
        300: "hsl(38, 92%, 70%)",
        400: "hsl(38, 92%, 60%)",
        500: "hsl(38, 92%, 50%)",  // Main primary
        600: "hsl(38, 92%, 40%)",
        700: "hsl(38, 92%, 30%)",
        800: "hsl(38, 92%, 20%)",
        900: "hsl(38, 92%, 10%)",
    },

    // Semantic Colors
    success: {
        light: "hsl(160, 84%, 39%)",
        DEFAULT: "hsl(160, 84%, 29%)",
        dark: "hsl(160, 84%, 19%)",
    },
    warning: {
        light: "hsl(40, 96%, 60%)",
        DEFAULT: "hsl(40, 96%, 50%)",
        dark: "hsl(40, 96%, 40%)",
    },
    error: {
        light: "hsl(0, 84%, 60%)",
        DEFAULT: "hsl(0, 84%, 50%)",
        dark: "hsl(0, 84%, 40%)",
    },
    info: {
        light: "hsl(210, 92%, 60%)",
        DEFAULT: "hsl(210, 92%, 50%)",
        dark: "hsl(210, 92%, 40%)",
    },

    // Neutral Palette
    neutral: {
        0: "#FFFFFF",
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0A0A0A",
    },

    // Gradient Presets
    gradients: {
        primary: "linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(45, 93%, 47%) 100%)",
        dark: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
        glass: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        glow: "radial-gradient(circle at center, hsl(38, 92%, 50%, 0.15) 0%, transparent 70%)",
    },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const spacing = {
    px: "1px",
    0: "0",
    0.5: "0.125rem",   // 2px
    1: "0.25rem",       // 4px
    1.5: "0.375rem",    // 6px
    2: "0.5rem",        // 8px
    2.5: "0.625rem",    // 10px
    3: "0.75rem",       // 12px
    3.5: "0.875rem",    // 14px
    4: "1rem",          // 16px
    5: "1.25rem",       // 20px
    6: "1.5rem",        // 24px
    7: "1.75rem",       // 28px
    8: "2rem",          // 32px
    9: "2.25rem",       // 36px
    10: "2.5rem",       // 40px
    11: "2.75rem",      // 44px
    12: "3rem",         // 48px
    14: "3.5rem",       // 56px
    16: "4rem",         // 64px
    20: "5rem",         // 80px
    24: "6rem",         // 96px
    28: "7rem",         // 112px
    32: "8rem",         // 128px
    36: "9rem",         // 144px
    40: "10rem",        // 160px
    44: "11rem",        // 176px
    48: "12rem",        // 192px
    52: "13rem",        // 208px
    56: "14rem",        // 224px
    60: "15rem",        // 240px
    64: "16rem",        // 256px
    72: "18rem",        // 288px
    80: "20rem",        // 320px
    96: "24rem",        // 384px
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
    fontFamily: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        serif: "'Georgia', Cambria, 'Times New Roman', Times, serif",
        mono: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
    },
    fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],         // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],     // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],        // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],     // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],      // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],       // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],  // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],    // 36px
        "5xl": ["3rem", { lineHeight: "1" }],            // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }],         // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }],          // 72px
        "8xl": ["6rem", { lineHeight: "1" }],            // 96px
        "9xl": ["8rem", { lineHeight: "1" }],            // 128px
    },
    fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
    },
    letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
    },
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const borderRadius = {
    none: "0",
    sm: "0.125rem",     // 2px
    DEFAULT: "0.25rem", // 4px
    md: "0.375rem",     // 6px
    lg: "0.5rem",       // 8px
    xl: "0.75rem",      // 12px
    "2xl": "1rem",      // 16px
    "3xl": "1.5rem",    // 24px
    full: "9999px",
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    glow: "0 0 20px hsl(38, 92%, 50%, 0.3)",
    glowLg: "0 0 40px hsl(38, 92%, 50%, 0.4)",
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
    duration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
        slower: "500ms",
    },
    timing: {
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
} as const;

// =============================================================================
// Z-INDEX
// =============================================================================

export const zIndex = {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",      // Sidebar
    40: "40",      // Header
    50: "50",      // Dropdowns
    60: "60",      // Modals
    70: "70",      // Popovers
    80: "80",      // Tooltips
    90: "90",      // Toasts
    100: "100",    // Maximum
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
    xs: "475px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
} as const;

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const componentVariants = {
    card: {
        default: {
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: borderRadius["2xl"],
        },
        glass: {
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: borderRadius["2xl"],
        },
        elevated: {
            background: "rgba(255, 255, 255, 0.03)",
            boxShadow: shadows.lg,
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: borderRadius["2xl"],
        },
        interactive: {
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: borderRadius["2xl"],
            transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
            cursor: "pointer",
            _hover: {
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                transform: "translateY(-2px)",
            },
        },
    },
    button: {
        sizes: {
            xs: { height: "1.75rem", padding: "0 0.5rem", fontSize: "0.75rem" },
            sm: { height: "2rem", padding: "0 0.75rem", fontSize: "0.875rem" },
            md: { height: "2.5rem", padding: "0 1rem", fontSize: "0.875rem" },
            lg: { height: "2.75rem", padding: "0 1.25rem", fontSize: "1rem" },
            xl: { height: "3rem", padding: "0 1.5rem", fontSize: "1rem" },
        },
    },
    input: {
        sizes: {
            sm: { height: "2rem", padding: "0 0.75rem", fontSize: "0.875rem" },
            md: { height: "2.5rem", padding: "0 1rem", fontSize: "0.875rem" },
            lg: { height: "3rem", padding: "0 1rem", fontSize: "1rem" },
        },
    },
} as const;

// Export all tokens
export const tokens = {
    colors,
    spacing,
    typography,
    borderRadius,
    shadows,
    transitions,
    zIndex,
    breakpoints,
    componentVariants,
} as const;

export default tokens;
