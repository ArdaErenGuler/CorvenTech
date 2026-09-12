import { useId } from 'react';
import { company } from '../../data/site';

/**
 * CorvenTech amblemi — orijinal logo tasarımının vektör kopyası.
 * Kalın bir halka (C) ve içinden geçen T: çubuğun sol ucu halkanın iç kavisini izler, sağ ucu içe eğik kesilir;
 * gövde aşağı doğru hafif incelir ve halkanın altından taşar. Halka, T'nin kestiği yerlerde boşluk bırakacak
 * şekilde maskelenir. Renk, logodaki lacivert→mavi geçişin aynısıdır; tema renklerine bağlı değildir.
 */
const RING = { cx: 32, cy: 32, r: 21.2, width: 7.6 };
const T_PATH = 'M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z';
// Halkadan oyulan boşluklar (2,6 birim pay): çubuk için sağa uzanan yatay bant, gövde için aşağı uzanan dikey bant.
const BAR_CUT = { x: 24, y: 20.4, width: 40, height: 13.2 };
const STEM_CUT_PATH = 'M27.1 31H40.9L39.8 64H28.2Z';
const GRADIENT = [
  ['0%', '#142c5a'],
  ['55%', '#2b5b9c'],
  ['100%', '#4287c8'],
];

export function LogoMark({ className = 'size-10' }) {
  const uid = useId();
  const gradientId = `logo-gradient-${uid}`;
  const maskId = `logo-mask-${uid}`;

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">
          {GRADIENT.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <mask id={maskId}>
          <rect width="64" height="64" fill="#000" />
          <circle cx={RING.cx} cy={RING.cy} r={RING.r} fill="none" stroke="#fff" strokeWidth={RING.width} />
          <rect {...BAR_CUT} fill="#000" />
          <path d={STEM_CUT_PATH} fill="#000" />
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
      <path d={T_PATH} fill={`url(#${gradientId})`} />
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
