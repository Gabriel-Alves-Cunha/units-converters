# Architecture Patterns: Unit Converters

**Domain:** Utility Web Application
**Date:** 2024-05-21

## Recommended Architecture

The application should follow a **URL-as-State** pattern, where the browser's address bar acts as the primary source of truth for the conversion.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `UnitConverter` | Main Layout & Logic orchestration. | `ConverterForm`, `ResultDisplay` |
| `ConverterForm` | Inputs for Amount, From, To units. | TanStack Router (Search Params) |
| `ResultDisplay` | Formats and displays the converted value. | `useConverter` hook |
| `CategoryNav` | Switches between Length, Mass, etc. | TanStack Router (Pathname) |

### Data Flow

1. **User Change**: User types in the "Amount" input.
2. **URL Update**: `ConverterForm` calls `navigate({ search: ... })` with `replace: true`.
3. **Route Re-render**: TanStack Router detects search param change, validates with Zod, and re-renders components.
4. **Conversion**: `useConverter` hook reads validated search params and performs math using `convert`.
5. **Display**: `ResultDisplay` renders the formatted result.

## Patterns to Follow

### Pattern 1: Validated Search Params
**What:** Use Zod schemas in the route definition to ensure URL state is always clean.
**When:** Always.
**Example:**
```typescript
const searchSchema = z.object({
  amount: z.coerce.number().catch(1),
  from: z.string().catch('meter'),
  to: z.string().catch('foot'),
})
```

### Pattern 2: Headless Conversion Hook
**What:** Encapsulate the `convert` library logic in a custom hook.
**Example:**
```typescript
function useConversion() {
  const { amount, from, to } = Route.useSearch();
  const result = useMemo(() => {
    try {
      return convert(amount, from).to(to);
    } catch {
      return null;
    }
  }, [amount, from, to]);
  
  return { result };
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Redundant Local State
**What:** Keeping a `useState` for the amount *and* syncing it to the URL.
**Why bad:** Creates two sources of truth; leads to "flicker" or desync issues.
**Instead:** Use the URL state directly as the input value. Use debouncing only if typing performance lags.

## Scalability Considerations

| Concern | At 100 units | At 10K units |
|---------|--------------|--------------|
| **Unit Selection** | Simple dropdown is fine. | Needs searchable combobox/virtualized list. |
| **Logic Size** | `convert` library is tiny. | May need code-splitting for specialized categories (e.g., Engineering). |

## Sources

- [TanStack Router Architecture](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [React Hook Patterns](https://react.dev/learn/reusing-logic-with-custom-hooks)
