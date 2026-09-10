import Badge from './Badge';

/** Ortak bölüm başlığı bloğu: etiket + başlık + açıklama. */
export default function SectionHeader({ icon, tag, title, description, align = 'center' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <Badge icon={icon} dot={!icon}>
        {tag}
      </Badge>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-balance text-heading sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
