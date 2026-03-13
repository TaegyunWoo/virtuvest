# VirtuVest Design Enhancement

## TL;DR

> **Quick Summary**: Transform VirtuVest's functional but plain MVP UI into a polished, modern Korean stock trading app with gradient aesthetics, rich animations, candlestick charts, skeleton loading, toast notifications, and portfolio visualization.
> 
> **Deliverables**:
> - Enhanced design system (gradient tokens, shadows, animation keyframes)
> - Polished text logo with icon
> - Dark gradient sidebar with colored nav
> - Card hover effects + gradient stat cards
> - Rich animations (page transitions, count-up numbers, table row hovers, button interactions)
> - Skeleton loading UI + empty state components
> - Toast notification system (sonner)
> - Candlestick (일봉) chart replacing line chart (lightweight-charts)
> - Portfolio pie chart (Recharts)
> 
> **Estimated Effort**: Medium-Large
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: Task 1 → Task 3 → Task 7 → Task 11 → Task 12 → Final Verification

---

## Context

### Original Request
"디자인 요소를 추가할 차례야. 필요한 요소를 먼저 물어보고 디자인 요소를 만들어줘."

User wants to enhance the existing MVP UI with polished design elements. After interview, confirmed 8 specific areas of enhancement.

### Interview Summary
**Key Discussions**:
- Logo: Text logo improvement with typography + icon (no image file)
- Color/Visual: Modern gradient style (Toss/KakaoBank feel) — gradient cards, dark sidebar, enhanced shadows
- Animations: Rich level — page transitions, card hovers, number count-up, table row hovers, button ripple
- Loading/Empty: Skeleton UI + empty state illustrations/messages
- Toast: Success/error/warning toast notifications
- Chart: Replace line chart with candlestick (일봉) — Korean color convention (red=up, blue=down)
- Data Viz: Portfolio composition pie chart only
- Nothing else: No onboarding, avatar, dark mode

**Research Findings**:
- lightweight-charts (TradingView) is best for candlestick — ~45KB gzip, Canvas-based, native OHLC support
- CSS-only animations (Tailwind) sufficient — 0KB, GPU-accelerated
- sonner is lightest toast library — ~5KB gzip, zero deps
- Recharts already installed for pie chart
- Current codebase: 8 CSS tokens, 5 UI components, cn() pattern, no animation libs

### Metis Review
**Identified Gaps** (all resolved with defaults):
- Pie chart placement → Default: Above goal card in right column (lg:col-span-1)
- Sidebar gradient colors → Default: Dark navy #1E293B → #0F172A
- Card gradient scope → Default: Stat/summary cards only (not all cards)
- Skeleton strategy → Default: Structural skeleton components, activated via loading state
- Count-up scope → Default: Dashboard KPI cards only
- alert() calls found in 3 pages → Replace with sonner toast
- AuthLayout also has "VirtuVest" text at line 8 → Include in logo update
- Fonts loaded via CDN in index.html (not index.css) → No change needed

---

## Work Objectives

### Core Objective
Transform the plain, functional VirtuVest MVP UI into a polished, modern Korean stock trading application with professional design elements, smooth animations, and proper loading/empty/notification states.

### Concrete Deliverables
- Updated `index.css` with expanded design tokens (gradients, shadows, animations)
- New `Logo.tsx` component used in both layouts
- Restyled `DashboardLayout.tsx` with dark gradient sidebar
- Updated UI components (Card, Button, Table, Input, Badge) with hover effects and enhanced styling
- New `Skeleton.tsx` component with card/table/chart variants
- New `EmptyState.tsx` component with illustrations
- New `CandlestickChart.tsx` component using lightweight-charts
- New `AnimatedNumber.tsx` component for count-up
- New `PageTransition.tsx` wrapper for route animations
- Updated `PortfolioPage.tsx` with pie chart
- Updated `StockDetailPage.tsx` with candlestick chart
- Updated `mockData.ts` with OHLC data generator
- Toast system integrated via sonner in all pages with alert() calls
- `npm run build` passes with zero errors

### Definition of Done
- [ ] `npm run build` succeeds (tsc -b && vite build)
- [ ] All 7 pages render without console errors
- [ ] Candlestick chart displays OHLC data with Korean colors
- [ ] Pie chart shows portfolio composition
- [ ] Toast notifications fire on buy/sell/signup actions
- [ ] Skeleton loading states render properly
- [ ] Empty states display when no data
- [ ] All animations are smooth (no jank)

### Must Have
- Korean stock color convention: red (#EF4444) = 상승/up, blue (#3B82F6) = 하락/down
- Candlestick chart with OHLC data (not line chart)
- Gradient sidebar with dark background
- Toast replaces ALL existing alert() calls
- Skeleton + empty state for data-dependent sections
- Card hover effects on interactive cards
- Page transition animations

### Must NOT Have (Guardrails)
- NO framer-motion or heavy animation libraries (CSS-only)
- NO dark mode toggle/system
- NO onboarding modal or welcome screen
- NO profile avatar/image system
- NO changes to routing structure or page URLs
- NO backend/API integration — mock data only
- NO changes to `template/` directory
- NO new pages or features beyond design enhancement
- NO over-abstraction — keep components simple and direct
- NO excessive JSDoc comments on every function
- NO TypeScript `as any` or `@ts-ignore`

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no vitest/jest in project)
- **Automated tests**: NO (user did not request, MVP phase)
- **Framework**: None
- **Primary verification**: Agent-executed QA scenarios via Playwright (UI) and Bash (build)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Build**: Use Bash — `npm run build` must pass
- **Visual**: Screenshot comparison before/after for design changes

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — tokens, dependencies, data):
├── Task 1: Design system tokens + animation keyframes in index.css [quick]
├── Task 2: Install dependencies (lightweight-charts + sonner) [quick]
├── Task 3: OHLC mock data generator in mockData.ts [quick]

Wave 2 (Core Components — all independent, MAX PARALLEL):
├── Task 4: Logo component (Logo.tsx) [quick]
├── Task 5: Skeleton component (Skeleton.tsx) [quick]
├── Task 6: EmptyState component (EmptyState.tsx) [quick]
├── Task 7: CandlestickChart component (CandlestickChart.tsx) [unspecified-high]
├── Task 8: AnimatedNumber component (AnimatedNumber.tsx) [quick]
├── Task 9: PageTransition wrapper component [quick]
├── Task 10: Toast system setup (Toaster in App.tsx) [quick]

Wave 3 (UI Component Styling — all independent):
├── Task 11: Card component gradient + hover + shadow enhancement [visual-engineering]
├── Task 12: Button ripple effect + enhanced hover [visual-engineering]
├── Task 13: Table row hover + transition enhancement [visual-engineering]
├── Task 14: Input + Badge styling enhancement [quick]

Wave 4 (Page Integration — depends on Waves 1-3):
├── Task 15: DashboardLayout — dark gradient sidebar + logo integration [visual-engineering]
├── Task 16: AuthLayout — logo integration [quick]
├── Task 17: StockDetailPage — candlestick chart + toast [visual-engineering]
├── Task 18: PortfolioPage — pie chart + toast + empty state [visual-engineering]
├── Task 19: DashboardPage — animated numbers + card animations [visual-engineering]
├── Task 20: StocksPage + TransactionsPage — empty states + table animations [visual-engineering]
├── Task 21: SignupPage — toast (replace alert) [quick]

