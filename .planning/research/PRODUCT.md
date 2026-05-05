# Product Research: Top-Tier Units Converter

**Vision:** A fast, precise, and accessible units converter optimized for both desktop professionals and mobile "on-the-go" users.

## User Flows

### 1. Basic Conversion (The "Instant" Flow)

1. User lands on home page.
2. User types a number into the "From" input.
3. User selects "From" and "To" units (defaulted to most popular pair, e.g., Meter to Foot).
4. **Result:** Displayed instantly as the user types.

### 2. Category Discovery Flow

1. User clicks the "Categories" icon or search bar.
2. User searches for a niche category (e.g., "Viscosity" or "Force").
3. Tool switches to the category UI with relevant units loaded.
4. **Result:** User converts specialized engineering units without friction.

### 3. Power User Flow (The "Copy-Paste" Flow)

1. User performs a conversion.
2. User clicks a "Copy" icon next to the result.
3. User toggles "History" to see a previously converted value.
4. **Result:** Maximum productivity for document preparation or research.

## Strategic Feature Set

### 1. High-Performance Core

- **Real-time Engine:** Zero-latency updates.
- **Precision Toggle:** Switch between decimal counts (2, 4, 6, etc.).
- **Swap Utility:** One-tap button to flip source and target.

### 2. Search & Discovery

- **Predictive Unit Search:** Combobox that searches across categories (e.g., typing "kg" takes you to Weight).
- **Popular Units:** "Trending" or most-used units featured on the landing state.

### 3. Mobile-First Optimization

- **Numeric Keypad:** Custom `inputmode="decimal"` triggers the number pad.
- **Touch-Friendly Targets:** Min 44px tap areas for all unit selectors.
- **Responsive Stacking:** Vertically stacked inputs on mobile; side-by-side on desktop.

### 4. Accessibility & UI

- **Dark Mode Support:** Auto-detection of system preference.
- **High Contrast:** Clear visual distinction between inputs and labels.
- **Copy-to-Clipboard:** Visual feedback (toast or icon change) on success.

## Category Roadmap

| Priority                 | Categories                                                |
| ------------------------ | --------------------------------------------------------- |
| **Tier 1 (Core)**        | Length, Weight, Temperature, Area, Volume, Time, Speed.   |
| **Tier 2 (Engineering)** | Pressure, Power, Energy, Force, Torque, Density, Storage. |
| **Tier 3 (Scientific)**  | Radiation, Magnetism, Viscosity, Illuminance.             |
| **Tier 4 (Dynamic)**     | Currency (API dependent), Fuel Consumption.               |

## Competitive Analysis Summary (vs. UnitConverters.net)

- **Modern UI:** Replace dated table layouts with a clean, centralized "Conversion Card".
- **Zero Refresh:** Avoid full page reloads for category changes.
- **Mobile Superiority:** Native-feeling touch controls and keyboard optimization.

## Design Reference

_Based on industry standards for top-tier converters:_

- **Layout:** Centered conversion card with large numerical inputs.
- **Color Palette:** Neutral backgrounds with high-contrast accent colors for "Convert/Swap" actions.
- **Typography:** Monospaced numbers for alignment; clean sans-serif for labels.
