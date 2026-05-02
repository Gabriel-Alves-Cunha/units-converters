# Domain Pitfalls: Unit Converters

**Domain:** Utility Web Application
**Date:** 2024-05-21

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Floating-Point Artifacts
**What goes wrong:** Displaying `0.30000000000000004` instead of `0.3`.
**Why it happens:** IEEE 754 binary representation of decimal fractions.
**Consequences:** User distrust; perceived as "broken" math.
**Prevention:** Always use a rounding utility or `Intl.NumberFormat` for the final display value. Use a library like `big.js` if the math *between* steps needs high precision.

### Pitfall 2: History Flooding
**What goes wrong:** User types "100" and has to click "Back" 3 times to leave the page.
**Why it happens:** Every keystroke creates a new browser history entry.
**Consequences:** Broken navigation; frustrating UX.
**Prevention:** Always use `replace: true` when syncing text input to search parameters.

## Moderate Pitfalls

### Pitfall 1: Invalid Unit Pairs
**What goes wrong:** App crashes when trying to convert "meters" to "kilograms."
**Prevention:** Use Zod schemas to validate that "From" and "To" units belong to the same category. `convert` library's TypeScript types prevent this at compile time, but runtime validation is needed for URL params.

### Pitfall 2: Temperature Conversion Errors
**What goes wrong:** Using simple multipliers for Celsius/Fahrenheit.
**Why it happens:** Temperature uses an *offset* (e.g., +32) in addition to a multiplier.
**Prevention:** Ensure the conversion library (or custom logic) specifically handles non-zero-offset units like Temperature.

## Minor Pitfalls

### Pitfall 1: Large Number Formatting
**What goes wrong:** Extremely long numbers breaking the UI layout.
**Prevention:** Use `Intl.NumberFormat` with scientific notation or compact notation for values over 1 billion.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation | Search param validation | Use Zod `.catch()` to provide defaults for bad URLs. |
| UI Polish | Keyboard navigation | Ensure unit selectors are fully accessible and searchable. |

## Sources

- [What Every Programmer Should Know About Floating-Point Arithmetic](https://floating-point-gui.de/)
- [TanStack Router Navigating Guide](https://tanstack.com/router/latest/docs/framework/react/guide/navigation)