Wave 5 (Polish + Build):
├── Task 22: Page transitions integration (wrap routes) [quick]
├── Task 23: Final build verification + screenshot all pages [unspecified-high]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
├── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 7 → Task 11 → Task 15 → Task 17 → Task 23 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 7 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 4-14, 15-22 | 1 |
| 2 | — | 7, 10, 17, 18 | 1 |
| 3 | — | 7, 17 | 1 |
| 4 | 1 | 15, 16 | 2 |
| 5 | 1 | 17, 18, 19, 20 | 2 |
| 6 | 1 | 18, 20 | 2 |
| 7 | 1, 2, 3 | 17 | 2 |
| 8 | 1 | 19 | 2 |
| 9 | 1 | 22 | 2 |
| 10 | 2 | 17, 18, 21 | 2 |
| 11 | 1 | 15, 17, 18, 19, 20 | 3 |
| 12 | 1 | 15, 17, 18 | 3 |
| 13 | 1 | 17, 18, 20 | 3 |
| 14 | 1 | — | 3 |
| 15 | 4, 11, 12 | 22 | 4 |
| 16 | 4 | — | 4 |
| 17 | 7, 10, 11, 13 | 23 | 4 |
| 18 | 6, 10, 11, 13 | 23 | 4 |
| 19 | 5, 8, 11 | 23 | 4 |
| 20 | 5, 6, 11, 13 | 23 | 4 |
| 21 | 10 | 23 | 4 |
| 22 | 9, 15 | 23 | 5 |
| 23 | 15-22 | F1-F4 | 5 |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 `quick`, T2 `quick`, T3 `quick`
- **Wave 2**: 7 tasks — T4 `quick`, T5 `quick`, T6 `quick`, T7 `unspecified-high`, T8 `quick`, T9 `quick`, T10 `quick`
- **Wave 3**: 4 tasks — T11 `visual-engineering`, T12 `visual-engineering`, T13 `visual-engineering`, T14 `quick`
- **Wave 4**: 7 tasks — T15 `visual-engineering`, T16 `quick`, T17 `visual-engineering`, T18 `visual-engineering`, T19 `visual-engineering`, T20 `visual-engineering`, T21 `quick`
- **Wave 5**: 2 tasks — T22 `quick`, T23 `unspecified-high`
- **FINAL**: 4 tasks — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [x] 1. Design System Token Expansion (index.css)

  **What to do**:
  - Expand the `@theme` block in `index.css` with new tokens:
    - Gradient tokens: `--gradient-sidebar` (dark navy linear-gradient), `--gradient-card-stat` (subtle blue-white gradient)
    - Shadow tokens: `--shadow-card` (soft elevated shadow), `--shadow-card-hover` (stronger hover shadow), `--shadow-lg` (large elevation)
    - Sidebar tokens: `--color-sidebar-bg` (#1E293B), `--color-sidebar-text` (#CBD5E1), `--color-sidebar-active` (primary blue with opacity)
    - Animation tokens: `--duration-fast` (150ms), `--duration-normal` (200ms), `--duration-slow` (300ms)
  - Add `@keyframes` definitions OUTSIDE the `@theme` block (Tailwind v4 requirement):
    - `fadeIn`: opacity 0→1 + translateY(8px→0)
    - `slideIn`: translateX(-100%→0)
    - `countUp`: for number animation
    - `skeleton-pulse`: shimmer effect for skeleton loading
    - `ripple`: button ripple expansion
  - Add animation utility classes:
    - `.animate-fade-in`, `.animate-slide-in`, `.animate-skeleton`

  **Must NOT do**:
  - Do NOT remove or rename existing tokens — only ADD new ones
  - Do NOT change font imports (they are in index.html, not here)
  - Do NOT add framer-motion keyframe values

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file edit with well-defined token additions
  - **Skills**: []
    - No special skills needed for CSS token work

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4-14 (all component + page tasks use these tokens)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `FE/src/index.css:3-15` — Current @theme block with 8 existing CSS variable tokens. New tokens must follow same naming pattern (--color-*, --shadow-*, --gradient-*)
  - `FE/src/index.css:17-22` — @layer base block showing how body uses tokens
  - `FE/src/index.css:24-26` — Existing utility class pattern (.font-mono-num) — follow this pattern for new animation utilities

  **External References**:
  - Tailwind CSS v4 @theme docs: `@keyframes` must be defined at root CSS level, NOT inside `@theme {}` block. Animation token names (e.g., `--animate-fade-in`) go inside `@theme`.

  **WHY Each Reference Matters**:
  - index.css:3-15: Must understand existing token structure to add without conflicts
  - index.css:24-26: Shows how to define utility classes in this project's convention
  - Tailwind v4 docs: Critical — putting @keyframes inside @theme will break the build

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build passes with new tokens
    Tool: Bash
    Preconditions: FE directory, dependencies installed
    Steps:
      1. Run `npm run build` in FE directory
      2. Check exit code is 0
    Expected Result: Build succeeds with zero errors
    Failure Indicators: TypeScript or CSS compilation errors
    Evidence: .sisyphus/evidence/task-1-build-pass.txt

  Scenario: New tokens are valid CSS custom properties
    Tool: Bash
    Preconditions: index.css has been updated
    Steps:
      1. Grep index.css for `--gradient-sidebar` — must exist inside @theme
      2. Grep index.css for `--shadow-card` — must exist inside @theme
      3. Grep index.css for `@keyframes fadeIn` — must exist OUTSIDE @theme
      4. Grep index.css for `.animate-fade-in` — must exist as utility class
    Expected Result: All 4 greps find matches at expected locations
    Failure Indicators: Token missing or @keyframes inside @theme block
    Evidence: .sisyphus/evidence/task-1-tokens-valid.txt
  ```

  **Commit**: YES (groups with T2)
  - Message: `style(tokens): expand design system with gradient, shadow, and animation tokens`
  - Files: `src/index.css`
  - Pre-commit: `npm run build`

- [x] 2. Install New Dependencies (lightweight-charts + sonner)

  **What to do**:
  - Run `npm install lightweight-charts sonner` in the FE directory
  - Verify both packages appear in package.json dependencies
  - Verify `npm run build` still passes after installation

  **Must NOT do**:
  - Do NOT install framer-motion, react-hot-toast, or any other animation/toast library
  - Do NOT modify any source files — only package.json and lock file

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single command execution + verification
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 7 (CandlestickChart), 10 (Toast setup)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `FE/package.json:12-20` — Current dependencies section. lightweight-charts and sonner will be added here.

  **External References**:
  - lightweight-charts npm: `npm install lightweight-charts` — TradingView candlestick library, ~45KB gzip
  - sonner npm: `npm install sonner` — Toast notification library, ~5KB gzip

  **WHY Each Reference Matters**:
  - package.json: Verify no version conflicts with existing React 18 deps

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Dependencies installed successfully
    Tool: Bash
    Preconditions: FE directory
    Steps:
      1. Run `npm install lightweight-charts sonner` in FE/
      2. Run `cat package.json | grep lightweight-charts`
      3. Run `cat package.json | grep sonner`
      4. Run `npm run build`
    Expected Result: Both packages in package.json, build passes
    Failure Indicators: Package not found in package.json, build fails
    Evidence: .sisyphus/evidence/task-2-deps-installed.txt
  ```

  **Commit**: YES (groups with T1)
  - Message: `style(tokens): expand design system with gradient, shadow, and animation tokens`
  - Files: `package.json, package-lock.json`
  - Pre-commit: `npm run build`

- [x] 3. OHLC Candlestick Mock Data Generator

  **What to do**:
  - Add a new `generateOHLCData(basePrice: number)` function in `mockData.ts`
  - Generate ~60 days of OHLC data with realistic price movements:
    - Each day: `{ time: 'YYYY-MM-DD', open: number, high: number, low: number, close: number, volume: number }`
    - `time` format MUST be 'YYYY-MM-DD' string (lightweight-charts requirement)
    - open = previous day's close (first day = basePrice)
    - close = open * (1 + random(-3%, +3%))
    - high = Math.max(open, close) * (1 + random(0, 2%))
    - low = Math.min(open, close) * (1 - random(0, 2%))
    - volume = random realistic volume (100,000 ~ 5,000,000)
    - All prices rounded to nearest 100 (Korean stock convention)
  - Export the type: `export interface OHLCData { time: string; open: number; high: number; low: number; close: number; volume: number; }`
  - Keep existing `generateChartData` function unchanged (other pages may use it)

  **Must NOT do**:
  - Do NOT remove or modify existing `generateChartData` function
  - Do NOT modify existing mock data arrays (mockStocks, mockHoldings, etc.)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single function addition to existing file
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 7 (CandlestickChart uses this data), Task 17 (StockDetailPage)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `FE/src/data/mockData.ts:55-74` — Existing `generateChartData(basePrice)` function. Follow same pattern: export function, take basePrice param, return array of objects. New function generates OHLC instead of single price.
  - `FE/src/data/mockData.ts:16-27` — `mockStocks` array. Each stock has `currentPrice` which will be passed as `basePrice` to the new generator.

  **API/Type References**:
  - lightweight-charts CandlestickData type: `{ time: string | UTCTimestamp, open: number, high: number, low: number, close: number }`

  **WHY Each Reference Matters**:
  - mockData.ts:55-74: Must match the project's existing data generation pattern and export convention
  - mockStocks: Understanding that basePrice comes from stock.currentPrice
  - lightweight-charts type: OHLC data shape must exactly match what CandlestickChart component will consume

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: OHLC generator produces valid data
    Tool: Bash
    Preconditions: mockData.ts updated
    Steps:
      1. Run `npm run build` — must pass
      2. Create a quick test: Run `npx tsx -e "import { generateOHLCData } from './src/data/mockData'; const d = generateOHLCData(70000); console.log(JSON.stringify(d.slice(0,3))); console.log('length:', d.length); console.log('has time:', 'time' in d[0]); console.log('has ohlc:', 'open' in d[0] && 'high' in d[0] && 'low' in d[0] && 'close' in d[0]); console.log('has volume:', 'volume' in d[0]);"` from FE directory
      3. Verify output shows ~60 items, each with time/open/high/low/close/volume
    Expected Result: 60 data points, all fields present, prices realistic (near basePrice)
    Failure Indicators: Missing fields, NaN values, incorrect time format, length != ~60
    Evidence: .sisyphus/evidence/task-3-ohlc-data.txt

  Scenario: Existing generateChartData still works
    Tool: Bash
    Preconditions: mockData.ts updated
    Steps:
      1. Grep mockData.ts for `export function generateChartData` — must still exist
      2. Run `npm run build` — existing pages still compile
    Expected Result: Function exists, build passes
    Failure Indicators: Function removed or renamed
    Evidence: .sisyphus/evidence/task-3-backward-compat.txt
  ```

  **Commit**: YES
  - Message: `feat(data): add OHLC candlestick mock data generator`
  - Files: `src/data/mockData.ts`
  - Pre-commit: `npm run build`

- [x] 4. Logo Component (Logo.tsx)

  **What to do**:
  - Create `FE/src/components/ui/Logo.tsx`
  - Design a polished text logo with a small icon:
    - Use Lucide's `TrendingUp` or `BarChart3` icon next to "VirtuVest" text
    - Icon styled with primary color gradient or accent
    - "Virtu" in regular weight, "Vest" in bold (or similar typographic treatment)
    - Accept `size` prop: `'sm' | 'md' | 'lg'` for different contexts (sidebar vs auth)
    - Accept `collapsed` prop for potential sidebar collapse states
  - Export: `export function Logo({ size = 'md', collapsed = false }: LogoProps)`

  **Must NOT do**:
  - Do NOT create SVG image files or external logo assets
  - Do NOT install any icon library besides Lucide (already installed)
  - Do NOT modify DashboardLayout or AuthLayout yet (that's Task 15/16)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single new component file, straightforward styling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7, 8, 9, 10)
  - **Blocks**: Task 15 (DashboardLayout logo), Task 16 (AuthLayout logo)
  - **Blocked By**: Task 1 (needs design tokens for gradient/colors)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Button.tsx:1-34` — Component pattern to follow: TypeScript interface for props, export function, cn() for class merging, Tailwind utility classes
  - `FE/src/layouts/DashboardLayout.tsx:25` — Current mobile logo: `<h1 className="text-xl font-bold text-[var(--color-primary)]">VirtuVest</h1>` — this is what Logo.tsx will replace
  - `FE/src/layouts/DashboardLayout.tsx:38` — Current desktop logo (same text, text-2xl)

  **External References**:
  - Lucide React icons: `import { TrendingUp, BarChart3 } from 'lucide-react'` — already installed (lucide-react ^0.475.0)

  **WHY Each Reference Matters**:
  - Button.tsx: Shows the project's component authoring pattern (no forwardRef needed for Logo)
  - DashboardLayout lines 25, 38: Shows current logo rendering — Logo component must visually replace these with an improved version

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Logo component renders correctly
    Tool: Bash
    Preconditions: Logo.tsx created
    Steps:
      1. Verify file exists at src/components/ui/Logo.tsx
      2. Grep for `export function Logo` or `export const Logo`
      3. Run `npm run build` — must pass
    Expected Result: Component exports properly, build succeeds
    Failure Indicators: Missing export, TypeScript errors
    Evidence: .sisyphus/evidence/task-4-logo-build.txt

  Scenario: Logo has size variants
    Tool: Bash
    Preconditions: Logo.tsx created
    Steps:
      1. Grep Logo.tsx for `size` prop in interface/type
      2. Grep for `sm`, `md`, `lg` in size mapping
    Expected Result: All 3 size variants defined
    Failure Indicators: Missing size variant
    Evidence: .sisyphus/evidence/task-4-logo-variants.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): create Logo component with icon`
  - Files: `src/components/ui/Logo.tsx`
  - Pre-commit: `npm run build`

- [x] 5. Skeleton Loading Component (Skeleton.tsx)

  **What to do**:
  - Create `FE/src/components/ui/Skeleton.tsx`
  - Base `Skeleton` component: animated shimmer div with configurable width/height
    - Use the `animate-skeleton` class defined in Task 1
    - Background: light gray (#E2E8F0) with shimmer gradient animation
  - Pre-built skeleton variants as named exports:
    - `SkeletonCard`: Mimics a Card with header placeholder + 3 line placeholders
    - `SkeletonTable`: Mimics a Table with header row + 5 data rows of shimmer bars
    - `SkeletonChart`: Mimics a chart area (rectangular shimmer block, 300px height)
    - `SkeletonStatCard`: Mimics a stat card (small title bar + large number bar + small subtitle bar)
  - All variants use the base `Skeleton` component internally
  - Accept `className` prop on all variants for size overrides

  **Must NOT do**:
  - Do NOT create loading state logic — just the visual skeleton components
  - Do NOT modify any existing pages (integration is in Tasks 17-20)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single component file with multiple simple sub-components
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7, 8, 9, 10)
  - **Blocks**: Tasks 17-20 (pages use skeleton variants)
  - **Blocked By**: Task 1 (needs animate-skeleton keyframe)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Card.tsx:1-34` — Follow this multi-export pattern: Card exports Card, CardHeader, CardTitle, CardContent as separate named exports. Skeleton should export Skeleton, SkeletonCard, SkeletonTable, etc.
  - `FE/src/index.css` (after Task 1) — Will contain `@keyframes skeleton-pulse` and `.animate-skeleton` class

  **WHY Each Reference Matters**:
  - Card.tsx: Shows how to structure a component file with multiple related exports in this codebase
  - index.css: The animation keyframe must match what's defined in Task 1

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Skeleton component builds and exports all variants
    Tool: Bash
    Preconditions: Skeleton.tsx created, Task 1 complete
    Steps:
      1. Verify file exists at src/components/ui/Skeleton.tsx
      2. Grep for exports: `SkeletonCard`, `SkeletonTable`, `SkeletonChart`, `SkeletonStatCard`
      3. Run `npm run build`
    Expected Result: All 4 variant exports found, build passes
    Failure Indicators: Missing exports, build errors
    Evidence: .sisyphus/evidence/task-5-skeleton-build.txt
  ```

  **Commit**: YES (groups with T6)
  - Message: `feat(ui): add Skeleton and EmptyState components`
  - Files: `src/components/ui/Skeleton.tsx`
  - Pre-commit: `npm run build`

- [x] 6. EmptyState Component (EmptyState.tsx)

  **What to do**:
  - Create `FE/src/components/ui/EmptyState.tsx`
  - Reusable empty state component with:
    - `icon` prop: Lucide icon component (e.g., `PackageOpen`, `Search`, `BarChart3`)
    - `title` prop: Main message (e.g., "보유 종목이 없습니다")
    - `description` prop: Secondary message (e.g., "종목을 검색하고 매수해보세요")
    - `action` prop (optional): React node for a CTA button
  - Visual design:
    - Centered layout with icon (48px, muted color) above title and description
    - Soft background circle behind icon (light gray or primary-tinted)
    - Text: title in semibold text-lg, description in text-secondary text-sm
    - Padding: py-12 for comfortable vertical spacing
  - Accept `className` prop for container overrides

  **Must NOT do**:
  - Do NOT create actual SVG illustrations — use Lucide icons as visual anchors
  - Do NOT add empty state logic to pages (that's Tasks 18, 20)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single straightforward component
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 7, 8, 9, 10)
  - **Blocks**: Tasks 18, 20 (pages use EmptyState)
  - **Blocked By**: Task 1 (needs design tokens)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Badge.tsx:1-24` — Simple single-export component pattern with props interface and cn() usage
  - `FE/src/pages/StocksPage.tsx` — Search "검색 결과가 없습니다" to find current plain-text empty state that EmptyState will replace
  - `FE/src/pages/PortfolioPage.tsx` — Has inline empty message for holdings
  - `FE/src/pages/TransactionsPage.tsx` — Has inline empty message for transactions

  **WHY Each Reference Matters**:
  - Badge.tsx: Component structure pattern for a simple single-export component
  - StocksPage/PortfolioPage/TransactionsPage: Shows the 3 places where EmptyState will be used — understanding the current inline text helps match the context

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: EmptyState component builds with correct props
    Tool: Bash
    Preconditions: EmptyState.tsx created
    Steps:
      1. Verify file exists at src/components/ui/EmptyState.tsx
      2. Grep for props: `icon`, `title`, `description`, `action`
      3. Run `npm run build`
    Expected Result: All props in interface, build passes
    Failure Indicators: Missing props, TypeScript errors
    Evidence: .sisyphus/evidence/task-6-emptystate-build.txt
  ```

  **Commit**: YES (groups with T5)
  - Message: `feat(ui): add Skeleton and EmptyState components`
  - Files: `src/components/ui/EmptyState.tsx`
  - Pre-commit: `npm run build`

- [x] 7. CandlestickChart Component (lightweight-charts)

  **What to do**:
  - Create `FE/src/components/charts/CandlestickChart.tsx`
  - Wrapper component around TradingView lightweight-charts:
    - Props: `data: OHLCData[]` (from mockData), `height?: number` (default 400), `className?: string`
    - Use `useRef` for chart container div, `useEffect` for chart lifecycle
    - Create chart with `createChart(containerRef.current, options)`:
      - Layout: transparent background, text color from CSS var
      - Grid: subtle gridlines using border color
      - Crosshair mode
      - Time scale: `timeVisible: false` (daily data)
      - Right price scale with localeString formatting
    - Add candlestick series with Korean colors:
      - `upColor: '#EF4444'` (red = 상승, matching --color-danger)
      - `downColor: '#3B82F6'` (blue = 하락, matching --color-primary)
      - `wickUpColor: '#EF4444'`, `wickDownColor: '#3B82F6'`
      - `borderVisible: false`
    - Add volume histogram series:
      - `priceScaleId: ''` (overlay, separate scale)
      - `scaleMargins: { top: 0.8, bottom: 0 }` (bottom 20% of chart)
      - Color each bar red/blue based on candle direction
    - Handle resize with `ResizeObserver` on container
    - Cleanup: `chart.remove()` on unmount
  - Add period selection tabs above chart:
    - Options: 1일, 1주, 1개월, 3개월 (purely visual for MVP — show different slice of data)
    - Active tab styling with primary color underline

  **Must NOT do**:
  - Do NOT use Recharts for candlestick (use lightweight-charts only)
  - Do NOT implement real-time data updates (mock data is static)
  - Do NOT install additional chart libraries

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex component with imperative chart API, lifecycle management, ResizeObserver
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 8, 9, 10)
  - **Blocks**: Task 17 (StockDetailPage integration)
  - **Blocked By**: Tasks 1 (tokens), 2 (lightweight-charts installed), 3 (OHLC data type)

  **References**:

  **Pattern References**:
  - `FE/src/pages/StockDetailPage.tsx:74-105` — Current Recharts chart implementation. CandlestickChart.tsx will replace this. Note the `<ResponsiveContainer width="100%" height="100%">` wrapper pattern and the 300px height container (line 72: `className="h-[300px]"`).
  - `FE/src/data/mockData.ts` (after Task 3) — Will contain `OHLCData` type and `generateOHLCData()` function

  **External References**:
  - lightweight-charts API: `import { createChart, CandlestickSeries, HistogramSeries } from 'lightweight-charts'` — v5+ uses `chart.addSeries(CandlestickSeries, options)` pattern (NOT the deprecated `addCandlestickSeries()`)
  - GitHub examples: PancakeSwap `apps/web/src/views/Info/components/InfoCharts/CandleChart/index.tsx` — Production React + lightweight-charts pattern with useEffect lifecycle, ResizeObserver, and cleanup

  **WHY Each Reference Matters**:
  - StockDetailPage.tsx:74-105: Understanding the current chart container size (300px) and what elements surround it helps size the new candlestick chart correctly
  - mockData.ts: OHLC data shape must match component's expected props
  - lightweight-charts v5 API: CRITICAL — v5 changed the API from `addCandlestickSeries()` to `addSeries(CandlestickSeries, {})`. Must use correct API version.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: CandlestickChart component builds successfully
    Tool: Bash
    Preconditions: Tasks 1, 2, 3 complete
    Steps:
      1. Verify file exists at src/components/charts/CandlestickChart.tsx
      2. Grep for `createChart` — lightweight-charts usage
      3. Grep for `upColor` — Korean color configuration
      4. Grep for `ResizeObserver` — responsive handling
      5. Run `npm run build`
    Expected Result: All patterns found, build passes
    Failure Indicators: Missing chart API usage, build errors, wrong API version
    Evidence: .sisyphus/evidence/task-7-candlestick-build.txt

  Scenario: Chart renders OHLC candles with Korean colors
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, CandlestickChart temporarily mounted on a test page or StockDetailPage
    Steps:
      1. Navigate to stock detail page (e.g., /stocks/005930)
      2. Wait for chart container to render (selector: `canvas` or chart container div)
      3. Take screenshot of chart area
      4. Verify canvas element exists in DOM
    Expected Result: Canvas element present, chart renders (visual check via screenshot)
    Failure Indicators: No canvas element, blank chart area, console errors
    Evidence: .sisyphus/evidence/task-7-candlestick-render.png
  ```

  **Commit**: YES
  - Message: `feat(charts): add CandlestickChart with lightweight-charts`
  - Files: `src/components/charts/CandlestickChart.tsx`
  - Pre-commit: `npm run build`

