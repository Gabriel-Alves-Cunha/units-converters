# Technology Stack

**Project:** Unit Converters
**Date:** 2024-05-21

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | 19.x | UI Library | Project standard, high performance. |
| Vite | 6.x | Build Tool | Fast HMR, excellent dev experience. |
| TanStack Router | 1.x | Routing & State | Best-in-class search param handling for shareable state. |

### Logic & Conversion
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| convert | 2.x | Conversion Engine | Tiny size, type-safe, very fast. |
| Zod | 3.x | Schema Validation | Type-safe URL search param validation. |

### UI & Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Styling | Utility-first, fast styling. |
| Shadcn UI | N/A | UI Components | Accessible, customizable component primitives. |
| Lucide React | Latest | Iconography | Clean, consistent icons. |

### Utilities
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| big.js | 6.x | Precision Math | If `convert` floating point issues are unacceptable for specific units. |
| clsx / tailwind-merge | Latest | Style management | Conditional class joining. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Conversion | `convert` | `mathjs` | `mathjs` is ~250x larger in bundle size; only needed for expressions. |
| Conversion | `convert` | `convert-units` | `convert-units` has poor TS support and is less maintained. |
| Precision | `Intl` rounding | `decimal.js` | `decimal.js` adds bundle weight; simple rounding is often enough for UI. |

## Installation

```bash
# Core conversion
bun add convert zod

# UI Components (via shadcn)
# Assuming shadcn is already initialized
bun x shadcn-ui@latest add input select card button
```

## Sources

- [convert (Jonah Snider)](https://github.com/jonahsnider/convert)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Zod Documentation](https://zod.dev)
