<!-- refreshed: 2025-05-14 -->

# Architecture

**Analysis Date:** 2025-05-14

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                      Routing & Layout                        │
│         `src/routes/` & `src/routes/__root.tsx`              │
├──────────────────┬──────────────────┬───────────────────────┤
│    I18n Layer    │   State (URL)    │   UI Components       │
│`src/integrations`│ `TanStack Router`│   `src/components/`   │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Core Conversion Logic                     │
│         `src/lib/units.ts` & `decimal.js`                    │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Infrastructure (Cloudflare Workers / Pages)                 │
│  `wrangler.jsonc` & `vite.config.ts`                         │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component         | Responsibility                                         | File                        |
| ----------------- | ------------------------------------------------------ | --------------------------- |
| Conversion Engine | Central logic for unit calculations using `decimal.js` | `src/lib/units.ts`          |
| Route Definitions | File-based routing and page layout                     | `src/routes/`               |
| I18n Manager      | Locale validation and message catalog loading          | `src/integrations/i18n/`    |
| UI Kit            | Reusable, atomic UI components (inputs, buttons)       | `src/components/ui/`        |
| Analytics         | User tracking and event logging via PostHog            | `src/integrations/posthog/` |

## Pattern Overview

**Overall:** Client-side React Application with File-based Routing and Localized URL Segments.

**Key Characteristics:**

- **URL-Driven State:** The primary state of the application (selected units, quantity, language) is stored in the URL path and search parameters.
- **Precision-First:** Uses `decimal.js` for all math to prevent floating-point errors in scientific conversions.
- **Progressive Localization:** Language is part of the URL path (`/$lang/`), and translations are loaded dynamically.

## Layers

**Routing Layer:**

- Purpose: Handles navigation, URL parsing, and top-level layout.
- Location: `src/routes/`
- Contains: TanStack Router route definitions and page-level components.
- Depends on: `src/lib/units.ts`, `src/integrations/i18n/`
- Used by: React Entry point

**Domain Layer:**

- Purpose: Defines the business logic for unit conversions.
- Location: `src/lib/units.ts`
- Contains: Unit definitions, base unit conversion functions, and validation schemas.
- Depends on: `decimal.js`, `valibot`

**Integration Layer:**

- Purpose: Connects the application to external services and cross-cutting concerns.
- Location: `src/integrations/`
- Contains: PostHog setup, Lingui i18n configuration.

## Data Flow

### Primary Request Path (Conversion)

1. **Route Entry:** User visits `/$lang/convert/$quantity/$from/to/$to?fromValue=10` (`src/routes/$lang/convert.$quantity.$from.to.$to.tsx`)
2. **Param Validation:** `parseParams` uses Valibot to validate units and quantity (`src/lib/global-params-params.ts`)
3. **Locale Loading:** `beforeLoad` in parent route `/$lang` loads the translation catalog (`src/routes/$lang/route.tsx`)
4. **Logic Execution:** `Converter` component reads params and calls conversion logic in `src/lib/units.ts`
5. **UI Rendering:** The result is rendered using `src/components/ui/input.tsx`

### State Management:

- **URL State:** Handled by TanStack Router (params and search params).
- **Global UI State:** Minimal state managed by Zustand (`src/contexts/general-ctx/general-context.ts`).
- **Persistence:** Zustand state is persisted to `localStorage`.

## Key Abstractions

**UnitDefinition:**

- Purpose: Defines how a specific unit (e.g., Meter) relates to its category's base unit.
- Examples: `src/lib/units.ts`
- Pattern: Strategy pattern for conversion logic (`toBaseUnit`, `fromBaseUnit`).

**Route Context:**

- Purpose: Shared data available to all routes.
- Examples: `src/routes/__root.tsx`

## Entry Points

**Main Entry:**

- Location: `src/router.tsx` (and implicit Vite entry)
- Triggers: Browser page load.
- Responsibilities: Initializes TanStack Router and renders the application root.

## Architectural Constraints

- **Threading:** Single-threaded (standard browser environment).
- **Global state:** Minimal use of Zustand; preference for URL state to ensure shareable links.
- **Precision:** All math MUST use `Decimal` from `decimal.js` to avoid IEEE 754 precision issues.

## Anti-Patterns

### Floating Point Math

**What happens:** Using standard JavaScript `number` for unit conversions.
**Why it's wrong:** Causes rounding errors (e.g., `0.1 + 0.2 !== 0.3`) which is unacceptable for a precision tool.
**Do this instead:** Always use `Decimal` from `src/lib/units.ts`.

### Prop Drilling Locale

**What happens:** Passing language or translation functions through many component layers.
**Why it's wrong:** Unnecessary complexity.
**Do this instead:** Use Lingui's `<Trans>` macro or `useLingui` hook.

## Error Handling

**Strategy:** Declarative error boundaries and route-level error components.

**Patterns:**

- **Route Error Components:** Defined in `src/routes/` to handle invalid params or failed loads.
- **Default Catch Boundary:** `src/components/default-catch-boundary.tsx` for unexpected runtime errors.

## Cross-Cutting Concerns

**Logging:** Handled via PostHog (`src/integrations/posthog/`).
**Validation:** Centralized in `src/lib/` using Valibot schemas.
**Authentication:** Not applicable (public tool).

---

_Architecture analysis: 2025-05-14_
