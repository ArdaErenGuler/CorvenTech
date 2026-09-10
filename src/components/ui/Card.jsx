/** Ortak kart yüzeyi: koyu zemin, ince kenarlık, üst ışık çizgisi ve hover'da hafif yükselme. */
export const CARD =
  'rounded-2xl border border-line bg-surface inset-shadow-highlight transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-line-accent hover:shadow-md';

/** Hover etkisi olmayan durağan kart yüzeyi. */
export const CARD_STATIC = 'rounded-2xl border border-line bg-surface inset-shadow-highlight';

/** Vurgulu ikon kutusu. */
export const ICON_BOX =
  'grid place-items-center rounded-xl border border-accent-border bg-accent-subtle text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink';

export default function Card({ as: Tag = 'div', hover = true, className = '', children, ...rest }) {
  return (
    <Tag className={`${hover ? CARD : CARD_STATIC} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
