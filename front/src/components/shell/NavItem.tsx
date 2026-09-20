'use client';

import Link from 'next/link';
import type { NavItemConfig } from '@/lib/nav';
import { NavIcon } from './NavIcon';
import styles from './NavItem.module.css';

export function NavItem({
  item,
  active,
  onNavigate,
}: {
  item: NavItemConfig;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.slug}
      className={active ? `${styles.item} ${styles.on}` : styles.item}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
    >
      <NavIcon name={item.icon} />
      {item.label}
    </Link>
  );
}