- [x] 8. AnimatedNumber Component (AnimatedNumber.tsx)

  **What to do**:
  - Create `FE/src/components/ui/AnimatedNumber.tsx`
  - A component that animates a number counting up from 0 to the target value on mount:
    - Props: `value: number`, `duration?: number` (default 800ms), `prefix?: string` (e.g., "₩"), `suffix?: string` (e.g., "%"), `className?: string`
    - Use `useEffect` + `requestAnimationFrame` for smooth counting animation
    - Use easing function (ease-out) so it decelerates as it approaches target
    - Format number with `toLocaleString()` during animation for comma separation
    - Component should only animate ONCE on mount (not on every re-render)
    - Use `useRef` to track if animation has already played
  - Export: `export function AnimatedNumber({ value, duration = 800, prefix = '', suffix = '', className }: AnimatedNumberProps)`

  **Must NOT do**:
  - Do NOT install any animation library (pure requestAnimationFrame)
  - Do NOT animate on every prop change — only on initial mount
  - Do NOT modify any page files (integration in Task 19)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single component with straightforward JS animation logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 7, 9, 10)
  - **Blocks**: Task 19 (DashboardPage uses AnimatedNumber)
  - **Blocked By**: Task 1 (design tokens for styling)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Badge.tsx:1-24` — Simple component pattern: TypeScript props interface, function export, cn() for className merging. AnimatedNumber follows same structure.
  - `FE/src/pages/DashboardPage.tsx:22-24` — Current number display: `<div className="text-2xl font-bold font-mono-num">{formatCurrency(totalAssets)}</div>`. AnimatedNumber will replace these static numbers with count-up animation.

  **External References**:
  - requestAnimationFrame + easing: Standard `requestAnimationFrame` loop with ease-out formula `1 - Math.pow(1 - progress, 3)`. No library needed.

  **WHY Each Reference Matters**:
  - Badge.tsx: Component structure convention for this codebase
  - DashboardPage.tsx:22-24: Shows the exact number elements AnimatedNumber will replace — must produce the same visual output (₩ prefix, comma-separated, 2xl bold mono)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: AnimatedNumber builds and exports correctly
    Tool: Bash
    Preconditions: AnimatedNumber.tsx created
    Steps:
      1. Verify file exists at src/components/ui/AnimatedNumber.tsx
      2. Grep for `export function AnimatedNumber`
      3. Grep for `requestAnimationFrame` — animation mechanism
      4. Grep for `useRef` — mount-once tracking
      5. Run `npm run build`
    Expected Result: All patterns found, build passes
    Failure Indicators: Missing export, no rAF, build errors
    Evidence: .sisyphus/evidence/task-8-animated-number-build.txt

  Scenario: Animation renders with number formatting
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, AnimatedNumber used on DashboardPage (after Task 19) or test mount
    Steps:
      1. Navigate to / (DashboardPage)
      2. Wait for `.font-mono-num` elements to appear
      3. Take screenshot to visually verify number display
    Expected Result: Numbers display formatted with commas and ₩ prefix
    Failure Indicators: Raw unformatted numbers, NaN displayed
    Evidence: .sisyphus/evidence/task-8-animated-number-visual.png
  ```

  **Commit**: YES (groups with T9)
  - Message: `feat(ui): add AnimatedNumber and PageTransition components`
  - Files: `src/components/ui/AnimatedNumber.tsx`
  - Pre-commit: `npm run build`

