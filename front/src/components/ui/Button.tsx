import styles from './Button.module.css';

/** solid steel (default) · amber · ghost, plus `billed` for post-sync success states. */
export type ButtonVariant = 'steel' | 'amber' | 'ghost' | 'billed';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  /** full-width, centred (demo uses this for the phone + OCR buttons) */
  block?: boolean;
}

export function Button({
  variant = 'steel',
  block = false,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    variant !== 'steel' ? styles[variant] : null,
    block ? styles.block : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
