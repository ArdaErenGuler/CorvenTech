import Icon from './Icon';

const VARIANTS = {
  accent: 'border border-accent-border bg-accent-subtle text-accent',
  neutral: 'border border-line-strong bg-surface-2 text-muted',
};

const SIZES = {
  md: 'px-4 py-1.5 text-[0.78rem]',
  sm: 'px-3 py-1 text-[0.68rem]',
};

/** Büyük harfli pill etiket (bölüm etiketi, kategori, durum). */
export default function Badge({ variant = 'accent', size = 'md', icon, dot = false, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-badge font-semibold uppercase tracking-[0.08em] ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {dot && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
      {icon && <Icon name={icon} className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  );
}
