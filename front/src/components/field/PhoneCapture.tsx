'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Camera, InfoDisc } from '@/components/ui/icons';
import {
  FIELD_CARDS,
  FIELD_COPY,
  FIELD_INITIAL,
  FIELD_STEPS,
} from '@/lib/mock/captures';
import styles from './PhoneCapture.module.css';

const SYNC_MS = 1100;

export function PhoneCapture() {
  const [hours, setHours] = useState(FIELD_INITIAL.hours);
  const [loads, setLoads] = useState(FIELD_INITIAL.loads);
  const [online, setOnline] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const stepHours = (d: number) =>
    setHours((h) => Math.max(0, Math.round((h + d) * 2) / 2));
  const stepLoads = (d: number) => setLoads((l) => Math.max(0, l + d));

  function save() {
    if (syncing || online) return;
    setSyncing(true);
    timer.current = setTimeout(() => {
      setSyncing(false);
      setOnline(true);
    }, SYNC_MS);
  }

  const buttonLabel = online
    ? FIELD_COPY.synced
    : syncing
      ? FIELD_COPY.syncing
      : FIELD_COPY.save;

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
            {FIELD_CARDS.map((card) => {
              const isHours = card.field === 'hours';
              const value = isHours ? hours.toFixed(1) : String(loads);
              const step = isHours ? stepHours : stepLoads;
              const delta = isHours ? 0.5 : 1;
              const atMin = isHours ? hours === 0 : loads === 0;
              const unit = isHours ? 'hours by 0.5' : 'loads by 1';

              return (
                <div key={card.id} className={styles.jcard}>
                  <div className={styles.jcardTitle}>{card.title}</div>
                  <div className={styles.jcardMeta}>{card.meta}</div>

                  <div className={styles.fld}>
                    <label id={`${card.id}-label`}>{card.fieldLabel}</label>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        onClick={() => step(-delta)}
                        disabled={atMin}
                        aria-label={`Decrease ${unit}`}
                      >
                        –
                      </button>
                      <div
                        className={styles.val}
                        aria-labelledby={`${card.id}-label`}
                        role="status"
                      >
                        {value}
                      </div>
                      <button
                        type="button"
                        onClick={() => step(delta)}
                        aria-label={`Increase ${unit}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {card.note ? (
                    <div className={styles.fld}>
                      <label>Note</label>
                      <div className={styles.inp}>{card.note}</div>
                    </div>
                  ) : null}

                  {card.photos ? (
                    <div className={styles.fld}>
                      <label>Photos</label>
                      <div className={styles.photos}>
                        {Array.from({ length: card.photos }, (_, i) => (
                          <div key={i} className={styles.photo}>
                            <Camera withHump={i === 0} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div
              className={`${styles.notice} ${online ? styles.noticeOn : styles.noticeOff}`}
              aria-live="polite"
            >
              <InfoDisc />
              <span>
                {online ? FIELD_COPY.onlineNotice : FIELD_COPY.offlineNotice}
              </span>
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
