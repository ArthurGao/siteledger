'use client';

import { crumbFor } from '@/lib/nav';
import { MenuGlyph } from './NavIcon';
import styles from './Topbar.module.css';

export function Topbar({
  pathname,
  railOpen,
  onToggleRail,
}: {
  pathname: string;
  railOpen: boolean;
  onToggleRail: () => void;
}) {
  return (
    <div className={styles.topbar}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onToggleRail}
        aria-label={railOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={railOpen}
        aria-controls="site-rail"
      >
        <MenuGlyph />
      </button>

      <div className={styles.crumb}>
        SiteLedger / <b>{crumbFor(pathname)}</b>
      </div>

      <div className={styles.integrations}>
        <span className={styles.pill}>
          <span className={styles.dot} />
          Xero
        </span>
        <span className={styles.pill}>
          <span className={styles.dot} />
          EROAD
        </span>
        <span className={styles.who}>
          <span className={styles.av}>A</span>
        </span>
      </div>
    </div>
  );
}
