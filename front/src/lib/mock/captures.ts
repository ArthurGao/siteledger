import type { CaptureEntry } from '@/lib/types';

/** Starting values for the phone demo (§10.1). */
export const FIELD_INITIAL: { hours: number; loads: number } = {
  hours: 9.0,
  loads: 9,
};

export const FIELD_ENTRIES: readonly CaptureEntry[] = [
  {
    id: 'ce-1',
    taskId: 't1',
    hours: FIELD_INITIAL.hours,
    source: 'manual',
    note: 'Hit hard rock at north boundary',
    photos: 3,
  },
  { id: 'ce-2', taskId: 't3', loads: FIELD_INITIAL.loads, source: 'manual' },
];

export const FIELD_CARDS = [
  {
    id: 'ce-1',
    title: 'Albany — Site cut',
    meta: 'Job #260919 · EX-01 (CAT 320)',
    note: 'Hit hard rock at north boundary',
    photos: 3,
  },
  {
    id: 'ce-2',
    title: 'Cart spoil',
    meta: 'TR-02 · per load',
  },
] as const;

export const FIELD_COPY = {
  offlineNotice: 'No signal. Your entries are saved on the phone and will sync automatically.',
  onlineNotice: 'Back online. 2 entries synced — now waiting on office review.',
  save: 'Save entry',
  syncing: 'Syncing…',
  synced: 'Synced ✓',
} as const;

export const FIELD_STEPS: readonly { n: string; title: string; body: string }[] = [
  {
    n: '1',
    title: 'See only your work',
    body: 'The operator opens the app and sees the jobs assigned to them today — with the site map, hazards and what needs doing.',
  },
  {
    n: '2',
    title: 'Record on the spot',
    body: 'Hours, loads, tonnages, extras, notes and photos — tapped in as the work happens, not reconstructed from memory that night.',
  },
  {
    n: '3',
    title: 'Works with no coverage',
    body: 'Entries are held on the device and sync the moment signal returns. Try the button — flip the phone back online.',
  },
  {
    n: '4',
    title: 'Straight into billing',
    body: 'Once synced, every entry is already a priced line waiting on the office review — nothing re-keyed.',
  },
];