- [x] 9. PageTransition Wrapper Component (PageTransition.tsx)

  **What to do**:
  - Create `FE/src/components/ui/PageTransition.tsx`
  - A wrapper component that applies CSS fade-in + slide-up animation to its children:
    - Props: `children: React.ReactNode`, `className?: string`
    - On mount, applies the `animate-fade-in` class (defined in Task 1's index.css)
    - Animation: opacity 0→1 + translateY(8px→0) over 300ms
  - Implementation:
    - Wrap children in a `<div>` with the animation class
    - Use `key` prop tied to current route path (from `useLocation()`) to re-trigger animation on route change
    - Export: `export function PageTransition({ children, className }: PageTransitionProps)`
  - This component will be used in Task 22 to wrap `<Outlet />` in layouts

  **Must NOT do**:
  - Do NOT use framer-motion AnimatePresence or any animation library
  - Do NOT modify App.tsx or layout files (integration is Task 22)
  - Do NOT implement exit animations (CSS only supports entry animations cleanly)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Very small wrapper component, ~15 lines
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 7, 8, 10)
  - **Blocks**: Task 22 (wraps Outlet in layouts)
  - **Blocked By**: Task 1 (needs animate-fade-in keyframe)

  **References**:

  **Pattern References**:
  - `FE/src/index.css` (after Task 1) — Will contain `@keyframes fadeIn` and `.animate-fade-in` class. PageTransition applies this class.
  - `FE/src/layouts/DashboardLayout.tsx:86-89` — The `<Outlet />` that PageTransition will wrap: `<div className="flex-1 overflow-auto p-4 md:p-8"><div className="max-w-7xl mx-auto space-y-6"><Outlet /></div></div>`

  **WHY Each Reference Matters**:
  - index.css: Must use the exact class name from Task 1 (.animate-fade-in)
  - DashboardLayout.tsx:86-89: Shows WHERE PageTransition will be integrated — around Outlet

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: PageTransition component builds
    Tool: Bash
    Preconditions: PageTransition.tsx created
    Steps:
      1. Verify file exists at src/components/ui/PageTransition.tsx
      2. Grep for `export function PageTransition`
      3. Grep for `animate-fade-in` — uses the CSS class from Task 1
      4. Run `npm run build`
    Expected Result: Export found, animation class referenced, build passes
    Failure Indicators: Missing export, wrong class name, build errors
    Evidence: .sisyphus/evidence/task-9-page-transition-build.txt
  ```

  **Commit**: YES (groups with T8)
  - Message: `feat(ui): add AnimatedNumber and PageTransition components`
  - Files: `src/components/ui/PageTransition.tsx`
  - Pre-commit: `npm run build`

- [x] 10. Toast System Setup (Sonner in App.tsx)

  **What to do**:
  - Add `<Toaster />` from sonner to `App.tsx`:
    - Import: `import { Toaster } from 'sonner'`
    - Place `<Toaster position="top-right" richColors closeButton />` inside the `<BrowserRouter>`, after `<Routes>`
    - Configuration:
      - `position="top-right"` — top-right corner
      - `richColors` — colorful success/error/warning variants
      - `closeButton` — allow manual dismiss
      - `duration={3000}` — auto-dismiss after 3 seconds
  - This is ONLY the setup. Individual pages will import `toast` from sonner in Tasks 17, 18, 21.

  **Must NOT do**:
  - Do NOT replace any alert() calls yet (that's Tasks 17, 18, 21)
  - Do NOT modify any page files
  - Do NOT install react-hot-toast or any other toast library

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single import + 1 line JSX addition to App.tsx
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 7, 8, 9)
  - **Blocks**: Tasks 17, 18, 21 (pages that use toast())
  - **Blocked By**: Task 2 (sonner must be installed)

  **References**:

  **Pattern References**:
  - `FE/src/App.tsx:1-35` — Full App.tsx content. `<Toaster />` goes inside `<BrowserRouter>`, after the closing `</Routes>` tag (line 30), before `</BrowserRouter>`.

  **External References**:
  - sonner docs: `import { Toaster } from 'sonner'` for the provider, `import { toast } from 'sonner'` for triggering toasts. Toaster accepts `position`, `richColors`, `closeButton`, `duration` props.

  **WHY Each Reference Matters**:
  - App.tsx: Must know exact structure to place Toaster in correct position (inside BrowserRouter but outside Routes)
  - sonner docs: Correct import paths and prop names

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Toaster is rendered in App
    Tool: Bash
    Preconditions: App.tsx updated, sonner installed (Task 2)
    Steps:
      1. Grep App.tsx for `import.*Toaster.*from.*sonner`
      2. Grep App.tsx for `<Toaster` — JSX usage
      3. Run `npm run build`
    Expected Result: Import and JSX found, build passes
    Failure Indicators: Missing import, Toaster not in JSX, build errors
    Evidence: .sisyphus/evidence/task-10-toast-setup.txt

  Scenario: Toast renders in browser
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, Toaster in App.tsx
    Steps:
      1. Navigate to / (any page)
      2. Execute in browser console: `import('sonner').then(m => m.toast.success('Test toast'))`
      3. Wait 1 second
      4. Check for toast element: `[data-sonner-toast]` selector
      5. Take screenshot
    Expected Result: Toast notification visible in top-right corner
    Failure Indicators: No toast element in DOM, console errors
    Evidence: .sisyphus/evidence/task-10-toast-render.png
  ```

  **Commit**: YES
  - Message: `feat(toast): integrate sonner toast system`
  - Files: `src/App.tsx`
  - Pre-commit: `npm run build`

- [x] 11. Card Component Enhancement (Gradient + Hover + Shadow)

  **What to do**:
  - Modify `FE/src/components/ui/Card.tsx` to add:
    - **New variant prop**: Add `variant?: 'default' | 'stat'` to Card
      - `default`: Current styling (no change) + NEW hover effect + enhanced shadow
      - `stat`: Gradient background (`var(--gradient-card-stat)`) for stat/KPI cards
    - **Hover effect** (all cards): `hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200`
    - **Enhanced base shadow**: Replace `shadow-sm` with `shadow-[var(--shadow-card)]`
    - **Keep forwardRef pattern** and all existing sub-components (CardHeader, CardTitle, CardContent) unchanged
  - The variant prop is OPTIONAL (default = 'default') for backward compatibility

  **Must NOT do**:
  - Do NOT change CardHeader, CardTitle, CardContent sub-components
  - Do NOT remove any existing className logic
  - Do NOT apply gradient to ALL cards — only `variant="stat"` gets gradient

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual styling enhancement requiring design sensibility for hover timing/shadow depth
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Provides guidance on hover interaction timing, shadow depth, and visual polish

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)
  - **Blocks**: Tasks 15, 17, 18, 19, 20 (all pages that use Card)
  - **Blocked By**: Task 1 (needs --shadow-card, --shadow-card-hover, --gradient-card-stat tokens)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Card.tsx:1-13` — Current Card component. Line 8 has the className string: `'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm text-[var(--color-text-primary)]'`. This is what gets modified — replace `shadow-sm` with token shadow, add hover/transition, and add variant logic.
  - `FE/src/components/ui/Button.tsx:4-7` — Shows how variant prop is typed with interface: `variant?: 'primary' | 'secondary' | ...`. Card should follow same pattern for adding variant.

  **WHY Each Reference Matters**:
  - Card.tsx:1-13: Exact string to modify — must keep all existing classes and add new ones
  - Button.tsx:4-7: Variant typing convention to follow for consistency

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Card builds with new variant prop
    Tool: Bash
    Preconditions: Card.tsx updated
    Steps:
      1. Grep Card.tsx for `variant` — new prop exists
      2. Grep Card.tsx for `stat` — stat variant handling
      3. Grep Card.tsx for `hover:` — hover effect classes
      4. Grep Card.tsx for `transition` — transition class present
      5. Run `npm run build`
    Expected Result: All patterns found, build passes with zero errors
    Failure Indicators: Missing variant prop, no hover classes, TypeScript error
    Evidence: .sisyphus/evidence/task-11-card-build.txt

  Scenario: Card hover and shadow render
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to / (DashboardPage — has multiple cards)
      2. Screenshot before hover
      3. Hover over first Card element (CSS selector: `.rounded-xl` or first Card container)
      4. Screenshot during hover — should show elevated shadow + slight translateY
    Expected Result: Visual difference between default and hover state (elevated shadow)
    Failure Indicators: No visual change on hover, cards look identical
    Evidence: .sisyphus/evidence/task-11-card-hover.png
  ```

  **Commit**: YES (groups with T12, T13, T14)
  - Message: `style(ui): enhance Card, Button, Table, Input, Badge with gradients and animations`
  - Files: `src/components/ui/Card.tsx`
  - Pre-commit: `npm run build`

- [x] 12. Button Ripple Effect + Enhanced Hover

  **What to do**:
  - Modify `FE/src/components/ui/Button.tsx` to add:
    - **Ripple effect on click**: Add a CSS-based ripple using `::after` pseudo-element or inline `<span>` that expands from click point
      - Implementation: On click, add a temporary `.ripple` span inside button, positioned at click coordinates, animate scale 0→4 with opacity fade
      - Use `onClick` handler wrapper that creates/removes ripple span
      - Ripple color: white with opacity (rgba(255,255,255,0.3)) for colored buttons, primary-tinted for outline/ghost
    - **Enhanced hover**: Add `active:scale-[0.98]` for press feedback (subtle scale-down on click)
    - **Keep all existing variants and sizes unchanged**

  **Must NOT do**:
  - Do NOT change any existing variant colors or sizes
  - Do NOT use framer-motion for ripple — CSS animation + JS event only
  - Do NOT break the forwardRef pattern

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Interactive animation requiring CSS + JS coordination for ripple effect
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on ripple timing, scale, and color opacity for professional feel

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)
  - **Blocks**: Tasks 15, 17, 18 (pages with prominent buttons)
  - **Blocked By**: Task 1 (needs @keyframes ripple)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Button.tsx:1-34` — Full current Button component. The `className={cn(...)}` on line 14-28 is where hover/active classes go. The `forwardRef` wrapper on line 9 and `...props` spread on line 29 must be preserved.
  - `FE/src/index.css` (after Task 1) — Will contain `@keyframes ripple` for the expansion animation

  **External References**:
  - CSS ripple pattern: Create `<span>` at `e.clientX/Y` relative to button bounds, animate `transform: scale(0)` → `scale(4)` with `opacity: 0.3` → `0` over 600ms, remove span after animation ends.

  **WHY Each Reference Matters**:
  - Button.tsx:1-34: Must modify without breaking existing variant/size logic
  - index.css ripple keyframe: Animation must match the defined keyframe

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Button builds with ripple and press feedback
    Tool: Bash
    Preconditions: Button.tsx updated
    Steps:
      1. Grep Button.tsx for `ripple` — ripple implementation
      2. Grep Button.tsx for `active:scale` — press feedback
      3. Grep Button.tsx for `overflow-hidden` or `relative` — needed for ripple containment
      4. Run `npm run build`
    Expected Result: All patterns found, build passes
    Failure Indicators: Missing ripple logic, build errors
    Evidence: .sisyphus/evidence/task-12-button-build.txt

  Scenario: Ripple effect visible on click
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /login (has prominent "로그인" button)
      2. Click the login button: `button:has-text("로그인")`
      3. Take rapid screenshot during click (or record brief)
    Expected Result: Momentary ripple animation visible on button
    Failure Indicators: No visual feedback on click, console errors
    Evidence: .sisyphus/evidence/task-12-button-ripple.png
  ```

  **Commit**: YES (groups with T11, T13, T14)
  - Message: `style(ui): enhance Card, Button, Table, Input, Badge with gradients and animations`
  - Files: `src/components/ui/Button.tsx`
  - Pre-commit: `npm run build`

- [x] 13. Table Row Hover + Transition Enhancement

  **What to do**:
  - Modify `FE/src/components/ui/Table.tsx` to enhance:
    - **TableRow**: Upgrade existing `hover:bg-slate-50` to a smoother transition:
      - Add `transition-all duration-150 ease-in-out` (currently only has `transition-colors`)
      - Change hover to `hover:bg-blue-50/50` (subtle blue tint instead of plain gray)
      - Add `hover:shadow-sm` for slight elevation on hover
    - **TableHead**: Add subtle bottom border styling with slightly bolder text
    - **TableCell**: No changes needed
    - **Keep all existing exports and forwardRef patterns**

  **Must NOT do**:
  - Do NOT change Table, TableHeader, TableBody, TableHead, TableCell structure
  - Do NOT add click handlers or interactive behavior (just visual)
  - Do NOT break the multi-export pattern

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual styling enhancement on table interactions
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on table row hover timing and visual subtlety

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)
  - **Blocks**: Tasks 17, 18, 20 (pages with tables)
  - **Blocked By**: Task 1 (design tokens)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Table.tsx:27-36` — Current TableRow: `className={cn('border-b border-[var(--color-border)] transition-colors hover:bg-slate-50', className)}`. This is the exact string to modify — replace `transition-colors` with `transition-all duration-150`, upgrade `hover:bg-slate-50` to `hover:bg-blue-50/50 hover:shadow-sm`.

  **WHY Each Reference Matters**:
  - Table.tsx:27-36: Exact line and className string to modify for TableRow hover enhancement

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Table builds with enhanced hover
    Tool: Bash
    Preconditions: Table.tsx updated
    Steps:
      1. Grep Table.tsx for `transition-all` — upgraded from transition-colors
      2. Grep Table.tsx for `duration-150` or `duration-200` — explicit timing
      3. Grep Table.tsx for `hover:bg-blue` or `hover:bg-` — enhanced hover color
      4. Run `npm run build`
    Expected Result: All patterns found, build passes
    Failure Indicators: Still using old transition-colors, build errors
    Evidence: .sisyphus/evidence/task-13-table-build.txt

  Scenario: Table row hover effect visible
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to / (DashboardPage has holdings table)
      2. Hover over first table data row: `tbody tr:first-child`
      3. Take screenshot showing hover highlight
    Expected Result: Row has blue-tinted hover background, slight shadow
    Failure Indicators: No hover color change, plain gray hover
    Evidence: .sisyphus/evidence/task-13-table-hover.png
  ```

  **Commit**: YES (groups with T11, T12, T14)
  - Message: `style(ui): enhance Card, Button, Table, Input, Badge with gradients and animations`
  - Files: `src/components/ui/Table.tsx`
  - Pre-commit: `npm run build`

