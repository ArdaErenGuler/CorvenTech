/** Ortak bölüm başlığı bloğu: etiket + başlık + açıklama. */
export default function SectionHeader({ tag, title, description, align = 'center' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        {tag}
      </span>
      <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{description}</p>
      )}
    </div>
  );
}
