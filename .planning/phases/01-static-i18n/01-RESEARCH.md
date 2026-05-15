# Phase Research: Static i18n (SSG) with TanStack Router, Lingui, and Bun

**Researched:** 2025-05-14
**Domain:** Frontend / i18n / SSG
**Confidence:** HIGH

## Summary

This phase focuses on transitioning the application to a fully static web app (SSG) while maintaining internationalization with URL prefixes (`/en`, `/pt`). We are using **TanStack Start** (as a static site generator), **Lingui** for translations, and **Bun** as the execution environment.

The core challenge is ensuring that all dynamic unit conversion routes (approx. 5,600 combinations) are pre-rendered into static HTML files and that the translation system correctly handles these routes during the build process without "locale leakage" caused by concurrency.

**Primary recommendation:** Use the `prerender` function in TanStack Router's dynamic routes to define all possible unit combinations, and switch Lingui from a global singleton to a per-render instance provided via the Router Context to ensure thread-safe pre-rendering.

## Architectural Responsibility Map

| Capability        | Primary Tier      | Secondary Tier | Rationale                                                                       |
| ----------------- | ----------------- | -------------- | ------------------------------------------------------------------------------- |
| Unit Conversion   | Browser / Client  | —              | Calculations happen instantly on the client using `decimal.js`.                 |
| SSG Pre-rendering | Build Tool (Vite) | —              | Generates static HTML at build time for SEO and performance.                    |
| Locale Detection  | Browser / Client  | —              | Redirects to the appropriate `/$lang` prefix based on browser settings/cookies. |
| Translation       | Browser / Client  | —              | Hydrates the pre-rendered HTML with interactive translated components.          |

## Standard Stack

### Core

| Library               | Version   | Purpose                             | Why Standard                                                                      |
| --------------------- | --------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| @tanstack/react-start | ^1.167.65 | Full-stack framework (used for SSG) | Modern, type-safe, and supports deep SSG/prerendering. [VERIFIED: package.json]   |
| @lingui/react         | ^6.0.1    | i18n framework                      | High performance, macro-based, and works well with Vite. [VERIFIED: package.json] |
| Bun                   | ^1.1.x    | Runtime / Package Manager           | Extremely fast builds and execution environment. [VERIFIED: STACK.md]             |
| decimal.js            | ^10.6.0   | Precision math                      | Essential for scientific-grade unit conversions. [VERIFIED: package.json]         |

### Supporting

| Library                 | Version | Purpose                     | When to Use                                                                          |
| ----------------------- | ------- | --------------------------- | ------------------------------------------------------------------------------------ |
| @lingui/vite-plugin     | ^6.0.1  | Vite integration for Lingui | To compile `.po` files into JS on the fly during dev/build. [VERIFIED: package.json] |
| @cloudflare/vite-plugin | ^1.36.3 | Cloudflare integration      | For deployment to Cloudflare Pages (Static). [VERIFIED: package.json]                |

**Installation:**

```bash
bun install
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── integrations/
│   └── i18n/
│       ├── load-catalog.ts    # Locale loading logic
│       └── i18n-context.ts    # Per-render i18n instance helper
├── routes/
│   ├── $lang/                 # Language prefix segment
│   │   ├── route.tsx          # i18n initialization
│   │   └── convert.$quantity.$from.to.$to.tsx # Dynamic conversion routes
└── router.tsx                 # Router initialization with defaultSsr: false
```

### Pattern 1: Dynamic Prerendering for Unit Routes

To pre-render all possible unit combinations, use the `prerender` function in the route definition.

```typescript
// src/routes/$lang/convert.$quantity.$from.to.$to.tsx
import { createFileRoute } from "@tanstack/react-router";
import { QuantitySchema, units } from "#/lib/units";

export const Route = createFileRoute("/$lang/convert/$quantity/$from/to/$to")({
	prerender: async () => {
		const languages = ["en", "pt"];
		const paths = [];

		for (const lang of languages) {
			for (const quantity of QuantitySchema.options) {
				const availableUnits = Object.keys(units[quantity]);
				for (const from of availableUnits) {
					for (const to of availableUnits) {
						paths.push({ params: { lang, quantity, from, to } });
					}
				}
			}
		}
		return paths;
	},
});
```

