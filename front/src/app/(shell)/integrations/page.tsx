import { PageHeader } from '@/components/ui/PageHeader';
import { SourceTag } from '@/components/ui/SourceTag';
import { IntegrationCard } from '@/components/integrations/IntegrationCard';
import { WeighbridgeOCR } from '@/components/integrations/WeighbridgeOCR';
import { INTEGRATIONS } from '@/lib/mock/integrations';
import styles from '@/components/integrations/Integrations.module.css';

export default function IntegrationsPage() {
  const [xero, eroad, weighbridge] = INTEGRATIONS;

  return (
    <>
      <PageHeader
        eyebrow="Connected systems"
        title="Integrations"
        lede="SiteLedger sits between the tools you already run. It doesn’t replace your telematics or your accountant — it turns what they know into billed work."
      />

      <div className={styles.intgrid}>
        <IntegrationCard integration={xero} />
        <IntegrationCard integration={eroad} />
        <IntegrationCard integration={weighbridge} aside={<SourceTag variant="ai">AI</SourceTag>}>
          <WeighbridgeOCR />
        </IntegrationCard>
      </div>
    </>
  );
}
