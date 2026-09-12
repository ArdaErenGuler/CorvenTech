const VARIANTS = {
  outline: 'border-line bg-ink-soft text-body',
  soft: 'border-line-accent bg-accent-subtle text-accent-light',
};

/** Küçük köşeli etiket (modül, teknoloji). */
export default function Chip({ variant = 'outline', as: Tag = 'span', className = '', children }) {
  return (
    <Tag
      className={`inline-flex items-center rounded border px-2.5 py-1 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
