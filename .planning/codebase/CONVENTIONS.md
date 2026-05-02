# Coding Conventions

**Analysis Date:** 2025-05-02

## Naming Patterns

**Files:**
- Kebab-case for general files: `package.json`, `tsconfig.json`, `routeTree.gen.ts`.
- React components in `src/components/ui/` use kebab-case: `button.tsx`, `alert-dialog.tsx`.
- Special TanStack Router files use specific naming: `__root.tsx`, `index.tsx`, `router.tsx`.
- Path alias `#/` points to `src/` (configured in `package.json` and `tsconfig.json`).

**Functions:**
- CamelCase for general functions: `isValidNumber`, `prettyBytes`.
- PascalCase for React components, but defined using `function` keyword: `function Button(...)`.
- Named exports are preferred over default exports for components and utilities.

**Variables:**
- CamelCase for local variables and props.
- UpperCase with underscores for constants: `UNITS`, `MATH_LOG_1024`.
- Component variants defined as constants: `buttonVariants`.

**Types:**
- PascalCase for interfaces and type aliases: `MyRouterContext`, `PostHogProviderProps`.
- Context-specific store types: `ZustandContextStore<T>`.

## Code Style

**Formatting:**
- **Tool:** `oxfmt` (Oxlint formatter).
- **Settings:**
  - `useTabs: true` (Tab width: 2)
  - `semi: true`
  - `trailingComma: "all"`
  - `jsxSingleQuote: false`
  - `printWidth: 80`
- **CSS:** Tailwind v4 using `oklch` colors and CSS variables.

**Linting:**
- **Tool:** `oxlint`.
- **TypeScript:** Extremely strict configuration in `tsconfig.json` (`strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitReturns: true`, `verbatimModuleSyntax: true`).

## Import Organization

**Order:**
1. External libraries (e.g., `react`, `@tanstack/react-router`).
2. Internal absolute imports using `#/` alias (e.g., `#/lib/utils`).
3. Relative imports (e.g., `./components/not-found`).
4. Styles (e.g., `../styles.css?url`).

**Path Aliases:**
- `#/`: Maps to `./src/*`.

## Error Handling

**Patterns:**
- Use `react-error-boundary` for component-level errors.
- `DefaultCatchBoundary` (`src/components/default-catch-boundary.tsx`) used as the default error component in TanStack Router.
- `NotFound` component for 404s.

## Logging

**Framework:** PostHog for analytics and session tracking (`src/integrations/posthog/provider.tsx`).

**Patterns:**
- `PostHogProvider` wraps the application in `src/router.tsx`.
- Dev-only scripts (e.g., `react-scan`) are injected conditionally in `__root.tsx`.

## Comments

**When to Comment:**
- To explain complex type logic (e.g., in `src/contexts/create-zustand-provider.tsx`).
- To provide reasoning for specific configuration choices (e.g., `strict: false` in search params).

## Function Design

**Size:** Small, focused utility functions.

**Parameters:** Destructured props with default values for React components.

**Return Values:** Explicit return types for utilities; inferred for React components.

## Module Design

**Exports:**
- Named exports for components and variants to facilitate IDE discovery and tree-shaking.
- `export default` is used occasionally for providers (e.g., `PostHogProvider`).

**Barrel Files:**
- Not extensively used; direct imports from file paths are preferred.

---

*Convention analysis: 2025-05-02*