- [x] 14. Input Focus Enhancement + Badge Polish

  **What to do**:
  - Modify `FE/src/components/ui/Input.tsx`:
    - Add smooth focus transition: `transition-all duration-200`
    - Enhanced focus ring: Add `focus-visible:border-[var(--color-primary)]` with blue border (in addition to existing ring)
    - Add subtle shadow on focus: `focus-visible:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]` (blue glow)
  - Modify `FE/src/components/ui/Badge.tsx`:
    - Add `transition-colors duration-150` for smooth variant transitions
    - Add subtle `shadow-sm` to non-outline variants for depth
    - Optionally add very subtle border to success/danger variants for definition

  **Must NOT do**:
  - Do NOT change Input's functional behavior (type, value, onChange)
  - Do NOT change Badge variant colors
  - Do NOT break forwardRef on Input or function export on Badge

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small CSS-only changes to 2 existing files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)
  - **Blocks**: None (Input/Badge are already used everywhere; styling auto-applies)
  - **Blocked By**: Task 1 (design tokens)

  **References**:

  **Pattern References**:
  - `FE/src/components/ui/Input.tsx:11-13` — Current Input className: `'flex h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50'`. Add `transition-all duration-200` and enhanced focus shadow.
  - `FE/src/components/ui/Badge.tsx:12` — Current Badge className: `'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors...'`. Already has `transition-colors`; add shadow to non-outline variants.

  **WHY Each Reference Matters**:
  - Input.tsx:11-13: Exact className to extend with transition and focus shadow
  - Badge.tsx:12: Exact className to extend with shadow

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Input and Badge build with enhancements
    Tool: Bash
    Preconditions: Both files updated
    Steps:
      1. Grep Input.tsx for `transition-all` — smooth focus transition
      2. Grep Input.tsx for `shadow` — focus shadow glow
      3. Grep Badge.tsx for `shadow` — depth shadow on non-outline
      4. Run `npm run build`
    Expected Result: All patterns found, build passes
    Failure Indicators: Missing transition classes, build errors
    Evidence: .sisyphus/evidence/task-14-input-badge-build.txt

  Scenario: Input focus glow visible
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /login (has email + password inputs)
      2. Click on email input: `#email`
      3. Take screenshot showing focus state with blue glow
    Expected Result: Input has visible blue glow/shadow on focus, smooth transition
    Failure Indicators: No visual focus difference, jarring focus change
    Evidence: .sisyphus/evidence/task-14-input-focus.png
  ```

  **Commit**: YES (groups with T11, T12, T13)
  - Message: `style(ui): enhance Card, Button, Table, Input, Badge with gradients and animations`
  - Files: `src/components/ui/Input.tsx, src/components/ui/Badge.tsx`
  - Pre-commit: `npm run build`

- [x] 15. DashboardLayout — Dark Gradient Sidebar + Logo Integration

  **What to do**:
  - Modify `FE/src/layouts/DashboardLayout.tsx` to:
    - **Dark gradient sidebar**: Replace `bg-[var(--color-surface)] border-r border-[var(--color-border)]` (line 33) with `bg-gradient-to-b from-[#1E293B] to-[#0F172A]` and remove the border-r (dark sidebar doesn't need a visible border)
    - **Logo integration**: Replace both "VirtuVest" `<h1>` elements (lines 25 and 38) with `<Logo>` component:
      - Mobile header (line 25): `<Logo size="sm" />`
      - Desktop sidebar (line 38): `<Logo size="md" />`
    - **Nav text colors**: Update NavLink styling for dark sidebar:
      - Inactive: Change `text-[var(--color-text-secondary)] hover:bg-slate-100` to `text-slate-400 hover:bg-white/10 hover:text-white`
      - Active: Change `bg-[var(--color-primary)] text-white` to `bg-white/15 text-white` (or keep primary bg but with transparency)
    - **Add import**: `import { Logo } from '@/components/ui/Logo'`
    - **Remove border-r** from sidebar container — dark gradient to light content creates natural boundary

  **Must NOT do**:
  - Do NOT change the layout structure (sidebar width, mobile breakpoint behavior, overlay logic)
  - Do NOT change routing or navigation links
  - Do NOT modify the mobile hamburger/close button behavior
  - Do NOT change the content area (right side) styling

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual styling of layout with dark-to-light contrast, nav hover states, gradient tuning
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on dark sidebar contrast ratios, nav active/hover states, gradient direction

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16-21)
  - **Blocks**: Task 22 (PageTransition wraps Outlet in this layout)
  - **Blocked By**: Tasks 4 (Logo component), 11 (Card hover — used indirectly via pages), 12 (Button — used in sidebar)

  **References**:

  **Pattern References**:
  - `FE/src/layouts/DashboardLayout.tsx:25` — Mobile logo: `<h1 className="text-xl font-bold text-[var(--color-primary)]">VirtuVest</h1>` → Replace with `<Logo size="sm" />`
  - `FE/src/layouts/DashboardLayout.tsx:33` — Sidebar background: `bg-[var(--color-surface)] border-r border-[var(--color-border)]` → Replace with `bg-gradient-to-b from-[#1E293B] to-[#0F172A]`
  - `FE/src/layouts/DashboardLayout.tsx:38` — Desktop logo: `<h1 className="text-2xl font-bold text-[var(--color-primary)]">VirtuVest</h1>` → Replace with `<Logo size="md" />`
  - `FE/src/layouts/DashboardLayout.tsx:43-58` — NavLink styling block. Active: `bg-[var(--color-primary)] text-white`. Inactive: `text-[var(--color-text-secondary)] hover:bg-slate-100`. Both need updating for dark sidebar.
  - `FE/src/components/ui/Logo.tsx` (from Task 4) — Logo component with size prop ('sm' | 'md' | 'lg')

  **WHY Each Reference Matters**:
  - Line 25, 38: Exact elements to replace with Logo component — sizes must match context (sm for mobile header, md for desktop sidebar)
  - Line 33: Exact className to replace for sidebar gradient — must remove border-r
  - Lines 43-58: NavLink conditional styling — must update BOTH active and inactive states for dark background readability
  - Logo.tsx: Must use correct import path and prop API

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: DashboardLayout builds with dark sidebar and logo
    Tool: Bash
    Preconditions: DashboardLayout.tsx updated, Tasks 4, 11, 12 complete
    Steps:
      1. Grep DashboardLayout.tsx for `import.*Logo.*from` — Logo imported
      2. Grep DashboardLayout.tsx for `from-\[#1E293B\]` — dark gradient applied
      3. Grep DashboardLayout.tsx for `<Logo` — Logo component used (should appear twice: sm + md)
      4. Verify NO remaining `>VirtuVest<` text in the file
      5. Run `npm run build`
    Expected Result: Logo imported and used twice, gradient applied, no raw "VirtuVest" text, build passes
    Failure Indicators: Missing Logo import, old text logo remains, build errors
    Evidence: .sisyphus/evidence/task-15-layout-build.txt

  Scenario: Dark sidebar renders with correct contrast
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, desktop viewport (≥1024px)
    Steps:
      1. Navigate to / (DashboardPage)
      2. Wait for sidebar to be visible: `aside` or sidebar container
      3. Take full-page screenshot showing dark sidebar with light content area
      4. Verify logo element is visible in sidebar: check for Logo component text
      5. Hover over a nav link — should show white/light highlight on dark background
    Expected Result: Sidebar is dark navy gradient, nav links are light colored, logo renders, hover shows white-tinted highlight
    Failure Indicators: White/light sidebar, unreadable nav text, missing logo
    Evidence: .sisyphus/evidence/task-15-dark-sidebar.png
  ```

  **Commit**: YES (groups with T16)
  - Message: `style(layout): dark gradient sidebar and logo integration`
  - Files: `src/layouts/DashboardLayout.tsx`
  - Pre-commit: `npm run build`

- [x] 16. AuthLayout — Logo Integration

  **What to do**:
  - Modify `FE/src/layouts/AuthLayout.tsx` to:
    - **Replace logo text** (line 8): Replace `<h1 className="text-3xl font-bold text-[var(--color-primary)]">VirtuVest</h1>` with `<Logo size="lg" />`
    - **Add import**: `import { Logo } from '@/components/ui/Logo'`
    - The auth layout is a centered card on a light background — Logo should be the prominent branding element above the auth form card

  **Must NOT do**:
  - Do NOT change the layout structure (centered card, gradient background, etc.)
  - Do NOT add additional branding elements beyond the Logo component

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single import + single line replacement, very small change
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15, 17-21)
  - **Blocks**: None
  - **Blocked By**: Task 4 (Logo component must exist)

  **References**:

  **Pattern References**:
  - `FE/src/layouts/AuthLayout.tsx:8` — Current logo: `<h1 className="text-3xl font-bold text-[var(--color-primary)]">VirtuVest</h1>` → Replace with `<Logo size="lg" />`
  - `FE/src/components/ui/Logo.tsx` (from Task 4) — Logo component with size="lg" for prominent auth display

  **WHY Each Reference Matters**:
  - AuthLayout.tsx:8: Exact element to replace — Logo size="lg" matches the prominent text-3xl branding
  - Logo.tsx: Must use correct size prop for auth context

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: AuthLayout builds with Logo component
    Tool: Bash
    Preconditions: AuthLayout.tsx updated, Task 4 complete
    Steps:
      1. Grep AuthLayout.tsx for `import.*Logo.*from` — Logo imported
      2. Grep AuthLayout.tsx for `<Logo` — Logo component used
      3. Verify NO remaining `>VirtuVest<` text in the file
      4. Run `npm run build`
    Expected Result: Logo imported and rendered, no raw text logo, build passes
    Failure Indicators: Missing import, old text remains, build errors
    Evidence: .sisyphus/evidence/task-16-auth-layout-build.txt

  Scenario: Logo renders on login page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /login
      2. Take screenshot of the page
      3. Verify Logo is visible above the login form card
    Expected Result: Polished Logo component visible, centered above form
    Failure Indicators: Missing logo, raw text "VirtuVest" still showing
    Evidence: .sisyphus/evidence/task-16-auth-logo.png
  ```

  **Commit**: YES (groups with T15)
  - Message: `style(layout): dark gradient sidebar and logo integration`
  - Files: `src/layouts/AuthLayout.tsx`
  - Pre-commit: `npm run build`

