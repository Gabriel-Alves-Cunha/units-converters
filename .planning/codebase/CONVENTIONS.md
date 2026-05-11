# Coding Conventions

**Analysis Date:** 2025-05-14

## Naming Patterns

**Files:**
- Kebab-case for general files and components: `package.json`, `tsconfig.json`, `button.tsx`, `common-conversions.tsx`.
- Special TanStack Router files: `__root.tsx`, `index.tsx`, `routeTree.gen.ts`.
- Directory names are kebab-case: `common-ctx`, `ui`, `i18n`.

**Functions:**
- camelCase for utility functions and hooks: `cn`, `isValidNumber`, `prettyBytes`, `useWithGeneralStoreNotebookId`.
- PascalCase for React components, typically defined with the `function` keyword: `export function Button(...)`.

**Variables:**
- camelCase for local variables, props, and state.
- SCREAMING_SNAKE_CASE for constants: `UNITS`, `MATH_LOG_1024`.

**Types:**
- PascalCase for interfaces and type aliases: `UnitDefinition`, `Quantity`, `Props`.
- Context-specific types often end in `Props` or `Context`.

## Code Style

**Formatting:**
- **Tool:** `oxfmt` (integrated in `package.json` as `bun run format`).
- **Settings:** Uses tabs for indentation, semicolons, and trailing commas (observed in `src/lib/utils.ts` and `src/routes/__root.tsx`).

**Linting:**
- **Tool:** `oxlint` (integrated in `package.json` as `bun run lint`).
- **Plugins:** `eslint`, `typescript`, `unicorn`, `react`, `react-perf`, `oxc`, `promise`, `import` (configured in `oxlint.config.ts`).

## Import Organization

**Order:**
1. React and core libraries (e.g., `react`, `@tanstack/react-router`).
2. External dependencies (e.g., `decimal.js`, `valibot`).
3. Internal absolute imports using `#/*` alias (e.g., `#/components/ui/input`, `#/lib/units`).
4. Relative imports (e.g., `./components/not-found`).

**Path Aliases:**
- `#/*`: Maps to `./src/*` (configured in `package.json` and `tsconfig.json`).

## Error Handling

**Patterns:**
- **Component Level:** Uses `react-error-boundary` and TanStack Router's `errorComponent`.
- **Global:** `DefaultCatchBoundary` (`src/components/default-catch-boundary.tsx`) provides a fallback for route-level errors.
- **Validation:** Uses `valibot`'s `safeParse` for runtime validation, throwing errors with descriptive causes when validation fails (`src/routes/$lang/convert.$quantity.$from.to.$to.tsx`).

## Logging

**Framework:** PostHog for analytics and session tracking.

**Patterns:**
- `PostHogProvider` wraps the app (`src/integrations/posthog/provider.tsx`).
- `console.error` is used for reporting validation failures during route parsing.

## Comments

**When to Comment:**
- To explain complex logic or ignore specific linting/type rules (e.g., `// @ts-ignore` in `src/routes/$lang/convert.$quantity.$from.to.$to.tsx`).
- Docstrings are not extensively used in the current codebase.

## Function Design

**Size:** Focused, single-responsibility functions (e.g., utilities in `src/lib/utils.ts`).

**Parameters:** Destructured props are preferred for React components.

**Return Values:** Explicit return types are common in utility functions; inferred for React components.

## Module Design

**Exports:**
- Named exports are strongly preferred for components and utilities to improve discoverability and tree-shaking.
- Default exports are used for route definitions (`src/routes/index.ts`) and configuration files (`vite.config.ts`, `oxlint.config.ts`).

**Barrel Files:**
- Used sparingly; most imports are direct from the implementation file.

---

*Convention analysis: 2025-05-14*
