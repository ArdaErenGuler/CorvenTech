import { useId } from 'react';
import { company } from '../../data/site';

/**
 * CorvenTech amblemi: sağa açık bir C halkası ve içine oturan bir T.
 * İki harf birbirine değmez; aralarındaki boşluk her boyutta korunur.
 * Logo birden çok yerde kullanıldığı için gradient id'si useId ile benzersizleştirilir.
 */
const C_PATH = 'M44.9 16.7A20 20 0 1 0 44.9 47.3';
const T_PATH = 'M23 23H50M36.5 23V44.5';

export function LogoMark({ className = 'size-10' }) {
  const gradientId = `logo-gradient-${useId()}`;

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent-dark, #0096b7)" />
          <stop offset="100%" stopColor="var(--color-accent-light, #48cae4)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`}>
        <path d={C_PATH} strokeWidth="6.5" />
        <path d={T_PATH} strokeWidth="7" />
      </g>
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
