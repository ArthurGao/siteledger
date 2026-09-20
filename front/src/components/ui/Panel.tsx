import styles from './Panel.module.css';

interface PanelProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export function Panel({ children, className, ...rest }: PanelProps) {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

interface PanelHeadProps {
  title: string;
  /** right-aligned meta slot (demo: .cardhead .r) */
  aside?: React.ReactNode;
  /** leading slot for a logo or icon chip */
  lead?: React.ReactNode;
}

export function PanelHead({ title, aside, lead }: PanelHeadProps) {
  return (
    <div className={styles.head}>
      {lead}
      <h3>{title}</h3>
      {aside ? <span className={styles.aside}>{aside}</span> : null}
    </div>
  );
}
