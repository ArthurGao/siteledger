import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel, PanelHead } from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import { Camera, InfoCircle, Lines, Scales, TrendChart } from '@/components/ui/icons';
import { NlJobDrafter } from '@/components/ai/NlJobDrafter';
import { PhotoEstimator } from '@/components/ai/PhotoEstimator';
import { AI_FLAGS, AI_RULE, DEMO_NOTE } from '@/lib/mock/ai';
import styles from '@/components/ai/Ai.module.css';

function CardIcon({ children }: { children: React.ReactNode }) {
  return <div className={styles.ic}>{children}</div>;
}

export default function AiPage() {
  return (
    <>
      <PageHeader eyebrow="AI Assist" title="Where AI earns its place" />

      <div className={styles.hero}>
        <div className={styles.haz} aria-hidden="true" />
        <h2>{AI_RULE.heading}</h2>
        <p>{AI_RULE.body}</p>
        <div className={styles.rule}>
          <span>
            <b>Measured</b> can bill · <b>Estimated</b> only assists
          </span>
        </div>
      </div>

      <div className={styles.aigrid}>
        <Panel>
          <PanelHead
            title="Build a job from a sentence"
            lead={
              <CardIcon>
                <Lines />
              </CardIcon>
            }
            aside={<Tag variant="hold">draft only</Tag>}
          />
          <div className={styles.aibody}>
            <p className={styles.desc}>
              Describe the job the way the customer phoned it in. Get a task breakdown with charge
              bases ready to confirm.
            </p>
            <NlJobDrafter />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Estimate a load from a photo"
            lead={
              <CardIcon>
                <Camera />
              </CardIcon>
            }
            aside={<Tag variant="warn">assist only</Tag>}
          />
          <div className={styles.aibody}>
            <p className={styles.desc}>
              A rough volume from a truck or stockpile photo, using the truck’s known capacity.
              Helps catch missed loads — not a billing figure unless the customer agrees.
            </p>
            <PhotoEstimator />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Read the weighbridge docket"
            lead={
              <CardIcon>
                <Scales />
              </CardIcon>
            }
            aside={<Tag variant="ok">can bill</Tag>}
          />
          <div className={styles.aibody}>
            <p className={styles.desc}>
              The number is measured on a certified scale — AI only reads the ticket. So the tonnage
              it extracts is safe to bill directly.
            </p>
            <div className={styles.linkBox}>
              Live demo under <Link href="/integrations">Integrations → Weighbridge OCR</Link>.
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Catch what falls through"
            lead={
              <CardIcon>
                <TrendChart />
              </CardIcon>
            }
            aside={<Tag variant="hold">flags for review</Tag>}
          />
          <div className={styles.aibody}>
            <p className={styles.desc}>
              Compares dispatch, capture, dockets and invoices to surface missed charges, idle plant
              and scheduling gaps — the alerts on your dashboard.
            </p>
            <div className={styles.flagList}>
              {AI_FLAGS.map((f) => (
                <div
                  key={f.id}
                  className={`${styles.flagItem} ${f.tone === 'flag' ? styles.flagTone : styles.holdTone}`}
                >
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className={styles.demoNote}>
        <InfoCircle />
        <span>{DEMO_NOTE}</span>
      </div>
    </>
  );
}
