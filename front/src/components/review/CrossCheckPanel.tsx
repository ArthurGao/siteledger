import { Panel, PanelHead } from '@/components/ui/Panel';
import { SourceTag } from '@/components/ui/SourceTag';
import { Tag } from '@/components/ui/Tag';
import { CROSS_CHECKS, CROSS_CHECK_FOOTNOTE } from '@/lib/mock/review';
import styles from './Review.module.css';

export function CrossCheckPanel() {
  return (
    <Panel>
      <PanelHead title="EROAD cross-check" aside={<SourceTag variant="tele" />} />
      <div className={styles.xcheck}>
        {CROSS_CHECKS.map((c) => (
          <div key={c.resourceId} className={styles.xrow}>
            <div className={styles.id}>{c.resourceId}</div>
            <div className={styles.cmp}>
              <div>
                <span>{c.leftLabel}</span>
                <b>{c.leftVal}</b>
              </div>
              <div>
                <span>{c.rightLabel}</span>
                <b>{c.rightVal}</b>
              </div>
            </div>
            <Tag variant={c.verdict === 'gap' ? 'warn' : 'ok'}>{c.note}</Tag>
          </div>
        ))}
      </div>
      <div className={styles.xfoot}>{CROSS_CHECK_FOOTNOTE}</div>
    </Panel>
  );
}
