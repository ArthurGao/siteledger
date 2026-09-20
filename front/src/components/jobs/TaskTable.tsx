import { Panel, PanelHead } from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import { TASKS, basisLabel, rateLabel, resourceLabel } from '@/lib/mock/jobs';
import styles from './Job.module.css';

export function TaskTable() {
  return (
    <Panel>
      <PanelHead
        title="Tasks"
        aside={`${TASKS.length} tasks · charge basis set per task`}
      />
      <div className={styles.tableScroll}>
        <table className={styles.data}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Resource</th>
              <th>Charge basis</th>
              <th className={styles.num}>Rate</th>
              <th className={styles.num}>Captured</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{resourceLabel(t)}</td>
                <td>
                  <Tag variant={t.isExtra ? 'hold' : 'info'}>
                    {basisLabel(t)}
                  </Tag>
                </td>
                <td className={styles.num}>{rateLabel(t)}</td>
                <td className={styles.num}>{t.captured ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
