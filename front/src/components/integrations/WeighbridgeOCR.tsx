'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SourceTag } from '@/components/ui/SourceTag';
import {
  WEIGHBRIDGE_EXTRACTED,
  WEIGHBRIDGE_OUTCOME,
  WEIGHBRIDGE_TICKET,
} from '@/lib/mock/integrations';
import styles from './Integrations.module.css';

const SCAN_MS = 1400;

type Status = 'idle' | 'scanning' | 'read';

export function WeighbridgeOCR() {
  const [status, setStatus] = useState<Status>('idle');

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function scan() {
    if (status !== 'idle') return;
    setStatus('scanning');
    timer.current = setTimeout(() => setStatus('read'), SCAN_MS);
  }

  const label = status === 'scanning' ? 'Reading…' : status === 'read' ? 'Read ✓' : 'Scan docket';

  return (
    <div className={styles.ocr}>
      <div className={`${styles.ticket} ${status === 'scanning' ? styles.scanning : ''}`}>
        <div className={styles.scan} />
        {WEIGHBRIDGE_TICKET.map((line, i) => (
          <Fragment key={line}>
            {i > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </div>

      <Button
        variant="ghost"
        block
        className={styles.ocrBtn}
        onClick={scan}
        disabled={status !== 'idle'}
      >
        {label}
      </Button>

      {status === 'read' ? (
        <div className={styles.ocrout} aria-live="polite">
          {WEIGHBRIDGE_EXTRACTED.map((f) => (
            <div key={f.label} className={styles.row}>
              <span>{f.label}</span>
              <b>{f.value}</b>
            </div>
          ))}
          <div className={styles.outcome}>
            <SourceTag variant="weigh" />
            <span className={styles.outcomeText}>{WEIGHBRIDGE_OUTCOME}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
