import { Panel, PanelHead } from '@/components/ui/Panel';
import { Check, Sparkle, WarningTriangle } from '@/components/ui/icons';
import { ALERTS, type AlertKind } from '@/lib/mock/dashboard';
import styles from './Dashboard.module.css';

const GLYPH: Record<AlertKind, React.ReactNode> = {
  flag: <WarningTriangle />,
  ai: <Sparkle />,
  ok: <Check />,
};

export function AlertFeed() {
  return (
    <Panel>
      <PanelHead title="Needs a look" />
      <div className={styles.feed}>
        {ALERTS.map((a) => (
          <div key={a.id} className={styles.item}>
            <div className={`${styles.ic} ${styles[a.kind]}`}>{GLYPH[a.kind]}</div>
            <div className={styles.tx}>
              <b>{a.title}</b>
              <small>{a.detail}</small>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