- [x] 17. StockDetailPage — Candlestick Chart + Toast Notifications

  **What to do**:
  - Modify `FE/src/pages/StockDetailPage.tsx` to:
    - **Replace line chart with candlestick**:
      - Remove Recharts imports (LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer — lines 1-3)
      - Remove `generateChartData` import (line 8) → Replace with `generateOHLCData` from mockData
      - Replace the entire Recharts chart block (lines 73-106) with `<CandlestickChart data={ohlcData} height={400} />`
      - Create `const ohlcData = generateOHLCData(stock.currentPrice)` near the top of the component (replacing `chartData`)
      - Add import: `import { CandlestickChart } from '@/components/charts/CandlestickChart'`
    - **Replace alert() calls with toast**:
      - Line 37: `alert('매수 주문이 실행되었습니다.')` → `toast.success('매수 주문이 실행되었습니다.')`
      - Line 41: `alert('매도 주문이 실행되었습니다.')` → `toast.success('매도 주문이 실행되었습니다.')`
      - Line 44: `alert('보유하지 않은 종목은 매도할 수 없습니다.')` → `toast.error('보유하지 않은 종목은 매도할 수 없습니다.')`
      - Add import: `import { toast } from 'sonner'`
    - **Add skeleton loading**: Wrap chart area with a loading state check — if data not ready, show `<SkeletonChart />`. Since mock data is instant, add a brief `useState` + `useEffect` with 500ms setTimeout to demonstrate skeleton.
      - Add import: `import { SkeletonChart } from '@/components/ui/Skeleton'`

  **Must NOT do**:
  - Do NOT change the page structure/layout (stock info header, order panel, etc.)
  - Do NOT modify the order form logic (just the alert → toast swap)
  - Do NOT keep any Recharts chart code — fully replace with CandlestickChart
  - Do NOT change URL routing or params handling

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex page refactor involving chart swap, toast integration, and skeleton loading
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on chart container sizing, skeleton-to-content transition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15, 16, 18-21)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Tasks 7 (CandlestickChart), 10 (Toast setup/Toaster in App), 11 (Card enhancement), 13 (Table enhancement)

  **References**:

  **Pattern References**:
  - `FE/src/pages/StockDetailPage.tsx:1-3` — Current Recharts imports to REMOVE: `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'`
  - `FE/src/pages/StockDetailPage.tsx:8` — Current data import: `import { mockStocks, mockHoldings, generateChartData } from '@/data/mockData'` → change `generateChartData` to `generateOHLCData`
  - `FE/src/pages/StockDetailPage.tsx:37` — First alert: `alert('매수 주문이 실행되었습니다.')` → `toast.success('매수 주문이 실행되었습니다.')`
  - `FE/src/pages/StockDetailPage.tsx:41` — Second alert: `alert('매도 주문이 실행되었습니다.')` → `toast.success('매도 주문이 실행되었습니다.')`
  - `FE/src/pages/StockDetailPage.tsx:44` — Third alert: `alert('보유하지 않은 종목은 매도할 수 없습니다.')` → `toast.error('보유하지 않은 종목은 매도할 수 없습니다.')`
  - `FE/src/pages/StockDetailPage.tsx:73-106` — Entire Recharts chart block to REMOVE and replace with `<CandlestickChart data={ohlcData} height={400} />`
  - `FE/src/components/charts/CandlestickChart.tsx` (from Task 7) — CandlestickChart component with `data` and `height` props
  - `FE/src/components/ui/Skeleton.tsx` (from Task 5) — `SkeletonChart` export for loading state

  **WHY Each Reference Matters**:
  - Lines 1-3, 8: Imports to replace — remove Recharts, add CandlestickChart + toast + generateOHLCData
  - Lines 37, 41, 44: Exact alert() locations — each must become the correct toast type (success for orders, error for invalid)
  - Lines 73-106: Chart block boundary — entire block replaced with single CandlestickChart element
  - CandlestickChart.tsx, Skeleton.tsx: Component APIs to use correctly

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: StockDetailPage builds with candlestick and toast
    Tool: Bash
    Preconditions: StockDetailPage.tsx updated, Tasks 7, 10 complete
    Steps:
      1. Grep StockDetailPage.tsx for `import.*CandlestickChart` — chart imported
      2. Grep StockDetailPage.tsx for `import.*toast.*from.*sonner` — toast imported
      3. Grep StockDetailPage.tsx for `generateOHLCData` — new data generator used
      4. Verify NO `recharts` imports remain: grep for `from.*recharts` should return 0 matches
      5. Verify NO `alert(` calls remain: grep for `alert(` should return 0 matches
      6. Run `npm run build`
    Expected Result: CandlestickChart + toast imported, no Recharts or alert() remains, build passes
    Failure Indicators: Recharts imports still present, alert() not replaced, build errors
    Evidence: .sisyphus/evidence/task-17-stock-detail-build.txt

  Scenario: Candlestick chart renders with Korean colors
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /stocks/005930 (Samsung Electronics)
      2. Wait for chart to load (canvas element should appear after skeleton)
      3. Take screenshot of chart area — should show OHLC candles
      4. Verify canvas element exists: `canvas` selector within the chart container
    Expected Result: Candlestick chart visible with colored candles (red up, blue down), volume bars at bottom
    Failure Indicators: Blank chart, old line chart still showing, no canvas element
    Evidence: .sisyphus/evidence/task-17-candlestick-render.png

  Scenario: Toast fires on buy/sell actions
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, on /stocks/005930
    Steps:
      1. Find buy button: `button:has-text("매수")`
      2. Click buy button
      3. Wait 500ms for toast to appear
      4. Check for toast element: `[data-sonner-toast]` selector
      5. Take screenshot showing toast notification
    Expected Result: Success toast appears in top-right with "매수 주문이 실행되었습니다." message
    Failure Indicators: alert() popup instead of toast, no notification, console errors
    Evidence: .sisyphus/evidence/task-17-toast-buy.png
  ```

  **Commit**: YES
  - Message: `feat(stock-detail): replace line chart with candlestick + toast`
  - Files: `src/pages/StockDetailPage.tsx`
  - Pre-commit: `npm run build`

- [x] 18. PortfolioPage — Pie Chart + Toast + Empty State + Gradient Cards

  **What to do**:
  - Modify `FE/src/pages/PortfolioPage.tsx` to:
    - **Add portfolio pie chart**:
      - Import Recharts: `import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'`
      - Create pie data from `mockHoldings`: `{ name: stock.name, value: holding.totalValue, color: string }` per holding
      - Define a color palette array: `['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']`
      - Place the PieChart in the right column (line 119, `lg:col-span-1`), ABOVE the existing goal card:
        - Wrap in Card with `variant="stat"` and CardHeader "포트폴리오 구성"
        - `<ResponsiveContainer width="100%" height={250}>`
        - `<PieChart>` with `<Pie dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>` (donut style)
        - Add `<Cell>` for each entry with color from palette
        - Add `<Tooltip formatter={...} />` showing ₩ formatted value
        - Add `<Legend />` below chart showing stock names with colored dots
    - **Replace alert() with toast**:
      - Line 18: `alert('투자 목표가 설정되었습니다.')` → `toast.success('투자 목표가 설정되었습니다.')`
      - Add import: `import { toast } from 'sonner'`
    - **Replace inline empty state** (lines 106-112):
      - Replace the plain text "보유 종목이 없습니다" with `<EmptyState icon={PackageOpen} title="보유 종목이 없습니다" description="종목을 검색하고 매수해보세요" />`
      - Add imports: `import { EmptyState } from '@/components/ui/EmptyState'` and `import { PackageOpen } from 'lucide-react'`
    - **Apply gradient to stat cards** (lines 27-64):
      - Add `variant="stat"` to all 4 stat cards (총 평가금액, 총 투자금액, 총 수익/손실, 총 수익률)
    - **Add skeleton loading** for chart area: Show `SkeletonChart` briefly on mount (similar to Task 17 pattern — 500ms setTimeout)
      - Import: `import { SkeletonChart } from '@/components/ui/Skeleton'`

  **Must NOT do**:
  - Do NOT change the 2-column layout structure (lg:grid-cols-3 split)
  - Do NOT modify the goal setting form logic (just alert → toast)
  - Do NOT add real data fetching — mock data only
  - Do NOT move holdings table to a different position

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex page with pie chart integration, gradient cards, empty state, toast — multiple visual concerns
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on pie chart sizing within card, donut vs filled, legend placement

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15-17, 19-21)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Tasks 6 (EmptyState), 10 (Toast/Toaster), 11 (Card variant="stat"), 13 (Table hover)

  **References**:

  **Pattern References**:
  - `FE/src/pages/PortfolioPage.tsx:18` — Alert to replace: `alert('투자 목표가 설정되었습니다.')` → `toast.success(...)`
  - `FE/src/pages/PortfolioPage.tsx:27-64` — 4 stat cards: each `<Card>` needs `variant="stat"` prop added
  - `FE/src/pages/PortfolioPage.tsx:106-112` — Inline empty state: `<div className="text-center...">보유 종목이 없습니다</div>` → Replace with `<EmptyState>` component
  - `FE/src/pages/PortfolioPage.tsx:119` — Right column `<div className="lg:col-span-1">` — pie chart Card goes here, BEFORE the existing goal card children

  **External References**:
  - Recharts PieChart: `<PieChart><Pie data={data} dataKey="value" nameKey="name"><Cell key={i} fill={colors[i]} /></Pie></PieChart>` — Standard donut pattern with `innerRadius` > 0
  - Recharts already installed in package.json — no new dependency needed

  **WHY Each Reference Matters**:
  - Line 18: Exact alert() to replace with toast
  - Lines 27-64: Four Card elements to add `variant="stat"` — must add prop without changing existing content
  - Lines 106-112: Inline empty state block boundary — replace entirely with EmptyState component
  - Line 119: Container for pie chart insertion — must go ABOVE the goal card (first child in this column)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: PortfolioPage builds with pie chart and toast
    Tool: Bash
    Preconditions: PortfolioPage.tsx updated, Tasks 6, 10, 11 complete
    Steps:
      1. Grep PortfolioPage.tsx for `import.*PieChart.*from.*recharts` — Recharts PieChart imported
      2. Grep PortfolioPage.tsx for `import.*toast.*from.*sonner` — toast imported
      3. Grep PortfolioPage.tsx for `import.*EmptyState` — EmptyState imported
      4. Grep PortfolioPage.tsx for `variant.*stat` — at least 4 matches (stat cards)
      5. Verify NO `alert(` calls remain
      6. Run `npm run build`
    Expected Result: PieChart + toast + EmptyState imported, stat cards have variant, no alert(), build passes
    Failure Indicators: Missing imports, alert() still present, build errors
    Evidence: .sisyphus/evidence/task-18-portfolio-build.txt

  Scenario: Pie chart renders with portfolio composition
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /portfolio
      2. Wait for page to fully render
      3. Look for SVG element inside the pie chart card (Recharts uses SVG): `.recharts-wrapper` or `svg` within the right column
      4. Take screenshot of the full portfolio page
    Expected Result: Donut-style pie chart visible in right column above goal card, with colored segments and legend
    Failure Indicators: No chart visible, blank card, SVG not rendered
    Evidence: .sisyphus/evidence/task-18-pie-chart.png

  Scenario: Toast fires on goal setting
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, on /portfolio
    Steps:
      1. Find goal input and submit button in the goal card section
      2. Enter a value in the goal input
      3. Click the goal submit button
      4. Wait 500ms for toast
      5. Check for `[data-sonner-toast]` selector
    Expected Result: Success toast "투자 목표가 설정되었습니다." appears
    Failure Indicators: alert() popup, no toast, console errors
    Evidence: .sisyphus/evidence/task-18-toast-goal.png
  ```

  **Commit**: YES
  - Message: `feat(portfolio): add pie chart + toast + empty state`
  - Files: `src/pages/PortfolioPage.tsx`
  - Pre-commit: `npm run build`

- [x] 19. DashboardPage — Animated Numbers + Gradient Stat Cards

  **What to do**:
  - Modify `FE/src/pages/DashboardPage.tsx` to:
    - **Animated numbers on KPI cards** (lines 17-52):
      - Replace static number displays with `<AnimatedNumber>` component for all 4 KPI cards:
        - 총 자산 (total assets): `<AnimatedNumber value={totalAssets} prefix="₩" className="text-2xl font-bold font-mono-num" />`
        - 총 수익률 (total return %): `<AnimatedNumber value={totalReturnPercent} suffix="%" className="text-2xl font-bold font-mono-num" />`
        - 현금 잔고 (cash balance): `<AnimatedNumber value={cashBalance} prefix="₩" className="text-2xl font-bold font-mono-num" />`
        - 투자 금액 (invested amount): `<AnimatedNumber value={investedAmount} prefix="₩" className="text-2xl font-bold font-mono-num" />`
      - Add import: `import { AnimatedNumber } from '@/components/ui/AnimatedNumber'`
    - **Apply gradient to stat cards**:
      - Add `variant="stat"` to all 4 KPI `<Card>` components
    - **Add skeleton loading**:
      - Show `<SkeletonStatCard />` (4 instances) for a brief loading period (500ms) before revealing animated numbers
      - Add import: `import { SkeletonStatCard } from '@/components/ui/Skeleton'`
      - Use `useState(true)` for isLoading + `useEffect` with setTimeout(500) to switch

  **Must NOT do**:
  - Do NOT change the page layout structure (grid, column spans)
  - Do NOT modify the holdings table or market watchlist sections
  - Do NOT change data calculations or mock data values
  - Do NOT add animation to every number on the page — ONLY the 4 top KPI stat cards

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Animated number integration + skeleton loading state management + gradient cards
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Guidance on count-up animation timing, skeleton-to-content transition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15-18, 20-21)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Tasks 5 (Skeleton), 8 (AnimatedNumber), 11 (Card variant="stat")

  **References**:

  **Pattern References**:
  - `FE/src/pages/DashboardPage.tsx:17-52` — The 4 KPI stat cards block. Each card has structure: `<Card><CardContent className="p-6"><div className="text-sm...">Label</div><div className="text-2xl font-bold font-mono-num">{formatCurrency(value)}</div><div className="text-xs...">Sub info</div></CardContent></Card>`. The middle `<div>` with the formatted value is what gets replaced with `<AnimatedNumber>`.
  - `FE/src/pages/DashboardPage.tsx:22-24` — Specific example: `<div className="text-2xl font-bold font-mono-num">{formatCurrency(account.totalAssets)}</div>` → `<AnimatedNumber value={account.totalAssets} prefix="₩" className="text-2xl font-bold font-mono-num" />`
  - `FE/src/components/ui/AnimatedNumber.tsx` (from Task 8) — AnimatedNumber with value, prefix, suffix, className props
  - `FE/src/components/ui/Skeleton.tsx` (from Task 5) — SkeletonStatCard export

  **WHY Each Reference Matters**:
  - Lines 17-52: Exact block containing all 4 cards — must replace number display in EACH card
  - Lines 22-24: Concrete example of the pattern to transform — same pattern repeats 4 times
  - AnimatedNumber.tsx: Component API to match (value, prefix, suffix, className)
  - Skeleton.tsx: SkeletonStatCard must match the visual shape of the real stat cards

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: DashboardPage builds with animated numbers and skeleton
    Tool: Bash
    Preconditions: DashboardPage.tsx updated, Tasks 5, 8, 11 complete
    Steps:
      1. Grep DashboardPage.tsx for `import.*AnimatedNumber` — component imported
      2. Grep DashboardPage.tsx for `import.*SkeletonStatCard` — skeleton imported
      3. Grep DashboardPage.tsx for `<AnimatedNumber` — should appear 4 times
      4. Grep DashboardPage.tsx for `variant.*stat` — should appear 4 times
      5. Run `npm run build`
    Expected Result: AnimatedNumber used 4 times, stat variant on 4 cards, skeleton imported, build passes
    Failure Indicators: Missing AnimatedNumber usage, build errors
    Evidence: .sisyphus/evidence/task-19-dashboard-build.txt

  Scenario: Numbers animate on page load
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to / (DashboardPage)
      2. Wait 200ms — take screenshot (should show skeleton or early animation state)
      3. Wait 1500ms — take screenshot (should show final animated numbers)
      4. Verify numbers are formatted with commas and ₩ prefix
    Expected Result: Numbers count up from 0 to final values with smooth animation, gradient cards visible
    Failure Indicators: Static numbers (no animation), NaN display, missing ₩ prefix
    Evidence: .sisyphus/evidence/task-19-animated-numbers.png
  ```

  **Commit**: YES (groups with T20, T21)
  - Message: `style(pages): animated numbers, empty states, toast across all pages`
  - Files: `src/pages/DashboardPage.tsx`
  - Pre-commit: `npm run build`

