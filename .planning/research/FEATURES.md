# Feature Landscape: Unit Converters

**Domain:** Utility Web Application
**Date:** 2024-05-21

## Table Stakes

Features users expect in any competent unit converter.

| Feature            | Why Expected                              | Complexity | Notes                             |
| ------------------ | ----------------------------------------- | ---------- | --------------------------------- |
| Common Units       | Length, Mass, Volume, Time are standard.  | Low        | Use `convert` library.            |
| Bidirectional Sync | Changing either input updates the other.  | Low        | Managed via URL state.            |
| URL Persistence    | Copy/paste link preserves the conversion. | Med        | TanStack Router `validateSearch`. |
| Searchable Units   | Quick selection via combobox/search.      | Med        | Shadcn `Combobox` component.      |
| Swap Button        | Quickly invert From/To units.             | Low        | Simple state swap logic.          |

## Differentiators

Features that make this tool superior to a simple search engine snippet.

| Feature             | Value Proposition                      | Complexity | Notes                                        |
| ------------------- | -------------------------------------- | ---------- | -------------------------------------------- |
| Formula Display     | Shows the math: "x \* 3.28 = y"        | Low        | Enhances transparency/trust.                 |
| Scientific Notation | Handles extremely large/small numbers. | Med        | `Intl.NumberFormat` notation.                |
| History / Recent    | Quick access to previous conversions.  | Med        | LocalStorage or Browser History.             |
| Offline Support     | Works without internet (PWA).          | Med        | Vite PWA Plugin.                             |
| Smart Unit Picker   | Suggests "best" unit for the result.   | High       | Logic similar to `convert-units` `toBest()`. |

## Anti-Features

Features to explicitly NOT build to maintain focus.

| Anti-Feature          | Why Avoid                      | What to Do Instead                |
| --------------------- | ------------------------------ | --------------------------------- |
| Currency Conversion   | Requires live APIs and auth.   | Focus on static physical units.   |
| Scientific Calculator | Bloats scope; complex UI.      | Keep focus on 1:1 conversion.     |
| User Accounts         | Not needed for a utility tool. | Use LocalStorage for "Favorites." |

## Feature Dependencies

```
Core Conversion Library → Unit Categories (Length, etc.) → URL Syncing → Scientific Notation
```

## MVP Recommendation

Prioritize:

1. **Core Library Integration**: Length, Mass, Volume.
2. **URL Search Param Sync**: Full "Shareable State" support.
3. **Clean UI**: Responsive input pair with swap button.

Defer: **Smart Unit Picker** and **Offline Support** to post-MVP.

## Sources

- [Google Unit Converter (Benchmark)](https://www.google.com/search?q=unit+converter)
- [ConvertCase (Utility patterns)](https://convertcase.net/)
