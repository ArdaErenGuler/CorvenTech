import Icon from '../ui/Icon';
import { useUI } from '../../context/UIContext';
import { hostOf } from '../../utils/url';

/**
 * Girişim satırı: kart ızgarası yerine tam genişlikte liste satırı.
 * Solda ad ve kategori, ortada açıklama, sağda site adresi ve detay düğmesi.
 */
export default function VentureRow({ venture }) {
  const { id, name, category, description, icon, url } = venture;
  const { openModal } = useUI();

  return (
    <div className="group grid gap-x-8 gap-y-4 border-b border-line px-1 py-7 transition-colors duration-200 hover:bg-surface/50 md:grid-cols-12 md:px-4">
      <div className="flex gap-4 md:col-span-4">
        <Icon name={icon} className="mt-1 size-5 shrink-0 text-accent" />
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold">{name}</h3>
          <p className="mt-1.5 text-sm text-muted">{category}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted md:col-span-5">{description}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-3 md:justify-end">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} sitesini yeni sekmede aç`}
            className="inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
          >
            <span className="truncate">{hostOf(url)}</span>
            <Icon name="arrow-up-right" className="size-4 shrink-0" strokeWidth={2} />
          </a>
        )}
        <button
          type="button"
          onClick={() => openModal({ type: 'venture', id })}
          aria-label={`${name} detayları`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-body transition-colors hover:border-line-accent hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Detaylar
          <Icon name="arrow-right" className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
