import Icon from '../ui/Icon';
import Badge from '../ui/Badge';
import Chip from '../ui/Chip';
import Button from '../ui/Button';
import { CARD, ICON_BOX } from '../ui/Card';
import { useUI } from '../../context/UIContext';

const LABEL = 'mb-2.5 font-badge text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-dim';

/** Girişim modül kartı: kategori, modüller, teknoloji ve detay/kaynak düğmeleri. */
export default function VentureCard({ venture }) {
  const { id, name, category, tagline, description, modules, stack, icon, status, links } = venture;
  const { openModal } = useUI();

  return (
    <article className={`group flex h-full flex-col p-8 md:p-10 ${CARD}`}>
      <div className="flex items-start justify-between gap-4">
        <span className={`size-14 ${ICON_BOX}`}>
          <Icon name={icon} className="size-7" />
        </span>
        <Badge variant="neutral">{status}</Badge>
      </div>

      <p className="mt-8 font-badge text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent">
        {category}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{name}</h3>
      <p className="mt-2 font-medium text-body">{tagline}</p>
      <p className="mt-4 leading-relaxed text-muted">{description}</p>

      <div className="mt-8 space-y-5">
        <div>
          <p className={LABEL}>Modüller</p>
          <ul className="flex flex-wrap gap-2" aria-label={`${name} modülleri`}>
            {modules.map((module) => (
              <Chip key={module.name} as="li" variant="soft">
                {module.name}
              </Chip>
            ))}
          </ul>
        </div>
        <div>
          <p className={LABEL}>Teknoloji</p>
          <ul className="flex flex-wrap gap-2" aria-label={`${name} teknolojileri`}>
            {stack.map((item) => (
              <Chip key={item} as="li">
                {item}
              </Chip>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-3 border-t border-line pt-8 mt-10">
        <Button onClick={() => openModal({ type: 'venture', id })} icon="arrow-right">
          Detayları Gör
        </Button>
        {links.github && (
          <Button
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            icon="external-link"
          >
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}
