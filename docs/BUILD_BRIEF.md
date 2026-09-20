# Build Brief — SiteLedger "Field to Invoice" (Next.js frontend, mock data)

> Hand this file to Claude Code as the build spec. It fully specifies a **frontend-only demo**: no backend, no real APIs, all data mocked in-repo. Every design token, screen, mock record, and interaction below is prescriptive — follow it rather than inventing a generic dashboard. An optional single-file HTML reference of this exact design may be attached; if present, match its look and behaviour.

---

## 1. Objective

Build a client-facing **interactive demo** for an earthworks-contractor job-management platform. It walks one story end to end: **work happens on site → gets captured on a phone → becomes priced invoice lines → syncs to Xero**, with EROAD telematics and weighbridge OCR shown as integrations, plus an AI-assist section.

The audience is an earthworks contractor owner being shown the product. It must feel like real operations software, look distinctive (plant/machinery identity, not a template), and let the presenter click through several live moments.

## 2. Non-goals (do NOT do)

- No backend, database, auth, or server actions that hit a network.
- No real Xero / EROAD / weighbridge / LLM calls. **All integrations are simulated with `setTimeout`.**
- No `localStorage`/`sessionStorage`. Keep all interactive state in React state.
- No placeholder Lorem text — use the mock data given in §8.
- Don't restyle into generic Tailwind cards; preserve the design system in §5.

## 3. Tech stack & decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router), latest stable** | matches existing stack |
| Language | **TypeScript, strict** | typed mock model |
| Styling | **CSS Modules + `globals.css` design tokens** | preserves the hand-crafted, non-templated look; avoids the generic Tailwind-card tell |
| Fonts | **`next/font/google`**: Barlow, Barlow Semi Condensed, IBM Plex Mono | industrial/plant identity |
| Icons | inline SVG (no icon lib) or `lucide-react` if preferred | keep bundle light |
| State | local React state (`useState`) only | it's a demo |
| Data | typed exports under `src/lib/mock/` | single source for mock records |

Rationale on styling: Tailwind would tempt uniform rounded cards + one shadow everywhere, which reads as AI-generated. CSS Modules per component keeps hierarchy deliberate. If you must use Tailwind, encode the §5 tokens into `tailwind.config` and still vary radius/borders by hierarchy.

## 4. Project structure

```
src/
  app/
    layout.tsx            # <html>, fonts, imports globals.css
    (shell)/
      layout.tsx          # AppShell: Rail + Topbar + <main>
      page.tsx            # → redirect to /dashboard  (or render Dashboard)
      dashboard/page.tsx
      planner/page.tsx
      jobs/page.tsx
      field/page.tsx      # 'use client'
      review/page.tsx
      invoicing/page.tsx  # 'use client'
      integrations/page.tsx # 'use client'
      ai/page.tsx         # 'use client'
  components/
    shell/Rail.tsx  Topbar.tsx  NavItem.tsx
    ui/Panel.tsx  Tag.tsx  Stat.tsx  SourceTag.tsx  Button.tsx
    field/PhoneCapture.tsx
    invoicing/XeroPush.tsx
    integrations/WeighbridgeOCR.tsx  IntegrationCard.tsx
    ai/NlJobDrafter.tsx  PhotoEstimator.tsx
    dashboard/*  planner/Board.tsx  review/*  jobs/*
  lib/
    mock/
      jobs.ts  resources.ts  captures.ts  invoice.ts  integrations.ts  ai.ts
    nav.ts                # nav config: {slug,label,icon}
    types.ts              # domain types (§7)
  styles/
    globals.css           # :root tokens + resets
    *.module.css
```

Routes render inside one shared shell (left rail + top bar). Only `field`, `invoicing`, `integrations`, `ai` need client interactivity; the rest can be server components reading mock data.

## 5. Design system (preserve exactly)

**Identity:** earthworks / heavy plant + a dispatch control room. Functional accent is **machine yellow** (excavators, hi-vis), grounded in the subject — not decorative. Canvas is concrete grey, not cream. Dark steel for the nav rail. Money/synced states use a functional green; alerts use a warning red.

