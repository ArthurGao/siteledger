import { PageHeader } from '@/components/ui/PageHeader';
import { PhoneCapture } from '@/components/field/PhoneCapture';

export default function FieldPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operator app · Jack M."
        title="Field Capture"
        lede="The crew records hours, loads, dockets and photos on their phone — and it works with no signal. Nothing depends on a bar of coverage at the bottom of a cut."
      />
      <PhoneCapture />
    </>
  );
}
