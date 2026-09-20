import type { CrossCheck } from '@/lib/types';

export interface Utilisation {
  label: string;
  billable: number;
  clocked: number;
}

export const UTILISATION: readonly Utilisation[] = [
  { label: 'Jack M. — EX-01', billable: 8.5, clocked: 10.0 },
  { label: 'TR-01', billable: 7.2, clocked: 8.0 },
  { label: 'TR-03', billable: 5.6, clocked: 7.0 },
];

export const CROSS_CHECKS: readonly CrossCheck[] = [
  {
    resourceId: 'EX-01',
    leftLabel: 'Operator',
    leftVal: '9.0 h',
    rightLabel: 'Engine (EROAD)',
    rightVal: '7.5 h',
    verdict: 'gap',
    note: '1.5h gap',
  },
  {
    resourceId: 'TR-01',
    leftLabel: 'Operator',
    leftVal: '8.0 h',
    rightLabel: 'GPS on site',
    rightVal: '7.8 h',
    verdict: 'match',
    note: 'matches',
  },
  {
    resourceId: 'TR-02',
    leftLabel: 'Loads logged',
    leftVal: '9',
    rightLabel: 'Site trips',
    rightVal: '9',
    verdict: 'match',
    note: 'matches',
  },
];

export const CROSS_CHECK_FOOTNOTE =
  'The EX-01 gap is surfaced for a person to resolve — bill the engine hours, the logged hours, or split. The system never silently overrides field entries.';

export const UTILISATION_FOOTNOTE =
  'Striped = travel, waiting or yard time. Billable ratio feeds the utilisation view.';
