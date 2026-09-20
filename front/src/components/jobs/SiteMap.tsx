import { Panel } from '@/components/ui/Panel';
import { ALBANY_SITE } from '@/lib/mock/jobs';
import styles from './Job.module.css';

export function SiteMap() {
  return (
    <Panel className={styles.mapPanel}>
      <div className={styles.site}>
        <div className={styles.zone} />
        <div className={styles.pin} style={{ left: '30%', top: '40%' }} />
        <div className={styles.pin} style={{ left: '70%', top: '60%' }} />
        <div className={styles.lbl}>{ALBANY_SITE.address} · cut zone + stockpile</div>
      </div>
      <div className={styles.hazwrap}>
        <div className={styles.hz}>
          {ALBANY_SITE.hazards.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
