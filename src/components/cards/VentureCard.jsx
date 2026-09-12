import Icon from '../ui/Icon';
import Badge from '../ui/Badge';
import { CARD, ICON_BOX } from '../ui/Card';
import { useUI } from '../../context/UIContext';
import { ventureTypes } from '../../data/site';
import { hostOf } from '../../utils/url';

/** Kompakt girişim kartı: tür, kategori, ad ve kısa açıklama; altta site bağlantısı ve detay düğmesi. */
export default function VentureCard({ venture }) {
  const { id, type, name, category, description, icon, url } = venture;
  const { openModal } = useUI();

  return (
    <article className={`group flex h-full flex-col p-6 ${CARD}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`size-11 ${ICON_BOX}`}>
          <Icon name={icon} className="size-5" />
        </span>
        <Badge variant="neutral" size="sm">
          {ventureTypes[type]}
        </Badge>
      </div>

      <p className="mt-5 font-badge text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent">
        {category}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-bold">{name}</h3>
      <p className="mt-2 mb-6 text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-5">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} sitesini yeni sekmede aç`}
            className="-my-1 inline-flex min-w-0 items-center gap-1.5 py-2 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
          >
            <span className="truncate">{hostOf(url)}</span>
            <Icon name="arrow-up-right" className="size-4 shrink-0" strokeWidth={2} />
          </a>
        ) : (
          <span className="text-sm text-dim">Yakında yayında</span>
        )}
        <button
          type="button"
          onClick={() => openModal({ type: 'venture', id })}
          aria-label={`${name} detayları`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-4 py-2.5 text-sm font-medium text-body transition-colors hover:border-line-accent hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Detaylar
          <Icon name="arrow-right" className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
