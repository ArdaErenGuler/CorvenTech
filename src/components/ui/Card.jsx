/**
 * Ortak yüzey. Cam/bevel parlaması ve gölge yok; ayrım kenarlık ve zemin tonuyla.
 * Hover'da yükselme yerine kenarlık ve zemin aydınlanır.
 */
export const CARD =
  'rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-line-accent hover:bg-surface-2';

/** Etkileşimsiz yüzey. */
export const CARD_STATIC = 'rounded-lg border border-line bg-surface';

/** Çerçevesiz vurgu ikonu: kutu yok, ikon doğrudan metnin yanında durur. */
export const ICON_MARK = 'text-accent transition-colors duration-200 group-hover:text-accent-light';

export default function Card({ as: Tag = 'div', hover = true, className = '', children, ...rest }) {
  return (
    <Tag className={`${hover ? CARD : CARD_STATIC} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
