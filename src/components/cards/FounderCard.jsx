import Icon from '../ui/Icon';

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

/** Ekip satırı: solda kare fotoğraf (yoksa baş harfler), sağda ad, rol ve profil bağlantıları. */
export default function FounderCard({ founder }) {
  const { name, role, photo, links } = founder;
  const profiles = PROFILES.filter(({ key }) => links[key]);

  return (
    <article className="flex h-full items-center gap-5 px-6 py-7">
      <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-ink-soft">
        {photo ? (
          <img src={photo} alt={name} loading="lazy" className="size-full object-cover" />
        ) : (
          <span aria-hidden="true" className="text-xl font-extrabold text-accent">
            {initialsOf(name)}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="mt-0.5 text-sm text-muted">{role}</p>

        {profiles.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {profiles.map(({ key, label }) => (
              <li key={key}>
                <a
                  href={links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${label} profili`}
                  className="inline-flex items-center gap-2 py-1 text-sm font-medium text-accent transition-colors hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon name={key} className="size-4" strokeWidth={2} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
