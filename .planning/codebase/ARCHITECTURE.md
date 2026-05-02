<!-- refreshed: 2025-05-15 -->
# Architecture

**Analysis Date:** 2025-05-15

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Presentation Layer                    │
│           (React 19 + Tailwind CSS 4 + Shadcn UI)           │
├──────────────────┬──────────────────┬───────────────────────┤
│    Components    │      Routes      │        Features       │
│ `src/components` │   `src/routes`   │     `src/features`    │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Logic Layer                   │
│          (TanStack Router + TanStack Query + Zustand)       │
│         `src/router.tsx`, `src/hooks`, `src/contexts`       │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Integrations                     │
│               (PostHog, TanStack Query Client)              │
│                  `src/integrations`                         │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Router | Central navigation and URL state management | `src/router.tsx` |
| Root Route | Layout, global styles, and search param validation | `src/routes/__root.tsx` |
| UI Components | Atomic, reusable design elements | `src/components/ui/` |
| Context Stores | Persistent local state (e.g., settings) | `src/contexts/` |

## Pattern Overview

**Overall:** URL-Driven State Architecture

**Key Characteristics:**
- **URL as Source of Truth:** Application state (like selected units, values to convert) is primarily stored in URL search parameters.
- **Type-Safe Routing:** Uses TanStack Router for end-to-end type safety from links to search param validation.
- **Atomic UI:** Uses Shadcn-inspired components built on Tailwind CSS 4 for a consistent design system.

## Layers

**Routing Layer:**
- Purpose: Handles navigation and validates URL state.
- Location: `src/routes/`
- Contains: Route definitions, layouts, and search parameter schemas.
- Depends on: TanStack Router, Zod.
- Used by: Entire application for navigation.

**State Management Layer:**
- Purpose: Manages transient and persistent client-side state.
- Location: `src/contexts/`, `src/hooks/`
- Contains: Zustand stores, custom hooks.
- Depends on: Zustand.

**Integrations Layer:**
- Purpose: Configures third-party services and shared clients.
- Location: `src/integrations/`
- Contains: TanStack Query client, PostHog provider.

## Data Flow

### URL-Based State Flow

1. **User Action:** User interacts with a unit selector or input field.
2. **Navigation:** Component calls `useNavigate` or uses a `<Link>` with updated `search` parameters.
3. **Validation:** TanStack Router's `validateSearch` in `src/routes/__root.tsx` (or specific routes) parses and validates the new URL.
4. **Re-render:** Components subscribed via `Route.useSearch()` receive the updated, validated values and re-render the UI.

### Server Data Flow (TanStack Query)

1. **Query Hook:** Component uses a hook from `src/hooks/` or direct `useQuery`.
2. **Cache Check:** TanStack Query checks if data is fresh.
3. **Fetch:** If stale, it fetches data using defined integration clients.
4. **Update:** Cache is updated, triggering re-renders in dependent components.

## Key Abstractions

**Search Param Validation:**
- Purpose: Ensures URL state is always valid according to a schema.
- Examples: `globalSearchSchema` in `src/routes/__root.tsx`.
- Pattern: Zod schema parsing within `validateSearch`.

## Entry Points

**Main Entry:**
- Location: `src/start.ts`
- Triggers: Application initialization.
- Responsibilities: Configures the start instance and middleware.

**Router Entry:**
- Location: `src/router.tsx`
- Responsibilities: Creates the router instance, integrates plugins (PostHog, Query SSR).

## Architectural Constraints

- **Single-Source of Truth (URL):** UI state that should be shareable/bookmarkable MUST live in the URL search parameters.
- **Zod for Validation:** All external data and URL parameters must be validated using Zod schemas.

## Anti-Patterns

### State Duplication

**What happens:** Storing the same value in both a local `useState` and the URL.
**Why it's wrong:** Leads to synchronization issues and breaks "back button" expectations.
**Do this instead:** Use `Route.useSearch()` to read and `navigate({ search: ... })` to write.

---

*Architecture analysis: 2025-05-15*
