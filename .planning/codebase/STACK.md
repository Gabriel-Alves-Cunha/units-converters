# Technology Stack

**Analysis Date:** 2025-05-02

## Languages

**Primary:**

- TypeScript 6.0.3 - Used throughout the application for type-safe development.

## Runtime

**Environment:**

- Bun - Primary runtime and package manager used for development and scripts.
- Nitro 3.0.260429-beta - Underlying server engine for TanStack Start.

**Package Manager:**

- Bun - Lockfile: `bun.lock` present.

## Frameworks

**Core:**

- React 19.2.5 - Frontend library.
- TanStack Start 1.167.59 - Full-stack React framework (SSR/Streaming).
- TanStack React Router 1.169.1 - Type-safe routing and URL state management.

**Testing:**

- Vitest 4.1.5 - Test runner and assertion library.

**Build/Dev:**

- Vite 8.0.10 - Build tool and development server.
- Tailwind CSS 4.2.4 - Utility-first CSS framework.
- Oxlint 1.62.0 - High-performance JavaScript/TypeScript linter.
- Oxfmt 0.47.0 - High-performance code formatter.

## Key Dependencies

**Critical:**

- `@tanstack/react-query` 5.100.8 - Asynchronous state management and data fetching.
- `zustand` 5.0.12 - Lightweight client-side state management.
- `zod` 4.4.2 - Schema validation for environment variables and search parameters.
- `@t3-oss/env-core` 0.13.11 - Type-safe environment variable management.

**Infrastructure:**

- `lucide-react` 1.14.0 - Icon set.
- `@base-ui/react` 1.4.1 - Unstyled UI components (Base UI).

## Configuration

**Environment:**

- Configured via `src/env.ts` using `@t3-oss/env-core`.
- Uses `VITE_` prefix for client-exposed variables.

**Build:**

- `vite.config.ts` - Main Vite configuration.
- `tsconfig.json` - TypeScript configuration with path aliases (e.g., `#/*` -> `./src/*`).

## Platform Requirements

**Development:**

- Bun runtime installed locally.

**Production:**

- Deployment target supported by Nitro (Node.js, Vercel, Cloudflare, etc.).

---

_Stack analysis: 2025-05-02_
