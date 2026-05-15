# Codebase Structure

**Analysis Date:** 2025-05-14

## Directory Layout

```text
[project-root]/
├── src/                # Application source code
│   ├── components/     # React components
│   │   └── ui/         # Base UI components (shadcn/ui style)
│   ├── contexts/       # Global state (Zustand) and React contexts
│   ├── features/       # Feature-specific logic (currently empty/minimal)
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # External service configurations (i18n, posthog)
│   ├── lib/            # Core logic, utilities, and validation schemas
│   ├── locales/        # Translation files (PO and compiled JS)
│   ├── routes/         # Page components and TanStack Router definitions
│   ├── types/          # Shared TypeScript type definitions
│   ├── router.tsx      # Router initialization
│   └── styles.css      # Global CSS (Tailwind)
├── public/             # Static assets (favicons, manifest)
├── dist/               # Build output
└── [config files]      # Vite, Wrangler, Lingui, etc.
```

## Directory Purposes

**src/routes/:**

- Purpose: Defines the application's URL structure and associated UI.
- Contains: TanStack Router route files (`__root.tsx`, `$lang/`, etc.).
- Key files: `src/routes/$lang/convert.$quantity.$from.to.$to.tsx` (Main conversion page).

**src/lib/:**

- Purpose: Shared logic and domain models.
- Contains: Unit conversion math, utility functions, and Valibot schemas for data validation.
- Key files: `src/lib/units.ts` (Conversion engine).

**src/components/ui/:**

- Purpose: Atomic UI building blocks.
- Contains: Styled inputs, buttons, and loaders.
- Key files: `src/components/ui/input.tsx`.

**src/integrations/:**

- Purpose: Third-party service integration code.
- Contains: Analytics providers and internationalization setup.
- Key files: `src/integrations/i18n/load-catalog.ts`.

## Key File Locations

**Entry Points:**

- `src/router.tsx`: Bootstraps the TanStack Router.
- `src/routes/__root.tsx`: Top-level layout and providers.

**Configuration:**

- `vite.config.ts`: Build and development server config.
- `wrangler.jsonc`: Cloudflare Pages deployment configuration.
- `lingui.config.js`: Internationalization settings.

**Core Logic:**

- `src/lib/units.ts`: All unit conversion logic and unit definitions.

**Testing:**

- Not detected in `src/` (Check for `.test.ts` or similar; none found in initial scan).

## Naming Conventions

**Files:**

- React components: `kebab-case.tsx` (e.g., `feedback-section.tsx`).
- Routes: TanStack Router convention (e.g., `$lang.tsx`, `convert.$quantity.tsx`).
- Utilities/Logic: `kebab-case.ts` (e.g., `units.ts`).

**Directories:**

- Feature/Category based: `kebab-case` (e.g., `general-ctx`).

## Where to Add New Code

**New Conversion Category:**

- Implementation: Add to the `units` object in `src/lib/units.ts`.
- Validation: Ensure `QuantitySchema` and `UnitName` in `src/lib/units.ts` are updated.

**New UI Component:**

- Implementation: `src/components/ui/` if generic; `src/components/` if project-specific.

**New Page/Route:**

- Implementation: Create a new file in `src/routes/` following TanStack Router conventions.

**New Translation:**

- Implementation: Use `<Trans>` macro in components, then run `bunx lingui extract`. Files live in `src/locales/`.

## Special Directories

**src/locales/:**

- Purpose: Contains translation catalogs.
- Generated: `.js` files are generated from `.po` files.
- Committed: Yes.

**src/routeTree.gen.ts:**

- Purpose: Auto-generated route tree for TanStack Router.
- Generated: Yes.
- Committed: Yes.

---

_Structure analysis: 2025-05-14_
