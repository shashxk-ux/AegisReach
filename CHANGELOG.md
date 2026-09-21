# Changelog

All notable changes to the **AegisReach** CISO Threat Intelligence & Automated Outreach platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.6.0] - 2026-09-21

First-time user guide, so new users know what to do and in what order.

### Added
- **Welcome dialog** on the first visit: the six steps at a glance and a note that nothing sends without your approval.
- **Guide button** in the header (with a `visited/6` counter) that opens a **Getting started drawer** with a progress bar, instructions for each step, a "You are here" marker and a button to open each screen. It can restart the walkthrough.
- **Next-step bar** under every screen ("Continue to step N"), with a wrap-up on the last step.
- "Open the getting started guide" in the command palette (`Ctrl/Cmd + K`).
- Progress is saved in the browser.

### Fixed
- After a dialog closed during navigation, keyboard focus went back to the old button instead of the new page heading.
- Welcome dialog now focuses "Start with step 1" without scrolling past its heading on short screens.

---

## [2.5.0] - 2026-09-21

Full interface redesign focused on accessibility (WCAG 2.2 AA), a calmer visual system, and consistent motion. Automated axe-core checks report zero violations across all six screens, the ICP spreadsheet and presets tabs, the dossier drawer, the filters popup and the command palette, in both light and dark themes.

### Added
- **Command palette** (`Ctrl/Cmd + K`): jump to any screen, switch Observer/Autopilot mode or change theme. Built as an ARIA combobox with arrow-key navigation and a live result count.
- **Mobile navigation drawer** with focus trap, replacing the squeezed sidebar on phones. The Observer/Autopilot switch stays visible on every width because it controls whether emails auto-send.
- **ICP filters popup** on the Prospect Pipeline: "Adjust ICP filters" now opens a dialog over the pipeline (filter by industry and perimeter technology, live result count, active-filter badge) instead of navigating away. "Open full ICP Studio" is still one click away.
- **Confirmation step before "Approve & dispatch"**, since sending outreach cannot be undone.
- **Toast countdown bar**: each notification shows a shrinking timer, and hovering or focusing it pauses the countdown.
- **Skip link**, one `h1` per screen, per-screen document titles, and focus moves to the new page heading on navigation.
- **Workflow-ordered navigation**: screens are numbered Step 1 to 6, and every page opens with the same header (step, title, description).
- **Motion** (`motion` v13) with one shared spring vocabulary:
  - Staggered page entrances; sliding highlights for the mode switch, sidebar, ICP tabs and persona list.
  - Springy press and hover on buttons; animated dialogs, drawer and toasts; counting numbers; filling progress bars.
  - Filter chips bloom with a fill and check icon; areas whose text grows or shrinks (forecast panel, form messages, palette results, tables, persona detail, suppression list) ease to their new height.
- New shared UI primitives: `PageHeader`, `Dialog` (native `<dialog>`), `Field`, `Select`, `Textarea`, `ChipGroup`, `AutoHeight`, `FadeSwap`, `Collapse`, `AnimatedNumber`, `Bar`.

### Changed
- **Design system**: neutral zinc surfaces (no navy tint), a single desaturated cyan accent, Geist and Geist Mono type, tinted diffusion shadows in place of glows, and flat tinted badges. Purple is retired as a brand hue.
- **Theming rebuilt on semantic tokens**: removed roughly 700 lines of `!important` light/dark override CSS. Status colors are now `success`, `warning`, `danger`, `brand` and `steel` tokens that adapt per theme, and every text and background pair is contrast-verified (body and muted text at least 7:1, status text at least 4.5:1, form-field borders at least 3:1).
- **Screens rebuilt**: Personas is now a list beside a detail panel; Telemetry has a real proportional funnel; Warmup is a list with a horizontal, divider-separated rotation summary; the ICP Studio has real tabs, reusable chip groups and a sticky forecast rail.
- **Prospect table**: the redundant "Tier-1 cheap pass" column was folded into the contact column, columns have minimum widths so the table scrolls sideways instead of squeezing, and long emails and names truncate with the full value on hover.
- **Dropdowns** use a custom chevron with proper right-hand padding.
- **Layout**: the page now scrolls naturally instead of using a nested scroll container.
- **Toasts** last 10 seconds (was 4.5) and are announced to screen readers through a live region.
- The theme now defaults to the system preference, applied before first paint to avoid a flash.
- Dark mode: layered elevation with clearly visible borders and hover states.

### Fixed
- Dialog styling: a global `dialog` reset overrode Tailwind classes, leaving the drawer full-width with no background and the command palette with no fill.
- Light-theme contrast failures (7 to 14 per screen) caused by hardcoded colors patched with overrides.
- The active navigation item was hard to see in light mode; it is now a raised, bordered card with an accent bar.
- `Badge` rendered a `<div>` inside `<p>` elements (invalid HTML); it is now a `<span>`.
- Unlabeled form controls, invalid definition-list markup in the dossier drawer, and a scroll area that keyboard users could not reach.
- Dialogs could stay open if their exit animation stalled in a background tab; closing no longer depends on the animation finishing.

