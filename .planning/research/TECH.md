# Technical Research: Unit Conversion Implementation

**Project:** Unit Converters
**Date:** 2024-05-21
**Confidence:** HIGH

## Conversion Libraries Comparison

### 1. `convert` (Recommended)
Modern, lightweight, and type-safe.
- **Library ID:** `convert` (by Jonah Snider)
- **Pros:** Tiny bundle size (tree-shakeable), zero dependencies, excellent TypeScript support (prevents converting Length to Mass at compile time), supports BigInt.
- **Cons:** Standard floating-point math (subject to precision issues), smaller unit dictionary compared to `convert-units`.
- **Verdict:** Best for modern React/Vite apps where bundle size and DX are priorities.

### 2. `mathjs`
The "Heavy Weight" mathematical engine.
- **Pros:** Built-in BigNumber and Fraction support (solves precision issues), expression parser (e.g., users can type "5ft + 2in"), treats units as first-class citizens.
- **Cons:** Large bundle size (~500KB+ minified), higher complexity API.
- **Verdict:** Use if the app requires complex math, scientific precision, or user-entered expressions.

### 3. `convert-units`
The traditional choice.
- **Pros:** Massive unit dictionary, `toBest()` feature for auto-formatting.
- **Cons:** Maintenance is slow (v3 beta is stagnant), larger bundle, less robust TypeScript support than `convert`.
- **Verdict:** Only use if you need very obscure units or the `toBest()` logic.

---

## State Management: TanStack Router Sync

To achieve "Shareable State" (copy-pasting the URL preserves the conversion), we recommend syncing form state directly to search parameters.

### Pattern: URL-as-State
1. **Schema Validation:** Use Zod with `validateSearch` to ensure `from`, `to`, and `amount` are always valid.
2. **History Management:** Use `replace: true` during keystrokes to avoid polluting history.
3. **Controlled Inputs:** Bind `amount` to the URL. Use a local state + debounced sync if performance becomes an issue (though for a single input, direct sync is usually fine).

**Example:**
```typescript
const searchSchema = z.object({
  amount: z.number().default(1),
  from: z.string().default('m'),
  to: z.string().default('km'),
})

// In component
const { amount, from, to } = Route.useSearch()
const navigate = useNavigate()

const handleAmountChange = (val: number) => {
  navigate({ 
    search: (prev) => ({ ...prev, amount: val }),
    replace: true 
  })
}
```

---

## Precision & Floating Point Issues

JavaScript's `0.1 + 0.2 !== 0.3` issue is prominent in converters.

### Mitigation Strategies:
1. **Formatting (UI Level):** Use `Intl.NumberFormat` with `maximumFractionDigits` to hide infinitesimal errors.
   - *Example:* `1.0000000000000004` becomes `1.0` or `1`.
2. **Arbitrary Precision:** If scientific accuracy is required, use `Big.js` or `Decimal.js` to wrap the math, or use `mathjs` which handles this internally.
3. **Rounding Logic:** Implement a standard rounding utility for the display value.

---

## Recommendation Summary

- **Core Library:** `convert`
- **State Sync:** TanStack Router + Zod
- **Precision:** `Intl.NumberFormat` for UI display; `mathjs` if scientific precision is a "Must Have" feature.
- **Validation:** Zod for URL parameter schema.

## Sources
- [convert docs](https://convert.js.org/)
- [mathjs docs](https://mathjs.org/docs/datatypes/units.html)
- [TanStack Router Search Params Guide](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
