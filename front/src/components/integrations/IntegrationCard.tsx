import { Panel, PanelHead } from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import type { Integration } from '@/lib/mock/integrations';
import styles from './Integrations.module.css';

export function IntegrationCard({
  integration,
  aside,
  children,
}: {
  integration: Integration;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Panel>
      <PanelHead
        title={integration.name}
        lead={
          <div className={styles.logo} style={{ background: integration.logoBg }} aria-hidden="true">
            {integration.logo}
          </div>
        }
        aside={aside ?? <Tag variant="ok">connected</Tag>}
      />
      <div className={styles.intbody}>
        <p>{integration.blurb}</p>

        {integration.links ? (
          <div className={styles.dirn}>
            {integration.links.map((l) => (
              <div key={l.label} className={styles.d}>
                <span className={`${styles.ar} ${l.direction === 'in' ? styles.arIn : ''}`}>
                  {l.direction === 'in' ? '←' : '→'}
                </span>{' '}
                {l.label}
              </div>
            ))}
          </div>
        ) : null}

        {children}

        {integration.footnote ? (
          <div className={styles.footnote}>{integration.footnote}</div>
        ) : null}
      </div>
    </Panel>
  );
}
