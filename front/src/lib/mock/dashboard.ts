import type { StatEdge } from '@/components/ui/Stat';

export const TODAY_LABEL = 'Monday, 22 Sep · site day';

export interface Kpi {
  label: string;
  value: string;
  unit?: string;
  sub: string;
  edge: StatEdge;
}

export const KPIS: readonly Kpi[] = [
  { label: 'Active jobs today', value: '4', sub: '2 sites · 2 in progress', edge: 'machine' },
  { label: 'Plant & crew deployed', value: '9', sub: '2 excavators · 3 trucks · 4 crew', edge: 'slate' },
  { label: 'Billable ratio', value: '84', unit: '%', sub: 'of clocked hours today', edge: 'billed' },
  { label: 'Ready to invoice', value: '$18.4', unit: 'k', sub: 'from captured work', edge: 'flag' },
];

export interface FunnelNode {
  label: string;
  value: string;
  /** the final node is tinted green — it is money that has left the building */
  done?: boolean;
}

export const FUNNEL: readonly FunnelNode[] = [
  { label: 'Captured entries', value: '37' },
  { label: 'Priced lines', value: '31' },
  { label: 'Draft invoices', value: '2' },
  { label: 'Pushed to Xero', value: '1', done: true },
];

export const TIME_SPLIT = [
  { key: 'billable', label: 'Billable on job', pct: 64, color: 'var(--billed)' },
  { key: 'travel', label: 'Travel & setup', pct: 20, color: 'var(--machine)' },
  { key: 'idle', label: 'Idle / waiting', pct: 16, color: 'var(--flag)' },
] as const;

export type AlertKind = 'flag' | 'ai' | 'ok';

export interface Alert {
  id: string;
  kind: AlertKind;
  title: string;
  detail: string;
}

export const ALERTS: readonly Alert[] = [
  {
    id: 'a1',
    kind: 'flag',
    title: "EX-01 hours don't match EROAD.",
    detail: 'Operator logged 9.0h · engine ran 7.5h. Review before billing.',
  },
  {
    id: 'a2',
    kind: 'ai',
    title: 'Possible missed charge on Albany.',
    detail: 'Truck disposal on a docket has no matching invoice line yet.',
  },
  {
    id: 'a3',
    kind: 'ai',
    title: 'TR-03 idle 1.4h waiting to load.',
    detail: 'Utilisation gap flagged — consider re-sequencing tomorrow.',
  },
  {
    id: 'a4',
    kind: 'ok',
    title: 'Harbour Rd invoice synced to Xero.',
    detail: 'INV-2049 · $6,240.00 · no duplicate created.',
  },
];
