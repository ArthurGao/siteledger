import { PageHeader } from '@/components/ui/PageHeader';
import { CrossCheckPanel } from '@/components/review/CrossCheckPanel';
import { Utilisation } from '@/components/review/Utilisation';
import styles from '@/components/review/Review.module.css';

export default function ReviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job #260919 · Monday"
        title="Review before billing"
        lede="See what was clocked versus what’s actually billable, and let the machine data catch the entries that don’t add up."
      />
      <div className={styles.revTwo}>
        <Utilisation />
        <CrossCheckPanel />
      </div>
    </>
  );
}
