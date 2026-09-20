# SiteLedger — frontend demo

Client-facing interactive demo for an earthworks-contractor job-management
platform. It walks one story end to end: **work happens on site → gets captured
on a phone → becomes priced invoice lines → syncs to Xero**.

Built to `docs/BUILD_BRIEF.md`, with `docs/reference-demo.html` as the visual
and behavioural source of truth.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /dashboard
```

```bash
npm run build      # production build, TypeScript strict
npm run lint
```

## Ground rules

- **Frontend only.** No backend, no database, no auth, no server actions that
  hit a network.
- **Mock data only.** Every record lives in `src/lib/mock/`. Integrations and
  AI are simulated with `setTimeout`.
- **No `localStorage` / `sessionStorage`.** All interactive state is React
  `useState`.
- **No Tailwind, no UI kit.** CSS Modules per component plus design tokens in
  `src/styles/globals.css`.

## Routes

| Route | Nav label | Client | What it shows |
|---|---|---|---|
| `/dashboard` | Dashboard | – | KPIs, field→invoice funnel, billable split, alert feed |
| `/planner` | Work Planner | – | resource × day scheduling board |
| `/jobs` | Jobs & Sites | – | site map, hazards, task table, dockets |
| `/field` | Field Capture | ✓ | phone mockup: offline capture + sync |
| `/review` | Review | – | clocked-vs-billable bars, EROAD cross-check |
| `/invoicing` | Invoicing | ✓ | traceable invoice + idempotent Push to Xero |
| `/integrations` | Integrations | ✓ | Xero / EROAD cards, interactive weighbridge OCR |
| `/ai` | AI Assist | ✓ | NL job drafter, photo estimator |

`/` redirects to `/dashboard`. All eight render inside one shared shell
(`src/app/(shell)/layout.tsx`): dark steel rail + topbar.

## Layout

```
src/
  app/
    layout.tsx              # <html>, next/font, globals.css, viewport
    (shell)/
      layout.tsx            # AppShell: Rail + Topbar + <main>
      page.tsx              # → /dashboard
      <route>/page.tsx      # one per route above
  components/
    shell/   AppShell Rail Topbar NavItem NavIcon
    ui/      Panel Tag SourceTag Button Stat PageHeader icons
    dashboard/ planner/ jobs/ review/     # static modules
    field/ invoicing/ integrations/ ai/   # interactive modules
  lib/
    mock/    jobs resources captures invoice integrations ai dashboard review
    nav.ts   types.ts
  styles/
    globals.css             # :root tokens, dark theme, resets
```

## Design system

Tokens live in `:root` in `src/styles/globals.css`; a
`:root[data-theme="dark"]` block overrides them (default theme is light).

Type roles:

- **Barlow Semi Condensed** 600/700 — headings, module titles, nav brand,
  KPI labels, table headers
- **Barlow** 400/500 — body and descriptions
- **IBM Plex Mono** 500 — **numeric data only** (hours, loads, tonnage, money,
  equipment IDs, docket numbers). This is a telematics/weighbridge-readout cue;
  don't use mono for general labels.

Uppercase is reserved for stencilled plant/status tags (`EX-01`, `OVERDUE`,
`IN PROGRESS`).

## Motion

Every animation is user-triggered — there are no scroll or autoplay reveals.
`prefers-reduced-motion: reduce` disables them globally. Where an element is
hidden at rest and revealed by an animation (the drafted-task chips on `/ai`),
a reduced-motion override pins its end state so it stays visible.

## Interactions

All five are simulated locally; nothing leaves the app.

| Where | Behaviour |
|---|---|
| `/field` | steppers ±0.5 h / ±1 load; **Save entry** → *Syncing…* → offline flips online, notice and button turn green |
| `/invoicing` | **Push to Xero** → *Creating invoice…* → synced `INV-2050`; pressing again reports **no duplicate created (idempotent)** |
| `/integrations` | **Scan docket** runs a scan line down the ticket, then reveals the extracted reading |
| `/ai` | **Draft tasks** appends five tasks ~220 ms apart, then offers a ghost confirm |
| `/ai` | **Estimate volume** → *Analysing…* → `~10.2 m³` with an estimate-only caveat |
