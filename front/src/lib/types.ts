export type ChargeBasis = 'hour' | 'load' | 'tonne' | 'fixed';
export type CaptureSource = 'manual' | 'telematics' | 'weighbridge' | 'ai_estimate';
export type TaskStatus = 'planned' | 'in_progress' | 'completed' | 'overdue';

export interface Customer {
  id: string;
  name: string;
  xeroContactId: string;
}

export interface Site {
  id: string;
  address: string;
  hazards: string[];
}

export interface ResourceItem {
  id: string; // "EX-01", "TR-01", "Jack M."
  kind: 'excavator' | 'truck' | 'operator';
  label: string; // "CAT 320 · 20T"
  capacityM3?: number;
  defaultRate?: number;
}

export interface Task {
  id: string;
  name: string;
  resourceId: string;
  chargeBasis: ChargeBasis;
  rate: number | null;
  unit: string;
  captured?: string; // display e.g. "9.0 h", "24 loads"
  isExtra?: boolean; // from a docket
}

export interface Job {
  id: string;
  ref: string; // "#260919"
  name: string;
  customer: Customer;
  site: Site;
  status: TaskStatus;
  quoteRef: string;
  spoilM3: number;
  tasks: Task[];
}

export interface Assignment {
  resourceId: string;
  day: number; // 0..5 Mon..Sat
  jobLabel: string;
  site: 'albany' | 'harbour' | 'yard';
  status: TaskStatus | 'maint';
}

export interface CaptureEntry {
  id: string;
  taskId: string;
  hours?: number;
  loads?: number;
  tonnes?: number;
  source: CaptureSource;
  note?: string;
  photos?: number;
}

export interface Docket {
  id: string;
  jobId: string;
  lines: string[];
  photos: number;
}

export interface InvoiceLine {
  desc: string;
  qty: string;
  rate: number;
  amount: number;
  source: CaptureSource;
  trace: string; // "from 3 capture entries"
}

export interface CrossCheck {
  resourceId: string;
  leftLabel: string;
  leftVal: string;
  rightLabel: string;
  rightVal: string;
  verdict: 'match' | 'gap';
  note?: string;
}
