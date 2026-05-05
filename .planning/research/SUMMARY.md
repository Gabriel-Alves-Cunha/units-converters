# Research Summary: Top-Tier Unit Converter

## Executive Summary

The "Units Converter" project aims to deliver a high-performance, precise, and shareable utility application that outperforms existing tools like UnitConverters.net through a modern UI and superior state management. The core vision centers on a **URL-as-State** architecture, ensuring every conversion is instantly shareable and persistent.

Based on extensive research, the recommended approach utilizes **React 19**, **TanStack Router**, and **Zod** for robust state handling, with **mathjs** or **convert** as the mathematical engine. The primary technical challenges involve managing JavaScript's floating-point limitations and ensuring historical accuracy of conversion factors. By prioritizing precision (NIST-sourced factors), mobile optimization, and real-time feedback, the product will serve both casual users and professionals in engineering and scientific fields.

## Key Findings

### Technology Stack (from STACK.md & TECH.md)

- **Core Framework:** React 19 + Vite 6 for high performance and fast development.
- **Routing & State:** TanStack Router is critical for syncing conversion state (amount, from, to) to URL search parameters.
- **Conversion Engine:** `mathjs` is the preferred choice for scientific precision and expression support, while `convert` is a lightweight alternative for basic needs.
- **Validation:** Zod schemas are mandatory for validating URL parameters and ensuring runtime safety.
- **UI:** Tailwind CSS 4 and Shadcn UI (specifically Combobox) for accessible, responsive unit selection.

### Feature Landscape (from FEATURES.md & PRODUCT.md)

- **Table Stakes:** Common units (Length, Mass, etc.), bidirectional sync, URL persistence, and a "Swap" button.
- **Differentiators:** Formula display, scientific notation, conversion history, and "Best Unit" suggestions.
- **Anti-Features:** Currency conversion (to avoid API complexity) and full scientific calculators.
- **Mobile First:** Numeric keypad triggers (`inputmode="decimal"`) and touch-friendly tap targets.

### Architecture Patterns (from ARCHITECTURE.md)

- **URL-as-Source-of-Truth:** Avoid redundant local state; bind inputs directly to URL search params.
- **Base-Unit Pattern:** Convert `Input -> Base Unit -> Output` to minimize error propagation.
- **Headless Hooks:** Encapsulate conversion logic in a `useConverter` hook for clean component separation.

### Critical Pitfalls (from PITFALLS.md & RISK.md)

- **Floating-Point Artifacts:** Prevented by using `Intl.NumberFormat` for display and `BigNumbers` for calculation.
- **History Flooding:** Avoided by using `replace: true` during real-time URL updates.
- **Incorrect Factors:** Mitigated by using NIST SP 811 as the "Gold Standard" for unit testing.

## Implications for Roadmap

### Suggested Phase Structure

1. **Phase 1: Core Engine & URL State (The Foundation)**
   - **Goal:** Establish the "Shareable State" pattern and core conversion logic.
   - **Features:** Length & Mass categories, TanStack Router integration, Zod validation.
   - **Rationale:** Proves the architecture and solves the most common use cases first.
   - **Pitfalls to Avoid:** Floating-point display errors.

2. **Phase 2: Category Expansion & Precision (Engineering Tier)**
   - **Goal:** Add complex units and ensure scientific-grade precision.
   - **Features:** Tier 2 categories (Pressure, Power, Energy), `mathjs` integration, NIST-based test suite.
   - **Rationale:** Builds trust with professional users.
   - **Pitfalls to Avoid:** Incorrect conversion factors for niche units.

3. **Phase 3: Power-User UX & Mobile (Polish)**
   - **Goal:** Optimize for speed and professional productivity.
   - **Features:** Conversion History, Copy-to-Clipboard, Mobile keypad optimization, Unit Search (Combobox).
   - **Rationale:** Transitions the tool from "functional" to "delightful."

4. **Phase 4: Advanced Features (Differentiators)**
   - **Goal:** Surpass competitors with unique utilities.
   - **Features:** Formula display, Offline Support (PWA), "Best Unit" suggestion logic.
   - **Rationale:** Provides high value for recurring users.

### Research Flags

- **Needs Research:** The "Smart Unit Picker" (`toBest()` logic) needs specialized logic to avoid confusing users (e.g., suggesting "decimeters" when "meters" is more natural).
- **Standard Patterns:** URL state sync and Shadcn integration are well-documented; no further research required.

## Confidence Assessment

| Area         | Confidence | Notes                                                                 |
| ------------ | ---------- | --------------------------------------------------------------------- |
| Stack        | HIGH       | React/TanStack/Zod is a proven, robust combination for this app type. |
| Features     | HIGH       | Clear differentiation from dated competitors.                         |
| Architecture | HIGH       | URL-as-state perfectly fits the "shareable utility" requirement.      |
| Pitfalls     | MEDIUM     | Floating-point and factor accuracy require diligent testing.          |

**Gaps to Address:**

- Defining the exact "Tier 3/4" unit list.
- Finalizing the UI design for the "Formula Display" to ensure it doesn't clutter the layout.

## Sources

- [NIST SP 811 (Guide for the Use of the International System of Units)](https://www.nist.gov/pml/special-publication-811)
- [TanStack Router Documentation](https://tanstack.com/router)
- [convert (Jonah Snider)](https://github.com/jonahsnider/convert)
- [mathjs Documentation](https://mathjs.org/)
- [Floating-Point Guide](https://floating-point-gui.de/)
