import { PageHeader } from '@/components/ui/PageHeader';
import { InvoiceDoc } from '@/components/invoicing/InvoiceDoc';

export default function InvoicingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job #260919 · draft"
        title="Invoicing"
        lede="Every line traces back to what the crew recorded and the rate on its task. Send it to Xero in one step — safely, with no duplicate if you press twice."
      />
      <InvoiceDoc />
    </>
  );
}
