import styles from './Tag.module.css';

export type TagVariant = 'plant' | 'ok' | 'warn' | 'hold' | 'info';

export function Tag({
  variant,
  children,
}: {
  variant: TagVariant;
  children: React.ReactNode;
}) {
  return <span className={`${styles.tag} ${styles[variant]}`}>{children}</span>;
}