**Color tokens** (`:root` in `globals.css`):
```css
--concrete:#E7E9E5;  --surface:#FAFAF8;  --panel:#FFFFFF;
--steel:#191C1B;     --ink:#22261F;      --muted:#6B726A;
--machine:#F5B301;   --machine-deep:#E0A200;
--slate:#4C5A61;     --slate-soft:#DCE1E1;
--seam:#D6D8D2;      --seam-soft:#E7E8E3;
--billed:#1E7A50;    --billed-soft:#DDEEE4;
--flag:#C6402E;      --flag-soft:#F6E1DC;
```
Provide a `:root[data-theme="dark"]` override (concrete→#121412, surface→#1a1d1a, panel→#1e211e, ink→#e7e9e3, muted→#9aa094, seam→#2c302b) and set an explicit `body` background. Default theme light.

**Typography roles:**
- `Barlow Semi Condensed` 600/700 → headings, module titles, nav brand, KPI labels, table headers.
- `Barlow` 400/500 → body, descriptions.
- `IBM Plex Mono` 500 → **numeric data only** (hours, loads, tonnage, $ amounts, equipment IDs, docket numbers). This is a telematics/weighbridge-readout cue — do not use mono for general labels.
- Type scale ≈ 13 / 14 / 15 body · 16 card title · 22 section hero · 27 page title. Line length < 80ch on prose.

**Aesthetic rules (avoid the generated-page tells):**
- No cream+serif+terracotta; no all-caps eyebrows; no `→` appended to button labels; no middle-dot meta strings as chrome.
- Uppercase is allowed **only** for stencilled plant/status tags (`EX-01`, `OVERDUE`, `IN PROGRESS`) — it mimics equipment tagging, which is grounded.
- Vary hierarchy: KPI stats carry a 4px colored left edge; job chips carry a 3px left accent by site; the invoice looks like a document, not a card; the phone is its own device frame. Don't apply one radius+shadow to everything.
- Motion only on user action (sync, push, scan, draft). No scattered fade-up-on-scroll. Respect `prefers-reduced-motion`.

**Primitives to build:** `Panel` (bordered surface), `Tag` (variants: plant/ok/warn/hold/info), `SourceTag` (manual/tele/weigh/ai — the data-provenance chip), `Button` (variants: solid steel / amber / ghost), `Stat` (KPI with colored edge).

## 6. Information architecture

| Route | Nav label | Client? | Purpose |
|---|---|---|---|
| `/dashboard` | Dashboard | no | morning snapshot: KPIs, field→invoice funnel, billable/idle bar, AI alert feed |
| `/planner` | Work Planner | no | resource × day scheduling board with status chips |
| `/jobs` | Jobs & Sites | no | Albany job detail: site map, hazards, task table w/ charge basis, dockets |
| `/field` | Field Capture | **yes** | phone mockup: offline capture + sync demo |
| `/review` | Review | no | clocked-vs-billable bars + EROAD cross-check with a flagged gap |
| `/invoicing` | Invoicing | **yes** | traceable invoice + Push-to-Xero (idempotent) |
| `/integrations` | Integrations | **yes** | Xero / EROAD / Weighbridge-OCR cards; OCR is interactive |
| `/ai` | AI Assist | **yes** | AI features under the "measured can bill / estimated only assists" rule; NL-job + photo-estimate interactive |

Rail = dark steel, brand "SiteLedger / Field to Invoice", nav items with icon + label, active item has a machine-yellow left indicator. Topbar = breadcrumb `SiteLedger / {module}` + two integration pills (Xero, EROAD) with a pulsing green dot + a user avatar "A". Mobile (≤900px): rail becomes a drawer behind a hamburger with a scrim.

## 7. Data model (`src/lib/types.ts`)

```ts
export type ChargeBasis = 'hour' | 'load' | 'tonne' | 'fixed';
export type CaptureSource = 'manual' | 'telematics' | 'weighbridge' | 'ai_estimate';
export type TaskStatus = 'planned' | 'in_progress' | 'completed' | 'overdue';

export interface Customer { id: string; name: string; xeroContactId: string; }
export interface Site { id: string; address: string; hazards: string[]; }
export interface ResourceItem {
  id: string;                       // "EX-01", "TR-01", "Jack M."
  kind: 'excavator' | 'truck' | 'operator';
  label: string;                    // "CAT 320 · 20T"
  capacityM3?: number;
  defaultRate?: number;
}
export interface Task {
  id: string; name: string; resourceId: string;
  chargeBasis: ChargeBasis; rate: number | null; unit: string;
  captured?: string;                // display e.g. "9.0 h", "24 loads"
  isExtra?: boolean;                // from a docket
}
export interface Job {
  id: string; ref: string;          // "#260919"
  name: string; customer: Customer; site: Site;
  status: TaskStatus; quoteRef: string; spoilM3: number;
  tasks: Task[];
}
export interface Assignment {
  resourceId: string; day: number;  // 0..5 Mon..Sat
  jobLabel: string; site: 'albany' | 'harbour' | 'yard';
  status: TaskStatus | 'maint';
}
export interface CaptureEntry {
  id: string; taskId: string;
  hours?: number; loads?: number; tonnes?: number;
  source: CaptureSource; note?: string; photos?: number;
}
export interface Docket { id: string; jobId: string; lines: string[]; photos: number; }
export interface InvoiceLine {
  desc: string; qty: string; rate: number; amount: number;
  source: CaptureSource; trace: string;   // "from 3 capture entries"
}
export interface CrossCheck {
  resourceId: string; leftLabel: string; leftVal: string;
  rightLabel: string; rightVal: string; verdict: 'match' | 'gap'; note?: string;
}
```

## 8. Mock data (use verbatim)

**Company:** Sample Earthworks Ltd · GST 128-419-032.
**Customer:** Kauri Build Ltd · xeroContactId `CT-0192`.
**Job:** `#260919` "Albany Site Earthworks" · site `18 Bush Rd, Albany` · quoteRef `Q-4471` · spoil ~600 m³ · status in_progress.
Hazards: `Overhead power — NE boundary`, `Hard rock at north face`, `Live traffic on Bush Rd`.

**Resources:** `EX-01` (CAT 320 · 20T, $180/h), `EX-02` (Kubota · 13T), `TR-01` `TR-02` (8-wheeler, 11 m³ cap), `TR-03` (Truck & trailer), operator `Jack M.`

**Tasks (Albany):**
| id | name | resource | basis | rate | captured |
|---|---|---|---|---|---|
| t1 | Site cut | EX-01 | hour | 180 | 9.0 h |
| t2 | Load trucks | EX-01 | hour | incl. | — |
| t3 | Cart spoil | TR-01/02/03 | load | 95 | 24 loads |
| t4 | Import GAP40 | TR-01 | tonne | 41 | 120 t |
| t5 | Spreading | EX-01 | hour | 180 | planned |
| t6 | Concrete removal (extra) | EX-01 | fixed | 180 | 1.5 h |

**Docket #0182:** `Remove concrete — 1.5h`, `Truck disposal — 2 loads`, `Drain excavation — 1h`, 1 photo.

**Planner assignments** (Mon..Sat = cols; site drives chip colour): EX-01 → Albany Site cut (Mon in_progress, Tue planned), Albany Spreading (Wed planned). EX-02 → Harbour Rd Trench (Mon/Tue), Yard Service (Thu, maint). TR-01 → Albany Cart spoil (Mon), Albany Import GAP40 (Tue/Wed). TR-02 → Albany Cart spoil (Mon/Tue). TR-03 → Albany Cart spoil (Mon, **overdue**), Harbour Rd Cart (Tue). Jack M. → EX-01 · Albany (Mon on-site, Tue/Wed planned).

**Dashboard KPIs:** Active jobs `4`, Plant & crew deployed `9`, Billable ratio `84%`, Ready to invoice `$18.4k`. Funnel: captured `37` → priced `31` → draft invoices `2` → pushed to Xero `1`. Billable/travel/idle split = `64% / 20% / 16%`.
**Dashboard alerts (feed):** flag "EX-01 hours don't match EROAD — 9.0h logged vs 7.5h engine"; ai "Possible missed charge on Albany — docket disposal has no invoice line"; ai "TR-03 idle 1.4h waiting to load"; ok "Harbour Rd invoice synced — INV-2049 · $6,240.00".

**Review — clocked vs billable:** Jack M./EX-01 `8.5/10.0h`; TR-01 `7.2/8.0h`; TR-03 `5.6/7.0h`.
**Review — EROAD cross-check:** EX-01 Operator `9.0h` / Engine `7.5h` → **gap 1.5h**; TR-01 Operator `8.0h` / GPS on site `7.8h` → match; TR-02 Loads `9` / Site trips `9` → match.

**Invoice lines (draft, Job #260919):**
| desc | source | trace | qty | rate | amount |
|---|---|---|---|---|---|
| Excavator EX-01 — site cut & loading | manual | from 3 capture entries | 9.0 h | 180.00 | 1,620.00 |
| Cart spoil — TR-01/02/03 | manual | 24 loads across 3 trucks | 24 | 95.00 | 2,280.00 |
| Import GAP40 | weighbridge | OCR from 4 dockets | 120 t | 41.00 | 4,920.00 |
| Concrete removal — extra | manual (docket) | Docket #0182 | 1.5 h | 180.00 | 270.00 |

Subtotal `$9,090.00` · GST 15% `$1,363.50` · **Total `$10,453.50`**.

**Weighbridge docket (OCR demo):** `WESTGATE WEIGHBRIDGE · DOCKET 55213 · TRUCK TR-01 · PRODUCT GAP40 · GROSS 41.20t · TARE 11.20t · NET 30.00t`.

## 9. Screen specs (per module)

- **Dashboard:** page title "This morning, at a glance". Row of 4 `Stat` cards (colored edges: machine/slate/billed/flag). Two-column: left `Panel` with the 4-node funnel (captured→priced→draft→pushed) + a billable/travel/idle stacked bar with legend; right `Panel` "Needs a look" = the alert feed (icon chips: flag/ai/ok).
- **Work Planner:** horizontally scrollable board, `150px` resource column + 6 day columns. Rows per resource; cells hold status chips coloured by site (albany=amber-tint, harbour=slate-tint, yard=grey). Overdue chip shows red status text.
- **Jobs & Sites:** two-column. Left: a CSS-drawn "site map" (grid texture + a dashed zone rect + two pins + a mono address label), then hazard tags, then the Task table (name / resource / charge-basis Tag / rate / captured). Right sidebar: Job details key-values + Docket #0182 card.
- **Field Capture:** see §10.1. Left = phone frame; right = 4 numbered explainer steps.
- **Review:** two `Panel`s. Left "Clocked vs billable" = 3 stacked bars (green billable + striped idle) with `x.x / y.y h`. Right "EROAD cross-check" = 3 rows comparing operator vs telematics, EX-01 tagged `1.5h gap` (warn), others `matches` (ok); footnote: system flags, never overrides.
- **Invoicing:** see §10.2. Document-styled invoice (header w/ company + draft ref, line table with a provenance `SourceTag` + trace under each desc, right-aligned totals, GST, bold total), then a Xero action bar.
- **Integrations:** 3 `IntegrationCard`s. Xero (reads customers/items ←, writes invoices →; note idempotent). EROAD (reads engine hours/GPS/RUC ←; feeds Review). Weighbridge OCR (interactive, §10.3).
- **AI Assist:** dark "hero" panel with a hazard-stripe left edge stating the rule **"Measured can bill · Estimated only assists"**. Then a 2×2 grid: NL-job drafter (§10.4, tag `draft only`), photo estimator (§10.5, tag `assist only`), weighbridge reader (tag `can bill`, links to Integrations), "catch what falls through" (tag `flags for review`, shows the two sample alerts). Footer disclaimer that data is simulated.

## 10. Interaction specs (exact behaviour)

### 10.1 `PhoneCapture` (`/field`)
State: `hours=9.0`, `loads=9`, `online=false`, `syncing=false`.
- Hours stepper ±0.5 (min 0); loads stepper ±1 (min 0); values render in mono.
- Network badge: `OFFLINE` (red) when `!online`.
- Notice (red) while offline: "No signal. Your entries are saved on the phone and will sync automatically."
- Button "Save entry" (amber) → set `syncing`, label "Syncing…", disabled → after ~1100ms set `online=true`: badge → `ONLINE` (green), notice → green "Back online. 2 entries synced — now waiting on office review.", button → "Synced ✓" (green).

### 10.2 `XeroPush` (`/invoicing`)
State: `status: 'draft' | 'pushing' | 'synced'`, `pressedAgain=false`.
- Button "Push to Xero" (amber). First press → `pushing`, status text "Creating invoice in Xero…", disabled → after ~1300ms → `synced`: button "Pushed to Xero" (green), status "✓ Synced · INV-2050 · attachments included".
- **Second press when already synced** → don't create again; status shows "Already synced — no duplicate created (idempotent)." This idempotency beat is the point; make it obvious.

### 10.3 `WeighbridgeOCR` (`/integrations`)
- A mono "ticket" block (the docket text) + button "Scan docket".
- Press → run a scan-line animation down the ticket (~1400ms; a machine-yellow horizontal line with glow via keyframes) → reveal extracted fields (Truck TR-01 / Product GAP40 / Net 30.00 t) + a `SourceTag weighbridge` + "→ billable, added to Import GAP40". Button → "Read ✓".

### 10.4 `NlJobDrafter` (`/ai`)
- Textarea prefilled: `Albany — cut 600m³, cart spoil away, then bring GAP40 back`. Button "Draft tasks".
- Press → clear output, label "Drafting…", then append these 5 task chips **staggered ~220ms** each, each sliding in: `Site cut — 600m³ (per hour)`, `Load trucks (per hour)`, `Cart spoil away (per load)`, `Import GAP40 (per tonne)`, `Spread & level (per hour)` — task name bold + a mono basis chip. After the last, button becomes ghost "Confirm to create" (no real action).

### 10.5 `PhotoEstimator` (`/ai`)
- A CSS-drawn truck-bed "photo" + button "Estimate volume".
- Press → "Analysing…" → after ~900ms show `~10.2 m³` (mono, large) + "≈ 1 load · TR-02 capacity 11 m³ · [ai estimate tag]" + a red caveat "Suggests a load may be unlogged — confirm with driver." Reinforce it's an estimate, not a bill.

## 11. Responsive & accessibility

- Works desktop-first; usable ≤900px (rail → drawer, multi-col grids → single col, board scrolls-x).
- Meta viewport `width=device-width, initial-scale=1, viewport-fit=cover`; honour safe-area insets on fixed rail/topbar.
- Visible keyboard focus; nav is real `<button>`/`<Link>`; `prefers-reduced-motion` disables the animations above.
- Every animation is user-triggered (no autoplay reveals).

## 12. Acceptance criteria

1. `npm install && npm run dev` boots with no console errors; `npm run build` passes with TS strict.
2. All 8 routes render from mock data with the §8 values shown correctly.
3. The 5 interactions in §10 behave exactly as specified (timings approximate, states exact).
4. No network requests leave the app; no `localStorage`/`sessionStorage`.
5. Design tokens/fonts from §5 applied; layout doesn't read as a generic Tailwind card grid.
6. Responsive down to ~380px without horizontal body scroll (board scrolls within its own container).

## 13. Commands

```bash
npx create-next-app@latest siteledger --ts --app --eslint --no-tailwind --src-dir --import-alias "@/*"
# then implement per this brief; CSS Modules + globals.css tokens; next/font for the three families
npm run dev
```

## 14. Suggested build order (gate each before moving on)

1. **Shell** — layout, Rail, Topbar, nav config, tokens, fonts, primitives (`Panel/Tag/SourceTag/Button/Stat`). *Gate: navigation + theming look right on an empty page.*
2. **Static modules** — Dashboard, Planner, Jobs, Review from mock data (no interactivity).
3. **Interactive modules** — Field, Invoicing, Integrations OCR, AI (the §10 behaviours).
4. **Polish** — responsive drawer, reduced-motion, dark theme, focus states.

---

*All integrations and AI outputs here are simulated for demonstration. The provenance model (`CaptureSource`) is deliberately kept in the types so a later phase can swap a simulated source for a real Xero / EROAD / OCR / LLM call without reshaping the data model.*
