import { Panel } from './Panel';
import styles from './Stat.module.css';

export type StatEdge = 'machine' | 'slate' | 'billed' | 'flag';

export function Stat({
  label,
  value,
  unit,
  sub,
  edge,
}: {
  label: string;
  value: string;
  /** trailing unit rendered small + muted, e.g. "%" or "k" */
  unit?: string;
  sub?: string;
  edge: StatEdge;
}) {
  return (
    <Panel className={styles.stat}>
      <span className={`${styles.edge} ${styles[edge]}`} />
      <div className={styles.k}>{label}</div>
      <div className={styles.v}>
        {value}
        {unit ? <small>{unit}</small> : null}
      </div>
      {sub ? <div className={styles.sub}>{sub}</div> : null}
    </Panel>
  );
}
