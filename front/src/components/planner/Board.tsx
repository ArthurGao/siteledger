import { Panel } from '@/components/ui/Panel';
import {
  ASSIGNMENTS,
  PLANNER_DAYS,
  RESOURCES,
  statusWord,
  type PlannerAssignment,
} from '@/lib/mock/resources';
import styles from './Board.module.css';

function Chip({ a }: { a: PlannerAssignment }) {
  const overdue = a.status === 'overdue';
  return (
    <div className={`${styles.chip} ${styles[a.site]} ${overdue ? styles.overdue : ''}`}>
      <b>{a.jobLabel}</b>
      <span className={`${styles.st} ${overdue ? styles.stOverdue : ''}`}>{statusWord(a)}</span>
    </div>
  );
}

export function Board() {
  return (
    <Panel className={styles.planner}>
      <div className={styles.board}>
        <div className={styles.head}>
          <div>Resource</div>
          {PLANNER_DAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {RESOURCES.map((res) => (
          <div key={res.id} className={styles.row}>
            <div className={styles.res}>
              <b>{res.id}</b>
              <small>{res.label}</small>
            </div>
            {PLANNER_DAYS.map((_day, i) => {
              const a = ASSIGNMENTS.find((x) => x.resourceId === res.id && x.day === i);
              return (
                <div key={i} className={styles.cell}>
                  {a ? <Chip a={a} /> : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Panel>
  );
}
