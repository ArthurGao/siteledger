import { PageHeader } from '@/components/ui/PageHeader';
import { JobSidebar } from '@/components/jobs/JobSidebar';
import { SiteMap } from '@/components/jobs/SiteMap';
import { TaskTable } from '@/components/jobs/TaskTable';
import { ALBANY_JOB } from '@/lib/mock/jobs';
import styles from '@/components/jobs/Job.module.css';

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Job ${ALBANY_JOB.ref} · ${ALBANY_JOB.customer.name}`}
        title={ALBANY_JOB.name}
        lede="A job breaks into billable tasks. Each task carries how it’s charged, so the invoice writes itself from what the crew records."
      />

      <div className={styles.jobgrid}>
        <div>
          <SiteMap />
          <TaskTable />
        </div>
        <JobSidebar />
      </div>
    </>
  );
}
