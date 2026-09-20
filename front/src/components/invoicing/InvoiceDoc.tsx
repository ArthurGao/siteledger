import { Panel } from '@/components/ui/Panel';
import { SourceTag } from '@/components/ui/SourceTag';
import { COMPANY } from '@/lib/mock/jobs';
import {
  INVOICE_LINES,
  INVOICE_META,
  INVOICE_TOTALS,
  LINE_SOURCE_LABEL,
  money,
} from '@/lib/mock/invoice';
import { XeroPush } from './XeroPush';
import styles from './Invoice.module.css';

export function InvoiceDoc() {
  return (
    <Panel className={styles.inv}>
      <div className={styles.invhead}>
        <div>
          <div className={styles.co}>{COMPANY.name}</div>
          <div className={styles.gst}>{COMPANY.gst}</div>
        </div>
        <div className={styles.no}>
          {INVOICE_META.state}
          <br />
          {INVOICE_META.jobRef}
          <br />
          {INVOICE_META.customer}
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.invtable}>
          <thead>
            <tr>
              <th>Description</th>
              <th className={styles.r}>Qty</th>
              <th className={styles.r}>Rate</th>
              <th className={styles.r}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {INVOICE_LINES.map((l, i) => (
              <tr key={l.desc}>
                <td>
                  {l.desc}
                  <div className={styles.trace}>
                    <SourceTag source={l.source}>
                      {LINE_SOURCE_LABEL[i]}
                    </SourceTag>
                    {l.trace}
                  </div>
                </td>
                <td className={`${styles.r} ${styles.mono}`}>{l.qty}</td>
                <td className={`${styles.r} ${styles.mono}`}>
                  {money(l.rate)}
                </td>
                <td className={`${styles.r} ${styles.amt}`}>
                  {money(l.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.invfoot}>
        <div className={styles.line}>
          <span>Subtotal</span>
          <span className={styles.amt}>{money(INVOICE_TOTALS.subtotal)}</span>
        </div>
        <div className={styles.line}>
          <span>{INVOICE_TOTALS.gstLabel}</span>
          <span className={styles.amt}>{money(INVOICE_TOTALS.gst)}</span>
        </div>
        <div className={`${styles.line} ${styles.total}`}>
          <span>Total</span>
          <span className={styles.amt}>{money(INVOICE_TOTALS.total)}</span>
        </div>
      </div>

      <XeroPush />
    </Panel>
  );
}
