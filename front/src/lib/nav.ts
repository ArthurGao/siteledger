export type NavIcon =
  | 'dashboard'
  | 'planner'
  | 'jobs'
  | 'field'
  | 'review'
  | 'invoicing'
  | 'integrations'
  | 'ai';

export interface NavItemConfig {
  slug: string; // route under the shell, e.g. "/dashboard"
  label: string; // rail label
  crumb: string; // topbar breadcrumb, per reference demo data-c
  icon: NavIcon;
}

export const NAV: readonly NavItemConfig[] = [
  { slug: '/dashboard', label: 'Dashboard', crumb: 'Dashboard', icon: 'dashboard' },
  { slug: '/planner', label: 'Work Planner', crumb: 'Work Planner', icon: 'planner' },
  { slug: '/jobs', label: 'Jobs & Sites', crumb: 'Jobs', icon: 'jobs' },
  { slug: '/field', label: 'Field Capture', crumb: 'Field Capture', icon: 'field' },
  { slug: '/review', label: 'Review', crumb: 'Review', icon: 'review' },
  { slug: '/invoicing', label: 'Invoicing', crumb: 'Invoicing', icon: 'invoicing' },
  { slug: '/integrations', label: 'Integrations', crumb: 'Integrations', icon: 'integrations' },
  { slug: '/ai', label: 'AI Assist', crumb: 'AI Assist', icon: 'ai' },
] as const;

export function crumbFor(pathname: string): string {
  const match = NAV.find((n) => pathname === n.slug || pathname.startsWith(`${n.slug}/`));
  return match ? match.crumb : 'Dashboard';
}
