# ScaledNative Premium Design Specification

## Design System Overview

### Theme
- **Mode**: Dark, cinematic, premium, authoritative
- **Mood**: Confident, sophisticated, innovative, powerful
- **Inspiration**: Framer Awards 2025

---

## 1. Color Palette

```css
/* Primary Colors */
--background: #0A0A0A;           /* Near black - primary background */
--background-secondary: #1A1A1A; /* Dark gray - cards, surfaces */
--foreground: #FFFFFF;           /* White - primary text */
--foreground-muted: #A0A0A0;     /* Light gray - secondary text */

/* Accent Colors */
--accent-blue: #0066FF;          /* Electric blue - highlights, links */
--accent-purple: #6A11CB;        /* Deep purple - gradients, accents */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #0066FF 0%, #6A11CB 100%);
--gradient-glow: radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 70%);
```

---

## 2. Typography System

### Font Stack

```css
/* Script/Elegant - Brand Name */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

/* Bold Sans-serif - Headlines */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

/* Clean Sans-serif - Body */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

--font-brand: 'Playfair Display', serif;
--font-display: 'Montserrat', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Typography Scale

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| Brand Name | Playfair Display | 600 | 48px-64px | 1.1 |
| H1 | Montserrat | 900 | 64px-96px | 1.0 |
| H2 | Montserrat | 800 | 48px-64px | 1.1 |
| H3 | Inter | 600 | 32px-40px | 1.2 |
| H4 | Inter | 600 | 24px-28px | 1.3 |
| Body Large | Inter | 400 | 20px | 1.6 |
| Body | Inter | 400 | 16px | 1.6 |
| Caption | Inter | 400 | 14px | 1.5 |

---

## 3. Homepage Hero Section

### Layout
- Full viewport height (100vh)
- Centered content with generous padding
- Maximum content width: 1200px

### Structure

```
┌─────────────────────────────────────────────────────┐
│                    [Navigation]                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│           ╔═════════════════════════╗               │
│           ║    ScaledNative         ║  ← Playfair   │
│           ╚═════════════════════════╝               │
│                                                      │
│    ╔═══════════════════════════════════════╗        │
│    ║  AI-POWERED WORKFORCE                 ║        │
│    ║  TRANSFORMATION                       ║  ← Montserrat 900
│    ╚═══════════════════════════════════════╝        │
│                                                      │
│       The All-in-One Platform for Building          │
│           an AI-Native Workforce.            ← Inter│
│                                                      │
│         [Request Demo]  [Explore Platform]          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Background
- Base: `#0A0A0A`
- Overlay: Subtle neural network video or animated gradient
- Glow effects: Blue/purple radial gradients at strategic points

---

## 4. UI Components

### Buttons

**Primary Button**
```css
.btn-primary {
  background: #FFFFFF;
  color: #0A0A0A;
  padding: 16px 40px;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  padding: 16px 40px;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.05);
}
```

### Cards

```css
.card {
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(0, 102, 255, 0.3);
  box-shadow: 0 0 40px rgba(0, 102, 255, 0.1);
}
```

---

## 5. Animation Guidelines

### Scroll Animations
- Fade in + slide up (20px) on scroll
- Duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Stagger delay: 100ms between elements

### Hover Effects
- Scale: 1.02 on buttons
- Glow: Box shadow with accent color
- Color transitions: 300ms ease

### Micro-interactions
- Button press: scale(0.98)
- Link hover: underline animation
- Form focus: border glow

---

## 6. Spacing System

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
--space-9: 128px;
--space-10: 160px;
```

### Section Padding
- Hero: 160px vertical
- Content sections: 128px vertical
- Cards: 32-48px internal

---

## 7. Background Treatment

### Hero Section
- Primary: Full-screen dark gradient
- Overlay: Subtle animated particles or neural network
- Glow spots: Top-left (blue), bottom-right (purple)

### CSS Implementation
```css
.hero {
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 102, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(106, 17, 203, 0.08) 0%, transparent 50%),
    #0A0A0A;
}
```

---

## 8. Navigation

### Style
- Fixed position, transparent initially
- Blur backdrop on scroll
- Height: 72px
- Logo: ScaledNative in Playfair Display
- Links: Inter 500, subtle hover underline
- CTA: Ghost button style

---

## Implementation Priority

1. **Phase 1**: Typography + Colors (globals.css)
2. **Phase 2**: Homepage Hero redesign
3. **Phase 3**: Navigation update
4. **Phase 4**: Component styling (buttons, cards)
5. **Phase 5**: Animations + polish
