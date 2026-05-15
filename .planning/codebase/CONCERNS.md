# Codebase Concerns

**Analysis Date:** 2025-03-03

## Tech Debt

**Monolithic Units Definition:**

- Issue: `src/lib/units.ts` is a massive file (1000+ lines) containing all unit definitions, symbols, and conversion functions.
- Files: `src/lib/units.ts`
- Impact: Poor maintainability and readability. Difficult to add new unit categories without increasing the complexity of this single file.
- Fix approach: Split the `units` object into separate files by category (e.g., `src/lib/units/length.ts`, `src/lib/units/mass.ts`) and re-export them.

**Future-dated Compatibility Date:**

- Issue: `wrangler.jsonc` has a `compatibility_date` set to "2026-05-07".
- Files: `wrangler.jsonc`
- Impact: Potential deployment issues or warnings from Cloudflare Wrangler as it refers to a version of the runtime that does not yet exist.
- Fix approach: Set `compatibility_date` to a current or past date representing the desired runtime version.

## Security Considerations

**Unprotected Feedback Form:**

- Issue: The feedback form sends emails directly from the client-side using `@emailjs/browser` without any rate limiting or spam protection.
- Files: `src/components/feedback-section.tsx`
- Impact: Risk of automated spam or abuse of the EmailJS account (exhausting quotas).
- Current mitigation: Basic check for description length (> 10 characters).
- Recommendations: Implement a CAPTCHA or move the email sending logic to a server-side route (TanStack Start server function) where rate limiting can be applied.

## Test Coverage Gaps

**Total Lack of Automated Tests:**

- What's not tested: Entire conversion logic, UI components, and routing.
- Files: All files under `src/`
- Risk: Regressions in conversion accuracy (critical for this app) or UI breakage could go unnoticed until reported by users.
- Priority: High

## Architectural Bottlenecks

**Units Record Typing:**

- Files: `src/lib/units.ts`
- Why fragile: The types are derived from the massive `units` object using `keyof typeof`. Circular or complex type inferences might slow down the IDE or build process as more units are added.
- Safe modification: Define explicit interfaces/types for unit categories and units before declaring the data.

## Missing Critical Features

**Offline Support:**

- Problem: The application is a utility tool that would benefit greatly from being available offline.
- Blocks: Users cannot perform conversions without an internet connection.
- Recommendations: Implement a Service Worker or use a PWA approach since the conversion logic is entirely client-side.

---

_Concerns audit: 2025-03-03_
