import { Panel, PanelHead } from '@/components/ui/Panel';
import { UTILISATION, UTILISATION_FOOTNOTE } from '@/lib/mock/review';
import styles from './Review.module.css';

export function Utilisation() {
  return (
    <Panel>
      <PanelHead title="Clocked vs billable" aside="by resource" />
      <div className={styles.util}>
        {UTILISATION.map((u) => {
          const pct = Math.round((u.billable / u.clocked) * 100);
          return (
            <div key={u.label} className={styles.u}>
              <div className={styles.top}>
                <span>{u.label}</span>
                <b>
                  {u.billable.toFixed(1)} / {u.clocked.toFixed(1)} h
                </b>
              </div>
              <div
                className={styles.ubar}
                role="img"
                aria-label={`${u.label}: ${u.billable.toFixed(1)} billable of ${u.clocked.toFixed(1)} clocked hours`}
              >
                <i className={styles.bill} style={{ width: `${pct}%` }} />
                <i className={styles.idle} style={{ width: `${100 - pct}%` }} />
              </div>
            </div>
          );
        })}
        <p className={styles.footnote}>{UTILISATION_FOOTNOTE}</p>
      </div>
    </Panel>
  );
}
