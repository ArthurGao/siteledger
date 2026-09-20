'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Rail } from './Rail';
import { Topbar } from './Topbar';
import styles from './Shell.module.css';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The drawer is remembered against the route it was opened on, so any
  // navigation (including back/forward) closes it without a sync effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const railOpen = openAt === pathname;
  const closeRail = () => setOpenAt(null);

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={railOpen ? 0 : -1}
        className={railOpen ? `${styles.scrim} ${styles.scrimOn}` : styles.scrim}
        onClick={closeRail}
      />
      <div className={styles.app}>
        <Rail pathname={pathname} open={railOpen} onNavigate={closeRail} />
        <div className={styles.main}>
          <Topbar
            pathname={pathname}
            railOpen={railOpen}
            onToggleRail={() => setOpenAt(railOpen ? null : pathname)}
          />
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </>
  );
}
