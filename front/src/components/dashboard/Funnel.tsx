import { Fragment } from 'react';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { ArrowRight } from '@/components/ui/icons';
import { FUNNEL, TIME_SPLIT } from '@/lib/mock/dashboard';
import styles from './Dashboard.module.css';

export function Funnel() {
  return (
    <Panel>
      <PanelHead title="Field to invoice, today" aside="updates as crews record" />

      <div className={styles.flow}>
        {FUNNEL.map((node, i) => (
          <Fragment key={node.label}>
            {i > 0 ? (
              <div className={styles.arr}>
                <ArrowRight />
              </div>
            ) : null}
            <div className={styles.node}>
              <div className={styles.nodeLabel}>{node.label}</div>
              <div className={node.done ? `${styles.nodeNum} ${styles.nodeDone}` : styles.nodeNum}>
                {node.value}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={styles.conv}>
        <div
          className={styles.bar}
          role="img"
          aria-label={TIME_SPLIT.map((s) => `${s.label} ${s.pct}%`).join(', ')}
        >
          {TIME_SPLIT.map((s) => (
            <i key={s.key} style={{ width: `${s.pct}%`, background: s.color }} />
          ))}
        </div>
        <div className={styles.legend}>
          {TIME_SPLIT.map((s) => (
            <span key={s.key}>
              <i style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
