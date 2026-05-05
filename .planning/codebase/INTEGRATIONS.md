# External Integrations

**Analysis Date:** 2025-05-02

## APIs & External Services

**Analytics:**

- PostHog - Used for product analytics and feature flags.
  - SDK/Client: `posthog-js`, `@posthog/react`
  - Auth: `VITE_POSTHOG_KEY`
  - Provider: `src/integrations/posthog/provider.tsx`

## Data Storage

**Databases:**

- Not detected (Currently client-side focus).

**File Storage:**

- Local filesystem only.

**Caching:**

- TanStack Query: Used for caching server state and API responses.
  - Configuration: `src/integrations/tanstack-query/root-provider.tsx`
- LocalStorage: Used via Zustand `persist` middleware for persistent client state (e.g., `general-context`).
  - Implementation: `src/contexts/general-ctx/general-context.ts`

## Authentication & Identity

**Auth Provider:**

- Custom / Not detected
  - The codebase currently shows placeholders for `organizationId` in search params (`src/routes/index.tsx`), suggesting future multi-tenant support.

## Monitoring & Observability

**Error Tracking:**

- React Error Boundary: `src/components/default-catch-boundary.tsx`

**Logs:**

- Console-based logging.

## CI/CD & Deployment

**Hosting:**

- Supports Nitro-compatible targets (Vercel, Netlify, Cloudflare, Node.js).

**CI Pipeline:**

- Not detected (No `.github` or similar folders visible in root).

## Environment Configuration

**Required env vars:**

- `VITE_POSTHOG_KEY`: PostHog project key.
- `VITE_POSTHOG_HOST`: PostHog API host (defaults to US).
- `SERVER_URL`: Optional server URL for API communication.

**Secrets location:**

- `.env.local` (present in project root).

## Webhooks & Callbacks

**Incoming:**

- None detected.

**Outgoing:**

- PostHog events.

## Routing & State Integration

**URL for States:**

- TanStack Router is integrated to support URL search parameters as a primary state mechanism.
- Implementation: `src/router.tsx` defines a global router with search param support.
- Usage: `Route.useSearch()` is used in components (e.g., `src/routes/index.tsx`) to reactively read state from the URL.

---

_Integration audit: 2025-05-02_
