import type { Assignment, ResourceItem } from '@/lib/types';

export const RESOURCES: readonly ResourceItem[] = [
  { id: 'EX-01', kind: 'excavator', label: 'CAT 320 · 20T', defaultRate: 180 },
  { id: 'EX-02', kind: 'excavator', label: 'Kubota · 13T' },
  { id: 'TR-01', kind: 'truck', label: '8-wheeler', capacityM3: 11 },
  { id: 'TR-02', kind: 'truck', label: '8-wheeler', capacityM3: 11 },
  { id: 'TR-03', kind: 'truck', label: 'Truck & trailer' },
  { id: 'Jack M.', kind: 'operator', label: 'Operator' },
];

export const PLANNER_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * The board shows a stencilled status word per chip. Most come straight from
 * `status`, but the reference demo labels two of them differently, so the mock
 * carries the override rather than bending the shared domain type.
 */
export type PlannerAssignment = Assignment & { statusLabel?: string };

export const ASSIGNMENTS: readonly PlannerAssignment[] = [
  { resourceId: 'EX-01', day: 0, jobLabel: 'Albany — Site cut', site: 'albany', status: 'in_progress' },
  { resourceId: 'EX-01', day: 1, jobLabel: 'Albany — Site cut', site: 'albany', status: 'planned' },
  { resourceId: 'EX-01', day: 2, jobLabel: 'Albany — Spreading', site: 'albany', status: 'planned' },

  { resourceId: 'EX-02', day: 0, jobLabel: 'Harbour Rd — Trench', site: 'harbour', status: 'in_progress' },
  { resourceId: 'EX-02', day: 1, jobLabel: 'Harbour Rd — Trench', site: 'harbour', status: 'planned' },
  { resourceId: 'EX-02', day: 3, jobLabel: 'Yard — Service', site: 'yard', status: 'maint' },

  { resourceId: 'TR-01', day: 0, jobLabel: 'Albany — Cart spoil', site: 'albany', status: 'in_progress' },
  { resourceId: 'TR-01', day: 1, jobLabel: 'Albany — Import GAP40', site: 'albany', status: 'planned' },
  { resourceId: 'TR-01', day: 2, jobLabel: 'Albany — Import GAP40', site: 'albany', status: 'planned' },

  { resourceId: 'TR-02', day: 0, jobLabel: 'Albany — Cart spoil', site: 'albany', status: 'in_progress' },
  { resourceId: 'TR-02', day: 1, jobLabel: 'Albany — Cart spoil', site: 'albany', status: 'planned' },

  { resourceId: 'TR-03', day: 0, jobLabel: 'Albany — Cart spoil', site: 'albany', status: 'overdue', statusLabel: 'OVERDUE START' },
  { resourceId: 'TR-03', day: 1, jobLabel: 'Harbour Rd — Cart', site: 'harbour', status: 'planned' },

  { resourceId: 'Jack M.', day: 0, jobLabel: 'EX-01 · Albany', site: 'albany', status: 'in_progress', statusLabel: 'ON SITE' },
  { resourceId: 'Jack M.', day: 1, jobLabel: 'EX-01 · Albany', site: 'albany', status: 'planned' },
  { resourceId: 'Jack M.', day: 2, jobLabel: 'EX-01 · Albany', site: 'albany', status: 'planned' },
];

const STATUS_WORD: Record<PlannerAssignment['status'], string> = {
  planned: 'PLANNED',
  in_progress: 'IN PROGRESS',
  completed: 'COMPLETED',
  overdue: 'OVERDUE',
  maint: 'MAINT',
};

export function statusWord(a: PlannerAssignment): string {
  return a.statusLabel ?? STATUS_WORD[a.status];
}
