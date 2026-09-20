'use client';

import { NAV } from '@/lib/nav';
import { BrandGlyph } from './NavIcon';
import { NavItem } from './NavItem';
import styles from './Rail.module.css';

export function Rail({
  pathname,
  open,
  onNavigate,
}: {
  pathname: string;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <aside
      id="site-rail"
      className={open ? `${styles.rail} ${styles.open}` : styles.rail}
    >
      <div className={styles.brand}>
        <div className={styles.glyph}>
          <BrandGlyph />
        </div>
        <div>
          <b>SiteLedger</b>
          <span>Field to Invoice</span>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Modules">
        {NAV.map((item) => (
          <NavItem
            key={item.slug}
            item={item}
            active={pathname === item.slug || pathname.startsWith(`${item.slug}/`)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className={styles.foot}>
        Demo workspace · mock data
        <br />
        Sample Earthworks Ltd
      </div>
    </aside>
  );
}
