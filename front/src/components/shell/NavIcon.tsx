import type { NavIcon as NavIconName } from '@/lib/nav';

const PATHS: Record<NavIconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </>
  ),
  planner: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  jobs: (
    <>
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  field: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  review: (
    <>
      <path d="M9 11l3 3 8-8" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  invoicing: (
    <>
      <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </>
  ),
  integrations: (
    <>
      <path d="M4 12h4m8 0h4" />
      <rect x="8" y="8" width="8" height="8" rx="2" />
      <path d="M12 4v4m0 8v4" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M5 19l.8 2 .8-2 2-.8-2-.8-.8-2-.8 2-2 .8z" />
    </>
  ),
};

export function NavIcon({ name }: { name: NavIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

export function BrandGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191C1B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17h5l2-4h4l3 4h4" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M13 13V7h4l3 6" />
    </svg>
  );
}

export function MenuGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
