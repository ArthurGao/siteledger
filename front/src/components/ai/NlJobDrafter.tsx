'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { NL_PROMPT, NL_TASKS } from '@/lib/mock/ai';
import styles from './Ai.module.css';

const FIRST_MS = 250;
const STAGGER_MS = 220;

export function NlJobDrafter() {
  const [prompt, setPrompt] = useState(NL_PROMPT);
  const [shown, setShown] = useState(0);
  const [drafting, setDrafting] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  function draft() {
    if (drafting) return;
    clearTimers();
    setShown(0);
    setDrafting(true);

    NL_TASKS.forEach((_task, i) => {
      timers.current.push(
        setTimeout(() => {
          setShown(i + 1);
          if (i === NL_TASKS.length - 1) setDrafting(false);
        }, FIRST_MS + i * STAGGER_MS),
      );
    });
  }

  const done = !drafting && shown === NL_TASKS.length;
  const label = drafting ? 'Drafting…' : done ? 'Confirm to create →' : 'Draft tasks';

  return (
    <div className={styles.demo}>
      <label htmlFor="nl-input" className="visually-hidden">
        Describe the job
      </label>
      <textarea
        id="nl-input"
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        variant={done ? 'ghost' : 'amber'}
        className={styles.nlBtn}
        onClick={draft}
        disabled={drafting}
      >
        {label}
      </Button>

      <div className={styles.tasksOut} aria-live="polite">
        {NL_TASKS.slice(0, shown).map((t) => (
          <div key={t.name} className={styles.t}>
            <b>{t.name}</b>
            <span className={styles.basis}>{t.basis}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
