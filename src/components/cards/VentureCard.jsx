import Icon from '../ui/Icon';

/** Girişim modül kartı. `venture.url` varsa kartın tamamı bağlantı olur. */
export default function VentureCard({ venture, index }) {
  const { name, category, description, modules, icon, url } = venture;
  const Wrapper = url ? 'a' : 'article';
  const linkProps = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...linkProps}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 transition-colors duration-200 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-ink">
          <Icon name={icon} className="size-6" />
        </span>
        {url ? (
          <Icon
            name="arrow-up-right"
            className="size-5 text-ink-muted transition-colors group-hover:text-ink"
          />
        ) : (
          <span className="font-display text-sm font-medium text-ink-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {category}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{name}</h3>
      <p className="mt-4 mb-8 leading-relaxed text-ink-muted">{description}</p>

      <ul className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6" aria-label="Modüller">
        {modules.map((module) => (
          <li
            key={module}
            className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink"
          >
            {module}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
