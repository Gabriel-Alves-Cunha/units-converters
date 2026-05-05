# Risk Assessment: Units Converter Failure Modes

**Project:** Units Converters
**Focus:** Quality and Reliability
**Date:** 2025-05-22

## 1. Incorrect Conversion Factors

- **Risk:** High. Providing incorrect data destroys user trust immediately.
- **Source of Error:** Manual entry of factors, outdated sources (especially for non-SI units), or misinterpreting regional variations (e.g., US Gallons vs UK Gallons).
- **Mitigation:**
  - **Authoritative Sources:** Use NIST SP 811 as the primary source for all SI and non-SI conversion factors.
  - **Unit Testing:** Implement a robust test suite that verifies standard "known-good" conversions (e.g., 1 inch = 25.4 mm exactly).
  - **Library Usage:** Prefer established libraries like `mathjs` which have pre-validated factor tables, rather than maintaining a custom JSON file.

## 2. Precision Loss (Numerical Stability)

- **Risk:** Medium-High. Subtle errors can be more dangerous than obvious ones.
- **Source of Error:** JavaScript's native 64-bit floats (`Number`). Cumulative error in chained conversions (A -> B -> C -> D).
- **Mitigation:**
  - **Arbitrary Precision:** Use `decimal.js` or `mathjs` BigNumbers for all intermediate calculations.
  - **Base-Unit Architecture:** Always convert `Input -> Base Unit -> Output`. This limits the transformation to at most two steps, minimizing error propagation.
  - **String Pass-through:** Pass numbers as strings to the precision library to avoid the parser converting them to floats first.

## 3. Broken URL State

- **Risk:** Medium. Impacts shareability and UX (refreshing the page).
- **Source of Error:**
  - Encoding complex state in search params.
  - State desync between Zustand and TanStack Router.
  - Invalid characters in unit names/symbols.
- **Mitigation:**
  - **URL as Source of Truth:** Use TanStack Router's `validateSearch` with Zod to ensure the URL always contains a valid state.
  - **Minimalist URL:** Store only IDs/Slugs (e.g., `?from=meter&to=foot&val=10`). Do not store labels or metadata.
  - **Debounced Sync:** Debounce input changes before updating the URL to prevent performance lag and history pollution.

## 4. Performance (Scalability)

- **Risk:** Low-Medium. Only becomes an issue with very large unit sets (e.g., all known historical/scientific units).
- **Source of Error:**
  - Rendering 1000+ items in a Select/Combobox.
  - Re-running expensive math on every keystroke.
- **Mitigation:**
  - **Virtualization:** Use `@tanstack/react-virtual` for the unit selection lists.
  - **Memoization:** Memoize conversion results based on `[input, from, to]`.
  - **Deferred UI:** Use `useDeferredValue` for the filter/search string to keep the input field responsive while the list filters in the background.

## Summary Table

| Failure Mode      | Severity | Probability | Primary Mitigation       |
| ----------------- | -------- | ----------- | ------------------------ |
| Incorrect Factors | Critical | Low         | NIST Source + Unit Tests |
| Precision Loss    | High     | High        | `mathjs` / `decimal.js`  |
| URL State Break   | Medium   | Medium      | Zod + `validateSearch`   |
| UI Performance    | Medium   | Low         | TanStack Virtual         |

## Recommendations

1.  **Adopt `mathjs`:** It solves both "Factor Accuracy" and "Precision Loss" in one package.
2.  **Strict Typing:** Use Zod for all state transitions (URL and Props).
3.  **Gold Standard Tests:** Create a `conversions.test.ts` with 100+ standard conversions from NIST.
