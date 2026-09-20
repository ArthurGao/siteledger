import type { InvoiceLine } from '@/lib/types';

export const INVOICE_LINES: readonly InvoiceLine[] = [
  {
    desc: 'Excavator EX-01 — site cut & loading',
    qty: '9.0 h',
    rate: 180,
    amount: 1620,
    source: 'manual',
    trace: 'from 3 capture entries',
  },
  {
    desc: 'Cart spoil — TR-01/02/03',
    qty: '24',
    rate: 95,
    amount: 2280,
    source: 'manual',
    trace: '24 loads across 3 trucks',
  },
  {
    desc: 'Import GAP40',
    qty: '120 t',
    rate: 41,
    amount: 4920,
    source: 'weighbridge',
    trace: 'OCR from 4 dockets',
  },
  {
    desc: 'Concrete removal — extra',
    qty: '1.5 h',
    rate: 180,
    amount: 270,
    source: 'manual',
    trace: 'Docket #0182',
  },
];

/** The docket line is provenance "manual", but the chip reads "docket". */
export const LINE_SOURCE_LABEL: readonly (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  'docket',
];

export const INVOICE_TOTALS = {
  subtotal: 9090,
  gstLabel: 'GST 15%',
  gst: 1363.5,
  total: 10453.5,
} as const;

export const INVOICE_META = {
  state: 'DRAFT',
  jobRef: 'Job #260919',
  customer: 'Kauri Build Ltd',
} as const;

export const XERO_INVOICE_NO = 'INV-2050';

const NZD = new Intl.NumberFormat('en-NZ', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function money(n: number): string {
  return `$${NZD.format(n)}`;
}
