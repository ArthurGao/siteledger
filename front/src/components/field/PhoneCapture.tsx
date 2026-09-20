'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Camera, InfoDisc } from '@/components/ui/icons';
import { FIELD_COPY, FIELD_INITIAL, FIELD_STEPS } from '@/lib/mock/captures';
import styles from './PhoneCapture.module.css';

const SYNC_MS = 1100;

export function PhoneCapture() {
  const [hours, setHours] = useState(FIELD_INITIAL.hours);
  const [loads, setLoads] = useState(FIELD_INITIAL.loads);
  const [online, setOnline] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const stepHours = (d: number) => setHours((h) => Math.max(0, Math.round((h + d) * 2) / 2));
  const stepLoads = (d: number) => setLoads((l) => Math.max(0, l + d));

  function save() {
    if (syncing || online) return;
    setSyncing(true);
    timer.current = setTimeout(() => {
      setSyncing(false);
      setOnline(true);
    }, SYNC_MS);
  }

  const buttonLabel = online ? FIELD_COPY.synced : syncing ? FIELD_COPY.syncing : FIELD_COPY.save;

  return (
    <div className={styles.fieldwrap}>
      <div className={styles.phone}>
        <div className={styles.scr}>
          <div className={styles.pbar}>
            <span className={styles.nm}>SiteLedger</span>
            <span
              className={`${styles.off} ${online ? styles.offYes : styles.offNo}`}
              aria-live="polite"
            >
              {online ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className={styles.pscroll}>
            <div className={styles.jcard}>
              <div className={styles.jcardTitle}>Albany — Site cut</div>
              <div className={styles.jcardMeta}>Job #260919 · EX-01 (CAT 320)</div>

              <div className={styles.fld}>
                <label id="hours-label">Hours worked</label>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={() => stepHours(-0.5)}
                    disabled={hours === 0}
                    aria-label="Decrease hours by 0.5"
                  >
                    –
                  </button>
                  <div className={styles.val} aria-labelledby="hours-label" role="status">
                    {hours.toFixed(1)}
                  </div>
                  <button type="button" onClick={() => stepHours(0.5)} aria-label="Increase hours by 0.5">
                    +
                  </button>
                </div>
              </div>

              <div className={styles.fld}>
                <label>Note</label>
                <div className={styles.inp}>Hit hard rock at north boundary</div>
              </div>

              <div className={styles.fld}>
                <label>Photos</label>
                <div className={styles.photos}>
                  <div className={styles.photo}>
                    <Camera withHump />
                  </div>
                  <div className={styles.photo}>
                    <Camera />
                  </div>
                  <div className={styles.photo}>
                    <Camera />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.jcard}>
              <div className={styles.jcardTitle}>Cart spoil</div>
              <div className={styles.jcardMeta}>TR-02 · per load</div>
              <div className={styles.fld}>
                <label id="loads-label">Loads carted</label>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={() => stepLoads(-1)}
                    disabled={loads === 0}
                    aria-label="Decrease loads by 1"
                  >
                    –
                  </button>
                  <div className={styles.val} aria-labelledby="loads-label" role="status">
                    {loads}
                  </div>
                  <button type="button" onClick={() => stepLoads(1)} aria-label="Increase loads by 1">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`${styles.notice} ${online ? styles.noticeOn : styles.noticeOff}`}
              aria-live="polite"
            >
              <InfoDisc />
              <span>{online ? FIELD_COPY.onlineNotice : FIELD_COPY.offlineNotice}</span>
            </div>
          </div>

          <div className={styles.psync}>
            <Button
              variant={online ? 'billed' : 'amber'}
              block
              onClick={save}
              disabled={syncing || online}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>

      <div>
        {FIELD_STEPS.map((s) => (
          <div key={s.n} className={styles.step}>
            <div className={styles.n}>{s.n}</div>
            <div>
              <b>{s.title}</b>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
