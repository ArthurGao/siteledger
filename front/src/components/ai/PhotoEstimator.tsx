'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SourceTag } from '@/components/ui/SourceTag';
import { PHOTO_ESTIMATE } from '@/lib/mock/ai';
import styles from './Ai.module.css';

const ESTIMATE_MS = 900;

type Status = 'idle' | 'analysing' | 'done';

export function PhotoEstimator() {
  const [status, setStatus] = useState<Status>('idle');

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function estimate() {
    if (status !== 'idle') return;
    setStatus('analysing');
    timer.current = setTimeout(() => setStatus('done'), ESTIMATE_MS);
  }

  return (
    <div className={`${styles.demo} ${styles.photostage}`}>
      <div className={styles.pic} aria-hidden="true" />
      <div className={styles.estout} aria-live="polite">
        {status === 'idle' ? (
          <Button variant="ghost" onClick={estimate}>
            Estimate volume
          </Button>
        ) : null}

        {status === 'analysing' ? <div className={styles.analysing}>Analysing…</div> : null}

        {status === 'done' ? (
          <>
            <div className={styles.big}>{PHOTO_ESTIMATE.volume}</div>
            <div className={styles.estMeta}>
              {PHOTO_ESTIMATE.detail} <SourceTag variant="ai">estimate</SourceTag>
            </div>
            <div className={styles.estCaveat}>{PHOTO_ESTIMATE.caveat}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}
