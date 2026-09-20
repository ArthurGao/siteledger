import { PageHeader } from '@/components/ui/PageHeader';
import { Stat } from '@/components/ui/Stat';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { Funnel } from '@/components/dashboard/Funnel';
import { KPIS, TODAY_LABEL } from '@/lib/mock/dashboard';
import styles from '@/components/dashboard/Dashboard.module.css';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow={TODAY_LABEL}
        title="This morning, at a glance"
        lede="You don’t chase machines by phone anymore. Every hour, load and docket recorded on site is already becoming a line on an invoice."
      />

      <div className={styles.statrow}>
        {KPIS.map((k) => (
          <Stat
            key={k.label}
            label={k.label}
            value={k.value}
            unit={k.unit}
            sub={k.sub}
            edge={k.edge}
          />
        ))}
      </div>

      <div className={styles.two}>
        <Funnel />
        <AlertFeed />
      </div>
    </>
  );
}
