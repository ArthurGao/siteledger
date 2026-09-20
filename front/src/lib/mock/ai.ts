export const AI_RULE = {
  heading: 'One rule keeps it honest',
  body: 'Every AI feature has to answer a single question: can its output stand as a charge on an invoice? If yes, it is a billing source. If not, it only ever suggests or pre-fills — a person confirms before anything reaches the customer.',
} as const;

export const NL_PROMPT = 'Albany — cut 600m³, cart spoil away, then bring GAP40 back';

export const NL_TASKS: readonly { name: string; basis: string }[] = [
  { name: 'Site cut — 600m³', basis: 'per hour' },
  { name: 'Load trucks', basis: 'per hour' },
  { name: 'Cart spoil away', basis: 'per load' },
  { name: 'Import GAP40', basis: 'per tonne' },
  { name: 'Spread & level', basis: 'per hour' },
];

export const PHOTO_ESTIMATE = {
  volume: '~10.2 m³',
  detail: '≈ 1 load · TR-02 capacity 11 m³ ·',
  caveat: 'Suggests a load may be unlogged — confirm with driver.',
} as const;

export const AI_FLAGS: readonly { id: string; tone: 'flag' | 'hold'; text: string }[] = [
  { id: 'f1', tone: 'flag', text: 'Docket disposal with no invoice line — possible missed charge' },
  { id: 'f2', tone: 'hold', text: 'TR-03 idle 1.4h — utilisation gap, re-sequence tomorrow' },
];

export const DEMO_NOTE =
  'This is an interactive prototype with sample data for demonstration. Dispatch, capture, and integrations are simulated to show the intended flow — no live Xero or EROAD account is connected.';
