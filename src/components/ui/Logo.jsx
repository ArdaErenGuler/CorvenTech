import { useId } from 'react';
import { company } from '../../data/site';

/**
 * CorvenTech amblemi: halka biçiminde bir C ve içinden geçen T.
 * Halka, T'nin geçtiği yerlerde ince bir boşluk bırakacak şekilde maskelenir.
 * Renkler tema tokenlarından gelir; Logo birden çok yerde kullanıldığı için id'ler useId ile benzersizleştirilir.
 */
const RING = { cx: 32, cy: 32, r: 20, width: 7 };
const MARK_PATH = 'M18.5 27.5H54.5M32 27.5V56';
const MARK_CUT_PATH = 'M18.5 27.5H58M32 27.5V60';

export function LogoMark({ className = 'size-10' }) {
  const uid = useId();
  const gradientId = `logo-gradient-${uid}`;
  const maskId = `logo-mask-${uid}`;

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent-dark, #0096b7)" />
          <stop offset="100%" stopColor="var(--color-accent-light, #48cae4)" />
        </linearGradient>
        <mask id={maskId}>
          <rect width="64" height="64" fill="#000" />
          <circle
            cx={RING.cx}
            cy={RING.cy}
            r={RING.r}
            fill="none"
            stroke="#fff"
            strokeWidth={RING.width}
          />
          {/* T'nin halkayı kestiği yerleri boşalt */}
          <path d={MARK_CUT_PATH} fill="none" stroke="#000" strokeWidth="12.5" />
        </mask>
      </defs>

      <circle
        cx={RING.cx}
        cy={RING.cy}
        r={RING.r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={RING.width}
        mask={`url(#${maskId})`}
      />
      <path d={MARK_PATH} fill="none" stroke={`url(#${gradientId})`} strokeWidth="8" />
    </svg>
  );
}

/** Marka bloğu: amblem + iki satırlı yazı (ana ad ve alt etiket). */
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
