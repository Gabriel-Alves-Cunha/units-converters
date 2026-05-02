# Codebase Concerns

**Analysis Date:** 2026-05-01

## Tech Debt

**Broken URL Search Validation:**
- Issue: In `src/routes/__root.tsx`, the `validateSearch` function attempts to access `organizationId` from `search.data`, but `organizationId` is not defined in `globalSearchSchema`. This will cause runtime `undefined` values and potentially TypeScript errors if strict mode is enabled.
- Files: `src/routes/__root.tsx`
- Impact: Inconsistent URL state handling; search parameters intended for the root route (like `organizationId`) are not properly validated or typed.
- Fix approach: Update `globalSearchSchema` to include `organizationId: z.string().optional()` or remove the legacy validation logic.

**Missing Critical Dependency:**
- Issue: `src/start.ts` imports and uses `clerkMiddleware` from `@clerk/tanstack-react-start/server`, but this package is not listed in `package.json`.
- Files: `src/start.ts`, `package.json`
- Impact: Application will fail to start in production or during a clean `bun install` as the dependency is missing.
- Fix approach: Install `@clerk/tanstack-react-start` and add it to `package.json` dependencies.

**Experimental/Non-existent Package Versions:**
- Issue: `package.json` lists versions that are ahead of current stable releases (e.g., `vite: ^8.0.10`, `typescript: ^6.0.3`, `zod: "^4.4.2"`). 
- Files: `package.json`
- Impact: High risk of instability, missing documentation for features, and potential breaking changes in "future" versions that don't match reality.
- Fix approach: Downgrade dependencies to stable, verified versions (e.g., Vite 6.x, TS 5.x, Zod 3.x).

## Known Bugs

**PrettyBytes Calculation Error:**
- Issue: `prettyBytes(0)` will likely return `"NaN undefined"` because `Math.log(0)` is `-Infinity`, leading to an invalid index for the `UNITS` array and a division by zero in `Math.pow(1024, -Infinity)`.
- Files: `src/lib/utils.ts`
- Trigger: Passing `0` to the `prettyBytes` function.
- Workaround: Add a guard clause for `if (bytes === 0) return "0 bytes"`.

## Security Considerations

**Unvalidated Unit Lookups:**
- Risk: While not yet implemented, if the units converter uses URL parameters to dynamically look up units from a registry without a safe-list or proper validation, it could be vulnerable to prototype pollution or denial of service via memory exhaustion if extremely large strings are processed.
- Files: `src/routes/index.tsx` (planned implementation)
- Current mitigation: None (logic not yet implemented).
- Recommendations: Use Zod to validate unit keys against a fixed set of allowed values in `validateSearch`.

## Performance Bottlenecks

**Complex Unit Conversions:**
- Problem: Large-scale conversions or categories with thousands of derived units might slow down the UI if performed on every keystroke in the main thread.
- Files: `src/lib/utils.ts`
- Cause: JavaScript single-threaded nature.
- Improvement path: Memoize conversion factors or use a Web Worker for complex, non-linear conversion registries.

## Floating Point Precision

**IEEE 754 Rounding Errors:**
- Files: `src/lib/utils.ts`
- Why fragile: Standard JavaScript `number` type is prone to rounding errors (e.g., `0.1 + 0.2 !== 0.3`). For a unit converter, precision is critical.
- Safe modification: Use a library like `decimal.js` or `big.js` for all unit conversion calculations.
- Test coverage: No tests for conversion precision currently exist.

## Test Coverage Gaps

**Unit Conversion Logic:**
- What's not tested: The `prettyBytes` utility and any future conversion logic.
- Files: `src/lib/utils.ts`
- Risk: Incorrect conversion results could lead to user error or lack of trust in the application.
- Priority: High

**URL State Sync:**
- What's not tested: Navigation with search parameters and ensuring the UI stays in sync.
- Files: `src/routes/index.tsx`, `src/routes/__root.tsx`
- Risk: "Back" button might not restore converter state correctly.
- Priority: Medium

---

*Concerns audit: 2026-05-01*
