import { company } from '../../data/site';

export function LogoMark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="14" className="fill-accent" />
      <path
        d="M41.2 22.8A13 13 0 1 0 41.2 41.2"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        className="stroke-ink"
      />
    </svg>
  );
}

export default function Logo({ href = '#top', className = '' }) {
  return (
    <a
      href={href}
      aria-label={`${company.name} ana sayfa`}
      className={`inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${className}`}
    >
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        {company.name}
      </span>
    </a>
  );
}
