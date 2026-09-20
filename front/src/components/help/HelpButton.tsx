'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { helpFor, type FlowDirection } from '@/lib/help';
import styles from './HelpPanel.module.css';

const DIR_LABEL: Record<FlowDirection, string> = { in: '读入', out: '写出', both: '双向' };
const DIR_ARROW: Record<FlowDirection, string> = { in: '←', out: '→', both: '↔' };
const DIR_CLASS: Record<FlowDirection, string> = {
  in: styles.dirIn,
  out: styles.dirOut,
  both: styles.dirBoth,
};

function QuestionMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.2 9a2.8 2.8 0 1 1 3.8 2.6c-.7.3-1 .9-1 1.6v.3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/** 极简内联加粗：把 **…** 渲染成 <strong>，其余原样输出。不引 Markdown 依赖。 */
function Rich({ text }: { text: string }) {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.num}>{n}</span>
        <h3 className={styles.sectionTitle}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function HelpButton({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const content = helpFor(pathname);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Esc 关闭，并把焦点关进面板，避免读屏和键盘用户跑到背后的页面
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!content) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles.cjk}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        /* 窄屏下文字被 display:none 隐藏，会一并从无障碍树移除，
           所以这里固定一个名字，保证任何宽度都有可读标签 */
        aria-label="这一页在做什么"
      >
        <QuestionMark />
        <span className={styles.triggerLabel}>这一页在做什么</span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className={styles.scrim}
            aria-label="关闭说明"
            onClick={close}
          />
          <div
            ref={panelRef}
            className={`${styles.panel} ${styles.cjk}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
          >
            <div className={styles.head}>
              <div className={styles.haz} aria-hidden="true" />
              <button type="button" className={styles.close} onClick={close} aria-label="关闭说明">
                ×
              </button>
              <p className={styles.eyebrow}>模块说明</p>
              <h2 id="help-title" className={styles.title}>
                {content.title}
              </h2>
              <p className={styles.summary}>{content.summary}</p>
            </div>

            <div className={styles.body}>
              <Section n="1" title="这一页做了什么">
                <ul className={styles.list}>
                  {content.does.map((d) => (
                    <li key={d}>
                      <Rich text={d} />
                    </li>
                  ))}
                </ul>
              </Section>

              <Section n="2" title="输入与输出">
                <div className={styles.io}>
                  <div className={styles.ioCol}>
                    <div className={`${styles.ioHead} ${styles.ioIn}`}>
                      <span className={styles.ioArrow}>←</span> 输入
                    </div>
                    <ul className={styles.ioList}>
                      {content.inputs.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.ioCol}>
                    <div className={`${styles.ioHead} ${styles.ioOut}`}>
                      <span className={styles.ioArrow}>→</span> 输出
                    </div>
                    <ul className={styles.ioList}>
                      {content.outputs.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              <Section n="3" title="整合了哪些系统">
                <div className={styles.intList}>
                  {content.integrations.map((it) => (
                    <div key={`${it.app}-${it.detail}`} className={styles.intRow}>
                      <span className={`${styles.dir} ${DIR_CLASS[it.direction]}`}>
                        {DIR_ARROW[it.direction]} {DIR_LABEL[it.direction]}
                      </span>
                      <span>
                        <span className={styles.intApp}>{it.app}</span>
                        <span className={styles.intDetail}>{it.detail}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section n="4" title="省掉了哪些人工步骤">
                <div className={styles.saves}>
                  <ul className={styles.list}>
                    {content.saves.map((s) => (
                      <li key={s}>
                        <Rich text={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </div>

            <div className={styles.foot}>
              本页为演示原型，数据为样例。Xero、EROAD、过磅站 OCR 均为模拟，未连接真实账号。
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