- [x] 20. StocksPage + TransactionsPage — Empty States + Table Enhancements

  **What to do**:
  - Modify `FE/src/pages/StocksPage.tsx`:
    - **Replace inline empty state** (lines 96-101):
      - Current: `<div className="text-center py-8"><p className="text-[var(--color-text-secondary)]">검색 결과가 없습니다</p></div>`
      - Replace with: `<EmptyState icon={Search} title="검색 결과가 없습니다" description="다른 키워드로 검색해보세요" />`
      - Add imports: `import { EmptyState } from '@/components/ui/EmptyState'` and `import { Search } from 'lucide-react'`
    - **Add skeleton loading** for the stocks table: Show `<SkeletonTable />` briefly on initial mount (500ms)
      - Import: `import { SkeletonTable } from '@/components/ui/Skeleton'`
  - Modify `FE/src/pages/TransactionsPage.tsx`:
    - **Replace inline empty state** (lines 74-79):
      - Current: `<div className="text-center py-8"><p className="text-[var(--color-text-secondary)]">거래 내역이 없습니다</p></div>`
      - Replace with: `<EmptyState icon={FileText} title="거래 내역이 없습니다" description="주식을 매수하면 거래 내역이 여기에 표시됩니다" />`
      - Add imports: `import { EmptyState } from '@/components/ui/EmptyState'` and `import { FileText } from 'lucide-react'`
    - **Add skeleton loading** for the transactions table: Show `<SkeletonTable />` briefly on initial mount
      - Import: `import { SkeletonTable } from '@/components/ui/Skeleton'`

  **Must NOT do**:
  - Do NOT change the table column structure or data rendering
  - Do NOT modify search/filter logic on StocksPage
  - Do NOT change pagination or sorting on TransactionsPage
  - Do NOT change any imports besides adding EmptyState, Skeleton, and Lucide icons

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Two pages with coordinated empty state and skeleton integration
  - **Skills**: [`ui-ux-pro-max`]
    - `ui-ux-pro-max`: Consistent empty state styling, icon selection

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15-19, 21)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Tasks 5 (Skeleton), 6 (EmptyState), 11 (Card — used on page), 13 (Table hover)

  **References**:

  **Pattern References**:
  - `FE/src/pages/StocksPage.tsx:96-101` — Inline empty state block: `<div className="text-center py-8"><p className="text-[var(--color-text-secondary)]">검색 결과가 없습니다</p></div>` → Replace with `<EmptyState>` component
  - `FE/src/pages/TransactionsPage.tsx:74-79` — Inline empty state block: `<div className="text-center py-8"><p className="text-[var(--color-text-secondary)]">거래 내역이 없습니다</p></div>` → Replace with `<EmptyState>` component
  - `FE/src/components/ui/EmptyState.tsx` (from Task 6) — EmptyState with icon, title, description props
  - `FE/src/components/ui/Skeleton.tsx` (from Task 5) — SkeletonTable export

  **WHY Each Reference Matters**:
  - StocksPage:96-101: Exact block to replace with EmptyState — must match the conditional rendering context
  - TransactionsPage:74-79: Same pattern, different page — consistent replacement approach
  - EmptyState.tsx: API with icon, title, description — icon must be a Lucide component
  - Skeleton.tsx: SkeletonTable for initial loading state

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Both pages build with EmptyState and Skeleton
    Tool: Bash
    Preconditions: StocksPage.tsx and TransactionsPage.tsx updated
    Steps:
      1. Grep StocksPage.tsx for `import.*EmptyState` — imported
      2. Grep StocksPage.tsx for `<EmptyState` — component used
      3. Grep TransactionsPage.tsx for `import.*EmptyState` — imported
      4. Grep TransactionsPage.tsx for `<EmptyState` — component used
      5. Verify neither file contains the old inline empty text pattern: grep for `검색 결과가 없습니다` in a plain `<p>` tag (should now be inside EmptyState)
      6. Run `npm run build`
    Expected Result: EmptyState imported and used in both pages, build passes
    Failure Indicators: Missing imports, old plain text still present, build errors
    Evidence: .sisyphus/evidence/task-20-stocks-transactions-build.txt

  Scenario: Empty state renders on StocksPage with no search results
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /stocks
      2. Type "zzzznonexistent" into the search input to trigger empty state
      3. Wait for the EmptyState component to render: look for icon + title text
      4. Take screenshot showing the EmptyState with Search icon and "검색 결과가 없습니다"
    Expected Result: EmptyState component visible with centered icon, title, and description
    Failure Indicators: Plain text still showing, missing icon, broken layout
    Evidence: .sisyphus/evidence/task-20-empty-state-stocks.png
  ```

  **Commit**: YES (groups with T19, T21)
  - Message: `style(pages): animated numbers, empty states, toast across all pages`
  - Files: `src/pages/StocksPage.tsx, src/pages/TransactionsPage.tsx`
  - Pre-commit: `npm run build`

- [x] 21. SignupPage — Toast (Replace alert)

  **What to do**:
  - Modify `FE/src/pages/SignupPage.tsx` to:
    - **Replace alert() with toast** (line 17):
      - Current: `alert('비밀번호가 일치하지 않습니다.')` → `toast.error('비밀번호가 일치하지 않습니다.')`
      - Add import: `import { toast } from 'sonner'`
    - This is the final alert() replacement — after this, zero alert() calls should remain in the codebase

  **Must NOT do**:
  - Do NOT change the signup form validation logic
  - Do NOT modify form fields or layout
  - Do NOT add any new functionality beyond the toast swap

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single line replacement + 1 import addition
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15-20)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Task 10 (Toaster must be in App.tsx)

  **References**:

  **Pattern References**:
  - `FE/src/pages/SignupPage.tsx:17` — Alert to replace: `alert('비밀번호가 일치하지 않습니다.')` → `toast.error('비밀번호가 일치하지 않습니다.')`
  - `FE/src/pages/StockDetailPage.tsx` (after Task 17) — Reference for how toast imports and usage look in this codebase (same `import { toast } from 'sonner'` pattern)

  **WHY Each Reference Matters**:
  - SignupPage.tsx:17: Exact alert() to replace — error case (password mismatch), so use `toast.error()` not `toast.success()`
  - StockDetailPage: Consistency reference — same import pattern

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: SignupPage builds with toast, zero alert() calls in codebase
    Tool: Bash
    Preconditions: SignupPage.tsx updated, Task 10 complete
    Steps:
      1. Grep SignupPage.tsx for `import.*toast.*from.*sonner` — toast imported
      2. Grep SignupPage.tsx for `toast.error` — toast.error used for password mismatch
      3. Verify NO `alert(` calls remain in ENTIRE src directory: `grep -r "alert(" src/` should return 0 matches
      4. Run `npm run build`
    Expected Result: toast imported and used, zero alert() calls in codebase, build passes
    Failure Indicators: alert() still present anywhere, build errors
    Evidence: .sisyphus/evidence/task-21-signup-toast.txt

  Scenario: Toast fires on password mismatch
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to /signup
      2. Fill password field with "test1234": `#password`
      3. Fill confirm password field with "different": `#confirmPassword`
      4. Click signup button: `button:has-text("회원가입")`
      5. Wait 500ms for toast
      6. Check for error toast: `[data-sonner-toast][data-type="error"]`
    Expected Result: Error toast "비밀번호가 일치하지 않습니다." appears in top-right
    Failure Indicators: alert() popup, no error toast, wrong toast type
    Evidence: .sisyphus/evidence/task-21-toast-password.png
  ```

  **Commit**: YES (groups with T19, T20)
  - Message: `style(pages): animated numbers, empty states, toast across all pages`
  - Files: `src/pages/SignupPage.tsx`
  - Pre-commit: `npm run build`

- [x] 22. Page Transitions Integration (Wrap Routes in Layouts)

  **What to do**:
  - Modify `FE/src/layouts/DashboardLayout.tsx` to:
    - Wrap `<Outlet />` (currently at line ~87 after Task 15 edits) with `<PageTransition>`:
      - Before: `<Outlet />`
      - After: `<PageTransition><Outlet /></PageTransition>`
    - Add import: `import { PageTransition } from '@/components/ui/PageTransition'`
    - The PageTransition component uses `useLocation()` internally for key-based re-animation on route change
  - Modify `FE/src/layouts/AuthLayout.tsx` to:
    - Wrap `<Outlet />` with `<PageTransition>`:
      - Before: `<Outlet />`
      - After: `<PageTransition><Outlet /></PageTransition>`
    - Add import: `import { PageTransition } from '@/components/ui/PageTransition'`

  **Must NOT do**:
  - Do NOT wrap individual page content (only the Outlet in layouts)
  - Do NOT change any other layout structure
  - Do NOT use framer-motion AnimatePresence

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple wrapper addition to 2 files — import + wrap Outlet
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (with Task 23)
  - **Blocks**: Task 23 (final build)
  - **Blocked By**: Tasks 9 (PageTransition component), 15 (DashboardLayout must be updated first)

  **References**:

  **Pattern References**:
  - `FE/src/layouts/DashboardLayout.tsx` (after Task 15) — Find `<Outlet />` in the content area. Wrap with `<PageTransition>`. NOTE: Line numbers will have shifted after Task 15 edits — search for `<Outlet` to find exact location.
  - `FE/src/layouts/AuthLayout.tsx` (after Task 16) — Find `<Outlet />`. Wrap with `<PageTransition>`.
  - `FE/src/components/ui/PageTransition.tsx` (from Task 9) — PageTransition component with children prop, uses useLocation() for route-based key

  **WHY Each Reference Matters**:
  - DashboardLayout: Outlet location is where page content renders — PageTransition wraps only this for entry animation
  - AuthLayout: Same pattern for auth pages (login/signup)
  - PageTransition.tsx: Must understand it uses useLocation() to re-trigger animation on route change

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Page transitions build correctly
    Tool: Bash
    Preconditions: Both layouts updated, Task 9 complete
    Steps:
      1. Grep DashboardLayout.tsx for `import.*PageTransition` — imported
      2. Grep DashboardLayout.tsx for `<PageTransition` — wraps Outlet
      3. Grep AuthLayout.tsx for `import.*PageTransition` — imported
      4. Grep AuthLayout.tsx for `<PageTransition` — wraps Outlet
      5. Run `npm run build`
    Expected Result: PageTransition imported and wrapping Outlet in both layouts, build passes
    Failure Indicators: Missing import, Outlet not wrapped, build errors
    Evidence: .sisyphus/evidence/task-22-page-transitions-build.txt

  Scenario: Page fade-in animation on navigation
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to / (DashboardPage)
      2. Wait for page to fully load
      3. Click navigation link to /portfolio (sidebar nav)
      4. Immediately take screenshot (should capture fade-in animation start — opacity < 1 or translateY > 0)
      5. Wait 500ms, take another screenshot (should show fully loaded page)
    Expected Result: Content area shows brief fade-in + slide-up animation on route change
    Failure Indicators: Instant page swap with no animation, jarring transition
    Evidence: .sisyphus/evidence/task-22-page-transition-animation.png
  ```

  **Commit**: YES (groups with T23)
  - Message: `feat(ux): page transitions + final build verification`
  - Files: `src/layouts/DashboardLayout.tsx, src/layouts/AuthLayout.tsx`
  - Pre-commit: `npm run build`

- [ ] 23. Final Build Verification + Screenshot All Pages

  **What to do**:
  - Run comprehensive build and visual verification:
    - **Build check**: Run `npm run build` — must pass with zero errors and zero warnings
    - **Dev server check**: Start dev server and verify all 7 pages load without console errors
    - **Screenshot all 7 pages** via Playwright:
      1. `/login` — Shows Logo, auth form with enhanced inputs
      2. `/signup` — Shows Logo, signup form
      3. `/` (Dashboard) — Shows dark sidebar, gradient stat cards, animated numbers, holdings table with hover
      4. `/stocks` — Shows stock list with search, table hover effects
      5. `/stocks/005930` — Shows candlestick chart with Korean colors, order panel with buttons
      6. `/portfolio` — Shows pie chart, gradient stat cards, empty state or holdings table
      7. `/transactions` — Shows transaction table with hover effects
    - **Verify zero console errors** on each page (Playwright can capture console messages)
    - **Verify zero alert() calls** remain: `grep -r "alert(" src/` should return 0 results
    - **Verify no framer-motion**: `grep -r "framer-motion" src/` and `grep "framer-motion" package.json` should return 0 results
    - Save all screenshots to `.sisyphus/evidence/final/page-{name}.png`

  **Must NOT do**:
  - Do NOT make code changes — this is verification ONLY
  - Do NOT modify any files — only read and screenshot
  - Do NOT skip any page — all 7 must be verified

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive multi-page verification with Playwright automation
  - **Skills**: [`playwright`]
    - `playwright`: Required for browser automation, page navigation, screenshot capture, console monitoring

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on ALL previous tasks)
  - **Parallel Group**: Wave 5 (sequential after Task 22)
  - **Blocks**: Final Verification Wave (F1-F4)
  - **Blocked By**: Tasks 15-22 (all page integrations + transitions must be complete)

  **References**:

  **Pattern References**:
  - All 7 page files in `FE/src/pages/` — Each page should render without errors
  - `FE/src/App.tsx` — Router structure defines all valid routes to test
  - `FE/package.json` — `npm run build` command: `tsc -b && vite build`

  **WHY Each Reference Matters**:
  - Page files: Must verify each page loads and reflects all design enhancements
  - App.tsx: Authoritative route list to ensure all pages are tested
  - package.json: Build command to verify TypeScript compilation + Vite bundling

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Full build passes
    Tool: Bash
    Preconditions: All Tasks 1-22 complete
    Steps:
      1. Run `npm run build` in FE directory
      2. Verify exit code 0
      3. Verify no TypeScript errors in output
      4. Verify dist/ directory is created with assets
    Expected Result: Clean build with exit code 0, dist/ directory populated
    Failure Indicators: TypeScript errors, Vite build errors, non-zero exit code
    Evidence: .sisyphus/evidence/task-23-build-output.txt

  Scenario: All 7 pages render without console errors
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running at localhost:5180
    Steps:
      1. For each route [/login, /signup, /, /stocks, /stocks/005930, /portfolio, /transactions]:
         a. Navigate to the route
         b. Wait for page load (networkidle)
         c. Capture any console errors
         d. Take full-page screenshot
         e. Save to .sisyphus/evidence/final/page-{name}.png
      2. After all pages: report console error count per page
    Expected Result: All 7 pages load, zero console errors across all pages, 7 screenshots saved
    Failure Indicators: Any page fails to load, console errors present, missing screenshots
    Evidence: .sisyphus/evidence/final/page-*.png (7 files)

  Scenario: Zero forbidden patterns in codebase
    Tool: Bash
    Preconditions: All tasks complete
    Steps:
      1. Run `grep -r "alert(" src/` in FE directory — must return 0 results
      2. Run `grep -r "framer-motion" src/` in FE directory — must return 0 results
      3. Run `grep "framer-motion" package.json` in FE directory — must return 0 results
      4. Run `grep -r "as any" src/` — should return 0 results
      5. Run `grep -r "@ts-ignore" src/` — should return 0 results
    Expected Result: Zero matches for all forbidden patterns
    Failure Indicators: Any forbidden pattern found
    Evidence: .sisyphus/evidence/task-23-forbidden-patterns.txt
  ```

  **Commit**: YES (groups with T22)
  - Message: `feat(ux): page transitions + final build verification`
  - Files: None (verification only — but screenshots saved to evidence)
  - Pre-commit: `npm run build`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns (framer-motion imports, dark mode classes, template/ changes). Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` (tsc -b && vite build). Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names. Verify no `alert()` calls remain in codebase.
  Output: `Build [PASS/FAIL] | Lint [N clean/N issues] | Alert Calls [0] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. Navigate ALL 7 pages via Playwright. For each page: verify visual changes match requirements, test hover effects, check animations fire, verify loading/empty states toggle, test toast notifications trigger correctly, verify candlestick chart renders OHLC data with Korean colors, verify pie chart shows portfolio composition. Save screenshots to `.sisyphus/evidence/final-qa/`.
  Output: `Pages [7/7 pass] | Animations [N/N] | Charts [2/2] | Toasts [N/N] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec. Check "Must NOT Have" compliance (no framer-motion, no dark mode, no onboarding, no avatar, no template/ changes, no new routes). Detect unaccounted file changes.
  Output: `Tasks [N/N compliant] | Guardrails [N/N] | Unaccounted [CLEAN/N] | VERDICT`

