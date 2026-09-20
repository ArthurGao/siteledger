import { Panel } from '@/components/ui/Panel';
import { SourceTag } from '@/components/ui/SourceTag';
import { Tag } from '@/components/ui/Tag';
import { ALBANY_JOB, DOCKET } from '@/lib/mock/jobs';
import styles from './Job.module.css';

export function JobSidebar() {
  return (
    <div>
      <Panel className={`${styles.sidePanel} ${styles.sideGap}`}>
        <h3 className={styles.sideTitle}>Job details</h3>
        <div className={styles.kv}>
          <span>Status</span>
          <span>
            <Tag variant="ok">In progress</Tag>
          </span>
        </div>
        <div className={styles.kv}>
          <span>Customer</span>
          <span>{ALBANY_JOB.customer.name}</span>
        </div>
        <div className={styles.kv}>
          <span>Xero contact</span>
          <span className={styles.kvMono}>{ALBANY_JOB.customer.xeroContactId}</span>
        </div>
        <div className={styles.kv}>
          <span>Quote ref</span>
          <span className={styles.kvMono}>{ALBANY_JOB.quoteRef}</span>
        </div>
        <div className={styles.kv}>
          <span>Spoil volume</span>
          <span>~{ALBANY_JOB.spoilM3} m³</span>
        </div>
      </Panel>

      <Panel className={styles.sidePanel}>
        <h3 className={styles.sideTitle}>Dockets</h3>
        <p className={styles.docketNote}>
          Extra work builder asked for on the day — recorded so it never gets forgotten at billing.
        </p>
        <div className={styles.docket}>
          <b>Docket {DOCKET.id}</b>
          <div className={styles.docketLines}>
            {DOCKET.lines.join(' · ')} · <SourceTag variant="ai">{DOCKET.photos} photo</SourceTag>
          </div>
        </div>
      </Panel>
    </div>
  );
}
