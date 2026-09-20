import { PageHeader } from '@/components/ui/PageHeader';
import { Board } from '@/components/planner/Board';

export default function PlannerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Week of 22 Sep"
        title="Work Planner"
        lede="Assign plant and crew to jobs by dragging them onto the day. The board is the single answer to “where is everything today” — no more ringing round."
      />
      <Board />
    </>
  );
}
