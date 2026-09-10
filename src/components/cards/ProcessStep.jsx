import Icon from '../ui/Icon';
import { CARD } from '../ui/Card';

/** Süreç adımı: numara, ikon, başlık ve açıklama. Liste öğesi (li) sarmalayıcı tarafından sağlanır. */
export default function ProcessStep({ step, index, isLast }) {
  const { icon, title, description } = step;

  return (
    <div className={`relative flex h-full flex-col p-7 ${CARD}`}>
      {/* Masaüstünde adımları birbirine bağlayan çizgi */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-12 -right-6 hidden h-px w-6 bg-line-strong lg:block"
        />
      )}

      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-full bg-accent font-badge text-sm font-semibold text-ink">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon name={icon} className="size-5 text-accent" />
      </div>

      <h3 className="mt-6 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
