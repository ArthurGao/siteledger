import type { CaptureSource } from '@/lib/types';
import styles from './SourceTag.module.css';

export type SourceVariant = 'manual' | 'tele' | 'weigh' | 'ai';

const FROM_CAPTURE_SOURCE: Record<CaptureSource, SourceVariant> = {
  manual: 'manual',
  telematics: 'tele',
  weighbridge: 'weigh',
  ai_estimate: 'ai',
};

const DEFAULT_LABEL: Record<SourceVariant, string> = {
  manual: 'manual',
  tele: 'telematics',
  weigh: 'weighbridge',
  ai: 'AI',
};

/** Data-provenance chip. Pass `variant` directly, or `source` from the domain model. */
export function SourceTag({
  variant,
  source,
  children,
}: {
  variant?: SourceVariant;
  source?: CaptureSource;
  children?: React.ReactNode;
}) {
  const v: SourceVariant = variant ?? (source ? FROM_CAPTURE_SOURCE[source] : 'manual');
  return <span className={`${styles.src} ${styles[v]}`}>{children ?? DEFAULT_LABEL[v]}</span>;
}
