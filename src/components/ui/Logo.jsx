import { company } from '../../data/site';

export function LogoMark({ className = 'size-10' }) {
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

/** Marka bloğu: ikon + iki satırlı yazı (ana ad ve alt etiket). */
export default function Logo({ href = '#top', className = '' }) {
  return (
    <a
      href={href}
      aria-label={`${company.name} ana sayfa`}
      className={`group/logo inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <LogoMark className="size-10 transition-transform duration-300 group-hover/logo:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-heading">
          {company.name}
        </span>
        <span className="mt-1 font-badge text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-accent">
          {company.brandSub}
        </span>
      </span>
    </a>
  );
}
