const VARIANTS = {
  outline: 'border border-line bg-ink-soft text-body',
  soft: 'border border-accent-border bg-accent-subtle text-accent-light',
};

/** Küçük etiket çipi (modül, teknoloji, odak alanı). */
export default function Chip({ variant = 'outline', as: Tag = 'span', className = '', children }) {
  return (
    <Tag
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
