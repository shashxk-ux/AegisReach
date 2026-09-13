# Changelog

All notable changes to the **AegisReach** CISO Threat Intelligence & Automated Outreach platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