### Anti-Patterns to Avoid

- **Global Singleton i18n in SSG:** Using a single `i18n` instance from `@lingui/core` during concurrent pre-rendering will lead to "locale leakage" (e.g., an English page might contain Portuguese text if rendered simultaneously).
- **Manual Path Listing in vite.config.ts:** Avoid listing 5,000+ paths in `vite.config.ts`. Use the `prerender` function within the route files instead for better maintainability.

## Don't Hand-Roll

| Problem                | Don't Build    | Use Instead                   | Why                                                       |
| ---------------------- | -------------- | ----------------------------- | --------------------------------------------------------- |
| Unit Conversions       | Custom math    | `decimal.js`                  | JavaScript numbers have precision errors (e.g., 0.1+0.2). |
| Static Site Generation | Custom scripts | TanStack Start `prerender`    | Handles routing, metadata, and hydration automatically.   |
| URL Language Prefixes  | Custom logic   | TanStack Router `$lang` param | Built-in support for dynamic segments and type-safety.    |

## Common Pitfalls

### Pitfall 1: Locale Leakage during Build

**What goes wrong:** Pre-rendered pages have the wrong language or mixed languages.
**Why it happens:** TanStack Start prerenders multiple pages concurrently in the same Node/Bun process. If using a global Lingui `i18n` singleton, one page's `activate(locale)` call overwrites the locale for all other pages currently rendering.
**How to avoid:** Use `setupI18n()` to create a fresh instance per request/render and pass it through the TanStack Router context. Alternatively, set `prerender.concurrency: 1` in `vite.config.ts` (slower build).

### Pitfall 2: Missing Paths for SSG

**What goes wrong:** Dynamic routes return 404 on the static host.
**Why it happens:** The SSG crawler didn't find the dynamic paths (e.g., `/en/convert/Length/Meter/to/Centimetre`).
**How to avoid:** Ensure `crawlLinks: true` is enabled in `vite.config.ts` AND use the `prerender` function in route files to explicitly define paths that aren't reachable via simple links.

## Code Examples

### Thread-Safe i18n with TanStack Router

```typescript
// src/router.tsx
import { setupI18n } from "@lingui/core";

export function getRouter() {
	return createTanStackRouter({
		context: {
			i18n: null as any, // Will be populated per request
		},
		// ...
	});
}
```

```typescript
// src/routes/$lang/route.tsx
export const Route = createFileRoute("/$lang")({
	beforeLoad: async ({ params }) => {
		const i18n = setupI18n();
		const { messages } = await import(
			`../../locales/${params.lang}/messages.po`
		);
		i18n.load(params.lang, messages);
		i18n.activate(params.lang);

		return { i18n }; // Store in context
	},
});
```

## Environment Availability

| Dependency | Required By     | Available | Version | Fallback |
| ---------- | --------------- | --------- | ------- | -------- |
| Bun        | Build & Runtime | ✓         | 1.1.20  | Node.js  |
| Vite       | Build Tool      | ✓         | 8.0.12  | —        |
| Wrangler   | Deployment      | ✓         | 4.90.0  | —        |

## Security Domain

### Applicable ASVS Categories

| ASVS Category       | Applies | Standard Control                                                              |
| ------------------- | ------- | ----------------------------------------------------------------------------- |
| V5 Input Validation | yes     | `valibot` is used to validate all URL parameters. [VERIFIED: ARCHITECTURE.md] |
| V14 Configuration   | yes     | `wrangler.jsonc` handles deployment security headers.                         |

## Sources

### Primary (HIGH confidence)

- [TanStack Start Docs] - [Prerendering and SSG configuration]
- [LinguiJS Docs] - [SSR/SSG thread safety and per-request instances]
- [Vite Docs] - [SSG build process and dynamic imports]

### Secondary (MEDIUM confidence)

- [Community Blogs] - [Best practices for TanStack Start static export]

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Directly from `package.json` and project docs.
- Architecture: HIGH - Verified via official TanStack Start SSG patterns.
- Pitfalls: HIGH - Common issue in concurrent SSR/SSG environments.

**Research date:** 2025-05-14
**Valid until:** 2025-06-14
