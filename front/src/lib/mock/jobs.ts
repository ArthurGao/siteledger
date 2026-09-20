import type { Customer, Docket, Job, Site, Task } from '@/lib/types';

export const COMPANY = {
  name: 'Sample Earthworks Ltd',
  gst: 'GST 128-419-032',
} as const;

export const CUSTOMER: Customer = {
  id: 'c-kauri',
  name: 'Kauri Build Ltd',
  xeroContactId: 'CT-0192',
};

export const ALBANY_SITE: Site = {
  id: 's-albany',
  address: '18 Bush Rd, Albany',
  hazards: [
    'Overhead power — NE boundary',
    'Hard rock at north face',
    'Live traffic on Bush Rd',
  ],
};

export const TASKS: readonly Task[] = [
  { id: 't1', name: 'Site cut', resourceId: 'EX-01', chargeBasis: 'hour', rate: 180, unit: 'h', captured: '9.0 h' },
  { id: 't2', name: 'Load trucks', resourceId: 'EX-01', chargeBasis: 'hour', rate: null, unit: 'h' },
  { id: 't3', name: 'Cart spoil', resourceId: 'TR-01', chargeBasis: 'load', rate: 95, unit: 'load', captured: '24 loads' },
  { id: 't4', name: 'Import GAP40', resourceId: 'TR-01', chargeBasis: 'tonne', rate: 41, unit: 't', captured: '120 t' },
  { id: 't5', name: 'Spreading', resourceId: 'EX-01', chargeBasis: 'hour', rate: 180, unit: 'h', captured: 'planned' },
  { id: 't6', name: 'Concrete removal', resourceId: 'EX-01', chargeBasis: 'fixed', rate: 180, unit: 'h', captured: '1.5 h', isExtra: true },
];

/** Cart spoil is shared across three trucks, so the table shows all of them. */
const RESOURCE_LABEL: Record<string, string> = { t3: 'TR-01/02/03' };

export function resourceLabel(task: Task): string {
  return RESOURCE_LABEL[task.id] ?? task.resourceId;
}

export const ALBANY_JOB: Job = {
  id: 'j-260919',
  ref: '#260919',
  name: 'Albany Site Earthworks',
  customer: CUSTOMER,
  site: ALBANY_SITE,
  status: 'in_progress',
  quoteRef: 'Q-4471',
  spoilM3: 600,
  tasks: [...TASKS],
};

export const DOCKET: Docket = {
  id: '#0182',
  jobId: ALBANY_JOB.id,
  lines: ['Remove concrete — 1.5h', 'Truck disposal — 2 loads', 'Drain excavation — 1h'],
  photos: 1,
};

const BASIS_LABEL: Record<Task['chargeBasis'], string> = {
  hour: 'per hour',
  load: 'per load',
  tonne: 'per tonne',
  fixed: 'extra · docket',
};

export function basisLabel(task: Task): string {
  return BASIS_LABEL[task.chargeBasis];
}

export function rateLabel(task: Task): string {
  return task.rate === null ? 'incl.' : `$${task.rate}`;
}
