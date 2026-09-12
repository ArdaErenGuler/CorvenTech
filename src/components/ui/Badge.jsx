import Icon from './Icon';

const VARIANTS = {
  accent: 'border-line-accent bg-accent-subtle text-accent-light',
  neutral: 'border-line bg-surface-2 text-muted',
};

const SIZES = {
  md: 'gap-2 px-2.5 py-1 text-[0.78rem]',
  sm: 'gap-1.5 px-2 py-0.5 text-[0.7rem]',
};

/** Küçük, köşeli etiket (kategori, tür, durum). Hap biçim ve büyük harf kullanılmaz. */
export default function Badge({ variant = 'accent', size = 'md', icon, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded border font-semibold ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  );
}
