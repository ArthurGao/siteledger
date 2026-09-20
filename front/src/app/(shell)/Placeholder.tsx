import styles from './Placeholder.module.css';

/**
 * Phase 1 route stub — the shell is the deliverable; module content lands in
 * phases 2 and 3.
 */
export function Placeholder({
  eyebrow,
  title,
  lede,
  phase,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  phase: string;
}) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="pageTitle">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      <div className={styles.slot}>Module content arrives in {phase}.</div>
    </>
  );
}
