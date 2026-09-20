/** Inline SVG icons, paths taken from the reference demo. No icon library. */

function Icon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowWide = () => (
  <Icon>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

export const WarningTriangle = () => (
  <Icon>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </Icon>
);

export const Sparkle = () => (
  <Icon>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9z" />
  </Icon>
);

export const Check = () => (
  <Icon>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const Camera = ({ withHump = false }: { withHump?: boolean }) => (
  <Icon>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <circle cx="12" cy="13" r="3.5" />
    {withHump ? <path d="M8 6l1.5-2h5L16 6" /> : null}
  </Icon>
);

export const InfoDisc = () => (
  <Icon>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    <path d="M12 8v4M12 16h.01" />
  </Icon>
);

export const InfoCircle = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </Icon>
);

export const Lines = () => (
  <Icon>
    <path d="M4 6h16M4 12h10M4 18h7" />
  </Icon>
);

export const Scales = () => (
  <Icon>
    <path d="M12 3v18M5 8l7-5 7 5M4 21h16" />
    <path d="M5 8l-2 6a3 3 0 0 0 6 0z" />
    <path d="M19 8l-2 6a3 3 0 0 0 6 0z" />
  </Icon>
);

export const TrendChart = () => (
  <Icon>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </Icon>
);