### Removed
- "XLS Import" and "CSV Importer" from the ICP sourcing adapters, since the Spreadsheet import tab already handles `.xls`, `.xlsx` and `.csv`.
- The `users.drafts.create` API label on the Observer Review screen; it meant nothing to end users.
- Decorative gradients, neon glows and emoji glyphs in the interface.

### Accessibility
- Native `<dialog>` for every overlay (focus trap, Escape to close, inert background, focus return).
- Visible 3px focus ring, minimum 12px text, 44px touch targets on coarse pointers, and status conveyed by text and icons as well as color.
- Support for `prefers-reduced-motion`, `prefers-contrast: more` and Windows forced-colors mode.
- Animations stop after about 5 seconds (WCAG 2.2.2); the toast countdown is exempt because it conveys elapsed time.

### Dependencies
- Added `motion` (^13.4.0).

---

## [2.4.0] - 2026-09-13

### 🎨 Design System & UI Architecture (shadcn/ui + Slate / Cyan)
- **Official shadcn/ui Primitives (`src/components/ui/`)**:
  - `Button` (`button.tsx`): Variants for `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, and custom `cyan` with smooth focus rings.
  - `Card` (`card.tsx`): Compound primitives (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
  - `Badge` (`badge.tsx`): Semantic variants (`default`, `secondary`, `destructive`, `outline`, `cyan`, `emerald`, `amber`, `purple`).
  - `Input` (`input.tsx`): Clean text input with accessible `ring-ring` focus styling.
  - `Table` (`table.tsx`): Fully accessible semantic table subcomponents (`TableHeader`, `TableRow`, `TableCell`, etc.).
  - `ToastContainer` (`ToastContainer.tsx`): Floating card notifications with status indicators.
  - `cn()` helper (`src/lib/utils.ts`): Standard `clsx` and `tailwind-merge` utility.
- **Theme Tokens (`src/index.css`)**:
  - Semantic HSL color variables for Light Mode (Clean Slate) and Dark Mode (Obsidian Cyber).
  - Consistent `--primary` (Cyan 600 / Electric Cyan 500), `--background`, `--card`, `--border`, and `--muted` surfaces.
- **High-Contrast Accessibility Enhancement**:
  - Upgraded all active/selected pills, chips, and buttons on cyan backgrounds to use high-contrast deep black text (`!text-slate-950 font-bold`) with matching black check icons, achieving an **11.5:1 contrast ratio (WCAG AAA compliant)**.
- **Layout Adjustments**:
  - Expanded navigation sidebar width to `w-76 lg:w-80` (304px–320px) with `whitespace-nowrap`, completely resolving label truncation on long titles.

---

### 🚀 Features & Sourcing Pipeline
- **Direct .xls Lead Import & Ingestion (`src/components/icp/IcpStudio.tsx`)**:
  - Added drag-and-drop file dropzone and file selector supporting `.xls`, `.xlsx`, and `.csv`.
  - Added **"⚡ Load Demo .xls (3 CISOs)"** for immediate one-click testing with realistic executive datasets:
    1. *Marcus Vance* (General Dynamics Defense Systems) — PAN-OS GlobalProtect Zero-Day (`CVE-2024-3400`)
    2. *Dr. Priya Patel* (Novartis Healthcare Network) — Citrix NetScaler Bleed Session Hijack (`CVE-2023-4966`)
    3. *Daniel Lindqvist* (Klarna Nordic Payments) — runc Container Breakout (`CVE-2024-21626`)
  - Real-time parsed preview table displaying CISO avatar, organization, inferred tech stack, correlated CISA KEV CVE, and Tier-1 ($0) MX validation pass.
  - Added **"Inject into Prospect Pipeline"** CTA that integrates parsed contacts into `prospects` state via `importProspects()` in `AppContext`, increments pipeline counters, triggers celebratory confetti, and switches view to the Prospect Pipeline.
  - Added `'XLS Import'` channel option to `ProspectTable.tsx` filter dropdown and ICP Sourcing Ingestion channels.

---

### 🏷️ Brand Identity & Navigation Modernization
- **Circular Brand Placeholder (`src/components/layout/Header.tsx`)**:
  - Removed previous square shield logo and gradient border.
  - Replaced with a sleek, minimal **circular placeholder** (`w-9 h-9 rounded-full bg-muted border border-border`) featuring a subtle inner ring.
  - Updated sidebar bottom status badge to a matching circular emblem (`rounded-full`).
- **Brand Typography Correction**:
  - Corrected header title typography from all-caps `AEGISREACH` to standard brand casing: **`AegisReach`** (with Cyan accent).

---

### 🛠️ Code Quality & Performance
- Full TypeScript type safety across all components and mock datasets.
- Production build verified with `npm run build` (`tsc -b && vite build`) passing in ~600ms with 0 errors.
- Code lint verified with `npm run lint` (`oxlint`) passing with 0 critical errors.
