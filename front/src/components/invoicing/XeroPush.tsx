'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowWide } from '@/components/ui/icons';
import { XERO_INVOICE_NO } from '@/lib/mock/invoice';
import styles from './Invoice.module.css';

const PUSH_MS = 1300;

type Status = 'draft' | 'pushing' | 'synced';

export function XeroPush() {
  const [status, setStatus] = useState<Status>('draft');
  const [pressedAgain, setPressedAgain] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function push() {
    // Already in Xero: the second press must NOT create a second invoice.
    if (status === 'synced') {
      setPressedAgain(true);
      return;
    }
    if (status === 'pushing') return;

    setStatus('pushing');
    timer.current = setTimeout(() => setStatus('synced'), PUSH_MS);
  }

  const label =
    status === 'synced' ? 'Pushed to Xero' : status === 'pushing' ? 'Pushing…' : 'Push to Xero';

  return (
    <div className={styles.xerobar}>
      <Button
        variant={status === 'synced' ? 'billed' : 'amber'}
        onClick={push}
        disabled={status === 'pushing'}
      >
        {status === 'synced' ? null : <ArrowWide />}
        {label}
      </Button>

      <div className={styles.xstate} aria-live="polite">
        {status === 'draft' ? 'Draft — not yet in Xero' : null}
        {status === 'pushing' ? 'Creating invoice in Xero…' : null}
        {status === 'synced' && !pressedAgain ? (
          <>
            <span className={styles.syncedMark}>✓ Synced</span> · {XERO_INVOICE_NO} · attachments
            included · press again to see idempotency
          </>
        ) : null}
        {status === 'synced' && pressedAgain ? (
          <>
            <span className={styles.alreadyChip}>Already synced</span> No duplicate created
            (idempotent).
          </>
        ) : null}
      </div>
    </div>
  );
}
