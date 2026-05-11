# Testing Patterns

**Analysis Date:** 2025-05-14

## Test Framework

**Runner:**
- Not detected. No automated unit or integration test runner (like Vitest or Jest) is configured in `package.json`.

**Assertion Library:**
- Not applicable (no test runner detected).

**Run Commands:**
```bash
# No test scripts defined in package.json
```

## Test File Organization

**Location:**
- Not established. No test files (`*.test.ts`, `*.spec.ts`) found in the `src/` directory.

**Naming:**
- Not applicable.

## Test Structure

**Suite Organization:**
- Not applicable.

**Patterns:**
- The codebase relies on **Static Analysis** and **Runtime Validation** rather than automated unit tests.
- **Static Analysis:** Strict TypeScript configuration (`tsconfig.json`) and `oxlint` provide compile-time safety.
- **Runtime Validation:** `valibot` is used to validate route parameters and external data inputs (`src/routes/$lang/convert.$quantity.$from.to.$to.tsx`).

## Mocking

**Framework:** Not applicable.

**Patterns:**
- No mocking patterns established.

## Fixtures and Factories

**Test Data:**
- Not applicable.

## Coverage

**Requirements:** None enforced.

## Test Types

**Unit Tests:**
- Not implemented.

**Integration Tests:**
- Not implemented.

**E2E Tests:**
- **Framework:** Playwright CLI (available via project skills in `.agents/skills/playwright-cli/`).
- **Approach:** The project has access to browser automation tools for manual or scripted end-to-end testing, although no persistent E2E test suite was found in the repository.

## Common Patterns

**Search Param Validation:**
- Uses `valibot` schemas (`globalParamsSchema` in `src/lib/global-params-params.ts`) to ensure URL state is valid at runtime. This acts as a defensive programming layer.

**TypeScript Strictness:**
- The `tsconfig.json` uses highly strict flags (`noUncheckedIndexedAccess: true`, `verbatimModuleSyntax: true`, etc.), which serves as a primary quality assurance mechanism.

**Linting:**
- `oxlint` with multiple plugins ensures adherence to best practices for React, TypeScript, and performance.

---

*Testing analysis: 2025-05-14*
