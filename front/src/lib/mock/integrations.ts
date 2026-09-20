export interface IntegrationLink {
  /** `in` = SiteLedger reads from the system, `out` = it writes back */
  direction: 'in' | 'out';
  label: string;
}

export interface Integration {
  id: 'xero' | 'eroad' | 'weighbridge';
  name: string;
  logo: string;
  logoBg: string;
  blurb: string;
  links?: readonly IntegrationLink[];
  footnote?: string;
}

export const INTEGRATIONS: readonly Integration[] = [
  {
    id: 'xero',
    name: 'Xero',
    logo: 'X',
    logoBg: '#13B5EA',
    blurb:
      'Your accounting stays the source of truth for money. SiteLedger reads your customers and rates in, and writes finished invoices back.',
    links: [
      { direction: 'in', label: 'Customers & contacts' },
      { direction: 'in', label: 'Items & charge-out rates' },
      { direction: 'out', label: 'Invoices with photo attachments' },
    ],
    footnote:
      'Push is idempotent — an invoice maps to one Xero record, so a retry never doubles up.',
  },
  {
    id: 'eroad',
    name: 'EROAD',
    logo: 'E',
    logoBg: '#0F1E3C',
    blurb:
      'Telematics answers the objective question: when did the engine actually run, and where was the truck. SiteLedger uses it to check field entries.',
    links: [
      { direction: 'in', label: 'Engine hours per machine' },
      { direction: 'in', label: 'GPS & on-site time' },
      { direction: 'in', label: 'Distance & RUC' },
    ],
    footnote:
      'Feeds the cross-check in Review. Flags gaps, never overwrites what the operator logged.',
  },
  {
    id: 'weighbridge',
    name: 'Weighbridge OCR',
    logo: '◷',
    logoBg: 'var(--steel)',
    blurb:
      'Where tonnage must be exact, the weighbridge docket is the measured truth. Snap it — the reading is pulled in for you.',
  },
];

export const WEIGHBRIDGE_TICKET: readonly string[] = [
  'WESTGATE WEIGHBRIDGE',
  'DOCKET 55213',
  'TRUCK: TR-01',
  'PRODUCT: GAP40',
  'GROSS 41.20 t',
  'TARE 11.20 t',
  'NET 30.00 t',
];

export const WEIGHBRIDGE_EXTRACTED: readonly { label: string; value: string }[] = [
  { label: 'Truck', value: 'TR-01' },
  { label: 'Product', value: 'GAP40' },
  { label: 'Net', value: '30.00 t' },
];

export const WEIGHBRIDGE_OUTCOME = '→ billable, added to Import GAP40';