---

## Commit Strategy

| Commit | Tasks | Message | Key Files |
|--------|-------|---------|-----------|
| 1 | T1, T2 | `style(tokens): expand design system with gradient, shadow, and animation tokens` | index.css, package.json |
| 2 | T3 | `feat(data): add OHLC candlestick mock data generator` | mockData.ts |
| 3 | T4 | `feat(ui): create Logo component with icon` | Logo.tsx, DashboardLayout.tsx, AuthLayout.tsx |
| 4 | T5, T6 | `feat(ui): add Skeleton and EmptyState components` | Skeleton.tsx, EmptyState.tsx |
| 5 | T7 | `feat(charts): add CandlestickChart with lightweight-charts` | CandlestickChart.tsx |
| 6 | T8, T9 | `feat(ui): add AnimatedNumber and PageTransition components` | AnimatedNumber.tsx, PageTransition.tsx |
| 7 | T10 | `feat(toast): integrate sonner toast system` | App.tsx |
| 8 | T11-T14 | `style(ui): enhance Card, Button, Table, Input, Badge with gradients and animations` | Card.tsx, Button.tsx, Table.tsx, Input.tsx, Badge.tsx |
| 9 | T15, T16 | `style(layout): dark gradient sidebar and logo integration` | DashboardLayout.tsx, AuthLayout.tsx |
| 10 | T17 | `feat(stock-detail): replace line chart with candlestick + toast` | StockDetailPage.tsx |
| 11 | T18 | `feat(portfolio): add pie chart + toast + empty state` | PortfolioPage.tsx |
| 12 | T19, T20, T21 | `style(pages): animated numbers, empty states, toast across all pages` | DashboardPage.tsx, StocksPage.tsx, TransactionsPage.tsx, SignupPage.tsx |
| 13 | T22, T23 | `feat(ux): page transitions + final build verification` | App.tsx |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0, no errors
```

### Final Checklist
- [ ] `npm run build` passes
- [ ] All 7 pages render without errors
- [ ] Candlestick chart displays with Korean colors (red=up, blue=down)
- [ ] Portfolio pie chart shows holding composition
- [ ] Toast notifications fire (buy, sell, signup, goal set)
- [ ] No alert() calls remain in codebase
- [ ] Skeleton loading states work
- [ ] Empty states display when no data
- [ ] Sidebar has dark gradient background
- [ ] Cards have hover effects + gradient stat cards
- [ ] Page transitions animate on route change
- [ ] Dashboard numbers count up on load
- [ ] No framer-motion in package.json
- [ ] No changes to template/ directory
