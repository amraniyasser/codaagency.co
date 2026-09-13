# Coda Agency — Design System

Status: validated foundation

## Direction
Premium, minimal, warm, architectural and contemporary. The visual language should feel controlled, refined and intentional.

## Official palette
- Background principal: `#E4DFD8`
- Background secondaire: `#D0CAC2`
- Surface / accent: `#B7B1A8`
- Dark principal: `#111111`
- Texte principal: `#0B0B0B`
- Texte secondaire: `#4B5B66`
- Texte clair sur fond sombre: `#F5F2EE`
- Border light: `rgba(11, 11, 11, 0.12)`
- Border dark: `rgba(255, 255, 255, 0.16)`

The hero may later use its own image, video, gradient or visual background. The main background remains the default surface for standard light sections.

## Typography
Primary font family: General Sans.

### H1
- Weight: 700 for emphasis, with 400–500 allowed for contrasting lines
- Size: `clamp(64px, 7vw, 120px)`
- Line-height: `0.95`
- Letter-spacing: `-0.02em`

### H2
- Weight: 600
- Size: `clamp(40px, 5vw, 72px)`
- Line-height: `1.1`
- Letter-spacing: `-0.01em`

### H3
- Weight: 600
- Size: `clamp(28px, 3vw, 44px)`
- Line-height: `1.2`

### Body large
- Size: `20px`
- Weight: 400
- Line-height: `1.6`

### Body
- Size: `16px`
- Weight: 400
- Line-height: `1.6`

### Small
- Size: `14px`
- Weight: 400
- Line-height: `1.5`

### Label
- Size: `12px`
- Weight: 600
- Letter-spacing: `0.08em`
- Uppercase allowed

## Core principles
- Keep the palette restrained and warm.
- Use dark sections as intentional contrast, not everywhere.
- Keep one primary type family across the site.
- Buttons, radii, spacing and motion should be reusable system components.
- Individual sections can have unique backgrounds while still using the same global design language.
- Avoid hard-coded colors inside components when a design token exists.

## Build order
1. Palette + typography
2. Global tokens
3. Global CSS
4. Navbar
5. Hero
6. Shared motion
7. Remaining sections
8. Responsive
9. SEO / GEO technical layer
10. Performance + QA
