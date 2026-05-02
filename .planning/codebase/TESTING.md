# Testing Patterns

**Analysis Date:** 2025-05-02

## Test Framework

**Runner:**
- Vitest (`^4.1.5`)
- Config: Integrated in `vite.config.ts` (or using default settings as no `vitest.config.ts` exists).

**Assertion Library:**
- Vitest's built-in `expect` (compatible with Jest).

**Run Commands:**
```bash
bun run test           # Run all tests using Vitest
```

## Test File Organization

**Location:**
- Not currently established in the source tree (`src/`). 
- Patterns suggest tests should likely be co-located or placed in a `tests/` directory at the root.

**Naming:**
- Expected pattern: `*.test.ts` or `*.test.tsx`.

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect } from 'vitest';
import { myUtility } from './my-utility';

describe('myUtility', () => {
  it('should perform expected behavior', () => {
    expect(myUtility()).toBe(true);
  });
});
```

**Patterns:**
- No established patterns for React component testing found in the codebase.

## Mocking

**Framework:** Vitest built-in `vi`.

**What to Mock:**
- API calls (PostHog, TanStack Query).
- Browser-specific globals (if testing in Node environment).

## Fixtures and Factories

**Test Data:**
- No established pattern found.

## Coverage

**Requirements:** None enforced.

## Test Types

**Unit Tests:**
- Targeted for utility functions in `src/lib/utils.ts`.

**Integration Tests:**
- Targeted for Zustand stores and TanStack Router context.

**E2E Tests:**
- **Framework:** Playwright CLI (available via `.agents/skills/playwright-cli`).
- **Approach:** Interactive browser automation and snapshot-based testing.

## Common Patterns

**Search Param Validation:**
- Uses `zod` in `src/routes/__root.tsx` to validate and transform search parameters at runtime, acting as a "live" test for URL state.

**Static Analysis:**
- The project relies heavily on strict TypeScript configuration (`tsconfig.json`) to catch quality issues at compile-time.

---

*Testing analysis: 2025-05-02*
