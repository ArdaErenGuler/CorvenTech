import Icon from '../ui/Icon';
import Chip from '../ui/Chip';
import { CARD } from '../ui/Card';

const LINK_LABELS = { github: 'GitHub', linkedin: 'LinkedIn' };

/** Kurucu kartı: baş harf avatarı, rol, odak alanları, biyografi ve profil bağlantıları. */
export default function FounderCard({ founder }) {
  const { name, role, initials, focus, bio, links } = founder;
  const linkEntries = Object.entries(links).filter(([, url]) => url);

  return (
    <article className={`flex h-full flex-col p-8 ${CARD}`}>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="grid size-16 place-items-center rounded-2xl bg-accent font-display text-xl font-extrabold text-ink"
        >
          {initials}
        </span>
        {linkEntries.length > 0 && (
          <ul className="flex gap-2" aria-label={`${name} profilleri`}>
            {linkEntries.map(([key, url]) => (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${LINK_LABELS[key] ?? key}`}
                  title={LINK_LABELS[key] ?? key}
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-line-accent hover:text-accent"
                >
                  <Icon name={key} className="size-4" strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="mt-6 font-display text-xl font-bold">{name}</h3>
      <p className="mt-1 text-sm font-medium text-accent">{role}</p>

      {focus.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Odak alanları">
          {focus.map((item) => (
            <Chip key={item} as="li">
              {item}
            </Chip>
          ))}
        </ul>
      )}

      <p className="mt-5 text-sm leading-relaxed text-muted">{bio}</p>
    </article>
  );
}
