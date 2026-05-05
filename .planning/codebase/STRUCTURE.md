# Codebase Structure

**Analysis Date:** 2025-05-15

## Directory Layout

```
src/
├── components/     # UI components and layout elements
│   └── ui/         # Atomic design components (Shadcn)
├── contexts/       # Zustand stores and global state providers
├── features/       # Feature-specific logic and components
├── hooks/          # Shared React hooks
├── integrations/   # External service configurations (Query, PostHog)
├── lib/            # Utility functions and constants
├── routes/         # TanStack Router file-based routing
└── types/          # Shared TypeScript type definitions
```

## Directory Purposes

**src/routes/:**

- Purpose: Defines the application's pages and navigation structure.
- Contains: Route files (`.tsx`) that handle search param validation and page layouts.
- Key files: `__root.tsx` (Root layout/global state), `index.tsx` (Home page).

**src/components/ui/:**

- Purpose: Contains the base design system components.
- Contains: Reusable components like `button.tsx`, `input.tsx`, `select.tsx`.
- Key files: `input.tsx`, `select.tsx`, `card.tsx`.

**src/integrations/:**

- Purpose: Setup and configuration for 3rd party libraries.
- Contains: Query Client setup, analytics providers.
- Key files: `tanstack-query/root-provider.tsx`.

## Key File Locations

**Entry Points:**

- `src/start.ts`: App startup configuration.
- `src/router.tsx`: TanStack Router instance creation and configuration.

**Configuration:**

- `package.json`: Dependencies and scripts.
- `vite.config.ts`: Build and development server configuration.
- `tsconfig.json`: TypeScript configuration.

**Core Logic:**

- `src/routes/__root.tsx`: Defines global URL search params schema.
- `src/lib/utils.ts`: General helper functions.

## Naming Conventions

**Files:**

- Components: kebab-case or PascalCase (usually kebab-case for Shadcn: `button.tsx`).
- Routes: kebab-case (matches URL).
- Hooks: `use-` prefix (`use-local-storage.ts`).

**Directories:**

- Feature folders: kebab-case.

## Where to Add New Code

**New Conversion Page:**

- Primary code: Add a new file in `src/routes/` (e.g., `src/routes/length.tsx`).
- Search Params: Define the schema in the new route file using `validateSearch`.

**New UI Component:**

- Implementation: `src/components/ui/` if it's a generic primitive.

**Business Logic (Units Math):**

- Implementation: `src/lib/converters/` (to be created) or within a feature folder if specific to one unit type.

## Special Directories

**src/routeTree.gen.ts:**

- Purpose: Automatically generated route tree for TanStack Router.
- Generated: Yes
- Committed: Yes

---

_Structure analysis: 2025-05-15_
