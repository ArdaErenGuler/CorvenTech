import Icon from '../ui/Icon';
import { CARD } from '../ui/Card';

const PROFILES = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
];

/** "Arda Eren Güler" → "AG" (ilk ve son adın baş harfleri). */
function initialsOf(name) {
  const parts = name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (parts[0][0] + last).toLocaleUpperCase('tr-TR');
}

/** Ekip kartı: fotoğraf (yoksa baş harfler), ad, rol ve profil bağlantıları. */
export default function FounderCard({ founder }) {
  const { name, role, photo, links } = founder;
  const profiles = PROFILES.filter(({ key }) => links[key]);

  return (
    <article className={`flex h-full flex-col p-5 ${CARD}`}>
      <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border border-line bg-ink-soft">
        {photo ? (
          <img src={photo} alt={name} loading="lazy" className="size-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-20 place-items-center rounded-2xl bg-accent font-display text-2xl font-extrabold text-ink"
          >
            {initialsOf(name)}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-center font-display text-lg font-bold">{name}</h3>
      <p className="mt-0.5 text-center text-sm text-accent">{role}</p>

      {profiles.length > 0 && (
        <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
          {profiles.map(({ key, label }) => (
            <li key={key}>
              <a
                href={links[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} ${label} profili`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-2 text-sm font-medium text-body transition-colors hover:border-line-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon name={key} className="size-4" strokeWidth={2} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
